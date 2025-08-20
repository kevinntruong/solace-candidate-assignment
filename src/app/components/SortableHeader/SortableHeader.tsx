const SortableHeader = ({
  header,
  sortBy,
  field,
  sortField,
  sortOrder,
}: {
  header: string;
  sortBy: (
    sortBy: "firstName" | "lastName" | "city" | "degree" | "yearsOfExperience"
  ) => {};
  field: "firstName" | "lastName" | "city" | "degree" | "yearsOfExperience";
  sortField: string;
  sortOrder: string;
}) => {
  // Helper function to render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField !== field) {
      return null;
    }
    return sortOrder === "desc" ? (
      <span className="sort-indicator sort-asc">↑</span>
    ) : (
      <span className="sort-indicator sort-desc">↓</span>
    );
  };

  return (
    <th className="sortable-header" onClick={() => sortBy(field)}>
      <div className="header-content">
        <span className="header-text">{header}</span>
        <span className="sort-indicator-container">
          {renderSortIndicator(field)}
        </span>
      </div>
    </th>
  );
};

export default SortableHeader;
