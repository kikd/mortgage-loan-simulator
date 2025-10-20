# 住宅ローンシミュレーター

TypeScript + React + Vite + ApexChartsを使用した住宅ローンシミュレーターアプリケーションです。

## 🚀 機能

- 住宅ローンの月々返済額計算
- 総返済額・総利息額の表示
- 年別返済内訳グラフ（元本・利息）
- ローン残高推移グラフ
- レスポンシブデザイン

## 🛠️ 技術スタック

- **フレームワーク**: React 18
- **言語**: TypeScript
- **ビルドツール**: Vite
- **UIライブラリ**: Material-UI (MUI) v5
- **グラフライブラリ**: ApexCharts
- **アーキテクチャ**: Atomic Design
- **リンター**: ESLint
- **フォーマッター**: Prettier
- **ホスティング**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## 📦 セットアップ

### 前提条件

- Node.js 18.0.0以上
- npm

### インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/yourusername/mortgage-loan-simulator.git
cd mortgage-loan-simulator
```

2. 依存関係をインストール:
```bash
npm install
```

3. 開発サーバーを起動:
```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で利用できます。

## 🏗️ ビルド

プロダクション用にビルド:
```bash
npm run build
```

ビルド結果をプレビュー:
```bash
npm run preview
```

## 🧪 コード品質

### リンティング
```bash
npm run lint          # ESLintでコードをチェック
npm run lint:fix      # ESLintで修正可能なエラーを自動修正
```

### フォーマッティング
```bash
npm run format        # Prettierでコードをフォーマット
npm run format:check  # フォーマットが正しいかチェック
```

### 型チェック
```bash
npm run type-check    # TypeScriptで型チェック
```

## 🚀 デプロイ

### Cloudflare Pagesでのデプロイ

このプロジェクトはGitHub ActionsによってCloudflare Pagesに自動デプロイされます。

#### セットアップ手順

1. **Cloudflare Pagesプロジェクトの作成**
   - Cloudflareダッシュボードにアクセス
   - Pages → Create a project → Connect to Git
   - GitHubリポジトリを選択
   - プロジェクト名: `mortgage-loan-simulator`

2. **GitHub Secretsの設定**
   
   以下のシークレットをGitHubリポジトリに追加してください：
   
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
     - Cloudflareダッシュボード → My Profile → API Tokens
     - "Custom token" → "Get started"
     - Permissions: `Zone:Zone:Read`, `Page:Page:Edit`
   
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID
     - Cloudflareダッシュボード → 右側のサイドバーで確認

3. **自動デプロイ**
   - `main`または`master`ブランチにプッシュすると自動デプロイされます
   - プルリクエストでもプレビューデプロイが作成されます

### ビルド設定

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Node.js version**: 18

## 📁 プロジェクト構造

```
mortgage-loan-simulator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions設定
├── .vscode/
│   └── settings.json          # VSCode設定
├── src/
│   ├── components/            # Atomic Designパターン
│   │   ├── atoms/            # 最小単位のコンポーネント
│   │   │   ├── NumberInput.tsx
│   │   │   ├── PrimaryButton.tsx
│   │   │   └── index.ts
│   │   ├── molecules/        # atomsを組み合わせたコンポーネント
│   │   │   ├── InputField.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   ├── ChartWrapper.tsx
│   │   │   └── index.ts
│   │   ├── organisms/        # moleculesを組み合わせた複合コンポーネント
│   │   │   ├── CalculatorForm.tsx
│   │   │   ├── ResultsSection.tsx
│   │   │   ├── ChartsGrid.tsx
│   │   │   └── index.ts
│   │   ├── templates/        # ページレイアウトテンプレート
│   │   │   ├── MainTemplate.tsx
│   │   │   └── index.ts
│   │   └── index.ts         # 全コンポーネントのエクスポート
│   ├── hooks/               # カスタムフック
│   │   └── useLoanCalculator.ts
│   ├── types/               # TypeScript型定義
│   │   └── index.ts
│   ├── utils/               # ユーティリティ関数
│   │   └── loanCalculations.ts
│   ├── App.tsx             # メインアプリケーションコンポーネント
│   ├── main.tsx           # エントリーポイント
│   └── index.css          # グローバルスタイル
├── .eslintrc.cjs          # ESLint設定
├── .prettierrc            # Prettier設定
├── .prettierignore        # Prettier除外ファイル
├── .gitignore            # Git除外ファイル
├── index.html            # HTMLテンプレート
├── package.json          # プロジェクト設定
├── tsconfig.json         # TypeScript設定
├── tsconfig.node.json    # Node.js用TypeScript設定
├── vite.config.ts        # Vite設定
└── README.md             # このファイル
```

### Atomic Designパターン

このプロジェクトは **Atomic Design** パターンを採用しています：

- **Atoms**: 基本的なUI要素（ボタン、入力フィールドなど）
- **Molecules**: atomsを組み合わせた機能的なコンポーネント
- **Organisms**: moleculesやatomsを組み合わせた複合的な機能を持つコンポーネント  
- **Templates**: ページのレイアウト構造を定義するコンポーネント

## 🎯 使用方法

1. 借入金額、金利、借入期間を入力
2. 「計算する」ボタンをクリック
3. 結果が表示されます：
   - 月々の返済額
   - 総返済額
   - 総利息額
   - 年別返済内訳グラフ
   - ローン残高推移グラフ

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 📞 サポート

質問や問題がある場合は、[Issues](https://github.com/yourusername/mortgage-loan-simulator/issues)を作成してください。