package farestartreporting.dataRetriever;

import farestartreporting.client.HTTPGetter;
import farestartreporting.responseModel.BusinessLocation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BusinessLocationRetrieval {

    public BusinessLocation getReport(String name, int locationGroupID, String dateOfBusiness) throws IOException {
        BusinessLocation businessLocationData = HTTPGetter.getBusinessLocationData(name, locationGroupID, dateOfBusiness);
        return businessLocationData;
    }
}
