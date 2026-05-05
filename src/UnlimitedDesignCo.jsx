import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@300;400;500;600;700&display=swap');

:root {
  --sage: #7A9E7E;
  --sage-dark: #4D7256;
  --sage-deeper: #2E4A35;
  --sage-light: #B8D4BA;
  --sage-pale: #EDF4EE;
  --blush: #E2A8AC;
  --blush-dark: #C07D82;
  --blush-light: #F0CDD0;
  --blush-pale: #FBF0F1;
  --cream: #FAF8F4;
  --warm-white: #FEFCF9;
  --charcoal: #1E1E1E;
  --text-mid: #4A4A4A;
  --text-light: #8A8A8A;
  --gold: #C4A870;
  --gold-light: #E8D5A8;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: 'Jost', sans-serif;
  background: var(--cream);
  color: var(--charcoal);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* NAV */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.75rem 4.5rem;
  transition: all 0.4s ease;
}
.nav.scrolled {
  background: rgba(250, 248, 244, 0.96);
  backdrop-filter: blur(14px);
  padding: 1rem 4.5rem;
  border-bottom: 1px solid rgba(122,158,126,0.18);
  box-shadow: 0 2px 20px rgba(46,74,53,0.05);
}
.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.4rem;
  color: var(--sage-deeper);
  text-decoration: none;
  letter-spacing: 0.03em;
  cursor: pointer;
  background: none; border: none;
}
.nav-logo span { font-style: normal; font-weight: 600; }
.nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
.nav-links a {
  font-family: 'Jost', sans-serif;
  font-weight: 500;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-mid);
  text-decoration: none;
  transition: color 0.25s;
  cursor: pointer;
  background: none; border: none;
}
.nav-links a:hover { color: var(--sage-dark); }
.nav-cta {
  background: var(--sage-deeper) !important;
  color: var(--cream) !important;
  padding: 0.6rem 1.5rem;
  border-radius: 2px;
  letter-spacing: 0.12em !important;
  transition: background 0.25s !important;
}
.nav-cta:hover { background: var(--sage-dark) !important; }

/* HAMBURGER */
.nav-hamburger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; background: none; border: none; padding: 4px;
}
.nav-hamburger span { display: block; width: 24px; height: 2px; background: var(--sage-deeper); transition: all 0.3s; }
.nav-mobile {
  display: none;
  position: fixed; inset: 0; background: var(--cream); z-index: 999;
  flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem;
}
.nav-mobile.open { display: flex; }
.nav-mobile a {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem; font-weight: 300; font-style: italic;
  color: var(--sage-deeper); text-decoration: none;
  transition: color 0.2s; cursor: pointer; background: none; border: none;
}
.nav-mobile a:hover { color: var(--blush-dark); }
.nav-mobile-close {
  position: absolute; top: 2rem; right: 3rem;
  font-size: 2.2rem; background: none; border: none;
  cursor: pointer; color: var(--text-mid); line-height: 1;
}

/* HERO */
.hero {
  min-height: 100vh;
  display: grid; grid-template-columns: 1fr 1fr;
  position: relative; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 72% 38%, rgba(226,168,172,0.22) 0%, transparent 52%),
    radial-gradient(ellipse at 18% 78%, rgba(122,158,126,0.18) 0%, transparent 48%),
    radial-gradient(ellipse at 85% 85%, rgba(196,168,112,0.1) 0%, transparent 38%),
    var(--cream);
}
.hero-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; justify-content: center;
  padding: 9rem 4rem 6rem 5.5rem;
}
.eyebrow {
  font-family: 'Jost', sans-serif;
  font-weight: 500; font-size: 0.68rem;
  letter-spacing: 0.24em; text-transform: uppercase;
  color: var(--sage-dark); margin-bottom: 1.5rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.eyebrow::before {
  content: ''; display: block;
  width: 30px; height: 1.5px; background: var(--sage-dark);
}
.hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(3.2rem, 5.2vw, 5.6rem);
  line-height: 1.06;
  color: var(--charcoal);
  margin-bottom: 1.75rem;
  letter-spacing: -0.01em;
}
.hero-title em { font-style: italic; color: var(--sage-deeper); }
.hero-subtitle {
  font-family: 'Jost', sans-serif;
  font-weight: 300; font-size: 1.05rem; line-height: 1.8;
  color: var(--text-mid); max-width: 430px; margin-bottom: 2.5rem;
}
.hero-subtitle strong { font-weight: 600; color: var(--charcoal); }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn-primary {
  background: var(--sage-deeper); color: var(--cream);
  padding: 0.9rem 2.1rem;
  font-family: 'Jost', sans-serif; font-weight: 500;
  font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
  border: none; cursor: pointer; transition: all 0.25s; border-radius: 2px;
}
.btn-primary:hover { background: var(--sage-dark); transform: translateY(-1px); }
.btn-secondary {
  background: transparent; color: var(--charcoal);
  padding: 0.9rem 2.1rem;
  font-family: 'Jost', sans-serif; font-weight: 500;
  font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
  border: 1.5px solid rgba(30,30,30,0.5); cursor: pointer; transition: all 0.25s; border-radius: 2px;
}
.btn-secondary:hover { background: var(--charcoal); color: var(--cream); }
.hero-stats {
  display: flex; gap: 2.5rem;
  margin-top: 3.5rem; padding-top: 2rem;
  border-top: 1px solid rgba(122,158,126,0.2);
}
.stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.3rem; font-weight: 600;
  color: var(--sage-dark); line-height: 1;
}
.stat-label {
  font-size: 0.68rem; font-weight: 400;
  letter-spacing: 0.1em; color: var(--text-light);
  text-transform: uppercase; margin-top: 0.3rem;
}
.hero-visual {
  position: relative; display: flex;
  align-items: center; justify-content: center; overflow: hidden;
  padding: 6rem 2rem;
}
.hero-logo {
  width: min(100%, 440px);
  max-width: 420px;
  height: auto;
  object-fit: contain;
  animation: floatA 7s ease-in-out infinite;
  filter: drop-shadow(0 10px 28px rgba(122,158,126,0.18));
}

/* SECTION BASE */
.section { padding: 7.5rem 5.5rem; }
.section-alt { background: var(--warm-white); }
.section-sage { background: var(--sage-pale); }
.section-blush { background: var(--blush-pale); }
.sec-header { text-align: center; margin-bottom: 4.5rem; }
.sec-eye {
  font-family: 'Jost', sans-serif;
  font-weight: 500; font-size: 0.68rem;
  letter-spacing: 0.24em; text-transform: uppercase;
  color: var(--sage-dark); margin-bottom: 1rem;
}
.sec-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300; font-size: clamp(2.3rem, 3.8vw, 3.4rem);
  color: var(--charcoal); line-height: 1.15;
}
.sec-title em { font-style: italic; color: var(--sage-deeper); }
.sec-desc {
  font-size: 0.95rem; font-weight: 300; color: var(--text-mid);
  line-height: 1.8; max-width: 500px; margin: 1.25rem auto 0;
}

/* PORTFOLIO */
.port-filters {
  display: flex; justify-content: center;
  gap: 0.5rem; margin-bottom: 3rem; flex-wrap: wrap;
}
.f-btn {
  background: transparent;
  border: 1.5px solid rgba(122,158,126,0.3);
  color: var(--text-mid); padding: 0.45rem 1.25rem;
  font-family: 'Jost', sans-serif; font-size: 0.7rem;
  font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s; border-radius: 2px;
}
.f-btn:hover { border-color: var(--sage-dark); color: var(--sage-dark); }
.f-btn.on { background: var(--sage-deeper); border-color: var(--sage-deeper); color: var(--cream); }
.port-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  max-width: 1200px; margin: 0 auto;
}
.port-card {
  position: relative; overflow: hidden;
  border-radius: 3px; cursor: pointer; aspect-ratio: 4/3;
}
.port-card-bg {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 2rem; transition: transform 0.55s ease;
}
.port-card:hover .port-card-bg { transform: scale(1.04); }
.port-card-icon {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic; font-size: 4.5rem;
  line-height: 1; opacity: 0.4;
  user-select: none; margin-bottom: 0.5rem;
}
.port-card-cat {
  font-family: 'Jost', sans-serif;
  font-weight: 600; font-size: 0.58rem;
  letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.55;
}
.port-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(20,20,20,0.88) 0%, rgba(20,20,20,0.3) 60%, transparent 100%);
  display: flex; flex-direction: column;
  align-items: flex-start; justify-content: flex-end;
  padding: 1.75rem;
  opacity: 0; transition: opacity 0.35s;
}
.port-card:hover .port-overlay { opacity: 1; }
.port-overlay h3 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400; font-size: 1.2rem; color: white; margin-bottom: 0.25rem;
}
.port-overlay p {
  font-size: 0.7rem; color: rgba(255,255,255,0.65);
  letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.85rem;
}
.port-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.port-tag {
  background: rgba(255,255,255,0.14); color: rgba(255,255,255,0.9);
  padding: 0.2rem 0.65rem; font-size: 0.62rem;
  letter-spacing: 0.1em; border-radius: 2px; font-weight: 500;
}
.port-label {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 0.75rem 1.2rem;
  background: linear-gradient(transparent, rgba(20,20,20,0.55));
  pointer-events: none;
}
.port-label h4 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem; font-weight: 400; color: white;
}
.port-label span {
  font-size: 0.62rem; color: rgba(255,255,255,0.62);
  text-transform: uppercase; letter-spacing: 0.1em;
}

/* SERVICES */
.svc-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 1.5rem; max-width: 1180px; margin: 0 auto;
}
.svc-card {
  background: var(--warm-white); padding: 2.75rem;
  border-radius: 3px;
  border: 1px solid rgba(122,158,126,0.14);
  transition: all 0.3s;
  position: relative; overflow: hidden;
}
.svc-card::after {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px; background: transparent;
  transition: background 0.3s;
}
.svc-card:hover::after { background: var(--sage-light); }
.svc-card:hover {
  border-color: rgba(122,158,126,0.35);
  transform: translateY(-3px);
  box-shadow: 0 10px 35px rgba(46,74,53,0.07);
}
.svc-card.featured {
  grid-column: 1 / -1;
  background: var(--sage-deeper);
  border: none; color: var(--cream);
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3.5rem; align-items: center;
}
.svc-card.featured::after { background: var(--blush-dark) !important; }
.svc-card.featured:hover { transform: translateY(-3px); box-shadow: 0 14px 45px rgba(46,74,53,0.22); }
.svc-badge {
  display: inline-flex; align-items: center;
  background: var(--blush-light);
  color: var(--blush-dark); border-radius: 2px;
  font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase;
  padding: 0.28rem 0.75rem; margin-bottom: 1rem;
}
.svc-card.featured .svc-badge {
  background: rgba(226,168,172,0.2); color: var(--blush-light);
}
.svc-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400; font-size: 1.75rem; line-height: 1.2;
  color: var(--charcoal); margin-bottom: 1rem;
}
.svc-card.featured .svc-title { font-size: 2.3rem; color: var(--cream); }
.svc-desc {
  font-size: 0.9rem; line-height: 1.8;
  color: var(--text-mid); font-weight: 300;
}
.svc-card.featured .svc-desc { color: rgba(250,248,244,0.78); }
.svc-list {
  list-style: none; margin-top: 1.25rem;
  display: flex; flex-direction: column; gap: 0.55rem;
}
.svc-list li {
  font-size: 0.87rem; color: var(--text-mid); font-weight: 400;
  display: flex; align-items: center; gap: 0.65rem;
}
.svc-list li::before { content: '→'; color: var(--sage); font-size: 0.78rem; flex-shrink: 0; }
.svc-card.featured .svc-list li { color: rgba(250,248,244,0.84); }
.svc-card.featured .svc-list li::before { color: var(--blush-light); }
.svc-cta {
  display: inline-block; margin-top: 1.75rem;
  font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--sage-dark); cursor: pointer;
  border: none; background: none; border-bottom: 1.5px solid var(--sage-light);
  padding-bottom: 2px; transition: color 0.2s, border-color 0.2s;
  font-family: 'Jost', sans-serif;
}
.svc-cta:hover { color: var(--sage-deeper); border-color: var(--sage-dark); }
.svc-card.featured .svc-cta {
  color: var(--gold-light); border-color: rgba(196,168,112,0.4); margin-top: 0;
}
.svc-card.featured .svc-cta:hover { color: var(--cream); border-color: rgba(250,248,244,0.55); }
.svc-quote {
  margin-top: 2rem; padding: 1.4rem 1.6rem;
  background: rgba(226,168,172,0.1); border-radius: 2px;
  border-left: 2px solid rgba(226,168,172,0.45);
  font-family: 'Cormorant Garamond', serif;
  font-style: italic; font-size: 1.1rem;
  color: rgba(250,248,244,0.82); line-height: 1.65;
}

/* ABOUT */
.about-wrap {
  display: grid; grid-template-columns: 5fr 7fr;
  gap: 6.5rem; align-items: center;
  max-width: 1150px; margin: 0 auto;
}
.about-visual { position: relative; }
.about-art {
  width: 100%; aspect-ratio: 3/4;
  background: linear-gradient(150deg, var(--sage-pale) 0%, var(--blush-pale) 100%);
  border-radius: 4px; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.about-art::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 25% 25%, rgba(122,158,126,0.28) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 70%, rgba(226,168,172,0.28) 0%, transparent 50%);
}
.about-badge {
  position: absolute; bottom: -1.5rem; right: -1.5rem;
  width: 58%; background: var(--sage-deeper);
  padding: 1.5rem 1.75rem; border-radius: 3px;
}
.badge-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.6rem; font-weight: 600; color: var(--cream); line-height: 1;
}
.badge-label {
  font-size: 0.68rem; color: rgba(250,248,244,0.65);
  letter-spacing: 0.12em; text-transform: uppercase; margin-top: 0.3rem;
}
.about-right { padding-bottom: 1rem; }
.about-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(2rem, 3.2vw, 2.9rem);
  line-height: 1.2; color: var(--charcoal); margin-bottom: 1.5rem;
}
.about-title em { font-style: italic; color: var(--sage-deeper); }
.about-p {
  font-size: 0.95rem; line-height: 1.9;
  color: var(--text-mid); font-weight: 300; margin-bottom: 1rem;
}
.about-creds {
  display: flex; flex-direction: column; gap: 0.65rem;
  margin: 2rem 0 2.25rem;
  padding: 1.5rem 1.6rem;
  background: var(--sage-pale);
  border-left: 3px solid var(--sage-dark); border-radius: 0 3px 3px 0;
}
.cred {
  font-size: 0.82rem; color: var(--sage-deeper); font-weight: 500;
  display: flex; align-items: center; gap: 0.65rem;
}
.cred::before { content: '✦'; color: var(--blush-dark); font-size: 0.58rem; }

/* CONTACT */
.contact-wrap {
  display: grid; grid-template-columns: 1fr 1.5fr;
  gap: 5.5rem; max-width: 1050px; margin: 0 auto; align-items: start;
}
.contact-h {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300; font-size: 2.3rem; line-height: 1.2;
  color: var(--charcoal); margin-bottom: 1rem;
}
.contact-h em { font-style: italic; color: var(--sage-deeper); }
.contact-p {
  font-size: 0.92rem; line-height: 1.85; color: var(--text-mid);
  font-weight: 300; margin-bottom: 2rem;
}
.c-detail {
  display: flex; align-items: center;
  gap: 0.75rem; font-size: 0.85rem; color: var(--text-mid); margin-bottom: 0.75rem;
}
.c-detail strong { color: var(--charcoal); font-weight: 500; }
.c-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sage); flex-shrink: 0; }
.c-note {
  margin-top: 2.25rem; padding: 1.4rem 1.5rem;
  background: var(--sage-pale); border-radius: 3px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic; font-size: 1rem;
  color: var(--sage-deeper); line-height: 1.65;
}
.c-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.45rem; }
.form-group label {
  font-size: 0.66rem; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-mid);
}
.form-group input,
.form-group select,
.form-group textarea {
  font-family: 'Jost', sans-serif;
  font-size: 0.92rem; font-weight: 300; color: var(--charcoal);
  background: var(--warm-white);
  border: 1.5px solid rgba(122,158,126,0.2);
  padding: 0.78rem 1rem; border-radius: 2px;
  outline: none; transition: border-color 0.2s; width: 100%;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: var(--sage-dark); }
.form-group textarea { resize: vertical; min-height: 120px; }
.form-btn {
  background: var(--sage-deeper); color: var(--cream);
  padding: 0.95rem 2.5rem;
  font-family: 'Jost', sans-serif; font-weight: 500;
  font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase;
  border: none; cursor: pointer; transition: all 0.25s;
  align-self: flex-start; border-radius: 2px;
}
.form-btn:hover { background: var(--sage-dark); transform: translateY(-1px); }
.form-success {
  text-align: center; padding: 4rem 2rem;
}
.form-success h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.1rem; font-weight: 300;
  font-style: italic; color: var(--sage-deeper); margin-bottom: 1rem;
}
.form-success p { font-size: 0.92rem; color: var(--text-mid); line-height: 1.8; }

/* FOOTER */
.footer {
  background: var(--sage-deeper); color: rgba(250,248,244,0.7);
  padding: 3.5rem 5.5rem;
  display: flex; align-items: center; justify-content: space-between;
}
.footer-logo {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic; font-size: 1.4rem;
  font-weight: 400; color: var(--cream); white-space: nowrap;
}
.footer-links { display: flex; gap: 2rem; list-style: none; }
.footer-links a {
  font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(250,248,244,0.55); text-decoration: none;
  cursor: pointer; background: none; border: none;
  font-family: 'Jost', sans-serif; font-weight: 400;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--cream); }
.footer-copy { font-size: 0.7rem; color: rgba(250,248,244,0.38); white-space: nowrap; }

/* ANIMATIONS */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floatA {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(2.5deg); }
}
@keyframes floatB {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-9px) rotate(-2deg); }
}
.hero-content > * {
  animation: fadeUp 0.75s ease forwards; opacity: 0;
}
.hero-content > *:nth-child(1) { animation-delay: 0.15s; }
.hero-content > *:nth-child(2) { animation-delay: 0.3s; }
.hero-content > *:nth-child(3) { animation-delay: 0.45s; }
.hero-content > *:nth-child(4) { animation-delay: 0.58s; }
.hero-content > *:nth-child(5) { animation-delay: 0.72s; }

/* RESPONSIVE */
@media (max-width: 1100px) {
  .section { padding: 6rem 3.5rem; }
  .svc-grid { grid-template-columns: 1fr; }
  .svc-card.featured { grid-template-columns: 1fr; gap: 2rem; }
  .about-wrap { grid-template-columns: 1fr; gap: 3.5rem; }
  .about-visual { max-width: 320px; }
}
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .hero-content { padding: 8.5rem 3rem 5rem; }
  .port-grid { grid-template-columns: repeat(2,1fr); }
  .contact-wrap { grid-template-columns: 1fr; gap: 3rem; }
  .nav { padding: 1.25rem 2.5rem; }
  .nav.scrolled { padding: 0.9rem 2.5rem; }
}
@media (max-width: 700px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
  .section { padding: 4.5rem 1.75rem; }
  .hero-content { padding: 7.5rem 1.75rem 4rem; }
  .hero-stats { gap: 1.75rem; }
  .port-grid { grid-template-columns: 1fr; }
  .footer { flex-direction: column; gap: 1.5rem; text-align: center; padding: 2.5rem 1.75rem; }
  .footer-links { flex-wrap: wrap; justify-content: center; gap: 1.25rem; }
  .form-row { grid-template-columns: 1fr; }
  .nav { padding: 1.1rem 1.75rem; }
  .nav.scrolled { padding: 0.8rem 1.75rem; }
}
`;

/* ─────────────────────────────────────
   SVG: FULL ORCHID SPRAY
───────────────────────────────────── */
function OrchidSpray({ size = 420, style = {} }) {
  return (
    <svg width={size} height={size * 1.28} viewBox="0 0 420 540" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      {/* Main stem */}
      <path d="M210 480 Q202 410 196 330 Q190 250 206 165" stroke="#7A9E7E" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.65"/>
      {/* Side stems */}
      <path d="M200 220 Q162 188 128 165" stroke="#7A9E7E" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M198 265 Q234 230 265 210" stroke="#7A9E7E" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M202 305 Q168 282 142 272" stroke="#7A9E7E" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.4"/>
      <path d="M204 340 Q238 318 258 308" stroke="#7A9E7E" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35"/>

      {/* FLOWER 1 – main center */}
      <g transform="translate(165, 118)">
        <ellipse cx="34" cy="-40" rx="20" ry="36" fill="#E2A8AC" opacity="0.88" transform="rotate(-12,34,-40)"/>
        <ellipse cx="64" cy="-20" rx="20" ry="36" fill="#E2A8AC" opacity="0.88" transform="rotate(28,64,-20)"/>
        <ellipse cx="64" cy="20" rx="20" ry="34" fill="#F0CDD0" opacity="0.82" transform="rotate(68,64,20)"/>
        <ellipse cx="34" cy="40" rx="20" ry="30" fill="#F0CDD0" opacity="0.82" transform="rotate(108,34,40)"/>
        <ellipse cx="4"  cy="20" rx="20" ry="36" fill="#E2A8AC" opacity="0.88" transform="rotate(148,4,20)"/>
        <ellipse cx="34" cy="0" rx="16" ry="20" fill="#C07D82" opacity="0.92"/>
        <ellipse cx="34" cy="4" rx="8"  ry="10" fill="#E8C4C8" opacity="1"/>
        <circle cx="32" cy="-1" r="3" fill="#C4A870" opacity="0.9"/>
        <circle cx="37" cy="2"  r="2" fill="#C4A870" opacity="0.75"/>
      </g>

      {/* FLOWER 2 – left branch, smaller */}
      <g transform="translate(98, 125) scale(0.72)">
        <ellipse cx="30" cy="-34" rx="18" ry="32" fill="#DDA8AC" opacity="0.8" transform="rotate(-15,30,-34)"/>
        <ellipse cx="56" cy="-16" rx="18" ry="32" fill="#DDA8AC" opacity="0.8" transform="rotate(25,56,-16)"/>
        <ellipse cx="56" cy="16" rx="18" ry="32" fill="#F0CDD0" opacity="0.75" transform="rotate(65,56,16)"/>
        <ellipse cx="30" cy="34" rx="18" ry="28" fill="#F0CDD0" opacity="0.75" transform="rotate(105,30,34)"/>
        <ellipse cx="4"  cy="16" rx="18" ry="32" fill="#DDA8AC" opacity="0.8" transform="rotate(145,4,16)"/>
        <ellipse cx="30" cy="0" rx="15" ry="18" fill="#C07D82" opacity="0.88"/>
        <ellipse cx="30" cy="4" rx="7"  ry="9"  fill="#E8C4C8" opacity="1"/>
        <circle cx="28" cy="-1" r="2.5" fill="#C4A870" opacity="0.85"/>
      </g>

      {/* FLOWER 3 – right branch */}
      <g transform="translate(232, 168) scale(0.78)">
        <ellipse cx="28" cy="-32" rx="18" ry="30" fill="#D4ACBA" opacity="0.78" transform="rotate(-8,28,-32)"/>
        <ellipse cx="52" cy="-14" rx="18" ry="30" fill="#E2A8AC" opacity="0.78" transform="rotate(32,52,-14)"/>
        <ellipse cx="52" cy="14" rx="18" ry="30" fill="#E2A8AC" opacity="0.74" transform="rotate(72,52,14)"/>
        <ellipse cx="28" cy="32" rx="18" ry="26" fill="#F0CDD0" opacity="0.74" transform="rotate(112,28,32)"/>
        <ellipse cx="4"  cy="14" rx="18" ry="30" fill="#D4ACBA" opacity="0.78" transform="rotate(152,4,14)"/>
        <ellipse cx="28" cy="0" rx="14" ry="18" fill="#C07D82" opacity="0.88"/>
        <ellipse cx="28" cy="4" rx="7"  ry="9"  fill="#EDCDD0" opacity="1"/>
        <circle cx="26" cy="-1" r="2.5" fill="#C4A870" opacity="0.85"/>
      </g>

      {/* FLOWER 4 – lower left, almost bud */}
      <g transform="translate(112, 232) scale(0.6)">
        <ellipse cx="25" cy="-28" rx="14" ry="26" fill="#E2A8AC" opacity="0.7" transform="rotate(-18,25,-28)"/>
        <ellipse cx="46" cy="-12" rx="14" ry="26" fill="#E2A8AC" opacity="0.7" transform="rotate(22,46,-12)"/>
        <ellipse cx="46" cy="12" rx="14" ry="24" fill="#F0CDD0" opacity="0.65" transform="rotate(62,46,12)"/>
        <ellipse cx="25" cy="28" rx="14" ry="22" fill="#F0CDD0" opacity="0.65" transform="rotate(102,25,28)"/>
        <ellipse cx="4"  cy="12" rx="14" ry="26" fill="#E2A8AC" opacity="0.7" transform="rotate(142,4,12)"/>
        <ellipse cx="25" cy="0" rx="12" ry="15" fill="#C07D82" opacity="0.85"/>
        <circle cx="23" cy="-1" r="2" fill="#C4A870" opacity="0.8"/>
      </g>

      {/* BUD */}
      <g transform="translate(232, 267) scale(0.48)">
        <ellipse cx="20" cy="0" rx="12" ry="26" fill="#E2A8AC" opacity="0.68"/>
        <ellipse cx="20" cy="0" rx="12" ry="26" fill="none" stroke="#C07D82" strokeWidth="1.5" opacity="0.45"/>
        <ellipse cx="20" cy="8" rx="7" ry="10" fill="#F0CDD0" opacity="0.55"/>
      </g>

      {/* Leaves */}
      <ellipse cx="178" cy="462" rx="62" ry="24" fill="#7A9E7E" opacity="0.32" transform="rotate(-22,178,462)"/>
      <ellipse cx="240" cy="478" rx="56" ry="22" fill="#4D7256" opacity="0.28" transform="rotate(14,240,478)"/>
      <ellipse cx="190" cy="496" rx="50" ry="19" fill="#7A9E7E" opacity="0.22" transform="rotate(-4,190,496)"/>
    </svg>
  );
}

function MiniOrchid({ color = "#E2A8AC", style = {} }) {
  return (
    <svg width="72" height="90" viewBox="0 0 72 90" fill="none" style={style}>
      <g transform="translate(22,18)">
        <ellipse cx="14" cy="-17" rx="9" ry="16" fill={color} opacity="0.65" transform="rotate(-10,14,-17)"/>
        <ellipse cx="26" cy="-7"  rx="9" ry="16" fill={color} opacity="0.65" transform="rotate(30,26,-7)"/>
        <ellipse cx="26" cy="7"  rx="9" ry="16" fill={color} opacity="0.6"  transform="rotate(70,26,7)"/>
        <ellipse cx="14" cy="17" rx="9" ry="14" fill={color} opacity="0.6"  transform="rotate(110,14,17)"/>
        <ellipse cx="2"  cy="7"  rx="9" ry="16" fill={color} opacity="0.65" transform="rotate(150,2,7)"/>
        <ellipse cx="14" cy="0" rx="7" ry="9" fill="#C07D82" opacity="0.82"/>
        <circle cx="13" cy="-1" r="1.5" fill="#C4A870"/>
      </g>
      <path d="M36 50 Q34 64 32 78" stroke="#7A9E7E" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────
   NAVIGATION
───────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const links = [
    { id: "home",      label: "Home"      },
    { id: "portfolio", label: "Portfolio" },
    { id: "services",  label: "Services"  },
    { id: "about",     label: "About"     },
    { id: "contact",   label: "Contact",  cta: true },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <button className="nav-logo" onClick={() => go("home")}>
          Unlimited <span>Design Co.</span>
        </button>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a className={l.cta ? "nav-cta" : ""} onClick={() => go(l.id)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        <button className="nav-mobile-close" onClick={() => setMenuOpen(false)}>×</button>
        {links.map(l => (
          <a key={l.id} onClick={() => go(l.id)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────
   HERO
───────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="eyebrow">Design for Real Estate & Beyond</div>
        <h1 className="hero-title">
          Design that<br />
          <em>Closes the Deal</em>
        </h1>
        <p className="hero-subtitle">
          Polished marketing materials for <strong>real estate agents</strong> and growing brands.
          From buyer packets to full brand identities — every piece built to impress.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            View Services
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
            See My Work
          </button>
        </div>
        <div className="hero-stats">
          <div>
            <div className="stat-num">13+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div>
            <div className="stat-num">100+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div>
            <div className="stat-num">IP</div>
            <div className="stat-label">Licensed Design</div>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <img
          className="hero-logo"
          src="/udc-logo.svg"
          alt="Unlimited Design Co."
          width={440}
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   PORTFOLIO
───────────────────────────────────── */
const PROJECTS = [
  { id:1, title:"Real Estate Marketing Suite",       client:"Keller Williams Pasadena",      cat:"re",      bg:"linear-gradient(140deg,#2E4A35 0%,#4D7256 100%)",     accent:"#C4A870", icon:"⌂",  label:"Real Estate",  tags:["Print","Brand","Digital"] },
  { id:2, title:"Chamber of Commerce Branding",      client:"Monterey Park Chamber of Commerce", cat:"brand",   bg:"linear-gradient(140deg,#7A9E7E 0%,#B8D4BA 100%)",    accent:"#2E4A35", icon:"✦",  label:"Brand Identity",  tags:["Logo","Print","Event"] },
  { id:3, title:"Miss Monterey Park Pageant",        client:"MPCC Annual Event",              cat:"print",   bg:"linear-gradient(140deg,#1C1A3A 0%,#403588 100%)",     accent:"#C4A870", icon:"♛",  label:"Event Design", tags:["Flyer","Print","Event"] },
  { id:4, title:"Licensed IP Accessories Design",    client:"Loungefly / Funko",              cat:"ip",      bg:"linear-gradient(140deg,#C07D82 0%,#E2A8AC 100%)",     accent:"#FAF8F4", icon:"◈",  label:"Licensed IP",  tags:["Accessories","Retail","IP"] },
  { id:5, title:"Realtor Orientation Pitch Deck",   client:"West San Gabriel Valley Realtors",cat:"re",      bg:"linear-gradient(140deg,#3D3028 0%,#7A5C48 100%)",     accent:"#E2A8AC", icon:"◻",  label:"Real Estate",  tags:["Presentation","Print"] },
  { id:6, title:"Event Marketing Materials",         client:"MPCC Law Day",                   cat:"print",   bg:"linear-gradient(140deg,#8B1A1A 0%,#C04040 100%)",     accent:"#FAF8F4", icon:"⚖",  label:"Event Design", tags:["Digital","Print","Event"] },
];

const FILTERS = [
  { id:"all",   label:"All Work"     },
  { id:"re",    label:"Real Estate"  },
  { id:"brand", label:"Brand Identity" },
  { id:"print", label:"Print & Events" },
  { id:"ip",    label:"Licensed IP"  },
];

function Portfolio() {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === active);
  return (
    <section id="portfolio" className="section section-alt">
      <div className="sec-header">
        <div className="sec-eye">Selected Work</div>
        <h2 className="sec-title">A <em>Portfolio</em> Built on Results</h2>
        <p className="sec-desc">
          From real estate marketing suites to globally distributed licensed accessories — a sample of what we create.
        </p>
      </div>
      <div className="port-filters">
        {FILTERS.map(f => (
          <button key={f.id} className={`f-btn${active === f.id ? " on" : ""}`} onClick={() => setActive(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="port-grid">
        {shown.map(p => (
          <div key={p.id} className="port-card">
            <div className="port-card-bg" style={{ background: p.bg }}>
              <div className="port-card-icon" style={{ color: p.accent }}>{p.icon}</div>
              <div className="port-card-cat" style={{ color: p.accent }}>{p.label}</div>
            </div>
            <div className="port-label">
              <h4>{p.title}</h4>
              <span>{p.client}</span>
            </div>
            <div className="port-overlay">
              <h3>{p.title}</h3>
              <p>{p.client}</p>
              <div className="port-tags">
                {p.tags.map(t => <span key={t} className="port-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   SERVICES
───────────────────────────────────── */
const SVCS = [
  {
    id:"re", featured:true,
    badge:"Most Popular",
    title:"Real Estate Marketing Suites",
    desc:"Complete design systems for listing agents, buyer specialists, and real estate teams. From branded buyer packets and listing presentations to social media graphics, postcards, and door hangers — everything you need to walk into every appointment looking like a million-dollar agent.",
    items:["Buyer & Seller Packet Design","Listing Presentation Decks","Postcards & Door Hangers","Business Cards & Letterhead","Social Media Templates","Open House Materials"],
    cta:"View Realtor Packages",
    quote:'"Walk into every appointment looking like a million-dollar agent."',
  },
  {
    id:"brand", badge:"Brand & Identity",
    title:"Brand Identity",
    desc:"Logo design, color systems, typography, and brand guidelines that give your business a cohesive, professional presence across every touchpoint.",
    items:["Logo Design","Color & Type Systems","Brand Style Guides","Business Stationery"],
    cta:"Learn More",
  },
  {
    id:"print", badge:"Print",
    title:"Print & Collateral",
    desc:"Brochures, flyers, event programs, and promotional materials designed to make a lasting impression at every touchpoint.",
    items:["Brochures & Trifolds","Flyers & Posters","Event Programs","Presentation Folders"],
    cta:"Learn More",
  },
  {
    id:"social", badge:"Digital",
    title:"Social Media Content",
    desc:"Branded, scroll-stopping graphics for Instagram and Facebook — templated for easy ongoing use or custom per campaign.",
    items:["Feed Graphics","Story Templates","Campaign Launches","Content Calendars"],
    cta:"Learn More",
  },
];

function Services() {
  const go = () => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" });
  return (
    <section id="services" className="section section-sage">
      <div className="sec-header">
        <div className="sec-eye">What We Offer</div>
        <h2 className="sec-title"><em>Design Services</em> That Move the Needle</h2>
        <p className="sec-desc">
          Tailored packages for real estate professionals and growing brands — with the polish of an in-house creative team.
        </p>
      </div>
      <div className="svc-grid">
        {SVCS.map(s => (
          <div key={s.id} className={`svc-card${s.featured ? " featured" : ""}`}>
            {s.featured ? (
              <>
                <div>
                  <span className="svc-badge">{s.badge}</span>
                  <h3 className="svc-title">{s.title}</h3>
                  <p className="svc-desc">{s.desc}</p>
                  <button className="svc-cta" onClick={go}>{s.cta} →</button>
                </div>
                <div>
                  <ul className="svc-list">
                    {s.items.map(i => <li key={i}>{i}</li>)}
                  </ul>
                  <div className="svc-quote">{s.quote}</div>
                </div>
              </>
            ) : (
              <>
                <span className="svc-badge">{s.badge}</span>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <ul className="svc-list" style={{ marginTop:"1rem" }}>
                  {s.items.map(i => <li key={i}>{i}</li>)}
                </ul>
                <button className="svc-cta" onClick={go}>{s.cta} →</button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   ABOUT
───────────────────────────────────── */
function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="about-wrap">
        <div className="about-visual">
          <div className="about-art">
            <OrchidSpray size={260} style={{ opacity:0.7, animation:"floatB 8s ease-in-out infinite" }} />
          </div>
          <div className="about-badge">
            <div className="badge-num">13+</div>
            <div className="badge-label">Years of Creative Practice</div>
          </div>
        </div>
        <div className="about-right">
          <div className="eyebrow">About the Designer</div>
          <h2 className="about-title">
            Bev Lim —<br /><em>Creative Director</em> & Designer
          </h2>
          <p className="about-p">
            I'm a freelance graphic designer with over 13 years of experience turning ideas into polished, purposeful visuals. My background spans licensed IP accessories design for Loungefly/Funko — distributed globally through BoxLunch and international retailers — children's apparel design, brand identity, and a growing specialty in real estate marketing.
          </p>
          <p className="about-p">
            I'm also the Marketing Chair for the Monterey Park Chamber of Commerce and founder of <strong>Creative Futures</strong>, a design education initiative for local small business owners. I believe good design isn't a luxury — it's the difference between being noticed and being overlooked.
          </p>
          <div className="about-creds">
            <div className="cred">BFA in Illustration</div>
            <div className="cred">Licensed IP Design — Loungefly / Funko (Disney, Warner Bros.)</div>
            <div className="cred">Real Estate Marketing Specialist</div>
            <div className="cred">Marketing Chair, Monterey Park Chamber of Commerce</div>
            <div className="cred">Founder, Creative Futures Design Education Initiative</div>
            <div className="cred">City of Monterey Park Certificate of Appreciation</div>
          </div>
          <button
            className="btn-primary"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
          >
            Let's Work Together
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   CONTACT
───────────────────────────────────── */
function Contact() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", service:"", message:"" });
  const upd = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section id="contact" className="section">
      <div className="contact-wrap">
        <div>
          <MiniOrchid style={{ marginBottom:"1.5rem", opacity:0.75 }} />
          <h2 className="contact-h">Ready to <em>Elevate</em><br />Your Brand?</h2>
          <p className="contact-p">
            Whether you're a realtor looking for a full marketing suite or a business ready for a brand refresh — let's talk. Every great project starts with a conversation.
          </p>
          <div className="c-detail"><div className="c-dot"/><span><strong>Email:</strong> hello@unlimiteddesignco.com</span></div>
          <div className="c-detail"><div className="c-dot"/><span><strong>Based in:</strong> Monterey Park, CA</span></div>
          <div className="c-detail"><div className="c-dot"/><span><strong>Serving:</strong> Real estate &amp; businesses nationwide</span></div>
          <div className="c-note">
            Currently accepting new real estate design clients. Reach out to check availability.
          </div>
        </div>
        <div>
          {done ? (
            <div className="form-success">
              <MiniOrchid color="#7A9E7E" style={{ margin:"0 auto 1.5rem", display:"block" }} />
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. I'll be in touch within 1–2 business days to discuss your project.</p>
            </div>
          ) : (
            <div className="c-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={upd} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={upd} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interest</label>
                <select id="service" name="service" value={form.service} onChange={upd}>
                  <option value="">Select a service...</option>
                  <option value="re">Real Estate Marketing Suite</option>
                  <option value="brand">Brand Identity</option>
                  <option value="print">Print &amp; Collateral</option>
                  <option value="social">Social Media Content</option>
                  <option value="other">Something Else</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Tell Me About Your Project</label>
                <textarea id="message" name="message" placeholder="Share a bit about what you're looking for…" value={form.message} onChange={upd} />
              </div>
              <button className="form-btn" onClick={() => form.name && form.email && setDone(true)}>
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   FOOTER
───────────────────────────────────── */
function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const links = ["home","portfolio","services","about","contact"];
  return (
    <footer className="footer">
      <div className="footer-logo">Unlimited Design Co.</div>
      <ul className="footer-links">
        {links.map(l => (
          <li key={l}><a onClick={() => go(l)}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
        ))}
      </ul>
      <div className="footer-copy">© 2025 Unlimited Design Co. · Bev Lim · Monterey Park, CA</div>
    </footer>
  );
}

/* ─────────────────────────────────────
   APP ROOT
───────────────────────────────────── */
export default function UnlimitedDesignCo() {
  return (
    <>
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
