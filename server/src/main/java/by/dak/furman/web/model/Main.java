package by.dak.furman.web.model;

/**
 * User: akoyro
 * Date: 2/22/14
 * Time: 8:12 PM
 */
public class Main
{
    private boolean authenticated = false;

    public boolean isAuthenticated()
    {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated)
    {
        this.authenticated = authenticated;
    }
}
