import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import JavaScriptIcon from '@material-ui/icons/Language';
import { Box, Container, Grid, IconButton, Typography } from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';


const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom: 0,
    backgroundColor: '#fffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px 0'
  },
});

const Footer = ({ children }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentTime = new Date().toLocaleString();

  return (
<div className={classes.root} style={{ backgroundColor: "#000", padding: "30px 0", position: "position-fixed", bottom: 0, left: 0, right: 0 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12}>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            style={{ marginTop: "20px", backgroundColor: "#000", borderRadius: "10px"}}
          >
            <BottomNavigationAction label="GitHub" icon={<GitHubIcon style={{ fontSize: "40px", color: "#fff" }} />} />
            <BottomNavigationAction label="LinkedIn" icon={<LinkedInIcon style={{ fontSize: "40px", color: "#fff" }} />} />
            <BottomNavigationAction label="JavaScript" icon={<JavaScriptIcon style={{ fontSize: "40px", color: "#fff" }} />} />
          </BottomNavigation>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
            <EmailIcon style={{ fontSize: "40px", color: "#fff", marginRight: "10px" }} />
            <Typography variant="body1" component="p" style={{ color: "#fff" }}>Join my newsletter</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
            <PhoneIcon style={{ fontSize: "40px", color: "#fff", marginRight: "10px" }} />
            <Typography variant="body1" component="p" style={{ color: "#fff" }}>+1-555-1234</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
            <EmailIcon style={{ fontSize: "40px", color: "#fff", marginRight: "10px" }} />
            <Typography variant="body1" component="p" style={{ color: "#fff" }}>contact@domain.com</Typography>
          </div>
        </Grid>
      </Grid>
      <div className='text-center' style={{ color: "#fff", marginTop: "30px" }}>{currentTime}</div>
      <div className='text-center' style={{ color: "#fff", marginTop: "10px" }}>&copy; 2023 All rights reserved</div>
    </div>
  );

};

export default Footer;
