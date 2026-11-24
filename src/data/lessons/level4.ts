import type { LessonBodyRegistry } from './builder';
import { callout, diagram, example, formula, h, list, olist, p, table, terms } from './builder';

export const level4: LessonBodyRegistry = {
  /* ================================================================ */
  /* MODULE 1 — Trading Styles                                        */
  /* ================================================================ */
  'strategies-risk-psychology/trading-styles/trading-style-spectrum': {
    objectives: [
      'Scalping, intraday, swing aur positional trading ka comparison.',
      'Har style ke time commitment aur risk profile.',
      'Apne constraints ke hisaab se style choose karna.',
    ],
    intro:
      'Trading style ek lifestyle choice hai, sirf technical choice nahi. Ek scalp trade aur ek positional trade dono "trading" hain par unki demands bilkul alag hain. Is lesson me hum realistic comparison karenge.',
    blocks: [
      h('Comparison table'),
      table(
        ['Style', 'Holding period', 'Trades/day', 'Screen time', 'Costs', 'Skill focus'],
        [
          ['Scalping', 'Seconds–minutes', '20–100+', 'Continuous', 'Very high', 'Execution, speed, order flow'],
          ['Intraday', 'Minutes–hours', '2–10', 'Market hours', 'High', 'Setup quality, discipline'],
          ['Swing', 'Days–weeks', '2–8/week', '30–60 min/day', 'Medium', 'Chart structure, catalysts'],
          ['Positional', 'Weeks–months', '1–4/month', 'Weekly review', 'Low', 'Trend, macro, fundamentals'],
          ['Long-term investing', 'Years', 'Rare', 'Quarterly', 'Very low', 'Business analysis, patience'],
        ],
      ),
      h('Scalping'),
      p(
        'Scalping me chhoti chhoti price movements capture ki jaati hain. Edge often microseconds/seconds me hota hai. **Retail ke liye sabse mushkil style** kyunki: (1) costs (spread, brokerage, slippage) edge ka bada hissa kha jaate hain, (2) execution speed infrastructure par depend karti hai, (3) mental fatigue bahut zyada hota hai.',
      ),
      callout(
        'danger',
        'Scalping ka honest math',
        'Agar aap per trade 0.15% target kar rahe hain aur spread+cost 0.08% hai, to aapka gross edge ka 53% costs me chala jaata hai. 50 trades/day × 250 days = 12,500 trades/year. Chhoti cost bhi huge drag ban jaati hai. Isliye scalping sirf lowest-cost, most liquid instruments me aur institutional infrastructure ke saath sensible hai.',
      ),
      h('Intraday trading'),
      p(
        'Same day entry aur exit — overnight risk zero. Ye retail me sabse popular style hai. Challenge: intraday moves often noise hote hain, aur din ke end me square-off mandatory hota hai (India me). Edge ke liye strong setup filter aur strict risk rules chahiye.',
      ),
      h('Swing trading'),
      p(
        'Kuch din se kuch hafte tak hold. Chart structure aur catalysts (earnings, policy) ka mix. Ye **most retail-friendly** style hai kyunki: (1) overnight gaps ka risk manageable, (2) daily chart par analysis focus, (3) screen time kam, (4) costs lower.',
      ),
      h('Positional trading'),
      p(
        'Hafton se mahino tak. Trend aur macro/fundamental themes par based. Kam decisions, zyada patience. Challenge: adverse moves ke dauran drawdown bardasht karna aur thesis ko honestly review karna.',
      ),
      h('Time commitment reality'),
      example(
        'Ek realistic week',
        'Swing trader: 30 min daily (market close ke baad), weekend me 2 ghante planning. Total ~5 ghante/week. Intraday trader: 9:00–15:30 watch + 1 ghanta prep = ~35 ghante/week. Scalphaler: pura market hours + prep + review = 45+ ghante/week. Agar aapke paas job hai, swing/positional realistically feasible hai. Intraday only if you can genuinely dedicate the time.',
        [
          'Swing: ~5 hrs/week.',
          'Intraday: ~35 hrs/week.',
          'Scalping: 45+ hrs/week.',
          'Style ko apni life ke hisaab se chunein, ulta nahi.',
        ],
      ),
      h('Har style ka constraint'),
      table(
        ['Agar aapke paas…', 'To realistic style'],
        [
          ['Full-time job', 'Swing ya positional'],
          ['Chhota capital', 'Swing (costs ke hisaab se)'],
          ['Low risk tolerance', 'Positional / long-term'],
          ['Instant decision-making strength + time', 'Intraday'],
          ['Institutional infra + capital', 'Scalping (advanced)'],
        ],
      ),
      callout(
        'warn',
        'Style switching ka trap',
        'Ek strategy fail hone par doosre style me jump karna common hai — par har style ke liye naya learning curve hai. Consistency aur measurement ke bina switching sirf random walk hai. Ek style ko kam se kam 100 trades tak test karein before deciding.',
      ),
    ],
    summary: [
      'Style = lifestyle choice, sirf technique nahi.',
      'Scalping highest costs aur time demand rakhta hai.',
      'Swing trading most retail-friendly hai.',
      'Har style ka realistic constraint hai (time, capital, temperament).',
      'Style switching bina data ke random walk hai.',
    ],
    mistakes: [
      'Job ke saath scalping karna.',
      'Style ko "profit potential" ke hisaab se chunna.',
      'Bina testing style switch karna.',
    ],
    keyPoints: [
      'Costs + time = style feasibility.',
      'Swing is the realistic starting point for most.',
      '100-trade sample before judging a style.',
    ],
    quiz: [
      {
        q: 'Full-time job ke saath kaunsa style sabse feasible hai?',
        options: ['Scalping', 'Swing trading', 'High-frequency', 'Tick trading'],
        answer: 1,
        explain: 'Swing trading me daily 30-60 min kaafi hai — job ke saath manageable.',
      },
      {
        q: 'Scalping retail ke liye mushkil kyun hai?',
        options: [
          'Kyunki brokers allow nahi karte',
          'Kyunki costs edge ka bada hissa kha jaate hain aur extreme infrastructure chahiye',
          'Kyunki markets band hote hain',
          'Kyunki SEBI ban karta hai',
        ],
        answer: 1,
        explain: 'High frequency + small targets = cost drag dominant. Plus speed aur fatigue issues.',
      },
      {
        q: 'Style switch karne se pehle minimum kitne trades ka sample chahiye?',
        options: ['5', '20', 'Kam se kam 100', '1000'],
        answer: 2,
        explain: 'Chhoti samples par random variance dominate karti hai. ~100 trades realistic minimum hai.',
      },
    ],
    exercise:
      'Apne real schedule ke hisaab se ek hafta plan karein: kitne ghante charting kar sakte hain? Uske base par ek style chunein aur likhein ki kyun dusre styles aapke liye realistic nahi hain.',
  },

  'strategies-risk-psychology/trading-styles/investing-and-algorithmic-styles': {
    objectives: [
      'Long-term investing ka process aur edge.',
      'Algorithmic trading ke types aur retail scope.',
      'Systematic vs discretionary ka farq.',
    ],
    intro:
      'Investing aur algo trading spectrum ke do ends hain — ek patience-driven, doosra automation-driven. Dono ke apne realistic scope hain. Is lesson me hum dono ko honest tarike se dekhenge.',
    blocks: [
      h('Long-term investing'),
      p(
        'Investor business ka hissa kharidta hai, price chart ka nahi. Core process: business samajhna, competitive advantage identify karna, management quality assess karna, valuation karna, aur long-term hold karna.',
      ),
      olist([
        'Business model: revenue kaise aata hai?',
        'Moat: competition se kaise protect hai?',
        'Management: capital allocation track record?',
        'Financials: cash flow, margins, leverage.',
        'Valuation: kya price reasonable hai?',
        'Thesis: kya galat hone par main exit karunga?',
      ]),
      callout(
        'info',
        'Investing ka edge',
        'Investing ka edge **time horizon** aur **patience** hai. Institutions quarterly performance par judged hote hain, aap nahi — ye structural advantage hai. Isliye short-term volatility aapke liye opportunity hai, threat nahi (agar thesis intact hai).',
      ),
      h('Compounding ka reality'),
      example(
        'Compounding calculation',
        '₹1,00,000 par 12% annual return: 10 saal → ₹3,10,585; 20 saal → ₹9,64,629; 30 saal → ₹29,95,992. Farq dramatic hai kyunki compounding exponential hai. Par dhyaan dijiye: 12% constant return **unrealistic assumption** hai. Real markets me returns zigzag hote hain, aur negative years bhi aate hain.',
        [
          '10 saal: ~3.1x',
          '20 saal: ~9.6x',
          '30 saal: ~30x',
          'Constant returns assumption unrealistic hai.',
        ],
      ),
      h('Systematic investing'),
      list([
        '**SIP (Systematic Investment Plan)** — fixed amount regular intervals par.',
        '**Dollar-cost averaging** — same concept, US terminology.',
        '**Rebalancing** — periodic asset allocation reset.',
        '**Index investing** — low cost, broad exposure.',
        '**Rule-based screening** — quantitative filters.',
      ]),
      p(
        'Systematic approach ka fayda: emotions remove hote hain aur discipline enforced hoti hai. Nuksan: flexibility kam. Best approach aksar hybrid hoti hai — systematic core + selective active decisions (clearly separated).',
      ),
      h('Algorithmic trading'),
      terms([
        { term: 'Algorithmic trading', meaning: 'Pre-defined rules ke hisaab se automated order execution.' },
        { term: 'Rule-based system', meaning: 'Explicit entry/exit/sizing rules jo reproducible hain.' },
        { term: 'Backtesting', meaning: 'Historical data par rules ka test.' },
        { term: 'HFT', meaning: 'High-frequency trading — microsecond latency competitive. Retail ke liye accessible nahi.' },
        { term: 'Execution algo', meaning: 'Bade orders ko efficiently execute karne ke algorithms (VWAP, TWAP).' },
      ]),
      table(
        ['Algo type', 'Kya karta hai', 'Retail accessibility'],
        [
          ['Execution algorithms', 'Bade order ko chunks me todna', 'Broker platforms ke through limited'],
          ['Statistical arbitrage', 'Price relationships exploit karna', 'Institutional'],
          ['Trend following algo', 'Rules-based momentum', 'Retail possible (simple versions)'],
          ['Mean reversion algo', 'Range-bound price revert', 'Retail possible'],
          ['Market making', 'Spread capture', 'Institutional infrastructure needed'],
          ['HFT', 'Latency arbitrage', 'Not accessible'],
        ],
      ),
      callout(
        'warn',
        'Retail algo trading ki reality',
        '1) Latency-dependent strategies retail ke liye infeasible hain. 2) Broker APIs ke restrictions hote hain. 3) SEBI ke algo trading rules hain (approval, tagging). 4) Backtest overfitting bahut common hai. 5) Infrastructure costs (data, servers) edge kha sakte hain. Realistic retail algo: simple rules, daily timeframe, limited execution needs. Learnyx me hum simulation aur education tak rehte hain — live algo execution nahi.',
      ),
      h('Discretionary vs systematic'),
      table(
        ['', 'Discretionary', 'Systematic'],
        [
          ['Decisions', 'Trader judgment', 'Pre-defined rules'],
          ['Consistency', 'Variable', 'High'],
          ['Adaptability', 'High', 'Low'],
          ['Emotional risk', 'High', 'Low'],
          ['Backtesting', 'Difficult', 'Straightforward'],
          ['Best for', 'Context-heavy analysis', 'Repeatable edges'],
        ],
      ),
      callout(
        'info',
        'Hybrid ka best use',
        'Rules define karein (systematic skeleton), par execution me context use karein (discretionary judgment). Example: "only trade pullbacks in uptrend with 1:2+ R:R" — rule hai; "is pullback me support strong lag raha hai" — judgment hai. Dono valid, par rules pehle likhein.',
      ),
    ],
    summary: [
      'Investing ka edge time horizon aur patience hai.',
      'Compounding powerful hai par constant returns unrealistic assumption hai.',
      'Systematic investing emotions remove karti hai, flexibility kam.',
      'Algo trading ka retail scope limited hai — latency-heavy strategies accessible nahi.',
      'Hybrid approach: systematic rules + contextual judgment.',
    ],
    mistakes: [
      'Compounding calculators se unrealistic expectations banana.',
      'Retail me HFT-style algo try karna.',
      'Rules likhe bina "systematic" hone ka claim.',
    ],
    keyPoints: [
      'Time horizon ek structural advantage hai.',
      'Algo ≠ magic; execution aur infrastructure matters.',
      'Rules pehle, judgment baad me.',
    ],
    quiz: [
      {
        q: 'Investing ka main structural edge kya hai?',
        options: [
          'Market timing',
          'Time horizon aur patience — institutions ke paas nahi hota',
          'Fast execution',
          'Leverage',
        ],
        answer: 1,
        explain: 'Quarterly performance pressure institutions ko restrict karti hai; retail ke paas long horizon advantage hai.',
      },
      {
        q: 'Retail algo trading me sabse bada practical limitation kya hai?',
        options: [
          'Coding nahi seekh sakte',
          'Latency-dependent strategies infeasible hain; simple daily rules realistic hain',
          'SEBI mana karta hai',
          'Computers me nahi chalta',
        ],
        answer: 1,
        explain: 'Latency infrastructure aur costs retail ke liye barriers hain. Simple rule-based approaches realistic hain.',
      },
      {
        q: 'Systematic approach ka trade-off kya hai?',
        options: [
          'Zyada profit, kam risk',
          'High consistency par low adaptability',
          'Kam consistency par high adaptability',
          'Koi trade-off nahi',
        ],
        answer: 1,
        explain: 'Rules consistency dete hain par naye contexts me adapt nahi karte.',
      },
    ],
    exercise:
      'Ek investing thesis likhein kisi company ke liye (1 page): business model, moat, valuation check, aur exit condition. Phir likhein ki usme kya systematic rules hain aur kya judgment calls.',
  },

  /* ================================================================ */
  /* MODULE 2 — Risk Management                                       */
  /* ================================================================ */
  'strategies-risk-psychology/risk-management/risk-reward-and-position-sizing': {
    objectives: [
      'Risk-reward ratio ka calculation.',
      'Position sizing ke formulas.',
      'Expectancy ka concept.',
    ],
    intro:
      'Risk management woh single skill hai jo determine karta hai aap kitne lambe survive karenge. Profit strategies after-the-fact hote hain; risk management before-the-fact. Is lesson me hum concrete formulas denge.',
    blocks: [
      h('Risk-reward ratio'),
      formula(
        'Risk-reward ratio',
        'Risk = Entry − Stop (long) ya Stop − Entry (short)\nReward = Target − Entry\nR:R = Reward ÷ Risk',
        'Agar entry ₹100, stop ₹95, target ₹115: risk 5, reward 15 → 1:3.',
      ),
      diagram(
        'risk-reward',
        'Risk-reward visualisation',
        'Stop distance = risk. Target distance = reward. Ratio = reward ÷ risk.',
        'A vertical price ladder showing an entry line in the middle, a stop line below at a distance labelled "1R risk", and a target line above at a distance three times larger, labelled "3R reward". The asymmetry between the two distances makes the 1:3 risk-reward ratio visible.',
      ),
      h('Position sizing'),
      formula(
        'Position sizing formula',
        'Risk amount = Capital × Risk %\nPosition size (shares) = Risk amount ÷ (Entry − Stop)\nPosition value = Shares × Entry',
        'Capital ₹1,00,000, risk 1% = ₹1,000. Entry ₹100, stop ₹95 (distance ₹5) → shares = 1,000 ÷ 5 = 200. Position value = ₹20,000.',
      ),
      example(
        'Sizing with different stop distances',
        'Same capital ₹1,00,000 aur risk 1% (₹1,000). Trade A: stop distance ₹5 → 200 shares, position ₹20,000. Trade B: stop distance ₹20 → 50 shares, position ₹5,000. Dhyaan dijiye: risk same hai, position size alag. **Position size stop distance se derive hoti hai**, conviction se nahi.',
        [
          'Float risk = fixed rupee amount.',
          'Stop distance = volatility-based.',
          'Size = risk ÷ distance.',
          'Position value vary karegi — ye normal hai.',
        ],
      ),
      callout(
        'warn',
        'Sabse common galti',
        'Log pehle "kitne shares" decide karte hain, phir stop lagate hain. Ye ulte kram (reverse) hai. Sahi kram: (1) invalidation level (stop) decide karein, (2) risk amount decide karein, (3) size calculate karein. Agar size bahut chhoti lagti hai, matlab risk zyada hai — size nahi, risk adjust karein.',
      ),
      h('Expectancy'),
      formula(
        'Expectancy (per trade in R)',
        'E = (Win rate × Average win in R) − (Loss rate × Average loss in R)',
        'Win rate 40%, average win 2.5R, average loss 1R: E = (0.40 × 2.5) − (0.60 × 1) = 1.0 − 0.6 = +0.4R per trade.',
      ),
      p(
        'Expectancy ka matlab: aap long run me per trade average kitna kamate hain. Positive expectancy ka matlab strategy edge rakhti hai. Par ye historical average hai — aage guarantee nahi.',
      ),
      table(
        ['Win rate', 'Avg win (R)', 'Avg loss (R)', 'Expectancy'],
        [
          ['30%', '4.0', '1.0', '+0.20R'],
          ['40%', '2.5', '1.0', '+0.40R'],
          ['50%', '2.0', '1.0', '+0.50R'],
          ['55%', '1.5', '1.0', '+0.375R'],
          ['60%', '1.0', '1.0', '+0.20R'],
          ['70%', '0.8', '1.0', '+0.26R'],
          ['40%', '1.5', '1.0', '+0.00R (breakeven)'],
        ],
      ),
      callout(
        'info',
        'Win rate se zyada important',
        'Ek 35% win rate strategy with 3R average win 40% win rate with 1.5R se better hai. Isliye "win rate 90%" wali claims misleading hoti hain — average win/loss dekhein. Aur jo log "90% accuracy" bechte hain, wo aksar chhote profits aur bade losses ka combination chhupa rahe hote hain.',
      ),
      h('Consecutive losses ka reality'),
      table(
        ['Win rate', '3 losses in row', '6 losses in row', '10 losses in row'],
        [
          ['60%', '6.4%', '0.4%', '0.01%'],
          ['50%', '12.5%', '1.6%', '0.1%'],
          ['40%', '21.6%', '4.7%', '0.6%'],
          ['35%', '27.5%', '7.5%', '1.3%'],
        ],
        '1000 trades me expected occurrences. 1% risk par 10 consecutive losses = ~10% drawdown — survivable.',
      ),
      p(
        'Isi liye risk per trade 1-2% rakhna essential hai. Agar aap 5% risk kar rahe hain, to 6 consecutive losses me 30% drawdown ho jaayega — jo emotionally aur mathematically dono mushkil hai.',
      ),
      callout(
        'warn',
        'Position concurrency',
        'Agar aap ek saath 5 positions le rahe hain har ek 1% risk ke saath, to total risk 5% hai (agar correlated hain to zyada). **Portfolio-level risk** track karein, sirf per trade nahi. Correlated positions (same sector) effectively ek bada position hain.',
      ),
    ],
    summary: [
      'R:R = reward ÷ risk; 1:2 minimum common benchmark hai.',
      'Position size risk amount aur stop distance se derive hoti hai.',
      'Expectancy win rate aur average win/loss ka combination hai.',
      '1–2% risk per trade losing streaks ko survivable banata hai.',
      'Portfolio-level risk per-trade risk se zyada important hai.',
    ],
    mistakes: [
      'Pehle quantity decide karna, phir stop.',
      'Win rate ko expectancy samajhna.',
      'Correlated positions ko alag risk samajhna.',
    ],
    keyPoints: [
      'Stop first, size second.',
      'Expectancy > win rate.',
      'Portfolio risk = aggregate exposure.',
    ],
    quiz: [
      {
        q: 'Capital ₹2,00,000, risk 1%, entry ₹100, stop ₹96. Position size?',
        options: ['500 shares', '200 shares', '100 shares', '50 shares'],
        answer: 0,
        explain: 'Risk = ₹2,000. Stop distance = ₹4. Size = 2,000 ÷ 4 = 500 shares.',
      },
      {
        q: 'Win rate 40%, avg win 2.5R, avg loss 1R. Expectancy?',
        options: ['+0.20R', '+0.40R', '−0.10R', '+1.0R'],
        answer: 1,
        explain: '(0.4 × 2.5) − (0.6 × 1) = 1.0 − 0.6 = +0.40R.',
      },
      {
        q: '5 correlated positions har ek 1% risk ke saath — portfolio risk lagbhag kitna?',
        options: ['1%', '5% (ya zyada)', '0.2%', 'Zero'],
        answer: 1,
        explain: 'Correlated positions effectively ek bada risk hain — aggregate risk 5% ya zyada ho sakta hai.',
      },
    ],
    exercise:
      'Risk Calculator use karein: 5 hypothetical trades design karein, different stops ke saath. Har ek ke liye size calculate karein. Total portfolio risk nikalein aur dekhein ki correlated hone par kitna badh jaayega.',
  },

  'strategies-risk-psychology/risk-management/drawdown-and-risk-of-ruin': {
    objectives: [
      'Maximum drawdown ka calculation.',
      'Drawdown recovery ka math.',
      'Risk of ruin ka concept.',
    ],
    intro:
      'Drawdown woh metric hai jo batata hai aapka account kitna neeche gaya. Iska recovery math brutal hai — aur yehi reason hai ki capital preservation sabse important rule hai.',
    blocks: [
      h('Maximum drawdown'),
      formula(
        'Drawdown',
        'Drawdown % = (Peak value − Current value) ÷ Peak value × 100\nMaximum drawdown = largest peak-to-trough decline',
        '₹1,00,000 → ₹1,20,000 (peak) → ₹90,000. Drawdown = (1,20,000 − 90,000) ÷ 1,20,000 = 25%.',
      ),
      h('Recovery ka brutal math'),
      table(
        ['Drawdown', 'Gain needed to recover'],
        [
          ['−10%', '+11.1%'],
          ['−20%', '+25%'],
          ['−30%', '+42.9%'],
          ['−50%', '+100%'],
          ['−70%', '+233%'],
          ['−90%', '+900%'],
        ],
      ),
      p(
        'Ye asymmetry hai: 50% loss ko recover karne ke liye 100% gain chahiye. Isliye drawdown control karna return maximize karne se zyada important hai — mathematically.',
      ),
      diagram(
        'risk-reward',
        'Drawdown recovery asymmetry',
        'Loss badhta hai to recovery gain exponentially badhta hai.',
        'A bar chart comparing drawdown depth on the left with the required recovery gain on the right. Bars grow steeply: a 10 percent drawdown needs about 11 percent, a 50 percent drawdown needs 100 percent, and a 90 percent drawdown needs 900 percent to recover. The visual emphasises the non-linear cost of deep losses.',
      ),
      h('Risk of ruin'),
      p(
        'Risk of ruin = probability ki aapka capital zero (ya unacceptable level) tak pahunch jaayega. Ye risk per trade, win rate aur expectancy par depend karta hai.',
      ),
      table(
        ['Risk per trade', 'Rough outcome (negative expectancy strategy)'],
        [
          ['0.5%', 'Slow erosion — long survival'],
          ['1%', 'Erosion but survivable; learning time milta hai'],
          ['2%', 'Noticeable erosion; small errors compound'],
          ['5%', '10-15 losses se account severely damaged'],
          ['10%', 'In practice ruin — variance kills you'],
          ['20%+', 'Ruin almost certain'],
        ],
      ),
      callout(
        'danger',
        'Ruin ka practical matlab',
        'Ruin ka matlab "zero balance" nahi hota — matlab aap itna neeche aa jaate hain ki psychologically ya financially recover karna impossible ho jaata hai. ₹1,00,000 se ₹40,000 bache to mathematically recover ho sakta hai, par practically log yahin strategy badal dete hain ya leverage badha dete hain — aur phir zero.',
      ),
      h('Kelly criterion ka caution'),
      p(
        'Kelly criterion mathematically optimal bet size batata hai: f* = edge ÷ odds. Par ye **theoretical maximum** hai — real markets me edge estimates uncertain hote hain, aur Kelly par bet karne se drawdowns bahut deep ho sakte hain. Practically log Kelly ka 1/4 ya 1/2 use karte hain. Beginners ke liye fixed 1% risk zyada sensible hai.',
      ),
      example(
        'Drawdown comparison',
        'Trader A: 20% annual return, 15% max drawdown. Trader B: 35% annual return, 60% max drawdown. A ka Calmar ratio = 20/15 = 1.33. B ka = 35/60 = 0.58. A ka risk-adjusted return better hai. B ko 60% drawdown recover karne ke liye 150% gain chahiye — practically mushkil.',
        [
          'Calmar ratio = annual return ÷ max drawdown.',
          'Higher return ≠ better performance.',
          'Deep drawdown recovery cost exponential hai.',
        ],
      ),
      callout(
        'info',
        'Drawdown ka psychological side',
        '50% drawdown sirf number nahi hai — wo sleep, relationships aur decision-making ko affect karta hai. Isliye position sizing me "worst-case drawdown" ko pehle imagine karein. Agar 20% drawdown dekh kar aap panic sell karenge, to aapka allocation galat hai.',
      ),
    ],
    summary: [
      'Drawdown peak se current decline ka percentage hai.',
      'Recovery asymmetric hai: 50% loss ke liye 100% gain chahiye.',
      'Risk of ruin practically poor decisions ka term hai, sirf zero balance nahi.',
      'Risk per trade 1–2% par rakhein.',
      'Calmar ratio return ko drawdown se adjust karta hai.',
    ],
    mistakes: [
      'Return ko drawdown ke bina judge karna.',
      'Drawdown ke baad leverage badhana ("revenge sizing").',
      'Kelly ko practical sizing rule samajhna.',
    ],
    keyPoints: [
      'Drawdown control > return maximization.',
      'Recovery math exponential hai.',
      'Survivable risk per trade = 1–2%.',
    ],
    quiz: [
      {
        q: '50% drawdown recover karne ke liye kitna gain chahiye?',
        options: ['50%', '75%', '100%', '150%'],
        answer: 2,
        explain: '₹100 → ₹50. ₹50 se ₹100 tak 100% gain chahiye.',
      },
      {
        q: 'Peak ₹1,20,000, current ₹90,000. Drawdown?',
        options: ['20%', '25%', '30%', '33%'],
        answer: 1,
        explain: '(1,20,000 − 90,000) ÷ 1,20,000 = 25%.',
      },
      {
        q: 'Kelly criterion ko practically kaise use karein?',
        options: [
          'Full Kelly par bet karein',
          'Kelly ka fraction (1/4 ya 1/2) use karein kyunki edge estimates uncertain hote hain',
          'Kelly ignore karein',
          'Kelly ka double use karein',
        ],
        answer: 1,
        explain: 'Edge estimates uncertain hoti hain, isliye full Kelly drawdowns bahut deep kar sakta hai. Fractional Kelly safer hai.',
      },
    ],
    exercise:
      'Drawdown Calculator use karein. Apne hypothetical account ke 10 different peaks/current values test karein. Har case ke liye recovery gain calculate karein. Likh kar batao: kaunsa drawdown level aapke liye psychologically acceptable hai?',
  },

  'strategies-risk-psychology/risk-management/diversification-and-exposure': {
    objectives: [
      'Diversification ka mechanism aur limits.',
      'Correlation ka role.',
      'Portfolio exposure management.',
    ],
    intro:
      'Diversification "sab me thoda thoda" nahi hai — wo **uncorrelated** exposures ka combination hai. Galat diversification false comfort deta hai. Is lesson me hum isko properly samjhenge.',
    blocks: [
      h('Diversification ka core'),
      p(
        'Agar aap 10 alag-alag bank stocks rakhte hain, to wo diversification nahi hai — wo ek hi sector ka concentrated bet hai 10 forms me. Real diversification ke liye **uncorrelated** assets chahiye.',
      ),
      formula(
        'Portfolio volatility (two assets)',
        'σp = √(w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρσ₁σ₂)',
        'ρ = correlation (−1 to +1). Agar ρ = +1, diversification ka koi fayda nahi. Agar ρ < 1, volatility kam hoti hai.',
      ),
      table(
        ['ρ', 'Diversification benefit'],
        [
          ['+1.0', 'None — same asset'],
          ['+0.7', 'Small'],
          ['+0.3', 'Moderate'],
          ['0.0', 'Good'],
          ['−0.3', 'Strong'],
          ['−1.0', 'Perfect hedge (rare)'],
        ],
      ),
      h('Asset classes aur typical correlations'),
      table(
        ['Pair', 'Typical correlation', 'Note'],
        [
          ['Equity–Equity (different sectors)', '+0.5 to +0.8', 'Sectors ek saath move karte hain'],
          ['India equity–US equity', '+0.4 to +0.7', 'Globalisation se badhi hai'],
          ['Equity–Bonds', '−0.3 to +0.3', 'Regime-dependent; 2022 me positive thi'],
          ['Equity–Gold', '−0.1 to +0.3', 'Crisis me negative ho sakti hai'],
          ['Equity–REIT', '+0.6 to +0.8', 'Real estate bhi equity jaise behave karta hai'],
          ['Crypto–Equity', '+0.2 to +0.7', 'Recent years me badhi, unstable hai'],
        ],
      ),
      callout(
        'warn',
        'Correlation instability',
        'Correlations **stable nahi hote** — crisis me sab correlations 1 ki taraf jaate hain (sab ek saath girte hain). 2008 aur 2020 me "diversified" portfolios ke saare assets ek saath gire. Isliye diversification ko "crash insurance" na samjhein; wo normal times me volatility kam karti hai.',
      ),
      h('Diversification ke limits'),
      list([
        'Over-diversification: 50 stocks rakhein to aap index jaisa return doge par costs aur complexity zyada.',
        'Practical sweet spot: 15–25 well-understood positions (ya ek index fund).',
        'Correlated assets diversify nahi karte.',
        'Crisis me correlations converge — tail risk alag se manage karein.',
        'Cash bhi ek position hai (optionality).',
      ]),
      h('Exposure management'),
      formula(
        'Portfolio exposure',
        'Gross exposure = Σ |position value|\nNet exposure = Σ (long value) − Σ (short value)\nSector exposure = sector position value ÷ portfolio value',
        'Agar aap 3 IT stocks me 40% capital rakhte hain, to IT sector exposure 40% hai — chahe 3 positions hon.',
      ),
      table(
        ['Limit type', 'Example rule', 'Purpose'],
        [
          ['Per position', 'Max 10% capital', 'Concentration risk'],
          ['Per sector', 'Max 25% capital', 'Sector risk'],
          ['Per trade risk', 'Max 1% capital', 'Loss control'],
          ['Portfolio risk at risk', 'Max 5% total', 'Aggregate'],
          ['Correlated cluster', 'Max 15%', 'False diversification'],
        ],
      ),
      example(
        'False diversification example',
        'Portfolio: 5 IT stocks (40%), 2 banks (20%), 1 FMCG (10%), 3 small caps (20%), cash (10%). Positions = 11, par effective bets: IT sector (big), banks (correlated with economy), small caps (high beta). Real diversification kam hai. Agar IT sector correct hota hai (rupee depreciation, US demand) to sab saath gir sakte hain.',
        [
          'Position count ≠ diversification.',
          'Sector exposure measure karein.',
          'Correlation clusters identify karein.',
        ],
      ),
      callout(
        'info',
        'Risk parity ka concept',
        'Traditional portfolios capital ko equal weight dete hain, par risk ko nahi. Risk parity risk ko equal weight deta hai — lower volatility assets ko zyada allocation. Ye advanced framework hai; retail ke liye simple version: position size ko volatility ke inverse rakhein (ATR-based sizing yehi karta hai).',
      ),
    ],
    summary: [
      'Diversification uncorrelated exposures se aati hai, position count se nahi.',
      'Correlations regime-dependent aur crisis me converge karte hain.',
      '15–25 positions ya index fund practical sweet spot hai.',
      'Sector aur cluster exposure per-position limits se zyada important hai.',
      'Risk-based sizing volatility ko normalize karti hai.',
    ],
    mistakes: [
      'Same sector me kai stocks ko diversification samajhna.',
      'Crisis me diversification par over-rely karna.',
      'Over-diversify karke index minus costs bana dena.',
    ],
    keyPoints: [
      'Correlation diversification ka key hai.',
      'Exposure sector/theme level par measure karein.',
      'Cash ek valid position hai.',
    ],
    quiz: [
      {
        q: '10 bank stocks rakhna kya diversification hai?',
        options: [
          'Haan, 10 positions hain',
          'Nahi — ek hi sector ka concentrated bet hai',
          'Perfect diversification',
          'Risk-free hai',
        ],
        answer: 1,
        explain: 'Same sector ke stocks highly correlated hote hain — effectively ek hi bet.',
      },
      {
        q: 'Crisis me correlations ka kya hota hai?',
        options: [
          'Negative ho jaate hain',
          '1 ki taraf jaate hain (sab saath girte hain)',
          'Zero ho jaate hain',
          'Unchanged rehte hain',
        ],
        answer: 1,
        explain: 'Correlation convergence crisis ka classic pattern hai — diversification kuch crisis me fail karti hai.',
      },
      {
        q: 'Practical diversification ka sweet spot kitne positions hai?',
        options: ['2-3', '15-25 ya ek index fund', '100+', '50-100'],
        answer: 1,
        explain: '15-25 well-understood positions ya ek broad index fund sufficient diversification deta hai bina over-complication ke.',
      },
    ],
    exercise:
      'Apne hypothetical 10 positions ki list banayein. Sector, theme aur correlation clusters identify karein. Calculate karein: kya koi sector 25% se zyada hai? Cluster concentration kitni hai?',
  },

  /* ================================================================ */
  /* MODULE 3 — Trading Psychology                                    */
  /* ================================================================ */
  'strategies-risk-psychology/trading-psychology/emotional-traps': {
    objectives: [
      'Fear, greed, FOMO aur revenge trading ka mechanism.',
      'Confirmation bias aur anchoring.',
      'Emotional traps ko system se kaise counter karein.',
    ],
    intro:
      'Psychology lessons often motivational fluff hote hain. Ye nahi hai. Yahan hum actual cognitive biases aur unke market-specific manifestations dekhenge — aur concrete countermeasures.',
    blocks: [
      h('Fear'),
      p(
        'Fear do forms me nuksan karta hai: (1) **entry se pehle** — setup acha hai par aap hesitate karte hain, opportunity miss hoti hai. (2) **exit ke waqt** — chhoti loss par panic exit, phir price wapas aa jaata hai. Dono progressive exposure se treat hote hain — chhote size se start karein aur gradually badhayein.',
      ),
      h('Greed'),
      p(
        'Greed ka classic form: profit ka target hit hone par exit na karna, "thoda aur" ka lalach. Aur ek aur form: position size badhana after winning streak ("ab main expert hoon"). Ye overconfidence bias hai — winning streaks me risk badh jaata hai exactly jab market aapko humbled karta hai.',
      ),
      h('FOMO (Fear of Missing Out)'),
      p(
        'Kisi stock ko 30% upar jaate dekhna aur late entry lena — ye FOMO hai. Iska structural problem: aap **worst** price par enter hote hain kyunki momentum already peak par hai. FOMO entries usually wide stops aur poor R:R ke saath hoti hain.',
      ),
      callout(
        'warn',
        'FOMO ka countermeasure',
        'Rule banayein: **koi bhi entry nahi jo pehle watchlist par nahi thi**. Agar aapne setup pre-plan nahi kiya, to aap trade nahi karenge. "Missed move" ka cost ek opportunity hai; FOMO trade ka cost real loss ho sakta hai.',
      ),
      h('Revenge trading'),
      p(
        'Loss ke baad turant trade lena "wapas kamaane" ke liye. Ye sabse destructive pattern hai. Mechanism: loss emotional pain create karta hai → brain pain relief ke liye action chahta hai → aap bina setup trade lete hain → bada loss → more pain → cycle escalate.',
      ),
      example(
        'Revenge trading ka cascade',
        'Trader ne ₹5,000 ka loss liya. Emotional state me next 3 trades: (1) ₹8,000 loss (bigger size), (2) ₹6,000 loss (chasing), (3) ₹10,000 loss (desperation). Total ₹29,000 loss — ek controlled ₹5,000 loss ek disastrous day ban gaya. Solution: daily loss limit (e.g. 2%) → automatically stop trading.',
        [
          'Loss → emotional pain.',
          'Pain relief ke liye impulsive trade.',
          'Bigger losses → more pain.',
          'Structural fix: hard daily stop.',
        ],
      ),
      h('Confirmation bias'),
      p(
        'Aapne position li aur ab sirf **positive** news dhoondh rahe hain. Negative analysis ignore ya dismiss kar rahe hain. Ye extreme common hai aur dangerous hai kyunki aap exit opportunity miss karte hain.',
      ),
      callout(
        'info',
        'Countermeasure: pre-mortem',
        'Trade lene se **pehle** likhein: "3 reasons kya hain jinki wajah se main galat honga?" Agar aap unhe likh nahi sakte, to aapka analysis maybe weak hai. Ye simple exercise confirmation bias ko significantly reduce karta hai.',
      ),
      h('Anchoring'),
      p(
        'Anchoring = apne entry price ko reference samajhna. "Main ₹100 par kharida tha, ₹85 par nahi bechunga" — par market ko aapka entry price pata nahi. Sunk cost fallacy isi ka cousin hai: "already ₹15,000 loss hua, ab bech kar kya faayda".',
      ),
      h('Biases ka summary table'),
      table(
        ['Bias', 'Market manifestation', 'Countermeasure'],
        [
          ['Loss aversion', 'Winners jaldi bechna, losers hold karna', 'Pre-defined exit rules'],
          ['Overconfidence', 'Position size badhana', 'Fixed risk %'],
          ['FOMO', 'Late chase entries', 'Watchlist-only rule'],
          ['Revenge', 'Impulsive trades after loss', 'Daily loss limit'],
          ['Confirmation', 'Ignoring bearish evidence', 'Pre-mortem exercise'],
          ['Anchoring', 'Entry price se attached hona', 'Market-based stop'],
          ['Recency', 'Recent streak se assume trend', 'Statistical thinking'],
        ],
      ),
      callout(
        'warn',
        'Psychology ka honest take',
        '"Discipline" ek moral trait nahi hai — wo system design ka result hai. Jo log disciplined hain, unke paas usually rules, checklists aur automatic stops hote hain. Willpower par bharosa karna systemic design ki kami ki nishani hai.',
      ),
    ],
    summary: [
      'Fear entries coin-flip aur exits premature banata hai.',
      'Greed winning streaks me risk badhata hai.',
      'FOMO worst price par entry karvata hai.',
      'Revenge trading ek chhote loss ko disaster me badal deta hai.',
      'Biases ka solution system design hai, willpower nahi.',
    ],
    mistakes: [
      'Willpower par rely karna.',
      'Loss ke baad turant trade lena.',
      'Pre-plan ke bina entries lena.',
    ],
    keyPoints: [
      'Emotion → impulsive action → bigger loss cycle.',
      'Rules and limits biases se bachate hain.',
      'Pre-mortem confirmation bias ka best counter hai.',
    ],
    quiz: [
      {
        q: 'Revenge trading ka sabse effective countermeasure kya hai?',
        options: [
          'Zyada focus karein',
          'Hard daily loss limit — limit hit par trading band',
          'Position size double karein',
          'Different market try karein',
        ],
        answer: 1,
        explain: 'Structural limit emotion ko override karti hai — discipline ka system design.',
      },
      {
        q: 'FOMO entry ka structural problem kya hai?',
        options: [
          'Brokerage zyada lagti hai',
          'Worst price par entry + wide stop + poor R:R',
          'Order reject hota hai',
          'Volume kam hota hai',
        ],
        answer: 1,
        explain: 'Momentum ke peak par entry = kharab R:R, aur reversal par bada loss.',
      },
      {
        q: 'Anchoring bias ka example kya hai?',
        options: [
          '"Main ₹100 par kharida tha, isliye ₹85 par nahi bechunga"',
          'Stop-loss lagana',
          'Position size calculate karna',
          'Diversification',
        ],
        answer: 0,
        explain: 'Entry price ko irrational reference bana lena — market usse ignore karta hai.',
      },
    ],
    exercise:
      'Apni (hypothetical ya paper trading) last 10 trades review karein. Har ek ke liye likhein: kya koi bias involved tha (FOMO, revenge, anchoring, confirmation)? Pattern identify karein.',
  },

  'strategies-risk-psychology/trading-psychology/discipline-and-journals': {
    objectives: [
      'Trading journal ka structure aur purpose.',
      'Process metrics vs outcome metrics.',
      'Discipline build karne ka systemic approach.',
    ],
    intro:
      'Trading journal ek diary nahi hai — wo ek data collection system hai. Jo log trade karte hain par record nahi rakhte, wo actually practice nahi kar rahe; wo experience collect kar rahe hain bina learning ke.',
    blocks: [
      h('Journal me kya record karein'),
      table(
        ['Field', 'Why'],
        [
          ['Date/time', 'Patterns across time'],
          ['Instrument', 'Which markets work for you'],
          ['Setup name', 'Isolate which edge works'],
          ['Entry/stop/target', 'Plan vs execution'],
          ['Actual exit', 'Slippage, discipline'],
          ['Position size', 'Risk consistency'],
          ['R multiple result', 'Normalised outcome'],
          ['Clean or broken rule', 'Process quality'],
          ['Emotional state (1-5)', 'Psychology patterns'],
          ['Screenshot', 'Visual review'],
          ['Note/lesson', 'Learning capture'],
        ],
      ),
      h('Process vs outcome'),
      p(
        'Sabse important distinction: **process metrics vs outcome metrics**. Ek trade jisme aapne rules follow kiye aur loss hua — wo good process, bad outcome. Ek trade jisme aapne rules tod kar profit kamaya — bad process, good outcome. Zyada log outcome se seekhte hain, isliye galat lessons seekhte hain.',
      ),
      callout(
        'info',
        'Process metrics',
        'Track: setup frequency, plan adherence %, stop discipline %, slippage, position sizing consistency. Ye cheezein aapke control me hain. Outcome (P&L) partly luck hai.',
      ),
      example(
        'Journal review example',
        '10 trades ka review: 8 clean rules, 2 rule breaks (both were FOMO entries). Clean trades: 5 wins, 3 losses, expectancy +0.6R. Rule-break trades: 0 wins, 2 losses, expectancy −1.0R. Conclusion: technical edge achha hai, problem FOMO entries hain. Solution: watchlist-only rule. Ye data-driven improvement hai.',
        [
          'Segment by rule adherence.',
          'Compare expectancy.',
          'Identify weak category.',
          'Fix specific behaviour, not "be more disciplined".',
        ],
      ),
      h('R-multiple system'),
      formula(
        'R-multiple',
        'R = Profit or loss ÷ Initial risk (entry − stop)',
        'Agar risk ₹500 tha aur aapne ₹1,500 kamaya, to result = +3R. Agar ₹500 kho diya, to −1R.',
      ),
      p(
        'R-multiple normalize karta hai — different position sizes ke across comparison allow karta hai. Aapki performance ka real measure average R per trade hai.',
      ),
      h('Discipline build karne ke structural steps'),
      olist([
        '**Rules likhein** — paper par, clear, unambiguous.',
        '**Checklist banayein** — entry se pehle 5-point check.',
        '**Pre-commit risk** — order ke saath stop.',
        '**Daily loss limit** — hard stop.',
        '**Journal every trade** — without exception.',
        '**Weekly review** — 30 min, patterns dhoondein.',
        '**Monthly deep review** — statistics aur adjustments.',
      ]),
      callout(
        'warn',
        'Journaling ka common failure',
        'Log journal shuru karte hain par 2 hafte me band kar dete hain kyunki wo time-consuming lagta hai. Solution: minimum viable journal — 5 fields (setup, R result, rule follow?, emotion, one-line lesson). 10 seconds per trade. Consistency > completeness.',
      ),
      h('Accountability'),
      list([
        'Public/peer accountability helps (trading group me weekly stats share).',
        'Written pre-trade plan ek form of self-accountability hai.',
        'Rules ka automated enforcement best hai (broker-level stops).',
        'Mistakes ko "business expenses" samjhein, but unhe count karein.',
      ]),
      callout(
        'info',
        'Learnyx me journaling',
        'Aapka paper trading simulator ka data local storage me save hota hai. Lesson bookmarks, quiz scores aur notes bhi. Ye data export karke apne external journal me use kar sakte hain. Hum yahan aapko framework dete hain jo aap actually kar sakte hain.',
      ),
    ],
    summary: [
      'Journal data collection system hai, diary nahi.',
      'Process metrics outcome metrics se zyada important hain.',
      'Rule adherence ko segment karke analyse karein.',
      'R-multiple normalization deta hai.',
      'Minimum viable journal consistent ho to full journal se better hai.',
    ],
    mistakes: [
      'Sirf P&L record karna, process ignore karna.',
      'Journal ko inconsistent maintain karna.',
      'Loss ko "bad trade" samajhna bina process check kiye.',
    ],
    keyPoints: [
      'Good process + bad outcome ≠ mistake.',
      'R-multiples comparison enable karte hain.',
      'Consistency > completeness.',
    ],
    quiz: [
      {
        q: 'Rules follow karke loss hua. Ye kaisa trade hai?',
        options: [
          'Bad trade',
          'Good process, bad outcome — business expense',
          'Mistake',
          'Rules galat hain',
        ],
        answer: 1,
        explain: 'Process quality aur outcome alag cheezein hain. Rules follow karna hi learning ka base hai.',
      },
      {
        q: 'R-multiple ka purpose kya hai?',
        options: [
          'Brokerage calculate karna',
          'Different position sizes ke across results normalise karna',
          'Volume measure karna',
          'Trend identify karna',
        ],
        answer: 1,
        explain: 'R = profit/loss ÷ initial risk. Isse apples-to-apples comparison hota hai.',
      },
      {
        q: 'Journaling ka sabse common failure kya hai?',
        options: [
          'Zyada fields',
          'Inconsistency — 2 hafte me band ho jaana; solution minimum viable journal',
          'Screenshots',
          'Too much data',
        ],
        answer: 1,
        explain: 'Consistency critical hai. 5 essential fields daily maintain karna better hai.',
      },
    ],
    exercise:
      'Apna minimum viable journal template banayein (5 fields). Trading Lab ke Paper Trading Simulator se 5 trades karein. Har trade record karein — setup, R result, rule follow, emotion, lesson.',
  },

  /* ================================================================ */
  /* MODULE 4 — Strategy Testing                                      */
  /* ================================================================ */
  'strategies-risk-psychology/strategy-testing/defining-strategy-rules': {
    objectives: [
      'Testable strategy ko define karna.',
      'Entry, exit, sizing aur filter rules.',
      'Ambiguity ka strategy par asar.',
    ],
    intro:
      'Ek strategy tabhi testable hai jab uske rules unambiguous hon. "Support par kharido" testable nahi hai; "previous day ke low ke 0.5% ke andar, bullish engulfing par, entry next candle high ke above, stop engulfing low ke 1 ATR neeche" testable hai.',
    blocks: [
      h('Strategy ke components'),
      table(
        ['Component', 'Question', 'Example'],
        [
          ['Universe', 'Kya trade karenge?', 'NIFTY 50 stocks only'],
          ['Regime filter', 'Kis market condition me?', 'Price above 200 DMA'],
          ['Setup trigger', 'Exact entry condition?', 'Bullish engulfing at support zone'],
          ['Entry price', 'Kaunsi price?', 'Next candle high + 0.1%'],
          ['Stop loss', 'Kahan galat hain?', 'Engulfing low − 0.5 ATR'],
          ['Target', 'Kab exit?', '2R ya previous swing high'],
          ['Time exit', 'Agar kuch na ho?', '10 candles baad exit'],
          ['Position size', 'Kitna?', '1% risk ÷ stop distance'],
          ['Filters', 'Kab skip karein?', 'Event days, low volume'],
        ],
      ),
      h('Ambiguity ka cost'),
      p(
        'Agar rule me "strong trend" likha hai, to aap har trade me apne hisaab se "strong" interpret karenge — aur backtest impossible ho jaayega kyunki machine ko ambiguity nahi samajh aati. Isliye rules quantify karein: "price > 50 DMA > 200 DMA AND 50 DMA rising for 10 days".',
      ),
      example(
        'Vague se precise tak',
        'Vague: "Breakout par kharido jab volume achha ho." Precise: "Buy jab close 20-day high ke upar ho, candle volume 20-day average ka 1.5x se zyada ho, ATR current 3-month average se kam ho. Entry next day open. Stop entry − 1.5 ATR. Target 3R ya 15 trading days." Ab ye testable hai.',
        [
          'Har condition quantified.',
          'Entry/stop/target defined.',
          'Time exit defined.',
          'Machine-testable.',
        ],
      ),
      callout(
        'warn',
        'Over-specification ka trap',
        'Bahut zyada conditions add karne se strategy sirf historical data par kaam karti hai (overfitting). Aim: 3–6 meaningful conditions. Agar 15 conditions hain, to sample size chhoti ho jaayegi aur curve fitting hogi.',
      ),
      h('Long vs short symmetry'),
      p(
        'Zyaadatar retail strategies long-only hoti hain (India me shorting restrictions ke karan). Agar aapki strategy ko symmetrical long/short design kar rahe hain, to dono sides test karein — markets me downside behaviour upside se different hota hai (volatility asymmetry).',
      ),
      h('Rules ka documentation'),
      list([
        'One-page strategy document likhein.',
        'Har parameter ka reason note karein.',
        'Edge cases define karein (gap, circuit, halt).',
        'Version control rakhein (v1, v2...).',
        'Changes ke baad re-test karein.',
      ]),
      callout(
        'info',
        'Strategy Lab',
        'Learnyx Trading Lab ka **Strategy Builder** aapko conditions combine karke readable rules banane deta hai. Phir **Backtesting Simulator** un rules ko sample data par test karta hai — with fees aur slippage. Ye safe, educational environment hai real money ke bina.',
      ),
    ],
    summary: [
      'Testable strategy ke liye unambiguous rules chahiye.',
      'Components: universe, filter, trigger, entry, stop, target, size, time exit.',
      'Ambiguity backtest impossible banati hai.',
      '3–6 meaningful conditions enough hain; zyada = overfitting.',
      'One-page documentation aur versioning essential hai.',
    ],
    mistakes: [
      'Vague rules likhna ("strong momentum").',
      '15 conditions add karna.',
      'Rules change karke re-test na karna.',
    ],
    keyPoints: [
      'If it cannot be written as code, it is not testable.',
      'Precision enables measurement.',
      'Document + version everything.',
    ],
    quiz: [
      {
        q: 'Testable strategy ka basic requirement kya hai?',
        options: [
          'Complex indicators',
          'Unambiguous quantify-able rules',
          'Multiple timeframes',
          'Leverage',
        ],
        answer: 1,
        explain: 'Rules precise hone chahiye warna repeatable testing possible nahi.',
      },
      {
        q: 'Bahut zyada conditions add karne ka risk kya hai?',
        options: [
          'Strategy slow ho jaati hai',
          'Overfitting — sirf historical data par kaam karti hai',
          'Brokerage badh jaati hai',
          'Order reject hota hai',
        ],
        answer: 1,
        explain: 'Zyada parameters sample ko fit kar lete hain — out-of-sample performance gir jaati hai.',
      },
      {
        q: 'Strategy document me kya hona chahiye?',
        options: [
          'Sirf entry rule',
          'Universe, filters, entry, stop, target, size, time exit — sab',
          'Sirf profit target',
          'Sirf indicator settings',
        ],
        answer: 1,
        explain: 'Complete specification ke bina strategy reproduce nahi ho sakti.',
      },
    ],
    exercise:
      'Ek strategy one-pager likhein. Har rule quantify karein. Phir Strategy Builder me use build karein. Likh kar batao: kaunse rules quantify karna mushkil tha aur kyun?',
  },

  'strategies-risk-psychology/strategy-testing/backtesting-and-metrics': {
    objectives: [
      'Backtesting ka correct process.',
      'Win rate, profit factor, drawdown, expectancy.',
      'Forward testing aur paper trading ka role.',
    ],
    intro:
      'Backtest aapko batata hai ki ek idea historically kaam karta tha ya nahi. Par backtest easily lie karta hai — agar aap usse jhooth bolne dein. Is lesson me hum honest testing ka process sikhayenge.',
    blocks: [
      h('Metrics jo matter karte hain'),
      formula(
        'Key metrics',
        'Win rate = Wins ÷ Total trades × 100\nProfit factor = Gross profit ÷ Gross loss\nExpectancy = (Win% × AvgWin) − (Loss% × AvgLoss)\nMax drawdown = largest peak-to-trough %',
        'Profit factor 1.5+ reasonable hai; 3+ suspicious ho sakta hai (overfitting ya data error).',
      ),
      table(
        ['Metric', 'Healthy range', 'Warning sign'],
        [
          ['Win rate', '35–65%', '90%+ (chhote wins, bade losses pattern)'],
          ['Profit factor', '1.3–2.5', '<1.1 ya >4'],
          ['Max drawdown', '<20%', '>35%'],
          ['Trades count', '100+', '<30 (statistically meaningless)'],
          ['Avg R', '0.2R+', 'Near zero after costs'],
        ],
      ),
      h('Backtest ka correct process'),
      olist([
        'Hypothesis define karein (why should this work?).',
        'Rules precisely likhein.',
        'Data quality check karein (adjusted prices, no gaps).',
        'In-sample test karein (e.g. 2015–2020).',
        'Out-of-sample test karein (e.g. 2021–2025) — rules **change na karein**.',
        'Costs include karein (fees, slippage).',
        'Parameter sensitivity test karein.',
        'Paper trade forward karein.',
      ]),
      callout(
        'warn',
        'Backtest ke 7 deadly sins',
        '1) **Look-ahead bias** — future data use karna (e.g. "closing price" par entry jab wo available nahi tha). 2) **Survivorship bias** — sirf current stocks use karna, delisted ignore karna. 3) **Overfitting** — parameters ko historical data par tune karna. 4) **No costs** — fees/slippage zero. 5) **Ignoring liquidity** — illiquid stocks par bade positions. 6) **Cherry-picked period** — sirf favourable years. 7) **Multiple testing** — 100 variations test karke best report karna (data mining).',
      ),
      example(
        'Overfitting ka classic example',
        'Trader 50 parameter combinations test karta hai. Best combination 45% annual return dikhata hai. Wo live trade karta hai. Result: −15% in 3 months. Kyun? Kyunki 50 combinations me se best ko chunna selection bias hai — usne noise ko fit kiya, edge ko nahi. Solution: fewer parameters, out-of-sample validation, aur parameter sensitivity check.',
        [
          '50 combos → best by luck possible.',
          'Out-of-sample fail hone se pata chalta.',
          'Fewer parameters = robust.',
          'Sensitivity test zaroori.',
        ],
      ),
      h('Forward testing'),
      p(
        'Backtest ke baad **forward test** (paper trading) karein. Ye real-time data par rule execution test karta hai — including slippage, gaps aur emotional response. Minimum 1-3 mahine ya 30-50 trades. Agar forward results backtest se materially different hain, investigate karein.',
      ),
      table(
        ['Phase', 'Data', 'Purpose', 'Duration'],
        [
          ['In-sample backtest', 'Historical', 'Idea validation', 'Hours'],
          ['Out-of-sample', 'Historical (reserved)', 'Robustness check', 'Hours'],
          ['Forward/paper', 'Live simulated', 'Execution + psychology', '1–3 months'],
          ['Small live', 'Real', 'Real costs/slippage', '3–6 months, small size'],
        ],
      ),
      callout(
        'info',
        'Learnyx Backtesting Simulator',
        'Lab ka backtester educational hai — sample historical data par simple rules test karta hai, fees aur slippage configurable hain. **Ye results predictions nahi hain** — sirf ye samajhne ke liye hain ki costs aur randomness results ko kaise affect karte hain.',
      ),
    ],
    summary: [
      'Profit factor, expectancy aur drawdown key metrics hain.',
      'Win rate alone misleading hai.',
      'Out-of-sample testing overfitting detect karta hai.',
      'Costs include karna mandatory hai.',
      'Backtest ke baad forward test karein.',
    ],
    mistakes: [
      'Look-ahead bias.',
      'Costs zero karna.',
      'In-sample results ko live edge samajhna.',
      'Selection bias (100 variations me se best chunna).',
    ],
    keyPoints: [
      'Backtest = hypothesis test, not proof.',
      'Out-of-sample honesty ka check hai.',
      'Costs backtest ko realistic banate hain.',
    ],
    quiz: [
      {
        q: 'Profit factor ka formula kya hai?',
        options: [
          'Gross loss ÷ gross profit',
          'Gross profit ÷ gross loss',
          'Wins ÷ total trades',
          'Avg win ÷ avg loss',
        ],
        answer: 1,
        explain: 'Profit factor = gross profit ÷ gross loss. 1.5+ reasonable maana jaata hai.',
      },
      {
        q: 'Overfitting detect karne ka best way kya hai?',
        options: [
          'Zyada indicators add karna',
          'Out-of-sample data par test karna',
          'Longer backtest period',
          'Leverage badhana',
        ],
        answer: 1,
        explain: 'Agar out-of-sample performance collapse ho jaaye, to strategy overfit thi.',
      },
      {
        q: 'Look-ahead bias ka example kya hai?',
        options: [
          'Stop-loss use karna',
          'Closing price par entry assume karna jab wo available hi nahi tha',
          'Fees include karna',
          'Drawdown calculate karna',
        ],
        answer: 1,
        explain: 'Future information use karna backtest ko artificially achha bana deta hai.',
      },
    ],
    exercise:
      'Backtesting Simulator me ek simple strategy test karein (jaisa hai). Phir fees aur slippage badha kar dobara test karein. Compare karein: results kitna badla? Isse cost sensitivity ka real sense milega.',
  },

  'strategies-risk-psychology/strategy-testing/biases-in-testing': {
    objectives: [
      'Sample size ka statistical importance.',
      'Survivorship aur selection bias.',
      'Overfitting ka mechanism.',
    ],
    intro:
      'Testing me sabse bada dushman aap khud hain — aapka brain patterns dhoondhta hai jahan sirf randomness hai. Is lesson me hum specific biases dekhenge aur unhe counter karne ke practical methods.',
    blocks: [
      h('Sample size'),
      p(
        'Randomness ko average karne ke liye sample chahiye. 10 trades me 7 winners = luck ho sakta hai. 100 trades me 70 winners = strong evidence. Statistics ka basic: chhoti sample par variance dominate karti hai.',
      ),
      formula(
        'Standard error approximation',
        'SE = √(p(1−p) ÷ n)\np = observed win rate, n = sample size',
        'Win rate 55%, n = 20: SE = √(0.55 × 0.45 ÷ 20) = 0.111 → 11.1%. Matlab true win rate 44% se 66% ke beech ho sakta hai. n = 100: SE = 5% — kaafi better.',
      ),
      table(
        ['Sample size', '95% confidence range (55% observed)'],
        [
          ['10', '±31%'],
          ['30', '±18%'],
          ['50', '±14%'],
          ['100', '±10%'],
          ['200', '±7%'],
          ['500', '±4.4%'],
        ],
      ),
      callout(
        'warn',
        'Minimum 100 trades',
        '100 se kam trades par koi bhi conclusion premature hai. Isi liye "10 trades me 8 winners" wali strategy analysis meaningless hai. Ye patience-demanding hai par zaroori hai.',
      ),
      h('Survivorship bias'),
      p(
        'Agar aap sirf currently listed stocks par backtest karein, to aapne wo saare companies ignore kar diye jo bankrupt ya delisted ho gaye. Isse results artificially achhe lagte hain — kyunki losers data se gayab hain.',
      ),
      example(
        'Survivorship bias example',
        'Aap "small cap momentum" strategy test karte hain current NIFTY Smallcap 250 par. 2015 ke current constituents use karte hain. Lekin 2015 ke baad kai companies delist ho gayi. Unka data missing hai. Result: strategy ka return artificially inflated. Solution: point-in-time index constituents use karein (jahan available ho).',
        [
          'Current constituents ≠ historical universe.',
          'Delisted stocks missing.',
          'Results inflated.',
          'Point-in-time data chahiye.',
        ],
      ),
      h('Overfitting ka mechanism'),
      p(
        'Har extra parameter data me "fit" karne ki flexibility deta hai. 3 parameters wali strategy me combinations kam hote hain; 8 parameters me lakhon combinations. Best combination milna easy ho jaata hai — luck se.',
      ),
      callout(
        'info',
        'Parameter sensitivity test',
        'Ek robust strategy ka performance parameters ke chhote changes par dramatically nahi girta. Test: moving average period 20 → 18, 22 test karein. Agar performance 40% se 5% ho jaaye, wo fragile hai. Robust strategy 25% → 22% → 20% jaisi stable behaviour dikhati hai.',
      ),
      h('Multiple testing / p-hacking'),
      p(
        'Agar aap 100 strategies test karein, statistically 5 "significant" milenge by chance (5% significance level). Ye data mining hai. Isliye: (1) pehle hypothesis socho, phir test karo — ulta nahi. (2) Kitne tests kiye, wo disclose karo. (3) Out-of-sample validation mandatory.',
      ),
      h('Recency aur regime bias'),
      list([
        'Sirf recent bull market me test karna — bear market behaviour unknown.',
        'One regime (low volatility) me test karke high volatility assume karna.',
        'COVID/2008 jaise extreme events include karna zaroori hai.',
        'Multiple regimes (bull, bear, sideways) me test karein.',
      ]),
      callout(
        'warn',
        'The honest conclusion',
        'Backtest results **future ka prediction nahi** hain. Wo sirf batate hain ki ek idea historical data me kaisa behave karta. Real conviction results se nahi, **reasoning** se aati hai: why should this edge exist? Agar aap wo explain nahi kar sakte, to backtest bhi help nahi karega.',
      ),
    ],
    summary: [
      '100+ trades minimum sample size hai.',
      'Survivorship bias delisted losers ko hide karta hai.',
      'Overfitting parameters ke through luck ko fit karta hai.',
      'Parameter sensitivity robustness test hai.',
      'Multiple testing false positives create karti hai.',
    ],
    mistakes: [
      'Chhoti sample se conclusions.',
      'Current constituents par historical backtest.',
      'Hypothesis ke baad test dhoondhna (HARKing).',
    ],
    keyPoints: [
      'Sample size = statistical validity.',
      'Robustness > optimisation.',
      'Reasoning edge ka real source hai.',
    ],
    quiz: [
      {
        q: 'Minimum kitne trades ka sample chahiye?',
        options: ['10', '30', '100+', '5'],
        answer: 2,
        explain: '100+ trades par statistical confidence meaningful hoti hai. Chhoti samples par variance dominate karti hai.',
      },
      {
        q: 'Survivorship bias kya karta hai?',
        options: [
          'Returns under-estimate karta hai',
          'Delisted/bankrupt stocks ko exclude karke returns artificially inflate karta hai',
          'Costs badha deta hai',
          'Sample size badha deta hai',
        ],
        answer: 1,
        explain: 'Losers data se gayab ho jaate hain — strategy better dikhti hai than reality.',
      },
      {
        q: 'Parameter sensitivity test kya batata hai?',
        options: [
          'Strategy fast hai ya nahi',
          'Strategy robust hai ya fragile (small parameter changes par collapse)',
          'Brokerage kitna hai',
          'Volume kitna hai',
        ],
        answer: 1,
        explain: 'Robust strategies parameter changes par stable rehti hain; fragile ones collapse karti hain.',
      },
    ],
    exercise:
      'Backtesting Simulator me ek strategy ke 3 parameter variations test karein (e.g. MA 18, 20, 22). Results compare karein. Likh kar batao: performance stable tha ya fragile?',
  },
};
