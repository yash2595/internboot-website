// Robust, reusable ticker function for horizontal carousel
function startTicker(wrapper, direction = 'right', speed = 0.5, prependedWidth = 0) {
    let pos = -prependedWidth; // Start with original slides in view
    let totalWidth = wrapper.scrollWidth;
    let slideWidth = wrapper.children[0] ? wrapper.children[0].getBoundingClientRect().width : 0;
    let containerWidth = wrapper.parentElement.offsetWidth;

    // Calculate loop points for a truly continuous experience
    // We'll reset when we've scrolled one full set of slides
    let originalSlidesCount = wrapper.querySelectorAll(':not([data-prepended="true"])').length;
    let singleSetWidth = slideWidth * originalSlidesCount;

    let loopStart = -prependedWidth;
    let loopEnd = loopStart + singleSetWidth;

    // For debugging
    console.log('Ticker initialized with:', {
        prependedWidth,
        totalWidth,
        slideWidth,
        containerWidth,
        originalSlidesCount,
        singleSetWidth,
        loopStart,
        loopEnd
    });

    function animate() {
        // Check if the wrapper is still in the DOM before animating
        if (!document.body.contains(wrapper)) {
            return; // Stop animation if wrapper is removed
        }

        if (direction === 'right') {
            pos += speed;
            if (pos >= loopEnd) {
                // Reset position seamlessly to create continuous loop
                pos = loopStart;
                wrapper.style.transition = 'none';
                wrapper.style.transform = `translate3d(${pos}px, 0, 0)`;
                // Force reflow
                wrapper.offsetHeight;
                wrapper.style.transition = '';
            }
        } else {
            pos -= speed;
            if (pos <= loopStart) {
                // Reset position seamlessly to create continuous loop
                pos = loopEnd;
                wrapper.style.transition = 'none';
                wrapper.style.transform = `translate3d(${pos}px, 0, 0)`;
                // Force reflow
                wrapper.offsetHeight;
                wrapper.style.transition = '';
            }
        }

        // Apply transform
        wrapper.style.transform = `translate3d(${pos}px, 0, 0)`;

        // Continue animation
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();
}

// Initialize ticker for the first carousel after population and duplication
function initAllTickers() {
    const testimonialWrapper = document.querySelector('.testimonialSwiper .swiper-wrapper');

    // Calculate prepended width for the first carousel
    let prependedWidth = 0;
    if (testimonialWrapper) {
        let i = 0;
        while (testimonialWrapper.children[i] && testimonialWrapper.children[i].classList.contains('swiper-slide')) {
            if (testimonialWrapper.children[i].getAttribute('data-prepended') === 'true') {
                prependedWidth += testimonialWrapper.children[i].getBoundingClientRect().width;
                i++;
            } else {
                break;
            }
        }
        startTicker(testimonialWrapper, 'right', 0.5, prependedWidth);
    }
}

// Export for use in main script.js
window.initAllTickers = initAllTickers;
