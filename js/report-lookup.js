const reportList = document.getElementById("reportList");
const reportDetail = document.getElementById("reportDetail");
const detailContent = document.getElementById("detailContent");
const closeBtn = document.getElementById("closeDetail");

window.onload = () => {
    loadReports();
};

// Load all reports
function loadReports() {
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    reportList.innerHTML = "";

    if (!reports.length) {
        reportList.innerHTML = "<p>No reports found.</p>";
        return;
    }

    reports.forEach((report) => {
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

// Helper to render arrays/objects
function renderSection(title, obj) {
    if (!obj) return "";
    let html = `<div class="detail-section"><h3>${title}</h3><ul>`;
    for (const key in obj) {
        let value = obj[key];
        if (Array.isArray(value)) value = value.join(", ");
        html += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += "</ul></div>";
    return html;
}

// Render full report
function renderReport(report) {
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

    // Seized Property
    if (report.propertyDesc && report.propertyDesc.length) {
        html += `<div class="detail-section"><h3>Seized Property</h3><ul>`;
        report.propertyDesc.forEach((desc, i) => {
            html += `<li>${desc} | ID: ${report.propertyID?.[i] || "N/A"}</li>`;
        });
        html += `</ul></div>`;
    }

    // Persons: Suspects, Victims, Witnesses
    ["suspect", "victim", "witness"].forEach(type => {
        const names = report[`${type}Name`] || [];
        if (names.length) {
            html += `<div class="detail-section"><h3>${capitalize(type)}s</h3><ul>`;
            names.forEach((name, i) => {
                html += `<li><strong>Name:</strong> ${name}`;
                html += report[`${type}DOB`] ? ` | DOB: ${report[`${type}DOB`][i] || "N/A"}` : "";
                html += report[`${type}Race`] ? ` | Race: ${report[`${type}Race`][i] || "N/A"}` : "";
                html += report[`${type}Sex`] ? ` | Sex: ${report[`${type}Sex`][i] || "N/A"}` : "";
                html += report[`${type}Address`] ? ` | Address: ${report[`${type}Address`][i] || "N/A"}` : "";
                html += report[`${type}Descriptors`] ? ` | Descriptors: ${report[`${type}Descriptors`][i] || "N/A"}` : "";
                if (type === "victim") {
                    html += report.victimInjuries ? ` | Injuries: ${report.victimInjuries[i] || "N/A"}` : "";
                    html += report.victimStatement ? ` | Statement: ${report.victimStatement[i] || "N/A"}` : "";
                }
                if (type === "witness") {
                    html += report.witnessStatement ? ` | Statement: ${report.witnessStatement[i] || "N/A"}` : "";
                }
                html += `</li>`;
            });
            html += `</ul></div>`;
        }
    });

    // Charges
    if (report.chargeTitle && report.chargeTitle.length) {
        html += `<div class="detail-section"><h3>Charges</h3><ul>`;
        report.chargeTitle.forEach((title, i) => {
            html += `<li>${title} | Statute: ${report.chargeStatute?.[i] || "N/A"} | Class: ${report.chargeClass?.[i] || "N/A"}</li>`;
        });
        html += `</ul></div>`;
    }

    // Accident fields
    if (report.lighting || report.weather || report.vehicleOwner || report.damageDesc) {
        html += `<div class="detail-section"><h3>Accident Report</h3><ul>`;
        html += report.lighting ? `<li>Lighting: ${report.lighting}</li>` : "";
        html += report.weather ? `<li>Weather: ${report.weather}</li>` : "";
        if (report.vehicleOwner && report.vehicleOwner.length) {
            report.vehicleOwner.forEach((owner, i) => {
                html += `<li>Vehicle: ${owner} | ${report.vehicleModelColor?.[i] || "N/A"} | Plate: ${report.vehiclePlate?.[i] || "N/A"} | Damage: ${report.vehicleDamage?.[i] || "N/A"} | Towed: ${report.vehicleTowed?.[i] || "N/A"} | Docs: ${report.vehicleDocs?.[i] || "N/A"}</li>`;
            });
        }
        if (report.damageDesc && report.damageDesc.length) {
            report.damageDesc.forEach(desc => html += `<li>Property Damage: ${desc}</li>`);
        }
        html += `</ul></div>`;
    }

    return html;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
