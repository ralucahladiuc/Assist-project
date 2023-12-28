const addDataToDb = async (data) => {
  try {
    const response = await fetch("http://localhost:5500/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Articles added successfully");
    } else {
      console.error("Failed to add articles");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default addDataToDb;
