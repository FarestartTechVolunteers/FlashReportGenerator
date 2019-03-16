package client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

public class CTUITClient {
    //TODO: don't use this main when demoing
    public static void main(String[] args) throws IOException {
        System.out.println("hello");

        /**
         * curl -X GET
         * --header 'Accept: application/json'
         * --header 'X-UserAuthToken: d098f5a7-d1a1-483b-87eb-3ee3d42dd3c6'
         * --header 'X-UserId: 128537'
         * 'https://api.ctuit.com/api/KeyInfo/Metrics'
         */
        String urlVariable = "https://api.ctuit.com/api/KeyInfo/Metrics";
        URL url = new URL(urlVariable);

        String authToken = "d098f5a7-d1a1-483b-87eb-3ee3d42dd3c6";
        String userId = "128537";
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("X-UserAuthToken", authToken);
        con.setRequestProperty("X-UserId", userId);


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
