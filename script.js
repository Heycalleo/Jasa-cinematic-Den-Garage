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
            alert('Link website berhasil disalin!');
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
});

// Function for welcome modal
function startOrder() {
    document.getElementById('welcomeModal').style.display = 'none';
    scrollKeOrder();
}

function closeWelcome() {
    document.getElementById('welcomeModal').style.display = 'none';
}
