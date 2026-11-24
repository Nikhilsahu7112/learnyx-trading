import type { DiagramKind } from '../lib/types';

/**
 * Candlestick pattern reference data. Shapes are expressed in a normalised
 * 0–100 price space so they can be rendered consistently without implying any
 * real instrument, price or market context.
 *
 * This is a teaching reference: every pattern entry states what it is, what
 * context it needs, and — importantly — why it fails often.
 */

export interface ShapeCandle {
  o: number;
  h: number;
  l: number;
  c: number;
}

export type PatternBias = 'bullish' | 'bearish' | 'neutral';

export interface CandlePattern {
  id: string;
  name: string;
  hindi: string;
  bias: PatternBias;
  candleCount: number;
  shape: ShapeCandle[];
  summary: string;
  context: string;
  confirmation: string[];
  caveat: string;
  reliability: 'low' | 'medium' | 'high';
  diagram?: DiagramKind;
}

export const candlePatterns: CandlePattern[] = [
  {
    id: 'doji',
    name: 'Doji',
    hindi: 'Doji (khula aur band dono lagbhag same)',
    bias: 'neutral',
    candleCount: 1,
    shape: [{ o: 50, c: 51.5, h: 62, l: 40 }],
    summary:
      'Open aur close lagbhag barabar — session me buyers aur sellers ka balance dikhata hai. Directional signal nahi, indecision ka signal hai.',
    context:
      'Significant level ke paas strong trend ke baad aaye to exhaustion ka hint ho sakta hai. Range ke beech me aaye to generally meaningless hai.',
    confirmation: [
      'Next candle doji ki range ke bahar close kare.',
      'Volume expansion ke saath breakout ho.',
      'Pattern key support/resistance par bane.',
    ],
    caveat:
      'Doji bahut common hai aur akela tradeable signal nahi. Sirf doji dekh kar entry lena noise par reaction hota hai.',
    reliability: 'low',
  },
  {
    id: 'hammer',
    name: 'Hammer',
    hindi: 'Hammer (neeche lambi wick, chhota body)',
    bias: 'bullish',
    candleCount: 1,
    shape: [{ o: 52, c: 61, h: 63, l: 16 }],
    summary:
      'Lower wick body se kam se kam 2× lambi, upper wick chhoti ya na ke barabar. Session me selling push hui par buyers ne price wapas upar utha liya.',
    context:
      'Downtrend ke end me ya established support par meaningful. Uptrend ke top par same shape ko Hanging Man kehte hain.',
    confirmation: [
      'Next candle hammer ke high ke upar close kare.',
      'Hammer ka low support ke roop me hold kare.',
      'Volume previous bars se higher ho.',
    ],
    caveat:
      'Hammer sabse over-marketed pattern hai — support ke bina aur without confirmation, win rate coin-flip ke kareeb hota hai.',
    reliability: 'medium',
  },
  {
    id: 'inverted-hammer',
    name: 'Inverted Hammer',
    hindi: 'Inverted Hammer (upar lambi wick)',
    bias: 'bullish',
    candleCount: 1,
    shape: [{ o: 40, c: 48, h: 84, l: 37 }],
    summary:
      'Upper wick lambi, body chhoti aur lower wick minimal. Downtrend ke baad buyers ne push kiya par sellers ne reject kiya — phir bhi buyers ka attempt dikhta hai.',
    context:
      'Downtrend ke bottom par, support ke saath. Iska bullish dollar-volume confirmation aksar next candle se milta hai.',
    confirmation: [
      'Next candle close pattern candle ke open se upar ho.',
      'Gap up ya strong bullish close observe karein.',
    ],
    caveat:
      'Bina confirmation ye bahut weak hai; top par same shape Shooting Star ban jaata hai aur bearish hota hai.',
    reliability: 'low',
  },
  {
    id: 'shooting-star',
    name: 'Shooting Star',
    hindi: 'Shooting Star (upar lambi wick, top par)',
    bias: 'bearish',
    candleCount: 1,
    shape: [{ o: 48, c: 40, h: 84, l: 38 }],
    summary:
      'Upper wick body se kaafi lambi, chhota body lower half me. Buyers ne price upar dhaka par sellers ne poora rally reject kar diya.',
    context:
      'Uptrend ke top par ya resistance zone par meaningful. Downtrend ke beech me same shape ka koi matlab nahi hota.',
    confirmation: [
      'Next candle shooting star ke low ke neeche close kare.',
      'Rejection wale candle par volume spike ho.',
    ],
    caveat:
      'Strong trend me shooting star ke against short karna "catching a falling knife ka ulta" hota hai — trend continuation zyada common hai.',
    reliability: 'medium',
  },
  {
    id: 'hanging-man',
    name: 'Hanging Man',
    hindi: 'Hanging Man (hammer jaisa shape, top par)',
    bias: 'bearish',
    candleCount: 1,
    shape: [{ o: 63, c: 55, h: 67, l: 16 }],
    summary:
      'Shape hammer jaisa hi hai — chhota body upar, lambi lower wick — par uptrend ke top par aata hai, isliye distribution ka signal maana jaata hai.',
    context:
      'Prolonged uptrend ke baad, resistance ke paas ya clear supply zone par. Trend ke beech me iska edge weak hai.',
    confirmation: ['Next candle lower close kare.', 'Trendline ya support break ho.'],
    caveat:
      'Ek hi shape ko context decide karta hai — hammer vs hanging man me farq sirf prior trend hai. Isliye pure pattern matching dangerous hai.',
    reliability: 'low',
  },
  {
    id: 'bullish-marubozu',
    name: 'Bullish Marubozu',
    hindi: 'Bullish Marubozu (poora body, wick nahi)',
    bias: 'bullish',
    candleCount: 1,
    shape: [{ o: 22, c: 80, h: 82, l: 20 }],
    summary:
      'Open low ke kareeb, close high ke kareeb — poore session buyers ka control. Wicks lagbhag zero.',
    context:
      'Breakout candle ke roop me common. Range ke andar aaye to sirf strong momentum ka proof hai, direction ka nahi.',
    confirmation: ['Breakout level hold kare.', 'Follow-through candle bane.'],
    caveat:
      'Marubozu ke baad entry lena often chase karna hota hai — stop distance bahut bada ho jaata hai, jo R:R kharab karta hai.',
    reliability: 'medium',
  },
  {
    id: 'bearish-marubozu',
    name: 'Bearish Marubozu',
    hindi: 'Bearish Marubozu (poora body neeche)',
    bias: 'bearish',
    candleCount: 1,
    shape: [{ o: 80, c: 22, h: 82, l: 20 }],
    summary: 'Open high ke paas, close low ke paas — poore session sellers ka control.',
    context:
      'Distribution phase ya support breakdown ke waqt. Panic selling ka aakhri candle bhi aisa dikh sakta hai, isliye follow-through dekhein.',
    confirmation: ['Support break hold kare.', 'Follow-through selling aaye.'],
    caveat:
      'Panic selling ke last candle bhi aisa dikh sakta hai — exhaustion ke baad reversal bhi ho sakta hai.',
    reliability: 'medium',
  },
  {
    id: 'spinning-top',
    name: 'Spinning Top',
    hindi: 'Spinning Top (chhota body, dono wick)',
    bias: 'neutral',
    candleCount: 1,
    shape: [{ o: 45, c: 56, h: 72, l: 30 }],
    summary:
      'Chhota body aur dono taraf kaafi lambi wicks — session me dono side ki fight par koi clear winner nahi.',
    context: 'Trend ke beech me consolidation ka hint; top/bottom par indecision.',
    confirmation: ['Agla candle direction decide kare.', 'Range breakout ka wait karein.'],
    caveat: 'Akele me koi edge nahi deta; iske basis par directional bet lena guesswork hai.',
    reliability: 'low',
  },
  {
    id: 'bullish-engulfing',
    name: 'Bullish Engulfing',
    hindi: 'Bullish Engulfing (green candle red ko cover kare)',
    bias: 'bullish',
    candleCount: 2,
    shape: [
      { o: 62, c: 52, h: 65, l: 49 },
      { o: 48, c: 70, h: 73, l: 45 },
    ],
    summary:
      'Pehla candle bearish, doosra bullish aur uska body pehle candle ke body ko poora cover karta hai. Demand ne supply ko absorb kar liya.',
    context: 'Downtrend ke end me support zone par sabse meaningful.',
    confirmation: ['Doosre candle ke high ke upar follow-through.', 'Volume pehle candle se zyada ho.'],
    caveat:
      'Chhoti body wale engulfing patterns aksar noise hote hain — body size relative to recent candles compare karein.',
    reliability: 'medium',
  },
  {
    id: 'bearish-engulfing',
    name: 'Bearish Engulfing',
    hindi: 'Bearish Engulfing (red candle green ko cover kare)',
    bias: 'bearish',
    candleCount: 2,
    shape: [
      { o: 40, c: 50, h: 53, l: 37 },
      { o: 54, c: 32, h: 57, l: 29 },
    ],
    summary:
      'Pehla candle bullish, doosra bearish jo uska body cover karta hai. Supply ne demand ko overwhelm kiya.',
    context: 'Uptrend ke top par resistance ke paas.',
    confirmation: ['Neeche follow-through close.', 'Volume expansion.'],
    caveat: 'Strong uptrend me ek bearish engulfing pullback bhi ho sakta hai, reversal zaroori nahi.',
    reliability: 'medium',
  },
  {
    id: 'piercing-line',
    name: 'Piercing Line',
    hindi: 'Piercing Line (bearish candle ke baad 50%+ recovery)',
    bias: 'bullish',
    candleCount: 2,
    shape: [
      { o: 78, c: 40, h: 80, l: 38 },
      { o: 35, c: 62, h: 66, l: 33 },
    ],
    summary:
      'Badi bearish candle ke baad bullish candle uske low se neeche open hokar uske body ke 50% se upar close karti hai.',
    context:
      'Prolonged downtrend ke end me, jab price established support zone par ho. Range ke beech me ye simply ek bounce hai.',
    confirmation: ['Body ka 50%+ close hona chahiye.', 'Follow-through bullish candle.'],
    caveat: 'Agar recovery 50% se kam hai to ye weak signal hai — threshold ka meaning hai.',
    reliability: 'medium',
  },
  {
    id: 'dark-cloud-cover',
    name: 'Dark Cloud Cover',
    hindi: 'Dark Cloud Cover (bullish candle ke baad 50%+ decline)',
    bias: 'bearish',
    candleCount: 2,
    shape: [
      { o: 30, c: 70, h: 72, l: 28 },
      { o: 74, c: 48, h: 76, l: 45 },
    ],
    summary:
      'Badi bullish candle ke baad bearish candle uske high se upar open hokar uske body ke 50% se neeche close karti hai.',
    context:
      'Uptrend ke top par, resistance zone ke paas — jahan sellers pehle bhi active the. Trend ke beech me weak signal hai.',
    confirmation: ['50% se neeche close.', 'Volume spike.'],
    caveat: 'Gap ke bina ye simply inside-bar reversal jaisa ho sakta hai; context ke bina weak.',
    reliability: 'medium',
  },
  {
    id: 'morning-star',
    name: 'Morning Star',
    hindi: 'Morning Star (teen candle ka bullish reversal)',
    bias: 'bullish',
    candleCount: 3,
    shape: [
      { o: 80, c: 50, h: 82, l: 48 },
      { o: 46, c: 44, h: 48, l: 40 },
      { o: 48, c: 72, h: 74, l: 46 },
    ],
    summary:
      'Badi bearish candle, chhoti indecision candle (aksara gap ke saath), phir badi bullish candle jo pehli candle ke body ke andar close kare.',
    context:
      'Prolonged downtrend ke end me, jab selling momentum visibly kam ho raha ho. Sideways market me ye pattern kaafi common aur less meaningful hota hai.',
    confirmation: ['Teesra candle pehli candle ke midpoint se upar close kare.', 'Volume teesre candle par badhe.'],
    caveat:
      'Teen-candle patterns me patience chahiye — third candle ke close par entry late ho sakti hai, par confirmation ke bina entry premature hoti hai.',
    reliability: 'high',
  },
  {
    id: 'evening-star',
    name: 'Evening Star',
    hindi: 'Evening Star (teen candle ka bearish reversal)',
    bias: 'bearish',
    candleCount: 3,
    shape: [
      { o: 30, c: 60, h: 62, l: 28 },
      { o: 64, c: 66, h: 70, l: 62 },
      { o: 62, c: 38, h: 64, l: 36 },
    ],
    summary:
      'Badi bullish candle, chhoti star candle, phir badi bearish candle jo pehli candle ke body ke andar close kare.',
    context:
      'Extended uptrend ke top par, resistance ke paas. Early trend me ye sirf ek pause ho sakta hai, reversal nahi.',
    confirmation: ['Teesra candle pehli candle ke midpoint se neeche close.', 'Volume confirmation.'],
    caveat: 'Exhaustion par bhi similar shape banti hai — trend strength aur higher timeframe context zaroori hai.',
    reliability: 'high',
  },
];

export const patternBiasLabel: Record<PatternBias, string> = {
  bullish: 'Bullish bias',
  bearish: 'Bearish bias',
  neutral: 'Neutral / indecision',
};

export const patternReliabilityNote: Record<CandlePattern['reliability'], string> = {
  low: 'Akele par bharosa na karein — confirmation mandatory hai.',
  medium: 'Context aur confirmation ke saath useful; akele me nahi.',
  high: 'Best of this set, par phir bhi probabilistic — 100% nahi.',
};

export const PATTERN_DATA_NOTE =
  'Ye shapes teaching illustrations hain. Ye kisi real instrument ke chart se nahi liye gaye aur kisi bhi outcome ki guarantee nahi dete.';
