document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message"),
    agreement: document.getElementById("agreement"),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    const nameValue = fields.name.value.trim();
    const nameWords = nameValue.split(/\s+/).filter(Boolean);
    if (!nameValue) {
      setError(fields.name, "Введите имя");
      isValid = false;
    } else if (nameWords.length < 2) {
      setError(fields.name, "Введите имя и фамилию");
      isValid = false;
    }

    const emailValue = fields.email.value.trim();
    if (!emailValue) {
      setError(fields.email, "Введите email");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      setError(fields.email, "Введите корректный email");
      isValid = false;
    }

    const subjectValue = fields.subject.value.trim();
    if (!subjectValue) {
      setError(fields.subject, "Введите тему сообщения");
      isValid = false;
    } else if (subjectValue.length < 3) {
      setError(fields.subject, "Тема должна быть не короче 3 символов");
      isValid = false;
    }

    const messageValue = fields.message.value.trim();
    if (messageValue && messageValue.length < 10) {
      setError(fields.message, "Сообщение должно быть от 10 символов");
      isValid = false;
    } else if (messageValue.length > 500) {
      setError(fields.message, "Сообщение должно быть не длиннее 500 символов");
      isValid = false;
    }

    if (!fields.agreement.checked) {
      setError(fields.agreement, "Подтвердите согласие на обработку данных");
      isValid = false;
    }

    if (!isValid) return;

    const formData = {
      name: nameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue || "(не заполнено)",
      agreement: fields.agreement.checked,
    };

    document.dispatchEvent(new CustomEvent("formValid", { detail: formData }));
    alert("Форма отправлена. Данные выведены в консоль.");
    form.reset();
  });

  [fields.name, fields.email, fields.subject, fields.message].forEach((field) => {
    field.addEventListener("input", () => clearFieldError(field));
  });

  fields.agreement.addEventListener("change", () => clearFieldError(fields.agreement));

  form.addEventListener("reset", () => {
    clearErrors();
  });

  function clearErrors() {
    Object.values(fields).forEach((field) => clearFieldError(field));
  }

  function clearFieldError(field) {
    field.classList.remove("is-danger");

    const helpId = `${field.id}Help`;
    const help = document.getElementById(helpId);
    if (help) {
      help.classList.remove("is-danger");
      if (help.dataset.baseMessage) {
        help.textContent = help.dataset.baseMessage;
      }
    }
  }

  function setError(field, message) {
    field.classList.add("is-danger");

    const helpId = `${field.id}Help`;
    const help = document.getElementById(helpId);
    if (help) {
      if (!help.dataset.baseMessage) {
        help.dataset.baseMessage = help.textContent;
      }
      help.textContent = message;
      help.classList.add("is-danger");
    }
  }
});
