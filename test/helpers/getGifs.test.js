import { getGifs } from "../../src/helpers/getGifs";

describe("test on getGifs.js", () => {
  test("should get gifs from giphy.com", async () => {
    const category = "cars";
    const gifs = await getGifs(category);
    expect(gifs).not.toBeNull;
    expect(gifs.length).toBeGreaterThan(0);
    expect(gifs[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
    });
  });
});
