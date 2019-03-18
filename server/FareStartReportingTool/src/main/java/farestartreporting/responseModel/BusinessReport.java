package farestartreporting.responseModel;

import farestartreporting.dataRetriever.BusinessLocationRetrival;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ExecutionException;

import static farestartreporting.reporting.model.LocationsOfInterest.interestedInformation;

public class BusinessReport {
    public String date;
    public List<DailyData> locations;
    //Name and location group ID

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();

    public BusinessReport(String date) throws IOException, ExecutionException, InterruptedException {


        List<DailyData> locations = new ArrayList<>();

        for (String restaurantName : interestedInformation.keySet()) {
            DailyData report = retreiver.getReport(restaurantName, interestedInformation.get(restaurantName), date);
            locations.add(report);
        }
        System.out.println("finished business report");

        this.date = date;
        this.locations = locations;
    }

}
