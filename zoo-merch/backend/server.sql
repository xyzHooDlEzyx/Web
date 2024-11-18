CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    descriptionSmall TEXT,
    price DECIMAL(10, 2) NOT NULL,
    alterText VARCHAR(255),
    imgSrc VARCHAR(255)
);
