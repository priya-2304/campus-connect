export const courses = [
  { id: 1, name: "Full Stack Development", code: "CS3503", faculty: "Dr. Meera Nair", credits: 4, progress: 72, desc: "Build complete web apps with Next.js, APIs and databases." },
  { id: 2, name: "Database Systems", code: "CS3102", faculty: "Prof. Arjun Rao", credits: 4, progress: 85, desc: "Relational modelling, SQL, indexing and transactions." },
  { id: 3, name: "Web Technologies", code: "CS3201", faculty: "Dr. Meera Nair", credits: 3, progress: 60, desc: "HTML, CSS, JavaScript and responsive interface design." },
  { id: 4, name: "Software Engineering", code: "CS3305", faculty: "Prof. Rohit Sharma", credits: 3, progress: 90, desc: "Requirements, design patterns, testing and agile teams." },
  { id: 5, name: "Operating Systems", code: "CS3004", faculty: "Dr. Sana Khan", credits: 4, progress: 45, desc: "Processes, memory, scheduling and file systems." },
  { id: 6, name: "Computer Networks", code: "CS3407", faculty: "Prof. Vikram Singh", credits: 3, progress: 55, desc: "Layered models, routing, TCP/IP and network security." },
];

export const students = [
  { id: 1, name: "Aarav Mehta", dept: "Computer Science", year: 3, email: "aarav.mehta@campus.edu", skills: ["React", "Node.js", "SQL"], courseIds: [1, 2, 3, 4, 5, 6], attendance: 87 },
  { id: 2, name: "Diya Sharma", dept: "Information Technology", year: 3, email: "diya.sharma@campus.edu", skills: ["UI Design", "Figma", "CSS"], courseIds: [3, 4], attendance: 87 },
  { id: 3, name: "Rohan Verma", dept: "Electronics", year: 2, email: "rohan.verma@campus.edu", skills: ["C", "Embedded", "Python"], courseIds: [5, 6], attendance: 78 },
  { id: 4, name: "Ishita Gupta", dept: "Computer Science", year: 4, email: "ishita.gupta@campus.edu", skills: ["Machine Learning", "Python", "Pandas"], courseIds: [1, 2, 4], attendance: 94 },
  { id: 5, name: "Kabir Singh", dept: "Mechanical", year: 2, email: "kabir.singh@campus.edu", skills: ["CAD", "MATLAB"], courseIds: [5], attendance: 72 },
  { id: 6, name: "Meera Joshi", dept: "Information Technology", year: 4, email: "meera.joshi@campus.edu", skills: ["Java", "Spring", "Docker"], courseIds: [1, 4, 6], attendance: 89 },
];

export const departments = [...new Set(students.map((s) => s.dept))];

export const assignments = [
  { id: 1, title: "React Project", course: "Full Stack Development", due: "10 Nov 2026", status: "Pending", priority: "High" },
  { id: 2, title: "Database Design", course: "Database Systems", due: "08 Nov 2026", status: "Submitted", priority: "Medium" },
  { id: 3, title: "UI Design Task", course: "Web Technologies", due: "05 Nov 2026", status: "Pending", priority: "Low" },
  { id: 4, title: "Final Project Proposal", course: "Software Engineering", due: "01 Nov 2026", status: "Completed", priority: "Low", marks: "18/20" },
  { id: 5, title: "Process Scheduling Lab", course: "Operating Systems", due: "18 Nov 2026", status: "Pending", priority: "Medium" },
];

export const activities = [
  "Submitted Database Design",
  "Attended Full Stack Development lecture",
  "New assignment posted in Web Technologies",
  "Course progress updated in Software Engineering",
];

export const initials = (n) => n.split(" ").map((w) => w[0]).join("");


export const attendanceClass = (v) => (v < 70 ? "bar bad" : v < 80 ? "bar warn" : "bar");