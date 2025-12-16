export function timeAgo(dateInput: string | number | Date) {
  let date = dateInput;
  if (typeof date === "string") {
    // If string is ISO format but missing timezone (naive), assume UTC
    if (date.includes("T") && !date.endsWith("Z") && !/[+-]\d{2}:?\d{2}$/.test(date)) {
      date = date + "Z";
    }
  }
  const targetDate = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (sec < 10) return "just now";
  if (sec < 60) return `${sec}s ago`;
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ${min % 60}m ago`;
  if (day < 30) return `${day}d ago`;
  if (month < 12) return `${month}mo ago`;
  return `${year}y ago`;
}

export function getHostname(url: string) {
   try {
      const urlObj = new URL(url);
      return urlObj.hostname
   } catch (error) {
      return "-";
   }
}
