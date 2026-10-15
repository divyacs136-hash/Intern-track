const form = document.getElementById("internshipForm");
const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const deadlineInput = document.getElementById("deadline");
const statusInput = document.getElementById("status");
const internshipList = document.getElementById("internshipList");
const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");

let internships = JSON.parse(
  localStorage.getItem("internships")
) || [];

function displayInternships() {
  internshipList.innerHTML = "";

  if (internships.length === 0) {
    internshipList.textContent =
      "No internships added yet. Start by adding one!";
  }

  internships.forEach(function (internship, index) {
    const card = document.createElement("div");
    card.style.cssText =
      "border:1px solid #cbd5e1;padding:16px;margin:12px 0;border-radius:10px;background:#f8fafc";

    const company = document.createElement("h3");
    company.textContent = internship.company;

    const role = document.createElement("p");
    role.textContent = "Role: " + internship.role;

    const deadline = document.createElement("p");
    deadline.textContent = "Deadline: " + internship.deadline;

    const status = document.createElement("p");
    status.textContent = "Status: " + internship.status;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.background = "#dc2626";

    deleteButton.addEventListener("click", function () {
      internships.splice(index, 1);
      displayInternships();
    });

    card.append(company, role, deadline, status, deleteButton);
    internshipList.appendChild(card);
  });

  totalCount.textContent = internships.length;

  interviewCount.textContent = internships.filter(function (item) {
    return item.status === "Interview";
  }).length;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const internship = {
    company: companyInput.value.trim(),
    role: roleInput.value.trim(),
    deadline: deadlineInput.value,
    status: statusInput.value
  };

  internships.push(internship);
  localStorage.setItem(
  "internships",
  JSON.stringify(internships)
);

  displayInternships();
  form.reset();
});