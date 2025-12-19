import { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { User as PersonIcon, X as CloseIcon } from "lucide-react";
import type { AddUserDialogProps } from "../interfaces/AddUserDialogProps";
import type { User } from "../interfaces/User";

function AddUserDialog({ open, onClose, onAddUser }: AddUserDialogProps) {
  const userName = useRef<HTMLInputElement>(null);
  const userAge = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPhone = useRef<HTMLInputElement>(null);

  const validateUser = () => {
    if (
      !userName.current ||
      !userAge.current ||
      !userEmail.current ||
      !userPhone.current
    ) {
      return false;
    }

    const name = userName.current.value.trim();
    const age = Number(userAge.current.value);
    const email = userEmail.current.value.trim();
    const phone = userPhone.current.value.trim();

    if (!name) {
      alert("Name is required");
      userName.current.focus();
      return false;
    }

    if (!age || age <= 0) {
      alert("Age must be greater than 0");
      userAge.current.focus();
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      userEmail.current.focus();
      return false;
    }

    if (!phone) {
      alert("Phone is required");
      userPhone.current.focus();
      return false;
    }

    return true;
  };

  const handleAddUser = () => {
    if (!validateUser()) return;

    const newUser: User = {
      name: userName.current!.value,
      age: Number(userAge.current!.value),
      email: userEmail.current!.value,
      phone: userPhone.current!.value,
    };

    onAddUser(newUser);

    userName.current!.value = "";
    userAge.current!.value = "";
    userEmail.current!.value = "";
    userPhone.current!.value = "";
  };

  const handleClose = () => {
    if (userName.current) userName.current.value = "";
    if (userAge.current) userAge.current.value = "";
    if (userEmail.current) userEmail.current.value = "";
    if (userPhone.current) userPhone.current.value = "";
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon />
          Add New User
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "white" }} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <TextField
          inputRef={userName}
          label="Name"
          fullWidth
          margin="normal"
          placeholder="Enter name"
        />

        <TextField
          inputRef={userAge}
          label="Age"
          type="number"
          fullWidth
          margin="normal"
          placeholder="Enter age"
        />

        <TextField
          inputRef={userEmail}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          placeholder="Enter email"
        />

        <TextField
          inputRef={userPhone}
          label="Phone"
          type="tel"
          fullWidth
          margin="normal"
          placeholder="Enter phone"
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleAddUser} variant="contained" color="primary">
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserDialog;
