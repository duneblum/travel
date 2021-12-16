import React from "react";
import CollapsibleCard from "../../components/CollapsibleCard";
import restaurants from "../../../dist/restaurants.json";
import useRestaurant from "../../utils/hooks/useRestaurant";
import SingleLocationMap from "../../components/SingleLocationMap";
import { useParams } from "react-router-dom";
import TagsList from "../../components/TagsList";
import { parseRestaurantOrders } from "./utils";

import OrderBox from "../../components/OrderBox";

const listWithoutDuplicates = () => {
  const duplicateFreeList = [];
  restaurants.forEach((entity) => {
    if (!duplicateFreeList.find((entry) => entry.id === entity.id))
      duplicateFreeList.push(entity);
  });
  return duplicateFreeList;
};

const Orders = ({ ordersByVisit }) => {
  return (
    <>
      <div className="text-lg font-semibold">Visits</div>
      <div>
        {ordersByVisit.map((visit) => (
          <CollapsibleCard
            header={new Date(visit.date_time).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
            body={
              <div>
                <div className="text-lg font-semibold">Orders</div>
                <div>
                  {visit.orders.map((order) => {
                    return (
                      <OrderBox
                        orderName={order.item}
                        orderDescription={
                          order.notes ??
                          ordersByVisit.map((visit) =>
                            visit.orders.find(
                              (searchOrder) => searchOrder.item === order.item
                            )
                          )[0]?.notes
                        }
                        orderRating={
                          order.review === "/10"
                            ? ordersByVisit.map((visit) =>
                                visit.orders.find(
                                  (searchOrder) =>
                                    searchOrder.item === order.item
                                )
                              )[0]?.review
                            : order.review
                        }
                      />
                    );
                  })}
                </div>
                <div className="text-lg font-semibold">Images</div>
                {visit?.images?.split(";").map((url) => (
                  <img src={url.trim()} className="w-full h-full" />
                ))}
              </div>
            }
          />
        ))}
      </div>
    </>
  );
};

const Restaurant = () => {
  const { id } = useParams();

  // utilize first visit since future visits aren't complete datsets
  const restaurantData = useRestaurant(id);
  const {
    restaurant,
    context: { restaurantVisits, restaurantInfo },
  } = restaurantData;

  const ordersByVisit = parseRestaurantOrders(restaurantVisits);

  const sortedItems = ordersByVisit
    .map((visit) => visit.orders)
    .flat()
    .sort((a, b) =>
      parseFloat(a.review.split("/")[0]) > parseFloat(b.review.split("/")[0])
        ? -1
        : 1
    )
    .filter((item) => item.review && item.review !== "/10");

  return (
    <div className="p-8 h-full overflow-scroll border-t border-black">
      <div className="flex flex-row ml-6 border-b-4 pr-16 border-black w-max">
        <div className="text-3xl font-bold pr-2 pb-2">
          {restaurantInfo.name}
        </div>
        <div className="flex flex-row pl-2 ">
          <TagsList tags={restaurantInfo.tags} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-3/5 p-6">
          <div className="flex flex-col">
            <div className="text-xl pr-8 w-max mb-4">
              {restaurantInfo.location}
            </div>
            <div className="pb-2 text-xl">{restaurantInfo.rating}</div>
          </div>
          <div className="pt-1 text-sm font-extralight pb-4">{`Rated #${
            listWithoutDuplicates()
              .filter(
                (filteredRestaurant) =>
                  filteredRestaurant.city === restaurant.city
              )
              .sort((a, b) =>
                parseFloat(a.overall_rating.split("/")[0]) >
                parseFloat(b.overall_rating.split("/")[0])
                  ? -1
                  : 1
              )
              .findIndex(
                (filteredRestaurant) => filteredRestaurant.id === restaurant.id
              ) + 1
          } of ${
            listWithoutDuplicates().filter(
              (filteredRestaurant) =>
                filteredRestaurant.city === restaurant.city
            ).length
          } restaurants in ${restaurant.city}`}</div>
          <Orders ordersByVisit={ordersByVisit} />
        </div>
        <div className="w-2/5 p-6">
          <div className="pb-2 border-b border-black">
            <div className="text-lg font-semibold">Notes</div>
            <>{restaurantInfo.notes}</>
          </div>
          <div className="py-2 border-b border-black">
            <div className="text-lg font-semibold">Price</div>
            <>{restaurantInfo.price}</>
          </div>
          <div className="py-2 border-b border-black">
            <div className="text-lg font-semibold">What Stood Out</div>
            <>{sortedItems[0].item}</>
          </div>
          <div className="py-2 border-b border-black">
            <div className="text-lg font-semibold">
              What Could Have Been Better
            </div>
            <>{sortedItems[sortedItems.length - 1].item}</>
          </div>
          <div style={{ paddingBottom: "300px", position: "relative" }}>
            <div className="text-lg font-semibold pt-2">Map</div>
            <SingleLocationMap
              name={restaurantInfo.name}
              address={restaurantInfo.location}
              coordinates={restaurantInfo.coordinates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
