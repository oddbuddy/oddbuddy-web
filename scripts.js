let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = "block"; // Make the active slide visible

        } else {
            slide.style.display = "none";
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize first slide
slides.forEach((slide, i) => {
    if (i !== 0) slide.style.display = "none"; // Hide all except first
});

setInterval(nextSlide, 4000); // Auto-slide every 4 seconds


function onSubmit(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;
    let submitButton = document.getElementById("submitButton");
    let progressBar = document.getElementById("progressBar");
    let successMessage = document.getElementById("toast-success");
    let errorMessage = document.getElementById("toast-danger");

    progressBar.style.display = "block";
    submitButton.style.display = "none";

    let data = {
        name: name,
        email: email,
        phone: phone,
        query: message
    }
    console.log(data);
    fetch("https://script.google.com/macros/s/AKfycbzSUwRXH2e3NWbUGQ6rPC7k8gAoHczOoeaChVazKxU6VfSpmd2V6DGF3qrHHG1hY5rYMQ/exec", {
        method: "POST",
        redirect: "follow",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    }).then((result) => {
        console.log("Success:", result);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    }).catch((error) => {
        console.error("Error:", error);
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);
    }).finally(() => {
        progressBar.style.display = "none";
        submitButton.style.display = "block";
    });
}