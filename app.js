const container = document.getElementById("tiles");
const sponsorColumn = document.getElementById("sponsor-column");

// -----------------------------
// Main function
// -----------------------------
async function createTiles() {
  for(let i=0; i<CONFIG.tileCount; i++){
    const tile = document.createElement("div");
    tile.className="tile";

    const category = document.createElement("div");
    category.className="category";

    const headline = document.createElement("div");
    headline.className="headline";

    tile.appendChild(category);
    tile.appendChild(headline);
    container.appendChild(tile);

    const topic = CONFIG.topics[i];
    category.innerText = topic.name;

    const newsArray = await fetchNews(topic.query, CONFIG.newsItemCount, topic.fallback);

    startTypingLoop(headline, newsArray);
  }

  createSponsorTiles();
}

// -----------------------------
// Fetch from GNews with fallback
// -----------------------------
async function fetchNews(query, count, fallback){
  try{
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=${count}&token=${CONFIG.apiKeys.gnews}`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.articles && data.articles.length > 0){
      return data.articles.map(a=>({text:a.title}));
    }
  }catch(e){
    console.error("GNews fetch failed, using fallback:", e);
  }
  return fallback.map(t=>({text:t}));
}

// -----------------------------
// Typing effect line by line
// -----------------------------
function startTypingLoop(container, newsArray){
  async function render(){
    container.innerHTML="";
    for(let i=0;i<newsArray.length;i++){
      const lineDiv = document.createElement("div");
      container.appendChild(lineDiv);
      await typeLine(lineDiv, newsArray[i].text);
      await delay(200);
    }
    await delay(CONFIG.pauseTime);
    render();
  }
  render();
}

function typeLine(div,text){
  return new Promise(resolve=>{
    let i=0;
    const interval = setInterval(()=>{
      div.textContent = text.slice(0,i+1); // bullets now handled by CSS
      i++;
      if(i>=text.length){
        clearInterval(interval);
        resolve();
      }
    },30);
  });
}

function delay(ms){ return new Promise(res=>setTimeout(res,ms)); }

// -----------------------------
// Sponsors
// -----------------------------
function createSponsorTiles(){
  CONFIG.sponsors.forEach(item=>{
    const tile = document.createElement("div");
    tile.className="sponsor-tile";
    tile.textContent = item.text;
    tile.addEventListener("click", ()=>window.open(item.link,"_blank"));
    sponsorColumn.appendChild(tile);
  });

  startSponsorPulse();
}

// -----------------------------
// Pulse effect for sponsor tiles
// -----------------------------
function startSponsorPulse() {
  const tiles = document.querySelectorAll(".sponsor-tile");
  if (!tiles.length) return;

  let currentIndex = 0;

  setInterval(() => {
    tiles.forEach(t => t.classList.remove("pulse"));
    tiles[currentIndex].classList.add("pulse");
    currentIndex = (currentIndex + 1) % tiles.length;
  }, 10000); // each tile glows for 6s
}

// -----------------------------
createTiles();
