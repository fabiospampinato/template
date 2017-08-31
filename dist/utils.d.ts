declare const Utils: {
    useHelpers(): void;
    useMiddlewares(metalsmith: any): void;
    repository: {
        getEndpoint(repository: string): string | undefined;
    };
    templates: {
        getPaths(): any;
        getNames(): any;
    };
    template: {
        getPath(name: any, checkExistence?: boolean): string;
        guessName(repository: string): string | undefined;
    };
    prompt: {
        confirmation(message: string, fallback?: boolean): Promise<boolean>;
    };
};
export default Utils;
