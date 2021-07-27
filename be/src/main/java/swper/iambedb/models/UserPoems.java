package swper.iambedb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "userpoems")
@IdClass(UserPoemsId.class)
public class UserPoems extends Auditable implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name = "userid")
    @JsonIgnoreProperties(value = "poems", allowSetters = true)
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "poemid")
    @JsonIgnoreProperties(value = "users", allowSetters = true)
    private Poem poem;

    public UserPoems() {}

    public UserPoems(User user, Poem poem) {
        this.user = user;
        this.poem = poem;
    }

    public User getUser() { return user; }

    public void setUser (User user) { this.user = user; }

    public Poem getPoem() { return poem; }

    public void setPoem(Poem poem) { this.poem = poem; }

    @Override
    public boolean equals(Object o) {
        if (this == o) { return true; }
        if (!(o instanceof UserPoems)) { return false; }

        UserPoems that = (UserPoems) o;
        return ((user == null) ? 0 : user.getUserid()) == ((that.user == null) ? 0 : that.user.getUserid()) &&
                ((poem == null) ? 0 : poem.getPoemid()) == ((that.poem == null) ? 0 : that.poem.getPoemid());
    }

    @Override
    public int hashCode() { return 1; }
}
