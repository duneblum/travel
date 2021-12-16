export const parseRestaurantOrders = (restaurantVisits) => {
  return restaurantVisits.map((visit) => ({
    date_time: visit.date_time,
    images: visit.images,
    orders: visit.orders.split(";").map((order) => {
      const noteStartPosition = order.indexOf("(");
      const noteEndPosition = order.indexOf(")");
      const ratingStartPosition = order.indexOf("[");
      const ratingEndPosition = order.indexOf("]");
      return {
        item:
          noteStartPosition !== -1
            ? order.substring(0, noteStartPosition).trim()
            : order.substring(0, ratingStartPosition).trim(),
        notes:
          noteStartPosition !== -1
            ? order.substring(noteStartPosition + 1, noteEndPosition).trim()
            : null,
        review: order
          .substring(ratingStartPosition + 1, ratingEndPosition)
          .trim(),
      };
    }),
  }));
};
