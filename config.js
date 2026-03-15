const CONFIG = {
  tileCount: 3,
  newsItemCount: 10,
  pauseTime: 3000,
  apiKeys: {
    gnews: "3c9a21f9c87084fe483e8d988b106b4a"  // replace with your GNews key
  },

  topics: [
    {
      name: "Space",
      query: "spacex OR nasa OR planets OR space exploration",
      fallback: [
        "Mars rover discovers new rock formation",
        "SpaceX launches Starship test flight",
        "NASA announces James Webb results",
        "New exoplanets discovered in Milky Way",
        "Astronauts return from ISS mission",
        "Moon base plans revealed",
        "Deep space telescope images released",
        "Asteroid mission successfully completes",
        "Satellite captures black hole image",
        "Commercial space tourism expands"
      ]
    },
    {
      name: "Artificial Intelligence",
      query: "ai OR artificial intelligence OR machine learning",
      fallback: [
        "AI beats humans in coding challenge",
        "New language model released for developers",
        "Robotics company unveils AI-powered robot",
        "AI predicts climate change patterns",
        "Self-driving cars advance safety features",
        "AI generates realistic video content",
        "Machine learning improves drug discovery",
        "Chatbots transform customer support",
        "AI ethics framework proposed",
        "AI-powered music composition software launched"
      ]
    },
    {
      name: "Biotech",
      query: "biotech OR gene editing OR medical",
      fallback: [
        "Gene therapy trial shows promising results",
        "CRISPR technique advances disease treatment",
        "New biotech startup raises $50M",
        "AI helps discover new vaccines",
        "Medical imaging improved by AI tools",
        "Cancer research breakthrough announced",
        "Biotech lab develops synthetic organ",
        "Stem cell therapy trial progresses",
        "Wearable health tech gains traction",
        "Biotech innovation awards announced"
      ]
    }
  ],

  sponsors: [
    { text: "SpaceX", link: "https://spacex.com" },
    { text: "OpenAI", link: "https://openai.com" },
    { text: "Tesla", link: "https://tesla.com" },
    { text: "Nvidia", link: "https://nvidia.com" },
    { text: "Biogen", link: "https://biogen.com" },
     { text: "Tamannah Jewellery", link: "https://www.tamannaah.com/" }
  ]
};
