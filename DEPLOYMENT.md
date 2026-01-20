# Hướng dẫn Deploy Website Dương Spa

Tài liệu này hướng dẫn các cách deploy website lên hosting/server.

## Mục lục
1. [Deploy lên GitHub Pages (Miễn phí)](#github-pages)
2. [Deploy lên Netlify (Miễn phí)](#netlify)
3. [Deploy lên Vercel (Miễn phí)](#vercel)
4. [Deploy lên Shared Hosting](#shared-hosting)

---

## GitHub Pages (Miễn phí)

### Bước 1: Tạo repository trên GitHub
```bash
# Khởi tạo git trong thư mục project
cd /Users/mac/Documents/DuongSpa
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit - Dương Spa website"

# Tạo repository trên GitHub và link remote
git remote add origin https://github.com/username/duong-spa.git
git branch -M main
git push -u origin main
```

### Bước 2: Enable GitHub Pages
1. Vào Settings của repository
2. Chọn Pages ở menu bên trái
3. Source: chọn branch `main` và folder `/root`
4. Click Save

Website sẽ có URL: `https://username.github.io/duong-spa`

---

## Netlify (Miễn phí)

### Cách 1: Deploy qua Git
1. Đăng ký tài khoản tại [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Chọn GitHub repository
4. Build settings:
   - Build command: (để trống)
   - Publish directory: `/`
5. Click "Deploy site"

### Cách 2: Drag & Drop
1. Đăng nhập vào Netlify
2. Kéo thả toàn bộ thư mục DuongSpa vào Netlify
3. Website sẽ được deploy tự động

### Custom Domain
1. Vào Site settings > Domain management
2. Click "Add custom domain"
3. Nhập domain của bạn (ví dụ: duongspa.com)
4. Cập nhật DNS records theo hướng dẫn

---

## Vercel (Miễn phí)

### Deploy qua CLI
```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Deploy
cd /Users/mac/Documents/DuongSpa
vercel

# Làm theo hướng dẫn trên terminal
```

### Deploy qua Web Interface
1. Đăng ký tại [vercel.com](https://vercel.com)
2. Import Git repository
3. Configure project (để mặc định)
4. Deploy

---

## Shared Hosting (cPanel, DirectAdmin)

### Bước 1: Chuẩn bị files
```bash
# Tạo file zip của project
cd /Users/mac/Documents
zip -r duong-spa.zip DuongSpa -x "*.git*" -x "*node_modules*" -x "*backup*"
```

### Bước 2: Upload lên hosting
1. Đăng nhập vào cPanel
2. Vào File Manager
3. Navigate đến thư mục `public_html` (hoặc domain folder)
4. Upload file `duong-spa.zip`
5. Extract file zip
6. Di chuyển tất cả files trong folder DuongSpa ra ngoài public_html

### Bước 3: Cấu hình
Tạo file `.htaccess` trong `public_html`:
```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Enable browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## Tối ưu hóa trước khi Deploy

### 1. Minify CSS
Sử dụng [cssnano](https://cssnano.co/):
```bash
npm install -g cssnano-cli
cssnano css/main.css css/main.min.css
```

### 2. Minify JavaScript
Sử dụng [Terser](https://terser.org/):
```bash
npm install -g terser
terser js/main.js -o js/main.min.js --compress --mangle
```

### 3. Optimize Images
- Sử dụng [TinyPNG](https://tinypng.com/) để nén hình ảnh
- Hoặc sử dụng tool command line:
```bash
npm install -g imagemin-cli
imagemin images/*.{jpg,png} --out-dir=images/optimized
```

### 4. Update index.html
Sau khi minify, cập nhật links trong `index.html`:
```html
<link rel="stylesheet" href="css/main.min.css">
<script src="js/main.min.js"></script>
```

---

## SSL Certificate (HTTPS)

### GitHub Pages / Netlify / Vercel
- Tự động cung cấp SSL miễn phí
- Enable trong settings

### Shared Hosting
1. Vào SSL/TLS trong cPanel
2. Chọn Let's Encrypt (miễn phí)
3. Chọn domain và install

---

## Performance Checklist

Trước khi deploy, kiểm tra:

- [ ] Minify CSS và JavaScript
- [ ] Optimize tất cả hình ảnh
- [ ] Enable browser caching
- [ ] Enable GZIP compression
- [ ] Add meta tags cho SEO
- [ ] Test responsive design
- [ ] Test trên nhiều browsers
- [ ] Validate HTML/CSS
- [ ] Check broken links
- [ ] Test loading speed (Google PageSpeed Insights)
- [ ] Add Google Analytics (optional)
- [ ] Add favicon
- [ ] Add sitemap.xml
- [ ] Add robots.txt

---

## Monitoring & Analytics

### Google Analytics
Thêm vào `<head>` của `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel (Optional)
Thêm Facebook Pixel code vào `<head>` nếu cần tracking cho quảng cáo Facebook.

---

## Backup

Luôn backup website thường xuyên:

### Tự động backup (Netlify/Vercel)
- Git repository tự động là backup
- Có thể rollback về version cũ bất kỳ lúc nào

### Manual backup (Shared Hosting)
```bash
# Backup files
zip -r backup-$(date +%Y%m%d).zip public_html/

# Backup database (nếu có)
mysqldump -u username -p database_name > backup-$(date +%Y%m%d).sql
```

---

## Troubleshooting

### Website không hiển thị CSS
- Kiểm tra đường dẫn trong HTML
- Kiểm tra file permissions (755 cho folders, 644 cho files)
- Clear browser cache

### Images không load
- Kiểm tra đường dẫn hình ảnh
- Nếu dùng Unsplash URLs, đảm bảo có internet connection
- Upload local images vào folder `images/`

### Mobile không responsive
- Kiểm tra viewport meta tag trong `<head>`
- Test trên nhiều devices
- Sử dụng Chrome DevTools

---

**Cần hỗ trợ?** Liên hệ developer hoặc tạo issue trên GitHub repository.

---
Last updated: 2024-01-19