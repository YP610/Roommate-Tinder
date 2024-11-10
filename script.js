document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");
  
    // Add code that username and password is in the database, if not, upload incorrect use message
    if (username === "user123" && password === "pass123") {
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login successful!";
      window.location.href="home-improved.html";
      // Redirect to another page if needed
      // window.location.href = "home.html";
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "Incorrect username or password";
      document.getElementById("password").value = "";
    }
  });
  