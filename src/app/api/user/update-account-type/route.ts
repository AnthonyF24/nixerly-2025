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

    // Get data from request body
    const { 
      accountType, 
      businessName,
      firstName, 
      lastName 
    } = await req.json();
    
    if (!accountType || (accountType !== 'professional' && accountType !== 'business')) {
      return NextResponse.json(
        { error: 'Invalid account type' }, 
        { status: 400 }
      );
    }

    // Validate required fields based on account type
    if (accountType === 'business' && !businessName) {
      return NextResponse.json(
        { error: 'Business name is required for business accounts' }, 
        { status: 400 }
      );
    }

    // Build metadata object
    const metadata = {
      ...user.publicMetadata,
      accountType
    };

    // Add account-specific metadata
    if (accountType === 'business' && businessName) {
      metadata.businessName = businessName;
    } else if (accountType === 'professional') {
      // Store any additional professional details that aren't first/last name
      // (Those are stored in the user profile directly via the other endpoint)
    }

    // Update the user metadata
    await clerkClient.users.updateUser(user.id, {
      publicMetadata: metadata
    });

    return NextResponse.json(
      { success: true, accountType, metadata }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating account type:', error);
    return NextResponse.json(
      { error: 'Failed to update account type' }, 
      { status: 500 }
    );
  }
} 