---
description: "Perform a security audit of the codebase and report findings as a markdown table"
agent: "ask"
---
Perform a security audit of this codebase to detect potential security vulnerabilities (OWASP Top 10: injection, broken auth, sensitive data exposure, broken access control, security misconfiguration, XSS, insecure deserialization, vulnerable dependencies, insufficient logging, SSRF, etc.).

Review server actions, API/route handlers, data access helpers, auth/middleware configuration, and environment variable usage for issues such as:
- Unvalidated or unsanitized user input reaching a database query, redirect, or shell command
- Missing authentication/authorization checks on mutations or protected routes
- Secrets or credentials hardcoded or logged
- Insecure redirects (open redirect) or SSRF-prone URL handling
- Missing input validation on server actions per [server-actions.instructions.md](../instructions/server-actions.instructions.md)

Do not modify any files — this is a read-only audit.

Output the findings as a single markdown table with these exact columns, and nothing else besides a one-line summary above the table:

| ID | File Path | Severity | Issue | Line Number(s) | Recommendation |
|----|-----------|----------|-------|-----------------|-----------------|

- `ID`: auto-incrementing integer starting at 1
- `File Path`: a markdown link to the file, using its workspace-relative path
- `Severity`: one of Critical, High, Medium, Low
- `Issue`: concise description of the vulnerability
- `Line Number(s)`: exact line(s) or range affected
- `Recommendation`: concise, actionable fix

If no issues are found, state that explicitly instead of producing an empty table.

Next, ask the user which issues they want to fix by either specifying the ID(s) of the issues or choosing 'all' to fix all of them. After receiving the user's input, run a separate subagent (#runsubagent) to fix the selected issues. Each subagent run should be independent and only address the specified issues. It should report back with a simple 'subAgentSuccess' or 'subAgentFailure' message.
