// contactForm.js
import { isValidPhone } from "../utils/phone";

export function initContactForm(formSelector = "[data-contact-form]") {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const out = document.querySelector("[data-output]");
  const sendBtn = form.querySelector("[data-send-btn]");
  const btnError = form.querySelector("[data-btn-error]");

  const q = (sel) => form.querySelector(sel);
  const nameI = q('[data-field="name"]');
  const emailI = q('[data-field="email"]');
  const phoneI = q('[data-field="phone"]');
  const msgI = q('[data-field="message"]');
  const err = (key) => q(`[data-error-for="${key}"]`);

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const validPhoneIL = (v) => isValidPhone(v.trim(), "IL");

  const mark = (input, state) => {
    input.classList.remove(
      "border-[rgb(var(--border))]",
      "border-green-500",
      "border-red-500"
    );
    if (state === true) input.classList.add("border-green-500");
    else if (state === false) input.classList.add("border-red-500");
    else input.classList.add("border-[rgb(var(--border))]");
  };
  const show = (el, on) => el?.classList.toggle("hidden", !on);

  const isNameValid = () => nameI.value.trim().length > 0;
  const isEmailValid = () => validEmail(emailI.value.trim());
  const isPhoneValid = () => validPhoneIL(phoneI.value.trim());
  const allValid = () => isNameValid() && isEmailValid() && isPhoneValid();

  const updateButtonColor = () => {
    if (allValid()) {
      sendBtn.classList.remove("bg-gray-400");
      sendBtn.classList.add("bg-[rgb(var(--primary))]", "hover:opacity-90");
    } else {
      sendBtn.classList.add("bg-gray-400");
      sendBtn.classList.remove("bg-[rgb(var(--primary))]", "hover:opacity-90");
    }
  };

  const validateFieldOnBlur = (field) => {
    const value = field.value.trim();

    if (field === nameI) {
      const ok = value.length > 0;
      mark(field, ok);
      show(err("name"), !ok);
    }
    if (field === emailI) {
      const ok = validEmail(value);
      mark(field, ok);
      show(err("email"), !ok);
    }
    if (field === phoneI) {
      const ok = validPhoneIL(value);
      mark(field, ok);
      show(err("phone"), !ok);
    }

    updateButtonColor();
  };

  [nameI, emailI, phoneI].forEach((i) =>
    i.addEventListener("blur", () => validateFieldOnBlur(i))
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (q('input[name="company"]')?.value) return; // honeypot

    [nameI, emailI, phoneI].forEach(validateFieldOnBlur);

    if (!allValid()) {
      btnError.classList.remove("hidden");
      out.classList.add("hidden");
      return;
    }

    btnError.classList.add("hidden");
    out.textContent = JSON.stringify(
      {
        name: nameI.value.trim(),
        email: emailI.value.trim(),
        phone: phoneI.value.trim(),
        message: msgI.value.trim(),
      },
      null,
      2
    );
    out.classList.remove("hidden");
  });

  updateButtonColor();
}
window.initContactForm = initContactForm;
