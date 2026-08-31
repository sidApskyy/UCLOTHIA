import { describe, it, expect } from "vitest";
import {
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateName,
  validateCheckoutForm,
  validateNewsletterEmail,
  validateAppointmentForm,
} from "@/lib/validation";

describe("validateEmail", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name@domain.co.in")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validateEmail("notanemail")).toBe(false);
    expect(validateEmail("missing@domain")).toBe(false);
    expect(validateEmail("@domain.com")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });
});

describe("validatePhone", () => {
  it("accepts valid Indian phone numbers", () => {
    expect(validatePhone("9876543210")).toBe(true);
    expect(validatePhone("+91 9876543210")).toBe(true);
    expect(validatePhone("98765 43210")).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    expect(validatePhone("123456789")).toBe(false);
    expect(validatePhone("")).toBe(false);
  });
});

describe("validatePostalCode", () => {
  it("accepts valid 6-digit PIN codes", () => {
    expect(validatePostalCode("400001")).toBe(true);
    expect(validatePostalCode("110011")).toBe(true);
  });

  it("rejects invalid PIN codes", () => {
    expect(validatePostalCode("40001")).toBe(false);
    expect(validatePostalCode("4000011")).toBe(false);
    expect(validatePostalCode("")).toBe(false);
  });
});

describe("validateName", () => {
  it("accepts valid names", () => {
    expect(validateName("Aarav")).toBe(true);
    expect(validateName("Priya Sharma")).toBe(true);
  });

  it("rejects too short names", () => {
    expect(validateName("A")).toBe(false);
    expect(validateName("")).toBe(false);
  });

  it("rejects too long names", () => {
    expect(validateName("A".repeat(101))).toBe(false);
  });
});

describe("validateCheckoutForm", () => {
  const validData = {
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav@example.com",
    phone: "9876543210",
    address: "123 Linking Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
  };

  it("accepts valid form data", () => {
    const result = validateCheckoutForm(validData);
    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it("rejects missing email", () => {
    const result = validateCheckoutForm({ ...validData, email: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it("rejects invalid pincode", () => {
    const result = validateCheckoutForm({ ...validData, pincode: "123" });
    expect(result.valid).toBe(false);
    expect(result.errors.pincode).toBeDefined();
  });

  it("rejects missing firstName", () => {
    const result = validateCheckoutForm({ ...validData, firstName: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.firstName).toBeDefined();
  });
});

describe("validateNewsletterEmail", () => {
  it("accepts valid email", () => {
    expect(validateNewsletterEmail("test@example.com")).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(validateNewsletterEmail("notanemail")).toBe(false);
  });
});

describe("validateAppointmentForm", () => {
  const validData = {
    name: "Priya Sharma",
    email: "priya@example.com",
    store: "mumbai",
    service: "private-appointment",
  };

  it("accepts valid appointment data", () => {
    const result = validateAppointmentForm(validData);
    expect(result.valid).toBe(true);
  });

  it("rejects missing store", () => {
    const result = validateAppointmentForm({ ...validData, store: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.store).toBeDefined();
  });

  it("rejects missing service", () => {
    const result = validateAppointmentForm({ ...validData, service: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.service).toBeDefined();
  });
});
