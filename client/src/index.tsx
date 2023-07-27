import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
// import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import {  RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';
// import { StoreProvider } from './app/context/StoreContext';
import {  store } from './app/store/ConfigureStore';
import { Provider } from 'react-redux';
// import { fetchProductsAsync } from './features/catalog/catalogSlice';
// import { createHref, navigate } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import { useHistory } from 'react-router-dom';
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
// import {history} from './app/api/history';
// import { history } from './app/api/history';
// import { HistoryRouter } from "./app/api/HistoryRouter"
// import { myHistory } from "./app/api/history"
// export const history = useHistory();
// import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
// import { history } from './app/api/history';
// import axiosInterceptor from "./app/api/AxiosInterceptor";

// axiosInterceptor(); // Call the axiosInterceptor function before rendering the app

// const store = configureStore(); 
// console.log(store.getState());

// store.dispatch(fetchProductsAsync());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
       <App />
    </BrowserRouter> */}
       {/* <StoreProvider> */}
           <Provider store={store}>
                 <RouterProvider router={router} />
            </Provider>
        {/* </StoreProvider> */}
  </React.StrictMode>
);
// reportWebVitals(console.log);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


