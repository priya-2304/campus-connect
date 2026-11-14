"use client";
import { useState } from "react";
import { useRole, teacher } from "@/lib/role";

export default function Settings() {
  const role = useRole();
  const [saved, setSaved] = useState(false);
  const [opts, setOpts] = useState({ email: true, deadlines: true, compact: false });

  if (!role) return null;

  const isTeacher = role === "teacher";
  const name = isTeacher ? teacher.name : "Aarav Mehta";
  const email = isTeacher ? teacher.email : "aarav.mehta@campus.edu";

  const labels = {
    email: "Email notifications",
    deadlines: isTeacher ? "Submission alerts" : "Deadline reminders",
    compact: "Compact layout",
  };

  function toggle(key) {
    setOpts({ ...opts, [key]: !opts[key] });
    setSaved(false);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p>Logged in as {isTeacher ? "Teacher" : "Student"}</p>
        </div>
      </div>

      <section className="card form">
        <label>
          Display name
          <input defaultValue={name} onChange={() => setSaved(false)} />
        </label>
        <label>
          Email
          <input type="email" defaultValue={email} onChange={() => setSaved(false)} />
        </label>

        {Object.keys(opts).map((key) => (
          <label className="check" key={key}>
            <input type="checkbox" checked={opts[key]} onChange={() => toggle(key)} />
            {labels[key]}
          </label>
        ))}

        <button className="btn" onClick={() => setSaved(true)}>Save changes</button>
        {saved && <p className="ok" role="status">Changes saved.</p>}
      </section>
    </>
  );
}