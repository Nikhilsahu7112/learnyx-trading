import type { LessonBodyRegistry } from './builder';
import { callout, diagram, example, formula, h, list, olist, p, table, terms } from './builder';

export const level3: LessonBodyRegistry = {
  /* ================================================================ */
  /* MODULE 1 — Technical Indicators                                  */
  /* ================================================================ */
  'technical-and-fundamental/technical-indicators/moving-averages': {
    objectives: [
      'SMA aur EMA ka formula aur calculation.',
      'Moving average ka trend filter aur dynamic support role.',
      'MA crossover ke limitations.',
    ],
    intro:
      'Moving average sabse simple aur sabse zyada use hone wala indicator hai. Ye price ka smoothed version hai — noise hata kar direction dikhata hai. Simple hone ki wajah se ye "kamzor" nahi hai; iska misuse zyada hota hai.',
    blocks: [
      h('SMA (Simple Moving Average)'),
      formula(
        'SMA formula',
        'SMA(n) = (Close₁ + Close₂ + ... + Closeₙ) ÷ n',
        '20-day SMA = last 20 closes ka average. Har naye din purana close nikalta hai aur naya add hota hai.',
      ),
      example(
        'SMA calculation',
        'Closes: 100, 102, 104, 106, 108 (5 din). SMA(5) = (100 + 102 + 104 + 106 + 108) ÷ 5 = 104. Agle din close 110 aaya. Naya SMA(5) = (102 + 104 + 106 + 108 + 110) ÷ 5 = 106. Purana 100 nikal gaya — isliye SMA "rolling" hai.',
        [
          'Sabse purana close drop karein.',
          'Naya close add karein.',
          'Sum ÷ n.',
        ],
      ),
      h('EMA (Exponential Moving Average)'),
      formula(
        'EMA formula',
        'Multiplier k = 2 ÷ (n + 1)\nEMA_today = (Close_today × k) + (EMA_yesterday × (1 − k))',
        'EMA(20) ke liye k = 2/21 ≈ 0.0952. Recent close ko 9.5% weight, purane EMA ko 90.5% weight milta hai.',
      ),
      p(
        'EMA recent prices ko zyada weight deta hai, isliye wo price ke changes par jaldi react karta hai. SMA smooth hota hai par slow. Trade-off: **responsiveness vs noise**',
      ),
      table(
        ['', 'SMA', 'EMA'],
        [
          ['Reaction speed', 'Slow', 'Fast'],
          ['Noise', 'Kam', 'Zyada'],
          ['Whipsaw risk', 'Kam', 'Zyada'],
          ['Late signals', 'Zyada', 'Kam'],
          ['Common use', 'Trend filter (200 DMA)', 'Short-term entries'],
        ],
      ),
      h('Common periods'),
      table(
        ['Period', 'Type', 'Meaning'],
        [
          ['9 / 20 EMA', 'Short-term', 'Intraday trend, momentum'],
          ['50 DMA/EMA', 'Medium-term', 'Swing trend, dynamic support'],
          ['100', 'Medium-long', 'Institutional reference'],
          ['200 DMA', 'Long-term', 'Major trend filter, bull/bear line'],
        ],
      ),
      h('Interpretation'),
      list([
        '**Price above rising MA** = bullish bias.',
        '**Price below falling MA** = bearish bias.',
        '**MA flat** = range/consolidation.',
        '**Golden cross** (50 above 200) = bullish signal, par lagging.',
        '**Death cross** (50 below 200) = bearish signal, par lagging.',
        '**Price hugging MA** = strong trend; **price oscillating around MA** = no trend.',
      ]),
      callout(
        'warn',
        'MA crossover ka honest reality',
        'Golden/death cross **lagging** signals hain — jo trend pehle hi shuru ho chuka hai uski confirmation. Sideways markets me ye repeatedly false signals dete hain (whipsaw). Backtest me ye dekhna zaroori hai ki cross signals ka edge kitna hai aur kitna drawdown deta hai.',
      ),
      h('MA ke limitations'),
      list([
        'Sab MA lagging hain — past data ka average.',
        'Range-bound markets me repeated whipsaws.',
        'Period choice arbitrary hai — different periods different results.',
        'Strong trends me price MA se door reh sakti hai (overbought/oversold ke bina).',
        'MA koi support/resistance "force" nahi create karta — log dekh kar trade karte hain, isliye self-fulfilling partly.',
      ]),
      callout(
        'info',
        'Indicator Laboratory',
        'Learnyx Trading Lab ke Indicator Laboratory me SMA/EMA period badal kar dekhein — same data, different periods, different signals. Ye exercise aapko parameter sensitivity ka real sense dega, jo overfitting se bachne ke liye zaroori hai.',
      ),
    ],
    summary: [
      'SMA simple average hai; EMA recent prices ko zyada weight deta hai.',
      'EMA fast par noisy; SMA slow par smooth.',
      '200 DMA long-term trend filter ka standard hai.',
      'Golden/death cross lagging signals hain aur sideways markets me fail hote hain.',
      'MA period choice subjective hai — sensitivity test karein.',
    ],
    mistakes: [
      'MA cross ko prediction samajhna.',
      'Range me MA cross par trade karna.',
      'Ek hi period par optimise karke overfit karna.',
    ],
    keyPoints: [
      'MA = smoothed price, lagging by design.',
      'EMA responsiveness, SMA stability.',
      'Always test parameter sensitivity.',
    ],
    quiz: [
      {
        q: 'EMA(20) ka multiplier k kitna hai?',
        options: ['0.05', '0.0952', '0.20', '0.50'],
        answer: 1,
        explain: 'k = 2 ÷ (20 + 1) = 0.0952. Recent close ko yahi weight milta hai.',
      },
      {
        q: 'Golden cross kya hai?',
        options: [
          '50 MA 200 MA ke upar cross kare',
          'Price 0 par aaye',
          'RSI 70 cross kare',
          'Volume double ho',
        ],
        answer: 0,
        explain: 'Golden cross = short-term MA (50) long-term MA (200) ke upar — bullish but lagging.',
      },
      {
        q: 'Sideways market me MA cross ka main problem kya hai?',
        options: [
          'Signals nahi milte',
          'Repeated whipsaws se whipsaw losses',
          'Volume zero',
          'Chart freeze',
        ],
        answer: 1,
        explain: 'Range me price MA ke around oscillate karti hai — crosses false signals dete hain.',
      },
    ],
    exercise:
      'Indicator Laboratory me ek hi data par SMA(20), SMA(50) aur EMA(20) plot karein. Note karein: kis point par EMA ne SMA se pehle signal diya, aur kya wo signal zyada accurate tha? 3 observations likhein.',
  },

  'technical-and-fundamental/technical-indicators/rsi-and-stochastic': {
    objectives: [
      'RSI ka formula aur calculation.',
      'Overbought/oversold ka correct interpretation.',
      'Stochastic oscillator aur uska difference.',
    ],
    intro:
      'RSI aur Stochastic momentum oscillators hain — ye price ki speed aur magnitude batate hain, direction nahi. Sabse zyada misuse inhi indicators ka hota hai (jaise "RSI 70 = sell"). Is lesson me hum sahi interpretation sikhayenge.',
    blocks: [
      h('RSI basics'),
      formula(
        'RSI formula',
        'RS = Average Gain ÷ Average Loss (n periods)\nRSI = 100 − [100 ÷ (1 + RS)]',
        '14 periods ke average gain aur average loss nikaalein. RSI 0 se 100 ke beech hota hai.',
      ),
      example(
        'RSI calculation (simplified)',
        '14 periods me average gain = 1.5, average loss = 0.5. RS = 1.5 ÷ 0.5 = 3. RSI = 100 − [100 ÷ (1 + 3)] = 100 − 25 = 75. Matlab recent gains losses se 3 guna zyada the.',
        [
          'Average gain nikaalein.',
          'Average loss nikaalein.',
          'RS = gain ÷ loss.',
          'RSI = 100 − 100 ÷ (1 + RS).',
        ],
      ),
      h('Overbought/oversold ka correct matlab'),
      table(
        ['Level', 'Common label', 'Correct interpretation'],
        [
          ['RSI > 70', 'Overbought', 'Recent gains strong — momentum strong bhi ho sakta hai'],
          ['RSI < 30', 'Oversold', 'Recent losses strong — downtrend continue bhi ho sakta hai'],
          ['40–60', 'Neutral', 'No strong momentum'],
          ['50 cross', 'Bias shift', 'Bullish/bearish momentum ka simple filter'],
        ],
      ),
      callout(
        'warn',
        'RSI 70 ≠ sell signal',
        'Strong bull markets me RSI weeks tak 70+ reh sakta hai. "Overbought" ka matlab "mehanga" nahi hai — iska matlab hai momentum strong hai. Shorting an uptrend because RSI > 70 historically ek losing approach raha hai. Overbought/oversold ko **trend context** me padhein.',
      ),
      h('RSI ke valid uses'),
      list([
        '**Divergence:** price naya high banaye par RSI lower high — momentum weakening ka signal (confirm nahi).',
        '**Centerline (50) filter:** RSI 50+ = bullish bias.',
        '**Failure swings:** RSI overbought se pullback karke phir naya high fail kare.',
        '**Range identification:** RSI 40–60 band usually consolidation.',
      ]),
      diagram(
        'trend',
        'Bullish divergence',
        'Price lower low, RSI higher low — momentum weakening selloff me.',
        'Two aligned panels. The top panel shows price making a lower low. The bottom panel shows the RSI making a higher low over the same period, with a dashed line connecting the two RSI troughs. The divergence is annotated as "potential weakening of downside momentum".',
      ),
      h('Stochastic Oscillator'),
      formula(
        'Stochastic %K',
        '%K = (Close − Lowest Low over n) ÷ (Highest High over n − Lowest Low over n) × 100',
        'Usually n = 14. %D = %K ka 3-period moving average. Range 0–100.',
      ),
      p(
        'Stochastic current price ko recent range ke **relative** measure karta hai. RSI gains/losses par based hai; Stochastic close ki range me position par. Isliye Stochastic range-bound markets me zyada responsive hota hai.',
      ),
      table(
        ['', 'RSI', 'Stochastic'],
        [
          ['Based on', 'Average gains vs losses', 'Close vs recent high-low range'],
          ['Range', '0–100', '0–100'],
          ['Best in', 'Trending markets', 'Range-bound markets'],
          ['Sensitivity', 'Medium', 'Higher'],
          ['Signal speed', 'Stable', 'Fast (noisy)'],
        ],
      ),
      callout(
        'info',
        'Divergence ke limitations',
        'Divergence momentum ke weakening ka **evidence** hai, reversal ka guarantee nahi. Strong trends me divergence multiple baar dikhata hai aur price continue karta hai. Use confirmations (structure break, volume) ke saath hi trade karein.',
      ),
    ],
    summary: [
      'RSI average gain/loss se calculate hota hai, 0–100 ke beech.',
      'RSI 70+ "overbought" momentum ko denote karta hai, sastapan nahi.',
      'Divergence momentum weakening ka evidence hai, reversal guarantee nahi.',
      'Stochastic close ki recent range me position measure karta hai.',
      'Range markets me Stochastic, trend me RSI better work karta hai.',
    ],
    mistakes: [
      'RSI 70 ko automatic sell signal samajhna.',
      'Divergence par bina confirmation trade karna.',
      'Indicator ko price ke against use karna (indicator lagging hai).',
    ],
    keyPoints: [
      'Oscillators describe momentum, not value.',
      'Divergence = evidence, not trigger.',
      'RSI 50 centerline ek under-rated filter hai.',
    ],
    quiz: [
      {
        q: 'RSI 80 ka matlab kya hai?',
        options: [
          'Stock mehanga hai',
          'Recent gains strong hain — momentum bullish (trend context dekhein)',
          'Guaranteed reversal',
          'Volume low hai',
        ],
        answer: 1,
        explain: 'RSI momentum measure karta hai, valuation nahi. 80 matlab strong recent gains — uptrend me ye sustain ho sakta hai.',
      },
      {
        q: 'Stochastic %K kis par based hai?',
        options: [
          'Average gains vs losses',
          'Close ki recent high-low range me position',
          'Volume average',
          'Moving average slope',
        ],
        answer: 1,
        explain: '%K = (Close − Low_n) ÷ (High_n − Low_n) × 100.',
      },
      {
        q: 'Bullish divergence kya dikhata hai?',
        options: [
          'Price lower low, RSI higher low',
          'Price higher high, RSI higher high',
          'RSI flat',
          'Volume zero',
        ],
        answer: 0,
        explain: 'Price naya low banata hai par RSI ne higher low banaya — downside momentum weaken ho raha hai.',
      },
    ],
    exercise:
      'Indicator Laboratory me RSI 14 aur Stochastic 14 dono plot karein. Pichhle 100 candles me 3 divergences dhoondein. Har ek ke baad price ka behaviour note karein — kya reversal hua?',
  },

  'technical-and-fundamental/technical-indicators/macd-and-bollinger-bands': {
    objectives: [
      'MACD ke components aur histogram.',
      'Bollinger Bands ka volatility logic.',
      'Squeeze aur expansion ka concept.',
    ],
    intro:
      'MACD trend-following momentum indicator hai; Bollinger Bands volatility ke bands hain. Dono classic hain aur dono ka sahi use context ke saath aata hai.',
    blocks: [
      h('MACD structure'),
      formula(
        'MACD',
        'MACD line = EMA(12) − EMA(26)\nSignal line = EMA(9) of MACD line\nHistogram = MACD line − Signal line',
        'Standard settings 12/26/9. MACD line positive = short EMA long EMA ke upar (bullish momentum).',
      ),
      table(
        ['Component', 'Meaning', 'Interpretation'],
        [
          ['MACD line', 'Fast vs slow EMA difference', 'Above zero = bullish momentum'],
          ['Signal line', 'MACD ka 9-EMA', 'Crosses signal ke liye'],
          ['Histogram', 'MACD − Signal', 'Momentum acceleration/deceleration'],
        ],
      ),
      h('MACD signals'),
      list([
        '**Bullish cross:** MACD signal line ke upar cross kare — lagging momentum signal.',
        '**Bearish cross:** MACD signal ke neeche cross kare.',
        '**Zero line cross:** MACD positive/negative — broader bias shift.',
        '**Histogram:** badhta histogram = momentum accelerating; sukadta = decelerating.',
        '**Divergence:** price vs MACD divergence — momentum weakening.',
      ]),
      callout(
        'warn',
        'MACD ke classic problems',
        '1) MACD **lagging** hai — cross tab hota hai jab move already ho chuka. 2) Range markets me repeatedly false crosses. 3) Zero-line "overbought/oversold" nahi batata. 4) Standard 12/26/9 settings historical hain, magical nahi. MACD ko filter ki tarah use karein, trigger ki tarah nahi.',
      ),
      h('Bollinger Bands'),
      formula(
        'Bollinger Bands',
        'Middle band = SMA(20)\nUpper band = SMA(20) + 2σ\nLower band = SMA(20) − 2σ',
        'σ = 20-period standard deviation. Bands volatility ke hisaab se expand aur contract hote hain.',
      ),
      p(
        'Bollinger Bands ka core idea: price usually middle band ke around rehti hai, aur bands volatility ke hisaab se adjust hote hain. **Bands strength/weakness nahi batate — volatility batate hain.**',
      ),
      diagram(
        'trend',
        'Bollinger squeeze',
        'Bands contract hote hain low volatility me, expand hote hain high volatility me.',
        'A price chart with three overlaid lines: a middle moving average and two bands above and below it. In one region the bands narrow tightly around the average, labelled "squeeze / low volatility". Later the price breaks out and the bands widen sharply, labelled "expansion / high volatility".',
      ),
      h('Bollinger Bands ka correct interpretation'),
      table(
        ['Observation', 'Meaning', 'Wrong interpretation'],
        [
          ['Price at upper band', 'Strong trend (walking the band)', 'Guaranteed reversal'],
          ['Price at lower band', 'Weak trend', 'Guaranteed bounce'],
          ['Bands squeeze', 'Low volatility, expansion likely', 'Direction guaranteed'],
          ['Bands wide', 'High volatility', 'Trend will continue'],
          ['Price outside band', 'Extreme move', 'Mean reversion guaranteed'],
        ],
      ),
      h('Squeeze aur expansion'),
      p(
        'Low volatility ke baad high volatility aa sakta hai — ye volatility clustering ka documented phenomenon hai. Par **direction** squeeze se nahi pata chalti. Squeeze breakout ka setup deta hai, direction nahi. Isliye breakout direction ke confirmation ka wait karein.',
      ),
      callout(
        'info',
        'Mean reversion vs trend following',
        'Bollinger Bands do contradictory ways se use hote hain: (a) mean reversion — bands ke outer edge par counter-trend trade, (b) breakout — squeeze ke baad trend direction trade. Dono valid hain par different market conditions me. Range market me mean reversion, trending market me breakout. Ye distinction samajhna zaroori hai — warna aap galat regime me galat strategy chala rahe honge.',
      ),
      example(
        'MACD + Bollinger combo',
        'Ek stock 2 mahine se range me hai (bands narrow). MACD zero ke paas flat hai. Achanak price upper band ke upar close karta hai, MACD zero ke upar cross karta hai, aur bands expand hone lagte hain. Ye "squeeze breakout with momentum confirmation" setup hai. Par agar price wapas band ke andar aa jaaye (failed breakout), to setup invalid — stop hit.',
        [
          'Regime: squeeze (low volatility).',
          'Trigger: close above upper band.',
          'Confirmation: MACD zero cross + band expansion.',
          'Invalidation: close back inside band.',
        ],
      ),
    ],
    summary: [
      'MACD = EMA(12) − EMA(26), signal line 9-EMA, histogram difference.',
      'MACD lagging momentum indicator hai — range markets me whipsaw deta hai.',
      'Bollinger Bands volatility ke bands hain, not overbought/oversold.',
      'Band squeeze expansion ka setup deta hai, direction nahi.',
      'Mean reversion aur breakout — dono Bollinger strategies hain, different regimes ke liye.',
    ],
    mistakes: [
      'Bollinger upper band ko "sell signal" samajhna.',
      'MACD cross ko trend reversal samajhna.',
      'Squeeze breakout direction predict karna bina confirmation.',
    ],
    keyPoints: [
      'MACD = momentum, Bollinger = volatility.',
      'Walking the band strong trend ka sign hai.',
      'Regime awareness strategy choice se zyada important hai.',
    ],
    quiz: [
      {
        q: 'MACD line ka formula kya hai?',
        options: [
          'EMA(12) + EMA(26)',
          'EMA(12) − EMA(26)',
          'SMA(20) − SMA(50)',
          'RSI(14) − RSI(9)',
        ],
        answer: 1,
        explain: 'MACD line = EMA(12) − EMA(26). Signal line uska 9-EMA hai.',
      },
      {
        q: 'Price Bollinger upper band par hai. Sahi interpretation?',
        options: [
          'Sell guaranteed',
          'Strong trend — price band ke saath chal sakti hai',
          'Volatility zero',
          'Bands fail ho gaye',
        ],
        answer: 1,
        explain: '"Walking the band" strong trend ka classic sign hai, not a reversal signal.',
      },
      {
        q: 'Bollinger squeeze kya indicate karta hai?',
        options: [
          'Direction confirm',
          'Low volatility — expansion likely, par direction unknown',
          'Volume zero',
          'Trend reversal guaranteed',
        ],
        answer: 1,
        explain: 'Squeeze volatility contraction hai. Expansion likely hai par direction confirmation chahiye.',
      },
    ],
    exercise:
      'Chart Explorer/Lab me Bollinger Bands (20,2) lagayein. Pichhle 100 candles me 3 squeeze periods dhoondein. Har squeeze ke baad note karein: breakout hua? Kis direction? Kitna bada move?',
  },

  'technical-and-fundamental/technical-indicators/vwap-and-atr': {
    objectives: [
      'VWAP ka calculation aur institutional relevance.',
      'ATR ka volatility measurement role.',
      'ATR-based stop placement aur position sizing.',
    ],
    intro:
      'VWAP institutional trading ka benchmark hai; ATR volatility ka measure. Dono practical tools hain — VWAP execution ke liye, ATR risk management ke liye.',
    blocks: [
      h('VWAP (Volume Weighted Average Price)'),
      formula(
        'VWAP',
        'Typical Price = (High + Low + Close) ÷ 3\nVWAP = Σ(Typical Price × Volume) ÷ Σ(Volume)',
        'Intraday session ke liye cumulative calculate hota hai — har naye candle ke saath update hota hai aur session end par reset.',
      ),
      p(
        'VWAP batata hai ki session me "average participant" ne kya price paya. Institutional traders apne execution ko VWAP ke against benchmark karte hain — agar wo VWAP se better fill kar paayein to achha maana jaata hai. Isliye VWAP ke paas actual order flow hota hai, koi mystical level nahi.',
      ),
      table(
        ['Price vs VWAP', 'Interpretation'],
        [
          ['Price above VWAP', 'Buyers session me control me — bullish intraday bias'],
          ['Price below VWAP', 'Sellers control me — bearish intraday bias'],
          ['Price at VWAP', 'Balance — often magnet/mean reversion'],
          ['VWAP flat', 'Range-bound session'],
        ],
      ),
      callout(
        'warn',
        'VWAP ka scope',
        'VWAP **intraday** indicator hai. Daily chart par "VWAP" ka matlab anchored VWAP hota hai (specific date se) — wo different cheez hai. Standard VWAP har session reset hota hai. Isliye multi-day analysis me VWAP ko session-wise padhein.',
      ),
      h('ATR (Average True Range)'),
      formula(
        'True Range aur ATR',
        'TR = max(High − Low, |High − Prev Close|, |Low − Prev Close|)\nATR(n) = average of TR over n periods (usually 14)',
        'TR gaps ko include karta hai — isliye ye simple high-low range se better volatility measure hai.',
      ),
      p(
        'ATR batata hai ki ek typical candle kitna move karti hai. Agar ATR ₹20 hai, to ₹5 ka stop unrealistic hai (noise se hit hoga), aur ₹200 ka stop bahut wide hai. ATR aapko **volatility-adjusted** decisions lene deta hai.',
      ),
      h('ATR ke practical uses'),
      olist([
        '**Stop placement:** stop = entry − (1.5 × ATR) — volatility ke hisaab se.',
        '**Position sizing:** risk ÷ (ATR-based stop distance) = shares.',
        '**Volatility regime:** ATR badhna = volatility expand ho rahi hai.',
        '**Target estimation:** realistic target = k × ATR (e.g. 3 × ATR).',
        '**Trailing stop:** ATR-based trailing noise se bachata hai.',
      ]),
      example(
        'ATR-based position sizing',
        'Capital ₹1,00,000, risk 1% = ₹1,000. Stock price ₹500, ATR(14) = ₹12. Stop distance = 1.5 × 12 = ₹18. Position size = 1,000 ÷ 18 = 55 shares. Position value = ₹27,500 (capital ka 27.5%). Ab compare: same stock with ATR ₹40 (high volatility) → stop ₹60 → size = 16 shares → position value ₹8,000. Volatility ke hisaab se size automatic adjust ho gaya.',
        [
          'Risk amount = capital × 1%',
          'ATR se stop distance',
          'Size = risk ÷ stop distance',
          'Volatile stocks me chhoti size automatically',
        ],
      ),
      callout(
        'info',
        'ATR ka limitation',
        'ATR backward-looking hai — past volatility measure karta hai. Volatility regime change (news, earnings) par ATR purana ho sakta hai. Isliye event ke aas-paas ATR-based sizing ko manually conservative karein. Aur ATR direction nahi batata — sirf magnitude.',
      ),
      h('VWAP + ATR combo'),
      list([
        'VWAP se intraday bias (above = long bias).',
        'ATR se stop distance aur size.',
        'VWAP se door price = extended (mean reversion risk).',
        'VWAP par price + ATR-based stop = tighter risk.',
      ]),
    ],
    summary: [
      'VWAP volume-weighted average price hai, session-wise reset hota hai.',
      'Institutional execution VWAP ke against benchmark hoti hai.',
      'ATR true range ka average hai — gaps include karta hai.',
      'ATR se volatility-adjusted stops aur position size nikalte hain.',
      'ATR backward-looking hai aur direction nahi batata.',
    ],
    mistakes: [
      'VWAP ko multi-day support samajhna.',
      'ATR ignore karke fixed rupee stop lagana.',
      'High ATR ko "zyada profit potential" samajhna.',
    ],
    keyPoints: [
      'VWAP = execution benchmark; ATR = volatility ruler.',
      'Fixed stops volatile stocks me fail karte hain.',
      'ATR-based sizing self-normalising hai.',
    ],
    quiz: [
      {
        q: 'VWAP kis par based hai?',
        options: [
          'Sirf close price',
          'Typical price weighted by volume',
          'Sirf high price',
          'Sirf volume',
        ],
        answer: 1,
        explain: 'VWAP = Σ(typical price × volume) ÷ Σ(volume). Isliye heavy volume prices ka zyada asar hota hai.',
      },
      {
        q: 'ATR(14) ₹12 hai, entry ₹500, 1.5×ATR stop. Stop price kya hai?',
        options: ['₹488', '₹482', '₹470', '₹494'],
        answer: 1,
        explain: 'Stop distance = 1.5 × 12 = ₹18. Stop = 500 − 18 = ₹482.',
      },
      {
        q: 'ATR ka main limitation kya hai?',
        options: [
          'Ye direction batata hai',
          'Ye backward-looking hai — volatility regime change par outdated ho sakta hai',
          'Ye sirf crypto me kaam karta hai',
          'Ye volume measure karta hai',
        ],
        answer: 1,
        explain: 'ATR past volatility ka average hai. Event-driven volatility spikes me wo under-estimate karta hai.',
      },
    ],
    exercise:
      'Ek stock ka ATR(14) aur current price dekhein. Calculate karein: 1.5×ATR stop ke saath ₹50,000 par 1% risk wali position size kitni hogi? Phir ek dusre (zyada volatile) stock ke liye same calculation karein aur compare karein.',
  },

  'technical-and-fundamental/technical-indicators/fibonacci-retracement': {
    objectives: [
      'Fibonacci sequence aur ratios ka origin.',
      'Retracement levels ka correct use.',
      'Extension levels aur measured moves.',
    ],
    intro:
      'Fibonacci levels market analysis me sabse popular aur sabse over-claimed tools me se ek hain. Ye math se aate hain, magic se nahi. Is lesson me hum unka honest use dekhenge.',
    blocks: [
      h('Origin'),
      p(
        'Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89... Har number pichhle do ka sum. Adjacent numbers ka ratio 1.618 (golden ratio) ki taraf converge karta hai. Trading me commonly use hone wale ratios: **23.6%, 38.2%, 50%, 61.8%, 78.6%** (50% technically Fibonacci nahi hai par conventional hai).',
      ),
      callout(
        'info',
        'Honest note',
        'Fibonacci ratios ka market me koi proven causal mechanism nahi hai. Inka effect partly **self-fulfilling** hai — bahut se traders in levels ko dekhte hain, isliye orders wahan concentrate hote hain. Ye ek useful convention hai, physical law nahi. Isliye ise confluence ke ek layer ke roop me use karein, akela nahi.',
      ),
      h('Retracement kaise draw karein'),
      olist([
        '**Uptrend me:** swing low se swing high tak (bottom to top).',
        '**Downtrend me:** swing high se swing low tak (top to bottom).',
        'Levels pullback me support/resistance ka potential batate hain.',
        'Swing points meaningful hone chahiye (major structure, not every wiggle).',
      ]),
      table(
        ['Level', 'Common meaning', 'Note'],
        [
          ['23.6%', 'Shallow pullback', 'Strong trend me common'],
          ['38.2%', 'Normal pullback', 'Most common healthy pullback'],
          ['50%', 'Half retracement', 'Not Fibonacci but widely watched'],
          ['61.8%', 'Deep pullback', 'Golden ratio; last defense in strong trend'],
          ['78.6%', 'Very deep', 'Trend weak — often precedes reversal'],
        ],
      ),
      diagram(
        'trend',
        'Fibonacci retracement',
        'Swing low se high tak draw karein; levels pullback support batate hain.',
        'An uptrend move from a swing low to a swing high, with horizontal dashed lines drawn at 23.6%, 38.2%, 50%, 61.8% and 78.6% of that move. A later pullback stops near the 61.8% line, which is annotated as a decision point rather than a guaranteed reversal.',
      ),
      example(
        'Fibonacci in a real context',
        'Stock ₹400 se ₹600 tak gaya (₹200 move). Retracement levels: 23.6% = ₹552.8; 38.2% = ₹523.6; 50% = ₹500; 61.8% = ₹476.4. Pullback ₹505 tak aaya aur 50 DMA + previous resistance-turned-support ke saath overlap hua. Ye confluence hai. Entry ₹510 par confirmation candle ke saath, stop ₹470 (61.8% ke neeche), target ₹600.',
        [
          'Swing range = ₹200.',
          'Levels = high − (range × ratio).',
          'Confluence ke saath level meaningful.',
          'Stop 61.8% ke neeche = invalidation.',
        ],
      ),
      h('Extension levels'),
      formula(
        'Fibonacci extension',
        'Extension = swing high + (range × extension ratio)\nCommon ratios: 127.2%, 161.8%, 200%, 261.8%',
        'Agar range ₹200 hai aur high ₹600 hai, 161.8% extension = 600 + (200 × 0.618) = ₹723.6.',
      ),
      p(
        'Extensions targets estimate karne ke liye use hote hain. Par ye "price yahan jaayega" nahi hai — ye ek measured move framework hai jo aapko R:R calculate karne me madad karta hai.',
      ),
      callout(
        'warn',
        'Fibonacci ke common traps',
        '1) **Hindsight fitting** — kai possible swing points hote hain, aur aap wo chun sakte hain jo level par fit ho. 2) **Har level ko support samajhna** — 5 levels me se koi na koi toh hit hoga. 3) **Retracement ko reversal samajhna** — deep pullback reversal nahi hota automatically. 4) **Confluence ke bina trade** — akela fib level weak evidence hai.',
      ),
      h('Better framework'),
      list([
        'Pehle structure identify karein (HH/HL ya LH/LL).',
        'Major swing points chunein (not minor ones).',
        'Fib draw karein aur **confluence** dekhein (MA, S/R, round number, volume node).',
        'Agar confluence nahi hai, fib level ko skip karein.',
        'Level ko "area" samajhein, exact price nahi.',
      ]),
    ],
    summary: [
      'Fibonacci ratios sequence se aate hain, market law nahi.',
      'Retracement pullback support/resistance estimate karta hai.',
      '38.2% aur 61.8% sabse commonly watched levels hain.',
      'Extension targets estimate karta hai, R:R calculation me useful.',
      'Fib ka value confluence me hai, akela nahi.',
    ],
    mistakes: [
      'Swing points ko hindsight me chunna.',
      'Har fib level ko tradeable support samajhna.',
      'Fib ko reversal guarantee samajhna.',
    ],
    keyPoints: [
      'Fib = convention + self-fulfilling, not physics.',
      'Levels ke saath confluence chahiye.',
      'Extension = target estimation, not prediction.',
    ],
    quiz: [
      {
        q: 'Uptrend me Fibonacci retracement kahan se kahan draw karte hain?',
        options: [
          'High se low',
          'Swing low se swing high',
          'Open se close',
          'Volume se price',
        ],
        answer: 1,
        explain: 'Uptrend me low se high tak draw karte hain — pullback levels us range ke fractions hote hain.',
      },
      {
        q: 'Swing range ₹200, high ₹600. 61.8% retracement level kya hai?',
        options: ['₹476.4', '₹523.6', '₹500', '₹552.8'],
        answer: 0,
        explain: '600 − (200 × 0.618) = 600 − 123.6 = ₹476.4.',
      },
      {
        q: 'Fibonacci levels ka effect kyun partly kaam karta hai?',
        options: [
          'Kyunki ye physical law hain',
          'Kyunki bahut traders inhe dekhte hain — self-fulfilling convention',
          'Kyunki exchanges mandate karte hain',
          'Kyunki volume auto-adjust hota hai',
        ],
        answer: 1,
        explain: 'Widespread observation orders ko in levels par concentrate kar deti hai — causal mechanism nahi hai.',
      },
    ],
    exercise:
      'Chart Explorer me ek major swing chunein. Fib draw karein. Dekhein: kaunse level par price ne actually reaction diya? Kya wahan koi confluence (MA, prior S/R) tha? 3 swings par repeat karein.',
  },

  /* ================================================================ */
  /* MODULE 2 — Volume Analysis                                       */
  /* ================================================================ */
  'technical-and-fundamental/volume-analysis/volume-basics': {
    objectives: [
      'Volume ka price ke saath relationship.',
      'Average volume aur relative volume.',
      'Volume spikes ka interpretation.',
    ],
    intro:
      'Price batata hai "kya hua", volume batata hai "kitne logon ne participate kiya". Volume confirmation price move ke quality ka ek rung hai — par wo akela story nahi batata.',
    blocks: [
      h('Volume ka basic logic'),
      p(
        'Volume = ek period me traded quantity. High volume matlab zyada participants ne apni conviction express ki. Low volume move weak hota hai kyunki usme kam log involved the — easily reverse ho sakta hai.',
      ),
      table(
        ['Price', 'Volume', 'Common reading (heuristic)'],
        [
          ['Up', 'Up', 'Strong buying participation — healthy uptrend'],
          ['Up', 'Down', 'Weak rally — caution'],
          ['Down', 'Up', 'Strong selling — serious weakness'],
          ['Down', 'Down', 'Selling exhaustion possible'],
          ['Flat', 'Up', 'Battle/absorption — breakout aa sakta hai'],
          ['Flat', 'Down', 'Indifference — no interest'],
        ],
      ),
      h('Relative volume'),
      formula(
        'Relative volume (RVOL)',
        'RVOL = Current volume ÷ Average volume (same time of day, 20–30 period)',
        'Agar average 30-min volume 1,00,000 hai aur current 2,50,000 hai, RVOL = 2.5× — significant expansion.',
      ),
      p(
        'Intraday me absolute volume compare karna galat hai kyunki din ke different times par volume pattern different hota hai (open me zyada, lunch me kam). Isliye same-time-of-day average se compare karein — yehi RVOL ka concept hai.',
      ),
      h('Volume spikes'),
      list([
        '**News/earnings** — genuine repricing, high RVOL.',
        '**Index rebalancing** — mechanical flow, koi "conviction" nahi.',
        '**Expiry** — derivatives settlement flows.',
        '**Breakout** — genuine participation ka sign.',
        '**Block deals** — single large transaction, price impact variable.',
        '**Manipulation** — thin stocks me artificial volume (regulators track this).',
      ]),
      callout(
        'warn',
        'Volume spike ko blindly bullish/bearish na samjhein',
        'High volume sirf "bahut activity" batata hai. Direction us candle ke close se aata hai. Ek high-volume doji ka matlab hai heavy battle without resolution. Isliye volume + candle structure + location teeno dekhein.',
      ),
      example(
        'Volume analysis in practice',
        'Ek stock resistance ₹500 par hai. Pehla attempt: price ₹502 tak gaya, volume average se 1.2x, close ₹498 (rejection). Doosra attempt: price ₹510 tak gaya, volume 2.8x, close ₹508 (strong close). Doosre attempt me actual participation dikh rahi hai. Ye "volume confirmation" ka classic example hai — par agla din decisive hai (follow-through).',
        [
          'Attempt 1: low RVOL + rejection close = weak.',
          'Attempt 2: high RVOL + strong close = stronger.',
          'Follow-through = final confirmation.',
          'Volume evidence improve karta hai, guarantee nahi.',
        ],
      ),
      callout(
        'info',
        'Volume ka data caveat',
        'Different data providers different volume numbers de sakte hain (consolidated vs single-exchange, dark pool inclusion). India me NSE aur BSE volume separately report hota hai; consolidated number zyada accurate hai. Isliye exact numbers se zyada **relative changes** par focus karein.',
      ),
      h('Average volume ka use'),
      list([
        'Liquidity assessment: kam average volume = slippage risk.',
        'Position sizing: average daily volume ka 1% se kam position rakhein.',
        'Breakout validation: current volume average se compare karein.',
        'Screening: volume filter se illiquid stocks hataayein.',
      ]),
    ],
    summary: [
      'Volume participation measure karta hai, direction nahi.',
      'Price-volume combinations se move ki quality judge hoti hai.',
      'RVOL same-time-of-day average se compare karta hai.',
      'Volume spikes ke multiple causes hote hain — news se manipulation tak.',
      'Relative changes absolute numbers se zyada meaningful hain.',
    ],
    mistakes: [
      'Volume spike ko direction samajhna.',
      'Intraday absolute volume compare karna.',
      'Consolidated volume ka farq ignore karna.',
    ],
    keyPoints: [
      'Volume = participation, not direction.',
      'RVOL intraday analysis ka correct tool hai.',
      'Volume + structure + location = confirmation.',
    ],
    quiz: [
      {
        q: 'Price upar ja rahi hai par volume gir raha hai. Common reading?',
        options: [
          'Very strong rally',
          'Weak rally — participation kam ho rahi hai',
          'Guaranteed reversal',
          'Volume data error',
        ],
        answer: 1,
        explain: 'Rising price on falling volume = weakening participation, caution ka signal (not a guarantee).',
      },
      {
        q: 'RVOL kya measure karta hai?',
        options: [
          'Total volume',
          'Current volume vs same-time-of-day average',
          'Price change %',
          'Spread',
        ],
        answer: 1,
        explain: 'RVOL same time of day ke average se comparison karta hai — intraday volume pattern ko account me leta hai.',
      },
      {
        q: 'Index rebalancing se aane wala volume kya indicate karta hai?',
        options: [
          'Strong conviction',
          'Mechanical flow — koi directional conviction nahi',
          'Manipulation',
          'Volume zero',
        ],
        answer: 1,
        explain: 'Rebalancing mechanical hai — funds ko index weight match karna hota hai, view nahi.',
      },
    ],
    exercise:
      'Chart Explorer me volume pane dekhein. 10 candles identify karein jahan volume average se kaafi zyada tha. Har ek ke liye reason guess karein (breakout, news, expiry) aur agle 3 candles ka behaviour note karein.',
  },

  'technical-and-fundamental/volume-analysis/volume-divergence-and-obv': {
    objectives: [
      'Volume divergence ka concept.',
      'On-Balance Volume (OBV) ka calculation aur interpretation.',
      'Accumulation/distribution ka framework.',
    ],
    intro:
      'Volume divergence aur OBV cumulative flow ko track karte hain. Ye batate hain ki price move ke peeche "paisa" aa raha hai ya nahi. Par ye indicators bhi lagging aur interpretive hote hain.',
    blocks: [
      h('Volume divergence'),
      p(
        'Volume divergence tab hota hai jab price naya high/low banaye par volume confirm na kare. Jaise price higher high banaye par volume lower high. Ye participation decrease ka signal hai.',
      ),
      table(
        ['Type', 'Price', 'Volume', 'Interpretation'],
        [
          ['Bearish divergence', 'Higher high', 'Lower high', 'Rally me participation kam ho rahi'],
          ['Bullish divergence', 'Lower low', 'Lower volume', 'Selloff me pressure kam ho raha'],
          ['Confirmation', 'Higher high', 'Higher volume', 'Healthy trend'],
        ],
      ),
      h('OBV (On-Balance Volume)'),
      formula(
        'OBV',
        'Agar Close > Prev Close: OBV = Prev OBV + Volume\nAgar Close < Prev Close: OBV = Prev OBV − Volume\nAgar Close = Prev Close: OBV = Prev OBV',
        'OBV ek cumulative line hai — up days par volume add, down days par subtract. Ye "net buying pressure" ka proxy hai.',
      ),
      example(
        'OBV calculation',
        'Day 1: close 100, volume 50,000, OBV = 50,000 (start 0). Day 2: close 102 (up), volume 40,000 → OBV = 90,000. Day 3: close 101 (down), volume 30,000 → OBV = 60,000. Day 4: close 104 (up), volume 55,000 → OBV = 1,15,000.',
        [
          'Up day: OBV + volume.',
          'Down day: OBV − volume.',
          'Cumulative line banti hai.',
          'OBV aur price ka divergence observe karein.',
        ],
      ),
      diagram(
        'trend',
        'OBV divergence',
        'Price higher highs, OBV lower highs — distribution ka hint.',
        'Two panels. The price panel shows a series of higher highs. The OBV panel below shows the corresponding peaks failing to exceed earlier peaks, forming a downward-sloping dashed trendline. The divergence is annotated as "distribution pressure — not a sell signal".',
      ),
      h('OBV ka interpretation'),
      list([
        '**OBV rising with price** — healthy accumulation.',
        '**OBV flat with rising price** — rally ko volume support nahi.',
        '**OBV falling with rising price** — distribution possible.',
        '**OBV rising with falling price** — accumulation possible (bottoming).',
      ]),
      callout(
        'warn',
        'OBV ki limitations',
        '1) OBV volume ko poora add/subtract karta hai — ek chhota move bhi bada volume le sakta hai (gap days). 2) Ye close-based hai, intraday behaviour ignore karta hai. 3) Different data providers different OBV dete hain (volume data differences). 4) Divergence multiple baar extend ho sakta hai bina reversal ke. Isliye OBV ko supporting evidence samjhein.',
      ),
      h('Accumulation aur distribution'),
      terms([
        { term: 'Accumulation', meaning: 'Smart/institutional buying in a range while price is flat — supply absorb hoti hai.' },
        { term: 'Distribution', meaning: 'Selling into strength in a range — demand absorb hota hai.' },
        { term: 'Wyckoff framework', meaning: 'Classic framework jo accumulation/distribution phases describe karta hai. Interpretive hai, mechanistic nahi.' },
        { term: 'Absorption', meaning: 'Bada selling order aane par price na girna — demand absorb kar rahi hai.' },
      ]),
      callout(
        'info',
        'Volume Profile vs OBV',
        'Volume Profile price levels par volume distribution dikhata hai (visible volume nodes). Ye OBV se zyada direct information deta hai ki kis price par participants active the. Par ye advance tool hai aur platform support par depend karta hai. Learnyx me hum core volume analysis par focus karte hain.',
      ),
      p(
        'Practical habit: weekly chart par OBV dekhein. Agar price 6 mahine me higher highs bana raha hai par OBV ne consistently lower highs banaye, to rally ki quality questionable hai. Ye position sizing reduce karne ka reason ho sakta hai — sell signal nahi.',
      ),
    ],
    summary: [
      'Volume divergence participation changes ka evidence hai.',
      'OBV cumulative volume flow ko track karta hai.',
      'OBV flat/falling ke saath rising price distribution ka hint ho sakta hai.',
      'OBV lagging aur data-dependent hai — supporting evidence.',
      'Accumulation/distribution interpretive frameworks hain.',
    ],
    mistakes: [
      'Divergence ko reversal signal samajhna.',
      'OBV ko accurate "smart money tracker" samajhna.',
      'Ek din ke volume se OBV trend decide karna.',
    ],
    keyPoints: [
      'Divergence = weakening participation evidence.',
      'OBV = cumulative flow proxy.',
      'Supporting evidence, not trigger.',
    ],
    quiz: [
      {
        q: 'Up day par OBV kaise update hota hai?',
        options: [
          'Volume subtract',
          'Volume add',
          'Unchanged',
          'Half volume add',
        ],
        answer: 1,
        explain: 'Close > previous close par volume OBV me add hota hai; down day par subtract.',
      },
      {
        q: 'Price higher highs bana raha hai par OBV lower highs. Interpretation?',
        options: [
          'Strong accumulation',
          'Rally me volume support kam ho rahi hai (distribution hint)',
          'Guaranteed crash',
          'OBV galat hai',
        ],
        answer: 1,
        explain: 'Ye bearish volume divergence hai — rally ki quality questionable, par guarantee nahi.',
      },
      {
        q: 'OBV ka main limitation kya hai?',
        options: [
          'Ye price use nahi karta',
          'Poora volume ek hi direction me add/subtract karta hai — granularity kam',
          'Ye sirf weekly kaam karta hai',
          'Ye sirf crypto me hota hai',
        ],
        answer: 1,
        explain: 'OBV close-based aur whole-volume based hai — intraday dynamics aur magnitude ignore karta hai.',
      },
    ],
    exercise:
      'Chart Explorer me OBV add karein (ya manually 10 din ka calculate karein). Price trend aur OBV trend compare karein. Kya divergence hai? Apna observation likhein aur next 10 candles se verify karein.',
  },

  /* ================================================================ */
  /* MODULE 3 — Fundamental Analysis                                  */
  /* ================================================================ */
  'technical-and-fundamental/fundamental-analysis/reading-financial-statements': {
    objectives: [
      'Teen financial statements ka purpose.',
      'Income statement, balance sheet aur cash flow ka structure.',
      'Statements ke beech connection samajhna.',
    ],
    intro:
      'Financial statements company ki "health report" hain. Teen statements ek doosre se jude hote hain — ek ko padhna doosre ko samajhne ke liye zaroori hai. Is lesson me hum structure aur key lines dekhenge.',
    blocks: [
      h('Income statement (P&L)'),
      table(
        ['Line', 'Kya hai', 'Note'],
        [
          ['Revenue', 'Total sales', 'Top line'],
          ['COGS', 'Direct cost of goods/services', 'Revenue − COGS = gross profit'],
          ['Operating expenses', 'Salaries, marketing, R&D, admin', 'Fixed aur variable mix'],
          ['EBITDA', 'Earnings before interest, tax, depreciation, amortisation', 'Operating profitability ka rough measure'],
          ['Depreciation/amortisation', 'Non-cash asset write-down', 'Cash flow me add back hota hai'],
          ['Interest expense', 'Debt ka cost', 'Leverage ka direct indicator'],
          ['Tax', 'Income tax', 'Effective tax rate compare karein'],
          ['Net income', 'Bottom line', 'EPS ka base'],
        ],
      ),
      formula(
        'Key margins',
        'Gross margin = (Revenue − COGS) ÷ Revenue × 100\nOperating margin = Operating income ÷ Revenue × 100\nNet margin = Net income ÷ Revenue × 100',
        'Margins ka trend (3-5 saal) earnings quality ka important signal hai. Sirf ek saal ko na dekhein.',
      ),
      h('Balance sheet'),
      formula(
        'Accounting equation',
        'Assets = Liabilities + Shareholders’ equity',
        'Ye equation hamesha balance karti hai. Equity = Assets − Liabilities = net worth.',
      ),
      table(
        ['Section', 'Items', 'What to watch'],
        [
          ['Current assets', 'Cash, receivables, inventory', 'Receivables/inventory growth vs revenue growth'],
          ['Non-current assets', 'PP&E, intangibles, goodwill', 'Goodwill impairments, capex intensity'],
          ['Current liabilities', 'Payables, short-term debt', 'Liquidity (current ratio)'],
          ['Non-current liabilities', 'Long-term debt, lease liabilities', 'Debt maturity profile'],
          ['Equity', 'Share capital, reserves, retained earnings', 'Book value, ROE base'],
        ],
      ),
      h('Cash flow statement'),
      table(
        ['Section', 'Kya dikhata hai', 'Note'],
        [
          ['Operating (CFO)', 'Core business se cash', 'Net income se zyada important'],
          ['Investing (CFI)', 'Capex, acquisitions, investments', 'Negative usually (capex)'],
          ['Financing (CFF)', 'Debt, equity, dividends, buybacks', 'Capital structure changes'],
          ['Net change', 'Total cash movement', 'CFO + CFI + CFF'],
        ],
      ),
      callout(
        'info',
        'Cash flow kyun king hai',
        'Net income accounting estimates (depreciation, provisions, revenue recognition) se affected hota hai. Cash flow actual paisa hai. Agar net income consistent hai par operating cash flow weak hai, to earnings quality questionable ho sakti hai. "Cash is fact, profit is opinion" — ye fundamental analysis ka core principle hai.',
      ),
      h('Teen statements ka connection'),
      diagram(
        'market-cycle',
        'Statements ka linkage',
        'Net income → retained earnings (balance sheet) → CFO (cash flow)',
        'A flow diagram with three boxes labelled income statement, balance sheet, and cash flow statement. Arrows show net income flowing into retained earnings on the balance sheet and into the operating section of the cash flow statement; capex flows from investing activities into property plant and equipment on the balance sheet; debt and dividend flows connect financing activities to the balance sheet.',
      ),
      example(
        'Ek simple linkage',
        'Company ka net income ₹100 crore. Depreciation ₹30 crore (non-cash). Working capital me ₹20 crore increase (cash used). Capex ₹50 crore. Dividends ₹10 crore. CFO = 100 + 30 − 20 = ₹110 crore. FCF = CFO − capex = ₹60 crore. Financing outflow = ₹10 crore dividends. Net cash change = 110 − 50 − 10 = ₹50 crore increase.',
        [
          'CFO = net income + non-cash − working capital increase.',
          'FCF = CFO − capex.',
          'Net cash change = CFO + CFI + CFF.',
          'FCF positive = company self-funding ho sakti hai.',
        ],
      ),
      callout(
        'warn',
        'Red flags jo padhne chahiye',
        '1) Receivables revenue se tez badh rahe (collection problem). 2) Inventory revenue se tez badh raha (demand problem). 3) CFO consistently net income se kam. 4) Goodwill bada aur impair ho raha. 5) Short-term debt se long-term capex fund ho raha. 6) Related-party transactions bahut zyada. Ye signals investigation ke liye hain, conclusions nahi.',
      ),
    ],
    summary: [
      'Income statement profitability dikhata hai.',
      'Balance sheet financial position (assets = liabilities + equity).',
      'Cash flow statement actual cash movement dikhata hai.',
      'Teen statements linked hain — net income balance sheet aur CFO me jaata hai.',
      'CFO net income se zyada reliable measure hai.',
    ],
    mistakes: [
      'Sirf net income dekhna aur cash flow ignore karna.',
      'Ek saal ke numbers se conclusion nikaalna.',
      'Receivables/inventory growth ignore karna.',
    ],
    keyPoints: [
      'Cash flow = fact; profit = accounting opinion.',
      'Margins ka trend 3-5 saal dekhein.',
      'Red flags pattern hain, individual numbers nahi.',
    ],
    quiz: [
      {
        q: 'Free cash flow ka formula kya hai?',
        options: [
          'CFO + capex',
          'CFO − capex',
          'Net income − tax',
          'Revenue − COGS',
        ],
        answer: 1,
        explain: 'FCF = operating cash flow − capital expenditure. Ye company ka discretionary cash batata hai.',
      },
      {
        q: 'Balance sheet equation kya hai?',
        options: [
          'Assets = Liabilities + Equity',
          'Assets = Revenue − Expenses',
          'Equity = Revenue + Debt',
          'Liabilities = Assets + Equity',
        ],
        answer: 0,
        explain: 'Accounting equation: Assets = Liabilities + Shareholders’ equity.',
      },
      {
        q: 'Receivables revenue se tez badh rahe hain — kya signal ho sakta hai?',
        options: [
          'Excellent growth',
          'Collection problem / revenue quality concern',
          'Debt kam ho gaya',
          'Capex badh gaya',
        ],
        answer: 1,
        explain: 'Receivables tez badhna matlab sales book ho rahi hai par cash collect nahi ho raha — quality red flag.',
      },
    ],
    exercise:
      'Kisi listed company ka latest annual report kholein. Income statement se 3 saal ka revenue aur net margin trend nikalein. Cash flow se CFO compare karein. Likh kar batao: earnings quality strong lag rahi hai ya weak?',
  },

  'technical-and-fundamental/fundamental-analysis/valuation-ratios': {
    objectives: [
      'EPS, P/E aur P/B ka calculation.',
      'Dividend yield ka meaning.',
      'Ratio comparison ke rules aur traps.',
    ],
    intro:
      'Valuation ratios price ko business metrics se relate karte hain. Ye "sasta/mehanga" ka shortcut nahi hain — ye comparison tools hain jinhe context chahiye. Is lesson me hum inhe honestly use karna sikhayenge.',
    blocks: [
      h('EPS'),
      formula(
        'Earnings Per Share',
        'Basic EPS = Net income ÷ Weighted average shares outstanding\nDiluted EPS = (Net income) ÷ (Shares + potential dilutive shares)',
        'Diluted EPS conservative hota hai kyunki options/warrants/convertibles ka asar include karta hai.',
      ),
      h('P/E ratio'),
      formula(
        'Price to Earnings',
        'P/E = Share price ÷ EPS (or Market cap ÷ Net income)',
        'Trailing P/E = last 12 months EPS. Forward P/E = next 12 months expected EPS.',
      ),
      p(
        'P/E batata hai market company ki ek rupee earnings ke liye kitna pay kar raha hai. P/E 20 ka matlab ₹20 per ₹1 of earnings — ya 20x. Ye "mehanga" hai ya "sasta" — ye industry, growth aur quality par depend karta hai.',
      ),
      table(
        ['Situation', 'P/E', 'Common reading'],
        [
          ['High-growth tech', '30–60+', 'Future growth expectations'],
          ['Mature FMCG', '40–70 (India)', 'Stability premium'],
          ['Cyclical steel/cement', '5–12', 'Cyclicality, peak earnings risk'],
          ['Bank (varies)', '8–20', 'Asset quality dependent'],
          ['Loss-making', 'N/A', 'P/E meaningless — use other metrics'],
        ],
      ),
      callout(
        'warn',
        'P/E ke traps',
        '1) **Cyclical trap:** peak earnings par P/E kam dikhta hai, par earnings normalize hote hi P/E badh jaata hai. 2) **One-off items:** ek baar ka profit P/E ko artificially kam kar deta hai. 3) **Accounting differences:** different depreciation/lease policies P/E comparable nahi rakhte. 4) **Loss-making:** P/E negative ya meaningless. 5) **P/E ko "value" samajhna** — ye price ka multiple hai, intrinsic value nahi.',
      ),
      h('P/B ratio'),
      formula(
        'Price to Book',
        'P/B = Share price ÷ Book value per share\nBook value per share = (Total assets − Total liabilities) ÷ Shares',
        'P/B 1 se kam ka matlab market company ko book value se kam value kar raha hai — par ye distress ka sign bhi ho sakta hai.',
      ),
      p(
        'P/B banks aur asset-heavy businesses ke liye useful hai. Asset-light businesses (software, services) ke liye P/B kam meaningful hai kyunki unki value intangible assets (brand, IP, talent) me hoti hai jo balance sheet me poora reflect nahi hoti.',
      ),
      h('Dividend yield'),
      formula(
        'Dividend yield',
        'Dividend yield = Annual dividend per share ÷ Share price × 100',
        '₹5 dividend, ₹200 share price → 2.5% yield.',
      ),
      callout(
        'info',
        'Dividend yield ka caution',
        'Very high dividend yield (8%+) aksar price girne ki wajah se hota hai — market ko lagta hai dividend sustainable nahi hai. Isliye payout ratio aur free cash flow check karein. Yield trap real hai.',
      ),
      h('Ratio comparison ke rules'),
      olist([
        '**Same industry** me compare karein — cross-industry comparison misleading hai.',
        '**Trend** dekhein (5 saal), ek point nahi.',
        '**Growth** ke saath dekhein — PEG = P/E ÷ growth rate.',
        '**Quality** consider karein — high ROE company higher P/E deserve kar sakti hai.',
        '**Debt** consider karein — EV/EBITDA debt-adjusted comparison better hai.',
        '**Accounting** differences note karein.',
      ]),
      example(
        'Comparison example',
        'Company A: P/E 50, revenue growth 30%, ROE 28%, debt-free. Company B: P/E 12, revenue growth 2%, ROE 9%, debt/equity 1.5. A "mehanga" lagta hai par growth aur ROE ke hisaab se justified ho sakta hai. B "sasta" lagta hai par growth slow aur leverage high. Sirf P/E se conclusion galat hoga.',
        [
          'P/E alone comparison galat hai.',
          'Growth, ROE, leverage context chahiye.',
          'Same industry me compare karein.',
          'Trend 5 saal ka dekhein.',
        ],
      ),
    ],
    summary: [
      'EPS net income per share hai; diluted EPS conservative hai.',
      'P/E price ko earnings se relate karta hai — context ke bina meaningless.',
      'P/B asset-heavy businesses ke liye useful hai.',
      'Dividend yield high hona sustainability ka signal nahi.',
      'Ratios ko same industry, trend aur quality ke saath compare karein.',
    ],
    mistakes: [
      'P/E ko alone "sasta/mehanga" samajhna.',
      'Cyclical peak earnings par kam P/E ko value samajhna.',
      'High dividend yield ko safe income samajhna.',
    ],
    keyPoints: [
      'Ratios compare karne ke tools hain, verdicts nahi.',
      'Quality aur growth P/E ko justify kar sakti hai.',
      'Trend > single point.',
    ],
    quiz: [
      {
        q: 'P/E 25 ka matlab kya hai?',
        options: [
          'Company 25% grow kar rahi hai',
          'Market ₹1 earnings ke liye ₹25 pay kar raha hai',
          'Dividend 25% hai',
          'Debt 25% hai',
        ],
        answer: 1,
        explain: 'P/E = price ÷ EPS. P/E 25 = 25x earnings multiple.',
      },
      {
        q: 'Bank ke valuation ke liye kaunsa ratio zyada relevant hai?',
        options: ['P/E only', 'P/B (book value)', 'Dividend yield only', 'PEG'],
        answer: 1,
        explain: 'Banks asset-heavy hain — book value aur asset quality key hain, isliye P/B commonly used hai.',
      },
      {
        q: 'Very high dividend yield ka common warning kya hai?',
        options: [
          'Company bahut profitable hai',
          'Price gira hai kyunki market dividend sustainability par doubtful hai',
          'Tax rate kam hai',
          'Debt zero hai',
        ],
        answer: 1,
        explain: 'Yield trap: yield = dividend ÷ price. Price girne se yield badhta hai — sustainability check karein.',
      },
    ],
    exercise:
      'Same industry ki 3 companies chunein. Har ek ka P/E, P/B, dividend yield aur 3-saal revenue growth note karein. Likh kar batao: kaunsi "sasti" lagti hai aur kyun wo justified ho sakta hai (ya nahi)?',
  },

  'technical-and-fundamental/fundamental-analysis/profitability-and-leverage-ratios': {
    objectives: [
      'ROE aur ROCE ka calculation aur difference.',
      'Debt-to-equity aur interest coverage.',
      'DuPont analysis ka basic idea.',
    ],
    intro:
      'Profitability ratios batate hain company apne capital se kitna efficient return generate kar rahi hai. Leverage ratios batate hain wo kitna risk le rahi hai. Dono ek saath dekhna zaroori hai — high ROE debt se artificially inflated ho sakta hai.',
    blocks: [
      h('ROE (Return on Equity)'),
      formula(
        'ROE',
        'ROE = Net income ÷ Shareholders’ equity × 100',
        '₹100 crore profit, ₹500 crore equity → ROE = 20%.',
      ),
      h('ROCE (Return on Capital Employed)'),
      formula(
        'ROCE',
        'ROCE = EBIT ÷ (Total assets − Current liabilities) × 100\nCapital employed = Equity + Long-term debt',
        'ROCE debt aur equity dono ko consider karta hai — isliye capital structure ke across comparison better hai.',
      ),
      table(
        ['', 'ROE', 'ROCE'],
        [
          ['Base', 'Shareholders’ equity', 'Equity + long-term debt'],
          ['Debt ka asar', 'Debt badhne se ROE artificially badh sakta hai', 'Neutral — capital structure included'],
          ['Best for', 'Equity holders ka return', 'Operating efficiency across companies'],
        ],
      ),
      callout(
        'warn',
        'High ROE ka trap',
        'Agar ek company ka ROE 30% hai par debt/equity 3.0 hai, to wo ROE leverage se aa raha hai — operating excellence se nahi. Leverage badhne par return amplify hota hai par distress risk bhi. Isliye ROE ko ROCE aur debt ke saath padhein.',
      ),
      h('DuPont analysis'),
      formula(
        'ROE decomposition',
        'ROE = Net margin × Asset turnover × Equity multiplier\nNet margin = Net income ÷ Revenue\nAsset turnover = Revenue ÷ Total assets\nEquity multiplier = Total assets ÷ Equity',
        'Ye teen drivers batate hain ROE kahan se aa raha hai: profitability, efficiency, ya leverage.',
      ),
      example(
        'DuPont example',
        'Company X: net margin 8%, asset turnover 1.5, equity multiplier 1.8 → ROE = 8 × 1.5 × 1.8 = 21.6%. Company Y: net margin 18%, asset turnover 0.6, equity multiplier 2.0 → ROE = 18 × 0.6 × 2.0 = 21.6%. Same ROE, bilkul different business models. X efficiency-driven, Y margin-driven with leverage.',
        [
          'ROE = margin × turnover × leverage.',
          'Same ROE, different quality.',
          'Leverage component ko carefully dekhein.',
        ],
      ),
      h('Leverage ratios'),
      formula(
        'Debt ratios',
        'Debt-to-Equity = Total debt ÷ Shareholders’ equity\nInterest coverage = EBIT ÷ Interest expense',
        'D/E 1.0 matlab ₹1 debt per ₹1 equity. Interest coverage 3x matlab EBIT interest ka 3 guna hai.',
      ),
      table(
        ['Ratio', 'Healthy range (indicative)', 'Warning'],
        [
          ['Debt/Equity', 'Industry-dependent; <1 generally comfortable', '>2 for non-financials needs scrutiny'],
          ['Interest coverage', '>3x comfortable', '<1.5x dangerous'],
          ['Current ratio', '1.5–2.0', '<1 liquidity stress'],
          ['Net debt/EBITDA', '<2x comfortable', '>4x highly leveraged'],
        ],
      ),
      callout(
        'info',
        'Banks ka exception',
        'Banks aur NBFCs ke liye high leverage normal hai (deposits liabilities hain). Unke liye different metrics use hote hain — NIM, capital adequacy, GNPA/NNPA. Isliye ratios ko industry ke hisaab se interpret karein.',
      ),
      h('Practical checklist'),
      list([
        'ROE trend 5 saal ka dekhein (consistency important).',
        'ROCE dekh kar operating quality verify karein.',
        'D/E aur interest coverage leverage risk batate hain.',
        'DuPont se ROE ke drivers identify karein.',
        'Industry norms ke against compare karein.',
      ]),
    ],
    summary: [
      'ROE equity par return hai; ROCE capital employed par return.',
      'ROCE capital structure neutral hai, isliye comparison better.',
      'High ROE leverage se inflated ho sakta hai.',
      'DuPont ROE ko margin, turnover aur leverage me todta hai.',
      'Debt/equity aur interest coverage leverage risk measure karte hain.',
    ],
    mistakes: [
      'High ROE ko hamesha quality samajhna.',
      'Ratios ko cross-industry compare karna.',
      'Leverage risk ignore karke sirf profitability dekhna.',
    ],
    keyPoints: [
      'Return aur risk ek saath dekhein.',
      'ROCE cross-company comparison ke liye safer hai.',
      'DuPont se ROE ki quality samajh aati hai.',
    ],
    quiz: [
      {
        q: 'ROCE ka denominator kya hai?',
        options: [
          'Shareholders equity only',
          'Capital employed (equity + long-term debt)',
          'Total revenue',
          'Total debt only',
        ],
        answer: 1,
        explain: 'ROCE = EBIT ÷ capital employed. Ye debt aur equity dono consider karta hai.',
      },
      {
        q: 'High ROE ka warning sign kya ho sakta hai?',
        options: [
          'High net margin',
          'High leverage (equity multiplier) se inflated ROE',
          'Low revenue',
          'High dividend',
        ],
        answer: 1,
        explain: 'Debt badhne se equity kam hoti hai aur ROE artificially badh jaata hai — quality concern.',
      },
      {
        q: 'Interest coverage 1.2x ka matlab kya hai?',
        options: [
          'Bahut comfortable',
          'EBIT interest ka sirf 1.2 guna — distress risk',
          'Debt zero hai',
          'Interest rate 1.2% hai',
        ],
        answer: 1,
        explain: 'Coverage 1.2x matlab barely covering interest — earnings dip par default risk.',
      },
    ],
    exercise:
      'Do same-industry companies ke ROE, ROCE aur D/E calculate karein. DuPont breakdown karein. Likh kar batao: kaunsi company ki ROE quality better hai aur kyun?',
  },

  /* ================================================================ */
  /* MODULE 4 — Macroeconomics                                        */
  /* ================================================================ */
  'technical-and-fundamental/macroeconomics/inflation-and-interest-rates': {
    objectives: [
      'Inflation ke types aur measurement.',
      'Interest rate ka asset prices par transmission.',
      'Central bank mandate aur tools.',
    ],
    intro:
      'Inflation aur interest rates macro ke do sabse important variables hain. Ye poore market ke discount rate aur valuations ko affect karte hain. Is lesson me hum unka mechanism dekhenge.',
    blocks: [
      h('Inflation kya hai'),
      p(
        'Inflation = general price level ka sustained increase. Iska matlab paisa ki purchasing power kam ho rahi hai. Measured CPI (consumer price index) ya WPI (wholesale) se hoti hai.',
      ),
      table(
        ['Type', 'Cause', 'Example'],
        [
          ['Demand-pull', 'Demand supply se zyada', 'Strong growth, easy credit'],
          ['Cost-push', 'Input cost badhna', 'Oil price spike, wages'],
          ['Imported', 'Currency weakness/global prices', 'Crude import cost'],
          ['Core inflation', 'Food/energy excluded', 'Policy ka preferred measure'],
          ['Hyperinflation', 'Extreme currency loss', 'Rare, catastrophic'],
        ],
      ),
      h('Interest rate kaise kaam karta hai'),
      p(
        'Central bank policy rate control karta hai (India: RBI repo rate; US: Fed funds rate). Rate badhne par borrowing mehangi hoti hai → consumption/investment kam → demand cooling → inflation kam. Saath hi, discount rate badhne se asset valuations gir sakti hain.',
      ),
      formula(
        'Present value aur rates',
        'PV = Future cash flow ÷ (1 + r)ⁿ',
        'r badhne par PV girta hai. Long duration assets (growth stocks, long bonds) zyada sensitive hote hain kyunki unke cash flows door future me hain.',
      ),
      callout(
        'info',
        'Real vs nominal',
        'Real rate = nominal rate − inflation. Agar nominal rate 6% hai aur inflation 7%, real rate −1% hai (negative). Negative real rates gold aur risk assets ke liye supportive hote hain historically. Ye relationship context-dependent hai, mechanical law nahi.',
      ),
      h('Central banks'),
      terms([
        { term: 'RBI', meaning: 'Reserve Bank of India — monetary policy, currency, banking regulation. MPC (Monetary Policy Committee) repo rate decide karti hai.' },
        { term: 'Federal Reserve', meaning: 'US central bank. FOMC 8 baar saal me rate decisions leti hai.' },
        { term: 'Repo rate (India)', meaning: 'RBI banks ko short-term loan kis rate par deti hai — policy rate ka main signal.' },
        { term: 'CRR / SLR', meaning: 'Cash reserve aur statutory liquidity ratios — liquidity control tools.' },
        { term: 'QE / QT', meaning: 'Quantitative easing/tightening — asset purchases/sales se liquidity inject/withdraw.' },
      ]),
      h('Transmission chain'),
      olist([
        'Policy rate change.',
        'Money market rates aur bond yields adjust.',
        'Bank lending rates (loans, mortgages) adjust.',
        'Consumption aur investment decisions change.',
        'Corporate earnings aur valuations adjust.',
        'Currency aur capital flows react.',
      ]),
      callout(
        'warn',
        'Rate cuts = market up — ye simple rule galat hai',
        'Rate cut usually growth worry ke saath aata hai. Kabhi rate cut par market gira hai kyunki recession fear dominate kar gaya. Isliye "rate cut = buy" ek oversimplification hai. Reaction context par depend karta hai: cut ka reason kya tha?',
      ),
    ],
    summary: [
      'Inflation purchasing power ka erosion hai; CPI se measure hoti hai.',
      'Demand-pull aur cost-push inflation ke drivers alag hote hain.',
      'Rate badhne se discount rate badhta hai aur valuations pressured hote hain.',
      'Real rate = nominal − inflation.',
      'RBI aur Fed monetary policy ke key institutions hain.',
    ],
    mistakes: [
      'Rate cut ko automatic bullish samajhna.',
      'Nominal rate ko real rate samajhna.',
      'Food/energy volatile components par policy reaction assume karna.',
    ],
    keyPoints: [
      'Rates sab asset classes ke discount rate ko affect karte hain.',
      'Real rates important hain, nominal nahi.',
      'Rate decisions ka "reason" reaction se zyada important hai.',
    ],
    quiz: [
      {
        q: 'Nominal rate 6%, inflation 7%. Real rate kya hai?',
        options: ['13%', '−1%', '1%', '6%'],
        answer: 1,
        explain: 'Real rate = 6 − 7 = −1%. Negative real rates matlab lending effectively reward nahi kar rahi.',
      },
      {
        q: 'Rate badhne par long-duration assets zyada kyun girti hain?',
        options: [
          'Kyunki unka dividend zyada hota hai',
          'Kyunki unke cash flows door future me hain, discounting ka asar zyada',
          'Kyunki wo illiquid hote hain',
          'Kyunki unka tax rate zyada hai',
        ],
        answer: 1,
        explain: 'PV = CF ÷ (1+r)^n — door ke cash flows rate changes par zyada sensitive hote hain.',
      },
      {
        q: 'RBI ka main policy rate kaunsa hai?',
        options: ['CRR', 'Repo rate', 'SLR', 'Prime lending rate'],
        answer: 1,
        explain: 'Repo rate main policy signal hai; CRR/SLR liquidity tools hain.',
      },
    ],
    exercise:
      'Pichhle 5 saal ka India CPI inflation aur repo rate data (public source) collect karein. Ek table banayein. Likh kar batao: kya rate decisions inflation ke saath consistent the? Kya market ne reaction diya?',
  },

  'technical-and-fundamental/macroeconomics/growth-employment-and-cycles': {
    objectives: [
      'GDP aur growth measurement.',
      'Employment data ka market relevance.',
      'Economic cycle ke phases aur sector rotation.',
    ],
    intro:
      'Growth aur employment macro ke "real economy" indicators hain. Ye batate hain ki demand kaisi hai aur companies ke earnings ka environment kya hai.',
    blocks: [
      h('GDP'),
      formula(
        'GDP (expenditure method)',
        'GDP = C + I + G + (X − M)\nC=consumption, I=investment, G=govt spending, X=exports, M=imports',
        'Real GDP inflation-adjusted hota hai; nominal GDP nahi.',
      ),
      table(
        ['Measure', 'Meaning', 'Caveat'],
        [
          ['Real GDP growth', 'Inflation-adjusted output growth', 'Quarterly, revised multiple times'],
          ['Nominal GDP', 'Current prices', 'Inflation se inflated'],
          ['GDP per capita', 'Output per person', 'Distribution ignore karta hai'],
          ['PMI', 'Purchasing managers index (survey)', 'Leading indicator, diffusion index'],
          ['IIP', 'Industrial production', 'Manufacturing focus'],
        ],
      ),
      callout(
        'info',
        'PMI kyun leading hai',
        'PMI ek survey hai — purchasing managers se poochha jaata hai ki orders, production, employment badhe ya ghate. 50 se upar = expansion, neeche = contraction. Ye "hard data" se pehle aata hai isliye leading indicator maana jaata hai. Par survey hai — sentiment-driven.',
      ),
      h('Employment data'),
      list([
        '**US NFP (Non-Farm Payrolls)** — monthly jobs added. Market-moving.',
        '**Unemployment rate** — % of labour force without work.',
        '**Wage growth** — inflation pressure ka early signal.',
        '**India CMIE/PLFS data** — employment surveys (frequency aur methodology vary).',
      ]),
      p(
        'Employment "strong" hona always market ke liye achha nahi hota: strong jobs → wage inflation → rate hike expectations → valuations pressured. Isliye "good news is bad news" ka phenomenon hota hai. Context decide karta hai.',
      ),
      h('Economic cycle'),
      diagram(
        'market-cycle',
        'Business cycle phases',
        'Expansion → peak → contraction → trough. Sector leadership rotate karti hai.',
        'A wave-like curve showing four labelled phases: expansion (rising output), peak (flat top), contraction (falling output), and trough (flat bottom), followed by the next expansion. Along the curve, annotations indicate which sectors typically lead in each phase.',
      ),
      table(
        ['Phase', 'Characteristics', 'Typical leadership (historically)'],
        [
          ['Early expansion', 'Rates low, growth recovering', 'Cyclicals, small caps, financials'],
          ['Mid expansion', 'Growth strong, inflation rising', 'Industrials, materials, tech'],
          ['Late expansion', 'Inflation high, rates rising', 'Energy, commodities, defensives'],
          ['Contraction', 'Growth falling, rates cut', 'Defensives (FMCG, pharma, utilities)'],
        ],
      ),
      callout(
        'warn',
        'Sector rotation ko mechanical na samjhein',
        'Ye pattern historical regularities hain, rules nahi. Har cycle different hota hai (COVID, 2008, 2000 — sab different). Rotation frameworks useful mental models hain, timing tools nahi.',
      ),
      h('Recession ke indicators'),
      list([
        'Yield curve inversion (historical, imperfect).',
        'PMI contraction (50 se neeche).',
        'Rising unemployment claims.',
        'Credit spreads widening.',
        'Consumer confidence falling.',
        'Corporate earnings downgrades.',
      ]),
      p(
        'Koi single indicator reliable nahi hai. Multi-indicator approach aur "we might be wrong" mindset zaroori hai. Economists ke recession forecasts historically poor track record rakhte hain — isliye humility essential hai.',
      ),
    ],
    summary: [
      'GDP output measure karta hai; real GDP inflation-adjusted hai.',
      'PMI survey-based leading indicator hai (50 threshold).',
      'Employment strong hona rate expectations ke through market-negative ho sakta hai.',
      'Business cycle phases hain, sector leadership rotate karti hai.',
      'Recession indicators multi-factor hain, koi single reliable nahi.',
    ],
    mistakes: [
      'Ek indicator se recession predict karna.',
      'Sector rotation ko fixed rule samajhna.',
      'Strong jobs data ko always bullish samajhna.',
    ],
    keyPoints: [
      'Growth + inflation + rates ek saath padhein.',
      'Leading vs lagging indicators ka farq.',
      'Humility > forecasting confidence.',
    ],
    quiz: [
      {
        q: 'PMI 50 se neeche kya indicate karta hai?',
        options: ['Expansion', 'Contraction', 'No change', 'Inflation zero'],
        answer: 1,
        explain: 'PMI diffusion index hai: 50 = neutral, neeche = contraction.',
      },
      {
        q: 'Strong US jobs data market ke liye negative kyun ho sakta hai?',
        options: [
          'Kyunki jobs me tax lagta hai',
          'Kyunki wage inflation rate hike expectations badha sakti hai',
          'Kyunki unemployment badh jaata hai',
          'Kyunki companies band ho jaati hain',
        ],
        answer: 1,
        explain: 'Strong labour market → wage pressure → rate expectations up → valuations pressured. "Good news is bad news" phenomenon.',
      },
      {
        q: 'Real GDP aur nominal GDP me farq kya hai?',
        options: [
          'Real inflation-adjusted hai, nominal nahi',
          'Real sirf US me hota hai',
          'Nominal per capita hai',
          'Dono same hote hain',
        ],
        answer: 0,
        explain: 'Real GDP inflation remove karta hai — actual output growth measure.',
      },
    ],
    exercise:
      'India ka 10 saal ka real GDP growth aur NIFTY ka annual return collect karein. Ek table banayein. Likh kar batao: kya GDP growth aur market return correlate karte hain? Kahan divergence tha?',
  },

  'technical-and-fundamental/macroeconomics/policy-and-currencies': {
    objectives: [
      'Monetary vs fiscal policy ka farq.',
      'Currency movement ke drivers.',
      'Policy ka equity aur currency par combined effect.',
    ],
    intro:
      'Monetary policy central bank chalata hai (rates, liquidity); fiscal policy government chalati hai (tax, spending). Dono milkar macro environment banate hain. Aur currency dono ka reflection hai.',
    blocks: [
      h('Monetary policy'),
      table(
        ['Tool', 'Mechanism', 'Effect'],
        [
          ['Policy rate', 'Borrowing cost', 'Demand, valuations'],
          ['CRR', 'Bank reserve requirement', 'Liquidity'],
          ['Open market operations', 'Bond buying/selling', 'Liquidity, yields'],
          ['Forward guidance', 'Communication', 'Expectations'],
          ['QE/QT', 'Asset purchase/sale', 'Long yields, risk appetite'],
        ],
      ),
      h('Fiscal policy'),
      list([
        'Government spending (infrastructure, subsidies, defence).',
        'Taxation (corporate, personal, GST).',
        'Borrowing (fiscal deficit) — bond supply badhata hai.',
        'Deficit financing — yields par pressure.',
      ]),
      p(
        'Fiscal expansion (spending badhana) growth ko support karti hai par bond supply badhne se yields badh sakte hain. Isliye "stimulus = market up" simple nahi hai — depends on financing aur inflation impact.',
      ),
      h('Currency ke drivers'),
      table(
        ['Factor', 'Currency effect (usually)'],
        [
          ['Higher interest rates', 'Stronger (yield differential)'],
          ['Higher inflation', 'Weaker (purchasing power erosion)'],
          ['Strong growth', 'Stronger'],
          ['Current account deficit', 'Weaker (imports > exports)'],
          ['Capital inflows (FDI/FPI)', 'Stronger'],
          ['Risk-off global sentiment', 'EM currencies weaker'],
          ['Central bank intervention', 'Depends on direction'],
        ],
      ),
      callout(
        'warn',
        'Currency aur equity ka relation one-way nahi hai',
        'Rupee weak hona exporters ke liye positive (IT, pharma) aur importers ke liye negative (oil marketing, aviation) hota hai. Isliye "currency weak = market down" galat hai — sector mix important hai. NIFTY me IT ka bada weight hai, isliye rupee depreciation sometimes index ke liye supportive hoti hai.',
      ),
      h('Policy ka combination matrix'),
      table(
        ['Monetary', 'Fiscal', 'Typical environment'],
        [
          ['Easy', 'Loose', 'Most stimulative — risk assets supportive'],
          ['Easy', 'Tight', 'Mixed — growth vs inflation tension'],
          ['Tight', 'Loose', 'Yields pressured — bond vigilantes'],
          ['Tight', 'Tight', 'Restrictive — valuations pressured'],
        ],
      ),
      example(
        'Policy transmission example',
        'Inflation high hai. RBI repo rate badhati hai. Short yields badhte hain. Bank lending rates badhti hain. Home loan EMIs badhti hain → consumption slow. Corporates ka interest cost badhta hai → margins pressured. Equity valuations compress (higher discount rate). Rupee supports (higher yields), par growth worries dominate kar sakti hain. Ye chain 6-18 mahine me fully transmit hoti hai — instant nahi.',
        [
          'Policy change instant, transmission slow.',
          'Multiple channels: credit, currency, valuation.',
          'Effect 6-18 months me materialise hota hai.',
        ],
      ),
      callout(
        'info',
        'Lag ka importance',
        'Monetary policy ka effect **lag** ke saath aata hai. Isliye jab central bank pause karti hai, market often bottom bana chuka hota hai (kyunki market forward-looking hai). Policy ko "aaj ka news" samajhna galat hai — market expectations ko price karta hai.',
      ),
      h('India specific notes'),
      list([
        'RBI MPC 6 members ki hoti hai, repo rate decide karti hai.',
        'Fiscal deficit target government announce karti hai (Budget).',
        'Current account deficit crude import par sensitive.',
        'FPI flows currency aur equity dono ko affect karte hain.',
        'SEBI market regulation karta hai (RBI monetary).',
      ]),
    ],
    summary: [
      'Monetary policy rates/liquidity control karti hai; fiscal policy tax/spending.',
      'Currency ke multiple drivers hain — rates, inflation, flows, growth.',
      'Currency effect sector-dependent hota hai.',
      'Policy transmission lag ke saath hoti hai (6–18 months).',
      'Policy stance ka combination macro environment decide karta hai.',
    ],
    mistakes: [
      'Currency weak ko blanket market-negative samajhna.',
      'Policy announcement ko instant effect samajhna.',
      'Monetary aur fiscal policy ko mix karna.',
    ],
    keyPoints: [
      'Transmission slow hai — expectations already priced hote hain.',
      'Currency impact sector-specific hai.',
      'Both policies ek saath dekhein.',
    ],
    quiz: [
      {
        q: 'Fiscal policy kaun chalata hai?',
        options: ['Central bank', 'Government (tax/spending)', 'SEBI', 'Exchanges'],
        answer: 1,
        explain: 'Fiscal policy government ki hoti hai; monetary policy central bank ki.',
      },
      {
        q: 'Rupee weak hone se Indian IT sector ko kya fayda?',
        options: [
          'Import sasta hota hai',
          'Export revenue rupee terms me badh jaata hai',
          'Tax rate kam hota hai',
          'Koi asar nahi',
        ],
        answer: 1,
        explain: 'IT exporters dollar revenue kamate hain — rupee depreciation se INR revenue badhta hai.',
      },
      {
        q: 'Monetary policy ka effect kitne time me fully transmit hota hai?',
        options: ['Instantly', '1–2 din', '6–18 mahine', '10 saal'],
        answer: 2,
        explain: 'Credit, currency aur valuation channels ke through transmission 6–18 months le sakti hai.',
      },
    ],
    exercise:
      'Ek scenario likhein: inflation 7%, growth slowing, rupee weak. RBI kya karegi? Equity, bonds aur currency par kya asar ho sakta hai? Sector-wise impact note karein (exporters vs importers).',
  },
};
