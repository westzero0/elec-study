'use strict';
/* 계산기 키 순서 (카시오 fx-570ES PLUS 기준, 책 Part 2·3)
   k: 누를 키(띄어쓰기로 구분) · s: 그때 화면 · n: 한 줄 설명
   ok: true = 서영이 실제 계산기로 확인함 / false = 설명서 기준 초안 (공개 전 확인)
   free: true = 무료 공개 페이지(calc.html)에도 나옴 */
const CALC = [
  { no: '1', t: '임피던스 크기·위상각 (복소수 모드)', subj: '회로이론', ok: true, free: true,
    q: 'R = 6Ω, X = 8Ω 직렬회로. 임피던스 6 + j8 의 크기와 위상각은?',
    a: 'Z = 10 Ω, θ = 53.13° → 역률 cosθ = 6 ÷ 10 = 0.6',
    steps: [
      { k: 'MODE 2', s: 'CMPLX', n: '복소수 모드로 들어갑니다. 화면 위에 CMPLX 가 뜨면 맞아요.' },
      { k: '6 + 8 ENG', s: '6+8i', n: '허수 j 는 계산기에서 i 입니다. CMPLX 모드에서 ENG 키가 i 예요.' },
      { k: 'SHIFT 2 3', s: '6+8i▶r∠θ', n: '▶r∠θ: 크기와 각도로 바꾸기' },
      { k: '=', s: '10∠53.13010235', n: '크기 10Ω, 위상각 53.13°' },
      { k: 'MODE 1', s: '(CMPLX 표시가 사라짐)', n: '다 썼으면 일반 계산 모드로 돌아옵니다.' },
    ],
    warn: ['CMPLX 모드가 아니면 ENG 를 눌러도 i 가 안 나옵니다. 화면 위 CMPLX 표시부터 보세요.',
      '각도가 0.927… 처럼 나오면 각도 단위가 Rad 입니다. SHIFT MODE 3 (Deg) 으로 바꾸세요.',
      '다른 문제 풀기 전에 MODE 1 로 꼭 돌아오세요. CMPLX 에 남아 있으면 SOLVE 를 쓸 수 없습니다.'] },

  { no: '2', t: '병렬 합성저항', subj: '회로이론', ok: true,
    q: '2Ω과 3Ω을 병렬로 연결했다. 합성저항은?',
    a: '곱 ÷ 합 = 6 ÷ 5 = 1.2 Ω',
    steps: [
      { k: '2 × 3 ÷ ( 2 + 3 )', s: '2×3÷(2+3)', n: '합 부분은 꼭 괄호로 묶습니다.' },
      { k: '=', s: '6/5', n: '분수로 나옵니다.' },
      { k: 'S⇔D', s: '1.2', n: 'S⇔D 키로 소수로 바꿉니다.' },
    ],
    warn: ['괄호를 빼면 2×3÷2+3 = 6 이 나옵니다.', '답이 작은 쪽(2Ω)보다 크면 틀린 겁니다.'] },

  { no: '3', t: '3상 유효전력', subj: '전력·기기', ok: true,
    q: '선간전압 380V, 선전류 10A, 역률 0.8인 3상 부하의 유효전력은?',
    a: 'P ≈ 5,265 W (약 5.27 kW)',
    steps: [
      { k: '√ 3 ▶', s: '√3', n: '둥근 REPLAY 버튼 오른쪽(▶)을 눌러 √ 지붕 밖으로 나옵니다.' },
      { k: '× 380 × 10 × 0.8', s: '√3×380×10×0.8', n: '√ 지붕이 3 위에만 있는지 확인' },
      { k: '=', s: '3040√3', n: '√ 가 붙은 꼴로 나옵니다.' },
      { k: 'S⇔D', s: '5265.434455', n: '소수로 바꾸면 약 5,265 W' },
    ],
    warn: ['√3 다음에 ▶ 를 안 누르면 뒤 숫자까지 √ 안에 들어갑니다.'] },

  { no: '3-2', t: '3상 전류 거꾸로 구하기 (SOLVE)', subj: '전력·기기', ok: true, free: true,
    q: '5,265 W = √3 × 380 V × I × 0.8 일 때 전류 I는?',
    a: 'I ≈ 10 A',
    steps: [
      { k: '5265', s: '5265', n: '일반 계산 모드(MODE 1)에서 시작합니다.' },
      { k: 'ALPHA CALC', s: '5265=', n: '빨간 글씨 = (식 안에 넣는 등호)' },
      { k: '√ 3 ▶ × 380 ×', s: '5265=√3×380×', n: '둥근 REPLAY 버튼 오른쪽(▶)을 눌러 √ 밖으로 나옵니다.' },
      { k: 'ALPHA )', s: '5265=√3×380×X', n: '빨간 글씨 X' },
      { k: '× 0.8', s: '5265=√3×380×X×0.8', n: '식 완성' },
      { k: 'SHIFT CALC', s: 'Solve for X', n: 'SOLVE. X? 가 나오기도 합니다.' },
      { k: '1 =', s: 'X=9.999174892 / L−R=0', n: '아무 숫자나 넣고 =. L−R=0 이면 정확한 답입니다.' },
    ],
    warn: ['그냥 = 키는 계산 실행 버튼이라 식 안에 못 넣습니다. 등호는 ALPHA + CALC.',
      'L−R 이 0이 아니면 시작 숫자를 바꿔 다시 SHIFT + CALC.',
      '답이 아주 작은 값(μF, mH)이면 시작 숫자도 작게(예: 0.0001) 넣으세요.'] },

  { no: '4', t: 'Y결선 상전압', subj: '회로이론', ok: true,
    q: '선간전압 380V, Y결선 부하의 상전압은?',
    a: '상전압 = 선간전압 ÷ √3 ≈ 219.4 V (약 220V)',
    steps: [
      { k: '380 ÷ √ 3 ▶', s: '380÷√3', n: 'Y는 전압에 √3, Δ는 전류에 √3' },
      { k: '=', s: '380√3/3', n: '√ 가 붙은 분수로 나옵니다.' },
      { k: 'S⇔D', s: '219.3931023', n: '약 219.4 V' },
    ],
    warn: ['Δ결선이면 상전압 = 선간전압, 선전류 = √3 × 상전류입니다.'] },

  { no: '5', t: '역률 개선 콘덴서 용량', subj: '전력공학 · 실기 단골', ok: true,
    q: '100kW 부하의 역률을 0.6에서 0.9로 개선하려면 콘덴서 용량은?',
    a: 'Qc = P × (tanθ₁ − tanθ₂) ≈ 84.9 kVA',
    steps: [
      { k: 'SHIFT MODE 3', s: '(화면 위에 D)', n: '각도 단위를 Deg 로 맞춥니다.' },
      { k: '100 × (', s: '100×(', n: '' },
      { k: 'tan SHIFT cos 0.6 ) )', s: '100×(tan(cos⁻¹(0.6))', n: 'cos⁻¹ 은 SHIFT + cos. 괄호가 자동으로 열리니 ) 두 번으로 닫습니다.' },
      { k: '− tan SHIFT cos 0.9 ) )', s: '…−tan(cos⁻¹(0.9))', n: '' },
      { k: ') =', s: '84.90112285', n: '약 84.9 kVA' },
    ],
    warn: ['Rad 모드면 전혀 다른 값이 나옵니다. 화면 위 D 를 먼저 보세요.',
      '괄호 개수가 모자라면 Syntax ERROR 가 나옵니다. REPLAY 왼쪽(◀)으로 돌아가 괄호를 채우세요.'] },

  { no: '6', t: '송전전압 2배일 때 손실', subj: '전력공학', ok: true,
    q: '같은 전력을 보낼 때 송전전압을 2배로 하면 선로 손실은?',
    a: '손실은 전압의 제곱에 반비례 → (1/2)² = 1/4',
    steps: [
      { k: '( 1 ÷ 2 ) x²', s: '(1÷2)²', n: 'x² 는 제곱 키' },
      { k: '=', s: '1/4', n: '' },
    ],
    warn: ['손실·전압강하율은 제곱(1/n²), 전압강하는 그냥 1/n 입니다.'] },

  { no: '7', t: '변압기 효율·최대효율 부하율', subj: '전기기기', ok: true,
    q: '10kVA 변압기, 역률 1, 철손 120W, 전부하 동손 200W. 전부하 효율과 최대효율이 되는 부하율은?',
    a: '효율 ≈ 96.9 %, 부하율 m = √(120 ÷ 200) ≈ 0.775',
    steps: [
      { k: '10000 ÷ ( 10000 + 120 + 200 )', s: '10000÷(10000+120+200)', n: '출력 ÷ (출력 + 철손 + 동손)' },
      { k: '=', s: '125/129', n: '분수로 나옵니다.' },
      { k: 'S⇔D', s: '0.9689922481', n: '×100 하면 약 96.9 %' },
      { k: '√ 120 ÷ 200 ▶', s: '√(120÷200)', n: '이번엔 나눗셈 전체가 √ 안에 들어가야 합니다.' },
      { k: '=', s: '√15/5', n: '' },
      { k: 'S⇔D', s: '0.7745966692', n: '약 77.5 % 부하' },
    ],
    warn: ['kVA 를 W 로 바꿔 넣으세요 (10kVA = 10000).', '최대효율 조건은 철손 = 동손.'] },

  { no: '8', t: '동기속도와 슬립', subj: '전기기기', ok: true,
    q: '60Hz, 4극 유도전동기가 1,746 rpm으로 돈다. 동기속도와 슬립은?',
    a: 'Ns = 1,800 rpm, s = 0.03 (3 %)',
    steps: [
      { k: '120 × 60 ÷ 4 =', s: '1800', n: 'Ns = 120f ÷ P' },
      { k: '( 1800 − 1746 ) ÷ 1800 =', s: '3/100', n: 's = (Ns − N) ÷ Ns' },
      { k: 'S⇔D', s: '0.03', n: '3 %' },
    ],
    warn: ['극수 P 는 "극"의 수입니다. 극 쌍의 수와 헷갈리지 마세요.'] },

  { no: '9', t: '쿨롱의 법칙 (지수 입력)', subj: '전기자기학', ok: true,
    q: '진공 중 2μC과 3μC 전하가 0.3m 떨어져 있다. 두 전하 사이의 힘은?',
    a: 'F = 9×10⁹ × Q₁Q₂ ÷ r² = 0.6 N',
    steps: [
      { k: '9 ×10ˣ 9', s: '9×10⁹', n: '지수를 넣은 뒤 커서가 지수 칸에 남으면 REPLAY 오른쪽(▶)으로 나옵니다.' },
      { k: '× 2 ×10ˣ (−) 6', s: '9×10⁹×2×10⁻⁶', n: 'μ(마이크로) = ×10ˣ (−) 6' },
      { k: '× 3 ×10ˣ (−) 6', s: '…×3×10⁻⁶', n: '' },
      { k: '÷ 0.3 x² =', s: '3/5', n: '' },
      { k: 'S⇔D', s: '0.6', n: '0.6 N' },
    ],
    warn: ['음수 지수는 빼기 − 키가 아니라 (−) 키입니다. 여기서 제일 많이 틀립니다.',
      'r² 은 0.3 x² 로 넣으세요. 0.3² 을 머리로 계산하지 않아도 됩니다.'] },

  { no: '10', t: '직렬 공진 주파수', subj: '회로이론', ok: true,
    q: 'L = 10mH, C = 10μF인 직렬공진회로의 공진 주파수는?',
    a: 'f = 1 ÷ (2π√(LC)) ≈ 503 Hz',
    steps: [
      { k: '0.01 × 0.00001 =', s: '1/10000000 또는 1×10⁻⁷', n: '① L × C 부터. (10mH = 0.01, 10μF = 0.00001) 분수로 나와도 그대로 다음으로' },
      { k: '√ Ans =', s: '3.16227766×10⁻⁴', n: '② √ 를 누르면 ①의 답이 화면에서 사라지는데 정상이에요. 답은 Ans 키에 저장돼 있어요. √ 빈칸에 Ans(= 왼쪽 키)를 넣고 =. √ 가 붙은 꼴로 나오면 S⇔D' },
      { k: '× 2 × SHIFT ×10ˣ =', s: '1.986917653×10⁻³', n: '③ × 2π. 첫 × 를 누르면 화면에 Ans× 가 저절로 붙습니다. π 는 ×10ˣ 위 노란 글씨' },
      { k: 'x⁻¹ =', s: '503.292121', n: '④ 1 ÷ 방금 답. x⁻¹ 은 CALC 줄 오른쪽 키. 약 503 Hz' },
    ],
    warn: ['공진일 때 X_L = X_C, 임피던스는 R만 남아 최소, 전류는 최대입니다.'] },
];

const KEYCLS = { SHIFT: 'shift', ALPHA: 'alpha', '=': 'eq', '▶': 'pad', '◀': 'pad' };
// ▶·◀ 는 따로 있는 키가 아니라 화면 아래 둥근 REPLAY 버튼의 오른쪽·왼쪽 (서영 2026-11-28)
const KEYLAB = { '▶': 'REPLAY ▶', '◀': '◀ REPLAY' };
function calcKeys(k) {
  return k.split(' ').map(t => `<span class="key ${KEYCLS[t] || (/^[\d.]+$/.test(t) ? 'n' : '')}">${KEYLAB[t] || t}</span>`).join('');
}

// root 안에 문제 목록 → 단계 카드를 그린다. opts.free = 무료 공개 페이지
function calcApp(root, list, opts = {}) {
  let p = null, i = 0;
  const setup = `<div class="box warnbox"><h3>풀기 전에 한 번</h3>
    <p style="margin:0;font-size:14px">${calcKeys('SHIFT MODE 3')} 각도 단위 Deg (화면 위 D)<br>
    ${calcKeys('MODE 1')} 일반 계산 모드</p>
    <p class="muted" style="margin:6px 0 0">카시오 fx-570ES PLUS 기준입니다. 다른 기종은 키 위치가 다를 수 있어요.</p></div>`;
  function draw() {
    if (!p) {
      root.innerHTML = setup + list.map((x, j) => `<button class="cprob" data-j="${j}"><span class="no">${x.no}</span>
        <span class="tt">${x.t}<small>${x.subj}</small></span>
        ${opts.free ? '' : x.free ? '<span class="badge free">무료 공개</span>' : x.ok ? '' : '<span class="badge draft">확인 전</span>'}</button>`).join('');
      return;
    }
    const st = p.steps[i], last = i === p.steps.length - 1;
    root.innerHTML = `<button class="back" data-back>← 문제 목록</button>
      <div class="box cq"><b>${p.no}. ${p.t}</b><br>${p.q}${last ? `<span class="a">답: ${p.a}</span>` : ''}</div>
      <div class="step${last ? ' last' : ''}"><div class="sn">단계 ${i + 1} / ${p.steps.length}</div>
        <div class="keys" aria-label="누를 키">${calcKeys(st.k)}</div>
        <div class="lcd"><small>이때 화면</small>${st.s}</div>
        ${st.n ? `<p class="sx">${st.n}</p>` : ''}</div>
      <div class="fnav"><button data-d="-1" ${i ? '' : 'disabled'}>이전</button>
        <button class="go" data-d="1">${last ? '처음부터' : '다음 단계'}</button>
        <button data-back>목록</button></div>
      <div class="box" style="margin-top:16px"><b>흔한 실수</b><ul class="howto">${p.warn.map(w => `<li>${w}</li>`).join('')}</ul></div>`;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.j) { p = list[+b.dataset.j]; i = 0; }
    else if ('back' in b.dataset) p = null;
    else if (b.dataset.d) i = (i + +b.dataset.d) % p.steps.length;
    else return;
    draw(); scrollTo(0, 0);
  });
  draw();
}
