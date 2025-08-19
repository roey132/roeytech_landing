// contactForm.js
import { isValidPhone } from "../utils/phone";

function clearFieldText(input) {
  input.value = "";
  input.classList.remove("border-red-500", "border-green-500");
  input.classList.add("border-[rgb(var(--border))]");
}

async function sendFormData(data) {
  const res = await fetch("https://landingapi.roeytech.dev/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}

export function initContactForm(formSelector = "[data-contact-form]") {
  const form = document.querySelector(formSelector);
  if (!form) return;

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
      "border-red-500",
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
    i.addEventListener("blur", () => validateFieldOnBlur(i)),
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    [nameI, emailI, phoneI].forEach(validateFieldOnBlur);

    if (!allValid()) {
      btnError.classList.remove("hidden");
      btnError.textContent = "יש למלא את כל השדות הדרושים.";
      btnError.classList.remove("text-green-500");
      btnError.classList.add("text-red-500");
      return;
    }

    btnError.classList.add("hidden");
    console.log("Form submitted with values:");
    const data = {
      name: nameI.value.trim(),
      email: emailI.value.trim(),
      phone: phoneI.value.trim(),
      message: msgI.value.trim(),
    };
    sendBtn.disabled = true;
try {
    const res = await sendFormData(data);

    if (res.ok) {
      console.log("Form submitted successfully:", data);
      btnError.classList.remove("hidden");
      btnError.textContent = "הטופס נשלח בהצלחה!";
      btnError.classList.add("text-green-500");
      btnError.classList.remove("text-red-500");
      [nameI, emailI, phoneI, msgI].forEach((i) => {
        clearFieldText(i);
      });
      updateButtonColor();
    } else {
      console.error("Error submitting form:", res.statusText);
      btnError.classList.remove("hidden");
      btnError.textContent = "שגיאה בשליחת הטופס, אנא נסו שוב מאוחר יותר.";
      btnError.classList.remove("text-green-500");
      btnError.classList.add("text-red-500");
    }
  } catch (err) {
    console.error("Network or unexpected error:", err);
    btnError.classList.remove("hidden");
    btnError.textContent = "שגיאה בשליחת הטופס, אנא נסו שוב מאוחר יותר.";
    btnError.classList.remove("text-green-500");
    btnError.classList.add("text-red-500");
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  sendBtn.disabled = false;
});

  updateButtonColor();
}
window.initContactForm = initContactForm;
