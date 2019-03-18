package farestartreporting;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class ReportController {

    private List<String> tasks = Arrays.asList("a", "b", "c", "d", "e", "f", "g");

    @GetMapping("/hello")
    public String showHello(Model model) {
        model.addAttribute("message", "hello Jenny Lian");
        model.addAttribute("tasks", tasks);

        return "welcome";
    }

}
