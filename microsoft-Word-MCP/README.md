# Microsoft Word MCP Server

[![npm version](https://badge.fury.io/js/word-mcp-server.svg)](https://badge.fury.io/js/word-mcp-server)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful Model Context Protocol (MCP) server for creating, editing, and manipulating Microsoft Word documents programmatically. Built with TypeScript and designed for seamless integration with MCP-compatible AI assistants.

## 🚀 Features

### Document Creation & Management
- **Create New Documents**: Initialize new Word documents with optional templates
- **Load Existing Documents**: Open and modify existing .docx files
- **Save Documents**: Export documents to .docx format
- **Merge Documents**: Combine multiple documents into one
- **Document Properties**: Set metadata (title, author, subject, keywords)

### Content Creation
- **Headings**: Add numbered headings (levels 1-9)
- **Paragraphs**: Insert formatted paragraphs
- **Text Formatting**: Bold, italic, underline, font size, colors
- **Lists**: Create bulleted and numbered lists
- **Tables**: Generate tables with custom data
- **Images**: Insert images from files or URLs
- **Hyperlinks**: Add clickable links
- **Table of Contents**: Automatic TOC generation

### Advanced Features
- **Markdown Conversion**: Convert markdown text to Word documents
- **JSON Structure**: Build documents from structured JSON data
- **Rich Formatting**: Comprehensive text styling options

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Available Tools](#available-tools)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A compatible MCP client (e.g., Claude Desktop, VS Code with MCP extension)

### Global Installation
```bash
npm install -g word-mcp-server
```

### Development Installation
```bash
git clone https://github.com/suryaarajan7/My-MCPs.git
cd microsoft-Word-MCP
npm install
npm run build
```

## 🚀 Quick Start

1. **Install the server** (see [Installation](#installation))
2. **Configure your MCP client** to connect to the server
3. **Use the tools** to create and manipulate Word documents

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "word-mcp": {
      "command": "word-mcp-server",
      "args": []
    }
  }
}
```

## 🛠 Available Tools

### Core Document Tools

#### `create_document`
Create a new Word document

**Parameters:**
- `template` (optional): Template name
- `properties` (optional): Document metadata

**Example:**
```json
{
  "template": "Basic",
  "properties": {
    "title": "My Document",
    "author": "John Doe"
  }
}
```

#### `save_document`
Save the current document to a .docx file

**Parameters:**
- `path`: Output file path

**Example:**
```json
{
  "path": "./output/my-document.docx"
}
```

#### `load_document`
Load an existing .docx file for editing

**Parameters:**
- `path`: Input file path

### Content Tools

#### `add_paragraph`
Add a paragraph to the document

**Parameters:**
- `text`: Paragraph content
- `style` (optional): Paragraph style (Normal, Heading1, etc.)
- `formatting` (optional): Text formatting options

#### `add_heading`
Add a heading to the document

**Parameters:**
- `text`: Heading text
- `level`: Heading level (1-9)

#### `format_text`
Apply text formatting

**Parameters:**
- `text`: Text to format
- `bold`: Bold formatting
- `italic`: Italic formatting
- `underline`: Underline formatting
- `fontSize`: Font size in points
- `fontColor`: Font color

#### `add_list`
Create bulleted or numbered lists

**Parameters:**
- `items`: Array of list items
- `type`: "bullet" or "number"

#### `add_table`
Add a table to the document

**Parameters:**
- `rows`: Number of rows
- `columns`: Number of columns
- `data` (optional): 2D array of cell data

#### `insert_image`
Insert an image

**Parameters:**
- `path`: Image file path or URL
- `width` (optional): Image width in pixels
- `height` (optional): Image height in pixels

#### `add_hyperlink`
Add a hyperlink

**Parameters:**
- `text`: Display text
- `url`: Target URL

### Advanced Tools

#### `add_table_of_contents`
Generate a table of contents

**Parameters:**
- `title` (optional): TOC title

#### `parse_markdown`
Convert markdown to Word document

**Parameters:**
- `markdown`: Markdown text to convert

#### `parse_json_structure`
Build document from JSON structure

**Parameters:**
- `structure`: JSON document structure

## 💡 Usage Examples

### Basic Document Creation

```javascript
// Create a new document
await create_document({
  properties: {
    title: "Project Report",
    author: "Jane Smith",
    subject: "Quarterly Analysis"
  }
});

// Add a heading
await add_heading({
  text: "Executive Summary",
  level: 1
});

// Add content
await add_paragraph({
  text: "This report provides a comprehensive analysis of our quarterly performance.",
  style: "Normal"
});

// Add a formatted text
await format_text({
  text: "Key Findings",
  bold: true,
  fontSize: 14
});

// Create a list
await add_list({
  items: [
    "Revenue increased by 15%",
    "Customer satisfaction improved",
    "Market expansion successful"
  ],
  type: "bullet"
});

// Add a table
await add_table({
  rows: 3,
  columns: 2,
  data: [
    ["Metric", "Value"],
    ["Revenue", "$1.2M"],
    ["Growth", "15%"]
  ]
});

// Save the document
await save_document({
  path: "./reports/quarterly-report.docx"
});
```

### Advanced Features

```javascript
// Create document from markdown
const markdown = `
# Project Proposal

## Overview
This project aims to improve our service delivery.

## Timeline
- Phase 1: Planning (2 weeks)
- Phase 2: Implementation (4 weeks)
`;

await parse_markdown({ markdown });

// Set document properties
await set_document_properties({
  title: "Project Proposal",
  author: "Development Team",
  keywords: ["project", "proposal", "planning"]
});

// Add table of contents
await add_table_of_contents({ title: "Table of Contents" });

await save_document({ path: "./proposals/project-proposal.docx" });
```

### Working with Images and Links

```javascript
// Add a heading
await add_heading({ text: "Product Gallery", level: 2 });

// Insert an image
await insert_image({
  path: "https://example.com/product.jpg",
  width: 400,
  height: 300
});

// Add a hyperlink
await add_hyperlink({
  text: "Visit our website",
  url: "https://example.com"
});

await save_document({ path: "./marketing/product-showcase.docx" });
```

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic usage.

### MCP Server Configuration

The server runs on stdio and automatically handles MCP protocol communication. No additional configuration needed beyond standard MCP client setup.

## 🛠 Development

### Building from Source
```bash
npm install
npm run build
```

### Development Mode
```bash
npm run watch
```

### Testing
```bash
npm test
```

### Inspector
```bash
npm run inspector
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow existing patterns and conventions
- Add JSDoc comments for public APIs
- Ensure all tests pass

## 📚 API Reference

For detailed API documentation, see our [API Reference](docs/api-reference.md).

## 🐛 Troubleshooting

### Common Issues

**Issue**: Server fails to start
- **Solution**: Ensure Node.js 18+ is installed and dependencies are installed

**Issue**: Documents not saving
- **Solution**: Check file path permissions and ensure directory exists

**Issue**: Images not loading
- **Solution**: Verify image path/URL is accessible and file format is supported

**Issue**: Formatting not applied
- **Solution**: Ensure document is created before adding formatted content

### Getting Help
- Check the [Issues](https://github.com/suryaarajan7/My-MCPs/issues) page
- Review the [API Reference](docs/api-reference.md)
- Contact the maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://github.com/modelcontextprotocol)
- Uses the excellent [docx](https://github.com/dolanmiu/docx) library
- Inspired by the need for programmatic Word document generation

## 📈 Roadmap

- [ ] Template management system
- [ ] Advanced table formatting
- [ ] Chart and graph support
- [ ] Collaborative editing features
- [ ] Export to other formats (PDF, HTML)
- [ ] Word document templates library

---

**Made with ❤️ by the Claude Development Team**

For more information, visit our [project page](https://github.com/suryaarajan7/My-MCPs) or contact us at [support@example.com](mailto:support@example.com).
