import type { OpenAPIObject } from "openapi3-ts/oas31";
import { expect, test } from "vitest";
import { generateZodClientFromOpenAPI } from "../src";

// https://github.com/astahmer/openapi-zod-client/issues/60
test("schema-type-list-3.1", async () => {
  const openApiDoc: OpenAPIObject = {
    openapi: "3.1.0",
    info: { title: "Swagger Petstore - OpenAPI 3.1", version: "1.1" },
    paths: {
      "/pet": {
        put: {
          responses: {
            "200": {
              description: "Successful operation",
              content: { "application/json": { schema: { $ref: "#/components/schemas/test4" } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        test1: {
          type: ["object", "null"],
          properties: {
            text1: { type: "string" },
            name: { type: ["string", "null"], enum: ["Dogs", "Cats", "Mice"] },
            another: { type: ["string", "number"], enum: ["Dogs", "Cats", "Mice"] },
          },
        },
        test2: { type: ["object", "boolean"], properties: { text2: { type: "number" } } },
        test3: { type: ["number", "object"], properties: { text3: { type: "boolean" } } },
        test4: {
          allOf: [
            { $ref: "#/components/schemas/test1" },
            { $ref: "#/components/schemas/test2" },
            { $ref: "#/components/schemas/test3" },
          ],
        },
      },
    },
  };

  const output = await generateZodClientFromOpenAPI({ disableWriteToFile: true, openApiDoc });
  expect(output).toMatchInlineSnapshot(`
      "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
      import { z } from "zod";

      const test1 = z.union([
        z
          .object({
            text1: z.string(),
            name: z.union([z.enum(["Dogs", "Cats", "Mice"]), z.null()]),
            another: z.union([z.enum(["Dogs", "Cats", "Mice"]), z.never()]),
          })
          .partial()
          .passthrough(),
        z.null(),
      ]);
      const test2 = z.union([
        z.object({ text2: z.number() }).partial().passthrough(),
        z.boolean(),
      ]);
      const test3 = z.union([
        z.number(),
        z.object({ text3: z.boolean() }).partial().passthrough(),
      ]);
      const test4 = test1.and(test2).and(test3);

      export const schemas = {
        test1,
        test2,
        test3,
        test4,
      };

      const endpoints = makeApi([
        {
          method: "put",
          path: "/pet",
          requestFormat: "json",
          response: test4,
        },
      ]);

      export const api = new Zodios(endpoints);

      export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
        return new Zodios(baseUrl, endpoints, options);
      }
      "
    `);
});
