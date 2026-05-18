# Task M040 #62 Stage 4 완료 보고서

GitHub Issue: [#62](https://github.com/postmelee/hyper-waterfall/issues/62)
구현계획서: [`task_m040_62_impl.md`](../plans/task_m040_62_impl.md)
Stage: 4

## 단계 목적

Stage 1-3에서 분산한 폴더 README, PR 문서, lifecycle/release 문서를 README와 manifest, manual 링크에서 일관되게 참조하도록 정리한다. 오래된 섹션 anchor와 문서 개수 설명을 제거하고, 적용 저장소에 필요한 폴더별 README가 manifest에 포함되도록 한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 신규 적용/기존 업데이트 설명을 `docs/lifecycle/` 구조로 갱신하고, 내부 PR/PR 명령/폴더 README 링크를 새 문서로 교체 |
| `templates/manifest.json` | `orders`, `plans`, `working`, `report`, `feedback`, `tech`, `troubleshootings`, `pr` 폴더 README 8개를 적용 대상 파일로 추가 |
| `templates/mydocs/manual/README.md` | 새 manual 문서 5개를 허용 파일명 예시에 추가 |
| `templates/mydocs/manual/task_workflow_guide.md` | README의 핵심 SKILL 표와 SKILL 호출 표시 안내를 함께 확인해야 한다는 정합 규칙 추가 |

## 본문 변경 정도 / 본문 무손실 여부

README는 Stage 1-3에서 이동된 문서의 새 경로만 반영했다. `pr_process_guide.md#내부-task-pr-작성-규칙`, `document_structure_guide.md#폴더별-상세-규칙`, `docs/agent-entrypoint.md#기존-업데이트-판단-결과-형식` 같은 오래된 직접 anchor를 제거하고, `internal_pr_guide.md`, `pr_command_guide.md`, `docs/lifecycle/update.md`, `docs/lifecycle/update_pr.md`, 각 폴더 README 기준으로 연결했다.

`templates/manifest.json`에는 적용 저장소에 실제로 복사되어야 하는 폴더별 README 8개를 파일 항목으로 추가했다. `docs/lifecycle/*.md`는 framework source 문서이며 신규 적용 strict manifest의 `docs/**` 금지 원칙과 충돌하므로 대상 저장소 복사 manifest에는 넣지 않았다. 대상 저장소가 읽어야 하는 lifecycle 기준은 README와 `docs/agent-entrypoint.md`의 source repository 링크로 유지한다.

## 검증 결과

실행 명령:

```bash
rg -n "핵심 SKILL|도입 후 작업 흐름|문서 구조|프롬프트 가이드|SKILL 호출 표시 안내" README.md templates/mydocs/manual/task_workflow_guide.md
rg -n "document_structure_guide.md#폴더별-상세-규칙|pr_process_guide.md#내부-task-pr-작성-규칙|docs/agent-entrypoint.md#기존-업데이트-판단-결과-형식|5개 매뉴얼" README.md templates/mydocs/manual docs
ruby -rjson -e 'm=JSON.parse(File.read("templates/manifest.json")); wanted=%w[orders plans working report feedback tech troubleshootings pr].map{|d| "templates/mydocs/#{d}/README.md"}; missing=wanted-m["files"].map{|f| f["source"]}; abort("missing #{missing.join(",")}") unless missing.empty?'
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
git diff --check
```

결과:

- OK: README의 "도입 후 작업 흐름", "핵심 SKILL 상세", "문서 구조", "프롬프트 가이드 준수"와 `task_workflow_guide.md`의 "SKILL 호출 표시 안내"가 확인됐다.
- OK: 오래된 README/manual anchor와 `5개 매뉴얼` 표현은 검색 결과 없음으로 확인됐다.
- OK: `templates/manifest.json` 파싱 성공.
- OK: manifest에 폴더별 README 8개가 모두 포함됐다.
- OK: `git diff --check` 경고 없음.

## 잔여 위험

- `docs/releases/`와 `docs/migrations/v0.1.0-to-v0.2.0.md`에는 과거 release 당시의 `docs/agent-entrypoint.md` 표현이 남아 있다. 역사적 기록 문서라 이번 Stage에서는 현재 운영 기준처럼 고치지 않았다.
- 이번 Stage는 manifest에 새 폴더 README를 추가했지만, release checksum은 기존 정책대로 `pending-release` 상태다.

## 다음 단계 영향

- 네 단계가 모두 끝났으므로 다음 절차는 최종 결과보고서 작성과 오늘할일 완료 처리다.
- 최종 보고서에서 Stage 1-4의 commit, 검증, manifest 포함 판단, 남은 리스크를 종합해야 한다.

## 승인 요청

- Stage 4 산출물과 검증 결과를 승인하면 최종 결과보고서 작성과 PR 게시 준비 절차로 진행한다.
