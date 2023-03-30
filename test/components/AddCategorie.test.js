import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategorie } from "../../src/components/AddCategorie";

describe("test on AddCategoryComponent", () => {
  const valueInput = "new value";
  test("should be change the box text value", () => {
    const container = render(<AddCategorie onNewCategory={() => {}} />);
    screen.debug(undefined, Infinity); // sujeto de prueba

    // disparar un evento
    const input = screen.getByRole("textbox"); // input
    fireEvent.input(input, { target: { value: valueInput } }); // lanzar el event
    screen.debug(undefined, Infinity); // sujeto de prueba

    // test
    expect(input.value).toBe(valueInput);
  });

  test("should called onNewCategory if the input has a value", () => {
    const inputValue = "saitama";
    const onNewCategory = jest.fn(); // mock de funcion

    render(<AddCategorie onNewCategory={onNewCategory} />);
    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    // cambiar el valor del input
    fireEvent.input(input, { target: { value: inputValue } });
    screen.debug();

    // dispara el submit del formulario
    fireEvent.submit(form);
    screen.debug(); // should be:  setInputValue("");

    // test
    expect(input.value).toBe("");
    expect(onNewCategory).toHaveBeenCalled();
    expect(onNewCategory).toHaveBeenCalledWith(inputValue);
    expect(onNewCategory).toHaveBeenCalledTimes(1);
  });

  test("should no called onNewCategory because input.value is empty", () => {
    const inputValue = "";
    const onNewCategory = jest.fn(); // mock de funcion

    render(<AddCategorie onNewCategory={onNewCategory} />);
    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    // test
    expect(input.value).toBe("");
    expect(onNewCategory).not.toHaveBeenCalled();

  });
});
