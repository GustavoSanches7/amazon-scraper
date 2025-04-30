FOR EDUCATIONAL PURPOSES ONLY - ALWAYS RESPECT THE RESPECTIVE WEBSITES TOS. 
This is a web scraper for scraping info from the first page of the Amazon products list for a given keyword. 
This project has been done as part of a test project task for the company Carvalho Aleixo Inc. 

How to run the project: 
- Download the respective files on your computer. 
- Make sure you have BunJs installed on your computer, as that is the instance that the backend runs
- Start both the backend and the front end servers by using git bash or vscode CLI, etc from within each of the amazon-backend-scraper and amazon-vanilla-scrapper files
- To start the backend: type bun index.ts
- To start the frontend: type npm run dev 
- Go to the local port the front end provides when running the code: "http://localhost:5173/" 
- Simply type the desired product you want to find info about and click on the button 
- Voila!

Note: Amazon may detect the backend calls as a bot and refuse to provide the data back to the server. In order to circumvent this, I added 3 different "User Agents"
- The user agent options begin on the 22nd line of code of index.ts, on the backend file.
- To change the user agent, simply comment out the one being used and uncomment another one. 
