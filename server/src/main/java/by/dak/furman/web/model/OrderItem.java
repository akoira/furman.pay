package by.dak.furman.web.model;

import furman.pay.model.AObject;

public class OrderItem extends AObject {
	private Order order;

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
}
