import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/common/Layout";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useDispatch } from "react-redux";
import { login } from "../reducer/authSlice";
import jwt_decode from 'jwt-decode';

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error,setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        const response = await axios.post("http://localhost:8000/user/login", formData);
        const { token } = response.data;
        console.log(response);
        if(response.status === 200){
          console.log('navigating...');
          console.log("Successfully logged in with token ",token);
          localStorage.setItem("token", token);
          setSuccessMessage("Login successful!")
          navigate("/");
        }
    } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      var decoded = jwt_decode(token);
      dispatch(login({ token, role: decoded.role }));
    }
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
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
            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                  {error}
                </Alert>
              )}

              {successMessage && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                  {successMessage}
                </Alert>
              )}

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LocalDiningIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <div
                  onClick={() => {
                    navigate("/forgot");
                  }}
                  variant="body3"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#1976D2",
                  }}
                >
                  Forgot password?
                </div>
              </Grid>
              <Grid item>
                <div
                  onClick={() => {
                    navigate("/signup");
                  }}
                  variant="body3"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#1976D2",
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
}
