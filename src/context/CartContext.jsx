import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('chembarathy_cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('chembarathy_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item, quantity = 1) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems(prev => {
            if (quantity <= 0) {
                return prev.filter(i => i.id !== itemId);
            }
            return prev.map(i => i.id === itemId ? { ...i, quantity } : i);
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => prev.filter(i => i.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('chembarathy_cart');
    };

    const openAgeModal = () => {
        localStorage.setItem('chembarathy_age_verified', 'true');
        window.dispatchEvent(new Event('storage'));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            getCartTotal,
            getCartCount,
            openAgeModal
        }}>
            {children}
        </CartContext.Provider>
    );
}
