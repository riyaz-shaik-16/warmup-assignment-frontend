// CompanyLogin.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../store/slices/auth.slice";
import api from "../utils/axiosInstance"
import { Link } from "react-router-dom";

// Styled Components
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fff;
`;

const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",  // prevent leak
})(({ isMobile }) => ({
  display: "flex",
  background: "#F8FAFF",
  borderRadius: "20px",
  boxShadow: "0px 5px 36.2px 0px #8678FF40",
  overflow: "hidden",
  maxWidth: "1200px",
  width: "100%",
  padding: "30px",
  flexDirection: isMobile ? "column" : "row",
  gap: "50px",
}));

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

  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
  }
`;

const FormBox = styled(Box)`
  width:50%;
  flex: 1;
  padding: 20px 40px;
  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  background: #5C7FFF;
  text-transform: none;
  font-weight: bold;
  height:45px;
  border-radius: 36px;
  &:hover {
    opacity: 0.9;
    background: #5C7FFF;
  }
`;

const InputContainer = styled(Box)`
  width: 100%;
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
    },
  });

  const loginUser = async (formData) => {
    const {data} = await api.post("/auth/login",formData);
    console.log("Data from server: ",data);
    return data.data;
    
    
  }

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn:loginUser,
    onSuccess:(data)=>{
      console.log("Data: ",data);
      toast.success("Logged in Successfully!")
      localStorage.setItem("token",data.token);
      dispatch(setUser({token:data.token,user:{}}));
    },
    onError:(error)=>{
      toast.error(error.response.data.message || "Internal server error!")
      console.log("Error: ",error);
    }
    
  })

  const onSubmit = (data)=>{
      console.log("Data: ",data);
      mutation.mutate(data);
  }

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // const onSubmit = (data) => {
  //   toast.success("Login successful!", { position: "top-right" });
  //   console.log(data);
  // };


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
                    autoComplete="new-password"
                    InputProps={{ sx: sharedInputStyle }}
                  />
                )}
              />
              <Link href="#" style={{textDecoration:"none",color:"#5C7FFF"}}>
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
              <Link to="/register" style={{textDecoration:"none",color:"#5C7FFF"}}>Signup</Link>
            </Typography>
          </Box>
        </FormBox>
      </Card>
    </Container>
  );
}
