import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { API } from "../config";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Footer from "../components/Footer";
import Body from "../components/Body";
import Nav from "../components/Nav";
import Chip from "@material-ui/core/Chip";
import Main from "../components/Main";
import { Box, Container, Grid, IconButton, TextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const cardData2 = [
  {
    title: "React.js",
    description: "A JavaScript library for building user interfaces",
    media:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    url: "https://en.wikipedia.org/wiki/React_(JavaScript_library)",
  },
  {
    title: "MongoDB Atlas",
    description: "A fully-managed cloud database developed by MongoDB",
    media:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/1200px-MongoDB_Logo.svg.png",
    url: "https://en.wikipedia.org/wiki/MongoDB_Atlas",
  },
  {
    title: "Amazon Web Services",
    description:
      "A collection of remote computing services (also called web services) that make up a cloud computing platform, offered by Amazon.com",
    media:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/1200px-AWS_Simple_Icons_AWS_Cloud.svg.png",
    url: "https://en.wikipedia.org/wiki/Amazon_Web_Services",
  },
  {
    title: "Swift",
    description:
      "A general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. for iOS, iPadOS, macOS, watchOS, tvOS, and Linux",
    media:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/1200px-Swift_logo.svg.png",
    url: "https://en.wikipedia.org/wiki/Swift_(programming_language)",
  },
];

const Home = ({ categories }) => {
  const [popular, setPopular] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);


  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    const response = await axios.get(`${API}/link/popular`);
    // console.log(response);
    setPopular(response.data);
  };

  const handleClick = async (linkId) => {
    const response = await axios.put(`${API}/click-count`, { linkId });
    loadPopular();
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery)
    );
    setFilteredCategories(filtered);
  };


  //   const listOfLinks = () =>
  //   popular.map((link, index) => (
  //     <Card key={index} className={classes.linkCard} style={{ marginBottom: "16px" }}>
  //     <CardActionArea onClick={() => handleClick(link._id)}>
  //         <CardContent>
  //             <Typography gutterBottom variant="h5" component="h2" className={classes.linkTitle}>
  //                 {link.title}
  //             </Typography>
  //             <Typography variant="body2" color="textSecondary" component="p" className={classes.linkUrl}>
  //                 {link.url}
  //             </Typography>
  //         </CardContent>
  //     </CardActionArea>
  //     <CardActions className={classes.linkCardActions}>
  //         <div className={classes.linkCardAction}>
  //             <Typography variant="caption" color="textSecondary" component="p">
  //                 {link && link.createdAt && moment(link.createdAt).fromNow()} by {link && link.postedBy && link.postedBy.name}
  //             </Typography>
  //         </div>
  //         <div className={classes.linkCardAction}>
  //             <Typography variant="caption" color="textSecondary" component="p">
  //                 {link.type} {link.medium}
  //             </Typography>
  //         </div>
  //         <div className={classes.linkCardAction}>
  //             {link.categories.map((category, index) => (
  //                 <Chip key={index} label={category.name} className={classes.linkCategory} />
  //             ))}
  //         </div>
  //         <div className={classes.linkCardAction}>
  //             <Typography variant="caption" color="textSecondary" component="p">
  //                 {link.clicks} clicks
  //             </Typography>
  //         </div>
  //         <Button size="small" color="primary">
  //             <Link href={`/links/${link._id}`}>Learn More</Link>
  //         </Button>
  //     </CardActions>
  // </Card>

  //   ));

  const listCategories = () =>
  filteredCategories.map((c, i) => (
    <Link key={i} href={`/links/${c.slug}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={c.image && c.image.url}
            title={c.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {c.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  ));

  console.log(categories);

  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      height: 375,
    },
    media: {
      height: 250,
      width: 345,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Nav />
      <Main />
      <Body>
        <div className="row">
          <div className="col-md-12">
            <h1 className="font-weight-bold">View the Topics</h1>
            <p className="font-weight-bold">
              If you have suggestion, navigate to request a topic tab
            </p>

            <br />
          </div>
          <TextField
          label="Search Categories"
          variant="outlined"
          onChange={handleSearch}
          className={classes.search}
        />

        </div>

        <div className="row">{listCategories()}</div>
        {/* 
                <h2 className="font-weight-bold pb-3">Trending {popular.length}</h2>
                {<div className="">{listOfLinks()}</div>} */}
      </Body>
      <StyledBox2>
        <StyledTitle2 variant="h4" component="h4" gutterBottom>
          Build On
        </StyledTitle2>
        <Grid container spacing={2} justifyContent="center">
          {cardData2.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledCard2>
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={card.media}
                    alt={card.title}
                    sx={{ height: 200 }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      padding: "50%",
                    }}
                  >
                    {/* <Typography variant="p" component="p">
              {card.title}
            </Typography> */}
                    {/* <Typography variant="body2" component="p">
              {card.description}
            </Typography> */}
                  </Box>
                </Box>
              </StyledCard2>
            </Grid>
          ))}
          <StyledSubTitle>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              sx={{ color: "white" }}
            >
              Generating random paragraphs can be an excellent way for writers
              to get their creative flow going at the beginning of the day. The
              writer has no idea what topic the random paragraph will be about
              when it appears. This forces the writer to use creativity to
              complete one of three common writing challenges. The writer can
              use the paragraph as the first one of a short story and build upon
              it. A second option is to use the random paragraph somewhere in a
              short story they create. The third option is to have the random
              paragraph be the ending paragraph in a short story. No matter
              which of these challenges is undertaken, the writer is forced to
              use creativity to incorporatethe paragraph into their writing.
            </Typography>
          </StyledSubTitle>
        </Grid>
      </StyledBox2>
      <Footer />
    </React.Fragment>
  );
};

const StyledBox2 = styled(Box)({
  backgroundColor: "#000",
  minHeight: "25vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledTitle2 = styled(Typography)({
  color: "white",
  fontSize: "60px",
  fontWeight: 700,
  marginBottom: "20px",
});

const StyledSubTitle = styled(Typography)({
  color: "white",
  fontSize: "30px",
  fontWeight: 700,
  marginBottom: "20px",
});

const StyledCard2 = styled(Card)(({ isActive }) => ({
  width: "25%",
  height: "100%",
  opacity: isActive ? 1 : 0.5,
  transition: "opacity 0.3s ease-in-out",
  position: "relative",
}));

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`);
  return {
    categories: response.data,
  };
};

export default Home;
