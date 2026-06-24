export interface Metadata {
    title: string;
    description: string;
    keywords?: string[];
    [key: string]: string | string[] | undefined;
}
