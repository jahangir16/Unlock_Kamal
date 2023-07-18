import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetailsPage from "../../features/catalog/ProductDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import { redirect } from "react-router-dom";

// import { history } from './app/layout/history';





function App() {

 

    const [darkMode,setDarkMode]=useState(false);
    const palettleType = darkMode ? 'dark':'light';
    const theme = createTheme({
        palette:{
        mode: palettleType,
        background:{
            default:palettleType === 'light' ? '#eaeaea': '#121212'
        }
       
        
        }
       
    })

  function handleThemeChange(){
    setDarkMode(!darkMode)
  }
  

    
    return (
        <ThemeProvider theme={theme}>
          <ToastContainer position='bottom-right' hideProgressBar />
            <CssBaseline/> {/* remove the browser Css */}
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Routes>
                    <Route path='/' Component={HomePage} />
                    <Route path='/catalog' Component={Catalog}/>
                    <Route path='/catalog/:id' Component={ProductDetailsPage}/>
                    <Route path='/contact' Component={ContactPage}/>
                    <Route path='/about' Component={AboutPage}/>
                    <Route path='/server-error' Component={ServerError}/>
                    <Route path="*" Component={NotFound} />
                    

               </Routes>
            </Container>
          
    </ThemeProvider>
  );
}

export default App;