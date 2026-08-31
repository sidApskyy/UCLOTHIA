export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+()]/g, "");
  return /^[6-9]\d{9}$/.test(cleaned) || /^\d{10,15}$/.test(cleaned);
}

export function validatePostalCode(code: string): boolean {
  return /^\d{6}$/.test(code.trim());
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

export function validateCheckoutForm(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.firstName || !validateName(data.firstName)) {
    errors.firstName = "Please enter a valid first name.";
  }
  if (!data.lastName || !validateName(data.lastName)) {
    errors.lastName = "Please enter a valid last name.";
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!data.address || data.address.trim().length < 5) {
    errors.address = "Please enter a valid address.";
  }
  if (!data.city || data.city.trim().length < 2) {
    errors.city = "Please enter a city.";
  }
  if (!data.state || data.state.trim().length < 2) {
    errors.state = "Please enter a state.";
  }
  if (!data.pincode || !validatePostalCode(data.pincode)) {
    errors.pincode = "Please enter a valid 6-digit PIN code.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateNewsletterEmail(email: string): boolean {
  return validateEmail(email);
}

export function validateAppointmentForm(data: {
  name?: string;
  email?: string;
  store?: string;
  service?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || !validateName(data.name)) {
    errors.name = "Please enter your name.";
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.store) {
    errors.store = "Please select a store.";
  }
  if (!data.service) {
    errors.service = "Please select a service.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
