# thivi-mcp

MCP (Model Context Protocol) server for [Thivi](https://thivi.net) — connect AI tools like Claude Desktop, Cursor, Windsurf, and Cline to your Thivi workspace.

## What you can do

- **Tasks**: Create, update, search, and organize tasks across projects
- **Appointments**: Schedule meetings, list upcoming events, manage your calendar
- **Documents**: Create and edit markdown pages, organize knowledge bases
- **Notes**: Quick sticky notes with colors, search across all notes
- **Spot**: Manage availability templates and bookings
- **Goals**: Track milestones and objectives
- **Search**: Find anything across your entire workspace

## Setup

### 1. Get a Personal Access Token

Go to [thivi.net → Preferences → API Tokens](https://thivi.net/preferences) and create a token with **read + write** scopes.

### 2. Configure your AI tool

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "thivi": {
      "command": "npx",
      "args": ["-y", "thivi-mcp"],
      "env": {
        "THIVI_TOKEN": "pat_your_token_here"
      }
    }
  }
}
```

#### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "thivi": {
      "command": "npx",
      "args": ["-y", "thivi-mcp"],
      "env": {
        "THIVI_TOKEN": "pat_your_token_here"
      }
    }
  }
}
```

#### Windsurf / Cline / Other MCP clients

Same pattern — set `THIVI_TOKEN` env var and run `npx thivi-mcp`.

### 3. Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `THIVI_TOKEN` | Yes | Personal Access Token (starts with `pat_`) |
| `THIVI_URL` | No | API URL (default: `https://thivi.net`) |

## Available Tools

### Projects & Tasks (Inky)
- `list_projects` — List projects in a workspace
- `list_lanes` — List lanes (columns) in a project
- `list_tasks` — List tasks in a project
- `filter_tasks` — Filter tasks by status, priority, assignee
- `search_tasks` — Search tasks by keyword
- `create_task` — Create a task
- `bulk_create_tasks` — Create multiple tasks at once
- `update_task` — Update task title, description, priority, status
- `delete_task` — Delete a task
- `list_task_statuses` — List available statuses
- `list_labels` — List task labels
- `create_label` — Create a label

### Calendar & Appointments
- `list_appointments` — List upcoming appointments
- `create_appointment` — Create an appointment
- `update_appointment` — Update an appointment
- `delete_appointment` — Delete an appointment
- `list_calendar_cycles` — List cycles/sprints
- `create_calendar_cycle` — Create a cycle

### Documents & Notes (Unmessy)
- `list_unmessy_pages` — List document pages
- `read_unmessy_page` — Read a page's content
- `create_unmessy_page` — Create a page (Markdown)
- `update_unmessy_page` — Update a page
- `list_notes` — List quick notes
- `create_note` — Create a note
- `search_notes` — Search notes

### Availability (Spot)
- `list_spot_categories` — List categories
- `create_spot_category` — Create a category
- `list_spot_templates` — List templates
- `create_spot_template` — Create a template
- `list_spot_bookings` — List bookings

### Goals & Milestones
- `list_milestone_types` — List goal types
- `list_milestone_nodes` — List goals
- `create_milestone_node` — Create a goal

### Workspace
- `list_workspace_members` — List members
- `global_search` — Search across everything

## License

MIT
