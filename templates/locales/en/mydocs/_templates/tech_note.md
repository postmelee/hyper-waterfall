# Technical Note Template

This central template is for recording technical research, structural analysis, specification review, and alternative comparisons in `mydocs/tech/`. Technical notes are not Stage completion reports. They preserve evidence and decisions that later work can reuse.

## Usage

- Actual file: `mydocs/tech/{yyyymmdd}_{topic}.md` or `mydocs/tech/task_{milestone}_{issue}_{topic}.md`
- When to write: before implementation research, design alternative comparison, external document/spec review, or structural analysis
- Writing language: use the selected Hyper-Waterfall locale for this repository.

## Research Background

{Describe what must be learned and why this research is needed now.}

## Research Questions

- {question 1}
- {question 2}
- {question 3}

## Research Targets

| Target | Reason | Location |
|---|---|---|
| `{file/document/URL}` | {why it was reviewed} | {path or link} |

## Findings

### {Topic 1}

- {finding}
- {evidence}

### {Topic 2}

- {finding}
- {evidence}

## Decisions

- {decision confirmed by this research}

## Non-decisions / Deferred Items

- {what is not decided yet and why}

## Implementation Impact

- {impact on future implementation, documentation, or verification}

## References

- [{title}]({URL or path})
