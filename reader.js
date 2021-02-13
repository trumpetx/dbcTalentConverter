const {readDbc, spells, spellStrings, talentTabStrings, talentTab, talents} = require('./dbc');

const TALENT_DBC_DIR = "C:\\Program Files (x86)\\MaNGOS\\5875\\dbc\\";

function displayAll(table, buf) {
  console.log(table);
  if(buf.remaining() > 0) {
    console.log('Buffer not read: ' + buf.remaining());
  } else {
    console.log('Buffer read complete');
  }
}

// readDbc(`${TALENT_DBC_DIR}Spell.dbc`, spells, spellStrings, displayAll);

readDbc(`${TALENT_DBC_DIR}TalentTab.dbc`, talentTab, talentTabStrings, tabTable => {
  readDbc(`${TALENT_DBC_DIR}Talent.dbc`, talents, undefined, talentTable => {
    for (const row of Object.values(talentTable)) {
      row.tab = tabTable[row.tabRef]
      delete row.tabRef; // Unnecessary informormation now
      console.log(row);
    }
  });
});
