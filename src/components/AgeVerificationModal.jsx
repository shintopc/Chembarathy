import React from 'react';
import { Wine } from 'lucide-react';

export default function AgeVerificationModal({ onConfirm, onCancel }) {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            zIndex: 100
        }}>
            <div className="glass-panel" style={{
                padding: '32px',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%',
                background: 'var(--secondary-bg)',
                border: '1px solid var(--accent-gold)'
            }}>
                <div style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px'
                }}>
                    <Wine size={32} color="var(--accent-gold)" />
                </div>
                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Age Verification</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
                    You must be at least 21 years old to view and order alcohol. Please confirm your age.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                    <button
                        onClick={onConfirm}
                        className="gold-button"
                        style={{ width: '100%' }}
                    >
                        Yes, I am 21+
                    </button>
                    <button
                        onClick={onCancel}
                        className="gold-outline-button"
                        style={{ width: '100%', borderColor: 'var(--glass-border)', color: 'var(--text-secondary)' }}
                    >
                        No, show normal menu
                    </button>
                </div>
            </div>
        </div>
    );
}
