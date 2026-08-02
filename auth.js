const WORKER_URL = "https://delicate-violet-862d.trustconnect713.workers.dev";

// On page load: Check if an idToken exists in localStorage
document.addEventListener("DOMContentLoaded", function () {
  checkAuthStatus();
});

function checkAuthStatus() {
  const token = localStorage.getItem("idToken");
  const protectedContent = document.getElementById("protected-content");
  const output = document.getElementById("output");

  if (token && protectedContent) {
    protectedContent.style.display = "flex";
    if (output) output.textContent = "Session active. Logged in!";
  } else if (protectedContent) {
    protectedContent.style.display = "none";
    if (output) output.textContent = "Access restricted. Please register or log in.";
  }
}

/**
 * 1. Register
 */
async function submitRegister() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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

    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    checkAuthStatus(); // Unlock the page layout
  } catch (err) {
    alert(err.message);
  }
}

/**
 * 2. Login
 */
async function submitLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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

    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    checkAuthStatus(); // Unlock the page layout
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

    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
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

  checkAuthStatus(); // Lock the page layout immediately
  alert("Logged out successfully.");
}
