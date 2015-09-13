package by.dak.furman.web.model.material;

import furman.pay.model.AObject;

public class Type extends AObject {
	private Category category;

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
}
