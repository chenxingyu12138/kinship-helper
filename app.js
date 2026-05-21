const SEX_STORAGE_KEY = "relative-helper-sex";

/** 与性别不符的称谓卡片不可点选 */
const KIN_DISABLED_BY_SEX = {
  1: ["丈夫"],
  0: ["妻子"]
};

const GRAPH_STEP = {
  me: {
    爸爸: "father",
    父亲: "father",
    妈妈: "mother",
    母亲: "mother",
    爷爷: "grandpa",
    祖父: "grandpa",
    奶奶: "grandma",
    祖母: "grandma",
    外公: "mgrandpa",
    外祖父: "mgrandpa",
    外婆: "mgrandma",
    外祖母: "mgrandma",
    哥哥: "elderBrother",
    弟弟: "youngerBrother",
    姐姐: "elderSister",
    妹妹: "youngerSister",
    儿子: "son",
    女儿: "daughter",
    老婆: "wife",
    妻子: "wife",
    老公: "husband",
    丈夫: "husband"
  },
  father: {
    爸爸: "grandpa",
    父亲: "grandpa",
    妈妈: "grandma",
    母亲: "grandma",
    哥哥: "fatherBrother",
    弟弟: "fatherYoungerBrother",
    姐姐: "auntFather",
    妹妹: "auntFather",
    儿子: "me",
    女儿: "me"
  },
  mother: {
    爸爸: "mgrandpa",
    父亲: "mgrandpa",
    妈妈: "mgrandma",
    母亲: "mgrandma",
    哥哥: "uncleMother",
    弟弟: "uncleMother",
    姐姐: "auntMother",
    妹妹: "auntMother",
    儿子: "me",
    女儿: "me"
  },
  grandpa: {
    爸爸: "tier3p",
    父亲: "tier3p",
    妈妈: "tier3m",
    母亲: "tier3m",
    爷爷: "tier3p",
    祖父: "tier3p",
    哥哥: "grandpaBrother",
    弟弟: "grandpaBrother"
  },
  grandma: { 爸爸: "tier3p", 父亲: "tier3p", 妈妈: "tier3m", 母亲: "tier3m", 姐姐: "grandpaBrother", 妹妹: "grandpaBrother" },
  grandpaBrother: { 爸爸: "tier3p", 父亲: "tier3p" },
  tier3p: { 爸爸: "tier4p", 父亲: "tier4p", 妈妈: "tier3m", 母亲: "tier3m", 爷爷: "tier4p", 祖父: "tier4p" },
  tier3m: { 爸爸: "tier4p", 父亲: "tier4p" },
  tier4p: { 爸爸: "tier5p", 父亲: "tier5p", 爷爷: "tier6p", 祖父: "tier6p" },
  tier5p: { 爸爸: "tier6p", 父亲: "tier6p", 爷爷: "tier7p", 祖父: "tier7p" },
  tier6p: { 爸爸: "tier7p", 父亲: "tier7p" },
  mgrandpa: { 爸爸: "tier3mp", 父亲: "tier3mp", 妈妈: "tier3mm", 母亲: "tier3mm" },
  mgrandma: { 爸爸: "tier3mp", 父亲: "tier3mp" },
  auntFather: { 儿子: "auntSon", 女儿: "auntSon", 丈夫: "auntHusband", 老公: "auntHusband" },
  uncleMother: { 儿子: "uncleDaughter", 女儿: "uncleDaughter" },
  wife: {
    弟弟: "brotherInLaw",
    妹妹: "sisterInLaw",
    哥哥: "brotherInLaw",
    姐姐: "sisterInLaw",
    爸爸: "wifeFather",
    父亲: "wifeFather",
    妈妈: "wifeMother",
    母亲: "wifeMother"
  },
  husband: {
    弟弟: "husbandBrother",
    姐姐: "husbandSister",
    妹妹: "husbandSister",
    哥哥: "husbandBrother",
    爸爸: "husbandFather",
    父亲: "husbandFather",
    妈妈: "husbandMother",
    母亲: "husbandMother"
  },
  son: {
    儿子: "grandson",
    女儿: "granddaughter",
    孙子: "grandson",
    孙女: "granddaughter",
    老婆: "daughterInLaw",
    妻子: "daughterInLaw"
  },
  daughter: {
    儿子: "mGrandson",
    女儿: "mGranddaughter",
    孙子: "mGrandson",
    孙女: "mGranddaughter",
    丈夫: "sonInLaw",
    老公: "sonInLaw"
  },
  grandson: { 儿子: "ggs", 女儿: "ggsDaughter", 孙子: "ggs", 孙女: "ggsDaughter" },
  granddaughter: { 儿子: "ggs", 女儿: "ggsDaughter" },
  ggs: { 儿子: "xgs", 女儿: "xgsDaughter" }
};

const els = {
  tabs: document.querySelectorAll(".tab-button"),
  panels: document.querySelectorAll(".panel"),
  chainInput: document.querySelector("#chain-input"),
  chainSubmit: document.querySelector("#chain-submit"),
  chainClear: document.querySelector("#chain-clear"),
  genderButtons: document.querySelectorAll(".gender-button"),
  answerTitle: document.querySelector("#answer-title"),
  answerSummary: document.querySelector("#answer-summary"),
  answerDetail: document.querySelector("#answer-detail"),
  answerType: document.querySelector("#answer-type"),
  pathChips: document.querySelector("#path-chips"),
  reverseInput: document.querySelector("#reverse-input"),
  reverseSubmit: document.querySelector("#reverse-submit"),
  reverseTitle: document.querySelector("#reverse-title"),
  reverseDetail: document.querySelector("#reverse-detail"),
  reverseChain: document.querySelector("#reverse-chain"),
  historyList: document.querySelector("#history-list"),
  clearHistory: document.querySelector("#clear-history"),
  mapHighlight: document.querySelector("#map-highlight"),
  familyGraph: document.querySelector("#family-graph"),
  graphNodes: document.querySelector("#graph-nodes"),
  graphLinks: document.querySelector("#graph-links")
};

let graphCatalog = [];
let activePathIds = ["me"];
let activePathLabels = ["我"];
let activeResultTitle = "";
let activeHighlightQuery = "";

function normalize(value) {
  return value
    .trim()
    .replaceAll("我", "")
    .replaceAll("的的", "的")
    .replace(/^的/, "")
    .replaceAll("父亲", "爸爸")
    .replaceAll("母亲", "妈妈")
    .replaceAll("妻子", "老婆")
    .replaceAll("丈夫", "老公")
    .replaceAll("祖父", "爷爷")
    .replaceAll("祖母", "奶奶")
    .replaceAll("外祖父", "外公")
    .replaceAll("外祖母", "外婆");
}

function getMySex() {
  const stored = localStorage.getItem(SEX_STORAGE_KEY);
  if (stored === "0" || stored === "1") return Number(stored);
  return 1;
}

function setMySex(sex) {
  localStorage.setItem(SEX_STORAGE_KEY, String(sex));
  els.genderButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.sex) === sex);
  });
  syncKinCards();
}

function canAppendKinTerm(term) {
  const sex = getMySex();
  if ((KIN_DISABLED_BY_SEX[sex] || []).includes(term)) return false;
  const current = els.chainInput.value.trim();
  const nextChain = current ? `${current}的${term}` : term;
  const text = normalize(nextChain);
  if (!text) return true;
  return kinshipOptions(text, sex, "default").length > 0;
}

function syncKinCards() {
  const sex = getMySex();
  const sexDisabled = new Set(KIN_DISABLED_BY_SEX[sex] || []);
  document.querySelectorAll("[data-kin]").forEach((button) => {
    const term = button.dataset.kin;
    const sexOff = sexDisabled.has(term);
    const pathOff = !sexOff && !canAppendKinTerm(term);
    const off = sexOff || pathOff;
    button.disabled = off;
    button.classList.toggle("kin-disabled", off);
    if (sexOff) {
      button.title = sex === 1 ? "当前为男性，无法拼接「丈夫」" : "当前为女性，无法拼接「妻子」";
    } else if (pathOff) {
      button.title = `当前关系链无法继续拼接「${term}」`;
    } else {
      button.title = "";
    }
  });
}

function kinshipOptions(text, sex, type = "default") {
  if (typeof relationship !== "function") return [];
  return relationship({ text, sex, type, reverse: false }) || [];
}

function chainToChipLabels(chainText) {
  if (!chainText) return ["我"];
  return ["我", ...chainText.split("的").filter(Boolean)];
}

function displayPathLabels(query) {
  return chainToChipLabels(normalize(query));
}

function buildGraphSub(id, chain) {
  if (typeof GRAPH_HINTS !== "undefined" && GRAPH_HINTS[id]) return GRAPH_HINTS[id];
  if (!chain) return "查询起点";

  const parts = chain.split("的").filter(Boolean);
  if (parts.length <= 2) return `我 · ${chain}`;

  const same = parts.every((part) => part === parts[0]);
  if (same && parts[0] === "爸爸") return `父系直系 · 往上${parts.length}代`;
  if (same && parts[0] === "儿子") return `父系晚辈 · 往下${parts.length}代`;
  if (same && parts[0] === "妈妈") return `母系直系 · 往上${parts.length}代`;

  const line = chain.startsWith("妈妈的") ? "母系" : chain.startsWith("爸爸的") ? "父系" : "亲属";
  return `${line} · ${parts.length}步`;
}

function getHiddenGraphIds(sex) {
  return GRAPH_HIDDEN_BY_SEX[sex] || [];
}

function resolveGraphCatalog(sex) {
  const hidden = new Set(getHiddenGraphIds(sex));
  return GRAPH_TEMPLATE.filter(([id]) => !hidden.has(id)).map(([id, chain, fallback, x, y]) => {
    const titles = chain ? kinshipOptions(chain, sex, "default") : [];
    const label = titles[0] || fallback;
    return {
      id,
      chain,
      label,
      sub: buildGraphSub(id, chain),
      x,
      y
    };
  });
}

function refreshGraphCatalog() {
  graphCatalog = resolveGraphCatalog(getMySex());
}

function buildGraphPath(query) {
  const ids = ["me"];
  let context = "me";
  const terms = normalize(query).split("的").filter(Boolean);

  function push(id) {
    if (!id || ids.at(-1) === id) return false;
    ids.push(id);
    context = id;
    return true;
  }

  terms.forEach((term) => {
    const next = GRAPH_STEP[context]?.[term];
    if (next && push(next)) return;
  });

  return ids;
}

function syncGraphFromQuery(query, resultTitle) {
  activeHighlightQuery = query;
  activePathLabels = displayPathLabels(query);
  activePathIds = buildGraphPath(query);
  activeResultTitle = resultTitle || "";
}

function inferKinType(chainText) {
  if (!chainText) return "—";
  if (/老婆|老公|丈夫|妻子|夫|妻|婿|媳|舅子|姑姐|妯娌/.test(chainText)) return "姻亲";
  if (/妈妈|母亲|外公|外婆|舅|姨/.test(chainText)) return "母系亲属";
  if (/爸爸|父亲|爷爷|奶奶|伯伯|叔叔|姑姑|姑妈/.test(chainText)) return "父系亲属";
  return "亲属关系";
}

function buildDetail(query, titles, chains) {
  const parts = [];
  if (titles.length > 1) {
    parts.push(
      `「${query}」共有 ${titles.length} 种常见称呼：${titles.join("、")}。通常需结合对方年龄、与你亲疏及当地习惯选用。`
    );
  }
  if (chains.length > 1) {
    parts.push(
      `对应 ${chains.length} 条关系链：${chains
        .map((chain, index) => `${index + 1}. ${chainToChipLabels(chain).join(" → ")}`)
        .join("；")}`
    );
  } else if (chains[0]) {
    parts.push(`算法简化链：${chainToChipLabels(chains[0]).join(" → ")}。`);
  }
  parts.push("算法已覆盖常见南北称呼与多代血亲、姻亲组合；若仍无结果，可切换性别或检查用语是否标准。");
  return parts.join("\n");
}

function computeRelation(query, sex) {
  const text = normalize(query);
  if (!text) return null;

  const titles = kinshipOptions(text, sex, "default");
  const chains = kinshipOptions(text, sex, "chain");

  if (!titles.length) {
    const sexHint =
      sex === 1
        ? "当前为「男」。若链路含丈夫、老婆等配偶关系，请改为「女」或「男」后再查。"
        : "当前为「女」。若链路含老婆、老公等配偶关系，请确认性别设置是否正确。";
    return {
      ok: false,
      title: "暂未收录",
      summary: `「${query}」在当前性别设定下没有匹配称呼。`,
      detail: `${sexHint}\n也可尝试把「父亲/母亲」写成「爸爸/妈妈」，配偶写成「老公/老婆」。`,
      type: "待确认",
      pathLabels: displayPathLabels(query)
    };
  }

  const primaryChain = chains[0] || text;
  return {
    ok: true,
    title: titles.join(" / "),
    summary:
      titles.length > 1
        ? `「${query}」可查得 ${titles.length} 种称呼：${titles.join("、")}。`
        : `「${query}」一般称呼为：${titles[0]}。`,
    detail: buildDetail(query, titles, chains.length ? chains : [text]),
    type: inferKinType(primaryChain),
    pathLabels: displayPathLabels(query),
    confidence: Math.max(42, Math.round(100 - (titles.length - 1) * 14 - (chains.length - 1) * 8))
  };
}

function renderIdleState() {
  els.answerTitle.textContent = "等待查询";
  els.answerSummary.textContent = "点击称谓卡片拼接关系，或输入后点「查询」。";
  els.answerDetail.textContent = "查询后将显示详细说明。";
  els.answerType.textContent = "—";
  activePathIds = ["me"];
  activePathLabels = ["我"];
  activeResultTitle = "";
  activeHighlightQuery = "";
  refreshGraphCatalog();
  els.mapHighlight.textContent = "当前高亮：无";
  renderPathChips(["我"]);
  renderGraph();
  syncKinCards();
  const meter = document.querySelector(".confidence-meter span");
  if (meter) meter.style.width = "0%";
}

function renderRelation(result, query) {
  els.answerTitle.textContent = result.title;
  els.answerSummary.textContent = result.summary;
  els.answerDetail.textContent = result.detail;
  els.answerType.textContent = result.type;
  syncGraphFromQuery(query, result.ok ? result.title : "");
  els.mapHighlight.textContent = result.ok
    ? `当前高亮：${activeHighlightQuery} → ${activeResultTitle}`
    : `当前高亮：${activeHighlightQuery || "无"}`;
  renderPathChips(activePathLabels);
  renderGraph();
  const meter = document.querySelector(".confidence-meter span");
  if (meter) meter.style.width = `${result.confidence || (result.ok ? 88 : 24)}%`;
}

function renderPathChips(labels) {
  els.pathChips.innerHTML = "";
  labels.forEach((label) => {
    const chip = document.createElement("span");
    chip.textContent = label;
    els.pathChips.append(chip);
  });
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("relative-helper-history") || "[]");
  } catch {
    return [];
  }
}

function saveHistory(item) {
  const history = loadHistory().filter((entry) => entry.query !== item.query);
  history.unshift(item);
  localStorage.setItem("relative-helper-history", JSON.stringify(history.slice(0, 6)));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  els.historyList.innerHTML = "";
  if (!history.length) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "查询后会自动保存在这里，方便下次家庭聚会前再看一眼。";
    els.historyList.append(empty);
    return;
  }

  history.forEach((entry) => {
    const item = document.createElement("div");
    const queryButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    item.className = "history-item";
    queryButton.type = "button";
    queryButton.className = "history-query";
    queryButton.innerHTML = `<strong>${entry.query}</strong><span>${entry.answer}</span>`;
    queryButton.addEventListener("click", () => {
      els.chainInput.value = entry.query;
      runChainQuery();
    });
    deleteButton.type = "button";
    deleteButton.className = "delete-history";
    deleteButton.setAttribute("aria-label", `删除 ${entry.query}`);
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => {
      const nextHistory = loadHistory().filter((historyItem) => historyItem.query !== entry.query);
      localStorage.setItem("relative-helper-history", JSON.stringify(nextHistory));
      renderHistory();
    });
    item.append(queryButton, deleteButton);
    els.historyList.append(item);
  });
}

function runChainQuery() {
  const query = els.chainInput.value.trim();
  if (!query) return;
  const result = computeRelation(query, getMySex());
  if (!result) return;
  renderRelation(result, query);
  if (result.ok) {
    saveHistory({ query, answer: result.title, time: Date.now() });
  }
}

function runReverseQuery() {
  const query = els.reverseInput.value.trim();
  const sex = getMySex();
  els.reverseTitle.textContent = query || "请输入称呼";

  if (!query) {
    els.reverseDetail.textContent = "输入称呼后可查看关系解释。";
    els.reverseChain.textContent = "暂无标准关系链";
    return;
  }

  const chains = kinshipOptions(query, sex, "chain");
  const titles = kinshipOptions(query, sex, "default");

  if (!chains.length) {
    els.reverseDetail.textContent = "这个称呼暂未收录，可换一个常见称呼试试，如：舅舅、姑父、表哥、表妹、伯伯、叔叔。";
    els.reverseChain.textContent = "暂无标准关系链";
    return;
  }

  els.reverseDetail.textContent =
    titles.length > 1
      ? `「${query}」在亲属称谓中常见，可与多条关系链对应。`
      : `「${query}」通常指「${chains[0]}」这类亲属关系。`;
  els.reverseChain.textContent =
    chains.length > 1 ? chains.map((chain, index) => `${index + 1}. ${chain}`).join("  ") : chains[0];
}

function renderGraph() {
  const sex = getMySex();
  const catalog = resolveGraphCatalog(sex);
  const hidden = new Set(getHiddenGraphIds(sex));
  if (activeResultTitle && activePathIds.length) {
    const leaf = catalog.find((node) => node.id === activePathIds.at(-1));
    if (leaf) leaf.label = activeResultTitle.split(" / ")[0];
  }
  if (GRAPH_VIEWBOX) {
    els.familyGraph.setAttribute("viewBox", `0 0 ${GRAPH_VIEWBOX.width} ${GRAPH_VIEWBOX.height}`);
  }
  const nodeMap = new Map(catalog.map((node) => [node.id, node]));
  const activeSet = new Set(activePathIds);
  const activePairs = new Set();

  for (let index = 0; index < activePathIds.length - 1; index += 1) {
    const pair = `${activePathIds[index]}-${activePathIds[index + 1]}`;
    activePairs.add(pair);
    activePairs.add(`${activePathIds[index + 1]}-${activePathIds[index]}`);
  }

  els.graphLinks.innerHTML = "";
  GRAPH_LINKS.forEach(([from, to]) => {
    if (hidden.has(from) || hidden.has(to)) return;
    const start = nodeMap.get(from);
    const end = nodeMap.get(to);
    if (!start || !end) return;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));
    line.setAttribute("x2", String(end.x));
    line.setAttribute("y2", String(end.y));
    const onPath = activePairs.has(`${from}-${to}`);
    line.setAttribute("class", onPath ? "graph-link highlight" : "graph-link");
    els.graphLinks.append(line);
  });

  els.graphNodes.innerHTML = "";
  catalog.forEach((node) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const caption = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const highlighted = activeSet.has(node.id);
    const isTarget = highlighted && node.id === activePathIds.at(-1) && activeResultTitle;

    rect.setAttribute("x", String(node.x - 60));
    rect.setAttribute("y", String(node.y - 28));
    rect.setAttribute("width", "120");
    rect.setAttribute("height", "56");
    rect.setAttribute(
      "class",
      isTarget ? "node-card highlight target" : highlighted ? "node-card highlight" : "node-card"
    );

    title.setAttribute("x", String(node.x));
    title.setAttribute("y", String(node.y - 3));
    title.setAttribute("class", "node-label");
    title.textContent = node.label.length > 7 ? `${node.label.slice(0, 6)}…` : node.label;

    caption.setAttribute("x", String(node.x));
    caption.setAttribute("y", String(node.y + 17));
    caption.setAttribute("class", "node-sub");
    caption.textContent = isTarget ? "本次查询结果" : node.sub;

    group.append(rect, title, caption);
    els.graphNodes.append(group);
  });
}

function startAmbientCanvas() {
  const canvas = document.querySelector("#ambient-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const points = Array.from({ length: 58 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00042,
    vy: (Math.random() - 0.5) * 0.00042
  }));

  function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
  }

  function frame() {
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.lineWidth = window.devicePixelRatio;

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > 1) point.vx *= -1;
      if (point.y < 0 || point.y > 1) point.vy *= -1;
    });

    for (let index = 0; index < points.length; index += 1) {
      const a = points[index];
      for (let next = index + 1; next < points.length; next += 1) {
        const b = points[next];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 0.18) {
          context.strokeStyle = `rgba(34, 211, 238, ${0.16 - distance * 0.58})`;
          context.beginPath();
          context.moveTo(a.x * width, a.y * height);
          context.lineTo(b.x * width, b.y * height);
          context.stroke();
        }
      }
    }

    points.forEach((point, index) => {
      context.fillStyle = index % 4 === 0 ? "rgba(240, 92, 255, 0.66)" : "rgba(103, 232, 249, 0.72)";
      context.beginPath();
      context.arc(point.x * width, point.y * height, 1.7 * window.devicePixelRatio, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  frame();
}

els.tabs.forEach((button) => {
  button.addEventListener("click", () => {
    els.tabs.forEach((tab) => tab.classList.toggle("active", tab === button));
    els.panels.forEach((panel) => panel.classList.toggle("active", panel.id === `${button.dataset.panel}-panel`));
  });
});

function appendKinTerm(term) {
  if (!canAppendKinTerm(term)) return;
  const current = els.chainInput.value.trim();
  els.chainInput.value = current ? `${current}的${term}` : term;
  els.chainInput.focus();
  syncKinCards();
}

document.querySelectorAll("[data-kin]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    appendKinTerm(button.dataset.kin);
  });
});

els.genderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMySex(Number(button.dataset.sex));
    refreshGraphCatalog();
    renderGraph();
    if (els.chainInput.value.trim()) runChainQuery();
  });
});

els.chainSubmit.addEventListener("click", runChainQuery);
els.chainClear.addEventListener("click", () => {
  els.chainInput.value = "";
  renderIdleState();
  els.chainInput.focus();
});
els.chainInput.addEventListener("input", syncKinCards);
els.chainInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runChainQuery();
});
els.reverseSubmit.addEventListener("click", runReverseQuery);
els.reverseInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runReverseQuery();
});
els.clearHistory.addEventListener("click", () => {
  localStorage.removeItem("relative-helper-history");
  renderHistory();
});

setMySex(getMySex());
syncKinCards();
refreshGraphCatalog();
renderHistory();
renderIdleState();
startAmbientCanvas();
