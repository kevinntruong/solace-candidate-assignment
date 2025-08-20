"use client";

import { useEffect, useState } from "react";
import { AdvocateService } from "../../api/services/advocateService";
import AdvocateListItem from "../../components/AdvocateListItem";

const AdvocatesPage = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AdvocateService.getAdvocates()
      .then((res) => {
        setAdvocates(res.data);
        setFilteredAdvocates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilter(searchTerm);
  }, [searchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const setFilter = (searchTerm: string) => {
    //Set Filter
    const filteredAdvocates = advocates.filter((advocate) => {
      const normalizedSearchTerm = searchTerm.toLowerCase();

      const firstNameMatch = advocate.firstName
        .toLowerCase()
        .includes(normalizedSearchTerm);

      const lastNameMatch = advocate.lastName
        .toLowerCase()
        .includes(normalizedSearchTerm);

      const cityMatch = advocate.city
        .toLowerCase()
        .includes(normalizedSearchTerm);

      const degreeMatch = advocate.degree
        .toLowerCase()
        .includes(normalizedSearchTerm);

      const specialtiesMatch = advocate.specialties.find((s) => {
        return s.toLowerCase().includes(normalizedSearchTerm);
      });

      const yearsOfExperienceMatch = advocate.yearsOfExperience
        .toString()
        .includes(normalizedSearchTerm);

      return (
        firstNameMatch ||
        lastNameMatch ||
        cityMatch ||
        degreeMatch ||
        specialtiesMatch ||
        yearsOfExperienceMatch
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearch = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };
  return (
    <>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={onChange}
        />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
      <div>
        <p>
          Results: <span id="results">{filteredAdvocates.length}</span>
        </p>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th key={"first-name"}>First Name</th>
            <th key={"last-name"}>Last Name</th>
            <th key={"city"}>City</th>
            <th key={"degree"}>Degree</th>
            <th key={"specialties"}>Specialties</th>
            <th key={"years-of-experience"}>Years of Experience</th>
            <th key={"phone-number"}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <AdvocateListItem
                key={`${advocate.firstName}-${advocate.lastName}-${index}`}
                {...advocate}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdvocatesPage;
