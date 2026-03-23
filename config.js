const CONFIG = {
  maxVisibleSignals: 5,
  newsShiftInterval: 4000,
  topics: [
    {
      name: "Crude Oil",
      color: "#ff7043",
      fallback: [
        "Oil prices fluctuate amid supply concerns",
        "OPEC production decisions impact markets",
        "Brent crude volatility continues",
        "Energy sector reacts to tensions",
        "Global demand outlook shifts"
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
