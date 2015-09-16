package furman.core.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author Denis Koyro
 * @version 0.1 16.10.2008
 * @introduced [Builder | Overview ]
 * @since 2.0.0
 */
@Entity

@Table(name = "CUSTOMER")
public class Customer extends AObject {
    @Column(name = "NAME", nullable = false, length = 255)
    private String name;

    @Column(name = "ADDRESS", nullable = true, length = 255)
    private String address;

    @Column(name = "PHONE_NUMBER", nullable = true)
    private String phoneNumber;

    @Column(name = "PHONE_NUMBER1", nullable = true)
    private String phoneNumber1;

    @Column(name = "FAX_NUMBER", nullable = true)
    private String faxNumber;

    @Column(name = "EMAIL_ADDRESS", nullable = true, length = 255)
    private String emailAddress;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setFaxNumber(String faxNumber) {
        this.faxNumber = faxNumber;
    }

    public String getFaxNumber() {
        return faxNumber;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    /**
     * @return the phoneNumber1
     */
    public String getPhoneNumber1() {
        return phoneNumber1;
    }

    /**
     * @param phoneNumber1 the phoneNumber1 to set
     */
    public void setPhoneNumber1(String phoneNumber1) {
        this.phoneNumber1 = phoneNumber1;
    }
}
