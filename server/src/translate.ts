import axios, { AxiosProxyConfig, AxiosRequestConfig } from 'axios-https-proxy-fix';
import * as vscode from 'vscode';
export declare type Tld = 'cn' | 'com';
export interface Options {
    tld?: Tld;
    from?: string;
    to: string;
    proxy?: AxiosProxyConfig;
    config?: Object;
    browers?: boolean;
    browersUrl?: string;
    format?: string;
    isUserAgent?: boolean;
    userAgent?: string;
}

export default async function translate(value: string | string[], options: Options): Promise<any> {
    let text: string[];
    if(typeof value === 'string') {
        text = [value];
        !options.format && (options.format = 'text');
    } else {
        text = value;
        !options.format && (options.format = 'html');
    }
    const gasUrl = getGASURL();
    console.log(`gasUrl: ${gasUrl}`);

    const query = {
        "to": options.to,
        "value": value
    }
    const headers = {
        "content-type": "application/json",
        "Accept": "application/json, text/plain, */*"
    }
    const axios_options: AxiosRequestConfig = {
        method: "POST",
        headers,
        data: JSON.stringify(query),
        url: gasUrl,
        params: query,
        proxy: options.proxy || false,
        ...(options.config)
      };
    return axios(axios_options);
}


/**
 * Returns user settings GAS URL
 *
 * @returns {string}
 */
function getGASURL(): string {
  const config = vscode.workspace.getConfiguration("vscodeGoogleTranslate");
  return config.get("gasUrl");
}