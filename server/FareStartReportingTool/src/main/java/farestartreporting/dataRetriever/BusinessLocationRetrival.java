package farestartreporting.dataRetriever;

import farestartreporting.responseModel.BusinessLocation;

import java.util.ArrayList;
import java.util.List;

public class BusinessLocationRetrival {

    public BusinessLocation getReport(int locationGroupID, String dateOfBusiness){

        double d = 10.10;
        long l = 1;
        return new BusinessLocation("fake name", d, d, l, l);
    }
}
