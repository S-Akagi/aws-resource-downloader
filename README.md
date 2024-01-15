[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[README日本語版](https://github.com/SoichiAkagi/aws-resource-explorer/blob/main/README-jp.md)

# AWS Config Service Resource Export Script

This script is designed to export AWS Config Service resources using the AWS CLI. It provides a flexible way to select an AWS profile, region, and download directory for exporting resources in JSON format.

## Prerequisites

- AWS CLI installed and configured with the necessary profiles.
- `jq` tool for JSON parsing.
- Internet connectivity for fetching resource types documentation.

## Usage

### 1. Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/aws-config-export-script.git
cd aws-config-export-script
```

### 2. Configuration

Open the script and configure the following variables:

- **AWS_REGION**: Set the default AWS region.
- **DOWNLOAD_DIR**: Set the default download directory for exported JSON files.

### 3. Run the Script

Execute the script:

```bash
bash aws_config_export.sh
```

Follow the on-screen prompts to select an AWS profile, region, and provide a custom download directory if needed.

## Features

- Profile selection: Choose from available AWS CLI profiles.
- Region selection: Dynamically fetches available regions for EC2.
- Concurrent resource processing: Utilizes parallel processing for faster exports.

## Notes

- The script uses the AWS CLI, `jq`, and `xargs` for efficient resource processing.
- Ensure that the required AWS CLI profiles are properly configured.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Remember to include a LICENSE file if you decide to use a specific license for your script. Adjust the content based on your preferences and additional information you want to provide.
