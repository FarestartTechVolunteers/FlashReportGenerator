package farestartreporting;

import com.sun.tools.corba.se.idl.InvalidArgument;
import farestartreporting.responseModel.BusinessLocation;
import farestartreporting.responseModel.BusinessResponse;
import farestartreporting.responseModel.BusinessReport;
import farestartreporting.responseModel.GetDataInputPayload;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
public class getDataController {

    @RequestMapping(value = "/getData", method = RequestMethod.GET, produces = "application/json")
    public BusinessResponse getData(@RequestParam String startDate, @RequestParam(required = true, defaultValue = "1") String range) throws IOException, ParseException {

        int dateRange = Integer.valueOf(range);
        if (dateRange < 0) {
            dateRange = 1;
        }

        if (dateRange > 7) {
            dateRange = 7;
        }

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