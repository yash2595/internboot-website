// Function to preload images
function preloadImages(sources, callback) {
  let counter = 0;
  const images = [];

  function onLoad() {
    counter++;
    if (counter === sources.length) {
      callback(images);
    }
  }

  for (let i = 0; i < sources.length; i++) {
    images[i] = new Image();
    images[i].onload = onLoad;
    images[i].onerror = function () {
      console.error("Failed to preload image:", sources[i]);
      // Count errors as loaded to continue with the rest
      onLoad();
    };
    images[i].src = sources[i];
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Preload certificate images
  const certificateImages = Array.from(
    document.querySelectorAll(".certificate-slider img")
  ).map((img) => img.src);

  preloadImages(certificateImages, function (loadedImages) {
    console.log("All certificate images preloaded:", loadedImages.length);
  });
  // Add CSS for the second carousel with !important to override any conflicting styles
  const style = document.createElement("style");
  style.textContent = `
        .testimonialSwiperCircular {
            display: block !important;
            overflow: hidden !important;
            position: relative !important;
            width: 100% !important;
            margin-top: 30px !important;
            margin-bottom: 30px !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            min-height: 300px !important;
        }
        .testimonialSwiperCircular .swiper-wrapper {
            display: flex !important;
            transition-timing-function: linear !important;
            width: max-content !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        .testimonialSwiperCircular .swiper-slide {
            flex-shrink: 0 !important;
            width: 300px !important;
            margin-right: 30px !important; /* Match the 1st carousel gap */
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        .testimonialSwiperCircular .testimonial-card {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
    `;
  document.head.appendChild(style);

  // Hero section animations
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    // Add animation class to trigger entrance animations
    setTimeout(() => {
      heroSection.classList.add("animated");
    }, 100);

    // Add hover effects and tooltips to category bubbles
    const categoryBubbles = document.querySelectorAll(".category-bubble");
    categoryBubbles.forEach((bubble) => {
      const category = bubble.getAttribute("data-category");

      // Create tooltip using Bootstrap
      new bootstrap.Tooltip(bubble, {
        title: category,
        placement: "top",
        trigger: "hover focus",
      });

      bubble.addEventListener("mouseenter", () => {
        bubble.style.transform = "scale(1.2)";
      });

      bubble.addEventListener("mouseleave", () => {
        bubble.style.transform = "scale(1)";
      });
    });
  }

  // Animated Headlines Rotation
  const headlines = document.querySelectorAll(".headline");
  let currentHeadline = 0;

  function rotateHeadlines() {
    // Remove active class from all headlines
    headlines.forEach((headline) => headline.classList.remove("active"));

    // Add active class to current headline
    headlines[currentHeadline].classList.add("active");

    // Increment counter and reset if needed
    currentHeadline++;
    if (currentHeadline >= headlines.length) {
      currentHeadline = 0;
    }
  }

  // Set initial active headline
  if (headlines.length > 0) {
    headlines[0].classList.add("active");

    // Start rotation
    setInterval(rotateHeadlines, 3000);
  }
  // Simple navbar scroll effect without direct style manipulation
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Counter animation for stats
  const statElements = document.querySelectorAll(
    ".stat-number, .key-stat-number"
  );

  const animateCounter = (el) => {
    const originalText = el.textContent;
    let targetValue;
    let isLacs = false;
    let suffix = "+";
    const lacsSuffixMarkup = ' <span class="lacs-text">Lacs+</span>';

    // Check if this is a key-stat-number
    if (el.classList.contains("key-stat-number")) {
      // Get the small tag inside for suffix
      const smallTag = el.querySelector("small");
      const suffixText = smallTag ? smallTag.textContent : "";

      // Remove the small tag text from the original text
      const numText = originalText.replace(suffixText, "");

      // Parse the number
      targetValue = parseFloat(numText);

      // Check if it's a lacs value
      if (suffixText.includes("Lacs")) {
        isLacs = true;
        suffix = smallTag ? smallTag.outerHTML : "<small>+</small>";
      } else {
        suffix = smallTag ? smallTag.outerHTML : "<small>+</small>";
      }
    } else {
      // Original stats logic
      // Determine the target value and suffix based on the label
      const labelText = el
        .closest(".stat-item")
        .querySelector(".stat-label").textContent;

      if (labelText.includes("Trained and Placed")) {
        targetValue = 1.5;
        isLacs = true;
        suffix = lacsSuffixMarkup;
      } else if (labelText.includes("Through Job Fairs")) {
        targetValue = 2;
        isLacs = true;
        suffix = lacsSuffixMarkup;
      } else if (labelText.includes("Internships")) {
        targetValue = 2.5;
        isLacs = true;
        suffix = lacsSuffixMarkup;
      } else {
        targetValue = parseInt(
          originalText.replace(/,/g, "").replace(/\+/g, "")
        );
      }
    }

    // For non-decimal values
    const duration = 2000; // 2 seconds
    const fps = 60;
    const totalFrames = duration / (1000 / fps);

    let currentFrame = 0;
    let currentValue = 0;

    // Add animation class to the parent item
    const parentItem = el.closest(".stat-item") || el.closest(".key-stat");
    if (parentItem) {
      parentItem.classList.add("counting");
    }

    // Start with 0
    if (el.classList.contains("key-stat-number")) {
      // For key stats with HTML suffix
      el.innerHTML = isLacs ? "0" + suffix : "0" + suffix;
    } else {
      // For regular stats with text suffix
      if (isLacs) {
        el.innerHTML = "0.0" + suffix;
        el.removeAttribute("data-suffix");
      } else {
        el.textContent = "0";
        el.setAttribute("data-suffix", "+");
      }
    }

    const timer = setInterval(() => {
      currentFrame++;

      // Use easeOutQuad for smoother animation
      const progress = easeOutQuad(currentFrame / totalFrames);
      currentValue = targetValue * progress;

      // Format the display value
      if (el.classList.contains("key-stat-number")) {
        // For key stats with HTML suffix
        if (isLacs) {
          // For decimal values, show one decimal place
          el.innerHTML = currentValue.toFixed(1) + suffix;
        } else {
          // For integers, round and add commas
          el.innerHTML = Math.round(currentValue).toLocaleString() + suffix;
        }
      } else {
        // For regular stats with text suffix
        if (isLacs) {
          // For decimal values, show one decimal place
          el.innerHTML = currentValue.toFixed(1) + suffix;
          el.removeAttribute("data-suffix");
        } else {
          // For integers, round and add commas
          el.textContent = Math.round(currentValue).toLocaleString();
          el.setAttribute("data-suffix", "+");
        }
      }

      // Check if animation is complete
      if (currentFrame >= totalFrames) {
        // Set the final exact value
        if (el.classList.contains("key-stat-number")) {
          // For key stats with HTML suffix
          if (isLacs) {
            el.innerHTML = targetValue.toFixed(1) + suffix;
          } else {
            el.innerHTML = Math.round(targetValue).toLocaleString() + suffix;
          }
        } else {
          // For regular stats with text suffix
          if (isLacs) {
            el.innerHTML = targetValue.toFixed(1) + suffix;
            el.removeAttribute("data-suffix");
          } else {
            el.textContent = Math.round(targetValue).toLocaleString();
            el.setAttribute("data-suffix", "+");
          }
        }

        clearInterval(timer);
        // Remove animation class and add completed class
        if (parentItem) {
          parentItem.classList.remove("counting");
          parentItem.classList.add("counted");
        }
      }
    }, 1000 / fps);
  };

  // Easing function for smoother animation
  function easeOutQuad(t) {
    return t * (2 - t);
  }

  // Intersection Observer for stats animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statElements.forEach((el) => {
    observer.observe(el);
  });

  const videoTestimonialContainer = document.querySelector(
    ".videoTestimonialSwiper"
  );
  const videoTestimonialWrapper = videoTestimonialContainer
    ? videoTestimonialContainer.querySelector(".swiper-wrapper")
    : null;

  if (videoTestimonialWrapper) {
    const originalVideoSlides = Array.from(videoTestimonialWrapper.children);

    for (let copyIndex = 0; copyIndex < 2; copyIndex++) {
      originalVideoSlides.forEach(function (slide) {
        const duplicate = slide.cloneNode(true);
        duplicate.dataset.marqueeCopy = "true";
        duplicate.setAttribute("aria-hidden", "true");
        videoTestimonialWrapper.appendChild(duplicate);
      });
    }
  }

  const videoTestimonialSwiper = new Swiper(".videoTestimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    loopAdditionalSlides: 5,
    loopPreventsSliding: false,
    speed: 6500,
    allowTouchMove: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 26,
      },
      1400: {
        slidesPerView: 3.5,
        spaceBetween: 28,
      },
    },
  });

  const videoPreviousButton = document.querySelector(
    ".video-testimonial-prev"
  );
  const videoNextButton = document.querySelector(".video-testimonial-next");
  const videoTestimonialShell = document.querySelector(
    ".video-testimonial-shell"
  );
  const videoPauseReasons = new Set();
  const supportsVideoHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;
  let activeMobileVideo = null;

  function getVideoTestimonials() {
    return videoTestimonialContainer
      ? Array.from(videoTestimonialContainer.querySelectorAll("video"))
      : [];
  }

  function pauseAndMuteOtherVideoTestimonials(activeVideo) {
    if (!videoTestimonialContainer) return;

    getVideoTestimonials().forEach(function (video) {
      if (video !== activeVideo) {
        video.muted = true;
        video.pause();
      }
    });
  }

  function resumeMutedVideoTestimonials() {
    getVideoTestimonials().forEach(function (video) {
      video.muted = true;
      video.play().catch(function () {});
    });
  }

  function playOnlyVideoTestimonial(video, pauseReason) {
    pauseVideoTestimonials(pauseReason);
    pauseAndMuteOtherVideoTestimonials(video);
    video.muted = false;

    video.play().catch(function () {
      video.muted = true;
      resumeMutedVideoTestimonials();
      resumeVideoTestimonials(pauseReason);
    });
  }

  function syncVideoTestimonialMovement() {
    if (videoPauseReasons.size > 0) {
      const currentTranslate = videoTestimonialSwiper.getTranslate();
      videoTestimonialSwiper.autoplay.stop();
      videoTestimonialSwiper.setTransition(0);
      videoTestimonialSwiper.setTranslate(currentTranslate);
      videoTestimonialContainer.classList.add("is-paused");
    } else {
      videoTestimonialContainer.classList.remove("is-paused");
      videoTestimonialSwiper.setTransition(videoTestimonialSwiper.params.speed);
      videoTestimonialSwiper.autoplay.start();
    }
  }

  function pauseVideoTestimonials(reason) {
    videoPauseReasons.add(reason);
    syncVideoTestimonialMovement();
  }

  function resumeVideoTestimonials(reason) {
    videoPauseReasons.delete(reason);
    syncVideoTestimonialMovement();
  }

  function moveVideoTestimonials(direction) {
    pauseVideoTestimonials("manual-navigation");

    if (direction === "previous") {
      videoTestimonialSwiper.slidePrev(500);
    } else {
      videoTestimonialSwiper.slideNext(500);
    }

    window.setTimeout(function () {
      resumeVideoTestimonials("manual-navigation");
    }, 550);
  }

  if (videoTestimonialContainer) {
    videoTestimonialContainer
      .querySelectorAll(".video-testimonial-card")
      .forEach(function (card) {
        const video = card.querySelector("video");
        if (!video) return;

        video.muted = true;
        video.play().catch(function () {});

        if (supportsVideoHover) {
          card.addEventListener("mouseenter", function () {
            playOnlyVideoTestimonial(video, "video-hover");
          });

          card.addEventListener("mouseleave", function () {
            video.muted = true;
            resumeMutedVideoTestimonials();
            resumeVideoTestimonials("video-hover");
          });
        } else {
          card.addEventListener("click", function () {
            if (activeMobileVideo === video && !video.muted) {
              activeMobileVideo = null;
              video.muted = true;
              resumeMutedVideoTestimonials();
              resumeVideoTestimonials("mobile-audio");
              return;
            }

            activeMobileVideo = video;
            playOnlyVideoTestimonial(video, "mobile-audio");
          });
        }
      });
  }

  if (videoTestimonialShell) {
    videoTestimonialShell.addEventListener("mouseenter", function () {
      pauseVideoTestimonials("carousel-hover");
    });

    videoTestimonialShell.addEventListener("mouseleave", function () {
      activeMobileVideo = null;
      resumeMutedVideoTestimonials();
      resumeVideoTestimonials("video-hover");
      resumeVideoTestimonials("mobile-audio");
      resumeVideoTestimonials("carousel-hover");
    });
  }

  if (videoPreviousButton) {
    videoPreviousButton.addEventListener("mouseenter", function () {
      pauseVideoTestimonials("previous-arrow");
    });
    videoPreviousButton.addEventListener("mouseleave", function () {
      resumeVideoTestimonials("previous-arrow");
    });
    videoPreviousButton.addEventListener("click", function () {
      moveVideoTestimonials("previous");
    });
  }

  if (videoNextButton) {
    videoNextButton.addEventListener("mouseenter", function () {
      pauseVideoTestimonials("next-arrow");
    });
    videoNextButton.addEventListener("mouseleave", function () {
      resumeVideoTestimonials("next-arrow");
    });
    videoNextButton.addEventListener("click", function () {
      moveVideoTestimonials("next");
    });
  }

  /*
  // Legacy text testimonial carousel retained in source for reference.
  const testimonials = [
    {
      name: "Rahul Singh",
      role: "Cyber Security Intern",
      rating: 5,
      review:
        "I am fortunate to have taken this course as my foundation is getting stronger. During lectures we got the best teachers and most of the sessions related to overall development in cyber security. This is the best platform to learn with hands-on projects.",
    },
    {
      name: "Priya Sharma",
      role: "Full Stack Developer",
      rating: 4,
      review:
        "Nice teaching by the lecturers. We can learn easily and understand very well. With the help of these classes, we can create projects on our own. Good teaching made full stack projects easy to complete. The organization is good and helpful for learning.",
    },
    {
      name: "Amit Kumar",
      role: "Data Science Intern",
      rating: 5,
      review:
        "I'm impressed! Good mentors who explain concepts in an understandable way. Thanks so much for your very valuable training. I really enjoyed it and appreciated the hands-on approach.",
    },
    {
      name: "Neha Patel",
      role: "Cloud Computing Intern",
      rating: 5,
      review:
        "The best company I've ever seen & experienced. They explain everything so patiently with compassion & kindness. I'm always thankful to this company for the opportunities they've provided.",
    },
    {
      name: "Vikram Reddy",
      role: "Software Development Intern",
      rating: 4,
      review:
        "In these sessions we discussed many important topics. All topics are very useful in my programming languages. .NET was also used for my practice programs. So thankful for these classes and the practical knowledge gained.",
    },
    {
      name: "Anjali Desai",
      role: "UI/UX Design Intern",
      rating: 4,
      review:
        "They taught us well. They provided us with PDFs and presentations during internship sessions and helped with resolving our doubts. The structured approach made learning design principles much easier.",
    },
  ];

  // Circular Testimonial Data - Using static HTML implementation for the second carousel
  // But keeping the data here for reference
  const circularTestimonials = [
    {
      name: "Kranthi",
      role: "Intern",
      rating: 3,
      review:
        "I had a great experience here and learn a very good information, It being helpful to my career.",
    },
    {
      name: "Sandeep",
      role: "Software Developer Intern",
      rating: 4,
      review:
        "It was nice getting job from this platform. Even though they check our technical skills and conduct interview based on it.",
    },
    {
      name: "Gaythri",
      role: "Web Developer Intern",
      rating: 5,
      review:
        "Through the intership I'm improve my skills and this company useful for me a lot i learned very easily",
    },
    {
      name: "Madhavi",
      role: ".NET Developer Intern",
      rating: 5,
      review:
        "NET Developer Interns helps us to build software using the .NET framework, JavaScript, JQuery, HTML5, and other control library.",
    },
    {
      name: "Rahul Ammuri",
      role: "Intern",
      rating: 4.5,
      review:
        "The best company I've ever seen & experienced. They are explaining everything so patiently. So compassionate & kindness. I'm always Thankful to this company",
    },
  ];

  // Initialize Testimonials Swiper with left-to-right continuous movement (opposite of default)
  const testimonialSwiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    // Pagination removed for continuous movement
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3, // Ensure 3 slides are shown on desktop
      },
    },
    autoplay: {
      delay: 0, // Set to 0 for immediate movement
      disableOnInteraction: false,
      reverseDirection: false, // Default direction (right-to-left)
    },
    loop: true,
    effect: "slide",
    speed: 5000, // Faster movement to match second carousel
    grabCursor: false, // Disable grab cursor for continuous movement
    autoHeight: false, // Disable auto height
    height: 300, // Fixed height
    centeredSlides: true,
    allowTouchMove: false, // Disable touch movement for continuous flow
    loopAdditionalSlides: 10, // Add more slides for smoother looping
    simulateTouch: false, // Disable touch simulation
    touchRatio: 0, // Disable touch ratio
    resistance: false, // Disable resistance
    watchSlidesProgress: true, // Watch slides progress
    watchSlidesVisibility: true, // Watch slides visibility
    observer: true, // Enable observer
    observeParents: true, // Enable parent observer
    on: {
      init: function () {
        // Force the carousel to start moving immediately
        this.autoplay.start();
        console.log("First carousel initialized and started");
      },
    },
  });

  // Initialize Circular Testimonials Swiper with right-to-left continuous movement
  const testimonialSwiperCircular = new Swiper(".testimonialSwiperCircular", {
    slidesPerView: 1,
    spaceBetween: 30,
    // Pagination removed for continuous movement
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3, // Ensure 3 slides are shown on desktop
      },
    },
    autoplay: {
      delay: 0, // Set to 0 for immediate movement
      disableOnInteraction: false,
      reverseDirection: true, // Left to right direction (opposite of first carousel)
    },
    loop: true,
    effect: "slide",
    speed: 5000, // Faster movement
    grabCursor: false, // Disable grab cursor for continuous movement
    autoHeight: false, // Disable auto height
    height: 300, // Fixed height
    direction: "horizontal",
    slidesPerGroup: 1,
    loopFillGroupWithBlank: true,
    centeredSlides: true,
    allowTouchMove: false, // Disable touch movement for continuous flow
    loopAdditionalSlides: 10, // Add more slides for smoother looping
    simulateTouch: false, // Disable touch simulation
    touchRatio: 0, // Disable touch ratio
    resistance: false, // Disable resistance
    watchSlidesProgress: true, // Watch slides progress
    watchSlidesVisibility: true, // Watch slides visibility
    observer: true, // Enable observer
    observeParents: true, // Enable parent observer
    on: {
      init: function () {
        // Force the carousel to start moving immediately
        this.autoplay.start();
        console.log("Second carousel initialized and started");
      },
    },
  });

  // Both swipers move independently in opposite directions - first carousel moves left-to-right, second moves right-to-left
  // Force start both carousels to ensure they're moving
  setTimeout(function () {
    testimonialSwiper.autoplay.start();
    testimonialSwiperCircular.autoplay.start();
    console.log("Both carousels forced to start after timeout");
  }, 500);

  // Add event listener to ensure carousels keep moving even if user switches tabs
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      testimonialSwiper.autoplay.start();
      testimonialSwiperCircular.autoplay.start();
      console.log("Carousels restarted after tab visibility change");
    }
  });

  // Populate Testimonials
  function populateTestimonials() {
    // Populate first slider
    const swiperWrapper = document.querySelector(
      ".testimonialSwiper .swiper-wrapper"
    );
    testimonials.forEach((testimonial) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      // Generate stars based on rating
      let starsHTML = "";
      for (let i = 0; i < testimonial.rating; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
      }

      slide.innerHTML = `
                <div class="testimonial-card">
                    <div class="testimonial-content">
                        <p class="testimonial-text mb-3">${testimonial.review}</p>
                        <div class="testimonial-author">
                            <div class="testimonial-name-rating">
                                <div>
                                    <h5 class="testimonial-name mb-1">${testimonial.name}</h5>
                                    <p class="testimonial-role mb-0">${testimonial.role}</p>
                                </div>
                                <div class="testimonial-rating">${starsHTML}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

      swiperWrapper.appendChild(slide);
    });
    // Remove previously duplicated slides (if any)
    function removeDuplicates(wrapper, baseCount) {
      while (wrapper.children.length > baseCount) {
        wrapper.removeChild(wrapper.lastChild);
      }
    }
    removeDuplicates(swiperWrapper, testimonials.length);
    // Dynamically duplicate slides on both sides until wrapper is at least 5x container width
    // This ensures a truly continuous infinite loop with no empty spaces
    const swiperContainer = document.querySelector(".testimonialSwiper");
    function fillSwiperBothSides() {
      if (
        !swiperWrapper.children[0] ||
        swiperWrapper.children[0].getBoundingClientRect().width === 0
      ) {
        setTimeout(fillSwiperBothSides, 50);
        return;
      }
      // Prepend slides on the left and mark them - add more for a truly continuous loop
      let prependedWidth = 0;
      while (prependedWidth < swiperContainer.offsetWidth * 2) {
        // Double the prepended width
        for (
          let i = testimonials.length - 1;
          i >= 0 && prependedWidth < swiperContainer.offsetWidth * 2;
          i--
        ) {
          const clone = swiperWrapper.children[i].cloneNode(true);
          clone.setAttribute("data-prepended", "true");
          swiperWrapper.insertBefore(clone, swiperWrapper.firstChild);
          prependedWidth += clone.getBoundingClientRect().width;
        }
      }
      // Append slides on the right - add more for a truly continuous loop
      while (swiperWrapper.scrollWidth < swiperContainer.offsetWidth * 5) {
        // Increase from 3x to 5x
        Array.from(swiperWrapper.children)
          .slice(0, testimonials.length)
          .forEach((slide) => {
            swiperWrapper.appendChild(slide.cloneNode(true));
          });
      }
    }
    fillSwiperBothSides();

    // No longer populating the circular slider - using static HTML instead
  }

  // Call the populate function
  populateTestimonials();

  // Wait for duplication to finish, then start ticker animation for the first carousel
  setTimeout(function () {
    if (window.initAllTickers) window.initAllTickers();
  }, 200);

  // Re-initialize ticker on window resize for responsiveness
  window.addEventListener("resize", function () {
    // Remove previous transforms and inline widths for the first carousel only
    const testimonialWrapper = document.querySelector(
      ".testimonialSwiper .swiper-wrapper"
    );
    if (testimonialWrapper) {
      const currentTransform = testimonialWrapper.style.transform;
      if (currentTransform) {
        testimonialWrapper.style.transform = "";
      }
    }

    // Re-initialize the ticker for the first carousel
    setTimeout(function () {
      if (window.initAllTickers) window.initAllTickers();
    }, 200);
  });

  */

  // Add error handling for certificate images
  document.querySelectorAll(".certificate-slider img").forEach((img) => {
    img.onerror = function () {
      console.error("Failed to load image:", img.src);

      // Try different path formats
      const filename = img.src.split("/").pop();

      // First attempt: Try with relative path
      if (img.src.includes("/img/certificates/")) {
        const relativePath = `img/certificates/${filename}`;
        console.log("Trying relative path:", relativePath);
        img.src = relativePath;
        return;
      }

      // Second attempt: Try with absolute path from root
      if (img.src.includes("img/certificates/")) {
        const absolutePath = `/img/certificates/${filename}`;
        console.log("Trying absolute path:", absolutePath);
        img.src = absolutePath;
        return;
      }

      // Final fallback: Use a default image
      console.log("Using fallback image");
      img.src = "img/certificates/1.webp"; // Use a known working image as fallback
    };
  });

  // Initialize Certificate Slider with enhanced 3D effect
  new Swiper(".certificate-slider", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 40,
    grabCursor: true,
    loop: true,
    speed: 400, // Reduced from 600 to make transitions faster
    effect: "coverflow",
    coverflowEffect: {
      rotate: 5,
      stretch: 0,
      depth: 100,
      modifier: 1.5,
      slideShadows: false,
    },
    autoplay: {
      delay: 1500, // Reduced from 2000 for faster sliding
      disableOnInteraction: false,
    },
    pagination: {
      el: ".certificate-pagination",
      clickable: true,
      dynamicBullets: true,
      renderBullet: function (_, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    navigation: {
      nextEl: ".certificate-button-next",
      prevEl: ".certificate-button-prev",
    },
    on: {
      init: function () {
        setTimeout(() => {
          document
            .querySelectorAll(".certificate-slider .swiper-slide")
            .forEach((slide) => {
              slide.style.transition =
                "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)";
            });

          // Check if images are loaded correctly
          document
            .querySelectorAll(".certificate-slider img")
            .forEach((img) => {
              if (!img.complete) {
                img.addEventListener("load", function () {
                  console.log("Image loaded successfully:", img.src);
                });
              }
            });
        }, 100);
      },
    },
    breakpoints: {
      320: {
        spaceBetween: 20,
        coverflowEffect: {
          rotate: 2,
          depth: 50,
          modifier: 1,
        },
      },
      576: {
        spaceBetween: 25,
        coverflowEffect: {
          rotate: 3,
          depth: 70,
          modifier: 1.2,
        },
      },
      768: {
        spaceBetween: 30,
        coverflowEffect: {
          rotate: 4,
          depth: 80,
          modifier: 1.3,
        },
      },
      992: {
        spaceBetween: 40,
        coverflowEffect: {
          rotate: 5,
          depth: 100,
          modifier: 1.5,
        },
      },
    },
  });
});
