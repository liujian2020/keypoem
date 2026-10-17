const DEFAULT_STROKES_PER_LINE = 200;
const MIN_STROKES_PER_LINE = 20;
const MAX_STROKES_PER_LINE = 5000;
const IDLE_AFTER_MS = 5000;

const speedProfiles = [
  {
    max: 119,
    name: "慢拍散步",
    root: 220,
    scale: [0, 3, 5, 7, 10],
    openings: ["指尖轻轻落下", "键帽慢慢醒来", "光标停在窗边", "一枚空格悄悄展开", "回车声走过黄昏", "字句沿桌面散步", "屏幕留住微光"],
    motions: ["停顿替夜色留白", "晚风数着稀疏声响", "时间在行间坐下", "安静把节拍放慢", "困意靠着括号休息", "一杯茶等到微凉", "思绪绕过小小弯路"],
    endings: ["月光刚好漫过下一行", "星星没有被惊醒", "平凡也有了回声", "远方不必急着抵达", "句号收好今日温柔", "夜晚多出一寸从容", "心事终于缓缓靠岸"]
  },
  {
    max: 239,
    name: "从容潮汐",
    root: 233.08,
    scale: [0, 2, 5, 7, 9],
    openings: ["指尖稳稳向前", "键盘涨起潮汐", "光标沿节拍散步", "字句排成小船", "回车推开一扇门", "屏幕亮起灯火", "今日铺开纸页"],
    motions: ["声响把时间铺平", "思绪顺着行间流动", "风从标点旁经过", "每次停顿都恰到好处", "段落慢慢有了方向", "黄昏跟着节奏呼吸", "灵感在手边安静生长"],
    endings: ["晴天停在下一行", "河流带走一点匆忙", "晚风捡起温柔句号", "答案正从远处靠近", "灯光替认真作证", "今日稳稳向前一页", "月色落在回车以后"]
  },
  {
    max: 359,
    name: "轻快小跑",
    root: 261.63,
    scale: [0, 2, 4, 7, 9],
    openings: ["指尖踏起鼓点", "键帽落成小雨", "光标开始小跑", "文字接连亮起", "回车推门而出", "句子跃过屏幕", "灵感忽然起风"],
    motions: ["节拍追上窗外晚霞", "思绪越过一枚逗号", "键声唤醒整条街道", "段落向前扬起风帆", "困意被远远甩开", "时间跟着脚步发亮", "每一行都跑向晴天"],
    endings: ["灯火赶来排成星群", "晚风正在前面招手", "下一页已经听见脚步", "月亮也加快了呼吸", "答案从转角探出头来", "今夜多了一点明亮", "未完的故事继续出发"]
  },
  {
    max: Infinity,
    name: "疾速流星",
    root: 293.66,
    scale: [0, 2, 4, 7, 11],
    openings: ["指尖撞出流星雨", "键盘忽然卷起疾风", "文字一路飞奔", "回车声接连起飞", "光标划破长夜", "句子点燃引擎", "屏幕升起闪电"],
    motions: ["节拍掠过整片夜空", "灵感冲过所有路口", "困意消失在上一页", "时间被甩成一束光", "段落展开银色翅膀", "键声让城市瞬间苏醒", "每个标点都迸出火花"],
    endings: ["星群在身后排成答案", "今夜拥有整片天空", "黎明提前亮了一秒", "未完的路突然有了方向", "月亮被写成发光句号", "远方已经近在下一行", "所有沉默都开始歌唱"]
  }
];

const classicalPoetryBySpeed = [
  [
    { text: "采菊东篱下，悠然见南山。", source: "陶渊明《饮酒·其五》" },
    { text: "人闲桂花落，夜静春山空。", source: "王维《鸟鸣涧》" },
    { text: "行到水穷处，坐看云起时。", source: "王维《终南别业》" },
    { text: "明月松间照，清泉石上流。", source: "王维《山居秋暝》" },
    { text: "独坐幽篁里，弹琴复长啸。", source: "王维《竹里馆》" },
    { text: "众鸟高飞尽，孤云独去闲。", source: "李白《独坐敬亭山》" },
    { text: "晚来天欲雪，能饮一杯无？", source: "白居易《问刘十九》" },
    { text: "小荷才露尖尖角，早有蜻蜓立上头。", source: "杨万里《小池》" }
  ],
  [
    { text: "海上生明月，天涯共此时。", source: "张九龄《望月怀远》" },
    { text: "潮平两岸阔，风正一帆悬。", source: "王湾《次北固山下》" },
    { text: "绿树村边合，青山郭外斜。", source: "孟浩然《过故人庄》" },
    { text: "山光悦鸟性，潭影空人心。", source: "常建《题破山寺后禅院》" },
    { text: "野旷天低树，江清月近人。", source: "孟浩然《宿建德江》" },
    { text: "两个黄鹂鸣翠柳，一行白鹭上青天。", source: "杜甫《绝句》" },
    { text: "沾衣欲湿杏花雨，吹面不寒杨柳风。", source: "志南《绝句》" },
    { text: "等闲识得东风面，万紫千红总是春。", source: "朱熹《春日》" }
  ],
  [
    { text: "竹外桃花三两枝，春江水暖鸭先知。", source: "苏轼《惠崇春江晚景》" },
    { text: "儿童急走追黄蝶，飞入菜花无处寻。", source: "杨万里《宿新市徐公店》" },
    { text: "春风得意马蹄疾，一日看尽长安花。", source: "孟郊《登科后》" },
    { text: "两岸猿声啼不住，轻舟已过万重山。", source: "李白《早发白帝城》" },
    { text: "千里莺啼绿映红，水村山郭酒旗风。", source: "杜牧《江南春》" },
    { text: "晴空一鹤排云上，便引诗情到碧霄。", source: "刘禹锡《秋词》" },
    { text: "最爱湖东行不足，绿杨阴里白沙堤。", source: "白居易《钱塘湖春行》" },
    { text: "日出江花红胜火，春来江水绿如蓝。", source: "白居易《忆江南》" }
  ],
  [
    { text: "黄河之水天上来，奔流到海不复回。", source: "李白《将进酒》" },
    { text: "长风破浪会有时，直挂云帆济沧海。", source: "李白《行路难·其一》" },
    { text: "大鹏一日同风起，扶摇直上九万里。", source: "李白《上李邕》" },
    { text: "飞流直下三千尺，疑是银河落九天。", source: "李白《望庐山瀑布》" },
    { text: "惊涛拍岸，卷起千堆雪。", source: "苏轼《念奴娇·赤壁怀古》" },
    { text: "银瓶乍破水浆迸，铁骑突出刀枪鸣。", source: "白居易《琵琶行》" },
    { text: "仰天大笑出门去，我辈岂是蓬蒿人。", source: "李白《南陵别儿童入京》" },
    { text: "会当凌绝顶，一览众山小。", source: "杜甫《望岳》" }
  ]
];

const characterPoemProfiles = [
  {
    frames: ["暮色", "月下", "夜半", "雨后", "溪畔", "竹外", "灯前", "窗边"],
    images: ["孤云", "疏影", "微风", "清泉", "松声", "茶烟", "残雪", "流萤"],
    verbs: ["入", "照", "过", "落", "伴", "随", "泊", "绕"],
    destinations: ["小窗", "空庭", "远山", "寒江", "闲梦", "诗心", "归舟", "客衣"]
  },
  {
    frames: ["长堤", "江上", "城南", "桥边", "晨光", "晴川", "柳岸", "帆外"],
    images: ["潮声", "行云", "青山", "白帆", "归鸟", "清风", "波光", "钟声"],
    verbs: ["过", "映", "送", "连", "向", "入", "随", "渡"],
    destinations: ["远帆", "平沙", "长天", "故园", "前川", "客舟", "云涯", "诗怀"]
  },
  {
    frames: ["春风", "花间", "晴空", "溪桥", "新晴", "莺外", "纸上", "云边"],
    images: ["纸鸢", "飞花", "流莺", "晴光", "燕影", "桃枝", "蝶梦", "歌声"],
    verbs: ["越", "逐", "穿", "舞", "追", "上", "摇", "唤"],
    destinations: ["晴川", "青天", "画桥", "芳洲", "春山", "花城", "碧霄", "东风"]
  },
  {
    frames: ["长风", "惊雷", "星火", "狂涛", "飞瀑", "云海", "疾雨", "剑光"],
    images: ["奔雷", "飞舟", "流星", "怒潮", "天马", "银龙", "烈焰", "长虹"],
    verbs: ["破", "逐", "裂", "越", "卷", "冲", "震", "横"],
    destinations: ["云关", "万山", "沧海", "长天", "九霄", "天门", "星河", "峰巅"]
  }
];

function buildCharacterPool() {
  const semanticCharacters = characterPoemProfiles
    .flatMap((profile) => [...profile.frames, ...profile.images, ...profile.verbs, ...profile.destinations])
    .join("");
  const characters = [...new Set([...semanticCharacters])];
  const seen = new Set(characters);
  for (let codePoint = 0x4e00; characters.length < 5000 && codePoint <= 0x9fff; codePoint += 1) {
    const character = String.fromCodePoint(codePoint);
    if (!seen.has(character)) {
      seen.add(character);
      characters.push(character);
    }
  }
  return Object.freeze(characters.slice(0, 5000));
}

const fiveThousandCharacterPool = buildCharacterPool();
const fiveThousandCharacterSet = new Set(fiveThousandCharacterPool);

const poemMusicMoods = [
  { name: "月夜清音", pattern: /月|夜|暮|星|梦|雪|霜|孤|静|寒/g, root: 220, scale: [0, 3, 5, 7, 10], waveform: "sine" },
  { name: "山水流音", pattern: /山|水|江|河|海|泉|溪|潮|舟|雨|云/g, root: 246.94, scale: [0, 2, 5, 7, 9], waveform: "triangle" },
  { name: "春日明调", pattern: /春|花|晴|光|鸟|莺|燕|蝶|风|柳|桃/g, root: 261.63, scale: [0, 2, 4, 7, 9], waveform: "triangle" },
  { name: "风雷壮歌", pattern: /雷|剑|破|奔|怒|烈|焰|狂|涛|瀑|鹏|凌/g, root: 293.66, scale: [0, 2, 4, 7, 11], waveform: "sawtooth" },
  { name: "纸上清歌", pattern: /字|句|诗|纸|窗|灯|茶|声|心|回/g, root: 233.08, scale: [0, 3, 5, 7, 10], waveform: "triangle" }
];

const elements = {
  pad: document.querySelector("#writingPad"),
  strokeCount: document.querySelector("#strokeCount"),
  timeCount: document.querySelector("#timeCount"),
  lineCount: document.querySelector("#lineCount"),
  poemLines: document.querySelector("#poemLines"),
  remaining: document.querySelector("#remainingCount"),
  segment: document.querySelector("#segmentCount"),
  percent: document.querySelector("#progressPercent"),
  progressTrack: document.querySelector("#progressTrack"),
  progressFill: document.querySelector("#progressFill"),
  targetInput: document.querySelector("#targetInput"),
  poemSourceMode: document.querySelector("#poemSourceMode"),
  targetBadge: document.querySelector("#targetBadge"),
  targetDenominator: document.querySelector("#targetDenominator"),
  stepTarget: document.querySelector("#stepTarget"),
  clearInputButton: document.querySelector("#clearInputButton"),
  pauseButton: document.querySelector("#pauseButton"),
  clearHistoryButton: document.querySelector("#clearHistoryButton"),
  resetButton: document.querySelector("#resetButton"),
  listenStatus: document.querySelector("#listenStatus"),
  statusText: document.querySelector("#statusText"),
  cursorLine: document.querySelector("#cursorLine"),
  cursorColumn: document.querySelector("#cursorColumn"),
  currentSpeed: document.querySelector("#currentSpeed"),
  todayDate: document.querySelector("#todayDate"),
  soundtrack: document.querySelector("#soundtrack"),
  musicButton: document.querySelector("#musicButton"),
  musicButtonIcon: document.querySelector("#musicButtonIcon"),
  musicStatus: document.querySelector("#musicStatus"),
  generateCardButton: document.querySelector("#generateCardButton"),
  copyPoemButton: document.querySelector("#copyPoemButton"),
  shareDialog: document.querySelector("#shareDialog"),
  closeDialogButton: document.querySelector("#closeDialogButton"),
  shareDate: document.querySelector("#shareDate"),
  sharePoem: document.querySelector("#sharePoem"),
  shareStrokes: document.querySelector("#shareStrokes"),
  shareTime: document.querySelector("#shareTime"),
  shareLines: document.querySelector("#shareLines"),
  copyProgressButton: document.querySelector("#copyProgressButton"),
  toast: document.querySelector("#toast")
};

const todayKey = new Intl.DateTimeFormat("sv-SE").format(new Date());
const storageKey = `keypoem-session-${todayKey}`;
const state = loadState();
let lastStrokeAt = 0;
let saveTimer;
let audioContext;
let scheduledTones = [];
let musicEndTimer;
let isMusicPlaying = false;
let playingLineIndex = null;

function normalizeTarget(value) {
  const parsed = Math.round(Number(value));
  if (!Number.isFinite(parsed)) return DEFAULT_STROKES_PER_LINE;
  return Math.min(MAX_STROKES_PER_LINE, Math.max(MIN_STROKES_PER_LINE, parsed));
}

function loadState() {
  const empty = {
    strokes: 0,
    strokesIntoLine: 0,
    strokesPerLine: DEFAULT_STROKES_PER_LINE,
    activeSeconds: 0,
    lines: [],
    lineSpeeds: [],
    lineSources: [],
    speedSamples: [],
    sourceMode: "mixed",
    generationMode: "speed-v1",
    content: "",
    paused: false
  };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved !== "object") return empty;
    const strokes = Number.isFinite(saved.strokes) ? Math.max(0, saved.strokes) : 0;
    const strokesPerLine = normalizeTarget(saved.strokesPerLine);
    const legacyProgress = strokes % strokesPerLine;
    const storedLines = Array.isArray(saved.lines) ? saved.lines.filter((line) => typeof line === "string") : [];
    const isSpeedMode = saved.generationMode === "speed-v1";
    const lines = isSpeedMode ? storedLines : storedLines.map((_, index) => makePoemLine(index, 180));
    const savedLineSpeeds = Array.isArray(saved.lineSpeeds) ? saved.lineSpeeds : [];
    const savedLineSources = Array.isArray(saved.lineSources) ? saved.lineSources : [];
    const sourceMode = ["mixed", "library", "generated", "characters"].includes(saved.sourceMode) ? saved.sourceMode : "mixed";
    return {
      strokes,
      strokesIntoLine: Number.isFinite(saved.strokesIntoLine)
        ? Math.min(strokesPerLine - 1, Math.max(0, saved.strokesIntoLine))
        : legacyProgress,
      strokesPerLine,
      activeSeconds: Number.isFinite(saved.activeSeconds) ? Math.max(0, saved.activeSeconds) : 0,
      lines,
      lineSpeeds: lines.map((_, index) => Number.isFinite(savedLineSpeeds[index]) ? savedLineSpeeds[index] : 180),
      lineSources: lines.map((_, index) => typeof savedLineSources[index] === "string" ? savedLineSources[index] : "节奏原创"),
      speedSamples: Array.isArray(saved.speedSamples)
        ? saved.speedSamples.filter((sample) => Number.isFinite(sample) && sample >= 35 && sample <= IDLE_AFTER_MS).slice(-80)
        : [],
      sourceMode,
      generationMode: "speed-v1",
      content: typeof saved.content === "string" ? saved.content : "",
      paused: Boolean(saved.paused)
    };
  } catch {
    return empty;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function queueSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(saveState, 250);
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return hours > 0
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDate() {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  }).format(new Date());
}

function typingSpeed() {
  if (state.speedSamples.length === 0) return 0;
  const sorted = [...state.speedSamples].sort((left, right) => left - right);
  const trimCount = sorted.length >= 10 ? Math.floor(sorted.length * 0.1) : 0;
  const stableSamples = sorted.slice(trimCount, sorted.length - trimCount || sorted.length);
  const averageInterval = stableSamples.reduce((sum, sample) => sum + sample, 0) / stableSamples.length;
  return Math.round(60000 / averageInterval);
}

function getSpeedProfile(speed) {
  return speedProfiles.find((profile) => speed <= profile.max) || speedProfiles.at(-1);
}

function speedToTempo(speed) {
  return Math.round(Math.min(132, Math.max(58, 52 + speed * 0.2)));
}

function registerStrokeTime(timestamp) {
  if (lastStrokeAt > 0) {
    const interval = timestamp - lastStrokeAt;
    if (interval >= 35 && interval <= IDLE_AFTER_MS) {
      state.speedSamples.push(interval);
      state.speedSamples = state.speedSamples.slice(-80);
    } else if (interval > IDLE_AFTER_MS) {
      state.speedSamples = [];
    }
  }
  lastStrokeAt = timestamp;
}

function rhythmSeed(index, speed, samples = []) {
  let seed = (Math.imul(index + 1, 2654435761) ^ Math.round(speed * 97)) >>> 0;
  samples.slice(-32).forEach((sample) => {
    seed ^= Math.round(sample);
    seed = Math.imul(seed, 16777619) >>> 0;
  });
  return seed;
}

function seededIndex(seed, salt, length) {
  let value = (seed ^ salt) >>> 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  return (value >>> 0) % length;
}

function makePoemLine(index, speed, samples = []) {
  const profile = getSpeedProfile(speed);
  const seed = rhythmSeed(index, speed, samples);
  const opening = profile.openings[seededIndex(seed, 0x45d9f3b, profile.openings.length)];
  const motion = profile.motions[seededIndex(seed, 0x119de1f3, profile.motions.length)];
  const ending = profile.endings[seededIndex(seed, 0x3449d, profile.endings.length)];
  const form = seededIndex(seed, 0x9e3779b9, 4);

  if (form === 1) return `${opening}；${motion}，${ending}。`;
  if (form === 2) return `${opening}，${ending}；${motion}。`;
  if (form === 3) return `${opening}，${motion}——${ending}。`;
  return `${opening}，${motion}，${ending}。`;
}

function makeCharacterPoem(index, speed, samples = []) {
  const speedProfile = getSpeedProfile(speed);
  const profileIndex = speedProfiles.indexOf(speedProfile);
  const profile = characterPoemProfiles[profileIndex];
  const seed = rhythmSeed(index, speed, samples);
  const buildLine = (salt) => {
    const frame = profile.frames[seededIndex(seed, salt ^ 0x13579bdf, profile.frames.length)];
    const image = profile.images[seededIndex(seed, salt ^ 0x2468ace0, profile.images.length)];
    const verb = profile.verbs[seededIndex(seed, salt ^ 0x10293847, profile.verbs.length)];
    const destination = profile.destinations[seededIndex(seed, salt ^ 0x56473829, profile.destinations.length)];
    return `${frame}${image}${verb}${destination}`;
  };

  const firstLine = buildLine(0x1f123bb5);
  let secondLine = buildLine(0x5f356495);
  if (secondLine === firstLine) secondLine = buildLine(0x7a4d2c19);
  return `${firstLine}，${secondLine}。`;
}

function makePoemEntry(index, speed, samples, mode) {
  const profile = getSpeedProfile(speed);
  const seed = rhythmSeed(index, speed, samples);
  const mixedChoice = seededIndex(seed, 0x7f4a7c15, 3);
  const useLibrary = mode === "library" || (mode === "mixed" && mixedChoice === 0);
  const useCharacters = mode === "characters" || (mode === "mixed" && mixedChoice === 1);

  if (useLibrary) {
    const profileIndex = speedProfiles.indexOf(profile);
    const library = classicalPoetryBySpeed[profileIndex];
    const poem = library[seededIndex(seed, 0x6c8e9cf5, library.length)];
    return { text: poem.text, source: poem.source };
  }

  if (useCharacters) {
    return { text: makeCharacterPoem(index, speed, samples), source: `五千字池 · ${profile.name}七言` };
  }

  return { text: makePoemLine(index, speed, samples), source: "节奏原创" };
}

function isCountableKey(event) {
  if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return false;
  return event.key.length === 1 || ["Enter", "Backspace", "Delete", "Tab"].includes(event.key);
}

function recordStroke(event) {
  if (state.paused || !isCountableKey(event)) return;
  if (event.key === "Tab") {
    event.preventDefault();
    insertTab();
  }

  state.strokes += 1;
  state.strokesIntoLine += 1;
  registerStrokeTime(Date.now());
  if (state.strokesIntoLine >= state.strokesPerLine) {
    const speed = typingSpeed();
    state.strokesIntoLine = 0;
    const entry = makePoemEntry(state.lines.length, speed, state.speedSamples, state.sourceMode);
    state.lines.push(entry.text);
    state.lineSpeeds.push(speed);
    state.lineSources.push(entry.source);
    announceNewLine(speed);
  }
  render();
  queueSave();
}

function insertTab() {
  const start = elements.pad.selectionStart;
  const end = elements.pad.selectionEnd;
  elements.pad.value = `${elements.pad.value.slice(0, start)}  ${elements.pad.value.slice(end)}`;
  elements.pad.selectionStart = elements.pad.selectionEnd = start + 2;
  updateContent();
}

function updateContent() {
  state.content = elements.pad.value;
  updateCursor();
  queueSave();
}

function updateCursor() {
  const beforeCursor = elements.pad.value.slice(0, elements.pad.selectionStart);
  const rows = beforeCursor.split("\n");
  elements.cursorLine.textContent = rows.length;
  elements.cursorColumn.textContent = rows.at(-1).length + 1;
}

function announceNewLine(speed) {
  const profile = getSpeedProfile(speed);
  elements.poemLines.classList.add("just-wrote");
  showToast(`下一句诗长出来了 · ${profile.name} ${speed} KPM`);
  window.setTimeout(() => elements.poemLines.scrollTo({ top: elements.poemLines.scrollHeight, behavior: "smooth" }), 50);
}

function changeTarget() {
  const previousTarget = state.strokesPerLine;
  const nextTarget = normalizeTarget(elements.targetInput.value);
  const currentRatio = state.strokesIntoLine / previousTarget;
  state.strokesPerLine = nextTarget;
  state.strokesIntoLine = Math.min(nextTarget - 1, Math.round(currentRatio * nextTarget));
  elements.targetInput.value = nextTarget;
  saveState();
  render();
  showToast(`已改为每 ${nextTarget} 次写一句`);
}

function changeSourceMode() {
  const mode = elements.poemSourceMode.value;
  state.sourceMode = ["mixed", "library", "generated", "characters"].includes(mode) ? mode : "mixed";
  saveState();
  const labels = { mixed: "三路混合", library: "古诗词库", generated: "节奏原创", characters: "五千字造诗" };
  showToast(`后续诗句将使用：${labels[state.sourceMode]}`);
}

function render() {
  const segmentStrokes = state.strokesIntoLine;
  const remaining = state.strokesPerLine - segmentStrokes;
  const progress = (segmentStrokes / state.strokesPerLine) * 100;

  elements.strokeCount.textContent = state.strokes.toLocaleString("zh-CN");
  elements.timeCount.textContent = formatTime(state.activeSeconds);
  elements.lineCount.textContent = state.lines.length;
  elements.currentSpeed.textContent = typingSpeed() || "--";
  elements.remaining.textContent = remaining;
  elements.segment.textContent = segmentStrokes;
  elements.percent.textContent = `${Math.round(progress)}%`;
  elements.progressFill.style.width = `${progress}%`;
  elements.progressTrack.setAttribute("aria-valuenow", segmentStrokes);
  elements.progressTrack.setAttribute("aria-valuemax", state.strokesPerLine);
  elements.targetInput.value = state.strokesPerLine;
  elements.poemSourceMode.value = state.sourceMode;
  elements.targetBadge.textContent = state.strokesPerLine;
  elements.targetDenominator.textContent = state.strokesPerLine;
  elements.stepTarget.textContent = state.strokesPerLine;
  elements.pauseButton.textContent = state.paused ? "继续记录" : "暂停记录";
  elements.pauseButton.classList.toggle("active", state.paused);
  elements.pad.disabled = state.paused;
  renderStatus();
  renderPoem();
  renderMusicControl();
}

function renderPoem() {
  if (state.lines.length === 0) {
    elements.poemLines.innerHTML = `<div class="empty-poem"><span>⌨</span><p>诗还没来。<br>先敲下今天的第一个字吧。</p></div>`;
    return;
  }
  elements.poemLines.innerHTML = state.lines.map((line, index) => {
    const speed = state.lineSpeeds[index] || 180;
    const profile = getSpeedProfile(speed);
    const source = state.lineSources[index] || "节奏原创";
    return `<article class="poem-entry"><p class="poem-line" data-index="${String(index + 1).padStart(2, "0")}">${escapeHtml(line)}<small>${speed} KPM · ${profile.name} · ${escapeHtml(source)}</small></p><button class="line-music-button" type="button" data-line-music data-line-index="${index}" aria-label="播放第 ${index + 1} 句诗的音乐">♫ 此句成曲</button></article>`;
  }).join("");
}

function analyzePoemMood(text) {
  let selected = poemMusicMoods.at(-1);
  let highestScore = 0;
  poemMusicMoods.forEach((mood) => {
    const score = (text.match(mood.pattern) || []).length;
    if (score > highestScore) {
      highestScore = score;
      selected = mood;
    }
  });
  return selected;
}

function composePoem(lines, lineSpeeds) {
  const startIndex = Math.max(0, lines.length - 6);
  const selectedLines = lines.slice(startIndex);
  const selectedSpeeds = selectedLines.map((_, index) => lineSpeeds[startIndex + index] || 180);
  const poemMood = analyzePoemMood(selectedLines.join(""));
  const notes = [];
  let cursor = 0;

  selectedLines.forEach((line, lineIndex) => {
    const speed = selectedSpeeds[lineIndex];
    const tempo = speedToTempo(speed);
    const beat = 60 / tempo;
    const desiredNoteCount = Math.min(12, Math.max(5, Math.round(speed / 38)));
    const characters = [...line].filter((character) => /\p{Script=Han}/u.test(character));
    const stride = Math.max(1, Math.floor(characters.length / desiredNoteCount));
    const melodyCharacters = characters.filter((_, index) => index % stride === 0).slice(0, desiredNoteCount);
    const noteLength = speed < 120 ? beat : speed < 360 ? beat * 0.55 : beat * 0.38;

    melodyCharacters.forEach((character, noteIndex) => {
      const code = character.codePointAt(0);
      const nextCode = melodyCharacters[(noteIndex + 1) % melodyCharacters.length].codePointAt(0);
      const degree = (code + nextCode + noteIndex + lineIndex) % poemMood.scale.length;
      const interval = poemMood.scale[degree];
      const octave = speed >= 240 && (code + noteIndex) % 5 === 0 ? 12 : 0;
      const duration = code % 4 === 0 ? noteLength * 1.45 : noteLength;
      notes.push({
        character,
        frequency: poemMood.root * (2 ** ((interval + octave) / 12)),
        start: cursor,
        duration,
        waveform: poemMood.waveform,
        lineStart: noteIndex === 0
      });
      cursor += noteLength;
    });
    cursor += beat * (speed < 120 ? 1 : 0.5);
  });

  const averageSpeed = Math.round(selectedSpeeds.reduce((sum, speed) => sum + speed, 0) / selectedSpeeds.length);
  return {
    mood: { name: poemMood.name, tempo: speedToTempo(averageSpeed), speed: averageSpeed },
    notes,
    duration: cursor
  };
}

function scheduleTone(frequency, start, duration, type = "triangle", volume = 0.055) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.04);
  oscillator.addEventListener("ended", () => {
    oscillator.disconnect();
    gain.disconnect();
  });
  scheduledTones.push(oscillator);
}

async function toggleMusic(lineIndex = null) {
  const requestedLineIndex = Number.isInteger(lineIndex) ? lineIndex : null;
  const isSameTarget = isMusicPlaying && playingLineIndex === requestedLineIndex;
  if (isMusicPlaying) {
    stopMusic(false);
    if (isSameTarget) {
      showToast(requestedLineIndex === null ? "今日合奏已停止" : `第 ${requestedLineIndex + 1} 句音乐已停止`);
      return;
    }
  }
  if (state.lines.length === 0) {
    showToast("先写出一句诗，再让它唱起来");
    return;
  }
  if (requestedLineIndex !== null && !state.lines[requestedLineIndex]) {
    showToast("这句诗暂时找不到了");
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    showToast("当前浏览器暂不支持诗句成曲");
    return;
  }

  try {
    audioContext ||= new AudioContextClass();
    if (audioContext.state === "suspended") await audioContext.resume();
    const playbackLines = requestedLineIndex === null ? state.lines : [state.lines[requestedLineIndex]];
    const playbackSpeeds = requestedLineIndex === null ? state.lineSpeeds : [state.lineSpeeds[requestedLineIndex] || 180];
    const composition = composePoem(playbackLines, playbackSpeeds);
    const beginsAt = audioContext.currentTime + 0.08;
    scheduledTones = [];

    composition.notes.forEach((note) => {
      const volume = note.waveform === "sawtooth" ? 0.035 : 0.055;
      scheduleTone(note.frequency, beginsAt + note.start, note.duration, note.waveform, volume);
      if (note.lineStart) {
        scheduleTone(note.frequency / 2, beginsAt + note.start, Math.min(note.duration * 2.5, 1.8), "sine", 0.025);
      }
    });

    isMusicPlaying = true;
    playingLineIndex = requestedLineIndex;
    const playbackLabel = requestedLineIndex === null ? "今日合奏" : `第 ${requestedLineIndex + 1} 句`;
    elements.musicStatus.textContent = `${playbackLabel} · ${composition.mood.name} · ${composition.mood.speed} KPM → ${composition.mood.tempo} BPM`;
    renderMusicControl();
    musicEndTimer = window.setTimeout(() => stopMusic(false), (composition.duration + 0.4) * 1000);
  } catch {
    stopMusic(false);
    showToast("音乐生成失败，请再试一次");
  }
}

function stopMusic(showMessage = true) {
  window.clearTimeout(musicEndTimer);
  scheduledTones.forEach((tone) => {
    try { tone.stop(); } catch { /* 音符可能已经自然结束 */ }
  });
  scheduledTones = [];
  isMusicPlaying = false;
  playingLineIndex = null;
  renderMusicControl();
  if (showMessage) showToast("音乐停在这一行");
}

function renderMusicControl() {
  const hasPoem = state.lines.length > 0;
  const isFullCompositionPlaying = isMusicPlaying && playingLineIndex === null;
  elements.musicButton.disabled = !hasPoem;
  elements.musicButtonIcon.textContent = isFullCompositionPlaying ? "■" : "▶";
  elements.musicButton.setAttribute("aria-label", isFullCompositionPlaying ? "停止今日诗句合奏" : "播放今日诗句合奏");
  elements.soundtrack.classList.toggle("playing", isMusicPlaying);
  elements.poemLines.querySelectorAll?.("[data-line-music]").forEach((button) => {
    const lineIndex = Number(button.dataset.lineIndex);
    const isThisLinePlaying = isMusicPlaying && playingLineIndex === lineIndex;
    button.classList.toggle("playing", isThisLinePlaying);
    button.textContent = isThisLinePlaying ? "■ 停止此句" : "♫ 此句成曲";
  });
  if (!isMusicPlaying) {
    elements.musicStatus.textContent = hasPoem
      ? `${state.lines.length} 句均已独立谱曲 · 点击播放今日合奏`
      : "写出第一句后，音乐就会出现";
  }
}

function renderStatus() {
  const isTyping = !state.paused && Date.now() - lastStrokeAt < IDLE_AFTER_MS;
  elements.listenStatus.classList.toggle("typing", isTyping);
  elements.listenStatus.classList.toggle("paused", state.paused);
  const speed = typingSpeed();
  elements.statusText.textContent = state.paused
    ? "已经暂停"
    : isTyping
      ? speed ? `正在测量节奏 · ${speed} KPM` : "正在测量节奏"
      : "等待落笔";
}

function togglePause() {
  state.paused = !state.paused;
  lastStrokeAt = 0;
  state.speedSamples = [];
  saveState();
  render();
  if (!state.paused) elements.pad.focus();
  showToast(state.paused ? "记录暂停，放心摸鱼" : "记录继续，开始敲诗");
}

function clearInput() {
  if (!state.content) {
    showToast("书写区已经是空的");
    return;
  }
  if (!window.confirm("确定清空书写区内容吗？敲击数、计时和诗句都会保留。")) return;
  state.content = "";
  elements.pad.value = "";
  saveState();
  updateCursor();
  if (!state.paused) elements.pad.focus();
  showToast("输入已清空，今日诗句仍为你保留");
}

function clearHistory() {
  try {
    const historyKeys = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith("keypoem-session-") && key !== storageKey) historyKeys.push(key);
    }
    if (historyKeys.length === 0) {
      showToast("还没有往日记录需要清除");
      return;
    }
    if (!window.confirm(`确定删除 ${historyKeys.length} 天的历史记录吗？今天的数据会保留。`)) return;
    historyKeys.forEach((key) => localStorage.removeItem(key));
    showToast(`已清除 ${historyKeys.length} 天的历史，今天仍被保留`);
  } catch {
    showToast("无法访问本地历史记录");
  }
}

function resetToday() {
  if (!window.confirm("确定清空今天的敲击、诗句和书写内容吗？此操作无法撤销。")) return;
  stopMusic(false);
  state.strokes = 0;
  state.strokesIntoLine = 0;
  state.activeSeconds = 0;
  state.lines = [];
  state.lineSpeeds = [];
  state.lineSources = [];
  state.speedSamples = [];
  state.content = "";
  state.paused = false;
  lastStrokeAt = 0;
  elements.pad.value = "";
  saveState();
  updateCursor();
  render();
  showToast("今日纸张已经翻新");
}

function poemText() {
  const lines = state.lines.length
    ? state.lines.map((line, index) => {
        const source = state.lineSources[index];
        return source && source !== "节奏原创" ? `${line} —— ${source}` : line;
      })
    : ["诗还没写完，键盘正在等第一阵风。"];
  return `《今日键盘耕作簿》\n${lines.join("\n")}\n\n敲击 ${state.strokes} 次 · 活跃 ${formatTime(state.activeSeconds)} · 写成 ${state.lines.length} 行诗`;
}

function openShareDialog() {
  elements.shareDate.textContent = formatDate();
  const shareLines = state.lines.length ? state.lines : ["诗还没写完，键盘正在等第一阵风。"];
  elements.sharePoem.innerHTML = shareLines.map((line, index) => {
    const source = state.lineSources[index];
    const credit = source && source !== "节奏原创" ? `<small>—— ${escapeHtml(source)}</small>` : "";
    return `<p>${escapeHtml(line)}${credit}</p>`;
  }).join("");
  elements.shareStrokes.textContent = state.strokes.toLocaleString("zh-CN");
  elements.shareTime.textContent = formatTime(state.activeSeconds);
  elements.shareLines.textContent = `${state.lines.length} 行`;
  elements.shareDialog.showModal();
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  showToast(message);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => elements.toast.classList.remove("show"), 1800);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

elements.pad.value = state.content;
elements.todayDate.textContent = formatDate();
elements.pad.addEventListener("keydown", recordStroke);
elements.pad.addEventListener("input", updateContent);
elements.pad.addEventListener("click", updateCursor);
elements.pad.addEventListener("keyup", updateCursor);
elements.targetInput.addEventListener("change", changeTarget);
elements.targetInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    changeTarget();
    elements.pad.focus();
  }
});
elements.poemSourceMode.addEventListener("change", changeSourceMode);
elements.pauseButton.addEventListener("click", togglePause);
elements.clearInputButton.addEventListener("click", clearInput);
elements.musicButton.addEventListener("click", () => toggleMusic());
elements.poemLines.addEventListener("click", (event) => {
  const button = event.target.closest("[data-line-music]");
  if (button) toggleMusic(Number(button.dataset.lineIndex));
});
elements.clearHistoryButton.addEventListener("click", clearHistory);
elements.resetButton.addEventListener("click", resetToday);
elements.generateCardButton.addEventListener("click", openShareDialog);
elements.closeDialogButton.addEventListener("click", () => elements.shareDialog.close());
elements.shareDialog.addEventListener("click", (event) => {
  if (event.target === elements.shareDialog) elements.shareDialog.close();
});
elements.copyPoemButton.addEventListener("click", () => copyText(poemText(), "今日小诗已复制"));
elements.copyProgressButton.addEventListener("click", () => copyText(`${poemText()}\n\n为什么做了一晚上？因为敲字写诗很解压。`, "进度笺已复制，去分享吧"));

window.setInterval(() => {
  const isActivelyTyping = !state.paused && lastStrokeAt > 0 && Date.now() - lastStrokeAt < IDLE_AFTER_MS;
  if (isActivelyTyping) {
    state.activeSeconds += 1;
    saveState();
    elements.timeCount.textContent = formatTime(state.activeSeconds);
  }
  renderStatus();
}, 1000);

window.addEventListener("beforeunload", saveState);
updateCursor();
render();
