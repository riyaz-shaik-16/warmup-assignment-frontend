// CompanyLogin.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
  Link,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

// Styled Components
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fff;
`;

const Card = styled(Box)`
  display: flex;
  background: #F8FAFF;
  border-radius: 20px;
  box-shadow: 0px 5px 36.2px 0px #8678FF40;
  overflow: hidden;
  max-width: 1200px;
  width: 100%;
  padding: 30px;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: 50px;
`;

const GradientBox = styled(Box)`
  flex-shrink: 0;
  background: linear-gradient(180deg, #F9D8FF, #6647D6);
  box-shadow: 0px 5px 36.2px 0px #8678FF40;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 50%;

  @media (max-width: 1024px) {
    width: 500px;
    height: 600px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
  }
`;

const FormBox = styled(Box)`
  flex: 1;
  padding: 20px 40px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  background: linear-gradient(90deg, #4a6cf7, #6a5cff);
  text-transform: none;
  font-weight: bold;
  border-radius: 25px;
  padding: 12px 0;
  &:hover {
    opacity: 0.9;
    background: linear-gradient(90deg, #4a6cf7, #6a5cff);
  }
`;

const InputContainer = styled(Box)`
  width: 430px;
  height: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${(props) => (props.mt ? props.mt : "0px")};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputLabel = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #000;
  margin-bottom: 4px;
`;

const smallLinkStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  mt: 0.5,
  cursor: "pointer",
  color: "#6647D6",
  textDecoration: "none",
};

const sharedInputStyle = {
  borderRadius: "10px",
  backgroundColor: "#F8FAFF",
  boxShadow: "0px 5px 36.2px 0px #0000001A",
  "& fieldset": { border: "none" },
  px: 2,
  py: 1,
  height: "42px",
  fontSize: "14px",
  fontFamily: "'Inter', sans-serif",
};

export default function CompanyLogin() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
      phone: "",
    },
  });

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const onSubmit = (data) => {
    toast.success("Login successful!", { position: "top-right" });
    console.log(data);
  };

  return (
    <Container>
      <Card isMobile={isMobile}>
        <GradientBox>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: { xs: 20, md: 28 },
              color: "#fff",
            }}
          >
            IMG Placeholder
          </Typography>
        </GradientBox>

        <FormBox>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "32px",
              textAlign: "center",
              marginBottom: "20px",
            }}
            gutterBottom
          >
            Login as a Company
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Email */}
            <InputContainer>
              <InputLabel>Email ID</InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ sx: sharedInputStyle }}
                  />
                )}
              />
            </InputContainer>

            {/* Mobile */}
            <InputContainer mt="16px">
              <InputLabel>Mobile Number</InputLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country={"in"}
                    inputStyle={{
                      width: "100%",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "#F8FAFF",
                      boxShadow: "0px 5px 36.2px 0px #0000001A",
                      border: "none",
                      paddingLeft: "50px",
                      fontSize: "14px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    buttonStyle={{
                      border: "none",
                      background: "transparent",
                      marginLeft: "10px",
                      borderRadius: "10px",
                    }}
                    dropdownStyle={{
                      position: "absolute",
                      top: "45px",
                      backgroundColor: "#fff",
                      zIndex: 9999,
                      fontFamily: "'Inter', sans-serif",
                    }}
                    specialLabel=""
                  />
                )}
              />
            </InputContainer>

            {/* Password */}
            <InputContainer mt="16px">
              <InputLabel>Enter your password</InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type="password"
                    variant="outlined"
                    InputProps={{ sx: sharedInputStyle }}
                  />
                )}
              />
              <Link href="#" sx={smallLinkStyle}>
                Forgot Password?
              </Link>
            </InputContainer>

            {/* Submit */}
            <StyledButton type="submit" variant="contained" fullWidth>
              Login
            </StyledButton>

            {/* Sign Up Link */}
            <Typography align="center" sx={{ mt: 2, fontFamily: "Inter, sans-serif", fontSize: 14 }}>
              Don’t have an account?{" "}
              <Link href="#" sx={smallLinkStyle}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </FormBox>
      </Card>
    </Container>
  );
}
