# task_m020_9_stage1.md - Hyper-Waterfall 버전 업데이트 PR 워크플로우 경계와 명명 규칙 정의 단계 보고서

GitHub Issue: [#9](https://github.com/postmelee/hyper-waterfall/issues/9)
구현계획서: [`task_m020_9_impl.md`](../plans/task_m020_9_impl.md)
Stage: 1

## 단계 목적

Stage 1은 #8에서 정의한 기존 업데이트 판단 결과가 승인된 뒤 어떤 GitHub Issue, 브랜치, 커밋 메시지, PR 제목 규칙으로 Hyper-Waterfall 버전 업데이트 PR에 전환되는지 고정하는 단계다. 일반 task PR, release PR, Hyper-Waterfall 버전 업데이트 PR의 목적과 흐름을 구분해 후속 Stage의 PR 본문 구조 정의가 같은 경계 위에서 진행되도록 했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/agent-entrypoint.md` | "Hyper-Waterfall 버전 업데이트 PR 전환 규칙"을 추가하고 생성 조건, issue-backed 브랜치, 커밋 메시지, PR 제목, PR 본문 필수 입력을 정의 |
| `templates/mydocs/manual/git_workflow_guide.md` | Hyper-Waterfall 버전 업데이트 PR 용어와 PR 유형 구분 표를 추가하고 task PR/release PR/Hyper-Waterfall 버전 업데이트 PR의 브랜치 흐름을 비교 |
| `templates/mydocs/manual/task_workflow_guide.md` | lifecycle 판단 결과가 Hyper-Waterfall 버전 업데이트 PR로 전환될 때의 명명 규칙과 release PR과의 차이를 명시 |

## 본문 변경 정도 / 본문 무손실 여부

기존 task workflow와 release workflow는 유지했다. Stage 1 변경은 Hyper-Waterfall 버전 업데이트 PR 전환 규칙과 PR 유형 구분 설명을 추가하는 방식이며, 기존 브랜치 정책을 대체하지 않았다.

## 검증 결과

실행 명령:

```bash
grep -nE 'Hyper-Waterfall 버전 업데이트 PR|브랜치|커밋|PR 제목|release PR|task PR' docs/agent-entrypoint.md templates/mydocs/manual/*.md
grep -nE 'lifecycle 판단 결과|기존 업데이트 판단 결과|migration guide|manifest diff' docs/agent-entrypoint.md templates/mydocs/manual/*.md
rg -n '폐기된 예정 구현|별도 유지보수 절차명|Skill workflow|Skill이 아직 없을 때' docs/agent-entrypoint.md templates/mydocs/manual/git_workflow_guide.md templates/mydocs/manual/task_workflow_guide.md
git diff --check
```

결과:

- OK: `docs/agent-entrypoint.md`에서 Hyper-Waterfall 버전 업데이트 PR 생성 조건, 작업 브랜치 `local/task{issue번호}`, PR 게시 브랜치 `publish/task{issue번호}`, 커밋 메시지, PR 제목, PR 본문 입력이 확인됐다.
- OK: `git_workflow_guide.md`에서 task PR, release PR, Hyper-Waterfall 버전 업데이트 PR의 목적과 브랜치 흐름이 표로 구분됐다.
- OK: `task_workflow_guide.md`에서 Hyper-Waterfall 버전 업데이트 PR 전환 시 명명 규칙과 release PR과의 차이가 확인됐다.
- OK: lifecycle 판단 결과, 기존 업데이트 판단 결과, migration guide, manifest diff 연결 문구가 확인됐다.
- OK: 폐기된 예정 구현 방식처럼 읽히는 특정 표현은 Stage 1 대상 파일에서 검색되지 않았다.
- OK: `git diff --check` 출력 없음.

## 잔여 위험

- PR 본문에서 `manifest diff`, 자동 적용 가능, 수동 확인, conflict, 보류 항목을 어떤 표로 표현할지는 아직 Stage 2 범위다.
- README와 migration guide에 Hyper-Waterfall 버전 업데이트 PR 흐름을 짧게 연결하는 작업은 Stage 3 범위다.

## 다음 단계 영향

- Stage 2는 이번 단계에서 정한 issue-backed Hyper-Waterfall 버전 업데이트 PR 흐름을 기준으로 PR 본문 구조와 변경 분류 표기 방식을 정의한다.
- #10 CLI는 Hyper-Waterfall 버전 업데이트 PR 브랜치/커밋/PR 제목 규칙을 자동 생성 기준으로 참고할 수 있다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 `manifest diff와 migration 기반 PR 본문 구조 정의`로 진행한다.
