/**
 * app/api/upload/route.ts
 *
 * REST API handler to accept multipart/form-data file uploads,
 * validate image types, generate a unique filename, save the file
 * under `public/uploads/`, and return its public URL.
 */

import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

/**
 * POST /api/upload
 *
 * Accepts a `file` field in multipart/form-data, validates that it’s
 * a JPEG/PNG/GIF/WebP image, writes it to `public/uploads/` with a
 * random filename, and returns its URL.
 *
 * @param {Request} request – Next.js Request with formData().
 * @returns {Promise<NextResponse>}  
 *   - 200 + `{ message: string; url: string }` on success  
 *   - 400 + `{ message: string }` for missing/invalid file  
 *   - 500 + `{ message: string }` on write errors
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

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

    // Derive extension and generate unique filename
    const ext = file.name.split('.').pop() || '';
    const uniqueName = `${crypto.randomBytes(16).toString('hex')}.${ext}`;

    // Save under public/uploads/
    const outPath = join(process.cwd(), 'public', 'uploads', uniqueName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(outPath, buffer);

    // Return a relative URL under /uploads/
    return NextResponse.json(
      {
        message: 'File uploaded successfully',
        url: `/uploads/${uniqueName}`
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { message: 'File upload failed' },
      { status: 500 }
    );
  }
}
