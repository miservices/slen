// Load reports on page load
window.onload = () => {
    displayReports(JSON.parse(localStorage.getItem("reports") || "[]"));
};

function displayReports(reports) {
    const container = document.getElementById("reportCards");
    container.innerHTML = "";

    if (reports.length === 0) {
        container.innerHTML = "<p>No reports found.</p>";
        return;
    }

    reports.forEach((report, index) => {
        const card = document.createElement("div");
        card.classList.add("report-card");
        card.innerHTML = `
            <h3>${report.reportNumber || "N/A"}</h3>
            <p><strong>Type:</strong> ${report.reportType || "N/A"}</p>
            <p><strong>Officer:</strong> ${report.reportingOfficer || "N/A"}</p>
            <p><strong>Date:</strong> ${report.reportDateTime || "N/A"}</p>
        `;
        card.addEventListener("click", () => viewReport(index));
        container.appendChild(card);
    });
}

// Filter reports
function filterReports() {
    const number = document.getElementById("searchNumber").value.toLowerCase();
    const officer = document.getElementById("searchOfficer").value.toLowerCase();
    const type = document.getElementById("searchType").value;

    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const filtered = reports.filter(r => {
        return (
            (number === "" || (r.reportNumber && r.reportNumber.toLowerCase().includes(number))) &&
            (officer === "" || (r.reportingOfficer && r.reportingOfficer.toLowerCase().includes(officer))) &&
            (type === "" || r.reportType === type)
        );
    });

    displayReports(filtered);
}

// Reset filters
function resetFilters() {
    document.getElementById("searchNumber").value = "";
    document.getElementById("searchOfficer").value = "";
    document.getElementById("searchType").value = "";
    displayReports(JSON.parse(localStorage.getItem("reports") || "[]"));
}

// Show detailed report in modal
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
        if (names) {
            html += `<h3>${type.charAt(0).toUpperCase() + type.slice(1)}s</h3>`;
            if (Array.isArray(names)) {
                names.forEach((n, i) => {
                    html += `<p><strong>Name:</strong> ${n}, <strong>DOB:</strong> ${report[`${type}DOB[]`][i] || ''}</p>`;
                });
            } else {
                html += `<p><strong>Name:</strong> ${names}, <strong>DOB:</strong> ${report[`${type}DOB[]`] || ''}</p>`;
            }
        }
    });

    // Narrative & Notes
    if(report.narrative) html += `<h3>Narrative</h3><p>${report.narrative}</p>`;
    if(report.notes) html += `<h3>Notes</h3><p>${report.notes}</p>`;

    document.getElementById("reportDetails").innerHTML = html;
    document.getElementById("reportModal").classList.remove("hidden");
}

// Close modal
function closeModal() {
    document.getElementById("reportModal").classList.add("hidden");
}
