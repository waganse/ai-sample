/**
 * 国土交通省位置参照情報APIを使用した地域データ取得サービス
 */

export interface Prefecture {
  code: string;
  name: string;
  hiragana?: string;
}

export interface Municipality {
  code_as_string: string;
  name: string;
  prefecture_code: number;
}

export interface LocationApiResponse {
  prefectures: Prefecture[];
  municipalities: Municipality[];
}

/**
 * 都道府県一覧を取得
 * プロキシAPIエンドポイントを使用
 */
export async function fetchPrefectures(): Promise<Prefecture[]> {
  try {
    console.log('Fetching prefectures from proxy API');
    
    // SSR環境ではベースURLが必要
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXTAUTH_URL || 'http://localhost:3000'
      : '';
    
    const response = await fetch(`${baseUrl}/api/geo/prefectures`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.warn(`Proxy API error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Proxy API response:', data);

    if (data.prefectures && Array.isArray(data.prefectures)) {
      console.log(`Found ${data.prefectures.length} prefectures from proxy API`);
      return data.prefectures;
    }

    // データが空の場合はフォールバック
    console.warn('No prefecture data returned from proxy API, falling back to static data');
    return getStaticPrefectures();
  } catch (error) {
    console.error('都道府県データの取得に失敗しました:', error);
    console.log('Using static fallback data');
    // フォールバック: 静的データを返す
    return getStaticPrefectures();
  }
}

/**
 * 指定した都道府県の市区町村一覧を取得
 * プロキシAPIエンドポイントを使用
 */
export async function fetchMunicipalities(prefectureName: string): Promise<Municipality[]> {
  try {
    // 都道府県名から都道府県コードを取得
    const prefectureCode = getPrefectureCodeByName(prefectureName);
    if (!prefectureCode) {
      console.warn(`Prefecture code not found for ${prefectureName}, falling back to static data`);
      return getStaticMunicipalities(prefectureName);
    }

    console.log(`Fetching municipalities for ${prefectureName} (code: ${prefectureCode}) from proxy API`);
    
    // SSR環境ではベースURLが必要
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXTAUTH_URL || 'http://localhost:3000'
      : '';
    
    const response = await fetch(`${baseUrl}/api/geo/municipalities?prefCode=${prefectureCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.warn(`Proxy API error for ${prefectureName}: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Proxy API response for ${prefectureName}:`, data);
    
    if (data.municipalities && Array.isArray(data.municipalities)) {
      console.log(`Found ${data.municipalities.length} municipalities for ${prefectureName}`);
      return data.municipalities;
    }
    
    // データが空の場合はフォールバック
    console.warn(`No municipalities data returned for ${prefectureName}, falling back to static data`);
    return getStaticMunicipalities(prefectureName);
  } catch (error) {
    console.error(`${prefectureName}の市区町村データの取得に失敗しました:`, error);
    console.log(`Using static fallback data for ${prefectureName}`);
    // フォールバック: 静的データを返す
    return getStaticMunicipalities(prefectureName);
  }
}

/**
 * 都道府県コードを取得（ゼロ埋め文字列）
 */
function getPrefectureCode(prefectureName: string): string {
  const prefectures = getStaticPrefectures();
  const prefecture = prefectures.find(p => p.name === prefectureName);
  return prefecture?.code || '00';
}

/**
 * 都道府県名から都道府県コードを取得（数値）
 */
function getPrefectureCodeByName(prefectureName: string): number | null {
  const prefectures = getStaticPrefectures();
  const prefecture = prefectures.find(p => p.name === prefectureName);
  return prefecture ? parseInt(prefecture.code, 10) : null;
}

/**
 * 静的な都道府県データ（フォールバック用）
 */
function getStaticPrefectures(): Prefecture[] {
  const prefectureNames = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  return prefectureNames.map((name, index) => ({
    code: String(index + 1).padStart(2, '0'),
    name,
  }));
}

/**
 * 静的な市区町村データ（フォールバック用）
 */
function getStaticMunicipalities(prefectureName: string): Municipality[] {
  // フォールバック用の静的データ
  const citiesData: Record<string, string[]> = {
    '北海道': ['札幌市', '函館市', '小樽市', '旭川市', '室蘭市', '釧路市', '帯広市', '北見市', '夕張市', '岩見沢市'],
    '青森県': ['青森市', '弘前市', '八戸市', '黒石市', '五所川原市', 'むつ市', 'つがる市', '平川市'],
    '岩手県': ['盛岡市', '宮古市', '大船渡市', '花巻市', '北上市', '久慈市', '遠野市', '一関市', '陸前高田市', '釜石市'],
    '宮城県': ['仙台市', '石巻市', '塩竈市', '気仙沼市', '白石市', '名取市', '角田市', '多賀城市', '岩沼市', '登米市'],
    '秋田県': ['秋田市', '能代市', '横手市', '大館市', '男鹿市', '湯沢市', '鹿角市', '由利本荘市', '潟上市', '大仙市'],
    '山形県': ['山形市', '米沢市', '鶴岡市', '酒田市', '新庄市', '寒河江市', '上山市', '村山市', '長井市', '天童市'],
    '福島県': ['福島市', '会津若松市', '郡山市', 'いわき市', '白河市', '須賀川市', '喜多方市', '相馬市', '二本松市', '田村市'],
    '茨城県': ['水戸市', '日立市', '土浦市', '古河市', '石岡市', '結城市', '龍ケ崎市', '下妻市', '常総市', '常陸太田市'],
    '栃木県': ['宇都宮市', '足利市', '栃木市', '佐野市', '鹿沼市', '日光市', '小山市', '真岡市', '大田原市', '矢板市'],
    '群馬県': ['前橋市', '高崎市', '桐生市', '伊勢崎市', '太田市', '沼田市', '館林市', '渋川市', '藤岡市', '富岡市'],
    '埼玉県': ['さいたま市', '川越市', '熊谷市', '川口市', '行田市', '秩父市', '所沢市', '飯能市', '加須市', '本庄市'],
    '千葉県': ['千葉市', '銚子市', '市川市', '船橋市', '館山市', '木更津市', '松戸市', '野田市', '茂原市', '成田市'],
    '東京都': ['千代田区', '中央区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区', '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区', '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区', '八王子市', '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市', '昭島市', '調布市', '町田市', '小金井市'],
    '神奈川県': ['横浜市', '川崎市', '相模原市', '横須賀市', '平塚市', '鎌倉市', '藤沢市', '小田原市', '茅ヶ崎市', '逗子市'],
    '新潟県': ['新潟市', '長岡市', '三条市', '柏崎市', '新発田市', '小千谷市', '加茂市', '十日町市', '見附市', '村上市'],
    '富山県': ['富山市', '高岡市', '魚津市', '氷見市', '滑川市', '黒部市', '砺波市', '小矢部市', '南砺市', '射水市'],
    '石川県': ['金沢市', '七尾市', '小松市', '輪島市', '珠洲市', '加賀市', '羽咋市', 'かほく市', '白山市', '能美市'],
    '福井県': ['福井市', '敦賀市', '小浜市', '大野市', '勝山市', '鯖江市', 'あわら市', '越前市'],
    '山梨県': ['甲府市', '富士吉田市', '都留市', '山梨市', '大月市', '韮崎市', '南アルプス市', '北杜市', '甲斐市', '笛吹市'],
    '長野県': ['長野市', '松本市', '上田市', '岡谷市', '飯田市', '諏訪市', '須坂市', '小諸市', '伊那市', '駒ヶ根市'],
    '岐阜県': ['岐阜市', '大垣市', '高山市', '多治見市', '関市', '中津川市', '美濃市', '瑞浪市', '羽島市', '恵那市'],
    '静岡県': ['静岡市', '浜松市', '沼津市', '熱海市', '三島市', '富士宮市', '伊東市', '島田市', '富士市', '磐田市'],
    '愛知県': ['名古屋市', '豊橋市', '岡崎市', '一宮市', '瀬戸市', '半田市', '春日井市', '豊川市', '津島市', '碧南市'],
    '三重県': ['津市', '四日市市', '伊勢市', '松阪市', '桑名市', '鈴鹿市', '名張市', '尾鷲市', '亀山市', 'いなべ市'],
    '滋賀県': ['大津市', '彦根市', '長浜市', '近江八幡市', '草津市', '守山市', '栗東市', '甲賀市', '野洲市', '湖南市'],
    '京都府': ['京都市', '福知山市', '舞鶴市', '綾部市', '宇治市', '宮津市', '亀岡市', '城陽市', '向日市', '長岡京市'],
    '大阪府': ['大阪市', '堺市', '岸和田市', '豊中市', '池田市', '吹田市', '泉大津市', '高槻市', '貝塚市', '守口市'],
    '兵庫県': ['神戸市', '姫路市', '尼崎市', '明石市', '西宮市', '洲本市', '芦屋市', '伊丹市', '相生市', '豊岡市'],
    '奈良県': ['奈良市', '大和高田市', '大和郡山市', '天理市', '橿原市', '桜井市', '五條市', '御所市', '生駒市', '香芝市'],
    '和歌山県': ['和歌山市', '海南市', '橋本市', '有田市', '御坊市', '田辺市', '新宮市', '紀の川市', '岩出市'],
    '鳥取県': ['鳥取市', '米子市', '倉吉市', '境港市'],
    '島根県': ['松江市', '浜田市', '出雲市', '益田市', '大田市', '安来市', '江津市', '雲南市'],
    '岡山県': ['岡山市', '倉敷市', '津山市', '玉野市', '笠岡市', '井原市', '総社市', '高梁市', '新見市', '備前市'],
    '広島県': ['広島市', '呉市', '竹原市', '三原市', '尾道市', '福山市', '府中市', '三次市', '庄原市', '大竹市'],
    '山口県': ['下関市', '宇部市', '山口市', '萩市', '防府市', '下松市', '岩国市', '光市', '長門市', '柳井市'],
    '徳島県': ['徳島市', '鳴門市', '小松島市', '阿南市', '吉野川市', '阿波市', '美馬市', '三好市'],
    '香川県': ['高松市', '丸亀市', '坂出市', '善通寺市', '観音寺市', 'さぬき市', '東かがわ市', '三豊市'],
    '愛媛県': ['松山市', '今治市', '宇和島市', '八幡浜市', '新居浜市', '西条市', '大洲市', '伊予市', '四国中央市', '西予市'],
    '高知県': ['高知市', '室戸市', '安芸市', '南国市', '土佐市', '須崎市', '宿毛市', '土佐清水市', '四万十市', '香南市'],
    '福岡県': ['北九州市', '福岡市', '大牟田市', '久留米市', '直方市', '飯塚市', '田川市', '柳川市', '八女市', '筑後市'],
    '佐賀県': ['佐賀市', '唐津市', '鳥栖市', '多久市', '伊万里市', '武雄市', '鹿島市', '小城市', '嬉野市', '神埼市'],
    '長崎県': ['長崎市', '佐世保市', '島原市', '諫早市', '大村市', '平戸市', '松浦市', '対馬市', '壱岐市', '五島市'],
    '熊本県': ['熊本市', '八代市', '人吉市', '荒尾市', '水俣市', '玉名市', '山鹿市', '菊池市', '宇土市', '上天草市'],
    '大分県': ['大分市', '別府市', '中津市', '日田市', '佐伯市', '臼杵市', '津久見市', '竹田市', '豊後高田市', '杵築市'],
    '宮崎県': ['宮崎市', '都城市', '延岡市', '日南市', '小林市', '日向市', '串間市', '西都市', 'えびの市'],
    '鹿児島県': ['鹿児島市', '鹿屋市', '枕崎市', '阿久根市', '出水市', '指宿市', '西之表市', '垂水市', '薩摩川内市', '日置市'],
    '沖縄県': ['那覇市', '宜野湾市', '石垣市', '浦添市', '名護市', '糸満市', '沖縄市', '豊見城市', 'うるま市', '宮古島市'],
  };

  const cities = citiesData[prefectureName] || [];
  const prefectureCode = getPrefectureCode(prefectureName);

  return cities.map((city, index) => ({
    code_as_string: `${prefectureCode}${String(index + 1).padStart(3, '0')}`,
    name: city,
    prefecture_code: parseInt(prefectureCode, 10),
  }));
}

/**
 * キャッシュ機能付きの都道府県取得
 */
let prefectureCache: Prefecture[] | null = null;
let prefectureCacheTime: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24時間

export async function getCachedPrefectures(): Promise<Prefecture[]> {
  const now = Date.now();
  
  if (prefectureCache && (now - prefectureCacheTime) < CACHE_DURATION) {
    return prefectureCache;
  }
  
  prefectureCache = await fetchPrefectures();
  prefectureCacheTime = now;
  
  return prefectureCache;
}

/**
 * キャッシュ機能付きの市区町村取得
 */
const municipalityCache: Map<string, { data: Municipality[]; time: number }> = new Map();

export async function getCachedMunicipalities(prefectureName: string): Promise<Municipality[]> {
  const now = Date.now();
  const cached = municipalityCache.get(prefectureName);
  
  if (cached && (now - cached.time) < CACHE_DURATION) {
    return cached.data;
  }
  
  const municipalities = await fetchMunicipalities(prefectureName);
  municipalityCache.set(prefectureName, { data: municipalities, time: now });
  
  return municipalities;
}