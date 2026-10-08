import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const RED = "#E30613";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Testimonials", id: "testimonials" },

];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  // Frosted bar once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Highlight the section currently in view
  useEffect(() => {
    if (!onHome) return;
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigation = (id) => {
    setIsOpen(false);
    if (!onHome) {
      navigate(`/#${id}`);
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 font-poppins transition-all duration-300 ${scrolled || isOpen
        ? "bg-[#F4F2EE]/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
        : "bg-transparent"
        }`}
    >
      <div
        className={`mx-auto w-full max-w-screen-2xl px-4 md:px-8 flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "py-2" : "py-4"
          }`}
      >
        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)} className="shrink-0">
          <img
            src="/images/logo.png"
            alt="Frans logo"
            className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-14" : "h-20"
              }`}
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-12" aria-label="Main">
          <ul className="flex items-center gap-10 xl:gap-12">
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = onHome && active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleNavigation(id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-1 text-[15px] font-medium tracking-wide transition-colors duration-300 
                      after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:origin-left after:bg-[#E30613] after:transition-transform after:duration-300
                      ${isActive
                        ? "text-[#E30613] after:scale-x-100"
                        : "text-[#1A1A1A] hover:text-[#E30613] after:scale-x-0 hover:after:scale-x-100"
                      }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>


          <Link
            to="/contactme"
            className="inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-[15px] font-medium text-white shadow-lg transition duration-300 hover:scale-105 hover:brightness-90"
            style={{ backgroundColor: RED }}
          >
            Contact Me <FaArrowRight className="text-sm" />
          </Link>
        </nav>

        {/* HAMBURGER */}
        <button
          type="button"
          className="lg:hidden p-2 text-[#1A1A1A] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col px-6 pb-8 pt-2 border-t border-black/5">
          {NAV_ITEMS.map(({ label, id }) => {
            const isActive = onHome && active === id;
            return (
              <li key={id} className="border-b border-black/5">
                <button
                  type="button"
                  onClick={() => handleNavigation(id)}
                  className={`w-full text-left py-4 text-lg font-medium tracking-wide ${isActive ? "text-[#E30613]" : "text-[#1A1A1A]"
                    }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
          <li className="pt-6">
            <Link
              to="/contactme"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-white font-medium shadow-lg"
              style={{ backgroundColor: RED }}
            >
              Contact Me <FaArrowRight className="text-sm" />
            </Link>


          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;