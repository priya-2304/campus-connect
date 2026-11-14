import { attendanceClass } from "@/lib/data";

export default function AttendanceBar({ value }) {
  return (
    <div className="mini-bar">
      <div className={attendanceClass(value)}>
        <i style={{ width: `${value}%` }} />
      </div>
      <span>{value}%</span>
    </div>
  );
}