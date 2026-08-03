import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://203.17.177.14/api/v1';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, await params);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, await params);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, await params);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, await params);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, await params);
}

async function handleProxy(request: NextRequest, params: { path: string[] }) {
  const path = params.path.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${BACKEND_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

  const headers = new Headers(request.headers);
  headers.delete('host'); 
  // Ensure content-type is preserved
  if (!headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const options: RequestInit = {
    method: request.method,
    headers: headers,
    redirect: 'manual',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    // Use arrayBuffer() instead of blob() for better compatibility with JSON bodies
    options.body = await request.arrayBuffer();
  }

  console.log(`Proxying ${request.method} to ${url}`);
  
  const response = await fetch(url, options);
  
  const responseBody = await response.arrayBuffer();
  console.log(`Backend responded with ${response.status}`);
  
  // Log the response body for debugging
  try {
    const text = new TextDecoder().decode(responseBody);
    console.log(`Backend response body: ${text}`);
  } catch (e) {
    console.error("Failed to decode response body", e);
  }

  return new NextResponse(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
