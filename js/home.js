// Block access if not logged in
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Display user info
const user = JSON.parse(localStorage.getItem("userData"));
document.getElementById("userInfo").innerHTML = `
    <strong>${user.name}</strong><br>
    ${user.position}<br>
    Badge #${user.badge}<br>
    ${user.department}
`;

// Logout function
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userData");
    window.location.href = "index.html";
}
