import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name.split('.').pop();
    
    // Generate unique filename
    const uniqueFileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;
    
    // Define save path (public directory for easier access)
    const filePath = join(process.cwd(), 'public', 'uploads', uniqueFileName);
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Save file
    await writeFile(filePath, buffer);
    
    // Return the URL to the saved file (relative to public directory)
    const fileUrl = `/uploads/${uniqueFileName}`;
    
    return NextResponse.json(
      { 
        message: 'File uploaded successfully',
        url: fileUrl
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'File upload failed' },
      { status: 500 }
    );
  }
}