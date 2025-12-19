import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVertical, Edit, Trash } from "lucide-react";
import { useState } from "react";
import type { UserTableProps } from "../interfaces/UserTableProps";

function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    setAnchorEl(e.currentTarget);
    setSelectedEmail(email);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEmail(null);
  };

  const handleDelete = () => {
    if (!selectedEmail) return;

    const ok = window.confirm("Are you sure you want to delete this user?");
    if (ok) {
      onDelete(selectedEmail);
    }
    handleClose();
  };

  const handleEdit = () => {
    const user = users.find((u) => u.email === selectedEmail);
    if (user) onEdit(user);
    handleClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["Name", "Age", "Email", "Phone", "Action"].map((h) => (
              <TableCell
                key={h}
                sx={{
                  fontWeight: 600,
                }}
              >
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.email} hover>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.age}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleOpenMenu(e, u.email)}>
                  <MoreVertical />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <Edit size={16} style={{ marginRight: 8 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Trash size={16} style={{ marginRight: 8 }} /> Delete
        </MenuItem>
      </Menu>
    </TableContainer>
  );
}

export default UserTable;
