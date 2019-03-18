package farestartreporting.dataRetriever;

import farestartreporting.client.HTTPGetter;
import farestartreporting.responseModel.DailyData;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class BusinessLocationRetrieval {

    public DailyData getReport(String name, int locationGroupID, String dateOfBusiness) throws IOException, ExecutionException, InterruptedException {
        DailyData dailyDataData = HTTPGetter.getBusinessLocationData(name, locationGroupID, dateOfBusiness);
        return dailyDataData;
    }
}
