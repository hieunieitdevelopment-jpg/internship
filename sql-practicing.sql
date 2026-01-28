-- =====================================================
-- StoreManagement - SQL Practicing
-- Author: Hieu & Khai
-- Description: SQL exercises from Easy to Hard level
-- =====================================================


-- =========================
-- EASY LEVEL
-- =========================

-- 1. List all products
-- Display product_name, category, unit_price
-- Sort by unit_price descending
SELECT
    product_name,
    category,
    unit_price
FROM Products
ORDER BY unit_price DESC;


-- 2. Find international customers
-- Customers from USA or Canada
-- Sort by last_name
SELECT
    first_name,
    last_name,
    city,
    country
FROM Customers
WHERE country IN ('USA', 'Canada')
ORDER BY last_name ASC;


-- 3. Recent hires
-- Employees hired after January 1, 2023
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    department,
    hire_date
FROM Employees
WHERE hire_date > '2023-01-01';



-- =========================
-- MEDIUM LEVEL
-- =========================

-- 4. Shipped orders with customer and employee names
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    o.order_date,
    o.total_amount,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Employees e ON o.employee_id = e.employee_id
WHERE o.status = 'Shipped';


-- 5. High-value customers
-- Customers with total revenue greater than 500
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    SUM(o.total_amount) AS total_revenue
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING SUM(o.total_amount) > 500
ORDER BY total_revenue DESC;


-- 6. Top 5 best-selling products
SELECT
    p.product_name,
    p.category,
    SUM(oi.quantity) AS total_quantity_sold
FROM Order_Items oi
JOIN Products p ON oi.product_id = p.product_id
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_quantity_sold DESC
LIMIT 5;


-- 7. Category performance summary
SELECT
    category,
    AVG(unit_price) AS avg_unit_price,
    SUM(stock_quantity) AS total_stock
FROM Products
GROUP BY category
HAVING AVG(unit_price) > 50
ORDER BY avg_unit_price DESC;



-- =========================
-- HARD LEVEL
-- =========================

-- 8. Customers above average order count
SELECT
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS order_count
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
HAVING COUNT(o.order_id) >
(
    SELECT AVG(order_count)
    FROM (
        SELECT COUNT(order_id) AS order_count
        FROM Orders
        GROUP BY customer_id
    ) AS avg_orders
);


-- 9. High-performing employees (by revenue)
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
GROUP BY e.employee_id, e.first_name, e.last_name, e.department
ORDER BY total_revenue DESC;


-- 10. Product sales and stock status (last 30 days)
SELECT
    p.product_name,
    p.category,
    p.stock_quantity,
    COALESCE(SUM(oi.quantity), 0) AS units_sold_last_30_days,
    CASE
        WHEN p.stock_quantity < 10 THEN 'Yes'
        ELSE 'No'
    END AS low_stock
FROM Products p
LEFT JOIN Order_Items oi ON p.product_id = oi.product_id
LEFT JOIN Orders o ON oi.order_id = o.order_id
    AND o.order_date >= '2025-12-28'
GROUP BY
    p.product_id,
    p.product_name,
    p.category,
    p.stock_quantity;
