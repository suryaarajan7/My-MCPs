# Business Report Example

This example demonstrates how to create a professional business report using the Word MCP Server.

## Scenario
Create a quarterly business performance report with executive summary, data tables, and formatted sections.

## Expected Output
A professional .docx document with:
- Company letterhead and metadata
- Executive summary with key metrics
- Performance data in tables
- Formatted headings and paragraphs
- Numbered sections

## Implementation

### Step 1: Create Document with Metadata
```javascript
await create_document({
  properties: {
    title: "Q4 2024 Business Performance Report",
    author: "Claude Development Team",
    subject: "Quarterly Business Review",
    keywords: ["business", "quarterly", "performance", "report", "Q4 2024"]
  }
});
```

### Step 2: Add Title Page Content
```javascript
// Main title
await add_heading({
  text: "Q4 2024 Business Performance Report",
  level: 1
});

// Subtitle
await add_paragraph({
  text: "Comprehensive Analysis of Quarterly Performance Metrics",
  style: "Subtitle"
});

// Company info
await add_paragraph({
  text: "Claude Development Team\nJanuary 2025",
  style: "Normal"
});

// Add some space
await add_paragraph({ text: "" });

// Confidential notice
await format_text({
  text: "CONFIDENTIAL - Internal Use Only",
  bold: true,
  fontColor: "red"
});
```

### Step 3: Executive Summary Section
```javascript
await add_heading({
  text: "Executive Summary",
  level: 2
});

await add_paragraph({
  text: "This quarterly report presents a comprehensive analysis of our business performance for Q4 2024. The report highlights key achievements, challenges, and strategic recommendations for the upcoming quarter.",
  style: "Normal"
});

// Key highlights
await add_heading({
  text: "Key Highlights",
  level: 3
});

await add_list({
  items: [
    "Revenue increased by 23% compared to Q3 2024",
    "Customer satisfaction score reached 4.8/5.0",
    "Market expansion into 3 new regions",
    "Successful launch of Microsoft Word MCP Server",
    "Team growth of 15% with focus on quality"
  ],
  type: "bullet"
});
```

### Step 4: Financial Performance
```javascript
await add_heading({
  text: "Financial Performance",
  level: 2
});

await add_paragraph({
  text: "The following table summarizes our key financial metrics for Q4 2024:",
  style: "Normal"
});

await add_table({
  rows: 6,
  columns: 3,
  data: [
    ["Metric", "Q4 2024", "Q3 2024"],
    ["Total Revenue", "$2.3M", "$1.87M"],
    ["Gross Margin", "68%", "65%"],
    ["Operating Expenses", "$1.1M", "$950K"],
    ["Net Profit", "$450K", "$320K"],
    ["Cash Flow", "$520K", "$380K"]
  ]
});
```

### Step 5: Market Analysis
```javascript
await add_heading({
  text: "Market Analysis",
  level: 2
});

await add_paragraph({
  text: "Our market analysis reveals significant opportunities for growth in the coming quarter.",
  style: "Normal"
});

await add_heading({
  text: "Market Share Growth",
  level: 3
});

await add_list({
  items: [
    "North America: 12% → 15% market share",
    "Europe: 8% → 11% market share", 
    "Asia-Pacific: 5% → 7% market share",
    "Latin America: 2% → 4% market share"
  ],
  type: "number"
});
```

### Step 6: Product Performance
```javascript
await add_heading({
  text: "Product Performance",
  level: 2
});

await add_table({
  rows: 5,
  columns: 4,
  data: [
    ["Product", "Units Sold", "Revenue", "Growth"],
    ["Word MCP Server", "1,250", "$625K", "+45%"],
    ["Jira Integration", "890", "$445K", "+32%"],
    ["GitHub Tools", "1,100", "$550K", "+28%"],
    ["Zephyr Suite", "650", "$325K", "+18%"]
  ]
});
```

### Step 7: Strategic Recommendations
```javascript
await add_heading({
  text: "Strategic Recommendations",
  level: 2
});

await add_paragraph({
  text: "Based on our analysis, we recommend the following strategic initiatives for Q1 2025:",
  style: "Normal"
});

await add_list({
  items: [
    "Expand sales team by 20% to capitalize on market opportunities",
    "Invest in product development for advanced features",
    "Strengthen partnerships with key technology providers",
    "Implement customer success program to improve retention",
    "Launch marketing campaign in Asia-Pacific region"
  ],
  type: "number"
});
```

### Step 8: Add Table of Contents
```javascript
await add_heading({
  text: "Table of Contents",
  level: 2
});

await add_table_of_contents({
  title: "Contents"
});
```

### Step 9: Save the Document
```javascript
await save_document({
  path: "./output/Q4-2024-Business-Report.docx"
});
```

## Customization Tips

### 1. Modify Financial Data
Replace the table data with your actual financial metrics:
```javascript
data: [
  ["Metric", "Q4 2024", "Q3 2024", "Change"],
  // Your actual data here
]
```

### 2. Add Charts
While the current version doesn't include chart creation, you can:
- Add chart data in table format
- Insert images of charts using `insert_image`
- Use formatted tables to simulate charts

### 3. Customize Branding
- Update company name and logo
- Modify color schemes in the `format_text` function
- Add your company's contact information

### 4. Add More Sections
Extend the report by adding more sections:
- Risk Analysis
- Competitive Landscape
- Technology Trends
- Regulatory Updates

### 5. Change Document Properties
Update the document metadata:
```javascript
properties: {
  title: "Your Custom Title",
  author: "Your Company Name",
  subject: "Your Report Subject",
  keywords: ["custom", "keywords", "for", "search"]
}
```

## Advanced Features Used

- ✅ Document creation with metadata
- ✅ Multi-level headings (H1, H2, H3)
- ✅ Formatted paragraphs with styles
- ✅ Bulleted and numbered lists
- ✅ Multi-column tables with headers
- ✅ Text formatting (bold, colors)
- ✅ Table of contents generation
- ✅ Document saving

## Output Location
The final document will be saved as: `./output/Q4-2024-Business-Report.docx`

## File Size
Expected file size: 50-150 KB (depending on content length and formatting)
