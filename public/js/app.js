async function updateNavigation() {
  try {
    const response = await fetch("/api/users/check-login", {
      method: "GET",
      credentials: "include",
    });

    const accountLink = document.getElementById("accountLink");

    if (response.ok) {
      const data = await response.json();
      accountLink.textContent = "Konto";
      accountLink.href = "../html/account.html";
    } else {
      accountLink.textContent = "Zaloguj się";
      accountLink.href = "../html/login.html";
    }
  } catch (error) {
    console.error("Błąd podczas aktualizacji nawigacji:", error);
  }
}

window.onload = updateNavigation;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/api/offers");
    const offers = await response.json();
    console.log(JSON.stringify(offers, null, 2));
  } catch (err) {
    console.error("Error fetching offers:", err);
  }

  const elements = document.querySelectorAll(".myImgAniamtion");

  elements.forEach((element) => {
    const img = element.querySelector("img");
    const text = element.querySelector("div");

    element.addEventListener("mouseenter", () => {
      img.style.opacity = "0.5";
      text.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      img.style.opacity = "1";
      text.style.opacity = "0";
    });
  });
});
