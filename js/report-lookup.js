window.onload = () => {
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const container = document.getElementById("reportCards");

    if(reports.length === 0) {
        container.innerHTML = "<p>No reports found.</p>";
        return;
    }

    reports.forEach((report, index) => {
        const card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
            <h3>${report.reportNumber}</h3>
            <p><strong>Type:</strong> ${report.reportType}</p>
            <p><strong>Date:</strong> ${report.reportDateTime}</p>
            <p><strong>Officer:</strong> ${report.reportingOfficer}</p>
        `;
        card.addEventListener("click", () => viewReport(index));
        container.appendChild(card);
    });
};

// Detailed view
function viewReport(index) {
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const report = reports[index];
    let html = `<h2>${report.reportNumber}</h2>`;
    html += `<p><strong>Type:</strong> ${report.reportType}</p>`;
    html += `<p><strong>Officer:</strong> ${report.reportingOfficer}</p>`;
    html += `<p><strong>Date:</strong> ${report.reportDateTime}</p>`;
    html += `<p><strong>Agency:</strong> ${report.reportingAgency}</p>`;
    html += `<p><strong>Location:</strong> ${report.location}</p>`;

    // Persons
    ["suspect", "victim", "witness"].forEach(type => {
        const names = report[`${type}Name[]`];
        const dobs = report[`${type}DOB[]`];
        if(names) {
            html += `<h3>${type.charAt(0).toUpperCase()+type.slice(1)}s</h3>`;
            const nameArray = Array.isArray(names) ? names : [names];
            const dobArray = Array.isArray(dobs) ? dobs : [dobs];
            nameArray.forEach((n, i) => {
                html += `<p><strong>Name:</strong> ${n}, <strong>DOB:</strong> ${dobArray[i] || ''}</p>`;
            });
        }
    });

    if(report.narrative) html += `<h3>Narrative</h3><p>${report.narrative}</p>`;
    if(report.notes) html += `<h3>Notes</h3><p>${report.notes}</p>`;

    const details = document.getElementById("reportDetails");
    details.innerHTML = html;
};
