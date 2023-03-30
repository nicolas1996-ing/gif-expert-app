import { render, screen } from "@testing-library/react";
import { ShowImgsCategory } from "../../src/components/ShowImgsCategory";

describe("test on ShowImgsCategory", () => {
  const img = {
    title: "example-title",
    url: "example-url.com",
  };

  test("should be match with the snapshot", () => {
    // render generar un snapshot del renderizado
    const container = render(<ShowImgsCategory imageInfo={img} />);
    expect(container).toMatchSnapshot();
  });

  test("should show the img with the correct url and alt property", () => {
    render(<ShowImgsCategory imageInfo={img} />);
    // screen.debug(undefined, Infinity); // print component render html

    expect(screen.getByRole("img").src).toBe(`http://localhost/${img.url}`);
    expect(screen.getByRole("img").alt).toBe(img.url);
  });

  test("should show the img with the correct url and alt property form 2", () => {
    render(<ShowImgsCategory imageInfo={img} />);
    screen.debug(undefined, Infinity); // print component render html

    const { src, alt } = screen.getByRole("img");
    expect(src).toBe(`http://localhost/${img.url}`);
    expect(alt).toBe(img.url);
  });

  test("should show title in the component", () => {
    render(<ShowImgsCategory imageInfo={img} />);
    expect(screen.getByText(img.title)).toBeTruthy; // exist this str
  });
});
