import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { getWaiterForTable } from '../utils/waiters';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function Cart() {
    const { cartItems, getCartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [tableNumber, setTableNumber] = useState('');
    const [waiter, setWaiter] = useState(null);

    useEffect(() => {
        const table = localStorage.getItem('chembarathy_table');
        if (table) {
            setTableNumber(table);
            setWaiter(getWaiterForTable(table));
        }
    }, []);

    const total = getCartTotal();

    const handleCheckout = () => {
        if (!tableNumber || !waiter) {
            alert("Table information is missing. Please scan the QR code again.");
            return;
        }
        const whatsappLink = generateWhatsAppLink(cartItems, tableNumber);
        if (whatsappLink) {
            window.open(whatsappLink, '_blank');
            clearCart();
            navigate('/success');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container page-fade-enter page-fade-enter-active" style={{ textAlign: 'center', paddingTop: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: '50%' }}>
                        <Trash2 size={48} color="var(--text-muted)" />
                    </div>
                </div>
                <h2 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Looks like you haven't added anything yet.</p>
                <button
                    onClick={() => navigate('/menu')}
                    className="gold-button"
                >
                    Return to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="container page-fade-enter page-fade-enter-active">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', position: 'sticky', top: 0, background: 'var(--primary-bg)', zIndex: 10 }}>
                <button onClick={() => navigate(-1)} style={{ color: 'var(--text-primary)', display: 'flex' }}>
                    <ArrowLeft size={24} />
                </button>
                <h2 style={{ fontSize: '20px', margin: 0 }}>Your Order</h2>
            </div>

            <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>
                    <span>Table No.</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{tableNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '14px' }}>
                    <span>Assigned Waiter</span>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>{waiter?.name}</span>
                </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
                {cartItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div style={{ flex: 1, paddingRight: '16px' }}>
                            <h4 style={{ fontSize: '16px', margin: '0 0 4px', fontFamily: 'Inter', color: 'var(--text-primary)' }}>{item.name}</h4>
                            <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>₹{item.price} each</div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <select
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    style={{
                                        background: 'var(--glass-bg)',
                                        color: 'var(--text-primary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        outline: 'none',
                                        fontFamily: 'Inter'
                                    }}
                                >
                                    {[...Array(20).keys()].map(n => (
                                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                                    ))}
                                </select>
                                <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--danger)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                                    <Trash2 size={14} /> Remove
                                </button>
                            </div>
                        </div>
                        <div style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>
                            ₹{item.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                    <span>Item Total</span>
                    <span>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    <span>Taxes & Charges</span>
                    <span>Included</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: '16px',
                    fontWeight: '700',
                    fontSize: '18px',
                    color: 'var(--accent-gold)'
                }}>
                    <span>Grand Total</span>
                    <span>₹{total}</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', marginBottom: '40px' }}>
                <button onClick={handleCheckout} className="gold-button" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                    Send Order to Waiter
                </button>
                <button onClick={() => navigate(-1)} className="gold-outline-button" style={{ width: '100%', borderColor: 'transparent', color: 'var(--text-secondary)' }}>
                    Add More Items
                </button>
            </div>
        </div>
    );
}
