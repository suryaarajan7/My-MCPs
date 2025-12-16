# Troubleshooting & FAQ

This guide helps you resolve common issues and provides answers to frequently asked Word MCP Server.

 questions about the Microsoft## 📋 Table of Contents

- [Quick Diagnostics](#quick-diagnostics)
- [Common Issues](#common-issues)
- [Installation Problems](#installation-problems)
- [Runtime Issues](#runtime-issues)
- [Document Creation Issues](#document-creation-issues)
- [MCP Connection Problems](#mcp-connection-problems)
- [Performance Issues](#performance-issues)
- [FAQ](#faq)
- [Getting Help](#getting-help)

## 🔍 Quick Diagnostics

### System Information
Run this to gather system information for troubleshooting:

```bash
# Node.js version
node --version

# npm version
npm --version

# Server version
word-mcp-server --version

# Check if command is available
which word-mcp-server  # macOS/Linux
where word-mcp-server  # Windows

# npm global path
npm config get prefix
```

### Test Server Connection
```bash
# Test basic server functionality
word-mcp-server --help

# Test MCP protocol
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test", "version": "1.0.0"}}}' | word-mcp-server
```

## 🚨 Common Issues

### Installation Problems

#### "Command not found" Error
**Symptoms**: `word-mcp-server: command not found` after installation

**Causes & Solutions**:
1. **PATH not configured**
   ```bash
   # Add to PATH (macOS/Linux)
   echo 'export PATH="$PATH:$(npm config get prefix)/bin"' >> ~/.bashrc
   source ~/.bashrc
   
   # Windows: Add npm prefix to PATH environment variable
   # Check prefix: npm config get prefix
   ```

2. **Global installation failed**
   ```bash
   # Reinstall globally
   npm uninstall -g word-mcp-server
   npm install -g word-mcp-server
   
   # Check installation location
   ls -la $(npm config get prefix)/bin/word-mcp-server
   ```

3. **Shell cache**
   ```bash
   # Clear hash cache
   hash -r  # Unix/Linux/macOS
   ```

#### Permission Denied
**Symptoms**: `EACCES: permission denied` during installation

**Solutions**:
```bash
# Option 1: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Option 2: Use a version manager
# For macOS/Linux: nvm
# For Windows: nvm-windows

# Option 3: Sudo (not recommended for production)
sudo npm install -g word-mcp-server
```

#### Node.js Version Issues
**Symptoms**: Installation fails or server doesn't start

**Solutions**:
```bash
# Check current version
node --version

# Minimum required: Node.js 18+
# If version is too old:
# macOS/Linux:
nvm install 18
nvm use 18

# Windows:
nvm install 18.17.0
nvm use 18.17.0

# Verify version
node --version  # Should show v18.x.x
npm --version   # Should show 8.x.x
```

### Runtime Issues

#### Server Fails to Start
**Symptoms**: Server exits immediately or shows errors

**Diagnostic Steps**:
1. **Check Node.js installation**:
   ```bash
   node --version  # Must be 18+
   npm --version   # Must be 8+
   ```

2. **Check server installation**:
   ```bash
   word-mcp-server --version
   word-mcp-server --help
   ```

3. **Test with verbose logging**:
   ```bash
   DEBUG=word-mcp-server word-mcp-server
   ```

4. **Check permissions**:
   ```bash
   # Ensure executable permissions (Unix/Linux/macOS)
   chmod +x $(npm config get prefix)/bin/word-mcp-server
   ```

**Common Causes & Solutions**:

1. **Missing dependencies**:
   ```bash
   # Reinstall dependencies
   npm install -g word-mcp-server --force
   ```

2. **Corrupted installation**:
   ```bash
   # Clean reinstall
   npm uninstall -g word-mcp-server
   npm cache clean --force
   npm install -g word-mcp-server
   ```

3. **Memory issues**:
   ```bash
   # Increase Node.js memory limit
   export NODE_OPTIONS="--max-old-space-size=1024"
   word-mcp-server
   ```

#### Server Starts But Hangs
**Symptoms**: Server starts but doesn't respond to input

**Solutions**:
1. **Check if server expects stdin input**:
   - The server is designed to run continuously, waiting for MCP protocol messages
   - Test with proper MCP client connection

2. **Timeout settings**:
   ```bash
   # Set timeout for testing
   timeout 10s word-mcp-server
   ```

3. **Process management**:
   ```bash
   # Check if process is running
   ps aux | grep word-mcp-server
   
   # Kill process if needed
   pkill word-mcp-server  # Unix/Linux/macOS
   taskkill /f /im word-mcp-server.exe  # Windows
   ```

### Document Creation Issues

#### Documents Not Saving
**Symptoms**: `save_document` tool fails or file not created

**Diagnostic Steps**:
1. **Check directory permissions**:
   ```bash
   # Test write permissions
   touch /tmp/test-write.txt && rm /tmp/test-write.txt
   ```

2. **Verify path**:
   ```javascript
   // Ensure absolute path is used
   await save_document({ path: "/absolute/path/to/document.docx" });
   ```

3. **Check disk space**:
   ```bash
   df -h  # Check available disk space
   ```

**Common Solutions**:
1. **Use absolute paths**:
   ```javascript
   // Instead of relative path
   await save_document({ path: "./output/document.docx" });
   
   // Use absolute path
   await save_document({ path: __dirname + "/output/document.docx" });
   ```

2. **Create directory first**:
   ```javascript
   const fs = require('fs');
   const path = './output/document.docx';
   
   // Ensure directory exists
   const dir = path.substring(0, path.lastIndexOf('/'));
   if (!fs.existsSync(dir)) {
     fs.mkdirSync(dir, { recursive: true });
   }
   
   await save_document({ path });
   ```

#### Images Not Loading
**Symptoms**: `insert_image` tool fails or images don't appear

**Solutions**:
1. **Check file path/URL**:
   ```javascript
   // Verify image exists and path is correct
   // For local files: ensure path is accessible
   // For URLs: ensure URL is accessible
   ```

2. **Supported formats**: PNG, JPG, JPEG, GIF, BMP

3. **File size limits**:
   - Large images may cause memory issues
   - Consider resizing before insertion

#### Formatting Not Applied
**Symptoms**: Text formatting doesn't appear in document

**Solutions**:
1. **Ensure document is created first**:
   ```javascript
   // Must call create_document before other operations
   await create_document();
   await add_paragraph({ text: "Formatted text" });
   ```

2. **Check parameter format**:
   ```javascript
   // Correct formatting parameters
   await format_text({
     text: "Bold text",
     bold: true,
     fontSize: 14,
     fontColor: "red"
   });
   ```

### MCP Connection Problems

#### Client Cannot Connect to Server
**Symptoms**: MCP client shows connection errors

**Diagnostic Steps**:
1. **Test server manually**:
   ```bash
   # Test with sample MCP message
   echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test", "version": "1.0.0"}}}' | word-mcp-server
   ```

2. **Check client configuration**:
   - Verify server command path is correct
   - Ensure server is in PATH
   - Check client logs for specific errors

**Solutions**:
1. **Server not in PATH**:
   ```bash
   # Add to PATH
   export PATH="$PATH:$(npm config get prefix)/bin"
   ```

2. **Client configuration error**:
   ```json
   // Claude Desktop config
   {
     "mcpServers": {
       "word-mcp": {
         "command": "word-mcp-server",
         "args": []
       }
     }
   }
   ```

3. **Firewall/security software**:
   - Check if firewall blocks the process
   - Whitelist Node.js and the server process

#### Tools Not Available
**Symptoms**: Client shows no tools available from server

**Solutions**:
1. **Check server startup**:
   - Ensure server initializes properly
   - Look for error messages in server logs

2. **MCP protocol version mismatch**:
   ```bash
   # Ensure compatible protocol version
   echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05"}}' | word-mcp-server
   ```

### Performance Issues

#### Slow Document Generation
**Symptoms**: Document creation takes a long time

**Solutions**:
1. **Optimize document size**:
   - Break large documents into smaller chunks
   - Use simpler formatting for large documents

2. **Increase memory limit**:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=2048"
   word-mcp-server
   ```

3. **Check system resources**:
   ```bash
   # Check memory usage
   free -h  # Linux/macOS
   wmic OS get TotalVisibleMemorySize,FreePhysicalMemory  # Windows
   
   # Check disk space
   df -h
   ```

#### Memory Issues
**Symptoms**: Server crashes with out-of-memory errors

**Solutions**:
1. **Increase memory limit**:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   word-mcp-server
   ```

2. **Process large documents in chunks**:
   ```javascript
   // Process large content in smaller pieces
   const chunks = splitContentIntoChunks(largeContent);
   for (const chunk of chunks) {
     await add_paragraph({ text: chunk });
   }
   ```

3. **Monitor memory usage**:
   ```bash
   # Monitor process memory
   ps aux | grep word-mcp-server
   top -p $(pgrep word-mcp-server)
   ```

## ❓ FAQ

### General Questions

**Q: What is the Microsoft Word MCP Server?**
A: It's a Model Context Protocol server that provides tools for creating, editing, and manipulating Microsoft Word documents programmatically through AI assistants.

**Q: Do I need Microsoft Word installed?**
A: No, the server generates .docx files programmatically and doesn't require Microsoft Word to be installed.

**Q: What file formats are supported?**
A: 
- Input: .docx files (for loading existing documents)
- Output: .docx files
- Images: PNG, JPG, JPEG, GIF, BMP
- Text: Markdown conversion supported

**Q: What are the system requirements?**
A: 
- Node.js 18+ 
- npm 8+
- 512MB RAM minimum
- 100MB disk space
- Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)

### Installation Questions

**Q: Can I install it without Node.js?**
A: No, Node.js is required. Download from [nodejs.org](https://nodejs.org/).

**Q: Should I install globally or locally?**
A: 
- **Global**: For system-wide usage and MCP client integration
- **Local**: For project-specific usage

**Q: How do I update to the latest version?**
A: 
```bash
npm update -g word-mcp-server
```

### Usage Questions

**Q: How do I create my first document?**
A: 
```javascript
await create_document();
await add_heading({ text: "My First Document", level: 1 });
await add_paragraph({ text: "Hello, World!" });
await save_document({ path: "./output/my-document.docx" });
```

**Q: Can I edit existing documents?**
A: Yes, use `load_document` to open existing .docx files, then modify them with the available tools.

**Q: How do I add images?**
A: 
```javascript
await insert_image({
  path: "./path/to/image.png",
  width: 400,
  height: 300
});
```

**Q: Can I create tables?**
A: Yes, use `add_table`:
```javascript
await add_table({
  rows: 3,
  columns: 2,
  data: [
    ["Header 1", "Header 2"],
    ["Row 1 Col 1", "Row 1 Col 2"],
    ["Row 2 Col 1", "Row 2 Col 2"]
  ]
});
```

**Q: How do I convert markdown to Word?**
A: 
```javascript
await parse_markdown({ 
  markdown: "# Hello World\n\nThis is a test." 
});
```

### Integration Questions

**Q: How do I integrate with Claude Desktop?**
A: Add the server configuration to your Claude Desktop config file:
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

**Q: Can I use this with other MCP clients?**
A: Yes, any MCP-compatible client should work with the server.

**Q: Is this compatible with VS Code?**
A: Yes, with the MCP extension for VS Code.

### Performance Questions

**Q: How many documents can I create simultaneously?**
A: The server processes one document at a time. For batch processing, create documents sequentially.

**Q: What's the maximum document size?**
A: Limited by available memory. For large documents, consider splitting into smaller chunks.

**Q: How fast is document generation?**
A: Depends on document complexity. Simple documents generate in seconds, complex ones may take longer.

### Troubleshooting Questions

**Q: Where are the log files?**
A: Check console output. The server logs to stderr/stdout.

**Q: How do I report bugs?**
A: Create an issue on [GitHub](https://github.com/suryaarajan7/My-MCPs/issues).

**Q: How do I get help?**
A: 
1. Check this troubleshooting guide
2. Search [GitHub Issues](https://github.com/suryaarajan7/My-MCPs/issues)
3. Create a new issue with system information and error details

## 🆘 Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Search existing issues**: [GitHub Issues](https://github.com/suryaarajan7/My-MCPs/issues)
3. **Gather system information**:
   ```bash
   node --version
   npm --version
   word-mcp-server --version
   uname -a  # or systeminfo on Windows
   ```

### Creating a Bug Report

Include this information in your issue:

```markdown
**Environment**
- OS: [e.g., Windows 11, macOS 14.0, Ubuntu 20.04]
- Node.js version: [e.g., 18.17.0]
- npm version: [e.g., 9.6.7]
- Server version: [e.g., 0.1.0]

**Problem Description**
Clear description of the issue

**Steps to Reproduce**
1. Step one
2. Step two
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Error Messages**
Copy any error messages

**Additional Context**
Any other relevant information
```

### Community Resources

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Documentation**: [README.md](./README.md)
- **Examples**: [examples/](./examples/)

## 🔧 Advanced Debugging

### Enable Debug Logging
```bash
DEBUG=word-mcp-server word-mcp-server
```

### Monitor System Resources
```bash
# Monitor CPU and memory
top -p $(pgrep -f word-mcp-server)

# Monitor file descriptors
lsof -p $(pgrep -f word-mcp-server)

# Monitor network connections
netstat -p | grep word-mcp-server
```

### Profile Performance
```bash
# CPU profiling
NODE_OPTIONS="--cpu-prof" word-mcp-server

# Memory profiling
NODE_OPTIONS="--heap-prof" word-mcp-server
```

### Network Analysis
```bash
# Check for network issues
curl -I http://localhost:3000/health  # if applicable
```

---

**Still need help?** Don't hesitate to create an issue or reach out to the community!
