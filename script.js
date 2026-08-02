//* =========================================
   FADLI CYBER OS - ULTIMATE SCRIPT V2.0
   Fitur: Matrix Rain, Real-time Clock, 
          Typewriter Effect, Glitch Title
========================================= */

// 1. MATRIX RAIN EFFECT (Canvas Animation)
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'FADLICYBEROS0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; // Start at random heights
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0'; // Neon Green
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// 2. REAL-TIME CLOCK WITH PULSE EFFECT
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    
    const clockEl = document.getElementById('jam');
    if (clockEl) {
        clockEl.innerText = `${h}.${m}.${s}`;
        
        // Add subtle pulse on second change
        clockEl.style.textShadow = '0 0 15px #00ff66, 0 0 30px rgba(0,255,102,0.8)';
        setTimeout(() => {
            clockEl.style.textShadow = '0 0 8px #00ff66';
        }, 200);
    }
}

setInterval(updateClock, 1000);
updateClock();


// 3. TYPEWRITER EFFECT FOR WELCOME TEXT
function typeWriter(elementId, text, speed = 50) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    el.innerText = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            el.innerText += text.charAt(i);
            i++;
            setTimeout(type, speed + Math.random() * 30); // Random typing speed for realism
        }
    }
    
    type();
}

// Jalankan typewriter setelah halaman load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        typeWriter('welcome-text', 'Welcome To My Website', 60);
    }, 500);
});


// 4. GLITCH EFFECT ON TITLE HOVER
const title = document.querySelector('h1');
if (title) {
    const originalText = title.innerText;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    title.addEventListener('mouseover', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            title.innerText = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) return originalText[index];
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) clearInterval(interval);
            iterations += 1/3;
        }, 30);
    });
    
    title.addEventListener('mouseout', () => {
        title.innerText = originalText;
    });
}


// 5. ENTER BUTTON TOGGLE MENU
function halo() {
    const menu = document.getElementById('menu');
    const btn = document.querySelector('button');
    
    if (!menu || !btn) return;
    
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        btn.innerText = 'ENTER';
        btn.style.boxShadow = '0 0 15px var(--neon-cyan)';
    } else {
        menu.style.display = 'block';
        btn.innerText = 'CLOSE';
        btn.style.boxShadow = '0 0 25px var(--neon-green)';
        btn.style.background = 'var(--neon-green)';
        
        // Animate menu items in
        const links = menu.querySelectorAll('a');
        links.forEach((link, i) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }
}
