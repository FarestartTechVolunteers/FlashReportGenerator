package farestartreporting.dataRetriever;

import farestartreporting.client.HTTPGetter;
import farestartreporting.responseModel.BusinessLocation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BusinessLocationRetrival {
    private HTTPGetter httpClient = new HTTPGetter();

    public BusinessLocation getReport(int locationGroupID, String dateOfBusiness) throws IOException {

        double d = 10.10;
        long l = 1;

        BusinessLocation businessLocationData = httpClient.getBusinessLocationData(locationGroupID, dateOfBusiness);
        return businessLocationData;
    }
}
