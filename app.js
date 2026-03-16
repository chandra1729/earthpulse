const container = document.getElementById("tiles");
const sponsorColumn = document.getElementById("sponsor-column");

async function createTiles() {
  for (let i = 0; i < CONFIG.tileCount; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";

    // CATEGORY div for title
    const category = document.createElement("div");
    category.className = "category";
    category.innerText = CONFIG.topics[i].name; // set immediately

    const headline = document.createElement("div");
    headline.className = "headline";

    tile.appendChild(category);
    tile.appendChild(headline);
    container.appendChild(tile);

    const topic = CONFIG.topics[i];
    const newsArray = await fetchNews(
      topic.query,
      CONFIG.newsItemCount,
      topic.fallback
    );

    // Add timestamps for fallback news
    const now = new Date();
    newsArray.forEach((item, idx) => {
      if (!item.time) {
        item.time = `${(idx + 1) * 2}m`; // fake timestamp, 2m, 4m, etc.
      }
    });

    startTypingLoop(headline, newsArray);
  }

  createSponsorTiles(); // rotation starts after tiles appended
}

async function fetchNews(query, count, fallback) {
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=${count}&token=${CONFIG.apiKeys.gnews}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.articles && data.articles.length > 0) {
      return data.articles.map(a => ({
        text: a.title,
        time: a.publishedAt ? formatTime(a.publishedAt) : null
      }));
    }
  } catch (e) {
    console.error("GNews error:", e);
  }
  // fallback news with default timestamps
  return fallback.map((t, idx) => ({ text: t, time: `${(idx + 1) * 2}m` }));
}

// Helper to format ISO date to "Xm"
function formatTime(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
  return diff <= 0 ? "1m" : `${diff}m`;
}

// TYPING LOOP
function startTypingLoop(container, newsArray) {
  async function render() {
    container.innerHTML = ""; // clear previous headlines
    let lastCursor = null;

    for (let i = 0; i < newsArray.length; i++) {
      const lineDiv = document.createElement("div");
      const textSpan = document.createElement("span");
      const cursor = document.createElement("span");
      cursor.className = "cursor";

      // timestamp span
      const timestampSpan = document.createElement("span");
      timestampSpan.className = "timestamp";
      if (newsArray[i].time) timestampSpan.textContent = newsArray[i].time;

      lineDiv.appendChild(textSpan);
      lineDiv.appendChild(cursor);
      lineDiv.appendChild(timestampSpan);
      container.appendChild(lineDiv);

      await typeLine(textSpan, newsArray[i].text);

      if (lastCursor) lastCursor.remove();
      lastCursor = cursor;

      await delay(1000); // short delay between signals
    }

    // AFTER all signals typed, keep static for 2 minutes
    await delay(120000);

    // Fetch new news and repeat
    render();
  }

  render();
}

// TYPE ONE LINE
function typeLine(span, text) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      span.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 80);
  });
}

// SIMPLE DELAY
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// SPONSOR CREATION & ROTATION
function createSponsorTiles() {
  CONFIG.sponsors.forEach(item => {
    const tile = document.createElement("div");
    tile.className = "sponsor-tile";

    const name = document.createElement("div");
    name.className = "sponsor-name";
    name.textContent = item.text;

    const signals = document.createElement("div");
    signals.className = "signal-box";

    tile.appendChild(name);
    tile.appendChild(signals);

    const signalLines = item.signalLines || CONFIG.fallbackSignals;
    signalLines.forEach(line => {
      const div = document.createElement("div");
      div.className = "signal-line";
      div.textContent = "> " + line;
      signals.appendChild(div);
    });

    tile.addEventListener("click", () => window.open(item.link, "_blank"));
    sponsorColumn.appendChild(tile);
  });

  startSponsorRotation();
}

let sponsorIndex = 0;
function startSponsorRotation() {
  const tiles = document.querySelectorAll(".sponsor-tile");
  if (!tiles.length) return;

  tiles.forEach(t => (t.style.display = "none"));
  tiles[sponsorIndex].style.display = "block";

  setInterval(() => {
    tiles[sponsorIndex].style.display = "none";
    sponsorIndex = (sponsorIndex + 1) % tiles.length;
    tiles[sponsorIndex].style.display = "block";
  }, 4000);
}

createTiles();
