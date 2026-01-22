// ===== PRE-FILL DEFAULTS =====
window.onload = () => {
    const officer = JSON.parse(localStorage.getItem("userData")) || { name: "" };
    document.getElementById("reportingOfficer").value = officer.name;
    document.getElementById("reportDateTime").value = new Date().toISOString().slice(0,16);

    // Show/hide sections based on type
    toggleReportSections();
};

// ===== TOGGLE ARREST/ACCIDENT SECTIONS =====
document.getElementById("reportType").addEventListener("change", toggleReportSections);

function toggleReportSections() {
    const type = document.getElementById("reportType").value;
    document.getElementById("arrestSection").classList.toggle("hidden", type !== "arrest");
    document.getElementById("accidentSection").classList.toggle("hidden", type !== "accident");
}

// ===== ADD PERSON =====
function addPerson(type) {
    const container = document.getElementById(type + "List");
    const div = document.createElement("div");
    div.classList.add("person-card");
    div.innerHTML = `
        <label>Name* <input type="text" name="${type}Name[]"></label>
        <label>DOB* <input type="date" name="${type}DOB[]"></label>
        <label>Race <input type="text" name="${type}Race[]"></label>
        <label>Sex* <input type="text" name="${type}Sex[]"></label>
        <label>Address <input type="text" name="${type}Address[]"></label>
        <label>Physical Descriptors <input type="text" name="${type}Descriptors[]"></label>
        ${type === "victim" ? '<label>Injuries <input type="text" name="victimInjuries[]"></label><label>Statement <textarea name="victimStatement[]"></textarea></label>' : ''}
        ${type === "witness" ? '<label>Statement <textarea name="witnessStatement[]"></textarea></label>' : ''}
    `;
    container.appendChild(div);
}

// ===== ADD SEIZED PROPERTY =====
function addSeizedProperty() {
    const container = document.getElementById("seizedPropertyList");
    const div = document.createElement("div");
    div.classList.add("property-card");
    div.innerHTML = `
        <label>Description <input type="text" name="propertyDesc[]"></label>
        <label>Serial/ID <input type="text" name="propertyID[]"></label>
    `;
    container.appendChild(div);
}

// ===== ADD CHARGE =====
function addCharge() {
    const container = document.getElementById("chargeList");
    const div = document.createElement("div");
    div.classList.add("charge-card");
    div.innerHTML = `
        <label>Title <input type="text" value="Assault" name="chargeTitle[]"></label>
        <label>Statute <input type="text" value="123.45" name="chargeStatute[]"></label>
        <label>Class <input type="text" value="Misdemeanor" name="chargeClass[]"></label>
    `;
    container.appendChild(div);
}

// ===== ADD VEHICLE =====
function addVehicle() {
    const container = document.getElementById("vehicleList");
    const div = document.createElement("div");
    div.classList.add("vehicle-card");
    div.innerHTML = `
        <label>Owner Name <input type="text" name="vehicleOwner[]"></label>
        <label>Model/Color <input type="text" name="vehicleModelColor[]"></label>
        <label>License Plate & State <input type="text" name="vehiclePlate[]"></label>
        <label>Damage Description <input type="text" name="vehicleDamage[]"></label>
        <label>Towed
            <select name="vehicleTowed[]">
                <option value="No" selected>No</option>
                <option>Yes</option>
            </select>
        </label>
        <label>Documents <input type="text" name="vehicleDocs[]"></label>
    `;
    container.appendChild(div);
}

// ===== ADD PROPERTY DAMAGE =====
function addPropertyDamage() {
    const container = document.getElementById("propertyDamageList");
    const div = document.createElement("div");
    div.classList.add("damage-card");
    div.innerHTML = `<label>Description <input type="text" name="damageDesc[]"></label>`;
    container.appendChild(div);
}

// ===== FORM SUBMIT =====
document.getElementById("reportForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = new FormData(this);
    const json = {};

    // Convert FormData into JSON
    data.forEach((value, key) => {
        if(json[key]) {
            if(Array.isArray(json[key])) json[key].push(value);
            else json[key] = [json[key], value];
        } else {
            json[key] = value;
        }
    });

    // Assign unique report number if empty
    if(!json.reportNumber || json.reportNumber === "Auto-generated") {
        json.reportNumber = "RPT-" + Date.now();
    }

    // Save to localStorage
    let reports = JSON.parse(localStorage.getItem("reports") || "[]");
    reports.push(json);
    localStorage.setItem("reports", JSON.stringify(reports));

    alert("Report submitted and saved!");
    console.log("Saved Reports:", reports);
    // Optionally reset the form
    // this.reset();
});
