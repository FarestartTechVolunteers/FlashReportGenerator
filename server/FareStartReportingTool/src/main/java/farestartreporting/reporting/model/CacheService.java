package farestartreporting.reporting.model;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import farestartreporting.responseModel.BusinessReport;


import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class CacheService {
    public static Cache<String, BusinessReport> businessReportCache = CacheBuilder.newBuilder()
            .maximumSize(1000)
            .expireAfterAccess(24, TimeUnit.HOURS)
            .build(
                    new CacheLoader<String, BusinessReport>() {
                        public BusinessReport load(String date) throws InterruptedException, ExecutionException, IOException {
                            return new BusinessReport(date);
                        }
                    }
            );
}
