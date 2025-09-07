Resume Builder Project
Overview

This is a Full-Stack Resume Builder application where users can register, login, and create a professional resume including sections like:

Summary

Experience

Skills

Education

Projects

Certifications

Achievements

Users can view their resume in a formatted layout and download it as a PDF. The application is built with:

Backend: Spring Boot, Java, MySQL

Frontend: HTML, CSS, JavaScript

Features

User registration and login

Create and update resume

Store multiple sections in MySQL database

Download resume as PDF

View all users and resumes

Prerequisites

Java 17+

Maven 3+

MySQL

Modern browser (Chrome, Firefox)

Database Configuration

Create MySQL database:

CREATE DATABASE resume_db;


Configure Spring Boot application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/resume_db
spring.datasource.username=root
spring.datasource.password=Sakshi@123

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

Running the Application

Open the project in IntelliJ IDEA or Eclipse.

Run ResumePlatformApplication.java.

Backend will start at http://localhost:8080.

Using Terminal:

Build the project:

mvn clean install


Run the project:

mvn spring-boot:run


Access backend at http://localhost:8080.

Frontend

Open index.html or resume.html in a browser.

Make sure backend is running at http://localhost:8080.

API Endpoints

POST /api/users/create – Register new user

POST /api/users/login – Login

PUT /api/users/{id}/resume – Update resume

GET /api/users – Get all users

GET /api/users/{id} – Get user by ID
