# Design Pattern ?
- là những sample design của code có sẳn để handle problem hay gặp, trong lặp trình có rất nhiều proble lặp đi lặp lại từ điều đó có thể sử dụng những sample design để giải quyết problem một cách tốt nhất.

# Vì sao cần Design Pattern?
- khi sử dụng sẽ help write code tốt hơn
- Design Pattern có thể sử dụng trong nhiều ngôn ngữ (VD: jav, python, c##, c++, ...)
- dễ trao đổi với mọi người. (vd: dùng Design Pattern để handle problem này, problem kia )

# Phân loại Design Pattern
## Creational Patterns
- liên quan tới việc object initialization
    - Singleton : Khi toàn hệ thống chỉ cần 1 instance dùng chung
    - Factory: Tạo object mà không phụ thuộc class cụ thể
    - Builder: Tạo object phức tạp từng bước

### Singleton
- là một mẫu thiết kế tạo đối tượng cho phép bạn đảm bảo rằng một lớp chỉ có một thể hiện duy nhất, đồng thời cung cấp một điểm truy cập toàn cục
- problem gặp phải:
    - đảm bảo rằng mỗi class chỉ có một thể hiện duy nhất: để kiểm soát quyền access vào một số resources dùng chung—ví dụ: cơ sở dữ liệu hoặc tập tin. -> điều này giúp kiểm soát số lượng instance một cách hiệu quả
    - Cần access ở khắp nơi nhưng không dùng biến global: cho phép bạn access một object nào đó từ bất kỳ đâu trong chương trình. Tuy nhiên, nó cũng bảo vệ đối tượng đó khỏi bị ghi đè bởi mã khác.
        - problem khác: khi muốn đoạn mã handle problem số 1 bị phân tán khắp chương trình, nên đặt nó vào 1 class duy nhất
- các giải pháp:
    - đặt phương thức initialization mặc định ở chế độ private để ngăn các object khác sử dụng newtoán tử với lớp Singleton.
    - Tạo một phương thức tạo đối tượng tĩnh hoạt động như một hàm tạo
    - Nếu mã của bạn có quyền access vào lớp Singleton, thì nó có thể call phương thức tĩnh của Singleton. Vì vậy, bất cứ khi nào phương thức đó được call, cùng một object luôn được trả về.
- Khi nào NÊN dùng Singleton?
    - khi một class trong chương trình của bạn chỉ nên có một thể hiện duy nhất dành cho all các client; ví dụ, một object database duy nhất được share bởi các phần khác nhau của chương trình.
- Khi nào KHÔNG nên dùng Singleton?
    - Logic đơn giản, Object không dùng chung, Cần test nhiều instance khác nhau
- Cách triển khai
    - Thêm một trường tĩnh riêng tư vào class để lưu trữ thể hiện duy nhất của class đó.
    - declaration một Method tạo tĩnh công khai để lấy thể hiện duy nhất
    - triển khai "khởi tạo lười biếng" bên trong Method tĩnh. Method này nên tạo một đối tượng mới trong lần gọi đầu tiên và gán nó vào trường tĩnh. Method này luôn phải trả về thể hiện đó trong tất cả các lần gọi tiếp theo.
    - Hãy đặt method khởi tạo của lớp là private. method tĩnh của lớp vẫn có thể call method khởi tạo, nhưng các object khác thì không.
    - Xem lại mã nguồn phía máy khách và thay thế tất cả các lệnh gọi trực tiếp đến function tạo của singleton bằng các lệnh call đến method tạo tĩnh của nó.
- Uu & nhược điểm (nói kiểu phỏng vấn)
    - Ưu điểm:
        - Đảm bảo chỉ có 1 instance
        - Truy cập dễ
        - Khởi tạo khi cần (lazy)
    - Nhược điểm:
        - Vi phạm Single Responsibility Principle
        - Che giấu thiết kế kém
        - Khó test
        - Nguy hiểm nếu dùng sai