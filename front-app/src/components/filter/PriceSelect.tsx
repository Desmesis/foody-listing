import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


type Props = {
    onChange: (selectPrice: number) => void;
};

const PriceSelect: React.FC<Props> = ({ onChange }) => {
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const handlePriceChange = (event: SelectChangeEvent<unknown>) => {
        const price = event.target.value as number;
        setSelectedPrice(price);
        onChange(price);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel>Select minimum Price Level</InputLabel>
            <Select
            labelId="price-label"
            id="price-select"
            value={selectedPrice}
            onChange={handlePriceChange}
            autoWidth
            label="Select minimum Price Level"
        >
            <MenuItem value={0}>Any price</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
        </Select>
        </FormControl>
    );
};
  
export default PriceSelect;