/* ============================================================
   포티처 후기 폼 — 구글 시트 저장용 Apps Script
   이 파일은 구글 시트에 직접 붙여넣는 용도입니다. (배포 대상 아님)

   설치 순서
   1. 구글 시트 1행에 헤더 입력:
      제출시각 | 프로그램 | 만족도 | 강사 | 운영방식 | 교육내용 | 평균 | 의견
   2. 확장 프로그램 → Apps Script → 이 코드 붙여넣기
   3. 배포 → 새 배포 → 유형: 웹 앱
   4. 실행 사용자: 나, 액세스 권한: 모든 사용자
   5. 발급된 /exec URL을 HTML의 CONFIG.sheetUrl에 입력
   6. 코드 수정 시 반드시 '새 배포'를 해야 반영됨 (기존 배포 저장만으로는 안 됨)
   ============================================================ */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const d = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    d.program || '(미지정)',
    d.q1, d.q2, d.q3, d.q4,
    d.avg,
    d.comment || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
