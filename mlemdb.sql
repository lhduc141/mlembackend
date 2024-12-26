-- Tạo database nếu chưa tồn tại
CREATE DATABASE IF NOT EXISTS mlemdb;

-- Chọn database
USE mlemdb;

-- Tạo bảng Role
CREATE TABLE Role (
    roleId INT PRIMARY KEY AUTO_INCREMENT,
    roleName VARCHAR(255)
);

-- Tạo bảng User
CREATE TABLE User (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    roleId INT,
    userName VARCHAR(255),
    userEmail VARCHAR(255) UNIQUE,
    userPassword VARCHAR(255),
    userPhone VARCHAR(20),
    userAddress TEXT,
    FOREIGN KEY (roleId) REFERENCES Role(roleId)
);

-- Tạo bảng Category
CREATE TABLE Category (
    categoryId INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(255)
);

-- Tạo bảng MenuItem
CREATE TABLE MenuItem (
    itemId INT PRIMARY KEY AUTO_INCREMENT,
    categoryId INT,
    itemName VARCHAR(255),
    itemPrice DECIMAL(10, 2),
    itemDescription TEXT,
    itemImage VARCHAR(255),
    FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
);

-- Tạo bảng Order (ĐÃ SỬA: dùng backticks)
CREATE TABLE `Order` (
    orderId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    orderDate DATETIME,
    orderStatus VARCHAR(50),
    FOREIGN KEY (userId) REFERENCES User(userId)
);

-- Tạo bảng OrderItem
CREATE TABLE OrderItem (
    orderItemId INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT,
    itemId INT,
    quantity INT,
    FOREIGN KEY (orderId) REFERENCES `Order`(orderId), -- ĐÃ SỬA: dùng backticks
    FOREIGN KEY (itemId) REFERENCES MenuItem(itemId)
);

-- Thêm dữ liệu cho bảng Role
INSERT INTO Role (roleName) VALUES ('admin');
INSERT INTO Role (roleName) VALUES ('customer');

-- Thêm thông tin admin (vẫn dùng MD5 cho demo, NHỚ THAY THẾ!)
INSERT INTO User (roleId, userName, userEmail, userPassword, userPhone, userAddress)
VALUES (
    (SELECT roleId FROM Role WHERE roleName = 'admin'),
    'Admin',
    'lhduc141@gmail.com',
    '140103',
    '0123456789',
    'Địa chỉ admin'
);

-- Thêm các user khác (vẫn dùng MD5 cho demo, NHỚ THAY THẾ!)
INSERT INTO User (roleId, userName, userEmail, userPassword, userPhone, userAddress)
VALUES (2, 'Tien Luan', 'tienluan@gmail.com', '123345', '9876543210', 'User Address 1');

INSERT INTO User (roleId, userName, userEmail, userPassword, userPhone, userAddress)
VALUES (2, 'User 3', 'user3@gmail.com', '123345', '1112223334', 'User Address 2');

-- Thêm dữ liệu cho bảng Category
INSERT INTO Category (categoryName) VALUES ('Fried Snacks');
INSERT INTO Category (categoryName) VALUES ('Rolls and Skewers');
INSERT INTO Category (categoryName) VALUES ('Korean Dishes');
INSERT INTO Category (categoryName) VALUES ('Desserts and Sweets');
INSERT INTO Category (categoryName) VALUES ('Beverages');

-- Thêm dữ liệu cho bảng MenuItem
INSERT INTO MenuItem (categoryId, itemName, itemPrice, itemDescription) VALUES
(1, 'Cheese Powdered Fried Chicken Bites', 45000, 'A delicious snack with crispy chicken and cheesy flavor.'),
(1, 'Cheese Powdered French Fries', 35000, 'French fries with a delightful cheesy powder coating.'),
(1, 'Crispy Sausage Sticks', 30000, 'Savory and satisfying sausage sticks perfect for a quick bite.'),
(1, 'Crispy Fried Tokbokki', 40000, 'Spicy and chewy rice cakes with a crispy fried exterior.'),
(2, 'Fresh Rice Noodle Rolls with Tamarind Sauce', 45000, 'Refreshing rice noodle rolls with a tangy tamarind dipping sauce.'),
(2, 'BBQ Skewers', 30000, 'Grilled skewers with savory BBQ flavors.'),
(2, 'Rice Paper Rolls with Butter and Egg Sauce', 35000, 'Savory rice paper rolls with a creamy butter and egg sauce.'),
(2, 'Fried Fermented Pork (Nem Chua)', 40000, 'Tangy and flavorful fried fermented pork.'),
(3, 'Crispy Fried Kimbap', 50000, 'Crispy fried seaweed rice rolls with various fillings.'),
(3, 'Mini Bibimbap (Korean Mixed Rice)', 55000, 'A flavorful bowl of mixed rice with vegetables, meat, and a fried egg.'),
(3, 'Korean Sweet and Spicy Fried Chicken', 60000, 'Crispy fried chicken coated in a sweet and spicy sauce.'),
(3, 'Korean Fish Cake Skewers (Eomuk)', 35000, 'Savory fish cake skewers cooked in a flavorful broth.'),
(4, 'Cheese Cream Puffs', 25000, 'Light and airy cream puffs filled with a creamy cheese filling.'),
(4, 'Mochi Ice Cream', 40000, 'Chewy mochi filled with delicious ice cream.'),
(4, 'Brown Sugar Bubble Milk Tea', 40000, 'A sweet and refreshing milk tea with chewy tapioca pearls.'),
(4, 'Yogurt Pudding with Tapioca Pearls', 35000, 'Creamy yogurt pudding with chewy tapioca pearls.'),
(5, 'Fruit-Infused Almond Jelly Dessert', 40000, 'A refreshing dessert with almond jelly and infused fruit flavors.'),
(5, 'Honey Lemon Lemongrass Drink', 30000, 'A soothing and refreshing drink with honey, lemon, and lemongrass.'),
(5, 'Peach Tea with Orange and Lemongrass', 35000, 'A fruity and aromatic tea with peach, orange, and lemongrass.'),
(5, 'Tropical Fruit Soda', 35000, 'A refreshing and bubbly drink with tropical fruit flavors.');