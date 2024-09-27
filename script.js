let workshops = [];
let workers = [];
let workRecords = [];

function addWorkshop() {
    const workshopName = document.getElementById('workshop-name').value;
    if (workshopName) {
        workshops.push({ name: workshopName });
        document.getElementById('workshop-name').value = '';
        updateWorkshopSelect();
    }
}

function addWorker() {
    const workerName = document.getElementById('worker-name').value;
    const dailySalary = document.getElementById('daily-salary').value;

    if (workerName && dailySalary) {
        workers.push({
            name: workerName,
            dailySalary: parseFloat(dailySalary)
        });
        document.getElementById('worker-name').value = '';
        document.getElementById('daily-salary').value = '';
        updateWorkerSelect();
    }
}

function addWorkRecord() {
    const workerSelect = document.getElementById('worker-select');
    const workerIndex = workerSelect.selectedIndex - 1;
    const workshopSelect = document.getElementById('workshop-select');
    const workshopIndex = workshopSelect.selectedIndex - 1;
    const daysWorked = document.getElementById('days-worked').value;
    const bonusPenalty = document.getElementById('bonus-penalty').value;

    if (workerIndex >= 0 && workshopIndex >= 0 && daysWorked) {
        workRecords.push({
            worker: workers[workerIndex],
            workshop: workshops[workshopIndex],
            daysWorked: parseInt(daysWorked),
            bonusPenalty: parseFloat(bonusPenalty)
        });
        document.getElementById('days-worked').value = '';
        document.getElementById('bonus-penalty').value = '';
        updateRecordsTable();
    }
}

function updateWorkshopSelect() {
    const workshopSelect = document.getElementById('workshop-select');
    workshopSelect.innerHTML = '<option value="">انتخاب کارگاه</option>';
    workshops.forEach((workshop, index) => {
        workshopSelect.innerHTML += `<option value="${index}">${workshop.name}</option>`;
    });
}

function updateWorkerSelect() {
    const workerSelect = document.getElementById('worker-select');
    workerSelect.innerHTML = '<option value="">انتخاب کارگر</option>';
    workers.forEach((worker, index) => {
        workerSelect.innerHTML += `<option value="${index}">${worker.name}</option>`;
    });
}

// function updateRecordsTable() {
//     const tableBody = document.getElementById('records-table').getElementsByTagName('tbody')[0];
//     tableBody.innerHTML = '';
//     workRecords.forEach(record => {
//         const row = tableBody.insertRow();
//         row.insertCell(0).innerText = record.worker.name;
//         row.insertCell(1).innerText = record.workshop.name;
//         row.insertCell(2).innerText = record.daysWorked;
//         row.insertCell(3).innerText = record.bonusPenalty;
    // });
// }
function updateRecordsTable() {
    const tableBody = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    const workerTotals = {}; // برای جمع‌آوری اطلاعات

    workRecords.forEach(record => {
        const workerName = record.worker.name;
        const dailySalary = record.worker.dailySalary;
        
        // محاسبه جمع تعداد روز کارکرد برای هر کارگر
        if (!workerTotals[workerName]) {
            workerTotals[workerName] = {
                totalDaysWorked: 0,
                totalSalary: 0
            };
        }

        workerTotals[workerName].totalDaysWorked += record.daysWorked;
        workerTotals[workerName].totalSalary += (record.daysWorked * dailySalary) + record.bonusPenalty;

        // اضافه کردن رکورد به جدول
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = workerName;
        row.insertCell(1).innerText = record.workshop.name;
        row.insertCell(2).innerText = record.daysWorked;
        row.insertCell(3).innerText = record.bonusPenalty;
        row.insertCell(4).innerText = workerTotals[workerName].totalDaysWorked; // جمع تعداد روز کارکرد
        row.insertCell(5).innerText = workerTotals[workerName].totalSalary; // دستمزد کل هفته
    });
}
function updateRecordsTable() {
    const tableBody = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    const workerTotals = {}; // برای جمع‌آوری اطلاعات

    workRecords.forEach(record => {
        const workerName = record.worker.name;
        const dailySalary = record.worker.dailySalary;

        // محاسبه جمع تعداد روز کارکرد برای هر کارگر
        if (!workerTotals[workerName]) {
            workerTotals[workerName] = {
                totalDaysWorked: 0,
                totalSalary: 0
            };
        }

        workerTotals[workerName].totalDaysWorked += record.daysWorked;
        workerTotals[workerName].totalSalary += (record.daysWorked * dailySalary) + record.bonusPenalty;

        // اضافه کردن رکورد به جدول
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = workerName;
        row.insertCell(1).innerText = record.workshop.name;
        row.insertCell(2).innerText = dailySalary; // دستمزد روزانه
        row.insertCell(3).innerText = record.daysWorked;
        row.insertCell(4).innerText = record.bonusPenalty;
        row.insertCell(5).innerText = workerTotals[workerName].totalDaysWorked; // جمع تعداد روز کارکرد
        row.insertCell(6).innerText = workerTotals[workerName].totalSalary; // دستمزد کل هفته
    });
}

// تابع فیلتر کردن رکوردها
function filterRecords() {
    const filterInput = document.getElementById('filter-input').value.toLowerCase();
    const tableBody = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const workerName = cells[0].innerText.toLowerCase();
        
        if (workerName.indexOf(filterInput) > -1) {
            rows[i].style.display = ''; // نمایش ردیف
        } else {
            rows[i].style.display = 'none'; // پنهان کردن ردیف
        }
    }
}
function filterRecords() {
    const workerFilter = document.getElementById('worker-filter').value.toLowerCase();
    const workshopFilter = document.getElementById('workshop-filter').value.toLowerCase();
    const tableBody = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const workerName = cells[0].innerText.toLowerCase();
        const workshopName = cells[1].innerText.toLowerCase();

        const isWorkerMatch = workerName.indexOf(workerFilter) > -1;
        const isWorkshopMatch = workshopName.indexOf(workshopFilter) > -1;

        // نمایش ردیف تنها در صورتی که هر دو فیلتر برقرار باشند
        if (isWorkerMatch && isWorkshopMatch) {
            rows[i].style.display = ''; // نمایش ردیف
        } else {
            rows[i].style.display = 'none'; // پنهان کردن ردیف
        }
    }
}
