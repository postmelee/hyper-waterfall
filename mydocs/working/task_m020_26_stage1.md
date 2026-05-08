# task_m020_26_stage1.md - manifest checksum 산출 가능성 조사 완료보고서

GitHub Issue: [#26](https://github.com/postmelee/hyper-waterfall/issues/26)
구현계획서: [`task_m020_26_impl.md`](../plans/task_m020_26_impl.md)
Stage: 1

## 단계 목적

Stage 1은 `templates/manifest.json`의 checksum 대상 항목을 분류하고, `v0.2.0` release 직전에 어떤 checksum을 재현 가능하게 확정할 수 있는지 조사하는 단계다. 이 단계에서는 manifest 값을 변경하지 않고, Stage 2에서 반영할 판단 근거만 정리한다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `mydocs/working/task_m020_26_stage1.md` | manifest checksum 대상 분류, file/directory/root checksum 산출 가능성, Stage 2 권장 반영 방향 기록 |

## 본문 변경 정도 / 본문 무손실 여부

`templates/manifest.json`은 읽기와 검증만 수행했고 수정하지 않았다. Stage 1 산출물은 신규 단계 보고서뿐이다.

## 조사 결과

### manifest 항목 분류

| 구분 | 개수 | checksum 상태 |
|---|---:|---|
| root checksum | 1 | `pending-release`, value `null` |
| `kind: file` | 12 | 전부 `pending-release` |
| `kind: directory` | 3 | 전부 `pending-release` |
| `kind: symlink` | 2 | 전부 `not-applicable` |

update policy별 항목 수:

| updatePolicy | 개수 |
|---|---:|
| `merge` | 4 |
| `overwrite` | 3 |
| `preserve` | 8 |
| `symlink` | 2 |

모든 `source` 경로는 현재 `origin/main` 기준 worktree에서 존재한다.

### file checksum 산출 가능성

`kind: file` 12개 항목은 source 파일 자체의 SHA-256으로 재현 가능하게 산출할 수 있다.

| source | SHA-256 |
|---|---|
| `templates/AGENTS.md` | `b18d24c46b836c76d68940064ad382a05b48c26e1285740c08e24e4c96d79cb6` |
| `templates/CLAUDE.md` | `0e10e5cabc3c9f5e3c3cc6442b922bec8694b4b156683aa478e2964829c0cc10` |
| `templates/.github/ISSUE_TEMPLATE/task.yml` | `3425ce2cbec9d585c5795da3212233761c28f431bccca38d726b9f4d4d6fe927` |
| `templates/.github/pull_request_template.md` | `88d818c3c2b740dbcffe499e8e06e078d95309acc1eb8bb4e727edf473fab7d6` |
| `templates/mydocs/orders/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `templates/mydocs/plans/archives/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `templates/mydocs/working/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `templates/mydocs/report/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `templates/mydocs/feedback/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `templates/mydocs/tech/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `templates/mydocs/troubleshootings/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `templates/mydocs/pr/archives/.gitkeep` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |

Stage 2에서는 위 12개 file checksum을 `status: "ready"` 또는 이에 준하는 확정 상태와 함께 채울 수 있다. 단, 상태값 이름은 Stage 2에서 문서와 함께 확정해야 한다.

### directory checksum 산출 가능성

directory 항목은 내부 파일을 정렬하고, 각 파일의 relative path와 SHA-256을 묶어 다시 SHA-256을 계산하면 후보 digest를 만들 수 있다. 이번 조사에서 사용한 후보 산식은 `relative_path + NUL + file_sha256` 라인을 정렬 순서대로 합친 뒤 SHA-256을 계산하는 방식이다.

| source | 내부 regular file 수 | 후보 SHA-256 |
|---|---:|---|
| `templates/mydocs/_templates` | 11 | `0ed378e2ac8f66e1fd294f043ec127ee30a9ff098e4f4806dc337924922e3853` |
| `templates/mydocs/manual` | 5 | `cc302ea625ac7ee50b9aed78a4e96288a1e54c282e8e49b036deabf6205f8c0a` |
| `templates/mydocs/skills` | 7 | `a882055df10e65b442d904a9d00b833861439617381f724fd7367ceab5b5f6de` |

다만 이 산식은 아직 `templates/manifest.json`, release 문서, migration guide, manual에 공식 규칙으로 정의되어 있지 않다. 권한, symlink, 빈 디렉터리, 파일명 인코딩을 어떻게 다룰지도 명확히 고정되어 있지 않다. 따라서 Stage 2에서 directory checksum 값을 채우려면 산식을 먼저 문서화해야 한다. 문서화하지 않는다면 directory checksum은 `pending-release` 유지가 안전하다.

### root checksum 산출 가능성

root checksum은 현재 의미가 문서화되어 있지 않다. 가능한 해석은 다음 두 가지다.

- manifest가 나열한 대상 파일과 디렉터리 checksum 전체를 대표하는 digest
- release asset 또는 release bundle 전체를 대표하는 digest

첫 번째 방식은 manifest 안에 checksum 값이 들어가므로 자기참조 문제를 피하려면 root checksum 계산 범위에서 root checksum 필드를 제외하는 정규화 규칙이 필요하다. 두 번째 방식은 실제 release asset 생성 이후에만 안정적으로 확정할 수 있다. Stage 2에서는 root checksum을 무리하게 채우지 말고, 의미와 확정 시점을 `docs/releases/v0.2.0.md`에 문서화한 뒤 보류하는 것이 안전하다.

### symlink checksum 산출 가능성

`kind: symlink` 2개 항목은 모두 `source: mydocs/skills`, `target: .agents/skills`와 `.claude/skills`이며, 현재 `mydocs/skills`는 `../templates/mydocs/skills`를 가리키는 symlink다. checksum 상태는 `not-applicable`로 유지하는 것이 맞다. symlink 항목은 checksum보다 link target 검증과 conflict 확인이 핵심이다.

## 검증 결과

실행 명령:

```bash
ruby -rjson -e 'JSON.parse(File.read("templates/manifest.json"))'
rg -n '"checksum"|"source"|"kind"|"status"|pending-release' templates/manifest.json
git diff --check
```

결과:

- OK: `templates/manifest.json` JSON parse 통과.
- OK: `rg`가 root checksum, file/directory/symlink 항목의 `source`, `kind`, `status`, `pending-release` 위치를 확인했다.
- OK: `git diff --check` 출력 없이 통과.

추가 조사 명령:

```bash
ruby -rjson -rdigest -e 'm=JSON.parse(File.read("templates/manifest.json")); m["files"].select{|f| f["kind"]=="file"}.each{|f| puts "#{Digest::SHA256.file(f["source"]).hexdigest}  #{f["source"]}"}'
ruby -rjson -rdigest -e 'm=JSON.parse(File.read("templates/manifest.json")); m["files"].select{|f| f["kind"]=="directory"}.each{|f| lines=Dir.glob(File.join(f["source"],"**","*"), File::FNM_DOTMATCH).reject{|p| File.basename(p)=="." || File.basename(p)==".." || File.directory?(p)}.sort.map{|p| rel=p.sub(%r{^#{Regexp.escape(f["source"])}/*},""); "#{rel}\0#{Digest::SHA256.file(p).hexdigest}"}; puts "#{Digest::SHA256.hexdigest(lines.join("\n"))}  #{f["source"]}  files=#{lines.size}" }'
```

결과:

- OK: file 항목 12개 SHA-256 산출 가능.
- OK: directory 항목 3개 후보 digest 산출 가능.
- NOTE: directory 후보 산식은 아직 공식 규칙이 아니므로 Stage 2에서 문서화 또는 보류 결정 필요.

## 잔여 위험

- directory checksum 산식이 아직 공식 기준으로 문서화되어 있지 않다.
- root checksum 의미가 불명확하며 자기참조 문제가 있다.
- release status의 확정 상태값 이름(`ready`, `released` 등)은 아직 결정하지 않았다.

## 다음 단계 영향

- Stage 2에서는 12개 file checksum을 manifest에 채우는 방향이 가능하다.
- directory checksum은 산식을 `docs/releases/v0.2.0.md`에 명시할 때만 값으로 채우고, 그렇지 않으면 `pending-release`와 보류 이유를 유지한다.
- root checksum은 release asset 또는 정규화 규칙이 확정될 때까지 보류하는 편이 안전하다.
- symlink checksum은 `not-applicable` 유지가 적절하다.

## 승인 요청

- Stage 1 산출물과 검증 결과를 승인하면 Stage 2로 진행한다.
