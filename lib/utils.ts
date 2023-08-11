import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function secondsToDaysAndHours(seconds: number): string {
  // Constants
  const SECONDS_IN_AN_HOUR = 3600;
  const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR;

  // Calculate days and hours
  const days = Math.floor(seconds / SECONDS_IN_A_DAY);
  const remainingSeconds = seconds % SECONDS_IN_A_DAY;
  const hours = Math.floor(remainingSeconds / SECONDS_IN_AN_HOUR);

  // Return the formatted result
  return `${days} days and ${hours} hours`;
}