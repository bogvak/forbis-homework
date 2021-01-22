# Forbis homework
There a two basic modules implemented in : Bitcoin and Analyses
### Bitcoin
Simple ui to https://api.coindesk.com/v1/bpi/currentprice.json API displaying current rates for Bitcoin exchange rates.
May be sorted by codes or rates - by clicking on table header.
### Analyses
Simple UI to logic that makes statistics on XML or HTML page (*determining automatically*):
- what tags or nodes are used in file;
- finding most popular tag;
- finding path that contains highest amount of most popular tag;
## Important notes
Depends on external service (*cors-anywhere.herokuapp.com*) for downloading of HTML/XML pages protected by CORS policy.

## Installation and download
Clone application repository to local folder  
`git clone https://github.com/bogvak/forbis-homework.git`

Install necessary npm libraries  
`cd forbis-homework`  
`npm install`

## Running, building and testing of app

Run application immediately in development mode (*hosted by webpack dev server*)  
`npm run start:dev`

Build application for hosting with external web server  
`npm build`

Running of application tests  
`npm run test -- --coverage`

## To-Do
 - [ ] Implement checking of *cors-anywhere.herokuapp.com* status;
 - [ ] Increase amount of typed functions (currently not all part of codebase are properly typed);
 - [ ] Memorizing results for faster parser execution;
 - [ ] To implement handling of situation, where there multiple tags with the same frequency (currently used the first one);
 - [ ] Increase test coverage - currently only main utils functions are covered by unit test;
 - [ ] Improving test using matrix of parameters;
 - [ ] Cover with meaninful comments and JSDocs;