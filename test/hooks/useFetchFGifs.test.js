import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe("test on useFetchFGifs hook", () => {
  const category = "batman";

  test("should return the initial state", () => {
    const { result } = renderHook(() => useFetchGifs(category));
    console.log(result); //  { current: { images: [], isLoading: true } }

    // evaluar el primer estado del hook, antes del llamado http 
    const { images, isLoading } = result.current;
    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();
  });

  test("should return an arr images and isLoading in false", async () => {
    const { result } = renderHook(() => useFetchGifs(category));

    // esperar que se haga el llamado http 
    await waitFor(() =>
      expect(result.current.images.length).toBeGreaterThan(0)
    );

    // evaluar 
    const { images, isLoading } = result.current;
    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();

  });
});
