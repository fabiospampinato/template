declare const Template: {
    create(template: string, project?: string | undefined): Promise<void>;
    list(): Promise<void>;
    install(repository: string, template?: string | undefined): Promise<void>;
    uninstall(template?: string | undefined): Promise<void>;
    update(template?: string | undefined): Promise<void>;
};
export default Template;
