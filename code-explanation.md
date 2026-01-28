<<<<<<< HEAD
=======
-- =========================================
-- DATABASE: StoreManagement
-- TABLE: Customers
-- Mục tiêu:
-- - Lưu trữ thông tin khách hàng
-- - Phục vụ phân tích dữ liệu và báo cáo
-- =========================================


-- =========================================
-- 1. TẠO BẢNG CUSTOMERS
-- =========================================
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


-- =========================================
-- 2. INSERT DỮ LIỆU MẪU
-- =========================================
-- Dữ liệu được tạo có chủ đích để:
-- - Có nhiều quốc gia khác nhau
-- - Có nhiều thành phố khác nhau
-- - Có nhiều mốc thời gian đăng ký (2024, 2025)
-- => Phục vụ cho việc phân tích và thống kê

INSERT INTO Customers (first_name, last_name, email, city, country, join_date)
VALUES
('An', 'Nguyen', 'an.nguyen@gmail.com', 'Hanoi', 'Vietnam', '2024-12-15'),
('Binh', 'Tran', 'binh.tran@gmail.com', 'Ho Chi Minh', 'Vietnam', '2025-01-10'),
('Linh', 'Pham', 'linh.pham@gmail.com', 'Da Nang', 'Vietnam', '2025-02-05'),
('John', 'Smith', 'john.smith@gmail.com', 'New York', 'USA', '2024-11-20'),
('Emma', 'Brown', 'emma.brown@gmail.com', 'London', 'UK', '2025-01-18'),
('Ken', 'Tanaka', 'ken.tanaka@gmail.com', 'Tokyo', 'Japan', '2025-03-02');


-- =========================================
-- 3. CÁC TRUY VẤN SELECT CƠ BẢN
-- =========================================

-- 3.1 Lấy danh sách tất cả khách hàng
-- [Mục tiêu] Xem toàn bộ dữ liệu trong bảng Customers
SELECT * FROM Customers;


-- 3.2 Tìm khách hàng ở Việt Nam
-- [Mục tiêu] Phục vụ phân tích thị trường nội địa
SELECT *
FROM Customers
WHERE country = 'Vietnam';


-- 3.3 Tìm khách hàng đăng ký trong năm 2025
-- [Mục tiêu] Theo dõi tăng trưởng khách hàng theo thời gian
SELECT *
FROM Customers
WHERE YEAR(join_date) = 2025;


-- 3.4 Đếm số lượng khách hàng theo quốc gia
-- [Mục tiêu] So sánh quy mô thị trường giữa các quốc gia
SELECT country, COUNT(*) AS total_customers
FROM Customers
GROUP BY country;


-- 3.5 Đếm số lượng khách hàng theo thành phố tại Việt Nam
-- [Mục tiêu] Phân tích khu vực có nhiều khách hàng nhất tại Việt Nam
SELECT city, COUNT(*) AS total_customers
FROM Customers
WHERE country = 'Vietnam'
GROUP BY city;


-- 3.6 Tìm khách hàng đăng ký sớm nhất
-- [Mục tiêu] Xác định khách hàng đầu tiên của hệ thống
SELECT *
FROM Customers
ORDER BY join_date ASC
LIMIT 1;


-- 3.7 Tìm khách hàng đăng ký gần đây nhất
-- [Mục tiêu] Theo dõi khách hàng mới nhất
SELECT *
FROM Customers
ORDER BY join_date DESC
LIMIT 1;


-- =========================================
-- 4. PHÂN TÍCH & ĐÁNH GIÁ DỮ LIỆU
-- (PHẦN HIẾU BỔ SUNG)
-- =========================================

-- 4.1 Hiện tại hệ thống có bao nhiêu khách hàng?
-- [Mục tiêu]
-- Xác định tổng số khách hàng hiện có trong hệ thống

-- [Logic]
-- - COUNT(*) đếm tổng số bản ghi
-- - Mỗi bản ghi tương ứng với một khách hàng
SELECT COUNT(*) AS total_customers
FROM Customers;


-- 4.2 Khách hàng đăng ký tập trung nhiều nhất ở quốc gia nào?
-- [Mục tiêu]
-- Xác định quốc gia có số lượng khách hàng lớn nhất

-- [Logic]
-- - GROUP BY country để gom theo quốc gia
-- - COUNT(*) để đếm số khách hàng
-- - ORDER BY giảm dần để tìm giá trị lớn nhất
-- - LIMIT 1 lấy quốc gia đứng đầu
SELECT country, COUNT(*) AS total_customers
FROM Customers
GROUP BY country
ORDER BY total_customers DESC
LIMIT 1;


-- 4.3 Thành phố nào có nhiều khách hàng nhất?
-- [Mục tiêu]
-- Phân tích khu vực thành phố có mật độ khách hàng cao

SELECT city, COUNT(*) AS total_customers
FROM Customers
GROUP BY city
ORDER BY total_customers DESC
LIMIT 1;


-- 4.4 Lượng khách hàng mới tăng trưởng theo thời gian như thế nào?
-- [Mục tiêu]
-- Theo dõi xu hướng tăng trưởng khách hàng theo năm

-- [Logic]
-- - YEAR(join_date) trích xuất năm đăng ký
-- - GROUP BY theo năm
SELECT YEAR(join_date) AS year, COUNT(*) AS total_customers
FROM Customers
GROUP BY YEAR(join_date)
ORDER BY year;


-- 4.5 Thời điểm nào có lượng khách đăng ký cao hoặc thấp bất thường?
-- [Mục tiêu]
-- Phát hiện các giai đoạn đăng ký bất thường theo tháng

-- [Logic]
-- - Phân tích theo năm + tháng
-- - So sánh số lượng khách hàng giữa các mốc thời gian
SELECT
    YEAR(join_date) AS year,
    MONTH(join_date) AS month,
    COUNT(*) AS total_customers
FROM Customers
GROUP BY YEAR(join_date), MONTH(join_date)
ORDER BY year, month;


-- 4.6 Đánh giá chất lượng dữ liệu hiện tại
-- [Nhận xét]
-- - Dữ liệu hiện tại đủ cho phân tích cơ bản:
--   + Quy mô khách hàng
--   + Phân bố theo thời gian và khu vực
-- - Để phân tích sâu hơn, cần bổ sung:
--   + Giới tính, độ tuổi
--   + Trạng thái hoạt động của khách hàng
--   + Lịch sử mua hàng / giá trị đơn hàng
-- - Khi dữ liệu lớn, nên tạo INDEX cho join_date và country


---

-- =========================================
-- TABLE: Employees
-- Mục tiêu:
-- - Lưu trữ thông tin nhân viên
-- - Phục vụ quản lý nhân sự và phân tích dữ liệu
-- =========================================


-- =========================================
-- 1. CÁC TRUY VẤN SELECT PHÂN TÍCH NHÂN VIÊN
-- =========================================

-- 1.1 Có bao nhiêu nhân viên trong mỗi phòng ban?
-- [Mục tiêu]
-- Thống kê số lượng nhân viên theo từng department

-- [Logic]
-- - GROUP BY department để gom nhân viên theo phòng ban
-- - COUNT(*) để đếm số nhân viên trong mỗi nhóm

-- [Ghi chú]
-- - Kết quả giúp đánh giá quy mô từng phòng ban
SELECT department, COUNT(*) AS total_employees
FROM Employees
GROUP BY department;


-- 1.2 Nhân viên nào được tuyển gần đây nhất?
-- [Mục tiêu]
-- Xác định nhân viên mới nhất của công ty

-- [Logic]
-- - ORDER BY hire_date giảm dần (DESC)
-- - LIMIT 1 để lấy nhân viên có ngày tuyển gần nhất

-- [Ghi chú]
-- - Nếu có nhiều nhân viên cùng ngày tuyển, có thể bỏ LIMIT
SELECT *
FROM Employees
ORDER BY hire_date DESC
LIMIT 1;


-- 1.3 Mức lương trung bình theo từng department là bao nhiêu?
-- [Mục tiêu]
-- So sánh mức lương trung bình giữa các phòng ban

-- [Logic]
-- - AVG(salary) tính lương trung bình
-- - GROUP BY department để tính theo từng phòng ban

-- [Ghi chú]
-- - Có thể kết hợp HAVING để lọc phòng ban có lương cao/thấp
SELECT department, AVG(salary) AS avg_salary
FROM Employees
GROUP BY department;


-- 1.4 Nhân viên làm trên 2 năm có bao nhiêu người?
-- [Mục tiêu]
-- Đánh giá mức độ gắn bó của nhân viên với công ty

-- [Logic]
-- - So sánh hire_date với thời điểm hiện tại
-- - TIMESTAMPDIFF(YEAR, hire_date, CURDATE()) tính số năm làm việc
-- - Lọc nhân viên có thời gian làm việc > 2 năm

-- [Ghi chú]
-- - CURDATE() lấy ngày hiện tại của hệ thống database
SELECT COUNT(*) AS employees_over_2_years
FROM Employees
WHERE TIMESTAMPDIFF(YEAR, hire_date, CURDATE()) > 2;

---

-- =========================
-- 3. PRODUCTS ANALYSIS
-- Bảng Products dùng để quản lý thông tin sản phẩm
-- phục vụ phân tích tồn kho, giá cả và danh mục sản phẩm
-- =========================

CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    category VARCHAR(50),      -- Ví dụ: Electronics, Clothing, Books
    unit_price DECIMAL(10,2),  -- Giá bán của 1 sản phẩm
    stock_quantity INT         -- Số lượng tồn kho
);

-- =========================
-- 1. SẢN PHẨM SẮP HẾT HÀNG
-- Giả sử: sản phẩm sắp hết hàng khi tồn kho < 10
-- Mục đích: cảnh báo nhập thêm hàng
-- =========================

SELECT product_id, product_name, stock_quantity
FROM Products
WHERE stock_quantity < 10;

-- Giải thích:
-- WHERE stock_quantity < 10 lọc ra các sản phẩm có tồn kho thấp
-- Giúp bộ phận vận hành theo dõi rủi ro thiếu hàng


-- =========================
-- 2. CÓ BAO NHIÊU SẢN PHẨM TRONG MỖI CATEGORY
-- Mục đích: phân tích phân bố sản phẩm theo danh mục
-- =========================

SELECT category, COUNT(*) AS total_products
FROM Products
GROUP BY category;

-- Giải thích:
-- GROUP BY category gom các sản phẩm theo từng danh mục
-- COUNT(*) đếm số sản phẩm trong mỗi category


-- =========================
-- 3. CATEGORY CÓ GIÁ TRUNG BÌNH CAO NHẤT
-- Mục đích: xác định danh mục mang giá trị cao
-- =========================

SELECT category, AVG(unit_price) AS avg_price
FROM Products
GROUP BY category
ORDER BY avg_price DESC
LIMIT 1;

-- Giải thích:
-- AVG(unit_price) tính giá trung bình mỗi category
-- ORDER BY avg_price DESC sắp xếp từ cao xuống thấp
-- LIMIT 1 lấy category có giá trung bình cao nhất


-- =========================
-- 4. SẢN PHẨM CÓ GIÁ TRÊN 1 TRIỆU
-- (Giả sử đơn vị tiền là VND)
-- Mục đích: lọc các sản phẩm cao cấp
-- =========================

SELECT product_id, product_name, unit_price
FROM Products
WHERE unit_price > 1000000;

-- Giải thích:
-- WHERE unit_price > 1000000 lọc sản phẩm có giá cao
-- Thường dùng cho phân tích sản phẩm premium

---

-- =========================
-- 4. ORDERS ANALYSIS
-- Bảng Orders dùng để lưu thông tin đơn hàng
-- phục vụ phân tích doanh thu, hiệu suất nhân viên
-- và hành vi mua hàng của khách hàng
-- =========================

CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    employee_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    status VARCHAR(20),   -- Pending, Shipped, Delivered, Cancelled

    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

-- =========================
-- 1. CÓ BAO NHIÊU ĐƠN HÀNG THEO TỪNG TRẠNG THÁI
-- Mục đích: theo dõi tình trạng xử lý đơn hàng
-- =========================

SELECT status, COUNT(*) AS total_orders
FROM Orders
GROUP BY status;

-- Giải thích:
-- GROUP BY status gom các đơn hàng theo trạng thái
-- COUNT(*) đếm số đơn trong mỗi trạng thái
-- Giúp đánh giá backlog (Pending) hay đơn đã hoàn tất


-- =========================
-- 2. DOANH THU THEO NGÀY
-- Mục đích: theo dõi biến động doanh thu hằng ngày
-- =========================

SELECT order_date, SUM(total_amount) AS daily_revenue
FROM Orders
GROUP BY order_date
ORDER BY order_date;

-- Giải thích:
-- SUM(total_amount) tính tổng doanh thu trong ngày
-- GROUP BY order_date gom các đơn theo ngày đặt hàng


-- =========================
-- 3. DOANH THU THEO THÁNG
-- Mục đích: phân tích xu hướng kinh doanh theo thời gian
-- =========================

SELECT 
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    SUM(total_amount) AS monthly_revenue
FROM Orders
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;

-- Giải thích:
-- YEAR() và MONTH() trích xuất năm và tháng từ order_date
-- GROUP BY theo (năm, tháng) để tổng hợp doanh thu


-- =========================
-- 4. NHÂN VIÊN XỬ LÝ NHIỀU ĐƠN NHẤT
-- Mục đích: đánh giá hiệu suất làm việc của nhân viên
-- =========================

SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    COUNT(o.order_id) AS total_orders
FROM Orders o
JOIN Employees e ON o.employee_id = e.employee_id
GROUP BY e.employee_id, e.first_name, e.last_name
ORDER BY total_orders DESC
LIMIT 1;

-- Giải thích:
-- JOIN Orders với Employees để lấy thông tin nhân viên
-- COUNT(o.order_id) đếm số đơn mỗi nhân viên xử lý
-- ORDER BY DESC + LIMIT 1 tìm người xử lý nhiều đơn nhất


-- =========================
-- 5. KHÁCH HÀNG ĐẶT NHIỀU ĐƠN NHẤT
-- Mục đích: xác định khách hàng quan trọng (VIP)
-- =========================

SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    COUNT(o.order_id) AS total_orders
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_orders DESC
LIMIT 1;

-- Giải thích:
-- JOIN Orders với Customers để lấy thông tin khách hàng
-- COUNT(o.order_id) đếm số đơn mỗi khách hàng đặt
-- Giúp xác định khách hàng trung thành

---

Một đơn hàng có bao nhiêu sản phẩm?
- Tổng số lượng sản phẩm bán ra là bao nhiêu?
- Sản phẩm nào bán chạy nhất?
- Doanh thu theo từng sản phẩm là bao nhiêu?
- Doanh thu theo category?
>>>>>>> 4540bd08016e366cfb0356a04f145ba123677ee4



### 10 SQL EXERCISES
### 1. List all products ordered by price descending
SELECT product_name, category, unit_price
FROM Products
ORDER BY unit_price DESC;
    1️.1 SELECT:
        - Chọn dữ liệu muốn xem
        - Ở đây chọn:
            tên sản phẩm
            loại sản phẩm
            giá sản phẩm
    1.2 FROM Products
        - Lấy dữ liệu từ bảng Products
    1.3 ORDER BY unit_price
        - Sắp xếp theo cột unit_price (giá)
    1.4️ DESC
        - Sắp xếp giảm dần
### -- 2. Customers from USA or Canada
SELECT first_name, last_name, city, country
FROM Customers
WHERE country IN ('USA', 'Canada')
ORDER BY last_name;

    2.1 SELECT
     - Chọn các thông tin: tên, họ, thành phố, quốc gia.

    2.2 FROM Customers
        - Lấy dữ liệu từ bảng khách hàng.

    2.3 WHERE country IN ('USA', 'Canada')
        - Chỉ lấy khách hàng ở USA hoặc Canada.

    2.4ORDER BY last_name
        - Sắp xếp theo họ (A → Z).
### 3. Employees hired after 2023-01-01
SELECT CONCAT(first_name, ' ', last_name) AS full_name, department, hire_date
FROM Employees
WHERE hire_date > '2023-01-01';
- Giải thích:
    CONCAT() → nối họ + tên thành full_name

    AS full_name → đặt tên cột hiển thị

    WHERE hire_date > ... → lọc nhân viên được tuyển sau ngày đó

### 4. Shipped orders with customer & employee
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    o.order_date,
    o.total_amount,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Employees e ON o.employee_id = e.employee_id
WHERE o.status = 'Shipped';
- Giải thích:
    SELECT
    - chọn dữ liệu cần hiển thị.

    CONCAT(...)
    - ghép họ và tên lại thành một cột.

    FROM Orders o
    - lấy dữ liệu từ bảng đơn hàng.

    JOIN Customers
    - nối đơn hàng với bảng khách hàng
    - để biết đơn này của ai.

    JOIN Employees
    - nối đơn hàng với bảng nhân viên
    - để biết ai xử lý đơn hàng.

    WHERE o.status = 'Shipped'
    - chỉ lấy đơn hàng đã giao.

### 5. High-value customers (>500)
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    SUM(o.total_amount) AS total_spent
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_id
HAVING SUM(o.total_amount) > 500;
-Giải thích:
    SELECT
    - chọn dữ liệu cần hiển thị.

    CONCAT(...)
    - ghép họ và tên khách hàng.

    SUM(o.total_amount)
    - tính tổng số tiền khách đã chi.

    FROM Orders o
    - lấy dữ liệu từ bảng đơn hàng.

    JOIN Customers
    - nối đơn hàng với bảng khách hàng
    - để biết đơn hàng thuộc về ai.

    GROUP BY c.customer_id
    - gom các đơn hàng theo từng khách hàng.

    HAVING SUM(o.total_amount) > 500
    - chỉ lấy khách có tổng tiền mua > 500.

### 6. Top 5 best-selling products
SELECT
    p.product_name,
    SUM(oi.quantity) AS total_sold
FROM Order_Items oi
JOIN Products p ON oi.product_id = p.product_id
GROUP BY p.product_id
ORDER BY total_sold DESC
LIMIT 5;
Giải thích:
    SELECT
    - chọn dữ liệu cần hiển thị.

    p.product_name
    - tên sản phẩm.

    SUM(oi.quantity)
    - tính tổng số lượng sản phẩm đã bán.

    FROM Order_Items oi
    - lấy dữ liệu từ bảng chi tiết đơn hàng.

    JOIN Products
    - nối để biết tên sản phẩm tương ứng.

    GROUP BY p.product_id
    - gom dữ liệu theo từng sản phẩm.

    ORDER BY total_sold DESC
    - sắp xếp theo số lượng bán, nhiều đứng trước.

    LIMIT 5
    - chỉ lấy 5 sản phẩm đầu tiên.

### 7. Category summary with avg price > 50
SELECT
    category,
    AVG(unit_price) AS avg_price,
    SUM(stock_quantity) AS total_stock
FROM Products
GROUP BY category
HAVING AVG(unit_price) > 50;
Giải thích:
    SELECT
    - chọn dữ liệu cần hiển thị.

    category
    - tên loại sản phẩm.

    AVG(unit_price)
    - tính giá trung bình của từng loại.

    SUM(stock_quantity)
    - tính tổng số lượng tồn kho.

    FROM Products
    - lấy dữ liệu từ bảng sản phẩm.

    GROUP BY category
    - gom các sản phẩm theo từng danh mục.

    HAVING AVG(unit_price) > 50
    - chỉ lấy những danh mục có giá trung bình lớn hơn 50.
### 8. Customers with above-average orders
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
Giải thích:
    SELECT
    - chọn dữ liệu cần hiển thị.

    CONCAT(...)
    - ghép họ và tên khách hàng.

    COUNT(o.order_id)
    - đếm số đơn hàng của mỗi khách.

    FROM Customers c
    - lấy dữ liệu từ bảng khách hàng.

    JOIN Orders
    - nối với bảng đơn hàng để đếm số đơn.

    GROUP BY c.customer_id
    - gom dữ liệu theo từng khách hàng.

    HAVING COUNT(o.order_id) > (...)
    - chỉ lấy khách có số đơn nhiều hơn mức trung bình.

    Subquery (bên trong)
    - tính số đơn trung bình của tất cả khách hàng.

### 9. High-performing employees by revenue
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
Giải thích:
    SELECT
    - chọn dữ liệu cần hiển thị.

    CONCAT(...)
    - ghép họ và tên nhân viên.

    e.department
    - phòng ban của nhân viên.

    SUM(o.total_amount)
    - tính tổng doanh thu mà nhân viên tạo ra.

    FROM Orders o
    - lấy dữ liệu từ bảng đơn hàng.

    JOIN Employees
    - nối đơn hàng với bảng nhân viên.

    WHERE o.total_amount > (AVG)
    - chỉ tính các đơn có giá trị cao hơn mức trung bình.

    GROUP BY e.employee_id
    - gom doanh thu theo từng nhân viên.

    ORDER BY total_revenue DESC
    - sắp xếp nhân viên theo doanh thu giảm dần.

### 10. Product sales & low stock (last 30 days)
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
Giải thích:
    SELECT
    - chọn dữ liệu cần hiển thị.

    p.product_name, p.category
    - tên và loại sản phẩm.

    p.stock_quantity
    - số lượng tồn kho hiện tại.

    SUM(oi.quantity)
    - tổng số lượng sản phẩm đã bán.

    COALESCE(..., 0)
    - nếu chưa bán thì hiển thị 0 (không để NULL).

    CASE WHEN ... THEN ...
    - kiểm tra điều kiện giống if – else.
    - nếu tồn kho < 10 thì báo Yes (sắp hết hàng).

    LEFT JOIN
    - vẫn hiển thị sản phẩm kể cả chưa bán.

    o.order_date >= '2024-12-28'
    - chỉ tính đơn hàng trong 30 ngày gần nhất.

    GROUP BY p.product_id
    - gom dữ liệu theo từng sản phẩm.