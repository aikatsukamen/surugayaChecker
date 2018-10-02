import fetchJsonp from 'fetch-jsonp';
import cheerio from 'cheerio';

import qrNameMap from '../data/cardnameMap.json';

function getSurugaya(keyword) {
  const url = `https://www.suruga-ya.jp/search?category=5&search_word=${keyword}`;
  return new Promise(resolve => {
    fetchJsonp('https://script.google.com/macros/s/AKfycbyGqtJYxOIgvFgYW-xZRW4ZGQAfwPunJGzm6WwiCetbI56CGJWh/exec?url=' + encodeURIComponent(url), {
      jsonpCallback: 'callback',
      timeout: 10000
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        const ret = scrapeSurugaya(json.htmlStr, keyword);
        resolve({ data: ret });
      })
      .catch(error => {
        resolve({ error });
      });
  });
}

/**
 * 駿河屋の商品データをスクレイピングする
 * @param {string} htmlStr
 * @param {string} keyword
 * @return {object} スクレイピング結果
 */
function scrapeSurugaya(htmlStr, keyword) {
  if (htmlStr.match('検索結果は０件です') !== null) throw `駿河屋の検索結果が0件です。(${keyword})`;

  const $ = cheerio.load(htmlStr);
  const surugayaResult = [];

  $('.item').each((index, elem) => {
    /** 商品名 */
    const name = $(elem)
      .find('a')
      .text();

    /** 商品URL */
    const itemUrl = $(elem)
      .find('a')
      .attr('href');

    // 画像URL
    // 変換する
    // 元：https://www.suruga-ya.jp/database/photo.php?shinaban=g5358519&size=m
    // 小さい方：https://www.suruga-ya.jp/pics/boxart_m/g5358519m.jpg
    // 大きい方：https://www.suruga-ya.jp/database/pics/game/g5358519.jpg
    const shinaban = $(elem)
      .find('img')
      .attr('src')
      .match(/(g[0-9]+)/);
    let imageUrl = '';
    if (shinaban) {
      imageUrl = `https://www.suruga-ya.jp/pics/boxart_m/${shinaban[0]}m.jpg`;
    }

    /** 価格 */
    const price = $(elem)
      .find('.price')
      .text();

    surugayaResult.push({
      name,
      itemUrl,
      imageUrl,
      price
    });
  });

  return surugayaResult;
}

function getCardInfoFromQr(qrcode) {
  return new Promise(resolve => {
    // TODO:旧カツカードのQRと照合する
    // if (qrcode.indexOf('http://aikatsu.com/qr') > -1) return { error: '旧アイカツカードにはまだ対応してないよ' };
    if (qrNameMap[qrcode]) {
      resolve({ data: qrNameMap[qrcode] });
    }

    // スターズ以降のカードは、QRにアクセスして名前を取得
    fetchJsonp('https://script.google.com/macros/s/AKfycbyGqtJYxOIgvFgYW-xZRW4ZGQAfwPunJGzm6WwiCetbI56CGJWh/exec?url=' + encodeURIComponent(qrcode), {
      jsonpCallback: 'callback',
      timeout: 10000
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        const ret = scrapeAikatsu(json.htmlStr);
        resolve({ data: ret });
      })
      .catch(error => {
        resolve({ error });
      });
  });
}

/**
 * QR読み取り結果をスクレイピングする
 * @param {string} htmlStr
 * @return {object} スクレイピング結果
 */
function scrapeAikatsu(htmlStr) {
  const $ = cheerio.load(htmlStr);
  let cardName = '';

  // アイカツフレンズ
  cardName = $('.cardName').text();

  if (cardName === '') {
    // アイカツスターズ
    cardName = $('.dress-detail-title')
      .find('h4')
      .text();
  }

  if (cardName === '') throw { message: 'データが見つかりません' };

  return cardName;
}

export default { getSurugaya, getCardInfoFromQr };
