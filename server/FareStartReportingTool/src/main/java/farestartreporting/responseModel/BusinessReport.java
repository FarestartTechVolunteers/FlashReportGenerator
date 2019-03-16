package farestartreporting.responseModel;

import farestartreporting.dataRetriever.BusinessLocationRetrival;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BusinessReport {
    public Date date;
    public List<BusinessLocation> locations;
    public BusinessLocationRetrival retreiver = new BusinessLocationRetrival();


    public BusinessReport() {

        String encodedDate = "16%20Mar%202019%2019%3A52%3A00%20GMT";
        locations = retreiver.getReport(1, encodedDate);
    }
}
