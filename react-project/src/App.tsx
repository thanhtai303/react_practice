import { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Plus as AddIcon } from "lucide-react";
import UserTable from "./components/UserTable";
import AddUserDialog from "./components/AddUserDialog";
import type { User } from "./interfaces/User";
import EditUserDialog from "./components/EditUserDialog";

function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      name: "Tai Nguyen Thanh",
      age: 30,
      email: "tai@gmail.com",
      phone: "123-456-7890",
    },
    {
      name: "Nhat Minh Nguyen",
      age: 25,
      email: "nhat@gmail.com",
      phone: "987-654-3210",
    },
  ]);

  const handleAddUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
    setIsAddOpen(false);
  };

  const handleDeleteUser = (email: string) => {
    setUsers((prev) => prev.filter((u) => u.email !== email));
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updated: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === updated.email ? updated : u))
    );
    setEditingUser(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="lg">
        <Card>
          <CardHeader
            title="User Management"
            sx={(theme) => ({
              bgcolor: theme.palette.primary.main,
              color: "white",
            })}
            action={
              <Button
                variant="contained"
                style={{ backgroundColor: "green" }}
                startIcon={<AddIcon />}
                onClick={() => setIsAddOpen(true)}
              >
                Add User
              </Button>
            }
          />
          <CardContent>
            <UserTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />

            <EditUserDialog
              user={editingUser}
              onClose={() => setEditingUser(null)}
              onSave={handleUpdateUser}
            />
          </CardContent>
        </Card>
      </Container>

      <AddUserDialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddUser={handleAddUser}
      />
    </Box>
  );
}

export default App;
