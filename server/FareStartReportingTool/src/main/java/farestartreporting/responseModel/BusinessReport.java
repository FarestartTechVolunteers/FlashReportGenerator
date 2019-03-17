package farestartreporting.responseModel;

import farestartreporting.dataRetriever.BusinessLocationRetrival;
import farestartreporting.utils.URLEncoderHelperFS;

import java.io.IOException;
import java.util.*;

public class BusinessReport {
    public Date date;
    public List<BusinessLocation> locations;
    //Name and location group ID
    public Map<String, Integer> interestedInformation;

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();

    //In order of entry page for data verification
    {
        interestedInformation = new HashMap<>();
        interestedInformation.put("700 VIRGINIA RETAIL ", 18);
        interestedInformation.put("FS Restaurant", 4);
        interestedInformation.put("FareStart Catering", 17);
        interestedInformation.put("Guest Chef Night", 5);
        interestedInformation.put("700 Commissary", 5);
        interestedInformation.put("Maslows ", 6);
        interestedInformation.put("CAFES", 19);
        interestedInformation.put("Rise Coffee", 7);
        interestedInformation.put("PT Café", 3);
        interestedInformation.put("2100 Cafe", 2);
        interestedInformation.put("CONTRACT OPERATIONS", 23);
        interestedInformation.put("Community Meals", 16);
        interestedInformation.put("School Meals", 15);
        interestedInformation.put("Student+Staff Lunch", 26);
    }


    public BusinessReport(Date date) throws IOException {

        String encodedDate = URLEncoderHelperFS.convertURL(date);

        List<BusinessLocation> locations = new ArrayList<>();

        for (String restaurantName : interestedInformation.keySet()) {
            BusinessLocation report = retreiver.getReport(restaurantName, interestedInformation.get(restaurantName), encodedDate);
            locations.add(report);
        }

        this.date = date;
        this.locations = locations;

    }


}
