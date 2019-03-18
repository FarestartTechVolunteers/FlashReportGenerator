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


    public static String netSalesData(int locationGroupID, String dateOfBusiness) throws IOException {
        // For net sales
        dateOfBusiness = "3-11-2019";
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


        Double netSales = parseNetSales(netSalesDataString);


        Double budgetedSales = parseBudget(netSalesDataString);


        // To rig the count
        Random rand = new Random();
        long n = rand.nextInt(10);

        //Debugging:
        System.out.println("Getting the data for " + name);
        System.out.println("Getting the real netSales " + netSales);
        System.out.println("Getting the real sales budget " + budgetedSales);

        return new BusinessLocation(name, netSales, budgetedSales, n, n);
    }

    private static JSONObject parseSalesObject(String netSalesDataString) {
        JSONObject json = new JSONObject(netSalesDataString);
        JSONArray results = json.getJSONArray("results");
        JSONObject curSalesJSONObject = (JSONObject) results.get(0);
        return curSalesJSONObject;
    }

    private static Double parseBudget(String netSalesDataString) {
        JSONObject curSalesJSONObject = parseSalesObject(netSalesDataString);

        JSONObject budget = (JSONObject) curSalesJSONObject.get("projected");
        String budgetSales = (String) budget.get("value"); //
        String parsedBudget = budgetSales.replaceAll("[^\\d.]", "");
        double budgetedSales = Strings.isEmpty(parsedBudget) ? 0.0 : Double.parseDouble(parsedBudget);
        return budgetedSales;
    }

    private static Double parseNetSales(String netSalesDataString) {
        JSONObject curSalesJSONObject = parseSalesObject(netSalesDataString);

        JSONObject currentDOB = (JSONObject) curSalesJSONObject.get("current");
        String currentSales = (String) currentDOB.get("value"); //

        String parsedCurrentSales = currentSales.replaceAll("[^\\d.]", "");
        double netSales = Strings.isEmpty(parsedCurrentSales) ? 0.0 : Double.parseDouble(parsedCurrentSales);
        return netSales;
    }
}
