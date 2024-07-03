import { redirect } from "next/navigation";

export default function HomePageRedirect() {
  return redirect("/my-trips");
}
