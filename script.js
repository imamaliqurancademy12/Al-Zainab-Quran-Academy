// ========== MOBILE HAMBURGER MENU ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== TESTIMONIAL SLIDER ==========
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    });
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    });
}

// ========== FAQ TOGGLE (INTERACTIVE) ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
        // Change icon from plus to minus
        const icon = question.querySelector('.faq-toggle i');
        if (item.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
});

// ========== CONTACT FORM SUBMISSION (simulated) ==========
const form = document.getElementById('admissionForm');
const statusMsg = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            statusMsg.innerHTML = '⚠️ Please enter a valid name.';
            statusMsg.style.color = '#c0392b';
            return;
        }
        statusMsg.innerHTML = '✅ Request sent! Our team will contact you within 24 hours.';
        statusMsg.style.color = '#0b3b2f';
        form.reset();
        setTimeout(() => { statusMsg.innerHTML = ''; }, 5000);
    });
}

// ========== SMOOTH SCROLLING FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
        }
    });
});

// ========== FEE PLAN SELECTION ==========
function selectPlan(planName, amount) {
    // Store selected plan in localStorage
    localStorage.setItem('selectedPlan', planName);
    localStorage.setItem('selectedAmount', amount);
    
    // Show confirmation message
    const confirmation = confirm(
        `📚 Al-Zainab Quran Academy\n\n` +
        `You selected: ${planName}\n` +
        `Monthly Fee: $${amount}\n\n` +
        `Click OK to proceed with registration.\n` +
        `We'll contact you within 24 hours.`
    );
    
    if (confirmation) {
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Auto-fill course selection if possible
        const courseSelect = document.getElementById('course');
        if (courseSelect) {
            courseSelect.value = planName;
        }
        
        // Optional: Send data to Google Analytics or tracking
        console.log(`Plan Selected: ${planName} - $${amount}`);
        
        // Show success toast (optional)
        showToast(`✅ ${planName} selected! Please complete the form below.`);
    }
}

// Optional: Toast notification function
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
        
        // Add styles for toast
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0b3b2f;
            color: white;
            padding: 12px 24px;
            border-radius: 40px;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Auto-fill contact form if plan was selected from fee page
document.addEventListener('DOMContentLoaded', function() {
    const savedPlan = localStorage.getItem('selectedPlan');
    const courseSelect = document.getElementById('course');
    
    if (savedPlan && courseSelect && courseSelect.value === 'Select a course') {
        courseSelect.value = savedPlan;
        // Clear after using
        localStorage.removeItem('selectedPlan');
    }
});

// ========== WHATSAPP BUTTON TRACKING ==========
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
        // Track WhatsApp click (optional - for analytics)
        console.log('WhatsApp button clicked at: ' + new Date().toISOString());
        
        // You can add Google Analytics event here
        // gtag('event', 'whatsapp_click', { 'event_category': 'contact' });
    });
}

/* ========== WEB3FORM STYLING ========== */
.web3form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.web3-contact-form {
    width: 100%;
}

/* Form Header */
.form-header {
    text-align: center;
    margin-bottom: 2rem;
}

.form-header h3 {
    font-size: 1.8rem;
    color: #0b3b2f;
    margin-bottom: 0.5rem;
}

.form-header p {
    color: #7a7a8a;
    font-size: 0.9rem;
}

/* Form Groups */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #1e1e2a;
    font-size: 0.9rem;
}

.form-group label i {
    color: #c29a2e;
    margin-right: 8px;
}

.required {
    color: #e74c3c;
}

/* Input Fields */
.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
    background: #fafafa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #c29a2e;
    background: white;
    box-shadow: 0 0 0 3px rgba(194, 154, 46, 0.1);
}

.form-group input:hover,
.form-group select:hover,
.form-group textarea:hover {
    border-color: #c29a2e;
}

/* Placeholder Styling */
.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #b0b0b0;
    font-size: 0.9rem;
}

/* Submit Button */
.submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #0b3b2f 0%, #1a5a48 100%);
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 40px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.submit-btn i {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
}

.submit-btn:hover {
    background: linear-gradient(135deg, #c29a2e 0%, #d4af37 100%);
    color: #1e1e2a;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(194, 154, 46, 0.3);
}

.submit-btn:hover i {
    transform: translateX(5px);
}

.submit-btn:active {
    transform: translateY(0);
}

/* Form Status Messages */
.form-status {
    margin-top: 1.5rem;
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    font-size: 0.9rem;
    display: none;
}

.form-status.success {
    display: block;
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-status.error {
    display: block;
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.form-status.loading {
    display: block;
    background: #e7f3ff;
    color: #004085;
    border: 1px solid #b8daff;
}

/* Disabled Button State */
.submit-btn.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
    .web3form-container {
        padding: 1.5rem;
        margin: 0 1rem;
    }
    
    .form-header h3 {
        font-size: 1.5rem;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 10px 14px;
        font-size: 0.9rem;
    }
    
    .submit-btn {
        padding: 12px 24px;
        font-size: 0.9rem;
    }
}

/* Loading Animation for Submit Button */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.submit-btn.loading i {
    animation: spin 1s linear infinite;
}

/* Success Animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-status.success,
.form-status.error {
    animation: fadeInUp 0.5s ease;
}
