package Backend.client_microservice.DTO;

import Backend.client_microservice.entity.StateClient;
import jakarta.validation.constraints.NotNull;

public record UpdateClientStateRequest(
        @NotNull StateClient state
) {}
