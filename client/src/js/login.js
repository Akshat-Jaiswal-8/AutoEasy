const loginForm = document.getElementById("login-form");

function getMode(e) {
    for (let i = 0; i < e.length; i++) {
        if (e[i].checked) {
            return e[i].value;
        }
    }
}

const sendData = async (data) => {
    console.log(data);
    console.log(getMode(userType));

    let url = `http://localhost:8000/${getMode(userType)}/get`;

    await axios
        .post(url, data)
        // .then((res) => res.json())
        .then((data) => {
            console.log(data.data);

            console.log(data.data.data.email);
            localStorage.setItem("email", data.data.data.email);
            localStorage.setItem("userid", data.data.data._id);
            localStorage.setItem("usertype", data.data.data.passenger);

            window.location.assign("http://localhost:3000/");
        })
        .catch(function (error) {
            console.log(error);
        });
};

let userType;

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    userType = document.getElementsByName("input_passenger");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    sendData({ email, password });
});
