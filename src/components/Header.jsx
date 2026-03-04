import React from 'react';
import { generateCallWaiterLink, generateBillRequestLink } from '../utils/whatsapp';
import { Bell, CreditCard } from 'lucide-react';

export default function Header({ tableNumber, waiter }) {
    const callWaiter = () => {
        window.open(generateCallWaiterLink(tableNumber), '_blank');
    };

    const requestBill = () => {
        window.open(generateBillRequestLink(tableNumber), '_blank');
    };

    return (
        <header className="glass-panel" style={{ padding: '16px', marginBottom: '24px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <img src="/logo.png" alt="Chembarathy Logo" style={{ height: '60px', width: 'auto' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>Table {tableNumber}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Waiter: {waiter?.name}</div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button onClick={callWaiter} className="gold-outline-button" style={{ flex: 1, padding: '8px', fontSize: '12px' }}>
                    <Bell size={16} /> Call Waiter
                </button>
                <button onClick={requestBill} className="gold-outline-button" style={{ flex: 1, padding: '8px', fontSize: '12px' }}>
                    <CreditCard size={16} /> Request Bill
                </button>
            </div>
        </header>
    );
}
