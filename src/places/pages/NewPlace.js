import React, { useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string("Enter your title").required("Title is required"),
  address: yup.string("Enter address").required("Address is required"),
  location: yup.number("Enter location").required("Location is required"),
  description: yup
    .string("Enter your description")
    .min(8, "Description should be of minimum 8 characters length")
    .required("Description is required"),
});

const theme = createTheme();

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      title: "",
      address: "",
      location: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios({
        method: "post",
        url: "http://localhost:3000/api/places",
        data: JSON.stringify({
          title: values.title,
          address: values.address,
          location: values.location,
          description: values.description,
          creator: auth.userId,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          //handle success
          alert("New Place Added Successfully");
        })
        .catch(function (response) {
          //handle error
          history.push("/")
        });
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AddLocationAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              New Places
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    placeholder="Please Enter Title"
                    value={formik.values.title}
                    style={{ width: 400 }}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    name="address"
                    placeholder="Please Enter Address"
                    value={formik.values.address}
                    style={{ width: 400 }}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="location"
                    name="location"
                    placeholder="Please Enter Location"
                    value={formik.values.location}
                    style={{ width: 400 }}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    id="description"
                    name="description"
                    type="description"
                    placeholder="Please Enter Description"
                    rows={4}
                    style={{ width: 400 }}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Place
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default NewPlace;
