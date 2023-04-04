import { useState } from "react";
import {
    Button,
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Instagram, Twitter, GitHub } from "@material-ui/icons";

const cardData = [
    {
        title: "Profile",
        description: "A JavaScript library for building user interfaces",
        media:
            "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
        isVideo: false,
    },
    {
        title: "Topics",
        description: "A secure cloud services platform",
        media:
            "https://cdn.iconscout.com/icon/free/png-512/amazon-web-services-1869033-1583149.png",
        isVideo: false,
    },
    {
        title: "Trending",
        description:
            "A powerful and intuitive programming language for iOS, macOS, tvOS, and watchOS",
        media: "https://cdn.iconscout.com/icon/free/png-256/swift-13-722653.png",
        isVideo: false,
    }
    // ,
    // {
    //     title: "Submit a Post",
    //     description: "A JavaScript library for building user interfaces",
    //     media:
    //         "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    //     isVideo: false,
    // },
    // {
    //     title: "Code Editor",
    //     description: "A secure cloud services platform",
    //     media:
    //         "https://cdn.iconscout.com/icon/free/png-512/amazon-web-services-1869033-1583149.png",
    //     isVideo: false,
    // },
    // {
    //     title: "Q & A",
    //     description:
    //         "A powerful and intuitive programming language for iOS, macOS, tvOS, and watchOS",
    //     media: "https://cdn.iconscout.com/icon/free/png-256/swift-13-722653.png",
    //     isVideo: false,
    // },
];

const cardData2 = [{ title: "Card Title 1", description: "Card Description 1", media: "https://picsum.photos/id/1018/400/300", }, { title: "Card Title 2", description: "Card Description 2", media: "https://picsum.photos/id/1019/400/300", }, { title: "Card Title 3", description: "Card Description 3", media: "https://picsum.photos/id/1020/400/300", }, { title: "Card Title 4", description: "Card Description 4", media: "https://picsum.photos/id/1021/400/300", },];


const Main = () => {
    const [cardIndex, setCardIndex] = useState(1);

    const handleNextClick = () => {
        setCardIndex((cardIndex + 1) % cardData.length);
    };

    return (
        <Box sx={{ width: "100%", minHeight: "75vh", backgroundColor: "white" }}>
            <StyledBox>
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "50px",
                                marginBottom: "20px",
                            }}
                        >
                            <IconButton
                                sx={{ color: "white" }}
                                href="https://www.instagram.com/"
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton sx={{ color: "white" }} href="https://twitter.com/">
                                <Twitter />
                            </IconButton>
                            <IconButton sx={{ color: "white" }} href="https://github.com/">
                                <GitHub />
                            </IconButton>
                        </Box>
                        <StyledTitle variant="h2" component="h1" gutterBottom>
                            Welcome Young Developer
                        </StyledTitle>
                        <Grid container spacing={4} justifyContent="center">
                            {cardData.map((card, index) => (
                                <Grid item xs={6} sm={6} md={3} key={index}>
                                    <StyledCard isActive={cardIndex === index}>
                                        <Box sx={{ position: "relative" }}>
                                            {card.isVideo ? (
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    style={{ width: "100%", height: "100%" }}
                                                >
                                                    <source src={card.media} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <CardMedia
                                                    component="img"
                                                    image={card.media}
                                                    alt={card.title}
                                                    sx={{ width: "100%", height: "100%" }}
                                                />
                                            )}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    backgroundImage:
                                                        "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
                                                }}
                                            />
                                        </Box>
                                        <CardContent
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                component="h2"
                                                sx={{ color: "white" }}
                                            >
                                                {card.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                component="p"
                                                sx={{ color: "white" }}
                                            >
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                        <StyledTitle variant="h4" component="h4" gutterBottom>
                        </StyledTitle>
                        <StyledTitle variant="h4" component="h4" gutterBottom>
                        </StyledTitle>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNextClick}
                        >
                            Click
                        </Button>
                        <StyledTitle variant="h4" component="h4" gutterBottom>
                            About
                        </StyledTitle>
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
                            use creativity to incorporate the paragraph into their writing.
                        </Typography>
                    </Box>
                    <StyledTitle variant="h4" component="h4" gutterBottom>

                        </StyledTitle>
                </Container>
            </StyledBox>
        </Box>
    );
};

const StyledBox = styled(Box)({
    backgroundColor: "#000",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const StyledBox2 = styled(Box)({
    backgroundColor: "#fff",
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const StyledTitle = styled(Typography)({
    color: "white",
    fontSize: "60px",
    fontWeight: 700,
    marginBottom: "20px",
});

const StyledTitle2 = styled(Typography)({
    color: "black",
    fontSize: "60px",
    fontWeight: 700,
    marginBottom: "20px",
});

const StyledSubTitle = styled(Typography)({
    color: "black",
    fontSize: "30px",
    fontWeight: 700,
    marginBottom: "20px",
});

const StyledCardSlider = styled(Box)({
    margin: "80px 0 40px 0",
});

const StyledCard = styled(Card)(({ isActive }) => ({
    width: "100%",
    height: "100%",
    opacity: isActive ? 1 : 0.5,
    transition: "opacity 0.3s ease-in-out",
    position: "relative",
    transform: isActive ? "scale(1.1)" : "scale(1)",
}));

const StyledCard2 = styled(Card)(({ isActive }) => ({
    width: "75%",
    height: "100%",
    opacity: isActive ? 1 : 0.5,
    transition: "opacity 0.3s ease-in-out",
    position: "relative",
    transform: isActive ? "scale(1.1)" : "scale(1)",
}));
export default Main;
