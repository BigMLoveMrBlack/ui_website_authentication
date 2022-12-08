import React from "react";
import { render, screen } from "@testing-library/react";
import Activate from "./Activate";

test("renders learn react link", () => {
   render(<Activate />);
   const linkElement = screen.getByText(/learn react/i);
   expect(linkElement).toBeInTheDocument();
});
