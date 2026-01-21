// Load and display all reports on page load
window.onload = () => {
    displayReports(JSON.parse(localStorage.getItem("reports") || "[]"));
};

// Display reports in table
function displayReports(reports) {
    const tbody = document.querySelector("#reportsTable tbody");
    tbody.innerHTML = "";

    if(reports.length === 0){
        tbody.innerHTML = `<tr><td colspan="5">No reports found.</td></tr>`;
        return;
    }

    reports.forEach((report, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${report.reportNumber || "N/A"}</td>
            <td>${report.reportDateTime || "N/A"}</td>
            <td>${report.reportingOfficer || "N/A"}</td>
            <td>${report.reportType || "N/A"}</td>
            <td><button class="view-btn" onclick="viewReport(${index})">View</button></td>
        `;
        tbody.appendChild(tr);
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

// View full report in modal
function viewReport(index) {
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const report = reports[index];

    document.getElementById("fullReport").textContent = JSON.stringify(report, null, 2);
    document.getElementById("reportModal").classList.remove("hidden");
}

// Close modal
function closeModal() {
    document.getElementById("reportModal").classList.add("hidden");
}
