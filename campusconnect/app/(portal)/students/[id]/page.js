import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import StudentRecord from "@/components/StudentRecord";
import { students } from "@/lib/data";

export default async function StudentDetails({ params }) {
  const { id } = await params;
  const s = students.find((x) => x.id === Number(id));
  if (!s) notFound();

  return (
    <>
      <div className="page-head">
        <div>
          <Link href="/students" className="muted back">
            <FiArrowLeft /> Back to students
          </Link>
          <h1>Student record</h1>
        </div>
      </div>
      <StudentRecord student={s} />
    </>
  );
}