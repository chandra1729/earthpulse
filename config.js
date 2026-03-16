
const CONFIG = {

maxVisibleSignals:10,
newsShiftInterval:5000,

/* GNEWS API */

apiKeys:{
gnews:"3c9a21f9c870xxx8b106b4a"
},

/* TOPICS */

topics:[

{
name:"Space",
color:"#4fc3f7",

query:"ISRO OR spacex OR nasa OR planets OR space exploration",

fallback:[
"Starship orbital launch preparation",
"NASA telescope captures deep space images",
"Private space station projects expanding",
"Mars rover geological discovery",
"ISRO lunar mission update"
]
},

{
name:"Artificial Intelligence",
color:"#ffff00ff",

query:"artificial intelligence OR machine learning OR AI models OR generative AI",

fallback:[
"OpenAI expands autonomous agents",
"Nvidia launches next AI GPU",
"AI copilots transforming coding",
"Multimodal AI models evolving",
"AI robotics entering factories"
]
},

{
name:"Biotech",
color:"#ba68c8",

query:"biotech OR gene editing OR medical research OR CRISPR",

fallback:[
"CRISPR therapy trial success",
"Synthetic organ development progresses",
"AI driven drug discovery",
"Cancer immunotherapy breakthrough",
"Gene therapy trials expand"
]
}

],

/* TRENDING SIGNALS */

trendingSignals:[

"NVIDIA AI Surge",
"OpenAI Agents Ecosystem",
"China AI Regulation",
"SpaceX Starship Test",
"Apple AI Chips"

],

/* SPONSORS */

sponsors:[

{
text:"Tesla",
signalLines:[
"Autonomous driving expanding",
"Cybertruck production scaling",
"Energy storage growth"
]
},

{
text:"Nvidia",
signalLines:[
"AI chip demand surging",
"Blackwell GPU adoption",
"Data center expansion"
]
},

{
text:"OpenAI",
signalLines:[
"Agents ecosystem growing",
"Reasoning models improving",
"Multimodal systems evolving"
]
}

],

/* FALLBACK GLOBAL SIGNALS */

fallbackSignals:[
"Autonomous systems evolving",
"Global AI infrastructure scaling",
"Next generation robotics emerging"
]

};
