// Footer date info
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString();

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

// DOM targets
const courseList = document.querySelector('.course-list');
const creditSummary = document.querySelector('.credits-summary');

// Render function
function displayCourses(courseArray) {
  courseList.innerHTML = '';

  courseArray.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course-box');
    if (course.completed) div.classList.add('completed');
    div.innerHTML = `
      <strong>${course.subject} ${course.number}</strong>: ${course.title}<br>
      <em>${course.credits} credits</em>
    `;
    courseList.appendChild(div);
  });

  // Use reduce to calculate total credits shown
  const total = courseArray.reduce((sum, course) => {
    return course.completed ? sum + course.credits : sum;
  }, 0);

  creditSummary.textContent = `Credits Completed: ${total}`;
}

// Initial render
displayCourses(courses);

// Filter buttons with addEventListener
document.getElementById('allBtn').addEventListener('click', () => {
  displayCourses(courses);
});

document.getElementById('wddBtn').addEventListener('click', () => {
  const filtered = courses.filter(course => course.subject === 'WDD');
  displayCourses(filtered);
});

document.getElementById('cseBtn').addEventListener('click', () => {
  const filtered = courses.filter(course => course.subject === 'CSE');
  displayCourses(filtered);
});
