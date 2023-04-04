import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const Thread = ({ title, content }) => {
  return (
    <Card sx={{ m: 2 }}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Thread;
