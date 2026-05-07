# Git 워크플로우 매뉴얼

본 매뉴얼은 본 저장소의 브랜치 정책, Git 워크플로우 다이어그램, 메인테이너/컨트리뷰터 워크플로우 스크립트를 정의한다. 새 타스크 브랜치를 만들거나 PR 게시·merge·정리를 수행하기 전에 읽는다. 문서 파일 위치와 타스크 승인 절차는 각각 `document_structure_guide.md`, `task_workflow_guide.md`에서 다룬다.

## 핵심 용어

- **`{BASE_BRANCH}`**: 모든 작업 PR이 모이는 개발 통합 브랜치. 새 작업 브랜치는 최신 `origin/{BASE_BRANCH}` 기준으로 만든다.
- **`local/taskN`**: 이슈 번호 N의 로컬 작업 브랜치. 단계 커밋과 보고서 커밋은 이 브랜치에 쌓는다.
- **`publish/taskN`**: `local/taskN`을 원격에 게시하기 위한 PR용 브랜치. PR merge 후 삭제한다.
- **Open PR**: 검토 가능한 상태의 PR. 하이퍼-워터폴 최종 보고 후 `{BASE_BRANCH}` 대상으로 만든다.
- **분리 worktree**: 메인 worktree가 다른 작업에 쓰이고 있을 때 별도 디렉터리에서 같은 저장소의 다른 브랜치를 작업하는 방식.
- **GitHub Release/tag**: Hyper-Waterfall의 canonical 배포 단위. release에는 `templates/manifest.json`과 migration guide 기준이 함께 따라야 한다.
- **update protocol**: 적용 저장소의 `.hyper-waterfall/version.json`, release manifest, `docs/migrations/`를 비교해 안전하게 업데이트 PR을 만드는 절차.
- **Hyper-Waterfall 버전 업데이트 PR**: 기존 적용 저장소를 새 Hyper-Waterfall release/tag로 올리기 위해 만드는 issue-backed PR. 입력은 lifecycle 판단 결과, manifest diff, migration guide다.

## 브랜치 관리

| 브랜치 | 용도 |
|--------|------|
| `{RELEASE_BRANCH}` | 최종 릴리즈. 태그(v0.5.0 등)로 안정 버전 보존 |
| `{BASE_BRANCH}` | 개발 통합 |
| `local/task{num}` | 타스크별 작업 |
| `publish/task{num}` | `{BASE_BRANCH}` 대상 PR 생성을 위한 원격 게시 브랜치. PR merge 후 삭제 |

## Git 워크플로우

```
local/task{N} ── 커밋 · 커밋 · 커밋 ──→ publish/task{N} push
                                          │
                                          └─→ {BASE_BRANCH} 대상 PR → 리뷰 → merge
                                                                       │
                                                                       └─→ {BASE_BRANCH} 누적
                                                                              │
                                                                              └─→ {RELEASE_BRANCH} PR (릴리즈 시점) → 태그
```

병렬 task는 각각 독립적인 `local/task{N}` 브랜치로 위 흐름을 반복한다.

- **타스크 브랜치**: `local/task{N}`에서 잘게 커밋. 작업 단위마다 커밋.
- **원격 게시 브랜치**: `local/task{N}` 작업이 리뷰 가능한 상태가 되면 `publish/task{N}` 이름으로 원격에 push하고 `{BASE_BRANCH}` 대상 PR을 생성한다.
- **원격 push**: `local/task` 브랜치는 **로컬 유지 (원격 push 금지)**를 원칙으로 한다. 원격에는 `publish/task{N}`와 merge 결과 브랜치만 유지한다.
- **`{BASE_BRANCH}` 대상 PR**: 작업 단위 PR은 기본적으로 Open PR로 생성하고, 최종 보고와 검증 결과를 PR 본문에 반영한 상태에서 review/merge 한다.
- **merge 전략**: `{BASE_BRANCH}` 대상 PR은 merge commit 유지 또는 `--no-ff` 원칙을 기본으로 한다. squash merge는 단계별 커밋 의미가 사라질 수 있으므로 기본값으로 두지 않는다.
- **`{RELEASE_BRANCH}` merge (PR 기반)**: 릴리즈 시점에 `{BASE_BRANCH}` → `{RELEASE_BRANCH}` PR 생성 → 리뷰(approve) → merge 후 태그 생성.

## Release/tag와 update protocol

Hyper-Waterfall 방법론 자체의 배포 기준은 GitHub Release/tag다. `{RELEASE_BRANCH}`에 반영된 상태를 tag로 고정하고, 해당 release의 `templates/manifest.json`과 `docs/migrations/`를 기준으로 기존 적용 저장소가 업데이트한다.

release 준비 시 확인할 항목:

- `templates/manifest.json`의 `frameworkVersion`, `plannedTag`, `baselineTag`가 release 의도와 맞는지 확인
- release 패키징 시 checksum이 `pending-release`에서 확정 가능한지 확인
- `docs/migrations/v{from}-to-v{to}.md`가 추가 파일, 수정 파일, 수동 확인, 충돌 가능성, 검증 기준을 포함하는지 확인
- 적용 저장소의 `.hyper-waterfall/version.json`이 목표 version으로 갱신될 수 있는지 확인

일반 task PR과 release PR은 분리한다. task PR은 `local/taskN -> publish/taskN -> {BASE_BRANCH}` 흐름을 따르고, release PR은 `{BASE_BRANCH} -> {RELEASE_BRANCH}` 흐름을 따른다. 기존 적용 저장소 업데이트는 release 이후 별도 Hyper-Waterfall 버전 업데이트 PR로 수행한다.

### PR 유형 구분

| 유형 | 목적 | 브랜치 흐름 | PR 제목 |
|---|---|---|---|
| task PR | 저장소 기능, 문서, 운영 작업을 이슈 단위로 반영 | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: {작업 제목}` |
| release PR | `{BASE_BRANCH}`에 누적된 프레임워크 변경을 `{RELEASE_BRANCH}`로 승격하고 tag 기준을 만든다 | `{BASE_BRANCH}` -> `{RELEASE_BRANCH}` | `Release: {version}` |
| Hyper-Waterfall 버전 업데이트 PR | 기존 적용 저장소를 현재 version에서 목표 release/tag로 올린다 | `local/task{N}` -> `publish/task{N}` -> `{BASE_BRANCH}` | `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트` |

Hyper-Waterfall 버전 업데이트 PR은 일반 task PR과 같은 브랜치 흐름을 사용한다. 차이는 PR의 입력과 본문이다. Hyper-Waterfall 버전 업데이트 PR은 `docs/agent-entrypoint.md`의 기존 업데이트 판단 결과를 입력으로 삼고, PR 본문에 `manifest diff`, migration guide 요약, 자동 적용 가능 항목, 수동 확인 필요 항목, conflict 항목, 검증 결과를 남긴다.

Hyper-Waterfall 버전 업데이트 PR 커밋 메시지 규칙:

- 단일 커밋: `Task #{N}: Hyper-Waterfall {fromVersion} -> {toVersion} 버전 업데이트`
- 단계 커밋: `Task #{N} Stage {S}: Hyper-Waterfall 버전 업데이트 {내용}`
- 최종 보고 커밋: `Task #{N}: 최종 보고서 작성과 오늘할일 완료 처리`

Hyper-Waterfall 버전 업데이트 PR 브랜치를 별도 prefix로 만들지 않는 이유는 작업 추적 기준을 GitHub Issue와 하이퍼-워터폴 산출물로 유지하기 위해서다. CLI나 자동화가 Hyper-Waterfall 버전 업데이트 PR을 만들더라도 승인된 이슈 번호를 받은 뒤 위 브랜치 규칙을 따른다.

## 메인테이너 워크플로우

```bash
# 1. local/taskN → publish/taskN push + {BASE_BRANCH} 대상 Open PR
git checkout local/task17
git push origin local/task17:publish/task17
gh pr create --base {BASE_BRANCH} --head publish/task17 --title "Task #17: 제목" --body-file /tmp/task17-pr-body.md

# 2. {BASE_BRANCH} 대상 PR 리뷰 + merge
gh pr review --approve
gh pr merge --merge --delete-branch

# 3. {BASE_BRANCH} → {RELEASE_BRANCH} PR (릴리즈 시)
gh pr create --base {RELEASE_BRANCH} --head {BASE_BRANCH} --title "Release: 제목"
gh pr review --approve
gh pr merge --merge --delete-branch=false

# 4. 릴리즈 tag 생성 전 manifest/migration 확인
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE '대상 버전|추가 파일|수정 파일|수동 확인|충돌 가능성|검증' docs/migrations/v{from}-to-v{to}.md
```

## 컨트리뷰터 워크플로우 (Fork 기반)

```bash
# 1. 원본 저장소 Fork (GitHub에서 1회)
# 2. Fork한 저장소에서 작업
git clone https://github.com/{contributor}/{REPO_NAME}.git
git checkout -b feature/my-task
# ... 작업 + 커밋 ...
git push origin feature/my-task

# 3. 원본 저장소의 {BASE_BRANCH}로 PR 생성
gh pr create --repo {REPO_SLUG} --base {BASE_BRANCH} --head {contributor}:feature/my-task --title "제목"

# 4. 메인테이너가 리뷰 + merge
```

## FAQ / 흔한 실수

### 다른 에이전트와 메인 worktree가 충돌할 때

먼저 `git status --short --branch`로 현재 브랜치와 미커밋 변경을 확인한다. 다른 작업자의 변경이 있으면 되돌리지 말고, 새 작업은 분리 worktree에서 시작하는 쪽을 우선 검토한다. 이미 진행 중인 타스크와 같은 파일을 건드려야 한다면 작업지시자에게 충돌 범위를 공유하고 순서를 정한다.

### `{BASE_BRANCH}`에 rebase가 필요해 보일 때

기본 흐름은 `{BASE_BRANCH}`을 `git pull --ff-only`로 최신화하고, 새 `local/taskN` 브랜치를 최신 `origin/{BASE_BRANCH}`에서 만드는 것이다. 진행 중인 작업 브랜치를 임의로 rebase하지 않는다. PR 충돌이나 오래된 기준 브랜치 문제가 생기면 먼저 `git fetch origin`과 충돌 파일 목록을 확인하고, rebase/merge 중 어떤 방식으로 회복할지 작업지시자 승인 후 진행한다.

### 잘못된 브랜치를 원격에 push했을 때

원격에 `local/taskN`을 직접 올렸거나 잘못된 이름으로 push한 경우 즉시 추가 push를 멈춘다. 아직 PR을 만들지 않았다면 올바른 `publish/taskN` 브랜치를 새로 push하고, 잘못 올라간 원격 브랜치는 작업지시자 확인 후 삭제한다. 이미 PR을 만들었다면 PR base/head와 diff를 확인한 뒤, 새 PR을 만들지 기존 PR head를 보정할지 결정한다.

### PR 본문에 문서 링크를 넣을 때

PR 본문에서 계획서, 단계 보고서, 최종 보고서, troubleshooting 문서를 링크할 때는 merge 후에도 열리는 commit SHA 고정 GitHub blob URL을 우선 사용한다. PR 생성 직전 `git rev-parse HEAD`로 얻은 PR head commit SHA를 기준으로 `https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/...` 형식을 사용하면 `publish/taskN` 브랜치 삭제 후에도 링크가 유지된다.

변경 내역의 작업 문서 항목은 raw URL이 아니라 `[파일명](URL)` 형식으로 작성한다. 예시는 다음과 같다.

```md
- 수행 계획서: [task_m010_61.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61.md)
- 구현 계획서: [task_m010_61_impl.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/plans/task_m010_61_impl.md)
- 최종 보고서: [task_m010_61_report.md](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/report/task_m010_61_report.md)
```

Stage별 요약에서는 Stage 제목을 단계 보고서로 링크하고, 옆의 짧은 commit SHA를 commit URL로 링크한다. 예시는 다음과 같다.

```md
- **[Stage 1](https://github.com/{REPO_SLUG}/blob/{sha}/mydocs/working/task_m010_61_stage1.md)** ([abc1234](https://github.com/{REPO_SLUG}/commit/{stage1_sha})): {Stage 1 한 줄 요약}
```

PR 본문 상대 링크, `blob/publish/taskN/...` 링크, URL만 그대로 노출하는 문서 링크는 merge 후 탐색성과 가독성을 떨어뜨리므로 사용하지 않는다.

### merge 후에도 로컬 브랜치가 남아 있을 때

PR이 `MERGED` 상태인지 먼저 확인한다. merge 확인 후 `{BASE_BRANCH}`로 돌아와 최신화하고, 원격 `publish/taskN`과 로컬 `local/taskN`을 정리한다. 이 절차는 [`pr-merge-cleanup`](../skills/pr-merge-cleanup/SKILL.md) SKILL이 문서화한 순서를 따른다.

## 관련 매뉴얼

- [`task_workflow_guide.md`](task_workflow_guide.md): 이슈 기반 타스크 시작, 단계 승인, 최종 보고, PR 게시 순서.
- [`document_structure_guide.md`](document_structure_guide.md): 계획서, 단계 보고서, 최종 보고서의 문서 위치와 파일명.
- [`pr_process_guide.md`](pr_process_guide.md): 외부 기여자 PR 검토 절차.
