package swper.iambedb.models;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long messageid;

    private String subject;

    @Lob
    @Type(type = "text")
    @Column(nullable = false)
    private String body;

    @Email
    private String email;

    private Boolean read;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    public Message() {}

    public Message(String subject, String body, String email) {
        this.subject = subject;
        this.body = body;
        this.email = email;
    }

    public Message(String subject, String body, User user) {
        this.subject = subject;
        this.body = body;
        this.user = user;
    }

    public long getMessageid() {
        return messageid;
    }

    public void setMessageid(long messageid) {
        this.messageid = messageid;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
