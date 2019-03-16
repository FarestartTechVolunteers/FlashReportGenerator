package farestartreporting.client;

import farestartreporting.responseModel.BusinessLocation;
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


    public static BusinessLocation getBusinessLocationData(int locationGroupID, String dateOfBusiness) throws IOException {
        /**
         *    {
         "depth": 2,
         "description": "",
         "isPrimary": true,
         "locationGroupID": 6,
         "locationGroupName": "Maslows",
         "locationIDs": null,
         "parentLocationGroupID": 1,
         "sortOrder": 295,
         "weatherZip": null,
         "woeid": null
         },
         */


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

        JSONObject curSales = (JSONObject) results.get(0); // assume the zero
        JSONObject currentDOB = (JSONObject) curSales.get("current");
        String currentSales = (String) currentDOB.get("value"); //DOB

        double netSales = Double.parseDouble(currentSales.replaceAll("[^\\d.]", "0"));

        JSONObject rez = (JSONObject) results.get(3); // assume the third
        JSONObject currentBDOB = (JSONObject) rez.get("current");
        String currentBudget = (String) currentBDOB.get("value"); //BDOB
        double salesBudget = Double.parseDouble(currentBudget.replaceAll("[^\\d.]", "0"));

        Random rand = new Random();
        long n = rand.nextInt(10);

        System.out.println("Getting the real netSales " + netSales);
        System.out.println("Getting the real sales budget " + salesBudget);

        return new BusinessLocation("Maslows", netSales, salesBudget, n, n);
    }
}
