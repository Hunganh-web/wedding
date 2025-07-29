// floating-item js here

$(document).ready(function ($) {
	"use strict";
});

// Banner Moving JS Start
var floatingX = 0,
	floatingY = 0,
	x = 0,
	y = 0,
	friction = 1 / 30;

function floatingBg() {
	x += (floatingX - x) * friction;
	y += (floatingY - y) * friction;

	//  translate = 'translateX(' + x + 'px, ' + y + 'px)';
	translate = 'translateX(' + x + 'px) translateY(' + y + 'px)';

	$('.floating-item').css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});

	window.requestAnimationFrame(floatingBg);
}

$(window).on('mousemove click', function (e) {

	var isHovered = $('.floating-item:hover').length > 0;

	if (!isHovered) {
		var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX)),
			lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));

		floatingX = (20 * lMouseX) / 100;
		floatingY = (10 * lMouseY) / 100;
	}
});

floatingBg();

// Kiểm tra nếu là thiết bị mobile (màn hình nhỏ hơn hoặc bằng 768px)
const isMobile = window.innerWidth <= 768;

// Hàm kích hoạt pháo giấy
function startConfetti() {
  const end = Date.now() + 8000; // Thời gian chạy trong 8 giây tính từ thời điểm gọi hàm

  (function frame() {
    confetti({
      particleCount: isMobile ? 30 : 10, // Số hạt: mobile nhiều hơn
      spread: isMobile ? 180 : 360,      // Độ tỏa ra: mobile hẹp hơn
      startVelocity: isMobile ? 5 + Math.random() * 3 : 55 + Math.random() * 150, // Tốc độ bắn
      decay: 0.995,                      // Tốc độ tàn pháo
      drift: (Math.random() - 0.5) * 2,  // Độ lệch ngang
      scalar: Math.random() * 0.6 + 0.1, // Kích thước hạt
      origin: {
        x: Math.random(),               // Vị trí X ngẫu nhiên
        y: Math.random() * 0.2          // Vị trí Y phía trên
      },
      colors: colors,                    // Màu sắc
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);     // Tiếp tục loop nếu chưa hết 8s
    }
  })();
}

// Gọi pháo giấy lần đầu khi trang load
startConfetti();

// Gọi lại pháo giấy mỗi 50 giây
setInterval(startConfetti, 40000);



