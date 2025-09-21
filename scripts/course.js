// Course data
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development...',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers...',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects...',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students will learn to create dynamic websites that use JavaScript...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students will focus on user experience, accessibility, compliance...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

// DOM elements
const courseCards = document.getElementById("courseCards");
const creditTotal = document.getElementById("creditTotal");

// Render function
function renderCourses(filterFn = () => true) {
  const filtered = courses.filter(filterFn);
  courseCards.innerHTML = "";
  let totalCredits = 0;

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = course.completed ? "course completed" : "course pending";

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p><strong>${course.title}</strong></p>
      <p>${course.description}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `;

    courseCards.appendChild(card);
    totalCredits += course.credits;
  });

  creditTotal.textContent = totalCredits;
}

// Filter buttons
document.getElementById("allBtn").addEventListener("click", () => renderCourses());
document.getElementById("wddBtn").addEventListener("click", () => renderCourses(c => c.subject === "WDD"));
document.getElementById("cseBtn").addEventListener("click", () => renderCourses(c => c.subject === "CSE"));

// Initial render
renderCourses();
