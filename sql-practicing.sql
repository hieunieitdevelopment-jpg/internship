-- Mục đích: Thực hành tạo bảng Customers
-- và viết các truy vấn phục vụ nghiệp vụ
-- Người thực hiện: Khải

-- 1. TẠO BẢNG CUSTOMERS
-- Bảng dùng để lưu thông tin khách hàng
-- phục vụ quản lý và phân tích dữ liệu

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    city VARCHAR(50),
    country VARCHAR(50),
    join_date DATE
);

-- 2️. INSERT DỮ LIỆU MẪU
-- Dữ liệu có chủ đích:
-- - Có nhiều quốc gia
-- - Có nhiều thành phố
-- - Có nhiều năm đăng ký (2024, 2025)

INSERT INTO Customers (first_name, last_name, email, city, country, join_date)
VALUES
('An', 'Nguyen', 'an.nguyen@gmail.com', 'Hanoi', 'Vietnam', '2024-12-15'),
('Binh', 'Tran', 'binh.tran@gmail.com', 'Ho Chi Minh', 'Vietnam', '2025-01-10'),
('Linh', 'Pham', 'linh.pham@gmail.com', 'Da Nang', 'Vietnam', '2025-02-05'),
('John', 'Smith', 'john.smith@gmail.com', 'New York', 'USA', '2024-11-20'),
('Emma', 'Brown', 'emma.brown@gmail.com', 'London', 'UK', '2025-01-18'),
('Ken', 'Tanaka', 'ken.tanaka@gmail.com', 'Tokyo', 'Japan', '2025-03-02');


-- 3️. CÁC TRUY VẤN SELECT (PHỤC VỤ NGHIỆP VỤ)

-- 3.1 Lấy danh sách tất cả khách hàng
SELECT * FROM Customers;


-- 3.2 Tìm khách hàng ở Việt Nam
-- Phục vụ phân tích thị trường nội địa
SELECT *
FROM Customers
WHERE country = 'Vietnam';


-- 3.3 Tìm khách hàng đăng ký trong năm 2025
-- Phục vụ theo dõi tăng trưởng khách hàng theo thời gian
SELECT *
FROM Customers
WHERE YEAR(join_date) = 2025;


-- 3.4 Đếm số lượng khách hàng theo quốc gia
-- So sánh quy mô thị trường giữa các quốc gia
SELECT country, COUNT(*) AS total_customers
FROM Customers
GROUP BY country;


-- 3.5 Đếm số lượng khách hàng theo thành phố tại Việt Nam
-- Phân tích khu vực có nhiều khách hàng nhất
SELECT city, COUNT(*) AS total_customers
FROM Customers
WHERE country = 'Vietnam'
GROUP BY city;


-- 3.6 Tìm khách hàng đăng ký sớm nhất
-- Xác định khách hàng đầu tiên của hệ thống
SELECT *
FROM Customers
ORDER BY join_date ASC
LIMIT 1;


-- 3.7 Tìm khách hàng đăng ký gần đây nhất
-- Theo dõi khách hàng mới
SELECT *
FROM Customers
ORDER BY join_date DESC
LIMIT 1;



/* =====================================================
   SQL PRACTICING FULL FILE
   Author: Khai
   Description: Database practice with Customers, Employees,
                Products, Orders, Order_Items + 10 exercises
   ===================================================== */

DROP DATABASE IF EXISTS shop_db;
CREATE DATABASE shop_db;
USE shop_db;

/* =====================================================
   1. TABLE: Customers
   ===================================================== */
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(50),
    country VARCHAR(50)
);

/* =====================================================
   2. TABLE: Employees
   ===================================================== */
CREATE TABLE Employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department VARCHAR(50),
    hire_date DATE,
    salary DECIMAL(10,2)
);

/* =====================================================
   3. TABLE: Products
   ===================================================== */
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    category VARCHAR(50),
    unit_price DECIMAL(10,2),
    stock_quantity INT
);

/* =====================================================
   4. TABLE: Orders
   ===================================================== */
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    employee_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

/* =====================================================
   5. TABLE: Order_Items
   ===================================================== */
CREATE TABLE Order_Items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price_at_purchase DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

/* =====================================================
   INSERT SAMPLE DATA
   ===================================================== */

INSERT INTO Customers (first_name, last_name, email, phone, city, country) VALUES
('John', 'Doe', 'john@example.com', '123456', 'New York', 'USA'),
('Anna', 'Smith', 'anna@example.com', '654321', 'Toronto', 'Canada'),
('Minh', 'Nguyen', 'minh@example.com', '098765', 'Da Nang', 'Vietnam');

INSERT INTO Employees (first_name, last_name, department, hire_date, salary) VALUES
('Alice', 'Brown', 'Sales', '2022-05-01', 1200),
('Bob', 'Lee', 'Support', '2023-03-15', 900),
('Chris', 'Tran', 'Warehouse', '2024-01-10', 800);

INSERT INTO Products (product_name, category, unit_price, stock_quantity) VALUES
('Laptop', 'Electronics', 1200, 15),
('T-Shirt', 'Clothing', 25, 200),
('Book SQL', 'Books', 60, 50),
('Headphones', 'Electronics', 150, 30),
('Jacket', 'Clothing', 80, 40);

INSERT INTO Orders (customer_id, employee_id, order_date, total_amount, status) VALUES
(1, 1, '2025-01-10', 1350, 'Shipped'),
(2, 2, '2025-01-15', 160, 'Delivered'),
(1, 1, '2025-01-20', 80, 'Pending');

INSERT INTO Order_Items (order_id, product_id, quantity, unit_price_at_purchase) VALUES
(1, 1, 1, 1200),
(1, 4, 1, 150),
(2, 5, 2, 80),
(3, 2, 3, 25);

/* =====================================================
   10 SQL EXERCISES
   ===================================================== */

-- 1. List all products ordered by price descending
SELECT product_name, category, unit_price
FROM Products
ORDER BY unit_price DESC;

-- 2. Customers from USA or Canada
SELECT first_name, last_name, city, country
FROM Customers
WHERE country IN ('USA', 'Canada')
ORDER BY last_name;

-- 3. Employees hired after 2023-01-01
SELECT CONCAT(first_name, ' ', last_name) AS full_name, department, hire_date
FROM Employees
WHERE hire_date > '2023-01-01';

-- 4. Shipped orders with customer & employee
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    o.order_date,
    o.total_amount,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Employees e ON o.employee_id = e.employee_id
WHERE o.status = 'Shipped';

-- 5. High-value customers (>500)
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    SUM(o.total_amount) AS total_spent
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_id
HAVING SUM(o.total_amount) > 500;

-- 6. Top 5 best-selling products
SELECT
    p.product_name,
    SUM(oi.quantity) AS total_sold
FROM Order_Items oi
JOIN Products p ON oi.product_id = p.product_id
GROUP BY p.product_id
ORDER BY total_sold DESC
LIMIT 5;

-- 7. Category summary with avg price > 50
SELECT
    category,
    AVG(unit_price) AS avg_price,
    SUM(stock_quantity) AS total_stock
FROM Products
GROUP BY category
HAVING AVG(unit_price) > 50;

-- 8. Customers with above-average orders
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS order_count
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
HAVING COUNT(o.order_id) >
(
    SELECT AVG(order_cnt)
    FROM (
        SELECT COUNT(order_id) AS order_cnt
        FROM Orders
        GROUP BY customer_id
    ) t
);

-- 9. High-performing employees by revenue
SELECT
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    e.department,
    SUM(o.total_amount) AS total_revenue
FROM Orders o
JOIN Employees e ON o.employee_id = e.employee_id
WHERE o.total_amount >
(
    SELECT AVG(total_amount)
    FROM Orders
)
GROUP BY e.employee_id
ORDER BY total_revenue DESC;

-- 10. Product sales & low stock (last 30 days)
SELECT
    p.product_name,
    p.category,
    p.stock_quantity,
    COALESCE(SUM(oi.quantity), 0) AS units_sold,
    CASE
        WHEN p.stock_quantity < 10 THEN 'Yes'
        ELSE 'No'
    END AS low_stock
FROM Products p
LEFT JOIN Order_Items oi ON p.product_id = oi.product_id
LEFT JOIN Orders o
    ON oi.order_id = o.order_id
    AND o.order_date >= '2024-12-28'
GROUP BY p.product_id;
