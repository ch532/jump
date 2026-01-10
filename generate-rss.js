const fs = require("fs");

const data = JSON.parse(fs.readFileSync("feed-data.json", "utf8"));

function escapeXML(str) {
  return str.replace(/[<>&'"]/g, c =>
    ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&apos;", '"':"&quot;" }[c])
  );
}

let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXML(data.site.title)}</title>
<link>${data.site.url}</link>
<description>${escapeXML(data.site.description)}</description>
<language>en</language>
`;

data.items.forEach(item => {
  rss += `
  <item>
    <title>${escapeXML(item.title)}</title>
    <description>${escapeXML(item.description)}</description>
    <link>${item.link}</link>
    <pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>
    <guid>${item.link}</guid>
  </item>`;
});

rss += `
</channel>
</rss>`;

fs.writeFileSync("rss.xml", rss);
console.log("rss.xml generated");
