import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonBackToLogin from "./ButtonBackToLogin";

test("renders learn react link", () => {
   render(<ButtonBackToLogin />);
   const linkElement = screen.getByText(/learn react/i);
   expect(linkElement).toBeInTheDocument();
});
