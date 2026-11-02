// Katalog RIZZ XTER: dua pilihan utama APK dan BUY KEY.
const OWNER_WHATSAPP = "6282123752905";
const APK_URL = "https://www.mediafire.com/file/9qu331zsoap7fi8/VEXA+DELUXE+PREMIUM.apk/file";
const prices = [["1 Hari",4000],["2 Hari",7000],["3 Hari",12000],["5 Hari",17000],["7 Hari",20000],["1 Bulan",25000],["Permanen",30000]];
const money = n => "Rp" + Number(n).toLocaleString("id-ID");
const grid = document.querySelector("#product-grid");
const dialog = document.querySelector("#order-dialog");
const form = document.querySelector("#order-form");
const duration = document.querySelector("#duration");
let selectedPrice = null;

function updateTotal() {
  const option = duration.selectedOptions[0];
  const amount = option ? Number(option.dataset.price) : 0;
  document.querySelector("#order-total").textContent = amount ? money(amount) : "Rp0";
}
function openOrder() {
  selectedPrice = prices;
  duration.replaceChildren();
  const placeholder = document.createElement("option");
  placeholder.value = ""; placeholder.textContent = "Pilih masa key"; placeholder.disabled = true; placeholder.selected = true;
  duration.appendChild(placeholder);
  prices.forEach(([label, price]) => {
    const option = document.createElement("option");
    option.value = label; option.textContent = `${label} — ${money(price)}`;
    option.dataset.price = String(price);
    duration.appendChild(option);
  });
  document.querySelector("#dialog-title").textContent = "VEXA DELUXE PREMIUM — BUY KEY";
  document.querySelector("#dialog-description").textContent = "Pilih masa key, lalu isi data pemesan.";
  updateTotal();
  if (!dialog.open) dialog.showModal();
}
function addCard(tagText, title, description, action) {
  const card = document.createElement("article"); card.className = "product";
  const tag = document.createElement("div"); tag.className = "tag"; tag.textContent = tagText;
  const h = document.createElement("h3"); h.textContent = title;
  const p = document.createElement("p"); p.textContent = description;
  const button = action();
  card.append(tag,h,p,button); grid.appendChild(card);
}
addCard("DOWNLOAD APK","VEXA DELUXE PREMIUM APK","Unduh file APK melalui tautan MediaFire.",() => {
  const a = document.createElement("a"); a.className = "primary-btn full";
  a.href = APK_URL; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = "DOWNLOAD APK ↗"; return a;
});
addCard("LICENSE KEY","BUY KEY","Pesan key VEXA DELUXE PREMIUM melalui WhatsApp admin.",() => {
  const b = document.createElement("button"); b.type = "button"; b.className = "primary-btn full";
  b.textContent = "BELI KEY ↗"; b.addEventListener("click",openOrder); return b;
});

duration.addEventListener("change", updateTotal);
document.querySelector("#order-close").addEventListener("click", () => dialog.close());
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity() || !duration.value) return;
  const option = duration.selectedOptions[0];
  const name = document.querySelector("#buyer-name").value.trim();
  const phone = document.querySelector("#buyer-whatsapp").value.trim();
  const email = document.querySelector("#buyer-email").value.trim();
  const message = [
    "Halo Admin RIZZ XTER, saya ingin memesan BUY KEY VEXA DELUXE PREMIUM:","",
    `Paket: ${option.value}`,`Total: ${money(option.dataset.price)}`,
    `Nama: ${name}`,`WhatsApp pembeli: ${phone}`,`Email penerima lisensi: ${email}`,
    "Metode pembayaran: QRIS","",
    "Saya akan mengirim bukti pembayaran di chat ini. Mohon verifikasi pembayaran sebelum mengirim key."
  ].join("\n");
  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
  dialog.close(); window.location.href = url;
});
document.querySelector("#year").textContent = new Date().getFullYear();
