Design Patterns – Learning Notes

1. Design Pattern là gì?

Design Pattern là các mẫu thiết kế – tức là những giải pháp đã được đúc kết cho các vấn đề lặp đi lặp lại trong quá trình thiết kế phần mềm.

Pattern không phải là code cụ thể, mà là cách tổ chức code, cách chia trách nhiệm giữa các class/object để:

Code dễ đọc hơn

Dễ mở rộng

Dễ bảo trì

Giảm phụ thuộc cứng (tight coupling)

2. Vì sao cần Design Patterns?

Qua tìm hiểu, em thấy nếu không dùng pattern thì code thường gặp các vấn đề:

Class quá to, làm quá nhiều việc

Sửa một chỗ thì hỏng chỗ khác

Khó test

Khó mở rộng khi yêu cầu thay đổi

Design Patterns giúp:

Tách rõ trách nhiệm

Tuân theo các nguyên lý như SOLID

Giao tiếp giữa các object rõ ràng hơn

3. Phân loại Design Patterns

Theo Refactoring.Guru, Design Patterns được chia làm 3 nhóm chính:

3.1 Creational Patterns (Nhóm khởi tạo)

- Tập trung vào cách tạo object, thay vì dùng new một cách trực tiếp.

Một số pattern tiêu biểu:

Singleton – đảm bảo chỉ có 1 instance

Factory Method – tạo object thông qua method

Abstract Factory – tạo cả họ object liên quan

Builder – tạo object phức tạp từng bước

Prototype – clone object

--> Em nhận thấy nhóm này giúp code linh hoạt hơn khi khởi tạo object, đặc biệt khi logic tạo object phức tạp.

3.2 Structural Patterns (Nhóm cấu trúc)

- Tập trung vào cách các class/object kết hợp với nhau.

Một số pattern tiêu biểu:

Adapter – chuyển interface cho phù hợp

Decorator – mở rộng hành vi mà không sửa code gốc

Facade – tạo interface đơn giản cho hệ thống phức tạp

Composite – cấu trúc dạng cây

Proxy – object trung gian

--> Nhóm này giúp hệ thống dễ dùng hơn và giảm phụ thuộc giữa các phần.

3.3 Behavioral Patterns (Nhóm hành vi)

- Tập trung vào cách các object giao tiếp và phân chia trách nhiệm.

Một số pattern tiêu biểu:

Observer – lắng nghe sự thay đổi

Strategy – thay đổi thuật toán linh hoạt

Command – đóng gói hành động

State – thay đổi hành vi theo trạng thái

Iterator – duyệt collection

--> Em thấy nhóm này rất hay dùng trong thực tế vì giúp tránh if/else quá nhiều.

4. Ví dụ nhanh (theo cách hiểu cá nhân)
Strategy Pattern (ví dụ dễ hiểu)

Thay vì viết nhiều if/else để xử lý logic

Ta tách mỗi logic thành một strategy riêng

Khi cần đổi hành vi → chỉ cần đổi strategy

--> Em thấy pattern này giống tư duy "composition over inheritance".

5. Nhận xét cá nhân sau khi đọc Refactoring.Guru

Trang Refactoring.Guru giải thích rất trực quan, có hình minh họa dễ hiểu

Không chỉ nói làm gì, mà còn nói khi nào nên dùng và khi nào không nên dùng

Giúp em hiểu rằng Design Pattern không phải để dùng cho có, mà phải đúng ngữ cảnh

6. Kết luận

Qua việc tự tìm hiểu Design Patterns:

Em hiểu rõ hơn cách tổ chức code

Biết cách tránh các lỗi thiết kế phổ biến

Có nền tảng để đọc code người khác tốt hơn

Trong thời gian tới, em muốn:

Thực hành từng pattern nhỏ bằng JavaScript / Node.js

Áp dụng vào project thực tế thay vì học lý thuyết suông