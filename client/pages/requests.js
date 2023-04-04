import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import emailjs from 'emailjs-com';
import Nav from '../components/Nav';
import Body from '../components/Body';
import Footer from '../components/Footer';

const useStyles = makeStyles({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
    },
    textField: {
        width: '100%',
        margin: 10,
    },
    button: {
        width: '100%',
        margin: 10,
    },
});

function RequestForm() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        emailjs.sendForm('service_jv2eqge', 'template_dcolb3e', event.target, '8K5ll-8Vq9mTfzWio')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            
    };


    return (
        <React.Fragment>
            <Nav />
            <Body>
            <h1 className='text-center' style={{ fontFamily: 'monospace' }}>Request A Topic</h1>
        <form className={classes.formContainer} onSubmit={handleSubmit}>
            <TextField
                className={classes.textField}
                label="Name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                className={classes.textField}
                label="Email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
                className={classes.textField}
                label="Message"
                multiline
                rows={4}
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
            >
                Submit
            </Button>
        </form>
        </Body>
        <Footer />
        </React.Fragment>
    );
}

export default RequestForm;
