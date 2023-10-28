---- drop ----
DROP TABLE IF EXISTS `group_table`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `todos`;
DROP TABLE IF EXISTS `user_todo`;
DROP TABLE IF EXISTS `user_group`;


---- create ----
create table IF not exists `group_table`
(
 `group_id`               INT(20) AUTO_INCREMENT,
 `name`             VARCHAR(20) NOT NULL,
 `detail`           VARCHAR(2000) ,
    PRIMARY KEY (`group_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

create table IF not exists `users`
(
 `user_id`               INT(20) AUTO_INCREMENT,
 `user_name`             VARCHAR(20) NOT NULL,
    PRIMARY KEY (`user_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

create table IF not exists `todos`
(
 `todo_id`               INT(20) AUTO_INCREMENT,
 `group_id`               INT(20) NOT NULL,
 `name`             VARCHAR(20) NOT NULL,
 `content`           VARCHAR(2000) ,
 `deadline`          DATETIME ,
    PRIMARY KEY (`todo_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

create table IF not exists `user_todo`
(
    `user_id`               INT(20) NOT NULL,
    `todo_id`               INT(20) NOT NULL,
    `is_done`               BOOLEAN NOT NULL,
        PRIMARY KEY (`todo_id`,`user_id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

create table IF not exists `user_group`
(
    `id`              INT(20) AUTO_INCREMENT,
    `user_id`               INT(20) NOT NULL,
    `group_id`               INT(20) NOT NULL,
        PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

