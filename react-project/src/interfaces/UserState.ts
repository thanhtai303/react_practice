import type { User } from "./User";

export interface UserState {
  users: User[];
  editingUser: User | null;
  isAddDialogOpen: boolean;

  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (email: string) => void;
  setEditingUser: (user: User | null) => void;
  setAddDialogOpen: (open: boolean) => void;
}