import supabase from "./supabase";

export async function getRecords() {
  try {
    let { data: records, error } = await supabase.from("records").select("*");

    let { data: mediciens } = await supabase.from("mediciens").select("*");

    return { records, mediciens, error };
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchRecords() {
  try {
    const data = await getRecords();
    if (data.error) return data.error;
    return { records: data.records, mediciens: data.mediciens };
  } catch (error) {
    console.log(error.message);
  }
}

export async function addRecord({ cause, mediciens, growth, payment, mid }) {
  try {
    const { data: record, error } = await supabase
      .from("records")
      .insert([
        {
          cause: `${cause}`,
          desc: "",
          growth: growth,
          payment: payment,
          mid: mid,
        },
      ])
      .select()
      .single();

    const recordId = await record.rid;
    const medicienData = mediciens.map((medicien) => {
      return { rid: recordId, name: medicien.name, qty: medicien.quantity };
    });

    const { data: medicien, error: medicieneError } = await supabase
      .from("mediciens")
      .insert(medicienData)
      .select();

    return { record, medicien, error };
  } catch (error) {
    return error.message;
  }
}
