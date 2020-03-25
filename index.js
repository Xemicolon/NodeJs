const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<h1 style="text-align: center;">Please enter a message below</h1>'
      );
      res.write(
        '<form style="width: 50%; margin: 0 auto; text-align: center;" action="/message" method="POST">'
      );
      res.write(
        '<input style="margin-bottom: 20px" type="text" name="message"><br>'
      );
      res.write('<input type="submit">');
      res.write("</form>");
      res.end();
      break;

    case "/message":
      if (req.method === "POST") {
        let data = "";
        req.on("data", chunk => {
          data = chunk.toString("utf8");
          let eq = "=";
          let pl = "+";
          let newData = data
            .split(eq)
            .join(": ")
            .split(pl)
            .join(" ");
          fs.appendFile("message.txt", newData, err => {
            if (err) throw err;
            console.log("Input from user has been saved to a message.txt file");
          });
        });
        req.on("end", () => {
          res.end(
            "<h1 style='text-align: center; width: 50%; margin: 0 auto'>Your message has been submitted and saved to a message.txt file on your PC. Check the same folder you ran the server from...</h1>"
          );
        });
      }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
