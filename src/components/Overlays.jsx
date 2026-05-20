import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Overlays() {
  const overlayRef = useRef(null);

  // Mouse move effect for glass panels (Calculates local --mouse-x and --mouse-y for realistic lighting)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.glass-panel');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      // Custom cursor movement
      const dot = document.querySelector('.cursor-dot');
      const ring = document.querySelector('.cursor-ring');
      if (dot && ring) {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, opacity: 1 });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, opacity: 1 });
      }
    };

    const handleMouseLeave = () => {
      const dot = document.querySelector('.cursor-dot');
      const ring = document.querySelector('.cursor-ring');
      if (dot && ring) {
        dot.style.opacity = 0;
        ring.style.opacity = 0;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Magnetic buttons reveal GSAP stagger
    gsap.fromTo('.logo', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' });
    gsap.fromTo('.nav-links li', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
    gsap.fromTo('.nav-cta', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.6 });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="content-wrapper" ref={overlayRef}>
      {/* Magnetic Cursor */}
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>

      {/* Navigation Header */}
      <nav>
        <div className="logo">
          Mintlify <span className="logo-dot"></span>
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#customers">Customers</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="https://mintlify.com/docs">Documentation</a></li>
        </ul>
        <div className="nav-cta">
          <a href="https://dashboard.mintlify.com/signup" className="btn btn-secondary" style={{ padding: '0.6rem 1.8rem', fontSize: '13px' }}>
            Start for free
          </a>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section id="hero">
        <div className="tag">Next-Generation Documentation</div>
        <h1 className="display-title">
          Built for <span className="text-gradient">Humans</span><br />
          And <span className="text-gradient-cyan">AI Engines</span>.
        </h1>
        <p className="subtitle">
          Meet the world's first AI-native knowledge platform. Beautiful out-of-the-box documentation that automatically syncs with your code and shows up in the workflows developers and LLMs already rely on.
        </p>
        <div className="btn-group">
          <a href="https://dashboard.mintlify.com/signup" className="btn btn-primary">
            Deploy in Minutes
          </a>
          <a href="https://mintlify.com/contact/sales" className="btn btn-secondary">
            Get a Demo
          </a>
        </div>
      </section>

      {/* SECTION 2: AI-NATIVE FLOW FEATURES */}
      <section id="features">
        <div className="tag">Self-Updating Engine</div>
        <h2 className="display-title text-gradient-cyan" style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}>
          INTEGRATE AI INTO EVERY PART OF YOUR LIFECYCLE
        </h2>
        <p className="subtitle">
          Don't let documentation become a static archive. Bring dynamic, context-aware structure to your engineering stack.
        </p>

        <div className="features-container">
          <div className="glass-panel feature-item">
            <div className="feature-icon-box">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3>llms.txt & MCP Ready</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '15px' }}>
              Ensure your product maps seamlessly into developer workflows. Complete, native support for Model Context Protocol (MCP) and llms.txt standard declarations out of the box.
            </p>
          </div>

          <div className="glass-panel feature-item">
            <div className="feature-icon-box" style={{ color: 'var(--color-primary)', background: 'var(--color-primary-glow)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M3 12l-3-3m3 3l3-3" />
              </svg>
            </div>
            <h3>Self-Updating Knowledge</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '15px' }}>
              Draft, audit, and clean content dynamically with an autonomous, context-aware AI agent. Prevent structural code drift from degrading your developer portals.
            </p>
          </div>

          <div className="glass-panel feature-item" style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}>
            <div className="feature-icon-box" style={{ color: 'var(--color-accent)', background: 'var(--color-accent-glow)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.474M18 10.5c0 2.222-1.378 4.123-3.328 4.904L12 18.75l-2.672-3.346A5.5 5.5 0 016 10.5c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5z" />
              </svg>
            </div>
            <h3>Intelligent User Assistant</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '15px' }}>
              Convert documentation reading into a guided, spatial conversation. An embedded generative model understands context, indexation, and resolves user queries instantly.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PREMIUM CUSTOMERS (Anthropic, Perplexity, Cognition) */}
      <section id="customers">
        <div className="tag">Proven at Scale</div>
        <h2 className="display-title"><span className="text-gradient">TRUSTED BY THE LEADERS</span> OF TOMORROW</h2>
        <p className="subtitle">
          From bleeding-edge frontier AI labs to established frameworks, developers build and scale their knowledge ecosystems on top of Mintlify.
        </p>

        <div className="story-grid">
          <div className="glass-panel story-card">
            <div>
              <div className="company">Anthropic</div>
              <p className="stat-label">Products Serviced</p>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '500' }}>
                Claude API · MCP · Claude Code
              </p>
            </div>
            <div className="stats">
              <div className="stat-number">2M+</div>
              <div className="stat-label">Monthly Active Developers</div>
            </div>
            <p className="quote">
              "Accelerating frontier AI development by enabling millions of developers to build securely on Claude."
            </p>
          </div>

          <div className="glass-panel story-card" style={{ borderColor: 'rgba(6, 182, 212, 0.15)' }}>
            <div>
              <div className="company" style={{ color: 'var(--color-secondary)' }}>Perplexity</div>
              <p className="stat-label">Objective</p>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '500' }}>
                AI-Native Dev Experience
              </p>
            </div>
            <div className="stats">
              <div className="stat-number" style={{ color: 'var(--color-secondary)' }}>10x</div>
              <div className="stat-label">Product Delivery Velocity</div>
            </div>
            <p className="quote">
              "Transforming complex, evolving indexing pipelines into readable documentation at the speed of core engineering."
            </p>
          </div>

          <div className="glass-panel story-card" style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}>
            <div>
              <div className="company" style={{ color: 'var(--color-accent)' }}>Cognition AI</div>
              <p className="stat-label">Objective</p>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '500' }}>
                Agentic Onboarding
              </p>
            </div>
            <div className="stats">
              <div className="stat-number" style={{ color: 'var(--color-accent)' }}>0ms</div>
              <div className="stat-label">Onboarding Latency</div>
            </div>
            <p className="quote">
              "Scaling Devin's developer environment documentation to mirror our raw product and automation ethos."
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              Mintlify <span className="logo-dot"></span>
            </div>
            <p className="footer-desc">
              The intelligent, spatial documentation platform designed for humans and AI agents.
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="https://mintlify.com/startups">Startups</a></li>
              <li><a href="https://mintlify.com/enterprise">Enterprise</a></li>
              <li><a href="https://mintlify.com/pricing">Pricing</a></li>
              <li><a href="https://mintlify.com/oss-program">OSS Program</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://mintlify.com/customers">Customers</a></li>
              <li><a href="https://mintlify.com/blog">Blog</a></li>
              <li><a href="https://mintlify.com/guides/introduction">Guides</a></li>
              <li><a href="https://security.mintlify.com">Security</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Documentation</h4>
            <ul>
              <li><a href="https://mintlify.com/docs">Getting Started</a></li>
              <li><a href="https://mintlify.com/docs/api-reference">API Reference</a></li>
              <li><a href="https://mintlify.com/docs/components">Components</a></li>
              <li><a href="https://mintlify.com/docs/changelog">Changelog</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="https://mintlify.com/legal/privacy">Privacy Policy</a></li>
              <li><a href="https://mintlify.com/legal/terms">Terms of Service</a></li>
              <li><a href="https://status.mintlify.com/">Systems Status</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Mintlify, Inc. All rights reserved.</div>
          <div style={{ color: 'var(--color-primary)', fontWeight: '600', letterSpacing: '0.05em' }}>SOC 2 COMPLIANT · ISO 27001 READY</div>
        </div>
      </footer>
    </div>
  );
}
