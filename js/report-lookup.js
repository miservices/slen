const reportList = document.getElementById("reportList");
const reportDetail = document.getElementById("reportDetail");
const detailContent = document.getElementById("detailContent");
const closeBtn = document.getElementById("closeDetail");

window.onload = () => loadReports();

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

function showDetail(report) {
    detailContent.innerHTML = renderReport(report);
    reportDetail.classList.add("show");

    document.querySelectorAll(".detail-section h3").forEach(h3 => {
        h3.style.cursor = "pointer";
        h3.addEventListener("click", () => {
            const ul = h3.nextElementSibling;
            if(ul) ul.style.display = ul.style.display === "none" ? "block" : "none";
        });
    });
}

closeBtn.addEventListener("click", () => reportDetail.classList.remove("show"));

function renderReport(report) {
    let html = '';

    function renderList(title, subKeys) {
        // Normalize all subKeys to arrays
        const length = Math.max(...subKeys.map(k => {
            if(!report[k]) return 0;
            return Array.isArray(report[k]) ? report[k].length : 1;
        }));
        if(length === 0) return '';

        let section = `<div class="detail-section"><h3>${title}</h3><ul>`;
        for(let i=0;i<length;i++){
            section += `<li>`;
            subKeys.forEach(key => {
                let val = report[key];
                if(val){
                    if(!Array.isArray(val)) val = [val];
                    section += `<strong>${capitalizeKey(key)}:</strong> ${val[i] || "N/A"} | `;
                }
            });
            section = section.replace(/\s\|\s$/,'');
            section += `</li>`;
        }
        section += `</ul></div>`;
        return section;
    }

    // Report Info
    html += `<div class="detail-section"><h3>Report Info</h3><ul>`;
    ["reportNumber","reportType","reportingOfficer","reportingAgency","reportDateTime","location"].forEach(key => {
        if(report[key]) html += `<li><strong>${capitalizeKey(key)}:</strong> ${report[key]}</li>`;
    });
    html += `</ul></div>`;

    // Narrative & Notes
    if(report.narrative) html += `<div class="detail-section"><h3>Narrative</h3><p>${report.narrative}</p></div>`;
    if(report.notes) html += `<div class="detail-section"><h3>Notes</h3><p>${report.notes}</p></div>`;

    // Persons
    html += renderList("Suspects", ["suspectName","suspectDOB","suspectRace","suspectSex","suspectAddress","suspectDescriptors"]);
    html += renderList("Victims", ["victimName","victimDOB","victimRace","victimSex","victimAddress","victimDescriptors","victimInjuries","victimStatement"]);
    html += renderList("Witnesses", ["witnessName","witnessDOB","witnessRace","witnessSex","witnessAddress","witnessDescriptors","witnessStatement"]);

    // Seized Property
    html += renderList("Seized Property", ["propertyDesc","propertyID"]);

    // Charges
    html += renderList("Charges", ["chargeTitle","chargeStatute","chargeClass"]);

    // Arrest / Accident details
    html += renderList("Arrest / Accident Details", [
        "mugshot","lighting","weather",
        "vehicleOwner","vehicleModelColor","vehiclePlate","vehicleDamage","vehicleTowed","vehicleDocs",
        "damageDesc"
    ]);

    return html;
}

function capitalizeKey(key) {
    return key.replace(/([A-Z])/g," $1").replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
}
