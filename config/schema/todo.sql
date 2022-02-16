create database if not exists todo;

use todo;

create table Tasks (
    taskID int auto_increment primary key,
    title varchar(255),
    description varchar(255),
    `date` date,
    status enum ("FAILED", "COMPLETED", "PENDING")
);