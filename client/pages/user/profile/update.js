import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import { API } from '../../../config';
import { isAuth, updateUser } from '../../../helpers/auth';
import withUser from '../../withUser';
import Nav from '../../../components/Nav';
import Body from '../../../components/Body';
import Footer from '../../../components/Footer';

import {
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formGroup: {
        marginBottom: theme.spacing(2),
    },
    label: {
        marginLeft: theme.spacing(1),
    },
}));

const Profile = ({ user, token }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        password: '',
        error: '',
        success: '',
        buttonText: 'Update',
        loadedCategories: [],
        categories: user.categories
    });

    const { name, email, password, error, success, buttonText, loadedCategories, categories } = state;

    // load categories when component mounts using useEffect
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`);
        setState({ ...state, loadedCategories: response.data });
    };

    const handleToggle = c => () => {
        // return the first index or -1
        const clickedCategory = categories.indexOf(c);
        const all = [...categories];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log('all >> categories', all);
        setState({ ...state, categories: all, success: '', error: '' });
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
                        checked={categories.includes(c._id)}
                        className="mr-2"
                    />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Update' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Updating...' });
        try {
            const response = await axios.put(
                `${API}/user`,
                {
                    name,
                    password,
                    categories
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response);
            updateUser(response.data, () => {
                setState({
                    ...state,
                    buttonText: 'Updated',
                    success: 'Profile updated successfully'
                });
            });
        } catch (error) {
            console.log(error);
            setState({ ...state, buttonText: 'Update', error: error.response.data.error });
        }
    };

    const updateForm = () => (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Name"
            value={name}
            onChange={handleChange('name')}
            variant="outlined"
            placeholder="Type your name"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={handleChange('email')}
            type="email"
            variant="outlined"
            placeholder="Type your email"
            required
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Password"
            value={password}
            onChange={handleChange('password')}
            type="password"
            variant="outlined"
            placeholder="Type your password"
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Category
          </Typography>
          <Box sx={{ maxHeight: '100px', overflowY: 'scroll' }}>{showCategories()}</Box>
          <Button variant="contained" color="warning" type="submit" sx={{ mt: 3 }}>
            {buttonText}
          </Button>
        </Box>
      );
      
      return (
        <React.Fragment>
            <Nav />
            <Body>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Update Profile
            </Typography>
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            {updateForm()}
          </Body>
            <Footer />
        </React.Fragment>
      );
    };

export default withUser(Profile);