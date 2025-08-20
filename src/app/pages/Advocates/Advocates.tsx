"use client";

import { useEffect, useState, useCallback } from "react";
import { AdvocateService } from "../../api/services/advocateService";
import AdvocateListItem from "../../components/AdvocateListItem";
import "./Advocates.css";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

const AdvocatesPage = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AdvocateService.getAdvocates()
      .then((res: any) => {
        setAdvocates(res.data);
        setFilteredAdvocates(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilter(searchTerm);
  }, [searchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const setFilter = useCallback(
    (searchTerm: string) => {
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
    },
    [advocates]
  );

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <div className="advocates-container">
      <div className="page-header">
        <h1 className="page-title">Solace Advocates</h1>
        <p className="page-subtitle">
          Find the right mental health professional for you
        </p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              className="search-input"
              placeholder="Search by name, city, degree, specialty, or experience..."
              value={searchTerm}
              onChange={onChange}
            />
            <div className="search-icon">🔍</div>
          </div>
          <button className="reset-button" onClick={resetSearch}>
            Reset
          </button>
        </div>

        <div className="search-info">
          <p className="search-status">
            Searching for:{" "}
            <span className="search-term">{searchTerm || "All advocates"}</span>
          </p>
          <p className="results-count">
            Showing{" "}
            <span className="results-number">{filteredAdvocates.length}</span>{" "}
            of {advocates.length} advocates
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="advocate-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate, index) => (
              <AdvocateListItem
                key={`${advocate.firstName}-${advocate.lastName}-${index}`}
                advocate={advocate}
              />
            ))}
          </tbody>
        </table>

        {filteredAdvocates.length === 0 && (
          <div className="empty-state">
            <p>No advocates found matching your search criteria.</p>
            <button className="clear-search-button" onClick={resetSearch}>
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvocatesPage;
