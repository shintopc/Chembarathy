import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Utensils, Wine, Clock, MapPin,
    Star, Leaf, ChefHat, Users, Phone, MessageCircle
} from 'lucide-react';
import { waiters } from '../utils/waiters';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
        title: 'Welcome to Chembarathy',
        subtitle: 'Step into a world of elegance and tradition.'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop',
        title: 'Authentic Flavours',
        subtitle: 'Signature dishes crafted with passion.'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
        title: 'Premium Bar Experience',
        subtitle: 'Exquisite cocktails to elevate your evening.'
    }
];

const signatureDishes = [
    { id: 1, name: "Butter Chicken", price: "₹450", image: "https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?w=500&q=80", bestSeller: true, desc: "Rich tomato gravy, smoky chicken." },
    { id: 2, name: "Mutton Biryani", price: "₹500", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80", bestSeller: true, desc: "Aromatic basmati, slow-cooked mutton." },
    { id: 3, name: "Chicken Tikka", price: "₹350", image: "https://images.unsplash.com/photo-1599487405270-b28c0301dc8b?w=500&q=80", bestSeller: false, desc: "Tandoori charred chicken chunks." },
    { id: 4, name: "Paneer Chili", price: "₹300", image: "https://images.unsplash.com/photo-1551881192-002e02ad3d87?w=500&q=80", bestSeller: false, desc: "Spicy Indo-Chinese cottage cheese." },
];

const cocktails = [
    { id: 1, name: "Smoked Old Fashioned", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80" },
    { id: 2, name: "Spicy Margarita", image: "https://images.unsplash.com/photo-1582262047306-a9709a31a9de?w=500&q=80" },
    { id: 3, name: "Classic Negroni", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80" },
];

const reviews = [
    { id: 1, name: "Rahul S.", rating: 5, text: "Absolutely incredible food and amazing ambience. The Butter Chicken is a must-try!" },
    { id: 2, name: "Priya M.", rating: 5, text: "The cocktails at the bar are world-class. Great place for a weekend evening." },
    { id: 3, name: "Amit K.", rating: 4, text: "Very premium experience. The staff is courteous and the ordering is super convenient." },
];

const gallery = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80",
];

export default function Home() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState('1');
    const [activeIndex, setActiveIndex] = useState(0);

    const allTables = waiters.flatMap(w => w.tables).sort((a, b) => a - b);

    const handleOrderClick = () => {
        setShowModal(true);
    };

    const handleTableSubmit = () => {
        localStorage.setItem('chembarathy_table', selectedTable);
        navigate(`/menu`);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--primary-bg)', overflowX: 'hidden' }}>

            {/* ----------------- Hero Section (100vh) ----------------- */}
            <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Swiper
                        modules={[EffectFade, Autoplay, Pagination]}
                        effect="fade"
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        speed={1500}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.9) 100%)'
                                    }} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '32px 16px',
                    paddingBottom: '80px'
                }}>
                    <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 100 }}>
                        <img src="/logo.png" alt="Chembarathy Logo" style={{ height: '80px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            >
                                <h2 style={{ fontSize: '42px', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1.2' }}>
                                    {slides[activeIndex].title}
                                </h2>
                                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '80%', margin: '0 auto' }}>
                                    {slides[activeIndex].subtitle}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', zIndex: 20 }}>
                        <button
                            onClick={handleOrderClick}
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-red), #8b0000)',
                                color: 'var(--text-primary)',
                                padding: '18px 48px',
                                borderRadius: '30px',
                                fontSize: '18px',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 8px 32px rgba(204, 0, 0, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Order Now <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ----------------- Signature Dishes Section ----------------- */}
            <section style={{ padding: '64px 16px', background: 'var(--secondary-bg)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px', color: 'var(--accent-gold)', marginBottom: '16px' }}>Signature Dishes</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>
                    Experience the finest culinary creations from our master chefs.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
                    {signatureDishes.map(dish => (
                        <div key={dish.id} className="glass-panel" style={{ position: 'relative', overflow: 'hidden', textAlign: 'left', background: 'var(--primary-bg)' }}>
                            {dish.bestSeller && (
                                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent-gold)', color: '#000', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', zIndex: 2 }}>
                                    Best Seller
                                </div>
                            )}
                            <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '20px', margin: '0 0 8px', color: 'var(--text-primary)' }}>{dish.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>{dish.desc}</p>
                                <div style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '18px' }}>{dish.price}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleOrderClick}
                    className="gold-outline-button"
                    style={{ marginTop: '40px' }}
                >
                    View Full Menu <ArrowRight size={18} />
                </button>
            </section>

            {/* ----------------- Bar Experience Section ----------------- */}
            <section style={{ padding: '64px 16px', background: 'var(--primary-bg)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px', color: 'var(--accent-gold)', marginBottom: '16px' }}>Premium Bar Experience</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>
                    Elevate your evening with our artisan crafted cocktails and premium libations.
                </p>

                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '24px', scrollSnapType: 'x mandatory' }} className="hide-scrollbar">
                    {cocktails.map(cocktail => (
                        <div key={cocktail.id} style={{ minWidth: '240px', scrollSnapAlign: 'start', borderRadius: '16px', overflow: 'hidden', position: 'relative', height: '320px' }}>
                            <img src={cocktail.image} alt={cocktail.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                                <h3 style={{ color: 'var(--accent-gold)', margin: 0, fontSize: '20px', fontFamily: 'Inter', fontWeight: '600' }}>{cocktail.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleOrderClick}
                    className="gold-button"
                    style={{ marginTop: '24px' }}
                >
                    Explore Bar Menu <Wine size={18} />
                </button>
            </section>

            {/* ----------------- Why Choose Us Section ----------------- */}
            <section style={{ padding: '64px 16px', background: 'var(--secondary-bg)' }}>
                <h2 style={{ fontSize: '32px', color: 'var(--accent-gold)', textAlign: 'center', marginBottom: '40px' }}>Why Choose Us</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '500px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', padding: '16px' }}>
                        <Leaf size={32} color="var(--accent-gold)" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontFamily: 'Inter' }}>Fresh Ingredients</h4>
                    </div>
                    <div style={{ textAlign: 'center', padding: '16px' }}>
                        <ChefHat size={32} color="var(--accent-gold)" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontFamily: 'Inter' }}>Experienced Chefs</h4>
                    </div>
                    <div style={{ textAlign: 'center', padding: '16px' }}>
                        <Star size={32} color="var(--accent-gold)" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontFamily: 'Inter' }}>Premium Ambience</h4>
                    </div>
                    <div style={{ textAlign: 'center', padding: '16px' }}>
                        <Users size={32} color="var(--accent-gold)" style={{ margin: '0 auto 12px' }} />
                        <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px', fontFamily: 'Inter' }}>Family Friendly</h4>
                    </div>
                </div>
            </section>

            {/* ----------------- Customer Reviews Section ----------------- */}
            <section style={{ padding: '64px 16px', background: 'var(--primary-bg)', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Star size={32} color="var(--accent-gold)" fill="var(--accent-gold)" />
                    <h2 style={{ fontSize: '32px', color: 'var(--text-primary)', margin: 0, fontFamily: 'Inter', fontWeight: '700' }}>4.6 Rating</h2>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Trusted by hundreds of guests.</p>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true }}
                    loop={true}
                    style={{ paddingBottom: '40px', maxWidth: '600px', margin: '0 auto' }}
                >
                    {reviews.map(review => (
                        <SwiperSlide key={review.id}>
                            <div className="glass-panel" style={{ padding: '32px 24px', margin: '0 8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} color="var(--accent-gold)" fill={i < review.rating ? "var(--accent-gold)" : "transparent"} />
                                    ))}
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', fontStyle: 'italic', marginBottom: '24px' }}>
                                    "{review.text}"
                                </p>
                                <h4 style={{ color: 'var(--text-primary)', margin: 0, fontFamily: 'Inter', fontWeight: '600' }}>{review.name}</h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* ----------------- Gallery Section ----------------- */}
            <section style={{ padding: '32px 16px', background: 'var(--secondary-bg)' }}>
                <h2 style={{ fontSize: '32px', color: 'var(--accent-gold)', textAlign: 'center', marginBottom: '32px' }}>Follow Our Journey</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxWidth: '800px', margin: '0 auto' }}>
                    {gallery.map((img, index) => (
                        <img key={index} src={img} alt={`Gallery ${index}`} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                    ))}
                </div>
            </section>

            {/* ----------------- Location & Contact Section ----------------- */}
            <section style={{ padding: '64px 16px', background: 'var(--primary-bg)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '32px', color: 'var(--accent-gold)', textAlign: 'center', marginBottom: '40px' }}>Contact & Location</h2>

                    <div className="glass-panel" style={{ overflow: 'hidden', marginBottom: '32px', borderRadius: '16px', border: '1px solid var(--accent-red)' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.9537353153162!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1606277874983!5m2!1sen!2sau"
                            width="100%"
                            height="250"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                        <div style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                                <MapPin size={24} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                                <span style={{ color: 'var(--text-secondary)' }}>123 Chembarathy Avenue, Food District, India</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <Phone size={24} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                                <span style={{ color: 'var(--text-secondary)' }}>+91 98765 43210</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Clock size={24} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                                <span style={{ color: 'var(--text-secondary)' }}>11:00 AM - 11:00 PM (Daily)</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                        style={{
                            background: '#25D366',
                            color: '#ffffff',
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            fontSize: '18px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <MessageCircle size={24} /> WhatsApp Us
                    </button>
                </div>
            </section>

            {/* ----------------- Table Selection Modal ----------------- */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    zIndex: 100
                }}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-panel"
                        style={{
                            padding: '32px',
                            textAlign: 'center',
                            maxWidth: '400px',
                            width: '100%',
                            background: 'var(--secondary-bg)',
                            border: '1px solid var(--accent-red)'
                        }}
                    >
                        <h2 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-primary)' }}>Select Your Table</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>
                            Please select your current table number to view the menu and place your order.
                        </p>

                        <select
                            value={selectedTable}
                            onChange={(e) => setSelectedTable(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-primary)',
                                fontSize: '18px',
                                marginBottom: '24px',
                                outline: 'none',
                                fontFamily: 'Inter',
                                textAlign: 'center',
                                appearance: 'none'
                            }}
                        >
                            {allTables.map(t => (
                                <option key={t} value={t} style={{ color: '#000' }}>Table {t}</option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                            <button
                                onClick={handleTableSubmit}
                                className="gold-button"
                                style={{ width: '100%', padding: '16px', fontSize: '16px' }}
                            >
                                Continue to Menu
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="gold-outline-button"
                                style={{ width: '100%', borderColor: 'transparent', color: 'var(--text-muted)' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

        </div>
    );
}
