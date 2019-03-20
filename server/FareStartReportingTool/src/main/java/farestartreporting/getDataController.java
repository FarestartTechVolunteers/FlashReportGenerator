package farestartreporting;

import farestartreporting.responseModel.BusinessResponse;
import farestartreporting.responseModel.BusinessReport;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
public class getDataController {

//    public static void main(String[] args) throws ParseException, IOException, ExecutionException, InterruptedException {
//        System.out.println("hello");
//        String startDate = "03-11-2019";
//        //Todo change it to 7
//        int dateRange = 1;
//        long start = System.currentTimeMillis();
//        System.out.println("Time now " + start);
//
//        getWeeklyHelper(startDate, dateRange);
//
//
//        long end = System.currentTimeMillis();
//        System.out.println("Time end " + end);
//        long totalTime = end - start;
//        System.out.println("API took: " + totalTime);
//
//    }


    @RequestMapping(value = "/api/getData", method = RequestMethod.GET, produces = "application/json")
    public BusinessResponse getData(@RequestParam String startDate, @RequestParam(required = true, defaultValue = "1") String range) throws IOException, ParseException, ExecutionException, InterruptedException {

        int dateRange = Integer.valueOf(range);
        if (dateRange < 0) {
            dateRange = 1;
        }

        if (dateRange > 7) {
            dateRange = 7;
        }

        return getWeeklyHelper(startDate, dateRange);
    }

    public static BusinessResponse getWeeklyHelper(String startDate, int dateRange) throws ParseException, IOException, ExecutionException, InterruptedException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        Date dateToWorkWith = simpleDateFormat.parse(startDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateToWorkWith);


        List<BusinessReport> reports = new ArrayList<>();
        for (int i = 0; i < dateRange; i++) {
            startDate = simpleDateFormat.format(calendar.getTime());
            BusinessReport report = new BusinessReport(startDate);
            reports.add(report);
            calendar.add(Calendar.DATE, 1);
        }

        BusinessResponse businessResponse = new BusinessResponse();
        businessResponse.data = reports;

        return businessResponse;
    }

}