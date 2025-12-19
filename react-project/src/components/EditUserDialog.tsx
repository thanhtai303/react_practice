import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { User } from "../interfaces/User";

interface Props {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

function EditUserDialog({ user, onClose, onSave }: Props) {
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    setForm(user);
  }, [user]);

  if (!form) return null;

  return (
    <Dialog open={!!user} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          margin="normal"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          disabled
          value={form.email}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserDialog;
