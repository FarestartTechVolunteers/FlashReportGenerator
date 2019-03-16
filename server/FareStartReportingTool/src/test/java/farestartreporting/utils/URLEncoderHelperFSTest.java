package farestartreporting.utils;

import org.junit.Test;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import static org.junit.Assert.*;

public class URLEncoderHelperFSTest {
    URLEncoderHelperFS encoder = new URLEncoderHelperFS();
    @Test
    public void TestTrue(){
        assertTrue(true);
    }

    @Test
    public void convertDate() throws UnsupportedEncodingException {
        Date d = new Date("16 Mar 2019 19:52:00 GMT");
        String s = encoder.convertURL(d);

        String expected = "03-16-2019";
        assertEquals(expected, s);
    }
}