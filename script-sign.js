document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const email=document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const signUpMessage = document.getElementById("signUpMessage");
    const confirmPassword=document.getElementById("confirmPassword").value;

    if(password!==confirmPassword){
        signUpMessage.style.color = "red";
        signUpMessage.textContent = "Passwords DO NOT MATCH";
    }
    else{
        signUpMessage.style.color = "green";
        signUpMessage.textContent = "thanks";
    }

  });
  