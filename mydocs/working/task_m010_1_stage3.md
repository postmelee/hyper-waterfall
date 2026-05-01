# task_m010_1_stage3.md — Stage 3 완료 보고서

GitHub Issue: [#1](https://github.com/postmelee/hyper-waterfall/issues/1)
구현계획서: [`task_m010_1_impl.md`](../plans/task_m010_1_impl.md)
이전 단계: [`task_m010_1_stage1.md`](task_m010_1_stage1.md), [`task_m010_1_stage2.md`](task_m010_1_stage2.md)

## 단계 목적

README의 "저장소 구조" 섹션을 두 관점으로 재작성해, 사용자가 적용 후 자신의 저장소가 어떻게 생기는지 예측할 수 있게 한다. 동시에 본 저장소가 자기 적용된 모습을 함께 보여 dogfooding의 의미를 명시한다.

## 산출물

`README.md`의 "저장소 구조" 섹션을 다음 두 갈래로 재작성:

- **(1) 적용 후 대상 저장소 구조** — 사용자가 `templates/`를 복사·치환한 뒤의 모습. `your-repo/` 루트 트리(11 폴더 + 운영 파일).
- **(2) 본 저장소(자기 적용 후) 구조** — `templates/`(진실 원천) + `docs/`(외부 진입) + 자기 적용 산출물(`mydocs/`)을 함께 보관. `mydocs/manual`·`mydocs/skills`가 `templates/mydocs/`로 가는 심볼릭 링크임을 명시.

설명 문장으로:

- 두 관점의 의미를 도입부 한 문장으로 정의.
- (2) 끝에 "본 저장소에서 매뉴얼/SKILL 수정 시 `templates/mydocs/...`를 직접 수정한다"는 운영 원칙을 명시.

기존 섹션 1개를 두 하위 섹션으로 늘렸지만, 트리 형식과 압축된 설명 문장으로 가독성 유지.

## 검증 결과

```
=== 저장소 구조 섹션 ===
85:## 저장소 구조

=== 두 갈래 섹션 ===
87:저장소 구조는 두 관점에서 봅니다. **(1) 적용 후 대상 저장소 구조** ...
89:### (1) 적용 후 대상 저장소 구조
118:### (2) 본 저장소(자기 적용 후) 구조
120:이 저장소는 위 (1) 구조에 더해...
...

=== git diff --check ===
OK
```

검증 명령:

```bash
grep -nE "^## 저장소 구조" README.md
grep -nE "(적용 후 대상 저장소|자기 적용)" README.md
git diff --check
```

`grep "^## 저장소 구조"` 1건, `grep "(적용 후 대상 저장소|자기 적용)"` 7건(헤더 + 본문 인용). 모두 의도된 매치.

## 본문 무손실 여부

기존 섹션의 모든 폴더 항목(`manual/`, `skills/`, `orders/`, `plans/`, `working/`, `report/`, `feedback/`, `tech/`, `troubleshootings/`, `pr/`)을 (1)에 그대로 포함. 추가로 `plans/archives/`, `pr/archives/`, `.agents/skills`, `.claude/skills`를 명시해 실제 구조에 더 가깝게 함.

## 잔여 위험

- (2) 트리에서 일부 폴더는 한 줄로 축약(`orders/, plans/, working/, ...`)했다. 자기 적용 산출물의 폴더 역할은 (1)과 같으므로 중복 설명을 피했다. 사용자가 (2)만 봐도 폴더 의미를 알 수 있도록 (1)을 먼저 두었다.
- README가 길어졌지만, "저장소 구조"는 적용 의사 결정 시 가장 자주 참조되는 섹션이므로 두 갈래 분리가 정보 가치 우선이다.

## 다음 단계 영향

본 task의 모든 단계 산출물이 완료된다. 다음은 `task-final-report` 절차(통합 검증, 최종 보고서, 오늘할일 완료 처리, `publish/task1` push, `main` 대상 draft PR 생성).

## 승인 요청

- README 재작성 본문에 동의?
- 통합 검증과 최종 보고로 진입 승인?
