import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//controle interno
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
