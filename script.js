document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const emailFeedback = document.getElementById("emailFeedback");
    const cpfInput = document.getElementById("cpf");
    const cpfFeedback = document.getElementById("cpfFeedback");
    const successMessage = document.getElementById("successMessage");
    const nameInput = document.getElementById("name"); // adiciona a referência ao campo de nome
    const nameFeedback = document.getElementById("nameFeedback"); // feedback de nome (adicione este elemento no HTML)
  
    // limitar o campo de nome para apenas caracteres alfabéticos
    nameInput.addEventListener("input", function() {
      let nameValue = nameInput.value;
  
      // remover números e caracteres especiais, permitindo apenas letras e espaços
      nameInput.value = nameValue.replace(/[^a-zA-Z\s]/g, "");
  
      if (nameInput.value.length > 0) {
        nameFeedback.textContent = ""; // remove a mensagem de erro se houver texto
      } else {
        nameFeedback.textContent = "Por favor insira um nome válido.";
        nameFeedback.style.color = "red";
      }
    });
  
    // formatação e limitação do CPF à medida que o usuário digita
    cpfInput.addEventListener("input", function() {
      let cpfValue = cpfInput.value.replace(/\D/g, ""); // remove todos os caracteres não numéricos
      
      if (cpfValue.length > 11) {
        cpfValue = cpfValue.slice(0, 11); // limita a entrada a 11 dígitos
      }
      
      cpfInput.value = formatCPF(cpfValue); // aplica a formatação de CPF
      
      if (cpfValue.length === 11 && validateCPF(cpfValue)) {
        cpfFeedback.textContent = "CPF Válido!";
        cpfFeedback.style.color = "green";
      } else {
        cpfFeedback.textContent = "CPF Inválido.";
        cpfFeedback.style.color = "red";
      }
    });
  
    // validação do e-mail
    emailInput.addEventListener("input", function() {
      const emailValue = emailInput.value;
      if (emailValue.includes("@") && emailValue.includes(".")) {
        emailFeedback.textContent = "Email Válido!";
        emailFeedback.style.color = "green";
      } else {
        emailFeedback.textContent = "Por favor insira um email válido.";
        emailFeedback.style.color = "red";
      }
    });
  
    // validação do formulário ao enviar
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault(); // impede o envio do formulário
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const cpf = cpfInput.value.replace(/\D/g, "").trim(); // remove caracteres de formatação para validação
      const message = document.getElementById("message").value.trim();
  
      if (name === "" || email === "" || cpf === "" || message === "") {
        alert("Please fill in all fields.");
      } else if (!validateCPF(cpf)) {
        alert("CPF Inválido.");
      } else if (!email.includes("@")) {
        alert("Email Inválido.");
      } else {
        successMessage.classList.remove("hidden");
        contactForm.reset(); // limpa o formulário após o envio
      }
    });
  
    // função de formatação de CPF
    function formatCPF(cpf) {
      // aplica a formatação 000.000.000-00
      return cpf
        .replace(/(\d{3})(\d)/, "$1.$2") // adiciona o primeiro ponto após os três primeiros dígitos
        .replace(/(\d{3})(\d)/, "$1.$2") // adiciona o segundo ponto após os três próximos dígitos
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // adiciona o traço após o nono dígito
    }
  
    // função de validação de CPF
    function validateCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer caractere não numérico
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
  