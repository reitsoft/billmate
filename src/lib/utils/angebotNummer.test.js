import { describe, it, expect } from "vitest";
import neueNummer from "./angebotNummer.js"

describe("generate new Angebot Nummer in Format *YYWWnnn*", () => {
  it("should create new number", async () => {
    const nummer = await neueNummer();
    console.log({nummer})
    expect(nummer).toBe("2313001")
  })
})
