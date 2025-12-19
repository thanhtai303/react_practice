import type { User } from "./User";

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (email: string) => void;
}

