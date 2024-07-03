"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className={"mb-2 flex items-center"}>
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
