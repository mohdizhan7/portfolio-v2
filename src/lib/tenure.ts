/**
 * Computes a human-readable tenure string ("2 yr 7 mo", "8 mo", "2 yr")
 * from a start date to an end date (defaults to now). Used for roles that
 * are still ongoing, so the displayed duration never needs a manual edit.
 */
export function formatTenure(start: Date, end: Date = new Date()): string {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (end.getDate() < start.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr`);
  if (months > 0) parts.push(`${months} mo`);
  if (parts.length === 0) parts.push('0 mo');

  return parts.join(' ');
}
