// CompanyRegister.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import api from "../utils/axiosInstance";
import Verify from "./Verify";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../utils/firebase"


// Styled Components
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fff;
`;

const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile", // block custom prop
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
  padding: 20px 40px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  background:#5C7FFF;
  text-transform: none;
  font-weight: bold;
  border-radius: 25px;
  padding: 12px 0;
  &:hover {
    opacity: 0.9;
    background: #5C7FFF;
  }
`;

// Reusable Input Container
const InputContainer = styled(Box)`
  height: 68px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${(props) => (props.mt ? props.mt : "0px")};
`;

// Label
const InputLabel = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #000;
  margin-bottom: 4px;
`;

// Shared TextField Style
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

// Passwords side-by-side container
const PasswordsContainer = styled(Box)`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

// Terms container
const TermsContainer = styled(Box)`
  width: 100%;
  border-radius: 10px;
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Styled Checkbox
const StyledCheckbox = styled(Checkbox)`
  padding: 0;
  margin-top: 6px;
  & .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

export default function CompanyRegister() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      mobile_no: "",
      email: "",
      gender: "",
      password: "",
      confirm_password: "",
      terms: false,
    },
  });

  const [linkSent, setLinkSent] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (formData) => {
    const { data } = await api.post("/auth/register", formData);
    return data.data;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Data (In on success): ", data);
      sendOtp(mobileNo);
    },
    onError: (error) => {
      console.log("Error: ", error.response.data.message);
      toast.error(`Registration failed: ${error.response.data.message}`);
    },
  });

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const onSubmit = (data) => {
    const genderMap = { male: 'M', female: 'F', other: 'O' };
    const payload = { ...data, gender: genderMap[data.gender] || "" };

    console.log("Data sent to API: ", payload);
    mutation.mutate(payload);
  };

  const options = ["male", "female", "other"];
  const selectedGender = watch("gender");
  const mobileNo = watch("mobile_no");
  const email = watch("email");

  const sendOtp = async (pn) => {
    try {
      const phoneNumber = `+${pn}`;
      const testNumbers = {
        "+919999999999": "302630",
      };

      // console.log("Phone number: ", phoneNumber);

      if (!testNumbers[phoneNumber]) {
        console.warn("Use a Firebase test number for Spark plan.");
        toast.warning("Use a Firebase test number for Spark plan.");
        return;
      }

      window.confirmationResult = {
        confirm: async (otp) => {
          console.log("OTP given by user: ", otp);
          console.log("Actual otp: ", testNumbers[phoneNumber]);
          if (otp === testNumbers[phoneNumber]) {
            return { user: { phoneNumber } }; // Simulate user object
          } else {
            toast.error("Invalid OTP ❌");
            throw new Error("Invalid OTP ❌");
          }
        },
      };

      setLinkSent(true); // Show modal
      console.log(`OTP sent ✅ (Test Number: ${phoneNumber})`);
      toast.success("OTP sent!");
    } catch (error) {
      console.error("Error sending OTP ❌", error);
      toast.error("Error sending OTP ❌");
    }
  };

  // Verify OTP entered by user
  const verifyOtp = async (otp) => {
    try {
      console.log("otp got to verify: ", otp);
      const result = await window.confirmationResult.confirm(otp);
      // console.log("Phone verified ✅", result.user);
      
      verifyOtpMutation.mutate(email);
    } catch (error) {
      console.error("Invalid OTP ❌", error);
      toast.error("Invalid OTP, try again!");
    }
  };

  const handleVerifyOtp = async (email) => {
    const { data } = await api.post("/auth/verify-mobile", { email });
    return data.data;
  };

  const verifyOtpMutation = useMutation({
    mutationFn: handleVerifyOtp,
    onSuccess: (data) => {
      toast.success("OTP verification complete! Redirecting...");
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error in verify otp mutation: ", error.response.data.message);
      toast.error(`OTP verification failed: ${error.response.data.message}`);
    },
  });

  const handleSelect = (value) => {
    setValue("gender", value, { shouldValidate: true });
  };

  const formatPhoneNumber = (mobile_no) => {
    const str = mobile_no.toString();

    if (str.length <= 8) {
      return `+${str}`;
    }

    const firstFive = str.slice(0, 5);
    const lastThree = str.slice(-3);
    const masked = firstFive + "*****" + lastThree;

    return `+${masked}`;
  };




  return (
    <Container>
      {linkSent && <Verify open={true} mobileNumber={formatPhoneNumber(mobileNo)} handleVerify={verifyOtp} />}
      <Box id="recaptcha-container"></Box>
      <Card isMobile={isMobile}>
        <GradientBox />
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
            Register as a Company
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <InputContainer>
              <InputLabel htmlFor="full_name">Full Name</InputLabel>
              <TextField
                fullWidth
                id="full_name"
                placeholder="Enter Your Full Name"
                {...register("full_name", { required: "Full Name is required" })}
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
                InputProps={{ sx: sharedInputStyle }}
              />
            </InputContainer>

            {/* Mobile No */}
            <InputContainer mt="16px">
              <InputLabel htmlFor="mobile_no">Mobile No</InputLabel>
              <Controller
                name="mobile_no"
                id="mobile_no"
                control={control}
                rules={{ required: "Mobile No is required" }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    id="mobile_no"
                    name="mobile_no"
                    country="in"
                    containerStyle={{ width: "100%" }}
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
              {errors.mobile_no && (
                <FormHelperText error>{errors.mobile_no.message}</FormHelperText>
              )}
            </InputContainer>

            {/* Organization Email */}
            <InputContainer mt="16px">
              <InputLabel htmlFor="email">Organization Email</InputLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Enter Organization Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{ sx: sharedInputStyle }}
              />
            </InputContainer>

            {/* Gender */}
            <Box mt={2} sx={{ width: "100%" }}>
              <InputLabel>Gender</InputLabel>
              <Box sx={{ display: "flex", gap: 2 }}>
                {options.map((value) => {
                  const isSelected = selectedGender === value;
                  return (
                    <Box
                      key={value}
                      onClick={() => handleSelect(value)}
                      sx={{
                        flex: 1,
                        py: 1,
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "50px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: isSelected ? 600 : 500,
                        backgroundColor: isSelected ? "#5C7FFF" : "#fff",
                        color: isSelected ? "#fff" : "#000",
                        boxShadow: "0px 5px 36.2px 0px #0000001A",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: isSelected ? "#5C7FFF" : "#eee",
                        },
                      }}
                    >
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Box>
                  );
                })}
              </Box>
              {errors.gender && (
                <FormHelperText error>{errors.gender.message}</FormHelperText>
              )}
            </Box>

            {/* Passwords */}
            <PasswordsContainer>
              <InputContainer>
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField
                  id="password"
                  type="password"
                  fullWidth
                  placeholder="Enter Password"
                  {...register("password", { required: "Password is required" })}
                  error={!!errors.password}
                  autoComplete="new-password"
                  helperText={errors.password?.message}
                  InputProps={{ sx: sharedInputStyle }}
                />
              </InputContainer>

              <InputContainer>
                <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                <TextField
                  id="confirm_password"
                  type="password"
                  fullWidth
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                  })}
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password?.message}
                  InputProps={{ sx: sharedInputStyle }}
                />
              </InputContainer>
            </PasswordsContainer>

            {/* Terms */}
            <TermsContainer>
              <StyledCheckbox {...register("terms", { required: true })} />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  lineHeight: "18px",
                  color: "#000",
                  ml: 1,
                }}
              >
                All your information is collected, stored, and processed as per our
                data processing guidelines. By signing on, you agree to our{" "}
                <a href="#" style={{ color: "#6647D6" }}>Privacy Policy</a> and{" "}
                <a href="#" style={{ color: "#6647D6" }}>Terms of Use</a>.
              </Typography>
            </TermsContainer>
            {errors.terms && (
              <FormHelperText error>
                You must accept the terms to continue
              </FormHelperText>
            )}

            {/* Submit */}
            <StyledButton type="submit" variant="contained" fullWidth>
              {mutation.isPending ? "Wait a sec.." : "Register"}
            </StyledButton>

            <Typography align="center" marginTop={2}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#5C7FFF" }}
              >
                Login
              </Link>
            </Typography>
          </form>
        </FormBox>
      </Card>
    </Container>
  );
}
