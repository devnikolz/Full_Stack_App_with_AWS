// import Link from 'next/link';
// import Body from '../../components/Body';
// import Footer from '../../components/Footer';
// import Nav from '../../components/Nav';
// import withAdmin from '../withAdmin';
// import { Button, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
// import { Person as PersonIcon } from '@material-ui/icons';
// import { BusinessCenter } from '@material-ui/icons';
// import React from 'react';


// const useStyles = makeStyles({
//   card: {
//     minWidth: 275,
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

// const CreateCategoryCard = () => {
//   const classes = useStyles();

//   return (
//     <React.Fragment>
//     <Card className={classes.card}>
//       <CardContent>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
//         <BusinessCenter /> Primary action
//         </Typography>
//         <Typography variant="h5" component="h2">
//           Create category
//         </Typography>
//         <Typography className={classes.pos} color="textSecondary">
//           Some quick example text to build on the card title and make up the bulk of the card's content.
//         </Typography>
//         <Link href="/admin/category/create">
//           <Button variant="contained" color="primary">
//             Create
//           </Button>
//         </Link>
//       </CardContent>
//     </Card>
//     </React.Fragment>
//   );
// };

// const Admin = ({ user }) => {
//   const classes = useStyles();

//   return (
//     <React.Fragment>
//       <Nav />
//       <Body>
//         <h1>Admin Dashboard</h1>
//         {/* <Button variant="contained" color="primary" startIcon={<PersonIcon />}>
//             {user.name}
//         </Button> */}
//         <br />
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                   Navigation
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                   All categories
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                   Some quick example text to build on the card title and make up the bulk of the card's content.
//                 </Typography>
//                 <Link href="/admin/category/read">
//                   <Button variant="contained" color="primary">
//                     View categories
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//             <br />
//             <CreateCategoryCard />
//             <br />
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                   Navigation
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                   All links
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                   Some quick example text to build on the card title and make up the bulk of the card's content.
//                 </Typography>
//                 <Link href="/admin/link/read">
//                   <Button variant="contained" color="primary">
//                     View links
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//             <br />
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                   Navigation
//                   </Typography>
//                 <Typography variant="h5" component="h2">
//                   Profile update
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                   Some quick example text to build on the card title and make up the bulk of the card's content.
//                 </Typography>
//                 <Link href="/user/profile/update">
//                   <Button variant="contained" color="primary">
//                     Update profile
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography className={classes.title} color="textSecondary" gutterBottom>
//                   Card content
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                   Title of the card
//                 </Typography>
//                 <Typography className={classes.pos} color="textSecondary">
//                   Some quick example text to build on the card title and make up the bulk of the card's content.
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                   More text here to fill up the card and make it look pretty.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Body>
//       <Footer />
//     </React.Fragment>
//   );
// };
// export default withAdmin(Admin);


import Layout from '../../components/Layout';
import withAdmin from '../withAdmin';
import Link from 'next/link';
import React from 'react';
import { Grid, Paper, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import Nav from '../../components/Nav';
import Body from '../../components/Body';
import Footer from '../../components/Footer';

const Admin = ({ user }) => {
  return (
    <React.Fragment>
      <Nav />
      <Body>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Categories
              </Typography>
              <List>
                <Link href="/admin/category/create">
                  <ListItem button>
                    <ListItemText primary="Create category" />
                  </ListItem>
                </Link>
                <Link href="/admin/category/read">
                  <ListItem button>
                    <ListItemText primary="All categories" />
                  </ListItem>
                </Link>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Links
              </Typography>
              <List>
                <Link href="/admin/link/read">
                  <ListItem button>
                    <ListItemText primary="All links" />
                  </ListItem>
                </Link>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Profile
              </Typography>
              <List>
                <Link href="/user/profile/update">
                  <ListItem button>
                    <ListItemText primary="Profile update" />
                  </ListItem>
                </Link>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Body>
      <Footer />
    </React.Fragment>
  );
};

export default withAdmin(Admin);
