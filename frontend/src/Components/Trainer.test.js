import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import Trainer from "./Trainer";
import Rating from "./Rating";

jest.mock("./Rating", () => () => <div>Mocked Rating Component</div>);

const trainer = {
  _id: "1",
  name: "John Doe",
  image: "/images/sample.jpg",
  rating: 4.5,
  numReviews: 10,
};

test("renders Trainer component", () => {
  render(
    <Router>
      <Trainer trainer={trainer} />
    </Router>
  );

  // Verificăm dacă imaginea antrenorului este afișată corect
  const imgElement = screen.getByRole("img");
  expect(imgElement).toHaveAttribute("src", trainer.image);

  // Verificăm dacă numele antrenorului este afișat corect
  expect(screen.getByText(trainer.name)).toBeInTheDocument();

  // Verificăm dacă Rating component este afișat
  expect(screen.getByText("Mocked Rating Component")).toBeInTheDocument();

  // Verificăm dacă link-urile sunt corecte
  const links = screen.getAllByRole("link");
  links.forEach((link) => {
    expect(link).toHaveAttribute("href", `/trainers/${trainer._id}`);
  });
});
