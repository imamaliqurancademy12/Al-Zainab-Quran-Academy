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