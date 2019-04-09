FlashReportGenerator
======================

## Installation on Local Machine

### Minimum Requirement:
[Java Runtime 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)

### Instructions
1. Navigate to the <a href="https://github.com/FarestartTechVolunteers/FlashReportGenerator/releases" target="_blank">Releases</a> and download the latest ```FareStartReportingTool-0.1.war``` file

2. OSX / Linux / Windows: Start the service using the following command (modify the filepath to suit):
  ```
  java -DctuitToken=“<CTUIT_TOKEN>” -DctuitUserId=“<CTUIT_USER_ID>” -jar <PATH>/<TO>/<DOWNLOADED>/FareStartReportingTool-0.1.war
  ```
 
3. Navigate to <a href="http://localhost:5000" target="_blank">Application UI</a>

## Development
### Development / Build Tools:
 - OpenJDK 1.8+
 - Maven 3.x
 - Git CLI

### Setup & Build
1. Fork the repo 
2. Clone the forked repo to your computer
```git clone https://github.com/<YOUR_GIT_REPO_PREFIX>/FlashReportGenerator.git```
3. Navigate to ./FlashReportGenerator/server/FareStartReportingTool/
4. Execute ```mvn package``` (this automatically download node & npm for compilling front-end codes)
```If the build fails, go to ./FlashReportGenerator/client and run npm install```

### Execution
1. Navigate to ./FlashReportGenerator/server/FareStartReportingTool/
2. Execute ```java -jar ./target/FareStartReportingTool-0.1.war```

### Deployment
1. Obtain permission as collaborator to project Heroku account.
2. Navigate to ./FlashReportGenerator/server/FareStartReportingTool/
3. Edit 
4. Execute ```mvn clean heroku:deploy```

---

## Backend Demo
```
http://weeklyreport-env.b9fv3mafzd.us-west-2.elasticbeanstalk.com/
```

## API

```
http://weeklyreport-env.b9fv3mafzd.us-west-2.elasticbeanstalk.com/api/getData?startDate=03-11-2019&range=2
```

Range gives you # of days since the start Date.
For now, max you get is 7.
