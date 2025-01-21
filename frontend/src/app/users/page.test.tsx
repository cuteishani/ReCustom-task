import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";

import { api } from "../utils/api";
import UsersPage from "./page";

jest.mock("../utils/api");

jest.mock("react-chartjs-2", () => ({
  Bar: () => <div>Mocked Chart</div>,
}));

describe("UsersPage", () => {
  const mockUsers = [
    {
      id: "1",
      name: "Alice",
      email: "alice@example.com",
      role: "Admin",
      logins: 10,
      pdfDownloads: 5,
    },
    {
      id: "2",
      name: "Bob",
      email: "bob@example.com",
      role: "User",
      logins: 15,
      pdfDownloads: 8,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user table and metrics chart", async () => {
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    render(<UsersPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /user management/i })
    ).toBeInTheDocument();
  });

  it("handles adding a new user", async () => {
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    (api.addUser as jest.Mock).mockResolvedValue({});

    render(<UsersPage />);

    fireEvent.click(screen.getByText("Add User"));

    const nameInput = screen.getByPlaceholderText("Enter name");
    const emailInput = screen.getByPlaceholderText("Enter email");
    const roleSelect = screen.getByText("Select Role");
    act(() => {
      fireEvent.change(nameInput, { target: { value: "Charlie" } });
      fireEvent.change(emailInput, {
        target: { value: "charlie@example.com" },
      });
      fireEvent.change(roleSelect, { target: { value: "User" } });

      fireEvent.click(screen.getByText("Submit"));
    });
    waitFor(() => {
      expect(api.addUser).toHaveBeenCalledWith({
        name: "Charlie",
        email: "charlie@example.com",
        role: "User",
      });
    });
  });
});
