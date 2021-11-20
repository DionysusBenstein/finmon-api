import fetch, { Headers } from 'node-fetch';
import md5 from 'md5';
import sha1 from 'js-sha1';

const api = {
    baseUrl: 'https://api.privatbank.ua/p24api/',
}

console.log(sha1(md5(`<oper>cmt</oper><wait>0</wait><test>0</test><payment id=""><prop name="cardnum" value="4149439317562795" /><prop name="country" value="UA" /></payment>0f5TTa5eu1W98oV07n1m29zw5WR9xxPm`)));