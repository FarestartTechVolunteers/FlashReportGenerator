package farestartreporting.responseModel;

public class DailyData {
    public String name;
    public Double netSales;
    public Double SDLWSales;
    public Double budget;
    public Double laborCost;

    public Long guestCount;
    public Long SDLWGuestCount;
    public Long checkCount;
    public Long SDLWCheckCount;

    public DailyData(String name, Double netSales, Double SDLWSales, Double budget, Long guestCount, Long SDLWGuestCount, Long checkCount, Long SDLWCheckCount, Double laborCost) {
        this.name = name;
        this.netSales = netSales;
        this.SDLWSales = SDLWSales;
        this.budget = budget;
        this.guestCount = guestCount;
        this.SDLWGuestCount = SDLWGuestCount;
        this.checkCount = checkCount;
        this.SDLWCheckCount = SDLWCheckCount;
        this.laborCost = laborCost;
    }

    public DailyData() {

    }
}
