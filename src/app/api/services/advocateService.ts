import { SOLACE_DATABASE_URL, headers } from "./baseAPI";

export const AdvocateService = {
  getAdvocates: async () => {
    const response = await fetch(`${SOLACE_DATABASE_URL}/api/advocates`, {
      method: "GET",
      headers,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.error("Error getting advocates");

        return err;
      });

    return response;
  },
};
