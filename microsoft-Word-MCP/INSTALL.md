# Installation Guide

This guide provides detailed instructions for installing and setting up the Microsoft Word MCP Server.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Global Installation](#global-installation)
- [Development Installation](#development-installation)
- [Verification](#verification)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## 🛠 Prerequisites

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Memory**: At least 512MB available RAM
- **Storage**: 100MB free disk space

### Required Software

#### Node.js Installation
Choose one of the following methods:

**Option 1: Official Node.js Website**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation:
   ```bash
   node --version  # Should show v18.x.x or higher
   npm --version   # Should show 8.x.x or higher
   ```

**Option 2: Using a Version Manager (Recommended)**

*For macOS/Linux:*
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# Restart terminal, then install Node.js
nvm install 18
nvm use 18
```

*For Windows:*
1. Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. Run the installer as Administrator
3. Open new command prompt and run:
   ```cmd
   nvm install 18.17.0
   nvm use 18.17.0
   ```

### MCP Client Requirements

You'll need one of the following MCP-compatible clients:

- **Claude Desktop**: Latest version with MCP support
- **VS Code**: With MCP extension
- **Custom MCP Client**: Any client implementing the MCP protocol

## 📦 Installation Methods

### Method 1: Global Installation (Recommended)

This installs the server globally, making it available from anywhere.

```bash
# Install globally
npm install -g word-mcp-server

# Verify installation
word-mcp-server --help
```

### Method 2: Local Installation

For project-specific installations:

```bash
# Create a new directory for your project
mkdir my-word-automation
cd my-word-automation

# Initialize npm project
npm init -y

# Install as local dependency
npm install word-mcp-server

# Add to package.json scripts
npm pkg set scripts.word-mcp="word-mcp-server"
```

### Method 3: Development Installation

For contributors and developers:

```bash
# Clone the repository
git clone https://github.com/suryaarajan7/My-MCPs.git
cd My-MCPs/microsoft-Word-MCP

# Install dependencies
npm install

# Build the project
npm run build

# Link globally for testing
npm link

# Verify the installation
word-mcp-server --version
```

## ⚙️ Verification

### 1. Check Installation

```bash
# Check if the command is available
which word-mcp-server    # macOS/Linux
where word-mcp-server    # Windows

# Check version
word-mcp-server --version

# Test the server
word-mcp-server --help
```

### 2. Test MCP Connection

Create a simple test script:

```javascript
// test-connection.js
import { spawn } from 'child_process';

// Start the MCP server
const server = spawn('word-mcp-server', [], {
  stdio: ['pipe', 'pipe', 'pipe']
});

console.log('Starting Word MCP Server...');

// Handle server output
server.stdout.on('data', (data) => {
  console.log('Server output:', data.toString());
});

server.stderr.on('data', (data) => {
  console.error('Server error:', data.toString());
});

// Keep the process running for 5 seconds
setTimeout(() => {
  server.kill();
  console.log('Test completed successfully!');
}, 5000);
```

Run the test:
```bash
node test-connection.js
```

## 🔧 Configuration

### Environment Setup

#### Windows
1. **Find npm global path**:
   ```cmd
   npm config get prefix
   ```

2. **Add to PATH** (if not already there):
   - Open System Properties → Advanced → Environment Variables
   - Add the npm prefix path to the PATH variable

#### macOS/Linux
1. **Add to shell profile**:
   ```bash
   echo 'export PATH="$PATH:$(npm config get prefix)/bin"' >> ~/.bashrc
   source ~/.bashrc
   ```

### MCP Client Configuration

#### Claude Desktop Configuration

Add to your Claude Desktop configuration file:

**Location**: 
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "word-mcp": {
      "command": "word-mcp-server",
      "args": [],
      "env": {}
    }
  }
}
```

#### VS Code Configuration

Add to your VS Code settings (`settings.json`):

```json
{
  "mcp.servers": {
    "word-mcp": {
      "command": "word-mcp-server",
      "args": [],
      "env": {}
    }
  }
}
```

### Custom Configuration

#### Environment Variables

The server supports these environment variables:

```bash
# Optional: Set custom log level
export MCP_LOG_LEVEL=debug

# Optional: Set custom temp directory
export MCP_TEMP_DIR=/tmp/word-mcp

# Optional: Set Node.js options
export NODE_OPTIONS="--max-old-space-size=1024"
```

#### Configuration File

Create a configuration file at `~/.word-mcp-server/config.json`:

```json
{
  "logLevel": "info",
  "tempDir": "./temp",
  "maxDocumentSize": "50MB",
  "allowedImageFormats": ["png", "jpg", "jpeg", "gif", "bmp"],
  "defaultFontSize": 11,
  "defaultFontName": "Calibri"
}
```

## 🚨 Troubleshooting

### Common Installation Issues

#### Issue: "Command not found" after global installation

**Solution**:
1. Check npm global path:
   ```bash
   npm config get prefix
   ```

2. Add to PATH:
   - **Windows**: Add npm prefix to PATH environment variable
   - **macOS/Linux**: Add to shell profile

3. Restart terminal/command prompt

#### Issue: Permission denied during global installation

**Solution**:
```bash
# Option 1: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Option 2: Use sudo (not recommended)
sudo npm install -g word-mcp-server
```

#### Issue: Node.js version compatibility

**Solution**:
```bash
# Check current version
node --version

# If version is too old, update Node.js
# Using nvm:
nvm install 18
nvm use 18

# Using nvm-windows (Windows):
nvm install 18.17.0
nvm use 18.17.0
```

#### Issue: Network/firewall blocking installation

**Solution**:
```bash
# Try with different registry
npm config set registry https://registry.npmjs.org/

# Or install with specific timeout
npm install -g word-mcp-server --timeout=60000
```

### Runtime Issues

#### Issue: Server fails to start

**Debug Steps**:
1. Check Node.js version:
   ```bash
   node --version  # Should be 18+
   ```

2. Check npm installation:
   ```bash
   npm --version   # Should be 8+
   ```

3. Test with verbose logging:
   ```bash
   DEBUG=word-mcp-server word-mcp-server
   ```

4. Check permissions:
   ```bash
   ls -la $(npm config get prefix)/bin/word-mcp-server
   ```

#### Issue: MCP client cannot connect

**Debug Steps**:
1. Test server manually:
   ```bash
   echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test", "version": "1.0.0"}}}' | word-mcp-server
   ```

2. Check client configuration
3. Verify PATH is set correctly
4. Check firewall settings

### Getting Help

If you continue to experience issues:

1. **Check the logs**: Look for error messages in the console output
2. **Search existing issues**: [GitHub Issues](https://github.com/suryaarajan7/My-MCPs/issues)
3. **Create a new issue**: Include:
   - Operating system and version
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Installation command used
   - Full error message
   - Steps to reproduce

## 🗑 Uninstallation

### Global Uninstallation
```bash
npm uninstall -g word-mcp-server
```

### Remove Configuration
```bash
# Remove npm global package
rm -rf $(npm config get prefix)/lib/node_modules/word-mcp-server

# Remove symlink
rm -rf $(npm config get prefix)/bin/word-mcp-server

# Remove configuration (optional)
rm -rf ~/.word-mcp-server/
```

### Development Uninstallation
```bash
# If you used npm link
npm unlink

# Remove cloned repository
rm -rf ~/My-MCPs/
```

## 📈 Performance Optimization

### For Production Use

1. **Increase Node.js memory limit**:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=2048"
   ```

2. **Use a process manager**:
   ```bash
   # Install pm2
   npm install -g pm2

   # Start as service
   pm2 start "word-mcp-server" --name "word-mcp"
   ```

3. **Configure monitoring**:
   ```bash
   # Monitor process
   pm2 monit
   ```

## 🔒 Security Considerations

- The server runs with the same permissions as the user who starts it
- Document files are processed locally - no data is sent to external servers
- Be cautious when processing documents from untrusted sources
- Consider running in a sandboxed environment for sensitive documents

## 📞 Support

- **Documentation**: [README.md](./README.md)
- **Examples**: [examples/](./examples/)
- **Issues**: [GitHub Issues](https://github.com/suryaarajan7/My-MCPs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/suryaarajan7/My-MCPs/discussions)
