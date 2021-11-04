import React from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import "./UserItem.css";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/${props.id}/places`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={props.image}
              alt={props.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
