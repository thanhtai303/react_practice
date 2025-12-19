import type { User } from "./User";

export interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
}
