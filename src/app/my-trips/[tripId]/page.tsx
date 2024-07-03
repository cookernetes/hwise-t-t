"use client";

import TH1 from "@/components/typography-h1";
import { useLocalStorage } from "@mantine/hooks";
import {
  Destination,
  mockSavedDestinations,
  starterTripMockedData,
  Trip,
} from "@/lib/mock-saved-location-data";
import React from "react";
import DestinationCard from "@/components/destination-card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function DynamicTripPage({
  params: { tripId },
}: {
  params: { tripId: string };
}) {
  const [trips, setTrips] = useLocalStorage<Trip[]>({
    key: "tripsData",
    defaultValue: starterTripMockedData,
  });

  const tripData = trips.find((t) => t.id === Number(tripId))!;

  const handleUpvote = (destId: number) => {
    console.log(trips);

    const updatedTripDestinationsData: Destination[] =
      tripData.tripDestinations.map((td) =>
        td.id === destId ? { ...td, upvotes: td.upvotes! == 0 ? 1 : 0 } : td,
      );

    const newTrips: Trip[] = trips.map((t) =>
      t.id === Number(tripId)
        ? { ...t, tripDestinations: updatedTripDestinationsData }
        : t,
    );

    setTrips(newTrips);
  };

  const handleRemoveDestination = (destId: number) => {
    // Handle removing the destination just like how the above function handles upvoting
    const newTrips: Trip[] = trips.map((t) => {
      if (t.id === Number(tripId)) {
        return {
          ...t,
          tripDestinations: t.tripDestinations.filter((td) => td.id !== destId),
        };
      }

      return t;
    });

    setTrips(newTrips);
  };

  return (
    <main>
      <TH1 className={"mb-3"}>Your Trip - {tripData?.tripName}</TH1>

      {tripData && tripData.tripDestinations.length > 0 ? (
        <div className={"grid grid-cols-3 gap-4"}>
          {tripData?.tripDestinations
            .sort((a, b) => b.upvotes! - a.upvotes!)
            .map((d) => (
              <DestinationCard
                destinationData={d}
                key={d.id}
                handleUpvote={handleUpvote}
                handleRemoveDestination={handleRemoveDestination}
              />
            ))}
        </div>
      ) : (
        <p className={"text-muted-foreground"}>
          No destinations added yet! Go back to the{" "}
          <Link
            href={"/my-trips"}
            className={"text-primary underline underline-offset-4"}
          >
            My Trips
          </Link>{" "}
          page to add some to this trip.
        </p>
      )}
    </main>
  );
}
