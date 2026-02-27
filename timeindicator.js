// Scroll progress time-bar animation
window.addEventListener('scroll', function() {
    const bar = document.querySelector('.time-bar');
    const indicator = document.querySelector('.time-indicator');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    // Get bar height in px
    const barRect = bar.getBoundingClientRect();
    const barHeight = bar.offsetHeight;
    const indicatorHeight = indicator.offsetHeight;
    // Calculate max travel distance for indicator
    const maxTravel = barHeight - indicatorHeight;
    // Set indicator position
    indicator.style.position = 'absolute';
    indicator.style.top = (maxTravel * scrollPercent) + 'px';
    indicator.style.left = '0';
    // Highlight closest timeline date
    const timelineDates = document.querySelectorAll('.timeline-date');
    let closest = null;
    let minDist = Infinity;
    const indicatorTop = bar.getBoundingClientRect().top + (maxTravel * scrollPercent) + indicatorHeight/2;
    timelineDates.forEach(function(date) {
        const dateRect = date.getBoundingClientRect();
        const dateMid = dateRect.top + dateRect.height/2;
        const dist = Math.abs(dateMid - indicatorTop);
        if (dist < minDist) {
            minDist = dist;
            closest = date;
        }
    });
    // Only update if the closest date has changed
    if (!window._lastActiveTimelineDate || window._lastActiveTimelineDate !== closest) {
        timelineDates.forEach(function(date) { date.classList.remove('active'); });
        if (closest) closest.classList.add('active');
        window._lastActiveTimelineDate = closest;
    }
});
