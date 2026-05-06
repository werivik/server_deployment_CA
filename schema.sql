/* 
This is the DB schema I used inside my MySQL workbench!
*/

CREATE DATABASE IF NOT EXISTS census;
USE census;

CREATE TABLE IF NOT EXISTS participants (
    email VARCHAR(255) PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    dob DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS work (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    companyname VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    FOREIGN KEY (email) REFERENCES participants(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS home (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    FOREIGN KEY (email) REFERENCES participants(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT IGNORE INTO users (login, password) VALUES ('admin', 'P4ssword');