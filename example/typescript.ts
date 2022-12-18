import { createServer, IncomingMessage, ServerResponse } from "http";

// This is an comment
// eslint-disable-next-line no-undef

const statusCodes = {
  ok: 200,
  notFound: 404,
} as const;

class Handler {
  public handle(req: IncomingMessage, res: ServerResponse) {
    console.log("Got:", req.url);

    this.route(req.url || "")(req, res);
  }

  public route(url: string) {
    switch (url) {
      case "/ping":
        return this.pong;
      default:
        return this.notFound;
    }
  }

  private pong(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = statusCodes.ok;
    res.end("pong");
  }

  private notFound(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = statusCodes.notFound;
    res.end(`Not found "${req.url}"`);
  }
}

const handler = new Handler();

createServer(handler.handle.bind(handler)).listen(3000);
