import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCart() {
    const { getCartCount, getCartTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const count = getCartCount();
    const total = getCartTotal();

    // Don't show if cart is empty or we're already on the cart page
    if (count === 0 || location.pathname === '/cart') {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '16px',
            right: '16px',
            maxWidth: '568px',
            margin: '0 auto',
            zIndex: 50
        }}>
            <button
                onClick={() => navigate('/cart')}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--accent-gold)',
                    color: 'var(--primary-bg)',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
                    fontWeight: '600',
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingBag size={20} />
                    <span>{count} {count === 1 ? 'item' : 'items'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span>₹{total}</span>
                    <span>View Cart &rarr;</span>
                </div>
            </button>
        </div>
    );
}
