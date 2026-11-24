import type { LessonBodyRegistry } from './builder';
import { callout, diagram, example, formula, h, list, olist, p, table, terms } from './builder';

export const level1b: LessonBodyRegistry = {
  /* ================================================================ */
  /* MODULE 2 — Stock Market Infrastructure                           */
  /* ================================================================ */
  'market-foundations/market-infrastructure/what-is-a-stock-exchange': {
    objectives: [
      'Exchange ke core functions samajhna — listing, matching, price dissemination.',
      'NSE, BSE, NYSE aur NASDAQ ke basic structure me antar samajhna.',
      'Ye samajhna ki exchange broker se alag entity hai.',
    ],
    intro:
      'Stock exchange ek regulated marketplace hai jahan listed securities ke orders electronically match hote hain. Aap directly exchange se trade nahi karte — aap broker ke through jaate hain, broker exchange ka member hota hai. Is lesson me hum is pipeline ko step-by-step dekhenge.',
    blocks: [
      h('Exchange ke 5 kaam'),
      olist([
        '**Listing** — company ko trade karne ki permission dena, eligibility rules ke saath.',
        '**Order matching** — price-time priority ke basis par buy aur sell orders ko match karna.',
        '**Price dissemination** — last traded price, volume, depth sabko real-time dikhana.',
        '**Surveillance** — manipulation, insider trading aur unusual activity detect karna.',
        '**Coordination** — clearing corporation aur depositories ke saath settlement ensure karna.',
      ]),
      h('Order matching kaise hota hai'),
      p(
        'Do rules yaad rakhiye: **price priority** (best price pehle) aur **time priority** (same price par jo pehle aaya wo pehle). Agar aap ₹100 par buy order dete hain jab market me ₹99.5 par sell available hai, to aapko **₹99.5** milega — better price. Aapka limit order "limit" hai, "exact price" nahi.',
      ),
      example(
        'Price-time priority',
        'Ask side par: 100 shares @ ₹99.50 (trader X, 9:15:02), 200 shares @ ₹99.60 (trader Y, 9:15:01). Aap 150 shares ka market buy daalte hain. Pehle ₹99.50 ke 100 shares milenge (best price), phir ₹99.60 ke 50 shares. Aapka average fill price = (100 × 99.50 + 50 × 99.60) ÷ 150 = ₹99.533.',
        [
          'Step 1: Best price pehle — ₹99.50.',
          'Step 2: Us level par 100 shares available — wo poore mil gaye.',
          'Step 3: Bachche 50 shares next level ₹99.60 se.',
          'Result: partial fills at multiple levels = slippage.',
        ],
      ),
      h('Major exchanges'),
      table(
        ['Exchange', 'Country', 'Type', 'Notable'],
        [
          ['NSE', 'India', 'Electronic, order-driven', 'NIFTY 50, largest India derivatives venue'],
          ['BSE', 'India', 'Electronic, order-driven', 'SENSEX, Asia ka oldest exchange (1875)'],
          ['NYSE', 'USA', 'Auction + hybrid floor', 'Blue-chip listings, USD trillions market cap'],
          ['NASDAQ', 'USA', 'Fully electronic', 'Tech-heavy, dealer/ECN based'],
          ['LSE', 'UK', 'Electronic', 'FTSE indices, international listings'],
          ['HKEX', 'Hong Kong', 'Electronic', 'Asia-Pacific gateway'],
          ['CME / NYMEX', 'USA', 'Derivatives', 'Futures aur options ke global benchmarks'],
        ],
      ),
      callout(
        'info',
        'NSE vs BSE — simple difference',
        'Dono India me regulated exchanges hain aur dono par same stock list ho sakta hai. NSE ka derivatives segment zyada liquid hai; BSE ka index SENSEX hai. Ek listed stock dono par trade kar sakta hai par prices almost same rehti hain kyunki arbitrageurs gap close kar dete hain.',
      ),
      h('Exchange, broker, depository — teen alag entities'),
      table(
        ['Entity', 'Kaam', 'Example'],
        [
          ['Exchange', 'Orders match karna, price dikhana', 'NSE, BSE'],
          ['Broker', 'Aapka order exchange tak pahunchana, margin aur records manage karna', 'Registered stock broker'],
          ['Depository', 'Aapke shares electronic form me hold karna', 'CDSL, NSDL (India); DTCC (US)'],
          ['Clearing corporation', 'Trade ka guarantee, netting aur settlement', 'NSE Clearing, ICCL'],
          ['Regulator', 'Rules banana aur enforce karna', 'SEBI (India), SEC (US)'],
        ],
      ),
      callout(
        'warn',
        'Common misunderstanding',
        '"Exchange par account hota hai" — nahi. Aapka account broker ke paas hota hai, shares depository me, aur order exchange par execute hota hai. Ye teen alag layers hain, aur har layer ka apna regulator aur rules hain.',
      ),
    ],
    summary: [
      'Exchange ek regulated matching engine hai jo listing, matching, pricing aur surveillance karta hai.',
      'Order matching price priority aur time priority par hoti hai.',
      'Better price milna normal hai — limit order exact price fix nahi karta.',
      'Exchange, broker, depository aur clearing corporation alag-alag roles hain.',
      'Same stock multiple exchanges par list ho sakta hai; arbitrage price gap close karta hai.',
    ],
    mistakes: [
      'Broker ko exchange samajhna.',
      'Limit order ko "exactly isi price par milega" samajhna.',
      'Ye sochna ki exchange aapke paise ya shares hold karta hai.',
    ],
    keyPoints: [
      'Exchange = matching + transparency + surveillance.',
      'Price-time priority market microstructure ka base hai.',
      'Broker aapka gateway hai, depository aapka custody layer hai.',
    ],
    quiz: [
      {
        q: 'Limit buy order ₹100 par hai, market me ₹99.5 par sell available hai. Aapka execution price kya hoga?',
        options: ['₹100', '₹99.5', '₹99.75 average', 'Order reject ho jaayega'],
        answer: 1,
        explain: 'Aapko best available price milta hai — ₹99.5. Limit sirf maximum price set karta hai, exact price nahi.',
      },
      {
        q: 'Aapke shares electronic form me kahan hold hote hain?',
        options: ['Exchange me', 'Broker ke trading account me', 'Depository me', 'SEBI ke paas'],
        answer: 2,
        explain: 'Shares depository (India me CDSL/NSDL) me demat form me hold hote hain. Broker sirf access deta hai.',
      },
      {
        q: 'Order matching me same price par kaun pehle execute hota hai?',
        options: ['Jo bada order hai', 'Jo pehle aaya (time priority)', 'Jo retail hai', 'Random'],
        answer: 1,
        explain: 'Price priority pehle, uske baad time priority. Isliye latency-sensitive systems milliseconds par compete karte hain.',
      },
    ],
    exercise:
      'Kisi bhi ek listed stock ka order book (market depth) dekhein — 5 best bids aur 5 best asks. Likh kar batao: spread kitna hai, total quantity dono side kitni hai, aur kya ye stock liquid lagta hai?',
  },

  'market-foundations/market-infrastructure/market-indices-explained': {
    objectives: [
      'Index kya hota hai aur usse kya measure hota hai.',
      'Market-cap weighted vs price-weighted index me antar.',
      'NIFTY 50, SENSEX, S&P 500, Dow Jones aur NASDAQ Composite ko pehchanna.',
    ],
    intro:
      '"Market aaj upar gaya" — lekin market ka matlab kya? Hazaron stocks hain. Index ek summary number hai jo chune hue stocks ki collective movement batata hai. Ye kisi ek stock ki kahani nahi, ek basket ki kahani hai.',
    blocks: [
      h('Index ka basic concept'),
      p(
        'Index ek **basket of securities** ka normalised value hai. Base year me uski value 100 ya 1000 fix ki jaati hai, aur aaj ki value base ke relative calculate hoti hai. Agar index 5% up hai, matlab basket (weighting ke hisaab se) average 5% up hai — iska matlab har stock 5% up hai, aisa nahi.',
      ),
      formula(
        'Market-cap weighted index (simplified)',
        'Index = (Σ Free-float market cap of constituents ÷ Base market cap) × Base index value',
        'Free-float ka matlab sirf wo shares jo public ke paas trade ke liye available hain — promoter holding exclude hoti hai.',
      ),
      h('Index weighting ke methods'),
      table(
        ['Method', 'Kaise', 'Example', 'Implication'],
        [
          ['Market-cap weighted', 'Bade companies ka weight zyada', 'NIFTY 50, SENSEX, most global indices', 'Top 5 stocks index ka bada hissa'],
          ['Free-float weighted', 'Sirf tradeable shares ka weight', 'NIFTY 50 (free-float adjusted)', 'Promoter-heavy companies ka asar kam'],
          ['Price-weighted', 'Har stock ka price weight', 'Dow Jones Industrial Average', 'Ek mehanga stock index ko zyada hilata hai'],
          ['Equal weighted', 'Sabka barabar weight', 'S&P 500 Equal Weight', 'Chhoti companies ka asar zyada'],
        ],
      ),
      h('Major indices'),
      terms([
        {
          term: 'NIFTY 50',
          meaning: 'NSE ka benchmark — 50 large-cap Indian companies, free-float market-cap weighted. India ka sabse tracked index.',
        },
        {
          term: 'SENSEX',
          meaning: 'BSE ka 30-stock benchmark. Free-float market-cap weighted. Asia ka oldest index family me se.',
        },
        {
          term: 'S&P 500',
          meaning: 'US ke 500 large companies ka market-cap weighted index — US equity market ka primary benchmark.',
        },
        {
          term: 'Dow Jones (DJIA)',
          meaning: '30 large US companies ka price-weighted index. Purana hai par methodology ki wajah se representative nahi maana jaata.',
        },
        {
          term: 'NASDAQ Composite',
          meaning: 'NASDAQ-listed 3,000+ stocks ka index — tech-heavy, market-cap weighted.',
        },
        {
          term: 'VIX',
          meaning: 'CBOE Volatility Index — S&P 500 options se implied volatility. "Fear gauge" kehlata hai, par ye direction nahi batata.',
        },
      ]),
      example(
        'Ek index move ko decode karna',
        'Maaniye NIFTY 50 me 3 stocks hain jinka weight 12%, 8% aur 5% hai. Stock A 2% up, Stock B 1% down, Stock C 4% up. Index ka approximate contribution = (0.12 × 2) + (0.08 × −1) + (0.05 × 4) = 0.24 − 0.08 + 0.20 = 0.36% (baaki stocks flat maan kar).',
        [
          'Har stock ka weight × uska return = contribution.',
          'Sab contributions add karein → index return.',
          'Yahi wajah hai ki bade weight wale stocks index ko zyada hilate hain.',
        ],
      ),
      callout(
        'warn',
        'Index ≠ economy',
        'Index me sirf listed, large, liquid companies hote hain. Ek desh ki GDP me agriculture, unorganised sector aur chhoti industries bhi hain. Isliye "market up hai par economy weak hai" possible hai — aur ulta bhi.',
      ),
      callout(
        'info',
        'Index fund ka connection',
        'Index ka replicable hona important hai. Index funds/ETFs index ke constituents ko same weight me kharidte hain, isliye unka return index ke lagbhag barabar hota hai (minus costs). Ye passive investing ka base hai.',
      ),
    ],
    summary: [
      'Index ek basket ki collective value batata hai, base year ke relative.',
      'Market-cap aur free-float weighted indices me bade stocks ka asar zyada hota hai.',
      'Dow Jones price-weighted hai, isliye methodology alag hai.',
      'NIFTY 50 aur SENSEX India ke benchmarks hain; S&P 500 US ka.',
      'Index economy nahi hota — sirf listed large companies ka snapshot.',
    ],
    mistakes: [
      'Index up = sab stocks up, ye maan lena.',
      'Dow Jones aur S&P 500 ko same samajhna.',
      'VIX ko direction indicator samajhna — wo volatility ka indicator hai.',
    ],
    keyPoints: [
      'Index = weighted basket value, base-normalised.',
      'Free-float weighting promoter holding ko exclude karti hai.',
      'Index returns ko replicate karna passive funds ka core hai.',
    ],
    quiz: [
      {
        q: 'NIFTY 50 me kisi stock ka weight sabse zyada kis par depend karta hai?',
        options: ['Share price', 'Free-float market capitalisation', 'Company ka age', 'Volume'],
        answer: 1,
        explain: 'NIFTY 50 free-float market-cap weighted hai. Bada free-float market cap = zyada weight.',
      },
      {
        q: 'Dow Jones ko price-weighted kehte hain kyunki…',
        options: [
          'Wo sirf mehange stocks include karta hai',
          'Har stock ka weight uske share price par depend karta hai, market cap par nahi',
          'Wo fixed price par trade hota hai',
          'Usme sirf 5 stocks hain',
        ],
        answer: 1,
        explain: 'Price-weighted index me high-priced stock ka index par zyada asar hota hai — ye market cap se alag methodology hai.',
      },
      {
        q: 'VIX kya measure karta hai?',
        options: [
          'Market ka direction',
          'S&P 500 options se implied volatility (expected fluctuation)',
          'Total market volume',
          'Interest rates',
        ],
        answer: 1,
        explain: 'VIX implied volatility measure karta hai. High VIX = zyada expected fluctuation, par direction koi guarantee nahi.',
      },
    ],
    exercise:
      'NIFTY 50 ke top 5 stocks ka weight kisi public index factsheet se dekhein. Calculate karein ki un 5 stocks ka combined weight kitna hai. Phir likhein ki index ka move kitna un 5 stocks par depend karta hai.',
  },

  'market-foundations/market-infrastructure/brokers-depositories-settlement': {
    objectives: [
      'Broker ka actual role aur charges ka structure samajhna.',
      'Depository aur demat ka concept clear karna.',
      'T+1 settlement cycle ko step-by-step samajhna.',
    ],
    intro:
      'Trade place karna aur us trade ka settle hona do alag cheezein hain. Trade ek contract hai; settlement us contract ka poora hona — paisa idhar, shares udhar. Is lesson me hum broker se depository tak ka poora pipeline dekhenge. Ye jaanne ke liye koi account kholna zaroori nahi.',
    blocks: [
      h('Broker kya karta hai'),
      list([
        'Aapka order exchange ke matching engine tak pahunchata hai.',
        'Margin aur funds ka accounting karta hai (aapke paise, aapke naam).',
        'Contract notes aur capital gains statements deta hai.',
        'Risk management karta hai — agar aapka position margin se kam ho to square-off kar sakta hai.',
        'Regulatory reporting karta hai (KYC, PAN, tax reporting).',
      ]),
      h('Charges ka structure — samajhna zaroori hai'),
      table(
        ['Charge', 'Kya hai', 'Kaise lagta hai'],
        [
          ['Brokerage', 'Broker ka fee', 'Per trade (flat ya %), plan ke hisaab se'],
          ['Exchange transaction charge', 'Exchange ka fee', 'Turnover ka chhota percentage'],
          ['STT / securities transaction tax', 'Government tax', 'Buy/sell par (India me segment ke hisaab se)'],
          ['GST', 'Tax on brokerage + charges', 'Brokerage + transaction charges par'],
          ['SEBI turnover fee', 'Regulator fee', 'Turnover ka bahut chhota hissa'],
          ['Stamp duty', 'State levy', 'Buy side par'],
          ['DP charge', 'Depository participant fee', 'Jab aap shares sell karte hain (delivery out)'],
        ],
      ),
      callout(
        'info',
        'Spreadsheet ki asli value',
        'Ek trade ka "profit" tab tak real nahi jab tak costs minus na ho. Scalping jaise high-frequency styles me costs hi edge kha jaate hain. Isliye Learnyx ka Backtesting Simulator fees aur slippage inputs deta hai — kyunki unreal backtests hi sabse bada trap hain.',
      ),
      h('Depository aur demat'),
      p(
        'India me shares physical certificates ke roop me nahi, **dematerialised** form me rehte hain. Depository (NSDL, CDSL) ek electronic vault hai. Aap depository ke directly customer nahi hote — aap **Depository Participant (DP)** ke through jaate hain, jo aksar aapka broker hi hota hai.',
      ),
      terms([
        { term: 'Demat account', meaning: 'Jahan aapke shares electronic form me hold hote hain.' },
        { term: 'Trading account', meaning: 'Jahan se aap orders place karte hain aur funds manage hote hain.' },
        { term: 'DP (Depository Participant)', meaning: 'Depository ka agent — broker aksar ye role bhi play karta hai.' },
        { term: 'ISIN', meaning: 'International Securities Identification Number — har security ka unique code.' },
        { term: 'CUSIP / Ticker (US)', meaning: 'US me securities identify karne ke codes.' },
      ]),
      h('Settlement cycle T+1'),
      p(
        'India me equity ka settlement cycle **T+1** hai — trade date ke agle working day. Iska matlab: jab aap Monday ko share kharidte hain, shares Tuesday tak aapke demat account me aate hain. Pehle T+2 tha, aur T+0 (instant) par pilot chal raha hai. US me 2024 se T+1 lagu ho gaya hai.',
      ),
      olist([
        '**T day** — order execute, trade confirm. Aapka broker contract note deta hai.',
        '**Clearing** — clearing corporation net positions calculate karti hai (kisne kitna dena/lena hai).',
        '**T+1** — funds transfer aur securities transfer. Net obligation settle hoti hai.',
        '**Post settlement** — shares demat me credit, paisa broker ledger me debit.',
      ]),
      example(
        'T+1 ka practical matlab',
        'Aap Monday 11:00 baje 100 shares ₹500 par kharidte hain = ₹50,000. Aapko Tuesday tak ₹50,000 dena hoga aur Tuesday tak 100 shares milenge. Agar aap wahi shares Monday ko hi bech dete hain (intraday), to settlement involve nahi hoti — sirf net P&L settle hota hai. Isliye intraday aur delivery ka accounting alag hota hai.',
        [
          'Delivery trade: T+1 par paisa aur shares exchange hote hain.',
          'Intraday trade: same day square-off, sirf net P&L settle hota hai.',
          'Agar T day par paisa nahi hua → broker auction/shortfall process chalata hai (penalty lag sakti hai).',
        ],
      ),
      callout(
        'warn',
        'Ye platform account recommend nahi karta',
        'Learnyx sirf process samajhata hai. Hum kisi broker ko recommend nahi karte, koi account khulwane ki salah nahi dete, aur koi affiliate link nahi hai. Agar aap kabhi account kholne ka sochein, to SEBI-registered broker hona chahiye — aur ye aapka apna independent decision hoga.',
      ),
    ],
    summary: [
      'Broker order routing, margin accounting aur reporting karta hai.',
      'Total trading cost me brokerage, taxes, exchange charges, GST aur DP charges shamil hote hain.',
      'Shares depository me demat form me hold hote hain, DP ke through access milta hai.',
      'India me equity settlement T+1 hai; intraday me sirf net P&L settle hota hai.',
      'Costs ko ignore karna kisi bhi strategy ka silent killer hai.',
    ],
    mistakes: [
      'Brokerage ko hi total cost samajhna — taxes aur DP charges bhoolna.',
      'Trading account aur demat account ko same samajhna.',
      'Settlement delay ko broker ki galti samajhna.',
    ],
    keyPoints: [
      'Trade ≠ settlement. Trade contract hai, settlement uska completion.',
      'T+1 cycle: trade date + 1 working day.',
      'Cost structure return ka real number badalta hai — always net par sochein.',
    ],
    quiz: [
      {
        q: 'India me equity ka standard settlement cycle kya hai?',
        options: ['T+0', 'T+1', 'T+2', 'T+3'],
        answer: 1,
        explain: 'India me equity delivery T+1 par settle hota hai. Pehle T+2 tha; ab T+1 standard hai.',
      },
      {
        q: 'Aapke shares electronic form me kahan rehte hain?',
        options: ['Broker ke bank account me', 'Depository me, DP ke through accessible', 'Exchange ke vault me', 'Aapke email me'],
        answer: 1,
        explain: 'NSDL/CDSL depository me shares demat form me hote hain; DP (aksar broker) access deta hai.',
      },
      {
        q: 'Intraday trade me settlement kaise hoti hai?',
        options: [
          'Shares physically transfer hote hain',
          'Same day square-off hone par sirf net P&L settle hota hai',
          'Settlement nahi hota, trade cancel ho jaata hai',
          'T+5 par settle hota hai',
        ],
        answer: 1,
        explain: 'Buy aur sell same day net ho jaate hain, isliye sirf profit/loss ka settlement hota hai.',
      },
    ],
    exercise:
      'Kisi bhi public brokerage calculator se ek ₹50,000 ke delivery trade aur ek ₹50,000 ke intraday trade ka total cost compare karein. Ratio nikalein: cost turnover ka kitna % hai? Phir socho ki 20 trades per month par ye yearly kitna banega.',
  },

  /* ================================================================ */
  /* MODULE 3 — Important Market Terminology                          */
  /* ================================================================ */
  'market-foundations/market-terminology/bull-bear-and-market-sentiment': {
    objectives: [
      'Bull market, bear market aur correction ki definition aur duration.',
      'Market sentiment kya hai aur usse kaise measure karte hain.',
      'Sentiment ko evidence ke bina conclusion na banana.',
    ],
    intro:
      'Bull aur bear sirf "upar" aur "neeche" ke naam nahi hain — inke paas conventional definitions hain. Aur sentiment ek alag cheez hai: sentiment logon ka mood hai, trend price ka behaviour. Dono ko mix karna analysis ka common mistake hai.',
    blocks: [
      h('Definitions jo actually use hoti hain'),
      table(
        ['Term', 'Common definition', 'Dhyaan'],
        [
          ['Bull market', '20%+ rise from recent low, broad-based, sustained', '+20% rule convention hai, law nahi'],
          ['Bear market', '20%+ fall from recent high', 'Sab indices/asset classes par same threshold nahi'],
          ['Correction', '10% se 20% ke beech fall', 'Bear market se chhoti'],
          ['Pullback', 'Chhota counter-move trend ke andar', 'Trend change nahi'],
          ['Sideways / range', 'Price ek band me', 'Directionless par tradeable'],
        ],
      ),
      p(
        'Ye thresholds conventional hain — koi universal scientific rule nahi. Kisi asset class me 20% move normal volatility ho sakti hai (crypto), kisi me (bond) 20% move catastrophic hoti hai. Isliye threshold ko context ke saath padhein.',
      ),
      diagram(
        'market-cycle',
        'Market cycle ka simplified picture',
        'Accumulation → markup → distribution → markdown. Ye ek framework hai, prediction tool nahi.',
        'A stylised cycle diagram with four phases: accumulation where price moves sideways after a decline, markup where price trends up, distribution where price stalls near highs, and markdown where price declines. The caption notes that real cycles are irregular and the phase is only identifiable in hindsight.',
      ),
      h('Sentiment kaise measure hota hai'),
      list([
        '**Price action** — higher highs/lows = bullish structure (evidence-based).',
        '**Breadth** — kitne stocks up hain vs down (advance-decline ratio).',
        '**Volatility** — VIX bada = uncertainty zyada.',
        '**Positioning** — F&O open interest, put-call ratio (survey jaise, imperfect).',
        '**Flows** — FII/DII, mutual fund SIP inflows.',
        '**Surveys** — AAII sentiment (US), consumer confidence — lagging indicators.',
        '**Media tone** — anecdotal; isse trade mat banaiye.',
      ]),
      callout(
        'info',
        'Sentiment vs trend',
        'Sentiment = logon ka mood (subjective, often contrarian at extremes). Trend = price ka actual structure (objective, measurable). Contrarian trades tab kaam karte hain jab sentiment extreme ho **aur** price structure confirm kare. Sirf "sab bearish hain, main bullish hoon" ek coin flip hai.',
      ),
      example(
        'Sentiment extremes — ek framework',
        'Ek scenario: index 3 mahine se sideways, breadth improve ho rahi hai, VIX high se gir raha hai, par news negative hai. Ye "negative sentiment + improving internals" ka setup hai. Ulta: index all-time high, breadth weak (sirf 5 stocks index utha rahe hain), VIX low, sab bullish — ye narrow rally ka warning ho sakta hai. Dono hi cases me **koi guarantee nahi** — ye sirf risk-reward ka context hai.',
        [
          'Sentiment extremes = contrarian context, not a signal.',
          'Breadth divergence historical warning hai, timing nahi deti.',
          'Har observation ke saath "main galat kab honga" define karein.',
        ],
      ),
      h('Ek important nuance'),
      p(
        'Bull market me har stock upar nahi jaata aur bear market me har stock neeche nahi. Index bade stocks se banta hai; aapka portfolio alag ho sakta hai. Isliye "market bullish hai" ko apne holdings ke thesis se replace karna zaroori hai.',
      ),
      callout(
        'warn',
        'Narrative trap',
        'Har move ke baad ek kahani mil jaati hai ("market gira kyunki oil bada"). Ye story-telling analysis nahi hai — ye hindsight bias hai. Aage ka decision purani kahani se nahi, aaj ke risk-reward aur invalidation level se lena chahiye.',
      ),
    ],
    summary: [
      'Bull/bear/correction ke conventional thresholds hain (20%/20%/10%) par ye law nahi.',
      'Sentiment investor mood hai; trend price structure hai.',
      'Breadth, volatility, positioning aur flows sentiment ke measurable inputs hain.',
      'Sentiment extremes contrarian context dete hain, timing nahi.',
      'Index direction aapke individual holdings ki direction guarantee nahi karta.',
    ],
    mistakes: [
      'Sentiment ko trend samajhna.',
      'Har move ke baad narrative banana aur usse predict karna.',
      '20% threshold ko har asset class par apply karna.',
    ],
    keyPoints: [
      'Sentiment = mood; trend = structure. Dono alag tools hain.',
      'Breadth divergence ek warning signal hai, entry signal nahi.',
      'Invalidation level define kiye bina view ka koi matlab nahi.',
    ],
    quiz: [
      {
        q: 'Bear market ki conventional definition kya hai?',
        options: ['5% fall', '10% fall', '20% fall from recent high', '50% fall'],
        answer: 2,
        explain: 'Convention ke hisaab se 20%+ fall from recent high bear market kehlata hai. 10–20% correction hoti hai.',
      },
      {
        q: 'Market breadth weak ho par index all-time high par ho — kya matlab ho sakta hai?',
        options: [
          'Sab stocks strong hain',
          'Rally narrow hai — sirf kuch bade stocks index utha rahe hain',
          'Breadth ka index se koi rishta nahi',
          'Index galat calculate ho raha hai',
        ],
        answer: 1,
        explain: 'Narrow rally breadth divergence create karti hai — ek warning context, trade signal nahi.',
      },
      {
        q: 'Contrarian trade kab zyada thoughtful hota hai?',
        options: [
          'Jab sirf sentiment extreme ho',
          'Jab sentiment extreme ho aur price structure bhi confirm kare',
          'Jab news positive ho',
          'Jab volume zero ho',
        ],
        answer: 1,
        explain: 'Akele sentiment ek weak edge hai. Structure + defined risk ke saath hi wo considered trade banta hai.',
      },
    ],
    exercise:
      'Pichhle 6 mahine ka koi index chart dekhein. Advance-decline ya market breadth data ka ek snapshot lein. 3 observations likhein jahan breadth aur index ne opposite direction dikhaya. Uske baad 2 hafte ki price movement dekhein — kya breadth divergence ne kuch indicate kiya?',
  },

  'market-foundations/market-terminology/liquidity-volume-and-market-cap': {
    objectives: [
      'Liquidity ke teen dimensions samajhna.',
      'Volume aur liquidity ka farq clear karna.',
      'Market cap categories aur unke practical implications.',
    ],
    intro:
      'Liquidity ek aisi cheez hai jo tab pata chalti hai jab wo na ho. Jab aap ek stock bechna chahte hain aur koi buyer nahi milta — ya bahut kam price par milta hai — wo illiquidity hai. Ye lesson aapko ye samajhne me madad karega ki liquidity aapke returns ko kaise affect karti hai.',
    blocks: [
      h('Liquidity ke teen dimensions'),
      olist([
        '**Tightness** — spread kitna chhota hai. ₹100 stock par ₹0.05 spread tight hai; ₹2 spread wide hai.',
        '**Depth** — har price level par kitni quantity available hai. 10,000 shares easily absorb hote hain ya nahi.',
        '**Resilience** — bada order ke baad price kitni jaldi normal hota hai.',
      ]),
      p(
        'Isliye "volume high hai" ka matlab liquidity high hai — ye hamesha sach nahi. Ek stock ka volume high ho sakta hai par depth kam (thin book), aur bada order price ko hila de. Liquidity measure karne ke liye spread, depth aur average daily volume teeno dekhne chahiye.',
      ),
      h('Volume kya batata hai'),
      table(
        ['Observation', 'Common interpretation (not a rule)'],
        [
          ['Price up + volume up', 'Move me participation hai — stronger conviction'],
          ['Price up + volume down', 'Move weak/weakening ho sakta hai'],
          ['Price down + volume up', 'Selling pressure serious ho sakta hai'],
          ['Price down + volume down', 'Selling exhaustion ka possibility'],
          ['Volume spike without price move', 'Absorption ya indecision — context chahiye'],
        ],
      ),
      callout(
        'info',
        'Volume ka honest status',
        'Volume confirmation ek useful heuristic hai, statistical law nahi. Liquidity events (index rebalancing, expiry, block deals) volume ko bina kisi "conviction" ke badha dete hain. Isliye volume ko always price structure ke saath padhein.',
      ),
      h('Market capitalisation'),
      formula(
        'Market capitalisation',
        'Market Cap = Share price × Shares outstanding',
        'Free-float market cap = Share price × Free-float shares (promoter/govt holding exclude).',
      ),
      example(
        'Market cap calculation',
        'Company ke 50 crore shares hain, price ₹400 hai. Market cap = 50 crore × ₹400 = ₹20,000 crore (₹200 billion, approx $2.4 billion). Agar promoter ke paas 60% shares hain, free-float market cap = ₹20,000 crore × 40% = ₹8,000 crore. Index inclusion aur liquidity ke liye free-float zyada important hai.',
        [
          'Total shares = 50 crore.',
          'Price = ₹400.',
          'Market cap = ₹20,000 crore.',
          'Free-float (40%) = ₹8,000 crore.',
        ],
      ),
      h('Market cap categories (India convention)'),
      table(
        ['Category', 'Rough definition (SEBI convention)', 'Characteristics'],
        [
          ['Large cap', 'Top 100 companies by market cap', 'Liquid, stable, lower volatility, well-researched'],
          ['Mid cap', '101–250', 'Growth potential, moderate liquidity'],
          ['Small cap', '251 onwards', 'High growth potential, low liquidity, high volatility'],
          ['Micro cap', 'Very small, often < ₹500 crore', 'Illiquid, manipulation-prone, wide spreads'],
        ],
      ),
      callout(
        'warn',
        'Liquidity risk kaise dikhta hai',
        'Aapne ₹5 lakh ka small-cap stock kharida. Ab bechna hai. Order book me sirf 500 shares ka bid hai. Aapka market order bade discount par fill hoga — ye **slippage** hai. Illiquid stocks me aapka "paper profit" realise karte waqt gayab ho sakta hai.',
      ),
      p(
        'Practical rule: apne position size ko average daily volume ke percentage ke roop me sochein. Agar aapka order average daily volume ka 1% se kam hai, impact manageable hai. 10%+ ho to aap khud market ho.',
      ),
    ],
    summary: [
      'Liquidity = tightness + depth + resilience, sirf volume nahi.',
      'Volume price move ke saath padhna chahiye, akela nahi.',
      'Market cap = price × shares; free-float index aur liquidity ke liye important.',
      'Small/micro caps me slippage aur liquidity risk zyada hota hai.',
      'Position size ko average daily volume ke relative sochein.',
    ],
    mistakes: [
      'High volume ko high liquidity samajhna.',
      'Market cap ko company ki "value" samajhna — wo sirf market price × shares hai.',
      'Illiquid stock me bada position lena aur exit ka plan na hona.',
    ],
    keyPoints: [
      'Liquidity multi-dimensional hai — spread, depth, resilience.',
      'Free-float market cap index aur practical liquidity ke liye important.',
      'Slippage illiquid stocks me sabse bada hidden cost hai.',
    ],
    quiz: [
      {
        q: 'Liquidity ke teen dimensions kaunse hain?',
        options: [
          'Price, volume, market cap',
          'Tightness, depth, resilience',
          'Bid, ask, spread',
          'Open, high, low',
        ],
        answer: 1,
        explain: 'Liquidity = tight spread (tightness), enough quantity at levels (depth), aur price ka order ke baad recover karna (resilience).',
      },
      {
        q: 'Ek company ke 20 crore shares hain aur price ₹150 hai. Market cap?',
        options: ['₹300 crore', '₹3,000 crore', '₹30 crore', '₹1,500 crore'],
        answer: 1,
        explain: '20 crore × ₹150 = ₹3,000 crore.',
      },
      {
        q: 'Illiquid stock me bade order ka sabse direct asar kya hoga?',
        options: [
          'Brokerage zero ho jaayega',
          'Slippage — order multiple price levels par fill hoga, average price kharab',
          'Order automatically cancel ho jaayega',
          'Stock delist ho jaayega',
        ],
        answer: 1,
        explain: 'Depth kam hone par order book khaali ho jaata hai aur fill price progressively kharab hoti jaati hai.',
      },
    ],
    exercise:
      'Do stocks compare karein — ek large cap aur ek small cap. Dono ka spread (best bid vs best ask), 5-level depth aur average daily volume note karein. Likh kar batao ki ₹1 lakh ka order dono me kitna slippage create karega (approximate).',
  },

  'market-foundations/market-terminology/bid-ask-spread-and-order-book': {
    objectives: [
      'Bid, ask, spread aur mid-price ki definition.',
      'Order book (market depth) kaise padhna hai.',
      'Spread ka hidden cost kya hai, aur market order vs limit order me farq.',
    ],
    intro:
      'Jab aap "price" dekhte hain, wo actually ek single number nahi hoti — do numbers hoti hain: bid aur ask. Inke beech ka gap aapka pehla cost hai, trade se pehle hi. Is lesson me hum order book ki language sikhayenge.',
    blocks: [
      h('Core terms'),
      terms([
        { term: 'Bid', meaning: 'Sabse zyada price jo koi buyer dene ko tayyar hai. Aap yahan bech sakte hain.' },
        { term: 'Ask (Offer)', meaning: 'Sabse kam price jo koi seller maang raha hai. Aap yahan kharid sakte hain.' },
        { term: 'Spread', meaning: 'Ask − Bid. Ye liquidity ka direct measure hai.' },
        { term: 'Mid price', meaning: '(Bid + Ask) ÷ 2. Common reference, par tradeable nahi.' },
        { term: 'Last traded price (LTP)', meaning: 'Sabse recent executed trade ka price. Ye bid ya ask ho sakta hai.' },
        { term: 'Market depth', meaning: 'Order book me har level par available quantity.' },
      ]),
      formula(
        'Spread aur spread cost',
        'Spread = Ask − Bid\nSpread % = (Ask − Bid) ÷ Mid × 100\nRound-trip cost (approx) = Spread % (buy at ask, sell at bid)',
        'Agar bid ₹99.90 aur ask ₹100.10 hai: spread = ₹0.20, spread% = 0.20 ÷ 100 × 100 = 0.20%. Turant entry-exit par aapko lagbhag 0.20% cost lagta hai, brokerage se pehle.',
      ),
      h('Order book kaise dikhta hai'),
      table(
        ['Level', 'Bid Qty', 'Bid Price', 'Ask Price', 'Ask Qty'],
        [
          ['1', '1,200', '99.90', '100.10', '900'],
          ['2', '2,500', '99.85', '100.15', '1,800'],
          ['3', '3,100', '99.80', '100.20', '2,400'],
          ['4', '5,000', '99.75', '100.25', '4,100'],
          ['5', '7,500', '99.70', '100.30', '6,000'],
        ],
        'Hypothetical order book. Bid side par demand, ask side par supply.',
      ),
      diagram(
        'order-book',
        'Order book structure',
        'Bid side neeche, ask side upar. Beech ka gap spread hai.',
        'A ladder-style order book visualisation. The left column shows progressively lower bid prices with quantities; the right column shows progressively higher ask prices with quantities. The gap between the best bid and best ask is labelled as the spread, and the mid price sits between them.',
      ),
      example(
        'Market order vs limit order ka cost',
        'Order book me best ask ₹100.10 par 900 shares, next ₹100.15 par 1,800 shares. Aapko 2,000 shares chahiye. Market order: 900 × 100.10 + 1,100 × 100.15 = ₹90,090 + ₹1,10,165 = ₹2,00,255. Average = ₹100.1275. Limit order @ ₹100.10: sirf 900 milenge, baaki pending rahega. Yehi trade-off hai — certainty of fill vs price.',
        [
          'Market order = fill guaranteed (mostly), price nahi.',
          'Limit order = price guaranteed, fill nahi.',
          'Bade size me ye difference material hota hai.',
        ],
      ),
      callout(
        'info',
        'Spread = liquidity ka price tag',
        'Ek liquid large cap ka spread 0.02% ho sakta hai; ek illiquid small cap ka 1%+ ho sakta hai. 100 round-trip trades par 1% spread = 100% capital drag (theoretically). Isliye high-frequency styles sirf liquid instruments me sensible hain.',
      ),
      h('Order book se kya infer kar sakte hain — aur kya nahi'),
      list([
        '**Kar sakte hain:** liquidity assess karna, likely slippage estimate karna, spread cost calculate karna.',
        '**Nahi kar sakte:** ye predict karna ki price kis direction me jaayega. Bade orders iceberg/hidden ho sakte hain aur book se gayab ho sakte hain.',
        '**Trap:** "bid side par bada quantity hai matlab support hai" — wo order cancel bhi ho sakta hai. Book snapshot hai, commitment nahi.',
      ]),
      callout(
        'warn',
        'Spoofing ka concept',
        'Koi participant bade orders dikha kar (jinko wo cancel karne ka plan rakhta hai) price ko manipulate kar sakta hai — ise spoofing kehte hain aur ye illegal hai. Isliye order book par over-reliance khatarnak hai. Regulators surveillance se isko pakadte hain.',
      ),
    ],
    summary: [
      'Bid = buyer ka best price, ask = seller ka best price, spread = difference.',
      'Spread aapka immediate trading cost hai, brokerage se pehle.',
      'Market order fill ki certainty deta hai, price ki nahi.',
      'Limit order price ki certainty deta hai, fill ki nahi.',
      'Order book liquidity batata hai, direction nahi.',
    ],
    mistakes: [
      'LTP ko current buyable price samajhna.',
      'Order book ke bade orders ko pakka support/resistance samajhna.',
      'Spread cost ko ignore karke scalping strategy banane.',
    ],
    keyPoints: [
      'Bid-ask spread = liquidity ka price tag.',
      'Market vs limit = certainty ka trade-off.',
      'Order book snapshot hai, commitment nahi.',
    ],
    quiz: [
      {
        q: 'Bid ₹248.50 aur ask ₹249.00 hai. Spread percentage (mid ke relative) kitna hai?',
        options: ['0.05%', '0.20%', '0.50%', '2.00%'],
        answer: 1,
        explain: 'Spread = 0.50. Mid = 248.75. 0.50 ÷ 248.75 × 100 ≈ 0.20%.',
      },
      {
        q: 'Market order ka main characteristic kya hai?',
        options: [
          'Price fix hoti hai, fill guarantee nahi',
          'Fill ki high probability, price guarantee nahi',
          'Order kabhi execute nahi hota',
          'Sirf limit price par execute hota hai',
        ],
        answer: 1,
        explain: 'Market order best available price par turant fill hota hai — price aapke control me nahi.',
      },
      {
        q: 'Order book me bade bid quantity ko "strong support" maan lena kyun galat hai?',
        options: [
          'Kyunki bid quantity kabhi dikhti nahi',
          'Kyunki wo order cancel ho sakta hai — book snapshot commitment nahi',
          'Kyunki support sirf charts par hota hai',
          'Kyunki exchange orders hide karta hai',
        ],
        answer: 1,
        explain: 'Displayed liquidity reversible hai. Isliye order book se direction infer karna unreliable hai.',
      },
    ],
    exercise:
      'Kisi liquid stock ka live order book 3 baar dekhein — 5 minute ke gap par. Har baar bid/ask aur top-3 quantity note karein. Likh kar batao: kitni liquidity stable rahi aur kitni disappear hui?',
  },

  'market-foundations/market-terminology/circuit-breakers-and-gaps': {
    objectives: [
      'Circuit breaker aur price band ka farq samajhna.',
      'Gap up aur gap down kaise bante hain.',
      'Limit moves ka practical impact — liquidity aur exit risk.',
    ],
    intro:
      'Market me extreme moves ko rokne ke liye kuch mechanical brakes hote hain. Inhe samajhna important hai kyunki ye aapke stop-loss ki effectiveness ko directly affect karte hain.',
    blocks: [
      h('Price band vs circuit breaker'),
      table(
        ['Mechanism', 'Kya hai', 'Level'],
        [
          ['Price band (stock-level)', 'Ek stock ke din ka max up/down move', 'Stock category ke hisaab se (e.g. 2%, 5%, 10%, 20%)'],
          ['Market-wide circuit breaker', 'Index-level move par poore market ka halt', 'India: 10%, 15%, 20% index moves par staged halts'],
          ['Trading halt (US)', 'Individual stock par news/volatility par pause', 'Volatility-based (LULD) ya news-based'],
          ['F&O price band', 'Derivative contract ka daily limit', 'Contract-specific'],
        ],
      ),
      callout(
        'warn',
        'Circuit ka sabse bada practical matlab',
        'Agar stock upper circuit par "locked" hai, aap kharid nahi sakte (koi bechna nahi chahta). Agar lower circuit par locked hai, aap **bech nahi sakte** — aapka stop-loss trigger ho sakta hai par execute nahi hoga. Isliye circuit-prone stocks me position size aur stop placement extra careful hona chahiye.',
      ),
      h('Gap up aur gap down'),
      p(
        'Gap tab hota hai jab price previous session ke close se door open hoti hai, aur beech me koi trade nahi hota. Ye overnight news, earnings, global moves ya macro events se hota hai.',
      ),
      table(
        ['Type', 'Definition', 'Common cause'],
        [
          ['Gap up', 'Open > previous high', 'Positive earnings, upgrade, good news'],
          ['Gap down', 'Open < previous low', 'Negative earnings, downgrade, global selloff'],
          ['Breakaway gap', 'Trend reversal ke start me', 'Structural news'],
          ['Runaway gap', 'Trend ke beech me', 'Momentum, FOMO'],
          ['Exhaustion gap', 'Trend ke end me', 'Climax buying/selling'],
        ],
      ),
      example(
        'Gap risk ka calculation',
        'Aapne ₹500 par share kharida, stop-loss ₹490 (2% risk). Raat me company ka result kharab aaya. Stock ₹460 par open hua — gap down 8%. Aapka stop ₹490 par trigger nahi hua kyunki market ne wahan trade hi nahi kiya; aapka actual exit ₹460 par hua. Realised loss = 8%, planned 2% se 4x zyada.',
        [
          'Stop-loss ek order hai, guarantee nahi.',
          'Gap moves overnight risk ka result hain.',
          'Earnings ke aas-paas position size chhota rakhein ya event se pehle exit karein.',
        ],
      ),
      callout(
        'info',
        'Position sizing ka gap-adjustment',
        'Agar aapko pata hai ki ek event me 10% gap possible hai, to apne risk per trade ko gap-adjusted sochein: risk% × capital ÷ (stop distance + possible gap) = safer size. Ye conservative hai par account survival ke liye zaroori.',
      ),
      h('Gap fill ka concept'),
      p(
        'Log kehte hain "gaps always fill hote hain" — ye empirically galat hai. Kuch gaps (especially breakaway gaps with news) never fill hote. Gap fill ek tendency hai kuch conditions me, rule nahi. Isko strategy ka base banane se pehle historical data me test karein (Trading Lab ka backtester isi kaam ke liye hai).',
      ),
      callout(
        'warn',
        'News trading ka trap',
        'Event ke news break hote hi order daalna — aap usually sabse kharab price par fill hote hain, kyunki liquidity temporarily disappear ho jaati hai aur algorithm pehle execute karte hain. "Aaj result achha aaya, abhi kharid leta hoon" ek systematic losing pattern hai.',
      ),
    ],
    summary: [
      'Price band stock-level limit hai; circuit breaker market-level halt.',
      'Circuit-locked stock me exit possible nahi — stop-loss kaam nahi karega.',
      'Gap tab hota hai jab price previous close se door open ho, beech me trade na ho.',
      'Gap risk planned stop se bada loss de sakta hai.',
      'Gap fill ek tendency hai, guarantee nahi.',
    ],
    mistakes: [
      'Ye maanna ki stop-loss hamesha planned loss par execute hoga.',
      'Circuit-prone stocks me bada overnight position rakhna.',
      'Gap fill ko trading rule samajhna.',
    ],
    keyPoints: [
      'Circuits liquidity ko mechanically block karte hain.',
      'Gap risk overnight risk hai — position sizing isko account me le.',
      'Stop-loss price control karta hai, execution guarantee nahi.',
    ],
    quiz: [
      {
        q: 'Aapne ₹500 par kharida, stop ₹490 tha. Stock ₹460 par gap down open hui. Aapka realised loss?',
        options: ['2%', '8%', '0%', 'Stop order cancel ho gaya'],
        answer: 1,
        explain: 'Stop ₹490 par trigger nahi hua kyunki price ne wahan trade nahi kiya. Actual fill ≈ ₹460, loss ≈ 8%.',
      },
      {
        q: 'Stock lower circuit par locked hai. Aap kya nahi kar sakte?',
        options: ['Kharid nahi sakte', 'Bech nahi sakte', 'Chart nahi dekh sakte', 'Order cancel nahi kar sakte'],
        answer: 1,
        explain: 'Lower circuit par koi buyer nahi hota. Aap sell order daal sakte hain par execute nahi hoga.',
      },
      {
        q: '"Gaps always fill hote hain" — ye statement…',
        options: [
          'Hamesha sach hai',
          'Galat hai; kuch gaps fill nahi hote',
          'Sirf US market me sach hai',
          'Sirf crypto me sach hai',
        ],
        answer: 1,
        explain: 'Gap fill ek observed tendency hai kuch conditions me. Breakaway gaps aksar never fill hote hain.',
      },
    ],
    exercise:
      'Kisi ek stock ke pichhle 20 earnings announcements ke baad ka gap note karein (public chart se). Count karein: kitne gaps ne 30 din me fill kiya aur kitne nahi? Apna data table banayein — yehi backtesting ka first step hai.',
  },

  /* ================================================================ */
  /* MODULE 4 — Trading Accounts and Orders                           */
  /* ================================================================ */
  'market-foundations/accounts-and-orders/demat-and-trading-accounts': {
    objectives: [
      'Demat aur trading account ke functions alag-alag samajhna.',
      'KYC aur margins ka basic concept.',
      'Ye samajhna ki Learnyx koi account recommend nahi karta.',
    ],
    intro:
      'Ye lesson purely conceptual hai. Hum ye samjhenge ki ek trading account structurally kya hota hai — kaunse parts hote hain, paisa kahan rehta hai, aur margins kaise kaam karte hain. **Hum koi account khulwane ki salah nahi de rahe aur kisi broker ko recommend nahi kar rahe.**',
    blocks: [
      h('Do accounts, do kaam'),
      table(
        ['Account', 'Kya rakhta hai', 'Function'],
        [
          ['Trading account', 'Funds, positions, orders', 'Order place karna, margin manage karna'],
          ['Demat account', 'Shares (electronic)', 'Ownership custody, corporate actions'],
          ['Bank account', 'Cash', 'Fund transfer in/out'],
        ],
      ),
      p(
        'Jab aap kharidte hain: paisa trading account se debit hota hai, shares T+1 par demat me credit hote hain. Jab bechte hain: shares demat se debit hote hain, paisa trading account me credit hota hai. Banks beech me payment gateway ka kaam karte hain.',
      ),
      h('KYC kya hota hai'),
      list([
        'Identity verification (PAN, Aadhaar in India; SSN in US).',
        'Address proof aur bank account verification.',
        'Risk profiling aur suitability declarations.',
        'In-person verification (IPV) ya digital KYC.',
        'Nomination — optional par recommended.',
      ]),
      callout(
        'info',
        'KYC ka purpose',
        'KYC money-laundering prevention aur investor identification ke liye hai. Ye regulated requirement hai. Learnyx Trading par koi KYC nahi hota kyunki yahan koi account, paisa ya trade nahi hota.',
      ),
      h('Margin ka concept'),
      p(
        'Margin ka matlab hai "collateral". Jab aap F&O ya intraday trade karte hain, broker aapse poora contract value nahi maangta — sirf ek percentage (margin). Ye leverage hai. Iska side effect: aapka loss aapke margin se bada ho sakta hai, aur broker **margin call** par position square-off kar sakta hai.',
      ),
      formula(
        'Leverage aur margin',
        'Leverage = Position value ÷ Margin required\nExample: ₹1,00,000 position par ₹20,000 margin → 5x leverage',
        '5x leverage par 1% adverse move aapke margin ka 5% kha jaata hai. 20% adverse move poora margin khatam kar deta hai.',
      ),
      callout(
        'danger',
        'Leverage ka honest picture',
        'Leverage return ko fast nahi karta — wo **volatility ko multiply** karta hai. Positive expectation wali strategy leverage ke saath zyada jaldi grow karti hai, par negative or random strategy leverage ke saath zyada jaldi khatam hoti hai. Beginner ke liye leverage ka use sabse common account-killer hai.',
      ),
      h('Types of accounts (conceptual)'),
      terms([
        { term: 'Cash / delivery account', meaning: 'Sirf jitna paisa hai utna kharid sakte hain. Sabse simple.' },
        { term: 'Margin account (intraday)', meaning: 'Broker intraday leverage deta hai. Same day square-off mandatory hota hai.' },
        { term: 'F&O account', meaning: 'Derivatives trading enable karta hai — margin aur eligibility rules ke saath.' },
        { term: 'PMS / advisory', meaning: 'Professional manager aapka portfolio manage karta hai (fees ke saath).' },
        { term: 'NRI / corporate accounts', meaning: 'Alag KYC aur compliance requirements.' },
      ]),
      callout(
        'warn',
        'Learnyx Trading ka clear stance',
        'Ye platform kisi bhi broker, account type, ya product ka recommendation nahi deta. Yahan diya gaya content sirf educational hai. Koi bhi financial decision lene se pehle apni situation ke hisaab se SEBI-registered investment adviser se salah lein. Learnyx Trading kisi bhi brokerage se affiliated nahi hai.',
      ),
    ],
    summary: [
      'Trading account orders aur funds manage karta hai; demat account shares custody karta hai.',
      'KYC regulated identity verification process hai.',
      'Margin collateral hai; leverage position value ko margin se divide karke nikalta hai.',
      'Leverage volatility ko multiply karta hai — beginner ke liye highest-risk feature.',
      'Learnyx Trading koi broker ya account recommend nahi karta.',
    ],
    mistakes: [
      'Trading account aur demat account ko ek samajhna.',
      'Leverage ko "zyada paisa" samajhna.',
      'Margin call ko broker ki galti samajhna — wo risk management rule hai.',
    ],
    keyPoints: [
      'Two accounts, two functions, one ecosystem.',
      'Leverage = volatility multiplier, not a return booster.',
      'Ye platform advisory nahi hai — sirf education.',
    ],
    quiz: [
      {
        q: 'Leverage ka formula kya hai?',
        options: [
          'Margin ÷ Position value',
          'Position value ÷ Margin required',
          'Position value × Margin',
          'Margin × 100',
        ],
        answer: 1,
        explain: 'Leverage = position value ÷ margin. ₹1,00,000 position par ₹20,000 margin = 5x.',
      },
      {
        q: '5x leverage par 4% adverse move aapke margin ka kitna hissa kha jaayega?',
        options: ['4%', '20%', '40%', '80%'],
        answer: 1,
        explain: '4% × 5 = 20% of margin. Leverage loss ko bhi multiply karta hai.',
      },
      {
        q: 'Learnyx Trading ka account ke baare me stance kya hai?',
        options: [
          'Broker recommend karta hai',
          'Koi account, broker ya product recommend nahi karta — sirf education',
          'Discounted brokerage deta hai',
          'Account khulwata hai',
        ],
        answer: 1,
        explain: 'Learnyx Trading purely educational hai — koi brokerage relationship ya referral nahi.',
      },
    ],
    exercise:
      'Ek hypothetical scenario likhein: ₹50,000 capital, 20x intraday leverage available. Calculate karein ki 2% adverse move par aapka loss kitna hoga agar aap poora margin use karein. Phir likhein ki aapka safe leverage kya hoga agar aap max 1% capital loss per trade chahte hain.',
  },

  'market-foundations/accounts-and-orders/market-and-limit-orders': {
    objectives: [
      'Market, limit aur unke variants ko clearly samajhna.',
      'Fill certainty vs price certainty ka trade-off.',
      'Order types ko practical scenario me choose karna.',
    ],
    intro:
      'Order type aapka main control hai. Ek hi view ho par order type galat ho to outcome bilkul alag ho sakta hai. Is lesson me hum har major order type ko practical scenarios me dekhenge.',
    blocks: [
      h('Market order'),
      p(
        'Market order "abhi, best available price par" execute hota hai. Fill ki high probability, price ki koi guarantee nahi. Liquid stocks me slippage negligible hota hai; illiquid stocks me significant.',
      ),
      table(
        ['Pros', 'Cons'],
        [
          ['Fast execution', 'Price uncertain'],
          ['High fill probability', 'Slippage in thin books'],
          ['Simple — koi price decide nahi karna', 'Large size me average price kharab'],
        ],
      ),
      h('Limit order'),
      p(
        'Limit order ek maximum (buy) ya minimum (sell) price set karta hai. Aap us price ya better par execute honge, warna order pending rahega. Aapko fill ki guarantee nahi.',
      ),
      example(
        'Limit order ka realistic behaviour',
        'Aap buy limit @ ₹250 lagate hain. Market ₹251 par trade kar raha hai. Aapka order pending hai. Price ₹250 tak girta hai, par sirf 200 shares available the — aapko 200 milte hain, baaki pending. Price wapas upar chala jaata hai — aapka baaki order abhi bhi pending hai.',
        [
          'Limit order = price control, fill uncertainty.',
          'Partial fill normal hai.',
          'Pending order ko cancel karna aapki responsibility hai.',
        ],
      ),
      h('Market-Limit (Marketable Limit)'),
      p(
        'Ye hybrid hai: limit price lagate hain par limit ko spread ke doosri side par set karte hain, taaki turant fill ho. Example: ask ₹100.10 hai, aap buy limit @ ₹100.20 lagate hain. Ye turant fill hoga, par ₹100.20 se zyada kabhi nahi dega. Ye slippage protection ka simple tarika hai.',
      ),
      h('Comparison'),
      table(
        ['Order', 'Price control', 'Fill certainty', 'Best for'],
        [
          ['Market', 'None', 'High', 'Liquid instruments, urgent exit'],
          ['Limit', 'Full', 'Low', 'Illiquid stocks, patient entry'],
          ['Market-limit', 'Partial (capped)', 'High', 'Balanced — slippage control'],
          ['Stop (SL-M)', 'None once triggered', 'High', 'Risk exit'],
          ['Stop-limit (SL)', 'Full', 'Low', 'Risk exit with price cap'],
        ],
      ),
      callout(
        'warn',
        'Stop-limit ka chhupa risk',
        'Stop-limit order me stop trigger hone ke baad limit lagti hai. Agar price gap se limit ke neeche chala gaya, to order **pending** rahega — aapka stop protect nahi karega. Isliye critical risk exits ke liye stop-market (SL-M) zyada reliable hai, chahe slippage ho.',
      ),
      h('Advanced order attributes'),
      terms([
        { term: 'IOC (Immediate or Cancel)', meaning: 'Jo turant fill ho jaaye wo ho, baaki cancel.' },
        { term: 'FOK (Fill or Kill)', meaning: 'Poora fill ho ya poora cancel.' },
        { term: 'GTC (Good Till Cancelled)', meaning: 'Cancel karne tak valid (exchange limits ke saath).' },
        { term: 'Day order', meaning: 'Din ke end par automatically cancel.' },
        { term: 'Iceberg order', meaning: 'Bada order chhote visible chunks me — market impact kam karne ke liye.' },
      ]),
      callout(
        'info',
        'GTT ka concept',
        'GTT (Good Till Triggered) ek broker-side feature hai jahan trigger price aur order dono set hote hain, aur trigger hote hi order place hota hai. Ye long-term targets/stops ke liye useful hai jab aap screen par nahi hain. Exact behaviour broker par depend karta hai — unke documentation se verify karein.',
      ),
    ],
    summary: [
      'Market order fill certainty deta hai, price certainty nahi.',
      'Limit order price certainty deta hai, fill certainty nahi.',
      'Market-limit order slippage ko cap karta hai.',
      'Stop-limit gap-down me fail ho sakta hai — stop-market zyada reliable hai.',
      'Partial fills normal hain aur pending orders manage karne padte hain.',
    ],
    mistakes: [
      'Illiquid stock me market order lagana.',
      'Stop-limit ko "safe stop" samajhna.',
      'Pending limit orders ko bhool jaana.',
    ],
    keyPoints: [
      'Order type = your primary execution control.',
      'Risk exit ke liye reliability > price precision.',
      'Marketable limit ek underrated practical tool hai.',
    ],
    quiz: [
      {
        q: 'Aapko exit karna hai aur price gap se neeche chala gaya. Kaunsa order sabse zyada reliable hai?',
        options: ['Stop-limit @ stop price', 'Stop-market (SL-M)', 'Limit order', 'Day order'],
        answer: 1,
        explain: 'Stop-market guarantee karta hai ki trigger hone par order execute hoga (slippage ke saath). Stop-limit gap me pending reh jaata hai.',
      },
      {
        q: 'Market-limit order ka main purpose kya hai?',
        options: [
          'Fill ko rokna',
          'Turant fill ke saath slippage ko ek cap tak limit karna',
          'Brokerage kam karna',
          'Price prediction karna',
        ],
        answer: 1,
        explain: 'Ye spread ke doosri side par limit set karta hai — turant fill hota hai par worst price capped hoti hai.',
      },
      {
        q: 'Limit order me fill ki certainty kaisi hoti hai?',
        options: ['Guaranteed', 'Low — price touch kare tabhi, aur partial ho sakta hai', 'Always partial', 'Zero hamesha'],
        answer: 1,
        explain: 'Limit order price control deta hai par fill ki koi guarantee nahi — aur partial fills common hain.',
      },
    ],
    exercise:
      'Ek hypothetical stock ka order book banayein (bid ₹99.90 × 500, ask ₹100.10 × 300; next ask ₹100.20 × 1,000). Ab calculate karein: (a) 500 shares market buy ka average price, (b) 1,000 shares market buy ka average, (c) ₹100.10 par limit buy se kitne milenge.',
  },

  'market-foundations/accounts-and-orders/stop-orders-and-gtt': {
    objectives: [
      'Stop-loss order ka mechanism samajhna.',
      'Stop-limit vs stop-market ka trade-off.',
      'GTT aur trailing stop ka concept.',
    ],
    intro:
      'Stop-loss risk management ka backbone hai — par ye ek "magic safety net" nahi hai. Is lesson me hum stop orders ki exact mechanics, unki failure modes, aur unke sahi use ko dekhenge.',
    blocks: [
      h('Stop order kaise kaam karta hai'),
      olist([
        'Aap ek **stop price** define karte hain.',
        'Jab market price stop price ko touch/kross karta hai, order **trigger** hota hai.',
        'Trigger ke baad order market order ya limit order ban jaata hai — jo aapne choose kiya.',
      ]),
      p(
        'Important: stop price trigger hone ka matlab fill hona nahi hai. Trigger ke baad order normal order ban jaata hai. Isliye gap ya thin liquidity me fill price stop price se door ho sakti hai.',
      ),
      table(
        ['Order', 'Trigger ke baad', 'Price certainty', 'Fill certainty', 'Risk'],
        [
          ['SL-M (Stop Market)', 'Market order', 'None', 'High', 'Slippage'],
          ['SL (Stop Limit)', 'Limit order', 'Yes (limit)', 'Low', 'Gap me pending reh sakta hai'],
          ['Trailing stop', 'Dynamic stop price', 'Depends', 'Depends', 'Volatility me premature exit'],
          ['GTT', 'Broker places order', 'Depends', 'Depends', 'Broker-specific behaviour'],
        ],
      ),
      example(
        'Stop-loss ka sahi placement',
        'Aap ₹500 par entry le rahe hain. Aapka technical invalidation ₹480 par hai (support break). Aap stop ₹480 par rakhte hain. Risk = ₹20 per share = 4%. Agar aap ₹1,00,000 capital par 1% risk chahte hain (₹1,000), position size = 1,000 ÷ 20 = 50 shares. Position value = ₹25,000. Yehi correct order hai: **pehle stop, phir size**.',
        [
          'Step 1: Chart se invalidation level identify karein (where your idea is wrong).',
          'Step 2: Stop us level ke thoda beyond rakhein (noise ke liye buffer).',
          'Step 3: Risk per share = entry − stop.',
          'Step 4: Position size = (capital × risk%) ÷ risk per share.',
          'Step 5: Verify position value aapke exposure limits me hai.',
        ],
      ),
      h('Trailing stop'),
      p(
        'Trailing stop price ke saath move karta hai (favourable direction me), par ulta nahi aata. Agar aap 3% trailing stop set karein aur price 10% upar chala jaaye, to stop 7% upar shift ho jaayega. Ye profits protect karta hai, par volatile instruments me premature exits bhi de sakta hai.',
      ),
      formula(
        'Trailing stop (long position)',
        'Stop price = Highest price since entry × (1 − trailing %)',
        'Entry ₹500, trailing 5%, price ₹560 tak gaya → stop = 560 × 0.95 = ₹532. Price gir kar ₹532 par aane par exit.',
      ),
      callout(
        'warn',
        'Stop-loss ka 4 failure mode',
        '1) **Gap** — price stop se door open hoti hai. 2) **Slippage** — thin book me fill kharab hoti hai. 3) **Circuit** — stock locked, order execute nahi hota. 4) **Emotional override** — aap stop manually hata dete hain. Chautha sabse common hai aur sabse mehanga.',
      ),
      h('GTT ka concept'),
      p(
        'GTT (Good Till Triggered) ek broker-level feature hai jahan aap trigger price + order details set kar sakte hain, aur wo kai din tak valid rehta hai (exchange ke GTC limits ke andar). Ye tab useful hai jab aap daily screen par nahi hote. **Exact rules broker se broker badalte hain** — apne broker ke official docs padhein, kisi YouTube video par bharosa na karein.',
      ),
      callout(
        'tip',
        'Paper trading me stop practice karein',
        'Learnyx Trading Lab ke Paper Trading Simulator me stop-loss ke saath entries lein. Realistic slippage aur gap ka asar dekhein — bina paisa khoye. Ye habit build karne ka sabse sasta tarika hai.',
      ),
    ],
    summary: [
      'Stop order trigger hone ke baad normal order ban jaata hai — fill guarantee nahi.',
      'Stop-market fill reliability deta hai, stop-limit price certainty.',
      'Position sizing stop distance se derive hoti hai, ulta nahi.',
      'Trailing stop profit protect karta hai par premature exit de sakta hai.',
      'Stop-loss ke failure modes: gap, slippage, circuit aur emotional override.',
    ],
    mistakes: [
      'Stop ko entry price ke hisaab se set karna, structure ke hisaab se nahi.',
      'Stop-limit ko gap protection samajhna.',
      'Stop hit hone ke baad stop ko neeche shift karna ("it will come back").',
    ],
    keyPoints: [
      'Stop = invalidation point, not an arbitrary percentage.',
      'Size derives from risk, not from conviction.',
      'No stop can protect against overnight gaps.',
    ],
    quiz: [
      {
        q: 'Entry ₹500, stop ₹480, capital ₹1,00,000, risk 1%. Sahi position size kya hai?',
        options: ['200 shares', '50 shares', '1,000 shares', '100 shares'],
        answer: 1,
        explain: 'Risk per share = ₹20. Risk amount = ₹1,000. 1,000 ÷ 20 = 50 shares.',
      },
      {
        q: 'Stop-order trigger hone ka matlab kya hai?',
        options: [
          'Order execute ho gaya',
          'Order active ho gaya (market ya limit order ban gaya)',
          'Order cancel ho gaya',
          'Broker ne position close kar di',
        ],
        answer: 1,
        explain: 'Trigger sirf order ko active karta hai. Execution price market par depend karta hai.',
      },
      {
        q: 'Trailing stop 5% hai, entry ₹500, price ₹560 tak gaya. Ab stop kahan hai?',
        options: ['₹475', '₹532', '₹500', '₹588'],
        answer: 1,
        explain: '560 × 0.95 = ₹532. Trailing stop sirf favourable direction me move karta hai.',
      },
    ],
    exercise:
      'Apni ek hypothetical trade design karein: entry, invalidation level (chart se), stop, position size, aur maximum acceptable gap. Phir likhein ki agar kal raat 6% gap down aaye to aapka actual loss kya hoga aur kya wo aapke account ke liye survivable hai.',
  },

  'market-foundations/accounts-and-orders/execution-slippage-and-sessions': {
    objectives: [
      'Execution mechanics: routing, partial fill, slippage.',
      'Trading sessions aur unke liquidity characteristics.',
      'Order placement timing ka impact.',
    ],
    intro:
      'Aapka strategy ka paper profit aur actual result ke beech ka gap mostly execution me hota hai. Is lesson me hum wo saari chhoti chhoti cheezein dekhenge jo collectively bada difference banati hain.',
    blocks: [
      h('Order ka safar'),
      olist([
        'Aap phone/app se order daalte hain → broker ke servers.',
        'Broker risk checks karta hai (margin, limits, KYC).',
        'Order exchange ke matching engine tak jaata hai.',
        'Best available price par match hota hai (ya pending rehta hai).',
        'Fill confirm hoti hai → contract note → settlement.',
      ]),
      p(
        'Is pipeline me har step par microseconds se milliseconds lagte hain. Retail ke liye ye timing usually matter nahi karti — par **event-driven moments** me matter karti hai, jab price fast move kar rahi hoti hai.',
      ),
      h('Slippage'),
      formula(
        'Slippage',
        'Slippage = Actual fill price − Expected price\nSlippage % = Slippage ÷ Expected price × 100',
        'Aap ₹100 par kharidne ki soch rahe the, fill ₹100.35 par hua → slippage ₹0.35 = 0.35%.',
      ),
      p(
        'Slippage ke 3 sources: (1) **spread** — aap ask par kharidte hain, bid par bechte hain; (2) **depth** — aapka size ek level se zyada hai; (3) **latency** — price aapke order ke pahunchne se pehle badal gaya.',
      ),
      h('Partial fill'),
      p(
        'Agar aapne 1,000 shares ka order diya aur 600 fill hue, baaki pending hai — ye partial fill hai. Aapke paas do options: pending rehne dein, ya cancel karein. Problem: aapko pata nahi ki 600 shares par aapka risk kitna hai. Isliye position tracking manually/discipline se karein.',
      ),
      callout(
        'warn',
        'Partial fill ka risk-management problem',
        'Agar 1% risk ke liye 1,000 shares plan kiye the aur sirf 600 fill hue, to aapka actual risk 0.6% hai — theek hai. Par agar aap stop ko same price par rakhte hain aur baaki 400 shares baad me fill hote hain jab price aapke against hai, to average entry kharab ho jaata hai. Solution: partial fill ko naya trade maanein aur recalculate karein.',
      ),
      h('Trading sessions (India)'),
      table(
        ['Session', 'Time (IST)', 'Characteristics'],
        [
          ['Pre-open', '9:00 – 9:15', 'Order collection, indicative price discovery'],
          ['Normal session', '9:15 – 15:30', 'Continuous trading'],
          ['Closing session', '15:40 – 16:00', 'Closing price determination (derivatives relevant)'],
          ['Post-close', '15:40 onward', 'Limited — specific product rules'],
        ],
      ),
      h('US sessions (ET)'),
      table(
        ['Session', 'Time (ET)', 'Note'],
        [
          ['Pre-market', '4:00 – 9:30', 'Thin liquidity, wide spreads'],
          ['Regular session', '9:30 – 16:00', 'Main liquidity'],
          ['After-hours', '16:00 – 20:00', 'Thin liquidity, earnings reactions'],
          ['Volatility window', '9:30 – 10:00 & 15:30 – 16:00', 'Highest intraday volatility'],
        ],
      ),
      h('Timing ka asar'),
      list([
        '**Open (first 15–30 min)** — highest volatility aur widest spreads. Beginners ke liye sabse risky time.',
        '**Mid-day** — usually kam volatility, tighter ranges, but thinner liquidity in some stocks.',
        '**Close (last 15–30 min)** — institutional rebalancing, volume spike, choppy moves.',
        '**News/event times** — liquidity temporarily disappears; slippage worst.',
      ]),
      example(
        'Slippage ka compounding effect',
        'Ek strategy 200 trades per year karti hai. Average slippage 0.15% per side (entry + exit = 0.30%). Total annual slippage drag = 200 × 0.30% = 60% of position value traded. Agar average position size aapke capital ka 50% hai, drag ≈ 30% of capital per year. Yehi wajah hai ki backtest aur reality me bada gap aata hai.',
        [
          'Slippage per side = 0.15%.',
          'Round trip = 0.30%.',
          '200 trades × 0.30% = 60% of traded value.',
          'Traded value = 50% of capital → 30% capital drag per year.',
        ],
      ),
      callout(
        'info',
        'Backtest me slippage zaroor daalein',
        'Learnyx ka Backtesting Simulator default me slippage aur fees leta hai — kyunki slippage-free backtest ek fiction hai. Always realistic assumptions use karein, phir bhi result ko future guarantee na samjhein.',
      ),
    ],
    summary: [
      'Execution pipeline: broker → exchange → matching → fill → settlement.',
      'Slippage ke 3 sources: spread, depth aur latency.',
      'Partial fills position tracking ko complicated banate hain.',
      'Session timing liquidity aur volatility ko badly change karti hai.',
      'Slippage compounding effect strategy ka real return kaafi kam kar deta hai.',
    ],
    mistakes: [
      'Backtest me slippage zero rakhna.',
      'Market open ke first 2 minutes me bade orders lagana.',
      'Partial fill ko ignore karke stop same jagah rakhna.',
    ],
    keyPoints: [
      'Execution reality = spread + depth + latency.',
      'High turnover strategies ko slippage sabse zyada hurt karta hai.',
      'Liquidity conditions time-of-day par depend karti hain.',
    ],
    quiz: [
      {
        q: 'Slippage ke teen primary sources kaunse hain?',
        options: [
          'Brokerage, tax, GST',
          'Spread, depth, latency',
          'Bull, bear, sideways',
          'Open, high, low',
        ],
        answer: 1,
        explain: 'Spread cost, insufficient depth (size se bada order) aur latency se price change — ye teen slippage ke sources hain.',
      },
      {
        q: 'Beginner ke liye sabse risky trading time kaunsa hai?',
        options: [
          'Market ka first 15–30 minutes',
          'Lunch time',
          'Closing 5 minutes ke baad',
          'Weekend',
        ],
        answer: 0,
        explain: 'Open par highest volatility aur widest spreads hote hain — beginner ke liye worst combination.',
      },
      {
        q: '200 trades per year, 0.30% round-trip slippage. Total slippage drag traded value par kitna hoga?',
        options: ['0.30%', '30%', '60%', '6%'],
        answer: 2,
        explain: '200 × 0.30% = 60% of traded value. Isliye high turnover strategies me execution quality critical hai.',
      },
    ],
    exercise:
      'Apni hypothetical strategy ke liye ek realistic cost model banayein: brokerage, taxes, spread aur slippage. Phir calculate karein ki gross profit kitna chahiye sirf breakeven ke liye. Ye number aapko batayega ki strategy realistically viable hai ya nahi.',
  },

  /* ================================================================ */
  /* MODULE 5 — Understanding Financial Markets                       */
  /* ================================================================ */
  'market-foundations/understanding-markets/equity-and-bond-markets': {
    objectives: [
      'Equity aur bond markets ke basic mechanics.',
      'Yield aur bond price ka inverse relationship.',
      'Equity-bond relationship aur risk profile ka farq.',
    ],
    intro:
      'Equity aur bonds capital market ke do bade pillars hain. Equity ownership hai, bond udhaar hai. Is lesson me hum dekhenge ki dono kaise kaam karte hain, aur kyun bond market ko "smart money ka indicator" kaha jaata hai.',
    blocks: [
      h('Equity market recap'),
      list([
        'Ownership claim on residual profits.',
        'Upside unlimited (theoretically), downside 100% tak.',
        'Dividends optional hote hain.',
        'Price earnings expectations aur growth par depend karti hai.',
      ]),
      h('Bond market'),
      p(
        'Bond ek loan ka tradeable form hai. Aap issuer ko paisa dete hain, wo fixed interest (coupon) deta hai aur maturity par principal wapas karta hai. Issuers: government (G-Sec, Treasuries), companies (corporate bonds), municipalities, supranationals.',
      ),
      terms([
        { term: 'Face value / par value', meaning: 'Bond ka original amount, jaise ₹1,000. Maturity par yehi milta hai.' },
        { term: 'Coupon', meaning: 'Periodic interest payment, face value ka %.' },
        { term: 'Maturity', meaning: 'Jab principal wapas milta hai.' },
        { term: 'Yield', meaning: 'Bond ki current market price ke relative effective return.' },
        { term: 'Credit rating', meaning: 'Issuer ki default probability ka assessment (AAA, AA, BBB, etc.).' },
        { term: 'Duration', meaning: 'Interest rate ke prati bond ki price sensitivity.' },
      ]),
      formula(
        'Bond price aur yield ka inverse relation',
        'Current Yield = Annual coupon ÷ Current market price × 100',
        'Bond: face value ₹1,000, coupon 7% (₹70/year). Agar market price ₹950 ho jaaye → yield = 70 ÷ 950 = 7.37%. Price gira to yield bada. Price bada to yield chhota.',
      ),
      callout(
        'info',
        'Yield kyun important hai',
        'Yield pura market ka "risk-free rate" set karta hai. Agar government bond 7% de raha hai, to koi equity me invest kyun karega jab tak wo 7% se zyada expected return na de? Isliye bond yields badhne par equity valuations dab sakti hain — especially growth stocks jinki earnings door future me hain.',
      ),
      diagram(
        'market-cycle',
        'Interest rate ka asset prices par transmission',
        'Rates up → discount rate up → valuations down (generally). Ye relationship context-dependent hai.',
        'A flow diagram showing central bank policy rate changes feeding into government bond yields, which feed into corporate borrowing costs and equity discount rates, which in turn affect equity valuations. Each arrow is labelled with typical direction, with a note that the relationship is not mechanical.',
      ),
      h('Equity vs bond'),
      table(
        ['', 'Equity', 'Bond'],
        [
          ['Claim', 'Residual (last)', 'Contractual (first)'],
          ['Return', 'Growth + dividends', 'Fixed coupon'],
          ['Volatility', 'Higher', 'Lower (credit risk ke hisaab se)'],
          ['Inflation impact', 'Often positive (pricing power)', 'Negative (fixed coupon)'],
          ['Rate sensitivity', 'Indirect (discount rate)', 'Direct (inverse price-yield)'],
          ['Bankruptcy recovery', 'Often zero', 'Partial to full'],
        ],
      ),
      h('Bond market ka signal value'),
      p(
        'Bond market largely institutional hai aur participants usually sophisticated hote hain. Yield curve (short vs long maturity yields) recession expectations ka ek historical indicator hai — **inverted yield curve** (short yields > long yields) ne US me kai recessions se pehle dikha hai, par timing aur reliability imperfect hai. Isliye isse ek context signal samjhein, trade signal nahi.',
      ),
      callout(
        'warn',
        'Credit risk ko ignore na karein',
        'High yield (junk) bonds zyada interest dete hain kyunki default risk zyada hota hai. "12% yield mil raha hai" dekh kar invest karna bina credit analysis kiye risky hai. Yield premium hi risk ka price hai.',
      ),
    ],
    summary: [
      'Equity = ownership, residual claim; bond = loan, contractual claim.',
      'Bond price aur yield inverse relationship rakhte hain.',
      'Bond yields market ka risk-free benchmark set karte hain.',
      'Yield curve economic expectations ka imperfect indicator hai.',
      'High yield high credit risk ka price hai, free lunch nahi.',
    ],
    mistakes: [
      'Bond ko "risk-free" samajhna — sirf government short-term hi near-risk-free hai.',
      'High yield ko better investment samajhna.',
      'Bond price aur yield ko same cheez samajhna.',
    ],
    keyPoints: [
      'Rates sab asset classes ko affect karte hain.',
      'Coupon ≠ yield jab price face value se different ho.',
      'Bond market institutional sophistication ka signal deta hai.',
    ],
    quiz: [
      {
        q: 'Bond ka price gir jaaye to yield ka kya hota hai?',
        options: ['Gir jaata hai', 'Badh jaata hai', 'Same rehta hai', 'Zero ho jaata hai'],
        answer: 1,
        explain: 'Coupon fixed hai. Price kam → same coupon par zyada return → yield badhta hai.',
      },
      {
        q: 'Inverted yield curve kya indicate karta hai (historically)?',
        options: [
          'Guaranteed recession',
          'Short-term yields long-term se zyada — recession expectations ka historical signal',
          'Inflation zero',
          'Equity market zero return',
        ],
        answer: 1,
        explain: 'Inversion historically recession se pehle dikha hai, par timing aur reliability imperfect hai.',
      },
      {
        q: 'High-yield (junk) bond zyada interest kyun deta hai?',
        options: [
          'Kyunki wo government issued hota hai',
          'Kyunki default risk zyada hota hai — yield us risk ka price hai',
          'Kyunki uska maturity short hota hai',
          'Kyunki wo tax-free hota hai',
        ],
        answer: 1,
        explain: 'Credit spread issuer ke default risk ka compensation hai.',
      },
    ],
    exercise:
      'Ek 10-year government bond yield aur ek equity index ka P/E ratio dekhein (same country). 10 saal ka historical chart me dekhein ki jab yields badhe, P/E par kya asar hua. Likh kar batao: relationship clear tha ya noisy?',
  },

  'market-foundations/understanding-markets/forex-commodity-and-crypto': {
    objectives: [
      'Forex market structure, pairs aur quotes samajhna.',
      'Commodity markets aur unke drivers.',
      'Crypto markets ki unique risks aur limitations.',
    ],
    intro:
      'Equity ke alawa bhi bade markets hain — aur har ek ke rules, participants aur risks alag hain. Is lesson me hum teen major markets ka honest overview denge, including unke risks.',
    blocks: [
      h('Forex market'),
      p(
        'Forex duniya ka sabse bada market hai (daily turnover trillions of dollars). Ye decentralized OTC market hai — koi single exchange nahi. Participants: banks, corporates (hedging), central banks, hedge funds, retail (brokers ke through).',
      ),
      terms([
        { term: 'Currency pair', meaning: 'Do currencies ka quote, jaise USD/INR.' },
        { term: 'Base currency', meaning: 'Pehli currency (USD/INR me USD) — 1 unit.' },
        { term: 'Quote currency', meaning: 'Doosri currency (USD/INR me INR) — kitna lagega 1 base ke liye.' },
        { term: 'Pip', meaning: 'Price interest point — usually 4th decimal (0.0001). JPY pairs me 2nd decimal.' },
        { term: 'Lot', meaning: 'Standardised trade size: standard (100,000), mini (10,000), micro (1,000).' },
        { term: 'Leverage', meaning: 'Forex me commonly high (e.g. 1:30 in regulated jurisdictions, zyada offshore).' },
      ]),
      example(
        'USD/INR quote',
        'USD/INR = 83.2500 ka matlab 1 USD = ₹83.25. Agar ye 83.5000 ho jaaye, rupee weak hua (zyada rupees chahiye 1 dollar ke liye). 1 standard lot (100,000 USD) par 0.25 move = 25,000 rupees ka P&L change — isliye position sizing critical hai.',
        [
          'Quote ka pehla number base hai.',
          'USD/INR upar = rupee kamzor.',
          'Pip value position size se multiply hoti hai.',
        ],
      ),
      callout(
        'danger',
        'Forex ka retail reality check',
        'Regulated jurisdictions me retail forex leverage capped hai kyunki high leverage retail traders ke liye destructive hai. India me retail forex trading RBI/FEMA rules ke under restricted hai — sirf recognised exchanges par permitted currency pairs. **Kisi bhi offshore forex broker ka use legal aur financial risk dono le sakta hai.** Apne jurisdiction ke rules verify karein.',
      ),
      h('Commodity markets'),
      p(
        'Commodities physical goods hain: metals (gold, silver, copper), energy (crude oil, natural gas), agriculture (wheat, soybeans, cotton). Trading mostly futures contracts ke through hoti hai, jahan price spot ke alawa storage, financing aur delivery terms bhi matter karte hain.',
      ),
      table(
        ['Commodity', 'Key drivers', 'Note'],
        [
          ['Gold', 'Real interest rates, USD, safe-haven demand, central bank buying', 'Yield nahi deta — opportunity cost important'],
          ['Silver', 'Industrial demand + precious metal demand', 'Gold se zyada volatile'],
          ['Crude oil', 'OPEC+ supply, geopolitics, inventory data, demand cycle', 'Contango/backwardation important'],
          ['Natural gas', 'Weather, storage, LNG flows', 'Extremely seasonal aur volatile'],
          ['Agriculture', 'Weather, crop reports, export policy', 'Seasonal, thin liquidity in some contracts'],
        ],
      ),
      callout(
        'warn',
        'Futures ka rollover trap',
        'Commodity futures expire hote hain. Agar aap long-term exposure chahte hain, aapko contracts roll karne padte hain. Contango market me rollover cost return kha sakta hai — isliye commodity ETF ka return spot price se materially different ho sakta hai.',
      ),
      h('Cryptocurrency market'),
      p(
        'Crypto assets blockchain par chalte hain — decentralized ledger jahan transactions cryptographically verify hoti hain. Bitcoin pehla aur sabse bada hai; Ethereum smart contracts ke liye platform hai.',
      ),
      terms([
        { term: 'Blockchain', meaning: 'Distributed ledger jisme blocks cryptographically linked hote hain.' },
        { term: 'Wallet', meaning: 'Private keys ka custodian — self-custody ya exchange custody.' },
        { term: 'Stablecoin', meaning: 'Fiat currency se pegged token (USDT, USDC). Peg ka stability issuer par depend karta hai.' },
        { term: 'Exchange (CEX)', meaning: 'Centralised platform jahan custody exchange ke paas hoti hai — counterparty risk.' },
        { term: 'DeFi', meaning: 'Smart contracts based financial protocols — code risk aur exploit risk.' },
      ]),
      callout(
        'danger',
        'Crypto ke specific risks — honestly',
        '1) **Regulatory uncertainty** — India me taxation aur legal treatment evolving hai. 2) **Custody risk** — exchange hack ya insolvency par funds ja sakte hain. 3) **Extreme volatility** — 30–50% drawdowns normal hain. 4) **Scam risk** — guaranteed-return schemes, ponzi tokens. 5) **Legal restrictions** — kai jurisdictions me restricted ya banned. 6) **No intrinsic cash flow** — valuation purely demand-based. Ye risks real hain aur is platform ka content koi investment recommendation nahi hai.',
      ),
      h('Cross-market relationships'),
      list([
        'USD strong → commodities (usually) pressured, emerging market currencies weak.',
        'Risk-off sentiment → equities down, bonds up, gold up (usually).',
        'Yields up → growth stocks pressured, banks often benefit.',
        'Crypto often correlates with risk assets short-term, par correlation unstable hai.',
        'Yeh relationships **tendencies** hain, mechanical laws nahi — regime ke saath badalti hain.',
      ]),
    ],
    summary: [
      'Forex decentralized OTC market hai; pairs base/quote structure follow karte hain.',
      'Forex me high leverage aur jurisdiction-specific legal restrictions hain.',
      'Commodities futures ke through trade hote hain; rollover cost material ho sakta hai.',
      'Crypto me custody, volatility, regulatory aur scam risks significant hain.',
      'Cross-market correlations unstable tendencies hain, rules nahi.',
    ],
    mistakes: [
      'Cross-market correlation ko fixed rule samajhna.',
      'Forex ko "easy" samajhna kyunki 24/5 open hai.',
      'Commodity futures ka rollover cost ignore karna.',
      'Crypto me "guaranteed returns" wale schemes par bharosa karna.',
    ],
    keyPoints: [
      'Har market ke structural risks alag hain.',
      'Leverage aur custody risk sabse common account-killers hain.',
      'Legal restrictions jurisdiction-specific hain — verify karein.',
    ],
    quiz: [
      {
        q: 'USD/INR 83.25 se 83.50 ho gaya. Rupee ka kya hua?',
        options: ['Strong hua', 'Weak hua — zyada rupees chahiye 1 dollar ke liye', 'Unchanged', 'Zero ho gaya'],
        answer: 1,
        explain: 'Quote badha matlab base currency (USD) mehangi hui, isliye INR weak hua.',
      },
      {
        q: 'Commodity futures me rollover cost kab negative hota hai (long position ke liye)?',
        options: [
          'Contango market me',
          'Backwardation market me',
          'Jab interest rate zero ho',
          'Rollover cost kabhi negative nahi hota',
        ],
        answer: 0,
        explain: 'Contango me aage ka contract mehanga hota hai — roll karte waqt cost lagta hai. Backwardation me ulta.',
      },
      {
        q: 'Crypto me "custody risk" kya hai?',
        options: [
          'Price volatility',
          'Exchange ya wallet compromise/insolvency par funds ka loss',
          'Tax rate',
          'Network speed',
        ],
        answer: 1,
        explain: 'Custody risk counterparty risk hai — funds kisi ke paas hold hain aur wo fail ho sakta hai.',
      },
    ],
    exercise:
      'Ek hafte ke liye roz note karein: USD/INR, gold, crude, NIFTY aur Bitcoin ka daily % change. Week ke end me correlation observe karein. Likh kar batao kaunse pairs ne consistently move kiya aur kaunse nahi.',
  },

  'market-foundations/understanding-markets/derivatives-and-global-links': {
    objectives: [
      'Derivatives ka purpose — hedging vs speculation.',
      'Futures aur options ka basic structure.',
      'Global markets ka India par transmission mechanism.',
    ],
    intro:
      'Derivatives wo contracts hain jinki value kisi underlying asset se derive hoti hai. Ye risk management ke liye bane the — par retail participation mostly speculation ke liye hoti hai. Is lesson me hum dono sides honestly dekhenge.',
    blocks: [
      h('Derivative kya hai'),
      p(
        'Derivative ek contract hai jahan settlement kisi underlying (stock, index, currency, commodity) ki price par depend karta hai. Do main types: **futures** (obligation) aur **options** (right, not obligation).',
      ),
      table(
        ['', 'Futures', 'Options'],
        [
          ['Obligation', 'Dono parties bound hain', 'Buyer ko right, seller ko obligation'],
          ['Upfront payment', 'Margin only', 'Premium (buyer pays)'],
          ['Max loss (buyer)', 'Unlimited (long/short dono)', 'Premium tak limited'],
          ['Max loss (seller)', 'Unlimited', 'Unlimited (naked)'],
          ['Use case', 'Hedging, directional', 'Hedging, income, volatility'],
        ],
      ),
      h('Hedging ka example'),
      example(
        'Ek exporter ka hedge',
        'Ek Indian exporter ko 3 mahine baad $1,00,000 milenge. Aaj USD/INR 83.25 hai. Agar rupee strong ho jaaye (83.00), usse kam rupees milenge — loss. Wo ek currency futures contract se hedge karta hai. Agar rate 83.00 ho jaata hai, futures par profit hota hai jo spot loss offset karta hai. Hedge ka purpose profit banana nahi, **uncertainty remove karna** hai.',
        [
          'Exposure: 3 mahine baad $1,00,000 receivable.',
          'Risk: INR appreciation.',
          'Hedge: USD/INR futures short.',
          'Result: locked-in rate, no upside/downside.',
        ],
      ),
      h('Hedging vs speculation'),
      table(
        ['', 'Hedging', 'Speculation'],
        [
          ['Purpose', 'Existing risk kam karna', 'Naya risk lena'],
          ['Position size', 'Actual exposure ke barabar', 'Leverage ke saath bada'],
          ['Outcome', 'Cost of uncertainty remove', 'P&L'],
          ['Retail reality', 'Rare', 'Dominant'],
        ],
      ),
      callout(
        'danger',
        'India me retail F&O ka data-driven reality',
        'SEBI ke publicly released studies (FY22, FY24) ne dikhaya ki retail F&O traders ka bada majority net loss me raha hai. SEBI ne iske response me contract sizes badhaye, weekly expiries limit kiye aur margin rules strict kiye. Ye numbers kisi individual ko predict nahi karte, par Market ke structural difficulty ka honest signal hain. Isliye Learnyx F&O ko sirf education ke roop me padhata hai — koi strategy recommendation nahi deta.',
      ),
      h('Global market transmission'),
      olist([
        '**US markets** — S&P 500 aur Nasdaq ka move Asian markets ke open par asar daalta hai.',
        '**US bond yields** — global risk appetite aur FII flows ko affect karte hain.',
        '**Dollar index (DXY)** — strong dollar par emerging market flows usually pressured.',
        '**Crude oil** — India jaise import-dependent economies ke liye inflation aur current account ka driver.',
        '**China data** — metals, commodities aur Asian sentiment ke liye relevant.',
        '**Geopolitics** — oil, gold aur safe-haven flows me sudden repricing.',
      ]),
      callout(
        'info',
        'Correlation ≠ causation',
        'US market girne par India gir sakta hai — par ye mechanical law nahi hai. Kabhi India outperform karta hai (domestic drivers strong hone par). Isliye "Dow gir gaya to kal NIFTY girega" ek probabilistic statement hai, guarantee nahi.',
      ),
      h('Derivatives ke risks'),
      list([
        'Leverage se losses magnify hote hain.',
        'Time decay (theta) options buyers ko continuously nuksan pahunchata hai.',
        'Implied volatility collapse se option premium gir sakta hai even if direction sahi ho.',
        'Liquidity concentrated hoti hai — far OTM strikes me wide spreads.',
        'Expiry day par gamma risk extreme hota hai.',
        'Margin calls par forced liquidation ho sakti hai.',
      ]),
    ],
    summary: [
      'Derivatives underlying asset se derive value karte hain — futures aur options main types hain.',
      'Hedging uncertainty remove karta hai, speculation risk add karta hai.',
      'SEBI data retail F&O losses ka clear historical signal deta hai.',
      'Global markets US markets, yields, dollar aur commodities ke through India ko affect karte hain.',
      'Derivatives me leverage, time decay aur volatility collapse major risks hain.',
    ],
    mistakes: [
      'Hedging aur speculation ko same samajhna.',
      'Options buying ko "limited risk = safe" samajhna (premium repeatedly lose hota hai).',
      'Global correlation ko deterministic rule samajhna.',
    ],
    keyPoints: [
      'Derivatives risk transfer tools hain, return machines nahi.',
      'Retail F&O me structural challenges documented hain.',
      'Global linkages probabilistic hain, deterministic nahi.',
    ],
    quiz: [
      {
        q: 'Futures aur options me main structural difference kya hai?',
        options: [
          'Futures me sirf profit hota hai',
          'Futures obligation hai; option buyer ko right hai, seller ko obligation',
          'Options ka koi premium nahi hota',
          'Futures sirf commodities me hote hain',
        ],
        answer: 1,
        explain: 'Futures me dono parties bound hain. Option buyer right kharidta hai (premium dekar), seller obligation leta hai.',
      },
      {
        q: 'Hedging ka primary purpose kya hai?',
        options: [
          'Maximum profit',
          'Existing exposure ka risk kam karna / uncertainty remove karna',
          'Leverage badhana',
          'Tax bachana',
        ],
        answer: 1,
        explain: 'Hedge ka goal profit maximize karna nahi, known exposure lock karna hai.',
      },
      {
        q: 'Retail F&O traders ke net results par SEBI studies ne kya dikhaya?',
        options: [
          'Sab profitable hain',
          'Bada majority net loss me raha hai',
          'Koi data nahi hai',
          'Sirf 1% loss',
        ],
        answer: 1,
        explain: 'SEBI ke studies ne consistently dikhaya hai ki majority retail F&O traders net losses post karte hain — costs aur structural difficulty ke karan.',
      },
    ],
    exercise:
      'Ek export ya import karne wali company chunein. Socho ki uska currency exposure kya hai. Phir likhein ki wo kis derivative se hedge karegi, kis direction me, aur hedge na karne par worst-case loss kya ho sakta hai.',
  },

  'market-foundations/understanding-markets/economic-events-and-markets': {
    objectives: [
      'Major economic events ka calendar samajhna.',
      'Kaunsa event kis asset ko kyun affect karta hai.',
      'Event trading ke realistic risks.',
    ],
    intro:
      'Market price expectations ko price karta hai, events ko nahi. Isliye jab event aata hai, move often "expected vs actual" ke difference se hota hai — aur sometimes bilkul opposite bhi hota hai ("sell the news"). Is lesson me hum major events ko systematically dekhenge.',
    blocks: [
      h('Major events'),
      table(
        ['Event', 'Frequency', 'Kaun se markets', 'Key variables'],
        [
          ['RBI policy / Fed FOMC', '6–8 per year', 'Bonds, currency, equity, gold', 'Policy rate, commentary tone'],
          ['CPI inflation', 'Monthly', 'Bonds, currency, equity', 'Headline vs core inflation'],
          ['GDP growth', 'Quarterly', 'Equity, currency', 'YoY growth, revisions'],
          ['Employment (NFP, US)', 'Monthly', 'Bonds, USD, equity', 'Payrolls, unemployment rate, wages'],
          ['PMI', 'Monthly', 'Equity, currency', 'Manufacturing/services expansion'],
          ['Crude inventory data', 'Weekly', 'Energy, inflation-linked', 'Build/draw vs expectations'],
          ['Earnings season', 'Quarterly', 'Individual stocks, indices', 'Revenue/EPS vs estimates, guidance'],
          ['Union Budget / fiscal events', 'Annual', 'Sectors, bonds', 'Tax, spending, deficit'],
          ['Elections / geopolitics', 'Irregular', 'Everything', 'Policy uncertainty'],
        ],
      ),
      h('"Expectation vs reality" mechanism'),
      p(
        'Market analysts ki consensus estimate hoti hai. Price us estimate ko already reflect karti hai. Isliye teen cases bante hain: (1) **actual > expected** → usually positive surprise; (2) **actual = expected** → muted reaction, ise "priced in" kehte hain; (3) **actual < expected** → negative surprise. Par reaction ka size aur direction sentiment aur positioning par bhi depend karta hai.',
      ),
      example(
        'Inflation surprise kaise transmit hota hai',
        'Consensus CPI 5.0% tha, actual 5.8% aaya. Possible chain: inflation expectations up → central bank rate hike probability up → bond yields up → equity valuations pressured (especially growth/high P/E) → currency may strengthen (rate differential) → gold may weaken (higher real rates). Par agar simultaneously global risk-off ho, equity ka reaction different ho sakta hai. Isliye ek event se ek conclusion mat nikaalein.',
        [
          'Step 1: Surprise magnitude (0.8% above consensus).',
          'Step 2: Policy implication (rate expectations).',
          'Step 3: Asset class transmission (yields, currency, equity).',
          'Step 4: Net effect — kai forces ek saath kaam kar sakti hain.',
        ],
      ),
      callout(
        'warn',
        'Event trading ka structural problem',
        'Event ke announcement par price seconds me move karta hai. Retail ke liye wo move capture karna realistically mushkil hai — latency, liquidity gap aur spread widening sab against kaam karte hain. Jo log "news ke baad trade" karte hain, wo aksar worst price par fill hote hain. Alternatives: event se pehle position size kam karna, ya event ke baad structure settle hone ka wait karna.',
      ),
      h('Event calendar kaise use karein'),
      olist([
        'Apne holdings/instruments ke relevant events identify karein.',
        'Event se pehle **risk reduce** karein agar exposure bada hai (position sizing).',
        'Event ke baad **reaction** dekhein, prediction na karein.',
        'Event ke baad "sell the news" possibility consider karein.',
        'Note karein: outcome aur aapki thesis match hui ya nahi — journal me.',
      ]),
      callout(
        'info',
        'Data quality ka basic',
        'Official sources use karein: RBI, Ministry of Statistics (India), Federal Reserve, BLS, BEA (US). Social media par "leaked" numbers aur unofficial calendars unreliable hote hain. Learnyx kisi data vendor se live data nahi leta — hum sirf concepts padhate hain.',
      ),
    ],
    summary: [
      'Market expectations price karta hai; event ke baad surprise ka reaction hota hai.',
      'Rate decisions, inflation, employment aur GDP sabse high-impact events hain.',
      'Ek event ka transmission multi-step hota hai aur mixed forces possible hain.',
      'Event ke turant baad trading me latency aur liquidity disadvantages hain.',
      'Event calendar ka use risk management ke liye karein, prediction ke liye nahi.',
    ],
    mistakes: [
      'Event outcome ko directly price direction samajhna.',
      'Event ke turant baad market order lagana.',
      'Multiple simultaneous forces ko ignore karna.',
      '"Priced in" concept ko ignore karna.',
    ],
    keyPoints: [
      'Surprise = actual − expected, not actual alone.',
      'Transmission multi-step hai — yields, currency, valuation sab involved.',
      'Position sizing event risk ka best mitigation hai.',
    ],
    quiz: [
      {
        q: 'Consensus inflation 5.0% tha, actual 5.8%. Generally kya expected hota hai?',
        options: [
          'Bond yields gir sakte hain',
          'Rate hike expectations badh sakti hain, bonds aur growth stocks pressured ho sakte hain',
          'Kuch nahi hota',
          'Currency automatically pegged ho jaati hai',
        ],
        answer: 1,
        explain: 'Higher inflation rate expectations badhata hai → yields up → valuations pressured. Par actual reaction sentiment par bhi depend karta hai.',
      },
      {
        q: '"Priced in" ka matlab kya hai?',
        options: [
          'Price fixed hai',
          'Market ne expectation already reflect kar li hai, isliye expected outcome par reaction muted ho sakta hai',
          'Price band lag gaya',
          'Costs include hain',
        ],
        answer: 1,
        explain: 'Expectation price me incorporated hoti hai; reaction tab aata hai jab actual expectation se alag ho.',
      },
      {
        q: 'Event ke turant baad retail trade ka main structural disadvantage kya hai?',
        options: [
          'Brokerage zyada hota hai',
          'Liquidity gap aur spread widening ke saath latency disadvantage',
          'Order cancel ho jaata hai',
          'Tax badh jaata hai',
        ],
        answer: 1,
        explain: 'Liquidity temporarily vanish ho jaati hai aur algorithms pehle execute karte hain — retail ko worst price milta hai.',
      },
    ],
    exercise:
      'Agle 4 hafte ka economic calendar dekhein (public source). Apne 3 hypothetical holdings ke liye relevant events identify karein. Har event ke liye likhein: (a) expectation kya hai, (b) possible surprise direction, (c) aap position size kaise adjust karenge.',
  },
};
