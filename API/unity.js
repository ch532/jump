export default async function handler(req, res) {
  try {
    const response = await fetch("https://monetization.api.unity.com/stats/v1/operations", {
      headers: {
        Authorization: `Bearer ${process.env.7c4b808024d9f68ca949382701ea686533f7ed4bdac13cc21db5f1cd43c90af9}`,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
