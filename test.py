import os
from dotenv import load_dotenv

# Load the configuration from the .env file
load_dotenv()

# Accessing variables from the environment
API_URL = os.getenv('API_URL')
API_KEY = os.getenv('API_KEY')
TIMEOUT = int(os.getenv('TIMEOUT', 30))  # Default to 30 if not set
DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 't', 'y', 'yes')

# Function to simulate making an API request
def make_api_request():
    print(f"Making API request to {API_URL} with API_KEY: {API_KEY} and timeout: {TIMEOUT}s")
    # Here you would use requests or any other library to make an actual API call
    # For example: response = requests.get(API_URL, headers={'Authorization': f'Bearer {API_KEY}'}, timeout=TIMEOUT)
    # return response

# Function to check debug mode
def check_debug_mode():
    if DEBUG:
        print("Debug mode is ON")
    else:
        print("Debug mode is OFF")

# Example usage
make_api_request()
check_debug_mode()
