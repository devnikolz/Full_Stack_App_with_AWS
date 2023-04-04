import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, logout } from '../helpers/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const head = () => (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="/static/css/styles.css" />
        </React.Fragment>
    );

    const nav = () => (
        <nav className="nav nav-tabs" style={{backgroundColor:"red"}}>
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-light">Young Developer Hub</a>
                </Link>
            </li>
            {isAuth() && (
                <li className="nav-item ml-auto">
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {!isAuth() && (
                            <React.Fragment>
                                <MenuItem onClick={handleClose}>
                                    <Link href="/login">
                                    <a className="nav-link text-dark">Login</a>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link href="/register">
                                        <a className="nav-link text-dark">Register</a>
                                    </Link>
                                </MenuItem>
                            </React.Fragment>
                        )}

                        {isAuth() && isAuth().role === 'admin' && (
                            <MenuItem onClick={handleClose}>
                                <Link href="/admin">
                                    <a className="nav-link text-dark">{isAuth().name}</a>
                                </Link>
                            </MenuItem>
                        )}

                        {isAuth() && isAuth().role === 'subscriber' && (
                            <MenuItem onClick={handleClose}>
                                <Link href="/user">
                                    <a className="nav-link text-dark">{isAuth().name}</a>
                                </Link>
                            </MenuItem>
                        )}

                        <MenuItem onClick={handleClose}>
                        <Link href="/user/link/create">
                            <a className="nav-link text-dark">
                            Submit a link
                            </a>
                        </Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                        <Link href="/requests">
                            <a className="nav-link text-dark">
                            Request a topic
                            </a>
                        </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                        <Link href="/code">
                            <a className="nav-link text-dark">
                            Code editor
                            </a>
                        </Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                            <a onClick={logout} className="nav-link text-dark">
                                Logout
                            </a>
                        </MenuItem>
                    </Menu>
                </li>
            )}
        </nav>
    );

    return (
        <React.Fragment>
            {head()}
            {nav()}
            <div className="container pt-5 pb-5">{children}</div>
        </React.Fragment>
    );
};

export default Layout;

                
