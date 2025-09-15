// CompanySetupNavbar.js
import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

// Styled Components
const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LogoIcon = styled(Box)`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4a6cf7, #6a5cff);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
`;

const LogoText = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SetupProgress = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default function CompanySetupNavbar({ 
  logoText = "Jobpilot", 
  progressText = "Setup Progress",
  onLogoClick
}) {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      // Default behavior - could navigate to home
      console.log("Logo clicked");
    }
  };

  return (
    <Header>
      <Logo onClick={handleLogoClick}>
        <LogoIcon>J</LogoIcon>
        <LogoText>{logoText}</LogoText>
      </Logo>
      <SetupProgress>{progressText}</SetupProgress>
    </Header>
  );
}