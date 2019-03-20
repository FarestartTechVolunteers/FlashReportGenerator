package farestartreporting.reporting.model;

import farestartreporting.dataRetriever.BusinessLocationRetrival;
import farestartreporting.dataRetriever.RetrieveDailyCallable;
import farestartreporting.responseModel.DailyData;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.*;

import static farestartreporting.reporting.model.LocationsOfInterest.interestedInformation;
import static farestartreporting.utils.ConcurrencyUtils.makeCompletableFuture;

public class LocationalWeeklyReport {
    public String name;
    public String startDate;
    public List<DailyData> data;

    private static final int NTHREDS = 7;

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();
    private ExecutorService executor = Executors.newFixedThreadPool(NTHREDS);

//    public static void main(String[] args) throws InterruptedException, ExecutionException, ParseException, IOException {
//
//        System.out.println("multi thread to 7");
//        String name = "Maslows";
//        String startDate = "03-11-2019";
//
//        long start = System.currentTimeMillis();
//
//        LocationalWeeklyReport locationalWeeklyReport = new LocationalWeeklyReport(name, startDate);
//        System.out.println(locationalWeeklyReport.name);
//
//        long end = System.currentTimeMillis();
//        System.out.println("Time end " + end);
//        long totalTime = end - start;
//        System.out.println("API took: " + totalTime);
//    }

    public LocationalWeeklyReport(String name, String startDate) throws IOException, ParseException, ExecutionException, InterruptedException {
        this.name = name;
        this.startDate = startDate;
        int dateRange = 7;

        List<Future<DailyData>> dailyData = new ArrayList<>();
        List<CompletableFuture<DailyData>> futuresList = new ArrayList<>();


        List<DailyData> fetchedData = new ArrayList<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        Date dateToWorkWith = simpleDateFormat.parse(startDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateToWorkWith);

        for (int i = 0; i < dateRange; i++) {
            startDate = simpleDateFormat.format(calendar.getTime());
            System.out.println("start date used for query: " + startDate);
            Callable<DailyData> reportWorker = new RetrieveDailyCallable(retreiver, startDate, name, interestedInformation);
            Future<DailyData> report = executor.submit(reportWorker);
            CompletableFuture<DailyData> completableFutureReport = makeCompletableFuture(report);
            futuresList.add(completableFutureReport);
            calendar.add(Calendar.DATE, 1);
        }

        CompletableFuture.allOf(futuresList.toArray(new CompletableFuture[futuresList.size()])).join();

        for (CompletableFuture<DailyData> completableReport : futuresList) {
            fetchedData.add(completableReport.get());
        }

        this.data = fetchedData;
    }

}
