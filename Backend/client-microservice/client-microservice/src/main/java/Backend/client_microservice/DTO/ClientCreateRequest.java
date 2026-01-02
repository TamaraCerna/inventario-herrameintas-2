package Backend.client_miroservice.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ClientCreateRequest(
        @NotBlank @Size(max = 100) String clientName,
        @NotBlank @Size(max = 20) String clientRut,
        @Size(max = 20) String clientPhone,
        @NotBlank @Email @Size(max = 150) String clientEmail
) {}
