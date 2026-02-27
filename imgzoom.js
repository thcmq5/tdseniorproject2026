// Click-to-zoom for scattered images
// Wait for DOM to load
window.addEventListener('DOMContentLoaded', function() {
    // Use event delegation so dynamically added images are clickable
    document.body.addEventListener('click', function(e) {
        const clicked = e.target.closest && e.target.closest('.img-box img');
        if (!clicked) return;
        const img = clicked;
        img.style.cursor = 'pointer';
        const modal = document.getElementById('img-modal');
        const modalImg = document.getElementById('modal-img');
        const modalCaption = document.getElementById('modal-caption');
        modal.classList.add('active');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = img.alt;
    });
    // Close modal on click outside image or on Escape
    document.getElementById('img-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('img-modal').classList.remove('active');
        }
    });
});
