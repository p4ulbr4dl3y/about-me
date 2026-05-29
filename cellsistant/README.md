# Cellsistant — AI Agent for JupyterLab

> **Beta**
> This extension is under active development. We'd love your feedback!
> Please report bugs and share ideas in [GitHub Issues](https://github.com/p4ulbr4dl3y/cellsistant/issues).

---

## What is Cellsistant?

Cellsistant is an AI assistant built right into JupyterLab. It helps you write code, analyze data, create plots, and work with files through a simple chat interface.

Just tell it what to do — and the AI will get it done.

![Cellsistant Demo](demo.gif)

---

## Features

**Notebook:** create cells (code/Markdown), execute cells, get output (text, plots, HTML), update and delete cells, AI Vision for image and chart analysis, search across all cells, replace text in cells.

**Files & Directories:** read files (.py, .json, .csv, .md, etc.), write and create files, list directory contents, create new notebooks, rename and delete files.

**Search:** search text and patterns across all notebook cells, replace text with backreferences support.

**Python Packages:** install packages via `pip` or `conda`, list installed packages.

**Shell Commands:** run shell commands (git, ls, grep, etc.).

> **Safety:** Dangerous commands are blocked (`rm -rf /`, `shutdown`, `nc`, etc.)

---

## Supported AI Models

Cellsistant works with any OpenAI-compatible API.

---

## Installation

### Requirements

- **Python**: 3.9+
- **JupyterLab**: 4.x

### Quick Install

```bash
# Install the extension
pip install cellsistant

# Restart JupyterLab
jupyter lab
```

---

## Modes

### Agent Mode

AI can **read, write, execute code, and run commands**.
Maximum automation — AI writes and runs code on its own.

### Ask Mode

AI **only reads and analyzes** — no modifications.
Safe mode for questions and explanations.

---

## Documentation

For detailed guides and tutorials, see the [docs](./docs/) directory:

- [Installation Guide](./docs/installation.md)
- [Getting Started](./docs/getting-started.md)
- [Features](./docs/features.md)
- [Tutorials](./docs/tutorials/)
- [FAQ](./docs/faq.md)

---

## License

BSD-3-Clause License. See [LICENSE](LICENSE) file.

---