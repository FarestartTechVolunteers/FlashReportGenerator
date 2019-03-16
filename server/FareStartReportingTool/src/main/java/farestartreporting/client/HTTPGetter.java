package farestartreporting.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

public class HTTPGetter {

    public static final String AUTH_TOKEN = "d098f5a7-d1a1-483b-87eb-3ee3d42dd3c6";
    public static final String USER_ID = "128537";


    //TODO: don't use this main when demoing
    public static void main(String[] args) throws IOException {

//        getKeyMetrics();
//        getLocationGroups();
        getReportForMaslow();

    }

    private static void getReportForMaslow() throws IOException {

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

        String urlVariable = "https://api.ctuit.com/api/KeyInfo/2/16%20Mar%202019%2019%3A52%3A00%20GMT/1";
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

    public static class ParameterStringBuilder {
        public static String getParamsString(Map<String, String> params)
                throws UnsupportedEncodingException {
            StringBuilder result = new StringBuilder();

            for (Map.Entry<String, String> entry : params.entrySet()) {
                result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
                result.append("=");
                result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
                result.append("&");
            }

            String resultString = result.toString();
            return resultString.length() > 0
                    ? resultString.substring(0, resultString.length() - 1)
                    : resultString;
        }
    }
}
