"use client";
import { useEffect, useState } from "react";

export const teacher = {
  name: "Dr. Meera Nair",
  initials: "MN",
  dept: "Computer Science",
  email: "meera.nair@campus.edu",
  subjects: ["Full Stack Development", "Web Technologies"],
  courseIds: [1, 3],
};

export function useRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role") || "student");
  }, []);

  return role;
}

export function saveRole(role) {
  localStorage.setItem("role", role);
}

export function clearRole() {
  localStorage.removeItem("role");
}