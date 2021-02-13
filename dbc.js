const fs = require('fs');
const StateBuf = require('./state_buff');
const debug = false;

exports.talents = buf => {
  const row = {};
  row.id = buf.readUInt32LE();
  row.tabRef = buf.readUInt32LE();
  row.tier = buf.readUInt32LE();
  row.col = buf.readUInt32LE();
  row.spellRankRef = [buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE()];
  row.prereqRef = [buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE()];
  row.prereqRank = [buf.readUInt32LE(), buf.readUInt32LE(), buf.readUInt32LE()];
  row.flags = buf.readUInt32LE();
  row.requiredSpellRef = buf.readUInt32LE();
  return { key: row.id, value: row };
};

exports.talentTab = buf => {
  const row = {};
  row.id = buf.readUInt32LE();
  const langHash = {};
  langHash.enUS = buf.readUInt32LE();
  langHash.krKR = buf.readUInt32LE();
  langHash.frFR = buf.readUInt32LE();
  langHash.deDE = buf.readUInt32LE();
  langHash.zhCn = buf.readUInt32LE();
  langHash.zhTW = buf.readUInt32LE();
  langHash.esES = buf.readUInt32LE();
  langHash.esMX = buf.readUInt32LE();
  langHash.bitmask = buf.readUInt32LE();
  row.lang = langHash;
  row.spellIcon = buf.readUInt32LE();
  row.race = buf.readUInt32LE();
  row.class = buf.readUInt32LE();
  row.order = buf.readUInt32LE();
  row.background = buf.readUInt32LE();
  return { key: row.id, value: row };
};

exports.talentTabStrings = (table, strings, _) => {
  for (const row of Object.values(table)) {
    row.name = strings[row.lang.enUS - 1];
    delete row.lang; // Unnecessary information now
  }
};

exports.readDbc = (filename, readRecord, readStrings, endCallback) => {
  const readStream = fs.createReadStream(filename, { highWaterMark: 64 });
  const data = [];
  readStream.on('data', arr => data.push(arr));
  readStream.on('end', () => {
    const buf = new StateBuf(data);
    const WDBC = String.fromCharCode.apply(String, [buf.readInt8(), buf.readInt8(), buf.readInt8(), buf.readInt8()]);
    const recordCount = buf.readUInt32LE();
    const fieldCount = buf.readUInt32LE();
    const recordSize = buf.readUInt32LE();
    const stringSize = buf.readUInt32LE();
    if(debug) {
      console.log(WDBC);
      console.log('Records:  ' + recordCount);
      console.log(' Fields:  ' + fieldCount);
      console.log('RecSize:  ' + recordSize);
      console.log('StrSize:  ' + stringSize);
      console.log('----')
    }
    const table = {};
    for(let i = 0; i < recordCount; i++) {
      const entry = readRecord(buf);
      if(entry && entry.key && entry.value) {
        table[entry.key] = entry.value;
      }
    }
    const strings = {};
    let str = [];
    let x = 0;
    if(stringSize > 1){
      for(let i = 0; i < stringSize; i++) {
        const chr = buf.readInt8();
        if(chr == 0){
          strings[x] =  String.fromCharCode.apply(String, str);
          x = i;
          str = [];
        } else {
          str.push(chr);
        }

      }
    }
    readStrings 
      ? readStrings(table, strings, buf) 
      : buf.skip(stringSize);

    if(endCallback) endCallback(table, buf);
  });
  readStream.on('error', err => console.log(err));
};
