# `skills/` Folder Rules

## Purpose

Store Hyper-Waterfall Skill bodies invoked by Codex and Claude Code.

## Question Answered

"What order and verification should be followed for a fixed procedure?"

## When to Write

When fixed procedures change, such as task start, stage completion, final report, PR merge cleanup, or external PR review.

## Allowed Filename

`mydocs/skills/{skill-name}/SKILL.md`

## Template Used

Skill bodies follow the Skill format for each tool. When a Skill creates an artifact document, it references the corresponding template in `mydocs/_templates/`.

## Required Content

- Trigger
- Preconditions
- Procedure
- Verification
- Never do
- Invocation method

## Content Not Allowed

- Results from a specific task
- Long prompts specific to one model
- Procedures that conflict with another Skill

## Context the Next Session AI Must Restore

When to invoke which Skill, and which template to use for each artifact.

## Discovery Paths

- Source of truth: `mydocs/skills/{skill-name}/SKILL.md`
- Codex discovery path: `.agents/skills/` (repository-root symlink -> `mydocs/skills`)
- Claude Code discovery path: `.claude/skills/` (repository-root symlink -> `mydocs/skills`)
