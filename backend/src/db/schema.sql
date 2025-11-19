/* create schema (tables, constraints, keys, etc.) */

-- This file will create the tables needed to display data


DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS project_items;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS users;

-- Table for user data
CREATE TABLE users (
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    discount NUMERIC(2,1) DEFAULT 0.0
);


-- Table for vendor data
CREATE TABLE vendors (
    vendor_id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    industry VARCHAR(100) DEFAULT NULL
);


-- Table for product data
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_use VARCHAR(25),
    vendor_id INT,
    price NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
);


-- Table for project templates
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- Table for items within the project template
CREATE TABLE project_items (
    project_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    PRIMARY KEY (project_id, product_id)
);

-- Table for tracking items in the cart, per user
CREATE TABLE cart_items (
    user_id INT NOT NULL,
    product_id INT NOT NULL, 
    quanitiy INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    PRIMARY KEY (user_id, product_id)
);