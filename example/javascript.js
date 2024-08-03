const { createServer } = require("http");

// This is an comment
// eslint-disable-next-line no-undef

const statusCodes = {
  ok: 200,
  notFound: 404,
};

class Handler {
  responses = {
    "/ping": "pong",
  };

  handle(req, res) {
    console.log("Got:", req.url);

    this.route(req.url || "")(req, res);
  }

  route(url) {
    switch (url) {
      case "/ping":
        return this.pong;
      default:
        return this.notFound;
    }
  }

  pong(req, res) {
    res.statusCode = statusCodes.ok;
    res.end(this.responses[req.url || ""]);
  }

  notFound(req, res) {
    res.statusCode = statusCodes.notFound;
    res.end(`Not found "${req.url}"`);
  }
}

function main() {
  const handler = new Handler();

  createServer(handler.handle.bind(handler)).listen(3000);
}

main();
