import { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signUpImage.png";
import {useHistory} from 'react-router-dom';
import { useAuth } from "useAuth";
function SignUp() {
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const {signup , setIsAuthenticated} = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response.status);
      if (response.status != 200) {
        throw new Error("Failed to sign up");
      }
      const result = await response.json();
      if(rememberMe) {
        signup(result.token);
      } else {
        setIsAuthenticated(true);
      }
      console.log("Sign up successful:", result.token);
      history.push("/dashboard");
      alert("Sign up successful!");
    } catch (error) {
      console.error(error);
      alert(`Error signing up. Please try again. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgSignIn}
      premotto="INSPIRED BY THE FUTURE:"
      motto="INSPIRED FOR FUTURE."
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
          onSubmit={handleSubmit}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Register with
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton>
                  <FaFacebook size={24} color="white" />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton>
                  <FaApple size={24} color="white" />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton>
                  <FaGoogle size={24} color="white" />
                </IconButton>
              </a>
            </GradientBorder>
          </Stack>
          <VuiTypography color="text" fontWeight="bold" textAlign="center" mb="14px">
            or
          </VuiTypography>
          <VuiBox mb={2}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Name
            </VuiTypography>
            <GradientBorder borderRadius={borders.borderRadius.lg} padding="1px">
              <VuiInput
                name="name"
                placeholder="Your full name..."
                value={formData.name}
                onChange={handleChange}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
            <GradientBorder borderRadius={borders.borderRadius.lg} padding="1px">
              <VuiInput
                name="email"
                type="email"
                placeholder="Your email..."
                value={formData.email}
                onChange={handleChange}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
            <GradientBorder borderRadius={borders.borderRadius.lg} padding="1px">
              <VuiInput
                name="password"
                type="password"
                placeholder="Your password..."
                value={formData.password}
                onChange={handleChange}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Remember me
            </VuiTypography>
          </VuiBox>
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "SIGN UP"}
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authenticate/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignUp;