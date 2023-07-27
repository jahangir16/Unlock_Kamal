import { Table,  TableContainer, TableHead, TableRow,Paper } from "@mui/material";
import TableCell from '@mui/material/TableCell';
// import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/ConfigureStore";

export default function BasketSummary() {
// const {basket} =useStoreContext();
const {basket} =useAppSelector(state => state.basket);

    const subtotal =basket?.items.reduce((sum,item)=> sum + (item.quantity * item.price),0) ?? 0;
    const deliveryFee = subtotal >= 1000 ? 0 : 200;

    return(
        <>
        <TableContainer component={Paper} variant={'outlined'}>
            <Table>
              <TableHead>
                 <TableRow>
                    <TableCell colSpan={2} > Subtotal </TableCell>
                    <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                 </TableRow>

                 <TableRow>
                    <TableCell colSpan={2}>Delivery Fee*</TableCell>
                    <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                 </TableRow>

                 <TableRow>
                    <TableCell colSpan={2}>Delivery Fee*</TableCell>
                    <TableCell align="right">{currencyFormat(deliveryFee + subtotal)}</TableCell>
                 </TableRow>

              
                        <TableRow>
                            <TableCell colSpan={3} style={{ fontStyle: 'italic' }}>*Order over Rs.1000 qualify for free delivery Charges*</TableCell>
                        </TableRow>


              </TableHead>
            </Table>
        </TableContainer>
        </>
    );
}
