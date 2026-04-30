document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("formValid", (event) => {
    const formData = event.detail;
    const timestamp = new Date().toLocaleString("ru-RU");

    console.clear();
    console.log("=== Данные формы обратной связи ===");
    console.log("Имя:", formData.name);
    console.log("Email:", formData.email);
    console.log("Тема:", formData.subject);
    console.log("Сообщение:", formData.message);
    console.log("Согласие:", formData.agreement ? "Да" : "Нет");
    console.log("Время отправки:", timestamp);
  });
});
