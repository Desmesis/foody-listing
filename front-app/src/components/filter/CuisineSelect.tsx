// Component for a Select Component that allows the filtering on Cuisine Types : 

// To add more Cuisine Types : add a MenuItem, the value being the string we give.

import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
    onChange: (selectedCuisine: string) => void;
};

function CuisineSelect(props: Props) {
    const [selectedCuisine, setSelectedCuisine] = useState<string>("");

    const handleCuisineChange = (event: SelectChangeEvent<unknown>) => {
        const cuisine = event.target.value as string;
        setSelectedCuisine(cuisine);
        props.onChange(cuisine);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel>Select Cuisine Type</InputLabel>
            <Select
                labelId="cuisine-label"
                id="cuisine-select"
                value={selectedCuisine}
                onChange={handleCuisineChange}
                label="Select Cuisine Type"
                autoWidth
            >
                <MenuItem value="">Any cuisine types</MenuItem>
                <MenuItem value="italian">Italian</MenuItem>
                <MenuItem value="japanese">Japanese</MenuItem>
                <MenuItem value="mexican">Mexican</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="indian">Indian</MenuItem>
            </Select>
        </FormControl>
    );
};

export default CuisineSelect;