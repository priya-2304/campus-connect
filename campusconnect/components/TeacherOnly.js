"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/lib/role";

export default function TeacherOnly({ children }) {
  const role = useRole();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "teacher") {
      router.replace("/profile");
    }
  }, [role, router]);

  if (role !== "teacher") return null;

  return children;
}