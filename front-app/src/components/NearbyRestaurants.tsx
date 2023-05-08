// Component handling the calls made to the Google Places API

import React, { useReducer } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Tooltip, Typography } from '@mui/material';

// Interface of the parameters we retrieve from the API
interface Restaurant {
    name: string;
    phone_number?: string;
    address?: string;
    distance?: number;
    rating?: number;
    photos: string[];
    url: string;
}

interface State {
    restaurants: Restaurant[];
}

// The Action for the useReducer : we could add more, for example a loading and an error one
// But for the sake of simplicity, I only added one.
type Action = {
    type: "GET_RESTAURANTS"; payload: Restaurant[]
};

const initialState: State = {
    restaurants: [],
};

// Reducer function
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

// Define the props that are called by the function : 
// These are used for the filtering
interface NearbyRestaurantsProps {
    cuisine: string;
    price: number;
    open: boolean;
}

interface Details {
    url?: string;
    address?: string;
    phone_number?: string
} 

function NearbyRestaurants(props: NearbyRestaurantsProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getNearbyRestaurants = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                const service = new google.maps.places.PlacesService(document.createElement("div"));

                // Request gives the specification on the call to the API
                // for more information : https://developers.google.com/maps/documentation/javascript/reference/places-service
                const request = {
                    location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    type: "restaurant",
                    keyword: props.cuisine,
                    rankBy: google.maps.places.RankBy.DISTANCE,
                    minPriceLevel: props.price,
                    openNow: props.open
                };

                service.nearbySearch(request, (results, status) => {

                    if (status === google.maps.places.PlacesServiceStatus.OK) {

                        const detailsPromises = results.slice(0, 10).map((result) => {
                            return new Promise<Details>((resolve) => {
                                result.place_id && service.getDetails({ placeId: result.place_id }, (placeResult: google.maps.places.PlaceResult, status) => {
                                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                                        resolve({
                                            phone_number: placeResult.formatted_phone_number,
                                            url: placeResult.url,
                                            address: placeResult.formatted_address
                                        });
                                    } else {
                                        resolve({});
                                    }
                                })
                            })
                        });
                        
                        // Wait for all the promises to resolve
                        Promise.all(detailsPromises).then((details) => {
                            // Map the results to the final restaurants array
                            const restaurants = results.slice(0, 10).map((result, index) => {
                                
                                // Calculation from the distance : not exact, but close enough.
                                // Adds a test to see if this information exists.                                
                                const distance =
                                result.geometry &&
                                google.maps.geometry.spherical.computeDistanceBetween(
                                    new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                    result.geometry.location
                                );
                                
                                // We return all the properties we want to give it to "restaurants"
                                return {
                                    name: result.name,
                                    address: details[index].address,
                                    phone_number: details[index].phone_number,
                                    distance: Math.round(distance || 0),
                                    rating: result.rating,
                                    photos: result.photos ? result.photos.map(photo => photo.getUrl({ maxWidth: 400 })) : [],
                                    url: details[index].url || ""
                                };
                            });
                            
                            // Dispatch and give all the infos.
                            dispatch({ type: "GET_RESTAURANTS", payload: restaurants });
                        })
                    }
                });
            });
        }
    };

    return (
        <div>
            <Box
                bgcolor='background.paper'
                pt={8}
                pb={6}
                textAlign='center'
            >
                <Button
                    onClick={getNearbyRestaurants}
                    variant="contained"
                    disableElevation={true}
                    color="info"
                >
                    Give me the 10 nearest restaurants !
                </Button>
            </Box>
            <Grid container spacing={2}>
                {state.restaurants.map((restaurant) => (
                    <Grid item key={restaurant.name} xs={12} sm={6} md={3} lg={3}>
                        <Card
                            raised
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '10.25%',
                                    objectFit: 'contain'
                                }}
                                image={restaurant.photos[0]}
                                alt='Picture not found'
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {restaurant.name}
                                </Typography>
                                <Typography>
                                    Address : {restaurant.address}
                                </Typography>
                                <Typography>
                                    Phone number : {restaurant.phone_number}
                                </Typography>
                                <Typography>
                                    Distance : {restaurant.distance} meters away
                                </Typography>
                                <Tooltip title={`Rating : ${restaurant.rating}`}>
                                    <Box display="inline-block">
                                        <Rating name="Rating" value={restaurant.rating} precision={0.2} readOnly />
                                    </Box>
                                </Tooltip>
                            </CardContent>
                            <CardActions>
                                <Button size="medium" href={restaurant.url}>Show on Google Maps</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default NearbyRestaurants;