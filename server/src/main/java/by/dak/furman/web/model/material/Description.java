package by.dak.furman.web.model.material;

import furman.pay.model.AObject;

public class Description extends AObject {
    private Type type;
    private Code code;

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Code getCode() {
        return code;
    }

    public void setCode(Code code) {
        this.code = code;
    }
}
