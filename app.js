const container=document.getElementById("tiles");
const trendingContainer=document.getElementById("trending-signals");
const sponsorColumn=document.getElementById("sponsor-column");
const densityFill=document.getElementById("density-fill");
const signalCount=document.getElementById("signal-count");

/* ---------------- TRENDING SIGNALS ---------------- */
function displayTrendingSignals(){
  CONFIG.trendingSignals.forEach(signal=>{
    const div = document.createElement("div");
    div.className = "trending-signal";

    // Wrap _ as span.underscore, . as span.dot
    const formatted = signal.replace(/_/g, '<span class="underscore">_</span>')
                            .replace(/\./g, '<span class="dot">.</span>');
    div.innerHTML = formatted;

    trendingContainer.appendChild(div);
  });
}

/* ---------------- RANDOM SIGNAL PROPERTIES ---------------- */
function randomVelocity(){
  const r=Math.random();
  if(r>0.8) return "↑↑";
  if(r>0.6) return "↑";
  if(r>0.3) return "→";
  return "↓";
}

function randomImpact(){ return Math.floor(Math.random()*100)+1 }
function randomStrength(){ return Math.floor(Math.random()*100) }

/* ---------------- CREATE SIGNAL ---------------- */
function createSignal(text,color){
  const line=document.createElement("div");
  line.className="news-line new";

  const velocity=document.createElement("div");
  velocity.className="velocity";
  velocity.textContent=randomVelocity();
  velocity.style.color=color;

  const strengthBar=document.createElement("div");
  strengthBar.className="strength-bar";
  const fill=document.createElement("div");
  fill.className="strength-fill";
  const strength=randomStrength();
  fill.style.width=strength+"%";
  fill.style.background=color;
  strengthBar.appendChild(fill);

  const title=document.createElement("span");
  title.className="news-text";
  title.textContent=text;

  const impactScore=document.createElement("div");
  impactScore.className="impact-score";
  impactScore.textContent=randomImpact();
  impactScore.style.color=color;

  const time=document.createElement("span");
  time.className="timestamp";
  time.dataset.time=Date.now();
  time.textContent="0m";

  line.appendChild(velocity);
  line.appendChild(strengthBar);
  line.appendChild(title);
  line.appendChild(impactScore);
  line.appendChild(time);

  return line;
}

/* ---------------- GNEWS FETCH ---------------- */
async function fetchNews(query){
  try{
    const url=`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${CONFIG.apiKeys.gnews}`;
    const res=await fetch(url);
    const data=await res.json();
    if(!data.articles) return null;
    return data.articles.map(a=>a.title);
  }catch(e){
    console.log("GNews error",e);
    return null;
  }
}

/* ---------------- START FEED ---------------- */
function startFeed(feed,news,color){
  let index=0;
  setInterval(()=>{
    const signal=createSignal(news[index],color);
    feed.prepend(signal);
    while(feed.children.length>CONFIG.maxVisibleSignals){
      feed.removeChild(feed.lastChild)
    }
    index=(index+1)%news.length;
    updateDensity();
  },CONFIG.newsShiftInterval);
}

/* ---------------- CREATE TILES ---------------- */
async function createTiles(){
  displayTrendingSignals();
  for(const topic of CONFIG.topics){
    const tile=document.createElement("div");
    tile.className="tile";

    const category=document.createElement("div");
    category.className="category";
    category.textContent=topic.name;
    category.style.color=topic.color;

    const feed=document.createElement("div");
    feed.className="feed";

    tile.appendChild(category);
    tile.appendChild(feed);

    container.appendChild(tile);

    let news=[...topic.fallback];
    const liveNews=await fetchNews(topic.query);
    if(liveNews && liveNews.length>0) news=liveNews;

    startFeed(feed,news,topic.color);
  }
  createSponsors();
}

/* ---------------- TIMESTAMP AGING ---------------- */
setInterval(()=>{
  document.querySelectorAll(".timestamp").forEach(t=>{
    const diff=Math.floor((Date.now()-t.dataset.time)/60000);
    t.textContent=diff+"m";

    const line=t.parentElement;
    line.classList.remove("new","medium","old");
    if(diff<2) line.classList.add("new");
    else if(diff<5) line.classList.add("medium");
    else line.classList.add("old");
  });
},60000);

/* ---------------- SIGNAL DENSITY ---------------- */
function updateDensity(){
  const total=document.querySelectorAll(".news-line").length;
  signalCount.textContent=total+" signals";
  const percent=Math.min(100,total*5);
  densityFill.style.width=percent+"%";
}

/* ---------------- SPONSORS ---------------- */
function createSponsors(){
  CONFIG.sponsors.forEach((s,i)=>{
    const tile=document.createElement("div");
    tile.className="sponsor-tile";
    if(i===0) tile.classList.add("active");

    const name=document.createElement("div");
    name.className="sponsor-name";
    name.textContent=s.text;
    tile.appendChild(name);

    s.signalLines.forEach(line=>{
      const div=document.createElement("div");
      div.className="signal-line";
      div.textContent="> "+line;
      tile.appendChild(div);
    });

    sponsorColumn.appendChild(tile);
  });
  startSponsorRotation();
}

let sponsorIndex=0;
function startSponsorRotation(){
  const tiles=document.querySelectorAll(".sponsor-tile");
  setInterval(()=>{
    tiles[sponsorIndex].classList.remove("active");
    sponsorIndex=(sponsorIndex+1)%tiles.length;
    tiles[sponsorIndex].classList.add("active");
  },4000);
}

/* ---------------- INIT ---------------- */
createTiles();
