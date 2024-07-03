export const mockSavedDestinations: Destination[] = [
  {
    id: 1,
    name: "London",
    imageUrl:
      "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?cs=srgb&dl=pexels-chaitaastic-1796715.jpg&fm=jpg",
  },
  {
    id: 2,
    name: "Paris",
    imageUrl:
      "https://media.istockphoto.com/id/1345426734/photo/eiffel-tower-paris-river-seine-sunset-twilight-france.jpg?s=612x612&w=0&k=20&c=I5rAH5d_-Yyag8F0CKzk9vzMr_1rgkAASGTE11YMh9A=",
  },
  {
    id: 3,
    name: "Copenhagen",
    imageUrl:
      "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTQW9FJ9SOlLVBh63qIu44wq8bGxwW3nw4KstMS9TKiixQa3fL2KFiQGCS7UUlBe8h1eq4TN8ZHTcC-aTSr83OjAGKdzt8xNZPXtgscdl0",
  },
];

export type Destination = {
  id: number;
  name: string;
  imageUrl: string;
  upvotes?: number;
};

export type Trip = {
  id: number;
  tripName: string;
  tripDestinations: Destination[];
};

export const starterTripMockedData: Trip[] = [
  {
    id: 0,
    tripName: "Demo Trip 1",
    tripDestinations: mockSavedDestinations.map((d) => ({ ...d, upvotes: 0 })),
  },
];
