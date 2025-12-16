# Contributing to Microsoft Word MCP Server

Thank you for your interest in contributing to the Microsoft Word MCP Server! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful and inclusive**: Treat all contributors with respect and courtesy
- **Be collaborative**: Work together to improve the project
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Help new contributors learn and grow
- **Focus on the community**: Keep the project welcoming and supportive

### Unacceptable Behavior

- Harassment, discrimination, or offensive language
- Personal attacks or trolling
- Publishing private information without permission
- Any conduct that could reasonably be considered inappropriate

## 🚀 Getting Started

### Ways to Contribute

1. **🐛 Bug Reports**: Help us identify and fix bugs
2. **✨ Feature Requests**: Suggest new features or improvements
3. **📚 Documentation**: Improve docs, examples, and tutorials
4. **🧪 Testing**: Add or improve test coverage
5. **💻 Code Contributions**: Fix bugs, add features, or improve performance
6. **🎨 UI/UX**: Improve user experience and interface design

### Prerequisites

- Node.js 18+ and npm
- TypeScript knowledge
- Understanding of MCP (Model Context Protocol)
- Familiarity with Word document processing

## 🛠 Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/My-MCPs.git
cd My-MCPs/microsoft-Word-MCP

# Add upstream remote
git remote add upstream https://github.com/suryaarajan7/My-MCPs.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Run Tests

```bash
npm test
```

### 5. Start Development

```bash
npm run watch
```

## 📝 Contribution Guidelines

### Branch Naming

Use descriptive branch names:
- `feature/add-new-tool`
- `bugfix/document-loading-issue`
- `docs/improve-api-reference`
- `refactor/optimize-word-utils`

### Commit Messages

Follow conventional commit format:
```
type(scope): description

feat(add_list): add numbered list support
fix(table): resolve table rendering issue
docs(readme): update installation instructions
refactor(word-utils): improve code organization
test(add_table): add unit tests for table functionality
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Code Organization

```
src/
├── index.ts              # Main server entry point
├── word-utils.ts         # Word document utilities
└── types/                # TypeScript type definitions

tests/
├── unit/                 # Unit tests
├── integration/          # Integration tests
└── fixtures/             # Test data

docs/
├── api-reference.md      # API documentation
└── examples/             # Usage examples
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your fork**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit with clear messages

4. **Run tests and ensure they pass**:
   ```bash
   npm test
   npm run lint
   ```

5. **Update documentation** if needed

### PR Requirements

- ✅ **Clear description** of what the PR does
- ✅ **Tests included** for new functionality
- ✅ **Documentation updated** if needed
- ✅ **Code follows style guidelines**
- ✅ **All tests pass**
- ✅ **No merge conflicts**

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by maintainers
3. **Testing** in development environment
4. **Approval** from at least one maintainer
5. **Merge** when all requirements are met

## 🎯 Coding Standards

### TypeScript Guidelines

- Use strict TypeScript settings
- Prefer interfaces over types for objects
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Avoid `any` types when possible

### Code Style

```typescript
// ✅ Good
interface DocumentOptions {
  template?: string;
  properties?: DocumentProperties;
}

// ❌ Bad
interface DocOpts {
  template?: any;
  props?: any;
}
```

### Error Handling

```typescript
// ✅ Good
try {
  const result = await someOperation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed', error);
  return { success: false, error: error.message };
}

// ❌ Bad
try {
  const result = await someOperation();
  return result;
} catch (error) {
  throw error;
}
```

## 🧪 Testing

### Test Structure

```typescript
// tests/unit/word-utils.test.ts
describe('WordUtils', () => {
  describe('createDocument', () => {
    it('should create a new document with default settings', () => {
      // Test implementation
    });

    it('should handle custom properties', () => {
      // Test implementation
    });
  });
});
```

### Test Coverage

- **Unit tests** for individual functions
- **Integration tests** for tool combinations
- **End-to-end tests** for complete workflows

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📚 Documentation

### Documentation Standards

- **Clear and concise** language
- **Code examples** for all features
- **API reference** with parameter types
- **Screenshots** for UI-related changes
- **Changelog updates** for releases

### Documentation Files

- `README.md` - Main project documentation
- `CONTRIBUTING.md` - This file
- `CHANGELOG.md` - Version history
- `docs/` - Detailed documentation
- `examples/` - Usage examples

### Example Documentation

```typescript
/**
 * Creates a new Word document
 * @param options - Document creation options
 * @returns Document instance
 * @example
 * ```typescript
 * const doc = createDocument({
 *   template: 'Basic',
 *   properties: { title: 'My Document' }
 * });
 * ```
 */
export function createDocument(options: DocumentOptions): Document {
  // Implementation
}
```

## 🐛 Reporting Issues

### Bug Reports

Use the bug report template:

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Node.js version: [e.g. 18.17.0]
- OS: [e.g. Windows 11]
- MCP Server version: [e.g. 0.1.0]

**Additional Context**
Any other relevant information
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the proposed feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Mockups, examples, or other relevant information
```

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Documentation**: Check docs and examples first

### Questions

Before asking questions:
1. Check existing issues and discussions
2. Review documentation and examples
3. Search for similar questions

## 🎉 Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- Project documentation

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Microsoft Word MCP Server!** 🚀

Your contributions help make this project better for everyone. If you have any questions about contributing, don't hesitate to reach out to the maintainers.
