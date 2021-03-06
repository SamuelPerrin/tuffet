package swper.iambedb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import swper.iambedb.models.*;
import swper.iambedb.services.MessageService;
import swper.iambedb.services.PoemService;
import swper.iambedb.services.RoleService;
import swper.iambedb.services.UserService;

@Transactional
@ConditionalOnProperty(
        prefix = "command.line.runner",
        value = "enabled",
        havingValue = "true",
        matchIfMissing = true)
@Component
public class SeedData implements CommandLineRunner {
    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    PoemService poemService;

    @Autowired
    MessageService messageService;

    @Transactional
    @Override
    public void run(String[] args) throws Exception {

        userService.deleteAll();
        roleService.deleteAll();
        poemService.deleteAll();

        Role r1 = new Role("admin");
        Role r2 = new Role("user");

        r1 = roleService.save(r1);
        r2 = roleService.save(r2);

        User u1 = new User("admin","password","admin@test.local");
        u1.getRoles().add(new UserRoles(u1, r1));
        u1 = userService.save(u1);

        User u2 = new User("user", "password", "user@test.local");
        u2.getRoles().add(new UserRoles(u2, r2));
        u2 = userService.save(u2);

        Poem p1 = new Poem(
            "Mary had a little lamb",
            "Mother Goose",
            "Mary had a little lamb\nWhose fleece was white as snow\nAnd everywhere that Mary went\nThe lamb was sure to go");
        p1.getUsers().add(new UserPoems(u2, p1));
        p1 = poemService.save(p1);

        Poem p2 = new Poem(
                "Jack Sprat",
                "",
                "Jack Sprat\nCould eat no fat\nHis wife could eat no lean\nBut together both\nThey licked the platter clean"
        );
        p2.getUsers().add(new UserPoems(u2, p2));
        p2 = poemService.save(p2);

        Poem p3 = new Poem(
                "",
                "Mother Goose",
                "Humpty Dumpty sat on a wall;\nHumpty Dumpty had a great fall,\nAnd all the king's horses and all the kings men\nCouldn't put Humpty together again",
                "1797",
                "Un petit d'un petit s'etonne aux Halles"
        );
        p3.getUsers().add(new UserPoems(u2, p3));
        p3 = poemService.save(p3);

        Poem p4 = new Poem(
                "", "Mother Goose", "Jack and Jill\nWent up the hill\nTo fetch a pail of water.\nJack fell down\nAnd broke his crown\nAnd Jill went tumbling after."
        );
        p4.getUsers().add(new UserPoems(u2, p4));
        p4 = poemService.save(p4);

        Message m1 = new Message("This is the subject","Sample body of the message goes here.", u2);
        m1 = messageService.save(m1);

        Message m2 = new Message("Hello, there!", "This is just to say how great everything is!","test@test.tech");
        m2 = messageService.save(m2);

        Message m3 = new Message("What happens to the title field if the title is long?", "Once upon a time there was a body that was a little bit longer than anyone was expecting", u2);
        m3 = messageService.save(m3);
    }
}
