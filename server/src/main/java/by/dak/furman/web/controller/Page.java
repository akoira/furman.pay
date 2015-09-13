package by.dak.furman.web.controller;

import java.util.List;

public class Page<V> {
    private int total;
    private List<V> result;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<V> getResult() {
        return result;
    }

    public void setResult(List<V> result) {
        this.result = result;
    }
}
