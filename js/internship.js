// Internship data - this would typically come from a backend API
const internships = [
    {
        id: 1,
        title: "Financial Analyst",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Financial Analyst",
        description: "Build practical skills in financial modeling, budgeting, forecasting, data analysis, and business reporting through remote project-based finance work.",
        icon: "fas fa-chart-line"
    },
    {
        id: 2,
        title: "Human Resource",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Human Resource",
        description: "Gain hands-on exposure to recruitment, onboarding, employee engagement, HR operations, documentation, and workplace communication.",
        icon: "fas fa-users"
    },
    {
        id: 3,
        title: "Web Development",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Web Development",
        description: "Learn to build responsive web experiences using front-end and back-end development practices, modern tooling, and real project workflows.",
        icon: "fas fa-laptop-code"
    },
    {
        id: 4,
        title: "Cyber Security",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Cyber Security",
        description: "Develop foundations in vulnerability assessment, threat awareness, security monitoring, policy basics, and protecting digital systems.",
        icon: "fas fa-shield-alt"
    },
    {
        id: 5,
        title: "Software Development",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Software Development",
        description: "Practice software design, coding, debugging, version control, testing basics, and application development through structured assignments.",
        icon: "fas fa-code"
    },
    {
        id: 6,
        title: "Data Science & Data Analyst",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Data Science & Data Analyst",
        description: "Work with data cleaning, analysis, visualization, reporting, statistical thinking, and insight generation for business decision-making.",
        icon: "fas fa-chart-bar"
    },
    {
        id: 7,
        title: "Digital Marketing",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Digital Marketing",
        description: "Explore SEO, social media, campaign planning, content marketing, analytics, and digital growth strategies through practical tasks.",
        icon: "fas fa-bullhorn"
    },
    {
        id: 8,
        title: "Sales & Marketing",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Sales & Marketing",
        description: "Build skills in lead generation, customer communication, market outreach, campaign support, sales funnels, and performance tracking.",
        icon: "fas fa-handshake"
    },
    {
        id: 9,
        title: "Business Development",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Business Development",
        description: "Learn prospect research, partnership outreach, market mapping, client communication, proposal support, and growth opportunity tracking.",
        icon: "fas fa-briefcase"
    },
    {
        id: 10,
        title: "Portfolio Management",
        company: "InternBoot",
        location: "Remote",
        duration: "Flexible",
        workType: "Remote",
        category: "Portfolio Management",
        description: "Understand portfolio tracking, investment research basics, risk review, performance reporting, and structured financial decision support.",
        icon: "fas fa-folder-open"
    }
];

// Items per page
const itemsPerPage = 5;
let currentPage = 1;

// Get URL parameters to determine current page
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('page')) {
    currentPage = parseInt(urlParams.get('page'));
}

// Filter and sort state
let filters = {
    category: 'All Categories'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load filter values from URL or localStorage
    loadFilterState();

    // Set up event listeners for filters
    setupFilterListeners();

    // Display internships based on current filters
    displayInternships();

    // Initialize Certificate Slider
    initCertificateSlider();
});

// Initialize Certificate Slider
function initCertificateSlider() {
    if (!document.querySelector(".certificate-slider")) {
        return;
    }

    const certificateSlider = new Swiper(".certificate-slider", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 25,
        grabCursor: true,
        loop: true,
        speed: 400, // Reduced from 800 to make transitions faster
        effect: "coverflow",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: false,
        },
        autoplay: {
            delay: 1500, // Reduced from 3000 for faster sliding
            disableOnInteraction: false,
        },
        pagination: {
            el: ".certificate-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        navigation: {
            nextEl: ".certificate-button-next",
            prevEl: ".certificate-button-prev",
        },
        breakpoints: {
            320: {
                spaceBetween: 15,
            },
            576: {
                spaceBetween: 20,
            },
            768: {
                spaceBetween: 25,
            },
        },
    });
}

// Load filter state from URL parameters or localStorage
function loadFilterState() {
    // Check URL parameters first
    if (urlParams.has('category')) {
        filters.category = urlParams.get('category');
    } else if (localStorage.getItem('internshipFilters')) {
        // Fall back to localStorage if available
        const savedFilters = JSON.parse(localStorage.getItem('internshipFilters'));
        filters.category = savedFilters.category || 'All Categories';
    }

    const approvedCategories = ['All Categories', ...internships.map(internship => internship.category)];
    if (!approvedCategories.includes(filters.category)) {
        filters.category = 'All Categories';
        saveFilterState();
    }

    // Set form values based on filters
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = filters.category;
    }
}

// Set up event listeners for filter controls
function setupFilterListeners() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filters.category = this.value;
            saveFilterState();
            navigateToPage(1);
        });
    }

    const filterForm = document.querySelector('.filter-section form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
}

// Save filter state to localStorage
function saveFilterState() {
    localStorage.setItem('internshipFilters', JSON.stringify(filters));
}

// Navigate to a specific page with current filters
function navigateToPage(page) {
    // Build query string with filters
    let queryParams = new URLSearchParams();
    queryParams.set('page', page);

    if (filters.category !== 'All Categories') {
        queryParams.set('category', filters.category);
    }

    // Determine which page file to navigate to
    let pageFile = 'internship.html';
    if (page === 2) {
        pageFile = 'internship-page2.html';
    }

    // Navigate to the page with query parameters
    window.location.href = pageFile + '?' + queryParams.toString();
}

// Filter internships based on current filters
function filterInternships() {
    return internships.filter(internship => {
        if (filters.category !== 'All Categories' && internship.category !== filters.category) {
            return false;
        }

        return true;
    });
}

function displayInternships() {
    const filteredInternships = filterInternships();
    const totalPages = Math.max(1, Math.ceil(filteredInternships.length / itemsPerPage));

    if (currentPage > totalPages) {
        navigateToPage(totalPages);
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageInternships = filteredInternships.slice(startIndex, endIndex);

    const container = document.querySelector('.listing-column, .col-lg-9');
    if (!container) return;

    const existingCards = container.querySelectorAll('.internship-card');
    existingCards.forEach(card => card.remove());

    const header = container.querySelector('.d-flex.justify-content-between');
    const countElement = header ? header.querySelector('h2') : null;
    if (countElement) {
        countElement.textContent = 'Available Internships';
    }

    const pagination = container.querySelector('nav');
    pageInternships.forEach(internship => {
        const card = createInternshipCard(internship);
        container.insertBefore(card, pagination);
    });

    updatePagination(totalPages);
}

// Map internship cards to the closest dedicated program page.
function getProgramDetailsUrl(internship) {
    const programPages = {
        'Financial Analyst': 'internships/financial-analyst.html',
        'Human Resource': 'internships/human-resource.html',
        'Web Development': 'internships/web-development.html',
        'Cyber Security': 'internships/cyber.html',
        'Software Development': 'internships/software-development.html',
        'Data Science & Data Analyst': 'internships/data-science.html',
        'Digital Marketing': 'internships/digital-marketing.html',
        'Sales & Marketing': 'internships/sales-and-marketing.html',
        'Business Development': 'internships/business-development.html',
        'Portfolio Management': 'internships/portfolio-management.html'
    };

    return programPages[internship.category] || 'internship.html';
}

// Create an internship card element
function createInternshipCard(internship) {
    const card = document.createElement('div');
    card.className = 'internship-card';
    const programDetailsUrl = getProgramDetailsUrl(internship);

    card.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center mb-3">
                <div class="bg-light rounded-circle p-3 me-3">
                    <i class="${internship.icon} text-primary fs-4"></i>
                </div>
                <div>
                    <h5 class="internship-title">${internship.title}</h5>
                </div>
            </div>
            <div class="internship-details">
                <div class="detail-item">
                    <i class="fas fa-home"></i>
                    <span>Remote</span>
                </div>
            </div>
            <p class="mb-3">${internship.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-success">Actively Hiring</span>
                <a href="https://stuportal.internboot.com/" class="btn btn-outline-primary" data-id="${internship.id}">Apply</a>
            </div>
            <div class="mt-2 text-end">
                <small><a href="${programDetailsUrl}" class="text-decoration-none">View Program Details</a></small>
            </div>
        </div>
    `;

    return card;
}

// Update pagination controls
function updatePagination(totalPages) {
    const nav = document.querySelector('nav[aria-label="Page navigation"]');
    const pagination = nav ? nav.querySelector('.pagination') : null;
    if (!nav || !pagination) return;

    if (totalPages <= 1) {
        nav.style.display = 'none';
        return;
    }

    nav.style.display = '';
    const items = [];

    items.push(`
        <li class="page-item${currentPage === 1 ? ' disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}"${currentPage === 1 ? ' tabindex="-1" aria-disabled="true"' : ''}>Previous</a>
        </li>
    `);

    for (let page = 1; page <= totalPages; page += 1) {
        items.push(`
            <li class="page-item${page === currentPage ? ' active' : ''}">
                <a class="page-link" href="${page === 1 ? 'internship.html' : 'internship-page2.html'}" data-page="${page}">${page}</a>
            </li>
        `);
    }

    items.push(`
        <li class="page-item${currentPage === totalPages ? ' disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}"${currentPage === totalPages ? ' tabindex="-1" aria-disabled="true"' : ''}>Next</a>
        </li>
    `);

    pagination.innerHTML = items.join('');
    pagination.querySelectorAll('a[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = parseInt(this.getAttribute('data-page'), 10);
            if (!Number.isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
                navigateToPage(targetPage);
            }
        });
    });
}
