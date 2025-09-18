import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function SetupLayout() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection:"column"
      }}
    >
      <Navbar/>
      <Outlet />
      <Footer />
    </Box>
  );
}
