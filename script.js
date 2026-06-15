const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const signupButtons = document.querySelectorAll(".open-signup");
const signupDialog = document.querySelector(".signup-dialog");
const closeDialog = document.querySelector(".close-dialog");
const signupForm = document.querySelector(".signup-form");

const storedTheme = localStorage.getItem("daily-theme");
if (storedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("daily-theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀" : "☾";
});

signupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof signupDialog.showModal === "function") {
      signupDialog.showModal();
    }
  });
});

closeDialog.addEventListener("click", () => signupDialog.close());

signupForm.addEventListener("submit", (event) => {
  const password = signupForm.elements.password.value;
  const passwordConfirm = signupForm.elements.passwordConfirm.value;
  if (password !== passwordConfirm) {
    event.preventDefault();
    signupForm.elements.passwordConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
    signupForm.elements.passwordConfirm.reportValidity();
    return;
  }
  signupForm.elements.passwordConfirm.setCustomValidity("");
});
