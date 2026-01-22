import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Root level test route is working' });
}
