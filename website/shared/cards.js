import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export function SportCard(props){
    return (
        <Card sx={{ maxWidth: 350, minWidth: 350 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.sport.img}
          title={props.sport.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.sport.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {props.sport.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {window.location.href = "/sports/" + props.sport.title}}>Apri</Button>
        </CardActions>
      </Card>
    )
}