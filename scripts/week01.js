// current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// last modified
const modified = new Date(document.lastModified);
const formatted = modified.toLocaleString();
document.getElementById("lastModified").textContent = formatted;

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("show");
  }
});

// STEP 5: Mark completed courses
courses.forEach(course => {
  const code = `${course.subject} ${course.number}`;
  if (["WDD 130", "WDD 131"].includes(code)) {
    course.completed = true;
  }
});

// STEP 6–9: Dynamic course display & filter
const courseList = document.querySelector('.course-list');
const creditSummary = document.querySelector('.credits-summary');

// Create course card
function createCourseCard(course) {
  const div = document.createElement('div');
  div.classList.add('course-box');
  if (course.completed) div.classList.add('completed');
  div.innerHTML = `
    <strong>${course.subject} ${course.number}</strong>: ${course.title}<br>
    <em>${course.credits} credits</em>
  `;
  return div;
}

// ✅ ✅ ✅ This is the function you forgot:
function displayCourses(coursesToShow) {
  courseList.innerHTML = ''; // Clear previous courses
  let totalCompletedCredits = 0;

  coursesToShow.forEach(course => {
    const card = createCourseCard(course);
    courseList.appendChild(card);

    if (course.completed) {
      totalCompletedCredits += course.credits;
    }
  });

  creditSummary.textContent = `Credits Completed: ${totalCompletedCredits}`;
}

// Initial load - show all
displayCourses(courses);

// STEP 7: Filter buttons
document.querySelectorAll('.course-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const type = button.textContent;
    let filtered = [];

    if (type === "All") filtered = courses;
    else filtered = courses.filter(course => course.subject === type);

    displayCourses(filtered);
  });
});
