export const handleApiError = (error: any) => {
  const responseData = error.response?.data;
  
  if (!responseData) {
    return {
      message: "An unexpected error occurred. Please try again.",
      validationErrors: {},
    };
  }

  // Handle validationErrors array format
  if (Array.isArray(responseData.validationErrors)) {
    const validationErrors: Record<string, string[]> = {};
    const allErrors: string[] = [];

    responseData.validationErrors.forEach((err: string) => {
      const [field, ...messageParts] = err.split(": ");
      const message = messageParts.join(": ");
      
      if (field && message) {
        let formattedMessage = message;
        if (message.includes("must not be blank")) {
          formattedMessage = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        } else if (message.includes("size must be between")) {
          if (field.toLowerCase().includes("password")) {
            formattedMessage = "Password must be at least 8 characters";
          }
        }
        
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(formattedMessage);
        allErrors.push(`${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}: ${formattedMessage}`);
      } else {
        allErrors.push(err);
      }
    });

    return {
      message: "Please fix the following errors:",
      validationErrors,
      allErrors,
    };
  }

  // Handle other formats (message field)
  return {
    message: responseData.message || responseData.error || JSON.stringify(responseData) || "An error occurred.",
    validationErrors: {},
  };
};
