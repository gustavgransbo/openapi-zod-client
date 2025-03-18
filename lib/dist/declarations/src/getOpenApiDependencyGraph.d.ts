import type { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";
export declare const getOpenApiDependencyGraph: (schemaRef: string[], getSchemaByRef: (ref: string) => SchemaObject | ReferenceObject) => {
    refsDependencyGraph: Record<string, Set<string>>;
    deepDependencyGraph: Record<string, Set<string>>;
};
