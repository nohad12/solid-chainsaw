// تفعيل القائمة المتنقلة
document.addEventListener('DOMContentLoaded', function() {
    // عناصر القائمة المتنقلة
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    // إظهار/إخفاء كلمة المرور
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // التحقق من قوة كلمة المرور
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            
            // حساب قوة كلمة المرور
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            // تحديث شريط القوة
            let width = '0%';
            let color = '#ff4d4d';
            let text = 'ضعيفة';
            
            if (strength === 1) {
                width = '25%';
                color = '#ff4d4d';
                text = 'ضعيفة';
            } else if (strength === 2) {
                width = '50%';
                color = '#ffa500';
                text = 'متوسطة';
            } else if (strength === 3) {
                width = '75%';
                color = '#ffff00';
                text = 'جيدة';
            } else if (strength >= 4) {
                width = '100%';
                color = '#00ff00';
                text = 'قوية جدًا';
            }
            
            strengthBar.style.setProperty('--strength-width', width);
            strengthBar.style.setProperty('--strength-color', color);
            strengthText.textContent = قوة كلمة المرور: ${text};
            
            // تحديث لون الشريط
            strengthBar.querySelector('::after')?.style.setProperty('background-color', color);
            strengthBar.querySelector('::after')?.style.setProperty('width', width);
            
            // تحديث العرض مباشرة
            const afterElement = strengthBar.querySelector('.strength-bar::after') || 
                document.createElement('div');
            afterElement.style.width = width;
            afterElement.style.backgroundColor = color;
            afterElement.style.height = '100%';
            afterElement.style.borderRadius = '3px';
            
            // إذا لم يكن موجودًا، نضيفه
            if (!strengthBar.querySelector('.strength-fill')) {
                const fillElement = document.createElement('div');
                fillElement.className = 'strength-fill';
                fillElement.style.width = width;
                fillElement.style.backgroundColor = color;
                fillElement.style.height = '100%';
                fillElement.style.borderRadius = '3px';
                strengthBar.innerHTML = '';
                strengthBar.appendChild(fillElement);
            } else {
                const fillElement = strengthBar.querySelector('.strength-fill');
                fillElement.style.width = width;
                fillElement.style.backgroundColor = color;
            }
        });
    }
    
    // التحقق من تطابق كلمة المرور
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.style.borderColor = '#ff4d4d';
            } else {
                this.style.borderColor = '#00ff00';
            }
        });
    }
    
    // معالجة نموذج التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة البيانات
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('كلمة المرور غير متطابقة!');
                return;
            }
            
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                alert('يجب الموافقة على الشروط والأحكام');
                return;
            }
            
            // هنا يمكن إرسال البيانات إلى الخادم
            alert('تم إنشاء الحساب بنجاح! سيتم توجيهك إلى صفحة الدفع.');
            
            // إعادة تعيين النموذج
            registerForm.reset();
            
            // إعادة توجيه إلى صفحة الدفع (محاكاة)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    
    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // تجاهل الروابط التي لا تشير إلى قسم في الصفحة الحالية
            if (href === '#' || href.includes('.html')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثير التمرير للعناصر
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر لإضافة تأثيرات التمرير
    document.querySelectorAll('.service-card, .package-card, .info-card').forEach(el => {
        observer.observe(el);
    });
});