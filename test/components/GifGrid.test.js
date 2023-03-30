import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock("../../src/hooks/useFetchGifs"); // paso 1. mock

describe("test on GifGrid", () => {
  const category = "one-punch";
  const gifsMock = [
    {
      id: "l0NwGpoOVLTAyUJSo",
      title: "Ben Affleck Rain GIF by Batman v Superman: Dawn of Justice",
      url: "https://media2.giphy.com/media/l0NwGpoOVLTAyUJSo/giphy.gif?cid=98ac82e00q76noapf93yx9yxo03c5dn1et7tb2xj9bfwfnf0&rid=giphy.gif&ct=g",
    },
    {
      id: "l396BoOTIFem9xqQU",
      title: "Tim Burton Film GIF by Tech Noir",
      url: "https://media3.giphy.com/media/l396BoOTIFem9xqQU/giphy.gif?cid=98ac82e00q76noapf93yx9yxo03c5dn1et7tb2xj9bfwfnf0&rid=giphy.gif&ct=g",
    },
    {
      id: "4UJyRK2TXNhgk",
      title: "Batman Dancing GIF",
      url: "https://media4.giphy.com/media/4UJyRK2TXNhgk/giphy.gif?cid=98ac82e00q76noapf93yx9yxo03c5dn1et7tb2xj9bfwfnf0&rid=giphy.gif&ct=g",
    },
  ];

  test("should show isLoading initiatly", () => {
    // hook. config
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid cat={category} />);
    screen.debug(undefined, Infinity);

    // test - estado inicial
    expect(screen.getByText("loading ...")); // buscar texto en el hmtl como ...
    expect(screen.getByText(category));
  });

  test("should display images when they have been loaded", () => {
    // hook. config
    useFetchGifs.mockReturnValue({
      images: gifsMock,
      isLoading: true,
    });

    render(<GifGrid cat={category} />);
    // screen.debug(undefined, Infinity);

    expect(screen.getAllByRole('img').length).toBe(gifsMock.length)
  });
});
