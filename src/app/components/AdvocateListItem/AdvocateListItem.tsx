import "./AdvocateListItem.css";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

// Phone number formatting function
const formatPhoneNumber = (phoneNumber: number): string => {
  const phoneString = phoneNumber.toString();

  // Handle 10-digit phone numbers (most common)
  if (phoneString.length === 10) {
    return `(${phoneString.slice(0, 3)}) ${phoneString.slice(
      3,
      6
    )}-${phoneString.slice(6)}`;
  }

  // Handle 7-digit phone numbers
  if (phoneString.length === 7) {
    return `${phoneString.slice(0, 3)}-${phoneString.slice(3)}`;
  }

  // For other formats, return as is
  return phoneString;
};

const AdvocateListItem = ({
  advocate,
  key,
}: {
  advocate: Advocate;
  key?: string;
}) => {
  return (
    <tr key={key} className="advocate-row">
      <td className="advocate-name">{advocate.firstName}</td>
      <td className="advocate-name">{advocate.lastName}</td>
      <td className="advocate-city">{advocate.city}</td>
      <td>
        <div className="advocate-degree">{advocate.degree}</div>
      </td>
      <td className="advocate-specialties">
        <ul className="specialties-list">
          {advocate.specialties.map((specialty, index) => (
            <li key={index} className="specialty-tag">
              {specialty}
            </li>
          ))}
        </ul>
      </td>
      <td className="advocate-experience">
        {advocate.yearsOfExperience} years
      </td>
      <td className="advocate-phone">
        {formatPhoneNumber(advocate.phoneNumber)}
      </td>
    </tr>
  );
};

export default AdvocateListItem;
