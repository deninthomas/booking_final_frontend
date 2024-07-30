const hotelNames = [
    "Hilton",
    "Marriott",
    "Hyatt",
    "Sheraton",
    "InterContinental",
    "Westin",
    "Four Seasons",
    "Ritz-Carlton",
    "Holiday Inn",
    "Radisson Blu",
  ];
  
  export const generateHotelData = (limit  = 10) => {
    const hotels = [];
  
    for (let i = 1; i <= limit; i++) {
      const randomNameIndex = Math.floor(Math.random() * hotelNames.length);
      const hotel = {
        id: i,
        name: `${hotelNames[randomNameIndex]} ${i}`,
        location: `City ${i}, Country`,
        rating: (Math.random() * (5 - 3) + 3).toFixed(1), // Random rating between 3.0 and 5.0
        reviews: Math.floor(Math.random() * (500 - 100 + 1)) + 100, // Random number of reviews between 100 and 500
        price: `$${Math.floor(Math.random() * (400 - 100 + 1)) + 100}`, // Random price between $100 and $400 per night
        imageUrls: [
          `https://via.placeholder.com/200x300.png?text=${hotelNames[randomNameIndex].toLowerCase().replace(/\s/g, '+')}`,
          `https://via.placeholder.com/200x300.png?text=${hotelNames[randomNameIndex].toLowerCase().replace(/\s/g, '+')}`,
          `https://via.placeholder.com/200x300.png?text=${hotelNames[randomNameIndex].toLowerCase().replace(/\s/g, '+')}`,
        ],
        amenities: ["Free Wi-Fi", "Spa", "Restaurant", "Gym", "Pool"], // Sample amenities list
      };
  
      hotels.push(hotel);
    }
  
    return hotels;
  };
  

  