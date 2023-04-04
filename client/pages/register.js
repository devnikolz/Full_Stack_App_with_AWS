import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { showSuccessMessage, showErrorMessage } from "../helpers/alerts";
import { API } from "../config";
import { isAuth } from "../helpers/auth";
import Nav from "../components/Nav";
import Body from "../components/Body";
import Footer from "../components/Footer";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Select
} from "@material-ui/core";
import { InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    categoryLabel: {
      marginBottom: theme.spacing(1),
    },
  }));
  


const Register = () => {
    const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Register",
    loadedCategories: [],
    categories: [],
  });

  const {
    name,
    email,
    password,
    error,
    success,
    buttonText,
    loadedCategories,
    categories,
  } = state;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  // load categories when component mounts using useEffect
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, loadedCategories: response.data });
  };

  const handleToggle = (c) => () => {
    // return the first index or -1
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log("all >> categories", all);
    setState({ ...state, categories: all, success: "", error: "" });
  };

  // show categories > checkbox
  const showCategories = () => {
    return (
      loadedCategories &&
      loadedCategories.map((c, i) => (
        <li className="list-unstyled" key={c._id}>
          <input
            type="checkbox"
            onChange={handleToggle(c._id)}
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Register",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({
      name,
      email,
      password,
      categories,
    });
    setState({ ...state, buttonText: "Registering" });
    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password,
        categories,
      });
      console.log(response);
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        buttonText: "Submitted",
        success: response.data.message,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: "Register",
        error: error.response.data.error,
      });
    }
  };

  // const handleSubmit = e => {
  //     e.preventDefault();
  //     setState({ ...state, buttonText: 'Registering' });
  //     // console.table({ name, email, password });
  //     axios
  //         .post(`http://localhost:8000/api/register`, {
  //             name,
  //             email,
  //             password
  //         })
  //         .then(response => {
  //             console.log(response);
  //             setState({
  //                 ...state,
  //                 name: '',
  //                 email: '',
  //                 password: '',
  //                 buttonText: 'Submitted',
  //                 success: response.data.message
  //             });
  //         })
  //         .catch(error => {
  //             console.log(error);
  //             setState({ ...state, buttonText: 'Register', error: error.response.data.error });
  //         });
  // };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleChange("name")}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleChange("email")}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handleChange("password")}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="category-label" className={classes.categoryLabel}>
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              multiple
              value={categories}
              onChange={("categories")}
              renderValue={(selected) => selected.join(", ")}
            >
              {showCategories()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
            disabled={
              !name || !email || !password || buttonText === "Registering..."
            }
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <React.Fragment>
      <Nav />
      <Body>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" component="h1" gutterBottom>
                Register
              </Typography>
              <br />
              {success && showSuccessMessage(success)}
              {error && showErrorMessage(error)}
              {registerForm()}
            </Grid>
          </Grid>
        </Container>
      </Body>
      <Footer />
    </React.Fragment>
  );
};

export default Register;
