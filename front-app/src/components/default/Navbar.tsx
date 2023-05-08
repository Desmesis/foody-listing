// Navbar isn't that useful for the present case
// But allow the adding of more pages/features if the case is needed.

import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

const theme = createTheme({})

function Navbar() {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Foody-Listing
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Navbar;