package za.ac.cput.secretkey;

import io.jsonwebtoken.Jwts;
import jakarta.xml.bind.DatatypeConverter;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;

public class JwtSecretKeyGeneratorTest {
    @Test
    public void generateSecretKey(){
        SecretKey secretKey= Jwts.SIG.HS256.key().build();
        String encodedKey= DatatypeConverter.printHexBinary(secretKey.getEncoded());
        System.out.printf("\nKey = %s\n" ,encodedKey);
    }
}
