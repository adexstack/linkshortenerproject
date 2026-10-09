---
name: create-copilot-instructions
description: Use this prompt to generate new instructions files for the project based on the architecture layer or coding standard described by the user.
agent: "Instructions Generator"
---

Generate a new instructions file in the /.github/instructions/ directory based on the architecture layer or coding standard the user describes in their request.

## Steps

1. **Clarify if needed.** If the user didn't describe a topic, layer, or coding standard (or it's too vague to act on), stop and ask what architecture layer or coding standard to document before writing anything.
2. **Ground it in the codebase.** Search the workspace for the actual patterns already in use for this topic (relevant files, naming, existing conventions) — don't invent conventions that contradict the existing code. Read [AGENTS.md](../../AGENTS.md) and the existing files first to match their tone, structure, and level of detail.
3. **Pick a filename.** Use a concise, kebab-case, descriptive `.md` filename in the /.github/instructions/ directory (e.g. `/.github/instructions/form-validation.md`). If the user supplied a filename, use it instead.
4. **Write the file.** Keep it concise and scannable:
   - Use github recommended standard formatting and markdown instructions structure
   - `##` sections grouping related rules.
   - Bullet points, not prose paragraphs.
   - Link to real files in the repo (relative Markdown links) as examples/evidence for each rule instead of describing them abstractly.
   - Only document conventions that are actionable and specific to this project — no generic best-practice filler.

5. **Report back.** Summarize the filename created.