import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import moment from 'moment';
import { API } from '../../config';
import { getCookie } from '../../helpers/auth';
import withUser from '../withUser';
import Nav from '../../components/Nav';
import Body from '../../components/Body';
import Footer from '../../components/Footer';
import { Container, Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Badge,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    avatar: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    onlineBadge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px #fff`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            content: "''",
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));



const User = ({ user, userLinks, token }) => {
    const confirmDelete = (e, id) => {
        e.preventDefault();
        // console.log('delete > ', slug);
        let answer = window.confirm('Are you sure you want to delete?');
        if (answer) {
            handleDelete(id);
        }
    };

    const classes = useStyles();
    const [online, setOnline] = useState(true);

    const handleOnlineStatus = () => {
        setOnline(!online);
    };

    const handleDelete = async id => {
        console.log('delete link > ', id);
        try {
            const response = await axios.delete(`${API}/link/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('LINK DELETE SUCCESS ', response);
            Router.replace('/user');
        } catch (error) {
            console.log('LINK DELETE ', error);
        }
    };

    const listOfLinks = () => {
        if (userLinks.length === 0) {
          return <Typography variant="h6">No posts made by you yet</Typography>;
        }
        return userLinks.map((l, i) => (
            <CardContent>
              <a href={l.url} target="_blank">
                <Typography variant="h5" gutterBottom>
                  {l.title}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {l.description}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {l.url}
                </Typography>
              </a>
              <div className="row mt-2">
                <div className="col-md-6">
                  <Typography variant="subtitle2" color="textSecondary">
                    {moment(l.createdAt).fromNow()} by {l.postedBy.name}
                  </Typography>
                </div>
                <div className="col-md-6">
                  <Typography variant="subtitle2" color="textSecondary" align="right">
                    <span className="mr-2"></span>
                    {l.categories.map((c, i) => (
                      <span key={i} className="badge text-success mr-2">
                      </span>
                    ))}
                    <Link href={`/user/link/${l._id}`}>
                      <Button variant="contained" color="secondary" className="mr-2">
                        Update
                      </Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={(e) => confirmDelete(e, l._id)}>
                      Delete
                    </Button>
                  </Typography>
                </div>
              </div>
            </CardContent>
        ));
      };
      
    
        return (
            <React.Fragment>
                <Nav />
                <Body>
                    <Container maxWidth="md">
                        <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card className="p-3">
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Badge
                                            overlap="circle"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            variant="dot"
                                            classes={{ badge: classes.onlineBadge }}
                                        >
                                            <Avatar className={classes.avatar}>
                                                {user.name[0]}
                                            </Avatar>
                                        </Badge>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography variant="h6" gutterBottom>
                                            {user.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {user.email}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color={online ? 'primary' : 'secondary'}
                                            onClick={handleOnlineStatus}
                                        >
                                            {online ? 'Online' : 'Offline'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className="p-3">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            Actions
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                                <Link href="/user/link/create">
                                                    <Button variant="contained" color="primary">
                                                        Submit a link
                                                    </Button>
                                                </Link>
                            
                                                <Link href="/user/profile/update">
                                                    <Button variant="contained" color="secondary">
                                                        Update profile
                                                    </Button>
                                                </Link>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className="p-3">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            Your Posts
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {listOfLinks()}
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Body>
            <Footer />
        </React.Fragment>
    );
};

export default withUser(User);

