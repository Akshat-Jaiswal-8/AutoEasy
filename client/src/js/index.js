const registerBtn = document.querySelector(".nav-cta-0");
const loginBtn = document.querySelector(".nav-cta-1");

if (localStorage.getItem("email")) {
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
}

const contactForm = document.getElementById("contact-us--form");

const sendData = async (data) => {
    let url = "http://localhost:8000/contact/message";

    axios
        .post(url, data)
        .then(function (response) {
            // console.log(response);
            alert("message sent successfully");
        })
        .catch(function (error) {
            console.log(error);
        });
};

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const sender_name = document.getElementById("full-name").value;
    const sender_email = document.getElementById("email").value;
    const sender_message = document.getElementById(
        "contact-us--description"
    ).value;
    const userid = localStorage.getItem("userid");

    if (userid) {
        sendData({ userid, sender_name, sender_email, sender_message });
    } else {
        console.log("login first");
    }
});
