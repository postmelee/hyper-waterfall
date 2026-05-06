# task_m020_7_stage1.md - Stage 1 완료 보고서

GitHub Issue: [#7](https://github.com/postmelee/hyper-waterfall/issues/7)
구현계획서: [`task_m020_7_impl.md`](../plans/task_m020_7_impl.md)
Stage: 1

## 단계 목적

Stage 1은 Hyper-Waterfall의 배포·업데이트 프로토콜 기반이 될 manifest와 적용 저장소 version 기록 정책을 정의하는 단계다. GitHub Release/tag를 canonical 배포 단위로 삼기 위해, release에 포함되는 파일 목록과 적용 대상 경로, 업데이트 정책, checksum 상태를 `templates/manifest.json`에 표현하고, 문서 구조 매뉴얼에 `.hyper-waterfall/version.json`의 역할을 추가했다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/manifest.json` | framework version, release 기준, 적용 version 상태 파일, update policy, 17개 적용 대상 항목, checksum 상태를 정의 |
| `templates/mydocs/manual/document_structure_guide.md` | 핵심 용어와 별도 섹션에 배포 manifest, `.hyper-waterfall/version.json`, update policy 의미와 강제 규칙 추가 |

변경 규모:

```text
templates/manifest.json                         | 255 lines
templates/mydocs/manual/document_structure_guide.md | 33 lines added
```

## 본문 변경 정도 / 본문 무손실 여부

`document_structure_guide.md`의 기존 문서 구조, 중앙 템플릿 정책, GitHub 플랫폼 템플릿 정책은 유지했다. 신규 내용은 다음 두 지점에 추가했다.

- "핵심 용어"에 `배포 manifest`, `적용 버전 기록` 용어 추가
- "GitHub 플랫폼 템플릿 정책" 뒤에 "배포 manifest와 버전 기록 정책" 섹션 추가

기존 문단을 삭제하거나 재배치하지 않았고, Stage 1 범위 밖인 README, agent entrypoint, git/task workflow manual은 아직 수정하지 않았다.

## 검증 결과

실행 명령:

```bash
test -f templates/manifest.json
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
grep -nE '"schemaVersion"|"frameworkVersion"|"release"|"versionState"|"files"|"updatePolicies"|"checksum"' templates/manifest.json
grep -nE 'AGENTS.md|CLAUDE.md|templates/mydocs/skills|templates/mydocs/_templates|templates/.github' templates/manifest.json
grep -nE 'manifest|version|\.hyper-waterfall|version.json' templates/mydocs/manual/document_structure_guide.md
git diff --check
ruby -rjson -e 'm=JSON.parse(File.read("templates/manifest.json")); policies=m.fetch("updatePolicies").keys; missing=m.fetch("files").reject{|f| policies.include?(f.fetch("updatePolicy"))}; abort("unknown policy: #{missing.inspect}") unless missing.empty?; absent=m.fetch("files").reject{|f| f.fetch("kind") == "symlink" || File.exist?(f.fetch("source"))}; abort("missing source: #{absent.inspect}") unless absent.empty?; puts "files=#{m.fetch("files").size}, policies=#{policies.join(",")}"'
grep -nE 'pending-release|overwrite|merge|manual|preserve|symlink' templates/manifest.json templates/mydocs/manual/document_structure_guide.md
```

결과:

- `templates/manifest.json` 존재 확인.
- JSON parse 통과.
- `schemaVersion`, `frameworkVersion`, `release`, `versionState`, `files`, `updatePolicies`, `checksum` 필드 확인.
- `AGENTS.md`, `CLAUDE.md`, `templates/.github`, `templates/mydocs/_templates`, `templates/mydocs/skills` 주요 경로 포함 확인.
- `document_structure_guide.md`에서 manifest, version, `.hyper-waterfall`, `version.json` 설명 확인.
- 모든 manifest file 항목의 `updatePolicy`가 정의된 정책 이름과 일치함을 확인.
- symlink가 아닌 source는 모두 실제 존재함을 확인. 결과: `files=17, policies=overwrite,merge,manual,preserve,symlink`.
- `pending-release`, `overwrite`, `merge`, `manual`, `preserve`, `symlink` 설명 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- `frameworkVersion: 0.2.0`, `plannedTag: v0.2.0`, `baselineTag: v0.1.0`은 M020 목표 기준 표현이다. 실제 GitHub Release/tag 생성은 이번 Stage와 이번 task의 범위 밖이며 별도 승인 절차가 필요하다.
- checksum은 실제 release 패키징 시점에 확정되므로 현재는 `pending-release` 상태다.
- directory 단위 checksum 산정 방식은 후속 CLI 또는 release 패키징 절차에서 더 구체화해야 한다.

## 다음 단계 영향

- Stage 2 migration guide는 `templates/manifest.json`의 `frameworkVersion`, `plannedTag`, `baselineTag`, `.hyper-waterfall/version.json`, update policy 용어를 기준으로 작성한다.
- Stage 3 README/Manual 반영 시 `document_structure_guide.md`에 추가한 정책을 중복 설명하지 않고, 사용자 흐름 중심으로 연결해야 한다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2 migration guide 체계 추가로 진행한다.
