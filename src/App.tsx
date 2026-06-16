/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Code,
  Paintbrush,
  Smartphone,
  BookOpen,
  Feather,
  Users,
  Workflow,
  Smile,
  Edit2,
  Coffee,
  ArrowRight,
  Download,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
  MapPin,
  Mail,
  Menu,
  X,
  Sparkles,
  GitBranch,
  Quote,
  Eye,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

import {
  servicesData,
  skillsData,
  booksData,
  projectsData,
  statsData,
  testimonialsData
} from './data';

import { ProjectCategory } from './types';
import { PERSONAL_CONFIG } from './config';

// Visual Sub-components
import GlowCursor from './components/GlowCursor';
import TypingText from './components/TypingText';
import TiltCard from './components/TiltCard';
import SkillsDisplay from './components/SkillsDisplay';
import StatsCounters from './components/StatsCounters';
import LiteraryDisplay from './components/LiteraryDisplay';
import TestimonialsSlider from './components/TestimonialsSlider';

export default function App() {
  // Splash Loading Screen
  const [loading, setLoading] = useState(true);

  // Smart Navbar Scrolling Behaviour
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeSegment, setActiveSegment] = useState('home');

  // Mobile Drawer Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // About Me Extended State
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // Projects Filter Category
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  // Contact Form Inputs
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);

  // Initialize Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Track Scrolling events (Smart header toggle & Active links)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Smart header show/hide
      if (scrollY > lastScrollY && scrollY > 200) {
        setNavVisible(false); // scrolling down
      } else {
        setNavVisible(true); // scrolling up
      }
      setLastScrollY(scrollY);

      // Past hero indicators
      setScrolledPastHero(scrollY > 120);

      // Find active page section coordinates
      const sections = ['home', 'about', 'skills', 'services', 'writing', 'projects', 'testimonials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offset = el.offsetTop - 180;
          const height = el.offsetHeight;
          if (scrollY >= offset && scrollY < offset + height) {
            setActiveSegment(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle Form Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Submit Contact Form Process (Integrates with Telegram Bot API)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    // Basic Validation Code
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject selection is required.';
    if (!formData.message.trim()) errors.message = 'Please input a detailed message.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormSubmitError(null);

    // HTML entities escaping helper for strict and safe Telegram transmission in HTML mode
    const escapeHTML = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };
    
    try {
      // Format a beautiful message for the Telegram channel/chat using HTML tags
      const telegramMessage = `📬 <b>New Form Submission</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Name:</b> ${escapeHTML(formData.name)}\n` +
        `✉️ <b>Email:</b> ${escapeHTML(formData.email)}\n` +
        `📝 <b>Subject:</b> ${escapeHTML(formData.subject)}\n` +
        `💬 <b>Message:</b>\n${escapeHTML(formData.message)}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `⏰ <b>Time (BD):</b> ${escapeHTML(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }))}`;

      const response = await fetch(`https://api.telegram.org/bot${PERSONAL_CONFIG.telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: PERSONAL_CONFIG.telegramChatId,
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage = `Telegram API Error (Status ${response.status})`;
        if (responseData && responseData.description) {
          errorMessage = responseData.description;
        }
        throw new Error(errorMessage);
      }

      setIsSubmitting(false);
      setFormSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Failed to dispatch telegram request:', err);
      const finalError = err?.message || 'Unknown network error / request blocked';
      setIsSubmitting(false);
      setFormSubmitError(finalError);
    }
  };

  // Filter projects list computed state
  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  // Smooth Scroll directly with mobile drawer closure
  const handleNavLinkClick = (targetId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0f1e] flex flex-col items-center justify-center space-y-6">
        {/* Animated Custom Vector Loader */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-t-[#00d4ff] border-b-[#7c3aed] border-l-[#00d4ff]/20 border-r-[#7c3aed]/20 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-r-[#00d4ff] border-l-[#7c3aed] border-t-[#7c3aed]/10 border-b-[#00d4ff]/10 animate-spin [animation-direction:reverse]" />
          <span className="font-display font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] animate-pulse">
            SH
          </span>
        </div>
        <div className="text-center space-y-1.5">
          <h2 className="font-display font-bold text-xl text-white tracking-wide">{PERSONAL_CONFIG.logoText}</h2>
          <p className="text-xs text-[#8892b0] font-mono tracking-widest uppercase">System Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white relative overflow-x-hidden bg-grid-dots selection:bg-[#00d4ff]/35 selection:text-white">
      {/* 1. Custom Glowing Cursor Trail */}
      <GlowCursor />

      {/* 2. Top Smart Navbar Frame */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolledPastHero ? 'bg-[#0a0f1e]/85 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        } ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo "Shadin." */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('home');
            }}
            className="font-display text-2xl font-extrabold text-white tracking-tight flex items-baseline select-none"
          >
            {PERSONAL_CONFIG.logoText.split('.')[0]}<span className="text-[#00d4ff] text-3xl font-display leading-[0.5] font-extrabold">.</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-y-0 space-x-8 font-mono text-xs tracking-wider uppercase">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'services', label: 'Services' },
              { id: 'writing', label: 'Writing' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => {
              const active = activeSegment === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavLinkClick(item.id)}
                  className={`relative py-1 transition-colors font-semibold cursor-pointer ${
                    active ? 'text-[#00d4ff]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Hamburger toggle for mobile layout */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-[#112240] rounded-lg border border-white/5 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 3. Mobile Backdrop Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0f1e]/95 backdrop-blur-lg md:hidden transition-all duration-300 flex flex-col justify-center ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 bg-[#112240] rounded-lg border border-white/5 cursor-pointer"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <nav className="flex flex-col items-center space-y-6 font-display font-bold text-2xl tracking-wide">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'services', label: 'Services' },
            { id: 'writing', label: 'Writing Works' },
            { id: 'projects', label: 'Featured Projects' },
            { id: 'contact', label: 'Connect With Me' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavLinkClick(item.id)}
              className={`transition-colors cursor-pointer ${
                activeSegment === item.id ? 'text-[#00d4ff]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 4. MASTER SECTIONS CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative space-y-32">
        
        {/* ================= SECTION A: HERO ================= */}
        <section id="home" className="pt-16 sm:pt-24 min-h-[85vh] flex flex-col-reverse lg:flex-row items-center gap-12 relative">
          
          {/* Animated decorative flow spotlights */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#00d4ff]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-[#7c3aed]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Left Hero Profile Columns */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] font-mono text-[11px] font-semibold tracking-widest uppercase rounded-full border border-[#00d4ff]/15">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Welcome to my Creative Space
              </span>
              <h4 className="font-mono text-sm sm:text-base text-slate-400">
                Hello, It's Me
              </h4>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                {PERSONAL_CONFIG.heroTitle}
              </h1>
              <div className="text-xl sm:text-2xl font-sans font-medium text-[#8892b0]">
                {PERSONAL_CONFIG.heroSubtitle} <TypingText words={PERSONAL_CONFIG.typingWords} />
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              I weave complex algorithms as a full-stack engineer and narrative verses as a literary poet. Based in {PERSONAL_CONFIG.location}, craft belongs to every creative translation.
            </p>

            {/* Circular Social Outline Links */}
            <div className="flex justify-center lg:justify-start gap-4 pt-2">
              {[
                { href: PERSONAL_CONFIG.facebookUrl, icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
                { href: PERSONAL_CONFIG.instagramUrl, icon: <Instagram className="w-5 h-5" />, label: 'Instagram' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#112240] hover:bg-[#00d4ff]/10 border border-white/5 hover:border-[#00d4ff]/30 text-slate-300 hover:text-[#00d4ff] rounded-full transition-all duration-300 hover:scale-115 cursor-pointer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => handleNavLinkClick('contact')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-[#0a0f1e] hover:text-[#0a0f1e] font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_20px_rgba(0,196,255,0.15)] hover:shadow-[0_15px_30px_rgba(0,196,255,0.3)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Let's Collaborations
              </button>
              <a
                href="#writing"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick('writing');
                }}
                className="px-8 py-3.5 rounded-xl border border-slate-700 hover:border-[#00d4ff]/40 text-slate-300 hover:text-[#00d4ff] hover:bg-[#00d4ff]/5 font-display font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                Go to Literary Art
              </a>
            </div>

          </div>

          {/* Right Hero Image Column with Conic Glowing Border */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative animate-float pointer-events-none">
              
              {/* Spinning Slow Background aura circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00d4ff] to-[#7c3aed] opacity-25 filter blur-3xl animate-pulse" />
              
              {/* Conic Glow Border Wrapper */}
              <div className="conic-glowing-border h-72 w-72 sm:h-80 sm:w-80 shadow-[0_0_20px_rgba(0,212,255,0.15)] animate-glow-pulse">
                
                {/* Styled container with Shadin's real photo */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0d1b2a] to-[#0a0f1e] flex flex-col justify-center items-center relative overflow-hidden">
                  
                  <img
                    src={PERSONAL_CONFIG.profileImage}
                    alt={PERSONAL_CONFIG.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      // Fallback support if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />

                </div>

              </div>

            </div>
          </div>

        </section>


        {/* ================= SECTION B: ABOUT ME ================= */}
        <section id="about" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#00d4ff] font-semibold uppercase">01. Identity Synopsis</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              About {PERSONAL_CONFIG.fullName}
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Aesthetic Frame Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Visual backframe */}
                <div className="absolute inset-0 bg-[#00d4ff]/10 rounded-2xl filter blur-xl group-hover:bg-[#00d4ff]/20 transition-all duration-500" />
                
                {/* Styled Placeholder Frame */}
                <div className="relative w-72 h-96 sm:w-80 sm:h-[450px] bg-[#112240] rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col justify-between">
                  {PERSONAL_CONFIG.aboutSectionImage ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={PERSONAL_CONFIG.aboutSectionImage}
                        alt="About illustration"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-35 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-[#112240]/50 to-[#112240]/90" />
                    </div>
                  ) : null}

                  <div className="flex justify-between items-center text-xs font-mono text-slate-500 p-6 relative z-10">
                    <span>SYS_CORE_SECURE</span>
                    <span>11_02_2026</span>
                  </div>

                  {/* Beautiful visual graphic detailing writing instrument & markup code */}
                  <div className="space-y-5 text-center mt-6 p-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-[#0a0f1e] mx-auto shadow-lg shadow-cyan-500/10 animate-pulse">
                      <Feather className="w-8 h-8 stroke-[1.8]" />
                    </div>

                    <div className="space-y-2">
                      <div className="font-display font-bold text-lg text-white">{PERSONAL_CONFIG.aboutCardTitle}</div>
                      <p className="text-xs text-slate-400 font-sans max-w-[200px] mx-auto leading-relaxed">
                        "{PERSONAL_CONFIG.aboutCardQuote}"
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 pb-6 relative z-10">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#00d4ff] block text-center">
                      {PERSONAL_CONFIG.location} — Earth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Biography Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <h3 className="text-2xl font-display font-bold text-white text-center lg:text-left">
                Bridging Coding Logic & Poetic Metaphors
              </h3>

              <div className="text-slate-300 space-y-4 leading-relaxed font-sans text-sm sm:text-base">
                <p>
                  {PERSONAL_CONFIG.bioParagraph1}
                </p>
                
                <p>
                  {PERSONAL_CONFIG.bioParagraph2}
                </p>

                {aboutExpanded && (
                  <div className="space-y-4 pt-2 border-t border-white/5 animate-fadeIn">
                    <p>
                      {PERSONAL_CONFIG.bioExpanded1}
                    </p>
                    <p>
                      {PERSONAL_CONFIG.bioExpanded2}
                    </p>
                  </div>
                )}
              </div>

              {/* Bio expanded toggle button */}
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={() => setAboutExpanded(!aboutExpanded)}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-[#00d4ff] hover:text-white transition-colors uppercase py-1 border-b border-[#00d4ff]/20 hover:border-white tracking-widest cursor-pointer"
                >
                  {aboutExpanded ? 'Read Less Description' : 'More About Me'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid with Key Credentials Stat-cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {[
                  { value: '2+ Yrs', label: 'Tech Experience' },
                  { value: '15+', label: 'Digital Projects' },
                  { value: '3+', label: 'Books Written' },
                  { value: '10+', label: 'Happy Clients' }
                ].map((card, idx) => (
                  <div key={idx} className="bg-[#112240]/40 rounded-xl border border-white/5 p-4 text-center">
                    <div className="text-lg sm:text-xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
                      {card.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#8892b0] mt-1 font-mono uppercase tracking-wider">
                      {card.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </section>


        {/* ================= SECTION C: SKILLS ================= */}
        <section id="skills" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#7c3aed] font-semibold uppercase">02. Capacity Matrix</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              My Professional Skills
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] mx-auto" />
          </div>

          <SkillsDisplay skills={skillsData} />

        </section>


        {/* ================= SECTION D: SERVICES ================= */}
        <section id="services" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#00d4ff] font-semibold uppercase">03. Practical Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Services Offered
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => {
              // Map dynamic names into Lucide Icons
              let IconComp = Code;
              if (service.iconName === 'Code') IconComp = Code;
              else if (service.iconName === 'Paintbrush') IconComp = Paintbrush;
              else if (service.iconName === 'Smartphone') IconComp = Smartphone;
              else if (service.iconName === 'BookOpen') IconComp = BookOpen;
              else if (service.iconName === 'Feather') IconComp = Feather;
              else if (service.iconName === 'Users') IconComp = Users;

              return (
                <TiltCard
                  key={service.id}
                  className="bg-[#112240]/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-between h-full hover:border-[#00d4ff]/20 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Glowing Icon Frame */}
                    <div className="w-12 h-12 rounded-xl bg-[#0d1b2a] flex items-center justify-center border border-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.08)]">
                      <IconComp className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    <h4 className="text-lg font-display font-bold text-white tracking-tight group-hover:text-[#00d4ff]">
                      {service.title}
                    </h4>

                    <p className="text-sm text-slate-400 font-sans leading-relaxed">
                      {service.description}
                    </p>

                    <p className="text-xs text-slate-500 font-sans leading-relaxed border-t border-white/5 pt-3">
                      {service.details}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => handleNavLinkClick('contact')}
                      className="text-xs font-mono font-bold text-[#00d4ff] hover:text-white uppercase tracking-widest flex items-center gap-1.5 group cursor-pointer"
                    >
                      Hire For This Service <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </TiltCard>
              );
            })}
          </div>

        </section>


        {/* ================= SECTION E: WRITING LITERARY ================= */}
        <section id="writing" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#7c3aed] font-semibold uppercase">04. The Literary Domain</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              My Literary World
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] mx-auto" />
          </div>

          <LiteraryDisplay books={booksData} />

        </section>


        {/* ================= SECTION F: PROJECTS ================= */}
        <section id="projects" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#00d4ff] font-semibold uppercase">05. Technical Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Featured Work & Projects
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto" />
          </div>

          {/* Project Filtering Buttons Section */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[#112240]/20 rounded-2xl border border-white/5 max-w-lg mx-auto">
            {['all', 'web', 'design', 'writing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as ProjectCategory)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00d4ff] text-[#0a0f1e]'
                    : 'text-[#8892b0] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'all' ? 'All' : cat === 'web' ? 'Web Dev' : cat}
              </button>
            ))}
          </div>

          {/* Project Cards responsive grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col bg-[#112240]/40 rounded-2xl border border-white/5 overflow-hidden group hover:border-[#00d4ff]/20 transition-all duration-300 h-full p-5"
              >
                {/* Project Visual Thumbnail Cover - with scroll hover panning effect */}
                <div className="project-scroll-frame mb-5 relative rounded-xl border border-white/5">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="project-scroll-img"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-tr ${project.coverGradient} opacity-75 group-hover:scale-105 transition-all duration-500`} />
                  )}
                  
                  {/* Digital Overlay HUD on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300 z-10">
                    <button
                      onClick={() => handleNavLinkClick('contact')}
                      className="p-3 bg-[#0a0f1e]/90 hover:bg-[#00d4ff] text-[#00d4ff] hover:text-[#0a0f1e] rounded-xl transition-all font-mono font-semibold cursor-pointer"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleNavLinkClick('contact')}
                      className="p-3 bg-[#0a0f1e]/90 hover:bg-[#7c3aed] text-[#7c3aed] hover:text-white rounded-xl transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute inset-4 flex flex-col justify-between pointer-events-none z-10">
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-black/40 text-[#00d4ff] px-2 py-0.5 rounded-md border border-white/10 self-start">
                      {project.category}
                    </span>
                    
                    {!project.imageUrl && (
                      <span className="text-lg font-display font-extrabold text-white tracking-wide">
                        {project.title.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info and Tag Badges */}
                <div className="flex-1 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                      {project.title}
                    </h4>

                    {/* Badge badges tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#0a0f1e] text-[9px] font-mono text-[#8892b0] border border-white/5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-[#8892b0] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => handleNavLinkClick('contact')}
                      className="flex-1 text-center bg-[#00d4ff]/10 hover:bg-[#00d4ff] text-[#00d4ff] hover:text-[#0a0f1e] text-xs font-mono font-bold py-2 px-3 rounded-lg border border-[#00d4ff]/20 hover:border-transparent transition-all active:scale-95 cursor-pointer"
                    >
                      Live Demo
                    </button>
                    <button
                      onClick={() => handleNavLinkClick('contact')}
                      className="flex-1 text-center bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono font-semibold py-2 px-3 rounded-lg border border-white/5 transition-all active:scale-95 cursor-pointer"
                    >
                      Source Code
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>


        {/* ================= SECTION G: STATS ================= */}
        <section className="relative">
          <StatsCounters stats={statsData} />
        </section>


        {/* ================= SECTION H: TESTIMONIALS ================= */}
        <section id="testimonials" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#7c3aed] font-semibold uppercase">06. Verification Matrix</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Client & Literary Testimonials
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] mx-auto" />
          </div>

          <TestimonialsSlider testimonials={testimonialsData} />

        </section>


        {/* ================= SECTION I: CONTACT ================= */}
        <section id="contact" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#00d4ff] font-semibold uppercase">07. Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Contact Me / Collaborative Inquiry
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Col: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-3">
                <h3 className="text-xl font-display font-semibold text-white">
                  Let's Discuss Creative Solutions Together
                </h3>
                <p className="text-sm text-[#8892b0] leading-relaxed">
                  Have a web system concept that requires clean, responsive structures? Or a publishing proposal that needs narrative depth? Drop me a direct message!
                </p>
              </div>

              {/* Informative Connection options */}
              <div className="space-y-4 font-mono text-xs">
                
                <a
                  href={`mailto:${PERSONAL_CONFIG.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#112240]/40 border border-white/5 hover:border-[#00d4ff]/20 text-[#8892b0] hover:text-white transition-all group"
                >
                  <div className="p-2.5 bg-[#0a0f1e] text-[#00d4ff] rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#00d4ff] block uppercase tracking-widest font-semibold">Primary Mail</span>
                    <span className="text-sm break-all font-sans font-medium text-white/90">{PERSONAL_CONFIG.email}</span>
                  </div>
                </a>

                <a
                  href={PERSONAL_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#112240]/40 border border-white/5 hover:border-[#7c3aed]/20 text-[#8892b0] hover:text-white transition-all group"
                >
                  <div className="p-2.5 bg-[#0a0f1e] text-[#7c3aed] rounded-lg group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7c3aed] block uppercase tracking-widest font-semibold">WhatsApp Message</span>
                    <span className="text-sm font-sans font-medium text-white/90">Instant Connectivity Available</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#112240]/40 border border-white/5 text-[#8892b0]">
                  <div className="p-2.5 bg-[#0a0f1e] text-[#00d4ff] rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#00d4ff] block uppercase tracking-widest font-semibold">Location Map</span>
                    <span className="text-sm font-sans font-medium text-white/90">{PERSONAL_CONFIG.location}</span>
                  </div>
                </div>

              </div>

              {/* Decorative Location Radar Grid */}
              <div className="p-6 bg-gradient-to-r from-[#0d1b2a] to-[#112240] rounded-2xl border border-white/5 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,212,255,0.06)_1.5px,transparent_1.5px)] bg-[size:20px_20px]" />
                <div className="relative z-10 space-y-2">
                  <div className="w-3 h-3 bg-[#00d4ff] rounded-full mx-auto animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00d4ff] block mt-4">
                    {PERSONAL_CONFIG.timezoneText}
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans">
                    {PERSONAL_CONFIG.timezoneDescription}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col: Interactive Contact Form Input */}
            <div className="lg:col-span-7 bg-[#112240]/20 rounded-2xl border border-white/5 p-6 sm:p-8">
              
              {formSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] flex items-center justify-center border border-[#00d4ff]/35">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-display font-extrabold text-white">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-[#8892b0] font-mono max-w-sm mx-auto">
                      Thank you for contacting Md Shahnewaz Hossain Shadin. I will review your submission and reply within 12-24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/5 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Telegram Integration Error Diagnostics Banner */}
                  {formSubmitError && (
                    <div className="p-4 bg-red-950/30 border border-red-500/20 rounded-xl space-y-2 text-xs text-red-400 animate-fadeIn">
                      <div className="font-bold flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#00d4ff]">
                        ⚠️ Telegram Integration Help
                      </div>
                      <p className="leading-relaxed">
                        Your message failed to send: <code className="bg-red-950/60 px-1 py-0.5 rounded text-red-300">"{formSubmitError}"</code>
                      </p>
                      <div className="text-slate-400 leading-relaxed font-sans text-[11px] space-y-1 pt-1 border-t border-red-500/10">
                        <p className="font-semibold text-slate-300">How to get your Telegram Bot working successfully:</p>
                        <ol className="list-decimal pl-4 space-y-1">
                          <li>Open Telegram on your mobile or Desktop.</li>
                          <li>Search for your bot (the one with token starting with <code>{PERSONAL_CONFIG.telegramBotToken.substring(0, 8)}...</code>).</li>
                          <li>You <b>must</b> send the <b>/start</b> command to the bot first. Telegram prevents bots from starting chats automatically.</li>
                          <li>Verify that <b>telegramChatId</b> <code>"{PERSONAL_CONFIG.telegramChatId}"</code> in <code>/src/config.ts</code> is your actual User ID (you can obtain your correct user ID by sending a text to <b>@userinfobot</b> or <b>@raw_data_bot</b> on Telegram).</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-mono font-semibold text-[#8892b0] tracking-wider uppercase block">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#0a0f1e] rounded-xl border ${
                          formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-[#00d4ff]'
                        } text-sm focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20 text-white transition-all`}
                        placeholder="e.g. Robert Harrison"
                      />
                      {formErrors.name && (
                        <span className="text-[10px] text-red-500 font-mono block">{formErrors.name}</span>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono font-semibold text-[#8892b0] tracking-wider uppercase block">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#0a0f1e] rounded-xl border ${
                          formErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-[#00d4ff]'
                        } text-sm focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20 text-white transition-all`}
                        placeholder="e.g. robert@company.com"
                      />
                      {formErrors.email && (
                        <span className="text-[10px] text-red-500 font-mono block">{formErrors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Subject Line selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-mono font-semibold text-[#8892b0] tracking-wider uppercase block">
                      Subject Matter:
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#0a0f1e] rounded-xl border ${
                        formErrors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-[#00d4ff]'
                      } text-sm focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20 text-white transition-all`}
                      placeholder="e.g. Web Development project proposal"
                    />
                    {formErrors.subject && (
                      <span className="text-[10px] text-red-500 font-mono block">{formErrors.subject}</span>
                    )}
                  </div>

                  {/* Detailed Message Textarea */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-mono font-semibold text-[#8892b0] tracking-wider uppercase block">
                      Your Message Description:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#0a0f1e] rounded-xl border ${
                        formErrors.message ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-[#00d4ff]'
                      } text-sm focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20 text-white transition-all resize-none`}
                      placeholder="Hello Shadin, let's explore collaborating on a project..."
                    />
                    {formErrors.message && (
                      <span className="text-[10px] text-red-500 font-mono block">{formErrors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#00d4ff] hover:bg-[#00d4ff]/80 text-[#0a0f1e] hover:text-[#0a0f1e] font-display font-extrabold text-sm tracking-wider uppercase transition-all tracking-wide disabled:opacity-60 active:scale-95 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-[#0a0f1e] animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Log</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>

        </section>

      </main>

      {/* 5. FOOTER */}
      <footer className="border-t border-white/5 bg-[#0a0f1e]/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="font-display text-2xl font-black text-white">
              {PERSONAL_CONFIG.logoText.split('.')[0]}<span className="text-[#00d4ff]">.</span>
            </span>
            <p className="text-xs text-[#8892b0] font-sans max-w-xs">
              Transforming complex digital ideas into responsive, premium web solutions. Weaving code & prose.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-center text-xs font-mono text-[#8892b0] tracking-wider">
            <button onClick={() => handleNavLinkClick('about')} className="hover:text-white transition-colors cursor-pointer">About {PERSONAL_CONFIG.logoText.split('.')[0]}</button>
            <button onClick={() => handleNavLinkClick('services')} className="hover:text-white transition-colors cursor-pointer">Capability Services</button>
            <button onClick={() => handleNavLinkClick('writing')} className="hover:text-white transition-colors cursor-pointer">Poetry & Literary</button>
            <button onClick={() => handleNavLinkClick('projects')} className="hover:text-white transition-colors cursor-pointer">Code Hub</button>
          </div>

          <div className="text-center md:text-right space-y-1.5">
            <p className="text-xs text-[#8892b0] font-mono">
              © 2026 {PERSONAL_CONFIG.fullName}. All Rights Reserved.
            </p>
            <p className="text-[10px] text-slate-500 font-sans tracking-wide">
              Made with ❤️ and ☕ in BD
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
