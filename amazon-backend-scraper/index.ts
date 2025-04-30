import axios from "axios";
import express from "express";
import { JSDOM } from "jsdom";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());/* enable cross origin */

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

/* Fetching HTML data from AMZ */
const beginScrape = async (product: string) => {
  try {
    const res = await axios.get(`https://www.amazon.com/s?k=${product}`, {
      headers: {
        /* User agents need to be commented in and out in rotation in order to prevent Amazon blocks */
        "User-Agent":
        /* Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.207 Mobile Safari/537.36 */
        /*   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" */
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
        "Accept-Language": "en-US,en;q=0.9",
      },
    })
    /* Parsing HTML into JSDOM to select the products name, rating, etc */
    const dom = new JSDOM(res.data);
    const document = dom.window.document;
    const productCard = document.querySelectorAll("div[data-component-type='s-search-result']")
    const products: any[] = []  /* Array of products */

    productCard.forEach((card: any) => {
      const sponsored = card.querySelector("span[data-component-type='sp-sponsored-result']");
      if (sponsored) return; /* to skip sponsored ads */
      const badge = card.querySelector("span.sponsored-label-text");
      if (badge) return; /* to skip sponsored ads */

      const titleHtml = card.querySelector("h2 > a > span") || card.querySelector("h2 span");
      const ratingHtml = card.querySelector("span.a-icon-alt");
      const reviewHtml = card.querySelector("span[aria-label*='rating'] ~ span.a-size-base");
      const imageHtml = card.querySelector("img.s-image"); /* selecting titles, ratings, etc */

      const title = titleHtml?.textContent?.trim();
      const rating = ratingHtml?.textContent?.trim();
      const review = reviewHtml?.textContent?.trim();
      const image = imageHtml?.src; /* selecting only the strings */

      if (title && /\w+/.test(title)) { /* filtering out white space + unknown characters */
        products.push({title, rating, review, image});
      }
    });
    return products; 

  } catch (e) {
    console.log("Error", e)
  }
}

/* Running the request */
app.get("/api/scrape", async (req: any, res: any) => {
  const keyword = req.query.keyword;
  console.log(`Received request for keyword: ${keyword}`); /* testing */
  if (!keyword) {
    return res.status(400).json({ error: "Empty field!" });
  }

  try {
    const productsFinal = await beginScrape(keyword);
    console.log(`Products fetched for ${keyword}:`, productsFinal); /* testing */
    res.json({ keyword, count: productsFinal?.length, products: productsFinal })
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


/* Confirmation code of listening on port 3000 */
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});