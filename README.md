# Forbis homework
---
There a two basic modules: Bitcoin and Analyses
### Bitcoin
### Analyses

## Important notes
Depends on external service for downloading of HTML/XML pages protected by CORS policy.

## Basic comment for running and building of app

Run application immediately in development mode (*hosted by webpack dev server*)  
`npm run start:dev`

Build application for hosting with external web server  
`npm build`

Running of application tests  
`npm run test -- --coverage`

## To-Do
 - [ ] Check if cors-anywhere.herokuapp.com available;
 - [ ] Increase amount of typed functions (currently not all part of codebase are properly typed);
 - [ ] Memorizing results for faster parser execution;
 - [ ] To implement handling of situation, where there multiple tags with the same frequency (currently used the first one);
 - [ ] Increase test coverage - currently only main utils functions are covered by unit test;
 - [ ] Improving test using matrix of parameters;
 - [ ] Cover with meaninful comments and JSDocs;