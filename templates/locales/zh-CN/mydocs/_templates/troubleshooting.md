# 故障排查模板

此中央模板用于在 `mydocs/troubleshootings/` 中记录失败、失败的验证、可复现错误和防复发措施。故障排查文档不是简单的失败日志。它保留原因和修复方式，避免下一次 AI 会话重复同样的问题。

## 用法

- 实际文件：`mydocs/troubleshootings/{yyyymmdd}_{topic}.md` 或 `mydocs/troubleshootings/task_{milestone}_{issue}_{topic}.md`
- 何时编写：同一错误可能复发，或解决过程本身是后续工作的重要上下文时
- 编写语言：使用此仓库选择的 Hyper-Waterfall locale。

## 症状

{Describe the visible failure, error message, or wrong result.}

## 复现条件

```bash
{reproduction command or procedure}
```

- Environment: {OS, tool versions, branch, relevant settings}
- Input: {files or data required to reproduce}

## 原因

{Describe the confirmed cause. If it is an inference, say so.}

## 解决方案

```bash
{resolution command or change summary}
```

- Changed files: `{path}`
- Key fix: {what changed}

## 防复发措施

- {verification command added, documentation reinforced, procedure changed, etc.}

## 验证

```bash
{verification command}
```

结果：

- {OK/MISS and key output summary}

## 参考资料

- [{title}]({URL or path})
