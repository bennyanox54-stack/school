CREATE DATABASE IF NOT EXISTS wamut_school
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_unicode_ci;

USE wamut_school;

CREATE TABLE students (
	student_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	full_name VARCHAR(150) NOT NULL,
	email VARCHAR(254) NOT NULL,
	registration_number VARCHAR(50) NOT NULL,
	course VARCHAR(150) NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (student_id),
	UNIQUE KEY uq_students_registration_number (registration_number),
	UNIQUE KEY uq_students_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
