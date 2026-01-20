# Dương Spa - Landing Page

Landing page chuyên nghiệp cho Dương Spa, cung cấp dịch vụ massage trị liệu mệt mỏi & xương khớp.

## Thông tin liên hệ
- **Tên:** Dương Spa
- **Số điện thoại:** 0796 636 585
- **Dịch vụ:** Trị liệu mệt mỏi, xương khớp, massage thư giãn

## Cấu trúc thư mục

```
DuongSpa/
│
├── index.html              # Trang chính
│
├── css/                    # Thư mục CSS modules
│   ├── main.css           # File CSS chính (import tất cả)
│   ├── variables.css      # Biến CSS (colors, fonts, spacing)
│   ├── base.css           # Reset, typography, buttons
│   ├── header.css         # Header & navigation
│   ├── hero.css           # Hero section
│   ├── sections.css       # About, Services, Pricing, Contact
│   ├── footer.css         # Footer styles
│   ├── animations.css     # Keyframe animations
│   └── responsive.css     # Mobile responsive
│
├── js/                     # Thư mục JavaScript modules
│   ├── main.js            # JavaScript chính
│   ├── smooth-scroll.js   # Smooth scrolling
│   ├── animations.js      # Scroll animations, observers
│   └── interactions.js    # User interactions, events
│
├── images/                 # Thư mục hình ảnh (hiện tại dùng Unsplash)
│
├── styles.css             # CSS gốc (backup, không sử dụng)
├── script.js              # JS gốc (backup, không sử dụng)
└── README.md              # File hướng dẫn này
```

## Tính năng

### Sections
1. **Header** - Navigation cố định với logo và menu
2. **Hero** - Banner chính với CTA buttons
3. **About** - Giới thiệu spa với 3 feature cards
4. **Services** - 4 dịch vụ nổi bật với hình ảnh
5. **Pricing** - Bảng giá chi tiết:
   - Trị liệu thư giãn – giảm mệt mỏi
   - Trị liệu xương khớp – giảm đau chuyên sâu (5 dịch vụ với gói 10 buổi)
     - Đau lưng – Thần kinh tọa
     - Thoát vị đĩa đệm
     - Tê tay chân – Nhức mỏi
     - Đau vai gáy – Đau đầu
     - Mất ngủ – Căng thẳng
   - Trị liệu chuyên sâu (đá nóng, thảo dược)
   - Combo dịch vụ thư giãn (5 combo)
   - Gói liệu trình & ưu đãi
6. **Contact** - Thông tin liên hệ và CTA
7. **Footer** - Thông tin spa và links

### Hiệu ứng
- Smooth scrolling
- Fade-in animations khi scroll
- Parallax effect cho hero section
- Hover effects cho cards và buttons
- Ripple effect khi click buttons
- Counter animation cho giá
- Responsive design cho mobile

## Hướng dẫn chỉnh sửa

### Thay đổi màu sắc
Mở file `css/variables.css` và chỉnh sửa:
```css
--primary-color: #8B7355;    /* Màu chủ đạo */
--secondary-color: #C9A581;  /* Màu phụ */
--accent-color: #7FB069;     /* Màu nhấn */
```

### Cập nhật giá dịch vụ
Mở file `index.html`, tìm section `<section id="pricing">` và chỉnh sửa:
```html
<div class="price">350.000đ</div>
```

### Thêm dịch vụ mới
1. Mở `index.html`
2. Copy một `price-item` div
3. Thay đổi tên và giá dịch vụ

### Thay đổi hình ảnh
Hiện tại website sử dụng hình ảnh từ Unsplash. Để sử dụng hình ảnh riêng:
1. Thêm hình vào thư mục `images/`
2. Tìm các URL Unsplash trong code
3. Thay bằng đường dẫn local: `images/ten-hinh.jpg`

### Thay đổi số điện thoại
Tìm và thay thế tất cả `0796636585` bằng số mới.

## Cách chạy website

### Phương pháp 1: Mở trực tiếp
Double-click vào file `index.html`

### Phương pháp 2: Sử dụng Live Server (Khuyến nghị)
```bash
# Cài đặt Live Server (nếu chưa có)
npm install -g live-server

# Chạy server
cd /Users/mac/Documents/DuongSpa
live-server
```

### Phương pháp 3: Python SimpleHTTPServer
```bash
cd /Users/mac/Documents/DuongSpa
python -m http.server 8000
# Mở browser: http://localhost:8000
```

## Tối ưu hóa

### Giảm kích thước file
- Minify CSS: Sử dụng công cụ online như cssnano
- Minify JS: Sử dụng UglifyJS hoặc Terser
- Optimize images: Nén hình ảnh bằng TinyPNG

### SEO
- Thêm meta tags trong `<head>`
- Thêm schema markup cho địa phương (local business)
- Tối ưu hóa title và description

### Performance
- Lazy load hình ảnh
- Sử dụng CDN cho fonts
- Enable caching trên server

## Trình duyệt hỗ trợ
- Chrome (khuyến nghị)
- Firefox
- Safari
- Edge
- Mobile browsers

## Liên hệ hỗ trợ
Nếu cần hỗ trợ kỹ thuật, vui lòng liên hệ developer.

---
**Copyright © 2024 Dương Spa. All rights reserved.**