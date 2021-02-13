const {readDbc, talents, talentTab, talentTabStrings} = require('./dbc');

/*
  struct dbc_header
  {
    uint32_t magic; // always 'WDBC'
    uint32_t record_count; // records per file
    uint32_t field_count; // fields per record
    uint32_t record_size; // sum (sizeof (field_type_i)) | 0 <= i < field_count. field_type_i is NOT defined in the files.
    uint32_t string_block_size;
  };

  struct TalentRec
  {
    uint32_t m_ID;
    uint32_t m_specID;
    uint32_t m_tierID;
    uint32_t m_columnIndex;
    uint32_t rank[9];
    uint32_t prerequisites_talent[3];
    uint32_t prerequisites_rank[3];
    uint32_t m_flags;
    uint32_t required_spell_id;
  };

  struct TalentTabRec 
  {
    uint32_t m_ID;
    langstringrefⁱ name;
    uint32_t spell_icon;
    uint32_t race_mask;
    uint32_t class_mask;
    uint32_t order_index;
    stringrefⁱ background_file;
  };
*/

const TALENT_DBC_DIR = "C:\\Program Files (x86)\\MaNGOS\\5875\\dbc\\";

function displayAll(table, buf) {
  console.log(table);
  if(buf.remaining() > 0) {
    console.log('Buffer not read: ' + buf.remaining());
  } else {
    console.log('Buffer read complete');
  }
}

readDbc(`${TALENT_DBC_DIR}TalentTab.dbc`, talentTab, talentTabStrings, tabTable => {
  readDbc(`${TALENT_DBC_DIR}Talent.dbc`, talents, undefined, talentTable => {
    for (const row of Object.values(talentTable)) {
      row.tab = tabTable[row.tabRef]
      delete row.tabRef; // Unnecessary informormation now
      console.log(row);
    }
  });
});