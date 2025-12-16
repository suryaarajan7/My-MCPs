#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { 
  createDocument,
  addParagraph, 
  addHeading,
  formatText,
  addList,
  addTable,
  insertImage,
  addHyperlink,
  setDocumentProperties,
  saveDocument,
  loadDocument,
  mergeDocuments,
  addTableOfContents,
  parseMarkdown,
  parseJsonStructure
} from './word-utils';

interface DocumentOperation {
  operation: string;
  parameters: any;
}

class WordMCPServer {
  private server: Server;
  private documentState: any = null;

  constructor() {
    this.server = new Server(
      {
        name: 'word-mcp-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'create_document',
          description: 'Create a new Word document',
          inputSchema: {
            type: 'object',
            properties: {
              template: {
                type: 'string',
                description: 'Template name (optional)',
              },
              properties: {
                type: 'object',
                description: 'Document properties (title, author, etc.)',
              },
            },
          },
        },
        {
          name: 'add_paragraph',
          description: 'Add a paragraph to the document',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Paragraph text',
              },
              style: {
                type: 'string',
                description: 'Paragraph style (Normal, Heading1, etc.)',
              },
              formatting: {
                type: 'object',
                description: 'Text formatting options',
              },
            },
            required: ['text'],
          },
        },
        {
          name: 'add_heading',
          description: 'Add a heading to the document',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Heading text',
              },
              level: {
                type: 'number',
                description: 'Heading level (1-9)',
                minimum: 1,
                maximum: 9,
              },
            },
            required: ['text', 'level'],
          },
        },
        {
          name: 'format_text',
          description: 'Apply formatting to text ranges',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Text to format',
              },
              bold: {
                type: 'boolean',
                description: 'Bold formatting',
              },
              italic: {
                type: 'boolean',
                description: 'Italic formatting',
              },
              underline: {
                type: 'boolean',
                description: 'Underline formatting',
              },
              fontSize: {
                type: 'number',
                description: 'Font size in points',
              },
              fontColor: {
                type: 'string',
                description: 'Font color (hex or named)',
              },
            },
            required: ['text'],
          },
        },
        {
          name: 'add_list',
          description: 'Add a bulleted or numbered list',
          inputSchema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                description: 'List of items',
                items: { type: 'string' },
              },
              type: {
                type: 'string',
                description: 'List type: bullet or number',
                enum: ['bullet', 'number'],
              },
            },
            required: ['items'],
          },
        },
        {
          name: 'add_table',
          description: 'Add a table to the document',
          inputSchema: {
            type: 'object',
            properties: {
              rows: {
                type: 'number',
                description: 'Number of rows',
              },
              columns: {
                type: 'number',
                description: 'Number of columns',
              },
              data: {
                type: 'array',
                description: 'Table data (2D array)',
              },
            },
            required: ['rows', 'columns'],
          },
        },
        {
          name: 'insert_image',
          description: 'Insert an image into the document',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Path to image file or URL',
              },
              width: {
                type: 'number',
                description: 'Image width in pixels',
              },
              height: {
                type: 'number',
                description: 'Image height in pixels',
              },
            },
            required: ['path'],
          },
        },
        {
          name: 'add_hyperlink',
          description: 'Add a hyperlink to the document',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Hyperlink text',
              },
              url: {
                type: 'string',
                description: 'Hyperlink URL',
              },
            },
            required: ['text', 'url'],
          },
        },
        {
          name: 'set_document_properties',
          description: 'Set document metadata properties',
          inputSchema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Document title',
              },
              author: {
                type: 'string',
                description: 'Document author',
              },
              subject: {
                type: 'string',
                description: 'Document subject',
              },
              keywords: {
                type: 'array',
                description: 'Document keywords',
                items: { type: 'string' },
              },
            },
          },
        },
        {
          name: 'save_document',
          description: 'Save the document to a .docx file',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Output file path',
              },
            },
            required: ['path'],
          },
        },
        {
          name: 'load_document',
          description: 'Load an existing .docx file',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Input file path',
              },
            },
            required: ['path'],
          },
        },
        {
          name: 'merge_documents',
          description: 'Merge multiple documents together',
          inputSchema: {
            type: 'object',
            properties: {
              documentPaths: {
                type: 'array',
                description: 'Array of document paths to merge',
                items: { type: 'string' },
              },
              outputPath: {
                type: 'string',
                description: 'Output path for merged document',
              },
            },
            required: ['documentPaths', 'outputPath'],
          },
        },
        {
          name: 'add_table_of_contents',
          description: 'Add a table of contents to the document',
          inputSchema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'TOC title',
              },
            },
          },
        },
        {
          name: 'parse_markdown',
          description: 'Convert markdown text to Word document',
          inputSchema: {
            type: 'object',
            properties: {
              markdown: {
                type: 'string',
                description: 'Markdown text to convert',
              },
            },
            required: ['markdown'],
          },
        },
        {
          name: 'parse_json_structure',
          description: 'Build document from JSON structure',
          inputSchema: {
            type: 'object',
            properties: {
              structure: {
                type: 'object',
                description: 'JSON document structure',
              },
            },
            required: ['structure'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} } = request.params;

      try {
        switch (name) {
          case 'create_document':
            this.documentState = createDocument(args as any);
            return {
              content: [{ type: 'text', text: 'Document created successfully' }],
            };

          case 'add_paragraph':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            addParagraph(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'Paragraph added successfully' }],
            };

          case 'add_heading':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            addHeading(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'Heading added successfully' }],
            };

          case 'format_text':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            const formattedText = formatText(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: formattedText }],
            };

          case 'add_list':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            addList(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'List added successfully' }],
            };

          case 'add_table':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            addTable(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'Table added successfully' }],
            };

          case 'insert_image':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            insertImage(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'Image inserted successfully' }],
            };

          case 'add_hyperlink':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            addHyperlink(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'Hyperlink added successfully' }],
            };

          case 'set_document_properties':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            setDocumentProperties(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'Document properties set successfully' }],
            };

          case 'save_document':
            if (!this.documentState) {
              throw new Error('No document to save. Create a document first.');
            }
            if (!args?.path) {
              throw new Error('Path is required for save_document');
            }
            await saveDocument(this.documentState, args.path as string);
            return {
              content: [{ type: 'text', text: `Document saved to ${args.path as string}` }],
            };

          case 'load_document':
            if (!args?.path) {
              throw new Error('Path is required for load_document');
            }
            this.documentState = await loadDocument(args.path as string);
            return {
              content: [{ type: 'text', text: `Document loaded from ${args.path as string}` }],
            };

          case 'merge_documents':
            if (!args?.documentPaths || !args?.outputPath) {
              throw new Error('documentPaths and outputPath are required for merge_documents');
            }
            await mergeDocuments(args.documentPaths as string[], args.outputPath as string);
            return {
              content: [{ type: 'text', text: `Documents merged to ${args.outputPath as string}` }],
            };

          case 'add_table_of_contents':
            if (!this.documentState) {
              throw new Error('No document created. Call create_document first.');
            }
            addTableOfContents(this.documentState, args as any);
            return {
              content: [{ type: 'text', text: 'Table of contents added successfully' }],
            };

          case 'parse_markdown':
            if (!args?.markdown) {
              throw new Error('Markdown text is required for parse_markdown');
            }
            this.documentState = parseMarkdown(args.markdown as string);
            return {
              content: [{ type: 'text', text: 'Markdown converted to document successfully' }],
            };

          case 'parse_json_structure':
            if (!args?.structure) {
              throw new Error('Structure is required for parse_json_structure');
            }
            this.documentState = parseJsonStructure(args.structure as any);
            return {
              content: [{ type: 'text', text: 'JSON structure converted to document successfully' }],
            };

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Word MCP server running on stdio');
  }
}

const server = new WordMCPServer();
server.run().catch(console.error);
