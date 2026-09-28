const canvas = document.querySelector('#arcade-canvas');
const context = canvas.getContext('2d');
const status = document.querySelector('[data-game-status]');
const action = document.querySelector('[data-control="action"]');
const title = document.querySelector('[data-stage-title]');
const label = document.querySelector('[data-stage-label]');
const instructions = document.querySelector('[data-stage-instructions]');
const revealLabel = document.querySelector('[data-reveal-label]');
const revealTitle = document.querySelector('[data-reveal-title]');
const revealCopy = document.querySelector('[data-reveal-copy]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const stages = {
  road: {
    label: 'Roadline Run',
    title: 'Keep the route clear.',
    instructions: 'Move between lanes and avoid blockers. Reach six markers to reveal the current-direction card.',
    revealLabel: 'Current direction',
    revealTitle: 'Software developer at Veloxcore.',
    revealCopy: 'Darshil has been building professional software experience at Veloxcore since 2023.',
    accent: '#d9ff58'
  },
  climb: {
    label: 'Stack Shift',
    title: 'Choose the next solid step.',
    instructions: 'Follow the bright platform lane before the timer expires. Reach six stable steps to reveal the technical-foundation card.',
    revealLabel: 'Technical foundation',
    revealTitle: 'Tools that support clear solutions.',
    revealCopy: 'The current toolkit includes HTML, CSS, JavaScript, Python, Java, C++, SQL, and PHP.',
    accent: '#70d6ff'
  },
  signal: {
    label: 'Signal Match',
    title: 'React when the signal aligns.',
    instructions: 'Move into the highlighted lane before the pulse arrives. Match six signals to reveal the new-work card.',
    revealLabel: 'Project collection',
    revealTitle: 'Three projects, three different problems.',
    revealCopy: 'The classic portfolio includes an E-Commerce Website, an Exam and Quiz Management System, and a Basic Music Player.',
    accent: '#ff6b9c'
  }
};

let stageKey = 'road';
let game = createGame();
let animationFrame = 0;

function createGame() {
  return { running: false, lane: 1, score: 0, targetLane: 1, obstacleLane: 0, obstacleY: -80, elapsed: 0, lastStep: 0, notice: 'Choose Start to play.' };
}

function selectStage(nextStage) {
  stageKey = nextStage;
  game = createGame();
  const stage = stages[stageKey];
  label.textContent = stage.label;
  title.textContent = stage.title;
  instructions.textContent = stage.instructions;
  revealLabel.textContent = stage.revealLabel;
  revealTitle.textContent = stage.revealTitle;
  revealCopy.textContent = stage.revealCopy;
  action.textContent = 'Start';
  status.textContent = game.notice;
  document.querySelectorAll('[data-stage]').forEach((button) => {
    const selected = button.dataset.stage === stageKey;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  draw();
}

function startOrConfirm() {
  if (game.running) return;
  game = createGame();
  game.running = true;
  game.notice = 'Go!';
  action.textContent = 'Playing';
  status.textContent = game.notice;
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(tick);
}

function move(delta) {
  if (!game.running) return;
  game.lane = Math.max(0, Math.min(2, game.lane + delta));
  draw();
}

function finish(message) {
  game.running = false;
  game.notice = message;
  action.textContent = 'Play again';
  status.textContent = message;
  draw();
}

function tick(timestamp) {
  if (!game.running) return;
  if (!game.lastStep) game.lastStep = timestamp;
  const delta = Math.min(40, timestamp - game.lastStep);
  game.lastStep = timestamp;
  game.elapsed += delta;

  if (stageKey === 'road') updateRoad(delta);
  if (stageKey === 'climb') updateClimb(delta);
  if (stageKey === 'signal') updateSignal(delta);
  draw();
  if (game.running) animationFrame = requestAnimationFrame(tick);
}

function updateRoad(delta) {
  const speed = reduceMotion ? 0.11 : 0.19;
  game.obstacleY += delta * speed;
  if (game.obstacleY > canvas.height + 70) {
    game.obstacleY = -70;
    game.obstacleLane = Math.floor(Math.random() * 3);
    game.score += 1;
    if (game.score >= 6) finish('Route complete! Current direction revealed below.');
  }
  if (game.obstacleLane === game.lane && game.obstacleY > 290 && game.obstacleY < 370) finish('A blocker stopped the run. Try again.');
}

function updateClimb(delta) {
  const interval = reduceMotion ? 1500 : 1000;
  if (game.elapsed > interval) {
    game.elapsed = 0;
    if (game.lane === game.targetLane) {
      game.score += 1;
      game.targetLane = Math.floor(Math.random() * 3);
      if (game.score >= 6) finish('Six stable steps! Technical foundation revealed below.');
    } else {
      finish('That platform was not stable. Try again.');
    }
  }
}

function updateSignal(delta) {
  const interval = reduceMotion ? 1600 : 1100;
  if (game.elapsed > interval) {
    game.elapsed = 0;
    if (game.lane === game.targetLane) {
      game.score += 1;
      game.targetLane = Math.floor(Math.random() * 3);
      if (game.score >= 6) finish('Signal sequence complete! New work card revealed below.');
    } else {
      finish('Signal missed. Try again.');
    }
  }
}

function draw() {
  const stage = stages[stageKey];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#0c0e19';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid(stage.accent);
  if (stageKey === 'road') drawRoad(stage.accent);
  if (stageKey === 'climb') drawClimb(stage.accent);
  if (stageKey === 'signal') drawSignal(stage.accent);
  drawPlayer(stage.accent);
  context.fillStyle = '#f6f4ec';
  context.font = '700 18px system-ui';
  context.fillText(`Markers: ${game.score} / 6`, 22, 34);
}

function drawGrid(accent) {
  context.strokeStyle = '#282c45';
  context.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 60) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, canvas.height); context.stroke(); }
  for (let y = 0; y <= canvas.height; y += 60) { context.beginPath(); context.moveTo(0, y); context.lineTo(canvas.width, y); context.stroke(); }
  context.strokeStyle = accent;
  context.globalAlpha = 0.32;
  context.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);
  context.globalAlpha = 1;
}

function laneX(lane) { return 170 + lane * 190; }

function drawRoad(accent) {
  context.fillStyle = '#20243c';
  context.fillRect(125, 45, 470, 345);
  context.strokeStyle = '#9ba0b8';
  context.lineWidth = 5;
  context.setLineDash([22, 18]);
  [315, 505].forEach((x) => { context.beginPath(); context.moveTo(x, 45); context.lineTo(x, 390); context.stroke(); });
  context.setLineDash([]);
  context.fillStyle = '#ff6b9c';
  context.fillRect(laneX(game.obstacleLane) - 45, game.obstacleY, 90, 58);
  context.fillStyle = accent;
  context.fillRect(laneX(game.obstacleLane) - 24, game.obstacleY + 13, 48, 12);
}

function drawClimb(accent) {
  for (let lane = 0; lane < 3; lane += 1) {
    context.fillStyle = lane === game.targetLane ? accent : '#343952';
    context.fillRect(laneX(lane) - 65, 110, 130, 28);
    context.fillRect(laneX(lane) - 65, 220, 130, 28);
    context.fillRect(laneX(lane) - 65, 330, 130, 28);
  }
  context.fillStyle = '#b8b8c9';
  context.font = '600 18px system-ui';
  context.fillText('Move to the bright lane before the next step.', 22, 68);
}

function drawSignal(accent) {
  for (let lane = 0; lane < 3; lane += 1) {
    context.strokeStyle = lane === game.targetLane ? accent : '#4e516c';
    context.lineWidth = lane === game.targetLane ? 8 : 3;
    context.beginPath();
    context.arc(laneX(lane), 185, lane === game.targetLane ? 66 : 48, 0, Math.PI * 2);
    context.stroke();
  }
  context.fillStyle = '#b8b8c9';
  context.font = '600 18px system-ui';
  context.fillText('Align with the bright signal lane.', 22, 68);
}

function drawPlayer(accent) {
  const x = laneX(game.lane);
  context.fillStyle = accent;
  context.fillRect(x - 30, 330, 60, 42);
  context.fillStyle = '#111322';
  context.fillRect(x - 16, 341, 32, 12);
  context.fillStyle = '#f6f4ec';
  context.fillRect(x - 19, 377, 12, 7);
  context.fillRect(x + 7, 377, 12, 7);
}

document.querySelectorAll('[data-stage]').forEach((button) => button.addEventListener('click', () => selectStage(button.dataset.stage)));
document.querySelector('[data-control="left"]').addEventListener('click', () => move(-1));
document.querySelector('[data-control="right"]').addEventListener('click', () => move(1));
action.addEventListener('click', startOrConfirm);
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  if (event.key === ' ') { event.preventDefault(); startOrConfirm(); }
});

selectStage('road');
