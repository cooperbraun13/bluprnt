import type { Express } from "express";
import request from "supertest";
import { beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("../config/database", () => ({
  db: {
    query: vi.fn(),
    end: vi.fn(),
  },
}));

let app: Express;

beforeAll(async () => {
  const module = await import("../server");
  app = module.default;
});

describe("server routes", () => {
  it("responds to the root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Server is up and running");
  });

  it("returns ok from health endpoint", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

