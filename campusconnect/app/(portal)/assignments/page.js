"use client";
import { useState } from "react";
import Badge from "@/components/Badge";
import { assignments as initial } from "@/lib/data";
import { useRole } from "@/lib/role";

const tabs = ["All", "Pending", "Submitted", "Completed"];

export default function Assignments() {
  const role = useRole();
  const [list, setList] = useState(initial);
  const [tab, setTab] = useState("All");

  if (!role) return null;
  const isTeacher = role === "teacher";

  const count = (status) => list.filter((a) => a.status === status).length;
  const shown = tab === "All" ? list : list.filter((a) => a.status === tab);

  const tiles = isTeacher
    ? [
        [list.length, "Total assignments"],
        [count("Pending"), "Awaiting students"],
        [count("Submitted"), "To review"],
        [count("Completed"), "Reviewed"],
      ]
    : [
        [list.length, "Total assignments"],
        [count("Pending"), "Pending"],
        [count("Submitted"), "Submitted"],
        [count("Completed"), "Completed"],
      ];

  function changeStatus(id, status) {
    setList(list.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  function renderAction(a) {
    if (isTeacher) {
      if (a.status === "Submitted") {
        return (
          <button className="btn small" onClick={() => changeStatus(a.id, "Completed")}>
            Mark reviewed
          </button>
        );
      }
      return <span className="muted">{a.status === "Pending" ? "Awaiting students" : "Reviewed"}</span>;
    }

    if (a.status === "Pending") {
      return (
        <button className="btn small" onClick={() => changeStatus(a.id, "Submitted")}>
          Submit work
        </button>
      );
    }
    return <span className="muted">Done</span>;
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{isTeacher ? "Assignment management" : "Assignments"}</h1>
          <p>{isTeacher ? "Review the work your students have submitted" : "Track your deadlines and submit your work"}</p>
        </div>
      </div>

      <section className="summary">
        {tiles.map(([value, label]) => (
          <div className="tile" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
            {t} ({t === "All" ? list.length : count(t)})
          </button>
        ))}
      </div>

      <section className="card scroll">
        <table className="tbl">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Due date</th>
              <th>Status</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.course}</td>
                <td>{a.due}</td>
                <td><Badge value={a.status} /></td>
                <td>{a.marks || "—"}</td>
                <td>{renderAction(a)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length === 0 && <p className="muted">No assignments in this category.</p>}
      </section>
    </>
  );
}