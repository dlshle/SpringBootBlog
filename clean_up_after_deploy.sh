#!/bin/sh
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
rm -rf log
rm -rf maven
rm -rf mysql
