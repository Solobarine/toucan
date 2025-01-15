export const capitalizeText = (text?: string) => {
  return !text || typeof text !== "string"
    ? ""
    : text[0].toUpperCase() + text.slice(1);
};
