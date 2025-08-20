const AdvocateListItem = (advocate: Advocate, key?: string) => {
  return (
    <>
      <tr key={key}>
        <td>{advocate.firstName}</td>
        <td>{advocate.lastName}</td>
        <td>{advocate.city}</td>
        <td>{advocate.degree}</td>
        <td>
          {advocate.specialties.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </td>
        <td>{advocate.yearsOfExperience}</td>
        <td>{advocate.phoneNumber}</td>
      </tr>
    </>
  );
};

export default AdvocateListItem;
