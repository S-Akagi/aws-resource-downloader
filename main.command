#!/bin/bash

# Color variables
GREEN=$'\e[32m'
YELLOW=$'\e[33m'
CYAN=$'\e[36m'
RESET=$'\e[0m'
BOLD=$'\e[1m'
BG_GREEN=$'\e[30;42;1m'

# AWS configurations
AWS_REGION=
DOWNLOAD_DIR=

# Function to get user input for the download directory
get_download_directory() {
    read -p "${GREEN}Enter the download directory path (or press Enter for the default): ${RESET}" user_input
    DOWNLOAD_DIR=${user_input:-~/Downloads/aws}
}

# Function to select AWS region
select_aws_region() {
    printf "%sSelect an AWS region:%s\n" "${BG_GREEN}" "${RESET}"
    select region in $(aws ec2 describe-regions --query "Regions[].RegionName" --output text); do
        if [[ -n $region ]]; then
            AWS_REGION=$region
            break
        else
            echo "Invalid selection. Please choose a valid AWS region."
        fi
    done
    echo "AWS_REGION set to: $AWS_REGION"
}

# Function to list AWS profiles
list_aws_profiles() {
    aws configure list-profiles
}

# Function to handle errors
handle_error() {
    echo "Error: $1" >&2
    exit 1
}

# Function to select an AWS profile
select_aws_profile() {
    read -p "${GREEN}Select an AWS profile (enter the number)${RESET}" selection
    selected_profile="${profiles[selection-1]}"

    [[ -n "$selected_profile" ]] || handle_error "Invalid selection. Please enter a valid profile number."

    export AWS_PROFILE="$selected_profile"
    echo "AWS_PROFILE set to: $AWS_PROFILE"

    aws configure list &> /dev/null || {
        error_message=$(aws configure list 2>&1)
        [[ $error_message == *sso* ]] && {
            echo "Executing 'aws sso login'"
            aws sso login &
            wait
        }
    }
}

# Function to create a directory with write permissions
create_directory() {
    local directory="$1"
    mkdir -p "$directory" && chmod u+w "$directory" && printf "Directory created with write permissions: %s\n" "$directory" || handle_error "Failed to create or set write permissions for directory: $directory"
    ls -ld "$directory"
}

# Function to create a test file for permission check
create_test_file() {
    local file="$1"
    echo "This is a test file." > "$file" && echo "Test file created successfully: $file" || handle_error "Failed to create test file: $file"
    # Uncomment the line below if you want to automatically remove the test file after creation
    rm "$file" || handle_error "Failed to remove test file: $file"
}

# Function to process each resource type
process_resource_type() {
    local resource_type="$1"
    local download_dir="$2"
    local total_resources
    local processed_resources=0
    # Color variables
    local GREEN=$'\e[32m'
    local YELLOW=$'\e[33m'
    local CYAN=$'\e[36m'
    local RESET=$'\e[0m'
    local BOLD=$'\e[1m'
    local BG_GREEN=$'\e[30;42;1m'

    printf "${YELLOW}${BOLD}Start resource type: $resource_type${RESET}\n"

    # Fetch resource IDs using AWS CLI and format the output
    resource_ids=$(aws configservice list-discovered-resources --resource-type "$resource_type" | jq -r '.resourceIdentifiers[].resourceId')

    # Loop through resource IDs and execute AWS CLI for each
    while read -r resource_id; do
      if [ -n "$resource_id" ]; then
        printf "%s%s%s\n" "${CYAN}${BOLD}" "Resource type=$resource_type, Resource id=$resource_id Processing" "${RESET}"
        
        # Execute AWS CLI for batch-get-resource-config
        aws configservice batch-get-resource-config --resource-keys "resourceType=$resource_type,resourceId=$resource_id"
      fi
    done <<< "$resource_ids" > "${download_dir}/${resource_type}.json"

    printf "${GREEN}${BOLD}Processed resource type: $resource_type${RESET}\n"
}

# Main script
profiles=($(list_aws_profiles))

printf "%sAvailable AWS Profiles:%s\n" "${BG_GREEN}" "${RESET}"
for i in "${!profiles[@]}"; do
    printf "%s%s%s\n" "${CYAN}${BOLD}" "$((i+1)): ${profiles[i]}" "${RESET}"
done

select_aws_profile

select_aws_region

get_download_directory

account_id=$(aws sts get-caller-identity --query "Account")
download_directory="${DOWNLOAD_DIR%/}/${account_id}"

create_directory "$download_directory"
echo "Download directory: $download_directory"

create_test_file "$download_directory/test_file.txt"

resources=$(curl -s https://awscli.amazonaws.com/v2/documentation/api/latest/reference/configservice/list-discovered-resources.html | grep docutils | grep -o "AWS::[^<]*")

export -f process_resource_type
echo "$resources" | xargs -n 1 -P 4 -I {} bash -c "process_resource_type '{}' '$download_directory'"
