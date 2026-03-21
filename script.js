document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');
    const signInForm = document.getElementById('signIn');
    const signUpForm = document.getElementById('signup');

    // Ensure correct initial display
    signUpForm.style.display = "none";
    signInForm.style.display = "block";

    // Show signup form
    signUpButton.addEventListener('click', function() {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    });

    // Show signin form
    signInButton.addEventListener('click', function() {
        signUpForm.style.display = "none";
        signInForm.style.display = "block";
    });
});
