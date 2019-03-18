package farestartreporting.reporting.model;

import farestartreporting.dataRetriever.BusinessLocationRetrival;
import farestartreporting.responseModel.DailyData;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static farestartreporting.reporting.model.LocationsOfInterest.interestedInformation;

public class LocationalWeeklyReport {
    public String name;
    public String startDate;
    public List<DailyData> data;

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();

    //In order of entry page for data verification


    public LocationalWeeklyReport(String name, String startDate) throws IOException, ParseException {
        this.name = name;
        this.startDate = startDate;
        int dateRange = 7; //TODO: change to 7

        List<DailyData> dailyData = new ArrayList<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        Date dateToWorkWith = simpleDateFormat.parse(startDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateToWorkWith);

        for (int i = 0; i < dateRange; i++) {
            startDate = simpleDateFormat.format(calendar.getTime());
            System.out.println("start date used for query: " + startDate);
            DailyData report = retreiver.getReport(name, interestedInformation.get(name), startDate);
            dailyData.add(report);
            calendar.add(Calendar.DATE, 1);
        }
        this.data = dailyData;

    }
}
