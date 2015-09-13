package by.dak.furman.web.model.material;

import furman.pay.model.AObject;

public class Code extends AObject {
    private String code;

	private Category category;
	private Manufacture manufacture;

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Manufacture getManufacture() {
		return manufacture;
	}

	public void setManufacture(Manufacture manufacture) {
		this.manufacture = manufacture;
	}

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
