package swper.iambedb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import swper.iambedb.models.Poem;
import swper.iambedb.services.PoemService;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/poems")
public class PoemController {
    @Autowired
    private PoemService poemService;

    @GetMapping(value = "/poem/{id}", produces = "application/json")
    public ResponseEntity<?> getPoemById(@PathVariable long id) {
        Poem p = poemService.findPoemById(id);
        return new ResponseEntity<>(p, HttpStatus.OK);
    }

    @PostMapping(value = "/poem", consumes = "application/json")
    public ResponseEntity<?> addNewPoem(@Valid @RequestBody Poem newpoem) {
        newpoem.setPoemid(0);
        newpoem = poemService.save(newpoem);

        HttpHeaders responseHeaders = new HttpHeaders();
        URI newPoemURI = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{poemid}")
                .buildAndExpand(newpoem.getPoemid())
                .toUri();
        responseHeaders.setLocation(newPoemURI);

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }

    @PutMapping(value = "/poem/{id}", consumes = "application/json")
    public ResponseEntity<?> updatePoem(@Valid @RequestBody Poem updatedPoem, @PathVariable long id) {
        updatedPoem.setPoemid(id);
        poemService.update(updatedPoem, id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/poem/{id}")
    public ResponseEntity<?> deletePoemById(@PathVariable long id) {
        poemService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
