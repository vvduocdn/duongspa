/**
 * Script to add data-i18n attributes to the HTML file
 * This is a one-time script to automate the i18n attribute addition
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// Services Section
const servicesReplacements = [
    { from: '<h2 class="section-title">Dịch Vụ Nổi Bật</h2>', to: '<h2 class="section-title" data-i18n="services.title">Dịch Vụ Nổi Bật</h2>' },
    { from: '<h3>Massage Trị Liệu</h3>', to: '<h3 data-i18n="services.service1Title">Massage Trị Liệu</h3>' },
    { from: '<p>Chuyên xử lý đau nhức cơ xương khớp, bấm huyệt, day giãn cơ</p>', to: '<p data-i18n="services.service1Desc">Chuyên xử lý đau nhức cơ xương khớp, bấm huyệt, day giãn cơ</p>' },
    { from: '<h3>Massage Bấm Huyệt</h3>', to: '<h3 data-i18n="services.service2Title">Massage Bấm Huyệt</h3>' },
    { from: '<p>Tác động huyệt đạo, lưu thông khí huyết, giảm mất ngủ, stress</p>', to: '<p data-i18n="services.service2Desc">Tác động huyệt đạo, lưu thông khí huyết, giảm mất ngủ, stress</p>' },
    { from: '<h3>Massage Giãn Cơ Sâu</h3>', to: '<h3 data-i18n="services.service3Title">Massage Giãn Cơ Sâu</h3>' },
    { from: '<p>Deep tissue, giải phóng cơ cứng, phù hợp vận động viên</p>', to: '<p data-i18n="services.service3Desc">Deep tissue, giải phóng cơ cứng, phù hợp vận động viên</p>' },
    { from: '<h3>Massage Toàn Thân Thư Giãn</h3>', to: '<h3 data-i18n="services.service4Title">Massage Toàn Thân Thư Giãn</h3>' },
    { from: '<p>Thư giãn toàn diện, cải thiện giấc ngủ, giảm căng thẳng</p>', to: '<p data-i18n="services.service4Desc">Thư giãn toàn diện, cải thiện giấc ngủ, giảm căng thẳng</p>' },
    { from: '<h3>Massage Cổ Vai Gáy Chuyên Sâu</h3>', to: '<h3 data-i18n="services.service5Title">Massage Cổ Vai Gáy Chuyên Sâu</h3>' },
    { from: '<p>Giải quyết tê bì tay, đau đầu, mỏi vai - dân văn phòng</p>', to: '<p data-i18n="services.service5Desc">Giải quyết tê bì tay, đau đầu, mỏi vai - dân văn phòng</p>' },
    { from: '<h3>Massage Chân - Bấm Huyệt Bàn Chân</h3>', to: '<h3 data-i18n="services.service6Title">Massage Chân - Bấm Huyệt Bàn Chân</h3>' },
    { from: '<p>Giảm phù nề, lưu thông máu, phù hợp người đi đứng nhiều</p>', to: '<p data-i18n="services.service6Desc">Giảm phù nề, lưu thông máu, phù hợp người đi đứng nhiều</p>' },
];

// Apply all replacements
servicesReplacements.forEach(({ from, to }) => {
    html = html.replace(from, to);
});

// Save the updated HTML
fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('HTML file updated successfully!');
