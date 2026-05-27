# `skills/` 文件夹规则

## 目的

保存 Codex 和 Claude Code 调用的 Hyper-Waterfall Skill bodies。

## 回答的问题

“固定流程应遵循什么顺序和验证？”

## 何时编写

当固定流程发生变化时，例如 task start、stage completion、final report、PR merge cleanup 或 external PR review。

## 允许的文件名

`mydocs/skills/{skill-name}/SKILL.md`

## 使用的模板

Skill bodies 遵循各工具的 Skill format。当 Skill 创建 artifact document 时，它引用 `mydocs/_templates/` 中的对应模板。

## 必需内容

- Trigger
- Preconditions
- Procedure
- Verification
- Never do
- Invocation method

## 不允许的内容

- 特定 task 的结果
- 只适用于某个模型的长 prompt
- 与另一个 Skill 冲突的流程

## 下一次会话 AI 必须恢复的上下文

何时调用哪个 Skill，以及每个 artifact 应使用哪个模板。

## Discovery Paths

- Source of truth: `mydocs/skills/{skill-name}/SKILL.md`
- Codex discovery path: `.agents/skills/`（repository-root symlink -> `mydocs/skills`）
- Claude Code discovery path: `.claude/skills/`（repository-root symlink -> `mydocs/skills`）
