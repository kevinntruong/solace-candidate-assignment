type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: "MD" | "PhD" | "MSW" | "";
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt: Date;
};
