import { useState, useEffect } from "react";
import { getContactDetails } from "../../services/ContactService";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {},
  cardheader: {
    alignContent: "center",
  },
}));

export default function ContactDetails(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [contact, setContact] = useState({});

  useEffect(() => {
    const id = props.match.params.id;
    async function fetchData() {
      console.log(id);
      const result = await getContactDetails(id);
      console.log(result);
      setContact(result.data);
    }
    fetchData();
  }, [props.match.params.id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={contact.avatar}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {contact.first_name} {contact.last_name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {contact.email}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
