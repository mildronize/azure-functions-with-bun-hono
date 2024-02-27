import { Hono } from "hono";
import { Serve } from "bun";

const app = new Hono().basePath("/api");

app.get("/SimpleHttpTrigger", (c) => {
  const currentDate = new Date();
  console.log(currentDate.getMonth() + 1); // Months are 0-indexed in JS
  console.log(currentDate.getDate());
  console.log(currentDate.getFullYear());

  const userAgent = c.req.header("user-agent");
  console.log(`user agent is: ${userAgent}`);

  const invocationId = c.req.header("x-azure-functions-invocationid");
  console.log(`invocationid is: ${invocationId}`);

  return c.text("Hello World from go worker xxx");
  // return c.html("<h1>Hello World from go worker</h1>");
});

const PORT = parseInt(process.env.FUNCTIONS_CUSTOMHANDLER_PORT || "4000");

console.log(`Node.js/Express server listening on port ${PORT}`);

export default {
  fetch: app.fetch,
  port: PORT,
} satisfies Serve;

