package swper.iambedb.models;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserPoemsId implements Serializable {
    private long user;
    private long poem;

    public UserPoemsId() {}

    public long getUser() { return user; }
    public void setUser(long user) { this.user = user; }

    public long getPoem() { return poem; }
    public void setPoem(long poem) { this.poem = poem; }

    @Override
    public boolean equals(Object o) {
        if (this == o) { return true; }
        if (o == null || getClass() != o.getClass()) { return false; }
        UserPoemsId that = (UserPoemsId) o;
        return user == that.user && poem == that.poem;
    }

    @Override
    public int hashCode() { return 1; }
}
