// CompanyRegister.js
import React from "react";
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
  max-width:1200px;
  width: 100%;
  padding: 30px;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap:50px
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

  /* Desktop */
  width: 50%;
  height: 726px;

  /* Tablet */
  @media (max-width: 1024px) {
    width: 500px;
    height: 600px;
  }

  /* Mobile */
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

// Reusable Input Container
const InputContainer = styled(Box)`
  width: 430px;
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
  width: 430px;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

// Terms container
const TermsContainer = styled(Box)`
  width: 430px;
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
  } = useForm();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const onSubmit = (data) => {
    toast.success("Registration successful!", { position: "top-right" });
    console.log(data);
  };

  const options = ["male", "female", "other"];
  const selectedGender = watch("gender");

  const handleSelect = (value) => {
    setValue("gender", value, { shouldValidate: true });
  };

  return (
    <Container>
      <Card isMobile={isMobile}>
        <GradientBox />
        <FormBox>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "32px",
              textAlign: "center",
              marginBottom:'20px'
            }}
            gutterBottom
          >
            Register as a Company
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <InputContainer>
              <InputLabel>Full Name</InputLabel>
              <TextField
                fullWidth
                placeholder="Enter Your Full Name"
                {...register("fullName", { required: "Full Name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                InputProps={{ sx: sharedInputStyle }}
              />
            </InputContainer>

            {/* Mobile No */}
            <InputContainer mt="16px">
            <InputLabel>Mobile No</InputLabel>
              <Controller
                name="mobileNo"
                control={control}
                rules={{ required: "Mobile No is required" }}
                render={({ field }) => (
                  <PhoneInput
                    country={"in"}
                    {...field}
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
                    specialLabel="" // removes default PhoneInput label
                  />
                )}
              />
              {errors.mobileNo && (
                <FormHelperText error>{errors.mobileNo.message}</FormHelperText>
              )}
            </InputContainer>

            {/* Organization Email */}
            <InputContainer mt="16px">
              <InputLabel>Organization Email</InputLabel>
              <TextField
                fullWidth
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
            <Box mt={2} sx={{ width: "430px" }}>
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
                        backgroundColor: isSelected ? "#000" : "#fff",
                        color: isSelected ? "#fff" : "#000",
                        boxShadow: "0px 5px 36.2px 0px #0000001A",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: isSelected ? "#000" : "#eee",
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
                <InputLabel>Password</InputLabel>
                <TextField
                  type="password"
                  fullWidth
                  placeholder="Enter Password"
                  {...register("password", { required: "Password is required" })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{ sx: sharedInputStyle }}
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>Confirm Password</InputLabel>
                <TextField
                  type="password"
                  fullWidth
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: "Confirm Password is required" })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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
                All your information is collected, stored, and processed as per our data
                processing guidelines. By signing on, you agree to our{" "}
                <a href="#" style={{ color: "#6647D6" }}>Privacy Policy</a> and{" "}
                <a href="#" style={{ color: "#6647D6" }}>Terms of Use</a>.
              </Typography>
            </TermsContainer>
            {errors.terms && <FormHelperText error>You must accept the terms to continue</FormHelperText>}

            {/* Submit */}
            <StyledButton type="submit" variant="contained" fullWidth>
              Register
            </StyledButton>

            <Typography align="center" marginTop={2}>
              Already have an account? <a href="#">Login</a>
            </Typography>
          </form>
        </FormBox>
      </Card>
    </Container>
  );
}
