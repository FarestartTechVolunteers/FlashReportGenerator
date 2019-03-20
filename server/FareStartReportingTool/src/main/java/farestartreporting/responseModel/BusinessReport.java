package farestartreporting.responseModel;

import farestartreporting.dataRetriever.BusinessLocationRetrival;
import farestartreporting.dataRetriever.RetrieveDailyCallable;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.*;

import static farestartreporting.reporting.model.LocationsOfInterest.interestedInformation;
import static farestartreporting.utils.ConcurrencyUtils.makeCompletableFuture;

public class BusinessReport {
    private static final int NTHREDS = interestedInformation.size();
    public String date;
    public List<DailyData> locations;
    //Name and location group ID

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();
    private ExecutorService executor = Executors.newFixedThreadPool(NTHREDS);


    public BusinessReport(String date) throws IOException, ExecutionException, InterruptedException {

        List<CompletableFuture<DailyData>> futuresList = new ArrayList<>();

        List<DailyData> locations = new ArrayList<>();

        for (String restaurantName : interestedInformation.keySet()) {
            Callable<DailyData> reportWorker = new RetrieveDailyCallable(retreiver, date, restaurantName, interestedInformation);
            Future<DailyData> report = executor.submit(reportWorker);
            CompletableFuture<DailyData> completableFutureReport = makeCompletableFuture(report);
            futuresList.add(completableFutureReport);
        }

        CompletableFuture.allOf(futuresList.toArray(new CompletableFuture[futuresList.size()])).join();
        for (CompletableFuture<DailyData> completableReport : futuresList) {
            locations.add(completableReport.get());
        }

        System.out.println("finished business report");

        this.date = date;
        this.locations = locations;
    }

}
