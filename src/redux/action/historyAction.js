export const PUSH_LOCATION_TO_HISTORY = "PUSH_LOCATION_TO_HISTORY";
export const POP_LOCATION_FROM_HISTORY = "POP_LOCATION_FROM_HISTORY";

export const pushLocationToHistory = (location) => {
  return {
    type: PUSH_LOCATION_TO_HISTORY,
    payload: location,
  };
};

export const popLocationFromHistory = () => {
  return {
    type: POP_LOCATION_FROM_HISTORY,
  };
};
