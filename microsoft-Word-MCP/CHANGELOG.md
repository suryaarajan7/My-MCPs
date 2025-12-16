# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Template management system
- Advanced table formatting options
- Chart and graph support
- Collaborative editing features
- Export to other formats (PDF, HTML)
- Word document templates library

## [0.1.0] - 2025-01-16

### Added
- 🎉 Initial release of Microsoft Word MCP Server
- 📄 Core document creation and management features
  - Create new Word documents with optional templates
  - Load existing .docx files for editing
  - Save documents to .docx format
  - Merge multiple documents
  - Set document properties (title, author, subject, keywords)

- 📝 Rich content creation tools
  - Add paragraphs with custom styles
  - Insert headings (levels 1-9)
  - Apply text formatting (bold, italic, underline, font size, colors)
  - Create bulleted and numbered lists
  - Generate tables with custom data
  - Insert images from files or URLs
  - Add hyperlinks
  - Generate table of contents

- 🚀 Advanced features
  - Convert markdown text to Word documents
  - Build documents from structured JSON data
  - Comprehensive text styling options

- 🛠 MCP Protocol integration
  - Full Model Context Protocol support
  - 14 specialized tools for document manipulation
  - Stdio server transport
  - Error handling and validation

- 📚 Documentation and development tools
  - Comprehensive README with examples
  - Contributing guidelines
  - TypeScript support
  - Build scripts and development workflow
  - Testing framework setup

### Technical Details
- **Dependencies**: @modelcontextprotocol/sdk (0.6.0), docx (8.5.0), mammoth (1.6.0), jszip (3.10.1), axios (1.6.0), marked (9.1.6)
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.3.3
- **License**: MIT

### Available Tools
1. `create_document` - Initialize new Word documents
2. `add_paragraph` - Add formatted paragraphs
3. `add_heading` - Insert headings with levels
4. `format_text` - Apply text formatting
5. `add_list` - Create bulleted/numbered lists
6. `add_table` - Generate tables with data
7. `insert_image` - Add images from files/URLs
8. `add_hyperlink` - Insert clickable links
9. `set_document_properties` - Configure metadata
10. `save_document` - Export to .docx
11. `load_document` - Open existing files
12. `merge_documents` - Combine multiple documents
13. `add_table_of_contents` - Generate TOC
14. `parse_markdown` - Convert markdown
15. `parse_json_structure` - Build from JSON

### Installation
```bash
npm install -g word-mcp-server
```

### Usage Example
```javascript
// Create a document with properties
await create_document({
  properties: {
    title: "My Report",
    author: "John Doe"
  }
});

// Add content
await add_heading({ text: "Executive Summary", level: 1 });
await add_paragraph({ text: "This is the main content." });
await add_list({
  items: ["Point 1", "Point 2", "Point 3"],
  type: "bullet"
});

// Save the document
await save_document({ path: "./output/report.docx" });
```

---

## Release Notes Format

### Added
For new features.

### Changed
For changes in existing functionality.

### Deprecated
For soon-to-be removed features.

### Removed
For now removed features.

### Fixed
For any bug fixes.

### Security
For security-related changes.

### Breaking Changes
For changes that break backward compatibility (include migration guide).

## Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **MAJOR** version when you make incompatible API changes
- **MINOR** version when you add functionality in a backwards compatible manner
- **PATCH** version when you make backwards compatible bug fixes

## Contributors

- Claude Development Team - Initial development

## Support

For support and questions:
- GitHub Issues: [Create an issue](https://github.com/suryaarajan7/My-MCPs/issues)
- Documentation: [API Reference](docs/api-reference.md)
- Email: support@example.com
