import React, { useReducer, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Rating, Tooltip, Typography } from '@mui/material';


interface Restaurant {
    name: string;
    distance: number;
    rating: number ;
    photos: string[];
}

interface State {
    restaurants: Restaurant[];
}

type Action = { 
    type: "GET_RESTAURANTS"; payload: Restaurant[] 
};

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

function NearbyRestaurants() {
    const [state, dispatch] = useReducer(reducer, initialState);

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
                    const restaurants = results.slice(0, 10).map((result) => {

                        const distance = 
                            result.geometry &&
                            google.maps.geometry.spherical.computeDistanceBetween(
                                new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                result.geometry.location
                                );
                        const photos = 
                            result.photos &&
                            result.photos.map((photo) => {
                                return photo.getUrl({maxWidth: 400})
                            })
                        const rating = result.rating || 0;
                        return {
                            name: result.name,
                            distance: Math.round(distance || 0),
                            rating: rating,
                            photos: photos || []
                        }
                    });

                    dispatch({ type: "GET_RESTAURANTS", payload: restaurants });
                    
                });
            });
        }
    };

    const[hoveredRating, setHoveredRating] = useState<number| null>(null);

    return (
        <div>
            <Box
            bgcolor= 'background.paper'
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
                            flexDirection: 'column' }}
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
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {restaurant.name}
                                </Typography>
                                <Typography>
                                    Distance : {restaurant.distance} meters
                                </Typography>
                                <Tooltip title={`Rating : ${restaurant.rating}`}>
                                    <Box display="inline-block">
                                        <Rating name="Rating" value={restaurant.rating} precision={0.2} readOnly />
                                    </Box>
                                </Tooltip>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default NearbyRestaurants;