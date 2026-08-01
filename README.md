<div align="center">

# ⌨️ [Watson Shell](https://zs-k-bot.vercel.app/) 

**Giả lập terminal shell thông minh — tích hợp AI, đồng bộ đám mây và bảo mật 2FA**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-12-ffca28?logo=firebase&logoColor=black)](https://firebase.google.com)

[Demo](#-demo) · [Tính năng](#-tính-năng-nổi-bật) · [Cài đặt](#-cài-đặt-nhanh) · [Cấu trúc](#-cấu-trúc-dự-án) · [Đóng góp](#-đóng-góp)

</div>

---

## 📖 Giới thiệu

**Watson Shell** là một ứng dụng web mô phỏng một terminal / shell thông minh, kết hợp giao diện dòng lệnh cổ điển với sức mạnh của AI hiện đại. Dự án tích hợp **Gemini AI** để phân tích và gợi ý lệnh theo thời gian thực, đồng bộ dữ liệu qua **Cloudant Cloud Sync**, tô sáng cú pháp (syntax highlighting) cho nhiều ngôn ngữ lập trình, và cơ chế bảo mật hai lớp (2FA) — tất cả gói gọn trong một trải nghiệm terminal mượt mà, trực quan ngay trên trình duyệt.

Ngoài ra, Watson Shell còn tích hợp sẵn các drawer kết nối nhanh tới hệ sinh thái Google (Docs, Tasks, Chat, Forms), một trình xem tài liệu RFC tích hợp, và khả năng xuất kết quả phiên làm việc ra PDF / Markdown / CSV.

---

## ✨ Tính năng nổi bật

| | Tính năng | Mô tả |
|---|---|---|
| 🧠 | **AI Engine tích hợp** | Phân tích lệnh, gợi ý tối ưu và phát hiện bất thường được hỗ trợ bởi Google Gemini (`@google/genai`) |
| ☁️ | **Cloudant Cloud Sync** | Đồng bộ phiên làm việc, lịch sử lệnh và thiết bị theo thời gian thực |
| 🔐 | **Bảo mật 2FA** | Xác thực hai lớp và mã hoá đầu-cuối cho phiên làm việc |
| 🎨 | **Syntax Highlighting** | Tô màu cú pháp đa ngôn ngữ (JS, SQL, YAML, JSON, Rust, …) ngay trong terminal |
| 📂 | **Project Tree Sidebar** | Duyệt cây thư mục dự án ảo, xem nội dung file trực tiếp |
| 📊 | **Watson Analysis Panel** | Bảng phân tích song song hiển thị số liệu real-time (node efficiency, latency, độ tin cậy AI…) |
| 📄 | **RFC Viewer** | Tra cứu và đọc nhanh các tài liệu RFC/tiêu chuẩn kỹ thuật ngay trong app |
| 🔗 | **Tích hợp Google Workspace** | Drawer nhanh cho Google Docs, Tasks, Chat và Forms |
| 📤 | **Export đa định dạng** | Xuất lịch sử phiên làm việc ra PDF, Markdown hoặc CSV chỉ với một cú click |
| 🔔 | **Notifications & Device Sync** | Theo dõi trạng thái đồng bộ trên nhiều thiết bị (mobile, tablet, desktop) |

---

## 🖥️ Demo

> Terminal ảo hiển thị lịch sử lệnh dạng JSON/Markdown/Table, đi kèm bảng phân tích Watson AI theo thời gian thực và cây thư mục dự án ở sidebar.

```
$ watson run-analysis --db cloudant_prod --depth full
✔ Connecting to IBM Cloudant instance...
✔ Triggering Watson ML analysis pipeline...
  → records_processed: 1,402,991
  → anomalies_detected: 14
  → ai_confidence: 0.992
```

---

## 🧰 Công nghệ sử dụng

- **Frontend:** [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Build tool:** [Vite 6](https://vitejs.dev)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **AI:** [Google Gemini API](https://ai.google.dev) (`@google/genai`)
- **Backend/Cloud:** [Firebase](https://firebase.google.com) 12, Express
- **Data & biểu đồ:** [Recharts](https://recharts.org)
- **Animation:** [Motion](https://motion.dev)
- **Icon:** [Lucide React](https://lucide.dev)

---

## 🚀 Cài đặt nhanh

### Yêu cầu

- Node.js `>= 18`
- [Bun](https://bun.sh) hoặc `npm` / `yarn`
- API key của Gemini ([lấy tại Google AI Studio](https://aistudio.google.com/))

### Các bước

```bash
# 1. Clone dự án
git clone https://github.com/<your-username>/ZsK-bot.git
cd ZsK-bot

# 2. Cài đặt dependencies
npm install
# hoặc: bun install

# 3. Thiết lập biến môi trường
cp .env.example .env
# → Mở file .env và điền GEMINI_API_KEY của bạn

# 4. Chạy môi trường phát triển
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`.

### Các script có sẵn

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy server phát triển (hot reload) |
| `npm run build` | Build bản production |
| `npm run preview` | Xem trước bản build |
| `npm run lint` | Kiểm tra type với TypeScript |
| `npm run clean` | Xoá thư mục build |

---

## 📁 Cấu trúc dự án

```
ZsK-bot-main/
├── src/
│   ├── components/         # Các UI component (Terminal, Drawer, Modal, Sidebar...)
│   ├── utils/               # Logic xử lý: Watson Engine, Google Auth, Export...
│   ├── types/                # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx               # Component gốc, quản lý state toàn cục
│   ├── main.tsx               # Entry point
│   └── index.css               # Global styles (Tailwind)
├── content/actions/          # Tài liệu how-to
├── text/                       # Tài liệu tham khảo (RFC, spec...)
├── assets/                      # Tài nguyên tĩnh
├── index.html
├── vite.config.ts
└── package.json
```

---

## ⚙️ Cấu hình môi trường

Tạo file `.env` từ `.env.example` với các biến sau:

| Biến | Mô tả |
|---|---|
| `GEMINI_API_KEY` | API key dùng để gọi Gemini AI |
| `APP_URL` | URL nơi ứng dụng được host (dùng cho OAuth callback, self-reference) |

> ⚠️ **Lưu ý bảo mật:** Không commit file `.env` hoặc bất kỳ khoá API/cấu hình nhạy cảm nào (ví dụ `firebase-applet-config.json`) lên kho lưu trữ công khai.

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Để đóng góp:

1. Fork dự án
2. Tạo nhánh tính năng (`git checkout -b feature/ten-tinh-nang`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng abc'`)
4. Push lên nhánh (`git push origin feature/ten-tinh-nang`)
5. Mở một Pull Request

Vui lòng tạo issue trước nếu bạn muốn thảo luận về thay đổi lớn.

---

## 📜 Giấy phép

Dự án được phát hành theo giấy phép **Apache-2.0**. Xem chi tiết tại [LICENSE](LICENSE).

---

<div align="center">

Made with ❤️ bằng React & TypeScript

</div>