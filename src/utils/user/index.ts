export const getFormatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day

  return `${year}-${month}-${day}`;
};

/**
 * Checks if the provided value is among the given options.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.value - The value to check.
 * @param {Array} params.options - The list of options to check against.
 * @param {string} params.options[].id - The id of the option.
 * @param {string} params.options[].value - The value of the option.
 * @returns {boolean} - Returns `true` if the value is not provided or if it matches any of the option values, otherwise `false`.
 */
export const isOtherOption = ({ value, options }: { value: string, options: { id: string, value: string; }[]; }): boolean => {
  if (!value) return true;
  return options.some((option) => option.value === value);
}