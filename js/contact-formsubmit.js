// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Client-side validation before submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const privacyPolicy = document.getElementById('privacyPolicy').checked;

            // Simple validation
            if (!name || !email || !subject || !message || !privacyPolicy) {
                showAlert('Please fill in all required fields', 'danger');
                return false;
            }

            // Email validation
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return false;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            submitBtn.disabled = true;

            // Prepare form data
            const formData = new FormData(contactForm);

            // Submit the form to FormSubmit
            fetch('https://formsubmit.co/career@employementexpress.net', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    showAlert('Your message has been sent successfully to career@employementexpress.net', 'success');
                    // Reset form
                    contactForm.reset();
                    // Reset button
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane ms-2"></i>';
                    submitBtn.disabled = false;

                    // Show success modal if it exists
                    const successModal = document.getElementById('successModal');
                    if (successModal) {
                        const modal = new bootstrap.Modal(successModal);
                        modal.show();
                    }
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('There was a problem sending your message. Please try again later.', 'danger');
                // Reset button
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane ms-2"></i>';
                submitBtn.disabled = false;
            });
        });
    }

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to show alerts
    function showAlert(message, type) {
        // Create alert element for errors
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';

        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Insert alert before the form
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.insertBefore(alertDiv, formContainer.firstChild);

        // Auto dismiss after 5 seconds
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }

    // Add floating label animation for better UX
    const formControls = document.querySelectorAll('.form-control, .form-select');

    formControls.forEach(control => {
        // Check if field has value on page load
        if (control.value) {
            control.classList.add('has-value');
        }

        // Add event listeners for focus and blur
        control.addEventListener('focus', () => {
            control.parentElement.classList.add('focused');
        });

        control.addEventListener('blur', () => {
            control.parentElement.classList.remove('focused');
            if (control.value) {
                control.classList.add('has-value');
            } else {
                control.classList.remove('has-value');
            }
        });
    });
});
