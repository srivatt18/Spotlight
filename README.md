# Welcome to Spotlight
To get running, you must have a couple things

Our recomendation algorithm runs on python
You must have
- python
- numpy
- pandas
- sklearn-deap

Our project is written in javascript/typescript
You must run ```npm install``` in the root directory of this project to
have the necessary dependencies.

You can then run ```npx expo start``` to start up the development frontend.
To view on a mobile device, download the expo app, and run ```npx expo start --tunnel``` and scan the QR code from the app
We do not have a production build. You must use the development environment to view the app.

You must run ```npx ts-node backend/index.ts``` from the root of the project directory to run the backend. The recommendation
api will automatically start from this backend, assuming that you run this command from root of the project directory, and python
is available with the binary name ```python```