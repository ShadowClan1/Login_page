import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsCheck: false,
  };
  const form = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      termsCheck: Yup.boolean().required(),
      password: Yup.string().required(),
    }),
    onSubmit: () => {
        console.log(form.values)
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    form.handleSubmit();
  };
  return (
    <Box component="form" noValidate  sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            value={form.values.firstName}
            onChange={form.handleChange}
            error={form.touched.firstName && Boolean(form.errors.firstName)}
            helperText={form.touched.firstName && "First Name is required"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={form.values.lastName}
            onChange={form.handleChange}
            error={form.touched.lastName && Boolean(form.errors.lastName)}
            helperText={form.touched.lastName && "Last Name is reuired"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={form.values.email}
            onChange={form.handleChange}
            error={form.touched.email && Boolean(form.errors.email)}
            helperText={form.touched.email && form.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={form.values.password}
            onChange={form.handleChange}
            error={form.touched.password && Boolean(form.errors.password)}
            helperText={form.touched.password && form.errors.password}
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                value={form.values.termsCheck}
                onChange={form.handleChange}
                color="primary" name="termsCheck" 
              />
            }
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpForm;
