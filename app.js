const WA_NUMBER = '6282123752905';
const money = n => 'Rp' + Number(n).toLocaleString('id-ID');
const dialog = document.getElementById('order-dialog');
let currentOrder = { days: '', price: 0 };
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-days]').forEach(button => {
  button.addEventListener('click', () => {
    currentOrder = { days: button.dataset.days, price: Number(button.dataset.price) };
    document.getElementById('selected-days').textContent = currentOrder.days;
    document.getElementById('selected-price').textContent = money(currentOrder.price);
    dialog.showModal();
  });
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
document.getElementById('send-whatsapp').addEventListener('click', () => {
  const name = document.getElementById('buyer-name').value.trim();
  const email = document.getElementById('buyer-email').value.trim();
  const phone = document.getElementById('buyer-phone').value.trim();
  if (!name || !email || !phone) {
    document.getElementById('buyer-name').reportValidity();
    document.getElementById('buyer-email').reportValidity();
    document.getElementById('buyer-phone').reportValidity();
    return;
  }
  const message = `Halo Owner VEXA DELUX, saya ingin konfirmasi pembelian key.\n\nNama: ${name}\nEmail penerima key: ${email}\nNomor WhatsApp: ${phone}\nPaket: ${currentOrder.days}\nTotal: ${money(currentOrder.price)}\n\nSaya sudah melakukan pembayaran melalui QRIS. Saya akan melampirkan screenshot bukti transaksi di chat ini. Mohon verifikasi dan kirim key setelah pembayaran terkonfirmasi.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
