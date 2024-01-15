[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# AWS Config サービス リソースエクスポートスクリプト

このスクリプトはAWS CLIを使用してAWS Configサービスのリソースをエクスポートするためのものです。AWSプロファイル、リージョン、およびダウンロードディレクトリを柔軟に選択できるようになっています。

## 前提条件

- AWS CLIがインストールされ、必要なプロファイルで構成されていること。
- JSONをパースするための`jq`ツール。
- リソースタイプのドキュメンテーションを取得するためのインターネット接続。

## 使用方法

### 1. インストール

リポジトリをクローンします。

```bash
git clone https://github.com/your-username/aws-config-export-script.git
cd aws-config-export-script
```

### 2. 設定

スクリプトを開き、以下の変数を設定します：

- **AWS_REGION**: デフォルトのAWSリージョンを設定します。
- **DOWNLOAD_DIR**: エクスポートされるJSONファイルのデフォルトのダウンロードディレクトリを設定します。

### 3. スクリプトの実行

スクリプトを実行します。

```bash
bash aws_config_export.sh
```

画面に表示されるプロンプトに従って、AWSプロファイルを選択し、リージョンを選択し、必要に応じてカスタムのダウンロードディレクトリを指定します。

## 特徴

- プロファイルの選択: 利用可能なAWS CLIプロファイルから選択可能。
- リージョンの選択: EC2の利用可能なリージョンを動的に取得。
- 並列リソース処理: より速いエクスポートのために並列処理を利用。

## 注意事項

- このスクリプトはAWS CLI、`jq`、および`xargs`を使用してリソースを効率的に処理します。
- 必要なAWS CLIプロファイルが正しく構成されていることを確認してください。

## ライセンス

このプロジェクトはMITライセンスのもとで提供されています。詳細については[LICENSE](LICENSE)ファイルを参照してください。
