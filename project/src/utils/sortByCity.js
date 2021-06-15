const groupOffersByCity = (offers) => {

  const sortedOffers = offers.reduce((acc, value) => {
    if (!acc[value.city.name]) {
      acc[value.city.name] = {};
      acc[value.city.name].offers = [];
      acc[value.city.name].location = value.city.location;
    }

    acc[value.city.name].offers.push(value);

    return acc;
  }, {});

  return sortedOffers;
};

export default groupOffersByCity;
