const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

const employeeId = 1; // demo employee

const checkInBtn = document.getElementById("checkIn");
const checkOutBtn = document.getElementById("checkOut");
const leaveForm = document.getElementById("leaveForm");
const leaveHistoryBody =
document.querySelector("#leaveHistoryTable tbody");


// =====================
// CHECK IN
// =====================

if(checkInBtn){
checkInBtn.onclick = () => {

attendance.push({
employeeId: employeeId,
date: new Date().toLocaleDateString(),
checkIn: new Date().toLocaleTimeString(),
checkOut: ""
});

localStorage.setItem("attendance", JSON.stringify(attendance));

alert("Checked In");

};
}


// =====================
// CHECK OUT
// =====================

if(checkOutBtn){
checkOutBtn.onclick = () => {

if(attendance.length === 0){
alert("Please check in first");
return;
}

const lastRecord = attendance[attendance.length - 1];

if(lastRecord.checkOut){
alert("Already checked out");
return;
}

lastRecord.checkOut = new Date().toLocaleTimeString();

localStorage.setItem("attendance", JSON.stringify(attendance));

alert("Checked Out");

};
}


// =====================
// LEAVE REQUEST
// =====================

if(leaveForm){
leaveForm.addEventListener("submit", e => {

e.preventDefault();

const data = new FormData(e.target);

leaves = JSON.parse(localStorage.getItem("leaves")) || [];

leaves.push({

id: Date.now(),

employee: data.get("employee"),

type: data.get("type"),

startDate: data.get("startDate"),

endDate: data.get("endDate"),

reason: data.get("reason"),

status: "Pending"

});

localStorage.setItem("leaves", JSON.stringify(leaves));

e.target.reset();

alert("Leave Requested");

renderLeaveHistory();

});
}


// =====================
// LEAVE HISTORY
// =====================

function renderLeaveHistory(){

if(!leaveHistoryBody) return;

leaves = JSON.parse(localStorage.getItem("leaves")) || [];

leaveHistoryBody.innerHTML = "";

if(leaves.length === 0){

const row = document.createElement("tr");
row.innerHTML = "<td colspan=\"5\">No leave requests yet</td>";
leaveHistoryBody.appendChild(row);
return;

}

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
`;

leaveHistoryBody.appendChild(row);

});

}

renderLeaveHistory();

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
