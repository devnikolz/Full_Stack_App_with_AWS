import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const showSuccessMessage = (success, setOpenSuccess) => (
    <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        open={Boolean(success)}
        autoHideDuration={5000}
        onClose={() => setOpenSuccess && setOpenSuccess(false)}
        message={success}
        action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSuccess && setOpenSuccess(false)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
        }
    />
);

const showErrorMessage = (error, setOpenError) => (
    <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        open={Boolean(error)}
        autoHideDuration={5000}
        onClose={() => setOpenError && setOpenError(false)}
        message={error}
        action={
            <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenError && setOpenError(false)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
        }
    />
);

export { showSuccessMessage, showErrorMessage };
