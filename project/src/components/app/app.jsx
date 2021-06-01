import React from 'react';
import Main from '../main/main';

const cards = [
  {
    price: 120,
    pictureUrl: 'img/apartment-01.jpg',
    title: 'Beautiful & luxurious apartment at great location',
    apartmentType: 'Apartment',
    rating: 80,
  },
  {
    price: 80,
    pictureUrl: 'img/room.jpg',
    title: 'Wood and stone place',
    apartmentType: 'Private room',
    rating: 80,
  },
  {
    price: 132,
    pictureUrl: 'img/apartment-02.jpg',
    title: 'Canal View Prinsengracht',
    apartmentType: 'Apartment',
    rating: 80,
  },
  {
    price: 180,
    pictureUrl: 'img/apartment-03.jpg',
    title: 'Nice, cozy, warm big bed apartment',
    apartmentType: 'Apartment',
    rating: 100,
  },
  {
    price: 80,
    pictureUrl: 'img/room.jpg',
    title: 'Wood and stone place',
    apartmentType: 'Private room',
    rating: 80,
  },
];

function App() {
  return <Main cards={cards} />;
}

export default App;
