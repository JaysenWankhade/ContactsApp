import { useEffect, useState } from "react";
import getAllContacts from "../../services/ContactService";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import _ from "lodash";

export default function ContactsMaster(props) {
  const [contactsList, setContactsList] = useState([]);
  const [sortOrder, setSortOrder] = useState("AZ");

  useEffect(() => {
    async function fetchData() {
      const result = await getAllContacts();
      console.log(result);
      setContactsList(_.sortBy(result.data, "first_name"));
      console.log(contactsList);
    }
    fetchData();
  }, []);

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

  function handleChange(e) {
    setSortOrder(e.target.value);
    if (e.target.value === "AZ") {
      setContactsList(_.sortBy(contactsList, "first_name"));
    }
    if (e.target.value === "ZA") {
      setContactsList(_.sortBy(contactsList, "first_name").reverse());
    }
  }

  const classes = useStyles();
  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Sort</InputLabel>
          <Select native value={sortOrder} onChange={handleChange}>
            <option aria-label="None" value="" />
            <option value="AZ">A - Z</option>
            <option value="ZA">Z - A</option>
          </Select>
        </FormControl>
        {"   "}
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
