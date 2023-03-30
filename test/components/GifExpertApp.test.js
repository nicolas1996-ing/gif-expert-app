import { fireEvent, render, screen } from "@testing-library/react";
import { GifExpertApp } from "../../src/GifExpertApp";

describe("test on GifExpertApp", () => {
  // mock de funcion

  test("should show GifExpertApp label", () => {
    const container = render(<GifExpertApp />);
    screen.debug(undefined, Infinity); // sujeto de prueba
    expect(screen.getByText("GifExpertApp"));
  });

  test("should add new category", () => {
    const category = "new";
    const container = render(<GifExpertApp />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    // cambiar el valor del input
    fireEvent.input(input, { target: { value: category } });
    screen.debug()

    // dispara el submit del formulario
    fireEvent.submit(form);
    screen.debug()

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(3);
  });

});
