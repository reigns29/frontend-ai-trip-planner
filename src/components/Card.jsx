import { Card, CardContent ,Divider , Typography , Button ,Grid , Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import MapComponent from "./Map.jsx";

export default function LocationCard({
  name,
  location,
  description,
  price,
  coordinates,
}) {
  return (
    <Card
      style={{
        width: "90%",
        marginTop: "80px",
        backgroundColor: "rgb(82 213 255 / 66%)",
      }}
    >
      {/* <CardMedia component="img" height="210" image = {punjabimage}/> */}
      <MapComponent latitude={coordinates[0]} longitude={coordinates[1]} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          <Box display="flex" alignItems="center">
            <PlaceIcon sx={{ mr: 1 }} />
            {location}
          </Box>
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              fontWeight="bolder"
            >
              <b>$ </b>{price}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Book Now
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        {/* <Typography variant="body1" gutterBottom>
                    Famous Places to Visit
                  </Typography> */}
        {/* <ul>
                    {placesToVisit.map((place) => (
                      <li key={place}>{place}</li>
                    ))}
                    <li>Amritsar</li>
                    <li>Amritsar</li>
                    <li>Amritsar</li>
                    <li>Amritsar</li>
                  </ul> */}
      </CardContent>
    </Card>
  );
}
