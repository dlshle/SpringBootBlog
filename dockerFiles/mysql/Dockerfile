FROM mysql:5.6
ADD charset.cnf /etc/mysql/conf.d/charset.cnf

ADD database.sql /docker-entrypoint-initdb.d
