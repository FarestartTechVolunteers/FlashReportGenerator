package farestartreporting.reporting.model;

import java.util.HashMap;
import java.util.Map;

public class LocationsOfInterest {
    public static Map<String, Integer> interestedInformation;

    static {
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
}
