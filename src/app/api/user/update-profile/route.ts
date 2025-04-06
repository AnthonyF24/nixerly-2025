import { NextRequest, NextResponse } from 'next/server';
import { currentUser, clerkClient } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
  try {
    // Get current user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Get profile details from request body
    const { firstName, lastName } = await req.json();
    
    if (!firstName && !lastName) {
      return NextResponse.json(
        { error: 'No profile data provided' }, 
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: { firstName?: string; lastName?: string } = {};
    
    if (firstName) {
      updateData.firstName = firstName;
    }
    
    if (lastName) {
      updateData.lastName = lastName;
    }

    // Update the user profile
    await clerkClient.users.updateUser(user.id, updateData);

    return NextResponse.json(
      { success: true, firstName, lastName }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' }, 
      { status: 500 }
    );
  }
} 