import { OAuthRequest } from "./OAuthRequest.model";

export interface  OIDCRequest extends OAuthRequest {
    redirect_uri: string,
    scope: string,
    response_mode?: string,
    nonce?: string,
    display?: DisplayTypes,
    prompt?: PromptTypes,
    max_age?: string,
    ui_locales?: string,
    id_token_hint?: string,
    login_hint?: string,
    acr_values?: string
}

enum DisplayTypes {
    page, popup, touch, wap
}

enum PromptTypes {
    none, login, consent, select_account
}