import { SOLACE_DATABASE_URL, headers } from "./baseAPI";

export const AdvocateService = {
  getAdvocates: async (
    searchTerm?: string | null,
    sortBy?:
      | "firstName"
      | "lastName"
      | "city"
      | "degree"
      | "yearsOfExperience"
      | null,
    sortOrder?: "desc" | "asc" | null,
    limit?: number | null,
    offset?: number | null
  ) => {
    const getURL = () => {
      let URL = "";
      if (searchTerm) {
        URL = searchTerm
          ? `${SOLACE_DATABASE_URL}/api/advocates?search=${searchTerm}`
          : `${SOLACE_DATABASE_URL}/api/advocates`;
      } else if (sortBy) {
        URL = `${SOLACE_DATABASE_URL}/api/advocates?sortBy=${sortBy}&sortOrder=${
          sortOrder ? sortOrder : "asc"
        }`;
      } else {
        URL = `${SOLACE_DATABASE_URL}/api/advocates`;
      }

      return URL;
    };

    const response = await fetch(getURL(), {
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
