# Ghi chú về HTTP và Express

## Các phương thức HTTP

- **GET**: Lấy dữ liệu từ server, không thay đổi trạng thái.
- **POST**: Tạo mới dữ liệu trên server, thường gửi kèm body.
- **PUT**: Cập nhật toàn bộ tài nguyên, body chứa toàn bộ đối tượng.
- **PATCH**: Cập nhật một phần tài nguyên, body chỉ chứa trường cần sửa.
- **DELETE**: Xóa dữ liệu, thường chỉ cần URL.
- **HEAD**: Giống GET nhưng chỉ trả về header.
- **OPTIONS**: Hỏi server xem tài nguyên hỗ trợ phương thức nào (hay dùng trong CORS).

## Cách truyền dữ liệu

- **GET**: dùng `query parameters` (`req.query`).
- **POST**: dùng `form data` hoặc JSON trong `req.body`.
- **PUT/PATCH**: dữ liệu nằm trong body (JSON, XML, form data).
- **DELETE**: thường chỉ cần URL, body ít khi dùng.
- **HEAD/OPTIONS**: không có body, chủ yếu headers.

## Express: req và res

- **req (request)**: dữ liệu từ client gửi lên server.
  - `req.query`: lấy query parameters.
  - `req.params`: lấy dữ liệu từ URL path.
  - `req.body`: lấy dữ liệu từ body (POST, PUT, PATCH).
  - `req.headers`: lấy thông tin header.
- **res (response)**: dữ liệu server trả về cho client.
  - `res.send()`: trả về text hoặc object.
  - `res.json()`: trả về JSON.
  - `res.status()`: đặt mã trạng thái HTTP.
  - `res.redirect()`: chuyển hướng.
  - `res.render()`: render view (nếu dùng template engine).

### Ví dụ

```js
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const filter = req.query.role;
  res.status(200).json({ id: userId, role: filter });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  res.status(201).send("User created successfully");
});

## Flow xử lý request–response

1. Client gửi request (ấn nút → gửi data lên server) → **req**.
2. Server nhận request, đi vào route handler trong code.
3. Code xử lý dữ liệu (DB, logic…).
4. Server tạo response bằng **res**.
5. Response gửi về client, hiển thị kết quả.

## Middleware parse dữ liệu
- lý do có json lẫn urlencoded là vì express xài thư viên body parase
- `express.json()`: parse body dạng JSON (API hiện đại).
- `express.urlencoded({ extended: true })`: parse form data (HTML form truyền thống).
- Thực tế thường dùng cả hai để hỗ trợ đầy đủ, tùy front‑end gửi dữ liệu kiểu nào.




# Ghi chú về mô hình MVC và N-layer

## Mô hình MVC (Model – View – Controller)
- **Model**: quản lý dữ liệu và logic nghiệp vụ cơ bản (ORM, thao tác DB, validation).
- **Controller**: nhận request từ client, gọi Model/Service, điều hướng luồng xử lý, trả dữ liệu cho View.
- **View**: hiển thị dữ liệu cho người dùng.
  - Nếu backend dùng template engine (EJS, Handlebars…), View nằm trong backend.
  - Nếu frontend tách riêng (React, Angular, Vue…), thì View do frontend đảm nhận. Backend chỉ lo Model + Controller và trả JSON cho frontend.

### Flow MVC
1. Client gửi request.
2. Controller nhận request, gọi Model xử lý dữ liệu.
3. Controller kết hợp dữ liệu từ Model để gắn vào View (hoặc trả JSON cho frontend).
4. Response gửi về client qua web server.

---

## Mô hình 3-layer architecture
Phân tầng tổng thể hệ thống:
1. **Presentation layer**: giao diện người dùng (frontend: React, Angular, mobile app).
2. **Business logic layer**: backend xử lý nghiệp vụ (controllers, services).
3. **Data layer**: database, models.

### Ví dụ
- Người dùng nhập form đăng ký trên React app (Presentation).
- Request gửi tới Express server, Controller gọi Service để kiểm tra logic (Business).
- Service gọi Model/Repository để lưu vào MySQL (Data).

---

## Mô hình N-layer architecture
Mở rộng từ 3-layer, backend được tách thành nhiều tầng nhỏ chuyên biệt:
- **Controller layer**: nhận request, điều hướng.
- **Service/Business layer**: xử lý logic nghiệp vụ.
- **DAO/Repository layer**: chuyên giao tiếp với database.
- **DTO layer**: định nghĩa dữ liệu truyền giữa các tầng.
- Có thể thêm các tầng khác: API Gateway, Caching, Security, Integration…

### Ví dụ hệ thống thương mại điện tử
- Frontend: web/mobile app hiển thị UI.
- Backend: nhiều microservice (giỏ hàng, thanh toán, vận chuyển).
- Mỗi service có Controller – Service – DAO riêng.
- Database riêng cho từng service.
- Redis làm caching layer để tăng tốc.
- API Gateway quản lý request từ nhiều client.

---

## Tóm lại
- **MVC**: cách tổ chức code trong một ứng dụng backend (Model, View, Controller). Nếu frontend riêng thì View nằm ngoài backend.
- **3-layer**: kiến trúc tổng thể hệ thống (Presentation – Business – Data).
- **N-layer**: mở rộng 3-layer, backend tách thành nhiều tầng chuyên biệt để dễ mở rộng và bảo trì.


```
