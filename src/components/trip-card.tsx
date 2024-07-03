import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Trip } from "@/lib/mock-saved-location-data";

// Functions as a dropzone for destinations to be added to a trip
export default function TripCard({
  tripData: { tripDestinations, id, tripName },
  onDrop,
}: {
  tripData: Trip;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={"rounded-lg border bg-card text-card-foreground shadow-sm"}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Link href={`/my-trips/${id}`}>
        <div
          className={"flex h-48 items-start rounded-t-lg"}
          style={{
            // background: `#ffffff url(${tripDestinations[0].imageUrl}) center center/cover no-repeat`,
            background: `#000000 ${
              tripDestinations.length > 0
                ? `url(${tripDestinations[0].imageUrl})`
                : ""
            } center center/cover no-repeat`,
          }}
        >
          <Badge className={"m-2 ml-auto"}>
            {tripDestinations.length} Added Destinations
          </Badge>
        </div>
      </Link>

      <div>
        <div className={"flex flex-col space-y-1.5 p-6"}>
          <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>
            {tripName}
          </h3>
          <p className={"text-sm text-muted-foreground"}>
            {tripDestinations.length > 0 ? (
              <>
                Including destinations such as:{" "}
                {tripDestinations
                  .slice(0, 3)
                  .map((d) => d.name)
                  .join(", ")}
                .
              </>
            ) : (
              <>
                No saved destinations have been added to this trip yet! Try
                adding one.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
