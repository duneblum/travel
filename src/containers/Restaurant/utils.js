export const parseRestaurantOrders = (restaurantVisits) => {
  return restaurantVisits.map((visit) => ({
    date_time: visit.date_time,
    orders: visit.orders.split(";").map((order) => {
      const noteStartPosition = order.indexOf("(");
      const noteEndPosition = order.indexOf(")");
      const ratingStartPosition = order.indexOf("[");
      const ratingEndPosition = order.indexOf("]");
      return {
        item:
          noteStartPosition !== -1
            ? order.substring(0, noteStartPosition)
            : order.substring(0, ratingStartPosition),
        notes:
          noteStartPosition !== -1
            ? order.substring(noteStartPosition + 1, noteEndPosition)
            : null,
        review: order.substring(ratingStartPosition + 1, ratingEndPosition),
      };
    }),
  }));
};
