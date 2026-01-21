// USER DATABASE (FRONT-END SIMULATION)
const users = [
    {
        name: "Stiff Stiffler",
        department: "Flint Police Department",
        badge: "837",
        position: "Sergeant",
        username: "stiffler837",
        password: "71657165Fr."
    }
];

// Auto-fill saved credentials
window.onload = () => {
    const savedUser = localStorage.getItem("savedUsername");
    const savedPass = localStorage.getItem("savedPassword");

    if (savedUser && savedPass) {
        document.getElementById("username").value = savedUser;
        document.getElementById("password").value = savedPass;
    }
};

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        alert("Invalid credentials.");
        return;
    }

    // Save login session
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(user));

    // Save credentials for autofill
    localStorage.setItem("savedUsername", username);
    localStorage.setItem("savedPassword", password);

    window.location.href = "home.html";
});
