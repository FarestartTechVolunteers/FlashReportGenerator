package farestartreporting;

import farestartreporting.responseModel.BusinessLocation;
import farestartreporting.responseModel.BusinessResponse;
import farestartreporting.responseModel.BusinessReport;
import farestartreporting.responseModel.GetDataInputPayload;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;

@RestController
public class getDataController {

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping( value = "/getData", method = RequestMethod.POST, produces = "application/json")
    public BusinessResponse getData(@RequestBody GetDataInputPayload inputPayload) {

        Date startDate = inputPayload.startDate;
        Date endDate = inputPayload.endDate;

        assert(endDate.compareTo(startDate) > 0);

        Date currentDate = startDate;


        ArrayList<BusinessReport> businessReports = new ArrayList<BusinessReport>();

        while (endDate.compareTo(currentDate) > 0) {
            currentDate.setTime(currentDate.getTime() + 86400000);

            Date recordedDate = new Date();
            recordedDate.setTime(currentDate.getTime());
            businessReports.add(generateDummyBusiness(recordedDate));
        }

        BusinessResponse businessResponse = new BusinessResponse();
        businessResponse.data = businessReports;

        return businessResponse;
    }

    private BusinessReport generateDummyBusiness(Date reportingDate) {
        BusinessReport dummyBusinessReport = new BusinessReport();
        dummyBusinessReport.date = reportingDate;
        dummyBusinessReport.locations.add(getDummyBusinessLocation("Catering"));
        dummyBusinessReport.locations.add(getDummyBusinessLocation("FS Restaurant"));
        dummyBusinessReport.locations.add(getDummyBusinessLocation("Guest Chef Night"));
        dummyBusinessReport.locations.add(getDummyBusinessLocation("2100 Cafe"));
        dummyBusinessReport.locations.add(getDummyBusinessLocation("Maslow's"));

        return dummyBusinessReport;
    }

    private BusinessLocation getDummyBusinessLocation(String locationName)  {
        BusinessLocation dummyLocation = new BusinessLocation();
        dummyLocation.name = locationName;
        dummyLocation.budget = randomDouble(0.00, 10000.00);
        dummyLocation.netSales = randomDouble(0.00, 15000.00);
        dummyLocation.checkCount = randomLong(1, 2000);
        dummyLocation.guestCount = randomLong(2, 4000);

        return dummyLocation;
    }

    private double randomDouble(double min, double max) {
        return min + Math.random() * (max - min);
    }

    private Long randomLong(long min, long max) {
        return min + (long) (Math.random() * (max - min));
    }

    //JS Dates
    //Optinoal Budget
    //No sales & No guest = closed, return null for guestCount, checkCount and netSales (budget may be non-null)
    //
}