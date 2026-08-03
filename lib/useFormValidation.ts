import { useState, useCallback } from 'react';

export const useFormValidation = (initialState: any, validationSchema: any) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = "";
    const rules = validationSchema[name];
    if (!rules) return "";

    if (rules.required && (!value || value.trim() === "")) {
      error = rules.requiredMessage || "This field is required";
    } else if (rules.minLength && value.trim().length < rules.minLength) {
      error = rules.minLengthMessage || `Minimum length is ${rules.minLength}`;
    } else if (rules.pattern && !rules.pattern.test(value)) {
      error = rules.patternMessage || "Invalid format";
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Apply restrictions
    let processedValue = value;
    if (validationSchema[name]?.type === 'tel') {
      processedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    } else if (validationSchema[name]?.trim) {
      // Prevent leading spaces
      if (value.startsWith(' ')) processedValue = value.trimStart();
    }

    setForm((prev: any) => ({ ...prev, [name]: processedValue }));
    
    // Validate on change
    const error = validateField(name, processedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(validationSchema).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { form, setForm, errors, handleChange, validateAll };
};
