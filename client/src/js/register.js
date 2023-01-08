const registerForm = document.getElementById("register-form");

const sendData = async (data) => {
    let url = `http://localhost:8000/${
        data.passenger ? "user" : "driver"
    }/create`;

    await axios
        .post(url, data)
        .then((data) => {
            window.location.assign("http://localhost:3000/login");
        })
        .catch(function (error) {
            console.log(error);
        });
};

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    let userType = document.getElementsByName("input_passenger");
    const vehicleNum = document.querySelector("#vehicle");

    let passenger;
    let vehicle;

    for (const el of userType) {
        if (el.checked) {
            passenger = el.value === "passenger" ? true : false;
        }
    }
    if (passenger && vehicleNum.value.split(" ").length === 4) {
        sendData({ passenger, name, email, password });
    } else {
        vehicle = vehicleNum.value;
        sendData({ passenger, name, email, password, vehicle });
    }
});
