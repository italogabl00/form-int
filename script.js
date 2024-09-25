document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const emailFeedback = document.getElementById("emailFeedback");
    const cpfInput = document.getElementById("cpf");
    const cpfFeedback = document.getElementById("cpfFeedback");
    const successMessage = document.getElementById("successMessage");
  
    // validação do CPF
    cpfInput.addEventListener("input", function() {
      const cpfValue = cpfInput.value;
      if (validateCPF(cpfValue)) {
        cpfFeedback.textContent = "Valid CPF!";
        cpfFeedback.style.color = "green";
      } else {
        cpfFeedback.textContent = "Invalid CPF.";
        cpfFeedback.style.color = "red";
      }
    });
  
    // validação do e-mail
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
  
    // validação do formulário ao enviar
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Impede o envio do formulário
  
      const name = document.getElementById("name").value.trim();
      const email = emailInput.value.trim();
      const cpf = cpfInput.value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (name === "" || email === "" || cpf === "" || message === "") {
        alert("Please fill in all fields.");
      } else if (!validateCPF(cpf)) {
        alert("Invalid CPF.");
      } else if (!email.includes("@")) {
        alert("Invalid email.");
      } else {
        successMessage.classList.remove("hidden");
        contactForm.reset(); // limpa o formulário após o envio
      }
    });
  
    // Função de validação de CPF
    function validateCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, ''); // remove qualquer caractere não numérico
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; // cpf deve ter 11 dígitos e não pode ter todos os números iguais
      }
      let sum = 0;
      let remainder;
      
      // valida o primeiro dígito
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
      }
  
      sum = 0;
  
      // valida o segundo dígito
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
      }
      
      return true;
    }
  });
  