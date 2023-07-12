import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { create } from "domain";
import { useState } from "react";


function App() {
    const [darkMode,setDarkMode]=useState(false);
    const palettleType = darkMode ? 'dark':'light';
    const theme = createTheme({
        palette:{
        mode: palettleType
        }
    })
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/> {/* remove the browser Css */}
            <Header/>
            <Container>
            <Catalog />
            </Container>
    </ThemeProvider>
  );
}

export default App;