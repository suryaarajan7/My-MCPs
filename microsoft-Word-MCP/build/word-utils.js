import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel } from 'docx';
import * as fs from 'fs/promises';
import * as path from 'path';
import mammoth from 'mammoth';
import { marked } from 'marked';
// Helper function to get heading level
function getHeadingLevel(style) {
    switch (style) {
        case 'Heading1': return "Heading1";
        case 'Heading2': return "Heading2";
        case 'Heading3': return "Heading3";
        case 'Heading4': return "Heading4";
        case 'Heading5': return "Heading5";
        case 'Heading6': return "Heading6";
        default: return "Heading1";
    }
}
// Create a new document
export function createDocument(args) {
    const { template, properties = {} } = args || {};
    const children = [];
    const doc = new Document({
        creator: properties.author || 'Claude',
        title: properties.title || 'Untitled Document',
        description: properties.subject || '',
        keywords: properties.keywords || [],
        sections: [{
                children: children,
            }],
    });
    return {
        doc,
        elements: [],
        properties: {
            title: properties.title || 'Untitled Document',
            author: properties.author || 'Claude',
            subject: properties.subject || '',
            keywords: properties.keywords || [],
        },
        children: children,
    };
}
// Add paragraph to document
export function addParagraph(state, args) {
    const { text, style = 'Normal', formatting = {} } = args || {};
    const paragraph = new Paragraph({
        text: text || '',
        heading: style.startsWith('Heading') ? getHeadingLevel(style) : undefined,
        alignment: formatting.alignment,
        spacing: {
            after: formatting.spacingAfter,
            before: formatting.spacingBefore,
        },
        children: [
            new TextRun({
                text: text || '',
                bold: formatting.bold,
                italics: formatting.italic,
                underline: formatting.underline ? {} : undefined,
                size: formatting.fontSize,
                color: formatting.fontColor,
            }),
        ],
    });
    state.children.push(paragraph);
}
// Add heading to document
export function addHeading(state, args) {
    const { text, level = 1 } = args || {};
    const headingLevel = getHeadingLevel(`Heading${level}`);
    const heading = new Paragraph({
        text: text || '',
        heading: headingLevel,
    });
    state.children.push(heading);
}
// Format text
export function formatText(state, args) {
    const { text, bold = false, italic = false, underline = false, fontSize, fontColor } = args || {};
    const formattedText = new TextRun({
        text: text || '',
        bold,
        italics: italic,
        underline: underline ? {} : undefined,
        size: fontSize,
        color: fontColor,
    });
    const paragraph = new Paragraph({
        children: [formattedText],
    });
    state.children.push(paragraph);
    return `Formatted text: "${text}" with ${bold ? 'bold, ' : ''}${italic ? 'italic, ' : ''}${underline ? 'underline' : ''}`;
}
// Add list to document
export function addList(state, args) {
    const { items = [], type = 'bullet' } = args || {};
    items.forEach((item) => {
        const listItem = new Paragraph({
            text: item,
            bullet: type === 'bullet' ? { level: 0 } : undefined,
            numbering: type === 'number' ? {
                reference: 'numbered-list',
                level: 0,
            } : undefined,
        });
        state.children.push(listItem);
    });
}
// Add table to document
export function addTable(state, args) {
    const { rows = 2, columns = 2, data = [] } = args || {};
    const tableRows = [];
    for (let i = 0; i < rows; i++) {
        const tableCells = [];
        for (let j = 0; j < columns; j++) {
            const cellData = data[i] && data[i][j] ? data[i][j] : '';
            tableCells.push(new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: cellData.toString(),
                            }),
                        ],
                    }),
                ],
            }));
        }
        tableRows.push(new TableRow({
            children: tableCells,
        }));
    }
    const table = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: tableRows,
    });
    state.children.push(table);
}
// Insert image into document
export function insertImage(state, args) {
    const { path: imagePath, width, height } = args || {};
    // For now, we'll create a placeholder paragraph since handling images requires file reading
    const paragraph = new Paragraph({
        children: [
            new TextRun({
                text: `[Image: ${imagePath}]`,
                italics: true,
            }),
        ],
    });
    state.children.push(paragraph);
}
// Add hyperlink to document
export function addHyperlink(state, args) {
    const { text, url } = args || {};
    const paragraph = new Paragraph({
        children: [
            new TextRun({
                text: `${text || ''} (${url})`,
                style: "Hyperlink",
            }),
        ],
    });
    state.children.push(paragraph);
}
// Set document properties
export function setDocumentProperties(state, args) {
    const { title, author, subject, keywords = [] } = args || {};
    state.properties = {
        ...state.properties,
        title: title || state.properties.title,
        author: author || state.properties.author,
        subject: subject || state.properties.subject,
        keywords: keywords.length > 0 ? keywords : state.properties.keywords,
    };
}
// Save document to file
export async function saveDocument(state, outputPath) {
    try {
        // Update document with current children
        state.doc = new Document({
            creator: state.properties.author,
            title: state.properties.title,
            description: state.properties.subject,
            keywords: state.properties.keywords,
            sections: [{
                    children: state.children,
                }],
        });
        const buffer = await Packer.toBuffer(state.doc);
        await fs.writeFile(outputPath, buffer);
    }
    catch (error) {
        throw new Error(`Failed to save document: ${error}`);
    }
}
// Load document from file
export async function loadDocument(inputPath) {
    try {
        const result = await mammoth.extractRawText({ path: inputPath });
        const content = result.value;
        const children = [];
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.trim()) {
                children.push(new Paragraph({
                    text: line.trim(),
                }));
            }
        });
        const doc = new Document({
            sections: [{
                    children: children,
                }],
        });
        return {
            doc,
            elements: [],
            properties: {
                title: path.basename(inputPath, path.extname(inputPath)),
                author: '',
                subject: '',
                keywords: [],
            },
            children: children,
        };
    }
    catch (error) {
        throw new Error(`Failed to load document: ${error}`);
    }
}
// Merge multiple documents
export async function mergeDocuments(documentPaths, outputPath) {
    try {
        const children = [];
        for (const docPath of documentPaths) {
            const result = await mammoth.extractRawText({ path: docPath });
            const content = result.value;
            const lines = content.split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    children.push(new Paragraph({
                        text: line.trim(),
                    }));
                }
            });
        }
        const mergedDoc = new Document({
            sections: [{
                    children: children,
                }],
        });
        const buffer = await Packer.toBuffer(mergedDoc);
        await fs.writeFile(outputPath, buffer);
    }
    catch (error) {
        throw new Error(`Failed to merge documents: ${error}`);
    }
}
// Add table of contents
export function addTableOfContents(state, args) {
    const { title = 'Table of Contents' } = args || {};
    // For now, create a placeholder TOC
    const tocParagraph = new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_1,
    });
    state.children.push(tocParagraph);
}
// Parse markdown to document
export function parseMarkdown(markdownText) {
    const tokens = marked.lexer(markdownText);
    const children = [];
    tokens.forEach(token => {
        switch (token.type) {
            case 'heading':
                const headingLevel = getHeadingLevel(`Heading${token.depth}`);
                children.push(new Paragraph({
                    text: token.text,
                    heading: headingLevel,
                }));
                break;
            case 'paragraph':
                children.push(new Paragraph({
                    text: token.text,
                }));
                break;
            case 'list':
                token.items.forEach((item) => {
                    children.push(new Paragraph({
                        text: item.text,
                        bullet: { level: 0 },
                    }));
                });
                break;
        }
    });
    const doc = new Document({
        sections: [{
                children: children,
            }],
    });
    return {
        doc,
        elements: [],
        properties: {
            title: 'Markdown Document',
            author: 'Claude',
            subject: '',
            keywords: [],
        },
        children: children,
    };
}
// Parse JSON structure to document
export function parseJsonStructure(structure) {
    const children = [];
    const processElement = (element) => {
        switch (element.type) {
            case 'heading':
                const headingLevel = getHeadingLevel(`Heading${element.level || 1}`);
                children.push(new Paragraph({
                    text: element.text,
                    heading: headingLevel,
                }));
                break;
            case 'paragraph':
                children.push(new Paragraph({
                    text: element.text,
                }));
                break;
            case 'list':
                element.items.forEach((item) => {
                    children.push(new Paragraph({
                        text: item,
                        bullet: { level: 0 },
                    }));
                });
                break;
        }
    };
    if (Array.isArray(structure)) {
        structure.forEach(processElement);
    }
    else if (structure.elements) {
        structure.elements.forEach(processElement);
    }
    const doc = new Document({
        sections: [{
                children: children,
            }],
    });
    return {
        doc,
        elements: [],
        properties: {
            title: structure.title || 'JSON Document',
            author: structure.author || 'Claude',
            subject: structure.subject || '',
            keywords: structure.keywords || [],
        },
        children: children,
    };
}
