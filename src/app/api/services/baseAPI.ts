const SOLACE_DATABASE_URL =
  process.env.SOLACE_DATABASE_URL || "http://localhost:3000";

const baseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export { SOLACE_DATABASE_URL, baseHeaders as headers };
