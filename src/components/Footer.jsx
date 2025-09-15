// CompanySetupFooter.js
import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

// Styled Components
const Footer = styled(Box)`
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  background: #fff;
  margin-top: auto;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const FooterText = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #999;
  font-weight: 400;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const FooterLink = styled.span`
  color: #6a5cff;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

export default function CompanySetupFooter({ 
  year = "2021",
  companyName = "Jobpilot",
  productName = "Job Board",
  showLinks = false,
  onLinkClick
}) {
  const handleLinkClick = (linkType) => {
    if (onLinkClick) {
      onLinkClick(linkType);
    } else {
      console.log(`${linkType} clicked`);
    }
  };

  return (
    <Footer>
      <FooterText>
        © {year} {companyName} - {productName}. All rights Reserved
        {showLinks && (
          <>
            {" | "}
            <FooterLink onClick={() => handleLinkClick('privacy')}>
              Privacy Policy
            </FooterLink>
            {" | "}
            <FooterLink onClick={() => handleLinkClick('terms')}>
              Terms of Service
            </FooterLink>
            {" | "}
            <FooterLink onClick={() => handleLinkClick('support')}>
              Support
            </FooterLink>
          </>
        )}
      </FooterText>
    </Footer>
  );
}