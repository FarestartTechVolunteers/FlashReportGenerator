package farestartreporting;

import farestartreporting.reporting.model.LocationalWeeklyReport;
import farestartreporting.reporting.model.WeeklyReport;
import farestartreporting.responseModel.BusinessReport;
import farestartreporting.responseModel.BusinessResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Controller
public class ReportController {

    private List<String> tasks = Arrays.asList("a", "b", "c", "d", "e", "f", "g");

    @GetMapping("/")
    public String showReport(Model model) throws ParseException, IOException, ExecutionException, InterruptedException {

        // Hard coded to show data from March 11 - March 17 of 2019

        String startDate = "03-11-2019";
        WeeklyReport weeklyReport = new WeeklyReport(startDate);

        model.addAttribute("message", "Report for last week");
        model.addAttribute("tasks", tasks);
        model.addAttribute("weeklyReport", weeklyReport);

        return "report";
    }


    public BusinessResponse getLastWeekReportOld() throws ParseException, IOException, ExecutionException, InterruptedException {
        String startDate = "03-11-2019";
        int dateRange = 1;
        ArrayList<BusinessReport> businessReports = new ArrayList<>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        Date dateToWorkWith = simpleDateFormat.parse(startDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateToWorkWith);


        List<BusinessReport> reports = new ArrayList<>();
        for (int i = 0; i < dateRange; i++) {
            startDate = simpleDateFormat.format(calendar.getTime());
            System.out.println("start date used for query: " + startDate);
            BusinessReport report = new BusinessReport(startDate);
            reports.add(report);
            calendar.add(Calendar.DATE, 1);
        }

        BusinessResponse businessResponse = new BusinessResponse();
        businessResponse.data = reports;
        return businessResponse;
    }


}
