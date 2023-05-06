import React, { useReducer, useEffect } from "react";

interface State {
  restaurants: string[];
}

type Action = { type: "GET_RESTAURANTS"; payload: string[] };

const initialState: State = {
  restaurants: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GET_RESTAURANTS":
      return {
        ...state,
        restaurants: action.payload,
      };
    default:
      return state;
  }
}

const NearbyRestaurants: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getNearbyRestaurants = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

          const service = new google.maps.places.PlacesService(
            document.createElement("div")
          );
          const request = {
            location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            type: "restaurant",
            rankBy: google.maps.places.RankBy.DISTANCE
          };

          service.nearbySearch(request, (results) => {
            const restaurants = results.slice(0, 10).map((result) => result.name);
            dispatch({ type: "GET_RESTAURANTS", payload: restaurants });
          });
        });
      }
    };

    getNearbyRestaurants();
  }, []);

  return (
    <div>
      <h1>10 Nearby Restaurants</h1>
      <ul>
        {state.restaurants.map((restaurant) => (
          <li key={restaurant}>{restaurant}</li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyRestaurants;