import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getJobsThunk } from "../app/jobs/thunks";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PaidIcon from "@mui/icons-material/Paid";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

const JobPage = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  useEffect(() => {
    dispatch(getJobsThunk());
  }, [dispatch]);
  return (
    <div>
      {jobs.map((el) => (
        <Box sx={{ minWidth: 275 }} key={el.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" component="div">
                {el.title}
              </Typography>

              <Typography variant="body2">
                {el.description}
                <br />
                {'"a benevolent smile"'}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {el.paid ? <PaidIcon /> : <MoneyOffIcon />}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {el.user.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link style={{ textDecoration: "none" }} to={`/jobs/${el.id}`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      ))}
    </div>
  );
};

export default JobPage;
