package swper.iambedb.services;

import swper.iambedb.models.Poem;

public interface PoemService {
    Poem findPoemById(long id);
    Poem save(Poem poem);
    Poem update(Poem poem, long id);
    void delete(long id);
    void deleteAll();
}
