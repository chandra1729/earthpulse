const container = document.getElementById("tiles");

function createTiles(){

  for(let i=0;i<CONFIG.tileCount;i++){

    const tile=document.createElement("div");
    tile.className="tile";

    const category=document.createElement("div");
    category.className="category";

    const headline=document.createElement("div");
    headline.className="headline";

    tile.appendChild(category);
    tile.appendChild(headline);

    container.appendChild(tile);

  }

}

function updateTiles(){

  const tiles=document.querySelectorAll(".tile");

  tiles.forEach(tile=>{

    const item = CONFIG.news[Math.floor(Math.random()*CONFIG.news.length)];

    const category=tile.querySelector(".category");
    const headline=tile.querySelector(".headline");

    category.innerText=item.category;
    headline.innerText=item.text;

    const color=CONFIG.categories[item.category];

    tile.style.borderColor=color;
    category.style.color=color;

  });

}

createTiles();

updateTiles();

setInterval(updateTiles, CONFIG.rotationSeconds*1000);