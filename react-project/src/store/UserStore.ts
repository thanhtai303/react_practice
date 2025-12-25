import { create } from "zustand";
import type { UserState } from "../interfaces/UserState";

export const useUserStore = create<UserState>((set) => ({
  users: [
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
  ],
  editingUser: null,
  isAddDialogOpen: false,

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
      isAddDialogOpen: false,
    })),

  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.email === updatedUser.email ? updatedUser : u
      ),
      editingUser: null,
    })),

  deleteUser: (email) =>
    set((state) => ({
      users: state.users.filter((u) => u.email !== email),
    })),

  setEditingUser: (user) => set({ editingUser: user }),

  setAddDialogOpen: (open) => set({ isAddDialogOpen: open }),
}));