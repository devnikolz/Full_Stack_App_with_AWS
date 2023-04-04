import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import Link from "next/link";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import withAdmin from "../../withAdmin";
import Nav from "../../../components/Nav";
import Body from "../../../components/Body";
import Footer from "../../../components/Footer";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const Read = ({ user, token }) => {
  const [state, setState] = useState({
    error: "",
    success: "",
    categories: [],
  });

  const { error, success, categories } = state;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, categories: response.data });
  };

  const confirmDelete = (e, slug) => {
    e.preventDefault();
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      handleDelete(slug);
    }
  };

  const handleDelete = async (slug) => {
    try {
      const response = await axios.delete(`${API}/category/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("CATEGORY DELETE SUCCESS ", response);
      loadCategories();
    } catch (error) {
      console.log("CATEGORY DELETE ", error);
    }
  };

  const listCategories = () =>
    categories.map((c, i) => (
      <Card key={i}>
        <CardHeader title={c.name} />
        <CardMedia
          image={c.image && c.image.url}
          title={c.name}
          style={{ height: "200px" }}
        />
        <CardContent>
        </CardContent>
        <CardActions>
          <Link href={`/admin/category/${c.slug}`}>
            <Button size="small" color="primary">
              Update
            </Button>
          </Link>
          <Button
            size="small"
            color="secondary"
            onClick={(e) => confirmDelete(e, c.slug)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    ));

  return (
    <>
      <Nav />
      <Body>
            <h1>List of categories</h1>
            <br />
            {success && showSuccessMessage(success)}

        <div className="row">{listCategories()}</div>
      </Body>
      <Footer />
    </>
  );
};

export default withAdmin(Read);
