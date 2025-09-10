# Picture-in-Picture Web デモ

このプロジェクトは、WebブラウザのPicture-in-Picture APIを使用したシンプルなデモアプリケーションです。ビデオを小さなウィンドウで表示し、他のアプリケーションの上に重ねて表示することができます。

## 機能

- 🎥 ビデオの再生・一時停止
- 📺 Picture-in-Picture モードの切り替え
- 📱 レスポンシブデザイン
- 🔔 リアルタイムステータス表示
- 🎨 モダンなUIデザイン
- ⚡ シンプルで軽量な実装

## 使用方法

1. `index.html` をブラウザで開く
2. ビデオを再生する
3. 「Picture-in-Picture」ボタンをクリックして小さなウィンドウで表示
4. 小さなウィンドウは他のアプリケーションの上に表示されます
5. 再度ボタンをクリックして通常モードに戻す

## 特徴

### 🎯 シンプル設計
- Picture-in-Picture機能のみに特化
- 不要な機能を削除して軽量化
- 直感的な操作

### 🎨 美しいUI
- グラデーション背景
- モダンなボタンデザイン
- スムーズなアニメーション
- レスポンシブ対応

### 🔧 堅牢な実装
- エラーハンドリング
- 状態管理の改善
- ブラウザ互換性チェック
- 自動状態同期

## ブラウザ互換性

### Picture-in-Picture API サポート状況

| ブラウザ | サポート状況 | 備考 |
|---------|-------------|------|
| Chrome | ✅ 完全サポート | バージョン 70+ |
| Firefox | ✘ 非対応 | バージョン 71+ |
| Safari | ✅ 完全サポート | バージョン 13.1+ |
| Edge | ✅ 完全サポート | バージョン 79+ |
| Opera | ✅ 完全サポート | バージョン 57+ |

### 注意事項

- Picture-in-Picture APIはHTTPS環境でのみ動作します（localhostは除く）
- 一部のブラウザでは、ユーザーの操作（クリックなど）が必要な場合があります
- モバイルブラウザでは制限がある場合があります

## ファイル構成

```
web-pip-project/
├── index.html      # メインのHTMLファイル
├── style.css       # CSSスタイルシート
├── script.js       # JavaScriptアプリケーション
└── README.md       # このファイル
```

## 技術仕様

- **HTML5**: セマンティックなマークアップ
- **CSS3**: Flexbox、アニメーション、レスポンシブデザイン
- **JavaScript ES6+**: クラス、async/await、エラーハンドリング
- **Picture-in-Picture API**: ネイティブブラウザAPI
- **外部コントロール**: ビデオの外側に配置されたボタン

## 開発者向け情報

### 主要なクラスメソッド

```javascript
// Picture-in-Picture の開始
await video.requestPictureInPicture();

// Picture-in-Picture の終了
await document.exitPictureInPicture();

// サポート状況の確認
const isSupported = 'pictureInPictureEnabled' in document;

// 現在のPiP状態の確認
const isActive = document.pictureInPictureElement === video;
```

### イベント

```javascript
// Picture-in-Picture モードに入った時
document.addEventListener('enterpictureinpicture', (event) => {
    console.log('PiPモードに切り替わりました');
});

// Picture-in-Picture モードから出た時
document.addEventListener('leavepictureinpicture', (event) => {
    console.log('通常モードに戻りました');
});
```

### 状態管理

アプリケーションは以下の状態を管理します：
- `isPipSupported`: PiP APIのサポート状況
- `isPipActive`: 現在のPiP状態
- 自動的な状態同期とエラー回復

## トラブルシューティング

### よくある問題

1. **Picture-in-Picture ボタンが無効**
   - ブラウザがPicture-in-Picture APIをサポートしていない可能性があります
   - HTTPS環境で実行しているか確認してください

2. **ビデオが再生されない**
   - ネットワーク接続を確認してください
   - ブラウザのコンソールでエラーメッセージを確認してください

3. **PiPが元に戻らない**
   - ボタンを再度クリックしてください
   - ブラウザのコンソールでエラーメッセージを確認してください
   - ページを再読み込みしてみてください

4. **小さなウィンドウが表示されない**
   - ブラウザのポップアップブロック設定を確認してください
   - ユーザーの操作（クリック）が必要な場合があります

### デバッグ方法

1. ブラウザの開発者ツール（F12）を開く
2. コンソールタブでエラーメッセージを確認
3. `window.pipDemo` オブジェクトでアプリケーションの状態を確認

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 貢献

バグ報告や機能改善の提案は、GitHubのIssuesページでお知らせください。

