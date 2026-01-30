### Hôm nay em tiếp tục bổ sung phần hôm qua còn thiếu

---
# EXPRESS.JS
## Express.js là gì?
- Express.js là một web framework run trên Node.js, giúp build:
    - web server
    - REST API
    - Backend cho frontend / mobile app
- Express.js về bản chất là class trung gian giữa client và server, có mission tiếp nhận mọi HTTP request gửi vào system. khi có request đến, Express sẽ lắng nghe, phân tích xem request đó đang access vào đường dẫn nào, nó use HTTP method gì (GET, POST, PUT, DELETE)từ đó giao request này cho đúng function handle tương ứng. sau khi hoàn thành job nó sẽ gửi lại kết quả và pack thành response để gửi trả về cho client.
- Express không trực tiếp handle logic nghiệp vụ, nó không quyết định dữ liệu đúng hay sai, Express chỉ đóng role điều phối luồng request–response: nhận vào, chuyển đúng chỗ, và trả kết quả ra ngoài. việc còn lại phải tự viết rất nhiều code để xử lý routing, parse dữ liệu, manage request và response một cách thủ công
- Express giúp:
    - Định tuyến (routing)
    - Xử lý request / response
    - Middleware
    - Tách code rõ ràng, dễ bảo trì

## REST API là gì?
- REST API là quy ước thiết kế API, REST coi mọi thứ trong system là resources và biểu diễn chúng bằng URL(VD: users or users/:id ), URL chỉ đại diện cho resources, còn 
act lên resources quyết định bởi HTTP method 

- REST:
    - GET: use để read data
    - POST: create resources
    - PUT: update resources
    - DELETE: delete resources
- trong trường hợp client call GET /users server hiểu là lấy list user, còn lại sẽ tương đương
- điểm mạnh help thiết kế API rõ ràng nhất quán và dễ đoán, frontend chỉ cần nhìn method và URL là hiểu nghiệp vụ, backend dễ bảo trì và mở rộng khi hệ thống lớn dần.

---

## req.params, req.query, req.body
- req.params dùng để identify chính xác resources mà client muốn operation, data nằm trong URL và thường bắt buộc
    - vd: GET /users/5 thì 5 ở đây chỉ dùng đẻ chỉ ra user cụ thể đang truy cập, trường hợp không có params thì server không biết ddag wolk với object nào
- req.query dùng cho điều kiện phụ, không làm thay đổi bản chất của resources. Nó thường phục vụ việc lọc, search, sắp xếp hoặc phân trang.
    - vd: ví dụ GET /users?role=admin&page=1. Dù có hay không có query, resources vẫn là users, chỉ khác cách hiển thị kết quả.
- req.body dùng để gửi data để server handle hoặc lưu trữ. Đây là nơi chứa thông tin chính khi create hoặc update resources
    - ví dụ khi POST /users, data như tên hay tuổi được đặt trong body vì chúng không phù hợp để đưa lên URL và thường có cấu trúc phức tạp.

---

# Middleware
## Middleware là gì?
- Middleware trong Express là các function nằm trên đường đi của request, run sau khi server nhận request và trước khi trả response, mỗi lần request sẽ đi qua middleware theo thứ tự, tại đay middleware có thể read hoặc edit req, res, kiểm tra điều kiện như đăng nhập , nếu mọi thứ hợp lệ middleware call next() để cho request đi tiếp tới middleware hoặc route phía sau.

## Thứ tự middleware
- Middleware chạy theo thứ tự khai báo trong code.
- Middleware viết trước chạy trước.

## Custom Middleware
- là function tự write để handle request trước khi vào route chính nó có thể read hoặc edit req, kiểm tra điều kiện, rồi call next() để cho request đi tiếp hoặc stop và trả response

## Log request middleware
- Middleware log request được dùng để theo dõi mọi request đi vào server. Mỗi khi client gửi request, middleware này sẽ run đầu tiên, ghi lại HTTP method (GET, POST,…), URL mà client call và thời điểm request xảy ra

## Check auth middleware
- Check auth middleware dùng để chặn các request chưa đăng nhập. Nếu thông tin xác thực hợp lệ thì call next() cho request đi tiếp, còn nếu không hợp lệ thì trả về 401 Unauthorized và kết thúc request.

## 
- nhận 4 tham số (err, req, res, next). Nó được use để gom toàn bộ lỗi về một chỗ, handle lỗi tập trung thay vì rải rác trong từng route, giúp server không bị crash và trả về lỗi

---

# Project structure
## Vì sao phải tách project structure
- Tách project structure giúp control độ phức tạp của code. Nếu không tách, route và logic sẽ bị trộn lẫn, code dài, khó đọc, khó test và khó mở rộng.việc tách file để mõi file có một responsibility, help code rõ ràng, dễ bảo trì

## routes/ – điều hướng request
- là nơi nhận HTTP request, mission của nó chỉ là map URL với controller 

## controllers/ – điều phối xử lý
- controllers nhận req và res từ route, thực hiện validate dữ liệu cơ bản, call service để handle nghiệp vụ và trả response cho client

## services/ – xử lý nghiệp vụ
- services là nơi chứa business logic system, như tạo user, kiểm tra điều kiện, handle transaction

## models/ – làm việc với dữ liệu
- models chịu responsibility tương tác với database: định nghĩa cấu trúc data, query DB, làm việc với ORM hoặc SQL

## middlewares/ – xử lý dùng chung
- middlewares chứa các logic dùng lại cho nhiều route như log request, kiểm tra đăng nhập, phân quyền, xử lý lỗi.

## Vì sao KHÔNG viết SQL trong route?
- Route chỉ có mission điều hướng request, không phải handle database. Nếu viết SQL trong route, lẫn lộn logic, khó test, khó tái sử dụng và khó refactor.

---

# DATABASE
## Vì sao chọn PostgreSQL?
- PostgreSQL là handle data có cấu trúc, ràng buộc chặt chẽ và phức tạp, đảm bảo ACID nên data luôn nhất quán và an toàn, Nó hỗ trợ query nâng cao, transaction tốt, dễ mở rộng và được dùng rất nhiều trong môi trường doanh nghiệp

## Kết nối DB bằng env
- kết nối database bằng biến môi trường là tách cấu hình ra khỏi code điều này help không bị lộ thông tin như host, user, password, database bằng cách đặt ở bên ngoài thông qua .env.

## Model / Schema
- là mô tả data trong code để mapping với table trong database, định nghĩa được table có những cột gì, kiểu data ra sao và cung cấp cho function để code read,write update data mà không phải thao tác SQL trực tiếp

## CRUD cơ bản với PostgreSQL
- là 4 thao tác cốt lõi để làm việc với data trong DB: create, read,edit, delete tương đương với 4 câu lệnh: INSERT, SELECT, UPDATE, DELETE 
- trong project CRUD nằm ở Model or Repository vì đây là nơi wolk với database

---

# AUTH
## Vì sao cần Auth?
- là cơ chế để xác định danh tính người dùng trước khi cho phép truy cập hệ thống để tránh bị lộ data, cho nên phải có auth đẻ xác minh là ai

## Hash password (bcrypt)
- là server không được phép biết mật khẩu của user, dùng bcrypt để biến password thành string hash không thể đảo ngược, rồi chỉ lưu hash đó trong DB, nếu user login server hash lại password nhập vào và so sánh hash, chứ không bao giờ giải mã

## JWT (JSON Web Token)
- là một token đại diện cho user sau khi login.
Sau khi xác thực thành công, server ký và trả JWT cho client; các request sau chỉ cần send token này để chứng minh danh tính, server không cần lưu session.

## Middleware check token
- đây như cách cửa chặn khi mọi request muốn vào API thì phải xuất trình token hợp lệ

---

# ENV – CONFIG – SECURITY
## .env là gì?
- là file dùng để lưu cấu hình và thông tin nhạy cảm , tách ra khỏi code , nhưng code thì dùng chung, vè phần cấu hình tùy môi trường 

## Vì sao không hardcode secret?
- Không hardcode secret vì code có thể bị lộ, nhưng secret thì không được phép lộ.
Khi ghi thẳng secret trong code, chỉ cần push repo hoặc share file là toàn bộ hệ thống mất an toàn, và cũng không thể đổi secret theo môi trường khi deploy.


## Config theo môi trường
- Config theo environment là cách để cùng một code run đúng ở nhiều nơi khác nhau, mỗi environment dùng DB, secret và mức log riêng, nhưng không cần sửa code

## NODE_ENV là gì?
- NODE_ENV là biến environment cho ứng dụng node.js đang run trên environment, cùng một code nhưng dev thì debug nhiều, prod thì tối ưu và bảo mật hơn.



----
## Khải update

- Nên rút gọn một số đoạn diễn giải dài để nội dung dễ đọc hơn.  
- Một vài chỗ dùng từ còn hơi lan man, có thể viết ngắn và tập trung vào ý chính.  
- Phần Express.js và Middleware nên tách ý rõ ràng bằng bullet để dễ theo dõi.  
- Cần thống nhất cách viết thuật ngữ (request, response, middleware…). 