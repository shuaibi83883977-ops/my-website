// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Food Picker Functionality
const foodOptions = [
    '麻辣香锅', '黄焖鸡米饭', '沙县小吃', '兰州拉面', '重庆小面',
    '麻辣烫', '煲仔饭', '烤肉拌饭', '酸菜鱼', '水煮肉片',
    '宫保鸡丁', '鱼香肉丝', '回锅肉', '麻婆豆腐', '糖醋里脊',
    '红烧肉', '白切鸡', '烤鸭', '火锅', '烧烤',
    '寿司', '披萨', '汉堡', '炸鸡', '意面',
    '煎饼果子', '肉夹馍', '凉皮', '酸辣粉', '螺蛳粉'
];

let foodHistoryList = [];

function initFoodPicker() {
    const foodBtn = document.getElementById('foodBtn');
    const foodResult = document.getElementById('foodResult');
    const foodHistory = document.getElementById('foodHistory');

    console.log('Initializing food picker, elements found:', {
        foodBtn: !!foodBtn,
        foodResult: !!foodResult,
        foodHistory: !!foodHistory
    });

    if (foodBtn && foodResult) {
        console.log('Food picker elements found, adding event listener');

        foodBtn.addEventListener('click', function() {
            console.log('Food button clicked!');

            // Simple test first
            foodResult.textContent = '测试成功！正在选择...';

            // Disable button during animation
            this.disabled = true;

            setTimeout(() => {
                // Random selection
                const randomFood = foodOptions[Math.floor(Math.random() * foodOptions.length)];
                foodResult.textContent = `今天吃：${randomFood} 🍽️`;

                // Add to history
                foodHistoryList.unshift(randomFood);
                if (foodHistoryList.length > 5) {
                    foodHistoryList.pop();
                }

                updateFoodHistory(foodHistory);

                // Re-enable button
                this.disabled = false;
            }, 1000);
        });

        // Visual feedback that button is ready
        foodBtn.style.cursor = 'pointer';
        foodBtn.title = '点击选择今天吃什么';
        console.log('Food picker initialized successfully');
    } else {
        console.error('Food picker elements not found');
    }
}

function updateFoodHistory(foodHistory) {
    if (foodHistoryList.length > 0 && foodHistory) {
        foodHistory.innerHTML = '<h4>最近选择：</h4>' +
            foodHistoryList.map(food => `<span class="history-item">${food}</span>`).join('');
    }
}

// Initialize food picker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing food picker...');
    initFoodPicker();
});

// Portfolio hover effects
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Simple scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';
        }
    });
}, { threshold: 0.1 });

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add floating animation to skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'float 3s ease-in-out infinite';
});

// Simple scroll effect for navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }

    lastScrollTop = scrollTop;
}, { passive: true });


// Add glow effect to section titles on scroll
document.querySelectorAll('.section-title').forEach(title => {
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                title.style.textShadow = '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.6)';
            } else {
                title.style.textShadow = 'none';
            }
        });
    }, { threshold: 0.5 });

    titleObserver.observe(title);
});

// Add ripple effect to buttons
document.querySelectorAll('.food-btn, .project-link, .social-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Show first section immediately with special effect
    const firstSection = document.querySelector('section');
    if (firstSection) {
        setTimeout(() => {
            firstSection.style.opacity = '1';
            firstSection.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        }, 500);
    }
});


// Contact form functionality (if you want to add a contact form later)
// For now, we'll add click effects to contact items
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    item.addEventListener('click', () => {
        const text = item.querySelector('span').textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = item.querySelector('span').textContent;
            item.querySelector('span').textContent = '已复制!';
            setTimeout(() => {
                item.querySelector('span').textContent = originalText;
            }, 1000);
        });
    });

    item.style.cursor = 'pointer';
    item.title = '点击复制';
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Show first section immediately
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'translateY(0)';
    }

    // Initialize particles if available
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: ['#00ffff', '#ff00ff', '#ffffff'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.4, random: true },
                    size: { value: 2, random: true },
                    line_linked: { enable: true, distance: 120, color: '#00ffff', opacity: 0.1, width: 1 },
                    move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false, out_mode: 'out' }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { grab: { distance: 100, line_linked: { opacity: 0.5 } }, push: { particles_nb: 2 } }
                },
                retina_detect: true
            });
        } catch (e) {
            console.log('Particles initialization failed:', e);
        }
    }
});