"use client";
import React, { useState, useEffect, useRef } from 'react';

const ArtisanAI = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleStories, setVisibleStories] = useState<Set<number>>(new Set());
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for story animations
  useEffect(() => {
    const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const indexStr = entry.target.getAttribute('data-story-index');
        if (indexStr !== null) {
          const index = parseInt(indexStr, 10);
          setVisibleStories((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        }
      }
    });
  },
  { threshold: 0.3 }
);

    storyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Generate floating artifacts
  const generateArtifacts = () => {
    const artifacts = [
      {
        left: '5%',
        duration: '22s',
        image: 'p1.jpeg'
      },
      {
        left: '25%',
        duration: '26s',
        delay: '3s',
        image: 'p2.jpeg'
      },
      {
        left: '45%',
        duration: '20s',
        delay: '1s',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=120&h=120&fit=crop'
      },
      {
        left: '65%',
        duration: '24s',
        delay: '4s',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop'
      },
      {
        left: '85%',
        duration: '21s',
        delay: '2s',
        image: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=120&h=120&fit=crop'
      }
    ];

    return artifacts.map((artifact, index) => (
      <div
        key={index}
        className="artifact"
        style={{
          left: artifact.left,
          animationDuration: artifact.duration,
          animationDelay: artifact.delay || '0s',
          backgroundImage: `url(${artifact.image})`
        }}
      />
    ));
  };

  // Artisan data
  const artisans = [
    {
      name: "Ramesh-Pottery and Ceramics",
      image: "rameshpic.jpg",
      title: "Ramesh's Ceramic Art",
      works: [
        "p1.jpeg",
        "p2.jpeg",
        "p3.jpeg",
      ],
      description: "Traditional pottery with modern aesthetics, each piece tells a story of heritage and craftsmanship."
    },
    {
      name: "Asha - Decorative Crafts",
      image: "ashapic.png",
      title: "Asha's Art",
      works: [
        "p4.jpeg",
        "p5.jpeg",
        "p6.jpeg",
      ],
      description: "Traditional work crafted with care, blending heritage techniques and contemporary design to create timeless works of art"
    },
    {
      name: "Suresh - Handcrafted Decor",
      image: "s5.jpg",
      title: "Suresh's Crafts",
      works: [
        "p8.jpeg",
        "p9.jpeg",
        "p10.jpeg",
      ],
      description: "These unique handcrafted pieces showcase traditional artistry blended with creative innovation, offering a glimpse into the rich heritage and skilled techniques passed down through generations"
    },
    {
      name: "Leela - Wood Artist",
      image: "leela.jpg",
      title: "Leela's Wood Works",
      works: [
        "p11.jpeg",
        "p12.jpeg",
        "p13.jpeg",
      ],
      description: "Exquisite woodwork combining traditional techniques with contemporary design sensibilities."
    }
  ];

  // Stories data
  const stories = [
    {
      image: "rameshpic.jpg",
      title: "Ramesh – The Potter's Legacy",
      text: "Ramesh comes from a family of traditional potters spanning five generations. His weathered hands mold clay into beautiful everyday art pieces, each one inspired by ancient village traditions passed down through generations. With ArtisanAI's intelligent marketplace platform, his handcrafted pottery now finds appreciative buyers across the globe, while still carrying the authentic essence and cultural stories of his hometown. Every piece tells a tale of heritage, patience, and the timeless art of transformation."
    },
    {
      image: "ashapic.png",
      title: "Asha-Decorative Artisan",
      text: "Asha's wooden loom carries the rhythmic heartbeat of her ancestors, echoing through generations of skilled weavers. Each intricate pattern she weaves tells a story of resilience, patience, and deep-rooted cultural heritage. The vibrant threads dance under her expert guidance, creating textiles that are not just fabric, but living narratives of tradition. Through our AI-powered platform, she now shares not only her exquisite craft but also her cultural journey with an appreciative worldwide audience, bridging ancient techniques with modern connectivity."
    }
  ];
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f0] via-[#f5ede3] to-[#e9dbc6] text-[#3b2f2f] overflow-x-hidden">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
       
        * {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #c9a46b, #d2b48c);
          z-index: 50;
          transition: width 0.3s ease;
        }

        .nav-floating {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          z-index: 40;
          background: rgba(255, 248, 240, 0.95);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(212, 180, 131, 0.3);
          border-radius: 50px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .nav-floating:hover {
          transform: translateX(-50%) translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.8rem;
          color: #6b4226;
          background: linear-gradient(135deg, #6b4226, #a0522d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #6b4226;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #c9a46b, #d2b48c);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover {
          color: #a0522d;
          background: rgba(201, 164, 107, 0.1);
        }

        .nav-link:hover::before {
          width: 80%;
        }

        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg,
            rgba(255, 248, 240, 0.9) 0%,
            rgba(241, 227, 211, 0.8) 50%,
            rgba(233, 219, 198, 0.9) 100%);
        }

        .hero-content {
          z-index: 10;
          animation: fadeInUp 1.2s ease-out;
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #4a3221;
          text-shadow: 2px 2px 8px rgba(255, 228, 196, 0.8);
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: #6b4226;
          margin-bottom: 2rem;
          opacity: 0.9;
          font-weight: 300;
        }

        .hero-cta {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #c9a46b, #d2b48c);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(201, 164, 107, 0.3);
          cursor: pointer;
        }

        .hero-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(201, 164, 107, 0.4);
          background: linear-gradient(135deg, #b8935a, #c9a46b);
        }

        .artifact {
          position: absolute;
          width: clamp(80px, 8vw, 140px);
          height: clamp(80px, 8vw, 140px);
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          opacity: 0.7;
          animation: float 20s linear infinite;
          border: 3px solid rgba(210, 180, 140, 0.6);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(2px);
          transition: all 0.3s ease;
        }

        .artifact:hover {
          opacity: 0.9;
          transform: scale(1.05);
          z-index: 5;
        }

        @keyframes float {
          0% {
            transform: translateY(110vh) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-140vh) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }

        .showcase {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #f5ede3 0%, #e9dbc6 100%);
          position: relative;
        }

        .showcase::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to bottom, rgba(255, 248, 240, 1) 0%, rgba(255, 248, 240, 0) 100%);
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #6b4226;
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(135deg, #c9a46b, #d2b48c);
          border-radius: 2px;
        }

        .artisans {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .artisan {
          position: relative;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation: slideInUp 0.8s ease-out;
        }

        .artisan-circle {
          width: 200px;
          height: 200px;
          margin: 0 auto;
          border-radius: 50%;
          background: linear-gradient(135deg, #fff8f0, #f5ede3);
          position: relative;
          overflow: hidden;
          border: 4px solid transparent;
          background-clip: padding-box;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .artisan-circle::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(45deg, #d2a679, #c9a46b, #b8935a, #d2b48c);
          border-radius: 50%;
          z-index: -1;
          animation: rotate 8s linear infinite;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .artisan:hover .artisan-circle {
          transform: scale(1.1);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .artisan img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: all 0.5s ease;
        }

        .artisan-label {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.8rem 1.5rem;
          background: rgba(107, 66, 38, 0.95);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 25px;
          text-align: center;
          letter-spacing: 0.5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .artisan-work {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          background: rgba(255, 248, 240, 0.98);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 1.5rem;
          width: 280px;
          opacity: 0;
          transition: all 0.4s ease;
          z-index: 30;
          border: 2px solid rgba(201, 164, 107, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .artisan:hover .artisan-work {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }

        .work-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #6b4226;
          margin-bottom: 1rem;
          text-align: center;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 1rem;
        }

        .work-item {
          width: 100%;
          height: 60px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid rgba(201, 164, 107, 0.3);
          transition: all 0.3s ease;
        }

        .work-item:hover {
          transform: scale(1.05);
          border-color: #c9a46b;
        }

        .work-description {
          font-size: 0.85rem;
          color: #6b4226;
          text-align: center;
          line-height: 1.4;
        }

        .stories {
          padding: 6rem 2rem;
          background: rgba(245, 237, 227, 0.95);
          position: relative;
        }

        .stories::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(circle at 20% 40%, rgba(139, 69, 19, 0.02) 3px, transparent 3px),
            radial-gradient(circle at 80% 60%, rgba(160, 82, 45, 0.02) 2px, transparent 2px),
            linear-gradient(60deg, transparent 48%, rgba(210, 180, 140, 0.02) 50%, transparent 52%);
          background-size: 100px 100px, 70px 70px, 140px 140px;
          pointer-events: none;
        }

        .stories .section-title {
          color: #5c3a21;
        }

        .stories .section-title::after {
          background: linear-gradient(135deg, #b8935a, #c9a46b);
        }

        .story {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 5rem;
          flex-wrap: wrap;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .story.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .story-image {
          flex: 1;
          min-width: 300px;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .story img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          transition: all 0.5s ease;
        }

        .story-image:hover img {
          transform: scale(1.05);
        }

        .story-text {
          flex: 1;
          min-width: 300px;
        }

        .story-text h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: #5c3a21;
          margin-bottom: 1rem;
        }

        .story-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #3b2f2f;
          text-align: justify;
        }

        .story:nth-child(odd) {
          flex-direction: row-reverse;
        }

        footer {
          background: linear-gradient(135deg, #2c1810 0%, #1a0f08 100%);
          color: #d4b483;
          text-align: center;
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
        }

        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 4px;
          background: linear-gradient(90deg, transparent, #c9a46b, transparent);
        }

        footer p {
          margin: 0.8rem 0;
          font-size: 1.1rem;
        }

        .footer-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .nav-floating {
            width: 95%;
            padding: 0.8rem 1.5rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav-link {
            padding: 0.3rem 0.8rem;
            font-size: 0.9rem;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .artisans {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
          }

          .artisan-circle {
            width: 150px;
            height: 150px;
          }

          .artisan-work {
            width: 250px;
          }

          .story {
            flex-direction: column !important;
            text-align: center;
          }

          .story-image, .story-text {
            min-width: auto;
          }
          .login-dropdown-container {
  position: relative;
  cursor: pointer;
}

.login-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff8f0;
  border: 1px solid rgba(201, 164, 107, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  z-index: 100;
  min-width: 150px;
}

.dropdown-item {
  padding: 0.8rem 1.2rem;
  font-size: 0.95rem;
  color: #6b4226;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(201, 164, 107, 0.1);
}

        }
      `}</style>

      {/* Enhanced Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Enhanced Floating Navbar */}
      <nav className="nav-floating">
        <div className="logo"> ArteZaar</div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => scrollToSection('home')}>Home</span>
          <span className="nav-link" onClick={() => scrollToSection('showcase')}>Artisans</span>
          <span className="nav-link" onClick={() => scrollToSection('stories')}>Stories</span>
             <div className="nav-link login-dropdown-container" onMouseEnter={() => setShowLoginDropdown(true)} onMouseLeave={() => setShowLoginDropdown(false)}>
      Login
      {showLoginDropdown && (
        <div className="login-dropdown">
          <div onClick={() => window.location.href = '/products'} style={{ cursor: "pointer" }}>
  Buyer Sign In
</div>

          <div className="dropdown-item" onClick={() => window.location.href = '/login'}>Seller Sign In</div>
        </div>
      )}
    </div>
          <span className="nav-link" onClick={() => scrollToSection('contact')}>Contact</span>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Connecting Local Artisans to the Digital World</h1>
          <p className="hero-subtitle">Handcrafted treasures with a soul, story, and culture—take home a journey, not just a product.</p>
          <button
            className="hero-cta"
            onClick={() => scrollToSection('showcase')}
          >
            Discover Artisans
          </button>
        </div>
       
        {/* Enhanced Floating artifacts */}
        {generateArtifacts()}
      </section>

      {/* Enhanced Artisan Showcase */}
      <section id="showcase" className="showcase">
        <h2 className="section-title">Meet Our Talented Artisans</h2>
        <div className="artisans">
          {artisans.map((artisan, index) => (
            <div key={index} className="artisan">
              <div className="artisan-circle">
                <img src={artisan.image} alt={artisan.name} />
              </div>
              <div className="artisan-label">{artisan.name}</div>
              <div className="artisan-work">
                <h3 className="work-title">{artisan.title}</h3>
                <div className="work-grid">
                  {artisan.works.map((work, workIndex) => (
                    <img
                      key={workIndex}
                      src={work}
                      alt={`Work ${workIndex + 1}`}
                      className="work-item"
                    />
                  ))}
                </div>
                <p className="work-description">{artisan.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Storytelling Section */}
      <section id="stories" className="stories">
        <h2 className="section-title">Stories of Craftsmanship & Heritage</h2>
       
        {stories.map((story, index) => (
          <div
            key={index}
            ref={(el) => { storyRefs.current[index] = el; }}
            data-story-index={index}
            className={`story ${visibleStories.has(index) ? 'visible' : ''}`}
          >
            <div className="story-image">
              <img src={story.image} alt={story.title} />
            </div>
            <div className="story-text">
              <h3>{story.title}</h3>
              <p>{story.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Enhanced Footer */}
      <footer id="contact">
        <p className="footer-title"> 🧵ArteZaar – Connecting Crafts to the World🧵</p>
        <p>Empowering local artisans through intelligent technology and global reach</p>
        <p>Contact: helpartisans990@gmail.com | +91 98924 65686</p>
        <p>&copy; 2025 ArteZaar- Bringing you handcrafted treasures that weave together each artisan’s story, culture, and passion—every piece is a journey, not just a product</p>
      </footer>
    </div>
  );
};

export default ArtisanAI;
