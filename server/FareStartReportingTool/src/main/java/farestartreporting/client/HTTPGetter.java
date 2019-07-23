package farestartreporting.client;

import farestartreporting.responseModel.DailyData;
import org.apache.logging.log4j.util.Strings;
import org.asynchttpclient.AsyncHttpClient;
import org.asynchttpclient.Dsl;
import org.asynchttpclient.Response;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;


public class HTTPGetter {

    private static final String AUTH_TOKEN = Optional.ofNullable(System.getProperty("ctuitToken"))
            .orElse("d098f5a7-d1a1-483b-87eb-3ee3d42dd3c6");
    private static final String USER_ID = Optional.ofNullable(System.getProperty("ctuitUserId"))
            .orElse("128537");
    private static final String PERIOD_TYPE_ID = "0"; //day
    //    private AsyncHttpClient asyncHttpClient = Dsl.asyncHttpClient(Dsl.config().setConnectionTtl(5000));
    private static AsyncHttpClient asyncHttpClient = Dsl.asyncHttpClient(Dsl.config());

//    public static void main(String[] args) throws ExecutionException, InterruptedException, IOException {
//        AsyncHttpClient asyncHttpClient = Dsl.asyncHttpClient(Dsl.config().setConnectionTtl(100));
//        String url1 = "https://api.ctuit.com/api/KeyInfo/6/03-11-2019/1";
//        String url2 = "https://api.ctuit.com/api/KeyInfo/2/03-11-2019/1";
//
//        CompletableFuture<Response> r1 = asyncHttpClient.prepareGet(url1)
//                .addHeader("Content-Type", "application/json")
//                .addHeader("X-UserAuthToken", AUTH_TOKEN)
//                .addHeader("X-UserId", USER_ID)
//                .execute().toCompletableFuture();
//
//        CompletableFuture<Response> r2 = asyncHttpClient.prepareGet(url2)
//                .addHeader("Content-Type", "application/json")
//                .addHeader("X-UserAuthToken", AUTH_TOKEN)
//                .addHeader("X-UserId", USER_ID)
//                .execute().toCompletableFuture();
//
//        CompletableFuture.allOf(r1, r2).join();
//        String responseBody1 = r1.get().getResponseBody();
//        String responseBody2 = r2.get().getResponseBody();
//
//        System.out.println(responseBody1);
//        System.out.println(responseBody2);
//
//        asyncHttpClient.close();
//    }


    public static CompletableFuture<Response> getCheckCount(int locationGroupID, String dateOfBusiness) throws IOException {
        // For net sales
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/" + locationGroupID + "/" + dateOfBusiness + "/" + PERIOD_TYPE_ID + "/8";
        CompletableFuture<Response> response = asyncHttpClient.prepareGet(urlVariable)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-UserAuthToken", AUTH_TOKEN)
                .addHeader("X-UserId", USER_ID)
                .execute().toCompletableFuture();

        return response;
    }

    public static CompletableFuture<Response> getGuestCount(int locationGroupID, String dateOfBusiness) throws IOException {
        // For net sales
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/" + locationGroupID + "/" + dateOfBusiness+ "/" + PERIOD_TYPE_ID  + "/7";

        CompletableFuture<Response> response = asyncHttpClient.prepareGet(urlVariable)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-UserAuthToken", AUTH_TOKEN)
                .addHeader("X-UserId", USER_ID)
                .execute().toCompletableFuture();

        return response;
    }

    public static CompletableFuture<Response> getNetSalesData(int locationGroupID, String dateOfBusiness) throws IOException {
        // For net sales
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/" + locationGroupID + "/" + dateOfBusiness+ "/" + PERIOD_TYPE_ID  + "/1";

        CompletableFuture<Response> response = asyncHttpClient.prepareGet(urlVariable)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-UserAuthToken", AUTH_TOKEN)
                .addHeader("X-UserId", USER_ID)
                .execute().toCompletableFuture();

        return response;
    }

    public static CompletableFuture<Response> getLaborCost(int locationGroupID, String dateOfBusiness) throws IOException {
        // For Labor Cost
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/" + locationGroupID + "/" + dateOfBusiness+ "/" + PERIOD_TYPE_ID  + "/4";

        CompletableFuture<Response> response = asyncHttpClient.prepareGet(urlVariable)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-UserAuthToken", AUTH_TOKEN)
                .addHeader("X-UserId", USER_ID)
                .execute().toCompletableFuture();

        return response;
    }

    public static DailyData getBusinessLocationData(String name, int locationGroupID, String dateOfBusiness) throws IOException, ExecutionException, InterruptedException {

        CompletableFuture<Response> r1 = getNetSalesData(locationGroupID, dateOfBusiness);
        CompletableFuture<Response> r2 = getCheckCount(locationGroupID, dateOfBusiness);
        CompletableFuture<Response> r3 = getGuestCount(locationGroupID, dateOfBusiness);
        CompletableFuture<Response> r4 = getLaborCost(locationGroupID, dateOfBusiness);

        CompletableFuture.allOf(r1, r2, r3, r4).join();

        String netSalesDataString = r1.get().getResponseBody();
        String checkCountRes = r2.get().getResponseBody();
        String guestCountRes = r3.get().getResponseBody();
        String laborCostString = r4.get().getResponseBody();

        // Sales
        Double netSales = parseValueFieldName(netSalesDataString, "current");

        Double sameDayLastWeekSales = parseSameDayLWData(netSalesDataString);

        // Budget
        Double budgetedSales = parseBudget(netSalesDataString);

        // Check Count
        Double checkCount = parseValueFieldName(checkCountRes, "current");

        Double sameDayLastWeekCheckCount = parseSameDayLWData(checkCountRes);

        // Guest Count
        Double guestCount = parseValueFieldName(guestCountRes, "current");

        Double sameDayLastWeekGuestCount = parseSameDayLWData(guestCountRes);

        // Labor cost
        Double laborCost = parseValueFieldName(laborCostString, "current");

        Double sameDayLastWeeklaborCost = parseSameDayLWData(laborCostString);

        long checkCountLong = checkCount.longValue();
        long sameDayLastWeekCheckCountL = sameDayLastWeekCheckCount.longValue();
        long guestCountLong = guestCount.longValue();

        long sameDayLastWeekGuestCountL = sameDayLastWeekGuestCount.longValue();

        //Debugging:
//        System.out.println("===== Rerporting for " + dateOfBusiness + " =====");
//        System.out.println("Getting the data for " + name);
//        System.out.println("Getting the real netSales " + netSales);
//        System.out.println("Getting the real SDLW " + sameDayLastWeekSales);
//        System.out.println("Getting the real sales budget " + budgetedSales);
//        System.out.println("Getting the real checkCountLong " + checkCountLong);
//        System.out.println("Getting the real SDLW Check count " + sameDayLastWeekCheckCount);
//        System.out.println("Getting the real guestCountLong " + guestCountLong);
//        System.out.println("Getting the real SDLW guestCountLong " + sameDayLastWeekGuestCount);

        return new DailyData(name, netSales, sameDayLastWeekSales, budgetedSales, checkCountLong, sameDayLastWeekCheckCountL, guestCountLong, sameDayLastWeekGuestCountL, laborCost);
    }


    private static Double parseSameDayLWData(String netSalesDataString) {
        Double last = parseValueFieldName(netSalesDataString, "last");
        return last;
    }

    //Net sales, counts apparently has all their information stored in the first JSON node.
    private static JSONObject ParseJasonObjectWithIndex(String netSalesDataString, int index) {
        JSONObject json = new JSONObject(netSalesDataString);
        JSONArray results = json.getJSONArray("results");
        JSONObject curSalesJSONObject = (JSONObject) results.get(index);
        return curSalesJSONObject;
    }

    private static Double parseBudget(String netSalesDataString) {
        JSONObject curSalesJSONObject = ParseJasonObjectWithIndex(netSalesDataString, 0);

        JSONObject budget = (JSONObject) curSalesJSONObject.get("projected");
        String budgetSales = (String) budget.get("value"); //
        String parsedBudget = budgetSales.replaceAll("[^\\d.]", "");
        double budgetedSales = Strings.isEmpty(parsedBudget) ? 0.0 : Double.parseDouble(parsedBudget);
        return budgetedSales;
    }

    private static Double parseValueFieldName(String netSalesDataString, String fieldName) {
        JSONObject curSalesJSONObject = ParseJasonObjectWithIndex(netSalesDataString, 0);

        JSONObject currentDOB = (JSONObject) curSalesJSONObject.get(fieldName);
        String currentSales = (String) currentDOB.get("value"); //

        String parsedCurrentSales = currentSales.replaceAll("[^\\d.]", "");
        double netSales = Strings.isEmpty(parsedCurrentSales) ? 0.0 : Double.parseDouble(parsedCurrentSales);
        return netSales;
    }
}
