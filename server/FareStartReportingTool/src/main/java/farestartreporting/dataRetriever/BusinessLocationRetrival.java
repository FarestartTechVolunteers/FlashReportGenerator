package farestartreporting.dataRetriever;

import farestartreporting.client.HTTPGetter;
import farestartreporting.responseModel.DailyData;

import java.io.IOException;

public class BusinessLocationRetrival {
    private HTTPGetter httpClient = new HTTPGetter();

    public DailyData getReport(String name, int locationGroupID, String dateOfBusiness) throws IOException {


        DailyData dailyDataData = HTTPGetter.getBusinessLocationData(name, locationGroupID, dateOfBusiness);
        return dailyDataData;
    }
}
