import Link from "next/link";
import { FiBook, FiClipboard, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import Logo from "@/components/Logo";

const features = [
  [FiBook, "Courses", "Track progress, faculty and credits for every course."],
  [FiClipboard, "Assignments", "See what is due and submit work in one place."],
  [FiUsers, "Students", "Find classmates by department and view their profiles."],
];

export default function Home() {
  return (
    <div className="land">
      <header className="land-top">
        <span className="logo">
          <Logo />
        </span>
        <Link href="/login" className="btn">Log in</Link>
      </header>

      <section className="hero land-hero">
        <div>
          <h1>Everything about your campus life, in one portal</h1>
          <p>Check courses, deadlines and attendance, and stay connected with your department.</p>
          <Link href="/login" className="btn">Get started</Link>
        </div>
        <div className="art" aria-hidden style={{ color: "var(--blue)" }}>
          <FaGraduationCap />
        </div>
      </section>

      <section className="grid3 wrap">
        {features.map(([Icon, title, text]) => (
          <div className="card" key={title}>
            <div style={{ fontSize: "1.8rem", color: "var(--blue)" }}>
              <Icon />
            </div>
            <h3>{title}</h3>
            <p className="muted">{text}</p>
          </div>
        ))}
      </section>

      <footer>© 2026 CampusConnect. All rights reserved.</footer>
    </div>
  );
}