const CONFIG = {
  maxVisibleSignals: 5,
  newsShiftInterval: 8000,
  topics: [
    {
      name: "Global News",
      color: "#ff7043",
      fallback: [
        "India Outlines strategy for supply protection",
        "Transparency is needed regarding the costs of the Trump–Iran war",
        "Australia faces an economic crisis due to a potential Strait shutdown",
        "Energy sector reacts to tensions",
        "Indian industry remains resilient amid the ongoing conflict."
      ]
    },
    {
      name: "Artificial Intelligence",
      color: "#ffff00",
      fallback: [
        "OpenAI expands autonomous agents",
        "Nvidia launches next AI GPU",
        "AI copilots transforming coding",
        "Multimodal AI models evolving",
        "AI robotics entering factories"
      ]
    },
    {
      name: "Space",
      color: "#4fc3f7",
      fallback: [
        "Starship orbital launch preparation",
        "NASA captures deep space images",
        "Private space station projects",
        "Mars rover geological discovery",
        "ISRO lunar mission update"
      ]
    }
  ],
  trendingSignals: ["_nvidia.AI.surge", "_openai.AGENTS", "_spacex.starship", "_apple.AI.chips"],
  sponsors: [
    { text: "Tesla", lines: ["FSD v12 Release", "Energy Storage Up"] },
    { text: "Nvidia", lines: ["H100 Demand Peak", "CUDA 13 Update"] }
  ]
};
