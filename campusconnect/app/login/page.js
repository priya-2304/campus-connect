"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import Logo from "@/components/Logo";
import { saveRole } from "@/lib/role";

const roleBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.4rem",
};

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [role, setRole] = useState("student");

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    if (!f.get("email").includes("@") || f.get("password").length < 6) {
      setErr("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    saveRole(role);
    router.push("/dashboard");
  }

  return (
    <div className="login">
      <form className="card" onSubmit={submit}>
        <div className="logo">
          <Logo />
        </div>
        <h2>Welcome back</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
          <button
            type="button"
            style={roleBtn}
            className={role === "student" ? "btn" : "btn ghost"}
            onClick={() => setRole("student")}
          >
            <FaUserGraduate /> Student
          </button>
          <button
            type="button"
            style={roleBtn}
            className={role === "teacher" ? "btn" : "btn ghost"}
            onClick={() => setRole("teacher")}
          >
            <FaChalkboardTeacher /> Teacher
          </button>
        </div>

        <label>
          Email
          <input name="email" type="email" placeholder="you@campus.edu" required />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="At least 6 characters" required />
        </label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn full">Log in as {role === "teacher" ? "Teacher" : "Student"}</button>
      </form>
    </div>
  );
}