const container = document.getElementById("tiles");
const trendingContainer = document.getElementById("trending-signals");
const sponsorColumn = document.getElementById("sponsor-column");
const densityFill = document.getElementById("density-fill");
const signalCount = document.getElementById("signal-count");
const lastUpdatedEl = document.getElementById("last-updated");

let newsBuffers = {}; 

function getRelativeTime(timestamp) {
  const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
  return diff < 1 ? "NOW" : (diff < 60 ? `${diff}M` : `${Math.floor(diff / 60)}H`);
}

function typeWriter(element, text, speed = 15) {
  if (!element) return;
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function deriveSignals(text, topicName) {
  const lowText = text.toLowerCase();
  if (topicName.includes("Oil") || lowText.includes("oil")) {
    return { pers: "Fuel costs shift", sys: "Supply chain pressure", futr: "Green volatility" };
  } 
  if (topicName.includes("Intelligence") || lowText.includes("ai")) {
    return { pers: "New tools online", sys: "Compute demand spike", futr: "AGI timeline narrows" };
  }
  if (topicName.includes("Space") || lowText.includes("nasa") || lowText.includes("launch")) {
    return { pers: "Tech job expansion", sys: "Orbital congestion", futr: "Multi-planet colony" };
  }
  return { pers: "Local impact detected", sys: "Systemic trend", futr: "Pattern emerging" };
}

async function fetchTopicNews(topic) {
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(topic.query)}&lang=en&max=10&apikey=${CONFIG.apiKeys.gnews}`;
    const res = await fetch(url);
    const data = await res.json();
    return (data.articles && data.articles.length > 0) 
      ? data.articles.map(a => ({ title: a.title, time: a.publishedAt }))
      : topic.fallback.map(t => ({ title: t, time: new Date() }));
  } catch (e) {
    return topic.fallback.map(t => ({ title: t, time: new Date() }));
  }
}

async function refreshAllSystemData() {
  const now = new Date();
  lastUpdatedEl.textContent = `SYNC: ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  for (const topic of CONFIG.topics) {
    newsBuffers[topic.name] = await fetchTopicNews(topic);
  }
}

function createSignal(newsObj, color, topicName) {
  const signals = deriveSignals(newsObj.title, topicName);
  const card = document.createElement("div");
  
  card.className = `signal-card`;
  card.style.borderLeftColor = color;

  card.innerHTML = `
    <div class="news-header-wrap">
      <span class="news-text">${newsObj.title}</span>
      <span class="time-inline">${getRelativeTime(newsObj.time)}</span>
    </div>
    
    <div class="meaning-panel">
      <div class="meaning-row p-row"><span class="m-label">PERS</span> <span class="m-value p-val"></span></div>
      <div class="meaning-row s-row"><span class="m-label">SYS</span> <span class="m-value s-val"></span></div>
      <div class="meaning-row f-row"><span class="m-label">FUTR</span> <span class="m-value f-val"></span></div>
    </div>
  `;

  setTimeout(() => {
    typeWriter(card.querySelector('.p-val'), signals.pers);
    setTimeout(() => typeWriter(card.querySelector('.s-val'), signals.sys), 300);
    setTimeout(() => typeWriter(card.querySelector('.f-val'), signals.futr), 600);
  }, 100);

  return card;
}

async function init() {
  await refreshAllSystemData();
  setInterval(refreshAllSystemData, CONFIG.apiRefreshRate);

  CONFIG.topics.forEach(topic => {
    const col = document.createElement("div");
    col.innerHTML = `<div class="category-header" style="color:${topic.color}">${topic.name.toUpperCase()}</div>`;
    const feed = document.createElement("div");
    feed.className = "feed";
    col.appendChild(feed);
    container.appendChild(col);

    let i = 0;
    setInterval(() => {
      const newsList = newsBuffers[topic.name] || [];
      if (newsList.length > 0) {
        const card = createSignal(newsList[i], topic.color, topic.name);
        feed.prepend(card);
        if (feed.children.length > CONFIG.maxVisibleSignals) feed.removeChild(feed.lastChild);
        i = (i + 1) % newsList.length;
      }
      const total = document.querySelectorAll(".signal-card").length;
      signalCount.textContent = total + " SIGNALS ACTIVE";
      densityFill.style.width = Math.min(100, (total / (CONFIG.topics.length * CONFIG.maxVisibleSignals)) * 100) + "%";
    }, CONFIG.newsShiftInterval);
  });

  CONFIG.trendingSignals.forEach(s => {
    const d = document.createElement("div");
    d.style.marginBottom = "8px"; d.style.fontFamily = "monospace"; d.style.fontSize = "10px"; d.style.color = "#444";
    d.innerHTML = s.replace(/\./g, '<span style="color:#00ff9c">.</span>');
    trendingContainer.appendChild(d);
  });

  CONFIG.sponsors.forEach((s, idx) => {
    const div = document.createElement("div");
    div.className = `sponsor-tile ${idx === 0 ? 'active' : ''}`;
    div.innerHTML = `<div style="font-size:14px; margin-bottom:4px; color:#fff">${s.text}</div>` + 
                    s.lines.map(l => `<div style="color:#00cfff; font-size:10px; margin-top:2px">> ${l}</div>`).join('');
    sponsorColumn.appendChild(div);
  });

  let sIdx = 0;
  setInterval(() => {
    const st = document.querySelectorAll(".sponsor-tile");
    if(st.length > 1) {
      st[sIdx].classList.remove("active");
      sIdx = (sIdx + 1) % st.length;
      st[sIdx].classList.add("active");
    }
  }, 5000);
}

window.onload = init;
