package swper.iambedb.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super("Error from iambe-db: " + message);
    }
}
