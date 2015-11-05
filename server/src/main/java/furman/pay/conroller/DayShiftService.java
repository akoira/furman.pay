package furman.pay.conroller;

import furman.pay.model.day.Day;
import furman.pay.model.day.DayShift;
import furman.pay.model.day.QDayShift;
import furman.pay.repository.ShiftRepository;
import furman.pay.repository.day.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * akoiro - 10/30/15.
 */
@RestController
public class DayShiftService {
    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private DayRepository dayRepository;

    @RequestMapping("/dayShiftService/findAllForDay")
    public Iterable<DayShift> findAllForDay(@RequestParam(required = true) String dayId) {
        Day day = dayRepository.findOne(dayId);
        Iterable<DayShift> result = shiftRepository.findAll(QDayShift.dayShift.day.eq(day));
        return result;
    }
}
