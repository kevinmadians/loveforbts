import { NextRequest, NextResponse } from "next/server"

// In a real application, you would use a database
let comments = [
  {
    id: 1,
    name: "Sophie Kim",
    country: "South Korea",
    message: "BTS changed my life. Their music helped me through some really tough times. 보라해!",
    date: "2023-04-15"
  },
  {
    id: 2,
    name: "Alex Johnson",
    country: "United States",
    message: "I've been ARMY since 2016 and I'm so proud of how far the boys have come! Can't wait to see what they do next.",
    date: "2023-04-12"
  },
  {
    id: 3,
    name: "Priya Sharma",
    country: "India",
    message: "BTS's message of self-love resonates with me so much. Thank you for making such meaningful music.",
    date: "2023-04-10"
  },
  {
    id: 4,
    name: "Miguel Fernandez",
    country: "Spain",
    message: "¡BTS son increíbles! Their performances are always top notch. I hope to see them live someday!",
    date: "2023-04-05"
  },
  {
    id: 5,
    name: "Yui Tanaka",
    country: "Japan",
    message: "バンタンが大好き！Their lyrics are so meaningful and deep. I admire their dedication.",
    date: "2023-04-01"
  }
]

// GET: Retrieve all comments
export async function GET() {
  return NextResponse.json(comments)
}

// POST: Add a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.country || !body.message) {
      return NextResponse.json(
        { error: "Name, country, and message are required" },
        { status: 400 }
      )
    }
    
    // Create new comment
    const newComment = {
      id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
      name: body.name,
      country: body.country,
      message: body.message,
      date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    }
    
    // Add to "database"
    comments = [newComment, ...comments]
    
    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    )
  }
} 