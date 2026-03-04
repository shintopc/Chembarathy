import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import menuData from '../data/menu.json';
import { getWaiterForTable } from '../utils/waiters';
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';
import MenuItemCard from '../components/MenuItemCard';
import FloatingCart from '../components/FloatingCart';
import AgeVerificationModal from '../components/AgeVerificationModal';

export default function Menu() {
    const navigate = useNavigate();
    const tableNumber = localStorage.getItem('chembarathy_table');

    useEffect(() => {
        if (!tableNumber) {
            navigate('/');
        }
    }, [tableNumber, navigate]);

    const waiter = getWaiterForTable(tableNumber);

    const [activeCategory, setActiveCategory] = useState(menuData.categories[0]);
    const [showAgeModal, setShowAgeModal] = useState(false);
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [pendingCategory, setPendingCategory] = useState(null);

    // Build a set of categories that contain alcohol items
    const alcoholCategories = new Set(
        menuData.items.filter(item => item.isAlcohol).map(item => item.category)
    );

    useEffect(() => {
        // Check local storage for existing verification to avoid re-prompting on reload
        if (localStorage.getItem('chembarathy_age_verified') === 'true') {
            setIsAgeVerified(true);
        }
    }, []);

    const handleCategorySelect = (category) => {
        if (alcoholCategories.has(category) && !isAgeVerified) {
            setPendingCategory(category);
            setShowAgeModal(true);
        } else {
            setActiveCategory(category);
        }
    };

    const handleAgeConfirm = () => {
        localStorage.setItem('chembarathy_age_verified', 'true');
        setIsAgeVerified(true);
        setShowAgeModal(false);
        setActiveCategory(pendingCategory || activeCategory);
        setPendingCategory(null);
    };

    const handleAgeCancel = () => {
        setShowAgeModal(false);
        // Stay on current category
    };

    // Filter items based on active category
    const filteredItems = menuData.items.filter(item => {
        // If we're not filtering by category and it's alcohol, but unverified, hide it
        if (item.isAlcohol && !isAgeVerified) {
            return false;
        }
        return item.category === activeCategory;
    });

    return (
        <div className="container page-fade-enter page-fade-enter-active">
            <Header tableNumber={tableNumber} waiter={waiter} />

            <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--primary-bg)', paddingTop: '8px', paddingBottom: '8px' }}>
                <CategoryTabs
                    categories={menuData.categories}
                    activeCategory={activeCategory}
                    onSelect={handleCategorySelect}
                />
            </div>

            <div style={{ marginTop: '16px' }}>
                {filteredItems.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
                {filteredItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        No items in this category currently.
                    </div>
                )}
            </div>

            <FloatingCart />

            {showAgeModal && (
                <AgeVerificationModal
                    onConfirm={handleAgeConfirm}
                    onCancel={handleAgeCancel}
                />
            )}
        </div>
    );
}
