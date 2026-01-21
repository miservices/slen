window.onload = () => {
    loadReports();
};

function loadReports() {
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const list = document.getElementById("reportList");
    list.innerHTML = "";

    if(reports.length === 0) {
        list.innerHTML = "<p>No reports found.</p>";
        return;
    }

    reports.forEach((rpt, index) => {
        const card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
            <strong>${rpt.reportNumber || "N/A"}</strong> - ${rpt.reportType || "Unknown"}<br>
            Officer: ${rpt.reportingOfficer || "N/A"}<br>
            Date: ${rpt.reportDateTime || "N/A"}<br>
            Location: ${rpt.location || "N/A"}
        `;
        card.addEventListener("click", () => showDetail(rpt));
        list.appendChild(card);
    });
}

function showDetail(report) {
    const detail = document.getElementById("reportDetail");
    const content = document.getElementById("detailContent");
    detail.classList.remove("hidden");

    function renderSection(title, obj) {
        if(!obj) return "";
        let html = `<div class="detail-section"><h3>${title}</h3><ul>`;
        for(const key in obj) {
            let value = obj[key];
            if(Array.isArray(value)) value = value.join(", ");
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        html += "</ul></div>";
        return html;
    }

    let html = `
        ${renderSection("Report Info", {
            "Report Number": report.reportNumber,
            "Type": report.reportType,
            "Officer": report.reportingOfficer,
            "Agency": report.reportingAgency,
            "Date": report.reportDateTime,
            "Location": report.location
        })}
        ${renderSection("Narrative", {Narrative: report.narrative})}
        ${renderSection("Notes", {Notes: report.notes})}
    `;

    // Seized property
    if(report.propertyDesc && report.propertyDesc.length > 0) {
        html += `<div class="detail-section"><h3>Seized Property</h3><ul>`;
        report.propertyDesc.forEach((desc, i) => {
            html += `<li>${desc} - ID: ${report.propertyID[i] || "N/A"}</li>`;
        });
        html += "</ul></div>";
    }

    // Persons (suspects, victims, witnesses)
    ["suspect","victim","witness"].forEach(type => {
        const names = report[`${type}Name`] || [];
        if(names.length > 0){
            html += `<div class="detail-section"><h3>${type.charAt(0).toUpperCase()+type.slice(1)}s</h3><ul>`;
            names.forEach((name,i)=>{
                html += `<li><strong>Name:</strong> ${name}`;
                if(report[`${type}DOB`]) html += ` | DOB: ${report[`${type}DOB`][i] || "N/A"}`;
                if(report[`${type}Race`]) html += ` | Race: ${report[`${type}Race`][i] || "N/A"}`;
                if(report[`${type}Sex`]) html += ` | Sex: ${report[`${type}Sex`][i] || "N/A"}`;
                if(report[`${type}Address`]) html += ` | Address: ${report[`${type}Address`][i] || "N/A"}`;
                if(type === "victim" && report["victimInjuries"]) html += ` | Injuries: ${report["victimInjuries"][i] || "N/A"}`;
                if(type === "victim" && report["victimStatement"]) html += ` | Statement: ${report["victimStatement"][i] || "N/A"}`;
                if(type === "witness" && report["witnessStatement"]) html += ` | Statement: ${report["witnessStatement"][i] || "N/A"}`;
                html += `</li>`;
            });
            html += "</ul></div>";
        }
    });

    // Charges (arrests)
    if(report.chargeTitle && report.chargeTitle.length > 0){
        html += `<div class="detail-section"><h3>Charges</h3><ul>`;
        report.chargeTitle.forEach((title,i)=>{
            html += `<li>${title} | Statute: ${report.chargeStatute[i] || "N/A"} | Class: ${report.chargeClass[i] || "N/A"}</li>`;
        });
        html += "</ul></div>";
    }

    // Vehicles (accidents)
    if(report.vehicleOwner && report.vehicleOwner.length > 0){
        html += `<div class="detail-section"><h3>Vehicles</h3><ul>`;
        report.vehicleOwner.forEach((owner,i)=>{
            html += `<li>${owner} | ${report.vehicleModelColor[i] || "N/A"} | Plate: ${report.vehiclePlate[i] || "N/A"} | Damage: ${report.vehicleDamage[i] || "N/A"} | Towed: ${report.vehicleTowed[i] || "N/A"} | Docs: ${report.vehicleDocs[i] || "N/A"}</li>`;
        });
        html += `</ul></div>`;
    }

    // Property Damage (accidents)
    if(report.damageDesc && report.damageDesc.length > 0){
        html += `<div class="detail-section"><h3>Property Damage</h3><ul>`;
        report.damageDesc.forEach(desc => html += `<li>${desc}</li>`);
        html += `</ul></div>`;
    }

    content.innerHTML = html;
}

// Close detail
document.getElementById("closeDetail").addEventListener("click", () => {
    document.getElementById("reportDetail").classList.add("hidden");
});
