/*
 Navicat Premium Data Transfer

 Source Server         : localhost-root
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : localhost
 Source Database       : spring-blog

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : utf-8

 Date: 02/07/2017 19:55:25 PM
*/

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `post`
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `name` varchar(20) NOT NULL,
  `full_name` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fun_stuff` varchar(255),
  `other_stuff` varchar(255),
  `class_taken` varchar(512),
  `links` varchar(512),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_uindex` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14;

SET FOREIGN_KEY_CHECKS = 1;

