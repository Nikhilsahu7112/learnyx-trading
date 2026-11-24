import type { LessonBodyRegistry } from './builder';
import { callout, diagram, example, formula, h, list, olist, p, sub, table, terms } from './builder';

export const level2: LessonBodyRegistry = {
  /* ================================================================ */
  /* MODULE 1 — Chart Fundamentals                                    */
  /* ================================================================ */
  'technical-analysis/chart-fundamentals/what-is-a-price-chart': {
    objectives: [
      'Price chart kya represent karta hai.',
      'OHLC ka concept aur uska meaning.',
      'Chart ko "time vs price" plane samajhna.',
    ],
    intro:
      'Chart ek x-ray hai — price history ka visual compression. Har candle ke andar hazaron trades hote hain. Chart un sab ko 4 numbers me summarize karta hai: open, high, low, close (OHLC). Is lesson me hum chart ko fundamentally samjhenge.',
    blocks: [
      h('Chart ka basic structure'),
      parts(),
      p(
        'X-axis **time** hai, y-axis **price** hai. Har "point" ek time interval ka summary hai. Daily chart par har candle ek din represent karti hai; 15-min chart par har candle 15 minutes. Ye interval **timeframe** kehlata hai.',
      ),
      h('OHLC'),
      terms([
        { term: 'Open', meaning: 'Us interval ka pehla traded price.' },
        { term: 'High', meaning: 'Us interval ka sabse zyada price.' },
        { term: 'Low', meaning: 'Us interval ka sabse kam price.' },
        { term: 'Close', meaning: 'Us interval ka aakhri traded price — sabse important number.' },
        { term: 'Volume', meaning: 'Us interval me kitne shares/contracts trade hue.' },
      ]),
      callout(
        'info',
        'Close kyun sabse important hai',
        'Technical analysis ke zyaadatar calculations (moving average, RSI, MACD) close price par based hote hain. Kyunki close din ka "final verdict" hai — us poore interval ka net result. High/low extremes important hain par noisy; close structural information deta hai.',
      ),
      h('Time vs price plane'),
      p(
        'Chart me horizontal moves = time (jab kuch nahi ho raha), vertical moves = price (jab move ho raha hai). Ek long flat line ka matlab "consolidation" hai — market ne time spent kiya, price nahi badla. Teekhi vertical moves ka matlab "fast repricing". Ye distinction analysis ka core hai.',
      ),
      example(
        'Ek daily candle ka data',
        'Monday: Open ₹100, High ₹108, Low ₹98, Close ₹105, Volume 2,00,000. Interpretation: din ke shuru me ₹100 se open, ₹98 tak gira, phir ₹108 tak gaya, aur ₹105 par band hua. Close > open matlab bullish day. Par high ₹108 se close ₹105 par hai — matlab top par selling aa gayi. Ye "rejection at high" ka context hai.',
        [
          'Range = High − Low = 108 − 98 = ₹10.',
          'Body = |Close − Open| = |105 − 100| = ₹5.',
          'Upper wick = High − max(Open, Close) = 108 − 105 = ₹3.',
          'Lower wick = min(Open, Close) − Low = 100 − 98 = ₹2.',
          'Body range ka 50% — indecisive day with rejection at highs.',
        ],
      ),
      h('Chart par kaunse elements hote hain'),
      list([
        '**Price series** — candles/bars/line.',
        '**Volume pane** — separately at bottom.',
        '**Price scale** — right side, auto-scaled.',
        '**Time scale** — bottom axis.',
        '**Crosshair** — hover par price/time read karne ke liye.',
        '**Overlays** — moving averages, VWAP, Bollinger Bands.',
        '**Oscillator panes** — RSI, MACD separate panel me.',
      ]),
      callout(
        'warn',
        'Chart = past data, future nahi',
        'Chart historical trades ka record hai. Ye pattern ki probability suggest kar sakta hai, guarantee nahi. Jo log "chart batata hai price yahan jaayega" kehte hain, wo uncertainty ko under-estimate kar rahe hain. Tool ki limitation ko accept karna hi professional behaviour hai.',
      ),
      sub('Learning Lab connection'),
      p(
        'Learnyx Trading Lab ka **Chart Explorer** exactly isi concept par bana hai — real historical sample data par candlesticks, line chart, volume aur crosshair ke saath. Wahan jaakar OHLC compare karein: same data, different chart types. Ye aapke foundation ko strong karega.',
      ),
    ],
    summary: [
      'Chart time vs price ka visual record hai.',
      'OHLC: open, high, low, close — har interval ka summary.',
      'Close sabse important number hai kyunki indicators usi par based hote hain.',
      'Horizontal moves = time spent; vertical moves = repricing.',
      'Chart probability suggest karta hai, guarantee nahi.',
    ],
    mistakes: [
      'High/low ko close se zyada important samajhna.',
      'Chart ko predictive device samajhna.',
      'Volume pane ignore karna.',
    ],
    keyPoints: [
      'OHLC = historical trade summary.',
      'Body aur wick ke proportions sentiment ke clues dete hain.',
      'Chart = evidence, not forecast.',
    ],
    quiz: [
      {
        q: 'OHLC me kaunsa number sabse zyada important maana jaata hai?',
        options: ['Open', 'High', 'Low', 'Close'],
        answer: 3,
        explain: 'Close interval ka final result hai aur zyaadatar indicators usi par calculate hote hain.',
      },
      {
        q: 'Open ₹100, High ₹108, Low ₹98, Close ₹105. Upper wick kitna hai?',
        options: ['₹3', '₹5', '₹7', '₹10'],
        answer: 0,
        explain: 'Upper wick = High − max(Open, Close) = 108 − 105 = ₹3.',
      },
      {
        q: 'Long horizontal price move ka kya matlab hai?',
        options: [
          'High volatility',
          'Consolidation — time spent without price change',
          'Volume zero hai',
          'Chart galat hai',
        ],
        answer: 1,
        explain: 'Horizontal movement = time ka passing without repricing. Ye consolidation ka visual hai.',
      },
    ],
    exercise:
      'Trading Lab ka Chart Explorer kholein. Daily aur 15-minute timeframe me same stock dekhein. Likh kar batao: same period me kitni daily candles hain vs 15-min candles, aur kya information 15-min chart me extra dikhti hai jo daily me nahi?',
  },

  'technical-analysis/chart-fundamentals/chart-types-compared': {
    objectives: [
      'Line, bar aur candlestick charts ke differences.',
      'Har chart type ke advantages aur disadvantages.',
      'Kab kaunsa chart useful hai.',
    ],
    intro:
      'Same data, teen visualisations. Line chart simple hai, candlestick detailed. Bar chart purana hai par still useful. Ye choice personal preference se zyada **information density** ka trade-off hai.',
    blocks: [
      h('Line chart'),
      p(
        'Sirf close prices ko line se connect karta hai. Sabse clean aur fast. Par isme intraday extremes (high/low) chhup jaate hain — aapko ye pata nahi chalta ki din ke andar kitni volatility thi.',
      ),
      table(
        ['Pros', 'Cons'],
        [
          ['Extremely clear, low cognitive load', 'High/low ka information nahi'],
          ['Fast rendering, large data ke liye ideal', 'Gaps/rejections dikhte nahi'],
          ['Trend identification easy', 'Pattern analysis limited'],
        ],
      ),
      h('Bar chart (OHLC bars)'),
      p(
        'Vertical line high se low tak, left tick open, right tick close. Candlestick ka precursor. Information same hai par visually candles se kam intuitive.',
      ),
      h('Candlestick chart'),
      p(
        'Body open-close ke beech, wicks high-low tak. Colour body direction batata hai. Detailed aur intuitive, isliye modern analysis ka standard.',
      ),
      diagram(
        'candles',
        'Candlestick anatomy',
        'Body = open to close. Wicks = high/low extremes. Colour = direction.',
        'A visual with two annotated candles. The bullish candle has a hollow green body from open at the bottom to close at the top, with a thin wick extending above to the high and below to the low. The bearish candle has a filled red body from open at the top to close at the bottom, again with wicks to high and low. Labels mark open, high, low, close on each.',
      ),
      h('Comparison'),
      table(
        ['Feature', 'Line', 'Bar', 'Candlestick'],
        [
          ['Information', 'Close only', 'OHLC', 'OHLC'],
          ['Visual clarity', 'Highest', 'Medium', 'High'],
          ['Pattern analysis', 'Poor', 'Good', 'Best'],
          ['Rendering cost', 'Lowest', 'Medium', 'Medium-high'],
          ['Best for', 'Long-term trend, index overview', 'Traditional analysis', 'Most analysis'],
        ],
      ),
      callout(
        'info',
        'Colour convention',
        'India me green = up, red = down. US/Europe me aksar green/red same, par kuch platforms blue/red ya hollow/filled use karte hain. Learnyx me **green (up) aur red (down)** ke saath shape/position cues bhi hain, taaki colour-blind users ko bhi information mile. Kishō: colour alone par depend nahi karna chahiye.',
      ),
      h('Kab kaunsa use karein'),
      list([
        'Portfolio ka long-term review → line chart (monthly).',
        'Trend structure analysis → candlestick (daily/weekly).',
        'Pattern recognition practice → candlestick (intraday).',
        'Fast scanning multiple stocks → line chart.',
        'Historical research/backtest visualization → line ya bar (data compact).',
      ]),
      callout(
        'warn',
        'Heikin-Ashi ka caveat',
        'Heikin-Ashi candles average price use karte hain — smooth trend dikhte hain par **actual price nahi hoti**. Agar aap Heikin-Ashi par entry/exit level decide karte hain, wo real market price se different ho sakta hai. Ye trend visualisation ke liye achha hai, precise execution levels ke liye nahi.',
      ),
      p(
        'Trading Lab ka Chart Explorer teeno options deta hai — ek hi data par switch karke compare karein. Ye habit banayein: kabhi bhi chart type badal kar dekhein, kyunki different representation different insights deta hai.',
      ),
    ],
    summary: [
      'Line chart sirf close dikhata hai — simple par kam information.',
      'Bar chart OHLC dikhata hai par candles se kam intuitive.',
      'Candlestick chart detailed aur analysis ke liye standard hai.',
      'Colour convention vary karti hai; colour alone par depend na karein.',
      'Heikin-Ashi smoothed hai par actual price nahi.',
    ],
    mistakes: [
      'Line chart par candle pattern dhoondhna.',
      'Heikin-Ashi ko real price samajhna.',
      'Sirf colour par information interpret karna (accessibility issue).',
    ],
    keyPoints: [
      'Chart type = information density choice.',
      'Candlestick = modern standard.',
      'Multiple representations different insights dete hain.',
    ],
    quiz: [
      {
        q: 'Line chart me kya plot hota hai?',
        options: ['High price', 'Open price', 'Close price', 'Average price'],
        answer: 2,
        explain: 'Line chart generally close prices ko connect karta hai — sabse clean representation.',
      },
      {
        q: 'Bar chart me left tick aur right tick kya dikhate hain?',
        options: ['Volume aur price', 'Open aur close', 'High aur low', 'Bid aur ask'],
        answer: 1,
        explain: 'Bar chart me left tick open aur right tick close dikhata hai; vertical line high-low range hai.',
      },
      {
        q: 'Heikin-Ashi candles ka main limitation kya hai?',
        options: [
          'Ye bahut colourful hote hain',
          'Smoothed hote hain, isliye actual traded price nahi dikhate',
          'Sirf crypto me kaam karte hain',
          'Inme volume nahi hota',
        ],
        answer: 1,
        explain: 'Heikin-Ashi averaged values use karta hai — trend visualisation ke liye achha, precise levels ke liye nahi.',
      },
    ],
    exercise:
      'Chart Explorer me ek hi stock ko line, bar aur candlestick me dekhein. 5 observations likhein: kaunsi information har type me clearly dikhi aur kaunsi chhup gayi?',
  },

  'technical-analysis/chart-fundamentals/timeframes-explained': {
    objectives: [
      'Timeframe ke concept aur aggregation.',
      'Multiple timeframe analysis (top-down) ka method.',
      'Timeframe mismatch ke risks.',
    ],
    intro:
      'Ek hi chart par 5-minute aur weekly timeframe bilkul alag kahani sunate hain — aur dono sach hote hain. Ye contradiction nahi, resolution ka farq hai. Timeframe aapke decision ka scale decide karta hai.',
    blocks: [
      h('Timeframe kya hai'),
      p(
        'Timeframe ek aggregation interval hai. 1-minute candle 60 seconds ka data summarize karti hai. 1-hour candle 60 one-minute candles ka summary hai (open = pehla 1-min open, high = max of all 60, low = min, close = last ka close). Data same rehta hai — bas resolution badalta hai.',
      ),
      table(
        ['Timeframe', 'Common use', 'Noise level', 'Holding period'],
        [
          ['1-min / tick', 'Scalping, execution', 'Very high', 'Seconds–minutes'],
          ['5-min / 15-min', 'Intraday', 'High', 'Minutes–hours'],
          ['1-hour', 'Intraday/swing', 'Medium', 'Hours–days'],
          ['Daily', 'Swing trading, active investing', 'Medium-low', 'Days–weeks'],
          ['Weekly', 'Positional, investing', 'Low', 'Weeks–months'],
          ['Monthly', 'Long-term investing', 'Very low', 'Months–years'],
        ],
      ),
      h('Top-down analysis'),
      p(
        'Professional approach: **higher timeframe se start, lower timeframe par execute**. Higher timeframe batata hai "market kahan hai"; lower timeframe batata hai "exact entry kahan hai". Isse aap major trend ke against nahi jaate.',
      ),
      olist([
        '**Step 1 — Monthly/Weekly:** overall trend kya hai? Higher highs/lows ya lower highs/lows?',
        '**Step 2 — Daily:** structure consistent hai? Koi major support/resistance paas me?',
        '**Step 3 — 1H/15min:** entry trigger ka structure. Pullback, BOS, ya consolidation breakout.',
        '**Step 4 — Execute** with stop at invalidation, size from risk.',
      ]),
      example(
        'Timeframe conflict ka example',
        'Weekly: strong uptrend. Daily: uptrend, par resistance ke paas. 15-min: short-term downtrend (pullback). Confusion? Nahi — 15-min downtrend daily uptrend ke andar pullback hai. Higher timeframe bullish hai, isliye lower timeframe par "dip par support ka confirmation" dhoondhna logical hai, short trade nahi (jab tak higher timeframe structure break na ho).',
        [
          'Higher TF = context (direction bias).',
          'Lower TF = execution (timing).',
          'Conflict = pullback, not necessarily reversal.',
          'Reversal tab jab higher TF structure break ho.',
        ],
      ),
      callout(
        'warn',
        'Timeframe shopping ka trap',
        'Agar aapka trade against chal raha hai aur aap ek aisa timeframe dhoondte hain jahan wo sahi lage — ye rationalisation hai, analysis nahi. Pehle decide karein: kis timeframe par aapka invalidation tha? Usi par exit karein.',
      ),
      h('Timeframe mismatch ke practical issues'),
      list([
        'Daily chart par entry li aur 5-min par stop lagaya → noise se stop out.',
        '5-min par entry li aur weekly view se exit plan banaya → holding period mismatch.',
        'Multiple timeframes par lambe indicators → conflicting signals.',
        'Chart timezone aur session timing ka mismatch → "fake" gaps.',
      ]),
      callout(
        'info',
        'Session aur timezone',
        'India ke charts me timezone aksar IST hota hai; US charts ET ya UTC me hote hain. Crypto 24/7 hota hai isliye "daily candle" ka cutoff arbitrary hota hai (usually UTC). Isliye daily candle ka high/low different platforms par different ho sakta hai — ye data error nahi, convention ka farq hai.',
      ),
      p(
        'Practice: Trading Lab me same asset ko 3 timeframes par dekhne ki aadat banayein. Aapko dikhega ki higher timeframe structure lower timeframe par noisy lagta hai — aur ye samajhna hi mature analysis ka start hai.',
      ),
    ],
    summary: [
      'Timeframe aggregation interval hai — data same, resolution alag.',
      'Higher timeframe = context; lower timeframe = execution.',
      'Top-down analysis se trend ke against trade karne se bacha ja sakta hai.',
      'Timeframe conflict often pullback hota hai, reversal nahi.',
      'Entry aur exit ka timeframe match hona chahiye.',
    ],
    mistakes: [
      'Loss hone par favourable timeframe dhoondhna.',
      'Stop ko entry timeframe se bahut chhoti timeframe par rakhna.',
      'Crypto daily candle ko fixed samajhna (24/7 market).',
    ],
    keyPoints: [
      'Higher TF context, lower TF execution.',
      'Timeframe consistency = coherent strategy.',
      'Timezones aur session cutoffs convention-based hain.',
    ],
    quiz: [
      {
        q: 'Top-down analysis me pehle kaunsa timeframe dekhte hain?',
        options: ['1-minute', '5-minute', 'Higher timeframe (weekly/monthly)', 'Koi farq nahi'],
        answer: 2,
        explain: 'Context pehle higher timeframe se aata hai, execution baad me lower timeframe par hoti hai.',
      },
      {
        q: '15-min chart downtrend ho par daily chart strong uptrend — most likely interpretation?',
        options: [
          'Market confused hai',
          'Higher timeframe uptrend ke andar pullback',
          'Daily chart galat hai',
          'Short trade guaranteed hai',
        ],
        answer: 1,
        explain: 'Lower timeframe counter-move higher timeframe trend ke andar pullback hota hai until higher structure breaks.',
      },
      {
        q: 'Daily candle ka high/low different platforms par different kyun ho sakta hai (crypto me)?',
        options: [
          'Kyunki data galat hota hai',
          'Kyunki "day" ka cutoff timezone convention alag hota hai',
          'Kyunki exchanges hack ho gaye hain',
          'Kyunki volume zero hota hai',
        ],
        answer: 1,
        explain: '24/7 markets me day boundary convention hai (usually UTC) — different platforms different cutoff use kar sakte hain.',
      },
    ],
    exercise:
      'Ek stock ko monthly, weekly, daily aur 15-min par ek saath dekhein. Har timeframe ke liye ek line likhein: trend direction aur key level. Phir decide karein — kis timeframe ka view aapka "context" hoga aur kis par entry execute karenge?',
  },

  /* ================================================================ */
  /* MODULE 2 — Candlestick Analysis                                  */
  /* ================================================================ */
  'technical-analysis/candlestick-analysis/candlestick-anatomy': {
    objectives: [
      'Body aur wick ke proportions ka meaning.',
      'Bullish aur bearish candle ka structure.',
      'Candle psychology — buyer vs seller ka result.',
    ],
    intro:
      'Har candle ek chhoti kahani hai: buyers aur sellers ke beech ka ek round. Candle padhna seekhna matlab us round ka score samajhna. Is lesson me hum anatomy ko deeply dekhenge — kyunki saare patterns isi anatomy ka combination hain.',
    blocks: [
      h('Candle ke 3 parts'),
      list([
        '**Body** — open aur close ke beech. Bada body = strong directional conviction.',
        '**Upper wick (shadow)** — high tak. Lamba upper wick = top par selling pressure/rejection.',
        '**Lower wick** — low tak. Lamba lower wick = bottom par buying support.',
      ]),
      diagram(
        'candles',
        'Anatomy aur psychology',
        'Body = conviction. Wicks = rejection. Proportions = story.',
        'Two candles side by side. The left is a bullish candle: body from open (bottom) up to close (top), a short lower wick and a long upper wick, annotated "buyers won early, sellers rejected the high". The right is a bearish candle: body from open (top) down to close (bottom), long lower wick, annotated "sellers won, buyers bought the low".',
      ),
      h('Proportions kya batate hain'),
      table(
        ['Structure', 'Interpretation', 'Caveat'],
        [
          ['Bada body, chhoti wicks', 'Strong conviction, one side dominated', 'Context ke bina pattern nahi hai'],
          ['Chhota body, lambi wicks (both sides)', 'Indecision — dono side rejection', 'Indecision ka matlab direction nahi'],
          ['Bada upper wick', 'Top par sellers active', 'Trend ke according different meaning'],
          ['Bada lower wick', 'Bottom par buyers active', 'Ek candle se reversal confirm nahi hoti'],
          ['Doji (open ≈ close)', 'Balance of power', 'Next candle ka volume important'],
        ],
      ),
      formula(
        'Candle metrics',
        'Range = High − Low\nBody = |Close − Open|\nBody % = Body ÷ Range × 100\nUpper wick = High − max(Open, Close)\nLower wick = min(Open, Close) − Low',
        'Body % se aap decisiveness measure kar sakte hain. 70%+ body = strong candle. 20% se kam = indecision.',
      ),
      example(
        'Do candles, same close, different story',
        'Candle A: O 100, H 108, L 99, C 106. Body = 6, range = 9, body% = 67%. Lower wick 1, upper wick 2. Strong bullish with slight rejection. Candle B: O 100, H 108, L 90, C 106. Body% = 6/18 = 33%. Lower wick 10. Ye volatile day tha — buyers ne pehle bahut gira diya phir recover kiya. Agar ye support ke paas ho to meaningful hai; random jagah par nahi.',
        [
          'Step 1: Range nikaalein (H − L).',
          'Step 2: Body nikaalein (|C − O|).',
          'Step 3: Body% = body ÷ range.',
          'Step 4: Wicks nikaal kar context dekhein — kahan bani hai?',
        ],
      ),
      h('Psychology — kaun jeeta?'),
      p(
        'Bullish candle ka matlab: close open ke upar hai. Par ye bhi ho sakta hai ki open par gap down tha aur din bhar recovery hui — candle bullish dikhegi par trend context bearish ho sakta hai. Isliye **candle ka colour alone kuch nahi batata** — uski position structure me important hai.',
      ),
      callout(
        'warn',
        'Candle colour ko signal na samjhein',
        'Ek green candle ka matlab sirf ye hai ki close > open us interval me. Har green candle bullish signal nahi hoti, aur har red bearish nahi. Context (trend, level, volume) ke bina candle analysis noise hai.',
      ),
      h('Accessibility note'),
      p(
        'Candlestick charts colour-based hote hain, isliye Learnyx me hum **body position** ko bhi describe karte hain (open upar ya neeche). Chart descriptions me hum textual alternative dete hain. Sirf colour par information depend na karna accessibility ka basic principle hai.',
      ),
      p(
        'Trading Lab ka **Candlestick Pattern Trainer** isi anatomy par based hai — wo aapko candle dikha kar pattern identify karne ko kehta hai aur explanation deta hai. Practice ke liye best tool hai.',
      ),
    ],
    summary: [
      'Body open-close range hai; wicks high/low extremes.',
      'Body% decisiveness measure karta hai.',
      'Wicks rejection aur volatility ka story batate hain.',
      'Candle colour alone signal nahi — context zaroori hai.',
      'Saare patterns isi anatomy ke combinations hain.',
    ],
    mistakes: [
      'Ek candle se reversal confirm karna.',
      'Wicks ko ignore karna.',
      'Candle ko level aur trend context ke bina padhna.',
    ],
    keyPoints: [
      'Body = conviction; wicks = rejection.',
      'Body% quantifies decisiveness.',
      'Context ke bina candle meaningless hai.',
    ],
    quiz: [
      {
        q: 'O ₹100, H ₹110, L ₹95, C ₹108. Body% kitna hai?',
        options: ['50%', '53%', '60%', '80%'],
        answer: 1,
        explain: 'Range = 15, body = 8, 8 ÷ 15 = 53.3%.',
      },
      {
        q: 'Lamba upper wick kya indicate karta hai?',
        options: [
          'Buyers ne poora control liya',
          'Top par sellers ne price reject kiya',
          'Volume zero tha',
          'Gap down hua',
        ],
        answer: 1,
        explain: 'Price high tak gaya par close neeche aa gaya — matlab wahan sellers active the.',
      },
      {
        q: 'Ek green candle hamesha bullish signal hoti hai — ye statement…',
        options: [
          'Sach hai',
          'Galat hai — colour sirf close vs open batata hai, context chahiye',
          'Sirf crypto me sach hai',
          'Sirf daily chart par sach hai',
        ],
        answer: 1,
        explain: 'Colour ek basic fact hai. Signal ke liye level, trend aur volume ka context chahiye.',
      },
    ],
    exercise:
      'Chart Explorer me 10 consecutive candles chunein. Har candle ke liye body%, upper wick aur lower wick calculate karein (approximate). Note karein: kis candle ke baad price ne momentum continue kiya aur kis ke baad reversal aaya? Pattern observe karein, conclusion na nikaalein.',
  },

  'technical-analysis/candlestick-analysis/single-candle-patterns': {
    objectives: [
      'Doji, hammer, hanging man, shooting star, inverted hammer, marubozu, spinning top.',
      'Har pattern ka context aur limitation.',
      'Confirmation ka concept.',
    ],
    intro:
      'Single candle patterns candle ke shape se sentiment read karne ki koshish karte hain. Ye descriptions hain, magic nahi. Har pattern ke saath hum ye bhi batayenge ki wo kab fail karta hai — kyunki context ke bina koi pattern kaam nahi karta.',
    blocks: [
      callout(
        'warn',
        'Pehle ye padh lein',
        'Koi bhi candlestick pattern **guarantee** nahi deta ki price kis direction me jaayega. Ye patterns sentiment ka description hain, statistically weak signals hain. Aapko confirmation (volume, level, structure) chahiye, aur stop-loss hamesha chahiye.',
      ),
      h('1. Doji'),
      p(
        'Open aur close lagbhag barabar — body bahut chhoti, dono side wicks. **Meaning:** buyers aur sellers balanced the, kisi ne jeet nahi paayi. **Context:** strong trend ke end me doji exhaustion suggest kar sakta hai; range ke beech me wo noise hai. **Limitation:** doji bahut common hai — akela kuch nahi batata.',
      ),
      table(
        ['Type', 'Shape', 'Interpretation'],
        [
          ['Standard doji', 'Open ≈ close, wicks dono taraf', 'Indecision'],
          ['Long-legged doji', 'Bahut lambi wicks dono taraf', 'Extreme indecision/volatility'],
          ['Gravestone doji', 'Open ≈ close ≈ low, lamba upper wick', 'Top par rejection'],
          ['Dragonfly doji', 'Open ≈ close ≈ high, lamba lower wick', 'Bottom par rejection'],
        ],
      ),
      h('2. Hammer'),
      p(
        'Chhota body top par, lamba lower wick (body ka 2x+). Downtrend ke end me aata hai. **Meaning:** sellers ne price bahut neeche gira diya par buyers ne wapas upar kharid liya — lower prices par demand. **Confirmation:** agli candle ka strong close upar + volume.',
      ),
      h('3. Hanging Man'),
      p(
        'Hammer jaisa hi shape, par **uptrend ke top par** aata hai. **Meaning:** sellers ne lower levels test kiya; buyers ne bachaya par weakness ka pehla signal. **Limitation:** uptrend me ye bahut common hai aur often continuation hota hai. Isliye confirmation mandatory hai.',
      ),
      callout(
        'info',
        'Hammer vs Hanging Man',
        'Shape identical hai — sirf **context** farq karta hai. Downtrend me = hammer (bullish possibility). Uptrend me = hanging man (bearish warning). Yehi baat prove karti hai ki pattern alone kuch nahi hai; position sab kuch hai.',
      ),
      h('4. Shooting Star'),
      p(
        'Chhota body bottom par, lamba upper wick. Uptrend ke top par. **Meaning:** buyers ne upar dhakela, par sellers ne poora reject kar diya. Bearish reversal ka warning. **Limitation:** strong trend me shooting stars multiple baar fail hote hain — trend ke against counter-trend bet lena risky hai.',
      ),
      h('5. Inverted Hammer'),
      p(
        'Shooting star jaisa shape, par **downtrend ke bottom par**. Buyers ne upar try kiya par close neeche raha. **Meaning:** buying pressure ka pehla sign. Weak pattern — confirmation zaroori.',
      ),
      h('6. Marubozu'),
      p(
        'Bahut bada body, almost koi wick nahi. Bullish marubozu: open = low, close = high. **Meaning:** ek side ne poore session control kiya — strong conviction. **Limitation:** news/event ke baad ye common hota hai aur agle din mean-reversion ho sakta hai.',
      ),
      h('7. Spinning Top'),
      p(
        'Chhota body, barabar lambi wicks dono taraf. Doji jaisa par thodi body hai. **Meaning:** indecision. **Use:** trend ke saath ye consolidation ka signal ho sakta hai, standalone signal nahi.',
      ),
      h('Comparison table'),
      table(
        ['Pattern', 'Body', 'Wicks', 'Context', 'Bias (weak)'],
        [
          ['Doji', 'Very small', 'Dono side', 'Trend end', 'Neutral'],
          ['Hammer', 'Small (top)', 'Long lower', 'Downtrend', 'Bullish'],
          ['Hanging man', 'Small (top)', 'Long lower', 'Uptrend', 'Bearish'],
          ['Shooting star', 'Small (bottom)', 'Long upper', 'Uptrend', 'Bearish'],
          ['Inverted hammer', 'Small (bottom)', 'Long upper', 'Downtrend', 'Bullish'],
          ['Marubozu', 'Very large', 'Almost none', 'Any', 'Momentum'],
          ['Spinning top', 'Small', 'Both, similar', 'Any', 'Neutral'],
        ],
      ),
      example(
        'Hammer ka realistic use',
        'Ek stock 3 hafte se gir raha hai. Ek din lamba lower wick wali candle banti hai ek major support zone par, volume average se 1.8x. Agli candle support ke upar close karti hai. Ye ek valid setup hai: entry agle candle ke high ke upar, stop hammer ke low ke neeche, target previous swing high. Risk-reward check karein — agar 1:2 se kam hai, trade skip karein.',
        [
          'Context: downtrend + support zone (pattern alone kaafi nahi).',
          'Shape: lower wick ≥ 2× body.',
          'Volume: above average (confirmation).',
          'Entry: next candle break above hammer high.',
          'Stop: below hammer low.',
        ],
      ),
      callout(
        'warn',
        'Pattern ka failure mode',
        'Ek hammer bana, agle din price gira — kya pattern "galat" tha? Nahi. Pattern ne probability shift kiya tha, guarantee nahi di thi. Aapka stop hit hona normal business hai. Jo log pattern fail hone par "market manipulates" kehte hain, wo probability ko samajh nahi rahe.',
      ),
      p(
        'Practice: **Candlestick Pattern Trainer** me ye patterns repeatedly identify karein. Pattern recognition muscle memory ban jaati hai — par sirf recognition, prediction nahi.',
      ),
    ],
    summary: [
      'Single candle patterns sentiment ka description hain, guarantee nahi.',
      'Doji = indecision; hammer/shooting star = rejection.',
      'Hammer aur hanging man shape me same hain — context se farq padta hai.',
      'Marubozu strong conviction dikhata hai.',
      'Confirmation (volume, level, next candle) ke bina pattern weak hai.',
    ],
    mistakes: [
      'Pattern ko akela trade signal samajhna.',
      'Trend ke against counter-trend pattern par bada bet.',
      'Pattern fail hone par strategy blame karna.',
    ],
    keyPoints: [
      'Same shape, different context = different meaning.',
      'Rejection wicks location ke saath meaningful hote hain.',
      'Pattern = probability context, not a signal.',
    ],
    quiz: [
      {
        q: 'Hammer aur hanging man me main difference kya hai?',
        options: [
          'Colour',
          'Wick ki length',
          'Context — downtrend vs uptrend',
          'Volume',
        ],
        answer: 2,
        explain: 'Shape same hota hai; downtrend me hammer, uptrend me hanging man kehlata hai.',
      },
      {
        q: 'Shooting star ka shape kaisa hota hai?',
        options: [
          'Chhota body top par, lamba lower wick',
          'Chhota body bottom par, lamba upper wick',
          'Bada body, koi wick nahi',
          'Open = close = high',
        ],
        answer: 1,
        explain: 'Shooting star me chhota body neeche aur lamba upper wick hota hai — top par rejection.',
      },
      {
        q: 'Marubozu ka matlab kya hai?',
        options: [
          'Indecision',
          'Strong conviction — ek side ne poora session control kiya',
          'Gap down',
          'Volume zero',
        ],
        answer: 1,
        explain: 'Marubozu me body poori range hoti hai (almost no wicks) — ek dominant side.',
      },
    ],
    exercise:
      'Pattern Trainer me 20 questions complete karein. Apna score note karein. Phir Chart Explorer me 3 hammers/similar candles dhoondein aur likhein: unke baad kya hua, aur kya context (support/resistance/trend) ne difference banaya?',
  },

  'technical-analysis/candlestick-analysis/double-candle-patterns': {
    objectives: [
      'Engulfing, harami, tweezer patterns ka structure.',
      'Do-candle confirmation logic.',
      'Pattern ke trap — inside bar aur false signal.',
    ],
    intro:
      'Do-candle patterns ek candle se zyada information dete hain kyunki wo sequence dikhate hain — pehle kya hua, phir kya badla. Ye "reversal ka pehla evidence" hain, guarantee nahi.',
    blocks: [
      h('1. Bullish Engulfing'),
      p(
        'Pehli candle bearish (red), doosri bullish (green) jo pehli ki body ko poora cover karti hai (open ≤ previous close, close ≥ previous open). **Meaning:** buying pressure ne pichhle din ki selling ko completely overwhelm kiya. **Context:** downtrend ke end me meaningful. **Limitation:** ek bade gap ke baad common, aur strong downtrend me multiple engulfings fail hote hain.',
      ),
      h('2. Bearish Engulfing'),
      p(
        'Pehli bullish, doosri bearish jo poora body cover karti hai. **Meaning:** sellers ne control liya. **Context:** uptrend ke top par meaningful.',
      ),
      h('3. Harami (inside bar)'),
      p(
        'Doosri candle ki poori range pehli candle ke andar hoti hai — "pregnant" pattern. **Meaning:** volatility contraction, momentum pause. **Trap:** harami **trend continuation ka bhi signal** ho sakta hai, reversal ka nahi. Strong trend me inside bar often continuation hota hai (consolidation ke baad resume).',
      ),
      callout(
        'info',
        'Harami ka dual nature',
        'Traditional books harami ko reversal pattern batate hain. Reality me ye volatility contraction hai — jo trend ke andar continuation ya reversal dono me resolve ho sakta hai. Isliye decide karein: aap higher timeframe trend ke saath trade karenge (continuation) ya against (reversal)? Dono valid hain par risk alag hai.',
      ),
      h('4. Tweezer Bottom'),
      p(
        'Do consecutive candles jinka low lagbhag same hota hai (inverted "tweezers"), pehla bearish aur doosra bullish. **Meaning:** ek level par consistently buyers aa rahe hain — support zone ka confirmation. **Limitation:** "same low" ka definition subjective hai; exact equality rare hai.',
      ),
      h('5. Tweezer Top'),
      p(
        'Do candles jinka high lagbhag same, pehla bullish aur doosra bearish. **Meaning:** resistance par repeated rejection.',
      ),
      h('Comparison'),
      table(
        ['Pattern', 'Structure', 'Bias', 'Context', 'Reliability'],
        [
          ['Bullish engulfing', 'Red then big green covering body', 'Bullish', 'Downtrend end', 'Medium'],
          ['Bearish engulfing', 'Green then big red covering body', 'Bearish', 'Uptrend end', 'Medium'],
          ['Harami', 'Inside bar', 'Neutral/continuation', 'Any', 'Low as reversal'],
          ['Tweezer bottom', 'Same low, red → green', 'Bullish', 'Support', 'Medium'],
          ['Tweezer top', 'Same high, green → red', 'Bearish', 'Resistance', 'Medium'],
        ],
      ),
      diagram(
        'candles',
        'Bullish engulfing sequence',
        'Pehli red candle ki body ko doosri green candle poora cover karti hai.',
        'Two candles: a small red bearish candle followed by a much larger green bullish candle whose body opens at or below the red candle close and closes at or above the red candle open, visually engulfing the prior body. Wicks of both are short.',
      ),
      example(
        'Engulfing ka valid setup',
        'Ek stock downtrend me ₹480 par major support tak girta hai. Ek red candle banti hai chhoti body ke saath, phir agli din green candle usse zyada range me close karti hai support ke upar, volume 2.1x average. Entry next candle ke high ke upar; stop engulfing candle ke low ke neeche; target ₹520 (previous swing high). Risk = ₹9, reward = ₹28 → 1:3. Ye structured trade hai.',
        [
          'Level: major support.',
          'Pattern: bullish engulfing.',
          'Confirmation: volume expansion + close above support.',
          'Entry/stop/target defined, R:R 1:3.',
          'Agar stop hit hua, small loss; agar target mila, 3R gain.',
        ],
      ),
      h('Key takeaway — patterns ka hierarchy'),
      olist([
        'Candle shape (evidence)',
        'Location in structure (context)',
        'Volume (participation)',
        'Higher timeframe agreement (alignment)',
        'Risk-reward (trade quality)',
      ]),
      p(
        'Agar pattern pehla hai aur location/volume missing hai, to aapke paas ek statistics ki tarah weak evidence hai. Agar pattern location + volume ke saath hai, wo ek testable hypothesis ban jaata hai.',
      ),
      callout(
        'warn',
        'Sabse common mistake',
        'Pattern dhoondhne ke liye chart ko scan karna, phir uske hisaab se story banana. Professional process ulta hai: pehle structure aur levels identify karein, phir un levels par pattern ka **confirmation** dhoondein. Pattern-driven scanning hindsight bias ko badhava deta hai.',
      ),
    ],
    summary: [
      'Engulfing patterns momentum shift dikhate hain.',
      'Harami volatility contraction hai — continuation ya reversal dono possible.',
      'Tweezer patterns ek level par repeated rejection ka evidence hain.',
      'Pattern ka meaning location aur volume se aata hai.',
      'Process: levels pehle, pattern confirmation baad me.',
    ],
    mistakes: [
      'Harami ko always reversal samajhna.',
      'Engulfing ko bade gap ke baad blindly trade karna.',
      'Pattern scanning se trade ideas banana.',
    ],
    keyPoints: [
      'Two-candle patterns sequence se sentiment shift dikhate hain.',
      'Location + volume = confirmation.',
      'Harami dual nature ka pattern hai.',
    ],
    quiz: [
      {
        q: 'Bullish engulfing ka structure kya hai?',
        options: [
          'Green candle phir chhoti red candle',
          'Red candle phir badi green candle jo pehli ki body cover karti hai',
          'Do same colour candles',
          'Do doji',
        ],
        answer: 1,
        explain: 'Pehli bearish candle ki body ko doosri bullish candle poora engulf karti hai.',
      },
      {
        q: 'Harami pattern ka dual nature kya hai?',
        options: [
          'Sirf bullish reversal',
          'Volatility contraction — continuation ya reversal dono possible',
          'Sirf bearish continuation',
          'Koi meaning nahi',
        ],
        answer: 1,
        explain: 'Harami = inside bar = contraction. Higher timeframe trend decide karta hai ki continuation hai ya reversal.',
      },
      {
        q: 'Tweezer bottom kya indicate karta hai?',
        options: [
          'Ek level par repeated buying interest',
          'Guaranteed reversal',
          'Volume spike',
          'Gap up',
        ],
        answer: 0,
        explain: 'Same low par do baar rejection buyers ke interest ka evidence hai — guarantee nahi.',
      },
    ],
    exercise:
      'Chart me pichhle 3 mahine me 5 bullish engulfing patterns dhoondein. Har ek ke liye note karein: kya support level par bana, volume average se zyada tha, aur agle 5 candles me kya hua? Win/loss count karein.',
  },

  'technical-analysis/candlestick-analysis/triple-candle-patterns': {
    objectives: [
      'Morning Star ka structure aur logic.',
      'Evening Star ka structure aur logic.',
      'Three-candle patterns ki limitations.',
    ],
    intro:
      'Morning Star aur Evening Star teen candles ka sequence hain jo ek momentum shift ka kahaani batate hain: strong move → exhaustion/indecision → opposite conviction. Ye classic patterns hain par unki reliability context-dependent hai.',
    blocks: [
      h('Morning Star (bullish reversal)'),
      olist([
        '**Candle 1:** Badi bearish candle — strong selling.',
        '**Candle 2:** Chhota body (doji/spinning top jaisi), gap down ke saath — selling ka exhaustion, indecision.',
        '**Candle 3:** Badi bullish candle jo pehli candle ki body ke kam se kam 50% ko cover karti hai.',
      ]),
      diagram(
        'candles',
        'Morning Star sequence',
        'Strong selling → small indecision candle → strong buying. Momentum shift ka narrative.',
        'Three candles in sequence. The first is a large filled red candle downtrend. The second is a small-bodied candle sitting near or below the first candle low, sometimes with wicks both sides. The third is a large green candle closing well into the first candle body.',
      ),
      p(
        '**Logic:** pehli candle strong selling. Doosri candle me selling ruk gayi (chhota body). Teesri candle me buyers ne aggressive control liya. Ye sequence "momentum ne direction badli" ka evidence hai.',
      ),
      h('Evening Star (bearish reversal)'),
      olist([
        '**Candle 1:** Badi bullish candle — strong buying.',
        '**Candle 2:** Chhota body, gap up ke saath — buying exhaustion.',
        '**Candle 3:** Badi bearish candle jo pehli ki body ke 50%+ cover karti hai.',
      ]),
      h('Comparison'),
      table(
        ['Feature', 'Morning Star', 'Evening Star'],
        [
          ['Direction', 'Bullish reversal', 'Bearish reversal'],
          ['Context', 'Downtrend end / support', 'Uptrend end / resistance'],
          ['Candle 1', 'Badi red', 'Badi green'],
          ['Candle 2', 'Chhoti body, gap down', 'Chhoti body, gap up'],
          ['Candle 3', 'Badi green, 50%+ penetration', 'Badi red, 50%+ penetration'],
          ['Reliability', 'Medium (support par better)', 'Medium (resistance par better)'],
        ],
      ),
      example(
        'Morning Star ka realistic analysis',
        'Downtrend me support zone par: (Day 1) badi red candle volume 1.5x. (Day 2) doji with gap down, low volume — selling exhaustion. (Day 3) badi green candle, volume 2.5x, close day-1 body ke 60% par. Ye textbook Morning Star hai. Par alternate reading: ye teen candles ek "V-bottom" bounce bhi ho sakta hai jo resistance par fail ho jaaye. Isliye entry ke saath stop (day-2 low ke neeche) aur defined target zaroori hai.',
        [
          'Context: support + downtrend exhaustion.',
          'Day 2 volume low = exhaustion signal.',
          'Day 3 volume high = fresh buying.',
          'Trade: entry above day-3 high, stop below day-2 low.',
          'Confirmation: agla candle day-2 low hold kare.',
        ],
      ),
      callout(
        'warn',
        'Gap ki caveat',
        'Classic definitions me "gap" zaroori hai, par India me gaps aksar nahi hote (continuous session). Isliye modern practice gap ko optional maanti hai aur body/volume pattern par zyada focus karti hai. Aapko "textbook" ke chakkar me zyada setups miss ho sakte hain — criteria practical rakhein.',
      ),
      h('Star patterns kyun fail hote hain'),
      list([
        'Strong trend me counter-trend reversal patterns jaldi fail hote hain.',
        'Support/resistance ke bahar bane stars low-probability hote hain.',
        'Volume confirmation ke bina ye sirf shape hain.',
        'Teen candles ka "lag" hota hai — entry late milti hai aur stop wide hota hai.',
        'News-driven reversal ke baad agla din reverse ho sakta hai.',
      ]),
      callout(
        'info',
        'Better approach — "area of interest" model',
        'Star pattern ke bharose rehne ke bajaye: pehle **area of interest** identify karein (major S/R zone), phir us area par **reaction** ka wait karein (candle-based evidence), phir **structure** se confirm karein (higher low/break of structure). Pattern sirf ek evidence hai, poori thesis nahi.',
      ),
    ],
    summary: [
      'Morning Star three-candle bullish reversal pattern hai: red → small body → green.',
      'Evening Star ulta hai: green → small body → red.',
      'Context (S/R, volume) pattern se zyada important hai.',
      'Gaps India jaise continuous markets me optional maane jaate hain.',
      'Teen-candle patterns late entry aur wide stop dete hain.',
    ],
    mistakes: [
      'Gap ki absence par pattern ko reject karna.',
      'Volume ignore karke pattern trade karna.',
      'Star pattern ko akela support/resistance ki jagah samajhna.',
    ],
    keyPoints: [
      'Star = exhaustion + reversal evidence in three candles.',
      'Support/resistance par ye patterns zyada meaningful hote hain.',
      'Pattern sirf ek evidence layer hai.',
    ],
    quiz: [
      {
        q: 'Morning Star ka correct sequence kya hai?',
        options: [
          'Green → small body → red',
          'Red → small body → green',
          'Red → red → green',
          'Green → green → red',
        ],
        answer: 1,
        explain: 'Badi bearish candle, chhoti body (exhaustion), phir badi bullish candle.',
      },
      {
        q: 'Evening Star kis context me zyada meaningful hai?',
        options: [
          'Support par',
          'Resistance/uptrend end par',
          'Kisi bhi random jagah',
          'Zero volume par',
        ],
        answer: 1,
        explain: 'Evening Star bearish reversal hai — resistance/uptrend end par meaningful.',
      },
      {
        q: 'India jaise markets me Star pattern ke liye gap zaroori hai?',
        options: [
          'Haan, warna pattern invalid hai',
          'Nahi — modern practice me gap optional hai, body aur volume zyada important hain',
          'Sirf options market me zaroori hai',
          'Sirf weekly charts par zaroori hai',
        ],
        answer: 1,
        explain: 'Continuous sessions me gaps kam hote hain; practical criteria body/volume par based honi chahiye.',
      },
    ],
    exercise:
      'Pichhle 6 mahine me 4 Morning Star ya Evening Star patterns dhoondein (daily chart). Har ek ka result note karein: kya uske baad 5-10 candles me trend change hua? Apna win rate calculate karein — ye aapki pehli mini backtest hai.',
  },

  /* ================================================================ */
  /* MODULE 3 — Trend Analysis                                        */
  /* ================================================================ */
  'technical-analysis/trend-analysis/trend-structure-basics': {
    objectives: [
      'Uptrend, downtrend aur sideways ki objective definition.',
      'Higher highs/lows vs lower highs/lows.',
      'Trend ki strength aur weakness identify karna.',
    ],
    intro:
      'Trend ka matlab "price upar ja rahi hai" se zyada hai. Trend ek **structural sequence** hai — highs aur lows ka pattern. Isse aap objectively decide kar sakte hain ki trend kya hai, apni feeling ke bharose nahi.',
    blocks: [
      h('Objective definitions'),
      table(
        ['Trend', 'Structure', 'Interpretation'],
        [
          ['Uptrend', 'Higher highs (HH) + higher lows (HL)', 'Buyers consistently stronger'],
          ['Downtrend', 'Lower highs (LH) + lower lows (LL)', 'Sellers consistently stronger'],
          ['Sideways/range', 'Roughly equal highs/lows', 'Balance; no control'],
        ],
      ),
      diagram(
        'trend',
        'Trend structure',
        'HH/HL = uptrend. LH/LL = downtrend. Equal levels = range.',
        'A zigzag line chart showing three labelled phases: on the left an uptrend with successive higher highs and higher lows marked; in the middle a consolidation where highs and lows are roughly equal; on the right a downtrend with successive lower highs and lower lows marked.',
      ),
      p(
        'Dhyaan dijiye: **ek higher high alone uptrend confirm nahi karta**. Uptrend ke liye sequence chahiye: higher high AND higher low. Agar higher high bana par lower low bhi bana, wo expanding range hai — confusion, trend nahi.',
      ),
      h('Swing points kaise identify karein'),
      olist([
        '**Swing high:** ek high jo apne left aur right ke kuch candles se upar hai.',
        '**Swing low:** ek low jo apne left aur right ke kuch candles se neeche hai.',
        'Lookback period subjective hai (2-5 candles common) — consistency important hai, exact number nahi.',
        'Higher timeframe swing points zyada important hote hain.',
      ]),
      example(
        'Swing identification',
        'Candles: 100, 104, 102, 108, 103, 110, 105, 112. Highs: 100, 104, 108, 110, 112 — sab higher highs. Lows: 100, 102, 103, 105 — sab higher lows. Clear uptrend. Ab agar next sequence aaye: 112 → 107 → 109 → 104, to 104 ne previous low 105 ko break kar diya → structure damaged. Yehi "break of structure" hai.',
        [
          'Step 1: Swing highs mark karein (peaks).',
          'Step 2: Swing lows mark karein (troughs).',
          'Step 3: Sequence check karein — HH+HL ya LH+LL?',
          'Step 4: Agar sequence break ho, trend status "unclear" ho jaata hai.',
        ],
      ),
      h('Trend strength kaise judge karein'),
      list([
        '**Higher highs ki consistency** — har pullback previous high se upar.',
        '**Pullback depth** — shallow pullbacks (23–38%) strong trend dikhate hain.',
        '**Time** — jitna lamba trend, utna mature (exhaustion possible).',
        '**Volume** — trend direction me volume expansion healthy hai.',
        '**Moving average slope** — 50/200 DMA ka angle.',
        '**Breadth** — kitne stocks participate kar rahe hain.',
      ]),
      callout(
        'info',
        'Trend maturity',
        'Har trend ke phases hote hain: early (aggressive), middle (steady), late (parabolic/exhaustion). Late phase me naye entries ka risk-reward kharab hota hai kyunki stop wide hota hai aur reversal probability badhti hai. Ye prediction nahi — position sizing ka consideration hai.',
      ),
      h('Sideways market ka value'),
      p(
        'Sideways market "boring" lagta hai par important hai: ye accumulation ya distribution ka phase ho sakta hai. Range trading me defined support/resistance par entries milti hain, aur range ke bahar breakout ke liye setup banta hai. Range ko ignore karna opportunities ka loss hai.',
      ),
      callout(
        'warn',
        'Trend ko force na karein',
        'Agar structure mixed hai (higher high but lower low), to "trend" declare karne ki koshish na karein. Market ka "unclear" hona ek valid state hai — aur us state me trading ka edge kam hota hai. No-trade zone accept karna professional behaviour hai.',
      ),
    ],
    summary: [
      'Trend ek structural sequence hai: HH+HL ya LH+LL.',
      'Ek higher high alone uptrend confirm nahi karta.',
      'Swing points identify karne ke liye consistent lookback chahiye.',
      'Trend strength pullback depth, volume aur breadth se judge hoti hai.',
      'Sideways market accumulation/distribution ka phase ho sakta hai.',
    ],
    mistakes: [
      'Trend ko sirf ek line ki slope se judge karna.',
      'Swing points randomly mark karna (inconsistency).',
      'Mixed structure me trend force karna.',
    ],
    keyPoints: [
      'Trend = sequence, not a single move.',
      'Shallow pullbacks = strength; deep pullbacks = weakness.',
      'Unclear structure = valid no-trade state.',
    ],
    quiz: [
      {
        q: 'Uptrend ki correct structural definition kya hai?',
        options: [
          'Price upar ja rahi hai',
          'Higher highs aur higher lows',
          'Sirf higher highs',
          'Moving average upar hai',
        ],
        answer: 1,
        explain: 'Uptrend ke liye HH aur HL dono chahiye — sequence important hai.',
      },
      {
        q: 'Shallow pullbacks generally kya indicate karte hain?',
        options: [
          'Weak trend',
          'Strong trend — buyers jaldi aa rahe hain',
          'Reversal guaranteed',
          'Volume zero',
        ],
        answer: 1,
        explain: 'Shallow pullbacks matlab buyers aggressively dip kharid rahe hain — strength ka sign.',
      },
      {
        q: 'Mixed structure (HH + LL) ko kya samajhna chahiye?',
        options: [
          'Strong uptrend',
          'Unclear/expanding range — trend declare na karein',
          'Downtrend confirm',
          'Chart error',
        ],
        answer: 1,
        explain: 'Expanding range ambiguous state hai — koi clear trend nahi, careful rehna chahiye.',
      },
    ],
    exercise:
      'Ek stock ka daily chart lein (6 mahine). Swing highs aur lows manually mark karein. Phir likhein: kitne HH/HL phases the? Kahan sequence toota? Kya us break ne real reversal indicate kiya?',
  },

  'technical-analysis/trend-analysis/trendlines-and-channels': {
    objectives: [
      'Trendline draw karne ke valid rules.',
      'Channel kaise banate hain.',
      'Trendline break ka meaning aur uska misuse.',
    ],
    intro:
      'Trendline ek simple but subjective tool hai. Do points se line banti hai, teesra point use validate karta hai. Is lesson me hum objective rules denge taaki aap random lines na banaayein.',
    blocks: [
      h('Trendline ke basic rules'),
      olist([
        '**Uptrend line:** swing lows ko connect karein, price action ke **neeche**.',
        '**Downtrend line:** swing highs ko connect karein, price action ke **upar**.',
        'Kam se kam **2 touch points** chahiye; 3rd touch se validity badhti hai.',
        'Jitne zyada touches aur jitna bada time span, utni important line.',
        'Wicks ya bodies — consistent rakhein (usually wicks for structure).',
        'Logarithmic scale long-term charts ke liye better hota hai.',
      ]),
      diagram(
        'trend',
        'Trendline aur channel',
        'Lows connect karke support line; highs connect karke resistance line.',
        'A rising price series with a straight line drawn under the swing lows, touching three separate lows, labelled "uptrend support". A parallel line drawn across the swing highs completes a rising channel. A break below the lower line is marked as a potential trend break.',
      ),
      h('Channel'),
      p(
        'Ek trendline ke parallel line doosri side par draw karein — channel ban jaata hai. Price usually channel ke andar oscillate karta hai. Channel boundaries entry/exit ka framework dete hain (lower boundary par buy in uptrend, upper par profit-taking).',
      ),
      callout(
        'warn',
        'Channel ka honest status',
        'Channel "price ko control karta hai" — nahi. Channel ek description hai ki price kis range me move kar raha hai. Jab channel break hota hai, wo information hai, magic nahi. Aur channels ko force-fit karna easy hai (aap aisi lines dhoondh sakte hain jo hindsight me perfect dikhein).',
      ),
      h('Trendline break ka meaning'),
      table(
        ['Break', 'Meaning', 'Caveat'],
        [
          ['Minor intraday break', 'Noise', 'Close basis par confirm karein'],
          ['Break with volume + close beyond', 'Trendline shift — possible trend change', 'Retest ka wait karein'],
          ['Break then immediate reclaim', 'False break / liquidity sweep', 'Common in ranges'],
          ['Break after long trend', 'Exhaustion possibility', 'Trendline ka angle bhi dekhein'],
        ],
      ),
      example(
        'Trendline break ki valid interpretation',
        'Uptrend me 4 touch points wali trendline. Price ne ek candle se neeche break kiya par close neeche nahi hua (wick break) — ignore. Phir ek candle neeche close hui volume 2x ke saath, aur price retest par wapas aaya aur rejection — ab reversal ka evidence zyada hai. Entry retest rejection par, stop trendline ke upar, target previous swing low.',
        [
          'Wick breaks ko ignore karein — close basis dekhein.',
          'Volume confirmation add hoti hai to signal better.',
          'Retest ka behaviour sabse important evidence hai.',
          'Trade sirf defined risk ke saath.',
        ],
      ),
      h('Logarithmic vs linear scale'),
      p(
        'Linear scale me ₹100 se ₹200 ka move same dikhta hai jaise ₹1000 se ₹1100. Logarithmic scale me percentage change represent hota hai. Long-term charts (10+ saal) par log scale better hai kyunki linear scale purane moves ko flatten kar deta hai. Short-term intraday charts me farq negligible hota hai.',
      ),
      callout(
        'info',
        'Trendline automation ki limitation',
        'Software automatically trendlines draw karta hai, par wo different results de sakta hai kyunki "best fit" subjective problem hai. Manual drawing with consistent rules zyada reliable hai — chahe slower ho.',
      ),
      p(
        'Practice tip: Trendline draw karein, phir 5 different lookback settings par test karein. Agar line har setting par bahut badalti hai, wo fragile hai. Robust structure usually multiple settings me dikhta hai.',
      ),
    ],
    summary: [
      'Uptrend line swing lows ko connect karti hai; downtrend line highs ko.',
      'Kam se kam 2 touches, ideally 3+ se validity badhti hai.',
      'Channel parallel line se banta hai aur range ka framework deta hai.',
      'Trendline break close basis par dekhna chahiye.',
      'Long-term charts par log scale better hota hai.',
    ],
    mistakes: [
      'Do random points se line kheench kar trend declare karna.',
      'Wick break ko structural break samajhna.',
      'Channel ko predictive law samajhna.',
    ],
    keyPoints: [
      'Trendline = objective structure tool with subjective drawing rules.',
      'Retest ka behaviour break se zyada evidence deta hai.',
      'Log scale long-term analysis ke liye better hai.',
    ],
    quiz: [
      {
        q: 'Uptrend line kis point set ko connect karti hai?',
        options: ['Swing highs', 'Swing lows', 'Close prices', 'Volume peaks'],
        answer: 1,
        explain: 'Uptrend me support line swing lows ko connect karti hai — price uske upar rehti hai.',
      },
      {
        q: 'Trendline validity ke liye minimum kitne touches chahiye?',
        options: ['1', '2 (ideally 3+)', '10', 'Koi nahi'],
        answer: 1,
        explain: 'Do points se line banti hai, teesra touch use validate karta hai aur significance badhata hai.',
      },
      {
        q: 'Wick se trendline break ho gaya par close neeche nahi hua. Best interpretation?',
        options: [
          'Trend reversed',
          'Likely noise — close basis par confirm karein',
          'Trendline galat thi',
          'Market band ho gaya',
        ],
        answer: 1,
        explain: 'Structural breaks close basis par more reliable hote hain; wick break often liquidity sweep hota hai.',
      },
    ],
    exercise:
      'Ek stock ka daily chart lein. Uptrend line draw karein (2-3 swing lows). Phir dekhein: kitni baar price ne line ko touch kiya? Kya line break hui? Us break ke baad retest hua? Apne observations likhein.',
  },

  'technical-analysis/trend-analysis/trend-confirmation': {
    objectives: [
      'Multi-factor confirmation framework.',
      'Volume, moving average aur breadth ka role.',
      'False trend breaks se kaise bachein.',
    ],
    intro:
      'Ek hi indicator par bharosa karna bada risk hai. Professional approach: multiple independent evidence layers. Is lesson me hum validation framework denge jo aapko overconfidence se bachayega.',
    blocks: [
      h('Confirmation ke 5 layers'),
      olist([
        '**Structure** — HH/HL ya LH/LL sequence intact hai?',
        '**Levels** — price major S/R ke relative kaha hai?',
        '**Volume** — move ke saath participation hai?',
        '**Momentum** — RSI/MACD trend ke saath align hain?',
        '**Higher timeframe** — weekly/daily kya kehta hai?',
      ]),
      table(
        ['Evidence', 'Bullish confirmation', 'Bearish confirmation'],
        [
          ['Structure', 'HH + HL', 'LH + LL'],
          ['Breakout', 'Close above resistance + volume', 'Close below support + volume'],
          ['Moving averages', 'Price above rising 50/200 DMA', 'Price below falling 50/200 DMA'],
          ['Volume', 'Up moves me expansion', 'Down moves me expansion'],
          ['Momentum', 'RSI 50+ trending, MACD positive', 'RSI below 50, MACD negative'],
          ['Breadth', 'Broad participation', 'Narrow participation'],
        ],
      ),
      h('Confirmation scorecard'),
      p(
        'Ek practical method: har trade ke liye 5-point scorecard banayein. Jitne zyada confirmations align hain, utna higher-quality setup. Agar sirf 2/5 confirmations hain, to position size kam karein ya trade skip karein.',
      ),
      example(
        'Scorecard in action',
        'Setup: stock support se bounce kar raha hai. (1) Structure: HH+HL intact ✔ (2) Level: major support zone ✔ (3) Volume: bounce 1.6x average ✔ (4) Momentum: RSI 48 se 55 cross ✔ (5) Higher TF: weekly uptrend ✔. Score 5/5 — high quality. Ab compare: sirf support + hammer, volume flat, momentum weak — score 2/5 — low quality, skip ya micro size.',
        [
          'High score → full planned position size.',
          'Medium score → half size ya better entry ka wait.',
          'Low score → skip. Opportunity cost acceptable hai.',
        ],
      ),
      callout(
        'warn',
        'Confirmation ka trap — analysis paralysis',
        'Zyada layers add karne se aap kabhi trade nahi karenge. 3-5 independent layers kaafi hain. Isse zyada add karna diminishing returns hai. Framework ka purpose **consistency** hai, perfection nahi.',
      ),
      h('False breakouts'),
      p(
        'False breakout tab hota hai jab price resistance ke upar jaata hai, par sustain nahi kar pata aur wapas andar aata hai. Ye "stop hunt" ya genuine lack of demand dono ho sakta hai. Confirm karne ke liye: **close basis** (wick basis nahi), **volume**, aur **retest** ka behaviour.',
      ),
      list([
        'Breakout candle ka close level ke upar hona chahiye.',
        'Volume expansion honi chahiye (boring breakout = suspect).',
        'Retest par level hold kare — ye strongest confirmation hai.',
        'Agar retest par level break ho jaaye, breakout failed.',
      ]),
      callout(
        'info',
        'Multiple timeframe alignment',
        'Weekly bullish + daily bullish + 1H pullback ka end = highest probability setup. Weekly bearish + daily bullish = counter-trend trade, smaller size aur tighter risk chahiye. Alignment = position size ka multiplier.',
      ),
    ],
    summary: [
      'Confirmation multiple independent layers se aati hai.',
      'Structure, levels, volume, momentum aur higher timeframe 5 key layers hain.',
      '3–5 layers kaafi hain; zyada add karne se paralysis hoti hai.',
      'False breakouts ko close, volume aur retest se pehchanein.',
      'Timeframe alignment position size decide karti hai.',
    ],
    mistakes: [
      'Ek indicator par poori conviction rakhna.',
      'Wick-based breakouts ko valid samajhna.',
      'Alignment ke bina full size lena.',
    ],
    keyPoints: [
      'Confirmation = independent evidence layers.',
      'Retest sabse strong confirmation hai.',
      'Scorecard consistency ko enforce karta hai.',
    ],
    quiz: [
      {
        q: 'Breakout confirmation ke liye sabse important cheez kya hai?',
        options: [
          'Intraday wick level ke upar',
          'Close level ke upar + volume + successful retest',
          'RSI 70+',
          'Broker recommendation',
        ],
        answer: 1,
        explain: 'Close basis, volume expansion aur retest ka behaviour strongest confirmation dete hain.',
      },
      {
        q: 'Weekly bearish, daily bullish setup me kya karein?',
        options: [
          'Full size long',
          'Counter-trend trade — smaller size aur tighter risk',
          'Ignore karein hamesha',
          'Double size',
        ],
        answer: 1,
        explain: 'Alignment nahi hai, isliye risk adjust karna chahiye. Counter-trend trades lower probability ke hote hain.',
      },
      {
        q: 'Scorecard me 2/5 confirmations hain. Best action?',
        options: [
          'Full position',
          'Skip ya micro size — setup low quality hai',
          'Double position',
          'Leverage badhayein',
        ],
        answer: 1,
        explain: 'Low confirmation = low quality. Opportunity cost acceptable hai; capital protection priority hai.',
      },
    ],
    exercise:
      'Ek recent setup chunein aur 5-layer scorecard bharein. Score note karein. Phir dekhein ki uske baad kya hua. 10 setups par ye process repeat karein — apna score-to-outcome relation observe karein.',
  },

  /* ================================================================ */
  /* MODULE 4 — Support and Resistance                                */
  /* ================================================================ */
  'technical-analysis/support-and-resistance/support-resistance-zones': {
    objectives: [
      'Support aur resistance ki definition aur psychology.',
      'Zones vs exact lines ka farq.',
      'Zone strength ke factors.',
    ],
    intro:
      'Support wo level hai jahan buyers aggressive ho jaate hain; resistance wo jahan sellers. Par real market me ye levels "lines" nahi, **zones** hote hain — kyunki price exact number ko respect nahi karti.',
    blocks: [
      h('Psychology'),
      diagram(
        'support-resistance',
        'Zones, lines nahi',
        'Support = demand zone. Resistance = supply zone. Role reversal possible hai.',
        'A price chart with two horizontal shaded bands. The lower band is labelled support where price bounces multiple times from above; the upper band is labelled resistance where price is rejected multiple times. An arrow shows a later break above resistance, after which the same band is re-tested from above and labelled "role reversal to support".',
      ),
      list([
        '**Support:** jahan demand supply se zyada ho jaati hai — price girna rukta hai.',
        '**Resistance:** jahan supply demand se zyada — price badhna rukta hai.',
        'Kyun kaam karta hai: **memory + orders**. Logon ne wahan kharida/becha, unke pending orders aur mental levels wahan hain.',
        'Kyun fail hota hai: agar fundamentals/momentum change ho jaaye, to wahan ke saare orders absorb ho jaate hain.',
      ]),
      h('Line vs zone'),
      p(
        'Agar aap ek exact line draw karte hain (jaise ₹500.00), to aapko bahut saare "false breaks" dikhenge kyunki price ₹499 ya ₹502 par bhi jaa sakti hai. Zone approach me aap ₹495–₹505 ka band banate hain — jyada realistic aur fewer false signals.',
      ),
      formula(
        'Zone width ka practical rule',
        'Zone width ≈ (recent average true range) × 0.5 to 1.0\nYa recent volatility ke hisaab se 0.5%–2% of price',
        'Ek ₹1000 stock with ₹20 ATR ke liye zone ≈ ₹10–₹20 wide. Exact numbers se zyada consistency important hai.',
      ),
      h('Zone strength ke factors'),
      table(
        ['Factor', 'Strong zone', 'Weak zone'],
        [
          ['Touch count', '3+ touches', '1 touch'],
          ['Time span', 'Months/years', 'Days'],
          ['Volume at level', 'High volume reactions', 'Low volume drift'],
          ['Candle reaction', 'Strong rejection candles', 'Choppy sideways'],
          ['Confluence', 'Fib + MA + round number', 'Kuch nahi'],
          ['Higher timeframe', 'Weekly level', '1-min level'],
        ],
      ),
      example(
        'Zone identification',
        'Ek stock ne 6 mahine me ₹480–₹490 zone ko 4 baar test kiya. Har baar bounce hua, aur bounce candles ne volume expansion dikhaya. Ye ek strong support zone hai. Ab price ₹485 par hai — ye "in zone" hai. Trading plan: zone ke andar confirmation candle ka wait karein, stop zone ke neeche ₹478, target ₹520 resistance.',
        [
          'Zone: ₹480–₹490 (4 touches, 6 months).',
          'Current: ₹485 — inside zone, no trade yet.',
          'Entry: bullish confirmation within zone.',
          'Stop: below ₹478 (zone invalidation).',
          'Target: next resistance ₹520.',
        ],
      ),
      callout(
        'warn',
        'Zyada zones mat banayein',
        'Agar chart par 15 zones hain, to price har jagah "kisi zone par" hogi — analysis useless. Maximum 3-5 meaningful zones rakhein. Quality > quantity.',
      ),
      h('Round numbers aur psychological levels'),
      p(
        '₹1000, ₹500, ₹100 ya index me 20,000 / 25,000 jaise levels par orders concentrate hote hain kyunki log inhe mentally important maante hain. Ye ek real effect hai, par magical nahi — ek zone ke saath confluence ke roop me use karein, akela nahi.',
      ),
      callout(
        'info',
        'S/R ka statistical reality',
        'Research suggests S/R levels ka effect real hai par small hai — price bounce ki probability baseline se thodi zyada hoti hai, guarantee nahi. S/R ka value risk placement me hai: aapko ek objective invalidation level milta hai jahan aapka idea galat hai.',
      ),
    ],
    summary: [
      'Support = demand zone, resistance = supply zone.',
      'Levels lines nahi, zones hote hain — ranges use karein.',
      'Zone strength touches, time, volume aur confluence se aati hai.',
      'Chart par maximum 3–5 meaningful zones rakhein.',
      'S/R ka biggest value objective invalidation level hai.',
    ],
    mistakes: [
      'Har chhoti reaction ko zone banana.',
      'Exact price line par stop lagana (noise se hit).',
      'S/R ko guarantee samajhna.',
    ],
    keyPoints: [
      'Zones > lines.',
      'Strength = touches + time + volume + confluence.',
      'S/R primarily risk placement ka tool hai.',
    ],
    quiz: [
      {
        q: 'Support zone ka main function kya hai?',
        options: [
          'Price ko rokna guarantee karna',
          'Wo area jahan demand supply se zyada hoti hai — price decline rukta hai',
          'Volume measure karna',
          'Trend line draw karna',
        ],
        answer: 1,
        explain: 'Support demand concentration ka area hai — guarantee nahi, probability context.',
      },
      {
        q: 'Strong zone ke liye best combination kya hai?',
        options: [
          '1 touch, 1 din',
          '3+ touches, lamba time span, high volume reactions',
          'Low volume, no touches',
          'Sirf round number',
        ],
        answer: 1,
        explain: 'Multiple touches + time + volume reactions = strong evidence.',
      },
      {
        q: 'S/R ka sabse valuable practical use kya hai?',
        options: [
          'Price prediction',
          'Objective invalidation level (stop placement)',
          'Volume prediction',
          'Broker selection',
        ],
        answer: 1,
        explain: 'S/R se aapko clear level milta hai jahan aapka idea galat hai — risk management ka base.',
      },
    ],
    exercise:
      'Ek stock ka weekly chart lein. 3 major support aur 3 major resistance zones identify karein. Har zone ke liye touches, time span aur volume reactions note karein. Rank karein — kaunsa zone strongest lagta hai?',
  },

  'technical-analysis/support-and-resistance/dynamic-sr-and-role-reversal': {
    objectives: [
      'Dynamic support/resistance ka concept (moving averages).',
      'Role reversal (support becomes resistance).',
      'Confluence ka practical use.',
    ],
    intro:
      'Static levels fix rehte hain; dynamic levels price ke saath move karte hain. Moving averages sabse common dynamic S/R hain. Is lesson me hum dono ke interaction dekhenge — jo professional charts me sabse zyada useful hai.',
    blocks: [
      h('Dynamic S/R'),
      p(
        'Moving average ek "rolling" support/resistance ki tarah kaam kar sakta hai. Uptrend me price 50 DMA ke upar rehti hai aur pullbacks uske paas bounce hote hain. Ye ek dynamic level hai — roz badalta hai.',
      ),
      list([
        '**Short MAs (9, 20)** — short-term trend ke saath hug karte hain; frequently tested.',
        '**Medium MAs (50)** — swing trend ka common dynamic support.',
        '**Long MAs (100, 200)** — major trend filter aur institutional reference.',
        '**VWAP** — intraday traders ke liye dynamic institutional reference.',
        '**Bollinger bands / Keltner** — volatility-based dynamic boundaries.',
      ]),
      callout(
        'warn',
        'MA "magnet" nahi hai',
        'Log kehte hain "price 200 DMA ko touch karega" — ye prediction nahi hai. MA ek reference level hai; price usse door reh sakti hai jitni der trend strong hai. MA ko target samajhna galat framing hai.',
      ),
      h('Role reversal'),
      p(
        'Jab support break hota hai (convincingly), wo aksar **resistance** ban jaata hai. Kyun? Kyunki jinhone wahan kharida tha unko loss ho raha hai; jab price wapas us level par aata hai, wo breakeven par bechte hain — supply create hoti hai. Isi tarah broken resistance support ban jaata hai.',
      ),
      diagram(
        'support-resistance',
        'Role reversal',
        'Support break hone ke baad wahi level resistance ban jaata hai.',
        'A chart showing price bouncing several times off a support band, then breaking decisively below it. Price later rallies and is rejected exactly at the old support band, now labelled resistance. A subsequent break above that band would repeat the reversal in the other direction.',
      ),
      olist([
        'Support break → retest from below → rejection = new resistance confirmed.',
        'Resistance break → retest from above → hold = new support confirmed.',
        'Retest ka behaviour sabse important evidence hai.',
        'Agar retest level hold nahi karta, breakout failed.',
      ]),
      h('Confluence'),
      p(
        'Confluence ka matlab ek hi area me multiple independent reasons ka overlap hona. Ye setup quality ko genuinely improve karta hai.',
      ),
      example(
        'Confluence zone',
        'Ek stock ka ₹520 area: (1) previous swing high resistance (2) 61.8% Fibonacci retracement level (3) rising 200 DMA (4) round number ₹520. Chaar independent reasons ek hi zone me — ye high-quality confluence hai. Reaction agar yahan ho, to evidence zyada meaningful hoga. Par confluence bhi guarantee nahi hai — sirf probability context improve karti hai.',
        [
          'Swing high: structural reason.',
          'Fib 61.8%: retracement math.',
          '200 DMA: dynamic level.',
          'Round number: psychological.',
          '4 independent reasons → stronger zone (not certainty).',
        ],
      ),
      callout(
        'info',
        'Confluence ka trap — over-fitting',
        'Har zone par kuch na kuch fib/MA/trendline mil kar "confluence" declare kar sakte hain. Real confluence independent sources se aati hai, aur aapko **pehle** levels identify karne chahiye, phir coincidence dhoondhni chahiye. Ulta karne se hindsight bias aata hai.',
      ),
      h('Practical chart setup'),
      list([
        'Chart par 3-5 static S/R zones draw karein.',
        '50 DMA aur 200 DMA add karein.',
        'VWAP intraday charts me add karein.',
        'Notes me likhein kaunse zones me confluence hai.',
        'Un zones par price ka aane ka wait karein — predict na karein.',
      ]),
    ],
    summary: [
      'Dynamic S/R moving average jaise price ke saath move karte hain.',
      'Broken support aksar resistance ban jaata hai, aur vice versa.',
      'Retest ka behaviour role reversal ka strongest evidence hai.',
      'Confluence multiple independent reasons ke overlap se banti hai.',
      'Confluence probability improve karti hai, guarantee nahi deti.',
    ],
    mistakes: [
      'MA ko price magnet/target samajhna.',
      'Break hote hi role reversal maan lena (retest chahiye).',
      'Zone ke baad confluence dhoondhna (hindsight).',
    ],
    keyPoints: [
      'Dynamic levels price ke saath adjust hote hain.',
      'Role reversal ka mechanism: trapped traders ka behaviour.',
      'Confluence = independent reasons, not stacked coincidences.',
    ],
    quiz: [
      {
        q: 'Support break hone ke baad wo level aksar kya ban jaata hai?',
        options: ['Support', 'Resistance', 'Irrelevant', 'Volume profile'],
        answer: 1,
        explain: 'Broken support resistance ban jaata hai kyunki trapped buyers breakeven par bechte hain.',
      },
      {
        q: 'Role reversal confirm karne ka best evidence kya hai?',
        options: [
          'Break hote hi assume karna',
          'Retest from the other side + rejection/hold',
          'Volume zero hona',
          'RSI 50 hona',
        ],
        answer: 1,
        explain: 'Retest ka behaviour decisive hai — break alone insufficient hai.',
      },
      {
        q: 'Confluence ka sahi way kya hai?',
        options: [
          'Pehle levels identify karein, phir overlapping reasons dekhein',
          'Pehle koi fib level chunein, phir uske aas-paas levels dhoondein',
          'Sab indicators ek saath lagayein',
          'Confluence ki zaroorat nahi',
        ],
        answer: 0,
        explain: 'Pehle independent structure identify karna chahiye — warna confirmation bias ho jaata hai.',
      },
    ],
    exercise:
      'Ek stock ka chart lein, 50 aur 200 DMA add karein. Pichhle 6 mahine me count karein: price ne kitni baar 50 DMA se bounce kiya aur kitni baar break kiya? Ratio calculate karein. Kya ye "dynamic support" ka reliable evidence hai?',
  },

  'technical-analysis/support-and-resistance/breakouts-retests-consolidation': {
    objectives: [
      'Breakout ka anatomy aur confirmation.',
      'False breakout (fakeout) ko pehchanna.',
      'Consolidation ke types aur unka role.',
    ],
    intro:
      'Breakouts sabse popular setups hain — aur sabse zyada trap bhi. Is lesson me hum breakout ko ek process samjhenge: consolidation → break → retest → continuation. Har stage par different evidence milta hai.',
    blocks: [
      h('Consolidation kya hai'),
      table(
        ['Type', 'Shape', 'Meaning'],
        [
          ['Rectangle / range', 'Parallel horizontal boundaries', 'Accumulation ya distribution'],
          ['Triangle (ascending)', 'Rising support, flat resistance', 'Buyers aggressive ho rahe hain'],
          ['Triangle (descending)', 'Falling resistance, flat support', 'Sellers aggressive ho rahe hain'],
          ['Symmetrical triangle', 'Both converging', 'Compression — break direction unknown'],
          ['Flag', 'Chhota counter-trend channel', 'Trend continuation pattern'],
          ['Pennant', 'Tiny converging flag', 'Continuation after sharp move'],
        ],
      ),
      p(
        'Consolidation ka core idea: **volatility contraction**. Price range chhoti hoti jaati hai, volume kam hota hai, aur phir expansion hoti hai. Volatility cycles hain — contraction ke baad expansion ka probability badhta hai (par direction unknown).',
      ),
      diagram(
        'support-resistance',
        'Breakout aur retest',
        'Consolidation → break → retest → continuation (ya failure).',
        'A price chart showing a rectangular consolidation bounded by horizontal support and resistance. Price breaks above resistance on an expanding volume bar, then pulls back to retest the old resistance from above, holds it, and continues higher. A dashed alternative path shows a failed retest where price falls back into the range, labelled "false breakout".',
      ),
      h('Breakout ke confirmation criteria'),
      olist([
        '**Close** resistance ke upar (wick nahi).',
        '**Volume** expansion — breakout candle ka volume average se significantly zyada.',
        '**Range expansion** — breakout candle ka body normal se bada.',
        '**Retest** — price wapas level par aakar hold kare.',
        '**Follow-through** — agle 1-2 candles breakout direction me close kare.',
      ]),
      h('False breakout kaise pehchanein'),
      list([
        'Breakout candle ka close level ke andar reh jaaye (long upper wick).',
        'Volume expansion ke bawajood price sustain na kare.',
        'Agle candle me poora reversal ho jaaye (engulfing back inside).',
        'Retest par level toot jaaye.',
        'Breakout ke baad indecision candles (doji/spinning top) ka cluster bane.',
      ]),
      example(
        'Do scenarios — breakout vs fakeout',
        'Scenario A: Stock ₹500 resistance ko 3 hafte se test kar raha tha. Ek din badi green candle ne ₹508 par close kiya, volume 3x average. Agle din price ₹504 tak pullback hua (retest), support hold hua, phir ₹520 tak gaya. Valid breakout. Scenario B: Same setup, green candle ne intraday ₹510 touch kiya par close ₹498 (range ke andar). Agle din gap down. Ye false breakout tha — wick close nahi tha.',
        [
          'A: close beyond + volume + successful retest = valid.',
          'B: close inside + wick only = failed.',
          'Same resistance, opposite outcomes — evidence decides.',
        ],
      ),
      callout(
        'warn',
        'Breakout chasing ka risk',
        'Breakout candle ke peak par entry lena sabse common mistake hai. Us waqt stop wide hota hai (breakout candle ke low tak) aur reversal probability bhi high. Better: retest ka wait karein ya smaller size with tighter stop use karein. Miss kiya hua breakout naya setup aayega — account ka protection priority hai.',
      ),
      h('Retest ka importance'),
      p(
        'Retest wo moment hai jab market decide karta hai ki breakout real hai ya nahi. Retest par volume kam hona chahiye (healthy — koi aggressive selling nahi), aur reaction bullish hona chahiye. Retest ke saath risk-reward best hota hai kyunki stop tight hota hai.',
      ),
      callout(
        'info',
        'Consolidation ke andar trade na karein (usually)',
        'Range ke beech me entries ka risk-reward kharab hota hai — support aur resistance dono paas hote hain. Better: boundaries par trade karein ya breakout ka wait karein. "Beech me" trade karna random noise par bet lagana hai.',
      ),
    ],
    summary: [
      'Consolidation volatility contraction hai — expansion ka wait karein.',
      'Valid breakout: close beyond level + volume + follow-through.',
      'False breakouts aksar wick-based hote hain — close basis dekhein.',
      'Retest best risk-reward entry deta hai.',
      'Breakout chase karna common aur expensive mistake hai.',
    ],
    mistakes: [
      'Breakout candle ke top par entry lena.',
      'Wick break ko valid breakout samajhna.',
      'Volume ignore karke breakout trade karna.',
      'Range ke beech me trade karna.',
    ],
    keyPoints: [
      'Breakout ek process hai: break → retest → follow-through.',
      'Volume expansion critical confirmation hai.',
      'Retest = best risk-reward entry window.',
    ],
    quiz: [
      {
        q: 'Valid breakout ke liye sabse important criteria kya hai?',
        options: [
          'Intraday high level se upar',
          'Candle ka close level ke upar + volume expansion',
          'RSI 80 se upar',
          'Bada gap',
        ],
        answer: 1,
        explain: 'Close basis aur volume — ye do sabse reliable confirmations hain.',
      },
      {
        q: 'Retest par volume kam hona generally kya indicate karta hai?',
        options: [
          'Breakout fail',
          'Healthy retest — aggressive selling nahi hai',
          'Volume data galat',
          'Market band',
        ],
        answer: 1,
        explain: 'Low volume retest ka matlab hai koi strong counter-selling nahi — breakout intact.',
      },
      {
        q: 'Range ke beech me trade karne ka main problem kya hai?',
        options: [
          'Brokerage zyada lagta hai',
          'Risk-reward kharab hota hai — stop aur target dono paas',
          'Order execute nahi ho jaata',
          'Volume zero hota hai',
        ],
        answer: 1,
        explain: 'Beech me stop wide aur target close hota hai — poor R:R. Boundaries ya breakout better hain.',
      },
    ],
    exercise:
      'Chart Explorer me 5 breakouts dhoondein. Har ek ke liye check karein: candle ka close level ke bahar tha? Volume expand hua? Retest hua? Uske baad kya hua? Table banayein aur pattern observe karein.',
  },

  /* ================================================================ */
  /* MODULE 5 — Advanced Price Action                                 */
  /* ================================================================ */
  'technical-analysis/advanced-price-action/market-structure-swing-points': {
    objectives: [
      'Market structure ko objective way me define karna.',
      'Internal vs external structure ka farq.',
      'Swing points ka systematic identification.',
    ],
    intro:
      'Market structure price action analysis ka backbone hai. Ye structural framework hai, magic formula nahi. Iska purpose hai aapko objective levels dena jahan aapka idea invalid ho.',
    blocks: [
      h('Structure ka hierarchy'),
      table(
        ['Level', 'Timeframe', 'Purpose'],
        [
          ['Major/external structure', 'Weekly/Daily', 'Overall trend, major swings'],
          ['Intermediate', '4H/1H', 'Pullbacks, swing sequences'],
          ['Minor/internal', '15m/5m', 'Entry timing, micro structure'],
        ],
      ),
      p(
        'Ek higher timeframe trend ke andar lower timeframe ka apna structure hota hai. Lower timeframe structure higher ke against ja sakta hai — ye normal hai (pullback). Analysis ka rule: **higher timeframe structure ko override mat karein** lower timeframe ki noise se.',
      ),
      h('Swing points kaise mark karein'),
      olist([
        '**Swing high**: ek candle jiska high apne neighbours (e.g. 3 left, 3 right) se zyada hai.',
        '**Swing low**: ek candle jiska low apne neighbours se kam hai.',
        'Lookback consistent rakhein (3-5 candles standard hai).',
        'Ek baar mark karne ke baad unhe "unmark" na karein — consistency important hai.',
        'Higher timeframe swings ko thicker priority dein.',
      ]),
      diagram(
        'trend',
        'Structure labelling',
        'HH, HL, LH, LL — structure ka basic grammar.',
        'A zigzag line with labelled pivot points: peaks marked HH (higher high) and LH (lower high), troughs marked HL (higher low) and LL (lower low). The chart illustrates an uptrend (HH/HL), then a transition, then a downtrend (LH/LL), with the transition points circled.',
      ),
      h('Internal vs external structure'),
      p(
        'Ek bada uptrend (external) ke andar chhote pullbacks (internal) hote hain. Jab tak external structure intact hai, internal structure ka bearish hona normal hai. Confusion tab hoti hai jab log internal structure ko external samajh lete hain — aur unnecessary panics ya premature exits karte hain.',
      ),
      example(
        'Structure labelling exercise',
        'Peaks: 120, 128, 126, 135, 132, 138. Troughs: 115, 122, 124, 128, 130. Label: Troughs 115 < 122 < 124 < 128 < 130 → all higher lows (HL). Peaks: 120 < 128 > 126 < 135 > 132 < 138 → HH sequence with minor pullbacks. Conclusion: uptrend intact. Ab agar next trough 125 par aaye (128 se neeche), wo lower low hai — structure damaged.',
        [
          'Troughs compare: rising = HL.',
          'Peaks compare: rising = HH.',
          'Pehla lower low → structure warning.',
          'Confirm lower high → structure changed.',
        ],
      ),
      callout(
        'warn',
        'Structure "manufacturing" ka trap',
        'Agar aap har chhoti fluctuation ko swing point maanenge, to aap apni thesis ke hisaab se structure draw kar lenge. Solution: fixed lookback + objective rules. Aur haan, structure analysis subjective hai — isliye ise **risk placement** ke liye use karein, "prediction" ke liye nahi.',
      ),
      h('Structure aur liquidity'),
      p(
        'Swing highs ke upar aur swing lows ke neeche pending stop orders hote hain (trader stops, breakout orders). Isliye price often un levels ko "sweep" karta hai before continuing. Isko liquidity grab ya stop hunt kaha jaata hai. Ye ek observational framework hai — aapko nahi pata ki kisne kya kiya, par level ke behaviour se aap infer kar sakte hain.',
      ),
      callout(
        'info',
        'Framework, not signal',
        'BOS, CHoCH, liquidity sweeps — ye sab analytical frameworks hain jo aapko structure describe karne ka consistent way dete hain. Koi bhi inn frameworks ka "buy at X sell at Y" guaranteed edge nahi deta. Ye tools hain, oracle nahi.',
      ),
    ],
    summary: [
      'Market structure ek hierarchy hai — major, intermediate, minor.',
      'Higher timeframe structure ko lower timeframe se override na karein.',
      'Swing points consistent lookback se mark karein.',
      'Internal bearish structure valid uptrend ke andar normal hai.',
      'Structure analysis primarily risk placement ka tool hai.',
    ],
    mistakes: [
      'Har candle ko swing point banana.',
      'Internal structure ko external samajh lena.',
      'Structure ko hindsight me re-draw karna.',
    ],
    keyPoints: [
      'Structure = objective pivot sequence.',
      'HH/HL = up, LH/LL = down.',
      'Consistency over perfection.',
    ],
    quiz: [
      {
        q: 'Higher timeframe uptrend ke andar lower timeframe downtrend kya hai?',
        options: [
          'Trend reversal',
          'Normal pullback/internal structure',
          'Data error',
          'Guaranteed crash',
        ],
        answer: 1,
        explain: 'Internal structure higher timeframe ke against ja sakta hai — ye pullback hai.',
      },
      {
        q: 'Pehla lower low ka kya matlab hai?',
        options: [
          'Trend already reversed',
          'Structure warning — confirmation chahiye',
          'Nothing',
          'Volume spike',
        ],
        answer: 1,
        explain: 'Lower low structure damage ka pratham signal hai, par confirmation (lower high) chahiye.',
      },
      {
        q: 'Structure analysis ka sabse valuable output kya hai?',
        options: [
          'Price ka exact future',
          'Objective invalidation levels for risk placement',
          'Volume forecast',
          'Broker recommendation',
        ],
        answer: 1,
        explain: 'Structure aapko batata hai ki aapka idea kahan galat hai — yehi uska primary value hai.',
      },
    ],
    exercise:
      'Ek chart par fixed lookback (3 candles) se sab swing points mark karein. Phir HH/HL aur LH/LL label karein. Count karein: kitni baar structure toota? Kya wo break "real" reversal tha (5+ candles) ya noise?',
  },

  'technical-analysis/advanced-price-action/break-of-structure-choch': {
    objectives: [
      'BOS (Break of Structure) ki definition.',
      'CHoCH (Change of Character) ka concept.',
      'In dono ka practical use aur limitations.',
    ],
    intro:
      'BOS aur CHoCH modern price action terminology hai. Ye trend continuation aur reversal ko describe karte hain — par inhe samajhne ke liye structure ka base chahiye. Ye terms "smart money" narratives se popular hue hain; hum unhe neutral, objective framework ki tarah padhenge.',
    blocks: [
      h('Definitions'),
      terms([
        {
          term: 'BOS (Break of Structure)',
          meaning: 'Trend ki direction me last swing point ka break — continuation ka signal.',
        },
        {
          term: 'CHoCH (Change of Character)',
          meaning: 'Trend ke against last swing point ka break — behaviour change ka pehla signal.',
        },
        {
          term: 'Confirmation',
          meaning: 'Break ke baad close basis + follow-through.',
        },
      ]),
      diagram(
        'trend',
        'BOS aur CHoCH',
        'Uptrend me higher high ka break = BOS. Higher low ka break = CHoCH.',
        'An uptrend zigzag where a break above the most recent swing high is labelled BOS (break of structure, continuation). Later the price breaks below the most recent higher low; this break is labelled CHoCH (change of character), marking the first structural evidence that the uptrend may be ending. A second lower high then confirms the downtrend.',
      ),
      p(
        'Simple rule: **uptrend me** swing high ka break = BOS (bullish continuation). Swing low ka break = CHoCH (possible reversal). **Downtrend me** ulta.',
      ),
      h('Step-by-step process'),
      olist([
        'Structure identify karein — swing highs aur lows mark karein.',
        'Trend define karein (HH+HL ya LH+LL).',
        'Last swing point note karein.',
        'Break ho to check karein: direction ke saath (BOS) ya against (CHoCH)?',
        'Close basis confirmation dekhein.',
        'CHoCH ke baad ek naya structure (lower high) confirm hone ka wait karein.',
      ]),
      example(
        'CHoCH ka step-by-step',
        'Uptrend: swings highs 120 → 128 → 135, lows 115 → 122 → 130. Price 135 se gir kar 126 par aayi (higher low still? 130 se neeche, isliye 126 lower low hai). Ye CHoCH hai. Ab price bounce karke 132 par ruki — ye lower high hai. Ab structure LH+LL ban gaya: downtrend confirm. Entry: 132 ke neeche break par short, stop 132 ke upar, target 120.',
        [
          'Step 1: 130 ka break = CHoCH (first warning).',
          'Step 2: 132 par lower high = structure confirmation.',
          'Step 3: LH+LL = downtrend.',
          'Step 4: Entry + stop + target defined.',
        ],
      ),
      callout(
        'warn',
        'CHoCH ka failure rate',
        'Har CHoCH reversal nahi hota. Strong trends me CHoCH "liquidity sweep" ke baad trend resume kar sakta hai. Isliye CHoCH alone par counter-trend bet lena risky hai — confirmation (lower high/LL) chahiye. Aur stop hamesha chahiye.',
      ),
      h('BOS ka use'),
      list([
        'Trend continuation ka evidence — pullback ke baad BOS trend ki health confirm karta hai.',
        'Trailing stop placement — last swing low ko reference banaayein.',
        'Pyramiding (adding to position) — BOS par add karna ek common technique hai (advanced, careful).',
        'Invalidation — agar BOS fail ho jaaye, trend weak hai.',
      ]),
      h('Common myths'),
      table(
        ['Myth', 'Reality'],
        [
          ['"Smart money BOS create karta hai"', 'BOS ek descriptive label hai — aap nahi jaan sakte kisne kya kiya'],
          ['"CHoCH = guaranteed reversal"', 'CHoCH possible character change ka first signal hai, guarantee nahi'],
          ['"Sirf 1 candle close chahiye"', 'Close basis + follow-through + higher timeframe context better hai'],
          ['"Har level par BOS trade karein"', 'Sirf meaningful swing points matter karte hain'],
        ],
      ),
      callout(
        'info',
        'Terminology ka honest note',
        'BOS/CHoCH terminology ek framework hai, empirical law nahi. Ye classic Dow theory aur market structure concepts ka modern re-branding hai. Framework ka value consistency aur objective levels me hai — mystical "institutional order flow" me nahi.',
      ),
    ],
    summary: [
      'BOS = trend direction me swing break (continuation).',
      'CHoCH = trend ke against swing break (possible reversal).',
      'CHoCH ke baad naya structure confirm hone ka wait karein.',
      'BOS trailing stop aur invalidation ke liye useful hai.',
      'Ye descriptive labels hain, guarantees nahi.',
    ],
    mistakes: [
      'CHoCH ko akela reversal signal samajhna.',
      'Har minor fluctuation ko structure break treat karna.',
      'BOS/CHoCH ko predictive magic samajhna.',
    ],
    keyPoints: [
      'BOS = continuation evidence, CHoCH = character change evidence.',
      'Confirmation sequence: CHoCH → lower high → downtrend.',
      'Framework, not oracle.',
    ],
    quiz: [
      {
        q: 'Uptrend me higher low ka break kya kehlata hai?',
        options: ['BOS', 'CHoCH', 'Doji', 'Gap'],
        answer: 1,
        explain: 'Trend ke against swing break = CHoCH (change of character) — reversal ka pehla structural signal.',
      },
      {
        q: 'CHoCH ke baad reversal confirm karne ke liye kya chahiye?',
        options: [
          'Kuch nahi, CHoCH hi confirm hai',
          'Naya structure (lower high/LL) formation',
          'Volume zero',
          'Sirf RSI',
        ],
        answer: 1,
        explain: 'CHoCH first warning hai; naya LH+LL structure reversal confirm karta hai.',
      },
      {
        q: 'BOS ka main practical use kya hai?',
        options: [
          'Reversal predict karna',
          'Trend continuation evidence + trailing stop reference',
          'Volume forecast',
          'Dividend calculation',
        ],
        answer: 1,
        explain: 'BOS continuation evidence hai aur swing points trailing stop ke liye reference dete hain.',
      },
    ],
    exercise:
      'Ek chart par 5 BOS aur 3 CHoCH identify karein. Har CHoCH ke baad dekhein: kya reversal hua ya trend resume hua? Count karein — aapko fail rate ka real sense milega.',
  },

  'technical-analysis/advanced-price-action/liquidity-and-pullbacks': {
    objectives: [
      'Liquidity concepts ka practical meaning.',
      'Pullback vs reversal ka farq.',
      'Continuation structures kaise trade karein.',
    ],
    intro:
      'Liquidity wo "fuel" hai jo price ko move karne deti hai. Aur pullbacks trend ki health ka best test hain. Is lesson me hum dono ko ek saath dekhenge — kyunki pullback exactly wahi jagah hota hai jahan liquidity build hoti hai.',
    blocks: [
      h('Liquidity kya hai (practical)'),
      p(
        'Swing highs ke upar buy stops hote hain (short sellers ke), swing lows ke neeche sell stops hote hain (longs ke). Jab price in levels ko cross karta hai, wo stops market orders me convert hote hain — isse liquidity milti hai jo bade players apne positions ke liye use karte hain.',
      ),
      terms([
        { term: 'Liquidity pool', meaning: 'Ek level ke aas-paas jama hue orders ka cluster (usually swing points).' },
        { term: 'Liquidity sweep / stop hunt', meaning: 'Level ko briefly cross karna phir reverse ho jaana.' },
        { term: 'Equal highs/lows', meaning: 'Do ya zyada similar levels — obvious liquidity targets.' },
        { term: 'Fair value gap (FVG)', meaning: 'Price me ek imbalance zone jo bina do-tarfa trade ke chhoot gaya.' },
      ]),
      callout(
        'warn',
        '"Smart money" narrative ka caution',
        'Liquidity concepts useful observational framework hain par unke saath "banks aapke stop dhoondh rahe hain" jaisi conspiracy narrative attach kar di jaati hai. Reality: bade orders ko counter-party liquidity chahiye, aur stop clusters natural liquidity sources hain. Ye market microstructure hai, koi personal vendetta nahi.',
      ),
      h('Pullback vs reversal'),
      table(
        ['Feature', 'Pullback', 'Reversal'],
        [
          ['Structure', 'Higher low intact (uptrend)', 'Lower low + lower high'],
          ['Depth', 'Usually 23–50% of prior move', 'Deep, breaks major swing'],
          ['Volume', 'Decreasing on pullback', 'Increasing on counter-move'],
          ['Time', 'Short (few candles)', 'Extended'],
          ['Momentum', 'Momentum divergence mild', 'Strong divergence'],
          ['Higher TF', 'Intact', 'Damaged'],
        ],
      ),
      diagram(
        'trend',
        'Pullback vs reversal',
        'Pullback = shallow, structure intact. Reversal = structure break.',
        'An uptrend with a shallow three-candle pullback that holds above the prior higher low and then resumes upward, labelled "pullback / continuation". Beside it, a separate example where price breaks below the prior higher low and then prints a lower high, labelled "reversal".',
      ),
      h('Pullback entry framework'),
      olist([
        'Trend identify karein (higher timeframe).',
        'Pullback ke aane ka wait karein (predict na karein).',
        'Pullback ke support zones note karein: previous swing, MA, fib 38–61%.',
        'Zone par **confirmation** ka wait karein (rejection candle, BOS in the trend direction).',
        'Stop zone ke neeche, target previous swing high/extension.',
      ]),
      example(
        'Pullback trade example',
        'Uptrend me price ₹500 se ₹560 tak gaya. Pullback ₹535 tak aaya (38% retracement) aur 50 DMA ke paas ruka. Wahan ek bullish engulfing bani, volume average se zyada. Entry ₹540, stop ₹532 (below pullback low), target ₹560. Risk ₹8, reward ₹20 → 1:2.5. Agar stop hit hua to small loss; agar target mila to 2.5R.',
        [
          'Trend: up (higher TF).',
          'Pullback: 38% + 50 DMA confluence.',
          'Confirmation: bullish engulfing + volume.',
          'Risk defined: ₹8/share.',
          'R:R 1:2.5 — acceptable.',
        ],
      ),
      h('Continuation structures'),
      list([
        '**Flag:** sharp move ke baad chhota counter-trend channel — break par continuation.',
        '**Ascending triangle:** higher lows into flat resistance — breakout upar.',
        '**Cup and handle:** rounded base + small pullback — longer-term continuation.',
        '**Measured move:** pehle leg ki length ko project karna (target estimation).',
      ]),
      callout(
        'info',
        'Fib retracement ka role',
        '38.2%, 50%, 61.8% pullback levels common hain. Ye magic numbers nahi hain — wo sirf convenient reference points hain jahan traders dekhte hain, isliye self-fulfilling ho sakte hain thoda. Confluence ke saath useful, akela nahi.',
      ),
      h('Practical rules'),
      list([
        'Pullback ke dauran entry na lein — confirmation chahiye.',
        'Pullback depth 61.8% se zyada ho to trend weak hai.',
        'Volume pullback me girti honi chahiye (healthy).',
        'Reversal confirmation ke bina counter-trend trade na lein.',
        'Journal me likhein: pullback tha ya reversal — learning ka source.',
      ]),
    ],
    summary: [
      'Swing points ke paas liquidity clusters hote hain — stops ka natural source.',
      'Liquidity sweep level ko cross karke reverse ho jaata hai.',
      'Pullback structure intact rakhta hai; reversal structure todta hai.',
      'Pullback entry ke liye confirmation zaroori hai.',
      'Continuation structures (flag, triangle) trend ke saath align hote hain.',
    ],
    mistakes: [
      'Pullback me entry le kar stop out hona.',
      'Har deep pullback ko reversal samajhna.',
      '"Smart money" narratives ko fact samajhna.',
    ],
    keyPoints: [
      'Liquidity = orders ka cluster, conspiracy nahi.',
      'Pullback vs reversal: structure decide karta hai.',
      'Confirmation ke bina counter-trend trade nahi.',
    ],
    quiz: [
      {
        q: 'Swing low ke neeche kya orders hote hain?',
        options: [
          'Buy stops',
          'Sell stops (longs ke)',
          'Kuch nahi',
          'Sirf limit orders',
        ],
        answer: 1,
        explain: 'Longs ke stop-loss sell stops hote hain — swing lows ke neeche clusters bante hain.',
      },
      {
        q: 'Healthy pullback me volume kaisa hona chahiye?',
        options: [
          'Badhta hua',
          'Girta hua (declining)',
          'Zero',
          'Constant',
        ],
        answer: 1,
        explain: 'Declining volume pullback me matlab aggressive selling nahi hai — healthy consolidation.',
      },
      {
        q: 'Pullback aur reversal ka decisive difference kya hai?',
        options: [
          'Depth',
          'Structure — reversal major swing break karta hai',
          'Volume',
          'Timeframe',
        ],
        answer: 1,
        explain: 'Structure break (LL + LH) reversal define karta hai; shallow depth alone insufficient hai.',
      },
    ],
    exercise:
      'Pichhle 3 mahine me 6 pullbacks identify karein. Har ek ke liye note karein: depth (%), volume behaviour, kya support zone tha, aur kya trend resume hua? Apna "pullback quality" checklist banayein.',
  },
};

function parts() {
  return list([
    '**Price series** — main pane me candles/bars/line.',
    '**Volume** — neeche alag pane.',
    '**Time axis** — horizontal, intervals ke saath.',
    '**Price axis** — vertical, auto-scaled.',
  ]);
}
