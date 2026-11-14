export default function Badge({ value }) {
  return <span className={`badge ${value.toLowerCase()}`}>{value}</span>;
}
