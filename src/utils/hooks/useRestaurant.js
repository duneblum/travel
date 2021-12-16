import restaurants from "../../../dist/restaurants.json";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";

const formatCommonRestaurantInfo = (restaurant) => {
  const name = restaurant.name;
  const tags = restaurant.tags.split(",");
  const location = `${restaurant.city}, ${
    isEmpty(restaurant.state) ? restaurant.country : restaurant.state
  }`;
  const rating = restaurant.overall_rating;
  const notes = restaurant.overall_notes;
  const price = restaurant.price_scale;
  const coordinates = restaurant.coordinates.split(", ");

  return { name, tags, location, rating, notes, price, coordinates };
};

const useRestaurant = (restaurantId) => {
  const restaurantVisits = restaurants.filter((restaurant) =>
    isEqual(restaurant.id, restaurantId)
  );

  const restaurant = restaurantVisits[0];

  const restaurantInfo = formatCommonRestaurantInfo(restaurant);

  return { restaurant, context: { restaurantVisits, restaurantInfo } };
};

export default useRestaurant;
