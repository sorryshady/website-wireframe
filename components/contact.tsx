"use client";
import React, { useRef, useState, FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but must be valid if provided)
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // For now, just console log the form data
        console.log("Form submitted successfully:", formData);

        // Clear form after successful submission
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });

        // You could add a success message here
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  useGSAP(() => {
    // Animate title
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Animate description
    gsap.from(descriptionRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Animate form
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Continuous bounce animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="contact-section min-h-screen bg-black text-white flex flex-col justify-center items-center py-20 relative"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 font-mont"
        >
          Let&apos;s Connect
        </h2>
        <p
          ref={descriptionRef}
          className="text-xl sm:text-2xl text-gray-400 text-center mb-16 max-w-3xl mx-auto font-mont"
        >
          We are always happy to listen and discuss new projects, ideas, and
          opportunities.
        </p>

        <form
          ref={formRef}
          className="max-w-3xl mx-auto space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mont">
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 outline-none text-white
                  ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20"
                  }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm md:text-base mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 outline-none text-white
                  ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20"
                  }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm md:text-base mt-1">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 font-mont">
            <label className="text-sm md:text-base font-medium text-gray-300">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 outline-none text-white
                ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20"
                }`}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm md:text-base mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-2 font-mont">
            <label className="text-sm md:text-base font-medium text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 outline-none text-white resize-none
                ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20"
                }`}
              placeholder="Tell us about your project..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm md:text-base mt-1">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 border border-white bg-white text-black
                         hover:bg-transparent hover:text-white transition-all duration-300 rounded-full font-mediumtext-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide font-semibold font-oxygen text-base"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60
         transition-opacity duration-300 mb-safe"
      >
        <span className="text-sm sm:text-base font-medium tracking-wider">
          KEEP SCROLLING
        </span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Contact;
