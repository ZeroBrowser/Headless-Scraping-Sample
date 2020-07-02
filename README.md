# How to find toilet papers using headless browsers

Almost everybody has been directly or indirectly affected by Covid-19. We have had to change our habits in a lot of different ways. One of those, is the way we shop for toilet papers!   
Anxiety of not finding the essentials we need is now part of our lives. But do Not worry, headless browsers are here to rescue!  
In this project we are showing how we can utilize 0Browser, a headless browser as a service, to automate the task of finding toilet papers on the internet!  
Find the full story [here](https://www.0browser.com/blogs/how-to-find-toilet-papers-using-headless-browsers.html)

## Prerequisites
Get a free API Token from [0Borwser here](https://www.0browser.com/docs/get-token.html) 

## ⛏ Build

First, update browserWSEndpoint in puppeteerHelper.ts with your [0Browser](https://www.0browser.com) api token.

Then, open the terminal and run the following command to restore npm packages:

```
npm install
```

Build the Typescript application using this command:

```
npm run tsc
```

## 🏃 Run
Then, you can run the application using 

```
node .\out\index
```

Enjoy! :wink:
