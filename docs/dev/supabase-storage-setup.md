# Supabase Storage 設定ガイド

## 概要
Tomorieプロジェクトでユーザーのプロフィール写真やその他の画像ファイルを管理するため、Supabase Storageの設定を行います。

## 前提条件
- Supabaseプロジェクトが作成済み
- Supabase管理画面にアクセス可能
- 認証システムが設定済み

## 1. Supabase管理画面でのStorage設定

### 1.1 Storage画面へのアクセス
1. Supabase管理画面（https://app.supabase.com）にログイン
2. 対象プロジェクトを選択
3. 左サイドバーから「Storage」をクリック

### 1.2 Bucketの作成

#### プロフィール画像用Bucket
```
名前: profile-photos
説明: ユーザーのプロフィール写真を保存
Public: true（プロフィール写真は公開表示のため）
```

#### コミュニティ画像用Bucket
```
名前: community-photos
説明: コミュニティ関連の画像を保存
Public: true（コミュニティ画像は公開表示のため）
```

#### プライベート画像用Bucket
```
名前: private-photos
説明: 認証済みユーザーのみアクセス可能な画像
Public: false（認証済みユーザーのみアクセス）
```

### 1.3 Row Level Security (RLS) ポリシーの設定

#### ⚠️ 重要: RLS有効化
まず、各バケットでRLSを有効にする必要があります。

**Supabase管理画面での設定手順:**

1. Storage → Buckets → 対象バケット選択
2. 「Policies」タブをクリック
3. 「Enable RLS」をクリックして有効化

#### RLSポリシー作成の詳細手順

**Step 1: Supabase管理画面でのポリシー作成**

1. Storage → Buckets → 対象バケット → 「Policies」タブ
2. 「New Policy」をクリック
3. 「Custom」を選択（または「Template」から選択）
4. 以下の設定を入力

#### profile-photosバケット用ポリシー

**1. ユーザー自身の写真アップロード許可**
```
ポリシー作成画面での入力内容:

Policy name: Users can upload their own profile photos
Allowed operation: INSERT
Target roles: authenticated

Policy definition (SQL):
auth.uid()::text = (storage.foldername(name))[1]
```

**実際のSQL（参考）:**
```sql
CREATE POLICY "Users can upload their own profile photos" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'profile-photos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**2. ユーザー自身の写真表示許可**
```
Policy name: Users can view their own profile photos
Allowed operation: SELECT
Target roles: authenticated

Policy definition:
auth.uid()::text = (storage.foldername(name))[1]
```

**3. 公開プロフィール写真の表示許可**
```
Policy name: Public profile photos are viewable
Allowed operation: SELECT
Target roles: public

Policy definition:
true
```

**4. ユーザー自身の写真更新許可**
```
Policy name: Users can update their own profile photos
Allowed operation: UPDATE
Target roles: authenticated

Policy definition:
auth.uid()::text = (storage.foldername(name))[1]
```

**5. ユーザー自身の写真削除許可**
```
Policy name: Users can delete their own profile photos
Allowed operation: DELETE
Target roles: authenticated

Policy definition:
auth.uid()::text = (storage.foldername(name))[1]
```

#### community-photosバケット用ポリシー

**⚠️ 注意**: 実際のPrismaスキーマに基づいて修正されたポリシーです。

**1. コミュニティメンバーの写真アップロード許可**
```
Policy name: Community members can upload photos
Allowed operation: INSERT
Target roles: authenticated

Policy definition:
EXISTS (
  SELECT 1 FROM community_members cm
  WHERE cm.user_id = auth.uid()
  AND cm.community_id::text = (storage.foldername(name))[1]
  AND cm.is_active = true
)
```

**2. コミュニティ写真の表示許可**
```
Policy name: Community photos are viewable by members
Allowed operation: SELECT
Target roles: authenticated

Policy definition:
EXISTS (
  SELECT 1 FROM community_members cm
  WHERE cm.user_id = auth.uid()
  AND cm.community_id::text = (storage.foldername(name))[1]
  AND cm.is_active = true
)
```

**3. パブリックコミュニティ写真の表示許可**
```
Policy name: Public community photos are viewable
Allowed operation: SELECT
Target roles: public

Policy definition:
EXISTS (
  SELECT 1 FROM communities c
  WHERE c.id::text = (storage.foldername(name))[1]
  AND c.is_public = true
  AND c.is_active = true
)
```

#### private-photosバケット用ポリシー

**1. ユーザー自身のプライベート写真アップロード**
```
Policy name: Users can upload private photos
Allowed operation: INSERT
Target roles: authenticated

Policy definition:
auth.uid()::text = (storage.foldername(name))[1]
```

**2. マッチ済みユーザー間での写真表示**
```
Policy name: Matched users can view private photos
Allowed operation: SELECT
Target roles: authenticated

Policy definition:
EXISTS (
  SELECT 1 FROM matches m
  WHERE (m.user1_id = auth.uid() AND m.user2_id::text = (storage.foldername(name))[1])
     OR (m.user2_id = auth.uid() AND m.user1_id::text = (storage.foldername(name))[1])
  AND m.is_active = true
)
OR auth.uid()::text = (storage.foldername(name))[1]
```

#### 📋 RLS設定チェックリスト

**profile-photosバケット:**
- [ ] RLS有効化済み
- [ ] ✅ INSERT: Users can upload their own profile photos
- [ ] ✅ SELECT (authenticated): Users can view their own profile photos  
- [ ] ✅ SELECT (public): Public profile photos are viewable
- [ ] ✅ UPDATE: Users can update their own profile photos
- [ ] ✅ DELETE: Users can delete their own profile photos

**community-photosバケット:**
- [ ] RLS有効化済み
- [ ] ✅ INSERT: Community members can upload photos
- [ ] ✅ SELECT (authenticated): Community photos are viewable by members
- [ ] ✅ SELECT (public): Public community photos are viewable

**private-photosバケット:**
- [ ] RLS有効化済み
- [ ] ✅ INSERT: Users can upload private photos
- [ ] ✅ SELECT: Matched users can view private photos

#### 🔧 SQLエディタでの一括設定（上級者向け）

Supabase SQL Editorで以下のSQLを実行することで、全ポリシーを一括作成できます：

```sql
-- profile-photosバケット用ポリシー
CREATE POLICY "Users can upload their own profile photos" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'profile-photos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own profile photos" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (
  bucket_id = 'profile-photos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Public profile photos are viewable" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'profile-photos');

CREATE POLICY "Users can update their own profile photos" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'profile-photos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile photos" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'profile-photos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- community-photosバケット用ポリシー
CREATE POLICY "Community members can upload photos" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'community-photos' AND
  EXISTS (
    SELECT 1 FROM community_members cm
    WHERE cm.user_id = auth.uid()
    AND cm.community_id::text = (storage.foldername(name))[1]
    AND cm.is_active = true
  )
);

CREATE POLICY "Community photos are viewable by members" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (
  bucket_id = 'community-photos' AND
  EXISTS (
    SELECT 1 FROM community_members cm
    WHERE cm.user_id = auth.uid()
    AND cm.community_id::text = (storage.foldername(name))[1]
    AND cm.is_active = true
  )
);

CREATE POLICY "Public community photos are viewable" 
ON storage.objects 
FOR SELECT 
TO public 
USING (
  bucket_id = 'community-photos' AND
  EXISTS (
    SELECT 1 FROM communities c
    WHERE c.id::text = (storage.foldername(name))[1]
    AND c.is_public = true
    AND c.is_active = true
  )
);

-- private-photosバケット用ポリシー
CREATE POLICY "Users can upload private photos" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'private-photos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Matched users can view private photos" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (
  bucket_id = 'private-photos' AND (
    EXISTS (
      SELECT 1 FROM matches m
      WHERE (m.user1_id = auth.uid() AND m.user2_id::text = (storage.foldername(name))[1])
         OR (m.user2_id = auth.uid() AND m.user1_id::text = (storage.foldername(name))[1])
      AND m.is_active = true
    )
    OR auth.uid()::text = (storage.foldername(name))[1]
  )
);
```

## 2. フロントエンド実装

### 2.1 画像アップロード関数の実装

```typescript
// src/lib/storage.ts
import { createClient } from '@/lib/supabase/client';

export class StorageService {
  private supabase = createClient();

  /**
   * プロフィール写真をアップロード
   */
  async uploadProfilePhoto(
    userId: string,
    file: File,
    photoIndex: number = 1
  ): Promise<{ url?: string; error?: string }> {
    try {
      // ファイル名の生成（拡張子を保持）
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/photo${photoIndex}.${fileExt}`;

      // 画像のリサイズ（必要に応じて）
      const resizedFile = await this.resizeImage(file, 800, 800);

      // Supabase Storageにアップロード
      const { data, error } = await this.supabase.storage
        .from('profile-photos')
        .upload(fileName, resizedFile, {
          cacheControl: '3600',
          upsert: true, // 既存ファイルを上書き
        });

      if (error) {
        throw error;
      }

      // 公開URLを取得
      const { data: { publicUrl } } = this.supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      return { url: publicUrl };
    } catch (error: any) {
      console.error('Photo upload error:', error);
      return { error: error.message || '写真のアップロードに失敗しました' };
    }
  }

  /**
   * 画像のリサイズ
   */
  private async resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number = 0.8
  ): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // アスペクト比を保持してリサイズ
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // 画像を描画
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Canvasから新しいFileオブジェクトを作成
        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob!], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * プロフィール写真を削除
   */
  async deleteProfilePhoto(
    userId: string,
    photoIndex: number = 1
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // ファイル名を推測（複数の拡張子を試行）
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];
      
      for (const ext of extensions) {
        const fileName = `${userId}/photo${photoIndex}.${ext}`;
        
        const { error } = await this.supabase.storage
          .from('profile-photos')
          .remove([fileName]);

        if (!error) {
          return { success: true };
        }
      }

      return { success: false, error: '削除対象の写真が見つかりませんでした' };
    } catch (error: any) {
      console.error('Photo delete error:', error);
      return { success: false, error: error.message || '写真の削除に失敗しました' };
    }
  }

  /**
   * ユーザーのプロフィール写真一覧を取得
   */
  async getUserPhotos(userId: string): Promise<{ urls: string[]; error?: string }> {
    try {
      const { data, error } = await this.supabase.storage
        .from('profile-photos')
        .list(userId, {
          limit: 10,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) {
        throw error;
      }

      const urls = data.map(file => {
        const { data: { publicUrl } } = this.supabase.storage
          .from('profile-photos')
          .getPublicUrl(`${userId}/${file.name}`);
        return publicUrl;
      });

      return { urls };
    } catch (error: any) {
      console.error('Get photos error:', error);
      return { urls: [], error: error.message || '写真の取得に失敗しました' };
    }
  }
}

export const storageService = new StorageService();
```

### 2.2 React コンポーネントでの使用例

```typescript
// src/components/profile/PhotoUpload.tsx
'use client';

import { useState } from 'react';
import { storageService } from '@/lib/storage';
import { Button } from '@/components/ui/Button';

interface PhotoUploadProps {
  userId: string;
  currentPhotoUrl?: string;
  onPhotoUploaded: (url: string) => void;
}

export function PhotoUpload({ userId, currentPhotoUrl, onPhotoUploaded }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック（5MB以下）
    if (file.size > 5 * 1024 * 1024) {
      setError('ファイルサイズは5MB以下にしてください');
      return;
    }

    // ファイル形式チェック
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('JPEG、PNG、WebP形式の画像のみアップロード可能です');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const result = await storageService.uploadProfilePhoto(userId, file, 1);
      
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        onPhotoUploaded(result.url);
      }
    } catch (err: any) {
      setError(err.message || 'アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {currentPhotoUrl && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden">
          <img
            src={currentPhotoUrl}
            alt="プロフィール写真"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="block">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <Button
            as="span"
            variant="outline"
            disabled={uploading}
            className="cursor-pointer"
          >
            {uploading ? 'アップロード中...' : '写真を選択'}
          </Button>
        </label>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <p className="text-gray-500 text-sm">
          JPEG、PNG、WebP形式、5MB以下
        </p>
      </div>
    </div>
  );
}
```

## 3. 環境変数の設定

`.env.local`に以下を追加：

```env
# Supabase Storage設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 4. セキュリティ設定

### 4.1 CORS設定
Supabase管理画面で以下のCORS設定を追加：

```
許可されたオリジン:
- http://localhost:3000 (開発環境)
- https://your-domain.com (本番環境)
```

### 4.2 ファイルサイズ制限
```sql
-- Bucket設定でファイルサイズ制限を設定
-- profile-photos: 最大5MB
-- community-photos: 最大10MB
-- private-photos: 最大5MB
```

## 5. 運用・監視

### 5.1 ストレージ使用量の監視
- Supabase管理画面の「Settings > Usage」で使用量を確認
- 月間ストレージ使用量が上限に近づいたら通知設定

### 5.2 定期的なクリーンアップ
```sql
-- 削除されたユーザーの写真を削除するスケジュール
-- （手動実行またはSupabase Functionsで実装）
```

## 6. トラブルシューティング

### よくある問題と解決方法

**問題1: アップロードが失敗する**
- RLSポリシーの確認
- ファイルサイズ・形式の確認
- 認証状態の確認

**問題2: 画像が表示されない**
- 公開URLの確認
- Bucketの公開設定確認
- ブラウザのキャッシュクリア

**問題3: 権限エラー**
- ユーザーIDとフォルダ名の一致確認
- RLSポリシーの条件式確認

**問題4: ポリシー作成エラー**

*エラー例: "column 'status' does not exist"*
- Prismaスキーマと一致しないフィールドを参照している
- 実際のテーブル構造を確認してポリシーを修正

*エラー例: "relation 'community_members' does not exist"*
- テーブル名が正しくマップされているか確認
- Prisma @@map ディレクティブを確認

**問題5: RLSポリシー設定のベストプラクティス**

1. **段階的テスト**: まず簡単なポリシーから始める
```sql
-- テスト用シンプルポリシー
CREATE POLICY "Test policy" ON storage.objects FOR SELECT TO authenticated USING (true);
```

2. **ポリシーのデバッグ**: 条件を分けてテスト
```sql
-- ユーザーIDのみチェック
auth.uid()::text = (storage.foldername(name))[1]

-- コミュニティメンバーシップのみチェック  
EXISTS (SELECT 1 FROM community_members WHERE user_id = auth.uid())
```

3. **エラーログの確認**: Supabase管理画面の「Logs」でエラー詳細を確認

## 次のステップ

1. ✅ Supabase管理画面でBucket作成
2. ✅ RLSポリシー設定
3. ✅ フロントエンド実装
4. ✅ 画像アップロード機能テスト
5. ✅ プロフィール設定画面への統合

これで画像アップロード機能（F1-09）が完了し、Phase 1の全タスクが完了します。