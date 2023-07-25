// import { createBrowserRouter, Navigate } from "react-router-dom";
// import AboutPage from "../features/about/AboutPage";
// // import Login from "../../features/account/Login";
// // import Register from "../../features/account/Register";
// // import Inventory from "../../features/admin/Inventory";
// // import BasketPage from "../../features/basket/BasketPage";
// import Catalog from "../features/catalog/Catalog";
// import ProductDetails from "../features/catalog/ProductDetails";
// // import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
// import ContactPage from "../features/contact/ContactPage";
// // import Orders from "../../features/orders/Orders";
// import NotFound from "../app/errors/NotFound";
// import ServerError from "../app/errors/ServerError";
// import App from "../app/layout/App";
// // import RequireAuth from "./RequireAuth";

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         children: [
//             // // authenticated routes
//             // {element: <RequireAuth />, children: [
//             //     {path: 'checkout', element: <CheckoutWrapper />},
//             //     {path: 'orders', element: <Orders />},
//             // ]},
//             // // admin routes
//             // {element: <RequireAuth roles={['Admin']} />, children: [
//             //     {path: 'inventory', element: <Inventory />},
//             // ]},


//             {path: 'catalog', element: <Catalog />},
//             {path: 'catalog/:id', element: <ProductDetails />},
//             {path: 'about', element: <AboutPage />},
//             {path: 'contact', element: <ContactPage />},
//             {path: 'server-error', element: <ServerError />},
//             {path: 'not-found', element: <NotFound />},
//             // {path: 'basket', element: <BasketPage />},
//             // {path: 'login', element: <Login />},
//             // {path: 'register', element: <Register />},
//             {path: '*', element: <Navigate replace to='/not-found' />}
//         ]
//     }
// ])

import { createBrowserRouter, Route, Router } from "react-router-dom";
import AboutPage from "../features/about/AboutPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import ContactPage from "../features/contact/ContactPage";
import NotFound from "../app/errors/NotFound";
import ServerError from "../app/errors/ServerError";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import BasketPage from "../features/basket/BasketPage";
import CheakoutPage from "../features/checkout/CheckOutPage";

export const router = createBrowserRouter([{
  // Define routes as an array of RouteObject
   
    //
      path: '/',
      element: <App />,
      children: [
        // Nested routes
        { path: '/', element: <HomePage /> },
        { path: 'catalog', element: <Catalog /> },
        { path: 'catalog/:id', element: <ProductDetails /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'server-error', element: <ServerError /> },
        { path: 'not-found', element: <NotFound /> },
        {path:'/basket', element: <BasketPage />},
        {path:'/checkout', element: <CheakoutPage />},
        
        // Catch-all route to handle unmatched routes
        { path: '*', element: <NotFound /> }
      ]
    
  
}]);
