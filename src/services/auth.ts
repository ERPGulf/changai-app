import axios from "axios";

interface GenerateTokenParams {
  api_key: string;
  app_key: string;
  api_secret: string;
  baseUrl: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export const generateToken = async ({
  api_key,
  app_key,
  api_secret,
  baseUrl,
}: GenerateTokenParams): Promise<TokenResponse> => {
  const formData = new URLSearchParams();

  formData.append("api_key", api_key);
  formData.append("app_key", app_key);
  formData.append("api_secret", api_secret);

  const response = await axios.post(
    `${baseUrl}/api/method/changai.changai.api.v2.text2sql_pipeline_v2.generate_token_secure`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.data;
};