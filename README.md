# train-time

A small web page that mimics adding a train schedule to the firebase database and displaying the information with time until next train and minutes 
remaining. 

Example: Adding a train whose first time running is 3pm and runs every 30 min will display, given a current time of 4:45pm, that the next train is at 5:00pm and that is 15 minutes away. 

## Tech/framework used

A basic layout using Bootstrap CSS written in JavaScript/JQuery and using MomentJS to manipulate and display times nicely. Firebase RT Database on the back end. 