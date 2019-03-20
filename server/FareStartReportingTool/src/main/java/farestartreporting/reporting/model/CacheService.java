package farestartreporting.reporting.model;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import farestartreporting.responseModel.BusinessReport;


import java.io.IOException;
import java.text.ParseException;
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

    public static Cache<String, WeeklyReport> weeklyReportCache = CacheBuilder.newBuilder()
            .maximumSize(1000)
            .expireAfterAccess(24, TimeUnit.HOURS)
            .build(
                    new CacheLoader<String, WeeklyReport>() {
                        public WeeklyReport load(String startDate) throws InterruptedException, ExecutionException, IOException, ParseException {
                            return new WeeklyReport(startDate);
                        }
                    }
            );

}
