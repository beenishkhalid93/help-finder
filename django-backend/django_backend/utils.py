from rest_framework.response import Response

def APIResponse(status: bool, message: str, data=None, error=None, code=200):
    """
    Utility function to format API responses.
    
    Parameters:
        - status: (str) The status of the response, e.g., 'success', 'failure'.
        - message: (str) The message you want to send in the response.
        - data: (Any) The data payload (optional).
        - error: (dict) Any error messages (optional).
        - code: (int) The HTTP status code (default 200).

    Returns:
        - (Response) Formatted API response with a consistent structure.
    """
    response = {
        'status': status,
        'message': message,
        'data': data,
        'error': format_error_message(error),
        'statusCode': code,
    }
    return Response(response, status=code)

def format_error_message(error):
    if isinstance(error, dict):  # If the error is an object
        # Convert each key-value pair to a string and join them
        return "; ".join([f"{key}: {', '.join(value)}" if isinstance(value, list) else f"{key}: {value}" for key, value in error.items()])
    elif isinstance(error, list):  # If the error is a list of messages
        return "; ".join(error)
    return str(error)  # If it's already a string, just return it