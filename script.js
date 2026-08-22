function lihatContoh() {
    window.open('https://www.tiktok.com/@den_garage', '_blank', 'noopener');
}

function scrollKeOrder() {
    document.getElementById('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function orderSekarang() {
    const paket = document.querySelector('input[name="paket"]:checked')?.value || '';
    const catatan = document.getElementById('catatan').value.trim();

    if (!paket) {
        showToast('Pilih paket dulu, ya.');
        return;
    }

    if (!confirm(`Mau lanjut order paket ${paket}?`)) return;

    let pesan = `Halo kak, aku tertarik order paket ${paket}. Masih bisa, kan?`;
    if (catatan) pesan += `\n\nIni detail atau request-ku: ${catatan}`;

    window.open(`https://wa.me/62895346263418?text=${encodeURIComponent(pesan)}`, '_blank', 'noopener');
}

function updateOrderSummary() {
    const summary = document.getElementById('orderSummary');
    const paket = document.querySelector('input[name="paket"]:checked')?.value || 'Belum dipilih';
    const catatan = document.getElementById('catatan').value.trim();
    const details = {
        'Cinematic - Rp 15.000': 'Shoot with BloxStrap HD, potrait mode, konsep bebas, dan +Edit video.',
        'Cinematic + Photoshoot - Rp 20.000': 'Shoot with BloxStrap HD, potrait mode, konsep bebas, +Edit video, Free 8 foto, dan Resolusi 4K 60FPS.',
        'Photoshoot': '1 Foto / Rp. 1.000,- dengan minim order 7 foto.'
    };

    summary.innerHTML = `<h3>Ringkasan paket</h3><p><strong>${paket}</strong></p><p>${details[paket] || 'Pilih paket untuk melihat detail pesanan.'}</p>${catatan ? '<p><em>Request sudah ditambahkan.</em></p>' : ''}`;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2500);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareWebsite() {
    const shareData = { title: 'Den Garage', text: 'Cek layanan cinematic Roblox dari Den Garage.', url: window.location.href };
    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => showToast('Link website berhasil disalin.'));
    }
}

function setupFAQ() {
    document.querySelectorAll('.faq-question').forEach((button) => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const willOpen = !item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach((openItem) => openItem.classList.remove('open'));
            if (willOpen) item.classList.add('open');
        });
    });
}

function pilihPaketDariKartu(value) {
    const radio = document.querySelector(`input[name="paket"][value="${value}"]`);
    if (!radio) return;
    radio.checked = true;
    updateOrderSummary();
    document.getElementById('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('Paket dipilih. Tambahkan request kalau ada.');
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card[data-paket]').forEach((card) => {
        card.addEventListener('click', () => pilihPaketDariKartu(card.dataset.paket));
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                pilihPaketDariKartu(card.dataset.paket);
            }
        });
    });
    document.querySelectorAll('input[name="paket"]').forEach((radio) => radio.addEventListener('change', updateOrderSummary));
    document.getElementById('catatan').addEventListener('input', updateOrderSummary);
    setupFAQ();
    updateOrderSummary();

    const revealTargets = document.querySelectorAll('.trust-strip, .section, .order-box, .preview-section');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => {
        element.classList.add('ui-reveal');
        revealObserver.observe(element);
    });
    const backToTop = document.getElementById('backToTop');
    const updateScrollUI = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        document.querySelector('.progress-fill').style.width = `${maxScroll ? (window.scrollY / maxScroll) * 100 : 0}%`;
        backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    };
    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();
});