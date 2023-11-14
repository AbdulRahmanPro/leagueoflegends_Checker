import axios from 'axios';
import { getAgent, sleep } from '../../utils/utils.js';

export default async (userAgent, proxy) => {
  try {
    const cancelToken = axios.CancelToken.source();
    const timeoutPromise = sleep(1 * 30 * 1000);

    // قم بانتظار انتهاء الفاصل الزمني أو إلغاء الطلب أولاً
    await Promise.race([timeoutPromise, cancelToken.token]);

    const client = axios.create({
      headers: {
        'User-Agent': userAgent,
      },
      httpsAgent: getAgent(proxy),
      cancelToken: cancelToken.token, // لا تلغِ الطلب هنا
      validateStatus: false,
    });

    const res = await client.get('https://signup-api.leagueoflegends.com/v1/config');

    if (!res?.data?.captcha?.hcaptcha || !res?.headers?.['set-cookie']) {
      throw new Error('RQDATA_REQUEST_FAILED');
    }
    const { rqdata } = res.data.captcha.hcaptcha;
    const rawCookies = res.headers['set-cookie'];
    const cookies = rawCookies
      .map((rawCookie) => {
        const cookie = rawCookie.split(';')[0];
        return `${cookie};`;
      })
      .join(' ');

    return { rqdata, cookies };
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('RQDATA_REQUEST_TIMEOUT');
    } else {
      throw new Error('RQDATA_REQUEST_FAILED');
    }
  }
};
