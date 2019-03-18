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

    public static void main(String[] args) throws InterruptedException, ExecutionException, ParseException, IOException {
        long start = System.currentTimeMillis();

        String startDate = "03-11-2019";
        WeeklyReport weeklyReport = new WeeklyReport(startDate);
        int size = weeklyReport.allLocations.size();
        System.out.println("entries " + size);

        long end = System.currentTimeMillis();
        System.out.println("Time end " + end);
        long totalTime = end - start;
        System.out.println("API took: " + totalTime);
    }

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

}
