document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");
  
    // Simple hardcoded validation for demo purposes
    if (username === "user123" && password === "pass123") {
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login successful!";
      // Redirect to another page if needed
      // window.location.href = "home.html";
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "Incorrect username or password";
    }
  });
  