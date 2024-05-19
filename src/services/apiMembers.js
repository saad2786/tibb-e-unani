import supabase from "./supabase";

export const getMembers = async () => {
  try {
    let { data: members, error } = await supabase.from("members").select("*");
    return { members, error };
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export async function fetchPatients() {
  try {
    const data = await getMembers();
    return data.members;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addMember({
  patientName,
  mobile,
  address,
  gender,
  age,
  diabeties,
  bp,
  mizajT,
  mizajG,
}) {
  try {
    const { data: members, error } = await supabase
      .from("members")
      .insert([
        {
          patientName: `${patientName}`,
          mobile: `${mobile}`,
          address: `${address}`,
          gender: gender,
          age: age,
          diabeties: diabeties,
          bp: bp,
          mizajG: `${mizajG}`,
          mizajT: `${mizajT}`,
        },
      ])
      .select();

    return { members, error };
  } catch (error) {
    return error.message;
  }
}

export async function updateMember({
  mid,
  patientName,
  mobile,
  address,
  gender,
  age,
  diabeties,
  bp,
  mizajT,
  mizajG,
}) {
  try {
    const { data: members, error } = await supabase
      .from("members")
      .update({
        patientName: `${patientName}`,
        mobile: `${mobile}`,
        address: `${address}`,
        gender: gender,
        age: age,
        diabeties: diabeties,
        bp: bp,
        mizajG: mizajG,
        mizajT: mizajT,
      })
      .eq("mid", mid)
      .select();

    return { members, error };
  } catch (error) {
    return error.message;
  }
}
