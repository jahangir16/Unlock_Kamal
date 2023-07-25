import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader }  from '@mui/material';
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import LoadingButton from "@mui/lab/LoadingButton";
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';
// import { LoadingButton } from "@mui/lab";



interface Props{
    product :Product;
}

export default function ProductCard({product}:Props){
const [loading,setLoading] =useState(false);
const {setBasket} = useStoreContext();

function handleItems(productId: number){
  setLoading(true);
  agent.Basket.addItem(productId)
   .then(basket =>setBasket(basket))
  .catch(error => console.log(error))
  .finally(()=> setLoading(false));
}
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
          loading={loading} 
          onClick={()=> handleItems(product.id)} 
          size="small"
          >Add to Card</LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
      </Card>
    )
}