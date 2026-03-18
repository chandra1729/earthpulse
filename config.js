const CONFIG = {
  maxVisibleSignals: 7, // Increased since tiles are smaller
  newsShiftInterval: 8000, 
  apiRefreshRate: 2700000, 
  apiKeys: {
    gnews: "3c9a21f9c87084fxxx88b106b4a" 
  },
  topics: [
    {
      name: "Crude Oil",
      color: "#ff7043",
      query: "crude oil OR oil prices OR OPEC OR Brent oil",
      fallback: ["OPEC production update", "Oil prices fluctuate", "Brent crude volatility"]
    },
    {
      name: "Artificial Intelligence",
      color: "#ffff00",
      query: "artificial intelligence OR Nvidia OR OpenAI",
      fallback: ["OpenAI expands agents", "Nvidia GPU demand", "AI chip surge"]
    },
    {
      name: "Space",
      color: "#4fc3f7",
      query: "SpaceX OR NASA OR Starship",
      fallback: ["Starship launch prep", "NASA deep space news", "Mars rover update"]
    }
  ],
  trendingSignals: ["_nvidia.AI", "_openai.AGENTS", "_spacex.starship", "_system.v4.5"],
  sponsors: [
    { text: "Tesla", lines: ["FSD v12 Release", "Energy Storage Up"] },
    { text: "Nvidia", lines: ["H100 Demand Peak", "CUDA 13 Update"] }
  ]
};
