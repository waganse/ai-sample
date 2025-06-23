import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.KOKUDO_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'APIキーが設定されていません' },
        { status: 500 }
      );
    }

    console.log('Fetching prefectures from 国土交通省 API...');

    const response = await fetch('https://www.mlit-data.jp/api/v1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Tomorie/1.0)',
      },
      body: JSON.stringify({
        query: '{ prefecture { code name hiragana } }',
      }),
      cache: 'no-store',
    });

    console.log('Response status:', response.status);
    console.log(
      'Response headers:',
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      console.error(
        `国土交通省 API error: ${response.status} ${response.statusText}`
      );
      const text = await response.text();
      console.error('Response body:', text);

      return NextResponse.json(
        {
          error: `API request failed: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('API response:', data);

    if (
      data.data &&
      data.data.prefecture &&
      Array.isArray(data.data.prefecture)
    ) {
      const prefectures = data.data.prefecture.map((pref: any) => ({
        code: String(pref.code).padStart(2, '0'),
        name: pref.name,
        hiragana: pref.hiragana,
      }));

      return NextResponse.json({ prefectures });
    }

    return NextResponse.json(
      { error: 'Invalid response format from API' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Prefecture API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
