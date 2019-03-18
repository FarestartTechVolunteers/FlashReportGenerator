package farestartreporting.responseModel;

import farestartreporting.dataRetriever.BusinessLocationRetrival;

import java.io.IOException;
import java.util.*;

public class BusinessReport {
    public String date;
    public List<DailyData> locations;
    //Name and location group ID
    public Map<String, Integer> interestedInformation;

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();

    //In order of entry page for data verification
    {
        interestedInformation = new HashMap<>();
        interestedInformation.put("Maslows ", 6);

        interestedInformation.put("Rise Coffee", 7);
        interestedInformation.put("2100 Cafe", 2);
        interestedInformation.put("PT Café", 3);
        interestedInformation.put("FareStart Catering", 17);
        interestedInformation.put("FS Restaurant", 4);
        interestedInformation.put("Guest Chef Night", 5);
        interestedInformation.put("Community Meals", 16);
        interestedInformation.put("School Meals", 15);

//        interestedInformation.put("700 VIRGINIA RETAIL ", 18);
//        interestedInformation.put("700 Commissary", 5);
//        interestedInformation.put("CAFES", 19);
//        interestedInformation.put("Rise Coffee", 7);
//        interestedInformation.put("2100 Cafe", 2);
//        interestedInformation.put("CONTRACT OPERATIONS", 23);
//        interestedInformation.put("Student+Staff Lunch", 26);
    }


    public BusinessReport(String date) throws IOException {


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
