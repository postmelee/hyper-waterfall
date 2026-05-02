# task_m010_1_stage2.md — Stage 2 완료 보고서

GitHub Issue: [#1](https://github.com/postmelee/hyper-waterfall/issues/1)
구현계획서: [`task_m010_1_impl.md`](../plans/task_m010_1_impl.md)
이전 단계: [`task_m010_1_stage1.md`](task_m010_1_stage1.md)

## 단계 목적

`mydocs/` 자체 폴더 8개와 심볼릭 링크 4개를 추가해 본 저장소가 자기 적용 상태를 완성한다. 매뉴얼·SKILL은 `templates/mydocs/`의 진실 원천을 심볼릭 링크로 그대로 공유한다.

## 산출물

자체 폴더 (`.gitkeep`으로 빈 폴더 보존):

- `mydocs/plans/archives/`
- `mydocs/report/`
- `mydocs/feedback/`
- `mydocs/tech/`
- `mydocs/troubleshootings/`
- `mydocs/pr/`
- `mydocs/pr/archives/`

(`mydocs/orders/`, `mydocs/plans/`, `mydocs/working/`는 task-start·Stage 1에서 이미 파일이 들어가 있어 `.gitkeep` 불필요.)

심볼릭 링크 4개:

| 링크 | 대상 | 모드 |
|---|---|---|
| `.agents/skills` | `../mydocs/skills` | 120000 |
| `.claude/skills` | `../mydocs/skills` | 120000 |
| `mydocs/manual` | `../templates/mydocs/manual` | 120000 |
| `mydocs/skills` | `../templates/mydocs/skills` | 120000 |

`.agents/skills`와 `.claude/skills`는 `mydocs/skills`(자체 심볼릭 링크)를 다시 가리키는 이중 링크 구조. 사용자 적용 저장소와 동일한 패턴이므로 본 저장소가 그대로 살아있는 예시가 된다.

## 검증 결과

```
=== 심볼릭 링크 ===
.agents/skills -> ../mydocs/skills
.claude/skills -> ../mydocs/skills
mydocs/manual -> ../templates/mydocs/manual
mydocs/skills -> ../templates/mydocs/skills

=== skills 본문 일치 ===
OK: skills 동일

=== manual 본문 일치 ===
OK: manual 동일

=== git diff --check ===
OK
```

검증 명령:

```bash
ls -la .agents/skills .claude/skills mydocs/manual mydocs/skills
diff -q <(ls -1 templates/mydocs/skills) <(ls -1 mydocs/skills/)
diff -q <(ls -1 templates/mydocs/manual) <(ls -1 mydocs/manual/)
git diff --check
```

`mydocs/skills/`로 진입했을 때 외부 PR 검토, issue-checkpoint, pr-merge-cleanup, task-final-report, task-register, task-stage-report, task-start, todo 8개 SKILL이 모두 그대로 노출된다 (`templates/mydocs/skills/` 본문 그대로).

## 본문 무손실 여부

심볼릭 링크 통합으로 매뉴얼·SKILL 본문은 단일 진실 원천이며, 사본을 만들지 않았으므로 본문 무손실이 보장된다.

## 잔여 위험

- **Windows 환경 호환**: 심볼릭 링크는 Windows의 일부 구성에서 권한 문제로 작동하지 않을 수 있다. 본 저장소는 macOS/Linux 환경 기여자가 주 대상이므로 그대로 진행. 문제 발생 시 별도 task로 대응.
- **`.agents/`, `.claude/` 폴더는 빈 폴더에 심볼릭 링크 1개만 있다**. `.gitkeep`은 두지 않았다 (심볼릭 링크 자체가 git에 추적되므로 폴더가 사라지지 않음). 향후 다른 도구별 진입 파일이 추가되면 자연스럽게 채워진다.

## 다음 단계 영향

이로써 `docs/agent-entrypoint.md`의 "If The Target Repository Is Installed" 체크리스트(`AGENTS.md`, `CLAUDE.md`, `mydocs/`, `.agents/skills`, `.claude/skills`, `.github/pull_request_template.md`)가 모두 충족된다. Stage 3에서는 README의 "저장소 구조" 섹션을 두 갈래(적용 후 대상 저장소 + 본 저장소 자기 적용 후)로 재작성해, 사용자가 적용 결과를 명확히 예측할 수 있도록 만든다.

## 승인 요청

- Stage 2 산출물(폴더 8개, 심볼릭 링크 4개)에 동의?
- Stage 3 진입 승인?
