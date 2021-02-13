const fs = require('fs');
const StateBuf = require('./state_buff');
const debug = false;


exports.langHash = buf => {
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
  return langHash;
}

exports.convertLangHash = (langHash, strings, lang) => {
  lang = lang || 'enUS';
  const idx = langHash[lang] - 1;
  return idx < 0 ? "" : strings[idx];
}

/*
uint ID
uint SchoolMask
uint Category
int castUI
uint Dispel
uint Mechanic
uint Attributes
uint AttributesEx
uint AttributesEx2
uint AttributesEx3
uint AttributesEx4
uint ShapeshiftMask
uint ShapeshiftExclude
uint Targets
uint TargetCreatureType
uint RequiresSpellFocus
uint CasterAuraState
uint TargetAuraState
uint CastingTimeIndex
uint RecoveryTime
uint CategoryRecoveryTime
uint InterruptFlags
uint AuraInterruptFlags
uint ChannelInterruptFlags
uint ProcFlags
uint ProcChance
uint ProcCharges
uint MaximumLevel
uint BaseLevel
uint SpellLevel
uint DurationIndex
uint PowerType
uint ManaCost
uint ManaCostPerLevel
uint ManaPerSecond
uint ManaPerSecondPerLevel
uint RangeIndex
uint Speed
uint ModalNextSpell
uint StackAmount
uint Totem1
uint Totem2
int Reagent1
int Reagent2
int Reagent3
int Reagent4
int Reagent5
int Reagent6
int Reagent7
int Reagent8
uint ReagentCount1
uint ReagentCount2
uint ReagentCount3
uint ReagentCount4
uint ReagentCount5
uint ReagentCount6
uint ReagentCount7
uint ReagentCount8
int EquippedItemClass
int EquippedItemSubClassMask
int EquippedItemInventoryTypeMask
uint Effect1
uint Effect2
uint Effect3
int EffectDieSides1
int EffectDieSides2
int EffectDieSides3
int EffectBaseDice1
int EffectBaseDice2
int EffectBaseDice3
int EffectDicePerLevel1
int EffectDicePerLevel2
int EffectDicePerLevel3
float EffectRealPointsPerLevel1
float EffectRealPointsPerLevel2
float EffectRealPointsPerLevel3
int EffectBasePoints1
int EffectBasePoints2
int EffectBasePoints3
uint EffectMechanic1
uint EffectMechanic2
uint EffectMechanic3
uint EffectImplicitTargetA1
uint EffectImplicitTargetA2
uint EffectImplicitTargetA3
uint EffectImplicitTargetB1
uint EffectImplicitTargetB2
uint EffectImplicitTargetB3
uint EffectRadiusIndex1
uint EffectRadiusIndex2
uint EffectRadiusIndex3
uint EffectApplyAuraName1
uint EffectApplyAuraName2
uint EffectApplyAuraName3
uint EffectAmplitude1
uint EffectAmplitude2
uint EffectAmplitude3
float EffectMultipleValue1
float EffectMultipleValue2
float EffectMultipleValue3
uint EffectChainTarget1
uint EffectChainTarget2
uint EffectChainTarget3
uint EffectItemType1
uint EffectItemType2
uint EffectItemType3
int EffectMiscValue1
int EffectMiscValue2
int EffectMiscValue3
uint EffectTriggerSpell1
uint EffectTriggerSpell2
uint EffectTriggerSpell3
float EffectPointsPerComboPoint1
float EffectPointsPerComboPoint2
float EffectPointsPerComboPoint3
uint SpellVisual1
uint SpellVisual2
uint SpellIconID
uint ActiveIconID
uint SpellPriority
uint SpellName0 string
uint SpellName1 string
uint SpellName2 string
uint SpellName3 string
uint SpellName4 string
uint SpellName5 string
uint SpellName6 string
uint SpellName7 string
uint SpellNameFlag0
uint SpellRank0 string
uint SpellRank1 string
uint SpellRank2 string
uint SpellRank3 string
uint SpellRank4 string
uint SpellRank5 string
uint SpellRank6 string
uint SpellRank7 string
uint SpellRankFlags0
uint SpellDescription0 string
uint SpellDescription1 string
uint SpellDescription2 string
uint SpellDescription3 string
uint SpellDescription4 string
uint SpellDescription5 string
uint SpellDescription6 string
uint SpellDescription7 string
uint SpellDescriptionFlags0
uint SpellToolTip0 string
uint SpellToolTip1 string
uint SpellToolTip2 string
uint SpellToolTip3 string
uint SpellToolTip4 string
uint SpellToolTip5 string
uint SpellToolTip6 string
uint SpellToolTip7 string
uint SpellToolTipFlags0
uint ManaCostPercentage
uint StartRecoveryCategory
uint StartRecoveryTime
uint MaximumTargetLevel
uint SpellFamilyName
uint SpellFamilyFlags1
uint SpellFamilyFlags2
uint MaximumAffectedTargets
uint DamageClass
uint PreventionType
uint StanceBarOrder
float EffectDamageMultiplier1
float EffectDamageMultiplier2
float EffectDamageMultiplier3
uint MinimumFactionId
uint MinimumReputation
uint RequiredAuraVision
*/
exports.spells = buf => {
  const row = {};
  row.id  = buf.readUInt32LE();
  row.schoolMask = buf.readUInt32LE();
  row.category = buf.readUInt32LE();
  row.castUI = buf.readInt32LE();
  row.dispel = buf.readUInt32LE();
  row.mechanic = buf.readUInt32LE();
  row.attributes = buf.readUInt32LE();
  row.attributesEx = buf.readUInt32LE();
  row.attributesEx2 = buf.readUInt32LE();
  row.attributesEx3 = buf.readUInt32LE();
  row.attributesEx4 = buf.readUInt32LE();
  row.shapeshiftMask = buf.readUInt32LE();
  row.shapeshiftExclude = buf.readUInt32LE();
  row.targets = buf.readUInt32LE();
  row.targetCreatureType = buf.readUInt32LE();
  row.requiresSpellFocus = buf.readUInt32LE();
  row.casterAuraState = buf.readUInt32LE();
  row.targetAuraState = buf.readUInt32LE();
  row.castingTimeIndex = buf.readUInt32LE();
  row.recoveryTime = buf.readUInt32LE();
  row.categoryRecoveryTime = buf.readUInt32LE();
  row.interruptFlags = buf.readUInt32LE();
  row.auraInterruptFlags = buf.readUInt32LE();
  row.channelInterruptFlags = buf.readUInt32LE();
  row.procFlags = buf.readUInt32LE();
  row.procChance = buf.readUInt32LE();
  row.procCharges = buf.readUInt32LE();
  row.maximumLevel = buf.readUInt32LE();
  row.baseLevel = buf.readUInt32LE();
  row.spellLevel = buf.readUInt32LE();
  row.durationIndex = buf.readUInt32LE();
  row.powerType = buf.readUInt32LE();
  row.manaCost = buf.readUInt32LE();
  row.manaCostPerLevel = buf.readUInt32LE();
  row.manaPerSecond = buf.readUInt32LE();
  row.manaPerSecondPerLevel = buf.readUInt32LE();
  row.rangeIndex = buf.readUInt32LE();
  row.speed = buf.readUInt32LE();
  row.modalNextSpell = buf.readUInt32LE();
  row.stackAmount = buf.readUInt32LE();
  row.totem1 = buf.readUInt32LE();
  row.totem2 = buf.readUInt32LE();
  row.reagent1 = buf.readInt32LE();
  row.reagent2 = buf.readInt32LE();
  row.reagent3 = buf.readInt32LE();
  row.reagent4 = buf.readInt32LE();
  row.reagent5 = buf.readInt32LE();
  row.reagent6 = buf.readInt32LE();
  row.reagent7 = buf.readInt32LE();
  row.reagent8 = buf.readInt32LE();
  row.reagentCount1 = buf.readUInt32LE();
  row.reagentCount2 = buf.readUInt32LE();
  row.reagentCount3 = buf.readUInt32LE();
  row.reagentCount4 = buf.readUInt32LE();
  row.reagentCount5 = buf.readUInt32LE();
  row.reagentCount6 = buf.readUInt32LE();
  row.reagentCount7 = buf.readUInt32LE();
  row.reagentCount8 = buf.readUInt32LE();
  row.equippedItemClass = buf.readUInt32LE();
  row.equippedItemSubClassMask = buf.readUInt32LE();
  row.equippedItemInventoryTypeMask = buf.readUInt32LE();
  row.effect1 = buf.readUInt32LE();
  row.effect2 = buf.readUInt32LE();
  row.effect3 = buf.readUInt32LE();
  row.effectDieSides1 = buf.readUInt32LE();
  row.effectDieSides2 = buf.readUInt32LE();
  row.effectDieSides3 = buf.readUInt32LE();
  row.effectBaseDice1 = buf.readUInt32LE();
  row.effectBaseDice2 = buf.readUInt32LE();
  row.effectBaseDice3 = buf.readUInt32LE();
  row.effectDicePerLevel1 = buf.readUInt32LE();
  row.effectDicePerLevel2 = buf.readUInt32LE();
  row.effectDicePerLevel3 = buf.readUInt32LE();
  row.effectRealPointsPerLevel1 = buf.readFloatLE();
  row.effectRealPointsPerLevel2 = buf.readFloatLE();
  row.effectRealPointsPerLevel3 = buf.readFloatLE();
  row.effectBasePoints1 = buf.readUInt32LE();
  row.effectBasePoints2 = buf.readUInt32LE();
  row.effectBasePoints3 = buf.readUInt32LE();
  row.effectMechanic1 = buf.readUInt32LE();
  row.effectMechanic2 = buf.readUInt32LE();
  row.effectMechanic3 = buf.readUInt32LE();
  row.effectImplicitTargetA1 = buf.readUInt32LE();
  row.effectImplicitTargetA2 = buf.readUInt32LE();
  row.effectImplicitTargetA3 = buf.readUInt32LE();
  row.effectImplicitTargetB1 = buf.readUInt32LE();
  row.effectImplicitTargetB2 = buf.readUInt32LE();
  row.effectImplicitTargetB3 = buf.readUInt32LE();
  row.effectRadiusIndex1 = buf.readUInt32LE();
  row.effectRadiusIndex2 = buf.readUInt32LE();
  row.effectRadiusIndex3 = buf.readUInt32LE();
  row.effectApplyAuraName1 = buf.readUInt32LE();
  row.effectApplyAuraName2 = buf.readUInt32LE();
  row.effectApplyAuraName3 = buf.readUInt32LE();
  row.effectAmplitude1 = buf.readUInt32LE();
  row.effectAmplitude2 = buf.readUInt32LE();
  row.effectAmplitude3 = buf.readUInt32LE();
  row.effectMultipleValue1 = buf.readFloatLE();
  row.effectMultipleValue2 = buf.readFloatLE();
  row.effectMultipleValue3 = buf.readFloatLE();
  row.effectChainTarget1 = buf.readUInt32LE();
  row.effectChainTarget2 = buf.readUInt32LE();
  row.effectChainTarget3 = buf.readUInt32LE();
  row.effectItemType1 = buf.readUInt32LE();
  row.effectItemType2 = buf.readUInt32LE();
  row.effectItemType3 = buf.readUInt32LE();
  row.effectMiscValue1 = buf.readUInt32LE();
  row.effectMiscValue2 = buf.readUInt32LE();
  row.effectMiscValue3 = buf.readUInt32LE();
  row.effectTriggerSpell1 = buf.readUInt32LE();
  row.effectTriggerSpell2 = buf.readUInt32LE();
  row.effectTriggerSpell3 = buf.readUInt32LE();
  row.effectPointsPerComboPoint1 = buf.readFloatLE();
  row.effectPointsPerComboPoint2 = buf.readFloatLE();
  row.effectPointsPerComboPoint3 = buf.readFloatLE();
  row.spellVisual1 = buf.readUInt32LE();
  row.spellVisual2 = buf.readUInt32LE();
  row.spellIconID = buf.readUInt32LE();
  row.activeIconID = buf.readUInt32LE();
  row.spellPriority = buf.readUInt32LE();
  row.spellName = exports.langHash(buf);
  row.spellRank = exports.langHash(buf);
  row.spellDescription = exports.langHash(buf);
  row.spellToolTip = exports.langHash(buf);
  row.manaCostPercentage = buf.readUInt32LE();
  row.startRecoveryCategory = buf.readUInt32LE();
  row.startRecoveryTime = buf.readUInt32LE();
  row.maximumTargetLevel = buf.readUInt32LE();
  row.spellClassSet = buf.readUInt32LE();
  row.spellClassMask1 = buf.readUInt32LE();
  row.spellClassMask2 = buf.readUInt32LE();
  row.maximumAffectedTargets = buf.readUInt32LE();
  row.damageClass = buf.readUInt32LE();
  row.preventionType = buf.readUInt32LE();
  row.stanceBarOrder = buf.readUInt32LE();
  row.effectDamageMultiplier1 = buf.readFloatLE();
  row.effectDamageMultiplier2 = buf.readFloatLE();
  row.effectDamageMultiplier3 = buf.readFloatLE();
  row.minimumFactionId = buf.readUInt32LE();
  row.minimumReputation = buf.readUInt32LE();
  row.requiredAuraVision = buf.readUInt32LE();
  return { key: row.id, value: row };
};

exports.spellStrings = (table, strings, _) => {
  for (const row of Object.values(table)) {
    row.spellName = exports.convertLangHash(row.spellName, strings);
    row.spellRank = exports.convertLangHash(row.spellRank, strings);
    row.spellDescription = exports.convertLangHash(row.spellDescription, strings);
    row.spellToolTip = exports.convertLangHash(row.spellToolTip, strings);
  }
};

/*
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
*/
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

/*
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
exports.talentTab = buf => {
  const row = {};
  row.id = buf.readUInt32LE();
  row.lang = exports.langHash(buf);
  row.spellIcon = buf.readUInt32LE();
  row.race = buf.readUInt32LE();
  row.class = buf.readUInt32LE();
  row.order = buf.readUInt32LE();
  row.background = buf.readUInt32LE();
  return { key: row.id, value: row };
};

exports.talentTabStrings = (table, strings, _) => {
  for (const row of Object.values(table)) {
    row.name = exports.convertLangHash(row.lang, strings);
    delete row.lang; // Unnecessary information now
  }
};

/*
  struct dbc_header
  {
    uint32_t magic; // always 'WDBC'
    uint32_t record_count; // records per file
    uint32_t field_count; // fields per record
    uint32_t record_size; // sum (sizeof (field_type_i)) | 0 <= i < field_count. field_type_i is NOT defined in the files.
    uint32_t string_block_size;
  };
*/
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
    const actual = Object.keys(table).length;
    if(actual != recordCount) throw new Error(`Record Count is not accurate: ${recordCount} vs ${actual}`) ;
    if(readStrings){
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
      readStrings(table, strings, buf)
    } else {
      buf.skip(stringSize);
    }

    if(endCallback) endCallback(table, buf);
  });
  readStream.on('error', err => console.log(err));
};
