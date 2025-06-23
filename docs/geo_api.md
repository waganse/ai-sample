## アクセス方法

APIリクエストを送信するエンドポイントや利用可能なHTTPメソッド、レスポンス形式は次の表のとおりです。

| 項目               | 値                                 |
| :----------------- | :--------------------------------- |
| **エンドポイント** | `https://www.mlit-data.jp/api/v1/` |
| **HTTPメソッド**   | `POST`                             |
| **レスポンス形式** | `JSON`                             |

`POST`メソッドでサーバーに送信する情報は、**GraphQL**で作成したJSON形式のデータです。

```json
{
  "query": "GraphQLクエリー内容"
}
```

**例：**

```json
{
  "query": "{ search(term:\"橋梁\", first:0) { totalNumber \n searchResults { title } } }"
}
```

> GraphQLのクエリー内容の詳細ついては、各クエリーの説明をご参照ください。

---

## APIの認証

取得したAPIキーをリクエストヘッダーの `apikey` に設定してリクエストを送信します。

**ヘッダーの例：**

```http
POST /api/v1/ HTTP/1.1
Accept: application/json
Accept-Language: ja,en-US;q=0.7,en;q=0.3
Accept-Encoding: gzip, deflate, br
Content-Type: application/json
apikey: [your api key]
```

> **Warning**
>
> - APIキーを指定しない場合、または存在しないキーを指定した場合はステータス **`401 (Unauthorized)`** が返されます。
> - また、リクエストがWAF (Web Application Firewall) にブロックされる可能性があります。

---

## リクエストの例

### 1. APIキーを正しく設定した場合（成功例）

`[your api key]` の部分を実際のAPIキーに置き換えてください。

**cURLリクエスト:**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "apikey: [your api key]" \
  -d '{"query": "{ search(term:\"橋梁\", first:0) { totalNumber } }"}' \
  -i https://www.mlit-data.jp/api/v1/
```

**レスポンス:**

```http
HTTP/1.1 200 OK
Server: nginx
Date: Thu, 27 Jul 2023 12:21:15 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 41
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"29-PV7PKvhdj8U3HucR/PkvX9bJZ+o"
Content-Security-Policy: frame-ancestors 'self';

{"data":{"search":{"totalNumber":10000}}}
```

### 2. APIキーを設定しない場合

**cURLリクエスト:**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ search(term:\"橋梁\", first:0) { totalNumber } }"}' \
  -i https://www.mlit-data.jp/api/v1/
```

**レスポンス (401 Unauthorized):**

```http
HTTP/1.1 401 Unauthorized
Server: nginx
Date: Thu, 27 Jul 2023 12:20:32 GMT
Content-Length: 0
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"
```

### 3. 不正なAPIキーを設定した場合

**cURLリクエスト:**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "apikey: some_wrong_value" \
  -d '{"query": "{ search(term:\"橋梁\", first:0) { totalNumber } }"}' \
  -i https://www.mlit-data.jp/api/v1/
```

**レスポンス (401 Unauthorized):**

```http
HTTP/1.1 401 Unauthorized
Server: nginx
Date: Thu, 27 Jul 2023 12:20:32 GMT
Content-Length: 0
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"
```

---

# 都道府県・市区町村データの取得方法

都道府県および市区町村の一覧やコードを取得する方法を解説します。

## 1. APIキー

環境変数`KOKUDO_API_KEY`を利用します。

## 2. 都道府県データの取得について

prefectureをコールしますが、このAPIにはパラメータがありません。
そのため、API名の後には「( )」が不要になります。
取得できる情報については、PrefectureClassをご参照ください。

Request

```
query {
  # 都道府県の情報を取得するAPI
  prefecture {
    # 都道府県コード
    code
    # 都道府県名
    name
    # 都道府県名(ひらがな)
    hiragana
  }
}
```

Response

```
{
  "data": {
    "prefecture": [
      {
        "code": 1,
        "name": "北海道",
        "hiragana": "ほっかいどう"
      },
      {
        "code": 2,
        "name": "青森県",
        "hiragana": "あおもり"
      },
      {
        "code": 3,
        "name": "岩手県",
        "hiragana": "いわて"
      },
      // 省略...
      {
        "code": 45,
        "name": "宮崎県",
        "hiragana": "みやざき"
      },
      {
        "code": 46,
        "name": "鹿児島県",
        "hiragana": "かごしま"
      },
      {
        "code": 47,
        "name": "沖縄県",
        "hiragana": "おきなわ"
      }
    ]
  }
}
```

## 3. 市区町村データの取得方法

Request

```
query{
  municipalities {
    code
    prefecture_code
    name
  }
}
```

Response

```
{
  "data": {
    "municipalities": [
      {
        "code_as_string": "011002",
        "prefecture_code": 1,
        "name": "札幌市"
      },
      {
        "code_as_string": "011011",
        "prefecture_code": 1,
        "name": "札幌市中央区"
      },
      {
        "code_as_string": "011029",
        "prefecture_code": 1,
        "name": "札幌市北区"
      },
      {
        "code_as_string": "011037",
        "prefecture_code": 1,
        "name": "札幌市東区"
      },
      {
        "code_as_string": "011045",
        "prefecture_code": 1,
        "name": "札幌市白石区"
      },
      // 省略...
    ]
  }
}
```

### 3.1. リクエスト方法

#### パラメータ

各パラメーターの詳細は以下のとおりです。

| 引数名      | タイプ | 説明                                                                                                                                     |
| :---------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `muniCodes` | `Any`  | 情報を取得する市区町村コードです。文字列または整数として設定します。                                                                     |
| `prefCodes` | `Any`  | 市区町村情報を取得する都道府県コードです。コードで指定した都道府県に含まれる市区町村情報を取得します。文字列または整数として設定します。 |

> **補足**
>
> - `muniCodes` と `prefCodes` の両方を指定しない場合は、**全国の市区町村情報**が取得されます。
> - 今回のように「特定の都道府県に属する市区町村をすべて取得する」場合は、`prefCodes` のみ指定します。これにより、プルダウンメニューなどに表示するデータを作成できます。
