-- =========================================
-- FILE: customers.sql
-- Mục đích: Thực hành tạo bảng Customers
-- và viết các truy vấn phục vụ nghiệp vụ
-- Người thực hiện: Khải
-- =========================================


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


--2.  INSERT DỮ LIỆU MẪU
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


-- 3. CÁC TRUY VẤN SELECT (PHỤC VỤ NGHIỆP VỤ)

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
