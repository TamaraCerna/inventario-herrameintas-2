export const comprobeSimulatedInterestRate = (
  creditType,
  simulatedInterestRate
) => {
  if (creditType == "firstHome") {
    if (3.5 <= simulatedInterestRate && simulatedInterestRate <= 5.0) {
      return true;
    } else {
      return false;
    }
  }
  if (creditType == "secondHome") {
    if (4.0 <= simulatedInterestRate && simulatedInterestRate <= 6.0) {
      return true;
    } else {
      return false;
    }
  }
  if (creditType == "commercialProperty") {
    if (5.0 <= simulatedInterestRate && simulatedInterestRate <= 7.0) {
      return true;
    } else {
      return false;
    }
  }
  if (creditType == "remodeling") {
    if (4.5 <= simulatedInterestRate && simulatedInterestRate <= 6.0) {
      return true;
    } else {
      return false;
    }
  }
};
