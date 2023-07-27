import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader }  from '@mui/material';
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import LoadingButton from "@mui/lab/LoadingButton";
// import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/ConfigureStore';
import { addBasketItemAsync } from '../basket/basketSlice';
// import { LoadingButton } from "@mui/lab";



interface Props{
    product :Product;
}

export default function ProductCard({product}:Props){
// const [loading,setLoading] =useState(false);
// const {setBasket} = useStoreContext();
const dispatch = useAppDispatch();
const {status} = useAppSelector(state=> state.basket);


// function handleItems(productId: number){
//   setLoading(true);
//   agent.Basket.addItem(productId)
//    .then(basket =>dispatch(setBasket(basket)))
//   .catch(error => console.log(error))
//   .finally(()=> setLoading(false));
// }
    return(
        <Card>
            <CardHeader
                  avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={
                    product.name
                  }
            />
            
        <CardMedia
          sx={{ height: 140 }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5">
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.type} / {product.brand}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton 
          loading={status.includes('pendingAddItem'+ product.id)} 
          onClick={()=> dispatch(addBasketItemAsync({productId: product.id}))} 
          size="small"
          >Add to Card</LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
      </Card>
    )
}