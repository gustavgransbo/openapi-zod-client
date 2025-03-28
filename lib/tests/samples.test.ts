import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIObject } from "openapi3-ts/oas31";
import { Options, resolveConfig } from "prettier";
import { getZodClientTemplateContext } from "../src/template-context";
import { getHandlebars } from "../src/getHandlebars";
import { maybePretty } from "../src/maybePretty";

import fg from "fast-glob";

import { readFileSync } from "node:fs";
import * as path from "node:path";
import { beforeAll, describe, expect, test } from "vitest";

let prettierConfig: Options | null;
const pkgRoot = process.cwd();

beforeAll(async () => {
    prettierConfig = await resolveConfig(path.resolve(pkgRoot, "../"));
});

describe("samples-generator", async () => {
    const samplesPath = path.resolve(pkgRoot, "../", "./samples/v3\\.*/**/*.yaml");
    const list = fg.sync([samplesPath]);

    const template = getHandlebars().compile(readFileSync("./src/templates/default.hbs", "utf8"));
    const resultByFile = {} as Record<string, string>;

    for (const docPath of list) {
        test(docPath, async () => {
            const openApiDoc = (await SwaggerParser.parse(docPath)) as OpenAPIObject;
            const data = getZodClientTemplateContext(openApiDoc);

            const output = template({ ...data, options: { ...data.options, apiClientName: "api" } });
            const prettyOutput = maybePretty(output, prettierConfig);
            const fileName = docPath.replace("yaml", "");

            // means the .ts file is valid
            expect(prettyOutput).not.toBe(output);
            resultByFile[fileName] = prettyOutput;
        });
    }

    test("results by file", () => {
        expect(
            Object.fromEntries(Object.entries(resultByFile).map(([key, value]) => [key.split("samples/").at(1), value]))
        ).toMatchInlineSnapshot(`
          {
              "v3.0/api-with-examples.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const endpoints = makeApi([
              {
                  method: "get",
                  path: "/",
                  requestFormat: "json",
                  response: z.void(),
              },
              {
                  method: "get",
                  path: "/v2",
                  requestFormat: "json",
                  response: z.void(),
              },
          ]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
              "v3.0/callback-example.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const endpoints = makeApi([
              {
                  method: "post",
                  path: "/streams",
                  description: \`subscribes a client to receive out-of-band data\`,
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "callbackUrl",
                          type: "Query",
                          schema: z.string().url(),
                      },
                  ],
                  response: z.object({ subscriptionId: z.string() }).passthrough(),
              },
          ]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
              "v3.0/link-example.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const user = z.object({ username: z.string(), uuid: z.string() }).partial().passthrough();
          const repository = z.object({ slug: z.string(), owner: user }).partial().passthrough();
          const pullrequest = z
              .object({ id: z.number().int(), title: z.string(), repository: repository, author: user })
              .partial()
              .passthrough();

          export const schemas = {
              user,
              repository,
              pullrequest,
          };

          const endpoints = makeApi([
              {
                  method: "get",
                  path: "/2.0/repositories/:username",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "username",
                          type: "Path",
                          schema: z.string(),
                      },
                  ],
                  response: z.array(repository),
              },
              {
                  method: "get",
                  path: "/2.0/repositories/:username/:slug",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "username",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "slug",
                          type: "Path",
                          schema: z.string(),
                      },
                  ],
                  response: repository,
              },
              {
                  method: "get",
                  path: "/2.0/repositories/:username/:slug/pullrequests",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "username",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "slug",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "state",
                          type: "Query",
                          schema: z.enum(["open", "merged", "declined"]).optional(),
                      },
                  ],
                  response: z.array(pullrequest),
              },
              {
                  method: "get",
                  path: "/2.0/repositories/:username/:slug/pullrequests/:pid",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "username",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "slug",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "pid",
                          type: "Path",
                          schema: z.string(),
                      },
                  ],
                  response: pullrequest,
              },
              {
                  method: "post",
                  path: "/2.0/repositories/:username/:slug/pullrequests/:pid/merge",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "username",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "slug",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "pid",
                          type: "Path",
                          schema: z.string(),
                      },
                  ],
                  response: z.void(),
              },
              {
                  method: "get",
                  path: "/2.0/users/:username",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "username",
                          type: "Path",
                          schema: z.string(),
                      },
                  ],
                  response: user,
              },
          ]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
              "v3.0/petstore-expanded.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const NewPet = z.object({ name: z.string(), tag: z.string().optional() }).passthrough();
          const Pet = NewPet.and(z.object({ id: z.number().int() }).passthrough());
          const Error = z.object({ code: z.number().int(), message: z.string() }).passthrough();

          export const schemas = {
              NewPet,
              Pet,
              Error,
          };

          const endpoints = makeApi([
              {
                  method: "get",
                  path: "/pets",
                  description: \`Returns all pets from the system that the user has access to
          Nam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.

          Sed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.
          \`,
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "tags",
                          type: "Query",
                          schema: z.array(z.string()).optional(),
                      },
                      {
                          name: "limit",
                          type: "Query",
                          schema: z.number().int().optional(),
                      },
                  ],
                  response: z.array(Pet),
              },
              {
                  method: "post",
                  path: "/pets",
                  description: \`Creates a new pet in the store. Duplicates are allowed\`,
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "body",
                          description: \`Pet to add to the store\`,
                          type: "Body",
                          schema: NewPet,
                      },
                  ],
                  response: Pet,
              },
              {
                  method: "get",
                  path: "/pets/:id",
                  description: \`Returns a user based on a single ID, if the user does not have access to the pet\`,
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "id",
                          type: "Path",
                          schema: z.number().int(),
                      },
                  ],
                  response: Pet,
              },
              {
                  method: "delete",
                  path: "/pets/:id",
                  description: \`deletes a single pet based on the ID supplied\`,
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "id",
                          type: "Path",
                          schema: z.number().int(),
                      },
                  ],
                  response: z.void(),
              },
          ]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
              "v3.0/petstore.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const Pet = z.object({ id: z.number().int(), name: z.string(), tag: z.string().optional() }).passthrough();
          const Pets = z.array(Pet);
          const Error = z.object({ code: z.number().int(), message: z.string() }).passthrough();

          export const schemas = {
              Pet,
              Pets,
              Error,
          };

          const endpoints = makeApi([
              {
                  method: "get",
                  path: "/pets",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "limit",
                          type: "Query",
                          schema: z.number().int().optional(),
                      },
                  ],
                  response: z.array(Pet),
              },
              {
                  method: "post",
                  path: "/pets",
                  requestFormat: "json",
                  response: z.void(),
              },
              {
                  method: "get",
                  path: "/pets/:petId",
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "petId",
                          type: "Path",
                          schema: z.string(),
                      },
                  ],
                  response: Pet,
              },
          ]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
              "v3.0/uspto.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const dataSetList = z
              .object({
                  total: z.number().int(),
                  apis: z.array(
                      z
                          .object({
                              apiKey: z.string(),
                              apiVersionNumber: z.string(),
                              apiUrl: z.string(),
                              apiDocumentationUrl: z.string(),
                          })
                          .partial()
                          .passthrough()
                  ),
              })
              .partial()
              .passthrough();
          const perform_search_Body = z
              .object({
                  criteria: z.string().default("*:*"),
                  start: z.number().int().optional().default(0),
                  rows: z.number().int().optional().default(100),
              })
              .passthrough();

          export const schemas = {
              dataSetList,
              perform_search_Body,
          };

          const endpoints = makeApi([
              {
                  method: "get",
                  path: "/",
                  requestFormat: "json",
                  response: dataSetList,
              },
              {
                  method: "get",
                  path: "/:dataset/:version/fields",
                  description: \`This GET API returns the list of all the searchable field names that are in the oa_citations. Please see the &#x27;fields&#x27; attribute which returns an array of field names. Each field or a combination of fields can be searched using the syntax options shown below.\`,
                  requestFormat: "json",
                  parameters: [
                      {
                          name: "dataset",
                          type: "Path",
                          schema: z.string(),
                      },
                      {
                          name: "version",
                          type: "Path",
                          schema: z.string(),
                      },
                  ],
                  response: z.string(),
                  errors: [
                      {
                          status: 404,
                          description: \`The combination of dataset name and version is not found in the system or it is not published yet to be consumed by public.\`,
                          schema: z.string(),
                      },
                  ],
              },
              {
                  method: "post",
                  path: "/:dataset/:version/records",
                  description: \`This API is based on Solr/Lucene Search. The data is indexed using SOLR. This GET API returns the list of all the searchable field names that are in the Solr Index. Please see the &#x27;fields&#x27; attribute which returns an array of field names. Each field or a combination of fields can be searched using the Solr/Lucene Syntax. Please refer https://lucene.apache.org/core/3_6_2/queryparsersyntax.html#Overview for the query syntax. List of field names that are searchable can be determined using above GET api.\`,
                  requestFormat: "form-url",
                  parameters: [
                      {
                          name: "body",
                          type: "Body",
                          schema: perform_search_Body,
                      },
                      {
                          name: "version",
                          type: "Path",
                          schema: z.string().default("v1"),
                      },
                      {
                          name: "dataset",
                          type: "Path",
                          schema: z.string().default("oa_citations"),
                      },
                  ],
                  response: z.array(z.record(z.object({}).partial().passthrough())),
                  errors: [
                      {
                          status: 404,
                          description: \`No matching record found for the given criteria.\`,
                          schema: z.void(),
                      },
                  ],
              },
          ]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
              "v3.1/non-oauth-scopes.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const endpoints = makeApi([
              {
                  method: "get",
                  path: "/users",
                  requestFormat: "json",
                  response: z.void(),
              },
          ]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
              "v3.1/webhook-example.": "import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
          import { z } from "zod";

          const endpoints = makeApi([]);

          export const api = new Zodios(endpoints);

          export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
              return new Zodios(baseUrl, endpoints, options);
          }
          ",
          }
        `);
    });
});
