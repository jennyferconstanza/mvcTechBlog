async function logout() {
    const response = await fetch("/api/users/logout", {
        method: "post",
        headers: {"contentType": "application/json"}
    });
    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.postTextUpdate);
    }
}
document.querySelector("#logout").addEventListener("click", logout);