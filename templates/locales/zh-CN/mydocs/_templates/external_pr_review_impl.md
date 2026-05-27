# 外部 PR Review 实施计划书模板

此中央模板用于 `mydocs/pr/pr_{number}_review_impl.md`。当外部 PR review 需要额外验证、辅助 patch 或复现步骤时使用。不要把内部 task 的 `task_{milestone}_{issue}_impl.md` 格式强行套用到外部 PR。

## 用法

- 实际文件：`mydocs/pr/pr_{number}_review_impl.md`
- 何时编写：外部 PR review 文档获批后，且需要额外验证或辅助工作时
- 编写语言：使用此仓库选择的 Hyper-Waterfall locale。

## 目的

{What to verify or what auxiliary work to perform.}

## 目标 PR

- PR: #{number}
- Review document: [`pr_{number}_review.md`](pr_{number}_review.md)

## 工作范围

### 包含

- {additional verification or auxiliary work}

### 不包含

- {direct implementation that would replace the external PR, or work that must become an internal task}

## 验证流程

1. {verification step}
2. {verification step}
3. {verification step}

## 命令

```bash
{verification command}
```

## 预期结果

- {success criteria}

## 审批请求

- 如果批准以上验证/辅助工作范围，则开始执行。
