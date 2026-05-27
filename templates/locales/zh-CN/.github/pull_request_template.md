## 摘要

<!-- 最多保留 4 个 bullet。
- 此 PR 处理哪个目标 task？
- 为什么需要这项变更？
- 变更了什么？
- reviewer 应先查看什么？
-->

- Target task: #
- Why:
- What:
- Review focus:

## 变更

<!--
对于基于 Stage 的工作，每个 Stage 写一行。
将每个 Stage 标题链接到 stage report，并将短 commit SHA 链接到 commit URL。
示例：**[Stage 1](stage-url)** ([0cdbae0](commit-url)): 一行摘要
-->

- **[Stage 1](stage-url)** ([0cdbae0](commit-url)):

### 影响范围

<!-- 当多个区域发生变化且 reviewer 需要按区域确定优先级时才保留。
如果只变更了 1-2 个区域，删除此小节。最多 5 行。 -->

| Area | Change | Review Focus |
|------|--------|--------------|
|  |  |  |

### 工作文档

<!--
创建 PR 之前，运行 `git rev-parse HEAD`，并使用固定到 PR head commit SHA 的 GitHub blob URL。
使用 `[filename](https://github.com/{REPO_SLUG}/blob/{head_sha}/mydocs/...)`，不要使用 raw URL。
删除不适用的条目。
-->

- Task plan: [task_m{milestone}_{issue}.md](https://github.com/{REPO_SLUG}/blob/{head_sha}/mydocs/plans/task_m{milestone}_{issue}.md)
- Implementation plan: [task_m{milestone}_{issue}_impl.md](https://github.com/{REPO_SLUG}/blob/{head_sha}/mydocs/plans/task_m{milestone}_{issue}_impl.md)
- Final report: [task_m{milestone}_{issue}_report.md](https://github.com/{REPO_SLUG}/blob/{head_sha}/mydocs/report/task_m{milestone}_{issue}_report.md)

## 关键 review 点

<!-- 仅在需要时保留。最多 3 项。每个 code block 限制在 20 行以内。不适用则删除本节。 -->

-

## 验证

<!--
只保留实际执行过的验证。
不要只列命令。包含主题、方法、结果和证据。
不要包含长日志。概括关键输出、通过数量和已检查条件。
未执行的验证移到 `Verification Limitations` 或 `Remaining Risks`，不要留在表中。
删除不适用的小节。
-->

### 自动化验证

| Topic | Method | Result | Evidence |
|------|--------|--------|----------|
|  | `command` | OK/MISS | Key output or checked condition |

### 手动/场景验证

| Scenario | Check Procedure | Result | Evidence |
|----------|-----------------|--------|----------|
|  |  | OK/MISS | Screenshot, video, artifact link, or none |

### CI/远程验证

| Item | Result | Evidence |
|------|--------|----------|
|  | OK/MISS/SKIP | GitHub Check name, run link, or check time |

### 验证限制

- None

## 截图

<!-- 只为视觉变更保留。没有真实图片或产物时不要保留表格。不适用则删除本节。 -->

| Before | After |
|--------|-------|
|  |  |

## 相关 Issue

<!-- 不要在这里列目标 task。只列理解 PR 所需的上下文，例如前置、后续、Epic、上游或参考 Issue/PR。没有则写 "None"。 -->

-

## 建议的后续 Issue

<!-- 列出尚未已有 Issue 的后续候选。没有则写 "None"。 -->

-

## 剩余风险

<!-- 列出 reviewer 应了解的验证限制或运营注意事项。没有则写 "None"。 -->

-
