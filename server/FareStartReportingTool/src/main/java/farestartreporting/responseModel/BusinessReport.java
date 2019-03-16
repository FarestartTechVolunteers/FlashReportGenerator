package farestartreporting.responseModel;

import java.util.ArrayList;
import java.util.Date;

public class BusinessReport {
    public Date date;
    public ArrayList<BusinessLocation> locations;

    public BusinessReport() {
        locations = new ArrayList<BusinessLocation>();
    }
}
