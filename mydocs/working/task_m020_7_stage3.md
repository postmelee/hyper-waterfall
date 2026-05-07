# task_m020_7_stage3.md - Stage 3 완료 보고서

GitHub Issue: [#7](https://github.com/postmelee/hyper-waterfall/issues/7)
구현계획서: [`task_m020_7_impl.md`](../plans/task_m020_7_impl.md)
Stage: 3

## 단계 목적

Stage 3은 Stage 1~2에서 만든 `templates/manifest.json`, `.hyper-waterfall/version.json`, `docs/migrations/` 기준을 README와 관련 Manual에 연결하는 단계다. 프롬프트는 설치·업데이트를 시작하는 인터페이스이고, 실제 기준은 GitHub Release/tag, manifest, version 상태 파일, migration guide라는 경계를 사용자 흐름과 운영 문서에 반영했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `README.md` | 독립 "배포와 업데이트" 섹션 없이 사용자용 짧은 업데이트 안내만 추가하고, 적용 저장소 구조에 `.hyper-waterfall/version.json` 추가 |
| `docs/agent-entrypoint.md` | 신규 적용 절차를 manifest 기준으로 보강하고, 기존 적용 저장소 업데이트 진입 절차 추가 |
| `templates/mydocs/manual/document_structure_guide.md` | README/entrypoint 변경 시 manifest, migration, task/git workflow 설명을 함께 확인하는 규칙과 migration guide 경로 추가 |
| `templates/mydocs/manual/git_workflow_guide.md` | GitHub Release/tag와 update protocol 용어, release 전 manifest/migration 확인 절차 추가 |
| `templates/mydocs/manual/task_workflow_guide.md` | 프레임워크 설치·업데이트 작업 기준과 후속 `framework-install`/`framework-update` Skill 위치 안내 추가 |

변경 규모:

```text
README.md                                      |  8 ++-
docs/agent-entrypoint.md                       | 37 +++++++++++++++-------
mydocs/working/task_m020_7_stage3.md           | 76 ++++++++++++++++++++++
templates/mydocs/manual/document_structure_guide.md |  2 ++
templates/mydocs/manual/git_workflow_guide.md  | 19 +++++++++++
templates/mydocs/manual/task_workflow_guide.md | 12 +++++++
6 files changed, 142 insertions(+), 12 deletions(-)
```

## 본문 변경 정도 / 본문 무손실 여부

기존 README의 핵심 주장과 타스크 진행 흐름은 유지했다. 첫 반영에서는 독립 "배포와 업데이트" 섹션을 추가했지만, 작업지시자 피드백에 따라 README 독자가 설치/업데이트 인터페이스만 빠르게 볼 수 있도록 해당 목차와 섹션을 제거했다. 업데이트 상세 프로토콜은 `docs/agent-entrypoint.md`, `docs/migrations/`, Manual에 남기고 README에는 짧은 안내만 유지했다.

`docs/agent-entrypoint.md`는 기존 적용 절차를 "신규 적용 절차"로 재명명하고, Issue Form 복사와 `.hyper-waterfall/version.json` 생성을 추가했다. 기존 금지 원칙은 유지하되 manifest/migration 승인 없이 새 설정을 임의 추가하지 않는 문구로 좁혔다.

Manual 변경은 Stage 1에서 추가한 배포 manifest 정책을 반복 설명하기보다, 각 문서의 책임에 맞게 release/tag, task workflow, 관련 문서 확인 규칙만 보강했다.

## 검증 결과

실행 명령:

```bash
grep -nE 'GitHub Release|manifest|migration|version|\.hyper-waterfall' README.md docs/agent-entrypoint.md templates/mydocs/manual/*.md
! grep -nE '^## 배포와 업데이트|배포와-업데이트' README.md
grep -nE '프롬프트|canonical|배포 단위|업데이트 프로토콜|version.json' README.md docs/agent-entrypoint.md templates/mydocs/manual/*.md
grep -nE 'framework-install|framework-update|manifest|migration' templates/mydocs/manual/task_workflow_guide.md README.md
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '\.\./\.\./\.\./docs/migrations|blob/publish|\{head_sha\}' README.md docs templates/mydocs/manual
git diff --check
```

결과:

- README, agent entrypoint, Manual에서 `GitHub Release`, `manifest`, `migration`, `version`, `.hyper-waterfall` 참조 확인.
- README의 독립 `## 배포와 업데이트` 섹션과 목차 항목이 제거됐음을 확인.
- README와 Manual에서 프롬프트는 인터페이스이고 `canonical` 배포 단위는 GitHub Release/tag라는 설명 확인.
- `task_workflow_guide.md`와 README에서 후속 `framework-install`, `framework-update` Skill 참조 확인.
- `templates/manifest.json` JSON parse 통과.
- `rg`에서 `../../../docs/migrations`와 `{head_sha}`는 발견되지 않았다. `blob/publish/taskN`은 기존 PR 링크 작성 금지 예시 문장으로 확인했다.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- `framework-install`과 `framework-update` Skill은 아직 구현되지 않았다. README와 Manual은 후속 M020 작업에서 추가된다고 명시했다.
- 실제 GitHub Release/tag 생성과 checksum 확정은 아직 수행하지 않았다. 이 task는 배포·업데이트 프로토콜의 기준 문서화까지가 범위다.
- 적용 저장소에서 `docs/migrations/`를 로컬에 복사할지, 프레임워크 저장소 링크로 참조할지는 후속 update workflow에서 더 구체화해야 한다.

## 다음 단계 영향

- 모든 구현 Stage가 끝났으므로 다음 단계는 `task-final-report` 절차다.
- 최종 보고서에서는 manifest, migration guide, README/Manual 반영이 #8~#10 후속 작업의 기준으로 충분한지 통합 검증해야 한다.

## 승인 요청

- Stage 3 산출물과 검증 결과를 승인하면 최종 보고서 작성 및 PR 준비 단계로 진행한다.
