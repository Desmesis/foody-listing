import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


type Props = {
    onChange: (selectedCuisine: string) => void;
};

const CuisineSelect: React.FC<Props> = ({ onChange }) => {
    const [selectedCuisine, setSelectedCuisine] = useState<string>("");

    const handleCuisineChange = (event: SelectChangeEvent<unknown>) => {
        const cuisine = event.target.value as string;
        setSelectedCuisine(cuisine);
        onChange(cuisine);
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