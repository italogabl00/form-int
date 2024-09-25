document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const emailFeedback = document.getElementById("emailFeedback");
    const successMessage = document.getElementById("successMessage");
  
    // Validar o campo de e-mail em tempo real
    emailInput.addEventListener("input", function() {
      const emailValue = emailInput.value;
      if (emailValue.includes("@") && emailValue.includes(".")) {
        emailFeedback.textContent = "Valid email!";
        emailFeedback.style.color = "green";
      } else {
        emailFeedback.textContent = "Please enter a valid email.";
        emailFeedback.style.color = "red";
      }
    });
  
    // Validar o formulário ao enviar
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Impede o envio do formulário
  
      const name = document.getElementById("name").value.trim();
      const email = emailInput.value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
      } else if (!email.includes("@")) {
        alert("Invalid email.");
      } else {
        successMessage.classList.remove("hidden");
        contactForm.reset(); // Limpa o formulário após o envio
      }
    });
  });
  