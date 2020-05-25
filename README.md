# 0Browser-find-ToiletPaper

Almost everybody is directly or indirectly affected by Covid-19.  
We have had to change our habits in a lot of different ways.  
One of those, is the way we shop for toilet papers!   
Anxiety of not finding the essentials we need is now part of our lives.  
But do Not worry, headless browsers are here to rescue!  
In this project we are showing how we can utilize 0Browser, a headless browser as a service, to automate the task of finding toilet papers on the internet!  

## ⛏ Build

Before you start make sure you have a browserWSEndpoint. You can either go to 0Browser and get one for free or create your own  using Puppeteer (others). For more information head out to "Get Started " page here : https://www.0browser.com/docs/index.html

Update browserWSEndpoint in puppeteerHelper.ts to your new websocket url.

Then Type the following command to restore npm packages:

```
npm install
```

Build the Typescript application using this command:

```
npm run tsc
```

Then you can run the application using 

```
node .\out\index
```

Enjoy! :wink:
