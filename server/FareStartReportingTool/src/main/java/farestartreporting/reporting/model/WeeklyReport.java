package farestartreporting.reporting.model;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static farestartreporting.reporting.model.LocationsOfInterest.interestedInformation;

public class WeeklyReport {
    public List<LocationalWeeklyReport> allLocations;

    public WeeklyReport(String startDate) throws IOException, ParseException, ExecutionException, InterruptedException {
        List<LocationalWeeklyReport> allLocations = new ArrayList<>();
        for (String restaurantName : interestedInformation.keySet()) {
            LocationalWeeklyReport locationalWeeklyReport = new LocationalWeeklyReport(restaurantName, startDate);
            allLocations.add(locationalWeeklyReport);
        }

        this.allLocations = allLocations;
    }

}
