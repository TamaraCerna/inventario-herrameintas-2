package Backend.client_miroservice.DTO;

import com.example.clientservice.entity.enums.StateClient;
import jakarta.validation.constraints.NotNull;

public record UpdateClientStateRequest(@NotNull StateClient state) {}
