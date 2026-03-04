import { getWaiterForTable } from './waiters';

export function generateWhatsAppLink(cart, tableNumber) {
    const waiter = getWaiterForTable(tableNumber);
    if (!waiter) return null;

    let message = `Order from Chembarathy Restaurant & Bar\n`;
    message += `Table: ${tableNumber}\n`;
    message += `Waiter: ${waiter.name}\n\n`;
    message += `Items:\n`;

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.name} x${item.quantity} - ₹${itemTotal}\n`;
    });

    message += `\nTotal: ₹${total}`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${waiter.number}?text=${encodedMessage}`;
}

export function generateCallWaiterLink(tableNumber) {
    const waiter = getWaiterForTable(tableNumber);
    if (!waiter) return null;
    const msg = encodeURIComponent(`Table ${tableNumber} needs assistance.`);
    return `https://wa.me/${waiter.number}?text=${msg}`;
}

export function generateBillRequestLink(tableNumber) {
    const waiter = getWaiterForTable(tableNumber);
    if (!waiter) return null;
    const msg = encodeURIComponent(`Table ${tableNumber} requesting bill.`);
    return `https://wa.me/${waiter.number}?text=${msg}`;
}
