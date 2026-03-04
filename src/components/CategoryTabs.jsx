import React, { useRef, useEffect, useCallback } from 'react';

export default function CategoryTabs({ categories, activeCategory, onSelect }) {
    const scrollRef = useRef(null);
    const dragState = useRef({ isDown: false, hasMoved: false, startX: 0, scrollLeft: 0 });

    // Mouse wheel horizontal scroll
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handleWheel = (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    const handleMouseDown = useCallback((e) => {
        const el = scrollRef.current;
        dragState.current = {
            isDown: true,
            hasMoved: false,
            startX: e.pageX - el.offsetLeft,
            scrollLeft: el.scrollLeft
        };
        el.style.cursor = 'grabbing';
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!dragState.current.isDown) return;
        e.preventDefault();
        const el = scrollRef.current;
        const x = e.pageX - el.offsetLeft;
        const diff = Math.abs(x - dragState.current.startX);
        if (diff > 5) {
            dragState.current.hasMoved = true;
        }
        const walk = (x - dragState.current.startX) * 1.5;
        el.scrollLeft = dragState.current.scrollLeft - walk;
    }, []);

    const handleMouseUp = useCallback(() => {
        dragState.current.isDown = false;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    }, []);

    const handleClick = useCallback((cat) => {
        // Only fire click if we didn't drag
        if (!dragState.current.hasMoved) {
            onSelect(cat);
        }
        dragState.current.hasMoved = false;
    }, [onSelect]);

    // Scroll active category into view
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const activeBtn = el.querySelector('[data-active="true"]');
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [activeCategory]);

    return (
        <div
            ref={scrollRef}
            className="hide-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '16px',
                marginBottom: '8px',
                cursor: 'grab',
                userSelect: 'none',
                WebkitOverflowScrolling: 'touch'
            }}
        >
            {categories.map((cat) => (
                <button
                    key={cat}
                    data-active={activeCategory === cat ? 'true' : 'false'}
                    onClick={() => handleClick(cat)}
                    style={{
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        padding: '8px 20px',
                        borderRadius: '24px',
                        fontWeight: '600',
                        fontSize: '14px',
                        border: `1px solid ${activeCategory === cat ? 'var(--accent-gold)' : 'var(--glass-border)'}`,
                        background: activeCategory === cat ? 'var(--accent-gold)' : 'var(--glass-bg)',
                        color: activeCategory === cat ? 'var(--primary-bg)' : 'var(--text-primary)',
                        transition: 'background 0.3s ease, color 0.3s ease, border 0.3s ease'
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
