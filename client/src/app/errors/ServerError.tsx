import { Container, Paper, Typography } from "@mui/material";


import { useNavigate } from "react-router-dom";

 


export default function ServerError(){
 
  const navigate =useNavigate();
  


    return (
      
        <Container component={Paper}>
          <Typography variant='h5' gutterBottom>Server Error</Typography>
        </Container>
    )
}