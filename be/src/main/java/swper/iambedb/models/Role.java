package swper.iambedb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role extends Auditable {
    @Id
    @GeneratedValue
    private long roleid;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties(value = "role", allowSetters = true)
    private Set<UserRoles> users = new HashSet<>();

    public Role() {}

    public Role(String name) {
        this.name = name.toUpperCase();
    }

    public long getRoleid() {
        return roleid;
    }

    public void setRoleid(long roleid) {
        this.roleid = roleid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name.toUpperCase();
    }

    public Set<UserRoles> getUsers() {
        return users;
    }

    public void setUsers(Set<UserRoles> users) {
        this.users = users;
    }
}
