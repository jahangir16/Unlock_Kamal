import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER } from "./CounterReducer";

export default function ContactPage(){
    
    const dispatch = useDispatch();
    const {data,title} = useSelector((state:CounterState) => state);
    return(
        <>
        <Typography variant='h2'>Contact Page--- {data} </Typography>
        <ButtonGroup>
            <Button onClick={() => dispatch({ type: DECREMENT_COUNTER })} variant="contained" color='error'>Decrement</Button>
            <Button onClick={()=>dispatch({type: INCREMENT_COUNTER })}  variant="contained" color='primary'>Increment</Button>
        </ButtonGroup>
        </>
    )
}