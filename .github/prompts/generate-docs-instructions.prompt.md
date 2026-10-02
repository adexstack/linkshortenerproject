---
description: "Generate a new coding-standards/architecture instructions file in /docs and link it from AGENTS.md"
agent: "Instructions Generator"
argument-hint: "Describe the architecture layer or coding standard to document (e.g. 'API route handler conventions', 'form validation patterns')"
---
Generate a new instructions file for [docs/](../../docs) based on the architecture layer or coding standard the user describes in their request.

## Steps

1. **Clarify if needed.** If the user didn't describe a topic, layer, or coding standard (or it's too vague to act on), stop and ask what architecture layer or coding standard to document before writing anything.
2. **Ground it in the codebase.** Search the workspace for the actual patterns already in use for this topic (relevant files, naming, existing conventions) — don't invent conventions that contradict the existing code. Read [AGENTS.md](../../AGENTS.md) and the existing files in [docs/](../../docs) first to match their tone, structure, and level of detail.
3. **Pick a filename.** Use a concise, kebab-case, descriptive `.md` filename under `docs/` (e.g. `docs/form-validation.md`). If the user supplied a filename, use it instead.
4. **Write the file.** Keep it concise and scannable:
   - Short intro sentence stating what the doc covers.
   - `##` sections grouping related rules.
   - Bullet points, not prose paragraphs.
   - Link to real files in the repo (relative Markdown links) as examples/evidence for each rule instead of describing them abstractly.
   - Only document conventions that are actionable and specific to this project — no generic best-practice filler.
5. **Update the index.** Add a one-line bullet for the new file under the `## Docs index` section in [AGENTS.md](../../AGENTS.md), following the existing bullet format (`- [docs/<file>.md](./docs/<file>.md) — <short description>`).
6. **Report back.** Summarize the filename created and the AGENTS.md update in your final message.
