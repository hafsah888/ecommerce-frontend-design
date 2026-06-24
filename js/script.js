
document.addEventListener('DOMContentLoaded', () => {

    const on = (selector, event, handler) => {
        document.querySelectorAll(selector).forEach(el => el.addEventListener(event, handler));
    };


    const timerBoxes = document.querySelectorAll('.deals-section .timer-box');
    if (timerBoxes.length === 4) {
        let t = [];
        timerBoxes.forEach(box => t.push(parseInt(box.querySelector('.timer-num').textContent)));
        let [days, hours, mins, secs] = t;

        const tick = () => {
            if (secs > 0) secs--;
            else if (mins > 0) { secs = 59; mins--; }
            else if (hours > 0) { secs = 59; mins = 59; hours--; }
            else if (days > 0) { secs = 59; mins = 59; hours = 23; days--; }
            else { clearInterval(interval); return; }

            const vals = [days, hours, mins, secs];
            timerBoxes.forEach((box, i) => {
                box.querySelector('.timer-num').textContent = String(vals[i]).padStart(2, '0');
            });
        };
        const interval = setInterval(tick, 1000);
    }
    on('.thumb', 'click', function() {
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const mainImg = document.querySelector('.main-image img');
        if (mainImg) mainImg.src = this.querySelector('img').src;
    });

    on('.tab-bar .tab', 'click', function() {
        document.querySelectorAll('.tab-bar .tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });


    on('.filter-heading, .section-heading, .filter-accordion-row', 'click', function() {
        const icon = this.querySelector('i, .arrow');
        if (icon) {
            icon.classList.toggle('fa-angle-up');
            icon.classList.toggle('fa-angle-down');
        }
        let body = this.nextElementSibling;
        if (body) {
            body.style.display = body.style.display === 'none' ? 'block' : 'none';
        }
    });

    on('.filter-tag .fa-xmark', 'click', function() {
        this.closest('.filter-tag').remove();
    });
    
    on('.clear-all-filter', 'click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.filter-tag').forEach(t => t.remove());
    });


    on('.view-btn', 'click', function() {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });

    on('.page-btn', 'click', function() {
        if (!this.querySelector('i')) { // Ignore next/prev arrows
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        }
    });

    on('.favorite-btn, .wishlist-btn', 'click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('i');
        if (icon) {
            const isRegular = icon.classList.contains('fa-regular');
            icon.classList.toggle('fa-regular', !isRegular);
            icon.classList.toggle('fa-solid', isRegular);
            this.style.color = isRegular ? '#FA3434' : '';
        } else {
            // For Unicode hearts (&#9825;)
            if (this.innerHTML.includes('♡')) {
                this.innerHTML = this.innerHTML.replace('♡', '♥');
                this.style.color = '#FA3434';
            } else if (this.innerHTML.includes('♥')) {
                this.innerHTML = this.innerHTML.replace('♥', '♡');
                this.style.color = '';
            }
        }
    });

    on('.btn-remove', 'click', function() {
        this.closest('.cart-item').remove();
    });

    const removeAllBtn = document.querySelector('.btn-remove-all');
    if (removeAllBtn) {
        removeAllBtn.addEventListener('click', () => {
            document.querySelectorAll('.cart-item').forEach(item => item.remove());
            const cartTitle = document.querySelector('.cart-title');
            if (cartTitle) cartTitle.textContent = 'My cart (0)';
            alert('All items removed from cart!');
        });
    }


    on('.btn-save', 'click', function() {
        alert('Item saved for later!');
        this.closest('.cart-item').remove();
    });


    on('.btn-move', 'click', function() {
        alert('Item moved to cart!');
        this.closest('.saved-item').remove();
    });

    on('.qty-box', 'click', function() {
        const span = this.querySelector('span');
        let match = span.textContent.match(/Qty: (\d+)/);
        if (match) {
            let qty = parseInt(match[1]) + 1;
            span.textContent = `Qty: ${qty}`;
        }
    });

  
    on('.coupon-input-group .btn-apply', 'click', function() {
        const input = document.querySelector('.coupon-input');
        if (input.value.trim() !== '') {
            alert('Coupon applied successfully!');
        } else {
            alert('Please enter a coupon code.');
        }
    });

    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => alert('Proceeding to checkout...'));
    
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) backBtn.addEventListener('click', () => window.location.href = 'index.html');

    on('.btn-shopnow, .btn-shop-now', 'click', () => window.location.href = 'product_grid_view.html');
    on('.btn-send-inquiry, .btn-inquiry', 'click', () => alert('Inquiry sent successfully!'));

    on('.newsletter-form', 'submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input && input.value.trim() !== '') {
            alert('Thank you for subscribing!');
            input.value = '';
        } else {
            alert('Please enter a valid email.');
        }
    });

    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const input = document.querySelector('.search-input');
            if (input && input.value.trim() !== '') {
                window.location.href = 'product_grid_view.html';
            } else {
                alert('Please enter something to search.');
            }
        });
    }

    on('.action-item', 'click', function() {
        const text = this.querySelector('span').textContent.toLowerCase();
        if (text.includes('cart')) {
            window.location.href = 'cart.html';
        }
    });
const addToCartBtn = document.querySelector('.btn-add-to-cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        addToCartBtn.textContent = '✓ Added to Cart!';
        addToCartBtn.style.background = '#00B517';
        setTimeout(function() {
            addToCartBtn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';
            addToCartBtn.style.background = '';
        }, 2000);
    });
}
});