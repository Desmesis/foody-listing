// Component for a Select Component that allows the filtering on OPEN or not : 

import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


type Props = {
    onChange: (selectOpen: boolean) => void;
};

function OpenSelect(props: Props) {
    const [selectedOpen, setSelectedOpen] = useState<boolean>(false);

    const handleOpenChange = (event: SelectChangeEvent<unknown>) => {
        const open = event.target.value as boolean;
        setSelectedOpen(open);
        props.onChange(open);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel>Opened Restaurant</InputLabel>
            <Select
                labelId="open-label"
                id="open-select"
                value={selectedOpen}
                onChange={handleOpenChange}
                autoWidth
                label="Opened Restaurant ? "
            >
                <MenuItem value={false as any}>False</MenuItem>
                <MenuItem value={true as any}>True</MenuItem>
            </Select>
        </FormControl>
    );
};

export default OpenSelect;