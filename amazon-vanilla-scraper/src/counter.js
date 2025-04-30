export function beginScrape(element) {
  const input = document.querySelector(".input"); /* selects the input section */
  const resultsContainer = document.createElement("div");
  resultsContainer.className = "results"
  const appDiv = document.querySelector("#app")
  appDiv.appendChild(resultsContainer) /* appends the search results onto the DOM */
 /*  document.body.appendChild(resultsContainer); */ 

  const beginScrape = async () => {
    const keyword = input.value.trim();
    if (!keyword) {
      alert("Input field is empty!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`); /* calling the backend and passing the keyword */
      const data = await response.json();
      console.log(data);
  
      /* inserting the results on the front end */
      resultsContainer.innerHTML = 
      `<h2> Results for "${keyword}" (${data.count || 0} items) </h2>
          
          <ul>
            ${(data.products || []) 
              .filter(item => item && typeof item === "object" || undefined) /* filtering out nul results + looping over each item to append a new div */
              .map(item => 
                `<li>
                <img src="${item.image}" alt="Product image" width="100" />
                <strong>${item.title}</strong><br />
                Rating: ${item.rating || "N/A"}<br />
                Reviews: ${item.review || "N/A"}<br />
                
              </li>`).join("")}
          </ul>`;
          
    } catch (error) {
      console.error("Error fetching the data", error);
      resultsContainer.innerHTML = `<p>Failed to load data!</p>`
    }
  };
  element.addEventListener('click', beginScrape)
}
