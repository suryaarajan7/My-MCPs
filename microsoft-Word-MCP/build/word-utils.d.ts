import { Document } from 'docx';
export interface DocumentState {
    doc: Document;
    elements: any[];
    properties: any;
    children: any[];
}
export declare function createDocument(args: any): DocumentState;
export declare function addParagraph(state: DocumentState, args: any): void;
export declare function addHeading(state: DocumentState, args: any): void;
export declare function formatText(state: DocumentState, args: any): string;
export declare function addList(state: DocumentState, args: any): void;
export declare function addTable(state: DocumentState, args: any): void;
export declare function insertImage(state: DocumentState, args: any): void;
export declare function addHyperlink(state: DocumentState, args: any): void;
export declare function setDocumentProperties(state: DocumentState, args: any): void;
export declare function saveDocument(state: DocumentState, outputPath: string): Promise<void>;
export declare function loadDocument(inputPath: string): Promise<DocumentState>;
export declare function mergeDocuments(documentPaths: string[], outputPath: string): Promise<void>;
export declare function addTableOfContents(state: DocumentState, args: any): void;
export declare function parseMarkdown(markdownText: string): DocumentState;
export declare function parseJsonStructure(structure: any): DocumentState;
