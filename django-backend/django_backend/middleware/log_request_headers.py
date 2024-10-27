from django.utils.deprecation import MiddlewareMixin

class LogRequestHeadersMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Log the Authorization header (or lack thereof)
        # auth_header = request.headers.get('Authorization', 'Not Provided')
        # print(f'Authorization header at middleware: {auth_header}')
        auth_header = request.headers.get('Authorization', '').strip()
        print(f'Authorization header after stripping: {auth_header}')
        return None
