# Deployment
---

## docker 
Deployed on port 18080 by default

1. [install docker](https://get.daocloud.io/#install-docker)
2. [install docker-compose](https://get.daocloud.io/#install-compose)
3. Change mysql username and password
    ```
    $ cp application.yml.sample application.yml
    $ vi application.yml
    ```

    ```
    $ cp mysql.env mysql.env.local
    $ vi mysql.env.local
    ```
4. package  
    ```
    $ docker-compose up maven
    ```
5. run  
    - Iteratively
        ```
        $ docker-compose up app
        ```
    - On backend
        ```
        $ docker-compose start app
        ```

---

## Non-docker deployment
Deployed on port 8080 by default

1. package  
    ```
    $ mvn clean package 
    ```
2. run  
    ```
    $ nohub java -jar target/spring-boot-blog-0.0.1-SNAPSHOT.jar &
    ```
---
## TODO:
- Add cards for user attributes
- Refactor some code
