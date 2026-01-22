window.onload = () => {
    document.getElementById("reportDateTime").value =
        new Date().toISOString().slice(0, 16);

    toggleReportSections();
};

document.getElementById("reportType").addEventListener("change", toggleReportSections);

function toggleReportSections() {
    const type = document.getElementById("reportType").value;
    document.getElementById("arrestSection").classList.toggle("hidden", type !== "arrest");
    document.getElementById("accidentSection").classList.toggle("hidden", type !== "accident");
}

function removeCard(btn) {
    btn.parentElement.remove();
}

function personTemplate(type) {
    return `
        <button type="button" class="remove-btn" onclick="removeCard(this)">✕</button>
        <div class="grid-2">
            <label>Name* <input name="${type}Name[]"></label>
            <label>DOB* <input type="date" name="${type}DOB[]"></label>
            <label>Race
                <select name="${type}Race[]">
                    <option>White</option>
                    <option>Black</option>
                    <option>Asian</option>
                    <option>Native American</option>
                    <option>Hispanic</option>
                    <option>Other</option>
                </select>
            </label>
            <label>Sex*
                <select name="${type}Sex[]">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </label>
            <label>Address <input name="${type}Address[]"></label>
            <label>Descriptors <input name="${type}Descriptors[]"></label>
        </div>
    `;
}

function addPerson(type) {
    const div = document.createElement("div");
    div.className = "person-card";
    div.innerHTML = personTemplate(type);
    if (type === "victim") {
        div.innerHTML += `<label>Injuries <input name="victimInjuries[]"></label>
                          <label>Statement <textarea name="victimStatement[]"></textarea></label>`;
    }
    if (type === "witness") {
        div.innerHTML += `<label>Statement <textarea name="witnessStatement[]"></textarea></label>`;
    }
    document.getElementById(type + "List").appendChild(div);
}

function addSeizedProperty() {
    const div = document.createElement("div");
    div.className = "property-card";
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeCard(this)">✕</button>
        <label>Description <input name="propertyDesc[]"></label>
        <label>Serial/ID <input name="propertyID[]"></label>
    `;
    document.getElementById("seizedPropertyList").appendChild(div);
}

function addCharge() {
    const div = document.createElement("div");
    div.className = "charge-card";
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeCard(this)">✕</button>
        <label>Title <input name="chargeTitle[]" value="Assault"></label>
        <label>Statute <input name="chargeStatute[]" value="750.81"></label>
        <label>Class <input name="chargeClass[]" value="Misdemeanor"></label>
    `;
    document.getElementById("chargeList").appendChild(div);
}

function addVehicle() {
    const div = document.createElement("div");
    div.className = "vehicle-card";
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeCard(this)">✕</button>
        <label>Owner <input name="vehicleOwner[]"></label>
        <label>Model/Color <input name="vehicleModelColor[]"></label>
        <label>Plate <input name="vehiclePlate[]"></label>
        <label>Damage <input name="vehicleDamage[]"></label>
        <label>Towed
            <select name="vehicleTowed[]">
                <option>No</option>
                <option>Yes</option>
            </select>
        </label>
        <label>Documents <input name="vehicleDocs[]"></label>
    `;
    document.getElementById("vehicleList").appendChild(div);
}

function addPropertyDamage() {
    const div = document.createElement("div");
    div.className = "damage-card";
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeCard(this)">✕</button>
        <label>Description <input name="damageDesc[]"></label>
    `;
    document.getElementById("propertyDamageList").appendChild(div);
}

document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(this);
    const json = {};

    data.forEach((v, k) => {
        if (json[k]) {
            if (!Array.isArray(json[k])) json[k] = [json[k]];
            json[k].push(v);
        } else json[k] = v;
    });

    json.reportNumber ||= "RPT-" + Date.now();

    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    reports.push(json);
    localStorage.setItem("reports", JSON.stringify(reports));

    alert("Report saved.");
});