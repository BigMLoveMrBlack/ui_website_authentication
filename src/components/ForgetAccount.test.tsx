import React from "react";
import { render, screen } from "@testing-library/react";
import ForgetAccount from "./ForgetAccount";

test("renders learn react link", () => {
   render(<ForgetAccount />);
   const linkElement = screen.getByText(/learn react/i);
   expect(linkElement).toBeInTheDocument();
});
