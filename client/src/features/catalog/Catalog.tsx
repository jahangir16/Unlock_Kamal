import { Fragment, useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ProductList from "./ProductList";



export default function Catalog() {
      
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5017/api/Products')
            .then(response => response.json())
            .then(data => setProducts(data))
    },[])

   

    return (
        <Fragment>
          <ProductList products={products}/>
        </Fragment>
    )
}