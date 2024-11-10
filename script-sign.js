function passConfirm() {
    const password = document.getElementById("Password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;
    const message = document.getElementById("Message");

    if (password === confirmPassword) {
        message.style.color = "green";
        message.textContent = "Passwords match!";
    } else {
        message.style.color = "red";
        message.textContent = "Passwords do NOT match!";
    }
}
