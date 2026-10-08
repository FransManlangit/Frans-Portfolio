import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLocationDot,
  FaCircleCheck,
  FaPaperPlane,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";

// ===== PALETTE: same red / ink / off-white as the rest of the portfolio =====
const BG = "#F4F2EE";
const INK = "#1A1A1A";
const RED = "#E30613";
const BODY = "#333333";

const scriptFont = { fontFamily: "'Yellowtail', cursive" };

const EMAIL = "fransmanlangit4@gmail.com";

const INFO = [
  { icon: FaEnvelope, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: FaLocationDot, label: "Based in", value: "Taguig City, Philippines" },
  { icon: FaCircleCheck, label: "Availability", value: "Open to freelance & remote work" },
];

const SOCIALS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/FransManlangit" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/frans-manlangit/" },
];

const labelClass = "block text-[11px] uppercase font-medium tracking-[0.25em] mb-1";
const fieldClass =
  "w-full bg-transparent border-b-2 border-[#1A1A1A]/30 py-2 text-sm md:text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 outline-none transition-colors duration-300 focus:border-[#E30613]";

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMsg("The form isn't set up yet (missing access key).");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const data = new FormData(form);
    data.append("access_key", accessKey);
    data.append("from_name", "Portfolio Contact Form");
    data.append("subject", `New portfolio message from ${data.get("name")}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen font-poppins text-left overflow-hidden"
      style={{
        backgroundColor: BG,
        backgroundImage:
          "linear-gradient(rgba(26,26,26,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.045) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
        {/* ===== HEADING ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center gap-4 md:gap-8">
            <span className="h-[3px] flex-1" style={{ backgroundColor: INK }} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-none">
              <span style={{ color: INK }}>Contact </span>
              <span style={{ color: RED }}>Me</span>
            </h1>
            <span className="h-[3px] flex-1" style={{ backgroundColor: INK }} />
          </div>
          <p
            className="mt-4 text-[11px] md:text-xs uppercase font-medium tracking-[0.3em]"
            style={{ color: BODY }}
          >
            Let&apos;s build something together
          </p>
        </motion.div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-start">
          {/* ===== LEFT: INFO ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="text-5xl md:text-6xl leading-[1.1]" style={{ ...scriptFont, color: RED }}>
              Say hello
            </p>
            <p className="mt-5 text-sm md:text-base leading-relaxed max-w-md" style={{ color: BODY }}>
              Have a project, a job opportunity or just a question? Send me a message and I&apos;ll reply
              as soon as I can.
            </p>

            <ul className="mt-8 space-y-6">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span
                    className="shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg"
                    style={{ borderColor: INK, color: INK }}
                  >
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.25em] font-medium" style={{ color: RED }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm md:text-base font-medium break-all hover:underline underline-offset-4"
                        style={{ color: INK }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm md:text-base font-medium" style={{ color: INK }}>
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12 }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-base transition-colors duration-300 hover:text-white hover:bg-[#1A1A1A]"
                  style={{ borderColor: INK, color: INK }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ===== RIGHT: FORM ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            {/* tape */}
            <span
              className="absolute -top-3 left-1/2 w-24 h-6 z-10"
              style={{
                backgroundColor: RED,
                opacity: 0.75,
                transform: "translateX(-50%) rotate(-3deg)",
              }}
              aria-hidden="true"
            />

            <div className="bg-white p-7 md:p-10 shadow-[0_18px_40px_rgba(26,26,26,0.18)]">
              {status === "success" ? (
                <div className="py-10 text-center" role="status" aria-live="polite">
                  <p className="text-5xl md:text-6xl leading-none" style={{ ...scriptFont, color: RED }}>
                    Thank you!
                  </p>
                  <p className="mt-5 text-sm md:text-base" style={{ color: BODY }}>
                    Your message is on its way. I&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-7 py-3 rounded-full border-2 text-sm font-medium transition duration-300 hover:scale-105"
                    style={{ borderColor: INK, color: INK }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* honeypot: real people never see or fill this */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="name" className={labelClass} style={{ color: INK }}>
                        Your name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Juan Dela Cruz"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass} style={{ color: INK }}>
                        Your email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass} style={{ color: INK }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell me about your project..."
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm font-medium" style={{ color: RED }} role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 text-white font-medium px-8 py-3 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:brightness-95 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    style={{ backgroundColor: RED }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                    <FaPaperPlane className="text-sm" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;