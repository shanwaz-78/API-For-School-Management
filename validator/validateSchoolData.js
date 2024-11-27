const validateSchoolData = (data) => {
  const { name, address, latitude, longitude } = data;

  if (!name || !address || !latitude || !longitude) {
    return { isValid: false, message: "All fields are required" };
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return { isValid: false, message: "Invalid name" };
  }

  if (typeof address !== "string" || address.trim().length === 0) {
    return { isValid: false, message: "Invalid address" };
  }

  return { isValid: true };
};

export { validateSchoolData };
