async function checkLoginStatus() {
  try {
    const response = await fetch("/api/users/check-login", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      console.log(2);
    } else {
      alert("Użytkownik niezalogowany.");
      console.log(1);
    }
  } catch (error) {
    console.error("Błąd podczas sprawdzania statusu logowania:", error);
  }
}

window.onload = () => {
  checkLoginStatus();
};

const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");
const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const addPhoneNumber = document.getElementById("addPhoneNumber");
const phoneNumberField = document.getElementById("phoneNumberField");
const togglePassword = document.getElementById("togglePassword");
const loginPassword = document.getElementById("loginPassword");
const toggleIcon = document.getElementById("toggleIcon");
const toggleRegisterPassword = document.getElementById(
  "toggleRegisterPassword"
);
const registerPassword = document.getElementById("registerPassword");
const registerToggleIcon = document.getElementById("registerToggleIcon");
const repeatPassword = document.getElementById("repeatPassword");

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();

  loginPage.style.display = "none";
  registerPage.style.display = "block";
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();

  loginPage.style.display = "block";
  registerPage.style.display = "none";
});

addPhoneNumber.addEventListener("change", () => {
  phoneNumberField.style.display = addPhoneNumber.checked ? "block" : "none";
});

togglePassword.addEventListener("click", () => {
  const type = loginPassword.type === "password" ? "text" : "password";
  loginPassword.type = type;
  toggleIcon.src =
    type === "text" ? "../icons/eye.svg" : "../icons/eye-slash.svg";
});

toggleRegisterPassword.addEventListener("click", () => {
  const type = registerPassword.type === "password" ? "text" : "password";
  registerPassword.type = type;
  repeatPassword.type = type;
  registerToggleIcon.src =
    type === "text" ? "../icons/eye.svg" : "../icons/eye-slash.svg";
});

const registerForm = document.getElementById("registerForm");
const registerPasswordError = document.getElementById("passwordHelpBlock");

const repeatPasswordError = document.createElement("div");
repeatPasswordError.className = "text-danger small mt-1";
repeatPasswordError.style.display = "none";
repeatPassword.insertAdjacentElement("afterend", repeatPasswordError);

const validatePassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasSpecialChar;
};

const passowrdRulesCollapse = new bootstrap.Collapse(
  document.getElementById("collapseExample"),
  { toggle: false }
);

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = registerPassword.value.trim();
  const confirmPassword = repeatPassword.value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const phoneNumber = addPhoneNumber.checked
    ? document.getElementById("phoneNumber").value.trim()
    : null;

  let isValid = true;

  if (!validatePassword(password)) {
    registerPasswordError.classList.add("text-danger");
    isValid = false;
    passowrdRulesCollapse.show();
  } else {
    registerPasswordError.classList.remove("text-danger");
    passowrdRulesCollapse.hide();
  }

  if (password !== confirmPassword) {
    repeatPasswordError.textContent = "Hasła nie są identyczne.";
    repeatPasswordError.style.display = "block";
    isValid = false;
  } else {
    repeatPasswordError.style.display = "none";
  }

  if (isValid) {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
        switchToLogin.click();
      } else {
        alert(data.message || "Wystąpił błąd podczas rejestracji.");
      }
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
      alert("Wystąpił błąd podczas połączenia z serwerem.");
    }
  }
});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Zalogowano pomyślnie!");
      console.log("Sesja ID została ustawiona");
      window.location.href = "../index.html";
    } else {
      alert(data.message || "Błąd logowania.");
    }
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    alert("Wystąpił błąd połączenia z serwerem.");
  }
});
