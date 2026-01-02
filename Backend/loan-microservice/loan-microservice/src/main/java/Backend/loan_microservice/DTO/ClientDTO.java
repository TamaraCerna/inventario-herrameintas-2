package Backend.loan_microservice.DTO;

public class ClientDTO {
    private Long clientId;
    private String clientState;

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientState() {
        return clientState;
    }

    public void setClientState(String clientState) {
        this.clientState = clientState;
    }
}
