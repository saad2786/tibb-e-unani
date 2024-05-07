import supabase from "./supabase";

export async function getRecords() {
  try {
    let { data: records, error } = await supabase.from("records").select("*");

    return { records, error };
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchRecords() {
  try {
    const data = await getRecords();
    if (data.error) return data.error;
    return data.records;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addRecord({ cause, medicien, growth, payment, mid }) {
  try {
    const { data: record, error } = await supabase
      .from("records")
      .insert([
        {
          cause: `${cause}`,
          desc: "",
          growth: growth,
          medicien: `${medicien}`,
          payment: payment,
          mid: mid,
        },
      ])
      .select();
    return { record, error };
  } catch (error) {
    return error.message;
  }
}
