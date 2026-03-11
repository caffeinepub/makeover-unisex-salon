import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  Heart,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  Scissors,
  Shield,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

// ============ DATA ============

const heroSlides = [
  {
    image: "/assets/generated/hero-interior.dim_1920x1080.jpg",
    title: "Luxury Salon Experience",
    badge: "PREMIUM BEAUTY SERVICES",
  },
  {
    image: "/assets/generated/hero-haircut.dim_1920x1080.jpg",
    title: "Expert Hair Cutting",
    badge: "PROFESSIONAL STYLISTS",
  },
  {
    image: "/assets/generated/hero-styling.dim_1920x1080.jpg",
    title: "Premium Hair Styling",
    badge: "SIGNATURE STYLES",
  },
  {
    image: "/assets/generated/hero-coloring.dim_1920x1080.jpg",
    title: "Hair Coloring & Highlights",
    badge: "VIBRANT COLORS",
  },
  {
    image: "/assets/generated/hero-facial.dim_1920x1080.jpg",
    title: "Facial & Skin Care",
    badge: "GLOW TREATMENTS",
  },
  {
    image: "/assets/generated/hero-makeup.dim_1920x1080.jpg",
    title: "Bridal & Party Makeup",
    badge: "FLAWLESS ARTISTRY",
  },
];

const services = [
  {
    icon: Scissors,
    name: "Haircut & Styling",
    desc: "Expert cuts and styling tailored to your face shape and personality. From classic to contemporary.",
  },
  {
    icon: Sparkles,
    name: "Beard Styling",
    desc: "Precision beard shaping, trimming, and grooming for the modern gentleman.",
  },
  {
    icon: Leaf,
    name: "Hair Spa",
    desc: "Deep nourishing treatments to restore shine, strength, and vitality to your hair.",
  },
  {
    icon: Palette,
    name: "Hair Coloring",
    desc: "Global colors, highlights, balayage, and ombre by certified color specialists.",
  },
  {
    icon: Zap,
    name: "Facial & Skin Care",
    desc: "Advanced facials and skin treatments using premium products for radiant, healthy skin.",
  },
  {
    icon: Crown,
    name: "Bridal Makeup",
    desc: "Stunning bridal looks for your special day — traditional, fusion, or contemporary.",
  },
];

const gallery = [
  {
    image: "/assets/generated/gallery-haircut.dim_800x600.jpg",
    label: "Haircut",
  },
  {
    image: "/assets/generated/gallery-hairstyle.dim_800x600.jpg",
    label: "Hair Styling",
  },
  {
    image: "/assets/generated/gallery-facial.dim_800x600.jpg",
    label: "Facial Treatment",
  },
  {
    image: "/assets/generated/gallery-makeup.dim_800x600.jpg",
    label: "Makeup",
  },
  {
    image: "/assets/generated/gallery-hairspa.dim_800x600.jpg",
    label: "Hair Spa",
  },
  {
    image: "/assets/generated/gallery-bridal.dim_800x600.jpg",
    label: "Bridal Makeup",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Absolutely amazing experience! The team at Makeover transformed my look completely. The bridal makeup they did for my wedding was stunning — everyone complimented it throughout the day.",
    service: "Bridal Makeup",
  },
  {
    name: "Rahul Verma",
    rating: 5,
    text: "Best salon in Rudrapur by far. The haircut and beard styling was exactly what I wanted. The stylists really listen and give expert advice. Will definitely be coming back!",
    service: "Haircut & Beard Styling",
  },
  {
    name: "Anita Joshi",
    rating: 4,
    text: "Had my hair spa and coloring done here. The results were incredible — my hair feels so much healthier and the color is vibrant yet natural. The ambiance is luxurious too!",
    service: "Hair Spa & Coloring",
  },
];

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    desc: "Trained professionals with years of experience in all beauty treatments.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    desc: "We use only the finest salon-grade products for outstanding results.",
  },
  {
    icon: Shield,
    title: "Hygienic Environment",
    desc: "Immaculate standards of cleanliness and sanitation for your safety.",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    desc: "Every service is customized to suit your unique needs and preferences.",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ============ NAV LINK (hover handled via CSS class) ============

function NavLink({
  href,
  children,
  onClick,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  dark?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm tracking-wide transition-colors duration-200"
      style={{
        color: hovered
          ? "oklch(0.72 0.15 85)"
          : dark
            ? "oklch(0.55 0.02 88)"
            : "oklch(0.85 0.02 88)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

// ============ HERO SLIDER ============

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % heroSlides.length, "next");
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(goNext, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext, isPaused]);

  return (
    <section
      id="home"
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {heroSlides.map((slide, slideIndex) => {
        const isActive = slideIndex === current;
        let transform = "translateX(100%)";
        if (isActive) {
          transform = "translateX(0%)";
        } else if (
          direction === "next" &&
          slideIndex === (current - 1 + heroSlides.length) % heroSlides.length
        ) {
          transform = "translateX(-100%)";
        } else if (
          direction === "prev" &&
          slideIndex === (current + 1) % heroSlides.length
        ) {
          transform = "translateX(100%)";
        }

        return (
          <div
            key={slide.title}
            className="hero-slide"
            style={{
              transform,
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 10 : 1,
              transition:
                "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
            }}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="hero-slide-overlay" />
          </div>
        );
      })}

      {/* Content */}
      <div className="hero-content" style={{ zIndex: 20 }}>
        <div
          className="inline-block mb-4 px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase"
          style={{
            background: "oklch(0.72 0.15 85 / 0.15)",
            border: "1px solid oklch(0.72 0.15 85 / 0.5)",
            color: "oklch(0.72 0.15 85)",
            borderRadius: "2px",
            backdropFilter: "blur(4px)",
          }}
        >
          {heroSlides[current].badge}
        </div>

        <h1
          className="font-display font-bold text-white mb-3"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1 }}
        >
          Makeover <span className="gold-shimmer-text">Unisex Salon</span>
        </h1>

        <p
          className="mb-3 font-display italic"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "oklch(0.72 0.15 85)",
            opacity: 0.9,
          }}
        >
          {heroSlides[current].title}
        </p>

        <p
          className="mb-8 max-w-xl"
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            color: "oklch(0.85 0.02 88)",
          }}
        >
          Professional Hair &amp; Beauty Services in Rudrapur
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/919759620690"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            data-ocid="hero.book_appointment_button"
          >
            <MessageCircle size={16} />
            Book Appointment
          </a>
          <a
            href="https://maps.app.goo.gl/p3hvy6RBoBsw5X5C8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
            data-ocid="hero.view_location_button"
          >
            <MapPin size={16} />
            View Location
          </a>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        className="hero-arrow"
        style={{ left: "1.25rem" }}
        onClick={goPrev}
        aria-label="Previous slide"
        data-ocid="hero.prev_button"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        className="hero-arrow"
        style={{ right: "1.25rem" }}
        onClick={goNext}
        aria-label="Next slide"
        data-ocid="hero.next_button"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div
        className="flex gap-2 items-center justify-center"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      >
        {heroSlides.map((slide, dotIndex) => (
          <button
            key={slide.title}
            className={`hero-dot${dotIndex === current ? " active" : ""}`}
            type="button"
            onClick={() => goTo(dotIndex, dotIndex > current ? "next" : "prev")}
            aria-label={`Go to slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ============ NAV ============

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "oklch(0.06 0 0 / 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid oklch(0.72 0.15 85 / 0.2)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span
              className="font-display font-bold"
              style={{ fontSize: "1.6rem", color: "oklch(0.72 0.15 85)" }}
            >
              Makeover
            </span>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.75 0.02 88)", marginTop: "2px" }}
            >
              Unisex Salon
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://wa.me/919759620690"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
              data-ocid="nav.book_now_button"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "oklch(0.72 0.15 85)" }}
            aria-label="Toggle menu"
            type="button"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu md:hidden">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-3 px-2 text-sm tracking-wide border-b"
                style={{
                  color: "oklch(0.85 0.02 88)",
                  borderColor: "oklch(0.72 0.15 85 / 0.1)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/919759620690"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-3 justify-center"
              data-ocid="nav.book_now_button"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ============ SECTION REVEAL HOOK ============

function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ============ ANIMATED COUNTER ============

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const stepTime = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            setCount(Math.round((target * step) / steps));
            if (step >= steps) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ============ ABOUT ============

function AboutSection() {
  const ref = useSectionReveal();

  return (
    <section
      id="about"
      className="section-reveal py-20 lg:py-28"
      ref={ref}
      style={{ background: "oklch(0.08 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "oklch(0.72 0.15 85 / 0.08)",
                border: "1px solid oklch(0.72 0.15 85 / 0.2)",
                transform: "translate(12px, 12px)",
                borderRadius: "16px",
              }}
            />
            <img
              src="/assets/generated/hero-interior.dim_1920x1080.jpg"
              alt="Makeover Salon Interior"
              className="relative rounded-2xl w-full"
              style={{
                height: "460px",
                objectFit: "cover",
                border: "1px solid oklch(0.72 0.15 85 / 0.25)",
              }}
            />
            <div
              className="absolute -bottom-5 -right-5 px-6 py-4 rounded-xl"
              style={{
                background: "oklch(0.11 0 0)",
                border: "1px solid oklch(0.72 0.15 85 / 0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="font-display font-bold"
                style={{ fontSize: "2rem", color: "oklch(0.72 0.15 85)" }}
              >
                4.3 ★
              </div>
              <div
                className="text-xs tracking-wider"
                style={{ color: "oklch(0.65 0.02 88)" }}
              >
                150+ Reviews
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: "oklch(0.72 0.15 85)" }}
            >
              About Us
            </p>
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: "oklch(0.97 0.01 88)",
              }}
            >
              About Makeover
              <br />
              <span style={{ color: "oklch(0.72 0.15 85)" }}>Unisex Salon</span>
            </h2>
            <div className="gold-divider-left" />
            <p
              className="mt-5 mb-4 leading-relaxed"
              style={{ color: "oklch(0.75 0.02 88)", fontSize: "1rem" }}
            >
              Welcome to Makeover Unisex Salon — Rudrapur&apos;s premier
              destination for luxury hair and beauty services. Nestled in the
              heart of Civil Line, we offer a sophisticated sanctuary where
              artistry meets relaxation.
            </p>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "oklch(0.65 0.02 88)", fontSize: "0.95rem" }}
            >
              Our team of highly trained stylists and beauty professionals
              deliver personalized treatments using the finest products. From
              elegant haircuts to stunning bridal looks, every visit promises a
              transformative experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: 500, suffix: "+", label: "Happy Clients" },
                { value: 10, suffix: "+", label: "Years Experience" },
                { value: 6, suffix: "+", label: "Expert Stylists" },
                { value: 4, suffix: ".3★", label: "Google Rating" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div
                    className="font-display font-bold mb-1"
                    style={{
                      fontSize: "1.6rem",
                      color: "oklch(0.72 0.15 85)",
                    }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.6 0.02 88)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES ============

function ServicesSection() {
  const ref = useSectionReveal();

  return (
    <section
      id="services"
      className="section-reveal py-20 lg:py-28"
      ref={ref}
      style={{ background: "oklch(0.11 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.72 0.15 85)" }}
          >
            What We Offer
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "oklch(0.97 0.01 88)",
            }}
          >
            Our Services
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, serviceIndex) => (
            <div
              key={service.name}
              className="service-card"
              data-ocid={`services.item.${serviceIndex + 1}`}
            >
              <div className="service-icon-wrap">
                <service.icon
                  size={28}
                  style={{ color: "oklch(0.72 0.15 85)" }}
                />
              </div>
              <h3
                className="font-display font-semibold mb-2"
                style={{
                  fontSize: "1.15rem",
                  color: "oklch(0.93 0.03 88)",
                }}
              >
                {service.name}
              </h3>
              <p
                style={{
                  color: "oklch(0.6 0.02 88)",
                  fontSize: "0.9rem",
                  lineHeight: 1.65,
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ WHY CHOOSE US ============

function WhyChooseUs() {
  const ref = useSectionReveal();

  return (
    <section
      id="why"
      className="section-reveal py-20 lg:py-28"
      ref={ref}
      style={{ background: "oklch(0.08 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: "oklch(0.72 0.15 85)" }}
            >
              Our Promise
            </p>
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: "oklch(0.97 0.01 88)",
              }}
            >
              Why Choose{" "}
              <span style={{ color: "oklch(0.72 0.15 85)" }}>Makeover?</span>
            </h2>
            <div className="gold-divider-left" />
            <p
              className="mt-5 leading-relaxed"
              style={{ color: "oklch(0.7 0.02 88)", fontSize: "0.95rem" }}
            >
              We believe every client deserves to look and feel their absolute
              best. Our commitment to excellence, combined with genuine care,
              makes Makeover the most trusted salon in Rudrapur.
            </p>
          </div>

          <div className="grid gap-4">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="why-card">
                <div
                  className="contact-icon"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <item.icon
                    size={20}
                    style={{ color: "oklch(0.72 0.15 85)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-display font-semibold mb-1"
                    style={{
                      fontSize: "1.05rem",
                      color: "oklch(0.93 0.03 88)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "oklch(0.6 0.02 88)",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY ============

function GallerySection() {
  const ref = useSectionReveal();

  return (
    <section
      id="gallery"
      className="section-reveal py-20 lg:py-28"
      ref={ref}
      style={{ background: "oklch(0.11 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.72 0.15 85)" }}
          >
            Our Portfolio
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "oklch(0.97 0.01 88)",
            }}
          >
            Our Work
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item, galleryIndex) => (
            <div
              key={item.label}
              className="gallery-item"
              data-ocid={`gallery.item.${galleryIndex + 1}`}
            >
              <img src={item.image} alt={item.label} />
              <div className="gallery-overlay">
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS ============

function TestimonialsSection() {
  const ref = useSectionReveal();

  return (
    <section
      id="testimonials"
      className="section-reveal py-20 lg:py-28"
      ref={ref}
      style={{ background: "oklch(0.08 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.72 0.15 85)" }}
          >
            Client Stories
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "oklch(0.97 0.01 88)",
            }}
          >
            What Our Clients Say
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="flex gap-1 mb-4 mt-4">
                {Array.from({ length: t.rating }, (_, si) => (
                  <Star
                    key={`${t.name}-star-${si}`}
                    size={16}
                    fill="oklch(0.72 0.15 85)"
                    style={{ color: "oklch(0.72 0.15 85)" }}
                  />
                ))}
              </div>
              <p
                className="mb-5 leading-relaxed"
                style={{
                  color: "oklch(0.7 0.02 88)",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                }}
              >
                {t.text}
              </p>
              <div
                className="pt-4"
                style={{ borderTop: "1px solid oklch(0.72 0.15 85 / 0.15)" }}
              >
                <div
                  className="font-display font-semibold"
                  style={{
                    color: "oklch(0.93 0.03 88)",
                    fontSize: "0.95rem",
                  }}
                >
                  {t.name}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.55 0.1 85)" }}
                >
                  {t.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CONTACT ============

function ContactSection() {
  const ref = useSectionReveal();

  return (
    <section
      id="contact"
      className="section-reveal py-20 lg:py-28"
      ref={ref}
      style={{ background: "oklch(0.11 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: "oklch(0.72 0.15 85)" }}
          >
            Find Us
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              color: "oklch(0.97 0.01 88)",
            }}
          >
            Contact &amp; Location
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h3
              className="font-display font-semibold mb-6"
              style={{ fontSize: "1.3rem", color: "oklch(0.93 0.03 88)" }}
            >
              Get In Touch
            </h3>

            <div>
              <div className="contact-info-item">
                <div className="contact-icon">
                  <MapPin size={18} style={{ color: "oklch(0.72 0.15 85)" }} />
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-wider uppercase mb-1"
                    style={{ color: "oklch(0.55 0.1 85)" }}
                  >
                    Address
                  </div>
                  <div
                    style={{
                      color: "oklch(0.85 0.02 88)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Civil Line, Rudrapur, Uttarakhand, India
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Phone size={18} style={{ color: "oklch(0.72 0.15 85)" }} />
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-wider uppercase mb-1"
                    style={{ color: "oklch(0.55 0.1 85)" }}
                  >
                    Phone
                  </div>
                  <a
                    href="tel:+919759620690"
                    style={{
                      color: "oklch(0.85 0.02 88)",
                      fontSize: "0.9rem",
                    }}
                  >
                    +91 9759620690
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Clock size={18} style={{ color: "oklch(0.72 0.15 85)" }} />
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-wider uppercase mb-1"
                    style={{ color: "oklch(0.55 0.1 85)" }}
                  >
                    Hours
                  </div>
                  <div
                    style={{
                      color: "oklch(0.85 0.02 88)",
                      fontSize: "0.9rem",
                    }}
                  >
                    9:00 AM – 10:00 PM (All Days)
                  </div>
                </div>
              </div>

              <div
                className="contact-info-item"
                style={{ borderBottom: "none" }}
              >
                <div className="contact-icon">
                  <SiWhatsapp
                    size={18}
                    style={{ color: "oklch(0.72 0.15 85)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs font-bold tracking-wider uppercase mb-1"
                    style={{ color: "oklch(0.55 0.1 85)" }}
                  >
                    WhatsApp
                  </div>
                  <a
                    href="https://wa.me/919759620690"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "oklch(0.72 0.15 85)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://wa.me/919759620690"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <SiWhatsapp size={16} />
                Book via WhatsApp
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid oklch(0.72 0.15 85 / 0.2)",
              height: "420px",
            }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Civil+Line+Rudrapur+Uttarakhand&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Makeover Unisex Salon Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "oklch(0.06 0 0)",
        borderTop: "1px solid oklch(0.72 0.15 85 / 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div
              className="font-display font-bold mb-2"
              style={{ fontSize: "1.6rem", color: "oklch(0.72 0.15 85)" }}
            >
              Makeover
            </div>
            <div
              className="text-xs tracking-wider uppercase mb-4"
              style={{ color: "oklch(0.55 0.02 88)" }}
            >
              Unisex Salon
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.55 0.02 88)" }}
            >
              Premium hair &amp; beauty services in Rudrapur. Your
              transformation awaits.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-semibold mb-4 text-sm tracking-wider uppercase"
              style={{ color: "oklch(0.72 0.15 85)" }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href} dark>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold mb-4 text-sm tracking-wider uppercase"
              style={{ color: "oklch(0.72 0.15 85)" }}
            >
              Contact
            </h4>
            <div
              className="space-y-2 text-sm"
              style={{ color: "oklch(0.55 0.02 88)" }}
            >
              <p>Civil Line, Rudrapur</p>
              <p>Uttarakhand, India</p>
              <a
                href="tel:+919759620690"
                className="block"
                style={{ color: "oklch(0.72 0.15 85)" }}
              >
                +91 9759620690
              </a>
              <p>9:00 AM – 10:00 PM (All Days)</p>
            </div>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon"
                style={{ width: "36px", height: "36px" }}
              >
                <SiInstagram
                  size={16}
                  style={{ color: "oklch(0.72 0.15 85)" }}
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon"
                style={{ width: "36px", height: "36px" }}
              >
                <SiFacebook
                  size={16}
                  style={{ color: "oklch(0.72 0.15 85)" }}
                />
              </a>
              <a
                href="https://wa.me/919759620690"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon"
                style={{ width: "36px", height: "36px" }}
              >
                <SiWhatsapp
                  size={16}
                  style={{ color: "oklch(0.72 0.15 85)" }}
                />
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{
            borderTop: "1px solid oklch(0.72 0.15 85 / 0.1)",
            color: "oklch(0.45 0.02 88)",
          }}
        >
          <span>© {year} Makeover Unisex Salon. All Rights Reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.45 0.02 88)" }}
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ============ APP ============

export default function App() {
  return (
    <div style={{ background: "oklch(0.08 0 0)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSlider />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919759620690"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        data-ocid="contact.whatsapp_button"
        aria-label="Chat on WhatsApp"
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          }}
        >
          <SiWhatsapp size={26} color="white" />
        </div>
      </a>

      {/* Mobile Call Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        style={{
          background: "oklch(0.06 0 0)",
          borderTop: "1px solid oklch(0.72 0.15 85 / 0.25)",
          padding: "0.75rem 1rem",
        }}
      >
        <a
          href="tel:+919759620690"
          className="btn-gold w-full justify-center"
          style={{ fontSize: "0.9rem" }}
          data-ocid="contact.call_button"
        >
          <Phone size={16} />
          Call Now: +91 9759620690
        </a>
      </div>
    </div>
  );
}
