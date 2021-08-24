import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import { render, waitFor, screen } from "@tests";
import { TotalClicksCount, READ_ENDPOINT } from "./TotalClicksCount";

// == Types ================================================================

// == Constants ============================================================

const eventsMap: Record<string, () => void> = {};

// == Setup ================================================================

const server = setupServer(
  rest.get(READ_ENDPOINT, (_req, res, ctx) => {
    return res(
      ctx.json({
        timestamp: new Date(),
        totalClicks: {
          total: 5,
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  window.addEventListener = jest.fn((event, callback) => {
    if (typeof callback !== "function") return;

    eventsMap[event] = () => act(() => callback(new Event(event)));
  });
});

// == Tests ================================================================

test("loads and displays total clicks count", async () => {
  render(<TotalClicksCount />);
  eventsMap.focus?.();

  await waitFor(() => screen.getByTestId("count-badge"));

  expect(screen.getByTestId("count-badge")).toHaveTextContent("5");
});
