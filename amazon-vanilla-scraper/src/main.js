import './style.css'
import { beginScrape } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Amazon Web Scraper</h1>
    <div class="card">
      <input type="text" class="input" placeholder="Enter product keyword" />
      <button id="counter" type="button">Begin Scraping</button>
    </div>
  </div>
`

beginScrape(document.querySelector('#counter'))
