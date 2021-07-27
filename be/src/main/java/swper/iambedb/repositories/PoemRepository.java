package swper.iambedb.repositories;

import org.springframework.data.repository.CrudRepository;
import swper.iambedb.models.Poem;

public interface PoemRepository extends CrudRepository<Poem, Long> {
}
