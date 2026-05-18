# 외부 기여 PR 검토 가이드

## 목적

이 문서는 외부 기여자 PR 검토 절차와 `mydocs/pr/` 기록 흐름을 정의한다. 내부 task PR에는 이 절차를 적용하지 않는다.

외부 PR 검토 실행 절차는 [`external-pr-review`](../skills/external-pr-review/SKILL.md) Skill을 따른다.

## 기본 원칙

- 외부 기여 PR은 코드 변경과 문서 변경을 함께 검토한다.
- 외부 PR 검토 결과는 `mydocs/pr/` 문서 흐름으로 관리한다.
- 검토 문서는 재현 가능해야 하며, 실행한 검증 명령/결과를 포함한다.
- 외부 기여자 PR은 내부 타스크와 다른 본질을 가지므로 별도 절차와 폴더를 사용한다.
- 외부 PR 검토 기록은 `mydocs/pr/`에 남긴다.

## 문서 흐름

외부 PR은 `mydocs/pr/` 문서 흐름으로 처리한다.

- 검토 문서: `pr_{번호}_review.md`
- 구현 계획서: `pr_{번호}_review_impl.md` (필요 시)
- 최종 보고서: `pr_{번호}_report.md`

처리 완료 문서는 `mydocs/pr/archives/`로 이동한다.

## 절차

1. PR 메타데이터 확인 (base/head, mergeable, CI, 연결 issue)
2. 코드/문서 변경 범위 확인
3. 필요한 검증 실행
4. `pr_{번호}_review.md`에 핵심 리스크와 수정 요청 정리
5. 필요 시 `pr_{번호}_review_impl.md`에 재검토 계획 정리
6. 최종 판단을 `pr_{번호}_report.md`로 기록
7. 처리 완료 문서를 `mydocs/pr/archives/`로 이동

## 머지 전 체크

- PR 대상 브랜치가 정책에 맞는지
- 리뷰 코멘트가 해결/미해결로 구분되어 있는지
- 필수 검증이 수행됐는지
- 승인/보류/반려 판단 근거가 문서에 남았는지

## 머지 후 체크

- 관련 issue 상태 확인 (auto close 또는 수동 close)
- merge 완료된 원격 브랜치 삭제 여부 확인
- 다음 작업에 필요하지 않은 로컬 worktree, build 산출물, 설치 smoke test 산출물 정리
- 후속 작업이 있으면 신규 issue로 분리
- 검토 문서를 `mydocs/pr/archives/`로 이동

## 내부 task와의 경계

내부 타스크의 `수행 -> 구현 -> 단계별 보고 -> 최종 보고` 절차는 외부 기여 PR 검토에 그대로 적용하지 않는다.

내부 후속 수정이 필요해지면 외부 PR 검토 문서에 근거를 남긴 뒤 별도 GitHub Issue를 만들고 내부 타스크로 분리한다.
