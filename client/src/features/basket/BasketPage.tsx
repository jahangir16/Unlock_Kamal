import { Box, Button, Grid,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import CheakoutPage from "../checkout/CheckOutPage";
import { Link } from "react-router-dom";


export default function BasketPage(){
  
  const {basket , setBasket, removeItem} = useStoreContext();
  const[status,setStatus] =useState({
    loading:false,
    name:''
  });
  
  function handleAddItem(productId:number,name:string){
       setStatus({loading:true,name});
       agent.Basket.addItem(productId)
            .then(basket=>setBasket(basket))
            .catch(error=>console.log(error))
            .finally(()=>setStatus({loading:false,name:''}));
  }

  function handleRemoveItem(productId:number,quantity=1,name:string){
    setStatus({loading:true,name});
    agent.Basket.removeItem(productId,quantity )
         .then(()=>removeItem(productId,quantity))
         .catch(error=>console.log(error))
         .finally(()=>setStatus({loading:false,name:''}));
}

    if(!basket) return <Typography variant="h3">Your Basket is Empty</Typography>
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    return(
      <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="right">SubTotal</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(item => (
            <StyledTableRow key={item.productId}>
              <StyledTableCell component="th" scope="row">
                   <Box display='flex' alignItems='center'>
                         <img src={item.pictureUrl} alt={item.name} style={{height:50,marginRight:20}} />
                         <span>{item.name}</span>
                   </Box>
              </StyledTableCell>
              <StyledTableCell align="right">{currencyFormat(item.price)}</StyledTableCell>
              <StyledTableCell align="center">
                <LoadingButton
                 loading={status.loading&&status.name === 'rem' +item.productId}
                 onClick={()=>handleRemoveItem(item.productId,1,'rem' + item.productId)}
                  color="error">
                  <Remove/>
                </LoadingButton>

                {item.quantity}

                <LoadingButton 
               loading={status.loading&&status.name === 'add' +item.productId}
                 onClick={()=>handleAddItem(item.productId,'add' + item.productId)} 
                 color="secondary"> 
                  <Add/>
                </LoadingButton>
                
                </StyledTableCell>
              <StyledTableCell align="right">{currencyFormat(item.price* item.quantity)}</StyledTableCell>
              <StyledTableCell align="right">
                   <LoadingButton 
                    loading={status.loading&&status.name === 'del' +item.productId}
                     onClick={()=>handleRemoveItem(item.productId,item.quantity,'del' + item.productId)}
                      color="error">
                        <Delete />
                   </LoadingButton>
                   </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <BasketSummary />
        <Button
        component={Link}
        to='/checkout'
        variant='contained'
        size='large'
        fullWidth
        >
                  CheckOut
        </Button>
        
      </Grid>
    </Grid>
    </>
    );
}
