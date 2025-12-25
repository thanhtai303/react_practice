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
import EditUserDialog from "./components/EditUserDialog";
import { useUserStore } from "./store/UserStore";
import type { User } from "./interfaces/User";

function App() {
  const {
    users,
    editingUser,
    isAddDialogOpen,
    deleteUser,
    updateUser,
    setEditingUser,
    setAddDialogOpen,
  } = useUserStore();

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleAddUser = (user: User) => {
    useUserStore.getState().addUser(user);
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
                onClick={() => setAddDialogOpen(true)}
              >
                Add User
              </Button>
            }
          />
          <CardContent>
            <UserTable
              users={users}
              onEdit={handleEdit}
              onDelete={deleteUser}
            />

            <EditUserDialog
              user={editingUser}
              onClose={() => setEditingUser(null)}
              onSave={updateUser}
            />
          </CardContent>
        </Card>

        <AddUserDialog
          open={isAddDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAddUser={handleAddUser}
        />
      </Container>
    </Box>
  );
}

export default App;
