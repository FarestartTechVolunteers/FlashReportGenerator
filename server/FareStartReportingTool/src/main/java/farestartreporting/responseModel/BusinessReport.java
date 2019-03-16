package farestartreporting.responseModel;

import farestartreporting.dataRetriever.BusinessLocationRetrival;

import java.util.*;

public class BusinessReport {
    public Date date;
    public List<BusinessLocation> locations;

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();
    private  Map<String, Integer> locationNameGroupIDMap = new HashMap<>();

    public BusinessReport(Date date, List<BusinessLocation> locations) {
        this.date = date;
        this.locations = locations;
    }

    public BusinessReport(Date date) {

        this.locationNameGroupIDMap.put("Catering",17);
        this.locationNameGroupIDMap.put("FS Restaurant",4);
        this.locationNameGroupIDMap.put("Guest Chef Night ",5);
        this.locationNameGroupIDMap.put("School Meals",15);
        this.locationNameGroupIDMap.put("Community Meals",16);
        this.locationNameGroupIDMap.put("2100 Cafe",2);
        this.locationNameGroupIDMap.put("PT Cafe",3);
        this.locationNameGroupIDMap.put("Maslow's",6);
        this.locationNameGroupIDMap.put("Rise",7);

        String encodedDate = "16%20Mar%202019%2019%3A52%3A00%20GMT";

        List<BusinessLocation> locations = new ArrayList<>();

        for (Map.Entry<String, Integer> location : locationNameGroupIDMap.entrySet()) {
            System.out.println(location.getKey() + " = " + location.getValue());
            BusinessLocation currentLocation = retreiver.getReport(location.getValue(), encodedDate);
            if (currentLocation != null) {
                this.locations.add(currentLocation);
            }
        }

        this.date = date;
        this.locations = locations;

    }

    public BusinessReport(String date, List<BusinessLocation> locations) {
    }
}
