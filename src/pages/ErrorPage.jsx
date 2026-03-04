import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function ErrorPage() {
    const [searchParams] = useSearchParams();
    const reason = searchParams.get('reason');

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '24px', borderRadius: '50%', marginBottom: '24px' }}>
                <AlertTriangle size={48} color="var(--danger)" />
            </div>
            <h1 style={{ fontSize: '28px', color: 'var(--danger)', marginBottom: '16px', fontFamily: 'Inter', fontWeight: '700' }}>
                Oops! Missing Table info
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '300px' }}>
                {reason === 'invalid_table'
                    ? "The table number scanned does not exist in our system."
                    : "Please scan the QR code located on your table to view the menu and place an order."}
            </p>

            <div className="glass-panel" style={{ padding: '24px', width: '100%' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--accent-gold)' }}>Inside the Restaurant?</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    Ensure that you scan the QR code using your phone's camera to be properly assigned a waiter.
                </p>
            </div>
        </div>
    );
}
