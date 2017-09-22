declare const Utils: {
    loadJSON(path: any, fallback?: {}): Promise<any>;
    delete(path: any): any;
    exists(path: any): boolean;
    repository: {
        getEndpoint(repository: string): string | undefined;
    };
    templates: {
        getPaths(): string[];
        getNames(): string[];
    };
    template: {
        getPath(name: any, checkExistence?: boolean): string;
        guessName(endpoint: string): string | undefined;
    };
    prompt: {
        command(): Promise<any>;
        template(): Promise<any>;
    };
    handlebars: {
        useHelpers(): void;
        getSchema(template: any): {};
    };
    metalsmith: {
        useMiddlewares(metalsmith: any): void;
    };
};
export default Utils;
