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

export async function updateRecord({ cause, mediciens, growth, payment, rid }) {
  try {
    // Update the records table
    const { data: record, error: recordError } = await supabase
      .from("records")
      .update({
        cause,
        desc: "",
        growth,
        payment,
      })
      .eq("rid", rid)
      .select()
      .single();

    if (recordError) {
      throw new Error(`Error updating record: ${recordError.message}`);
    }

    // Update the mediciens table
    // Assuming you want to delete old mediciens and insert new ones
    const { error: deleteError } = await supabase
      .from("mediciens")
      .delete()
      .eq("rid", rid);

    if (deleteError) {
      throw new Error(`Error deleting old mediciens: ${deleteError.message}`);
    }

    const medicienData = mediciens.map((medicien) => ({
      name: medicien.name,
      qty: medicien.qty,
      rid,
    }));

    const { data: medicien, error: medicienError } = await supabase
      .from("mediciens")
      .insert(medicienData)
      .select();

    if (medicienError) {
      throw new Error(
        `Error inserting new mediciens: ${medicienError.message}`,
      );
    }

    return { record, medicien, error: null };
  } catch (error) {
    return { record: null, medicien: null, error: error.message };
  }
}
