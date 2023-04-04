// imports
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { getCookie, isAuth } from "../../../helpers/auth";
import { API } from "../../../config";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import Resizer from "react-image-file-resizer";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import Body from "../../../components/Body";


import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
    Card,
    Select,
    MenuItem
} from "@material-ui/core";

const Create = ({ token }) => {
  // state
  const [state, setState] = useState({
    title: "",
    description: "",
    url: "",
    categories: [],
    loadedCategories: [],
    success: "",
    error: "",
    type: "",
    medium: "",
    image: "",
  });

  const {
    title,
    description,
    url,
    image,
    categories,
    loadedCategories,
    success,
    error,
    type,
    medium,
  } = state;

  const [imageUploadButtonName, setImageUploadButtonName] =
    useState("Upload image");

  // load categories when component mounts using useEffect
  useEffect(() => {
    loadCategories();
  }, [success]);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, loadedCategories: response.data });
  };

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value, error: "", success: "" });
  };

  const handleDescriptionChange = (e) => {
    setState({ ...state, description: e.target.value, error: "", success: "" });
  };

  const handleURLChange = (e) => {
    setState({ ...state, url: e.target.value, error: "", success: "" });
  };

  const handleImage = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileType = file.type.split("/")[0];

    if (fileType !== "image" && fileType !== "application") {
      return;
    }

    const fileSize = file.size / 1024 / 1024; // in MB

    if (fileType === "image" && fileSize > 0.1) {
      // resize large images to reduce file size
      const resizedImage = await resizeImage(file);
      setState({ ...state, image: resizedImage, error: "" });
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({ ...state, image: reader.result, error: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ title, url, categories, type, medium });
    try {
      const response = await axios.post(
        `${API}/link`,
        { title, description, url, image, categories, type, medium },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setState({
        ...state,
        title: "",
        description: "",
        url: "",
        success: "Link is created",
        error: "",
        loadedCategories: [],
        categories: [],
        type: "",
        medium: "",
        image: "",
      });
    } catch (error) {
      console.log("LINK SUBMIT ERROR", error);
      setState({ ...state, error: error.response.data.error });
    }
  };

  console.log("state", state);

  console.log("state", state);

  const handleTypeClick = (e) => {
    setState({ ...state, type: e.target.value, success: "", error: "" });
  };

  const handleMediumClick = (e) => {
    setState({ ...state, medium: e.target.value, success: "", error: "" });
  };

  const showMedium = () => (
    <Box maxWidth="md" mt={8} mb={8}>
      <FormControl>
      <Typography>Content</Typography>
        <InputLabel id="medium-label"></InputLabel>
        <Select
          labelId="medium-label"
          id="medium"
          value={medium}
          onChange={handleMediumClick}
        >
          <MenuItem value="video">Course</MenuItem>
          <MenuItem value="book">Article</MenuItem>
          <MenuItem value="video">YouTube</MenuItem>
          <MenuItem value="book">Code</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
  
  const showTypes = () => (
    <Box maxWidth="md" mt={8} mb={8}>
        <Typography>Type</Typography>
      <FormControl>
        <InputLabel id="type-label"></InputLabel>
        <Select
          labelId="type-label"
          id="type"
          value={type}
          onChange={handleTypeClick}
        >
          <MenuItem value="free">Free</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
  

  const handleToggle = (c) => () => {
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }

    setState({ ...state, categories: all, success: "", error: "" });
  };

  const showCategories = () => {
    return (
      <Box>
        <FormControl component="fieldset">
          {loadedCategories &&
            loadedCategories.map((c, i) => (
              <FormControlLabel
                key={c._id}
                control={<Checkbox onChange={handleToggle(c._id)} />}
                label={c.name}
              />
            ))}
        </FormControl>
      </Box>
    );
  };

  // link create form

  const submitLinkForm = () => (
    <Box maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column">
          <Box mb={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </FormControl>
          </Box>
          <Box mb={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
          </Box>
          <Box mb={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="url">URL</InputLabel>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={handleURLChange}
              />
            </FormControl>
          </Box>
          <Box mb={4}>
            <FormControl fullWidth>
              <input
                onChange={handleImage}
                type="file"
                accept="image/*,application/pdf"
                hidden
                id="image-upload"
              />
              <Button variant="contained" component="label" color="primary">
                Upload Image
                <input
                  onChange={handleImage}
                  type="file"
                  accept="image/*,application/pdf"
                  hidden
                  id="image-upload"
                />
              </Button>
            </FormControl>
          </Box>
          <Box mb={4}>
            <Button
              variant="contained"
              color="primary"
              disabled={!token}
              type="submit"
            >
              {isAuth() || token ? "Post" : "Login to post"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );

  return (
    <React.Fragment>
      <Nav />
      <Body>
        <Box>
          <Typography variant="h3" component="h1">
            Submit Post
          </Typography>
          <br />
        </Box>
        <Box display="flex">
          <Box flex={1}>
            {showCategories()}
            {showTypes()}
            {showMedium()}
          </Box>
          <Box flex={2}>
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            {submitLinkForm()}
          </Box>
        </Box>
      </Body>
      <Footer />
    </React.Fragment>
  );
};

Create.getInitialProps = ({ req }) => {
  const token = getCookie("token", req);
  return { token };
};

export default Create;
