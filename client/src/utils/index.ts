import { differenceInHours, formatDate } from "date-fns";

export const capitalizeText = (text?: string) => {
  return !text || typeof text !== "string"
    ? ""
    : text[0].toUpperCase() + text.slice(1);
};

export const serverError = () => "Server Error. We are working to resolve this";

export const formatTimestamp = (date: string | undefined) => {
  const currentDate = new Date();

  const hourDiff = differenceInHours(currentDate, date as string);

  if (hourDiff < 24) {
    return formatDate(date as string, "HH:mm");
  } else {
    return formatDate(date as string, "dd MMM");
  }
};
