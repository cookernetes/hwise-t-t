"use client";

import {
  Destination,
  mockSavedDestinations,
  starterTripMockedData,
  type Trip,
} from "@/lib/mock-saved-location-data";

import TH1 from "@/components/typography-h1";
import TripCard from "@/components/trip-card";
import NewTripButton from "@/components/new-trip-button";
import { useLocalStorage } from "@mantine/hooks";
import DestinationCard from "@/components/destination-card";
import { useToast } from "@/components/ui/use-toast";

export default function MyTripsPage() {
  const { toast } = useToast();

  const [trips, setTrips] = useLocalStorage<Trip[]>({
    key: "tripsData",
    defaultValue: starterTripMockedData,
  });

  const [savedDestinations] = useLocalStorage<Destination[]>({
    key: "savedDestinationsData",
    defaultValue: mockSavedDestinations,
  });

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    droppedUponTripId: number,
  ) => {
    e.preventDefault();

    const data = JSON.parse(
      e.dataTransfer.getData("text/plain"),
    ) as Destination;

    // If data is already in the trip which it is being dropped upon, show a toast
    if (
      trips
        .find((t) => t.id === droppedUponTripId)
        ?.tripDestinations.some((d) => d.id === data.id)
    ) {
      toast({
        variant: "destructive",
        title: "Oh, silly! That would be a duplicate destination!",
        description:
          "This destination has been already added to this location.",
        duration: 2000,
      });

      return;
    }

    // Add the destination to the trip it was dropped upon
    const newTrips = trips.map((t) => {
      if (t.id === droppedUponTripId) {
        return {
          ...t,
          tripDestinations: [...t.tripDestinations, { ...data, upvotes: 0 }],
        };
      }

      return t;
    });

    setTrips(newTrips);
  };

  const handleNewTrip = (tripName: string) => {
    const newTrip: Trip = {
      id: trips.length + 1,
      tripName,
      tripDestinations: [],
    };

    setTrips([...trips, newTrip]);
  };

  return (
    <main>
      <TH1 className={"mb-3"}>Trips</TH1>

      {/* Trips */}
      <div className={"mb-8 space-y-3"}>
        <div className={"flex w-full items-center"}>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            My Saved Trips
          </h3>
          <NewTripButton className={"ml-auto"} onNewTrip={handleNewTrip} />
        </div>

        <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"}>
          {trips.map((t) => (
            <TripCard
              tripData={t}
              key={t.id}
              onDrop={(e) => handleDrop(e, t.id)}
            />
          ))}
        </div>
      </div>

      {/* Saved Destinations */}
      <div className={"space-y-3"}>
        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            My Saved Destinations
          </h3>
          <p className="text-sm text-muted-foreground">
            To add a destination to a trip, simply drag and drop it on desktop -
            or tap+hold then drop on mobile!
          </p>
        </div>

        <div className={"grid grid-cols-2 gap-4 sm:grid-cols-3"}>
          {savedDestinations.map((d) => (
            <DestinationCard destinationData={d} key={d.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
