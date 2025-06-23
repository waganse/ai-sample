import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prefCode = searchParams.get('prefCode');
    
    if (!prefCode) {
      return NextResponse.json(
        { error: 'prefCode parameter is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.KOKUDO_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'APIキーが設定されていません' },
        { status: 500 }
      );
    }

    console.log(`Fetching municipalities for prefecture code: ${prefCode}`);
    
    const response = await fetch('https://www.mlit-data.jp/api/v1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Tomorie/1.0)',
      },
      body: JSON.stringify({
        query: `{ municipalities(prefCodes: ${prefCode}) { code_as_string prefecture_code name } }`
      }),
      cache: 'no-store'
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error(`国土交通省 API error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error('Response body:', text);
      
      return NextResponse.json(
        { error: `API request failed: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('API response:', data);

    if (data.data && data.data.municipalities && Array.isArray(data.data.municipalities)) {
      const municipalities = data.data.municipalities.map((muni: any) => ({
        code_as_string: muni.code_as_string,
        name: muni.name,
        prefecture_code: muni.prefecture_code,
      }));

      return NextResponse.json({ municipalities });
    }

    return NextResponse.json(
      { error: 'Invalid response format from API' },
      { status: 502 }
    );

  } catch (error) {
    console.error('Municipality API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}