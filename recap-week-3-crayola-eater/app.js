const path = require("path");
const express = require("express");
const { addCat, getCats } = require("./db/db");

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(express.json());

// const cats = [
//   {
//     name: "Poppy",
//     human: "Tim",
//     hobby: "screm",
//   },
//   {
//     name: "Tony",
//     human: "Liz.K",
//     hobby: "cling",
//   },
//   {
//     name: "Narla",
//     human: "Mell",
//     hobby: "obstruct",
//   },
// ];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/cats", async (req, res) => {
  try {
    res.json({
      success: true,
      payload: await getCats(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Unknown error occurred whilst getting cats. Please try again later.",
    });
  }
});

app.post("/api/cats", async (req, res) => {
  const { catName: name, humanName: human, hobby } = req.body;

  try {
    const addedCat = await addCat({ name, human, hobby });
    res.json({
      success: true,
      payload: addedCat,
    });
  } catch (err) {
    // Should probably check if the error actual is server side
    // or due to bad client input (in which case might be status 4XX)
    res.status(500).json({
      success: false,
      error:
        "Unknown error occurred whilst getting cats. Please try again later.",
    });
  }
});

/* Your tasks for part 2a: 🔻 
- 👉 Add the code that tells your server which port to use (and add a console.log so 
that you know it's working!).
- 👉 Add requests handlers that "hook up" the code on the front end to the server so 
that you can see the cats already in your data above on your front end and add new 
cats from the form on the front end. */

app.listen(port, () => console.log(`Listening at localhost:${port}`));
