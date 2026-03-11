import {
  Award,
  Calendar,
  ChevronDown,
  Clock,
  Crown,
  Droplets,
  Hand,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Scissors,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Animated Counter ──
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
  started,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  started: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// ── useIntersection ──
function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Stars ──
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].slice(0, count).map((n) => (
        <Star key={n} size={14} fill="#d4af37" color="#d4af37" />
      ))}
    </div>
  );
}

// ── AnimatedSection ──
function AnimatedSection({
  id,
  children,
  style,
}: {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useIntersection();
  return (
    <section id={id} style={style}>
      <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
        {children}
      </div>
    </section>
  );
}

const WHATSAPP = "https://wa.me/919759620690";
const PHONE = "tel:+919759620690";

const services = [
  {
    icon: <Scissors size={28} />,
    title: "Haircut & Advanced Styling",
    desc: "Precision cuts tailored to your face shape and personality by expert stylists.",
  },
  {
    icon: <Palette size={28} />,
    title: "Hair Coloring & Highlights",
    desc: "Vibrant global colors, balayage, ombre & highlights using premium products.",
  },
  {
    icon: <Crown size={28} />,
    title: "Bridal Makeup Packages",
    desc: "Complete bridal transformation — traditional, fusion, or modern looks.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Party & Engagement Makeup",
    desc: "Flawless party looks that photograph beautifully and last all night.",
  },
  {
    icon: <Leaf size={28} />,
    title: "Facial & Skin Treatment",
    desc: "Customized facials, clean-ups & skin care for radiant, glowing skin.",
  },
  {
    icon: <Hand size={28} />,
    title: "Manicure & Pedicure",
    desc: "Luxury nail care with gel extensions, nail art & spa treatments.",
  },
  {
    icon: <Droplets size={28} />,
    title: "Beard Grooming & Hair Spa",
    desc: "Precision beard shaping, hot-oil spa treatments & scalp therapy.",
  },
];

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
    alt: "Bridal Makeup",
  },
  {
    url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    alt: "Hair Styling",
  },
  {
    url: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80",
    alt: "Bridal Look",
  },
  {
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    alt: "Skin Treatment",
  },
  {
    url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80",
    alt: "Nail Art",
  },
  {
    url: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80",
    alt: "Hair Color",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "Best bridal makeup I've ever seen! The team is extremely professional and the result was absolutely stunning. Every detail was perfect.",
  },
  {
    name: "Rahul Verma",
    review:
      "Great haircut and beard grooming. Very clean salon, friendly staff. Highly recommend to anyone in Rudrapur!",
  },
  {
    name: "Neha Singh",
    review:
      "Amazing facial treatment. My skin glowed for weeks afterwards. Will definitely come back for more services!",
  },
  {
    name: "Anil Kumar",
    review:
      "Excellent service at very reasonable prices. The stylists really know their craft. 5 stars without hesitation.",
  },
];

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
  });
  const countersRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = [
        "home",
        "about",
        "services",
        "gallery",
        "testimonials",
        "contact",
      ];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = countersRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello! I'd like to book an appointment.%0AName: ${encodeURIComponent(formData.name)}%0APhone: ${encodeURIComponent(formData.phone)}%0AService: ${encodeURIComponent(formData.service)}%0ADate: ${encodeURIComponent(formData.date)}`;
    window.open(`${WHATSAPP}?text=${msg}`, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    padding: "12px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(212,175,55,0.25)",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 2rem",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.5)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
        }}
      >
        <button
          type="button"
          onClick={() => scrollTo("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(212,175,55,0.4)",
            }}
          >
            <Scissors size={18} color="#0a0a0a" />
          </div>
          <div>
            <div
              className="font-display"
              style={{
                color: "#d4af37",
                fontSize: "1.1rem",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Makeover
            </div>
            <div
              style={{
                color: "#aaa",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Unisex Salon
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ gap: "2rem", alignItems: "center" }}
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              data-ocid="nav.link"
              onClick={() => scrollTo(link.id)}
              style={{
                background: "none",
                border: "none",
                color: activeSection === link.id ? "#d4af37" : "#ccc",
                cursor: "pointer",
                fontSize: "0.82rem",
                fontWeight: activeSection === link.id ? 600 : 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "4px 0",
                borderBottom:
                  activeSection === link.id
                    ? "1px solid #d4af37"
                    : "1px solid transparent",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn"
            style={{
              padding: "8px 20px",
              borderRadius: "4px",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            Book Now
          </a>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#d4af37",
            cursor: "pointer",
            padding: 4,
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            zIndex: 999,
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(20px)",
            padding: "1.5rem 2rem",
            borderBottom: "1px solid rgba(212,175,55,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              data-ocid="nav.link"
              onClick={() => scrollTo(link.id)}
              style={{
                background: "none",
                border: "none",
                color: activeSection === link.id ? "#d4af37" : "#ccc",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                textAlign: "left",
                fontFamily: "inherit",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.65) 60%, #0a0a0a 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "850px",
            padding: "0 1.5rem",
            paddingTop: "100px",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                background: "rgba(212,175,55,0.15)",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#d4af37",
                padding: "6px 18px",
                borderRadius: "30px",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              ✦ Premium Beauty Studio · Rudrapur ✦
            </span>
          </div>
          <h1
            className="font-display gold-shimmer"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
          >
            Experience Luxury
            <br />
            Makeover in Rudrapur
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#d0d0d0",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Professional Hair, Bridal Makeup & Skin Services
            <br />
            Under One Roof.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.primary_button"
              className="gold-btn"
              style={{
                padding: "14px 36px",
                borderRadius: "4px",
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Calendar size={18} /> Book Appointment
            </a>
            <a
              href={PHONE}
              data-ocid="hero.secondary_button"
              className="outline-gold-btn"
              style={{
                padding: "14px 36px",
                borderRadius: "4px",
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Phone size={18} /> Call Now
            </a>
          </div>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex" }}>
              {["P", "R", "N", "A", "K"].map((letter, i) => (
                <div
                  key={letter}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #d4af37, #f0d060)",
                    border: "2px solid #0a0a0a",
                    marginLeft: i > 0 ? "-10px" : 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    color: "#0a0a0a",
                    fontWeight: 700,
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <Stars count={5} />
              <div style={{ fontSize: "0.75rem", color: "#aaa" }}>
                4.3★ · 150+ Happy Clients
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollTo("about")}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            background: "none",
            border: "none",
            cursor: "pointer",
            animation: "hero-bounce 2s infinite",
          }}
          aria-label="Scroll down"
        >
          <ChevronDown color="#d4af37" size={32} />
        </button>
      </section>

      {/* ── ABOUT ── */}
      <AnimatedSection id="about">
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
                alt="Salon interior"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  objectFit: "cover",
                  height: "480px",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-16px",
                  background: "linear-gradient(135deg, #d4af37, #f0d060)",
                  color: "#0a0a0a",
                  padding: "18px 22px",
                  borderRadius: "8px",
                  boxShadow: "0 10px 40px rgba(212,175,55,0.4)",
                  fontWeight: 700,
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                >
                  5+
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Years of
                  <br />
                  Excellence
                </div>
              </div>
            </div>
            <div>
              <p
                style={{
                  color: "#d4af37",
                  fontSize: "0.78rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "1rem",
                }}
              >
                ✦ Our Story
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#fff",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                }}
              >
                Where Beauty
                <br />
                <span className="gold-text">Meets Perfection</span>
              </h2>
              <div
                style={{
                  width: 80,
                  height: 2,
                  background: "linear-gradient(90deg, #d4af37, transparent)",
                  marginBottom: "1.5rem",
                }}
              />
              <p
                style={{ color: "#bbb", lineHeight: 1.8, marginBottom: "1rem" }}
              >
                At Makeover Unisex Salon, we believe beauty is an art form.
                Nestled in the heart of Civil Line, Rudrapur, our salon is a
                sanctuary where your vision transforms into reality.
              </p>
              <p
                style={{ color: "#bbb", lineHeight: 1.8, marginBottom: "2rem" }}
              >
                Our team of experienced, internationally-trained stylists and
                makeup artists bring years of expertise to every appointment —
                ensuring you leave looking and feeling your absolute best.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    icon: <Award size={16} />,
                    title: "Expert Stylists",
                    desc: "Internationally trained professionals",
                  },
                  {
                    icon: <Sparkles size={16} />,
                    title: "Premium Products",
                    desc: "Only the finest beauty brands",
                  },
                  {
                    icon: <Leaf size={16} />,
                    title: "Hygiene First",
                    desc: "Sterilized tools & clean environment",
                  },
                  {
                    icon: <Users size={16} />,
                    title: "Personalized Care",
                    desc: "Every service tailored to you",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "12px",
                      borderRadius: "8px",
                      background: "rgba(212,175,55,0.06)",
                      border: "1px solid rgba(212,175,55,0.15)",
                    }}
                  >
                    <span
                      style={{ color: "#d4af37", flexShrink: 0, marginTop: 2 }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <div
                        style={{
                          color: "#fff",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          color: "#777",
                          fontSize: "0.72rem",
                          marginTop: 2,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── SERVICES ── */}
      <AnimatedSection id="services" style={{ background: "#0d0d0d" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                color: "#d4af37",
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              ✦ What We Offer
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Our Premium <span className="gold-text">Services</span>
            </h2>
            <div className="section-divider" />
            <p style={{ color: "#777", maxWidth: "500px", margin: "0 auto" }}>
              Exceptional beauty services crafted for every style, occasion, and
              individual.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {services.map((svc, i) => (
              <div
                key={svc.title}
                data-ocid={`services.item.${i + 1}`}
                className="glass-card"
                style={{
                  padding: "2rem",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "12px",
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#d4af37",
                    marginBottom: "1.2rem",
                  }}
                >
                  {svc.icon}
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    color: "#888",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    marginBottom: "1.2rem",
                  }}
                >
                  {svc.desc}
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#d4af37",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    borderBottom: "1px solid rgba(212,175,55,0.4)",
                    paddingBottom: 2,
                  }}
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── WHY CHOOSE US / COUNTERS ── */}
      <section
        style={{
          background: "#070707",
          borderTop: "1px solid rgba(212,175,55,0.1)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <div
          ref={countersRef}
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                color: "#d4af37",
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "0.8rem",
              }}
            >
              ✦ Why Choose Us
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Trusted by <span className="gold-text">Hundreds</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                icon: <Users size={30} />,
                end: 150,
                suffix: "+",
                label: "Happy Clients",
              },
              {
                icon: <Award size={30} />,
                end: 5,
                suffix: "+",
                label: "Years Experience",
              },
              {
                icon: <Star size={30} />,
                end: 0,
                suffix: "",
                label: "Google Rating",
                display: "4.3★",
              },
              {
                icon: <Calendar size={30} />,
                end: 7,
                suffix: "",
                label: "Days Open",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card"
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#d4af37",
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "#d4af37",
                    lineHeight: 1,
                  }}
                >
                  {item.display ? (
                    countersStarted ? (
                      item.display
                    ) : (
                      "0"
                    )
                  ) : (
                    <AnimatedCounter
                      end={item.end}
                      suffix={item.suffix}
                      started={countersStarted}
                    />
                  )}
                </div>
                <div
                  style={{
                    color: "#777",
                    fontSize: "0.8rem",
                    marginTop: "0.5rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "2.5rem",
              textAlign: "center",
              padding: "1.2rem",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "8px",
              background: "rgba(212,175,55,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Clock size={18} color="#d4af37" />
            <span
              style={{ color: "#d4af37", fontWeight: 600, fontSize: "0.9rem" }}
            >
              Open Every Day
            </span>
            <span style={{ color: "#555" }}>·</span>
            <span style={{ color: "#ccc" }}>9:00 AM – 10:00 PM</span>
            <span style={{ color: "#555" }}>·</span>
            <a
              href={PHONE}
              style={{
                color: "#d4af37",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              +91 9759620690
            </a>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <AnimatedSection id="gallery">
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                color: "#d4af37",
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              ✦ Our Work
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Bridal & Makeover <span className="gold-text">Gallery</span>
            </h2>
            <div className="section-divider" />
          </div>
          <div className="masonry-grid">
            {galleryImages.map((img, i) => (
              <div
                key={img.alt}
                className="masonry-item"
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img src={img.url} alt={img.alt} loading="lazy" />
                <div className="masonry-overlay" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── TESTIMONIALS ── */}
      <AnimatedSection id="testimonials" style={{ background: "#0d0d0d" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                color: "#d4af37",
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              ✦ Client Love
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              What Our Clients <span className="gold-text">Say</span>
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                margin: "1rem 0",
              }}
            >
              <Stars count={5} />
              <span style={{ color: "#d4af37", fontWeight: 700 }}>4.3</span>
              <span style={{ color: "#777" }}>· Based on 150+ reviews</span>
            </div>
            <div className="section-divider" />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="glass-card"
                style={{ padding: "2rem", borderRadius: "10px" }}
              >
                <Stars count={5} />
                <p
                  style={{
                    color: "#ccc",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    margin: "1rem 0",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.review}&rdquo;
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    borderTop: "1px solid rgba(212,175,55,0.15)",
                    paddingTop: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #d4af37, #f0d060)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0a0a0a",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ color: "#666", fontSize: "0.72rem" }}>
                      Verified Client
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── CONTACT ── */}
      <AnimatedSection id="contact">
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                color: "#d4af37",
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              ✦ Find Us
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Visit <span className="gold-text">Us</span>
            </h2>
            <div className="section-divider" />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <MapPin
                    size={20}
                    color="#d4af37"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Address
                    </div>
                    <div style={{ color: "#888", fontSize: "0.85rem" }}>
                      Janta Inter College Road, Civil Line,
                      <br />
                      Rudrapur, Uttarakhand, India
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <Phone size={20} color="#d4af37" style={{ flexShrink: 0 }} />
                  <div>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Phone
                    </div>
                    <a
                      href={PHONE}
                      style={{
                        color: "#d4af37",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                      }}
                    >
                      +91 9759620690
                    </a>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <Clock size={20} color="#d4af37" style={{ flexShrink: 0 }} />
                  <div>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Hours
                    </div>
                    <div style={{ color: "#888", fontSize: "0.85rem" }}>
                      9:00 AM – 10:00 PM · All Days
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#fff",
                  padding: "11px 22px",
                  borderRadius: "6px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  marginBottom: "2rem",
                }}
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>

              <form
                onSubmit={handleFormSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.9rem",
                }}
              >
                <h3
                  className="font-display"
                  style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700 }}
                >
                  Quick Appointment
                </h3>
                <input
                  data-ocid="contact.input"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  style={inputStyle}
                />
                <select
                  data-ocid="contact.select"
                  required
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  style={{
                    ...inputStyle,
                    background: "#131313",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled>
                    Select Service
                  </option>
                  <option>Haircut &amp; Advanced Styling</option>
                  <option>Hair Coloring &amp; Highlights</option>
                  <option>Bridal Makeup Package</option>
                  <option>Party &amp; Engagement Makeup</option>
                  <option>Facial &amp; Skin Treatment</option>
                  <option>Manicure &amp; Pedicure</option>
                  <option>Beard Grooming &amp; Hair Spa</option>
                </select>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  style={{
                    ...inputStyle,
                    background: "#131313",
                    colorScheme: "dark",
                  }}
                />
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  className="gold-btn"
                  style={{
                    padding: "13px",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                  }}
                >
                  <Calendar size={17} /> Book via WhatsApp
                </button>
              </form>
            </div>

            <div
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(212,175,55,0.25)",
                minHeight: 480,
              }}
            >
              <iframe
                data-ocid="contact.map_marker"
                src="https://maps.google.com/maps?q=Makeover+Unisex+Salon,+Civil+Line,+Rudrapur,+Uttarakhand&output=embed"
                width="100%"
                height="480"
                style={{ border: "none", display: "block" }}
                title="Makeover Unisex Salon Location"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#050505",
          borderTop: "1px solid rgba(212,175,55,0.2)",
          padding: "4rem 2rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #d4af37, #f0d060)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Scissors size={16} color="#0a0a0a" />
                </div>
                <div>
                  <div
                    className="font-display"
                    style={{
                      color: "#d4af37",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                    }}
                  >
                    Makeover
                  </div>
                  <div
                    style={{
                      color: "#555",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    Unisex Salon
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "#555",
                  fontSize: "0.82rem",
                  lineHeight: 1.8,
                  maxWidth: 260,
                }}
              >
                Rudrapur's premier beauty destination. Luxury hair, makeup &
                skin services tailored to perfection.
              </p>
              <a
                href="https://www.instagram.com"
                aria-label="Instagram"
                style={{
                  display: "inline-flex",
                  marginTop: "1rem",
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid rgba(212,175,55,0.4)",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d4af37",
                }}
              >
                <Instagram size={15} />
              </a>
            </div>
            <div>
              <h4
                style={{
                  color: "#d4af37",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                  fontWeight: 700,
                }}
              >
                Quick Links
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#666",
                        cursor: "pointer",
                        fontSize: "0.82rem",
                        fontFamily: "inherit",
                        padding: 0,
                        textAlign: "left",
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                style={{
                  color: "#d4af37",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                  fontWeight: 700,
                }}
              >
                Services
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {services.slice(0, 5).map((svc) => (
                  <li key={svc.title}>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#666",
                        fontSize: "0.82rem",
                        textDecoration: "none",
                      }}
                    >
                      {svc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(212,175,55,0.1)",
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p style={{ color: "#444", fontSize: "0.78rem" }}>
              © {new Date().getFullYear()} Makeover Unisex Salon. All rights
              reserved.
            </p>
            <p style={{ color: "#444", fontSize: "0.78rem" }}>
              Designed with ❤️ for Beauty Excellence · Built with{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#d4af37", textDecoration: "none" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pulse"
        style={{
          position: "fixed",
          bottom: "90px",
          right: "24px",
          zIndex: 999,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          textDecoration: "none",
        }}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} color="#fff" fill="#fff" />
      </a>

      {/* ── MOBILE CALL BAR ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 998,
          background: "linear-gradient(135deg, #d4af37, #f0d060)",
        }}
      >
        <a
          href={PHONE}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "13px",
            color: "#0a0a0a",
            fontWeight: 800,
            fontSize: "0.95rem",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          <Phone size={18} /> 📞 Call Now — +91 9759620690
        </a>
      </div>
    </div>
  );
}
