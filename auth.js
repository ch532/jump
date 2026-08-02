const WORKER_URL = "https://delicate-violet-862d.trustconnect713.workers.dev";

// Execute session guard automatically on every page load
document.addEventListener("DOMContentLoaded", function () {
  checkGlobalAuth();
});

/**
 * Global Redirect Guard
 * Bounces unauthenticated users back to index.html without requiring HTML wrapper divs.
 */
function checkGlobalAuth() {
  const token = localStorage.getItem("idToken");
  const currentPath = window.location.pathname;

  // Check if current page is the landing/login page
  const isLoginPage = currentPath === "/" || currentPath.endsWith("index.html") || currentPath === "";

  if (!token && !isLoginPage) {
    // No active session found -> redirect to login page
    window.location.href = "index.html";
  } else {
    // Session valid (or on login page) -> make body visible if CSS flash guard is enabled
    document.body.classList.add("auth-ready");
    document.body.style.display = "block";

    const output = document.getElementById("output");
    if (output && token) {
      output.textContent = "Session active. Logged in!";
    }
  }
}

/**
 * 1. Register
 */
async function submitRegister() {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) return alert("Please fill in email and password.");

  try {
    const res = await fetch(`${WORKER_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");

    localStorage.setItem("idToken", data.idToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("uid", data.localId);

    if (document.getElementById("output")) {
      document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    }
    checkGlobalAuth();
  } catch (err) {
    alert(err.message);
  }
}

/**
 * 2. Login
 */
async function submitLogin() {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) return alert("Please fill in email and password.");

  try {
    const res = await fetch(`${WORKER_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    localStorage.setItem("idToken", data.idToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("uid", data.localId);

    if (document.getElementById("output")) {
      document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    }
    checkGlobalAuth();
  } catch (err) {
    alert(err.message);
  }
}

/**
 * 3. Profile Fetch
 */
async function getProfile() {
  const token = localStorage.getItem("idToken");
  if (!token) return alert("No active session found. Please log in.");

  try {
    const res = await fetch(`${WORKER_URL}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Profile fetch failed");

    if (document.getElementById("output")) {
      document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    }
  } catch (err) {
    alert(err.message);
  }
}

/**
 * 4. Logout
 */
function handleLogout() {
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("uid");

  alert("Logged out successfully.");
  window.location.href = "index.html";
}
