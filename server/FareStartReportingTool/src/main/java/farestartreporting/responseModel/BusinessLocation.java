package farestartreporting.responseModel;

public class BusinessLocation {
    public String name;
    public Double netSales;
    public Double budget;
    public Long guestCount;
    public Long checkCount;

    public BusinessLocation(String name, Double netSales, Double budget, Long guestCount, Long checkCount) {
        this.name = name;
        this.netSales = netSales;
        this.budget = budget;
        this.guestCount = guestCount;
        this.checkCount = checkCount;
    }

    public BusinessLocation() {

    }
}
