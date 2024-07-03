import type { Destination } from "@/lib/mock-saved-location-data";
import { CircleArrowUp, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

// Functions as a draggable card for destinations as well as a card to show trip destinations with a richer feature-set
export default function DestinationCard({
  destinationData,
  handleUpvote,
  handleRemoveDestination,
}: {
  destinationData: Destination;
  handleUpvote?: (destId: number) => void;
  handleRemoveDestination?: (destId: number) => void;
}) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(destinationData));
  };

  const { imageUrl, name, id, upvotes } = destinationData;
  const isUpvoteDisabled = upvotes === 1;

  return (
    <div
      className={"rounded-lg border bg-card text-card-foreground shadow-sm"}
      draggable={upvotes === undefined}
      onDragStart={handleDragStart}
    >
      <div
        className={"flex h-48 items-start rounded-t-lg"}
        style={{
          background: `#ffffff ${imageUrl ? `url(${imageUrl})` : ""} center center/cover no-repeat`,
        }}
      />

      <div>
        <div className={"flex flex-col space-y-3.5 p-6"}>
          <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>
            {name}
          </h3>

          {upvotes !== undefined ? (
            <>
              <Button
                variant={isUpvoteDisabled ? "default" : "secondary"}
                onClick={() => handleUpvote!(id)}
              >
                <CircleArrowUp className="mr-2 h-4 w-4" /> Upvotes: {upvotes}
              </Button>

              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => handleRemoveDestination!(id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
