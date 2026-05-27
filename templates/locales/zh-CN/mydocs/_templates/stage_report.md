# 阶段报告模板

此中央模板用于 `mydocs/working/task_{milestone}_{issue}_stage{stage}.md`。阶段报告记录一个 Stage 的实施、验证、剩余风险和对下一 Stage 的影响，然后请求批准继续。

GitHub Issue: [#{issue}](https://github.com/{REPO_SLUG}/issues/{issue})
Implementation plan: [`task_{milestone}_{issue}_impl.md`](../plans/task_{milestone}_{issue}_impl.md)
Stage: {stage}

## Stage 目的

{Explain what this Stage was meant to resolve and where it fits in the implementation plan.}

## 产出物

| File | Change Summary |
|---|---|
| `{path}` | {change summary} |

## 正文变更范围 / 无损保留

{For documentation work, describe source preservation and rewrite scope. For code work, write not applicable or explain API/behavior preservation.}

## 验证结果

执行命令：

```bash
{verification command}
```

结果：

- {OK/MISS and key output summary}

## 剩余风险

- {remaining risk. Write `None` if there are none.}

## 对下一 Stage 的影响

- {context the next Stage must inherit. Write `None` if there is none.}

## 审批请求

- 如果批准 Stage {stage} 的产出物和验证结果，则进入下一 Stage。
