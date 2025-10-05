// app/api/preferences/route.ts

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getUserPreferences, upsertUserPreferences } from "@/lib/db/queries"

// Define a specific type for preference updates
type UserPreferencesUpdate = {
  preferredRoles?: string[];
  defaultDifficulty?: 'entry' | 'mid' | 'senior' | 'expert';
  emailNotifications?: boolean;
};

export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const preferences = await getUserPreferences(session.user.id)
    
    return NextResponse.json({ 
      preferences: preferences || {
        preferredRoles: [],
        defaultDifficulty: "mid",
        emailNotifications: true
      }
    })
  } catch (error) {
    console.error("Error fetching preferences:", error)
    return NextResponse.json(
      { error: "Failed to fetch preferences" }, 
      { status: 500 }
    )
  }
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