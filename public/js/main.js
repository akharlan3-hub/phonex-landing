console.log("✅ main.js подключен");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (!form) {
    console.error("❌ Форма .contact-form не найдена");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("📨 форма отправлена");

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      telegram: formData.get("telegram"),
      page: window.location.href
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("Ответ сервера:", data);

      if (!data.success) {
        throw new Error("Server error");
      }

      alert("Заявка отправлена! Мы свяжемся с вами.");
      form.reset();

    } catch (err) {
      console.error("Ошибка отправки:", err);
      alert("Ошибка отправки. Попробуйте позже.");
    }
  });
});
