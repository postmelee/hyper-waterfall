# task_m020_7_stage2.md - Stage 2 완료 보고서

GitHub Issue: [#7](https://github.com/postmelee/hyper-waterfall/issues/7)
구현계획서: [`task_m020_7_impl.md`](../plans/task_m020_7_impl.md)
Stage: 2

## 단계 목적

Stage 2는 Stage 1에서 정의한 `templates/manifest.json`, `.hyper-waterfall/version.json`, `v0.1.0 -> v0.2.0` 기준을 기존 적용 저장소가 따라갈 수 있는 migration guide 체계로 문서화하는 단계다. 실제 release 생성 자동화가 아니라 후속 `framework-update` Skill과 update PR이 참조할 리뷰 근거를 만든다.

## 산출물

| 파일 | 변경 요약 |
|---|---|
| `docs/migrations/README.md` | migration guide 목적, 파일명 규칙, 필수 섹션, 작성 기준, 검증, update PR과의 관계 정의 |
| `docs/migrations/v0.1.0-to-v0.2.0.md` | M020 목표 release로 이동할 때의 대상 버전, 추가/수정 파일, 수동 확인, 충돌 가능성, 검증, 후속 작업 정리 |

변경 규모:

```text
docs/migrations/README.md                 | 67 lines
docs/migrations/v0.1.0-to-v0.2.0.md       | 90 lines
```

## 본문 변경 정도 / 본문 무손실 여부

신규 문서만 추가했다. 기존 README, Manual, agent entrypoint, manifest는 Stage 2에서 수정하지 않았다.

`v0.1.0-to-v0.2.0.md`는 실제 release/tag 생성 완료 선언이 아니라, `v0.1.0` baseline에서 `v0.2.0` M020 목표로 이동할 때 확인할 기준 문서임을 명시했다.

## 검증 결과

실행 명령:

```bash
test -f docs/migrations/README.md
test -f docs/migrations/v0.1.0-to-v0.2.0.md
grep -nE '파일명 규칙|필수 섹션|대상 버전|추가 파일|수정 파일|수동 확인|충돌 가능성|검증' docs/migrations/README.md docs/migrations/v0.1.0-to-v0.2.0.md
grep -nE 'v0.1.0|v0.2.0|manifest|version|GitHub Release' docs/migrations/v0.1.0-to-v0.2.0.md
git diff --check
grep -nE '^## (대상 버전|변경 요약|추가 파일|수정 파일|적용 저장소 수동 확인|충돌 가능성|검증|후속 작업)$' docs/migrations/v0.1.0-to-v0.2.0.md
grep -nE '^## (파일명 규칙|필수 섹션|작성 기준|검증|update PR과의 관계)$' docs/migrations/README.md
```

결과:

- migration README와 `v0.1.0-to-v0.2.0.md` 파일 존재 확인.
- `파일명 규칙`, `필수 섹션`, `대상 버전`, `추가 파일`, `수정 파일`, `수동 확인`, `충돌 가능성`, `검증` 키워드 확인.
- `v0.1.0`, `v0.2.0`, `manifest`, `version`, `GitHub Release` 키워드 확인.
- `v0.1.0-to-v0.2.0.md`의 필수 섹션 8개 확인.
- `README.md`의 작성 규칙 섹션 5개 확인.
- `git diff --check` 경고 없이 통과.

## 잔여 위험

- 실제 `v0.2.0` GitHub Release/tag는 아직 생성하지 않았다. migration guide는 release 생성 전 기준 문서다.
- 실제 적용 저장소에서 `.hyper-waterfall/version.json`을 생성하거나 update PR 본문에 migration 요약을 넣는 자동화는 후속 #8, #9, #10 범위다.

## 다음 단계 영향

- Stage 3에서 README와 Manual에 `docs/migrations/`를 연결할 때, Stage 2 문서가 canonical update protocol의 한 축임을 명확히 설명해야 한다.
- `docs/agent-entrypoint.md`는 신규 설치와 기존 업데이트 진입을 구분하면서도, 현재는 update 자동화가 아닌 migration guide 기반 수동 확인 단계임을 과장 없이 적어야 한다.

## 승인 요청

- Stage 2 산출물과 검증 결과를 승인하면 Stage 3 README와 Manual에 배포·업데이트 프로토콜을 반영한다.
