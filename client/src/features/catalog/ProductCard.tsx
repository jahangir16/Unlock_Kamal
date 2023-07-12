import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props{
    product :Product;
}

export default function ProductCard({product}:Props){
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
           Rs {(product.price).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.type} / {product.brand}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to Card</Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    )
}