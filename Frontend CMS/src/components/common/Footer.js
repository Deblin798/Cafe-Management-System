import React from "react";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "#333",
          color: "white",
          padding: "20px",
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: 9999, // Add z-index to ensure the footer appears above the content
        }}
      >
        <Box
          sx={{
            my: 2,
            "& svg": { fontSize: "60px", cursor: "pointer", mr: 2 },
            "& svg:hover": {
              color: "black",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
          {/* icons */}
          <InstagramIcon />
          <TwitterIcon />
          <GitHubIcon />
        </Box>
        <Typography variant="h6">All rights reserved &copy; Deblin</Typography>
      </Box>
    </>
  );
};

export default Footer;

