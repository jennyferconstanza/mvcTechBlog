async function newForm(event) {
    event.preventDefault();
    const title = document.querySelector("input[name='newPostTitle']").value;
    const postText = document.querySelector("textarea[name='postText']").value;
    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
        title, 
        postText
        }),
        headers: {
            "contentType": "application/json"
        }
    });
    if (response.ok){
    document.location.replace("/userDashboard/");
    } else {
        alert(response.statusText);
    }
}
document.querySelector(".newPostForm").addEventListener("submit", newForm)