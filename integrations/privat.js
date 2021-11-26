import fetch, { Headers } from 'node-fetch';
// import xmlbuilder from 'xmlbuilder';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import md5 from 'md5';
import sha1 from 'js-sha1';

const api = {
    baseUrl: 'https://api.privatbank.ua/p24api',
}

function generateSignature(data, password) {
    return sha1(md5(`${data}${password}`));
}

const data = `<oper>cmt</oper>
            <wait>90</wait>
            <test>0</test>
            <payment id="">
                <prop name="cardnum" value="4149439317562795" />
                <prop name="country" value="UA" />
            </payment>`;

console.log(generateSignature(data, '0f5TTa5eu1W98oV07n1m29zw5WR9xxPm'))