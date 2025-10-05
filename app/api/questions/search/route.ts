// app/api/questions/search/route.ts
import { NextRequest, NextResponse } from "next/server"
import { searchQuestions } from "@/lib/db/queries"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const params = {
      role: searchParams.get("role") || undefined,
      difficulty: searchParams.get("difficulty") || undefined,
      type: searchParams.get("type") || undefined,
      searchTerm: searchParams.get("q") || undefined,
      tags: searchParams.get("tags")?.split(",").filter(Boolean) || undefined,
      limit: parseInt(searchParams.get("limit") || "50"),
      offset: parseInt(searchParams.get("offset") || "0")
    }

    const questions = await searchQuestions(params)
    
    return NextResponse.json({ 
      questions,
      total: questions.length,
      offset: params.offset,
      limit: params.limit
    })
  } catch (error) {
    console.error("Error searching questions:", error)
    return NextResponse.json(
      { error: "Failed to search questions" }, 
      { status: 500 }
    )
  }
}