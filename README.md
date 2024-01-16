[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# AWS Resource Downloader

[README日本語版](https://github.com/SoichiAkagi/aws-resource-explorer/blob/main/README-jp.md)

AWS Resource Downloader is a command-line tool built with TypeScript and [ZX](https://github.com/google/zx) for downloading AWS resource information in JSON format.

## Features

- Download AWS resource information for specified resource types.
- Supports parallel processing for faster execution.
- Interactive prompts for selecting AWS profile, region, and download directory.

## Prerequisites

Before using AWS Resource Downloader, ensure that you have the following installed:

- Node.js (20.5.1 or higher)
- [PNPM](https://pnpm.io/) package manager (v8.14.1)
- AWS CLI installed and configured with the necessary permissions
- jq installed for processing JSON data ([jq Installation](https://stedolan.github.io/jq/download/))

## Tools Used

| Tool         | Version | Purpose                                    |
| ------------ | ------- | ------------------------------------------ |
| Node.js      | 20.5.1  | JavaScript runtime                         |
| PNPM         | 8.14.1  | Package manager                            |
| ZX           | 7.2.3   | Script execution and build tool            |
| TypeScript   | ^5.3.3  | Superset of JavaScript                     |
| ts-node      | 10.9.2  | Runtime for executing TypeScript code      |
| @types/node  | ^20.11.2| Type definitions for Node.js               |
| Prettier     | 3.2.2   | Code formatter                             |
| ESLint       | (internal)| JavaScript and TypeScript static analyzer |

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/aws-resource-downloader.git
   ```

2. Change into the project directory:

   ```bash
   cd aws-resource-downloader
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

## Usage

1. Run the application:

   ```bash
   pnpm start
   ```

2. Follow the prompts to select AWS profile, region, and specify the download directory.

3. The application will fetch AWS resource information based on predefined resource types, and the results will be saved in JSON files.

## Configuration

- Modify the `maxParallel` variable in `main.ts` to control the number of resource types processed in parallel.
- Update the predefined resource types in the `resources` variable in `main.ts` if needed.

## Scripts

- `pnpm test`: Execute tests (currently not implemented).
- `pnpm run build`: Build the TypeScript code.
- `pnpm start:prod`: Start the compiled application in production mode.
- `pnpm run build:watch`: Build TypeScript code in watch mode.
- `pnpm start`: Start the application in development mode.
- `pnpm run lint`: Run ESLint with automatic fixing.
- `pnpm run lint:ci`: Run ESLint for continuous integration.
- `pnpm run format`: Format code using Prettier.
- `pnpm run format:ci`: Check code formatting using Prettier.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
