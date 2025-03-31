use merch_shop; 

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    descriptionSmall TEXT,
    price DECIMAL(10, 2) NOT NULL,
    alterText VARCHAR(255),
    imgSrc VARCHAR(255),
    sizes VARCHAR(255),
    quantity INT DEFAULT 0
);


INSERT INTO products (title, description, descriptionSmall, price, alterText, imgSrc, sizes, quantity)
VALUES 
('Cursed giraffe', 'He just begs you to kill him out of mercy with a chainsaw.', 'He just begs you to kill him out of mercy with a chainsaw.', 30.00, 'giraffe', '/cursed-giraffe.png', NULL, 100),
('ZOOKEEPER mug', 'You can drink coffee from this mug made by monkeys enslaved for manufacturing them and feel the greatness of humanity.', 'Drink coffee from this mug and feel supremacy of humanity.', 10.00, 'mug', '/1_18.png', '350 ml, 250 ml', 200),
('Cap', 'This can be quite unexpected but this is a normal cap.', 'This can be quite unexpected but this is a normal cap.', 15.00, 'cap', '/Prod-10.png', 'XL, L, M, S', 150),
('Elephant Plush Toy', 'A soft and cuddly plush toy of an elephant, perfect for kids and adults alike.', 'A soft plush elephant toy.', 25.00, 'elephant plush', '/elephant-plush.png', NULL, 150),
('Lion T-shirt', 'A comfortable cotton T-shirt with a fierce lion print. Show off your wild side!', 'Cotton T-shirt with a lion print.', 20.00, 'lion t-shirt', '/lion-t-shirt.png', 'XL, L, M, S', 100),
('Giraffe Socks', 'Fun and quirky giraffe-patterned socks that will make your feet stand out.', 'Quirky giraffe socks.', 8.00, 'giraffe socks', '/giraffe-socks1.png', '40-42, 38-40, 36-38', 300),
('Panda Notebook', 'A cute notebook with a panda cover, perfect for jotting down your wild ideas and small gifts for you.', 'Notebook with a panda cover with gifts.', 12.00, 'panda notebook', '/panda-notebook.png', '60 pages, 120 pages, 240 pages', 50),
('Penguin Water Bottle', 'Stay hydrated with this adorable penguin-themed water bottle. BPA-free and eco-friendly.', 'Penguin water bottle, BPA-free.', 18.00, 'penguin bottle', '/penguin-bottle.png', '750 ml, 1l', 150),
('Tiger Backpack', 'A rugged backpack with a tiger print, perfect for adventurers and nature lovers.', 'Backpack with tiger print.', 35.00, 'tiger backpack', '/tiger-backpack.png', '11L, 12L, 15L ', 75),
('Zebra Keychain', 'A small but charming keychain with a zebra design, ideal for animal lovers.', 'Zebra keychain.', 5.00, 'zebra keychain', '/zebra-keychain.png', NULL, 500);
