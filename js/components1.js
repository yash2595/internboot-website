// Function to set the active navigation link based on the current page
function setActiveNavLink() {
    // Get the current page from the URL
    let currentPage = "";

    // Handle different URL formats
    if (window.location.pathname) {
        // Split by '/' and get the last part
        const pathParts = window.location.pathname.split("/");
        currentPage = pathParts[pathParts.length - 1];
    }

    // If no specific page is found in the URL, check if we're on the root/index
    if (!currentPage || currentPage === "") {
        // Check if we're on the root domain or index.html
        if (
            window.location.href.endsWith("/") ||
            window.location.href.endsWith("/index.html") ||
            window.location.href.endsWith("/index.php")
        ) {
            currentPage = "index.html";
        }
    }

    currentPage = currentPage.toLowerCase();
    console.log("Current page detected:", currentPage);

    // Remove all active classes first
    document.querySelectorAll("#navbarNav .nav-link").forEach((link) => {
        link.classList.remove("active");
    });

    // Set active class based on current page
    if (
        currentPage === "" ||
        currentPage === "index.html" ||
        currentPage === "index.php"
    ) {
        const homeLink = document.getElementById("nav-home");
        if (homeLink) homeLink.classList.add("active");
    } else if (
        currentPage === "internforeign.html" ||
        currentPage === "internboot.html" ||
        currentPage === "ambassabodorfaq.html" ||
        currentPage === "ambassadorfaq.html" ||
        currentPage.includes("ambassador")
    ) {
        const ambassadorLink = document.getElementById("nav-ambassador");
        if (ambassadorLink) ambassadorLink.classList.add("active");
    } else if (
        currentPage === "internshipfaq.html"
    ) {
        const faqLink = document.getElementById("nav-faq");
        if (faqLink) faqLink.classList.add("active");
    } else if (
        currentPage === "internship.html"
    ) {
        const internshipsLink = document.getElementById("nav-internships");
        if (internshipsLink) internshipsLink.classList.add("active");
    } else if (
        currentPage === "achievements.html" ||
        currentPage.includes("achievement")
    ) {
        const testimonialsLink = document.getElementById("nav-testimonials");
        if (testimonialsLink) testimonialsLink.classList.add("active");
    } else if (currentPage === "about.html" || currentPage.includes("about")) {
        const aboutLink = document.getElementById("nav-about");
        if (aboutLink) aboutLink.classList.add("active");
    } else if (
        currentPage === "contact.html" ||
        currentPage.includes("contact")
    ) {
        const contactLink = document.getElementById("nav-contact");
        if (contactLink) contactLink.classList.add("active");
    }
}

// Load components when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize components

    // No custom scroll event listeners - keeping it simple
    // Add a style tag to ensure consistent navbar styling
    const styleTag = document.createElement("style");
    styleTag.textContent = `
        body {
            padding-top: 80px; /* Height of the navbar */
            font-family: 'Inter', sans-serif;
        }

        .navbar {
            background-color: transparent !important;
            box-shadow: none !important;
            padding: 12px 0;
            transition: all 0.3s ease;
            width: 100%;
            left: 0;
            right: 0;
            position: fixed;
            top: 0;
            z-index: 1030;
        }

        @media (max-width: 991.98px) {
            .navbar {
                background-color: white !important;
                padding: 0 !important;
                width: 100vw !important;
                left: 0 !important;
                right: 0 !important;
                max-width: 100vw !important;
            }

            .container-fluid {
                padding: 0 !important;
                margin: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
            }
        }

        .navbar-container {
            background: white;
            border-radius: 12px;
            border: none;
            padding: 8px 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
        }

        @media (max-width: 991.98px) {
            .navbar-container {
                border-radius: 0 !important;
                max-width: 100vw !important;
                width: 100vw !important;
                margin: 0 !important;
                padding: 10px 20px !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
                position: relative !important;
                left: 0 !important;
                right: 0 !important;
            }
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
            color: #333;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
        }

        .navbar-brand img.navbar-logo {
            height: 48px;
            width: auto;
            transition: transform 0.3s ease;
        }

        .navbar-brand:hover img.navbar-logo {
            transform: scale(1.05);
        }

        /* Add a subtle pulse animation for the logo on page load */
        @keyframes logoPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
        }

        .navbar-logo-animation {
            animation: logoPulse 1.5s ease-in-out;
        }

        /* Footer logo styles */
        .footer-logo a {
            display: flex;
            align-items: center;
        }

        .footer-logo-img {
            width: 120px;
            height: auto;
            transition: transform 0.3s ease;
        }

        .footer-logo a:hover .footer-logo-img {
            transform: scale(1.05);
        }

        /* Footer link hover effects */
        .footer-links a:hover {
            color: #ffffff !important;
            transform: translateX(5px);
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            padding-left: 8px !important;
        }

        /* Footer bottom links hover effects */
        .row.align-items-center a:hover {
            color: #ffffff !important;
            text-decoration: underline !important;
        }

        /* Navbar links styling */
        .navbar-nav .nav-link {
            color: #444 !important;
            font-weight: 500;
            padding: 0.4rem 0.8rem !important;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-family: 'Space Grotesk', sans-serif;
            letter-spacing: 0.3px;
            margin: 0 3px;
            border-radius: 6px;
        }

        .navbar-nav .nav-link:hover, .navbar-nav .nav-link.active {
            color: #0d6efd !important;
            background-color: rgba(13, 110, 253, 0.08);
        }

        .navbar-nav .nav-link.active {
            font-weight: 600;
            position: relative;
        }

        .navbar-nav .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background: #0d6efd;
            border-radius: 10px;
        }

        /* Dropdown Menu Styles */
        .navbar-nav .dropdown-menu {
            border: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 0.5rem 0;
            margin-top: 0.5rem;
            animation: fadeInDown 0.3s ease;
            min-width: 200px;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .navbar-nav .dropdown-item {
            color: #444;
            font-weight: 500;
            padding: 0.6rem 1.5rem;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            font-family: 'Space Grotesk', sans-serif;
        }

        .navbar-nav .dropdown-item:hover {
            background-color: rgba(13, 110, 253, 0.08);
            color: #0d6efd;
            padding-left: 2rem;
        }

        .navbar-nav .dropdown-item:active {
            background-color: rgba(13, 110, 253, 0.15);
            color: #0d6efd;
        }

        .navbar-nav .dropdown-toggle::after {
            margin-left: 0.3rem;
            vertical-align: 0.15em;
            transition: transform 0.3s ease;
        }

        .navbar-nav .dropdown-toggle[aria-expanded="true"]::after {
            transform: rotate(180deg);
        }

        /* Mobile navbar styling */
        @media (max-width: 991.98px) {
            body {
                padding-top: 70px;
            }

            .navbar {
                padding: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
            }

            .container, .container-fluid {
                max-width: 100% !important;
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            /* Navbar container styling moved to main CSS */

            .navbar-collapse {
                background-color: #ffffff;
                padding: 15px;
                border-radius: 0;
                margin-top: 0;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                width: 100%;
                max-width: 100%;
                left: 0;
                right: 0;
                position: absolute;
                top: 100%;
            }

            .navbar-nav {
                margin-bottom: 15px;
                width: 100%;
                text-align: center;
            }

            .navbar-toggler {
                padding: 4px 8px;
                font-size: 1rem;
                border: none;
                background-color: #f8f9fa;
                border-radius: 8px;
                z-index: 1050;
            }

            /* Mobile dropdown styles */
            .navbar-nav .dropdown-menu {
                border: none;
                box-shadow: none;
                padding-left: 1rem;
                margin-top: 0;
                background-color: #f8f9fa;
                border-radius: 0;
            }

            .navbar-nav .dropdown-item {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }

            .navbar-nav .dropdown-item:hover {
                padding-left: 1.5rem;
            }
        }
    `;
    document.head.appendChild(styleTag);

    // Insert navbar HTML
    document.getElementById("navbar-container").innerHTML = `
    <!-- Navbar - Simplified structure for better Bootstrap compatibility -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container-fluid px-0">
            <div class="navbar-container d-flex flex-wrap justify-content-between align-items-center" style="background: white; padding: 8px 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); width: 100%; max-width: 100%; margin: 0; box-sizing: border-box;">
                <a class="navbar-brand fw-bold d-flex align-items-center" href="index.html">
                    <img src="img/logos/internboot-official-logo.jpeg" alt="internboot logo" class="navbar-logo me-2" style="height: 48px; width: auto; transition: all 0.3s ease; vertical-align: middle; filter: brightness(1.2);">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" id="nav-home" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="nav-internships" href="internship.html">Internships</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="nav-testimonials" href="achievements.html">Achievements</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="nav-about" href="about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="nav-contact" href="contact.html">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="nav-faq" href="internshipfaq.html">FAQ</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="nav-ambassador" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ambassador Programme
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="nav-ambassador">
                                <li><a class="dropdown-item" href="ambassador-program.html">Program Overview</a></li>
                                <li><a class="dropdown-item" href="ambassador-terms.html">Terms & Conditions for Indian Candidates</a></li>
                                <li><a class="dropdown-item" href="ambassador-terms-foreign.html">Terms & Conditions for Foreign Candidates</a></li>
                                <li><a class="dropdown-item" href="ambassabodorfaq.html">Ambassador Programme FAQ</a></li>
                                
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    `;

    // Insert footer HTML
    document.getElementById("footer-container").innerHTML = `
    <!-- Footer -->
    <footer class="footer py-5" style="width: 100%; position: relative; z-index: 10; bottom: 0; left: 0; right: 0; background: linear-gradient(135deg, #5eacff 0%, #4a90e2 100%); box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.08); overflow: hidden; padding-top: 3rem;">
        <!-- Wave separator at the top -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 30px; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDEyMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZD0iTTAsNDYuMjlDNDcuNzksMjQuMDksMTAzLjU5LDE0LjEyLDE1OCwxOC4yOWM3MC4zNiw1LjM3LDEzNi4zMywzMy4zMSwyMDYuOCwzNy41YzczLjg0LDQuMiwyMTIuNSwtNDEuODksMzE2LjM2LC0xNy43M2M2OS4yNywxOCwxMzguMyw0LjY3LDIwOS40LDE2LjQ3YzM2LjE1LDYsNjkuODUsMTcuODQsMTA0LjQ1LDI5LjM0YzkyLjU0LDMwLjc5LDIwNS4xNyw3MC4xOSwyOTIuMzcsLTEuNDdDMTI4Ny4xNCw0Ni40OCwxMjk4LjYxLDQwLjI3LDEzMDAsNDBWMEgwVjQ2LjI5WiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiPjwvcGF0aD48L3N2Zz4='); background-size: cover; background-position: center bottom; transform: rotate(180deg); z-index: 1;"></div>

        <!-- Subtle pattern overlay -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0ibm9uZSIvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpIi8+Cjwvc3ZnPg=='); opacity: 0.6; z-index: 0;"></div>
        <!-- Modern geometric accent -->
        <div style="position: absolute; top: 20px; right: 5%; width: 150px; height: 150px; background: rgba(255, 255, 255, 0.05); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; z-index: 0; animation: float-shape 15s infinite ease-in-out;"></div>
        <div style="position: absolute; bottom: 40px; left: 5%; width: 100px; height: 100px; background: rgba(255, 255, 255, 0.05); border-radius: 42% 58% 65% 35% / 30% 42% 58% 70%; z-index: 0; animation: float-shape 12s infinite ease-in-out reverse;"></div>
        <div class="container" style="position: relative; z-index: 1;">
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h3 class="footer-logo">
                        <a href="index.html" style="color: white; text-decoration: none;" class="d-flex align-items-center">
                            <img src="img/logos/internboot-official-logo.jpeg" alt="internboot logo" class="footer-logo-img me-3" style="width: 120px; height: auto; filter: brightness(1.2) contrast(1.1);">
                        </a>
                    </h3>
                    <p style="color: rgba(255, 255, 255, 0.95); margin-top: 1.5rem; font-size: 1.05rem; max-width: 90%;">Connecting talented students with top companies for meaningful internship experiences that shape future careers</p>
                    <div class="social-icons d-flex gap-3 mt-4">
                        <a href="https://www.linkedin.com/showcase/internboot/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style="width: 42px; height: 42px; display: inline-flex; align-items: center; justify-content: center; background: #2a74d6; border-radius: 50%; color: white; font-size: 18px; text-decoration: none; transition: all 0.3s ease;"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://www.instagram.com/employmentexpressllp/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="width: 42px; height: 42px; display: inline-flex; align-items: center; justify-content: center; background: #2a74d6; border-radius: 50%; color: white; font-size: 18px; text-decoration: none; transition: all 0.3s ease;"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/internboot" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="width: 42px; height: 42px; display: inline-flex; align-items: center; justify-content: center; background: #2a74d6; border-radius: 50%; color: white; font-size: 18px; text-decoration: none; transition: all 0.3s ease;"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.youtube.com/@internboot" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style="width: 42px; height: 42px; display: inline-flex; align-items: center; justify-content: center; background: #2a74d6; border-radius: 50%; color: white; font-size: 18px; text-decoration: none; transition: all 0.3s ease;"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
                    <h5 style="color: #ffffff; font-weight: 700; position: relative; display: inline-block; margin-bottom: 1.2rem;">
                        For Students
                        <span style="position: absolute; bottom: -8px; left: 0; width: 40px; height: 3px; background: rgba(255, 255, 255, 0.3); border-radius: 10px;"></span>
                    </h5>
                    <ul class="footer-links" style="list-style: none; padding-left: 0;">
                        <li><a href="internship.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Internships for Students</a></li>
                        <li><a href="https://assessment.internboot.com/" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Assessments</a></li>
                        <li><a href="achievements.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Achievements</a></li>
                    </ul>
                </div>

                <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
                    <h5 style="color: #ffffff; font-weight: 700; position: relative; display: inline-block; margin-bottom: 1.2rem;">
                        Company
                        <span style="position: absolute; bottom: -8px; left: 0; width: 40px; height: 3px; background: rgba(255, 255, 255, 0.3); border-radius: 10px;"></span>
                    </h5>
                    <ul class="footer-links" style="list-style: none; padding-left: 0;">
                        <li><a href="index.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Home</a></li>
                        <li><a href="about.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>About Us</a></li>
                        <li><a href="https://blogs.internboot.com/" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Blog</a></li>
                        <li><a href="contact.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-4">
                    <h5 style="color: #ffffff; font-weight: 700; position: relative; display: inline-block; margin-bottom: 1.2rem;">
                        Legal
                        <span style="position: absolute; bottom: -8px; left: 0; width: 40px; height: 3px; background: rgba(255, 255, 255, 0.3); border-radius: 10px;"></span>
                    </h5>
                    <ul class="footer-links" style="list-style: none; padding-left: 0;">
                        <li><a href="terms-of-service.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Terms of Service</a></li>
                        <li><a href="privacy-policy.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Privacy Policy</a></li>
                        <li><a href="refund-policy.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Refund & Cancellation</a></li>
                        <li><a href="cookie-policy.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Cookie Policy</a></li>
                        <li><a href="disclaimer.html" style="color: rgba(255, 255, 255, 0.9); transition: all 0.3s ease; text-decoration: none; display: block; padding: 6px 0; border-radius: 4px;"><i class="fas fa-chevron-right me-2" style="font-size: 0.7rem; opacity: 0.7;"></i>Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            <hr class="mt-4 mb-4" style="background-color: rgba(255, 255, 255, 0.3); opacity: 0.5;">
            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    <p class="mb-0" style="color: rgba(255, 255, 255, 0.9); font-weight: 500;">© 2025 <span style="font-weight: 700;">InternBoot</span>. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <p class="mb-0" style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">
                        <a href="contact.html" style="color: rgba(255, 255, 255, 0.9); text-decoration: none; margin: 0 8px; transition: all 0.3s ease;">Support</a> |
                        <a href="internshipfaq.html" style="color: rgba(255, 255, 255, 0.9); text-decoration: none; margin: 0 8px; transition: all 0.3s ease;">FAQ</a> |
                        <a href="sitemap.xml" style="color: rgba(255, 255, 255, 0.9); text-decoration: none; margin: 0 8px; transition: all 0.3s ease;">Sitemap</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    `;

    // Set active nav link
    setActiveNavLink();

    // Add animation to the logos
    setTimeout(() => {
        // Navbar logo animation
        const navbarLogo = document.querySelector(".navbar-logo");
        if (navbarLogo) {
            navbarLogo.classList.add("navbar-logo-animation");
        }

        // Footer logo animation
        const footerLogo = document.querySelector(".footer-logo-img");
        if (footerLogo) {
            footerLogo.classList.add("navbar-logo-animation");
        }

        // Footer logo text animation
        const footerLogoText = document.querySelector(".footer-logo a span");
        if (footerLogoText) {
            footerLogoText.classList.add("footer-logo-animation");
        }
    }, 500);

    // Only set active nav link - let Bootstrap handle all toggle functionality
    setTimeout(() => {
        // Call setActiveNavLink to highlight the current page in the navbar
        setActiveNavLink();
    }, 300);

    // Mobile menu HTML is no longer needed as we're using Bootstrap's native toggle
});
