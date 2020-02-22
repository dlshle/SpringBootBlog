var bus = new Vue()

function emitError(message) {
    bus.$emit('error', message)
}

function onError(fn) {
    bus.$on('error', fn)
}

function emitInfo(message) {
    bus.$emit('info', message)
}

function onInfo(fn) {
    bus.$on('info', fn)
}

function emitLogin() {
    bus.$emit('login')
}

function onLogin(fn) {
    bus.$on('login', fn)
}

function handleError(errorMessage) {
    emitError(errorMessage)
}

var Alert = {
    template: '#alert',
    data: function () {
        return {
            classObject: {
                'is-danger': false,
                'is-info': false
            },
            message: '',
            visible: false
        }
    },
    mounted: function () {
        onError(function (errorMessage) {
            this.classObject['is-danger'] = true;
            this.message = errorMessage
            this.visible = true
            setTimeout(this.reset.bind(this), 2000)
        }.bind(this))

        onInfo(function (message) {
            this.classObject['is-info'] = true;
            this.message = message
            this.visible = true
            setTimeout(this.reset.bind(this), 2000)
        }.bind(this))
    },
    methods: {
        reset: function () {
            this.visible = false
            this.classObject = {}
        }
    }
}

var Header = {
    template: '#header',
    data: function () {
        return {
            currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
        }
    },
    mounted: function () {
        onLogin(function () {
            this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        }.bind(this))
    },
    methods: {
        logout: function () {
            this.currentUser = null
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('currentUser')
            this.$router.push('/')
        }
    }
}

var PostList = {
    template: '#posts',
    data: function () {
        return {
            posts: []
        }
    },
    filters: {
        longToDate: function (long) {
            var date = new Date(long)
            return date.toLocaleString()
        }
    },
    mounted: function () {
        axios.get('/api/post').then(function (res) {
            if (res.data.error) {
                handleError(res.data.error)
            } else {
                var posts = res.data
                this.posts = posts.sort(function (a, b) {
                    return b.createTime - a.createTime
                })
            }
        }.bind(this))
    },
    methods: {
        showDetail: {}
    }
}

var LoginForm = {
    template: '#login-form',
    data: function () {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        handleSubmit: function (e) {
            e.preventDefault()
            if (this.name === '') {
                handleError('Username can not be empty')
                return false
            }
            if (this.password === '') {
                handleError('Password can not be empty')
                return false
            }
            axios.post('/api/authentication', {
                name: this.name,
                password: this.password
            }).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                } else {
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('currentUser', JSON.stringify(res.data.user));
                    emitLogin()
                    this.$router.push('/')
                }
            }.bind(this))
        }
    }
}

var SignupForm = {
    template: '#signup-form',
    data: function () {
        return {
            name: '',
            password: '',
            fullName: '',
            passwordAgain: '',
            classTaken: '',
            funStuff: '',
            otherStuff: '',
            links: ''
        }
    },
    methods: {
        handleSubmit: function (e) {
            e.preventDefault()
            if (this.name === '') {
                handleError('Username can not be empty')
                return false
            }
            if (this.password === '') {
               handleError('Password can not be empty')
                return false
            }
            if (this.password !== this.passwordAgain) {
                handleError('Passwords are not identical')
                return false
            }
            if (this.fullName === '') {
                handleError('Full name can not be empty. You do have a name')
                return false;
            }
            axios.post('/api/user', {
                name: this.name,
                password: this.password,
                fullName: this.fullName,
                classTaken: this.classTaken,
                funStuff: this.funStuff,
                otherStuff: this.otherStuff,
                links: this.links
            }).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                } else {
                    emitInfo('Register finished, please sign in')
                    this.$router.push('/login')
                }
            }.bind(this))
        }
    }
}


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

var PostDetail = {
    template: '#post-detail',
    data: function () {
        return {
            post: {
                content: '',
                author: {}
            }
        }
    },
    mounted: function () {
        axios.get('/api/post/' + this.$route.params.id).then(function (res) {
            if (res.data.error) {
                handleError(res.data.error)
                return
            } else {
                this.post = res.data
            }
        }.bind(this))
    },
    filters: {
        longToDate: PostList.filters.longToDate
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.post.content)
        }
    }
}

var UserDetail = {
    template: '#user-detail',
    data: function () {
        return {
            user: {
                name: '',
                password: '',
                fullName: '',
                classTaken: '',
                classList: [],
                funStuff: '',
                otherStuff: '',
                links:  '',
                linkList: [],
                isCurrUser: false
            }
        }
    },
    mounted: function () {
        axios.get('/api/user/' + this.$route.params.id).then(function (res) {
            if (res.data.error) {
                handleError(res.data.error)
                return
            } else {
                this.user = res.data;
                if (this.user.classTaken && this.user.classTaken.length > 0)
                    this.user.classList = this.user.classTaken.split(",");
                if (this.user.links && this.user.links.length > 0)
                    this.user.linkList = this.user.links.split(",");
                this.isCurrUser = (sessionStorage.getItem("currentUser")?(sessionStorage.getItem("currentUser").name === this.user.name):false);
                // DEBUGGING
                console.log(this.user);
            }
        }.bind(this))
    }
}

var NewPost = {
    template: '#new-post',
    data: function () {
        return {
            title: null,
            content: null
        }

    },
    beforeRouteEnter: function (to, from, next) {
        if (sessionStorage.getItem('token') === null) {
            next({path: 'login'})
            emitInfo('Please log in first')
        } else {
            next()
        }
    },
    methods: {
        handleSubmit: function (e) {
            if (this.title === null || this.title === '') {
                handleError('Title can not be empty')
                return false
            }
            if (this.content === null || this.content === '') {
                handleError('Content can not be empty')
                return false
            }
            axios.post('/api/post', {
                    title: this.title,
                    content: this.content,
                }, {
                    headers: {token: sessionStorage.getItem('token')}
                }
            ).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                    return
                }
                this.$router.push('/posts/' + res.data.id)
            }.bind(this))
        }
    }
}

var UserUpdate = {
    template: '#user-update',
    data: function () {
        return {
            fullName: '',
            classTaken: '',
            funStuff: '',
            otherStuff: '',
            links: ''
        }

    },
    beforeRouteEnter: function (to, from, next) {
        if (sessionStorage.getItem('token') === null) {
            next({path: 'login'})
            emitInfo('Please log in first')
        } else {
            this.fullName = sessionStorage.getItem("currentUser").fullName;
            this.classTaken = sessionStorage.getItem("currentUser").classTaken;
            this.funStuff = sessionStorage.getItem("currentUser").funStuff;
            this.otherStuff = sessionStorage.getItem("currentUser").otherStuff;
            this.links = sessionStorage.getItem("currentUser").links;
            next()
        }
    },
    methods: {
        handleSubmit: function (e) {
            if (this.fullName === null || this.fullName === '') {
                handleError('Full name can not be empty')
                return false
            }
            if (this.id === null || this.id <= 0) {
                handleError('User id is invalid')
                return false
            }
            axios.put('/api/user', {
                    id: sessionStorage.getItem("currentUser").id,
                    name: sessionStorage.getItem("currentUser").name,
                    fullName: this.fullName,
                    classTaken: this.classTaken,
                    funStuff: this.funStuff,
                    otherStuff: this.otherStuff,
                    links: this.links
                }, {
                    headers: {token: sessionStorage.getItem('token')}
                }
            ).then(function (res) {
                if (res.data.error) {
                    handleError(res.data.error)
                    return
                }
                this.$router.push('/users/' + res.data.id)
            }.bind(this))
        }
    }
}

var routes = [
    {path: '/', component: PostList},
    {path: '/posts', component: PostList},
    {path: '/login', component: LoginForm},
    {path: '/signup', component: SignupForm},
    {path: '/posts/new', component: NewPost},
    {path: '/posts/:id', component: PostDetail},
    {path: '/users/:id', component: UserDetail},
    {path: '/users/update', component: UserUpdate}
]

var router = new VueRouter({
    routes: routes
})

new Vue({
    router: router,
    components: {
        'x-header': Header,
        'x-alert': Alert,
    }
}).$mount('#app')