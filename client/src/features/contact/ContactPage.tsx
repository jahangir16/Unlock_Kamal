import { Button, ButtonGroup, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER, decrement, increment } from "./CounterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage(){
    
    const dispatch = useAppDispatch();
    const {data,title} = useAppSelector(state=>state.counter);
    return(
        <>
        <Typography variant='h2'>Contact Page--- {data} ==============={title} </Typography>
        <ButtonGroup>
            <Button onClick={() => dispatch(decrement(1))} variant="contained" color='error'>Decrement</Button>
            <Button onClick={()=>dispatch(increment(1))}  variant="contained" color='primary'>Increment</Button>
            <Button onClick={()=>dispatch(increment(5))}  variant="contained" color='secondary'>Increment by 5</Button>
        </ButtonGroup>
        </>
    )
}