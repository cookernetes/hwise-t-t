"use client";

import Link from "next/link";
import HoliwiseLogo from "@/components/holiwise-logo";

export default function Navbar() {
  return (
    <div className={"mb-5 flex items-center"}>
      <Link href={"/my-trips"}>
        <HoliwiseLogo className={"mr-4 h-12 w-12"} />
      </Link>
      <Link href={"/my-trips"}>My Trips</Link>
      <a
        onClick={(e) => {
          e.preventDefault();
          localStorage.clear();
          location.reload(); // Perform a full reload to put changes into effect
        }}
        className={"ml-auto cursor-pointer bg-amber-500 p-1 font-bold"}
      >
        Dev - Clear all Data
      </a>
    </div>
  );
}
