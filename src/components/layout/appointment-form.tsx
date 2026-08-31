"use client";

import { useState } from "react";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};

    if (!formData.get("name")?.toString().trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.get("email")?.toString().trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email")!.toString())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.get("store")) {
      newErrors.store = "Please select a store.";
    }
    if (!formData.get("service")) {
      newErrors.service = "Please select a service.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto mb-6 border border-[var(--color-text)] rounded-full flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="text-eyebrow text-[var(--color-accent)] mb-3">Request Received</p>
        <h3 className="font-display text-2xl font-light mb-4">Thank you.</h3>
        <p className="text-body text-[var(--color-text-secondary)] max-w-md mx-auto">
          Our team will contact you within 48 hours to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="appt-name" className="text-eyebrow block mb-3 text-[var(--color-text)]">Name</label>
          <input
            id="appt-name"
            name="name"
            type="text"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "appt-name-error" : undefined}
            className="w-full border-b border-[var(--color-border)] py-3 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem] focus-visible:border-[var(--color-text)]"
          />
          {errors.name && (
            <p id="appt-name-error" className="text-[0.75rem] text-[var(--color-accent-dark)] mt-2">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="appt-email" className="text-eyebrow block mb-3 text-[var(--color-text)]">Email</label>
          <input
            id="appt-email"
            name="email"
            type="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "appt-email-error" : undefined}
            className="w-full border-b border-[var(--color-border)] py-3 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]"
          />
          {errors.email && (
            <p id="appt-email-error" className="text-[0.75rem] text-[var(--color-accent-dark)] mt-2">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="appt-phone" className="text-eyebrow block mb-3 text-[var(--color-text)]">Phone</label>
          <input
            id="appt-phone"
            name="phone"
            type="tel"
            className="w-full border-b border-[var(--color-border)] py-3 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]"
          />
        </div>
        <div>
          <label htmlFor="appt-store" className="text-eyebrow block mb-3 text-[var(--color-text)]">Preferred Store</label>
          <select
            id="appt-store"
            name="store"
            required
            aria-invalid={!!errors.store}
            aria-describedby={errors.store ? "appt-store-error" : undefined}
            className="w-full border-b border-[var(--color-border)] py-3 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem] appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Select a store</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
          </select>
          {errors.store && (
            <p id="appt-store-error" className="text-[0.75rem] text-[var(--color-accent-dark)] mt-2">{errors.store}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="appt-service" className="text-eyebrow block mb-3 text-[var(--color-text)]">Service</label>
        <select
          id="appt-service"
          name="service"
          required
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "appt-service-error" : undefined}
          className="w-full border-b border-[var(--color-border)] py-3 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem] appearance-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>Select a service</option>
          <option value="private-appointment">Private Appointment</option>
          <option value="personal-styling">Personal Styling</option>
          <option value="bespoke">Bespoke</option>
          <option value="custom-fitting">Custom Fitting</option>
          <option value="wedding-consultation">Wedding Consultation</option>
        </select>
        {errors.service && (
          <p id="appt-service-error" className="text-[0.75rem] text-[var(--color-accent-dark)] mt-2">{errors.service}</p>
        )}
      </div>
      <div>
        <label htmlFor="appt-message" className="text-eyebrow block mb-3 text-[var(--color-text)]">Message</label>
        <textarea
          id="appt-message"
          name="message"
          rows={4}
          className="w-full border-b border-[var(--color-border)] py-3 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem] resize-none"
        />
      </div>
      <button type="submit" className="btn-primary">
        Request Appointment
      </button>
    </form>
  );
}
