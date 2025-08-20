import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { eq, and, or, ilike, gte, lte, asc, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const searchTerm = searchParams.get("search");
    const city = searchParams.get("city");
    const degree = searchParams.get("degree");
    const minExperience = searchParams.get("minExperience");
    const maxExperience = searchParams.get("maxExperience");
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    console.log(searchParams);
    console.log(sortBy, sortOrder);

    // Build the base query
    let query = db.select().from(advocates);

    // Apply search filters
    const conditions = [];

    if (searchTerm) {
      conditions.push(
        or(
          ilike(advocates.firstName, `%${searchTerm}%`),
          ilike(advocates.lastName, `%${searchTerm}%`),
          ilike(advocates.city, `%${searchTerm}%`),
          ilike(advocates.degree, `%${searchTerm}%`)
        )
      );
    }

    if (city) {
      conditions.push(eq(advocates.city, city));
    }

    if (degree) {
      conditions.push(eq(advocates.degree, degree));
    }

    if (minExperience) {
      conditions.push(
        gte(advocates.yearsOfExperience, parseInt(minExperience))
      );
    }

    if (maxExperience) {
      conditions.push(
        lte(advocates.yearsOfExperience, parseInt(maxExperience))
      );
    }

    // Apply filters if any conditions exist
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    if (sortBy) {
      const sortField = getSortField(sortBy);
      if (sortField) {
        query = query.orderBy(
          sortOrder === "desc" ? desc(sortField) : asc(sortField)
        );
      }
    }

    // Apply pagination
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    if (offset) {
      query = query.offset(parseInt(offset));
    }

    const response = await query;

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return Response.json(
      {
        error: "Failed to fetch advocates",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function to map sortBy parameter to actual database field
function getSortField(sortBy: string) {
  switch (sortBy) {
    case "firstName":
      return advocates.firstName;
    case "lastName":
      return advocates.lastName;
    case "city":
      return advocates.city;
    case "degree":
      return advocates.degree;
    case "yearsOfExperience":
      return advocates.yearsOfExperience;
    case "createdAt":
      return advocates.createdAt;
    default:
      return null;
  }
}
