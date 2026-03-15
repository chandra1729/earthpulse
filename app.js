const container = document.getElementById("tiles");
const sponsorColumn = document.getElementById("sponsor-column");

// -----------------------------
// Fetch news from GNews or fallback
// -----------------------------
async function fetchNews(topicConfig, maxItems = 10) {
  const apiKey = CONFIG.apiKeys.gnews;
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(topicConfig.query)}&lang=en&max=${maxItems}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      return data.articles.map(a => a.title);
    } else {
      return topicConfig.fallback;
    }
  } catch (err) {
    console.warn("GNews API failed, using fallback news.", err);
    return topicConfig.fallback;
  }
}

// -----------------------------
// Create main news tiles
// -----------------------------
async function createTiles() {
  for (let topic of CONFIG.topics) {
    const tile = document.createElement("div");
    tile.className = "tile";

    const category = document.createElement("div");
    category.className = "category";
    category.innerText = topic.name;

    const headline = document.createElement("div");
    headline.className = "headline";

    tile.appendChild(category);
    tile.appendChild(headline);
    container.appendChild(tile);

    const newsArray = await fetchNews(topic, 10);
    createTypingEffect(headline, newsArray);
  }

  createSponsors();
}

// -----------------------------
// Typing effect line by line
// -----------------------------
function createTypingEffect(container, newsArray) {
  let index = 0;

  function typeNextLine() {
    if (index >= newsArray.length) index = 0;
    container.innerHTML = "";

    newsArray.forEach((text, i) => {
      const line = document.createElement("div");
      line.style.opacity = 0;
      line.textContent = "";
      container.appendChild(line);

      // line-by-line typing
      setTimeout(() => {
        let charIndex = 0;
        const chars = "• " + text;
        const interval = setInterval(() => {
          if (charIndex < chars.length) {
            line.textContent += chars[charIndex];
            charIndex++;
          } else {
            clearInterval(interval);
          }
        }, 50); // typing speed
        line.style.opacity = 1;
      }, i * 1500); // stagger lines
    });

    index += 10;
    setTimeout(typeNextLine, CONFIG.pauseTime + newsArray.length * 1500);
  }

  typeNextLine();
}

// -----------------------------
// Create sponsor tiles
// -----------------------------
function createSponsors() {
  CONFIG.sponsors.forEach((item) => {
    const tile = document.createElement("div");
    tile.className = "sponsor-tile";

    if (item.logo) {
      const img = document.createElement("img");
      img.src = item.logo;
      img.alt = item.text;
      img.style.maxWidth = "70%";
      img.style.maxHeight = "70%";
      img.style.objectFit = "contain";
      tile.appendChild(img);
    } else {
      tile.textContent = item.text;
    }

    tile.addEventListener("click", () => {
      window.open(item.link, "_blank");
    });

    sponsorColumn.appendChild(tile);
  });
}

createTiles();
