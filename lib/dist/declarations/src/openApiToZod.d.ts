import { type ReferenceObject, type SchemaObject } from "openapi3-ts/oas31";
import type { CodeMetaData, ConversionTypeContext } from "./CodeMeta.js";
import { CodeMeta } from "./CodeMeta.js";
import type { TemplateContext } from "./template-context.js";
type ConversionArgs = {
    schema: SchemaObject | ReferenceObject;
    ctx?: ConversionTypeContext | undefined;
    meta?: CodeMetaData | undefined;
    options?: TemplateContext["options"] | undefined;
};
/**
 * @see https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject
 * @see https://github.com/colinhacks/zod
 */
export declare function getZodSchema({ schema: $schema, ctx, meta: inheritedMeta, options }: ConversionArgs): CodeMeta;
type ZodChainArgs = {
    schema: SchemaObject;
    meta?: CodeMetaData;
    options?: TemplateContext["options"];
};
export declare const getZodChain: ({ schema, meta, options }: ZodChainArgs) => string;
export {};
