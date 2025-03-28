import type { OpenAPIObject } from "openapi3-ts/oas31";
import { expect, test } from "vitest";
import { generateZodClientFromOpenAPI } from "../src";

test("description-in-zod", async () => {
  const openApiDoc: OpenAPIObject = {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Numerical enums",
    },
    paths: {
      "/sample": {
        get: {
          parameters: [
            {
              in: "query",
              name: "foo",
              schema: {
                type: "integer",
                enum: [1, -2, 3],
              },
              description: "foo description",
            },
            {
              in: "query",
              name: "bar",
              schema: {
                type: "number",
                enum: [1.2, 34, -56.789],
              },
              description: "bar description",
            },
            {
              in: "query",
              name: "baz",
              schema: {
                type: "number",
                enum: [1.3, 34.1, -57.89],
              },
              description: "baz\nmultiline\ndescription",
            },
            {
              in: "query",
              name: "qux",
              schema: {
                type: "string",
              },
              description: "      ", // spaces only description
            },
          ],
          responses: {
            "200": {
              description: "resoponse",
            },
          },
        },
      },
    },
  };

  const output = await generateZodClientFromOpenAPI({
    disableWriteToFile: true,
    openApiDoc,
    options: { withDescription: true },
  });
  expect(output).toMatchInlineSnapshot(`
      "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
      import { z } from "zod";

      const endpoints = makeApi([
        {
          method: "get",
          path: "/sample",
          requestFormat: "json",
          parameters: [
            {
              name: "foo",
              type: "Query",
              schema: z
                .union([z.literal(1), z.literal(-2), z.literal(3)])
                .describe("foo description")
                .optional(),
            },
            {
              name: "bar",
              type: "Query",
              schema: z
                .union([z.literal(1.2), z.literal(34), z.literal(-56.789)])
                .describe("bar description")
                .optional(),
            },
            {
              name: "baz",
              type: "Query",
              schema: z
                .union([z.literal(1.3), z.literal(34.1), z.literal(-57.89)])
                .describe(
                  \`baz\nmultiline\ndescription\`
                )
                .optional(),
            },
            {
              name: "qux",
              type: "Query",
              schema: z.string().optional(),
            },
          ],
          response: z.void(),
        },
      ]);

      export const api = new Zodios(endpoints);

      export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
        return new Zodios(baseUrl, endpoints, options);
      }
      "
    `);
});
