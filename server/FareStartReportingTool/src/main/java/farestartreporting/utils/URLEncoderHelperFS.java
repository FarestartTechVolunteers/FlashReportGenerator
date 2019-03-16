package farestartreporting.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;

public class URLEncoderHelperFS {

    public static String convertURL(Date date) throws UnsupportedEncodingException {
//        3-10-2019
        String dateString = date.toString();
        System.out.println(dateString);

        String pattern = "MM-dd-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String encoded = simpleDateFormat.format(date);

        System.out.println(encoded);
        return encoded;
    }

}
