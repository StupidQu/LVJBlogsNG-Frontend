// convert a timestamp to a date string
export default function ts2s(ts: number): string {
  return new Date(ts).toLocaleString();
}