package Backend.client_miroservice.DTO;

public record ClientResponse(
        Long clientId,
        String clientName,
        String clientRut,
        String clientPhone,
        String clientEmail,
        String clientState
) {}
