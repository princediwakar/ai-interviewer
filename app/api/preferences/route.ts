// app/api/preferences/route.ts

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { upsertUserPreferences } from "@/lib/db/queries"

// A full UserPreferences type
interface UserPreferences {
  preferredRoles: string[];
  defaultDifficulty: 'entry' | 'mid' | 'senior' | 'expert';
  emailNotifications: boolean;
}

// A type for the update payload (all fields are optional)
type UserPreferencesUpdate = Partial<UserPreferences>;

export async function GET(_request: NextRequest) {
  // ... (GET function is unchanged and correct)
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Explicitly type the incoming data
    const data: UserPreferencesUpdate = await request.json();
    
    const updateData: UserPreferencesUpdate = {};

    // Type-safe property assignment without using 'any'
    if (data.preferredRoles !== undefined) {
      updateData.preferredRoles = data.preferredRoles;
    }
    if (data.defaultDifficulty !== undefined) {
      updateData.defaultDifficulty = data.defaultDifficulty;
    }
    if (data.emailNotifications !== undefined) {
      updateData.emailNotifications = data.emailNotifications;
    }
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" }, 
        { status: 400 }
      );
    }

    const preferences = await upsertUserPreferences(session.user.id, updateData);
    
    return NextResponse.json({ preferences: preferences[0] });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return NextResponse.json(
      { error: "Failed to update preferences" }, 
      { status: 500 }
    );
  }
}