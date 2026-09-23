/* =============================================================
   CAMPUS CYBER SHIELD : QUIZ LOGIC
   Flow:  Start screen -> 12 messages (answer + explanation) -> Results
   The message bank itself lives in messages.js
   ============================================================= */

// How many messages of each type go into one round (7 + 5 = 12)
const PHISHING_PER_ROUND = 7;
const GENUINE_PER_ROUND = 5;

const SLAM_NAMES = { S: "Sender", L: "Link", A: "Attachment", M: "Message" };
const CHANNEL_LABELS = { sms: "💬 SMS", email: "📧 Email", whatsapp: "🟢 WhatsApp" };

// ---------- Game state ----------
let roundMessages = [];   // the 12 messages picked for this round
let current = 0;          // position of the message on screen
let score = 0;
let answers = [];         // one entry for every answered message
let playerName = "Student";
let screenBeforeGuide = "startScreen";

// Short helper to get an element by its id
function $(id) {
  return document.getElementById(id);
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  $(screenId).classList.remove("hidden");
  window.scrollTo(0, 0);
}

// ---------- Text helpers ----------

// Fisher-Yates shuffle: returns a copy of the list in random order
function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Makes sure message text is shown as text, never run as HTML code
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Puts the player's name and school name into the text
function fillPlaceholders(text) {
  return text
    .replaceAll("{name}", () => playerName)
    .replaceAll("{school}", () => SCHOOL_NAME);
}

// Turns the special marks used in messages.js into HTML
function formatText(text) {
  let html = escapeHtml(fillPlaceholders(text));

  // {{shown|real}}  ->  a link that reveals its real address on hover
  html = html.replace(/\{\{(.+?)\|(.+?)\}\}/g, (match, shown, real) => {
    const disguised = shown !== real ? " disguised" : "";
    return `<span class="link${disguised}" tabindex="0" data-real="${real}">${shown}</span>`;
  });

  // [[text]] -> red flag      [+text+] -> trust sign
  html = html.replace(/\[\[(.+?)\]\]/g, '<mark class="red-flag">$1</mark>');
  html = html.replace(/\[\+(.+?)\+\]/g, '<mark class="trust">$1</mark>');

  return html.replaceAll("\n", "<br>");
}

// ---------- Round ----------

function startRound() {
  playerName = $("playerName").value.trim() || "Student";

  // Pick a balanced random set: 7 phishing + 5 genuine, then mix them
  const phishing = shuffle(MESSAGES.filter(m => m.isPhishing)).slice(0, PHISHING_PER_ROUND);
  const genuine = shuffle(MESSAGES.filter(m => !m.isPhishing)).slice(0, GENUINE_PER_ROUND);
  roundMessages = shuffle([...phishing, ...genuine]);

  current = 0;
  score = 0;
  answers = [];
  $("score").textContent = "0 / 0";
  $("scoreBox").classList.remove("hidden");

  showScreen("quizScreen");
  showMessage();
}

// Builds the phone/email style card for one message
function buildCard(msg) {
  let html = `
    <div class="card-head">
      <span class="channel">${CHANNEL_LABELS[msg.channel]}</span>
      <span class="from"><span class="label">From:</span> ${formatText(msg.from)}</span>
    </div>`;

  if (msg.subject) {
    html += `<div class="subject"><span class="label">Subject:</span> ${formatText(msg.subject)}</div>`;
  }
  html += `<div class="body">${formatText(msg.body)}</div>`;
  if (msg.attachment) {
    html += `<div class="attachment">📎 ${formatText(msg.attachment)}</div>`;
  }
  return html;
}

function showMessage() {
  const msg = roundMessages[current];

  $("counter").textContent = `Message ${current + 1} of ${roundMessages.length}`;
  $("progressFill").style.width = `${(current / roundMessages.length) * 100}%`;
  $("situation").innerHTML = `📍 <b>Situation:</b> ${escapeHtml(fillPlaceholders(msg.situation))}`;

  const card = $("messageCard");
  card.className = `card ${msg.channel}`;   // this also removes the "revealed" highlights
  card.innerHTML = buildCard(msg);

  // Hover, tap or keyboard focus on a link shows where it really goes
  const links = card.querySelectorAll(".link");
  $("linkPeek").textContent = links.length ? "Tip: hover over (or tap) the link to see where it really goes." : "";
  links.forEach(link => {
    const peek = () => {
      $("linkPeek").textContent = "🔗 This link really goes to: " + link.dataset.real;
    };
    link.addEventListener("mouseenter", peek);
    link.addEventListener("focus", peek);
    link.addEventListener("click", peek);
  });

  $("answerButtons").classList.remove("hidden");
  $("feedback").classList.add("hidden");
}

function answer(saidPhishing) {
  const msg = roundMessages[current];
  const correct = saidPhishing === msg.isPhishing;
  if (correct) score++;
  answers.push({ msg, saidPhishing, correct });

  $("score").textContent = `${score} / ${answers.length}`;
  $("messageCard").classList.add("revealed");   // switches on the red/green highlights
  $("linkPeek").textContent = "";               // links now show their real address themselves
  $("answerButtons").classList.add("hidden");
  showFeedback(msg, correct);
}

function showFeedback(msg, correct) {
  const verdict = msg.isPhishing ? "PHISHING 🚩" : "GENUINE ✅";
  const heading = correct
    ? `✔ Correct! This message is ${verdict}`
    : `✘ Not quite. This message is ${verdict}`;
  const listTitle = msg.isPhishing ? "Red flags that give it away:" : "Why you can trust it:";
  const legend = msg.isPhishing
    ? "The red flags are now highlighted in <mark class='red-flag'>red</mark> in the message above."
    : "The trust signs are now highlighted in <mark class='trust'>green</mark> in the message above.";

  const items = msg.points.map(p => `
    <li>
      <span class="tag tag-${p.slam}">${p.slam} · ${SLAM_NAMES[p.slam]}</span>
      ${escapeHtml(fillPlaceholders(p.text))}
    </li>`).join("");

  const isLast = current === roundMessages.length - 1;

  const box = $("feedback");
  box.className = `feedback ${correct ? "good" : "bad"}`;
  box.innerHTML = `
    <h3>${heading}</h3>
    <p class="legend">${legend}</p>
    <p><b>${listTitle}</b></p>
    <ul>${items}</ul>
    <p class="tip">💡 <b>Tip:</b> ${escapeHtml(fillPlaceholders(msg.tip))}</p>
    <button id="nextBtn" class="btn primary">${isLast ? "See my results 🏁" : "Next message →"}</button>`;

  $("nextBtn").addEventListener("click", nextMessage);
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function nextMessage() {
  current++;
  if (current < roundMessages.length) {
    showMessage();
  } else {
    showResults();
  }
}

// ---------- Results ----------

function showResults() {
  const total = answers.length;
  const percent = Math.round((score / total) * 100);

  const scamAnswers = answers.filter(a => a.msg.isPhishing);
  const scamsCaught = scamAnswers.filter(a => a.correct).length;
  const scamsMissed = scamAnswers.length - scamsCaught;
  const falseAlarms = answers.filter(a => !a.msg.isPhishing && !a.correct).length;

  let badge;
  if (percent >= 90) badge = "🏆 Cyber Shield Champion";
  else if (percent >= 70) badge = "🔍 Sharp Spotter";
  else if (percent >= 50) badge = "⚠️ Getting There";
  else badge = "📚 Needs More Practice";

  const rows = answers.map((a, i) => `
    <tr class="${a.correct ? "row-good" : "row-bad"}">
      <td>${i + 1}</td>
      <td>${escapeHtml(a.msg.title)}</td>
      <td>${a.msg.isPhishing ? "🚩 Phishing" : "✅ Genuine"}</td>
      <td>${a.saidPhishing ? "🚩 Phishing" : "✅ Genuine"}</td>
      <td>${a.correct ? "✔" : "✘"}</td>
    </tr>`).join("");

  $("resultScreen").innerHTML = `
    <h1>Round complete, ${escapeHtml(playerName)}!</h1>
    <div class="badge">${badge}</div>
    <p class="big-score">${score} / ${total} <span>(${percent}%)</span></p>

    <div class="stats">
      <div class="stat"><b>${scamsCaught} / ${scamAnswers.length}</b><span>scams caught</span></div>
      <div class="stat stat-danger"><b>${scamsMissed}</b><span>scams missed</span></div>
      <div class="stat"><b>${falseAlarms}</b><span>false alarms</span></div>
    </div>
    <p class="note">A <b>missed scam</b> is the dangerous mistake because you would have been tricked.
       A <b>false alarm</b> only means you were extra careful with a safe message.</p>

    <h3>Your answers</h3>
    <div class="table-wrap">
      <table class="review">
        <tr><th>#</th><th>Message</th><th>It was</th><th>You said</th><th></th></tr>
        ${rows}
      </table>
    </div>

    <p class="remember">🔑 <b>Remember SLAM:</b> check the <b>S</b>ender, <b>L</b>inks,
       <b>A</b>ttachments and <b>M</b>essage before you click. Never share an OTP or UPI PIN.</p>

    <div class="button-row">
      <button id="playAgainBtn" class="btn primary">🔁 Play a new round</button>
      <button id="resultGuideBtn" class="btn">📖 Red Flag Guide</button>
    </div>`;

  $("playAgainBtn").addEventListener("click", startRound);
  $("resultGuideBtn").addEventListener("click", () => openGuide("resultScreen"));
  $("progressFill").style.width = "100%";
  showScreen("resultScreen");
}

function openGuide(fromScreen) {
  screenBeforeGuide = fromScreen;
  showScreen("guideScreen");
}

// ---------- Page setup ----------

const phishingCount = MESSAGES.filter(m => m.isPhishing).length;
$("bankInfo").textContent =
  `Message bank: ${MESSAGES.length} messages (${phishingCount} phishing, ${MESSAGES.length - phishingCount} genuine). ` +
  `Every round picks ${PHISHING_PER_ROUND + GENUINE_PER_ROUND} at random, so each round is different.`;

// ---------- Buttons ----------

$("startBtn").addEventListener("click", startRound);
$("playerName").addEventListener("keydown", e => {
  if (e.key === "Enter") startRound();
});
$("guideBtn").addEventListener("click", () => openGuide("startScreen"));
$("guideBackBtn").addEventListener("click", () => showScreen(screenBeforeGuide));
$("genuineBtn").addEventListener("click", () => answer(false));
$("phishingBtn").addEventListener("click", () => answer(true));
