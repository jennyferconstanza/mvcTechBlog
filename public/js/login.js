const { response } = require("express");

async function loginForm(event) {
    event.preventDefault();

    const email = document.querySelector("#emailLogin").value.trim();
    const password = document.querySelector("#passwordLogin").value.trim();

    if(email && password) {
        const response = await fetch("/api/users/login", {
            method:"post",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {"ContentType": "application/json"}
        });
        if(response.ok) {
            document.location.replace("/userDashboard");
        } else {
            alert(response.postTextUpdate);
        }
    }
}
document.querySelector("loginForm").addEventListener("submit", loginForm);