// MobileVerificationModal.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
  FormHelperText,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled Components
const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 5px 36.2px 0px #8678ff40;
    max-width: 500px;
    width: 90%;
    margin: 20px;
  }
`;

const ModalContent = styled(DialogContent)`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderSection = styled(Box)`
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  width: 100%;
`;

const NotificationSection = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  width: 100%;
  background-color: ${(props) => props.bgColor || "#f0f8f0"};
`;

const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #000;
  border-radius: 8px;
  flex-shrink: 0;
`;

const OTPInputContainer = styled(Box)`
  width: 100%;
  margin: 20px 0;
`;

const InputLabel = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #000;
  margin-bottom: 8px;
`;

const sharedInputStyle = {
  borderRadius: "10px",
  backgroundColor: "#F8FAFF",
  boxShadow: "0px 5px 36.2px 0px #0000001A",
  "& fieldset": { border: "none" },
  px: 2,
  py: 1,
  height: "50px",
  fontSize: "16px",
  textAlign: "center",
  fontFamily: "'Inter', sans-serif",
};

const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-top: 20px;
`;

const CloseButton = styled(Button)`
  flex: 1;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #ddd;
  background: #fff;
  color: #000;
  text-transform: none;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  &:hover {
    background: #f5f5f5;
    border: 1px solid #ccc;
  }
`;

const VerifyButton = styled(Button)`
  flex: 1;
  height: 50px;
  background: linear-gradient(90deg, #4a6cf7, #6a5cff);
  text-transform: none;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  border-radius: 25px;
  &:hover {
    opacity: 0.9;
    background: linear-gradient(90deg, #4a6cf7, #6a5cff);
  }
`;

const LinkText = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #6a5cff;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`;

const HelpSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0;
`;

// Email Icon Component
const EmailIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
    <path
      d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
      fill="white"
    />
  </svg>
);

// SMS Icon Component
const SMSIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <path
      d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V18L4 14H18C19.1 14 20 13.1 20 12V2ZM6 7C6.55 7 7 6.55 7 6C7 5.45 6.55 5 6 5C5.45 5 5 5.45 5 6C5 6.55 5.45 7 6 7ZM10 7C10.55 7 11 6.55 11 6C11 5.45 10.55 5 10 5C9.45 5 9 5.45 9 6C9 6.55 9.45 7 10 7ZM14 7C14.55 7 15 6.55 15 6C15 5.45 14.55 5 14 5C13.45 5 13 5.45 13 6C13 6.55 13.45 7 14 7Z"
      fill="white"
    />
  </svg>
);

export default function MobileVerificationModal({ open = true, onClose, mobileNumber = "+91 92222*****442" }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isResending, setIsResending] = useState(false);

  const onSubmit = (data) => {
    toast.success("Mobile number verified successfully!", { position: "top-right" });
    console.log("OTP:", data.otp);
    onClose();
  };

  const handleResendOTP = () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("OTP resent successfully!", { position: "top-right" });
      setIsResending(false);
    }, 1000);
  };

  const handleReportIssue = () => {
    toast.info("Issue reported. Our team will contact you soon.", { position: "top-right" });
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm">
      <ModalContent>
        <HeaderSection>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "100%",
              color: "#000",
              marginBottom: "8px",
            }}
          >
            Great, Almost done!
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#666",
            }}
          >
            Please verify your mobile no
          </Typography>
        </HeaderSection>

        {/* Email Verification Notice */}
        <NotificationSection bgColor="#e8f5e8">
          <IconContainer>
            <EmailIcon />
          </IconContainer>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#000",
              lineHeight: "20px",
            }}
          >
            A verification link has been sent to your email. Please check your inbox and verify.
          </Typography>
        </NotificationSection>

        {/* SMS OTP Notice */}
        <NotificationSection bgColor="#fff0f0">
          <IconContainer>
            <SMSIcon />
          </IconContainer>
          <Box>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#000",
                lineHeight: "20px",
              }}
            >
              Enter the One Time Password (OTP) which has been sent to{" "}
              <strong>({mobileNumber})</strong>
            </Typography>
          </Box>
        </NotificationSection>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {/* OTP Input */}
          <OTPInputContainer>
            <InputLabel>Enter OTP</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Your OTP Here"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{4,6}$/,
                  message: "Please enter a valid OTP (4-6 digits)",
                },
              })}
              error={!!errors.otp}
              helperText={errors.otp?.message}
              InputProps={{ sx: sharedInputStyle }}
            />
          </OTPInputContainer>

          {/* Help Section */}
          <HelpSection>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#000",
                  display: "inline",
                }}
              >
                Didn't receive OTP ?{" "}
              </Typography>
              <LinkText
                component="span"
                onClick={handleResendOTP}
                sx={{ opacity: isResending ? 0.6 : 1 }}
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </LinkText>
            </Box>
          </HelpSection>

          <HelpSection>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#000",
                  display: "inline",
                }}
              >
                Having Trouble?{" "}
              </Typography>
              <Typography
                component="span"
                onClick={handleReportIssue}
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#999",
                  cursor: "pointer",
                  "&:hover": { color: "#666" },
                }}
              >
                Report Issue!
              </Typography>
            </Box>
          </HelpSection>

          {/* Buttons */}
          <ButtonsContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <VerifyButton type="submit" variant="contained">
              Verify Mobile
            </VerifyButton>
          </ButtonsContainer>
        </form>
      </ModalContent>
    </StyledDialog>
  );
}