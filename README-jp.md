[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# AWS Resource Downloader

AWS リソース ダウンローダーは、TypeScript および [ZX](https://github.com/google/zx) を使用して AWS リソース情報を JSON 形式でダウンロードするためのコマンドライン ツールです。

## 機能

- 指定されたリソース タイプの AWS リソース情報をダウンロードします。
- より迅速な実行のための並列処理をサポートします。
- AWS プロファイル、リージョンの選択、ダウンロード ディレクトリの指定に対応した対話型のプロンプトがあります。

## 前提条件

AWS リソース ダウンローダーを使用する前に、以下をインストールしてください。

- Node.js (v20.5.1 以上)
- [PNPM](https://pnpm.io/) パッケージ マネージャー (v8.14.1)
- 必要な権限で AWS CLI がインストールおよび構成されている
- JSON データの処理のために jq がインストールされている ([jq インストール](https://stedolan.github.io/jq/download/))

## 使用されているツール

| ツール         | バージョン | 用途                                   |
| ------------ | ------- | ---------------------------------------- |
| Node.js      | 20.5.1  | JavaScript ランタイム                      |
| PNPM         | 8.14.1  | パッケージ マネージャー                      |
| ZX           | 7.2.3   | スクリプトの実行およびビルドツール               |
| TypeScript   | ^5.3.3  | JavaScript のスーパーセット                 |
| ts-node      | 10.9.2  | TypeScript コードの実行のためのランタイム      |
| @types/node  | ^20.11.2| Node.js の型定義                          |
| Prettier     | 3.2.2   | コード フォーマッタ                         |
| ESLint       | (内部使用)| JavaScript および TypeScript の静的解析ツール     |

## インストール

1. リポジトリをクローン:

   ```bash
   git clone https://github.com/your-username/aws-resource-downloader.git
   ```

2. プロジェクト ディレクトリに移動:

   ```bash
   cd aws-resource-downloader
   ```

3. 依存関係をインストール:

   ```bash
   pnpm install
   ```

## 使用方法

1. アプリケーションを実行:

   ```bash
   pnpm start
   ```

2. AWS プロファイル、リージョンを選択し、ダウンロード ディレクトリを指定するためのプロンプトに従います。

3. アプリケーションは事前定義されたリソース タイプに基づいて AWS リソース情報を取得し、結果は JSON ファイルに保存されます。

## 設定

- `main.ts` の `maxParallel` 変数を変更して、並列処理で処理するリソース タイプの数を制御できます。
- 必要に応じて `main.ts` の `resources` 変数に事前に定義されたリソース タイプを更新してください。

## スクリプト

- `pnpm test`: テストを実行 (現在は未実装)。
- `pnpm run build`: TypeScript コードをビルド。
- `pnpm start:prod`: プロダクション モードでコンパイルされたアプリケーショ

ンを起動。
- `pnpm run build:watch`: TypeScript コードをウォッチ モードでビルド。
- `pnpm start`: 開発モードでアプリケーションを起動。
- `pnpm run lint`: ESLint を実行し、自動修正を適用。
- `pnpm run lint:ci`: CI 用に ESLint を実行。
- `pnpm run format`: Prettier を使用してコードをフォーマット。
- `pnpm run format:ci`: Prettier を使用してコードのフォーマットをチェック。

## ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています - 詳細は [LICENSE](LICENSE) ファイルを参照してください。
