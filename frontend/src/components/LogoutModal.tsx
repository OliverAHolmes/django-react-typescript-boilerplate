import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LogoutModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (event: object, reason: "backdropClick" | "escapeKeyDown") => void;
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to the logout page
    navigate("/logout");
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2">
          Confirm Logout
        </Typography>
        <Typography sx={{ mt: 2 }}>Are you sure you want to logout?</Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              onClose && onClose(event, "backdropClick")
            }
            sx={{ ml: 2 }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
