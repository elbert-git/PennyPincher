export const Colors = {
  beekeeper:'#f6e58d',
  turbo:'#FFF175',
  spicedNectarine:'#FFBE76',
  quinceJelly:'#f0932b',
  pinkGlamour:'#ff7979',
  carminePink:'#FF9998',
  juneBud:'#badc58',
  pureApple:'#ABFF78',
  coastalBreeze:'#dff9fb',
  hintOfIcepack:'#c7ecee',
  middleBlue:'#B6F8FF',
  greenlandGreen:'#22a6b3',
  helioTrope:'#FFA8F1',
  steelPink:'#D3A8FF',
  exodusFruit:'#9AAAFF',
  blurApple:'#4834d4',
  deepKoamaru:'#30336b',
  deepCove:'#130f40',
  soaringEagle:'#95afc0',
  wizardGrey:'#535c68'
}

export interface Category{
  key:string
  color:string
}

export const categories:{[index:string]:Category} = {
  Food:{key:'Food', color:Colors.spicedNectarine},
  Transportation:{key:'Transportation', color:Colors.exodusFruit},
  Utilities:{key:'Utilities', color:Colors.beekeeper},
  Shelter:{key:'Shelter', color:Colors.middleBlue},
  Recreation:{key:'Recreation', color:Colors.turbo},
  Personal:{key:'Personal', color:Colors.helioTrope},
  Groceries:{key:'Groceries', color:Colors.carminePink},
  Medical:{key:'Medical', color:Colors.steelPink},
  Generosity:{key:'Generosity', color:Colors.pureApple}
}