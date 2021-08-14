package swper.iambedb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swper.iambedb.exceptions.ResourceNotFoundException;
import swper.iambedb.models.Poem;
import swper.iambedb.models.User;
import swper.iambedb.models.UserPoems;
import swper.iambedb.repositories.PoemRepository;

@Transactional
@Service(value = "poemService")
public class PoemServiceImpl implements PoemService {
    @Autowired
    private PoemRepository poemrepos;

    @Autowired
    private UserService userService;

    public Poem findPoemById(long id) {
        return poemrepos.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Poem id " + id + " not found!"));
    }

    @Transactional
    @Override
    public Poem save(Poem poem) {
        Poem newPoem = new Poem();
        if (poem.getPoemid() != 0) {
            poemrepos.findById(poem.getPoemid())
                    .orElseThrow(() -> new ResourceNotFoundException("Poem id " + poem.getPoemid() + " not found!"));
            newPoem.setPoemid(poem.getPoemid());
        }

        newPoem.setTitle(poem.getTitle());
        newPoem.setAuthor(poem.getAuthor());
        newPoem.setText(poem.getText());
        newPoem.setPublication(poem.getPublication());
        newPoem.setNotes(poem.getNotes());

        newPoem.getUsers().clear();
        for (UserPoems up : poem.getUsers()) {
            User addUser = userService.findUserById(up.getUser().getUserid());
            newPoem.getUsers().add(new UserPoems(addUser, newPoem));
        }

        if (newPoem.getUsers().size() == 0) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User addUser = userService.findByName(authentication.getName());
            newPoem.getUsers().add(new UserPoems(addUser, newPoem));
        }

        return poemrepos.save(newPoem);
    }

    @Transactional
    @Override
    public Poem update(Poem poem, long id) {
        Poem currentPoem = findPoemById(id);

        if (poem.getAuthor() != null) {
            currentPoem.setAuthor(poem.getAuthor());
        }

        if (poem.getTitle() != null) {
            currentPoem.setTitle(poem.getTitle());
        }

        if (poem.getText() != null) {
            currentPoem.setText(poem.getText());
        }

        if (poem.getPublication() != null) {
            currentPoem.setPublication(poem.getPublication());
        }

        if (poem.getNotes() != null) {
            currentPoem.setNotes(poem.getNotes());
        }

        if (poem.getUsers().size() > 0) {
            currentPoem.getUsers().clear();
            for (UserPoems up : poem.getUsers()) {
                User addUser = userService.findUserById(up.getUser().getUserid());
                currentPoem.getUsers().add(new UserPoems(addUser, currentPoem));
            }
        }

        return poemrepos.save(currentPoem);
    }

    @Transactional
    @Override
    public void delete(long id) {
        poemrepos.findById(id).orElseThrow(() -> new ResourceNotFoundException("Poem id " + id + " not found!"));
        poemrepos.deleteById(id);
    }

    @Transactional
    @Override
    public void deleteAll() {
        poemrepos.deleteAll();
    }
}
