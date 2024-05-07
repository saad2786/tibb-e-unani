import { getMembers } from "../../services/apiMembers";

export const fetchPatients = async () => {
  try {
    const data = await getMembers();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
