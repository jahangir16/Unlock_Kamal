import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutPage(){

  const navigate =useNavigate();


    const [validationError,setValidationError] = useState<string[]>([]);

    function getValidationError(){
        agent.TestErrors.getValidationError()
        .then(()=>console.log('should no see this'))
        .catch(error=>setValidationError(error));
    }

    return(
       <Container>
        <Typography variant="h2" gutterBottom >Error for Testing purpose</Typography>
        <ButtonGroup fullWidth>
            <Button variant="contained" onClick={()=>agent.TestErrors.get400Error().catch(error => console.log(error))}>400 Error</Button>
            <Button variant="contained" onClick={()=>agent.TestErrors.get401Error().catch(error => console.log(error))}>401 Error</Button>
            <Button variant="contained" onClick={()=>agent.TestErrors.get404Error().catch(error => console.log(error))}>404 Error</Button>
            <Button variant="contained" onClick={()=>agent.TestErrors.get500Error().catch(error => console.log(error))}>500 Error</Button>
            <Button variant="contained" onClick={getValidationError}>Validation Error</Button>

        </ButtonGroup>

      {validationError.length >0 && 
      <Alert severity="error">
      <AlertTitle>
        Validation Error
      </AlertTitle>
      <List>
  {validationError.map((error) => (
    <ListItem key={error}>
      <ListItemText>{error}</ListItemText>
    </ListItem>
  ))}
</List>


      </Alert>
      }

       </Container>
    )
}