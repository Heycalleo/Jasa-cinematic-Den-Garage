function lihatContoh() {
    window.open("https://drive.google.com/drive/folders/1vY7lSYV7-d2d1UB6uDFo6aUMl7zbHyEX?usp=sharing", "_blank");
}

function scrollKeOrder() {
    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });
}

function orderSekarang() {
    const paketRadios = document.getElementsByName('paket');
    let paket = '';
    for (const radio of paketRadios) {
        if (radio.checked) {
            paket = radio.value;
            break;
        }
    }
    let catatan = document.getElementById("catatan").value;

    // Fitur baru: Konfirmasi sebelum order
    let konfirmasi = confirm(`Apakah Anda yakin ingin order paket: ${paket}?`);
    if (!konfirmasi) {
        return;
    }

    let nomor = "62895346263418"; // ganti nomor lu

    let pesan = `Halo, aku mau order paket: ${paket}`;
    if (catatan.trim()) {
        pesan += `\n\nCatatan: ${catatan}`;
    }

    let url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}

function updateOrderSummary() {
    const summary = document.getElementById('orderSummary');
    const paket = document.querySelector('input[name="paket"]:checked');
    const catatan = document.getElementById('catatan').value.trim();
    const paketValue = paket ? paket.value : 'Belum dipilih';

    const details = {
        'Cinematic - Rp 20.000': 'Pengerjaan 1-2 hari. Termasuk edit video dan konsep fleksibel.',
        'Cinematic + Photo - Rp 25.000': 'Pengerjaan 2-3 hari. Termasuk cinematic + 8 foto premium.',
        'Photoshoot': 'Pengerjaan 1-2 hari. Harga foto per item Rp 1.000, minimal 7 foto.'
    };

    summary.innerHTML = `
        <h3>Ringkasan Paket</h3>
        <p><strong>${paketValue}</strong></p>
        <p>${details[paketValue] || 'Pilih paket untuk melihat detail.'}</p>
        <p><em>${catatan ? 'Catatan: ' + catatan : 'Belum ada catatan tambahan.'}</em></p>
    `;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function animateTypedText() {
    const element = document.getElementById('typedText');
    const texts = [
        'Hasil cinematic profesional untuk Roblox kamu.',
        'Order cepat, hasil rapih, dan siap revisi.',
        'Bikin momen game kamu terlihat lebih cinematic.'
    ];
    let index = 0;
    let charIndex = 0;
    let deleting = false;

    function update() {
        const currentText = texts[index];
        element.textContent = deleting
            ? currentText.slice(0, charIndex--)
            : currentText.slice(0, charIndex++);

        if (!deleting && charIndex === currentText.length + 1) {
            deleting = true;
            setTimeout(update, 1200);
            return;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            index = (index + 1) % texts.length;
            setTimeout(update, 350);
            return;
        }

        setTimeout(update, deleting ? 40 : 70);
    }

    update();
}

function updateScrollProgress() {
    const progress = document.querySelector('.progress-fill');
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY / windowHeight;
    progress.style.width = `${Math.min(Math.max(scrolled * 100, 0), 100)}%`;
}

function setupFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach((button) => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            item.classList.toggle('open');
            const isOpen = item.classList.contains('open');
            if (!isOpen) return;
            document.querySelectorAll('.faq-item.open').forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });
        });
    });
}

// Fitur baru: Share website
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'Jasa Cinematic By ALDEN GAMING',
            text: 'Cek layanan cinematic Roblox di Den Garage!',
            url: window.location.href
        });
    } else {
        // Fallback: Copy link ke clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link website berhasil disalin ke clipboard!');
        }).catch(() => {
            alert('Gagal menyalin link, silakan salin secara manual.');
        });
    }
}

// Fitur baru: Feedback sederhana
function beriFeedback() {
    document.getElementById('feedbackModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('feedbackModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Handle form submission
document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name.trim()) {
        alert('Nama harus diisi.');
        return;
    }
    
    // Kirim ke Discord webhook dengan IP
    await sendToDiscord(name, email, message);
    
    // Reset form dan tutup modal
    this.reset();
    document.getElementById('name').disabled = false; // Reset disabled state
    closeModal();
    alert('Terima kasih atas feedback Anda!');
});

async function sendToDiscord(name, email, message) {
    const webhookURL = 'https://discord.com/api/webhooks/1496756105567539201/ROdUtAr07EgYvfwOEf1KFpukpLzjzsGJ4vegzKY06O-R9fiVhdIQHY1Mz3mlBF51PqG1'; // Ganti dengan webhook URL Anda
    
    // Get IP address
    let ip = 'Tidak dapat dideteksi';
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ip = ipData.ip;
    } catch (error) {
        console.error('Error getting IP:', error);
    }
    
    const embed = {
        title: 'Feedback Baru',
        color: 0x4f46e5,
        fields: [
            {
                name: 'Nama',
                value: name,
                inline: true
            },
            {
                name: 'Email',
                value: email || 'Tidak disediakan',
                inline: true
            },
            {
                name: 'IP Address',
                value: ip,
                inline: true
            },
            {
                name: 'Pesan',
                value: message
            }
        ],
        timestamp: new Date().toISOString()
    };
    
    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });
        
        if (!response.ok) {
            console.error('Error sending to Discord:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Animasi fade-in saat scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.card, .preview-card, .footer, .testimonial-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-element');
        observer.observe(el);
    });

    // Show welcome modal on load
    setTimeout(() => {
        document.getElementById('welcomeModal').style.display = 'flex';
    }, 500); // Delay 0.5s for better UX

    // Handle anonymous checkbox
    const anonymousCheckbox = document.getElementById('anonymous');
    const nameInput = document.getElementById('name');
    
    anonymousCheckbox.addEventListener('change', () => {
        if (anonymousCheckbox.checked) {
            nameInput.value = 'Anonim';
            nameInput.disabled = true;
        } else {
            nameInput.value = '';
            nameInput.disabled = false;
        }
    });

    // Update ringkasan paket saat memilih paket atau menulis catatan
    const paketRadios = document.querySelectorAll('input[name="paket"]');
    paketRadios.forEach(radio => radio.addEventListener('change', updateOrderSummary));
    document.getElementById('catatan').addEventListener('input', updateOrderSummary);
    updateOrderSummary();

    // Animate typed text
    animateTypedText();

    // Setup FAQ accordion
    setupFAQ();

    // Tampilkan tombol back-to-top saat menggulir
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
        updateScrollProgress();
    });
    updateScrollProgress();
});

// Function for welcome modal
function startOrder() {
    document.getElementById('welcomeModal').style.display = 'none';
    scrollKeOrder();
}

function closeWelcome() {
    document.getElementById('welcomeModal').style.display = 'none';
}
