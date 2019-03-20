package farestartreporting.dataRetriever;

import farestartreporting.responseModel.DailyData;

import java.util.Map;
import java.util.concurrent.Callable;


public class RetrieveDailyCallable implements Callable<DailyData> {

    private BusinessLocationRetrival retreiver = new BusinessLocationRetrival();
    private String startDate;
    private String name;
    private Map<String, Integer> interestedInformation;


    public RetrieveDailyCallable(BusinessLocationRetrival retreiver, String startDate, String name, Map<String,Integer> interestedInformation) {
        this.retreiver = retreiver;
        this.startDate = startDate;
        this.name = name;
        this.interestedInformation = interestedInformation;

    }

    @Override
    public DailyData call() throws Exception {
        DailyData report = null;
        try {
            int num = interestedInformation.get(name);
            System.out.println("getting name " + name + " and num " + num);
            report = retreiver.getReport(name, interestedInformation.get(name), startDate);

        }catch (NullPointerException e){
            e.printStackTrace();
        }finally {
            return report;

        }
    }
}
