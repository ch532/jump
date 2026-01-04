<!-- Place this in a separate file: login-check.js -->
<script>
  // Check if user is logged in by verifying the Google token
  const googleToken = localStorage.getItem("googleToken");

  if(!googleToken){
    // Not logged in → redirect to homepage
    alert("You must login first to access this page!");
    window.location.href = "index.html";
  } else {
    // Optional: decode token to get user info (name, email)
    // For display purposes
    console.log("Google JWT token found:", googleToken);
  }

  // Logout function (to use in logout button)
  function logout(){
    localStorage.removeItem("googleToken");
    alert("You have been logged out!");
    window.location.href = "index.html";
  }
</script>
