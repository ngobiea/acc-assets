'use server';
export const changePassword = async (useFormState: {}, formData: FormData) => {
  try {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
  } catch (error) {}
  return {};
};
