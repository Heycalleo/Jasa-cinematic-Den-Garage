function lihatContoh() {
    window.open("https://drive.google.com/drive/folders/1vY7lSYV7-d2d1UB6uDFo6aUMl7zbHyEX?usp=sharing", "_blank");
}

function scrollKeOrder() {
    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });
}

function orderSekarang() {
    let paket = document.getElementById("paket").value;

    let nomor = "62895346263418"; // ganti nomor lu

    let pesan = `Halo, aku mau order paket: ${paket}`;

    let url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}
