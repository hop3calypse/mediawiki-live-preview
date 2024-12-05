(() => {
  const editor = document.getElementById("editor");
  const preview = document.getElementById("preview");


  editor.addEventListener("input", () => {
    const text = editor.value;
    const apiUrl = "https://fr.wikipedia.org/w/api.php";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "parse",
        text: text,
        format: "json",
        origin: "*",
        disableeditsection: "true",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.parse && data.parse.text) {
          preview.innerHTML = data.parse.text["*"];
        } else {
          preview.innerHTML =
            '<p style="color: red;">Error: Could not parse the markup.</p>';
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        preview.innerHTML =
          '<p style="color: red;">Error fetching preview: Please check your network.</p>';
      });
  });
})();
