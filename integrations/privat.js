gimport fetch, { Headers } from 'node-fetch';
// import xmlbuilder from 'xmlbuilder';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import md5 from 'md5';
import sha1 from 'js-sha1';

const api = {
    baseUrl: 'https://api.privatbank.ua/', //p24api/
}

const requestData = {
    merchantId: '',
    signature: '',
    cardNum: '',
    country: '',
}

const xmlData = `
    <?xml version="1.0" encoding="UTF-8"?>
    <request version="1.0">
        <merchant>
            <id>75482</id>
            <signature>ab871c9601cf28920c4c0ff63041ea585da9de89</signature>
        </merchant>
        <data>
            <oper>cmt</oper>
            <wait>0</wait>
            <test>0</test>
            <payment id="">
            <prop name="cardnum" value="5168742060221193" />
            <prop name="country" value="UA" />
            </payment>
        </data>
    </request>
`;

function generateSignature(data, password) {
    return sha1(md5(data + password));
}

// const xml = xmlbuilder.create('root')
//     .ele('xmlbuilder')
//         .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
//     .end({ pretty: true});
 
// console.log(xml);