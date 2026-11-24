import type { GlossaryEntry } from '../lib/types';

/**
 * A–Z financial glossary. Every entry has a plain-Hinglish meaning plus a
 * detailed explanation, a category used by the filters, and related terms.
 * Terms are real market concepts — no filler entries to inflate counts.
 */

interface Seed {
  term: string;
  short: string;
  detail: string;
  category: GlossaryCategory;
  related?: string[];
  example?: string;
  slug?: string;
}

export type GlossaryCategory =
  | 'Market Basics'
  | 'Technical Analysis'
  | 'Fundamental Analysis'
  | 'Risk & Psychology'
  | 'Derivatives'
  | 'Markets & Macro'
  | 'Market Structure';

export const glossaryCategories: GlossaryCategory[] = [
  'Market Basics',
  'Technical Analysis',
  'Fundamental Analysis',
  'Risk & Psychology',
  'Derivatives',
  'Markets & Macro',
  'Market Structure',
];

const seeds: Seed[] = [
  /* ---------------- A ---------------- */
  {
    term: 'Accumulation',
    short: 'Chupke se kharidari ka phase',
    detail:
      'Jab price range me flat rehti hai par bade players dheere-dheere position build karte hain. Volume patterns aur price compaction iske hints ho sakte hain. Ye evidence hai, guarantee nahi — aur phase aksar hindsight me hi confirm hota hai.',
    category: 'Technical Analysis',
    related: ['Distribution', 'Consolidation'],
  },
  {
    term: 'Alpha',
    short: 'Benchmark se extra return',
    detail:
      'Portfolio ka wo return jo benchmark (jaise NIFTY 50) se zyada hai, risk-adjusted basis par. Positive alpha ka matlab manager ne benchmark ke against value add ki. Costs aur risk adjust kiye bina alpha claim karna galat hai.',
    category: 'Fundamental Analysis',
    related: ['Beta', 'Sharpe Ratio'],
  },
  {
    term: 'Arbitrage',
    short: 'Price gap se risk-free profit',
    detail:
      'Ek hi asset ka price do jagah different ho to kam me kharid kar zyada me bechna. Theoretical risk-free hai, par execution risk, fees aur liquidity constraints practically risk add karte hain. Retail ke liye accessible opportunities rare hoti hain.',
    category: 'Market Structure',
    related: ['Spread', 'Market Maker'],
  },
  {
    term: 'Ask (Offer)',
    short: 'Seller ka maanga hua price',
    detail:
      'Order book me sabse kam price jis par koi bechne ko tayyar hai. Aap yahan kharidte hain (taker ke roop me). Ask aur bid ke beech ka gap spread kehlata hai — aapka immediate trading cost.',
    category: 'Market Structure',
    related: ['Bid', 'Spread', 'Order Book'],
  },
  {
    term: 'ATR (Average True Range)',
    short: 'Volatility ka measure',
    detail:
      'True range ka moving average — gaps ko bhi include karta hai. ATR se volatility-adjusted stop-loss aur position sizing nikalte hain. ATR direction nahi batata, sirf magnitude. Backward-looking hai, isliye regime change par outdated ho sakta hai.',
    category: 'Technical Analysis',
    related: ['Volatility', 'Stop Loss'],
    example: 'Stock ₹500 par hai, ATR(14) = ₹12. 1.5×ATR stop = ₹482.',
  },
  {
    term: 'Averaging Down',
    short: 'Girte price par aur kharidna',
    detail:
      'Ek position me loss hone par aur kharid kar average cost kam karna. Ye profit-making ka legit strategy ho sakta hai (agar thesis intact hai aur capital allocation disciplined hai), par aksar "loss theek ho jaayega" wali thinking ka result hota hai. Isliye position sizing aur max allocation limits zaroori hain.',
    category: 'Risk & Psychology',
    related: ['Averaging Up', 'Position Sizing'],
  },
  {
    term: 'Averaging Up',
    short: 'Profit me position badhana',
    detail:
      'Winning position me aur kharidna, usually ascending structure ke saath. Ye pyramid strategy kehlati hai. Profitable hone par capital add karna mathematically better hai (winning trend ke saath), par average cost badhta hai aur reversal me loss amplify hota hai.',
    category: 'Risk & Psychology',
    related: ['Averaging Down', 'Position Sizing'],
  },

  /* ---------------- B ---------------- */
  {
    term: 'Backtesting',
    short: 'Historical data par strategy test',
    detail:
      'Rules ko past data par apply karke performance measure karna. Isme look-ahead bias, survivorship bias, costs aur out-of-sample testing ka dhyaan rakhna zaroori hai. Backtest result future guarantee nahi — sirf ek hypothesis ka evidence hai.',
    category: 'Risk & Psychology',
    related: ['Overfitting', 'Forward Testing', 'Win Rate'],
  },
  {
    term: 'Balance Sheet',
    short: 'Company ki financial position ka snapshot',
    detail:
      'Ek specific date par assets, liabilities aur equity dikhata hai. Accounting equation: Assets = Liabilities + Equity. Receivables, inventory aur debt profile ke trends earnings quality ke important signals hain.',
    category: 'Fundamental Analysis',
    related: ['Income Statement', 'Cash Flow Statement'],
  },
  {
    term: 'Bear Market',
    short: 'Lambi girawat ka phase',
    detail:
      'Recent high se 20%+ giravat ko conventionally bear market kehte hain. Threshold convention hai, law nahi — different assets different volatility profile rakhte hain. Bear market me bhi rallies aati hain, aur sP/E compress hota hai.',
    category: 'Market Basics',
    related: ['Bull Market', 'Correction'],
  },
  {
    term: 'Beta',
    short: 'Market ke saath sensitivity',
    detail:
      'Stock ka market index ke against historical sensitivity. Beta 1.5 matlab market 10% move par stock lagbhag 15% move karta tha. Time-varying hota hai, index choice matter karti hai, aur tail risk capture nahi karta — isliye partial risk picture hai.',
    category: 'Risk & Psychology',
    related: ['Volatility', 'Alpha', 'Correlation'],
  },
  {
    term: 'Bid',
    short: 'Buyer ka best price',
    detail:
      'Order book me sabse zyada price jo koi buyer de raha hai. Aap yahan bech sakte hain. Bid aur ask ke gap se spread banti hai — liquidity ka price tag.',
    category: 'Market Structure',
    related: ['Ask (Offer)', 'Spread', 'Market Depth'],
  },
  {
    term: 'Bollinger Bands',
    short: 'Volatility ke bands',
    detail:
      'SMA(20) ± 2 standard deviations. Bands volatility ke hisaab se expand/contract hote hain. Band par price hona "overbought" nahi — strong trend me price band ke saath chal sakti hai ("walking the band"). Squeeze expansion ka setup deta hai, direction nahi.',
    category: 'Technical Analysis',
    related: ['Standard Deviation', 'Volatility Squeeze'],
  },
  {
    term: 'Bond',
    short: 'Udhaar ka tradeable form',
    detail:
      'Issuer ko principal dene par fixed coupon aur maturity par principal wapas milta hai. Bond price aur yield inverse relationship rakhte hain. Yield premium credit risk ka price hai — high yield free lunch nahi.',
    category: 'Markets & Macro',
    related: ['Yield', 'Credit Rating', 'Duration'],
  },
  {
    term: 'Break of Structure (BOS)',
    short: 'Trend direction me last swing ka break',
    detail:
      'Uptrend me swing high ka break (ya downtrend me swing low ka break) trend continuation ka evidence hai. Ye descriptive label hai — "smart money" ka proof nahi. Close basis aur follow-through se confirm karein.',
    category: 'Technical Analysis',
    related: ['Change of Character', 'Market Structure', 'Swing High'],
  },
  {
    term: 'Breakout',
    short: 'Resistance/support ke paar decisive move',
    detail:
      'Price jab ek defined level (range, triangle, trendline) ke paar close ho. Valid breakout ke liye candle close level ke bahar, volume expansion aur ideally retest ka hold chahiye. Wick-based breaks ko false breakout maana jaata hai.',
    category: 'Technical Analysis',
    related: ['False Breakout', 'Retest', 'Consolidation'],
  },
  {
    term: 'Broker',
    short: 'Exchange tak aapki pahunch',
    detail:
      'Registered intermediary jo orders exchange tak route karta hai, margin/accounting manage karta hai aur reporting karta hai. Broker exchange nahi hota — wo aapka gateway hai. Charges brokerage, taxes aur statutory fees me divided hote hain.',
    category: 'Market Structure',
    related: ['Demat Account', 'Depository', 'Settlement'],
  },
  {
    term: 'Bull Market',
    short: 'Lambi tezi ka phase',
    detail:
      'Recent low se 20%+ rise, broad-based aur sustained. Sirf index level nahi — breadth, earnings aur sentiment bhi consider hoti hai. Bull market me bhi corrections aati hain.',
    category: 'Market Basics',
    related: ['Bear Market', 'Correction', 'Sentiment'],
  },
  {
    term: 'Buyback',
    short: 'Company apne shares kharidti hai',
    detail:
      'Company market se apne shares kharid kar cancel karti hai. Supply kam hone se EPS badh sakta hai. Ye capital return ka ek tarika hai (dividend ke alternative). Shareholder approval aur regulatory rules apply hote hain.',
    category: 'Fundamental Analysis',
    related: ['Dividend', 'EPS (Earnings Per Share)', 'Float (Free Float)'],
  },

  /* ---------------- C ---------------- */
  {
    term: 'CAGR',
    short: 'Compound annual growth rate',
    detail:
      'Ek investment ki annualised growth rate, compounding ko account me lete hue: CAGR = (End ÷ Start)^(1/years) − 1. Ye smooth growth dikhata hai — actual path zigzag hota hai. Volatility alag se dekhni chahiye.',
    category: 'Fundamental Analysis',
    related: ['Compounding', 'Total Return'],
  },
  {
    term: 'Call Option',
    short: 'Kharidne ka right',
    detail:
      'Buyer ko strike price par underlying kharidne ka right milta hai (obligation nahi), premium dekar. Max loss premium tak. Time decay buyer ke against kaam karti hai.',
    category: 'Derivatives',
    related: ['Put Option', 'Premium', 'Strike Price', 'Theta'],
  },
  {
    term: 'Candlestick',
    short: 'OHLC ka visual',
    detail:
      'Body open-close ke beech, wicks high-low tak. Shape sentiment ka description deta hai. Colour alone signal nahi — position in structure aur volume context zaroori hai.',
    category: 'Technical Analysis',
    related: ['Doji', 'Hammer', 'Engulfing Pattern'],
  },
  {
    term: 'Cash Flow Statement',
    short: 'Actual paisa ka movement',
    detail:
      'Operating, investing aur financing activities me cash flows. Operating cash flow (CFO) net income se zyada reliable measure hai kyunki accounting estimates involved nahi hote. Free cash flow = CFO − capex.',
    category: 'Fundamental Analysis',
    related: ['Free Cash Flow', 'Income Statement', 'Balance Sheet'],
  },
  {
    term: 'Change of Character (CHoCH)',
    short: 'Trend ke against structure break',
    detail:
      'Uptrend me higher low ka break (ya downtrend me lower high ka break) — possible reversal ka pehla structural evidence. Akele CHoCH par counter-trend trade risky hai; naya structure (LH/LL) confirm hone ka wait karein.',
    category: 'Technical Analysis',
    related: ['Break of Structure', 'Market Structure', 'Reversal'],
  },
  {
    term: 'Circuit Breaker',
    short: 'Extreme move par trading halt',
    detail:
      'Market-wide index moves (India me 10/15/20%) par staged trading halts. Individual stocks ke liye price bands hote hain. Circuit-locked stocks me exit impossible ho sakta hai — stop-loss trigger hoke bhi execute nahi hota.',
    category: 'Market Structure',
    related: ['Price Band', 'Gap Up / Gap Down', 'Liquidity Risk'],
  },
  {
    term: 'Clearing Corporation',
    short: 'Trade guarantee aur settlement ka central counterparty',
    detail:
      'Har trade me buyer aur seller ke beech baith kar counterparty risk khatam karta hai. Netting, margin collection aur settlement guarantee iska kaam hai. India me NSE Clearing aur ICCL.',
    category: 'Market Structure',
    related: ['Settlement', 'Margin', 'Broker'],
  },
  {
    term: 'Compounding',
    short: 'Return par return',
    detail:
      'Returns ko reinvest karne se exponential growth hoti hai. 10% par 7 saal me paisa double hota hai (rule of 72). Calculator me constant returns unrealistic assumption hai — real markets me negative years bhi aate hain.',
    category: 'Market Basics',
    related: ['CAGR', 'Rule of 72'],
  },
  {
    term: 'Consolidation',
    short: 'Range me price ka rest phase',
    detail:
      'Volatility contraction jahan price defined range me move karti hai. Accumulation ya distribution ka phase ho sakta hai. Range ke beech trade karna usually poor risk-reward deta hai — boundaries ya breakout better hain.',
    category: 'Technical Analysis',
    related: ['Breakout', 'Range', 'Volatility Squeeze'],
  },
  {
    term: 'Correlation',
    short: 'Do assets ek saath move karte hain ya nahi',
    detail:
      '−1 se +1 ke beech. +1 = perfectly same direction, −1 = opposite. Diversification ka core correlation hai. Crisis me correlations 1 ki taraf jaati hain — exactly jab diversification ki zaroorat hoti hai.',
    category: 'Risk & Psychology',
    related: ['Diversification', 'Beta', 'Covariance'],
  },
  {
    term: 'Correction',
    short: '10–20% ki giri',
    detail:
      'Bear market se chhoti, pullback se badi decline. Normal market behaviour hai — har saal 5-10% corrections aati hain historically. Corrections ko opportunity samajhna ya threat, ye aapki allocation aur horizon par depend karta hai.',
    category: 'Market Basics',
    related: ['Bear Market', 'Pullback', 'Drawdown'],
  },
  {
    term: 'Cost of Carry',
    short: 'Position hold karne ki cost',
    detail:
      'Financing cost, storage aur insurance jo futures price ko spot se deviate karate hain. Contango me positive basis isi ka reflection hai. Long futures me rollover cost compounding drag ban sakta hai.',
    category: 'Derivatives',
    related: ['Contango', 'Backwardation', 'Basis'],
  },
  {
    term: 'Covariance',
    short: 'Do variables ek saath kaise move karte hain',
    detail:
      'Correlation ka unnormalised version. Beta calculation ka building block. Portfolio theory me risk calculation ka core input hai, par estimate karna historical data par depend karta hai.',
    category: 'Risk & Psychology',
    related: ['Correlation', 'Beta', 'Standard Deviation'],
  },
  {
    term: 'Credit Rating',
    short: 'Default risk ka assessment',
    detail:
      'Rating agencies (CRISIL, ICRA, CARE in India; Moody’s, S&P, Fitch globally) issuer ki debt repayment capability rate karte hain. AAA sabse safe, D default. Ratings lagging hote hain aur mistakes karte hain — apna analysis zaroori hai.',
    category: 'Markets & Macro',
    related: ['Bond', 'Yield', 'Default Risk'],
  },
  {
    term: 'Crypto Asset',
    short: 'Blockchain-based digital asset',
    detail:
      'Bitcoin, Ethereum jaise assets jo distributed ledgers par chalte hain. Custody risk, extreme volatility, regulatory uncertainty aur scam risk significant hain. Legal status jurisdiction-specific hai — verify karein.',
    category: 'Markets & Macro',
    related: ['Blockchain', 'Stablecoin', 'Custody Risk'],
  },

  /* ---------------- D ---------------- */
  {
    term: 'Day Trading',
    short: 'Same day entry aur exit',
    detail:
      'Positions ko market close se pehle square-off karna. Overnight gap risk zero, par intraday noise aur costs zyada. India me square-off mandatory hai. High screen time aur discipline demand karta hai.',
    category: 'Market Basics',
    related: ['Scalping', 'Swing Trading', 'Intraday'],
  },
  {
    term: 'Demat Account',
    short: 'Shares ka electronic vault',
    detail:
      'Jahan aapke shares depository me electronic form me hold hote hain. Trading account se alag hai — wo orders ke liye, ye custody ke liye. DP (aksar broker) ke through accessible.',
    category: 'Market Structure',
    related: ['Trading Account', 'Depository', 'ISIN'],
  },
  {
    term: 'Delta',
    short: 'Option ki price sensitivity',
    detail:
      'Underlying ke 1 point move par option price ka change. Call delta 0 to +1, put 0 to −1 (magnitude). ATM lagbhag 0.5. Deep ITM options stock jaisa behave karte hain (delta ≈ 1).',
    category: 'Derivatives',
    related: ['Gamma', 'Option Greeks', 'In the Money (ITM)'],
  },
  {
    term: 'Depository',
    short: 'Securities ka electronic custodian',
    detail:
      'India me NSDL aur CDSL. Shares dematerialised form me yahan rehte hain. Aap depository ke direct customer nahi — DP ke through jaate hain.',
    category: 'Market Structure',
    related: ['Demat Account', 'Settlement', 'ISIN'],
  },
  {
    term: 'Derivative',
    short: 'Underlying se value derive karne wala contract',
    detail:
      'Futures, options, swaps — jinki value kisi underlying (stock, index, currency, commodity) par depend karti hai. Risk transfer ke liye bane the; retail me mostly speculation hota hai. Leverage se risk amplify hota hai.',
    category: 'Derivatives',
    related: ['Futures', 'Options', 'Leverage'],
  },
  {
    term: 'Diversification',
    short: 'Risk ko failana',
    detail:
      'Uncorrelated assets me invest karke portfolio volatility kam karna. Position count se zyada correlation important hai — 10 bank stocks diversification nahi hai. Crisis me correlations converge hoti hain.',
    category: 'Risk & Psychology',
    related: ['Correlation', 'Asset Allocation', 'Concentration Risk'],
  },
  {
    term: 'Dividend',
    short: 'Profit ka shareholder ko distribution',
    detail:
      'Company ke profit ka hissa shareholders ko. Optional hai (interest ke ulta). Dividend yield = annual dividend ÷ price. High yield aksar price girne ka result hota hai — sustainability check karein.',
    category: 'Fundamental Analysis',
    related: ['Dividend Yield', 'Payout Ratio', 'Buyback'],
  },
  {
    term: 'Dividend Yield',
    short: 'Dividend ka percentage return',
    detail:
      'Annual dividend ÷ share price × 100. Very high yield (8%+) aksar warning signal hai — market ko lagta hai dividend sustainable nahi. Payout ratio aur free cash flow se verify karein.',
    category: 'Fundamental Analysis',
    related: ['Dividend', 'Payout Ratio'],
  },
  {
    term: 'Doji',
    short: 'Indecision candle',
    detail:
      'Open aur close lagbhag barabar — body bahut chhoti. Buyers aur sellers balanced. Strong trend ke end me exhaustion suggest kar sakta hai, par range ke beech me noise hai. Gravestone (upper wick) aur dragonfly (lower wick) variants hain.',
    category: 'Technical Analysis',
    related: ['Candlestick', 'Spinning Top', 'Indecision'],
  },
  {
    term: 'Drawdown',
    short: 'Peak se girawat',
    detail:
      'Peak value se current value tak ka percentage decline. Recovery asymmetric hai — 50% loss ke liye 100% gain chahiye. Maximum drawdown strategy ka key risk metric hai.',
    category: 'Risk & Psychology',
    related: ['Max Drawdown', 'Recovery Rate', 'Calmar Ratio'],
  },
  {
    term: 'Duration (Bonds)',
    short: 'Interest rate sensitivity',
    detail:
      'Bond price ka interest rate changes par sensitivity measure. Higher duration = higher rate sensitivity. Long-dated bonds me duration zyada hoti hai. Equity valuations ke liye bhi useful concept hai ("long duration assets").',
    category: 'Markets & Macro',
    related: ['Bond', 'Yield', 'Interest Rate'],
  },

  /* ---------------- E ---------------- */
  {
    term: 'EBITDA',
    short: 'Operating profitability ka rough measure',
    detail:
      'Earnings before interest, tax, depreciation, amortisation. Capex-heavy businesses ke liye misleading ho sakta hai kyunki depreciation ignore karta hai. EV/EBITDA debt-adjusted valuation ke liye useful hai.',
    category: 'Fundamental Analysis',
    related: ['Operating Margin', 'EV/EBITDA', 'Cash Flow Statement'],
  },
  {
    term: 'EMA (Exponential Moving Average)',
    short: 'Recent price ko zyada weight',
    detail:
      'EMA recent closes ko zyada weight deta hai — SMA se fast react karta hai par noisy bhi. Multiplier k = 2 ÷ (n+1). Short-term trading me common, trend filter ke liye SMA sometimes better.',
    category: 'Technical Analysis',
    related: ['SMA (Simple Moving Average)', 'Moving Average Crossover'],
  },
  {
    term: 'Engulfing Pattern',
    short: 'Do candle ka momentum shift',
    detail:
      'Pehli candle ki body ko doosri opposite-colour candle poora cover karti hai. Bullish engulfing downtrend end me, bearish engulfing uptrend end me meaningful. Volume aur level ke saath reliability badhti hai.',
    category: 'Technical Analysis',
    related: ['Harami', 'Candlestick', 'Reversal'],
  },
  {
    term: 'EPS (Earnings Per Share)',
    short: 'Per share profit',
    detail:
      'Net income ÷ shares outstanding. Diluted EPS potential dilution include karta hai (options, convertibles). EPS ka P/E se comparison valuation ka basic tool hai — par accounting differences aur one-off items dhyaan me rakhein.',
    category: 'Fundamental Analysis',
    related: ['P/E Ratio', 'Net Income', 'Dilution'],
  },
  {
    term: 'Equity',
    short: 'Ownership claim',
    detail:
      'Company me ownership ka hissa. Residual claim — sab payments ke baad jo bachta hai. Upside unlimited (theoretically), downside 100%. Bankruptcy me equity holders ka claim sabse aakhir me.',
    category: 'Market Basics',
    related: ['Share', 'Stock', 'Residual Claim'],
  },
  {
    term: 'EV/EBITDA',
    short: 'Debt-adjusted valuation multiple',
    detail:
      'Enterprise value ÷ EBITDA. Capital structure neutral comparison deta hai. Enterprise value = market cap + debt − cash. Cross-company comparison ke liye P/E se better jab debt profiles different hon.',
    category: 'Fundamental Analysis',
    related: ['EBITDA', 'P/E Ratio', 'Enterprise Value'],
  },
  {
    term: 'Exchange',
    short: 'Order matching ka regulated platform',
    detail:
      'NSE, BSE, NYSE, NASDAQ. Listing, matching, price dissemination aur surveillance karta hai. Exchange broker nahi hai — aap broker ke through exchange tak pahunchte hain.',
    category: 'Market Structure',
    related: ['Broker', 'Order Book', 'Listing'],
  },
  {
    term: 'Expiry',
    short: 'Contract ka last day',
    detail:
      'Derivatives contract expiry par settle hota hai (cash ya physical). Expiry ke paas gamma, theta aur volatility spike hote hain. India me SEBI ne weekly expiries ko restrict kiya hai.',
    category: 'Derivatives',
    related: ['Futures', 'Options', 'Theta', 'Gamma'],
  },

  /* ---------------- F ---------------- */
  {
    term: 'Face Value',
    short: 'Accounting par value',
    detail:
      'Company ke charter me declared per-share value (₹10, ₹1). Market price se koi seedha rishta nahi. Bond ka face value maturity par milne wali amount hai.',
    category: 'Market Basics',
    related: ['Book Value', 'Market Price', 'Stock Split'],
  },
  {
    term: 'False Breakout',
    short: 'Break ke baad wapas andar',
    detail:
      'Level ke paar move hone ke baad price sustain na kare aur range me wapas aa jaaye. Wick-based breaks, volume-less breaks aksar false hote hain. Confirm karne ke liye close basis aur retest dekhein.',
    category: 'Technical Analysis',
    related: ['Breakout', 'Retest', 'Liquidity Sweep'],
  },
  {
    term: 'Fibonacci Retracement',
    short: 'Pullback levels',
    detail:
      '23.6%, 38.2%, 50%, 61.8%, 78.6% ratios par horizontal levels. Swing points ke beech draw karte hain. Causal mechanism nahi hai — self-fulfilling convention hai. Confluence ke saath useful, akela weak.',
    category: 'Technical Analysis',
    related: ['Pullback', 'Support and Resistance', 'Confluence'],
  },
  {
    term: 'Flag Pattern',
    short: 'Trend continuation consolidation',
    detail:
      'Sharp move ke baad chhota counter-trend channel. Break hone par continuation expect hota hai. Volume usually flag ke andar kam hoti hai. Measured move target deta hai (pole length projection).',
    category: 'Technical Analysis',
    related: ['Pennant', 'Continuation', 'Consolidation'],
  },
  {
    term: 'Float (Free Float)',
    short: 'Publicly tradeable shares',
    detail:
      'Total shares me se wo jo public ke paas trade ke liye available hain (promoter/lock-in exclude). Index weighting aur practical liquidity ke liye important. Free-float market cap index calculation ka base hai.',
    category: 'Market Structure',
    related: ['Market Cap', 'Index', 'Liquidity'],
  },
  {
    term: 'FOMO',
    short: 'Fear of missing out',
    detail:
      'Kisi move ko miss karne ka dar jisse late entry li jaati hai — usually worst price par. Structural problem: peak momentum par entry, wide stop, poor R:R. Countermeasure: watchlist-only rule (bina pre-plan trade nahi).',
    category: 'Risk & Psychology',
    related: ['Chasing', 'Revenge Trading', 'Discipline'],
  },
  {
    term: 'Forward Testing',
    short: 'Live data par rules ka test',
    detail:
      'Backtest ke baad real-time data par rules apply karna (paper trading). Execution realism, slippage aur psychology test hoti hai. Agar forward results backtest se materially different hain, investigate karein.',
    category: 'Risk & Psychology',
    related: ['Backtesting', 'Paper Trading'],
  },
  {
    term: 'Free Cash Flow (FCF)',
    short: 'Discretionary cash',
    detail:
      'Operating cash flow − capital expenditure. Company ka wo cash jo dividends, buybacks, debt repayment ya growth me use ho sakta hai. Consistent positive FCF business quality ka strong signal hai.',
    category: 'Fundamental Analysis',
    related: ['Cash Flow Statement', 'Capex', 'Dividend'],
  },
  {
    term: 'Fundamental Analysis',
    short: 'Business ki value samajhna',
    detail:
      'Revenue, margins, cash flow, balance sheet, management aur competitive position analyse karke intrinsic value estimate karna. Long-term investing ka base. Technical analysis ke saath combine kiya ja sakta hai (top-down ya bottom-up).',
    category: 'Fundamental Analysis',
    related: ['Valuation', 'P/E Ratio', 'ROE'],
  },
  {
    term: 'Futures Contract',
    short: 'Future delivery ka obligation',
    detail:
      'Fixed price par, future date par, kharidne/bechne ka obligation. Margin-based leverage, daily mark-to-market aur expiry hote hain. Rollover cost long-term exposure me drag ban sakta hai.',
    category: 'Derivatives',
    related: ['Options', 'Margin', 'Open Interest', 'Contango'],
  },

  /* ---------------- G ---------------- */
  {
    term: 'Gamma',
    short: 'Delta ka change rate',
    detail:
      'Underlying move ke saath delta kitni tezi se badalta hai. ATM options me expiry ke paas gamma sabse zyada hota hai — isliye expiry day options extremely volatile hote hain.',
    category: 'Derivatives',
    related: ['Delta', 'Option Greeks', 'Expiry'],
  },
  {
    term: 'Gap Up / Gap Down',
    short: 'Previous close se door open',
    detail:
      'Jab price previous session ke range se bahar open hoti hai aur beech me trade nahi hota. Overnight news, earnings ya global moves se. Gap risk stop-loss se bada loss de sakta hai. "Gaps always fill" galat hai.',
    category: 'Technical Analysis',
    related: ['Gap Fill', 'Circuit Breaker', 'Overnight Risk'],
  },
  {
    term: 'GTT (Good Till Triggered)',
    short: 'Trigger-based pending order',
    detail:
      'Broker-level feature jahan trigger price aur order details set hote hain; trigger hone par order place hota hai. Long-term targets/stops ke liye useful. Exact behaviour broker-specific hai — official docs se verify karein.',
    category: 'Market Structure',
    related: ['Stop Order', 'Limit Order', 'Order Types'],
  },

  /* ---------------- H ---------------- */
  {
    term: 'Hammer',
    short: 'Bottom par rejection candle',
    detail:
      'Chhota body top par, lamba lower wick (body ka 2x+). Downtrend ke end me. Sellers ne gira diya, buyers ne wapas kharida. Confirmation (next candle + volume) zaroori hai.',
    category: 'Technical Analysis',
    related: ['Hanging Man', 'Shooting Star', 'Candlestick'],
  },
  {
    term: 'Hanging Man',
    short: 'Top par hammer jaisa candle',
    detail:
      'Shape hammer jaisa, par uptrend ke top par. Sellers ne lower levels test kiya. Uptrend me ye common hai aur often continuation hota hai — isliye shape alone signal nahi, context sab kuch hai.',
    category: 'Technical Analysis',
    related: ['Hammer', 'Shooting Star'],
  },
  {
    term: 'Harami',
    short: 'Inside bar pattern',
    detail:
      'Doosri candle ki poori range pehli ke andar. Volatility contraction hai — continuation ya reversal dono possible. Higher timeframe trend decide karta hai ki kaise interpret karein.',
    category: 'Technical Analysis',
    related: ['Engulfing Pattern', 'Inside Bar', 'Consolidation'],
  },
  {
    term: 'Hedge',
    short: 'Risk kam karna',
    detail:
      'Existing exposure ke against position lena taaki adverse move ka asar kam ho. Hedge ka purpose profit maximize karna nahi, uncertainty lock karna hai. Hedging cost deti hai (premium, opportunity cost).',
    category: 'Derivatives',
    related: ['Speculation', 'Protective Put', 'Derivative'],
  },

  /* ---------------- I ---------------- */
  {
    term: 'Implied Volatility (IV)',
    short: 'Market ki expected volatility',
    detail:
      'Option prices se back-calculate ki gayi future volatility expectation. High IV = mehange options. Events se pehle IV badhti hai, event ke baad collapse hoti hai (IV crush) — direction sahi hone par bhi loss ho sakta hai.',
    category: 'Derivatives',
    related: ['Historical Volatility', 'Vega', 'VIX'],
  },
  {
    term: 'Income Statement',
    short: 'Profit and loss statement',
    detail:
      'Revenue se net income tak ka summary: revenue, COGS, operating expenses, EBITDA, interest, tax, net income. Margins ka trend (3-5 saal) earnings quality batata hai. Ek saal ka number se conclusion na nikaalein.',
    category: 'Fundamental Analysis',
    related: ['Balance Sheet', 'Cash Flow Statement', 'EPS (Earnings Per Share)'],
  },
  {
    term: 'Index',
    short: 'Basket ka summary number',
    detail:
      'Chune hue securities ka weighted value. Market-cap weighted (NIFTY, S&P 500), price-weighted (Dow Jones) ya equal-weighted. Index economy nahi hota — sirf listed large companies ka snapshot.',
    category: 'Market Basics',
    related: ['Market Cap', 'Float (Free Float)', 'ETF'],
  },
  {
    term: 'In the Money (ITM)',
    short: 'Intrinsic value wala option',
    detail:
      'Call me spot > strike; put me spot < strike. ITM options me intrinsic value hoti hai. Deep ITM options delta ~1 (stock jaisa) ho jaate hain.',
    category: 'Derivatives',
    related: ['At the Money', 'Out of the Money (OTM)', 'Intrinsic Value'],
  },
  {
    term: 'Interest Coverage Ratio',
    short: 'EBIT ÷ interest expense',
    detail:
      'Company apne interest obligations kitni aasani se cover kar sakti hai. 3x+ comfortable, 1.5x se kam dangerous. Earnings dip par coverage gir jaati hai — leverage risk ka important measure.',
    category: 'Fundamental Analysis',
    related: ['Debt to Equity', 'Leverage', 'EBIT'],
  },
  {
    term: 'Intrinsic Value',
    short: 'Option ka "andar ki value"',
    detail:
      'Call: max(Spot − Strike, 0). Put: max(Strike − Spot, 0). Expiry par time value zero ho jaati hai — sirf intrinsic bachti hai. Equity valuation me intrinsic value = estimated true worth.',
    category: 'Derivatives',
    related: ['Time Value', 'Premium', 'In the Money (ITM)'],
  },
  {
    term: 'ISIN',
    short: 'Security ka unique code',
    detail:
      'International Securities Identification Number — har security ka global identifier. India me 12-character alphanumeric. Trading/ticker symbols different platforms par different ho sakte hain, ISIN consistent hota hai.',
    category: 'Market Structure',
    related: ['Ticker', 'Demat Account', 'Depository'],
  },

  /* ---------------- K ---------------- */
  {
    term: 'KYC',
    short: 'Know Your Customer',
    detail:
      'Regulated identity verification process — PAN, address, bank verification, risk profiling. Money laundering prevention ke liye. Learnyx Trading par koi KYC nahi hota kyunki yahan account ya trade nahi hota.',
    category: 'Market Structure',
    related: ['Broker', 'Compliance', 'Demat Account'],
  },

  /* ---------------- L ---------------- */
  {
    term: 'Leverage',
    short: 'Udhaar par position',
    detail:
      'Position value ko margin se divide karke nikalta hai. 5x leverage par 10% adverse move = 50% margin loss; 20% move = 100%. Leverage return aur loss dono ko multiply karta hai — beginner ke liye biggest account-killer.',
    category: 'Derivatives',
    related: ['Margin', 'Margin Call', 'Risk of Ruin'],
  },
  {
    term: 'Limit Order',
    short: 'Price-controlled order',
    detail:
      'Maximum (buy) ya minimum (sell) price set karta hai. Price ki guarantee, fill ki nahi. Partial fills normal hain. Illiquid stocks me patient entry ke liye useful.',
    category: 'Market Structure',
    related: ['Market Order', 'Stop Order', 'Order Types'],
  },
  {
    term: 'Liquidity',
    short: 'Aasani se cash me badalne ki capability',
    detail:
      'Teen dimensions: tightness (spread), depth (quantity at levels), resilience (post-order recovery). High volume ke bawajood depth kam ho sakti hai. Illiquid stocks me slippage sabse bada hidden cost hai.',
    category: 'Market Structure',
    related: ['Spread', 'Slippage', 'Market Depth'],
  },
  {
    term: 'Liquidity Sweep',
    short: 'Level ka brief break aur reverse',
    detail:
      'Swing point ke paar price jaakar turant reverse ho jaana — stops trigger ho jaate hain aur liquidity mil jaati hai. Observational framework hai; kisne kya kiya wo aap nahi jaan sakte.',
    category: 'Technical Analysis',
    related: ['False Breakout', 'Stop Hunt', 'Liquidity'],
  },
  {
    term: 'Long Position',
    short: 'Kharidne ki position',
    detail:
      'Asset kharid kar price badhne par profit ki expectation. Max loss spot me price tak limited (100%), derivatives me leverage ke karan zyada ho sakta hai.',
    category: 'Market Basics',
    related: ['Short Position', 'Leverage'],
  },
  {
    term: 'Lot Size',
    short: 'Contract ka minimum quantity',
    detail:
      'Derivatives contract me minimum tradeable units. SEBI ne retail derivatives ke liye lot sizes badhaye hain. Lot size se premium cost aur P&L calculation multiply hoti hai.',
    category: 'Derivatives',
    related: ['Futures', 'Options', 'Contract Value'],
  },

  /* ---------------- M ---------------- */
  {
    term: 'MACD',
    short: 'Momentum indicator',
    detail:
      'EMA(12) − EMA(26), signal line 9-EMA, histogram difference. Bullish/bearish crosses lagging signals hain. Range markets me whipsaw deta hai. Filter ki tarah use karein, trigger ki tarah nahi.',
    category: 'Technical Analysis',
    related: ['EMA (Exponential Moving Average)', 'Momentum', 'Divergence'],
  },
  {
    term: 'Margin',
    short: 'Position ke liye collateral',
    detail:
      'Position hold karne ke liye required collateral. Derivatives me initial + maintenance margin hota hai. Margin call par broker position square-off kar sakta hai — leverage ka structural risk.',
    category: 'Derivatives',
    related: ['Leverage', 'Margin Call', 'Mark to Market'],
  },
  {
    term: 'Margin Call',
    short: 'Additional margin ki demand',
    detail:
      'Jab margin threshold ke neeche jaaye, broker additional funds maangta hai ya square-off karta hai. Iska matlab: aap ultimately sahi ho sakte hain par interim drawdown se position close ho sakti hai.',
    category: 'Derivatives',
    related: ['Margin', 'Leverage', 'Square Off'],
  },
  {
    term: 'Market Capitalisation',
    short: 'Price × shares outstanding',
    detail:
      'Company ka total market value. Large/mid/small cap classification ka base. Free-float market cap index aur practical liquidity ke liye zyada relevant hai. Market cap company ki "value" nahi — sirf market price × shares hai.',
    category: 'Market Basics',
    related: ['Float (Free Float)', 'Large Cap', 'Enterprise Value'],
  },
  {
    term: 'Market Depth',
    short: 'Order book ka detail',
    detail:
      'Har price level par available quantity. 5 levels commonly displayed. Depth se slippage estimate hota hai. Displayed liquidity reversible hai — direction infer karne ke liye unreliable.',
    category: 'Market Structure',
    related: ['Order Book', 'Bid', 'Ask (Offer)', 'Liquidity'],
  },
  {
    term: 'Market Maker',
    short: 'Liquidity provider',
    detail:
      'Dono side (bid aur ask) quote deta hai aur spread kamata hai. Price prediction nahi karta. Market makers ke bina spreads wide ho jaate hain aur liquidity kam hoti hai.',
    category: 'Market Structure',
    related: ['Spread', 'Liquidity', 'Arbitrage'],
  },
  {
    term: 'Market Order',
    short: 'Turant execute hone wala order',
    detail:
      'Best available price par execute hota hai. Fill ki high probability, price guarantee nahi. Illiquid stocks me significant slippage. Large orders me average price kharab hoti hai.',
    category: 'Market Structure',
    related: ['Limit Order', 'Slippage', 'Order Types'],
  },
  {
    term: 'Market Structure',
    short: 'Swing points ka sequence',
    detail:
      'Higher highs + higher lows = uptrend; lower highs + lower lows = downtrend. Ek hierarchy hai — major (weekly/daily), intermediate, minor. Structure analysis primarily risk placement ka tool hai.',
    category: 'Technical Analysis',
    related: ['Break of Structure', 'Change of Character', 'Swing High'],
  },
  {
    term: 'Max Drawdown',
    short: 'Sabse bada peak-to-trough loss',
    detail:
      'Historical record me worst decline. Recovery asymmetric hai — 50% drawdown ke liye 100% gain chahiye. Risk tolerance ka real measure. Strategy evaluation me return se zyada important ho sakta hai.',
    category: 'Risk & Psychology',
    related: ['Drawdown', 'Calmar Ratio', 'Recovery Rate'],
  },
  {
    term: 'Moneyness',
    short: 'ITM/ATM/OTM status',
    detail:
      'Option strike aur underlying price ka relationship. Call me spot > strike = ITM; put me spot < strike = ITM. Moneyness option ke Greeks aur behaviour ko determine karta hai.',
    category: 'Derivatives',
    related: ['In the Money (ITM)', 'At the Money', 'Out of the Money (OTM)'],
  },
  {
    term: 'Moving Average',
    short: 'Price ka smoothed version',
    detail:
      'SMA simple average, EMA recent-weighted. Trend filter aur dynamic support ke liye use hote hain. Lagging indicators hain — cross signals sideways markets me fail hote hain. Period sensitivity test karein.',
    category: 'Technical Analysis',
    related: ['SMA (Simple Moving Average)', 'EMA (Exponential Moving Average)', 'Golden Cross'],
  },

  /* ---------------- N ---------------- */
  {
    term: 'Net Income',
    short: 'Bottom line profit',
    detail:
      'Revenue − all expenses − tax. EPS ka base. Accounting estimates se affected hota hai (depreciation, provisions). Cash flow ke saath compare karein — agar CFO net income se consistently kam hai, quality concern hai.',
    category: 'Fundamental Analysis',
    related: ['EPS (Earnings Per Share)', 'Cash Flow Statement', 'Margin'],
  },
  {
    term: 'NIFTY 50',
    short: 'India ka benchmark index',
    detail:
      'NSE par 50 large-cap companies ka free-float market-cap weighted index. India ka sabse tracked benchmark. Index economy nahi hota — sirf listed large companies ka snapshot.',
    category: 'Markets & Macro',
    related: ['SENSEX', 'S&P 500', 'Index'],
  },

  /* ---------------- O ---------------- */
  {
    term: 'OBV (On-Balance Volume)',
    short: 'Cumulative volume flow',
    detail:
      'Up days par volume add, down days par subtract. Divergence ka analysis possible hai. Limitations: close-based, whole-volume, data-provider dependent. Supporting evidence samjhein, trigger nahi.',
    category: 'Technical Analysis',
    related: ['Volume', 'Divergence', 'Volume Analysis'],
  },
  {
    term: 'Open Interest (OI)',
    short: 'Outstanding contracts',
    detail:
      'Total active contracts. Volume activity hai, OI positions hain. Futures me interpretation clearer, options me complex. Max pain concept contested hai. Supporting context, definitive data nahi.',
    category: 'Derivatives',
    related: ['Futures', 'Volume', 'Put-Call Ratio'],
  },
  {
    term: 'Option Greeks',
    short: 'Option price sensitivities',
    detail:
      'Delta, Gamma, Theta, Vega, Rho. Model-based approximations hain (Black-Scholes assumptions). Practical decision framework dete hain par exact predictions nahi.',
    category: 'Derivatives',
    related: ['Delta', 'Gamma', 'Theta', 'Vega', 'Rho'],
  },
  {
    term: 'Order Book',
    short: 'Pending orders ki list',
    detail:
      'Bid side (buyers) aur ask side (sellers) ki price levels aur quantities. Spread, depth aur liquidity assess karne ke liye. Direction predict karne ke liye unreliable — displayed orders cancellable hain.',
    category: 'Market Structure',
    related: ['Bid', 'Ask (Offer)', 'Market Depth'],
  },
  {
    term: 'Out of the Money (OTM)',
    short: 'Intrinsic value ke bina option',
    detail:
      'Call me spot < strike; put me spot > strike. Poora premium time value hota hai. Sasta lagta hai par expire worthless hone ki probability zyada hoti hai — "sasta option" ka trap.',
    category: 'Derivatives',
    related: ['In the Money (ITM)', 'At the Money', 'Time Value'],
  },
  {
    term: 'Overfitting',
    short: 'Historical data ko fit karna',
    detail:
      'Strategy ke parameters ko past data par itna tune karna ki wo noise ko fit kar le. Out-of-sample performance collapse ho jaati hai. Solution: fewer parameters, out-of-sample validation, sensitivity testing.',
    category: 'Risk & Psychology',
    related: ['Backtesting', 'Curve Fitting', 'Out of Sample'],
  },

  /* ---------------- P ---------------- */
  {
    term: 'P/B Ratio',
    short: 'Price to book',
    detail:
      'Price ÷ book value per share. Banks aur asset-heavy businesses ke liye useful. P/B < 1 distress ka signal bhi ho sakta hai. Asset-light businesses ke liye kam meaningful.',
    category: 'Fundamental Analysis',
    related: ['Book Value', 'P/E Ratio', 'Valuation'],
  },
  {
    term: 'P/E Ratio',
    short: 'Price to earnings',
    detail:
      'Price ÷ EPS. Market ₹1 earnings ke liye kitna pay kar raha hai. Context ke bina meaningless — industry, growth, quality matter karte hain. Cyclical peak earnings par P/E trap hota hai.',
    category: 'Fundamental Analysis',
    related: ['EPS (Earnings Per Share)', 'PEG Ratio', 'Valuation'],
  },
  {
    term: 'Paper Trading',
    short: 'Virtual trading practice',
    detail:
      'Real paisa ke bina simulated trading. Rules, execution aur psychology practise karne ke liye. Emotional realism kam hota hai (loss real nahi lagta) — isliye live trading se pehle useful par sufficient nahi.',
    category: 'Risk & Psychology',
    related: ['Forward Testing', 'Backtesting', 'Simulation'],
  },
  {
    term: 'Partial Fill',
    short: 'Order ka kuch hissa execute hona',
    detail:
      'Limit order me jab available quantity kam ho. Position tracking complicate hoti hai — average entry aur total risk recalculate karein. Partial fill ko naya trade maanna safer hai.',
    category: 'Market Structure',
    related: ['Limit Order', 'Slippage', 'Execution'],
  },
  {
    term: 'Pip',
    short: 'Forex ka smallest price move',
    detail:
      'Usually 4th decimal (0.0001); JPY pairs me 2nd decimal. Pip value lot size se multiply hoti hai. USD/INR me 0.0001 move ka value position size par depend karta hai.',
    category: 'Markets & Macro',
    related: ['Forex', 'Lot Size', 'Spread'],
  },
  {
    term: 'Position Sizing',
    short: 'Kitna lena hai',
    detail:
      'Risk amount ÷ stop distance = shares. Stop first, size second — ulta nahi. 1–2% risk per trade common practice hai. Portfolio-level risk (correlated positions) alag se track karein.',
    category: 'Risk & Psychology',
    related: ['Risk per Trade', 'Stop Loss', 'Risk Reward Ratio'],
  },
  {
    term: 'Premium (Options)',
    short: 'Option ka price',
    detail:
      'Intrinsic value + time value. Buyer pay karta hai, seller receive karta hai. Implied volatility, time to expiry aur moneyness par depend karta hai. Option buying ek melting asset hai.',
    category: 'Derivatives',
    related: ['Intrinsic Value', 'Time Value', 'Vega'],
  },
  {
    term: 'Price Band',
    short: 'Stock-level daily limit',
    detail:
      'Ek stock ka din ka max up/down move (2%, 5%, 10%, 20%). Circuit-locked stock me trade nahi hota — exit impossible ho sakta hai. Circuit breaker (market-wide) se alag hai.',
    category: 'Market Structure',
    related: ['Circuit Breaker', 'Liquidity Risk'],
  },
  {
    term: 'Profit Factor',
    short: 'Gross profit ÷ gross loss',
    detail:
      'Strategy ka profitability measure. 1.5+ reasonable, 3+ suspicious (overfitting ya data error). Win rate ke saath mile to better picture deta hai.',
    category: 'Risk & Psychology',
    related: ['Win Rate', 'Expectancy', 'Backtesting'],
  },
  {
    term: 'Pullback',
    short: 'Trend ke andar counter-move',
    detail:
      'Uptrend me temporary decline jo higher low banata hai. Healthy pullbacks shallow (23–50%) aur declining volume ke saath hote hain. Reversal se farq structure se aata hai, depth se nahi.',
    category: 'Technical Analysis',
    related: ['Reversal', 'Retracement', 'Continuation'],
  },
  {
    term: 'Put Option',
    short: 'Bechne ka right',
    detail:
      'Buyer ko strike price par underlying bechne ka right milta hai. Bearish view ya portfolio insurance ke liye. Max loss premium tak. Time decay buyer ke against.',
    category: 'Derivatives',
    related: ['Call Option', 'Protective Put', 'Premium'],
  },
  {
    term: 'Put-Call Ratio',
    short: 'Puts ÷ calls open interest',
    detail:
      'Sentiment indicator. High PCR = bearish positioning (ya contrarian bullish extreme). Interpretation contested hai aur orientation (OI vs volume) matter karti hai. Supporting context, signal nahi.',
    category: 'Derivatives',
    related: ['Open Interest', 'Sentiment', 'Options'],
  },

  /* ---------------- R ---------------- */
  {
    term: 'Range',
    short: 'Defined band me price',
    detail:
      'Support aur resistance ke beech sideways movement. Range trading boundaries par entries deti hai. Range ke beech me trade karna poor R:R deta hai.',
    category: 'Technical Analysis',
    related: ['Consolidation', 'Breakout', 'Support and Resistance'],
  },
  {
    term: 'Relative Strength Index (RSI)',
    short: 'Momentum oscillator',
    detail:
      '0–100 scale, average gains vs losses. 70+ "overbought" momentum ko denote karta hai, sastapan nahi. Strong trends me RSI lambe time tak 70+ reh sakta hai. Divergence momentum weakening ka evidence hai, reversal guarantee nahi.',
    category: 'Technical Analysis',
    related: ['Divergence', 'Momentum', 'Stochastic'],
  },
  {
    term: 'Resistance',
    short: 'Supply zone',
    detail:
      'Wo area jahan sellers active ho jaate hain aur price badhna rukta hai. Lines nahi, zones. Touches, time aur volume se strength aati hai. Broken resistance support ban jaata hai (role reversal).',
    category: 'Technical Analysis',
    related: ['Support', 'Role Reversal', 'Breakout'],
  },
  {
    term: 'Retest',
    short: 'Break ke baad level ka revisit',
    detail:
      'Breakout ke baad price wapas level par aakar hold kare ya reject ho. Sabse strong confirmation hai. Retest par volume kam hona healthy hai. Retest ke saath best R:R milta hai.',
    category: 'Technical Analysis',
    related: ['Breakout', 'False Breakout', 'Role Reversal'],
  },
  {
    term: 'Revenge Trading',
    short: 'Loss ke baad impulsive trade',
    detail:
      'Emotional pain relief ke liye bina setup trade lena. Sabse destructive pattern — chhota loss cascade me disaster ban jaata hai. Countermeasure: hard daily loss limit.',
    category: 'Risk & Psychology',
    related: ['FOMO', 'Tilt', 'Discipline'],
  },
  {
    term: 'Reversal',
    short: 'Trend ka direction change',
    detail:
      'Structure break se define hota hai: uptrend me lower low + lower high = reversal. Depth ya ek candle se reversal confirm nahi hota. Counter-trend trades lower probability rakhte hain.',
    category: 'Technical Analysis',
    related: ['Pullback', 'Change of Character', 'Trend'],
  },
  {
    term: 'Risk of Ruin',
    short: 'Capital khatam hone ki probability',
    detail:
      'Risk per trade, win rate aur expectancy par depend karta hai. Practically ruin ka matlab "zero balance" nahi — matlab wo level jahan recovery impossible ho jaaye. 1–2% risk per trade survival ke liye essential hai.',
    category: 'Risk & Psychology',
    related: ['Drawdown', 'Position Sizing', 'Kelly Criterion'],
  },
  {
    term: 'Risk Reward Ratio',
    short: 'Reward ÷ risk',
    detail:
      'Target distance ÷ stop distance. 1:2 common minimum benchmark. R:R alone sufficient nahi — win rate ke saath expectancy determine karta hai.',
    category: 'Risk & Psychology',
    related: ['Expectancy', 'Position Sizing', 'Win Rate'],
  },
  {
    term: 'ROE (Return on Equity)',
    short: 'Equity par return',
    detail:
      'Net income ÷ shareholders’ equity. High ROE leverage se artificially inflated ho sakta hai — ROCE aur debt ke saath padhein. DuPont analysis se quality samajh aati hai.',
    category: 'Fundamental Analysis',
    related: ['ROCE', 'DuPont Analysis', 'Leverage'],
  },
  {
    term: 'ROCE (Return on Capital Employed)',
    short: 'Capital employed par return',
    detail:
      'EBIT ÷ (equity + long-term debt). Capital structure neutral hai — isliye cross-company comparison ke liye ROE se better. Operating efficiency ka cleaner measure.',
    category: 'Fundamental Analysis',
    related: ['ROE', 'EBIT', 'Capital Employed'],
  },
  {
    term: 'Rollover',
    short: 'Next expiry me shift',
    detail:
      'Expiry se pehle position next month contract me shift karna. Contango me cost, backwardation me benefit (longs ke liye). Rollover % sentiment indicator ke roop me dekha jaata hai.',
    category: 'Derivatives',
    related: ['Futures', 'Contango', 'Backwardation'],
  },
  {
    term: 'Rho',
    short: 'Interest rate sensitivity',
    detail:
      'Interest rate change par option price ka change. Short-dated options me negligible, long-dated me relevant. Retail short-term trading me usually minor factor.',
    category: 'Derivatives',
    related: ['Option Greeks', 'Interest Rate'],
  },

  /* ---------------- S ---------------- */
  {
    term: 'S&P 500',
    short: 'US ka benchmark index',
    detail:
      '500 large US companies ka market-cap weighted index. US equity market ka primary benchmark. Global risk appetite ka important indicator — Asian markets par open par asar daalta hai.',
    category: 'Markets & Macro',
    related: ['NIFTY 50', 'NASDAQ', 'Index'],
  },
  {
    term: 'Scalping',
    short: 'Seconds-minutes ki trading',
    detail:
      'Bahut chhoti moves capture karna. Costs edge ka bada hissa kha jaate hain, extreme infrastructure aur mental stamina chahiye. Retail ke liye realistically most difficult style.',
    category: 'Market Basics',
    related: ['Day Trading', 'Slippage', 'Spread'],
  },
  {
    term: 'SENSEX',
    short: 'BSE ka 30-stock index',
    detail:
      'Bombay Stock Exchange ka benchmark — 30 large companies, free-float market-cap weighted. Asia ke oldest indices me se.',
    category: 'Markets & Macro',
    related: ['NIFTY 50', 'BSE', 'Index'],
  },
  {
    term: 'Settlement',
    short: 'Trade ka poora hona',
    detail:
      'Paisa idhar, shares udhar. India me equity T+1 (trade date + 1 working day). Trade contract hai, settlement uska completion. Delivery aur intraday settlement different hote hain.',
    category: 'Market Structure',
    related: ['Clearing Corporation', 'Depository', 'T+1'],
  },
  {
    term: 'Sharpe Ratio',
    short: 'Risk-adjusted return',
    detail:
      '(Return − risk-free) ÷ standard deviation. 1.0+ achha maana jaata hai. Normal distribution assumption karta hai — fat tails aur volatility clustering ignore karta hai. Sortino/Calmar ke saath dekhein.',
    category: 'Risk & Psychology',
    related: ['Sortino Ratio', 'Calmar Ratio', 'Volatility'],
  },
  {
    term: 'Short Position',
    short: 'Bechne ki position',
    detail:
      'Asset bech kar price girne par profit ki expectation. Spot me shorting restricted hoti hai (India me delivery shorting nahi); derivatives me common. Loss theoretically unlimited hai.',
    category: 'Market Basics',
    related: ['Long Position', 'Short Squeeze', 'Futures'],
  },
  {
    term: 'Short Squeeze',
    short: 'Shorts ko cover karne ki majboori',
    detail:
      'Jab price tezi se badhe aur short sellers ko loss se bachne ke liye kharidna pade — jo further price badha deta hai. High short interest wale stocks me possible. Rare par violent.',
    category: 'Market Basics',
    related: ['Short Position', 'Open Interest', 'Volatility'],
  },
  {
    term: 'Slippage',
    short: 'Expected vs actual fill price',
    detail:
      'Spread, depth aur latency se hoti hai. High-turnover strategies me compounding drag banta hai. Backtest me slippage zero rakhna sabse common unrealistic assumption hai.',
    category: 'Market Structure',
    related: ['Spread', 'Liquidity', 'Market Impact'],
  },
  {
    term: 'SMA (Simple Moving Average)',
    short: 'Simple average of closes',
    detail:
      'n periods ke closes ka average. EMA se slow par smooth. 50 aur 200 DMA trend filters ke standard hain. Golden/death cross lagging signals hain aur sideways markets me false hote hain.',
    category: 'Technical Analysis',
    related: ['EMA (Exponential Moving Average)', 'Golden Cross', 'Death Cross'],
  },
  {
    term: 'Speculation',
    short: 'Price move par bet',
    detail:
      'Existing exposure ke bina price direction par position lena. Trading se alag hai — speculation me usually process, risk limits aur defined invalidation nahi hota. Leverage ke saath speculation highly destructive ho sakta hai.',
    category: 'Risk & Psychology',
    related: ['Hedge', 'Trading', 'Investing'],
  },
  {
    term: 'Spread',
    short: 'Ask minus bid ka farq',
    detail:
      'Liquidity ka price tag. Aap kharidte hain ask par, bechte hain bid par. Round-trip spread cost = immediate loss. Liquid large caps me 0.02%, illiquid small caps me 1%+ ho sakta hai.',
    category: 'Market Structure',
    related: ['Bid', 'Ask (Offer)', 'Liquidity'],
  },
  {
    term: 'Standard Deviation',
    short: 'Volatility ka measure',
    detail:
      'Returns ka dispersion. Annualised = daily σ × √252. Symmetric hai — upside aur downside same treat karta hai. Sortino ratio sirf downside deviation use karta hai.',
    category: 'Risk & Psychology',
    related: ['Volatility', 'Variance', 'Sharpe Ratio'],
  },
  {
    term: 'Stablecoin',
    short: 'Fiat-pegged crypto token',
    detail:
      'USDT, USDC jaise tokens jo fiat currency se pegged hote hain. Peg stability issuer aur reserves par depend karti hai — 2022 me algorithmic stablecoin collapse ne ye risk dikhaya. Custody aur counterparty risk remains.',
    category: 'Markets & Macro',
    related: ['Crypto Asset', 'Custody Risk'],
  },
  {
    term: 'Stock Split',
    short: 'Shares ko divide karna',
    detail:
      'Ek share ko multiple shares me todna (2:1). Price proportionally adjust hoti hai — total value same. Liquidity aur affordability ke liye kiya jaata hai. Adjusted charts me purana data adjust hota hai.',
    category: 'Market Basics',
    related: ['Bonus Issue', 'Face Value', 'Adjusted Price'],
  },
  {
    term: 'Stop Loss',
    short: 'Risk exit level',
    detail:
      'Wo price jahan aapka idea galat hai aur aap exit karte hain. Structure se derive karein, arbitrary percentage se nahi. Gap, slippage aur circuit me fail ho sakta hai — guarantee nahi.',
    category: 'Risk & Psychology',
    related: ['Stop Order', 'Position Sizing', 'Invalidation'],
  },
  {
    term: 'Stop Order',
    short: 'Trigger-based exit order',
    detail:
      'Stop price touch hone par order active hota hai. Stop-market (SL-M) fill reliability deta hai, stop-limit price certainty. Gap me stop-limit pending reh sakta hai.',
    category: 'Market Structure',
    related: ['Stop Loss', 'Limit Order', 'Market Order'],
  },
  {
    term: 'Support',
    short: 'Demand zone',
    detail:
      'Wo area jahan buyers active ho jaate hain aur price girna rukta hai. Zones hote hain, exact lines nahi. Broken support resistance ban jaata hai. S/R ka biggest value objective invalidation level hai.',
    category: 'Technical Analysis',
    related: ['Resistance', 'Role Reversal', 'Zone'],
  },
  {
    term: 'Swing Trading',
    short: 'Days-weeks hold',
    detail:
      'Kuch din se kuch hafte ki positions. Chart structure aur catalysts. Retail ke liye most practical style — screen time kam, costs lower, overnight risk manageable.',
    category: 'Market Basics',
    related: ['Day Trading', 'Positional Trading', 'Timeframe'],
  },

  /* ---------------- T ---------------- */
  {
    term: 'T+1 Settlement',
    short: 'One day settlement cycle',
    detail:
      'Trade date ke agle working day settlement. India me equity ka standard. US me 2024 se T+1. Intraday me sirf net P&L settle hota hai.',
    category: 'Market Structure',
    related: ['Settlement', 'Clearing Corporation'],
  },
  {
    term: 'Theta',
    short: 'Premium ka roz girna',
    detail:
      'Option buyer ke liye per-day premium loss. Expiry ke paas accelerate hoti hai. Option buying me timing direction jitna important hai. Seller ke liye theta income hai (par risk leta hai).',
    category: 'Derivatives',
    related: ['Option Greeks', 'Vega', 'Time Value'],
  },
  {
    term: 'Time Value',
    short: 'Premium ka time component',
    detail:
      'Premium − intrinsic value. Expiry par zero ho jaata hai. ATM options me sabse zyada. Implied volatility aur time to expiry par depend karta hai.',
    category: 'Derivatives',
    related: ['Intrinsic Value', 'Theta', 'Premium (Options)'],
  },
  {
    term: 'Total Return',
    short: 'Price + income',
    detail:
      'Capital gain plus dividends/interest. Price return se alag — high dividend stocks me total return zyada meaningful hota hai. Comparison me total return use karein.',
    category: 'Fundamental Analysis',
    related: ['CAGR', 'Dividend Yield'],
  },
  {
    term: 'Trailing Stop',
    short: 'Moving stop-loss',
    detail:
      'Price favourable direction me jaane par stop price bhi move karta hai. Profits protect karta hai par volatile instruments me premature exit de sakta hai. ATR-based trailing noise se bachata hai.',
    category: 'Risk & Psychology',
    related: ['Stop Loss', 'ATR (Average True Range)', 'Trend Following'],
  },
  {
    term: 'Trendline',
    short: 'Swing points ko connect karne wali line',
    detail:
      'Uptrend me lows ko, downtrend me highs ko connect karti hai. 2 touches minimum, 3+ se validity badhti hai. Close basis break meaningful hai, wick break often noise.',
    category: 'Technical Analysis',
    related: ['Channel', 'Trend', 'Support and Resistance'],
  },

  /* ---------------- V ---------------- */
  {
    term: 'Vega',
    short: 'Volatility sensitivity',
    detail:
      'Implied volatility change par option price ka change. ATM long-expiry options me sabse zyada. IV crush (event ke baad) direction sahi hone par bhi loss de sakta hai.',
    category: 'Derivatives',
    related: ['Implied Volatility', 'Option Greeks', 'Theta'],
  },
  {
    term: 'VIX',
    short: 'Volatility index',
    detail:
      'S&P 500 options se 30-day implied volatility. India VIX NIFTY options se. High VIX = expected volatility high (fear). Direction nahi batata, sirf magnitude.',
    category: 'Markets & Macro',
    related: ['Implied Volatility', 'Volatility', 'Sentiment'],
  },
  {
    term: 'Volatility',
    short: 'Price movement ki magnitude',
    detail:
      'Historical (realized) ya implied (expected). Higher volatility = higher risk aur higher opportunity. Position sizing volatility-adjusted honi chahiye (ATR). Volatility clustering hoti hai — high vol phases persist karte hain.',
    category: 'Risk & Psychology',
    related: ['ATR (Average True Range)', 'Standard Deviation', 'Implied Volatility'],
  },
  {
    term: 'Volume',
    short: 'Traded quantity',
    detail:
      'Participation measure karta hai, direction nahi. Relative volume (RVOL) same-time-of-day average se compare karta hai. Volume spikes ke multiple causes hote hain — news, rebalancing, expiry, manipulation.',
    category: 'Technical Analysis',
    related: ['Relative Volume', 'OBV', 'Liquidity'],
  },
  {
    term: 'VWAP',
    short: 'Volume weighted average price',
    detail:
      'Session ke average traded price, volume se weighted. Institutional execution benchmark. Intraday bias indicator (price above = buyers in control). Session-wise reset hota hai.',
    category: 'Technical Analysis',
    related: ['Volume', 'Moving Average', 'Execution'],
  },

  /* ---------------- W ---------------- */
  {
    term: 'Wash Trading',
    short: 'Fake volume create karna',
    detail:
      'Same party buy aur sell karke artificial volume dikhana — price manipulation ke liye. Illegal hai aur regulators surveillance se pakadte hain. Thin stocks me common historically.',
    category: 'Market Structure',
    related: ['Manipulation', 'Volume', 'Surveillance'],
  },
  {
    term: 'Win Rate',
    short: 'Winning trades ka percentage',
    detail:
      'Wins ÷ total trades. Alone misleading hai — 90% win rate bhi losing strategy ho sakti hai agar ek loss bada ho. Expectancy (win rate + avg win/loss) real measure hai.',
    category: 'Risk & Psychology',
    related: ['Expectancy', 'Profit Factor', 'Risk Reward Ratio'],
  },

  /* ---------------- Y ---------------- */
  {
    term: 'Yield',
    short: 'Investment par effective return',
    detail:
      'Bond me coupon ÷ market price. Dividend stocks me dividend ÷ price. Yield price ke inverse hota hai — price gira to yield badhta. High yield often high risk ka price hai.',
    category: 'Markets & Macro',
    related: ['Bond', 'Dividend Yield', 'Credit Rating'],
  },
  {
    term: 'Yield Curve',
    short: 'Maturities ke against yields',
    detail:
      'Short-term se long-term bond yields ka curve. Inversion (short > long) historically recession se pehle dikhi hai, par timing aur reliability imperfect hai. Context signal, trade signal nahi.',
    category: 'Markets & Macro',
    related: ['Yield', 'Interest Rate', 'Recession'],
  },

  /* ---------------- Z ---------------- */
  {
    term: 'Zone',
    short: 'Price ka area, line nahi',
    detail:
      'Support/resistance ko exact price ki jagah ek band (zone) ki tarah treat karna. Market exact numbers ko respect nahi karta. Zone width volatility ke hisaab se set karein.',
    category: 'Technical Analysis',
    related: ['Support', 'Resistance', 'Confluence'],
  },

  /* ---------------- Cross-reference completion ----------------
     These entries were added so that every `related` reference in the
     glossary resolves to a real term. A dead cross-reference is a broken
     link, and this file must not ship any. */
  {
    term: 'Adjusted Price',
    short: 'Corporate action ke baad historical price',
    detail:
      'Stock split, bonus ya dividend ke baad purani prices ko comparable banane ke liye adjust kiya jaata hai. Bina adjustment ke chart par ek artificial gap dikhta hai jo actually corporate action tha, selling nahi.',
    category: 'Market Basics',
    related: ['Stock Split', 'Bonus Issue', 'Gap Up / Gap Down'],
  },
  {
    term: 'Asset Allocation',
    short: 'Paisa different asset classes me baantna',
    detail:
      'Equity, debt, gold aur cash ke beech proportion decide karna. Ye single-stock selection se zyada portfolio outcome decide karta hai. Allocation age, risk capacity aur time horizon par depend karta hai.',
    category: 'Risk & Psychology',
    related: ['Diversification', 'Concentration Risk', 'Risk Reward Ratio'],
  },
  {
    term: 'At the Money',
    short: 'Strike spot ke barabar',
    detail:
      'Option ka strike price current market price ke bahut kareeb ho. ATM options me time value sabse zyada hoti hai aur intrinsic value lagbhag zero.',
    category: 'Derivatives',
    related: ['In the Money (ITM)', 'Out of the Money (OTM)', 'Premium'],
  },
  {
    term: 'BSE',
    short: 'Bombay Stock Exchange',
    detail:
      'Asia ke sabse purane exchanges me se ek, 1875 se. Sensex iska benchmark index hai. NSE ke saath ye India ka primary equity venue hai.',
    category: 'Markets & Macro',
    related: ['SENSEX', 'NSE', 'Exchange'],
  },
  {
    term: 'NSE',
    short: 'National Stock Exchange',
    detail:
      'India ka largest equity exchange (1992). NIFTY 50 iska benchmark index hai. Electronic trading aur T+1 settlement ke adoption me iska major role raha.',
    category: 'Markets & Macro',
    related: ['BSE', 'SENSEX', 'Index'],
  },
  {
    term: 'Backwardation',
    short: 'Futures spot se sasta',
    detail:
      'Futures price spot se kam ho — usually near-term supply tightness ya high convenience yield ka signal. Contango ka ulta. Roll yield ka sign badly change karta hai.',
    category: 'Markets & Macro',
    related: ['Contango', 'Basis', 'Cost of Carry'],
  },
  {
    term: 'Basis',
    short: 'Spot aur futures ka farq',
    detail:
      'Basis = spot price − futures price. Expiry ke paas basis zero ki taraf converge karta hai. Basis ka sign aur magnitude carry cost aur demand-supply balance batata hai.',
    category: 'Derivatives',
    related: ['Contango', 'Backwardation', 'Cost of Carry'],
  },
  {
    term: 'Blockchain',
    short: 'Distributed ledger',
    detail:
      'Transactions ko blocks me record karke multiple nodes par replicate karne wali technology. Crypto me ownership aur settlement ka base hai. Ye technology ka naam hai, koi investment advice nahi.',
    category: 'Markets & Macro',
    related: ['Crypto Asset', 'Custody Risk', 'Stablecoin'],
  },
  {
    term: 'Bonus Issue',
    short: 'Free additional shares',
    detail:
      'Company existing shareholders ko free extra shares deti hai (e.g. 1:1). Share count badhta hai, price proportionally adjust hota hai — net value same rehta hai.',
    category: 'Markets & Macro',
    related: ['Stock Split', 'Adjusted Price', 'Market Capitalisation'],
  },
  {
    term: 'Book Value',
    short: 'Accounting net worth',
    detail:
      'Assets minus liabilities per share. P/B ratio ka denominator. Intangible-heavy businesses me book value economic value ko under-represent karti hai.',
    category: 'Fundamental Analysis',
    related: ['P/B Ratio', 'Face Value', 'Valuation'],
  },
  {
    term: 'Break of Structure',
    short: 'Swing structure ka toot-na',
    detail:
      'Price ne pichhle significant swing high/low ko decisively break kiya. Uptrend me last higher low ka break structural change ka pehla signal hota hai.',
    category: 'Market Structure',
    related: ['Change of Character', 'Market Structure', 'Swing High'],
  },
  {
    term: 'Calmar Ratio',
    short: 'Return vs max drawdown',
    detail:
      'Annualised return ÷ maximum drawdown. Drawdown ko include karta hai isliye risk-adjusted comparison me Sharpe se zyada realistic ho sakta hai. Chhote samples me unstable.',
    category: 'Risk & Psychology',
    related: ['Max Drawdown', 'Sharpe Ratio', 'Sortino Ratio'],
  },
  {
    term: 'Capex',
    short: 'Capital expenditure',
    detail:
      'Long-term assets (plant, equipment, technology) par kharch. Free cash flow nikalne ke liye operating cash flow se capex minus karte hain.',
    category: 'Fundamental Analysis',
    related: ['Free Cash Flow', 'Cash Flow Statement', 'EBITDA'],
  },
  {
    term: 'Capital Employed',
    short: 'Total capital ka use',
    detail:
      'Equity + debt (ya total assets − current liabilities). ROCE ka denominator. Capital-intensive businesses me iska trend profitability se zyada batata hai.',
    category: 'Fundamental Analysis',
    related: ['ROCE', 'ROE', 'Debt to Equity'],
  },
  {
    term: 'Change of Character',
    short: 'Behaviour ka badalna',
    detail:
      'Price ka character badal jaana — e.g. uptrend me pehli baar lower high aur lower low banna. BOS se pehle aksar CHoCH dikhta hai. Confirmation chahiye, prediction nahi.',
    category: 'Market Structure',
    related: ['Break of Structure', 'Market Structure', 'Reversal'],
  },
  {
    term: 'Channel',
    short: 'Parallel trend lines',
    detail:
      'Price do parallel trendlines ke beech move karti hai. Channel break trend change ya acceleration ka hint ho sakta hai — lekin false breaks common hain.',
    category: 'Technical Analysis',
    related: ['Trendline', 'Trend', 'Support and Resistance'],
  },
  {
    term: 'Chasing',
    short: 'Price ke peeche bhaagna',
    detail:
      'Move already ho chuka ho tab entry lena, aksar bade candle ke baad. Isse stop distance bada aur R:R kharab ho jaata hai. FOMO ka behavioural result.',
    category: 'Risk & Psychology',
    related: ['FOMO', 'Discipline', 'Risk Reward Ratio'],
  },
  {
    term: 'Compliance',
    short: 'Rules ka palan',
    detail:
      'Regulatory requirements (KYC, reporting, conduct) ko follow karna. Trading me ye broker, exchange aur investor — sabki zimmedari hai.',
    category: 'Markets & Macro',
    related: ['KYC', 'Surveillance', 'Manipulation'],
  },
  {
    term: 'Concentration Risk',
    short: 'Ek hi jagah zyada exposure',
    detail:
      'Portfolio ka bada hissa ek stock, sector ya theme me hona. Concentration returns badha sakta hai par drawdown bhi disproportionate hota hai.',
    category: 'Risk & Psychology',
    related: ['Diversification', 'Asset Allocation', 'Position Sizing'],
  },
  {
    term: 'Confluence',
    short: 'Multiple factors ka milna',
    detail:
      'Ek price level par support, fibonacci, moving average aur volume profile jaise multiple independent reasons milte hain. Confluence probability badhata hai, guarantee nahi.',
    category: 'Technical Analysis',
    related: ['Support and Resistance', 'Zone', 'Fibonacci Retracement'],
  },
  {
    term: 'Contango',
    short: 'Futures spot se mehnga',
    detail:
      'Futures price spot se zyada — storage aur carry cost ka normal reflection. Roll karte waqt contango roll yield negative kar sakta hai.',
    category: 'Markets & Macro',
    related: ['Backwardation', 'Basis', 'Cost of Carry'],
  },
  {
    term: 'Continuation',
    short: 'Trend ka jaari rehna',
    detail:
      'Consolidation ya pullback ke baad trend same direction me resume hona. Flag, pennant aur higher-low structures continuation patterns ke examples hain.',
    category: 'Technical Analysis',
    related: ['Pullback', 'Flag Pattern', 'Trend'],
  },
  {
    term: 'Contract Value',
    short: 'Ek lot ka notional',
    detail:
      'Lot size × price. Futures aur options me position ka actual notional exposure, jo margin se bahut bada ho sakta hai.',
    category: 'Derivatives',
    related: ['Lot Size', 'Margin', 'Futures Contract'],
  },
  {
    term: 'Curve Fitting',
    short: 'Data ko over-fit karna',
    detail:
      'Strategy parameters ko historical data ke noise ke hisaab se tune karna, jisse backtest sudhar jaata hai par live performance bigad jaati hai. Overfitting ka doosra naam.',
    category: 'Risk & Psychology',
    related: ['Overfitting', 'Out of Sample', 'Simulation'],
  },
  {
    term: 'Custody Risk',
    short: 'Assets ki safety ka risk',
    detail:
      'Crypto aur securities ke case me asset kaise aur kahan hold hai. Exchange failure, hack ya key loss se permanent loss ho sakta hai.',
    category: 'Markets & Macro',
    related: ['Crypto Asset', 'Stablecoin', 'Demat Account'],
  },
  {
    term: 'Death Cross',
    short: 'Bearish MA crossover',
    detail:
      'Short-term moving average (e.g. 50) long-term (e.g. 200) ke neeche cross kare. Lagging signal hai; whipsaw common. Golden cross ka ulta.',
    category: 'Technical Analysis',
    related: ['Golden Cross', 'Moving Average', 'Trend Following'],
  },
  {
    term: 'Golden Cross',
    short: 'Bullish MA crossover',
    detail:
      '50-period MA 200-period MA ke upar cross kare. Bullish sentiment ka popular marker, lekin lagging aur whipsaw-prone.',
    category: 'Technical Analysis',
    related: ['Death Cross', 'Moving Average', 'Trend Following'],
  },
  {
    term: 'Debt to Equity',
    short: 'Leverage ratio',
    detail:
      'Total debt ÷ shareholders\' equity. High D/E cyclical businesses me distress risk badhata hai. Capital-intensive stable businesses me normal ho sakta hai.',
    category: 'Fundamental Analysis',
    related: ['Interest Coverage Ratio', 'Capital Employed', 'ROE'],
  },
  {
    term: 'Default Risk',
    short: 'Repayment na hone ka risk',
    detail:
      'Borrower ya issuer interest/principal time par na de. Bonds me credit rating aur yield spread isi risk ka price hai.',
    category: 'Fundamental Analysis',
    related: ['Credit Rating', 'Yield Curve', 'Bond'],
  },
  {
    term: 'Dilution',
    short: 'Share count ka badhna',
    detail:
      'Naye shares issue hone se existing shareholders ka ownership percentage kam ho jaata hai. QIP, ESOP aur warrant issuance dilution ke sources hain.',
    category: 'Fundamental Analysis',
    related: ['EPS (Earnings Per Share)', 'Stock Split', 'Bonus Issue'],
  },
  {
    term: 'Discipline',
    short: 'Plan ka palan',
    detail:
      'Pre-defined rules ko emotion ke bawajood follow karna. Position sizing, stop placement aur no-trade days discipline ke concrete examples hain.',
    category: 'Risk & Psychology',
    related: ['FOMO', 'Revenge Trading', 'Risk per Trade'],
  },
  {
    term: 'Distribution',
    short: 'Bikri ka phase',
    detail:
      'Price range me flat rehti hai par bade players dheere-dheere position reduce karte hain. Accumulation ka ulta; hindsight me confirm hota hai.',
    category: 'Market Structure',
    related: ['Accumulation', 'Consolidation', 'Markdown'],
  },
  {
    term: 'Markdown',
    short: 'Price ka decline phase',
    detail:
      'Distribution ke baad supply dominate karti hai aur price neeche jaati hai. Market cycle ka chautha aur aakhri phase.',
    category: 'Market Structure',
    related: ['Distribution', 'Markup', 'Market Cycle'],
  },
  {
    term: 'Markup',
    short: 'Price ka advance phase',
    detail:
      'Accumulation ke baad demand dominate karti hai. Higher highs aur higher lows iska structure hain.',
    category: 'Market Structure',
    related: ['Accumulation', 'Markdown', 'Trend'],
  },
  {
    term: 'Divergence',
    short: 'Price aur indicator ka farq',
    detail:
      'Price naya high bana rahi ho par oscillator (RSI/MACD) lower high bana raha ho — momentum weakening ka hint. Divergence ek warning hai, entry signal nahi.',
    category: 'Technical Analysis',
    related: ['Relative Strength Index (RSI)', 'MACD', 'Momentum'],
  },
  {
    term: 'DuPont Analysis',
    short: 'ROE ka decomposition',
    detail:
      'ROE = net margin × asset turnover × equity multiplier. Isse pata chalta hai ki return profitability se aa raha hai ya leverage se.',
    category: 'Fundamental Analysis',
    related: ['ROE', 'ROCE', 'Debt to Equity'],
  },
  {
    term: 'Duration',
    short: 'Bond ki interest-rate sensitivity',
    detail:
      'Bond price me percentage change approx duration × yield change. Higher duration = higher interest rate risk. Maturity se alag concept hai.',
    category: 'Fundamental Analysis',
    related: ['Bond', 'Yield Curve', 'Interest Rate'],
  },
  {
    term: 'EBIT',
    short: 'Interest aur tax se pehle ka profit',
    detail:
      'Operating profitability ka measure jo capital structure ko neutral rakhta hai. Interest coverage ratio ka numerator.',
    category: 'Fundamental Analysis',
    related: ['EBITDA', 'Interest Coverage Ratio', 'Income Statement'],
  },
  {
    term: 'Enterprise Value',
    short: 'Poora business ka value',
    detail:
      'Market cap + debt − cash. Acquisitions aur capital structure me EV comparable metric hai; P/E sirf equity dekhta hai.',
    category: 'Fundamental Analysis',
    related: ['Market Capitalisation', 'EV/EBITDA', 'Debt to Equity'],
  },
  {
    term: 'Execution',
    short: 'Order ka actual fill hona',
    detail:
      'Order place hone se fill hone tak ka process — price, speed aur partial fills sab include. Paper trading execution risk capture nahi karta.',
    category: 'Market Structure',
    related: ['Slippage', 'Partial Fill', 'Market Impact'],
  },
  {
    term: 'Expectancy',
    short: 'Trade ka average expected outcome',
    detail:
      'Expectancy = (win rate × avg win) − (loss rate × avg loss). Positive expectancy ka matlab hai system statistically profitable hai, ek trade nahi.',
    category: 'Risk & Psychology',
    related: ['Win Rate', 'Profit Factor', 'Risk Reward Ratio'],
  },
  {
    term: 'Forex',
    short: 'Currency market',
    detail:
      'Duniya ka sabse bada aur most liquid market, jahan currencies pairs me trade hoti hain (e.g. USD/INR). Retail leverage restricted aur jurisdiction-specific hota hai; India me FEMA/RBI rules lagte hain.',
    category: 'Markets & Macro',
    related: ['Pip', 'Leverage', 'Liquidity'],
  },
  {
    term: 'Free Cash Flow',
    short: 'Business ka real cash',
    detail:
      'Operating cash flow minus capex. Accounting profit se zyada honest measure kyunki cash movement track karta hai.',
    category: 'Fundamental Analysis',
    related: ['Capex', 'Cash Flow Statement', 'EPS (Earnings Per Share)'],
  },
  {
    term: 'Futures',
    short: 'Standardised future contract',
    detail:
      'Exchange-traded contract jisme price future date par settle hota hai. Margin, daily mark-to-market aur expiry iske core features hain. Leverage significant hota hai.',
    category: 'Derivatives',
    related: ['Options', 'Margin', 'Open Interest'],
  },
  {
    term: 'Gap Fill',
    short: 'Gap ka band hona',
    detail:
      'Price wapas aakar pichhle session ke gap ko cover karti hai. Ye tendency hai, rule nahi — strong trends me gap fill nahi hota.',
    category: 'Technical Analysis',
    related: ['Gap Up / Gap Down', 'Overnight Risk', 'Support and Resistance'],
  },
  {
    term: 'Historical Volatility',
    short: 'Past price ka variation',
    detail:
      'Realised volatility jo historical returns ki standard deviation se nikaalte hain. Implied volatility iska forward-looking counterpart hai.',
    category: 'Technical Analysis',
    related: ['Standard Deviation', 'Implied Volatility', 'Volatility'],
  },
  {
    term: 'Implied Volatility',
    short: 'Options ka expected volatility',
    detail:
      'Option premium se reverse-engineered volatility. Ye market ki forward expectation hai, historical measurement nahi. IV crush event days ke baad common hai.',
    category: 'Derivatives',
    related: ['Historical Volatility', 'Vega', 'VIX'],
  },
  {
    term: 'Interest Rate',
    short: 'Paisa udhaar lene ki cost',
    detail:
      'Central bank policy rates se market yields tak. Equity valuations, bond prices aur currency flows sab isse affected hote hain.',
    category: 'Markets & Macro',
    related: ['Yield Curve', 'Duration', 'Recession'],
  },
  {
    term: 'Intraday',
    short: 'Ek hi session me entry-exit',
    detail:
      'Position market close se pehle band karna. Overnight risk nahi hota par costs aur noise exposure zyada hoti hai.',
    category: 'Market Basics',
    related: ['Day Trading', 'Overnight Risk', 'Slippage'],
  },
  {
    term: 'Invalidation',
    short: 'Setup ka galat sabit hona',
    detail:
      'Woh price level jahan aapka trade idea structurally galat ho jaata hai — often stop-loss ka logical location. Invalidation define karna stop-loss se pehle aana chahiye.',
    category: 'Risk & Psychology',
    related: ['Stop Loss', 'Risk per Trade', 'Discipline'],
  },
  {
    term: 'Investing',
    short: 'Long-term capital growth',
    detail:
      'Multi-year horizon par business value aur compounding par focus. Trading se difference intention aur time horizon ka hai, instrument ka nahi.',
    category: 'Market Basics',
    related: ['Trading', 'Compounding', 'Valuation'],
  },
  {
    term: 'Kelly Criterion',
    short: 'Optimal bet sizing formula',
    detail:
      'Edge aur odds se theoretically optimal position size nikaalta hai. Real markets me full Kelly bahut aggressive hota hai; practitioners fractional Kelly use karte hain.',
    category: 'Risk & Psychology',
    related: ['Position Sizing', 'Risk of Ruin', 'Expectancy'],
  },
  {
    term: 'Large Cap',
    short: 'Bade market cap wali company',
    detail:
      'Typically top-100 market cap companies. Liquidity better hoti hai aur volatility relatively kam; growth potential bhi usually moderate.',
    category: 'Market Basics',
    related: ['Market Capitalisation', 'Mid Cap', 'Index'],
  },
  {
    term: 'Liquidity Risk',
    short: 'Trade na ho paane ka risk',
    detail:
      'Asset ko fair price par jaldi convert na kar paana. Illiquid instruments me spread wide aur slippage zyada hota hai.',
    category: 'Market Structure',
    related: ['Liquidity', 'Slippage', 'Market Impact'],
  },
  {
    term: 'Listing',
    short: 'Exchange par trade hona',
    detail:
      'Company ke shares ko exchange par officially tradeable banane ki process. IPO ke baad listing hoti hai; delisting reverse process hai.',
    category: 'Market Basics',
    related: ['IPO', 'Exchange', 'ISIN'],
  },
  {
    term: 'Manipulation',
    short: 'Price ko artificially move karna',
    detail:
      'Pump-and-dump, wash trading ya spoofing jaise practices. Market integrity ko damage karte hain aur regulators inhe enforce karte hain.',
    category: 'Markets & Macro',
    related: ['Wash Trading', 'Surveillance', 'Compliance'],
  },
  {
    term: 'Mark to Market',
    short: 'Positions ko current price par value karna',
    detail:
      'Derivatives me daily settlement current market price par hota hai. Profit/loss unrealised se realised ban jaata hai aur margin balance update hota hai.',
    category: 'Derivatives',
    related: ['Margin', 'Futures Contract', 'Margin Call'],
  },
  {
    term: 'Market Cap',
    short: 'Company ki total market value',
    detail:
      'Share price × total shares outstanding. Index classification (large/mid/small cap) ka base.',
    category: 'Market Basics',
    related: ['Market Capitalisation', 'Float (Free Float)', 'Large Cap'],
  },
  {
    term: 'Market Impact',
    short: 'Aapke order ka price par asar',
    detail:
      'Bade orders price ko aapke against move kar dete hain. Position size badhne ke saath impact non-linearly badhta hai.',
    category: 'Market Structure',
    related: ['Slippage', 'Liquidity Risk', 'Execution'],
  },
  {
    term: 'Market Price',
    short: 'Abhi ka traded price',
    detail:
      'Last trade ka price, jo bid-ask ke beech hota hai. Book value aur intrinsic value se conceptually different hai.',
    category: 'Market Basics',
    related: ['Face Value', 'Book Value', 'Valuation'],
  },
  {
    term: 'Momentum',
    short: 'Price change ki tasveer',
    detail:
      'Recent direction aur speed. Momentum indicators (RSI, MACD) ise quantify karte hain. Momentum persistence ek observed phenomenon hai, law nahi.',
    category: 'Technical Analysis',
    related: ['Relative Strength Index (RSI)', 'MACD', 'Trend Following'],
  },
  {
    term: 'Moving Average Crossover',
    short: 'Do MAs ka cross',
    detail:
      'Fast MA slow MA ko cross kare — trend shift ka simple rule. Sideways markets me bahut false signals deta hai.',
    category: 'Technical Analysis',
    related: ['Moving Average', 'Golden Cross', 'Death Cross'],
  },
  {
    term: 'NASDAQ',
    short: 'US tech-heavy exchange',
    detail:
      'US ka second-largest exchange, technology companies ka hub. Nasdaq Composite aur Nasdaq-100 iske indices hain.',
    category: 'Markets & Macro',
    related: ['S&P 500', 'Index', 'Exchange'],
  },
  {
    term: 'OBV',
    short: 'On-Balance Volume',
    detail:
      'Cumulative volume measure: up days par volume add, down days par subtract. Volume aur price direction ka agreement/disagreement dikhata hai.',
    category: 'Technical Analysis',
    related: ['Volume', 'Volume Analysis', 'Divergence'],
  },
  {
    term: 'Open Interest',
    short: 'Outstanding contracts',
    detail:
      'Derivatives me abhi tak open (unsettled) contracts ki total count. Volume se alag — volume same day ki activity hai, OI cumulative position hai.',
    category: 'Derivatives',
    related: ['Futures Contract', 'Put-Call Ratio', 'Expiry'],
  },
  {
    term: 'Operating Margin',
    short: 'Operating profit ka ratio',
    detail:
      'Operating profit ÷ revenue. Core business ki pricing power aur cost efficiency dikhata hai, capital structure se independent.',
    category: 'Fundamental Analysis',
    related: ['EBITDA', 'EBIT', 'Income Statement'],
  },
  {
    term: 'Options',
    short: 'Rights, not obligations',
    detail:
      'Contract jo holder ko buy/sell ka right deta hai, obligation nahi. Premium pay karte hain. Leverage, time decay aur implied volatility iske core drivers hain.',
    category: 'Derivatives',
    related: ['Call Option', 'Put Option', 'Premium'],
  },
  {
    term: 'Order Types',
    short: 'Order ke execution rules',
    detail:
      'Market, limit, stop-loss, stop-limit aur GTT — har type execution certainty aur price certainty me trade-off karta hai.',
    category: 'Market Structure',
    related: ['Market Order', 'Limit Order', 'GTT (Good Till Triggered)'],
  },
  {
    term: 'Out of Sample',
    short: 'Unseen data par test',
    detail:
      'Strategy ko us data par test karna jo develop karne me use nahi hua. Overfitting detect karne ka sabse practical tareeka.',
    category: 'Risk & Psychology',
    related: ['Overfitting', 'Curve Fitting', 'Simulation'],
  },
  {
    term: 'PEG Ratio',
    short: 'P/E ko growth se adjust karna',
    detail:
      'P/E ÷ earnings growth rate. High-growth companies ka valuation compare karne ke liye. Growth projections hi weak link hain.',
    category: 'Fundamental Analysis',
    related: ['P/E Ratio', 'EPS (Earnings Per Share)', 'Valuation'],
  },
  {
    term: 'Payout Ratio',
    short: 'Profit ka kitna hissa dividend',
    detail:
      'Dividend ÷ net income. High payout mature businesses me normal; growth companies me low rehta hai.',
    category: 'Fundamental Analysis',
    related: ['Dividend', 'Dividend Yield', 'Free Cash Flow'],
  },
  {
    term: 'Pennant',
    short: 'Chhota consolidation triangle',
    detail:
      'Flag jaisa hi par chhota aur symmetrical triangle shape me. Continuation pattern, par context ke bina unreliable.',
    category: 'Technical Analysis',
    related: ['Flag Pattern', 'Continuation', 'Breakout'],
  },
  {
    term: 'Positional Trading',
    short: 'Days-to-weeks positions',
    detail:
      'Swing se lamba horizon, intraday se chhota. Overnight aur event risk include hota hai.',
    category: 'Market Basics',
    related: ['Swing Trading', 'Intraday', 'Timeframe'],
  },
  {
    term: 'Premium',
    short: 'Option ka price',
    detail:
      'Option buyer jo pay karta hai. Intrinsic value + time value se banti hai; implied volatility badhne par premium badhta hai.',
    category: 'Derivatives',
    related: ['Options', 'Intrinsic Value', 'Implied Volatility'],
  },
  {
    term: 'Protective Put',
    short: 'Hedge ke liye put kharidna',
    detail:
      'Existing long position ke neeche put kharid kar downside cap karna. Cost = premium; ye insurance hai, free protection nahi.',
    category: 'Derivatives',
    related: ['Put Option', 'Hedge', 'Implied Volatility'],
  },
  {
    term: 'ROCE',
    short: 'Capital employed par return',
    detail:
      'EBIT ÷ capital employed. Capital-intensive businesses ke efficiency ka standard measure; ROCE > cost of capital value creation ka signal.',
    category: 'Fundamental Analysis',
    related: ['ROE', 'Capital Employed', 'EBIT'],
  },
  {
    term: 'ROE',
    short: 'Shareholders ke paise par return',
    detail:
      'Net income ÷ shareholders\' equity. Leverage isse artificially badha sakta hai — DuPont se decompose karein.',
    category: 'Fundamental Analysis',
    related: ['ROCE', 'DuPont Analysis', 'Debt to Equity'],
  },
  {
    term: 'Recession',
    short: 'Economic activity ka contraction',
    detail:
      'GDP, employment aur production me broad-based decline, usually do consecutive quarters. Equity markets aksar recession se pehle girte hain.',
    category: 'Markets & Macro',
    related: ['Yield Curve', 'Interest Rate', 'Economic Events'],
  },
  {
    term: 'Recovery Rate',
    short: 'Drawdown ke baad wapsi',
    detail:
      'Drawdown ke baad original peak tak pahunchne ke liye required gain. 50% drawdown ke liye 100% gain chahiye — asymmetry critical hai.',
    category: 'Risk & Psychology',
    related: ['Max Drawdown', 'Drawdown', 'Risk of Ruin'],
  },
  {
    term: 'Relative Volume',
    short: 'Average ke mukable volume',
    detail:
      'Current volume ÷ average volume same time of day/session. Breakout ki quality judge karne me helpful.',
    category: 'Technical Analysis',
    related: ['Volume', 'Volume Analysis', 'Breakout'],
  },
  {
    term: 'Residual Claim',
    short: 'Equity holders ka last claim',
    detail:
      'Shareholders ko assets aur earnings par claim sabse last milta hai — creditors aur preference holders ke baad. Isliye equity riskier aur higher-expected-return hai.',
    category: 'Fundamental Analysis',
    related: ['Equity', 'Bond', 'Dividend'],
  },
  {
    term: 'Retracement',
    short: 'Counter-trend pullback',
    detail:
      'Trend ke andar temporary counter move. Fibonacci levels aksar reference ke liye use hote hain, prediction ke liye nahi.',
    category: 'Technical Analysis',
    related: ['Pullback', 'Fibonacci Retracement', 'Trend'],
  },
  {
    term: 'Risk per Trade',
    short: 'Ek trade par maximum loss',
    detail:
      'Account ka woh percentage jo ek trade me risk kar sakte hain (typically 1–2%). Position sizing ka foundation.',
    category: 'Risk & Psychology',
    related: ['Position Sizing', 'Stop Loss', 'Risk of Ruin'],
  },
  {
    term: 'Role Reversal',
    short: 'Support ka resistance banna',
    detail:
      'Broken support aksar resistance banke retest hota hai, aur vice versa. Ye tendency hai, mechanical law nahi.',
    category: 'Technical Analysis',
    related: ['Support', 'Resistance', 'Retest'],
  },
  {
    term: 'Rule of 72',
    short: 'Compounding ka quick math',
    detail:
      '72 ÷ annual return % ≈ paisa double hone ke saal. 12% par ~6 saal. Mental math ke liye approximation.',
    category: 'Market Basics',
    related: ['Compounding', 'Interest Rate', 'Time Value of Money'],
  },
  {
    term: 'Sentiment',
    short: 'Market ka mood',
    detail:
      'Participants ka collective bullish/bearish bias. Sentiment indicators (VIX, put-call ratio, surveys) iska proxy dete hain.',
    category: 'Risk & Psychology',
    related: ['VIX', 'Put-Call Ratio', 'FOMO'],
  },
  {
    term: 'Share',
    short: 'Company me ownership unit',
    detail:
      'Equity ka ek unit. Shareholder ko voting rights aur residual profit claim milta hai — par koi fixed return guarantee nahi.',
    category: 'Market Basics',
    related: ['Stock', 'Equity', 'Residual Claim'],
  },
  {
    term: 'Stock',
    short: 'Company ka equity share',
    detail:
      'Share ka synonym. Ownership instrument jo exchange par trade hota hai.',
    category: 'Market Basics',
    related: ['Share', 'Equity', 'Listing'],
  },
  {
    term: 'Shooting Star',
    short: 'Top par rejection candle',
    detail:
      'Upar lambi wick, chhota body — sellers ne rally reject ki. Sirf resistance/top context me meaningful.',
    category: 'Technical Analysis',
    related: ['Hammer', 'Inverted Hammer', 'Reversal'],
  },
  {
    term: 'Spinning Top',
    short: 'Indecision candle',
    detail:
      'Chhota body aur dono taraf wicks. Balance ka signal, direction ka nahi.',
    category: 'Technical Analysis',
    related: ['Doji', 'Indecision', 'Consolidation'],
  },
  {
    term: 'Simulation',
    short: 'Real market ke bina practice',
    detail:
      'Historical ya synthetic data par trades simulate karna. Execution, psychology aur liquidity real nahi hoti — ye limitation clearly samajhna zaroori hai.',
    category: 'Risk & Psychology',
    related: ['Paper Trading', 'Backtesting', 'Execution'],
  },
  {
    term: 'Sortino Ratio',
    short: 'Downside-only risk adjusted return',
    detail:
      'Sharpe jaisa hi par denominator me sirf downside deviation. Upside volatility ko penalty nahi deta.',
    category: 'Risk & Psychology',
    related: ['Sharpe Ratio', 'Calmar Ratio', 'Max Drawdown'],
  },
  {
    term: 'Square Off',
    short: 'Position band karna',
    detail:
      'Open position ko close karna, aksar broker ke margin call par forced. Ye involuntary exit hota hai, planned nahi.',
    category: 'Derivatives',
    related: ['Margin Call', 'Stop Loss', 'Settlement'],
  },
  {
    term: 'Stochastic',
    short: 'Range ke andar price ka position',
    detail:
      'Oscillator jo current close ko recent high-low range ke relative measure karta hai (0–100). Range-bound markets me useful, trends me false signals.',
    category: 'Technical Analysis',
    related: ['Relative Strength Index (RSI)', 'Momentum', 'Range'],
  },
  {
    term: 'Stop Hunt',
    short: 'Stops ko trigger karne ki move',
    detail:
      'Price briefly key stop levels ke paar jaakar liquidity collect karti hai, phir reverse hoti hai. Ye interpretation hai, documented intent nahi.',
    category: 'Market Structure',
    related: ['Liquidity Sweep', 'Stop Loss', 'Support and Resistance'],
  },
  {
    term: 'Strike Price',
    short: 'Option ka agreed price',
    detail:
      'Woh price jahan option exercise hota hai. Spot ke relative strike moneyness (ITM/ATM/OTM) decide karta hai.',
    category: 'Derivatives',
    related: ['Options', 'In the Money (ITM)', 'Moneyness'],
  },
  {
    term: 'Surveillance',
    short: 'Market activity ki nigrani',
    detail:
      'Exchanges aur regulators trading patterns monitor karte hain manipulation aur compliance breaches detect karne ke liye.',
    category: 'Markets & Macro',
    related: ['Manipulation', 'Compliance', 'Wash Trading'],
  },
  {
    term: 'Swing High',
    short: 'Local price peak',
    detail:
      'Aisa high jo aas-paas ke bars se upar ho. Market structure define karne ka basic building block.',
    category: 'Market Structure',
    related: ['Swing Low', 'Market Structure', 'Break of Structure'],
  },
  {
    term: 'Swing Low',
    short: 'Local price trough',
    detail:
      'Aisa low jo aas-paas ke bars se neeche ho. Higher lows uptrend ka structural marker.',
    category: 'Market Structure',
    related: ['Swing High', 'Market Structure', 'Trend'],
  },
  {
    term: 'T+1',
    short: 'Settlement timeline',
    detail:
      'Trade date ke agle business day par settlement. India ne equity settlement T+1 kar diya hai. Settlement se pehle proceeds reinvest nahi ho sakte.',
    category: 'Market Structure',
    related: ['Settlement', 'Intraday', 'Liquidity'],
  },
  {
    term: 'Ticker',
    short: 'Trading symbol',
    detail:
      'Exchange par company ka short identifier (e.g. RELIANCE, AAPL). ISIN globally unique identifier hai.',
    category: 'Market Basics',
    related: ['ISIN', 'Exchange', 'Listing'],
  },
  {
    term: 'Tilt',
    short: 'Emotional decision making',
    detail:
      'Loss ke baad frustration me plan se hat kar trade lena. Revenge trading tilt ka ek form hai. Recognition aur cooling-off period sabse practical fix hai.',
    category: 'Risk & Psychology',
    related: ['Revenge Trading', 'Discipline', 'FOMO'],
  },
  {
    term: 'Timeframe',
    short: 'Chart ka candle interval',
    detail:
      '1-minute se monthly tak. Higher timeframe structure zyada reliable hota hai; lower timeframe noise zyada. Multi-timeframe alignment common practice hai.',
    category: 'Technical Analysis',
    related: ['Swing Trading', 'Trend', 'Market Structure'],
  },
  {
    term: 'Trading',
    short: 'Shorter horizon ki activity',
    detail:
      'Price movements se profit target karna, usually days-to-weeks ke andar. Investing se difference intention aur time horizon ka hai.',
    category: 'Market Basics',
    related: ['Investing', 'Day Trading', 'Speculation'],
  },
  {
    term: 'Trading Account',
    short: 'Broker ke through order placing',
    detail:
      'Account jisse aap orders place karte hain. Demat account securities hold karta hai — dono alag entities hain.',
    category: 'Market Basics',
    related: ['Demat Account', 'Broker', 'Execution'],
  },
  {
    term: 'Trend',
    short: 'Directional price structure',
    detail:
      'Higher highs/lows (uptrend), lower highs/lows (downtrend), ya range (sideways). Trend identification timeframe-dependent hoti hai.',
    category: 'Technical Analysis',
    related: ['Market Structure', 'Trendline', 'Trend Following'],
  },
  {
    term: 'Trend Following',
    short: 'Trend ke saath rehna',
    detail:
      'Rules ke through existing trend me participate karna, reversal predict karne ki koshish na karna. Whipsaw aur drawdown iske structural costs hain.',
    category: 'Risk & Psychology',
    related: ['Trend', 'Momentum', 'Trailing Stop'],
  },
  {
    term: 'Valuation',
    short: 'Business ki worth ka estimate',
    detail:
      'DCF, multiples ya asset-based approaches se intrinsic value estimate karna. Har method assumptions par depend karta hai — precision ka illusion se bachna zaroori hai.',
    category: 'Fundamental Analysis',
    related: ['P/E Ratio', 'Enterprise Value', 'Intrinsic Value'],
  },
  {
    term: 'Variance',
    short: 'Volatility ka square',
    detail:
      'Standard deviation ka square. Portfolio risk math me natural unit; interpret karna standard deviation se mushkil.',
    category: 'Technical Analysis',
    related: ['Standard Deviation', 'Volatility', 'Sharpe Ratio'],
  },
  {
    term: 'Volatility Squeeze',
    short: 'Low vol ka compaction',
    detail:
      'Bollinger bands ka narrow hona ya ATR ka girna. Expansion ki taraf build-up ka hint, par direction nahi.',
    category: 'Technical Analysis',
    related: ['Bollinger Bands', 'Volatility', 'Breakout'],
  },
  {
    term: 'Volume Analysis',
    short: 'Volume se confirmation',
    detail:
      'Price move ke saath volume ka compare karna. Breakout without volume aksar fail hota hai; volume divergence bhi meaningful hai.',
    category: 'Technical Analysis',
    related: ['Volume', 'OBV', 'Relative Volume'],
  },
  {
    term: 'Overnight Risk',
    short: 'Market band hone ka risk',
    detail:
      'Session close ke baad adverse news ka risk. Overnight gaps stop-loss ko bypass kar sakte hain — ye structural risk hai, management failure nahi.',
    category: 'Risk & Psychology',
    related: ['Gap Up / Gap Down', 'Gap Fill', 'Stop Loss'],
  },
  {
    term: 'Indecision',
    short: 'Direction na hona',
    detail:
      'Buyers aur sellers ka balanced fight — doji/spinning top jaise patterns iska visual hain. Confirmation ka wait karna chahiye.',
    category: 'Technical Analysis',
    related: ['Doji', 'Spinning Top', 'Consolidation'],
  },
  {
    term: 'Inside Bar',
    short: 'Previous candle ke andar',
    detail:
      'High previous high se neeche aur low previous low se upar. Compression ka signal; breakout direction se trade hota hai (agar trade karna hai to).',
    category: 'Technical Analysis',
    related: ['Harami', 'Consolidation', 'Breakout'],
  },
  {
    term: 'Continuation Pattern',
    short: 'Trend ke continue hone ka shape',
    detail:
      'Flag, pennant aur triangle jaise patterns jo consolidation ke baad existing trend ke resume hone ka hint dete hain.',
    category: 'Technical Analysis',
    related: ['Pennant', 'Flag Pattern', 'Breakout'],
  },

  /* ---------------- Acronyms & families ---------------- */
  {
    term: 'ETF',
    short: 'Exchange-traded fund',
    detail:
      'Exchange par trade hone wala basket jo index ya theme ko track karta hai. Diversification affordable banata hai; tracking error aur expense ratio dekhna zaroori hai.',
    category: 'Market Basics',
    related: ['Index', 'Expense Ratio', 'Liquidity'],
  },
  {
    term: 'IPO',
    short: 'Initial public offering',
    detail:
      'Company ka pehli baar primary market me shares issue karna. Paisa company ko jaata hai (unlike secondary market). Lock-in aur allotment mechanics important hain.',
    category: 'Market Basics',
    related: ['Listing', 'Primary Market', 'Secondary Market'],
  },
  {
    term: 'Inverted Hammer',
    short: 'Bottom par upper-wick candle',
    detail:
      'Downtrend ke baad upar lambi wick wala candle. Buyers ke attempt ka signal, par confirmation ke bina weak. Trend ke top par same shape shooting star ban jaati hai.',
    category: 'Technical Analysis',
    related: ['Hammer', 'Shooting Star', 'Reversal'],
  },
  {
    term: 'Time Value of Money',
    short: 'Aaj ka rupee kal se mehnga',
    detail:
      'Aaj mile paise ko invest karke future value ban sakti hai. Compounding, discounting aur Rule of 72 isi concept ke applications hain.',
    category: 'Market Basics',
    related: ['Compounding', 'Rule of 72', 'Interest Rate'],
  },
  {
    term: 'Market Cycle',
    short: 'Accumulation se markdown tak',
    detail:
      'Price ka four-phase cycle: accumulation, markup, distribution, markdown. Framework hai, mechanical law nahi — phases hindsight me clear hote hain.',
    category: 'Market Structure',
    related: ['Accumulation', 'Markup', 'Distribution', 'Markdown'],
  },
  {
    term: 'Mid Cap',
    short: 'Medium size companies',
    detail:
      'Market cap me top-100 ke baad ki companies. Large caps se zyada volatile, small caps se zyada liquid.',
    category: 'Market Basics',
    related: ['Large Cap', 'Small Cap', 'Market Capitalisation'],
  },
  {
    term: 'Small Cap',
    short: 'Chhoti market cap companies',
    detail:
      'Lower liquidity aur higher volatility. Growth potential zyada par drawdown risk bhi zyada; position sizing conservative rakhein.',
    category: 'Market Basics',
    related: ['Mid Cap', 'Large Cap', 'Liquidity Risk'],
  },
  {
    term: 'Economic Events',
    short: 'Macro data aur policy decisions',
    detail:
      'Interest rate decisions, inflation prints, GDP, employment data. Scheduled events volatility badha sakte hain — position sizing me inhe account karein.',
    category: 'Markets & Macro',
    related: ['Interest Rate', 'Recession', 'VIX'],
  },
  {
    term: 'Support and Resistance',
    short: 'Price ke reaction zones',
    detail:
      'Woh price areas jahan historically buyers ya sellers ne react kiya. Ye zones hain, exact lines nahi — aur toot sakte hain.',
    category: 'Technical Analysis',
    related: ['Support', 'Resistance', 'Role Reversal', 'Confluence'],
  },
  {
    term: 'Expense Ratio',
    short: 'Fund ki annual fee',
    detail:
      'Mutual fund ya ETF jo annual percentage fees charge karta hai. Long horizons par compounding ko material damage karta hai — 1% extra fee 20 saal me returns ka bada hissa kha jaati hai.',
    category: 'Market Basics',
    related: ['ETF', 'Index', 'Compounding'],
  },
  {
    term: 'Primary Market',
    short: 'Naye shares ki first sale',
    detail:
      'Jahan company pehli baar apne shares issue karti hai (IPO, FPO, rights issue) aur paisa company ko milta hai. Secondary market me paisa investor-to-investor move karta hai.',
    category: 'Market Basics',
    related: ['IPO', 'Secondary Market', 'Listing'],
  },
  {
    term: 'Secondary Market',
    short: "Investor-to-investor trading",
    detail:
      'Exchange par existing shares ka trading. Company ko isse direct paisa nahi milta — sellers ko milta hai. Liquidity aur price discovery yahin hoti hai.',
    category: 'Market Basics',
    related: ['Primary Market', 'Exchange', 'Liquidity'],
  },

];

export function slugify(term: string) {
  return term
    .toLowerCase()
    .replace(/[()/]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const glossary: GlossaryEntry[] = seeds
  .map((s) => {
    const slug = s.slug ?? slugify(s.term);
    return {
      term: s.term,
      slug,
      letter: s.term[0].toUpperCase(),
      short: s.short,
      detail: s.detail,
      category: s.category,
      related: s.related ?? [],
      example: s.example,
    } satisfies GlossaryEntry;
  })
  .sort((a, b) => a.term.localeCompare(b.term));

export const glossaryBySlug = new Map(glossary.map((g) => [g.slug, g]));

export const glossaryLetters = Array.from(new Set(glossary.map((g) => g.letter))).sort();

export function searchGlossary(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return glossary;
  return glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(q) ||
      g.short.toLowerCase().includes(q) ||
      g.detail.toLowerCase().includes(q),
  );
}
