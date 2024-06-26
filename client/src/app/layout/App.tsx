import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import HomePage from "../../features/home/HomePage";
// import ContactPage from "../../features/contact/ContactPage";
// import AboutPage from "../../features/about/AboutPage";
// import ProductDetailsPage from "../../features/catalog/ProductDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import ServerError from "../errors/ServerError";
// import NotFound from "../errors/NotFound";
// import type {} from '@mui/lab/themeAugmentation';
// import { Theme } from '@mui/material/styles';
// import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
// import { Basket } from "../models/basket";
import { useAppDispatch } from "../store/ConfigureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
// const{setBasket} = useStoreContext();
const dispatch = useAppDispatch();
const[loading,setLoading] = useState(true);  

useEffect(()=>{
  const buyerId = getCookie('buyerId')
  if(buyerId){
    agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false));
  }
  else{
    setLoading(false);
  }
},[dispatch]);





  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  // useEffect(() => {
  //   // Perform the redirection when the component mounts
  //   redirectToServerError();
  // }, []);
  if(loading) return <LoadingComponent message="Initailising App!..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />
      {/* remove the browser Css */}
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        
      <Outlet />
        {/* <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:id' element={<ProductDetailsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/server-error' element={<ServerError />} />
          <Route path='*' element={<NotFound />} />
        </Routes> */}

      </Container>
    </ThemeProvider>
  );
}

export default App;
