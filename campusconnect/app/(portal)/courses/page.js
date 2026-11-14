"use client";
import Link from "next/link";
import { courses, students } from "@/lib/data";
import { useRole, teacher } from "@/lib/role";

export default function Courses() {
  const role = useRole();
  if (!role) return null;

  const isTeacher = role === "teacher";
  const list = isTeacher ? courses.filter((c) => teacher.courseIds.includes(c.id)) : courses;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{isTeacher ? "My courses" : "Courses"}</h1>
          <p>
            {isTeacher
              ? `You are teaching ${list.length} courses this semester`
              : "All the courses you are enrolled in"}
          </p>
        </div>
      </div>

      <div className="grid3">
        {list.map((c) => {
          const enrolled = students.filter((s) => s.courseIds.includes(c.id)).length;
          return (
            <div className="card" key={c.id}>
              <h3>{c.name}</h3>
              <p className="muted">
                {isTeacher ? `${enrolled} students enrolled` : c.faculty} · {c.credits} credits
              </p>
              <div className="bar"><i style={{ width: `${c.progress}%` }} /></div>
              <p className="muted small-t">
                {c.progress}% {isTeacher ? "syllabus covered" : "complete"}
              </p>
              <Link href={`/courses/${c.id}`} className="btn small">View course</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}