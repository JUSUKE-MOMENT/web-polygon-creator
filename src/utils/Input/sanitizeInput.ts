export const sanitizeInput = (value: string): string => {
  const div = document.createElement('div');
  div.innerText = value;
  return div.innerText;
};
