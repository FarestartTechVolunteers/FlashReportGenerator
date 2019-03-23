FlashReportGenerator
======================

## Installation on Local Machine

### Minimum Requirement:
[Java Runtime 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)

### Instructions
1. Navigate to the <a href="https://github.com/FarestartTechVolunteers/FlashReportGenerator/releases" target="_blank">Releases</a> and download the latest ```FareStartReportingTool-0.1.war``` file

2. OSX / Linux / Windows: Start the service using the following command (modify the filepath to suit):
  ```
  java -jar <PATH>/<TO>/<DOWNLOADED/FareStartReportingTool-0.1.war
  ```
 
3. Navigate to <a href="http://localhost:5000" target="_blank">Application UI</a>


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
