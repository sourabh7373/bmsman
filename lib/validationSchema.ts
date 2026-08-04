export const organizationValidationSchema = {
  companyName: {
    required: true,
    requiredMessage: "Organization name is required",
    minLength: 2,
    minLengthMessage: "Organization name is too short",
    trim: true,
  },
  email: {
    required: true,
    requiredMessage: "Email is required",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Please enter a valid email address",
    trim: true,
  },
  adminDisplayName: {
    required: true,
    requiredMessage: "Admin display name is required",
    minLength: 2,
    minLengthMessage: "Admin display name is too short",
    trim: true,
  },
  adminEmail: {
    required: true,
    requiredMessage: "Email is required",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Enter a valid email address",
  },
  adminPassword: {
    required: true,
    requiredMessage: "Password is required",
    minLength: 8,
    minLengthMessage: "Password must be at least 8 characters",
  },
  phone: {
    type: 'tel',
    pattern: /^\d{10}$/,
    patternMessage: "Phone number must be exactly 10 digits",
  },
  mobileNumber: {
    type: 'tel',
    pattern: /^\d{10}$/,
    patternMessage: "Mobile number must be exactly 10 digits",
  },
  adminMobileNumber: {
    type: 'tel',
    pattern: /^\d{10}$/,
    patternMessage: "Mobile number must be exactly 10 digits",
  },
  address: {
    required: true,
    requiredMessage: "Address is required",
    trim: true,
  },
  privilegeName: {
    required: true,
    requiredMessage: "Privilege name is required",
    trim: true,
  },
  privilegeType: {
    required: true,
    requiredMessage: "Privilege type is required",
    pattern: /^(MENU|FIELD)$/,
    patternMessage: "Privilege type must be MENU or FIELD",
  },
};
