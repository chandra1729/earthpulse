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
      return data.articles.map(a => ({ text: a.title }));
    }
  } catch (e) {
    console.error("GNews error:", e);
  }
  return fallback.map(t => ({ text: t }));
}

function startTypingLoop(container, newsArray) {
  async function render() {
    container.innerHTML = "";
    let lastCursor = null;

    for (let i = 0; i < newsArray.length; i++) {
      const lineDiv = document.createElement("div");
      const textSpan = document.createElement("span");
      const cursor = document.createElement("span");
      cursor.className = "cursor";

      lineDiv.appendChild(textSpan);
      lineDiv.appendChild(cursor);
      container.appendChild(lineDiv);

      await typeLine(textSpan, newsArray[i].text);

      if (lastCursor) lastCursor.remove();
      lastCursor = cursor;

      await delay(1000);
    }

    await delay(CONFIG.pauseTime);
    render();
  }

  render();
}

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
