// =============================
// LOAD DATA FROM LOCAL STORAGE
// =============================

let employees =
JSON.parse(localStorage.getItem("employees")) || []


// =============================
// GET HTML ELEMENTS
// =============================

const tableBody =
document.querySelector("#employeeTable tbody")

const form =
document.getElementById("employeeForm")

const addBtn =
document.getElementById("addEmployeeBtn")

const formCard =
document.getElementById("employeeFormCard")

const totalEmployees =
document.getElementById("totalEmployees")

const attendanceBody =
document.querySelector("#attendanceTable tbody")


// =============================
// RENDER EMPLOYEES TABLE
// =============================

function renderEmployees(){

tableBody.innerHTML=""

employees.forEach(emp=>{

const row=document.createElement("tr")

row.innerHTML=`

<td>${emp.name}</td>
<td>${emp.department}</td>
<td>${emp.email}</td>

<td>
<button class="danger-button"
onclick="deleteEmployee(${emp.id})">
Delete
</button>
</td>

`

tableBody.appendChild(row)

})

updateDashboard()

renderAttendance()

}


// =============================
// DELETE EMPLOYEE
// =============================

function deleteEmployee(id){

employees = employees.filter(emp=>emp.id!==id)

localStorage.setItem(
"employees",
JSON.stringify(employees)
)

renderEmployees()

}


// =============================
// SHOW / HIDE ADD FORM
// =============================

addBtn.addEventListener("click",()=>{

if(formCard.hasAttribute("hidden")){

formCard.removeAttribute("hidden")

addBtn.textContent="Hide Form"

}
else{

formCard.setAttribute("hidden","")

addBtn.textContent="Add Employee"

}

})


// =============================
// ADD NEW EMPLOYEE
// =============================

form.addEventListener("submit",(e)=>{

e.preventDefault()

const data = new FormData(form)

const employee = {

id:Date.now(),

name:data.get("name"),
department:data.get("department"),
email:data.get("email")

}

employees.push(employee)

localStorage.setItem(
"employees",
JSON.stringify(employees)
)

form.reset()

formCard.setAttribute("hidden","")

addBtn.textContent="Add Employee"

renderEmployees()

})


// =============================
// UPDATE DASHBOARD KPI
// =============================

function updateDashboard(){

if(totalEmployees){

totalEmployees.textContent = employees.length

}

}


// =============================
// INITIAL LOAD
// =============================

renderEmployees()

/// =======================
// SHOW LEAVE REQUESTS
// =======================

function renderLeaves(){

const leaves =
JSON.parse(localStorage.getItem("leaves")) || [];

const tbody =
document.querySelector("#leaveTable tbody");

if(!tbody) return;

tbody.innerHTML = "";

leaves.forEach(leave => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${leave.employee}</td>
<td>${leave.type}</td>
<td>${leave.startDate}</td>
<td>${leave.endDate}</td>

<td>
<span class="status ${leave.status.toLowerCase()}">
${leave.status}
</span>
</td>

<td>
<button class="primary-button"
onclick="approveLeave(${leave.id})">
Approve
</button>

<button class="danger-button"
onclick="rejectLeave(${leave.id})">
Reject
</button>
</td>
`;

tbody.appendChild(row);

});

}


// =======================
// APPROVE LEAVE
// =======================

function approveLeave(id){

let leaves =
JSON.parse(localStorage.getItem("leaves")) || [];

leaves = leaves.map(l => {
if(l.id === id){ l.status = "Approved"; }
return l;
});

localStorage.setItem("leaves", JSON.stringify(leaves));

renderLeaves();

}


// =======================
// REJECT LEAVE
// =======================

function rejectLeave(id){

let leaves =
JSON.parse(localStorage.getItem("leaves")) || [];

leaves = leaves.map(l => {
if(l.id === id){ l.status = "Rejected"; }
return l;
});

localStorage.setItem("leaves", JSON.stringify(leaves));

renderLeaves();

}


// load leave requests when page opens
renderLeaves();


// =======================
// SHOW ATTENDANCE LOG
// =======================

function renderAttendance(){

if(!attendanceBody) return;

const records =
JSON.parse(localStorage.getItem("attendance")) || [];

attendanceBody.innerHTML = "";

if(records.length === 0){

const row = document.createElement("tr");
row.innerHTML = "<td colspan=\"4\">No attendance records yet</td>";
attendanceBody.appendChild(row);
return;

}

records.forEach(rec => {

const match =
employees.find(e => e.id === rec.employeeId);

const name =
match ? match.name :
(rec.employeeName || (rec.employeeId ? `Employee #${rec.employeeId}` : "Employee"));

const row = document.createElement("tr");

row.innerHTML = `
<td>${name}</td>
<td>${rec.date || ""}</td>
<td>${rec.checkIn || ""}</td>
<td>${rec.checkOut || ""}</td>
`;

attendanceBody.appendChild(row);

});

}

renderAttendance();

// =======================
// MOBILE SIDEBAR TOGGLE
// =======================

const sidebar = document.querySelector(".sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarClose = document.getElementById("sidebarClose");
const mobileQuery = window.matchMedia("(max-width: 768px)");

function openSidebar(){
if(!sidebar) return;
sidebar.classList.add("open");
document.body.classList.add("sidebar-open");
if(menuToggle){
menuToggle.setAttribute("aria-expanded","true");
}
}

function closeSidebar(){
if(!sidebar) return;
sidebar.classList.remove("open");
document.body.classList.remove("sidebar-open");
if(menuToggle){
menuToggle.setAttribute("aria-expanded","false");
}
}

if(menuToggle){
menuToggle.addEventListener("click",()=>{
if(sidebar && sidebar.classList.contains("open")){
closeSidebar();
}
else{
openSidebar();
}
});
}

if(sidebarClose){
sidebarClose.addEventListener("click", closeSidebar);
}

document.querySelectorAll(".nav-link").forEach(link=>{
link.addEventListener("click",()=>{
if(mobileQuery.matches){
closeSidebar();
}
});
});

if(mobileQuery.matches){
closeSidebar();
}

mobileQuery.addEventListener("change",(e)=>{
if(!e.matches){
document.body.classList.remove("sidebar-open");
}
else{
closeSidebar();
}
});
