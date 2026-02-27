// Create a repeat grid aligned with the top 20 images: 5 columns, repeated 10 times (200 items)
window.addEventListener('DOMContentLoaded', function() {
    const topGrid = document.querySelector('.top-grid');
    if (!topGrid) return;
    const originals = Array.from(topGrid.querySelectorAll('.img-box')).slice(0,20);
    // create repeat grid container
    const repeatGrid = document.createElement('div');
    repeatGrid.className = 'repeat-grid';
    topGrid.parentNode.insertBefore(repeatGrid, topGrid.nextSibling);

    // We'll append clones in the same order; CSS grid will place them into 5 columns
    for (let rep = 0; rep < 10; rep++) {
        originals.forEach(function(orig, i) {
            const clone = orig.cloneNode(true);
            clone.className = 'img-box repeat';
            // apply small random vertical offset between 0.5vh and 1.5vh for tighter rows
            const vOffset = (0.5 + Math.random() * 1).toFixed(2); // 0.5..1.5
            clone.style.marginTop = vOffset + 'vh';
            // small random bottom spacing to avoid overlap (0.5vh - 1.0vh)
            const vBottom = (0.5 + Math.random() * 0.5).toFixed(2);
            clone.style.marginBottom = vBottom + 'vh';
            // random horizontal jitter between -2% and +2%
            const hJitter = ((Math.random() - 0.5) * 4).toFixed(2);
            clone.style.marginLeft = hJitter + '%';
            // random rotation between -10 and +10 degrees
            const deg = (Math.random() * 20) - 10;
            // random scale between 0.98 and 1.02
            const scale = (0.98 + Math.random() * 0.04).toFixed(3);
            clone.style.transform = `rotate(${deg}deg) scale(${scale})`;
            // remove any absolute positioning inherited
            clone.style.left = '';
            clone.style.top = '';
            repeatGrid.appendChild(clone);
        });
    }
    // Create 180 empty slots for new images, following the same spacing rules
    const placeholderSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    for (let s = 0; s < 180; s++) {
        const slot = document.createElement('div');
        slot.className = 'img-box repeat slot';
        // random vertical offset between 0.5vh and 1.5vh
        const vOffset = (0.5 + Math.random() * 1).toFixed(2);
        slot.style.marginTop = vOffset + 'vh';
        // small random bottom spacing
        const vBottom = (0.5 + Math.random() * 0.5).toFixed(2);
        slot.style.marginBottom = vBottom + 'vh';
        // horizontal jitter
        const hJitter = ((Math.random() - 0.5) * 4).toFixed(2);
        slot.style.marginLeft = hJitter + '%';
        // rotation and small scale variation
        const deg = (Math.random() * 20) - 10;
        const scale = (0.91 + Math.random() * 0.04).toFixed(3);
        slot.style.transform = `rotate(${deg}deg) scale(${scale})`;
        // add a tiny transparent placeholder image so the slot renders and is interactable
        const img = document.createElement('img');
        img.src = placeholderSrc;
        img.alt = `Empty slot ${s+1}`;
        slot.appendChild(img);
        repeatGrid.appendChild(slot);
    }
});
