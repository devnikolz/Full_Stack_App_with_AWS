import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../helpers/alerts';
import { API } from '../config';
import { authenticate, isAuth } from '../helpers/auth';
import Nav from '../components/Nav';
import Body from '../components/Body';
import Footer from '../components/Footer';
import { Container, Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));

const Login = () => {

    const classes = useStyles();


    const [state, setState] = useState({
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Login'
    });

    useEffect(() => {
        isAuth() && Router.push('/');
    }, []);

    const { email, password, error, success, buttonText } = state;

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Login' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Logging in' });
        try {
            const response = await axios.post(`${API}/login`, {
                email,
                password
            });
            // console.log(response); // data > token / user
            authenticate(response, () =>
                isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user')
            );
        } catch (error) {
            console.log(error);
            setState({ ...state, buttonText: 'Login', error: error.response.data.error });
        }
    };


        return (
          <React.Fragment>
            <Nav />
            <Body>
              <Container maxWidth="md">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h3" component="h1" gutterBottom>
                      Login
                    </Typography>
                    <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleChange('email')}
                        margin="normal"
                        variant="outlined"
                        required
                      />
                      <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handleChange('password')}
                        margin="normal"
                        variant="outlined"
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submitButton}
                        disabled={!email || !password || buttonText === 'Logging in...'}
                      >
                        {buttonText}
                      </Button>
                    </form>
                    <Link href="/auth/password/forgot">
                      <Typography variant="body2" align="right">
                        <Link href="/auth/password/forgot">
                          <a className="text-danger">Forgot Password</a>
                        </Link>
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Container>
            </Body>
            <Footer />
          </React.Fragment>
        );
      };

export default Login;