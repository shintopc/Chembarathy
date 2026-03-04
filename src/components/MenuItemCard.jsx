import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

export default function MenuItemCard({ item }) {
    const { cartItems, addToCart, updateQuantity } = useCart();

    const cartItem = cartItems.find(i => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="glass-panel" style={{ display: 'flex', padding: '12px', gap: '16px', marginBottom: '16px', opacity: item.inStock ? 1 : 0.6 }}>
            {item.image ? (
                <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                    style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)'
                    }}
                />
            ) : null}
            <div
                style={{
                    display: item.image ? 'none' : 'flex',
                    width: '100px',
                    height: '100px',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(204,0,0,0.1))',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: 'var(--accent-gold)',
                    fontFamily: 'Inter',
                    flexShrink: 0
                }}
            >
                {item.name?.charAt(0)?.toUpperCase()}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '18px', margin: 0, color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: '600' }}>
                            {item.name}
                        </h3>
                        {item.isAlcohol && (
                            <span style={{ fontSize: '10px', background: 'rgba(212, 175, 55, 0.2)', color: 'var(--accent-gold)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--accent-gold)' }}>
                                21+
                            </span>
                        )}
                    </div>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: '700', marginTop: '4px' }}>
                        ₹{item.price}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '8px' }}>
                    {!item.inStock ? (
                        <span style={{ color: 'var(--danger)', fontSize: '12px', fontWeight: '600' }}>Out of Stock</span>
                    ) : quantity === 0 ? (
                        <button
                            onClick={() => addToCart(item)}
                            style={{
                                background: 'var(--accent-gold)',
                                color: 'var(--primary-bg)',
                                padding: '6px 16px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}
                        >
                            Add
                        </button>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--glass-bg)', padding: '4px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                            <button
                                onClick={() => updateQuantity(item.id, quantity - 1)}
                                style={{ color: 'var(--accent-gold)', padding: '4px', display: 'flex' }}
                            >
                                <Minus size={16} />
                            </button>
                            <span style={{ fontWeight: '600', minWidth: '16px', textAlign: 'center' }}>{quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, quantity + 1)}
                                style={{ color: 'var(--accent-gold)', padding: '4px', display: 'flex' }}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
