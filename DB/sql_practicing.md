## Customers

### Mục đích bảng Customers
Bảng Customers dùng để lưu trữ thông tin khách hàng, phục vụ cho việc quản lý dữ liệu khách hàng, hỗ trợ các nghiệp vụ như quản lý đơn hàng, phân tích thị trường theo khu vực địa lý và theo thời gian đăng ký.

---

### Giải thích từng cột
- customer_id: Khóa chính, dùng để định danh duy nhất mỗi khách hàng trong hệ thống.
- first_name, last_name: Lưu thông tin tên khách hàng, phục vụ việc hiển thị và liên hệ.
- email: Thông tin liên hệ chính của khách hàng, được đặt ràng buộc UNIQUE để tránh trùng lặp tài khoản.
- city, country: Lưu thông tin khu vực địa lý, phục vụ cho việc phân tích khách hàng theo vùng.
- join_date: Lưu ngày khách hàng đăng ký, phục vụ thống kê và phân tích tăng trưởng theo thời gian.

---

### Tư duy thiết kế
- Sử dụng AUTO_INCREMENT cho customer_id để đảm bảo mỗi khách hàng có một định danh duy nhất và tránh trùng lặp.
- Không sử dụng email làm khóa chính vì email có thể thay đổi theo thời gian.
- Sử dụng kiểu dữ liệu DATE cho join_date vì nghiệp vụ chỉ cần quan tâm đến ngày đăng ký, không cần chính xác đến thời điểm.

---

### Câu hỏi 
Từ bảng Customers, hệ thống có thể trả lời các câu hỏi nghiệp vụ như:
- Hiện tại hệ thống có bao nhiêu khách hàng?
- Khách hàng đăng ký tập trung nhiều nhất ở quốc gia hoặc thành phố nào?
- Lượng khách hàng mới tăng trưởng như thế nào theo thời gian?
- Thời điểm nào có lượng khách đăng ký cao hoặc thấp bất thường?
- Dữ liệu khách hàng hiện tại đã đủ phục vụ phân tích hay cần bổ sung thêm thông tin?

## Employees

### Mục đích bảng Employees
- Bảng Employees dùng để lưu thông tin nhân viên của cửa hàng, phục vụ việc phân công xử lý đơn hàng, quản lý nhân sự và phân tích hiệu suất làm việc.

---

### Giải thích ý nghĩa từng cột
- employee_id: khóa chính, định danh duy nhất mỗi nhân viên
- first_name, last_name: lưu tên nhân viên để hiển thị và quản lý
- department: phòng ban làm việc (Sales, Support, Warehouse)
- hire_date: ngày nhân viên bắt đầu làm việc, phục vụ thống kê nhân sự
- salary: mức lương hiện tại của nhân viên

---

### Tư duy thiết kế
- Sử dụng AUTO_INCREMENT để tạo mã nhân viên tự động
- Không dùng tên làm khóa chính vì có thể trùng
- department để dạng VARCHAR thay vì ENUM để dễ mở rộng
- salary dùng DECIMAL để tránh sai số khi tính toán tiền

---

### Câu hỏi

- Có bao nhiêu nhân viên trong mỗi phòng ban?
- Nhân viên nào được tuyển gần đây nhất?
- Mức lương trung bình theo từng department là bao nhiêu?
- Nhân viên làm trên 2 năm có bao nhiêu người?

## Products

### Mục đích bảng Products
- Bảng Products dùng để lưu thông tin các sản phẩm được bán trong cửa hàng, phục vụ việc quản lý tồn kho, tính giá trị đơn hàng và phân tích doanh thu theo danh mục.

---

### Giải thích ý nghĩa từng cột
- product_id: khóa chính, định danh duy nhất mỗi sản phẩm
- product_name: tên sản phẩm để hiển thị cho khách hàng
- category: nhóm sản phẩm (Electronics, Clothing, Books…)
- unit_price: giá bán của 1 đơn vị sản phẩm
- stock_quantity: số lượng sản phẩm còn trong kho

---

### Tư duy thiết kế
- Không dùng product_name làm khóa chính vì có thể trùng tên
- category để VARCHAR thay vì tách bảng riêng để đơn giản hóa bài toán
- unit_price dùng DECIMAL để tránh sai số khi tính tiền
- stock_quantity dùng INT vì không có khái niệm nửa sản phẩm

---

### Câu hỏi
- Sản phẩm nào sắp hết hàng?
- Có bao nhiêu sản phẩm trong mỗi category?
- Category nào có giá trung bình cao nhất?
- Sản phẩm nào có giá trên 1 triệu?

## Orders

### Giải thích ý nghĩa từng cột
- Bảng Orders dùng để lưu thông tin các đơn hàng phát sinh trong hệ thống, liên kết khách hàng, nhân viên xử lý và giá trị đơn hàng để phục vụ vận hành và phân tích kinh doanh.

---

### Giải thích ý nghĩa từng cột
- order_id: khóa chính, định danh duy nhất mỗi đơn hàng
- customer_id: tham chiếu đến khách hàng đã đặt đơn
- employee_id: nhân viên phụ trách xử lý đơn hàng
- order_date: ngày đơn hàng được tạo
- total_amount: tổng giá trị của đơn hàng
- status: trạng thái xử lý của đơn hàng

---

### Tư duy thiết kế
- Orders tách riêng khỏi Order_Items để tránh lặp dữ liệu
- customer_id và employee_id dùng làm khóa ngoại để đảm bảo tính toàn vẹn
- total_amount được lưu để tối ưu báo cáo, không phải lúc nào cũng tính lại
- status để VARCHAR thay vì ENUM để linh hoạt mở rộng

---

### Trạng thái đơn hàng
- Pending: đơn mới tạo, chưa xử lý
- Shipped: đã gửi hàng
- Delivered: khách đã nhận
- Cancelled: đơn bị hủy

---

### Câu hỏi
- Có bao nhiêu đơn hàng theo từng trạng thái?
- Doanh thu theo ngày / tháng là bao nhiêu?
- Nhân viên nào xử lý nhiều đơn nhất?
- Khách hàng nào đặt nhiều đơn nhất?

## Order_Items

### Mục đích bảng Order_Items
- Bảng Order_Items dùng để lưu chi tiết các sản phẩm trong từng đơn hàng.
Mỗi dòng thể hiện một sản phẩm cụ thể được mua trong một đơn, bao gồm số lượng và giá tại thời điểm mua.

---

### Giải thích ý nghĩa từng cột
- order_item_id: khóa chính, định danh từng dòng chi tiết đơn hàng
- order_id: tham chiếu đến đơn hàng mà sản phẩm thuộc về
- product_id: tham chiếu đến sản phẩm được mua
- quantity: số lượng sản phẩm trong đơn
- unit_price_at_purchase: giá của sản phẩm tại thời điểm mua
    - Sao không dùng unit_price trong bảng Products?
        - vì: 
            - Giá sản phẩm có thể thay đổi theo thời gian
            - Cần lưu giá tại thời điểm mua để:
            - đảm bảo lịch sử đơn hàng
            - đối soát, báo cáo chính xác

---

### Tư duy thiết kế
- Order_Items là bảng trung gian giữa Orders và Products
- Một Order có thể có nhiều Order_Items
- Một Product có thể xuất hiện trong nhiều Order_Items
- unit_price_at_purchase được lưu để:
    - không phụ thuộc vào giá hiện tại trong Products
    - đảm bảo tính lịch sử của đơn hàng
- Không lưu total_price cho từng item để:
    - tránh dư thừa
    - có thể tính từ quantity * unit_price_at_purchase khi cần

---

### Nghiệp vụ thực tế
- Một đơn hàng có thể gồm:
    - 1 laptop
    - 2 chuột
    - 1 bàn phím
- Mỗi sản phẩm là 1 dòng trong Order_Items
- Khi hủy đơn → Order_Items vẫn tồn tại để lưu lịch sử

---

### Câu hỏi
- Một đơn hàng có bao nhiêu sản phẩm?
- Tổng số lượng sản phẩm bán ra là bao nhiêu?
- Sản phẩm nào bán chạy nhất?
- Doanh thu theo từng sản phẩm là bao nhiêu?
- Doanh thu theo category?

## Business Queries – Phân tích nghiệp vụ

### List all products

#### Mục đích nghiệp vụ
Truy vấn này dùng để xem danh sách toàn bộ sản phẩm hiện có trong hệ thống.  
Việc sắp xếp sản phẩm theo giá giảm dần giúp dễ dàng nhận biết các sản phẩm có giá trị cao, từ đó hỗ trợ việc phân tích danh mục sản phẩm, định vị sản phẩm chủ lực và ra quyết định kinh doanh.

#### Câu hỏi nghiệp vụ
- Sản phẩm nào hiện đang có giá cao nhất trong hệ thống?
- Các sản phẩm có giá cao thường tập trung vào nhóm (category) nào?
- Danh mục sản phẩm hiện tại có bị lệch quá nhiều về phân khúc giá cao hoặc giá thấp không?

---

### Find international customers (USA, Canada)

#### Mục đích nghiệp vụ
Truy vấn này dùng để xác định các khách hàng quốc tế đến từ Mỹ và Canada, nhằm phục vụ việc phân tích thị trường, đánh giá mức độ mở rộng ra nước ngoài và xây dựng chiến lược bán hàng theo khu vực địa lý.

Trong tương lai, khi số lượng quốc gia tăng lên, điều kiện lọc có thể được mở rộng hoặc thiết kế thêm bảng Countries riêng để quản lý danh sách quốc gia một cách linh hoạt hơn.

#### Câu hỏi nghiệp vụ
- Có bao nhiêu khách hàng đến từ mỗi quốc gia?
- Khách hàng quốc tế chiếm bao nhiêu phần trăm so với tổng số khách hàng?
- Thị trường Mỹ hay Canada đang mang lại nhiều khách hàng hơn?

---

### Recent hires (sau 01-01-2023)

#### Mục đích nghiệp vụ
Truy vấn này dùng để theo dõi các nhân viên mới được tuyển dụng sau ngày 01-01-2023, phục vụ công tác quản lý nhân sự, đánh giá tốc độ mở rộng nguồn lực và phân bổ nhân viên theo phòng ban.

Việc tập trung vào nhóm nhân viên mới giúp bộ phận quản lý nắm được xu hướng tuyển dụng trong giai đoạn gần đây.

#### Câu hỏi nghiệp vụ
- Phòng ban nào tuyển dụng nhiều nhân viên mới nhất trong thời gian gần đây?
- Nhân viên mới tập trung được tuyển vào giai đoạn thời gian nào?
- Tốc độ tuyển dụng hiện tại có phù hợp với kế hoạch mở rộng của công ty không?

## MEDIUM LEVEL – TƯ DUY NGHIỆP VỤ (KHÔNG SQL)

### Shipped orders with customer & employee names

#### Mục đích nghiệp vụ
Truy vấn này dùng để theo dõi các đơn hàng đã được giao đi, đồng thời xác định khách hàng đã mua sản phẩm và nhân viên nào chịu trách nhiệm xử lý đơn hàng đó.  
Thông tin này hỗ trợ việc theo dõi vận hành, đánh giá hiệu suất làm việc của nhân viên và đảm bảo trách nhiệm trong quá trình xử lý đơn hàng.

#### Tư duy thiết kế
- Bảng Orders chỉ lưu customer_id và employee_id để đảm bảo chuẩn hóa dữ liệu.
- Để hiển thị tên khách hàng và nhân viên, cần kết hợp dữ liệu từ bảng Customers và Employees thông qua JOIN.
- Trạng thái `status = 'Shipped'` được sử dụng để xác định các đơn hàng đã hoàn tất bước giao hàng.

#### Câu hỏi nghiệp vụ
- Nhân viên nào đang xử lý nhiều đơn hàng đã giao nhất?
- Tổng số đơn hàng đã được giao là bao nhiêu?
- Tổng giá trị của các đơn hàng đã giao đạt bao nhiêu?

---

### High-value customers

#### Mục đích nghiệp vụ
Truy vấn này dùng để xác định các khách hàng mang lại doanh thu cao cho hệ thống, phục vụ việc phân tích nhóm khách hàng VIP và xây dựng chiến lược chăm sóc, giữ chân khách hàng có giá trị cao.

#### Tư duy thiết kế
- Doanh thu của mỗi khách hàng được tính bằng tổng giá trị `total_amount` của các đơn hàng mà khách hàng đó đã thực hiện.
- Cần nhóm dữ liệu theo khách hàng (GROUP BY customer) để tính tổng doanh thu.
- Việc lọc khách hàng theo tổng doanh thu phải thực hiện sau khi đã tính toán, do đó sử dụng HAVING thay vì WHERE.

#### Câu hỏi nghiệp vụ
- Những khách hàng nào mang lại doanh thu cao nhất cho hệ thống?
- Có bao nhiêu khách hàng vượt mốc doanh thu 500?
- Nhóm khách hàng VIP chiếm bao nhiêu phần trăm tổng doanh thu?

---

### Top 5 best-selling products

#### Mục đích nghiệp vụ
Truy vấn này dùng để xác định các sản phẩm bán chạy nhất dựa trên tổng số lượng đã bán, từ đó hỗ trợ quyết định nhập kho, ưu tiên marketing và tối ưu chiến lược kinh doanh.

#### Tư duy thiết kế
- Thông tin số lượng bán nằm trong bảng Order_Items.
- Thông tin tên sản phẩm và category nằm trong bảng Products.
- Cần kết hợp dữ liệu giữa các bảng bằng JOIN và tính tổng số lượng bán bằng SUM(quantity).
- Kết quả được sắp xếp theo số lượng bán giảm dần và giới hạn Top 5 sản phẩm.

#### Câu hỏi nghiệp vụ
- Sản phẩm nào hiện đang bán chạy nhất?
- Top 5 sản phẩm bán chạy đóng góp bao nhiêu phần trăm tổng số lượng bán?
- Category nào có nhiều sản phẩm nằm trong danh sách bán chạy nhất?

---

### Category performance summary

#### Mục đích nghiệp vụ
Truy vấn này dùng để đánh giá hiệu suất của từng nhóm sản phẩm dựa trên mức giá trung bình và số lượng tồn kho, từ đó hỗ trợ quyết định tập trung vào các phân khúc có giá trị cao và tối ưu quản lý hàng hóa.

#### Tư duy thiết kế
- Dữ liệu phân tích nằm trong bảng Products.
- Nhóm sản phẩm theo category bằng GROUP BY.
- Sử dụng AVG(unit_price) để đánh giá phân khúc giá của từng category.
- Có thể sử dụng HAVING để lọc ra các category có mức giá trung bình cao.

#### Câu hỏi nghiệp vụ
- Category nào có giá bán trung bình cao nhất?
- Category nào có giá trị thấp nhưng tồn kho nhiều?
- Có nên giảm nhập kho hoặc điều chỉnh chiến lược với các category có hiệu suất thấp?

## HARD LEVEL – TƯ DUY NGHIỆP VỤ & THIẾT KẾ (KHÔNG SQL)

### Customers above average order count

#### Mục đích nghiệp vụ
Truy vấn này dùng để xác định các khách hàng có số lượng đơn hàng cao hơn mức trung bình của toàn hệ thống.  
Nhóm khách hàng này thường là những khách hàng trung thành hoặc có hành vi mua sắm nổi bật, rất quan trọng cho các chiến lược giữ chân và chăm sóc khách hàng.

#### Tư duy thiết kế
- Mỗi đơn hàng tương ứng với một bản ghi trong bảng Orders.
- Cần đếm số lượng đơn hàng theo từng khách hàng bằng cách nhóm dữ liệu theo customer.
- Để xác định “mức trung bình”, phải tính số đơn hàng trung bình trên mỗi khách hàng của toàn hệ thống.
- Sau đó so sánh số đơn của từng khách với giá trị trung bình này.
- Bài toán không thể giải quyết bằng một truy vấn đơn giản, cần sử dụng subquery để tính giá trị trung bình trước khi so sánh.

#### Câu hỏi nghiệp vụ
- Có bao nhiêu khách hàng mua hàng nhiều hơn mức trung bình?
- Nhóm khách hàng mua hàng nhiều hơn trung bình có đóng góp phần lớn doanh thu cho hệ thống không?
- Có nên xây dựng chương trình ưu đãi riêng cho nhóm khách hàng này không?

---

### High-performing employees (by revenue)

#### Mục đích nghiệp vụ
Truy vấn này dùng để đánh giá hiệu suất của nhân viên dựa trên doanh thu từ các đơn hàng mà họ xử lý, đặc biệt tập trung vào những đơn hàng có giá trị cao hơn mức trung bình của toàn hệ thống.  
Kết quả giúp doanh nghiệp đánh giá KPI, xác định nhân viên đang xử lý các đơn hàng “chất lượng” và phân bổ nguồn lực phù hợp.

#### Tư duy thiết kế
- Trước tiên cần tính giá trị trung bình của đơn hàng trên toàn hệ thống.
- Chỉ xét các đơn hàng có tổng giá trị lớn hơn mức trung bình để tập trung vào đơn giá trị cao.
- Doanh thu được gom theo từng nhân viên dựa trên các đơn hàng thỏa điều kiện.
- Cần kết hợp bảng Orders với bảng Employees để hiển thị thông tin nhân sự.
- Không sử dụng tất cả đơn hàng vì mục tiêu là đánh giá hiệu suất theo chất lượng đơn hàng, không phải số lượng.

#### Câu hỏi nghiệp vụ
- Nhân viên nào xử lý nhiều đơn hàng giá trị cao nhất?
- Doanh thu từ các đơn hàng giá trị cao chiếm bao nhiêu phần trăm tổng doanh thu?
- Hiệu suất giữa các nhân viên có chênh lệch lớn hay không?

---

### Product sales and stock status (last month)

#### Mục đích nghiệp vụ
Truy vấn này dùng để kết hợp dữ liệu bán hàng trong thời gian gần đây với tình trạng tồn kho hiện tại, nhằm phát hiện sớm các sản phẩm bán tốt nhưng có nguy cơ thiếu hàng.  
Thông tin này giúp bộ phận vận hành và kho chủ động lên kế hoạch nhập hàng, tránh gián đoạn kinh doanh.

#### Tư duy thiết kế
- Thông tin tồn kho hiện tại nằm trong bảng Products.
- Số lượng sản phẩm bán ra được lưu trong bảng Order_Items.
- Thời điểm bán hàng liên quan đến trường order_date trong bảng Orders.
- Cần kết hợp dữ liệu từ ba bảng Products, Order_Items và Orders thông qua JOIN.
- Chỉ xét các đơn hàng trong khoảng thời gian 30 ngày gần nhất để phản ánh xu hướng bán hiện tại.
- Có thể sử dụng biểu thức CASE WHEN để đánh dấu các sản phẩm có tồn kho thấp (low_stock).

#### Câu hỏi nghiệp vụ
- Những sản phẩm nào đang bán tốt trong tháng vừa qua nhưng tồn kho ở mức thấp?
- Có cần ưu tiên nhập kho cho các sản phẩm này để tránh thiếu hàng không?
- Nhóm sản phẩm nào có rủi ro cao nhất về tình trạng hết hàng trong thời gian tới?


----


