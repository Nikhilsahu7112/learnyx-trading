import type { LessonBodyRegistry } from './builder';
import { callout, diagram, example, formula, h, list, olist, p, table, terms } from './builder';

export const level1: LessonBodyRegistry = {
  /* ================================================================ */
  /* MODULE 1 — Introduction to Financial Markets                     */
  /* ================================================================ */
  'market-foundations/intro-to-financial-markets/what-is-a-financial-market': {
    objectives: [
      'Samajhna ki financial market kya hota hai aur wo real economy se kaise juda hai.',
      'Market ke do bade roles — capital formation aur price discovery — ko explain karna.',
      'Primary aur secondary market ka farq asaan shabdon me batana.',
    ],
    intro:
      'Financial market ek aisa organised "bazaar" hai jahan paisa, ownership aur risk exchange hota hai. Sabzi mandi me tamatar bikta hai; financial market me company ka hissa (share), currency, dhaatu (gold) aur contract (derivative) bikte hain. Dono jagah ek hi cheez kaam karti hai — kharidne wala aur bechne wala ek price par milte hain.',
    blocks: [
      h('Financial market asli me kya hai?'),
      p(
        'Agar aap ek line me poochhein "market kya hai?", to jawab hai: **ek mechanism jahan buyers aur sellers price par agree karte hain**. Ye bazaar kisi ek building me nahi hota — aaj kal ye electronic order books me hota hai. NSE ya NYSE ka trading floor koi physicist-lab nahi hai; wo sirf ek computer system hai jo lakhon orders ko match karta hai.',
      ),
      p(
        'Do words yaad rakhiye: **capital** aur **liquidity**. Capital ka matlab paisa jo kaam kar sakta hai (factory, software, inventory). Liquidity ka matlab kitni aasani se aap apni holding ko cash me badal sakte hain. Financial market dono ko manage karta hai.',
      ),
      h('Market ke do bade kaam'),
      olist([
        '**Capital formation** — jinki paas idea hai par paisa kam hai (companies, startups, governments) wo unse milte hain jinki paas extra paisa hai (investors, savers). Ye "pooling" market ke bina bahut mushkil aur mahanga hota.',
        '**Price discovery** — ek share ki keemat kya honi chahiye? Koi committee decide nahi karti. Lakhon buyers-sellers apni information ke base par bid karte hain, aur jahan demand-supply match hoti hai wahi price "discover" hoti hai.',
        '**Risk transfer** — jo risk lena chahta hai (speculator, hedger) aur jo risk se bachna chahta hai (farmer, exporter, mutual fund) dono market me milte hain. Derivatives isi ka product hain.',
        '**Liquidity provision** — aap apna share aaj bech sakte hain, 10 saal wait nahi karna padta. Yehi wajah hai ki log equity me invest karne ko tayyar hote hain.',
      ]),
      h('Ek rozmarra example'),
      example(
        'Chai ki dukaan se stock exchange tak',
        'Ramesh ki chai ki dukaan chal rahi hai. Wo aur 3 outlets kholna chahta hai, par har outlet me ₹8 lakh chahiye. Bank loan me interest dena padega; ya wo apni company ka hissa kisi ko de sakta hai. Agar wo public ko hisse beche to ye **primary market** ka transaction hai — paisa company ke paas jaata hai. Uske baad jab koi naya investor Ramesh ke hisse kisi purane investor se kharidta hai, wo **secondary market** hai — paisa company ke paas nahi jaata, sirf ownership badalti hai.',
        [
          'Step 1: Company ko capital chahiye.',
          'Step 2: Primary market — naye shares issue hote hain, paisa company ko milta hai.',
          'Step 3: Secondary market — shares investors ke beech trade hote hain, company ko kuch nahi milta.',
          'Step 4: Price secondary market me demand-supply se har second badalti hai.',
        ],
      ),
      h('Primary aur secondary market ka farq'),
      table(
        ['Feature', 'Primary Market', 'Secondary Market'],
        [
          ['Kaun involved', 'Company + naye investors', 'Investors ek dusre ke saath'],
          ['Paisa kahan jaata hai', 'Company ke paas', 'Bechne wale investor ke paas'],
          ['Price kaise tay hoti hai', 'Issue price company/banker decide karte hain', 'Live demand-supply se'],
          ['Examples', 'IPO, FPO, rights issue, bond issue', 'NSE/BSE/NYSE par roz ka trading'],
          ['Liquidity', 'Kam — ek baar ka event', 'Zyada — continuously available'],
        ],
        'Primary market capital raise karta hai; secondary market us capital ko tradeable banata hai.',
      ),
      callout(
        'info',
        'Yaad rakhne ka simple tarika',
        'Primary = "naya maal" (company se seedha). Secondary = "purana maal" (investor se investor). Dono zaroori hain — agar secondary market na ho, to koi bhi primary market me paisa nahi lagayega, kyunki exit hi nahi milega.',
      ),
      diagram(
        'market-cycle',
        'Capital ka circular flow',
        'Company → investors → secondary market → naye investors. Liquidity hi primary market ko possible banati hai.',
        'A diagram showing four stages: a company issues shares to investors in the primary market; investors hold shares; the secondary market allows those shares to change hands; the resulting liquidity encourages new investors to participate in future primary issues.',
      ),
      h('Market ke bina kya hota?'),
      p(
        'Sochiye agar secondary market band ho jaaye. Aap kisi share ko bech nahi sakte — aapka paisa "phansa" hua hai. Phir koi bhi naye IPO me paisa nahi lagayega, kyunki nikalne ka rasta nahi hai. Isi tarah agar primary market band ho, to companies ko growth capital nahi milega aur economy slow ho jaayegi. Isliye regulators (SEBI, SEC) dono ko strictly regulate karte hain.',
      ),
      h('Kya financial market sirf paisa banane ki jagah hai?'),
      p(
        'Nahi. Financial market ka pehla function **allocation of capital** hai — kis idea ko paisa milega, kis ko nahi. Jab aap Reliance ka share kharidte hain, aap indirectly uske refinery aur telecom business ko funding de rahe hain (agar aap IPO me the) ya kisi aur investor ko exit de rahe hain. Trading profit ek side-effect hai, market ka purpose nahi.',
      ),
      callout(
        'warn',
        'Beginner ki sabse badi galti',
        'Market ko "paise banane ki machine" samajhna. Market ek pricing aur allocation system hai. Jo log isse casino samajhte hain, wo risk ko ignore karke position size bada kar dete hain — aur ek hi trade unka account khatam kar deta hai.',
      ),
    ],
    summary: [
      'Financial market ek mechanism hai jahan buyers aur sellers price par match karte hain.',
      'Iske functions: capital formation, price discovery, risk transfer aur liquidity.',
      'Primary market me naye shares issue hote hain aur paisa company ko jaata hai.',
      'Secondary market me existing shares investors ke beech trade hote hain.',
      'Dono markets ek dusre par depend karte hain — liquidity ke bina capital raise nahi hota.',
    ],
    mistakes: [
      'Secondary market ke price ko company ki "asli value" maan lena — dono alag cheez hain.',
      'IPO ko "sasta mil raha hai" samajh kar apply karna bina business samjhe.',
      'Ye sochna ki company ko har trade se paisa milta hai.',
    ],
    keyPoints: [
      'Market = matching engine for capital and risk, not a money printer.',
      'Primary market = capital raise; secondary market = liquidity.',
      'Price discovery decentralized hoti hai — koi single authority price fix nahi karti.',
    ],
    quiz: [
      {
        q: 'Jab aap NSE par kisi company ka share kisi aur investor se kharidte hain, to paisa kahan jaata hai?',
        options: [
          'Company ke bank account me',
          'Bechne wale investor ke paas',
          'SEBI ke paas',
          'Exchange ke paas, jo use hold karta hai',
        ],
        answer: 1,
        explain:
          'Secondary market ka transaction investors ke beech hota hai. Company ko paisa sirf primary market (IPO, FPO, rights issue) me milta hai.',
      },
      {
        q: 'Financial market ka primary economic function kya hai?',
        options: [
          'Logon ko jaldi ameer banana',
          'Capital ko un businesses tak pahunchana jinko uski zaroorat hai',
          'Sirf speculation allow karna',
          'Government ko tax collect karne dena',
        ],
        answer: 1,
        explain:
          'Allocation of capital sabse basic function hai. Profit/return us process ka byproduct hai, purpose nahi.',
      },
      {
        q: 'Agar secondary market bilkul band ho jaaye to sabse pehle kya problem hogi?',
        options: [
          'Companies ke profits zero ho jaayenge',
          'Investors apni holdings ko cash me nahi badal payenge, isliye naye investors primary market se darenge',
          'Share prices automatically double ho jaayengi',
          'Brokers free ho jaayenge',
        ],
        answer: 1,
        explain:
          'Liquidity na hone par exit nahi milta. Exit na hone par koi naye issue me paisa nahi lagata — isliye primary market bhi ruk jaata.',
      },
    ],
    exercise:
      'Apne aas-paas ki 3 companies choose karein (jaise ek bank, ek FMCG, ek IT). Har ek ke liye likhein: (a) wo primary market me kab capital utha sakti hai, (b) uska share secondary market me kaise trade hota hai, (c) agar kal se uske shares trade hona band ho jaayein to kya practical problem hogi.',
  },

  'market-foundations/intro-to-financial-markets/how-companies-raise-capital': {
    objectives: [
      'Equity aur debt funding ka farq samajhna.',
      'IPO ka process step-by-step samajhna — bina broker account kholne ke.',
      'Dilution, rights issue, QIP aur bond issue jaise terms ko pehchanna.',
    ],
    intro:
      'Har company ko grow karne ke liye paisa chahiye. Paisa laane ke do hi raste hain: **udhaar lo (debt)** ya **hissa becho (equity)**. Teesra rasta hai apne profit se fund karna (internal accruals). Real companies teeno ka mix use karti hain. Is lesson me hum dekhenge ki stock market me ye kaise hota hai — sirf theory, koi account kholne ki zaroorat nahi.',
    blocks: [
      h('Teen funding options'),
      table(
        ['Source', 'Kya milta hai', 'Investor ko kya milta hai', 'Risk kis par'],
        [
          ['Equity (shares)', 'Paisa, wapas karne ki fixed obligation nahi', 'Ownership + future profits ka hissa + voting', 'Shareholder — loss ka risk poora'],
          ['Debt (loan/bond)', 'Paisa, fixed interest ke saath', 'Interest + principal wapas', 'Lender — recovery ka risk, par company par pehla claim'],
          ['Internal accruals', 'Retained profit', 'Kuch nahi — company apna paisa reinvest karti hai', 'Shareholders'],
        ],
      ),
      p(
        'Simple rule: **debt sasta hota hai par risky hota hai company ke liye**; **equity mehanga hota hai par flexible hota hai**. Kyun? Kyunki interest dena compulsory hai — profit ho ya na ho, EMI jaayegi. Dividend dena optional hai. Isliye ek startup with unpredictable cash flow debt nahi le sakta, par ek stable cement company le sakti hai.',
      ),
      h('Equity raise karne ka process'),
      olist([
        '**Decision** — board decide karta hai kitna paisa chahiye aur kis cheez ke liye (capex, debt repayment, working capital).',
        '**Investment bank / merchant banker** hire hota hai jo valuation aur structure banata hai.',
        '**Regulatory filing** — India me SEBI ke paas draft offer document (DRHP) jaata hai; US me SEC ke paas S-1. Ye public document hota hai — aap aaj bhi padh sakte hain.',
        '**Roadshow** — institutional investors (mutual funds, insurers) ko company present hoti hai; demand "book" banti hai.',
        '**Pricing** — demand ke hisaab se price band decide hota hai.',
        '**Listing** — shares exchange par list hote hain aur secondary market me trade shuru karte hain.',
        '**Proceeds** — paisa company ke account me aata hai, expenses nikaal kar.',
      ]),
      callout(
        'info',
        'Aap IPO me participate kar sakte hain — par pehle fundamentals padhein',
        'DRHP/RHP public hota hai. Isme risk factors, use of proceeds aur financials hote hain. Jo log sirf "IPO me listing gain" ke liye apply karte hain, wo business ko padhe bina risk le rahe hote hain.',
      ),
      h('Dilution kya hota hai?'),
      p(
        'Maaniye company ke 100 shares hain aur aapke paas 10 hain — aapki ownership 10%. Company 100 naye shares issue karti hai (total 200). Ab aapke paas still 10 shares hain, par ownership 5% ho gayi. Ye **dilution** hai. Company ko paisa mila jo growth me use hoga — agar growth ki value dilution se zyada hai, to purane shareholders ko fayda hota hai; warna nuksan.',
      ),
      formula(
        'Ownership % (post-issue)',
        'New ownership % = (Aapke shares) ÷ (Purane shares + Naye shares) × 100',
        'Agar aapke paas 10 shares hain, purane total 100 hain aur 100 naye issue hote hain: 10 ÷ 200 × 100 = 5%.',
      ),
      h('Capital raise ke doosre forms'),
      terms([
        {
          term: 'IPO (Initial Public Offering)',
          meaning: 'Company pehli baar public ko shares bechti hai. Iske baad wo listed company ban jaati hai.',
        },
        {
          term: 'FPO (Follow-on Public Offer)',
          meaning: 'Pehle se listed company dobara public ko naye shares bechti hai.',
        },
        {
          term: 'Rights Issue',
          meaning: 'Existing shareholders ko discounted price par naye shares kharidne ka pehla haq milta hai — taaki dilution kam ho.',
        },
        {
          term: 'QIP / Private Placement',
          meaning: 'Sirf select institutional investors ko shares bechna. Fast hota hai, public ke liye nahi.',
        },
        {
          term: 'Bond Issue',
          meaning: 'Company fixed interest ka wada karke paisa uthaati hai. Ye equity nahi, debt hai.',
        },
        {
          term: 'Buyback',
          meaning: 'Ulta process — company apne hi shares market se kharid kar cancel karti hai. Shares ki supply kam hoti hai.',
        },
      ]),
      h('Ek simple calculation'),
      example(
        '₹50 crore ka expansion — equity ya debt?',
        'Ek manufacturing company ko ₹50 crore chahiye naya plant lagane ke liye. Plant se saal ka extra ₹9 crore operating profit aayega. Option A: 9% interest par debt = ₹4.5 crore interest, par plant 9 crore kamata hai — net ₹4.5 crore profit. Option B: 20% naye shares dilute karke equity = koi interest nahi, par future profit ka 20% naye investors ko jaayega. Agar company ka cash flow predictable hai, debt better. Agar demand uncertain hai, equity safer.',
        [
          'Debt ka cost: fixed ₹4.5 crore per year — profit ho ya na ho.',
          'Equity ka cost: future profit ka hissa + control ka hissa.',
          'Sabse aam jawab: mix — thoda debt, thoda internal accrual.',
        ],
      ),
      callout(
        'warn',
        'Ye lesson account kholne ke liye nahi hai',
        'Learnyx Trading kisi broker ko recommend nahi karta aur koi account khulwane ki salah nahi deta. Yahan hum sirf process samajh rahe hain. Koi bhi financial decision lene se pehle apni situation ke hisaab se registered advisor se baat karein.',
      ),
    ],
    summary: [
      'Companies teen tarah se paisa laati hain: equity, debt aur internal accruals.',
      'Equity me ownership dilute hota hai par fixed obligation nahi hoti.',
      'Debt me fixed interest obligation hoti hai par ownership nahi jaati.',
      'IPO ka process: decision → banker → regulatory filing → roadshow → pricing → listing.',
      'Rights issue, QIP, FPO aur buyback capital structure manage karne ke tools hain.',
    ],
    mistakes: [
      'Ye sochna ki IPO ka price "company ki value" hai — market price demand se banti hai.',
      'Dilution ko always negative samajhna — growth ke liye raise kiya gaya paisa faydemand ho sakta hai.',
      'Debt ko sirf "bura" samajhna — predictable cash flow wali companies ke liye debt efficient hota hai.',
    ],
    keyPoints: [
      'Equity = ownership, no fixed repayment. Debt = obligation, fixed interest.',
      'IPO proceeds company ko jaate hain; post-listing trades company ko nahi.',
      'DRHP/RHP public documents hain — risk factors wahan padhein.',
    ],
    quiz: [
      {
        q: 'Rights issue ka main purpose kya hota hai?',
        options: [
          'Naye investors ko discount dena',
          'Existing shareholders ko pehla haq dekar dilution ko control karna',
          'Company ko debt se free karna',
          'Share price artificially badhana',
        ],
        answer: 1,
        explain:
          'Rights issue me existing shareholders ko proportionally naye shares kharidne ka haq milta hai, jisse unki ownership % bani rah sake.',
      },
      {
        q: 'Ek company ke 100 shares hain. Aapke paas 10 hain. Company 100 naye shares issue karti hai. Aapki nayi ownership kitni hogi?',
        options: ['10%', '5%', '20%', '50%'],
        answer: 1,
        explain: '10 ÷ (100 + 100) = 5%. Shares same hain par total base double ho gaya — yehi dilution hai.',
      },
      {
        q: 'Equity funding debt se flexible kyun kehlati hai?',
        options: [
          'Kyunki equity ka interest rate kam hota hai',
          'Kyunki dividend dena optional hai, jabki interest dena compulsory',
          'Kyunki equity me paisa kabhi wapas nahi karna padta kisi bhi haal me',
          'Kyunki equity sirf sarkari companies use karti hain',
        ],
        answer: 1,
        explain:
          'Equity me fixed payment obligation nahi hoti. Debt me interest aur principal dena contractual obligation hai — profit ho ya loss.',
      },
    ],
    exercise:
      'Kisi ek listed company ka latest annual report ya RHP ka "Use of Proceeds" section padhein. Likh kar batao: paisa kis kaam me laga, equity tha ya debt, aur usse company ki growth ya risk profile par kya asar pad sakta hai.',
  },

  'market-foundations/intro-to-financial-markets/stocks-shares-and-ownership': {
    objectives: [
      'Stock, share aur equity ke beech ka farq clear karna.',
      'Ownership ke rights aur limitations samajhna.',
      'Face value, book value aur market price ko alag-alag pehchanna.',
    ],
    intro:
      'Log "stock" aur "share" ko same samajh lete hain. Practically wo same hi hain, par nuance hai: **share** ek single unit hai, **stock** us company ki overall ownership ka collective naam hai. Is lesson me hum dekhenge ki ek share kharidne ka matlab technically kya hota hai — aur kya nahi hota.',
    blocks: [
      h('Definition se shuru'),
      terms([
        {
          term: 'Share',
          meaning: 'Company ki ownership ka ek chhota hissa. Agar company 1 crore shares me divided hai, to 1 share = 1/1,00,00,000 ownership.',
        },
        {
          term: 'Stock',
          meaning: 'Us company ki equity ka collective naam, ya broadly equity securities. "I own stock in X" ka matlab X ke shares.',
        },
        {
          term: 'Equity',
          meaning: 'Accounting term — assets minus liabilities. Shareholders ka claim company ki net worth par.',
        },
        {
          term: 'Shareholder',
          meaning: 'Jo bhi company ka share rakhta hai. Aaj kal demat form me, electronic entry ke roop me.',
        },
      ]),
      h('Share kharidne par aapko kya milta hai'),
      olist([
        '**Residual claim on profit** — company sab kuch pay karne ke baad (employees, vendors, lenders, tax) jo bachta hai, wo shareholders ka hai. Isi ka hissa dividend ke roop me mil sakta hai.',
        '**Voting rights** — board elections aur major resolutions me vote. 1 share = 1 vote (generally).',
        '**Right to information** — annual report, quarterly results, material events ki disclosure.',
        '**Right to participate in corporate actions** — bonus issue, rights issue, split.',
        '**Limited liability** — aap sirf apni investment tak risk lete hain. Company ka karz aapke ghar par nahi aata.',
      ]),
      callout(
        'warn',
        'Residual claim ka matlab kya hai?',
        'Agar company bankrupt ho jaaye, to pehle lenders ko paisa milega, phir vendors aur employees, phir preference shareholders — aur **sabse aakhir me** equity shareholders. Aksar equity shareholders ko zero milta hai. Isliye "share kharidna = company ka maalik banna" sach hai, par "company ke assets par pehla haq" nahi.',
      ),
      h('Ek share ki teen alag-alag keematein'),
      table(
        ['Value', 'Kya hai', 'Kaise nikalta hai'],
        [
          ['Face value (par value)', 'Accounting entry, jaise ₹10 ya ₹1', 'Company ke charter me fix — market se koi lena-dena nahi'],
          ['Book value', 'Net worth per share', '(Total assets − total liabilities) ÷ shares outstanding'],
          ['Market price', 'Jahan aaj trade ho raha hai', 'Live demand-supply + expectations'],
          ['Intrinsic value', 'Aapka estimate of true worth', 'Valuation models — DCF, comparables'],
        ],
      ),
      p(
        'Yeh sabse zyada confuse karne wali cheez hai. Ek company ka face value ₹10 ho sakta hai aur market price ₹3,400. Face value ka matlab sirf ye hai ki company ne apne shares ko kitne "units" me divide kiya. Ye value nahi batata ki share mehanga hai ya sasta.',
      ),
      example(
        'Book value vs market price',
        'Ek company ke total assets ₹1,000 crore hain, liabilities ₹400 crore. Net worth = ₹600 crore. Shares outstanding = 30 crore. Book value per share = 600 ÷ 30 = ₹20. Agar market price ₹55 hai, to market us company ke future growth aur brand ko book value se zyada value de raha hai. Ye "mehanga" ya "sasta" khud se decide nahi hota — comparison aur context chahiye.',
        [
          'Net worth = Assets − Liabilities = ₹600 crore.',
          'Book value per share = ₹600 crore ÷ 30 crore = ₹20.',
          'Market price ₹55 → P/B ratio = 55 ÷ 20 = 2.75×.',
          'P/B 2.75 ka matlab market book value se 2.75 guna zyada de raha hai — ye achha hai ya bura, industry ke hisaab se dekhein.',
        ],
      ),
      h('Ownership ka scope'),
      p(
        'Ek listed company me aapke paas hazaaron co-owners ho sakte hain. Aap company ke office me jaakar "mera share dikhao" nahi keh sakte — aap ek financial claim rakh rahe hain, physical asset nahi. Isliye ownership ke rights **proportionate** hote hain, absolute nahi. 0.00001% ownership ka matlab hai 0.00001% profit claim aur 0.00001% voting power.',
      ),
      callout(
        'tip',
        'Sochne ka tareeka',
        'Share ko "company ka chhota tukda" na samjhein — usse "company ke future cash flows ka chhota legal claim" samjhein. Isi lens se valuation, risk aur expectation sab clear ho jaate hain.',
      ),
    ],
    summary: [
      'Share = ownership ki ek unit; stock = us equity ka collective naam.',
      'Shareholder ko residual profit claim, voting rights aur limited liability milti hai.',
      'Bankruptcy me equity shareholders ka claim sabse aakhir me aata hai.',
      'Face value accounting number hai, book value net worth per share hai, market price demand-supply se banti hai.',
      'Ownership proportionate hoti hai — chhoti holding chhoti claim deti hai.',
    ],
    mistakes: [
      'Face value ko share ki "asli keemat" samajhna.',
      'Ye sochna ki company ke assets par aapka direct haq hai.',
      'Market price ko intrinsic value ke barabar maan lena.',
    ],
    keyPoints: [
      'Share = proportionate legal claim on residual cash flows.',
      'Limited liability aapke personal assets ko protect karti hai — par investment ka poora loss possible hai.',
      'Book value aur market price alag concepts hain.',
    ],
    quiz: [
      {
        q: 'Agar company liquidate hoti hai, to paisa kis order me milta hai?',
        options: [
          'Equity shareholders → lenders → employees',
          'Lenders → employees/vendors → preference shareholders → equity shareholders',
          'Sabko barabar',
          'Sirf promoters ko',
        ],
        answer: 1,
        explain:
          'Secured lenders sabse pehle, phir statutory dues aur employees/vendors, phir preference capital, aur sabse aakhir me equity shareholders.',
      },
      {
        q: 'Face value ₹10 aur market price ₹450 wale share ka kya matlab hai?',
        options: [
          'Share 45 guna overvalued hai',
          'Face value sirf accounting entry hai; market price demand-supply aur expectations se banti hai',
          'Company ne 45 baar split kiya hai',
          'Share ka book value ₹450 hai',
        ],
        answer: 1,
        explain:
          'Face value se valuation ka koi seedha rishta nahi. Dono numbers bilkul alag purpose ke hain.',
      },
      {
        q: '"Limited liability" ka matlab kya hai?',
        options: [
          'Aap sirf limited shares kharid sakte hain',
          'Aapka loss aapki investment tak seemit hai; company ka karz aapke personal assets par nahi aata',
          'Company ka profit limited hota hai',
          'Aapko dividend sirf limited time milta hai',
        ],
        answer: 1,
        explain:
          'Limited liability shareholders ko personal bankruptcy se bachati hai. Par investment ka 100% loss ho sakta hai — wo liability nahi, market risk hai.',
      },
    ],
    exercise:
      'Kisi ek listed company ke financials se nikalein: shares outstanding, net worth aur aaj ka market price (kisi bhi public source se). Book value per share calculate karein aur P/B ratio nikalein. Phir likhein ki P/B 1 se zyada ya kam kyun hai — aapki best guess.',
  },

  'market-foundations/intro-to-financial-markets/trading-vs-investing': {
    objectives: [
      'Trading, investing aur speculation ke beech clear distinction banana.',
      'Time horizon, effort aur risk ka relation samajhna.',
      'Ye pehchanna ki aap kis style me fit hain — bina kisi ko copy karne ke.',
    ],
    intro:
      'Market me do log paisa kamate hain: jo business ki value samajhte hain aur jo price behaviour ko discipline se trade karte hain. Dono valid hain, par methods, time commitment aur risk profile bilkul alag hain. Is lesson me hum inhe honest tarike se compare karenge — kisi ko "best" declare kiye bina.',
    blocks: [
      h('Teen words, teen matlab'),
      table(
        ['', 'Investing', 'Trading', 'Speculation'],
        [
          ['Time horizon', 'Saal se decade', 'Minutes se weeks', 'Bahut short, event-driven'],
          ['Basis', 'Business fundamentals, cash flows', 'Price behaviour, patterns, flow', 'Expectation of a price move, often leverage'],
          ['Edge ka source', 'Value vs price gap, compounding', 'Statistical edge + risk management', 'Information ya momentum, high uncertainty'],
          ['Effort', 'Low, periodic review', 'High, daily screen time', 'Very high, volatile'],
          ['Risk profile', 'Market risk, business risk', 'Execution risk + market risk', 'Very high, often total loss possible'],
        ],
      ),
      p(
        'Dhyaan dijiye: **speculation = trading nahi hota**. Trading ke paas process, rules aur risk limits hote hain. Speculation me often leverage aur "sirf upar jaayega" ka assumption hota hai. Isi liye ek disciplined intraday trader aur ek gambling karta hua person technically same order type use kar sakte hain par economically bilkul alag kaam kar rahe hain.',
      ),
      h('Investing ka logic'),
      p(
        'Investor ka sawal hota hai: "Ye business agle 10 saal me kitna cash generate karega, aur main uske liye aaj kitna de raha hoon?" Agar price intrinsic value se kam hai, wo kharidta hai. Uska return do cheezon se aata hai: **company ki earnings growth** aur **valuation re-rating** (ya dividend). Short-term price noise usse disturb nahi karta — balki wo usse opportunity samajhta hai.',
      ),
      h('Trading ka logic'),
      p(
        'Trader ka sawal hota hai: "Aaj price kahan ja sakta hai, kis level par main galat hoon, aur risk-reward kya hai?" Uske paas **repeated setup** hota hai jo historical data me kaam karta dikha hai. Profit chhoti chhoti wins ka aggregate hota hai, aur wo har trade me defined stop-loss lagata hai. Uska main kaam prediction nahi, **risk management** hai.',
      ),
      example(
        '₹1,00,000 par dono approaches',
        'Trader A: ₹1,00,000 capital, per trade 1% risk (₹1,000), 40 trades per year, 45% win rate, average win 2R aur average loss 1R. Expected = 40 × (0.45 × 2 − 0.55 × 1) R = 40 × 0.35R = 14R = ₹14,000 per year, before costs. Trader B invests ₹1,00,000 in 5 businesses, 12% annual growth, 8 years → lagbhag ₹2,47,600. Dono valid hain — par A ko 40 disciplined decisions lene padte hain, B ko 1 aur patience.',
        [
          'A ka return effort aur execution skill par depend karta hai.',
          'B ka return business performance aur time par depend karta hai.',
          'Dono me costs (brokerage, taxes, slippage) return kam karte hain.',
        ],
      ),
      callout(
        'info',
        'Sabse important line',
        'Investing aur trading me "kaun better hai" ka koi universal jawab nahi hota. Sawaal ye hai: **aapke paas kitna time, kitna capital, kitna temperament aur kitna testable edge hai?** Jo aapke paas nahi hai, uske liye strategy mat chuniye.',
      ),
      h('Hybrid reality'),
      p(
        'Zyaadatar log actually hybrid hote hain: long-term portfolio + thoda active trading. Ye theek hai, par ek rule zaroori hai — **dono ke paas alag capital aur alag rules hone chahiye**. Jo paisa long-term ke liye hai use trading me mat daalein, warna ek bad trade future ki compounding kha jaayega.',
      ),
      callout(
        'warn',
        'Leverage ka reality check',
        'F&O, forex aur crypto me leverage milta hai. Leverage aapka return badhata hai **aur** aapka loss badhata hai — dono symmetric. 10x leverage par 10% adverse move = 100% capital loss. Isliye SEBI ne retail F&O ke liye strict margin rules banaye hain; ye rules aapko bachane ke liye hain, rokne ke liye nahi.',
      ),
      h('Aap kaun hain?'),
      list([
        'Agar aap din me 30 min se zyada screen dekh nahi sakte — investing zyada realistic hai.',
        'Agar aapke paas testable system aur strict stop discipline nahi — trading me mat jaayein.',
        'Agar aapko daily price movement dekh kar bechaini hoti hai — short timeframe aapke liye risky hai.',
        'Agar aap naye hain — pehle 2-3 mahine paper trading (Trading Lab) karein, phir decide karein.',
      ]),
    ],
    summary: [
      'Investing business value par based hota hai, trading price behaviour aur risk management par.',
      'Speculation me process nahi hota; wo leverage aur assumption par chalta hai.',
      'Trader ka edge repeated setups + risk discipline se aata hai, prediction se nahi.',
      'Har style ke liye alag time commitment, temperament aur capital chahiye.',
      'Hybrid approach possible hai par capital aur rules separate rakhne chahiye.',
    ],
    mistakes: [
      'Long-term portfolio ka paisa trading me lagana.',
      'Trading ko "shortcut to wealth" samajhna.',
      'Investing ko "boring" kehkar bina valuation samjhe kharidna.',
      'Leverage se return badhane ki koshish karna bina loss ka calculation kiye.',
    ],
    keyPoints: [
      'Trading = repeated decisions with defined risk. Investing = ownership over years.',
      'Har style ka realistic constraint hai — time, capital, temperament, skill.',
      'Leverage risk aur return dono ko multiply karta hai.',
    ],
    quiz: [
      {
        q: 'Trading aur speculation me main farq kya hai?',
        options: [
          'Trading sirf stocks me hoti hai, speculation sirf crypto me',
          'Trading ke paas defined process aur risk rules hote hain; speculation me nahi',
          'Speculation legal nahi hai',
          'Trading me loss nahi hota',
        ],
        answer: 1,
        explain:
          'Dono me price moves par bet lagta hai, par trader ke paas testable rules, position sizing aur stop-loss hota hai.',
      },
      {
        q: 'Ek trader per trade 1% risk karta hai, 40 trades/year, 45% win rate, average win 2R, average loss 1R. Expected return kitna R hai?',
        options: ['10R', '14R', '8R', '20R'],
        answer: 1,
        explain: 'Per trade expectancy = (0.45 × 2) − (0.55 × 1) = 0.9 − 0.55 = 0.35R. 40 × 0.35 = 14R.',
      },
      {
        q: '10x leverage par 10% adverse move ka asar kya hoga?',
        options: [
          '10% loss',
          'Lagbhag 100% capital loss',
          'Koi asar nahi',
          'Sirf 1% loss',
        ],
        answer: 1,
        explain:
          'Leverage loss ko bhi multiply karta hai: 10% × 10 = 100%. Isliye leveraged products me position size sabse important variable hai.',
      },
    ],
    exercise:
      'Apne aap se 5 honest sawaalon ke jawab likhein: (1) roz kitna time de sakte hain? (2) capital ka kitna hissa loss afford kar sakte hain? (3) daily P&L dekh kar emotional reaction aata hai? (4) kya maine kabhi apne rules likhe hain? (5) kis style ke liye mera temperament fit hai? Iske base par ek style chunein aur uska reason likhein.',
  },

  'market-foundations/intro-to-financial-markets/market-participants': {
    objectives: [
      'Retail, institutional, market maker aur regulator ke roles alag-alag samajhna.',
      'Kaun price par asar daalta hai aur kaise.',
      'Foreign institutional flow aur domestic flow ka concept.',
    ],
    intro:
      'Market me sirf "buyers" aur "sellers" nahi hote. Har participant ka motive, size aur time horizon alag hota hai. Isliye ek hi news par koi kharidta hai aur koi bechta hai — dono apne rules ke hisaab se sahi kar rahe hote hain.',
    blocks: [
      h('Participants ki list'),
      table(
        ['Participant', 'Motive', 'Typical horizon', 'Market par asar'],
        [
          ['Retail investor', 'Wealth creation, savings', 'Months to years', 'Collectively bada, individually chhota'],
          ['Retail trader', 'Short-term P&L', 'Minutes to weeks', 'Intraday volume ka bada hissa'],
          ['Mutual funds / PMS', 'Client returns vs benchmark', 'Quarters to years', 'Large orders, price impact zyada'],
          ['Insurance companies', 'Long-term liability matching', 'Decades', 'Stable, large, low turnover'],
          ['Foreign institutional investors (FII/FPI)', 'Global allocation', 'Varies', 'Flow ke saath index aur currency move'],
          ['Proprietary desks / HFT', 'Microstructure arbitrage', 'Milliseconds', 'Liquidity dete hain, spread kam karte hain'],
          ['Market makers', 'Spread capture', 'Continuous', 'Quote dono side — liquidity ka core'],
          ['Promoters / insiders', 'Control, strategic', 'Years', 'Disclosure-bound, high impact'],
          ['Exchanges & clearing corps', 'Market operation', 'N/A', 'Rules aur settlement'],
          ['Regulators (SEBI, SEC)', 'Investor protection', 'N/A', 'Disclosure aur conduct rules'],
        ],
      ),
      h('Market maker ka role'),
      p(
        'Market maker dono taraf quote deta hai — bid aur ask. Wo price prediction nahi karta; wo **spread** kamata hai. Agar usse lagta hai price gir sakta hai, wo apna ask thoda neeche le aayega. Isi adjustment se price move hoti hai. Isliye jab aap "market order" lagate hain, aapse pehle market maker ki quote execute hoti hai.',
      ),
      callout(
        'info',
        'Liquidity provider ka faayda',
        'Market makers ke bina spread bahut chaura hota — aapko kharidne par zyada dena padta aur bechne par kam milta. Accha liquidity = narrow spread = kam hidden cost.',
      ),
      h('Institutional flow kaise dikhta hai'),
      p(
        'Ek mutual fund ko ₹500 crore ka stock kharidna hai. Agar wo ek saath order daale to price uske against chala jaayega — ise **market impact** kehte hain. Isliye wo order ko chhote chunks me, VWAP ya TWAP algorithms se execute karta hai. Aapko chart par volume spikes dikhte hain, par pata nahi chalta kaun hai. Isliye volume analysis useful hai par "smart money" ka exact pata lagana impossible hai — jo YouTube par "smart money concepts" bechte hain, wo ek interpretation bech rahe hain, verified data nahi.',
      ),
      h('FII/DII flow'),
      terms([
        {
          term: 'FII / FPI',
          meaning: 'Foreign Institutional Investor / Foreign Portfolio Investor — videsh se aane wala institutional paisa. India me ye SEBI-registered hote hain.',
        },
        {
          term: 'DII',
          meaning: 'Domestic Institutional Investor — Indian mutual funds, insurance companies, banks, pension funds.',
        },
        {
          term: 'F&O rollover',
          meaning: 'Expiry ke paas positions ko next month me shift karna. Rollover % sentiment ka ek indicator maana jaata hai, par ye guarantee nahi.',
        },
      ]),
      p(
        'FII flow ko daily news me "badi" cheez bataya jaata hai. Reality: FII flow aggregate important hai, par daily number noise ho sakta hai. Ek do din ka flow se trend decide karna statistical mistake hai. Isse better hai ki aap **broad context** dekhein — currency, rates, global risk appetite.',
      ),
      callout(
        'warn',
        'Participants ko "hero" aur "villain" me mat baantiye',
        'Retail ko "dumb money" aur FII ko "smart money" kehna popular hai, par galat hai. Institutions bhi galtiyan karti hain aur disciplined retail bhi consistently perform karte hain. Market ek competitive system hai — koi permanent winner class nahi hoti.',
      ),
    ],
    summary: [
      'Participants ke motives aur horizons alag hote hain, isliye ek hi price par buy aur sell dono hote hain.',
      'Market makers spread kamate hain aur liquidity provide karte hain.',
      'Bade institutional orders market impact ke karan chhote chunks me execute hote hain.',
      'FII/DII flow important context hai par daily number se conclusion mat nikaalein.',
      'Kisi participant group ko "smart" ya "dumb" label karna galat simplification hai.',
    ],
    mistakes: [
      'Retail vs institutional ko simplistic good/bad binary me dekhna.',
      'Daily FII numbers se trend predict karna.',
      'Volume spike ko hamesha institutional accumulation samajhna.',
    ],
    keyPoints: [
      'Market = heterogeneous participants with different constraints.',
      'Liquidity providers spread kamate hain, direction nahi.',
      'Large orders price impact create karte hain — isliye execution algorithms use hote hain.',
    ],
    quiz: [
      {
        q: 'Market maker paisa kaise kamata hai?',
        options: [
          'Price direction predict karke',
          'Bid-ask spread capture karke aur liquidity provide karke',
          'Sirf brokerage se',
          'Government subsidy se',
        ],
        answer: 1,
        explain: 'Market maker dono side quote deta hai aur spread se kamata hai. Uska model direction par nahi, flow aur inventory management par based hota hai.',
      },
      {
        q: 'Ek mutual fund ko bada order dena hai. Wo chhote chunks me kyun todta hai?',
        options: [
          'Kyunki brokerage kam lagta hai',
          'Kyunki ek bada order price ko apne against move kar dega (market impact)',
          'Kyunki exchange rules allow nahi karte',
          'Kyunki SEBI mana karta hai',
        ],
        answer: 1,
        explain: 'Ye market impact minimize karne ke liye hota hai. VWAP/TWAP jaise execution algorithms isi ke liye bane hain.',
      },
      {
        q: 'Kisi participant group ko hamesha "smart money" kehna kyun galat hai?',
        options: [
          'Kyunki institutions kabhi trade nahi karte',
          'Kyunki har group galtiyan karta hai; market competitive hai aur koi permanent winner class nahi',
          'Kyunki smart money ka concept legal nahi hai',
          'Kyunki sirf retail hi profit kama sakta hai',
        ],
        answer: 1,
        explain: 'Institutions ke paas resources zyada hote hain, par wo bhi galat hote hain. Label lagana analysis ko simplify kar deta hai.',
      },
    ],
    exercise:
      'Ek din ke market news me "FII ne itna crore becha" jaisa headline dhoondein. Uske saath us din ka index move, currency move aur global market ka move compare karein. Likh kar batao: kya ek number se trend explain karna possible tha?',
  },
};
