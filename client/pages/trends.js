import Nav from "../components/Nav";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { API } from "../config";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import Main from "../components/Main";
import { Box, Container, Grid, IconButton, InputBase } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useRouter } from "next/router";

const theme = createTheme();

const Body = styled("div")(({ theme }) => ({
  backgroundColor: "#ffff",
  color: "#fff",
  minHeight: "100vh",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const TrendingLinksPage = () => {
  const router = useRouter();
  const [popular, setPopular] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { query } = router;


  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    const response = await axios.get(`${API}/link/popular`);
    const sortedLinks = response.data.sort((a, b) => b.clicks - a.clicks);
    setPopular(sortedLinks.slice(0, 6)); // get only the first 6 links
  };
  

  const classes = makeStyles({
    search: {
      position: "relative",
      borderRadius: "9999px",
      backgroundColor: "#333",
      "&:hover": {
        backgroundColor: "#444",
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      paddingLeft: theme.spacing(8),
      width: "100%",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
      image: {
        width: '200px',
        height: '150px',
      }
    },
  })();

  const TrendingCard = ({ link }) => {
    const handleClick = async (linkId) => {
      const response = await axios.put(`${API}/click-count`, { linkId });
      loadPopular();
    };

    return (
      <div className="card">
        <a href={link.url} target="_blank">
          <img
            className="card-img-top"
            src={link.image ? link.image.url : "/static/images/default.jpg"}
            alt={link.title}
          />
        </a>
        <div className="card-body">
          <a href={link.url} target="_blank">
            <h5 className="card-title">{link.title}</h5>
          </a>
          <div className="views">
            <i className="far fa-eye"></i>
            <span>{link.clicks} views</span>
          </div>
        </div>
      </div>
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLinks = popular.filter((link) => {
    const searchTerms = searchQuery.trim().toLowerCase().split(' ');
    return searchTerms.every((term) =>
      link.title.toLowerCase().includes(term) ||
      link.description.toLowerCase().includes(term)
    );
  });

  const listOfLinks = () =>
    filteredLinks.map((link, index) => (
      <Grid item xs={6} sm={4} md={4} key={index}>
        <TrendingCard link={link} />
      </Grid>
    ));

  return (
    <div>
      <Nav />
      <Body>
        <Container>
          <Box my={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <h1 style={{color: "black"}} >Top Trending</h1>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <i className="fas fa-search"></i>
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={12}>
                <Grid container spacing={3}>
                  {listOfLinks()}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Body>
      <Footer />
    </div>
  );
};

export default TrendingLinksPage;
