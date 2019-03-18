package farestartreporting.client;

import org.asynchttpclient.*;
import org.asynchttpclient.util.HttpConstants;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

public class HTTPAsyncClient {
    public static void main(String[] args) throws ExecutionException, InterruptedException, IOException {
        System.out.println("testing asyn");

        AsyncHttpClient asyncHttpClient = Dsl.asyncHttpClient(Dsl.config().setConnectionTtl(100));

        CompletableFuture<Response> r1 = asyncHttpClient.prepareGet("http://www.example.com/").execute().toCompletableFuture();
        CompletableFuture<Response> r2 = asyncHttpClient.prepareGet("http://www.facebook.com/").execute().toCompletableFuture();
        CompletableFuture<Response> r3 = asyncHttpClient.prepareGet("http://www.amazon.com/").execute().toCompletableFuture();

        CompletableFuture.allOf(r1,r2,r3).join();

        System.out.println(r1.get().getStatusCode());
        System.out.println(r2.get().getStatusCode());
        System.out.println(r3.get().getStatusCode());

        asyncHttpClient.close();


    }
}
