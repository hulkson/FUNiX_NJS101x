const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(`<html>
    <head> 
        <title>Homepage</title>
    </head>
    <body>
        <h1>My Form</h1>
        <form action='/message' method='POST'>
            <input type='text' name='message'>
            <button type='submit'>Submit</button>
        <form>
    </body>
    </html`);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk); // đẩy phần tử vào mảng trong body, push ko làm thay đổi value của const nên ko lỗi.
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString(); // giải body part thành string để xử lý
      const message = parseBody.split("=")[1]; // tách ra ngay dấu '=' và lấy phần tử thứ 2. là nội dung của message, trước đó là name của input tag
      fs.writeFileSync("userMessage.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
        <head> 
            <title>My First Page</title>
        </head>
        <body>
            <h1>Hello from my Node.js server!</h1>
        </body>
        </html`);
  res.end();
};

exports.handleText = "test export connection";
exports.handler = requestHandler;

// exports = {
//   handler: requestHandler,
//   handleText: 'test export connection'
// };
