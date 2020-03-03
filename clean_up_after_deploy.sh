#!/bin/sh
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images |grep 'springbootblog_mysql')

rm -rf log
rm -rf maven
rm -rf mysql
