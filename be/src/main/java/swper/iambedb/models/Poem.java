package swper.iambedb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "poems")
public class Poem extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long poemid;

    private String title;

    private String author;

    @Lob
    @Type(type = "text")
    @Column(nullable = false)
    private String text;

    private String publication;

    @Lob
    @Type(type = "text")
    private String notes;

    @OneToMany(mappedBy = "poem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties(value = "poem", allowSetters = true)
    private List<UserPoems> users = new ArrayList<>();

    public Poem() {}

    public Poem(String title, String author, String text) {
        this.title = title;
        this.author = author;
        this.text = text;
    }

    public Poem(String title, String author, String text, String publication, String notes) {
        this.title = title;
        this.author = author;
        this.text = text;
        this.publication = publication;
        this.notes = notes;
    }

    public long getPoemid() {
        return poemid;
    }

    public void setPoemid(long poemid) {
        this.poemid = poemid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<UserPoems> getUsers() {
        return users;
    }

    public void setUsers(List<UserPoems> users) {
        this.users = users;
    }
}
