import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
    const navigate = useNavigate();
    const tableNumber = localStorage.getItem('chembarathy_table');

    return (
        <div className="container page-fade-enter page-fade-enter-active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '24px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '50%', marginBottom: '32px' }}>
                <CheckCircle size={56} color="var(--success)" />
            </div>

            <h1 style={{ fontSize: '32px', color: 'var(--accent-gold)', marginBottom: '16px' }}>Order Sent!</h1>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '16px', maxWidth: '300px' }}>
                Your order has been successfully sent to your waiter. Sit back, relax, and your drinks and food will be right with you.
            </p>

            <div className="glass-panel" style={{ padding: '24px', width: '100%', marginBottom: '40px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: '600' }}>Need anything else?</h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>You can always request the bill or call the waiter from the menu screen.</p>
            </div>

            <button
                onClick={() => navigate('/menu')}
                className="gold-button"
                style={{ width: '100%', padding: '16px', fontSize: '16px' }}
            >
                Back to Menu
            </button>
        </div>
    );
}
