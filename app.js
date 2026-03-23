const container = document.getElementById("tiles");
const trendingContainer = document.getElementById("trending-signals");
const sponsorColumn = document.getElementById("sponsor-column");
const densityFill = document.getElementById("density-fill");
const signalCount = document.getElementById("signal-count");

function deriveSignals(text) {
  // Simple logic to add flavor to the 'Meaning' rows
  const isAI = text.toLowerCase().includes("ai");
  return {
    personal: isAI ? "Tool availability ↑" : "Local impact seen",
    global: "System alert active",
    future: "Trend evolving"
  };
}

function createSignal(text, color) {
  const impact = Math.floor(Math.random() * 100);
  const signals = deriveSignals(text);
  const card = document.createElement("div");
  
  // Apply 'new-item' for the entrance animation
  // Apply 'high-impact' for the glow if score > 80
  card.className = `signal-card new-item ${impact > 80 ? 'high-impact' : ''}`;
  card.style.borderLeftColor = color;

  card.innerHTML = `
    <span class="news-text">${text}</span>
    <div class="card-meta">
      <span style="color:${color}">${impact > 80 ? '● CRITICAL' : '● STABLE'}</span>
      <span>SCORE: ${impact}</span>
      <span>NOW</span>
    </div>
    <div class="meaning-panel">
      <div class="meaning-row"><span class="label">PERS:</span> <span>${signals.personal}</span></div>
      <div class="meaning-row"><span class="label">SYS:</span> <span>${signals.global}</span></div>
      <div class="meaning-row"><span class="label">FUTR:</span> <span>${signals.future}</span></div>
    </div>
  `;

  // Remove the 'new-item' class after animation ends to allow for other transitions
  setTimeout(() => {
    card.classList.remove('new-item');
  }, 1000);

  return card;
}

function updateDensity() {
  const total = document.querySelectorAll(".signal-card").length;
  signalCount.textContent = total + " SIGNALS";
  densityFill.style.width = Math.min(100, total * 6) + "%";
}

function init() {
  // 1. Trending Signals
  CONFIG.trendingSignals.forEach(s => {
    const d = document.createElement("div");
    d.className = "trending-signal";
    d.style.marginBottom = "8px";
    d.style.fontFamily = "Courier New, monospace";
    d.innerHTML = s.replace(/\./g, '<span style="color:#00ff9c">.</span>');
    trendingContainer.appendChild(d);
  });

  // 2. Build Feed Columns
  CONFIG.topics.forEach(topic => {
    const col = document.createElement("div");
    col.className = "tile-column";
    col.innerHTML = `<div class="category-header" style="color:${topic.color}">${topic.name}</div>`;
    const feed = document.createElement("div");
    feed.className = "feed";
    col.appendChild(feed);
    container.appendChild(col);

    let i = 0;
    // Start the interval for this specific column
    setInterval(() => {
      const card = createSignal(topic.fallback[i], topic.color);
      feed.prepend(card);
      
      // Keep only the most recent signals
      if (feed.children.length > 5) feed.removeChild(feed.lastChild);
      
      i = (i + 1) % topic.fallback.length;
      updateDensity();
    }, 3000 + Math.random() * 3000); // Varied timing makes it feel more "organic"
  });

  // 3. Sponsor Rotation
  CONFIG.sponsors.forEach((s, idx) => {
    const div = document.createElement("div");
    div.className = `sponsor-tile ${idx === 0 ? 'active' : ''}`;
    div.innerHTML = `<div class="sponsor-name">${s.text}</div>` + 
                    s.lines.map(l => `<div style="color:#00ff9c; font-family:monospace; margin-top:5px">> ${l}</div>`).join('');
    sponsorColumn.appendChild(div);
  });

  let sIdx = 0;
  setInterval(() => {
    const st = document.querySelectorAll(".sponsor-tile");
    if(st.length > 0) {
        st[sIdx].classList.remove("active");
        sIdx = (sIdx + 1) % st.length;
        st[sIdx].classList.add("active");
    }
  }, 5000);
}

window.onload = init;
