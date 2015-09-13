package by.dak.furman.web.model;

import furman.pay.model.AObject;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * User: akoyro
 * Date: 2/22/14
 * Time: 9:56 PM
 */
@Document
public class User extends AObject {
    private String password;

    @DBRef
    private Contact contact;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }
}
