const reportList = document.getElementById("reportList");
const reportDetail = document.getElementById("reportDetail");
const detailContent = document.getElementById("detailContent");
const closeBtn = document.getElementById("closeDetail");

window.onload = () => loadReports();

// Load all reports
function loadReports() {
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    reportList.innerHTML = "";

    if (!reports.length) {
        reportList.innerHTML = "<p>No reports found.</p>";
        return;
    }

    reports.forEach(report => {
        const card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
            <strong>${report.reportNumber || "N/A"}</strong> - ${report.reportType || "Unknown"}<br>
            Officer: ${report.reportingOfficer || "N/A"}<br>
            Date: ${report.reportDateTime || "N/A"}<br>
            Location: ${report.location || "N/A"}
        `;
        card.addEventListener("click", () => showDetail(report));
        reportList.appendChild(card);
    });
}

// Show modal
function showDetail(report) {
    detailContent.innerHTML = renderReport(report);
    reportDetail.classList.add("show");
}

// Close modal
closeBtn.addEventListener("click", () => {
    reportDetail.classList.remove("show");
});

// Render full report nicely grouped
function renderReport(report) {
    let html = '';

    // Report Info
    html += `<div class="detail-section"><h3>Report Info</h3><ul>`;
    ["reportNumber","reportType","reportingOfficer","reportingAgency","reportDateTime","location"].forEach(key => {
        if (report[key]) html += `<li><strong>${capitalizeKey(key)}:</strong> ${report[key]}</li>`;
    });
    html += `</ul></div>`;

    // Narrative & Notes
    if (report.narrative) html += `<div class="detail-section"><h3>Narrative</h3><p>${report.narrative}</p></div>`;
    if (report.notes) html += `<div class="detail-section"><h3>Notes</h3><p>${report.notes}</p></div>`;

    // Persons
    ["suspect","victim","witness"].forEach(type => {
        const names = report[`${type}Name`] || [];
        if (names.length) {
            html += `<div class="detail-section"><h3>${capitalize(type)}s</h3><ul>`;
            names.forEach((name,i) => {
                html += `<li><strong>Name:</strong> ${name}`;
                if (report[`${type}DOB`]) html += ` | DOB: ${report[`${type}DOB`][i] || "N/A"}`;
                if (report[`${type}Race`]) html += ` | Race: ${report[`${type}Race`][i] || "N/A"}`;
                if (report[`${type}Sex`]) html += ` | Sex: ${report[`${type}Sex`][i] || "N/A"}`;
                if (report[`${type}Address`]) html += ` | Address: ${report[`${type}Address`][i] || "N/A"}`;
                if (report[`${type}Descriptors`]) html += ` | Descriptors: ${report[`${type}Descriptors`][i] || "N/A"}`;
                if (type === "victim") {
                    if (report.victimInjuries) html += ` | Injuries: ${report.victimInjuries[i] || "N/A"}`;
                    if (report.victimStatement) html += ` | Statement: ${report.victimStatement[i] || "N/A"}`;
                }
                if (type === "witness") {
                    if (report.witnessStatement) html += ` | Statement: ${report.witnessStatement[i] || "N/A"}`;
                }
                html += `</li>`;
            });
            html += `</ul></div>`;
        }
    });

    // Seized Property
    if (report.propertyDesc && report.propertyDesc.length) {
        html += `<div class="detail-section"><h3>Seized Property</h3><ul>`;
        report.propertyDesc.forEach((desc,i) => {
            html += `<li>${desc} | ID: ${report.propertyID?.[i] || "N/A"}</li>`;
        });
        html += `</ul></div>`;
    }

    // Charges
    if (report.chargeTitle && report.chargeTitle.length) {
        html += `<div class="detail-section"><h3>Charges</h3><ul>`;
        report.chargeTitle.forEach((title,i) => {
            html += `<li>${title} | Statute: ${report.chargeStatute?.[i] || "N/A"} | Class: ${report.chargeClass?.[i] || "N/A"}</li>`;
        });
        html += `</ul></div>`;
    }

    // Accident / Arrest fields
    if (report.mugshot || report.lighting || report.weather || report.vehicleOwner || report.damageDesc) {
        html += `<div class="detail-section"><h3>${report.reportType === "accident" ? "Accident Report" : "Arrest Report"}</h3><ul>`;
        if (report.mugshot) html += `<li>Mugshot: ${report.mugshot}</li>`;
        if (report.lighting) html += `<li>Lighting: ${report.lighting}</li>`;
        if (report.weather) html += `<li>Weather: ${report.weather}</li>`;

        // Vehicles
        if (report.vehicleOwner && report.vehicleOwner.length) {
            report.vehicleOwner.forEach((owner,i) => {
                html += `<li>Vehicle: ${owner} | ${report.vehicleModelColor?.[i] || "N/A"} | Plate: ${report.vehiclePlate?.[i] || "N/A"} | Damage: ${report.vehicleDamage?.[i] || "N/A"} | Towed: ${report.vehicleTowed?.[i] || "N/A"} | Docs: ${report.vehicleDocs?.[i] || "N/A"}</li>`;
            });
        }

        // Property Damage
        if (report.damageDesc && report.damageDesc.length) {
            report.damageDesc.forEach(desc => html += `<li>Property Damage: ${desc}</li>`);
        }

        html += `</ul></div>`;
    }

    return html;
}

// Helper: convert camelCase to readable
function capitalizeKey(key) {
    return key.replace(/([A-Z])/g," $1").replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
}
