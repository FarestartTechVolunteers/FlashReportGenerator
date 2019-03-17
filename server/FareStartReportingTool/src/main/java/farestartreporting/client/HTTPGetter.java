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
    public static BusinessLocation getBusinessLocationData(String name, int locationGroupID, String dateOfBusiness) throws IOException {

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


        JSONObject json = new JSONObject(content.toString());
        JSONArray results = json.getJSONArray("results");

        JSONObject curSalesJSONObject = (JSONObject) results.get(0);
        JSONObject currentDOB = (JSONObject) curSalesJSONObject.get("current");
        String currentSales = (String) currentDOB.get("value"); //

        String parsedCurrentSales = currentSales.replaceAll("[^\\d.]", "");
        double netSales = Strings.isEmpty(parsedCurrentSales) ? 0.0 : Double.parseDouble(parsedCurrentSales);


        JSONObject budget = (JSONObject) curSalesJSONObject.get("projected"); // seems like this is the data they use for budget reporting
        String budgetSales = (String) budget.get("value"); //
        String parsedBudget = budgetSales.replaceAll("[^\\d.]", "");
        double budgetedSales = Strings.isEmpty(parsedBudget) ? 0.0 : Double.parseDouble(parsedBudget);


        // To rig the count
        Random rand = new Random();
        long n = rand.nextInt(10);

        //Debugging:
        System.out.println(urlVariable);
        System.out.println("Getting the data for " + name);
        System.out.println("Getting the real netSales " + netSales);
        System.out.println("Getting the real sales budget " + budgetedSales);

        return new BusinessLocation(name, netSales, budgetedSales, n, n);
    }
}
