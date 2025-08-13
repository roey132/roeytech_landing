import { parsePhoneNumberFromString } from "libphonenumber-js";

export function isValidPhone(value, defaultCountry = "IL") {
  const raw = (value || "").trim();
  if (!raw) return false;

  const phone =
    parsePhoneNumberFromString(raw) ||
    parsePhoneNumberFromString(raw, { defaultCountry });

  return !!phone && phone.isValid();
}
import { isValidPhone } from "../utils/phone.js";
