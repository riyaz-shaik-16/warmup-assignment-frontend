// CompanySetupForm.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
  Tab,
  Tabs,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

// Styled Components
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
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
`;

const SetupProgress = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #666;
`;

const MainContent = styled(Box)`
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 40px;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  
  & .MuiTabs-flexContainer {
    justify-content: center;
  }
  
  & .MuiTab-root {
    font-family: 'Inter', sans-serif;
    text-transform: none;
    font-weight: 500;
    min-width: 140px;
    padding: 12px 24px;
    color: #999;
    
    &.Mui-selected {
      color: #4a6cf7;
      font-weight: 600;
    }
  }
  
  & .MuiTabs-indicator {
    background: #4a6cf7;
    height: 3px;
  }
`;

const FormSection = styled(Box)`
  margin-bottom: 40px;
`;

const SectionTitle = styled(Typography)`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #000;
  margin-bottom: 20px;
`;

const InputRow = styled(Box)`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom:1px solid #e0e0e0;
  padding-bottom:20px; 
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const InputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
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
  fontSize: "14px",
  fontFamily: "'Inter', sans-serif",
};

const UploadBox = styled(Box)`
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: #fafafa;
  
  &:hover {
    border-color: #4a6cf7;
    background: #f8faff;
  }
`;

const UploadIcon = styled(Box)`
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const RichTextEditor = styled(Box)`
  border-radius: 10px;
  background: #F8FAFF;
  box-shadow: 0px 5px 36.2px 0px #0000001A;
  overflow: hidden;
`;

const EditorToolbar = styled(Box)`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
`;

const ToolbarButton = styled(Button)`
  min-width: 32px;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  color: #666;
  border-radius: 4px;
  
  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const EditorTextArea = styled(TextField)`
  & .MuiOutlinedInput-root {
    min-height: 120px;
    align-items: flex-start;
    background: #F8FAFF;
    border: none;
    
    & fieldset {
      border: none;
    }
    
    & textarea {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 1.5;
      padding: 16px;
    }
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #4a6cf7, #6a5cff);
  text-transform: none;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  padding: 12px 32px;
  height: 50px;
  &:hover {
    opacity: 0.9;
    background: linear-gradient(90deg, #4a6cf7, #6a5cff);
  }
`;

const Footer = styled(Box)`
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  color: #999;
  font-size: 12px;
  font-family: 'Inter', sans-serif;
`;

// Upload Icon Component
const UploadIconSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 15V3M12 3L16 7M12 3L8 7M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CompanySetupForm() {
  const [activeTab, setActiveTab] = useState(0);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const onSubmit = (data) => {
    toast.success("Company information saved successfully!", { position: "top-right" });
    console.log(data);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileUpload = (type) => {
    // Create file input dynamically
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'logo' ? 'image/*' : 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        toast.success(`${type === 'logo' ? 'Logo' : 'Banner'} uploaded successfully!`);
      }
    };
    input.click();
  };

  return (
    <Container>

      <MainContent>
        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <Tab 
            icon={<Box sx={{ color: '#4a6cf7', fontSize: '18px' }}>👤</Box>} 
            label="Company Info" 
            iconPosition="start"
          />
          <Tab 
            icon={<Box sx={{ color: '#999', fontSize: '18px' }}>🏢</Box>} 
            label="Founding Info" 
            iconPosition="start"
          />
          <Tab 
            icon={<Box sx={{ color: '#999', fontSize: '18px' }}>📱</Box>} 
            label="Social Media Profile" 
            iconPosition="start"
          />
          <Tab 
            icon={<Box sx={{ color: '#999', fontSize: '18px' }}>📞</Box>} 
            label="Contact" 
            iconPosition="start"
          />
        </StyledTabs>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Logo & Banner Section */}
          <FormSection>
            <SectionTitle>Logo & Banner Image</SectionTitle>
            <InputRow >
              <InputContainer style={{width:"300px"}}>
                <InputLabel>Upload Logo</InputLabel>
                <UploadBox onClick={() => handleFileUpload('logo')}>
                  <UploadIcon>
                    <UploadIconSVG />
                  </UploadIcon>
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, color: '#333', mb: 1 }}>
                    Browse photo <span style={{ color: '#999' }}>or drop here</span>
                  </Typography>
                  <Typography sx={{ fontFamily: 'Inter', fontSize: '12px', color: '#999' }}>
                    A photo larger than 400 pixels<br />
                    work best. Max photo size 5 MB.
                  </Typography>
                </UploadBox>
              </InputContainer>

              <InputContainer style={{flex:1}}>
                <InputLabel>Banner Image</InputLabel>
                <UploadBox onClick={() => handleFileUpload('banner')}>
                  <UploadIcon>
                    <UploadIconSVG />
                  </UploadIcon>
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, color: '#333', mb: 1 }}>
                    Browse photo <span style={{ color: '#999' }}>or drop here</span>
                  </Typography>
                  <Typography sx={{ fontFamily: 'Inter', fontSize: '12px', color: '#999' }}>
                    Banner Images optimal dimension 1520×400. Supported<br />
                    format: JPEG, PNG. Max photo size 5 MB.
                  </Typography>
                </UploadBox>
              </InputContainer>
            </InputRow>
          </FormSection>

          {/* Company Name */}
          <FormSection>
            <InputContainer>
              <InputLabel>Company name</InputLabel>
              <TextField
                fullWidth
                placeholder="Enter company name"
                {...register("companyName", { required: "Company name is required" })}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                InputProps={{ sx: sharedInputStyle }}
              />
            </InputContainer>
          </FormSection>

          {/* About Us Section */}
          <FormSection>
            <InputContainer>
              <InputLabel>About Us</InputLabel>
              <RichTextEditor>
                <EditorTextArea
                  fullWidth
                  multiline
                  placeholder="Write down about your company here. Let the candidate know who we are..."
                  {...register("aboutUs")}
                  variant="outlined"
                />
                <EditorToolbar>
                  <ToolbarButton><strong>B</strong></ToolbarButton>
                  <ToolbarButton><em>I</em></ToolbarButton>
                  <ToolbarButton><u>U</u></ToolbarButton>
                  <ToolbarButton>S</ToolbarButton>
                  <ToolbarButton>🔗</ToolbarButton>
                  <ToolbarButton>• </ToolbarButton>
                  <ToolbarButton>1.</ToolbarButton>
                </EditorToolbar>
                
              </RichTextEditor>
            </InputContainer>
          </FormSection>

          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
            <StyledButton type="submit" variant="contained">
              Save & Next →
            </StyledButton>
          </Box>
        </form>
      </MainContent>
    </Container>
  );
}