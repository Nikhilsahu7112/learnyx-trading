import type { MarketProfile } from '../lib/types';

const DISCLAIMER =
  'Ye page educational context ke liye hai. Learnyx Trading kisi broker, exchange ya product ki recommendation nahi deta, aur koi account ya trade facilitate nahi karta.';

export const markets: MarketProfile[] = [
  {
    id: 'indian',
    slug: 'indian-market',
    name: 'Indian Stock Market',
    tagline: 'NSE, BSE, SEBI, RBI aur NIFTY-SENSEX ka ecosystem',
    intro:
      'India ka equity market duniya ke sabse active retail markets me se ek hai. Do bade exchanges (NSE aur BSE), ek strong regulator (SEBI), ek independent central bank (RBI) aur ek mature depository-clearing infrastructure isse chalate hain. Is page par hum structure, timing, settlement aur terminology ko step by step dekhenge — bina kisi broker ko recommend kiye.',
    icon: 'IndiaRupee',
    accent: 'blue',
    sections: [
      {
        id: 'structure',
        title: 'Market ka dhaancha',
        body: 'India ka market layered hai: regulator (SEBI) rules banata hai, exchanges (NSE/BSE) trading platform chalate hain, clearing corporations settlement guarantee deti hain, aur depositories (NSDL/CDSL) securities hold karti hain. Broker aapke aur exchange ke beech ka gateway hai. Har layer ka apna role aur apni accountability hai — inhe mix karna sabse common beginner confusion hai.',
        bullets: [
          'SEBI — securities market regulator; disclosure, conduct aur investor protection.',
          'RBI — monetary policy, currency aur banking system (equity regulator nahi).',
          'NSE — largest derivatives venue; NIFTY 50 ka ghar.',
          'BSE — Asia ka oldest exchange (1875); SENSEX ka ghar.',
          'NSDL / CDSL — depositories (electronic securities custody).',
          'NSE Clearing / ICCL — clearing aur settlement guarantee.',
        ],
        terms: [
          { term: 'SEBI', meaning: 'Securities and Exchange Board of India — market regulator.' },
          { term: 'RBI', meaning: 'Reserve Bank of India — central bank, monetary policy.' },
          { term: 'NSE', meaning: 'National Stock Exchange — electronic order-driven exchange.' },
          { term: 'BSE', meaning: 'Bombay Stock Exchange — Asia ki oldest exchange.' },
          { term: 'DP', meaning: 'Depository Participant — depository ka agent (aksar broker).' },
        ],
      },
      {
        id: 'indices',
        title: 'NIFTY aur SENSEX',
        body: 'NIFTY 50 NSE ka 50-stock free-float market-cap weighted index hai — India ka sabse tracked benchmark. SENSEX BSE ka 30-stock benchmark hai. Dono me overlap bada hai, isliye daily moves usually similar direction me hote hain. Sectoral indices (Bank NIFTY, NIFTY IT, NIFTY Auto) specific sectors ko track karte hain aur relative strength analysis ke liye useful hain.',
        table: {
          headers: ['Index', 'Exchange', 'Constituents', 'Method'],
          rows: [
            ['NIFTY 50', 'NSE', '50 large caps', 'Free-float market cap weighted'],
            ['SENSEX', 'BSE', '30 large caps', 'Free-float market cap weighted'],
            ['Bank NIFTY', 'NSE', 'Major banks', 'Free-float market cap weighted'],
            ['NIFTY Midcap 100', 'NSE', 'Mid caps', 'Free-float market cap weighted'],
            ['India VIX', 'NSE', 'Derived from NIFTY options', 'Implied volatility'],
          ],
        },
      },
      {
        id: 'timings',
        title: 'Market timings aur sessions',
        body: 'Indian equity market IST me subah 9:15 se 3:30 tak khula rehta hai, Monday se Friday. Pre-open session 9:00 se 9:15 tak hota hai jahan orders collect hote hain aur indicative price discover hoti hai. Derivatives ka closing session (3:40–4:00) closing price determination ke liye hota hai. Holidays exchange calendar se verify karein — fixed list nahi hoti.',
        table: {
          headers: ['Session', 'Time (IST)', 'Kya hota hai'],
          rows: [
            ['Pre-open', '9:00 – 9:15', 'Order collection + indicative price'],
            ['Trading', '9:15 – 15:30', 'Continuous matching'],
            ['Closing (F&O)', '15:40 – 16:00', 'Closing price determination'],
            ['Post-close', '15:40 onward', 'Limited, product-specific'],
          ],
        },
      },
      {
        id: 'settlement',
        title: 'Settlement concepts',
        body: 'Equity delivery trades T+1 par settle hote hain — trade date ke agle working day. Intraday positions same day square-off hoti hain aur sirf net P&L settle hota hai. Pay-in aur pay-out broker ke through hota hai; agar funds time par na ho to shortfall/auction process aur penalties lag sakti hain. SEBI T+0 (instant settlement) par pilot kar raha hai.',
        bullets: [
          'T+1 — delivery settlement cycle (equity).',
          'Pay-in — funds/securities broker se clearing corporation tak.',
          'Pay-out — clearing corporation se broker/DP tak.',
          'Auction — jab seller securities deliver na kar paaye.',
          'Margin shortfall — penalty + position restriction.',
        ],
      },
      {
        id: 'derivatives-terms',
        title: 'Indian derivatives terminology',
        body: 'India ka derivatives market index options me duniya ke sabse bade volumes me se ek hai. Lot sizes, expiry structure aur margin rules SEBI regulated hain. SEBI ne retail protection ke liye lot sizes badhaye, weekly expiries limit kiye aur margin rules strengthen kiye — ye measures publicly documented data ke response me the jo retail losses dikhate the.',
        terms: [
          { term: 'Lot size', meaning: 'Contract ki minimum quantity — SEBI decide karti hai.' },
          { term: 'SPAN margin', meaning: 'Risk-based margin, extreme loss scenarios se derive.' },
          { term: 'Expiry day', meaning: 'Contract ka last trading day; settlement uske baad.' },
          { term: 'Physical settlement', meaning: 'Stock options/futures me actual delivery (index cash settled).' },
          { term: 'Ban period', meaning: 'Jab F&O me open interest limits cross ho jaayein to naye positions restrict ho sakte hain.' },
        ],
      },
      {
        id: 'terminology',
        title: 'Indian market terminology',
        body: 'India-specific terms jo global material me nahi milte: demat, DP, STT, T+1, circuit limits, price bands, script-wise ban, MUS (margin utilisation statement), and physical settlement obligations. Inhe samajhna execution aur compliance ke liye zaroori hai.',
        terms: [
          { term: 'STT', meaning: 'Securities Transaction Tax — buy/sell par lagne wala tax.' },
          { term: 'Demat', meaning: 'Shares ka electronic form.' },
          { term: 'Price band', meaning: 'Stock ka daily max up/down move (2/5/10/20%).' },
          { term: 'GTT', meaning: 'Good Till Triggered — broker-level conditional order.' },
          { term: 'PMS', meaning: 'Portfolio Management Services — managed accounts.' },
        ],
      },
    ],
    risks: [
      'Individual stock circuit limits exit ko block kar sakte hain.',
      'Derivatives leverage losses ko amplify karta hai — SEBI data retail losses dikhata hai.',
      'Illiquid small caps me slippage significant ho sakti hai.',
      'Intraday mandatory square-off ke saath mismatched expectations.',
      'Ye page kisi broker ya product ki recommendation nahi hai.',
    ],
    relatedLessons: [
      '1/market-infrastructure/what-is-a-stock-exchange',
      '1/market-infrastructure/market-indices-explained',
      '1/market-infrastructure/brokers-depositories-settlement',
    ],
  },
  {
    id: 'us',
    slug: 'us-market',
    name: 'US Stock Market',
    tagline: 'NYSE, NASDAQ, S&P 500, Federal Reserve aur earnings culture',
    intro:
      'US market global capital ka centre hai. Iski depth, disclosure standards aur institutional participation isse duniya ka most liquid equity market banati hai. Indian traders ke liye US market ka relevance: (a) global risk appetite ka driver, (b) US-listed companies ka exposure, (c) earnings season ka global impact.',
    icon: 'Building2',
    accent: 'violet',
    sections: [
      {
        id: 'structure',
        title: 'Exchanges aur regulators',
        body: 'NYSE aur NASDAQ do bade equity exchanges hain. NYSE historically auction + floor hybrid tha, ab electronic bhi hai; NASDAQ fully electronic hai aur tech listings me dominant. SEC market regulator hai — disclosure (10-K, 10-Q, 8-K), insider trading rules aur market conduct iske under aate hain. FINRA broker-dealer conduct supervise karta hai.',
        bullets: [
          'SEC — securities regulator; filings public hote hain (EDGAR).',
          'NYSE — blue-chip listings, hybrid auction model.',
          'NASDAQ — electronic, tech-heavy, dealer/ECN structure.',
          'FINRA — broker-dealer self-regulatory organisation.',
          'DTCC — clearing aur settlement infrastructure.',
        ],
      },
      {
        id: 'indices',
        title: 'S&P 500, Dow Jones aur NASDAQ Composite',
        body: 'S&P 500 500 large companies ka market-cap weighted index hai — institutional benchmark. Dow Jones Industrial Average 30 companies ka price-weighted index hai (methodology purani hai, isliye representative nahi maana jaata). NASDAQ Composite 3,000+ NASDAQ-listed stocks ko track karta hai — tech exposure zyada.',
        table: {
          headers: ['Index', 'Constituents', 'Method', 'Note'],
          rows: [
            ['S&P 500', '500 large caps', 'Market-cap weighted', 'Primary US benchmark'],
            ['Dow Jones (DJIA)', '30 large caps', 'Price weighted', 'Oldest, methodology limited'],
            ['NASDAQ Composite', '3,000+', 'Market-cap weighted', 'Tech-heavy'],
            ['Russell 2000', '2,000 small caps', 'Market-cap weighted', 'Small cap benchmark'],
            ['VIX', 'S&P 500 options', 'Implied volatility', 'Fear gauge'],
          ],
        },
      },
      {
        id: 'sessions',
        title: 'US market sessions',
        body: 'Regular session 9:30 se 16:00 ET tak hota hai. Pre-market (4:00–9:30) aur after-hours (16:00–20:00) sessions me liquidity patli aur spreads chaude hote hain. Indian traders ke liye 9:30 ET = 19:00 IST (winter) ya 18:30 IST (summer, DST ke hisaab se).',
        table: {
          headers: ['Session', 'ET', 'IST (approx, winter)'],
          rows: [
            ['Pre-market', '04:00 – 09:30', '14:30 – 20:00'],
            ['Regular', '09:30 – 16:00', '20:00 – 02:30'],
            ['After-hours', '16:00 – 20:00', '02:30 – 06:30'],
          ],
        },
      },
      {
        id: 'fed',
        title: 'Federal Reserve aur rates',
        body: 'Fed dual mandate par kaam karti hai: price stability aur maximum employment. FOMC saal me 8 baar meet karti hai. Fed funds rate US ka policy rate hai — global dollar liquidity, bond yields aur equity valuations ko affect karta hai. India ke liye Fed ka asar FPI flows aur currency ke through aata hai.',
        terms: [
          { term: 'FOMC', meaning: 'Federal Open Market Committee — rate decisions.' },
          { term: 'Fed funds rate', meaning: 'US policy rate — banks ke overnight lending ka target.' },
          { term: 'Dot plot', meaning: 'FOMC members ki future rate projections (survey, commitment nahi).' },
          { term: 'QE / QT', meaning: 'Quantitative easing / tightening — liquidity operations.' },
        ],
      },
      {
        id: 'earnings',
        title: 'Earnings reports',
        body: 'US companies quarterly results report karti hain (10-Q) aur annual (10-K). Earnings season Jan, Apr, Jul, Oct me peak hota hai. Reaction typically "beat/miss vs consensus" aur guidance par hota hai — absolute numbers se zyada surprise important hai. After-hours earnings moves bahut bade ho sakte hain, aur IV crush options ko destroy kar sakta hai.',
        bullets: [
          'Revenue vs consensus estimate.',
          'EPS (GAAP vs adjusted) — dono dekhein.',
          'Guidance — future expectations, often dominant.',
          'Earnings call commentary — management tone.',
          'After-hours gap risk — overnight exposure.',
        ],
      },
      {
        id: 'terminology',
        title: 'US-specific terminology',
        body: 'US market me kuch terms hain jo India me nahi milte: 10-K/10-Q filings, T+1 settlement (2024 se), pre/after-market sessions, "circuit breaker" (LULD volatility halts), and fractional shares. Options me weekly expiries standard hain aur 0DTE (zero days to expiry) popular hai — extremely risky.',
        terms: [
          { term: '10-K / 10-Q', meaning: 'Annual / quarterly SEC filings.' },
          { term: '8-K', meaning: 'Material event disclosure.' },
          { term: 'LULD', meaning: 'Limit up-limit down — volatility trading halts.' },
          { term: 'Ticker', meaning: 'Stock symbol (AAPL, MSFT).' },
          { term: 'ADR', meaning: 'American Depositary Receipt — foreign company ka US-listed instrument.' },
          { term: '0DTE', meaning: 'Zero days to expiry options — extremely high risk.' },
        ],
      },
    ],
    risks: [
      'Time-zone mismatch — India se live track karna mushkil.',
      'After-hours liquidity thin hoti hai, spreads wide.',
      'Currency risk (USD/INR) additional dimension hai.',
      'Taxation aur reporting requirements jurisdiction-specific hain.',
      '0DTE options aur leveraged ETFs extremely high risk hain.',
    ],
    relatedLessons: [
      '1/market-infrastructure/market-indices-explained',
      '1/understanding-markets/economic-events-and-markets',
      '5/advanced-market-concepts/volatility-and-open-interest',
    ],
  },
  {
    id: 'forex',
    slug: 'forex',
    name: 'Forex Market',
    tagline: 'Currency pairs, pips, lots aur central bank influence',
    intro:
      'Forex duniya ka sabse bada financial market hai — daily turnover trillions of dollars me hai. Ye decentralized OTC market hai: koi single exchange nahi, koi single regulator nahi. Participants banks, corporates, central banks aur (brokers ke through) retail traders hote hain. Is page par hum mechanics samjhenge aur risks honestly batayenge.',
    icon: 'Globe2',
    accent: 'teal',
    sections: [
      {
        id: 'pairs',
        title: 'Currency pairs ka structure',
        body: 'Har quote do currencies ka hota hai: base aur quote. USD/INR = 83.25 ka matlab 1 USD ke liye ₹83.25 chahiye. Base currency hamesha 1 unit hoti hai. Jab quote badhta hai, base currency strong ho rahi hai (ya quote currency weak).',
        terms: [
          { term: 'Base currency', meaning: 'Pehli currency — 1 unit (USD/INR me USD).' },
          { term: 'Quote currency', meaning: 'Doosri currency — kitna lagega (INR).' },
          { term: 'EUR/USD', meaning: 'Duniya ka sabse liquid pair.' },
          { term: 'USD/JPY', meaning: 'Yen pairs me pips 2nd decimal par hote hain.' },
          { term: 'Cross pair', meaning: 'USD ke bina pair (EUR/GBP, EUR/JPY).' },
        ],
      },
      {
        id: 'pair-types',
        title: 'Major, minor aur exotic pairs',
        body: 'Major pairs USD ke saath hote hain aur sabse liquid hain (EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD). Minor/cross pairs USD ke bina hote hain par major economies ke beech hote hain (EUR/GBP, EUR/JPY). Exotic pairs me ek emerging market currency hoti hai (USD/INR, USD/TRY) — spreads wide aur volatility high.',
        table: {
          headers: ['Type', 'Example', 'Spread', 'Liquidity'],
          rows: [
            ['Major', 'EUR/USD', 'Very tight (fraction of pip)', 'Highest'],
            ['Minor / Cross', 'EUR/GBP', 'Tight', 'High'],
            ['Exotic', 'USD/INR', 'Wide', 'Moderate'],
            ['Exotic (illiquid)', 'USD/TRY', 'Very wide', 'Low, volatile'],
          ],
        },
      },
      {
        id: 'pips-lots',
        title: 'Pips, spreads aur lots',
        body: 'Pip usually 4th decimal (0.0001); JPY pairs me 2nd decimal. Lot standardised size hai: standard (100,000 units), mini (10,000), micro (1,000). Pip value position size se multiply hoti hai — isliye position sizing ka importance bahut zyada hai.',
        terms: [
          { term: 'Pip', meaning: 'Price interest point — smallest standardised move.' },
          { term: 'Pipette / point', meaning: '1/10th of a pip (5th decimal).' },
          { term: 'Standard lot', meaning: '100,000 units of base currency.' },
          { term: 'Spread', meaning: 'Bid-ask difference — trading cost.' },
          { term: 'Swap / rollover', meaning: 'Overnight financing charge (interest differential).' },
        ],
      },
      {
        id: 'leverage',
        title: 'Leverage aur margin',
        body: 'Forex brokers historically high leverage dete the (1:100, 1:500, offshore 1:1000+). Regulated jurisdictions me retail leverage capped hai (US 1:50 majors, EU/UK 1:30) kyunki high leverage retail traders ke liye destructive proven hui hai. High leverage par chhota move bhi account wipe kar sakta hai.',
        bullets: [
          'Regulated leverage: usually 1:30 to 1:50 for retail.',
          'Margin call aur stop-out levels broker-specific hote hain.',
          'Swap charges long positions me carry cost hote hain.',
          'Negative balance protection jurisdiction-specific hai.',
        ],
      },
      {
        id: 'central-banks',
        title: 'Central bank influence',
        body: 'Currency markets par sabse bada structural influence central banks ka hota hai — interest rate differentials currency demand drive karte hain. Fed, ECB, BOE, BOJ, RBI aur PBoC major players hain. Intervention (currency buy/sell) rare par violent hota hai. Rate decisions aur forward guidance currency volatility ke primary drivers hain.',
        table: {
          headers: ['Central bank', 'Currency', 'Note'],
          rows: [
            ['Federal Reserve', 'USD', 'Global reserve currency issuer'],
            ['ECB', 'EUR', 'Eurozone monetary policy'],
            ['Bank of Japan', 'JPY', 'Historically low rates, carry trade driver'],
            ['RBI', 'INR', 'Managed float, inflation targeting'],
            ['PBoC', 'CNY', 'Managed currency regime'],
          ],
        },
      },
    ],
    risks: [
      'High leverage se account wipe-out ka real risk.',
      'India me retail forex trading RBI/FEMA rules ke under restricted hai — sirf recognised exchanges par permitted pairs.',
      'Offshore brokers ka legal aur counterparty risk significant hai.',
      'Overnight swap costs aur rollover charges return kha sakte hain.',
      'Ye page koi broker ya product recommend nahi karta.',
    ],
    relatedLessons: [
      '1/understanding-markets/forex-commodity-and-crypto',
      '1/understanding-markets/economic-events-and-markets',
      '4/risk-management/drawdown-and-risk-of-ruin',
    ],
  },
  {
    id: 'commodity',
    slug: 'commodities',
    name: 'Commodity Market',
    tagline: 'Gold, silver, crude oil, natural gas aur agri futures',
    intro:
      'Commodities physical goods hain — metals, energy aur agricultural products. Trading mostly futures contracts ke through hoti hai, jahan price ke alawa storage, financing aur delivery terms bhi matter karte hain. Inflation aur geopolitics ka direct exposure yahan milta hai.',
    icon: 'Wheat',
    accent: 'amber',
    sections: [
      {
        id: 'basics',
        title: 'Commodity market ka structure',
        body: 'Commodities spot aur futures dono me trade hote hain, par liquidity futures me zyada hoti hai. MCX India me energy/metals ke liye major exchange hai; COMEX, NYMEX aur CBOT global benchmarks hain. Futures me contract specifications, delivery months, storage aur quality standards defined hote hain.',
        bullets: [
          'MCX — India ka commodity derivatives exchange (energy, metals, agri).',
          'COMEX — gold, silver, copper futures.',
          'NYMEX — crude oil (WTI), natural gas.',
          'CBOT — grains (corn, wheat, soybeans).',
          'ICE — Brent crude, softs (coffee, sugar, cotton).',
        ],
      },
      {
        id: 'gold-silver',
        title: 'Gold aur silver',
        body: 'Gold ka koi cash flow nahi hota — iski demand real interest rates, USD strength, central bank buying aur safe-haven sentiment se aati hai. Negative real rates historically gold ke liye supportive rahe hain. Silver me industrial demand ka bada hissa hai (solar, electronics), isliye wo gold se zyada volatile hai.',
        terms: [
          { term: 'Real interest rate', meaning: 'Nominal rate minus inflation — gold ka main driver.' },
          { term: 'Gold-silver ratio', meaning: 'Gold price ÷ silver price — relative value context.' },
          { term: 'Central bank buying', meaning: 'Official reserve diversification demand.' },
          { term: 'ETF flows', meaning: 'Paper gold demand ka important component.' },
        ],
      },
      {
        id: 'energy',
        title: 'Crude oil aur natural gas',
        body: 'Crude oil prices OPEC+ supply decisions, geopolitics, inventory data aur global demand cycle se driven hote hain. WTI aur Brent do benchmarks hain (Brent global, WTI US). Natural gas extremely seasonal aur weather-sensitive hai — storage levels aur LNG flows critical hain.',
        bullets: [
          'OPEC+ production quotas — supply side ka biggest factor.',
          'Weekly inventory data (EIA) — market-moving.',
          'Refining margins — crack spreads.',
          'Natural gas: weather, storage, LNG exports.',
          'Geopolitical events me sharp risk premium.',
        ],
      },
      {
        id: 'agri',
        title: 'Agricultural commodities',
        body: 'Agri commodities (wheat, corn, soybeans, cotton, sugar, coffee) weather, crop reports (USDA), export policies aur global trade flows se driven hote hain. India me agri derivatives par regulatory restrictions period ke hisaab se change hoti hain — availability verify karein.',
        bullets: [
          'USDA WASDE report — key supply/demand data.',
          'Monsoon aur weather patterns (India).',
          'Export bans/import duties policy risk.',
          'Thin liquidity kuch contracts me — wide spreads.',
        ],
      },
      {
        id: 'futures-mechanics',
        title: 'Commodity futures mechanics',
        body: 'Commodity futures delivery obligations aur rollover costs (contango/backwardation) ke saath aate hain. Contango me long position rollover cost deta hai; backwardation me benefit. Isliye commodity ETF ka long-term return spot price se materially different ho sakta hai — ye "roll yield" ka concept hai.',
        terms: [
          { term: 'Contango', meaning: 'Futures price > spot — storage/carry cost. Long rollover cost deta hai.' },
          { term: 'Backwardation', meaning: 'Futures price < spot — tight supply/convenience yield.' },
          { term: 'Roll yield', meaning: 'Rollover se aane wala return component.' },
          { term: 'Warehouse receipt', meaning: 'Physical delivery ka documentation.' },
        ],
      },
    ],
    risks: [
      'Rollover costs long-term exposure ka return kha sakte hain.',
      'Energy aur agri extremely volatile aur weather/geopolitics driven hain.',
      'Margin requirements aur delivery obligations specific hote hain.',
      'Agri derivatives ke availability par regulatory restrictions ho sakti hain.',
      'Ye page koi commodity ya contract recommend nahi karta.',
    ],
    relatedLessons: [
      '1/understanding-markets/forex-commodity-and-crypto',
      '5/derivatives/futures-contracts',
      '1/understanding-markets/equity-and-bond-markets',
    ],
  },
  {
    id: 'crypto',
    slug: 'crypto',
    name: 'Cryptocurrency Market',
    tagline: 'Blockchain, Bitcoin, custody aur extreme risk ka honest view',
    intro:
      'Crypto assets blockchain par chalte hain — distributed ledgers jahan transactions cryptographically verify hoti hain. Ye ek naya asset class hai jisme innovation bhi hai aur extreme risk bhi. Is page par hum technology, market structure aur — sabse important — risks ko honestly dekhenge.',
    icon: 'Bitcoin',
    accent: 'rose',
    sections: [
      {
        id: 'blockchain',
        title: 'Blockchain fundamentals',
        body: 'Blockchain ek distributed ledger hai jisme blocks cryptographically linked hote hain. Consensus mechanisms (Proof of Work, Proof of Stake) network security dete hain. Decentralisation ka matlab: koi single authority transactions approve nahi karti — par ye scalability aur governance trade-offs ke saath aata hai.',
        terms: [
          { term: 'Block', meaning: 'Transactions ka batch jo chain me add hota hai.' },
          { term: 'Proof of Work', meaning: 'Computational mining se consensus (Bitcoin).' },
          { term: 'Proof of Stake', meaning: 'Staked capital se consensus (Ethereum).' },
          { term: 'Hash', meaning: 'Cryptographic fingerprint of data.' },
          { term: 'Smart contract', meaning: 'Self-executing code on blockchain.' },
        ],
      },
      {
        id: 'bitcoin-ethereum',
        title: 'Bitcoin aur Ethereum',
        body: 'Bitcoin (2009) pehla cryptocurrency hai — primarily "digital scarcity" aur store-of-value narrative ke saath. Supply capped at ~21 million. Ethereum smart contracts ka platform hai — decentralized applications (DeFi, NFTs) iske upar bante hain. Dono ka koi cash flow nahi hai, isliye valuation purely demand/supply aur narrative-driven hai.',
        bullets: [
          'Bitcoin: fixed supply, halving cycles, PoW.',
          'Ethereum: smart contract platform, PoS, gas fees.',
          'Altcoins: thousands of tokens, most extremely speculative.',
          'No intrinsic cash flow — valuation framework contested.',
        ],
      },
      {
        id: 'exchanges-wallets',
        title: 'Exchanges aur wallets',
        body: 'Centralised exchanges (CEX) custody rakhte hain — matlab aapke coins exchange ke paas hain ("not your keys, not your coins"). Self-custody wallets me private keys aapke paas hote hain — par key khone par funds permanently gone. DEX (decentralised exchanges) smart contracts se chalte hain — code risk aur exploit risk.',
        terms: [
          { term: 'CEX', meaning: 'Centralised exchange — custody exchange ke paas.' },
          { term: 'DEX', meaning: 'Decentralised exchange — smart contracts.' },
          { term: 'Cold wallet', meaning: 'Offline storage — safer from hacks.' },
          { term: 'Hot wallet', meaning: 'Internet-connected wallet.' },
          { term: 'Seed phrase', meaning: 'Recovery phrase — kabhi share na karein.' },
        ],
      },
      {
        id: 'volatility',
        title: 'Volatility aur market risks',
        body: 'Crypto me 30–50% drawdowns "normal" history me common rahe hain. 24/7 markets, lack of circuit breakers, thin order books aur sentiment-driven flows volatility ko amplify karte hain. Correlation equity se recent years me badhi hai par unstable hai.',
        bullets: [
          '30–50% drawdowns historically common.',
          '24/7 trading — koi session break nahi.',
          'Leverage available high — liquidation cascades.',
          'Exchange insolvency risk (2022 examples).',
          'Regulatory announcements se sudden repricing.',
        ],
      },
      {
        id: 'stablecoins',
        title: 'Stablecoins',
        body: 'Stablecoins (USDT, USDC) fiat se pegged tokens hain jo trading pairs aur settlement ke liye use hote hain. Peg stability issuer reserves par depend karti hai — 2022 me algorithmic stablecoin (UST) ka collapse dikhaya ki "stable" guarantee nahi hai. Issuer solvency aur regulatory treatment risk remain karte hain.',
        terms: [
          { term: 'Reserve-backed', meaning: 'Fiat/cash equivalents se backed (USDC, USDT declared).' },
          { term: 'Algorithmic', meaning: 'Code-based peg maintenance — proven fragile.' },
          { term: 'Depeg', meaning: 'Peg se deviation — confidence crisis ka sign.' },
        ],
      },
      {
        id: 'security',
        title: 'Security fundamentals',
        body: 'Crypto me security aapki responsibility hai. Phishing, fake apps, "guaranteed return" schemes, rug pulls aur private key compromise se losses irreversible hote hain (koi chargeback nahi). Ye fundamentals non-negotiable hain: seed phrase kabhi share nahi, hardware wallet for large holdings, official app sources only, aur "guaranteed returns" wale kisi bhi scheme se door rahein.',
        bullets: [
          'Seed phrase kabhi kisi ko na dein (support bhi nahi).',
          'Hardware wallet large holdings ke liye.',
          'Official app stores se hi apps install karein.',
          'Guaranteed return schemes = scam red flag.',
          'Two-factor authentication everywhere.',
          'Test transactions before large transfers.',
        ],
      },
    ],
    risks: [
      'Regulatory uncertainty — India me taxation aur legal treatment evolving hai.',
      'Custody risk — exchange hack ya insolvency par funds ja sakte hain.',
      'Extreme volatility — 30–50% drawdowns normal hain.',
      'Scam risk — guaranteed-return schemes, ponzi tokens, rug pulls.',
      'Kai jurisdictions me legal restrictions hain — verify karein.',
      'Koi intrinsic cash flow nahi — valuation purely demand-based.',
      'Learnyx Trading koi crypto asset recommend nahi karta.',
    ],
    relatedLessons: [
      '1/understanding-markets/forex-commodity-and-crypto',
      '5/advanced-market-concepts/order-flow-and-microstructure',
      '4/risk-management/drawdown-and-risk-of-ruin',
    ],
  },
  {
    id: 'derivatives',
    slug: 'derivatives-market',
    name: 'Derivatives Market',
    tagline: 'Futures, options, Greeks aur leverage ka reality check',
    intro:
      'Derivatives wo contracts hain jinki value underlying asset se derive hoti hai. Ye risk transfer ke liye bane the — hedging ke liye. Retail participation mostly speculation ke liye hoti hai, aur publicly available data retail losses dikhata hai. Is page par hum mechanics samjhenge aur risks honestly batayenge.',
    icon: 'Layers',
    accent: 'violet',
    sections: [
      {
        id: 'futures-options',
        title: 'Futures vs options',
        body: 'Futures me dono parties ko obligation hoti hai; options me buyer ko right hota hai aur seller ko obligation. Isse risk profiles bilkul different ho jaate hain. Futures symmetrical hain (unlimited profit/loss both sides); long options asymmetric hain (limited loss, unlimited upside).',
        table: {
          headers: ['Feature', 'Futures', 'Options'],
          rows: [
            ['Obligation', 'Both parties', 'Buyer: right; Seller: obligation'],
            ['Upfront cost', 'Margin', 'Premium'],
            ['Max loss (long)', 'Unlimited', 'Premium'],
            ['Time decay', 'None', 'Yes (options)'],
            ['Use case', 'Hedging, directional', 'Hedging, income, volatility'],
          ],
        },
      },
      {
        id: 'greeks',
        title: 'Options Greeks',
        body: 'Greeks option price sensitivities hain. Delta directional exposure, gamma delta ka acceleration, theta time decay, vega volatility sensitivity, rho interest rate sensitivity. Ye Black-Scholes jaise models se aate hain — useful approximations hain, exact predictions nahi.',
        terms: [
          { term: 'Delta', meaning: 'Underlying move par option price change (0 to ±1).' },
          { term: 'Gamma', meaning: 'Delta ka change rate — ATM expiry ke paas highest.' },
          { term: 'Theta', meaning: 'Time decay — buyer ke against, seller ke favour.' },
          { term: 'Vega', meaning: 'Implied volatility sensitivity.' },
          { term: 'Rho', meaning: 'Interest rate sensitivity — short-dated me minor.' },
        ],
      },
      {
        id: 'volatility',
        title: 'Volatility ka role',
        body: 'Options premium me implied volatility (IV) ka bada hissa hota hai. Events se pehle IV badhti hai, event ke baad collapse hoti hai (IV crush). Iska matlab: direction sahi hone par bhi option position loss me aa sakti hai. Ye sabse common retail trap hai.',
        bullets: [
          'High IV = mehange options.',
          'Event ke baad IV crush = premium collapse.',
          'VIX / India VIX se broad IV level track hota hai.',
          'Volatility strategies time aur IV par depend karti hain, sirf direction par nahi.',
        ],
      },
      {
        id: 'margins',
        title: 'Margins aur leverage',
        body: 'Derivatives margin-based leverage dete hain. SPAN margin risk-based hota hai; exposure margin additional buffer. Daily mark-to-market par margin call aa sakti hai aur broker square-off kar sakta hai. Iska matlab: aap ultimately sahi ho sakte hain par interim drawdown se position close ho sakti hai.',
        terms: [
          { term: 'SPAN margin', meaning: 'Risk-based initial margin from extreme loss scenarios.' },
          { term: 'Exposure margin', meaning: 'Additional buffer margin.' },
          { term: 'Mark to market', meaning: 'Daily P&L settlement into margin account.' },
          { term: 'Square off', meaning: 'Forced closure by broker on margin shortfall.' },
        ],
      },
      {
        id: 'reality',
        title: 'Honest reality check',
        body: 'SEBI ke public studies ne consistently dikhaya hai ki retail F&O traders ka bada majority net loss me raha hai — costs, leverage aur structural difficulty ke karan. SEBI ne is response me lot sizes badhaye, weekly expiries limit kiye aur margin rules strengthen kiye. Ye kisi individual ka outcome predict nahi karte, par market ki structural difficulty ka honest signal hain.',
        bullets: [
          'Costs (brokerage, STT, GST, slippage) high-frequency strategies ko destroy karte hain.',
          'Leverage losses ko amplify karta hai.',
          'Time decay options buyers ka structural dushman hai.',
          'Position sizing aur risk limits non-negotiable hain.',
          'Learnyx koi derivative strategy recommend nahi karta.',
        ],
      },
    ],
    risks: [
      'Leverage losses ko multiply karta hai.',
      'Margin calls forced liquidation kar sakti hain.',
      'Time decay options buyers ko continuously nuksan pahunchata hai.',
      'IV crush direction sahi hone par bhi loss de sakta hai.',
      'SEBI data retail F&O losses dikhata hai.',
      'Ye page koi strategy ya contract recommend nahi karta.',
    ],
    relatedLessons: [
      '5/derivatives/futures-contracts',
      '5/derivatives/options-fundamentals',
      '5/options-greeks/delta-and-gamma',
      '5/options-greeks/theta-vega-rho',
    ],
  },
];

export const marketBySlug = new Map(markets.map((m) => [m.slug, m]));

export const MARKET_DISCLAIMER = DISCLAIMER;
