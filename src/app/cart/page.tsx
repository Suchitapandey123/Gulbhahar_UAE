import { redirect } from "next/navigation";

export default function Page() {
  redirect("/"); // redirects to homepage
  return null;
}