# Notes abouts Challenge Nr. 1

## What I did
I analyzed which data is in the json file, then brainstorm which data could be interesting and what features could show my abilities. 
I decided against a map and points, because it seemed too time intensive. 
My used technologies: JavaScript, React, Create React App, Chart.js, React Bootstrap, Fetch JSONP, GitHub, Heroku, FontAwesome, Tests with Jest and Enzyme and the image from pixabay.com.

I didn’t recognized the technology jsonp, so I struggled a bit with CORS and a proxy. After a while I decided to use a backend and set it up. Then I recognized the jsonp thing and researched it. I found a library called fetch-jsonp and used it to access the data.

After accessing the data correctly I filtered the data by several parameters like magnitude, felt, last events, total count and special types. And I displayed it roughly.
Then I wanted to show how many events have been taking place categorized by the magnitude size with the richter magnitude scala. I used a bar chart with Change.js.

I added a few styles, colors, an image and Boostrap components to apply a simple layout.

Finally I added some test by example, because my time was running out. If you’d like to see more test written by me, check my projects: https://github.com/sabinefrister/browsermediarecorder and https://github.com/sabinefrister/soundrecorder 

## Next dteps could be
- Add more tests of course
- More pictures, for example for every "card" on the top
- Prettify display of the data: 
    - Show the “Where” (Location) of the event in an standardized way. Instead of “22 km SSW of Mammoth, Wyoming” something like “Near Mammoth, Wyoming, USA” or just "Whyoming, USA" and differentiate between places in USA and countries all around the world.
    - Capitalize first letters of "earthquake" for example in "What kind of?"
- More features could be
    - collect data by states of USA and show a diagram how many events in every state
    - collect data by countries or continents and show a diagram how many events in every country/on every continent
- Add more user actions, at least with a carousel element for the “Something special going on today?” section
    - Eg. picture of vulcano erruption and text “No vulcano erruption today. What a relief :-)” and the same for other potential events like “nuclear explosion”, “meteorite”… 
    - This section could be a little funny
- Refactor a little bit
    - eg. Sections with Display card could be a component by itself. I didn't do it because of the data flow from parent to children
- Solve Problem
    - When the jsonp request timed out, an error will be shown in an alert component from react bootstrap and in the console of the browser, there is a warning about "findDOMNode is deprecated in StrictMode". This is a known problem with the react bootstrap library. https://github.com/react-bootstrap/react-bootstrap/issues/5075 But maybe there is a way around it.

## Deployment
- On Heroku CLI
    + ```heroku login```
    + ```heroku create earthquakestoday```
    + ```git push heroku main```
    + ```heroku open```

- Deployed Version: https://earthquakestoday.herokuapp.com/
