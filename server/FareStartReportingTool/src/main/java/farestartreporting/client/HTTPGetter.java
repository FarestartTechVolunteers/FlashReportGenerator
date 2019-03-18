package farestartreporting.client;

import farestartreporting.responseModel.BusinessLocation;
import org.apache.logging.log4j.util.Strings;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Random;

public class HTTPGetter {

    public static final String AUTH_TOKEN = "d098f5a7-d1a1-483b-87eb-3ee3d42dd3c6";
    public static final String USER_ID = "128537";


    /*Period Dype
     *  {
     "id": 1,
     "name": "Week",
     "periodTypeID": 1,
     "periodTypeName": "Week"
     },

     */

    public static String getCheckCount(int locationGroupID, String dateOfBusiness) throws IOException {
        // For net sales
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/" + locationGroupID + "/" + dateOfBusiness + "/8";

        URL url = new URL(urlVariable);

        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("X-UserAuthToken", AUTH_TOKEN);
        con.setRequestProperty("X-UserId", USER_ID);

        int status = con.getResponseCode();
        System.out.println(status);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        return content.toString();
    }

    public static String getGuestCount(int locationGroupID, String dateOfBusiness) throws IOException {
        // For net sales
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/" + locationGroupID + "/" + dateOfBusiness + "/7";

        URL url = new URL(urlVariable);

        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("X-UserAuthToken", AUTH_TOKEN);
        con.setRequestProperty("X-UserId", USER_ID);

        int status = con.getResponseCode();
        System.out.println(status);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        return content.toString();
    }

    public static String netSalesData(int locationGroupID, String dateOfBusiness) throws IOException {
        // For net sales
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/" + locationGroupID + "/" + dateOfBusiness + "/1";

        URL url = new URL(urlVariable);

        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("X-UserAuthToken", AUTH_TOKEN);
        con.setRequestProperty("X-UserId", USER_ID);

        int status = con.getResponseCode();
        System.out.println(status);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        return content.toString();
    }

    public static BusinessLocation getBusinessLocationData(String name, int locationGroupID, String dateOfBusiness) throws IOException {

        String netSalesDataString = netSalesData(locationGroupID, dateOfBusiness);

        Double netSales = parseCurrentValue(netSalesDataString);

        Double budgetedSales = parseBudget(netSalesDataString);

        String checkCountRes = getCheckCount(locationGroupID, dateOfBusiness);

        Double checkCount = parseCurrentValue(checkCountRes);

        String guestCountRes = getGuestCount(6, dateOfBusiness);

        Double guestCount = parseCurrentValue(guestCountRes);


        long checkCountLong = checkCount.longValue();
        long guestCountLong = guestCount.longValue();


        //Debugging:
        System.out.println("Getting the data for " + name);
        System.out.println("Getting the real netSales " + netSales);
        System.out.println("Getting the real sales budget " + budgetedSales);
        System.out.println("Getting the real checkCountLong " + checkCountLong);
        System.out.println("Getting the real guestCountLong " + guestCountLong);

        return new BusinessLocation(name, netSales, budgetedSales, checkCountLong, guestCountLong);
    }

    //Net sales, counts apparently has all their information stored in the first JSON node.
    private static JSONObject parseFirstObject(String netSalesDataString) {
        JSONObject json = new JSONObject(netSalesDataString);
        JSONArray results = json.getJSONArray("results");
        JSONObject curSalesJSONObject = (JSONObject) results.get(0);
        return curSalesJSONObject;
    }

    private static Double parseBudget(String netSalesDataString) {
        JSONObject curSalesJSONObject = parseFirstObject(netSalesDataString);

        JSONObject budget = (JSONObject) curSalesJSONObject.get("projected");
        String budgetSales = (String) budget.get("value"); //
        String parsedBudget = budgetSales.replaceAll("[^\\d.]", "");
        double budgetedSales = Strings.isEmpty(parsedBudget) ? 0.0 : Double.parseDouble(parsedBudget);
        return budgetedSales;
    }

    private static Double parseCurrentValue(String netSalesDataString) {
        JSONObject curSalesJSONObject = parseFirstObject(netSalesDataString);

        JSONObject currentDOB = (JSONObject) curSalesJSONObject.get("current");
        String currentSales = (String) currentDOB.get("value"); //

        String parsedCurrentSales = currentSales.replaceAll("[^\\d.]", "");
        double netSales = Strings.isEmpty(parsedCurrentSales) ? 0.0 : Double.parseDouble(parsedCurrentSales);
        return netSales;
    }
}
