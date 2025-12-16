# Word MCP Server Examples

This directory contains practical examples demonstrating how to use the Microsoft Word MCP Server for various document creation scenarios.

## 📁 Example Files

### 📊 Business Reports
- [`business-report.md`](business-report.md) - Create professional business reports with charts and tables
- [`invoice-generator.md) - Generate.md`](invoice-generator invoices and financial documents
- [`meeting-minutes.md`](meeting-minutes.md) - Create structured meeting minutes

### 📚 Academic Documents
- [`research-paper.md`](research-paper.md) - Format academic papers with citations and references
- [`presentation-handout.md`](presentation-handout.md) - Create presentation handouts and materials

### 📋 Forms and Templates
- [`form-template.md`](form-template.md) - Create structured forms and application templates
- [`checklist.md`](checklist.md) - Generate checklists and task lists

### 🚀 Advanced Features
- [`markdown-conversion.md`](markdown-conversion.md) - Convert existing markdown to Word documents
- [`json-structure.md`](json-structure.md) - Build documents from structured JSON data
- [`image-gallery.md`](image-gallery.md) - Create documents with images and media

## 🛠 How to Use Examples

Each example contains:
- **Scenario Description**: What the example demonstrates
- **Step-by-Step Instructions**: How to implement the solution
- **Expected Output**: What the final document should look like
- **Customization Tips**: How to adapt the example for your needs

## 🔧 Running Examples

1. **Setup the MCP Server**: Ensure your Word MCP Server is running
2. **Choose an Example**: Select the example that matches your use case
3. **Follow Instructions**: Execute the steps in the example
4. **Customize**: Modify the example for your specific requirements

## 💡 Common Patterns

### Document Creation Pattern
```javascript
// 1. Create document with metadata
await create_document({
  properties: {
    title: "Document Title",
    author: "Author Name",
    subject: "Document Subject"
  }
});

// 2. Add content elements
await add_heading({ text: "Section Title", level: 1 });
await add_paragraph({ text: "Section content..." });

// 3. Save the document
await save_document({ path: "./output/document.docx" });
```

### Table Creation Pattern
```javascript
await add_table({
  rows: 3,
  columns: 2,
  data: [
    ["Header 1", "Header 2"],
    ["Data 1", "Data 2"],
    ["Data 3", "Data 4"]
  ]
});
```

### List Creation Pattern
```javascript
await add_list({
  items: ["Item 1", "Item 2", "Item 3"],
  type: "bullet" // or "number"
});
```

## 🎯 Use Case Categories

| Category | Examples | Description |
|----------|----------|-------------|
| **Business** | Report, Invoice, Minutes | Professional documents for business use |
| **Academic** | Research Paper, Handout | Educational and research documents |
| **Forms** | Template, Checklist | Structured documents for data collection |
| **Media** | Image Gallery | Documents with rich media content |
| **Automation** | Markdown, JSON | Automated document generation |

## 🔍 Example Customization

Each example can be customized by:
- **Modifying content**: Change text, headings, and structure
- **Adjusting formatting**: Update styles, colors, and layouts
- **Adding elements**: Include additional tables, lists, or images
- **Changing metadata**: Update document properties and settings

## 📝 Contributing Examples

Want to add your own examples? See our [Contributing Guidelines](../CONTRIBUTING.md) for information on how to contribute examples to this collection.

## 🆘 Getting Help

- **Issues**: [Report problems](https://github.com/suryaarajan7/My-MCPs/issues)
- **Discussions**: [Ask questions](https://github.com/suryaarajan7/My-MCPs/discussions)
- **Documentation**: [API Reference](../docs/api-reference.md)
