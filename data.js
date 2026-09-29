// File 3: data.js - Content for Future Edge Tech Publication
// Logo: https://www.chyke.online/connectgold_2.png

const PUBLICATION = {
  name: "Future Edge Tech",
  domain: "https://www.chyke.online",
  logo: "https://www.chyke.online/connectgold_2.png",
  author: "Chibuike Okoye",
  authorBio: "Builder of online.chyke SDK - 502 downloads in 11 days on Maven Central"
};

const articles = [
  {
    id: 1,
    cat: "ai",
    tag: "Why AI Matters",
    title: "Why AI Is Important Beyond ChatGPT",
    excerpt: "AI is not just chatbots. It is about making better decisions with scarce power, data, and connectivity.",
    date: "2026-05-13",
    image: "https://www.chyke.online/connectgold_2.png",
    content: `
      <p><b>AI is important for 3 real reasons, not hype:</b></p>
      <ul>
        <li><b>1. Scarcity:</b> In places like Kano, power and data are scarce. AI helps optimize what little we have - like solar output.</li>
        <li><b>2. Access:</b> AI on-device means you don't need cloud. Your phone can run models.</li>
        <li><b>3. Scale:</b> Small SDKs like my online.chyke can use AI to auto-optimize performance.</li>
      </ul>
      <p>In the next articles, I will show how I use AI to predict SDK usage and optimize downloads.</p>
      <p><img src="https://www.chyke.online/connectgold_2.png" width="120" style="border-radius:10px; background:#fff; padding:6px; border:1px solid #ddd" /></p>
    `
  },
  {
    id: 2,
    cat: "mobile",
    tag: "Phone Dev Trend",
    title: "The Phone Is The New Laptop For Mobile Development",
    excerpt: "The big trend: developers now build, sign, and publish SDKs entirely from Android phones.",
    date: "2026-05-13",
    image: "https://www.chyke.online/connectgold_2.png",
    content: `
      <p>Trend alert: In 2025-2026, developers in Nigeria, India, Kenya build APKs/AABs using:</p>
      <ul>
        <li>AIDE, Spck Code Editor, Termux, GitHub Mobile</li>
        <li>Publishing to Maven Central from phone terminal</li>
      </ul>
      <p>I published <b>online.chyke</b> to Maven Central - 502 downloads in 11 days - mostly coordinated from my phone. No MacBook needed.</p>
      <p>Next tutorial: How to sign AAB and publish to Maven using Termux.</p>
    `
  },
  {
    id: 3,
    cat: "solar",
    tag: "AI x Solar",
    title: "AI + Solar Energy: Smarter Panels in Dusty Climates",
    excerpt: "How AI predicts solar panel output when dust, clouds, and heat reduce efficiency in Northern Nigeria.",
    date: "2026-05-13",
    image: "https://www.chyke.online/connectgold_2.png",
    content: `
      <p><b>Problem:</b> Dust in Kano reduces solar output by 20-30%.</p>
      <p><b>AI Solution:</b></p>
      <ul>
        <li>Use phone light sensor as proxy for solar irradiance</li>
        <li>Train tiny model to predict output based on dust + weather</li>
        <li>Auto-alert when to clean panels</li>
      </ul>
      <p>This is where AI + Solar becomes powerful - not just panels, but intelligent panels.</p>
    `
  },
  {
    id: 4,
    cat: "solar",
    tag: "AI x UV",
    title: "Ultraviolet Technology + AI: The Hidden Opportunity",
    excerpt: "UV is not just sunburn. UV-C cleans water, UV index protects health, UV sensors calibrate solar.",
    date: "2026-05-13",
    image: "https://www.chyke.online/connectgold_2.png",
    content: `
      <p>3 UV + AI ideas nobody is covering:</p>
      <ol>
        <li><b>UV-C Water Sterilizer + AI:</b> AI timer based on water clarity measured by phone camera</li>
        <li><b>UV Index App + AI:</b> Phone app that reads UV index and gives AI skin advice</li>
        <li><b>UV Sensor for Solar:</b> Use UV sensor to detect micro-cracks on solar panels</li>
      </ol>
      <p>This is your unique angle for Google Publisher Center - AI + Solar + UV + Mobile.</p>
    `
  }
];
