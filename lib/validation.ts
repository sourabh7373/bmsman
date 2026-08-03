export const validateOrganization = (form: any) => {
  const errors: Record<string, string[]> = {};

  // Organization Name
  const companyName = form.companyName?.trim();
  if (!companyName) {
    errors.companyName = ["Organization name is required"];
  } else if (companyName.length < 2) {
    errors.companyName = ["Organization name is too short"];
  }

  // Admin Email
  if (!form.adminEmail) {
    errors.adminEmail = ["Email is required"];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.adminEmail)) {
    errors.adminEmail = ["Enter a valid email address"];
  }

  // Admin Password
  if (!form.adminPassword) {
    errors.adminPassword = ["Password is required"];
  } else if (form.adminPassword.trim().length < 8) {
    errors.adminPassword = ["Password must be at least 8 characters"];
  }

  // Admin Display Name
  const adminDisplayName = form.adminDisplayName?.trim();
  if (!adminDisplayName) {
    errors.adminDisplayName = ["Admin display name is required"];
  } else if (adminDisplayName.length < 2) {
    errors.adminDisplayName = ["Admin display name is too short"];
  }

  // Phone Number (General)
  if (form.phone && !/^\d{10}$/.test(form.phone)) {
    errors.phone = ["Mobile number must be exactly 10 digits"];
  }

  // Mobile Number
  if (form.mobileNumber && !/^\d{10}$/.test(form.mobileNumber)) {
    errors.mobileNumber = ["Mobile number must be exactly 10 digits"];
  }

  // Admin Mobile Number
  if (form.adminMobileNumber && !/^\d{10}$/.test(form.adminMobileNumber)) {
    errors.adminMobileNumber = ["Mobile number must be exactly 10 digits"];
  }

  // Address
  if (!form.address || form.address.trim().length === 0) {
    errors.address = ["Address is required"];
  }

  // Website
  if (form.website && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(form.website)) {
    errors.website = ["Enter a valid website URL"];
  }

  return errors;
};
