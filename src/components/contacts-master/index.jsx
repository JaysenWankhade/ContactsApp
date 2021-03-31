import { useEffect, useState } from "react";
import getAllContacts from "../../services/ContactService";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {
  Button,
  CardActions,
  Grid,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import store from "../../redux/store";
import { addToFav } from "../../redux/actions";

export default function ContactsMaster(props) {
  const [contactsList, setContactsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllContacts();
      console.log(result);
      setContactsList(result.data);
      console.log(contactsList);
    }
    fetchData();
  }, []);

  function handleClick(e, contact) {
    e.preventDefault();
    store.dispatch(addToFav(contact));
    alert(`${contact.first_name} added to favotites`);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    list: {
      padding: 4,
    },
    container: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      alignContent: "center",
      color: theme.palette.text.secondary,
      height: "85vh",
    },
  }));

  const classes = useStyles();
  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <Link to="/Favorites">Favorites</Link>
      </div>
      <div
        className={classes.container}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <ul style={{ "list-style-type": "none" }}>
          {contactsList.map((contact) => {
            return (
              <li className={classes.list} key={contact.id}>
                <Link
                  to={`/ContactDetails/${contact.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          <img src={contact.avatar} alt="unable to load" />
                        </Avatar>
                      }
                      title={contact.first_name + " " + contact.last_name}
                      subheader={contact.email}
                    />
                    <CardActions>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<FavoriteIcon />}
                        onClick={(e) => handleClick(e, contact)}
                      >
                        Add to favorites
                      </Button>
                    </CardActions>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
