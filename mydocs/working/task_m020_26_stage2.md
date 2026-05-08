# task_m020_26_stage2.md - release manifest 상태와 checksum 정책 반영 완료보고서

GitHub Issue: [#26](https://github.com/postmelee/hyper-waterfall/issues/26)
구현계획서: [`task_m020_26_impl.md`](../plans/task_m020_26_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 조사한 checksum 산출 가능성을 기준으로 `v0.2.0` release 생성 직전 manifest 상태를 정리하고, 재현 가능한 checksum 값과 보류 정책을 문서에 반영하는 단계다. 실제 Git tag, GitHub Release, npm publish는 실행하지 않는다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `templates/manifest.json` | `kind: file` 12개 항목의 checksum을 source 파일 SHA-256 값으로 채우고 `status: ready`로 변경. root와 directory checksum은 `pending-release`, symlink checksum은 `not-applicable` 유지 |
| `docs/releases/v0.2.0.md` | file/root/directory/symlink checksum 상태 의미, file checksum 산출 기준, directory/root checksum 보류 이유, release 전 체크리스트와 release notes 초안 보강 |
| `mydocs/working/task_m020_26_stage2.md` | Stage 2 변경 내용, 검증 결과, 잔여 위험, 다음 단계 영향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

`templates/manifest.json`은 기존 파일 목록, target, role, updatePolicy, release version 필드를 유지하고 checksum 하위 필드만 변경했다. `docs/releases/v0.2.0.md`는 기존 release 준비 문서의 구조와 release notes 초안을 유지하면서 checksum 정책과 checklist 문구를 보강했다.

## 반영 내용

manifest checksum 상태 분포:

| 구분 | 상태 | 개수 |
|---|---|---:|
| root checksum | `pending-release` | 1 |
| `kind: file` | `ready` | 12 |
| `kind: directory` | `pending-release` | 3 |
| `kind: symlink` | `not-applicable` | 2 |

file checksum은 repository에 저장된 source 파일 바이트를 SHA-256으로 계산한 값이다. 줄 끝, 인코딩, 권한, 파일명은 별도 정규화하지 않는다.

directory checksum은 Stage 1에서 후보 digest를 산출했지만 공식 산식으로 채택하지 않았다. 포함 파일 범위, 정렬 기준, 빈 디렉터리, symlink, 권한, 파일명 인코딩 처리 방식을 먼저 문서화해야 하므로 `pending-release`로 유지했다.

root checksum은 manifest 전체 checksum인지 release artifact checksum인지 의미가 아직 고정되지 않았다. manifest 내부 checksum 필드를 포함할 경우 자기참조 문제가 있어 `pending-release`로 유지했다.

`release.status`는 실제 Git tag와 GitHub Release를 생성하지 않았으므로 `planned`로 유지했다.

## 검증 결과

실행 명령:

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n 'planned|released|pending-release|checksum|v0.2.0|GitHub Release' templates/manifest.json docs/releases/v0.2.0.md
git diff --check
```

결과:

- OK: `templates/manifest.json` JSON parse 통과.
- OK: `rg`가 `planned`, `pending-release`, `checksum`, `v0.2.0`, `GitHub Release` 표현을 manifest와 release 준비 문서에서 확인했다.
- OK: `git diff --check` 출력 없이 통과.

추가 검증 명령:

```bash
ruby -rjson -rdigest -e 'm=JSON.parse(File.read("templates/manifest.json")); bad=[]; m["files"].select{|f| f["kind"]=="file"}.each{|f| actual=Digest::SHA256.file(f["source"]).hexdigest; bad << "#{f["source"]}: manifest=#{f["checksum"]["value"]} actual=#{actual}" unless f["checksum"]["status"]=="ready" && f["checksum"]["value"]==actual}; abort bad.join("\n") unless bad.empty?; puts "file checksum ready entries match source SHA-256: #{m["files"].count{|f| f["kind"]=="file"}}"'
```

결과:

- OK: `file checksum ready entries match source SHA-256: 12`.

## 잔여 위험

- `docs/migrations/v0.1.0-to-v0.2.0.md`, README, `docs/distribution-channels.md`에는 아직 기존 checksum 표현이 남아 있을 수 있다. Stage 3에서 문서 정합성을 재대조한다.
- directory checksum 공식 산식과 root checksum 의미는 아직 확정하지 않았다.
- 실제 `v0.2.0` tag와 GitHub Release는 아직 생성하지 않았다.

## 다음 단계 영향

- Stage 3에서는 `templates/manifest.json`, release 준비 문서, migration guide, README, distribution strategy의 checksum/release 상태 표현을 통합 대조한다.
- tag/release 목록 확인은 Stage 3 검증에서 수행하되, 실제 `git tag`, `git push`, `gh release create`, npm publish는 실행하지 않는다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3로 진행한다.
