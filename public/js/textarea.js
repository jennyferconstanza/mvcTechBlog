async function textareaForm(event) {
    event.preventDefault();

    const textarea_text = document.querySelector('textarea[name="textarea-body"]').value.trim();

    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length -1
    ];

    // prevents user from submitting text area with no values
    if(textarea_text) {
        const response = await fetch("/api/textarea", {
            method: "POST",
            body: JSON.stringify({
                post_id,
                textarea_text
            }),
            headers: {
                "contentType": "application/json"
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector(".textarea-form").addEventListener("submit", textareaForm);