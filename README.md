# FingerprintAuthentication

Final Year Project

Collaborators :
[@ParadoxInfinite](https://github.com/ParadoxInfinite)
[@OsmanDsilva](https://github.com/OsmanDsilva)
[@Mithrandir98](https://github.com/Mithrandir98)
[@vadikrh](https://github.com/vadikrh)

## :warning: WARNING :

If the hardware prerequisite for this project is not met, testing the program is not possible.

### Prerequisites :

- Software :
  - [Node.js](https://nodejs.org/en/download/)
  - [MongoDBCommunityServer](https://www.mongodb.com/download-center/community)
  - [WebBrowser](https://www.google.com/intl/en/chrome/)(Program was built and tested using Google Chrome)
  - [MFS 100 Client Service](https://download.mantratecapp.com/StaticDownload/MFS100ClientService.exe)
- Hardware :
  - Mantra MFS 100 Finger Print Scanner
  - xcluma USB RFID Contactless Proximity Smart Card Reader 125KHZ Em4001 Em4100
  - Robodo MO32 RFID Card or Tag 125KHz EM4100

### Pre-run setup :

1. Install Node.js.
2. Install MongoDB. [ preferably installed as a service ]
3. Install web browser of your choice. [ Chrome/Firefox recommended ]
4. Install MFS100 Client, ensure it is installed as a service.
5. Ensure MongoDB service is running and ‘_bankdb_’ collection is present.

- Open run [ Win + R ], run ‘_cmd_’
- In the Command Prompt, run ‘_mongo_’, if it gives a prompt, this means MongoDB is running.
- If no prompt/error, in Command Prompt, run ‘_mongod_’ and in another Command Prompt run ‘_mongo_’. This should give a prompt, this means mongo is running.
- To check if ‘_bankdb_’ exists or to create it, run ‘_use bankdb_’. This will create if the collection does not exist.
- If Step C. is executed, do not close the prompt on which ‘_mongod_’ is running.

### Running the program [ Easy method ] :

1. Download and run one of the binaries from [Releases page](https://github.com/ParadoxInfinite/FingerprintAuthentication/releases) depending on the Operating System.
2. In the browser, type ‘http://localhost:5000/' and it should land on the Index page of the program.
3. If hardware prerequisites are not connected, this is the furthest one can reach.

---

Post this point, further steps have been made intuitive for the user.

### Running the program [ Development method ]:

1. Clone this repository
2. In a Command Prompt/Terminal/Shell, cd (change directory) to the cloned folder.
3. Run ‘_npm install_’ to install the dependencies required for the program.
4. Once the dependencies are installed, run ‘_npm start_’. This will run the program on port 5000 on localhost.
5. In the browser, type ‘http://localhost:5000/' and it should land on the Index page of the program.
6. If hardware prerequisites are not connected, this is the furthest one can reach.

---

Post this point, further steps have been made intuitive for the user.

### Issue reporting :

If you want to report an issue, follow these steps :

1. Check for the issue first. If no existing issue address your issue, open a new issue.
2. Issue must contain detailed description of the problem faced.
3. Steps taken to encounter the error and steps to reproduce the error.
4. Enviroment details such as Operating System(including build/version), MongoDB version etc.
