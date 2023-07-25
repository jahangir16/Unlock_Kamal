import { Divider, Grid, Table, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import LoadingButton from "@mui/lab/LoadingButton";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

export default function ProductDetailsPage() {
  const {id} = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity,setQuantity] = useState(0);
  const [submiting,setSubmiting] = useState(false);
  const {basket , setBasket,removeItem} = useStoreContext();
  const item=basket?.items.find(i=> i.productId === product?.id);

  useEffect(() => {
    if(item) setQuantity(item.quantity);
    if (id) {
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [id,item]);

  function handleInputChange(event : any){
    if(event.target.value >= 0){
        setQuantity(event.target.value);
    }
  }

  async function handleUpdateCart(){
    setSubmiting(true);
    if(!item || quantity > item.quantity){
             const UpdateQuantity = item ? quantity - item.quantity : quantity;
     agent.Basket.addItem(product?.id!,UpdateQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(()=> setSubmiting(false))
    }else{
      const updatedQuantity = item.quantity -quantity;
      agent.Basket.removeItem(product?.id!,updatedQuantity)
          .then(()=> removeItem(product?.id!,updatedQuantity))
          .catch(error => console.log(error))
                .finally(()=> setSubmiting(false));
    }
  }

  if (loading)    return <LoadingComponent  message="Loading Product Details"/>;
  

  if (!product) {
    return <NotFound/>
  }

  return (
   <Grid container spacing={6}>
     <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
     </Grid>
     <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb:2}}/>
        <Typography variant='h4' color='secondary'>{currencyFormat(product.price)}</Typography>
        <TableContainer>
            <Table>
              <tbody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
              </tbody>
            </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
                   <TextField 
                   onChange={handleInputChange}
                   variant="outlined"
                   type="number"
                   label="Quantity in Cart"
                   fullWidth
                   value={quantity}
                   />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
            disabled={item?.quantity ===quantity || !item && quantity === 0}
            loading={submiting}
            onClick={handleUpdateCart}
            sx={{height: '55px'}}
            color= 'primary'
            size='large'
            variant='contained'
            fullWidth
            >
              {item ? 'Updated Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
     </Grid>
   </Grid>
  );
}
 