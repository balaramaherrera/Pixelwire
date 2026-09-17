const USER_STORAGE_KEY = "ricardoinfotv-users";
const SESSION_STORAGE_KEY = "ricardoinfotv-session";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, "0")).join("");
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function setSession(user) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    startedAt: new Date().toISOString()
  }));
}

function showAuthMessage(message, type = "error") {
  const element = document.getElementById("auth-message");
  if (!element) return;
  element.textContent = message;
  element.className = `auth-message ${type}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async event => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = normalizeEmail(formData.get("email"));
      const password = String(formData.get("password"));
      const user = readUsers().find(item => item.email === email);

      if (!user || user.passwordHash !== await hashPassword(password)) {
        showAuthMessage("Correo o contraseña incorrectos.");
        return;
      }
      setSession(user);
      window.location.href = "index.html";
    });
  }
});
