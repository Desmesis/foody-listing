import React, { useState } from 'react';

import NearbyRestaurants from '../components/NearbyRestaurants';
import CuisineSelect from '../components/filter/CuisineSelect';
import PriceSelect from '../components/filter/PriceSelect';
import OpenSelect from '../components/filter/OpenSelect';

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Home() {
    // Cuisine types :
    const [selectedCuisine, setSelectedCuisine] = useState<string>("");

    const handleCuisineChange = (cuisine: string) => {
        setSelectedCuisine(cuisine);
    }
    // Price Level :
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const handlePriceChange = (price: number) => {
        setSelectedPrice(price);
    }
    // Open or not :
    const [selectedOpen, setSelectedOpen] = useState<boolean>(false);

    const handleOpenChange = (open: boolean) => {
        setSelectedOpen(open);
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>
                        Filters
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CuisineSelect onChange={handleCuisineChange}/>
                    <PriceSelect onChange={handlePriceChange}/>
                    <OpenSelect onChange={handleOpenChange}/>
                </AccordionDetails>
            </Accordion>
            <NearbyRestaurants cuisine={selectedCuisine} price={selectedPrice} open={selectedOpen}/>
        </div>
    )
}

export default Home;