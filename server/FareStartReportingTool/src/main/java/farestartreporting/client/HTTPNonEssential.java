package farestartreporting.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HTTPNonEssential {
    public static final String AUTH_TOKEN = "d098f5a7-d1a1-483b-87eb-3ee3d42dd3c6";
    public static final String USER_ID = "128537";

    public static void main(String[] args) {

    }
    public static void getKeyMetrics() throws IOException {
        System.out.println("hello testing the client");

        /**
         * curl -X GET
         * --header 'Accept: application/json'
         * --header 'X-UserAuthToken: d098f5a7-d1a1-483b-87eb-3ee3d42dd3c6'
         * --header 'X-UserId: 128537'
         * 'https://api.ctuit.com/api/KeyInfo/Metrics'
         */
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/Metrics";
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

        System.out.println(content.toString());

//        {"id":1,"isReversed":false,"name":"Net Sales"}
//        {
//            "id": 7,
//                "isReversed": false,
//                "name": "Guest Ct"
//        },
//        {
//            "id": 8,
//                "isReversed": false,
//                "name": "Check Ct"
//        },
    }


    /**
     * Location groups
     * {
     * "depth": 2,
     * "description": "",
     * "isPrimary": true,
     * "locationGroupID": 7,
     * "locationGroupName": "Rise Coffee",
     * "locationIDs": null,
     * "parentLocationGroupID": 1,
     * "sortOrder": 302,
     * "weatherZip": null,
     * "woeid": null
     * },
     * <p>
     * {
     * "depth": 2,
     * "description": "",
     * "isPrimary": true,
     * "locationGroupID": 6,
     * "locationGroupName": "Maslows",
     * "locationIDs": null,
     * "parentLocationGroupID": 1,
     * "sortOrder": 295,
     * "weatherZip": null,
     * "woeid": null
     * },
     * {
     *
     * @throws IOException
     */

//    public static List
    public static void getLocationGroups() throws IOException {
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/AvailableLocationGroups";
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

        System.out.println(content.toString());
    }



}
