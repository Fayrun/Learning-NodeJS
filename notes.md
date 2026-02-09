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


```
