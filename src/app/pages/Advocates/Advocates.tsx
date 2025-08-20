"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AdvocateService } from "../../api/services/advocateService";
import AdvocateListItem from "../../components/AdvocateListItem/AdvocateListItem";
import "./Advocates.css";
import SortableHeader from "../../components/SortableHeader/SortableHeader";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

// Custom hook for debouncing
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AdvocatesPage = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the search term with 300ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    AdvocateService.getAdvocates()
      .then((res: any) => {
        setAdvocates(res);
        setFilteredAdvocates(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  // Use debounced search term for API calls
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) return; // Only proceed if debounced value matches current value

    setFilter(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const SortBy = async (
    sortBy: "firstName" | "lastName" | "city" | "degree" | "yearsOfExperience"
  ) => {
    // Toggle order if clicking same field, otherwise default to asc
    const newOrder =
      sortBy === sortField && sortOrder === "asc" ? "desc" : "asc";

    setSortField(sortBy);
    setSortOrder(newOrder);
    AdvocateService.getAdvocates(null, sortBy, newOrder)
      .then((res: any) => {
        setAdvocates(res);
        setFilteredAdvocates(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const setFilter = useCallback(async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const res = await AdvocateService.getAdvocates(searchTerm);
      setFilteredAdvocates(res);
    } catch (error) {
      console.error("Error filtering advocates:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
            <span className="results-number">{filteredAdvocates?.length}</span>{" "}
            of {advocates?.length} advocates
            {isLoading && (
              <span className="loading-indicator"> (Searching...)</span>
            )}
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="advocate-table">
          <thead>
            <tr>
              <SortableHeader
                sortBy={SortBy}
                sortField={sortField}
                sortOrder={sortOrder}
                field={"firstName"}
                header="First Name"
              />
              <SortableHeader
                sortBy={SortBy}
                sortField={sortField}
                sortOrder={sortOrder}
                field={"lastName"}
                header="Last Name"
              />
              <SortableHeader
                sortBy={SortBy}
                sortField={sortField}
                sortOrder={sortOrder}
                field={"city"}
                header="City"
              />
              <SortableHeader
                sortBy={SortBy}
                sortField={sortField}
                sortOrder={sortOrder}
                field={"degree"}
                header="Degree"
              />
              <th className="header">Specialties</th>
              <SortableHeader
                sortBy={SortBy}
                sortField={sortField}
                sortOrder={sortOrder}
                field={"yearsOfExperience"}
                header="Years of Experience"
              />
              <th className="header">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates?.map((advocate, index) => (
              <AdvocateListItem
                key={`${advocate.firstName}-${advocate.lastName}-${index}`}
                advocate={advocate}
              />
            ))}
          </tbody>
        </table>

        {filteredAdvocates?.length === 0 && (
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
