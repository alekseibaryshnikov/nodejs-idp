export interface  AuthoriztionRequest {
    client_id: string,
    scope: string,
    response_type: string,
    redirect_url: string,
    state?: string,
    response_mode?: string
}