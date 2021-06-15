const sortOffers = (offers) => {
  const sortedOffers = [];

  for (const { city, price, previewImage, type, rating, title, id, location } of offers) {

    const currentCities = sortedOffers.map((element) => element.city);

    if (currentCities.indexOf(city.name) === -1) {
      sortedOffers.push({
        id,
        city: city.name,
        location: city.location,
        offers: [{
          price,
          previewImage,
          apartmentType: type,
          rating,
          title,
          id,
          location,
        }],
      });
    } else {
      sortedOffers.find((element) => element.city === city.name).offers.push({
        price,
        previewImage,
        apartmentType: type,
        rating,
        title,
        id,
        location,
      });
    }
  }
  return sortedOffers;
};

export default sortOffers;
