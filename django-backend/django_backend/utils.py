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
        'error': error,
        'statusCode': code,
    }
    return Response(response, status=code)
