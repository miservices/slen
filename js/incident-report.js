// Pre-fill defaults
window.onload = () => {
    const officer = JSON.parse(localStorage.getItem("userData")) || { name: "" };
    document.getElementById("reportingOfficer").value = officer.name;
    document.getElementById("reportDateTime").value = new Date().toISOString().slice(0,16);
};

// Show/hide sections based on report type
document.getElementById("reportType").addEventListener("change", function() {
    const type = this.value;
    document.getElementById("arrestSection").classList.toggle("hidden", type !== "arrest");
    document.getElementById("accidentSection").classList.toggle("hidden", type !== "accident");
});

// ===== PERSONS =====
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

// ===== SEIZED PROPERTY =====
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

// ===== CHARGES =====
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

// ===== VEHICLES =====
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

// ===== PROPERTY DAMAGE =====
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
    data.forEach((value, key) => {
        if(json[key]) {
            if(Array.isArray(json[key])) json[key].push(value);
            else json[key] = [json[key], value];
        } else {
            json[key] = value;
        }
    });
    console.log("REPORT DATA:", json);
    alert("Report submitted! Check console for data.");
});
