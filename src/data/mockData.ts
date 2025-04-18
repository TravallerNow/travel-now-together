
// Mock data for demonstration purposes

// Travellers who are in "travel now" mode
export const travellers = [
  {
    id: 1,
    name: "Alex Chen",
    age: 28,
    location: "San Francisco, CA",
    destination: "Tokyo, Japan",
    dates: "May 15 - June 2",
    interests: ["Photography", "Food", "Culture", "Nightlife"],
    image: "https://i.pravatar.cc/300?img=32",
    travelStyle: "Adventure",
  },
  {
    id: 2,
    name: "Mia Johnson",
    age: 25,
    location: "New York, NY",
    destination: "Barcelona, Spain",
    dates: "April 10 - April 20",
    interests: ["Beach", "Architecture", "Food", "Museums"],
    image: "https://i.pravatar.cc/300?img=26",
    travelStyle: "Cultural",
  },
  {
    id: 3,
    name: "Jake Wilson",
    age: 32,
    location: "Austin, TX",
    destination: "Bali, Indonesia",
    dates: "June 5 - June 25",
    interests: ["Surfing", "Yoga", "Nature", "Photography"],
    image: "https://i.pravatar.cc/300?img=59",
    travelStyle: "Relaxation",
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    age: 27,
    location: "Miami, FL",
    destination: "Paris, France",
    dates: "May 1 - May 12",
    interests: ["Fashion", "Art", "Cuisine", "Shopping"],
    image: "https://i.pravatar.cc/300?img=47",
    travelStyle: "Luxury",
  },
  {
    id: 5,
    name: "David Kim",
    age: 30,
    location: "Seattle, WA",
    destination: "Seoul, South Korea",
    dates: "July 10 - July 24",
    interests: ["Street Food", "Technology", "History", "Hiking"],
    image: "https://i.pravatar.cc/300?img=58",
    travelStyle: "Budget",
  },
  {
    id: 6,
    name: "Emma Thompson",
    age: 26,
    location: "Chicago, IL",
    destination: "Rome, Italy",
    dates: "June 15 - June 30",
    interests: ["History", "Food", "Art", "Architecture"],
    image: "https://i.pravatar.cc/300?img=29",
    travelStyle: "Cultural",
  },
];

// Trips that users can join
export const trips = [
  {
    id: 1,
    title: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9reW98ZW58MHx8MHx8fDA%3D",
    startDate: "May 15, 2025",
    duration: "2 weeks",
    travellers: {
      count: 5,
      images: [
        "https://i.pravatar.cc/300?img=32",
        "https://i.pravatar.cc/300?img=21",
        "https://i.pravatar.cc/300?img=28",
        "https://i.pravatar.cc/300?img=33",
        "https://i.pravatar.cc/300?img=51",
      ],
    },
    activities: ["Sightseeing", "Food Tour", "Shopping", "Nightlife"],
  },
  {
    id: 2,
    title: "Barcelona Beach Week",
    destination: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww",
    startDate: "April 10, 2025",
    duration: "10 days",
    travellers: {
      count: 4,
      images: [
        "https://i.pravatar.cc/300?img=26",
        "https://i.pravatar.cc/300?img=22",
        "https://i.pravatar.cc/300?img=35",
      ],
    },
    activities: ["Beach", "Nightlife", "Food Tour", "Architecture"],
  },
  {
    id: 3,
    title: "Bali Retreat",
    destination: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    startDate: "June 5, 2025",
    duration: "3 weeks",
    travellers: {
      count: 7,
      images: [
        "https://i.pravatar.cc/300?img=59",
        "https://i.pravatar.cc/300?img=24",
        "https://i.pravatar.cc/300?img=39",
        "https://i.pravatar.cc/300?img=42",
      ],
    },
    activities: ["Yoga", "Surfing", "Temple Visit", "Beach"],
  },
  {
    id: 4,
    title: "Paris in the Spring",
    destination: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
    startDate: "May 1, 2025",
    duration: "12 days",
    travellers: {
      count: 3,
      images: [
        "https://i.pravatar.cc/300?img=47",
        "https://i.pravatar.cc/300?img=31",
        "https://i.pravatar.cc/300?img=36",
      ],
    },
    activities: ["Museums", "Fine Dining", "Shopping", "Seine Cruise"],
  },
];

// Popular destinations
export const destinations = [
  {
    id: 1,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9reW98ZW58MHx8MHx8fDA%3D",
    travellersCount: 24,
    description: "Experience the perfect blend of tradition and futuristic innovation in Japan's capital city."
  },
  {
    id: 2,
    name: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww",
    travellersCount: 18,
    description: "Known for its art and architecture, Barcelona offers amazing beaches and vibrant culture."
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    travellersCount: 32,
    description: "Tropical paradise with beautiful beaches, spiritual temples, and vibrant nightlife."
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
    travellersCount: 29,
    description: "The City of Light boasts iconic landmarks, world-class cuisine, and romantic ambiance."
  },
  {
    id: 5,
    name: "Seoul",
    country: "South Korea",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VvdWx8ZW58MHx8MHx8fDA%3D",
    travellersCount: 16,
    description: "A fascinating blend of ancient traditions and cutting-edge technology."
  },
  {
    id: 6,
    name: "Rome",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9tZXxlbnwwfHwwfHx8MA%3D",
    travellersCount: 26,
    description: "The Eternal City offers ancient ruins, artistic treasures, and delicious cuisine."
  },
];
