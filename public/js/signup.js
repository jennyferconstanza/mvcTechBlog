async function signupForm(event){
    event.preventDefault();
    // gets data from form
    const username = document.querySelector("#userSignUp").value.trim();
    const email = document.querySelector("#emailSignUp").value.trim();
    const password = document.querySelector("#passwordSign").value.trim();
    if (username && email && password) {
        const response = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {"ContentType": "application/json"}
        });
        if (response.ok){
            //console.log("Successful Sign Up");
            document.location.replace("/userDashboard");
        } else {
            alert(response.postTextUpdate);
        }
    }
}
document.querySelector(".signupForm").addEventListener("submit", signupForm);