import type { LessonBodyRegistry } from './builder';
import { callout, diagram, example, formula, h, list, olist, p, table, terms } from './builder';

export const level5: LessonBodyRegistry = {
  /* ================================================================ */
  /* MODULE 1 — Derivatives                                           */
  /* ================================================================ */
  'advanced-market-education/derivatives/futures-contracts': {
    objectives: [
      'Futures contract ka structure.',
      'Margin, mark-to-market aur expiry.',
      'Futures vs spot aur contango/backwardation.',
    ],
    intro:
      'Futures ek contractual obligation hai — ek fixed price par, future date par, kuch kharidne ya bechne ka. Ye hedging aur directional trading dono ke liye use hote hain. Is lesson me hum contract mechanics dekhenge.',
    blocks: [
      h('Contract structure'),
      table(
        ['Term', 'Meaning', 'Example (NIFTY futures)'],
        [
          ['Underlying', 'Kya trade ho raha hai', 'NIFTY 50 index'],
          ['Lot size', 'Minimum contract quantity', '25 (SEBI ne badhaya)'],
          ['Expiry', 'Contract ka last day', 'Monthly/weekly (limited now)'],
          ['Settlement', 'Cash ya physical', 'Cash settled (index)'],
          ['Margin', 'Collateral required', 'SPAN + exposure margin'],
          ['Tick size', 'Minimum price move', '0.05'],
        ],
      ),
      h('Margin mechanics'),
      formula(
        'Initial margin',
        'Initial margin ≈ SPAN margin + Exposure margin\nLeverage = Contract value ÷ Margin required',
        'NIFTY at 25,000 × lot 25 = ₹6,25,000 contract value. Margin ~₹1,20,000 → leverage ~5.2x.',
      ),
      p(
        'Margin ka matlab: aapko poora contract value nahi dena, sirf ek percentage. Ye leverage hai. Aur ye **daily mark-to-market** hota hai — har din ke end me aapka P&L cash me settle hota hai.',
      ),
      callout(
        'warn',
        'Mark-to-market ka practical impact',
        'Agar aap long futures me hain aur market gira, to aapke margin account se daily loss debit hoga. Margin threshold ke neeche jaate hi broker **margin call** deta hai aur square-off kar sakta hai. Iska matlab: aap ultimately sahi ho sakte hain, par interim drawdown se position close ho sakti hai. Ye futures ka structural risk hai.',
      ),
      h('Futures vs spot'),
      table(
        ['', 'Spot', 'Futures'],
        [
          ['Settlement', 'Immediate (T+1)', 'Future date'],
          ['Obligation', 'Ownership transfer', 'Contractual'],
          ['Leverage', 'None (full payment)', 'Margin-based'],
          ['Expiry', 'No', 'Yes'],
          ['Additional risk', 'Market risk', 'Leverage + MTM + basis risk'],
        ],
      ),
      h('Basis aur rollover'),
      terms([
        { term: 'Basis', meaning: 'Futures price − Spot price. Positive = contango, negative = backwardation.' },
        { term: 'Contango', meaning: 'Futures premium — carry cost (interest, storage) ka reflection. Long rollover me cost.' },
        { term: 'Backwardation', meaning: 'Futures discount — convenience yield ya supply tightness.' },
        { term: 'Rollover', meaning: 'Expiry se pehle next month contract me shift karna.' },
        { term: 'Open interest (OI)', meaning: 'Total outstanding contracts — liquidity aur positioning ka measure.' },
      ]),
      example(
        'Basis calculation',
        'Spot NIFTY = 25,000. Current month futures = 25,050. Basis = +50 (contango). Next month = 25,120. Rollover cost = 70 points. Agar aap monthly roll karte hain, to saal ka rollover cost ~800+ points ho sakta hai — ye ek hidden drag hai. Isliye long futures ko short-term instrument samjhein.',
        [
          'Basis = futures − spot.',
          'Contango = positive basis (cost for longs).',
          'Rollover costs compound.',
          'Long-term exposure futures me expensive ho sakta hai.',
        ],
      ),
      callout(
        'danger',
        'India me retail futures ka context',
        'SEBI ne retail derivatives participation ko regulate kiya hai kyunki data ne consistent losses dikhaye hain. Lot sizes badhaye gaye, weekly expiries limit kiye gaye, aur margin rules strict kiye gaye. Ye education platform koi futures trade recommend nahi karta — sirf mechanics padhata hai.',
      ),
    ],
    summary: [
      'Futures contractual obligation hai, fixed price aur future date par.',
      'Margin leverage deta hai par daily mark-to-market se forced liquidation risk.',
      'Basis = futures − spot; contango/backwardation carry cost dikhate hain.',
      'Rollover cost long-term futures position me material drag hai.',
      'SEBI ne retail derivatives participation regulate kiya hai.',
    ],
    mistakes: [
      'Leverage ko "kam capital" ka fayda samajhna.',
      'Mark-to-market risk ignore karna.',
      'Futures ko long-term holding instrument samajhna.',
    ],
    keyPoints: [
      'Futures = leverage + obligation + expiry.',
      'MTM forced liquidation ka risk create karta hai.',
      'Rollover cost compound hota hai.',
    ],
    quiz: [
      {
        q: 'Futures me mark-to-market ka matlab kya hai?',
        options: [
          'Sirf expiry par P&L settle',
          'Daily P&L cash me settle hota hai',
          'Price fix rehti hai',
          'Koi P&L nahi',
        ],
        answer: 1,
        explain: 'Daily MTM se margin account adjust hota hai — drawdown par forced liquidation possible.',
      },
      {
        q: 'Contango me long position ke liye rollover kya hai?',
        options: ['Benefit', 'Cost', 'Neutral', 'Koi asar nahi'],
        answer: 1,
        explain: 'Contango me aage ka contract mehanga hota hai — roll karte waqt premium dena padta hai.',
      },
      {
        q: 'Basis ka formula kya hai?',
        options: [
          'Spot − Futures',
          'Futures − Spot',
          'Volume × price',
          'Margin ÷ contract value',
        ],
        answer: 1,
        explain: 'Basis = futures price − spot price. Positive = contango.',
      },
    ],
    exercise:
      'Kisi index futures ka spot aur futures price dekhein. Basis calculate karein. Open interest note karein. Likh kar batao: contango hai ya backwardation, aur long trader ke liye implication kya hai?',
  },

  'advanced-market-education/derivatives/options-fundamentals': {
    objectives: [
      'Call aur put options ka structure.',
      'Premium ke components.',
      'Buyer vs seller ka risk profile.',
    ],
    intro:
      'Options ek "right" hai — obligation nahi. Ye distinction poore risk profile ko badal deta hai. Is lesson me hum calls, puts, premiums aur four basic positions dekhenge.',
    blocks: [
      h('Call option'),
      p(
        'Call buyer ko **right** milta hai (obligation nahi) ki wo underlying ko strike price par kharid sake, expiry tak. Agar price strike se upar jaata hai, option valuable ho jaata hai. Buyer premium pay karta hai; seller premium collect karta hai aur obligation leta hai.',
      ),
      h('Put option'),
      p(
        'Put buyer ko right milta hai ki wo underlying ko strike price par bech sake. Agar price strike se neeche girta hai, put valuable hota hai. Put buying = bearish, ya portfolio insurance.',
      ),
      h('Four basic positions'),
      table(
        ['Position', 'View', 'Max profit', 'Max loss', 'Premium'],
        [
          ['Long call', 'Bullish', 'Unlimited', 'Premium paid', 'Pay'],
          ['Short call', 'Bearish/neutral', 'Premium received', 'Unlimited (naked)', 'Receive'],
          ['Long put', 'Bearish', 'Strike − premium (down to zero)', 'Premium paid', 'Pay'],
          ['Short put', 'Bullish/neutral', 'Premium received', 'Strike − premium', 'Receive'],
        ],
      ),
      diagram(
        'option-payoff',
        'Long call payoff',
        'Loss premium tak limited; upside unlimited.',
        'A payoff diagram for a long call option. The horizontal axis is the underlying price at expiry, the vertical axis is profit and loss. Below the strike price the line is flat at a small negative value equal to the premium paid; above the strike it rises linearly. Breakeven is marked at strike plus premium.',
      ),
      h('Premium ke components'),
      formula(
        'Option premium',
        'Premium = Intrinsic value + Time value\nIntrinsic value (call) = max(Spot − Strike, 0)\nIntrinsic value (put) = max(Strike − Spot, 0)',
        'NIFTY at 25,200, call strike 25,000: intrinsic = 200. Agar premium 260 hai, time value = 60.',
      ),
      p(
        'Time value expiry ke saath continuously kam hota hai (theta decay). Expiry par time value zero ho jaata hai — sirf intrinsic bachta hai. Isliye option **buying** ek "melting asset" hai; option **selling** time decay se earn karta hai (par risk leta hai).',
      ),
      example(
        'Long call ka practical math',
        'NIFTY 25,000. Aap 25,100 strike ka call ₹80 me kharidte hain. Lot size 25. Cost = 80 × 25 = ₹2,000. Breakeven = 25,100 + 80 = 25,180. Agar expiry par NIFTY 25,400 hai: intrinsic = 300, profit = (300 − 80) × 25 = ₹5,500. Agar 25,050 hai: option worthless, loss = ₹2,000 (100%).',
        [
          'Premium cost = premium × lot size.',
          'Breakeven = strike + premium (call buyer).',
          'Max loss = premium paid.',
          'Direction sahi hone par bhi premium recover karna zaroori hai.',
        ],
      ),
      callout(
        'warn',
        '"Limited risk" ka misnomer',
        'Option buying me max loss premium tak limited hota hai — technically sahi. Par practically: agar aap baar baar ₹2,000 ke options kharidte hain aur 70% expire worthless hote hain, to aapka capital systematically erode hota hai. "Limited risk" ka matlab "low risk" nahi hota. Premium ek repeated cost hai.',
      ),
      h('Buyer vs seller'),
      table(
        ['', 'Buyer', 'Seller (writer)'],
        [
          ['Right/obligation', 'Right', 'Obligation'],
          ['Cash flow', 'Pays premium', 'Receives premium'],
          ['Time decay', 'Negative (theta cost)', 'Positive (theta income)'],
          ['Probability of profit', 'Lower (needs movement)', 'Higher (needs no movement)'],
          ['Risk profile', 'Defined loss, asymmetric upside', 'Defined gain, asymmetric risk'],
          ['Skill needed', 'Timing + direction + volatility', 'Risk management critical'],
        ],
      ),
      callout(
        'danger',
        'Naked option selling ka real risk',
        'Naked short call me loss theoretically unlimited hai. Naked short put me loss strike − premium tak bada hai. Margin requirements hain par gap moves me loss margin se kaafi bada ho sakta hai. **Retail ke liye naked option selling highly risky hai** — aur India me kai cases me margining structures ne account wipe-outs produce kiye hain. Learnyx koi option strategy recommend nahi karta.',
      ),
      h('Indian options terminology'),
      terms([
        { term: 'Spot', meaning: 'Underlying ka current market price.' },
        { term: 'Strike', meaning: 'Exercise price.' },
        { term: 'Expiry', meaning: 'Last date; India me weekly/monthly expiries common thi (SEBI ne restrict kiye).' },
        { term: 'Premium', meaning: 'Option ka price.' },
        { term: 'Lot size', meaning: 'Contract ka minimum quantity.' },
        { term: 'Open interest', meaning: 'Outstanding contracts — liquidity indicator.' },
      ]),
    ],
    summary: [
      'Call = right to buy; put = right to sell; buyer premium pay karta hai.',
      'Premium = intrinsic value + time value.',
      'Time value expiry ke saath zero ho jaata hai (theta decay).',
      'Option buying = defined loss but repeated premium cost.',
      'Naked option selling me risk asymmetric aur severe hai.',
    ],
    mistakes: [
      '"Limited risk" ko "low risk" samajhna.',
      'Premium ko underlying ke price ke barabar samajhna.',
      'Time decay ko ignore karke long-term option hold karna.',
    ],
    keyPoints: [
      'Option = right, not obligation.',
      'Premium two components: intrinsic + time.',
      'Theta buying ka dushman, selling ka dost.',
    ],
    quiz: [
      {
        q: 'Long call buyer ka maximum loss kya hai?',
        options: ['Unlimited', 'Premium paid', 'Strike price', 'Spot price'],
        answer: 1,
        explain: 'Long call me max loss premium tak limited hai — par 100% premium loss ho sakta hai.',
      },
      {
        q: 'NIFTY 25,200, call strike 25,000, premium 260. Time value?',
        options: ['₹260', '₹60', '₹200', '₹460'],
        answer: 1,
        explain: 'Intrinsic = 25,200 − 25,000 = 200. Premium 260 − intrinsic 200 = time value 60.',
      },
      {
        q: 'Time decay kis position ke liye favourable hai?',
        options: ['Long option', 'Short option', 'Spot buying', 'Futures long'],
        answer: 1,
        explain: 'Option seller premium collect karta hai — time value erode hone se uske favour me kaam karta hai.',
      },
    ],
    exercise:
      'Kisi index ke options chain dekhein (public data). Ek call aur ek put ka premium note karein different strikes par. Calculate karein: intrinsic aur time value alag-alag. Likh kar batao: kaunse strike me time value sabse zyada hai?',
  },

  'advanced-market-education/derivatives/moneyness-and-payoffs': {
    objectives: [
      'ITM, ATM, OTM ka concept.',
      'Payoff diagrams kaise padhein.',
      'Strategy combinations ka basic idea.',
    ],
    intro:
      'Moneyness batati hai option strike aur current price ka relationship kya hai. Payoff diagrams batate hain ki expiry par different prices par profit/loss kya hoga. Ye dono options analysis ki basic language hain.',
    blocks: [
      h('Moneyness'),
      table(
        ['Option', 'ITM (in-the-money)', 'ATM (at-the-money)', 'OTM (out-of-the-money)'],
        [
          ['Call', 'Spot > Strike', 'Spot ≈ Strike', 'Spot < Strike'],
          ['Put', 'Spot < Strike', 'Spot ≈ Strike', 'Spot > Strike'],
        ],
      ),
      example(
        'Moneyness example',
        'NIFTY spot = 25,000. Call strike 24,800 → ITM (intrinsic 200). Strike 25,000 → ATM. Strike 25,300 → OTM (intrinsic 0). Put strike 25,300 → ITM (intrinsic 300). Put strike 24,700 → OTM.',
        [
          'Call ITM: spot strike se upar.',
          'Put ITM: spot strike se neeche.',
          'ATM: sabse zyada time value, sabse zyada gamma.',
        ],
      ),
      h('Payoff diagram kaise padhein'),
      list([
        'X-axis: underlying price at expiry.',
        'Y-axis: profit/loss.',
        'Kink points strike price par hote hain.',
        'Breakeven point(s) note karein — zero P&L crossing.',
        'Max loss/max profit areas identify karein.',
      ]),
      diagram(
        'option-payoff',
        'Basic payoffs',
        'Long call, long put, short call, short put ke shapes.',
        'A four-panel payoff chart. Top left: long call — flat loss equal to premium below the strike, rising linearly above. Top right: long put — flat loss above the strike, rising profit below. Bottom left: short call — flat profit equal to premium above the strike, unbounded loss below. Bottom right: short put — flat profit above, large loss below.',
      ),
      h('Common strategies — mechanics only'),
      table(
        ['Strategy', 'Structure', 'View', 'Risk'],
        [
          ['Long straddle', 'Buy ATM call + ATM put', 'Big move (either direction)', 'Max loss = both premiums'],
          ['Short straddle', 'Sell ATM call + ATM put', 'No big move', 'Unlimited; requires high margin'],
          ['Bull call spread', 'Buy lower strike call, sell higher strike call', 'Moderate bullish', 'Limited to net premium'],
          ['Bear put spread', 'Buy higher strike put, sell lower strike put', 'Moderate bearish', 'Limited to net premium'],
          ['Covered call', 'Long underlying + sell call', 'Mildly bullish/neutral', 'Limited upside, downside full'],
          ['Protective put', 'Long underlying + buy put', 'Bullish with insurance', 'Premium cost'],
        ],
      ),
      callout(
        'warn',
        'Strategies ko "recipes" ki tarah na treat karein',
        'Har strategy ka payoff structure hai — usse samajhna zaroori hai. Par "straddle chal raha hai, apply kar do" approach galat hai kyunki implied volatility, time to expiry aur liquidity conditions matter karte hain. Learnyx me hum mechanics padhate hain — recommendations nahi dete.',
      ),
      h('Volatility ka role'),
      p(
        'Same spot, strike aur expiry par bhi option premium implied volatility (IV) par depend karta hai. High IV = mehanga premium. Volatility strategies (straddle, strangle) IV ke direction par depend karti hain — sirf price direction par nahi.',
      ),
      callout(
        'danger',
        'IV crush ka classic trap',
        'Earnings ya event se pehle IV badh jaati hai. Event ke baad IV collapse hoti hai. Agar aap event se pehle straddle kharidte hain aur price move karta hai bhi, IV crush se aap loss me ho sakte hain. Ye sabse common retail option trap hai. Learnyx me is concept ko Advanced Concepts lesson me detail se dekha gaya hai.',
      ),
      h('Payoff visualisation ka value'),
      list([
        'Position lene se pehle max loss/profit clear karein.',
        'Breakeven points calculate karein.',
        'Combination me net premium aur net payoff dekhein.',
        'Liquidity check karein — penny options me wide spreads.',
      ]),
    ],
    summary: [
      'ITM/ATM/OTM strike aur spot relationship batate hain.',
      'Payoff diagram expiry par P&L ka visual map hai.',
      'ATM options me sabse zyada time value hota hai.',
      'Strategies payoff structures hain — volatility environment matters.',
      'IV crush event-driven option positions ka classic risk hai.',
    ],
    mistakes: [
      'OTM ko "sasta option" samajhna.',
      'Payoff diagrams ignore karke strategy lena.',
      'Event se pehle IV level check na karna.',
    ],
    keyPoints: [
      'Moneyness call aur put me opposite hoti hai.',
      'ATM = max time value, max gamma.',
      'Payoff diagram = risk clarity tool.',
    ],
    quiz: [
      {
        q: 'NIFTY 25,000. Call strike 25,300. Ye option kaisa hai?',
        options: ['ITM', 'ATM', 'OTM', 'Invalid'],
        answer: 2,
        explain: 'Call me spot < strike = OTM (out-of-the-money), intrinsic zero.',
      },
      {
        q: 'Kis option me time value sabse zyada hota hai?',
        options: ['Deep ITM', 'ATM', 'Deep OTM', 'Sabka barabar'],
        answer: 1,
        explain: 'ATM option me sabse zyada time value aur gamma hota hai.',
      },
      {
        q: 'Long straddle kya expect karta hai?',
        options: [
          'No movement',
          'Big move (either direction)',
          'Sirf upward move',
          'Sirf downward move',
        ],
        answer: 1,
        explain: 'Straddle = call + put; dono side ki movement profitable hai, par premium cost recover karna zaroori hai.',
      },
    ],
    exercise:
      'Ek options chain se ATM, 2 strikes ITM aur 2 strikes OTM ke premiums note karein. Har ek ka intrinsic aur time value calculate karein. Note karein: time value kis taraf sabse zyada hai?',
  },

  /* ================================================================ */
  /* MODULE 2 — Options Greeks                                        */
  /* ================================================================ */
  'advanced-market-education/options-greeks/delta-and-gamma': {
    objectives: [
      'Delta ka mathematical matlab.',
      'Gamma aur delta ka relationship.',
      'Greeks ka practical interpretation.',
    ],
    intro:
      'Greeks option price sensitivity measures hain. Delta batata hai underlying move se option price kitna badlega; gamma batata hai delta khud kitni tezi se badlega. Ye calculus concepts hain — par intuiton se samajh sakte hain.',
    blocks: [
      h('Delta'),
      formula(
        'Delta',
        'Delta = ∂(Option price) ÷ ∂(Underlying price)',
        'Call delta 0 to +1. Put delta 0 to −1 (ya magnitude 0 to 1). ATM options ≈ 0.5.',
      ),
      table(
        ['Position', 'Delta range', 'Interpretation'],
        [
          ['Deep OTM call', '0.05–0.20', 'Underlying move ka chhota asar'],
          ['ATM call', '≈0.50', 'Half sensitivity'],
          ['Deep ITM call', '0.80–0.99', 'Almost stock jaisa behave'],
          ['Deep OTM put', '−0.05 to −0.20', 'Chhota negative sensitivity'],
          ['ATM put', '≈−0.50', 'Half negative sensitivity'],
          ['Deep ITM put', '−0.80 to −0.99', 'Stock short jaisa'],
        ],
      ),
      example(
        'Delta ka practical math',
        'NIFTY 25,000. Aapka call strike 25,000 (ATM), delta = 0.5. Agar NIFTY 100 points badhta hai: option price ≈ 50 points badhega (delta × move). Lot 25 → ₹1,250 profit. Delta linear approximation hai — bade moves par gamma ka asar aayega.',
        [
          'Delta × underlying move ≈ option price change.',
          'Lot size se multiply karke rupee P&L.',
          'Delta linear estimate hai — chhote moves ke liye.',
          'Bade moves par gamma adjust karta hai.',
        ],
      ),
      h('Gamma'),
      formula(
        'Gamma',
        'Gamma = ∂(Delta) ÷ ∂(Underlying price)',
        'Gamma sabse zyada ATM options me hota hai, especially expiry ke paas.',
      ),
      p(
        'Gamma batata hai delta kitni tezi se change hota hai. High gamma ka matlab: underlying move ke saath delta rapidly badalta hai. Isliye ATM options expiry ke paas **extremely volatile** hote hain — thoda move, option price ka bada swing.',
      ),
      callout(
        'warn',
        'Expiry day gamma risk',
        'Expiry ke din ATM options ka gamma bahut high hota hai. Price ek side move kare to option exponentially badh sakta hai; ulta side to zero ho sakta hai. Retail ke liye ye **worst risk-reward environment** hai — direction sahi hone par bhi timing galat ho to poora premium ja sakta hai. Learnyx yahan koi trade recommend nahi karta.',
      ),
      h('Delta ko position sizing ke liye use karna'),
      p(
        'Delta ko "equivalent stock position" batane ke liye use kiya ja sakta hai. Agar aap 10 lots ATM call (delta 0.5, lot 25) rakh rahe hain, to aapka delta-equivalent position = 10 × 25 × 0.5 = 125 shares of underlying. Ye risk measurement ka useful way hai.',
      ),
      formula(
        'Position delta',
        'Position delta = Σ (Option delta × Lot size × Number of lots) × direction',
        'Long call: positive delta. Short call: negative. Long put: negative. Short put: positive.',
      ),
      h('Delta se probability ka intuition'),
      p(
        'Approximately, delta ko "expiry par ITM hone ki probability" ki tarah bhi interpret kiya jaata hai. 0.30 delta call ≈ 30% chance ITM expiry par. Ye approximation hai (exact nahi), par intuition helpful hai — high-delta options me ITM expire hone ki zyada chance hoti hai.',
      ),
      callout(
        'info',
        'Greeks ka honest status',
        'Greeks Black-Scholes jaise models se aate hain, jo assumptions karte hain (lognormal returns, constant volatility, no jumps). Reality me ye assumptions violate hote hain. Isliye Greeks **useful approximations** hain, exact predictions nahi. Model risk real hai — 1987 aur 2008 me "impossible" moves ne models ko challenge kiya.',
      ),
      table(
        ['Greek', 'Measures', 'Highest where'],
        [
          ['Delta', 'Price sensitivity', 'Deep ITM (approaches ±1)'],
          ['Gamma', 'Delta change rate', 'ATM, expiry ke paas'],
          ['Theta', 'Time decay', 'ATM, expiry ke paas'],
          ['Vega', 'Volatility sensitivity', 'ATM, longer expiry'],
          ['Rho', 'Interest rate sensitivity', 'Longer expiry, ITM'],
        ],
      ),
    ],
    summary: [
      'Delta underlying move par option price sensitivity hai.',
      'ATM call delta ≈ 0.5; deep ITM ≈ 1.',
      'Gamma delta ka rate of change hai; ATM expiry ke paas highest.',
      'Position delta se equivalent stock exposure nikalta hai.',
      'Greeks model-based approximations hain, exact predictions nahi.',
    ],
    mistakes: [
      'Delta ko constant samajhna (gamma ignore karna).',
      'Expiry day ATM options ko normal treat karna.',
      'Greeks ko precise prediction samajhna.',
    ],
    keyPoints: [
      'Delta = directional exposure.',
      'Gamma = acceleration of delta.',
      'ATM expiry options highest risk environment.',
    ],
    quiz: [
      {
        q: 'ATM call ka delta approximately kya hota hai?',
        options: ['0', '0.5', '1.0', '−0.5'],
        answer: 1,
        explain: 'ATM call delta ≈ 0.5 — roughly half sensitivity to underlying moves.',
      },
      {
        q: 'Gamma sabse zyada kahan hota hai?',
        options: ['Deep ITM', 'ATM expiry ke paas', 'Deep OTM long expiry', 'Sabka barabar'],
        answer: 1,
        explain: 'ATM options me delta sabse tezi se change hota hai — particularly expiry ke paas.',
      },
      {
        q: 'NIFTY 100 points up, ATM call delta 0.5. Option price lagbhag kitna badhega?',
        options: ['25 points', '50 points', '100 points', '0'],
        answer: 1,
        explain: 'Delta × move = 0.5 × 100 = 50 points (linear approximation).',
      },
    ],
    exercise:
      'Options chain me 5 strikes (2 ITM, ATM, 2 OTM) ke delta note karein. Values compare karein. Likh kar batao: delta ka pattern kaisa hai aur kyun?',
  },

  'advanced-market-education/options-greeks/theta-vega-rho': {
    objectives: [
      'Theta decay ka mechanism aur impact.',
      'Vega aur implied volatility ka relationship.',
      'Rho ka role aur relevance.',
    ],
    intro:
      'Theta time ka price hai, Vega volatility ka price. Options trading me aksar direction se zyada ye do Greeks decide karte hain profit ya loss. Is lesson me hum inhe detail me dekhenge.',
    blocks: [
      h('Theta'),
      formula(
        'Theta',
        'Theta = ∂(Option price) ÷ ∂(Time)',
        'Typically per-day decay measure. ATM options ke paas theta sabse zyada.',
      ),
      p(
        'Theta negative hota hai option buyer ke liye — har din premium thoda kam hota hai. Decay linear nahi hai: expiry ke last 30 din me accelerate hota hai. 30-day ATM option ka theta 7-day option se bahut kam hota hai per day.',
      ),
      example(
        'Theta decay curve',
        'ATM option premium ₹100 with 60 din bache. Initial theta ~₹1.2/day. 30 din bache par theta ~₹2.0/day. 7 din bache par theta ~₹5.5/day. Expiry par premium zero (agar ATM/OTM raha). Isliye 60 din ka option hold karna 7 din se alag experience hai.',
        [
          'Theta time ke saath accelerate karta hai.',
          'Last week me decay sabse fast.',
          'Buyer ke liye time dushman hai.',
          'Seller ke liye time income hai (par risk leta hai).',
        ],
      ),
      callout(
        'warn',
        'Option buying ka math problem',
        'Agar aap direction sahi bhi ho jaayein, theta aapka profit kha sakta hai. Example: NIFTY 100 points upar gaya (delta se ₹50 gain) par 2 din me theta se ₹30 loss → net ₹20 gain. Isliye option buying me **timing bhi direction jitna important** hai. Ye ek structural disadvantage hai.',
      ),
      h('Vega'),
      formula(
        'Vega',
        'Vega = ∂(Option price) ÷ ∂(Implied volatility)',
        'Vega ko 1% IV change ke against option price change ke roop me report kiya jaata hai.',
      ),
      p(
        'Implied volatility (IV) market ka expectation hai future volatility ka. IV badhne par option premiums badhte hain (dono call aur put). Vega longest expiry aur ATM options me sabse zyada hota hai.',
      ),
      table(
        ['Scenario', 'IV', 'Option buyer', 'Option seller'],
        [
          ['Event se pehle', 'High (elevated)', 'Expensive entry', 'Attractive premium'],
          ['Event ke baad', 'Crash (IV crush)', 'Loss even if direction right', 'Profit from decay'],
          ['Calm market', 'Low', 'Cheap entry', 'Low premium'],
          ['Panic', 'Very high', 'Very expensive', 'High premium, high risk'],
        ],
      ),
      callout(
        'danger',
        'IV crush ka concrete example',
        'Earnings se pehle stock ₹1,000, ATM call premium ₹45 (IV high). Earnings ke baad stock ₹1,030 (3% up move — direction sahi). Call ka intrinsic = ₹30. Par IV collapse se premium maybe ₹32 ho jaaye → aapka profit ₹32 − ₹45 = −₹13 (loss!). Direction sahi, phir bhi loss. Ye "IV crush" trap hai jo naye traders ko destroy karta hai.',
      ),
      h('Rho'),
      formula(
        'Rho',
        'Rho = ∂(Option price) ÷ ∂(Interest rate)',
        'Call rho positive, put rho negative (usually).',
      ),
      p(
        'Rho interest rate sensitivity measure karta hai. Short-dated options me rho negligible hota hai; long-dated (LEAPS) me relevant ho sakta hai. Retail short-term trading me rho ka asar usually minor hai — isliye kai traders ise ignore karte hain.',
      ),
      h('Greeks ka combined view'),
      table(
        ['Greek', 'Buyer', 'Seller', 'Biggest when'],
        [
          ['Delta', 'Directional exposure', 'Opposite', 'Deep ITM'],
          ['Gamma', 'Accelerating gains/losses', 'Accelerating losses', 'ATM near expiry'],
          ['Theta', 'Negative (cost)', 'Positive (income)', 'ATM near expiry'],
          ['Vega', 'Positive (IV up = gain)', 'Negative', 'ATM long expiry'],
          ['Rho', 'Small', 'Small', 'Long expiry, ITM'],
        ],
      ),
      callout(
        'info',
        'Greeks ek saath padhein',
        'Ek Greek isolated nahi hota. ATM near-expiry option me delta ~0.5, gamma high, theta high, vega low. Deep ITM long-expiry option me delta ~0.9, gamma low, theta low, vega high. Isliye "kaunsa option best hai" ka koi simple answer nahi — depends on aapka view (direction, volatility, time).',
      ),
    ],
    summary: [
      'Theta time decay hai — buyer ke liye cost, seller ke liye income.',
      'Decay expiry ke paas accelerate hoti hai.',
      'Vega IV sensitivity hai; IV crush direction sahi hone par bhi loss de sakta hai.',
      'Rho interest rate sensitivity hai — short-dated me minor.',
      'Greeks combined decision framework dete hain.',
    ],
    mistakes: [
      'Theta ignore karke long-dated option hold karna.',
      'Event se pehle high IV par buy karna.',
      'Rho ko short-term me over-weight karna.',
    ],
    keyPoints: [
      'Time decay accelerates.',
      'IV collapse directional correctness ko override kar sakta hai.',
      'Greeks ek combined system hain.',
    ],
    quiz: [
      {
        q: 'Theta option buyer ke liye kya hai?',
        options: ['Income', 'Cost (premium decay)', 'Neutral', 'Gamma ka part'],
        answer: 1,
        explain: 'Theta negative hai buyer ke liye — har din premium kam hota hai.',
      },
      {
        q: 'IV crush ka matlab kya hai?',
        options: [
          'Underlying price girna',
          'Implied volatility collapse — option premium gir jaata hai, direction sahi hone par bhi loss',
          'Volume zero',
          'Expiry cancel hona',
        ],
        answer: 1,
        explain: 'Event ke baad IV collapse hoti hai — premium gir jaata hai even if directional move favourable ho.',
      },
      {
        q: 'Vega sabse zyada kahan hota hai?',
        options: ['ATM long expiry', 'Deep OTM short expiry', 'Deep ITM short expiry', 'Sabka barabar'],
        answer: 0,
        explain: 'ATM options with longer expiry me volatility sensitivity (vega) sabse zyada hoti hai.',
      },
    ],
    exercise:
      'Options chain me same strike ka 1-week aur 1-month option compare karein. Premium aur theta note karein. Likh kar batao: time decay per day kaunse option me zyada hai aur kyun?',
  },

  /* ================================================================ */
  /* MODULE 3 — Advanced Market Concepts                              */
  /* ================================================================ */
  'advanced-market-education/advanced-market-concepts/volatility-and-open-interest': {
    objectives: [
      'Historical vs implied volatility.',
      'Open interest ka interpretation.',
      'Volatility index (VIX) ka role.',
    ],
    intro:
      'Volatility aur open interest market ki "hidden" information dete hain — jo price chart se nahi dikhti. Ye concepts options market ko samajhne ke liye essential hain.',
    blocks: [
      h('Historical vs implied volatility'),
      table(
        ['', 'Historical (realized)', 'Implied'],
        [
          ['Kya hai', 'Past returns ka standard deviation', 'Market ki future volatility expectation (options se derive)'],
          ['Direction', 'Backward-looking', 'Forward-looking'],
          ['Use', 'Volatility regimes, position sizing', 'Option pricing, event expectations'],
          ['Data', 'Price history', 'Option prices'],
        ],
      ),
      formula(
        'Annualised historical volatility (simple)',
        'σ_annual = σ_daily × √252',
        'Agar daily returns ka standard deviation 1.2% hai, annualised ≈ 1.2% × 15.87 ≈ 19%.',
      ),
      p(
        'Implied volatility usually historical se different hoti hai. Jab IV > HV (volatility premium), options mehange hote hain — sellers ko structural edge milta hai (par risk bhi). Jab IV < HV, options saste lagte hain.',
      ),
      callout(
        'info',
        'Volatility premium',
        'Historical evidence suggests implied volatility typically historical se thodi premium par trade karti hai — ye "variance risk premium" kehlata hai. Kyun? Kyunki investors downside protection ke liye zyada pay karne ko tayyar hote hain. Par ye edge **selling volatility** ko attractive batata hai — jabki tail risk (crash) sellers ko destroy kar sakta hai. Risk premium free money nahi hai.',
      ),
      h('Open Interest (OI)'),
      terms([
        { term: 'Open interest', meaning: 'Total outstanding contracts — active positions ki count.' },
        { term: 'Volume', meaning: 'Din me traded contracts ki count.' },
        { term: 'OI vs Volume', meaning: 'Volume activity hai; OI positions hain. Volume badhne par OI same reh sakta hai (intraday square-off).' },
        { term: 'Put-call ratio (PCR)', meaning: 'Put OI ÷ Call OI. Sentiment indicator (imperfect).' },
        { term: 'Max pain', meaning: 'Strike jahan option writers ka loss minimum hota hai. Contested concept.' },
      ]),
      table(
        ['Price', 'OI', 'Common interpretation'],
        [
          ['Up', 'Up', 'Long buildup — bullish'],
          ['Up', 'Down', 'Short covering — weak bullish'],
          ['Down', 'Up', 'Short buildup — bearish'],
          ['Down', 'Down', 'Long unwinding — weak bearish'],
        ],
      ),
      callout(
        'warn',
        'OI interpretation ka caution',
        'Ye table ek convention hai, law nahi. Futures me OI clear hota hai, par options me OI calls aur puts dono me hota hai — interpretation complex hai. Aur "max pain" ka predictive value contested hai. OI ko supporting context samjhein.',
      ),
      h('VIX aur volatility indices'),
      p(
        'VIX S&P 500 options se calculate hota hai (30-day implied volatility). India me India VIX NIFTY options se calculate hota hai. High VIX = high expected volatility = fear/uncertainty zyada. Par VIX direction nahi batata.',
      ),
      example(
        'VIX ka practical use',
        'India VIX 12 (low) → market complacent, options saste. India VIX 28 (high) → market fearful, options mehange. Ek systematic option seller low VIX me kam premium collect karta hai (low reward) aur high VIX me zyada (high reward par high risk). Isliye VIX level strategy choice ko affect karta hai.',
        [
          'Low VIX: cheap options, complacency.',
          'High VIX: expensive options, fear.',
          'VIX direction nahi, magnitude batata hai.',
          'Strategy selection VIX level se affected hoti hai.',
        ],
      ),
      h('Volatility regime aur strategy'),
      table(
        ['Regime', 'Characteristics', 'Options strategies (conceptually)'],
        [
          ['Low vol, trending', 'Small ranges, steady direction', 'Directional buying, call/put spreads'],
          ['High vol, trending', 'Big moves', 'Directional buying with wider stops'],
          ['Low vol, range', 'Tight range', 'Premium selling (high risk)'],
          ['High vol, range', 'Choppy, wide swings', 'Difficult — most strategies struggle'],
        ],
      ),
      callout(
        'danger',
        'Short volatility ka tail risk',
        'Volatility selling strategies consistent small gains dete hain — aur phir ek crash me saal bhar ka profit kha jaate hain. 2018 "Volmageddon" aur 2020 COVID moves ne aise strategies ko destroy kiya. Ye "picking up pennies in front of a steamroller" pattern hai. Learnyx koi volatility selling strategy recommend nahi karta — sirf concept padhata hai.',
      ),
    ],
    summary: [
      'Historical volatility past ka, implied future expectation ka measure hai.',
      'IV/HV ratio options ke relative cost ka context deta hai.',
      'Open interest positions dikhata hai, volume activity.',
      'VIX volatility expectation measure karta hai, direction nahi.',
      'Short volatility strategies consistent gains + rare catastrophic losses dete hain.',
    ],
    mistakes: [
      'VIX ko direction indicator samajhna.',
      'OI ko definitive positioning data samajhna.',
      'Short volatility ke tail risk ko ignore karna.',
    ],
    keyPoints: [
      'IV = forward expectation, HV = backward measure.',
      'OI positions, volume activity.',
      'Volatility selling = asymmetric risk profile.',
    ],
    quiz: [
      {
        q: 'Implied volatility kya measure karti hai?',
        options: [
          'Past price variation',
          'Market ki future volatility expectation (options prices se derive)',
          'Volume',
          'Open interest',
        ],
        answer: 1,
        explain: 'IV forward-looking hai — options ke market prices se back-calculate hoti hai.',
      },
      {
        q: 'Price gira aur OI badha. Common interpretation?',
        options: [
          'Long buildup',
          'Short buildup — bearish positioning',
          'Short covering',
          'Long unwinding',
        ],
        answer: 1,
        explain: 'Down move + rising OI = naye short positions ban rahe hain (bearish buildup).',
      },
      {
        q: 'Short volatility strategy ka main risk kya hai?',
        options: [
          'Chhota loss har trade',
          'Tail risk — rare big move saal bhar ka profit kha sakta hai',
          'Brokerage zyada',
          'Liquidity zero',
        ],
        answer: 1,
        explain: 'Consistent small gains + rare catastrophic loss — asymmetric risk profile.',
      },
    ],
    exercise:
      'India VIX ka 3 mahine ka chart dekhein. Note karein: high VIX periods aur market moves ka relation. Likh kar batao: VIX ne reversal predict kiya ya nahi?',
  },

  'advanced-market-education/advanced-market-concepts/order-flow-and-microstructure': {
    objectives: [
      'Order flow ka concept aur data sources.',
      'Market microstructure ke elements.',
      'Market impact aur liquidity dynamics.',
    ],
    intro:
      'Microstructure wo "physics" hai ki orders price ko kaise move karte hain. Retail investors ke liye ye advanced topic hai, par iska basic samajhna execution quality ko improve karta hai.',
    blocks: [
      h('Order flow kya hai'),
      p(
        'Order flow = market me aane wale buy aur sell orders ka net balance aur unka behaviour. Agar aggressive market buys zyada hain, price upar jaata hai (asks consume hote hain). Aggressive sells zyada hain to price neeche.',
      ),
      terms([
        { term: 'Aggressive order', meaning: 'Market order jo spread cross karta hai — immediate execution.' },
        { term: 'Passive order', meaning: 'Limit order jo book me wait karta hai — liquidity provide karta hai.' },
        { term: 'Taker', meaning: 'Liquidity consumer (market order).' },
        { term: 'Maker', meaning: 'Liquidity provider (limit order).' },
        { term: 'Order imbalance', meaning: 'Bid vs ask volume ka imbalance.' },
      ]),
      h('Key concepts'),
      table(
        ['Concept', 'Meaning', 'Practical impact'],
        [
          ['Spread', 'Bid-ask gap', 'Immediate cost'],
          ['Depth', 'Quantity at each level', 'Slippage risk'],
          ['Queue position', 'Aapka order book me kahan hai', 'Fill probability'],
          ['Latency', 'Order pahunchne ka time', 'Fill price'],
          ['Dark pools', 'Off-exchange liquidity', 'Price discovery impact'],
          ['Iceberg orders', 'Hidden quantity', 'Displayed depth misleading'],
        ],
      ),
      h('Market impact'),
      formula(
        'Market impact (approximate)',
        'Impact ∝ √(Order size ÷ Average daily volume)',
        'Square-root law common empirical observation hai. Double size → ~1.41x impact (approximately).',
      ),
      p(
        'Market impact ka matlab: aapka order price ko apne against move karta hai. Chhote orders me negligible, bade orders me material. Isliye large funds execution algorithms use karte hain (VWAP, TWAP, POV) — order ko time aur price levels me faila kar impact kam karte hain.',
      ),
      callout(
        'warn',
        'Retail "order flow" analysis ki limitation',
        'Retail ke paas level-2 data limited hota hai (aggregated depth, hidden orders nahi). Jo "smart money footprints" YouTube par bechte hain, wo mostly footprint charts ka interpretation hota hai — verified institutional data nahi. Real order flow analysis institutional infrastructure require karta hai. Retail ke liye practical focus: spread, depth aur slippage management.',
      ),
      h('Microstructure ka retail relevance'),
      olist([
        'Limit orders use karein spread capture ke liye (patient entries).',
        'Market orders avoid karein thin books me.',
        'Bade orders ko chhote chunks me todein.',
        'High-impact times (open/close) avoid karein bade orders ke liye.',
        'Illiquid stocks me extra caution — wide spreads.',
      ]),
      h('Dark pools aur off-exchange volume'),
      p(
        'US me significant volume dark pools (institutional off-exchange venues) me hota hai. Iska matlab displayed volume complete picture nahi deta. India me bhi block deals aur negotiated deals hote hain. Isliye volume numbers ko "complete truth" na samjhein.',
      ),
      callout(
        'info',
        'Algorithmic execution ke types',
        'VWAP (volume-weighted average price target), TWAP (time-weighted), POV (percent of volume), Implementation Shortfall (minimize total cost including impact). Ye institutions ke tools hain. Retail ke liye simple version: order ko manual chunks me todna, liquid times me.',
      ),
      h('Microstructure aur strategies'),
      list([
        'High-frequency strategies microstructure se profit karte hain (spread capture, latency arbitrage).',
        'Retail in strategies me compete nahi kar sakta.',
        'Par retail microstructure **knowledge** se apne costs kam kar sakta hai.',
        'Spread, depth aur timing ka awareness execution quality improve karta hai.',
      ]),
    ],
    summary: [
      'Order flow aggressive vs passive orders ka net effect hai.',
      'Market impact size ke square root ke proportional hota hai (empirically).',
      'Execution algorithms impact kam karne ke liye orders faila dete hain.',
      'Retail ke paas limited order flow data hota hai — claims verify na karein.',
      'Microstructure knowledge retail ko cost management me help karti hai.',
    ],
    mistakes: [
      '"Smart money footprint" claims ko fact samajhna.',
      'Thin books me market orders lagana.',
      'Bade orders ek saath place karna.',
    ],
    keyPoints: [
      'Spread + depth + latency = execution reality.',
      'Impact square-root law follow karta hai (approx).',
      'Retail edge = cost awareness, not flow prediction.',
    ],
    quiz: [
      {
        q: 'Market impact kis par depend karta hai (empirically)?',
        options: [
          'Sirf price',
          'Order size ÷ ADV ka square root (approximately)',
          'Sirf volume',
          'Sirf time of day',
        ],
        answer: 1,
        explain: 'Square-root law: impact order size / ADV ke square root ke proportional hota hai.',
      },
      {
        q: 'Maker vs taker kya hai?',
        options: [
          'Maker = market order, taker = limit order',
          'Maker = limit order (liquidity provide), taker = market order (liquidity consume)',
          'Dono same',
          'Maker sirf HFT hota hai',
        ],
        answer: 1,
        explain: 'Limit orders book me wait karte hain (maker); market orders spread cross karte hain (taker).',
      },
      {
        q: 'Retail ke liye order flow analysis ka realistic use kya hai?',
        options: [
          'Institutional flow predict karna',
          'Execution cost management — spread, depth, timing awareness',
          'HFT compete karna',
          'Dark pool access',
        ],
        answer: 1,
        explain: 'Retail flow data limited hai — realistic benefit cost awareness aur better execution hai.',
      },
    ],
    exercise:
      'Ek liquid aur ek illiquid stock ka order book compare karein. Spread %, top-5 depth note karein. Likh kar batao: ₹1 lakh ka order dono me kitna slippage create karega?',
  },

  /* ================================================================ */
  /* MODULE 4 — Algorithmic Trading                                   */
  /* ================================================================ */
  'advanced-market-education/algorithmic-trading/algo-trading-foundations': {
    objectives: [
      'Rule-based systems ka structure.',
      'Data requirements aur infrastructure.',
      'Algo trading ke realistic risks.',
    ],
    intro:
      'Algorithmic trading ka matlab automation hai — rules machine se execute karwana. Retail ke liye scope limited hai, par systematically sochna har trader ke liye valuable hai.',
    blocks: [
      h('Rule-based system ke components'),
      table(
        ['Component', 'Kya', 'Example'],
        [
          ['Data feed', 'Price/volume input', 'Daily OHLC, 15-min candles'],
          ['Signal logic', 'Entry conditions', 'Close > 20-day high AND volume > 1.5x avg'],
          ['Risk module', 'Position sizing, limits', '1% risk per trade'],
          ['Execution', 'Order placement', 'Market-on-open next day'],
          ['Monitoring', 'Alerts, logs', 'Daily P&L, error logs'],
          ['Kill switch', 'Emergency stop', 'Max daily loss 3% → disable'],
        ],
      ),
      h('Infrastructure requirements'),
      list([
        'Reliable data source (historical + live).',
        'Compute environment (server/VPS).',
        'Broker API with rate limits.',
        'Monitoring aur alerting.',
        'Backup connectivity.',
        'Logging aur audit trail.',
      ]),
      callout(
        'warn',
        'Retail algo reality check',
        '1) **Broker API limits** — rate limits, order-per-second caps. 2) **SEBI algo rules** — approved algorithms, broker registration, tagging requirements. 3) **Latency** — retail internet retail execution times me HFT compete nahi kar sakta. 4) **Data costs** — reliable data expensive hai. 5) **Overfitting risk** — automation overfit strategy ko *faster* zero tak le jaata hai. 6) **Operational risk** — bugs, disconnects, duplicate orders. Learnyx me hum sirf educational simulation dete hain — live automated execution nahi.',
      ),
      h('Automation kya solve karta hai, kya nahi'),
      table(
        ['Solve karta hai', 'Solve nahi karta'],
        [
          ['Emotional execution', 'Bad strategy'],
          ['Consistency', 'Overfitting'],
          ['Speed of execution (limited)', 'Latency disadvantage'],
          ['Record keeping', 'Market regime change'],
          ['Backtesting discipline', 'Tail risk'],
        ],
      ),
      p(
        'Sabse important insight: **automation aapki strategy ko better nahi banata** — wo sirf consistent execution deta hai. Agar strategy weak hai, automation usse consistently weak rakhta hai. Isliye strategy design aur validation pehle, automation baad me.',
      ),
      example(
        'Ek simple rule-based system',
        'Universe: NIFTY 50. Filter: close > 200 DMA. Entry: close > 20-day high with volume > 1.5x 20-day average. Stop: entry − 1.5 ATR(14). Target: 3R. Time stop: 15 days. Position: 1% risk. Rebalance: daily end-of-day. Ye simple hai, testable hai, aur overtrading nahi karta.',
        [
          'Universe limited (liquid).',
          'Thesis: momentum + trend filter.',
          'Risk rules explicit.',
          'End-of-day logic = no latency dependence.',
        ],
      ),
      callout(
        'info',
        'Educational simulator',
        'Learnyx Trading Lab ke **Strategy Builder** aur **Backtesting Simulator** aapko rules banane aur sample data par test karne dete hain. Ye real execution nahi karte — sirf education hai. Aap yahan overfitting, cost sensitivity aur drawdown behaviour ka real feel pa sakte hain.',
      ),
      h('Kyun systematic sochna har trader ke liye useful hai'),
      olist([
        'Rules likhne se ambiguity khatam hoti hai.',
        'Decisions pre-committed hote hain (emotion kam).',
        'Results measurable hote hain.',
        'Improvement targeted hoti hai (specific rule).',
        'Scale transparent hota hai.',
      ]),
    ],
    summary: [
      'Algo system = data + logic + risk + execution + monitoring.',
      'Retail me API, latency aur regulatory constraints hain.',
      'Automation consistency deta hai, edge nahi.',
      'Bad strategy ko automation faster destroy karta hai.',
      'Systematic thinking discretionary trading me bhi valuable hai.',
    ],
    mistakes: [
      'Automation ko edge samajhna.',
      'Latency-heavy strategies retail me try karna.',
      'Kill switch/monitoring plan na rakhna.',
    ],
    keyPoints: [
      'Rules + risk = system.',
      'Automation = consistency amplifier.',
      'Operational risk real hai.',
    ],
    quiz: [
      {
        q: 'Automation ka main benefit kya hai?',
        options: [
          'Strategy better ho jaati hai',
          'Consistent execution aur emotional control',
          'Latency advantage',
          'Free data',
        ],
        answer: 1,
        explain: 'Automation consistency deta hai — strategy quality par asar nahi karta.',
      },
      {
        q: 'Retail algo trading me sabse bada structural disadvantage kya hai?',
        options: [
          'Coding nahi seekh sakte',
          'Latency, API limits aur regulatory constraints',
          'Brokers available nahi',
          'Data free nahi hai',
        ],
        answer: 1,
        explain: 'Latency-dependent strategies infeasible hain; API aur compliance limits bhi hain.',
      },
      {
        q: 'Kill switch kya hai?',
        options: [
          'Broker ka login button',
          'Emergency stop jo system disable karta hai max loss hit hone par',
          'Data feed',
          'Backtest feature',
        ],
        answer: 1,
        explain: 'Kill switch operational risk management ka essential part hai — catastrophic loss se bachata hai.',
      },
    ],
    exercise:
      'Ek rule-based strategy design karein jo daily timeframe par kaam kare (no latency requirement). 6 components define karein. Strategy Builder me build karein aur backtest karein.',
  },

  'advanced-market-education/algorithmic-trading/python-and-data-analysis': {
    objectives: [
      'Python ka role financial analysis me.',
      'Basic pandas operations.',
      'A simple backtest ka structure.',
    ],
    intro:
      'Python financial analysis ka standard language hai. Is lesson me hum relevant basics denge — full programming course nahi, sirf wo operations jo trading analysis me actually use hote hain.',
    blocks: [
      h('Kyun Python'),
      list([
        'Free aur open source.',
        'pandas data manipulation ke liye standard.',
        'numpy numerical computing.',
        'matplotlib/plotly visualization.',
        'Large ecosystem (backtesting libraries).',
        'Transferable skill.',
      ]),
      h('Basic data structure'),
      p(
        'Financial data generally tabular hota hai: rows = dates, columns = open, high, low, close, volume. pandas me ye **DataFrame** hota hai.',
      ),
      h('Core operations (pseudo-code)'),
      table(
        ['Task', 'Approach'],
        [
          ['Load CSV', 'pd.read_csv("data.csv", parse_dates=["date"])'],
          ['Sort by date', 'df.sort_values("date")'],
          ['Calculate returns', 'df["close"].pct_change()'],
          ['Moving average', 'df["close"].rolling(20).mean()'],
          ['EMA', 'df["close"].ewm(span=20).mean()'],
          ['Daily range', 'df["high"] - df["low"]'],
          ['Volatility', 'returns.std() * sqrt(252)'],
          ['Resample weekly', 'df.resample("W").agg({...})'],
          ['Rolling max', 'df["close"].rolling(20).max()'],
          ['Shift for look-ahead', 'df["signal"].shift(1)'],
        ],
      ),
      callout(
        'danger',
        'Look-ahead bias ka code-level trap',
        'Sabse common bug: signal calculate karke **same candle** par trade execute kar lena. Real trading me aap candle close ke baad hi decision le sakte hain, execution agle candle par hoti hai. Solution: hamesha `signal.shift(1)` use karein. Ye ek line bug backtest ko 100% artificial bana sakta hai.',
      ),
      h('Simple backtest structure'),
      olist([
        '**Data load** — adjusted prices (splits/dividends).',
        '**Signal generation** — indicators calculate karein (rolling windows).',
        '**Shift signals** — one bar forward (look-ahead avoid).',
        '**Position sizing** — ATR-based.', 
        '**Trade simulation** — entry/exit, costs, slippage.',
        '**Metrics** — win rate, expectancy, drawdown, profit factor.',
        '**Out-of-sample test** — rules freeze karke.',
      ]),
      example(
        'Ek simple moving average crossover ka logic',
        'Signals: fast_ma = close.rolling(20).mean(); slow_ma = close.rolling(50).mean(); signal = (fast_ma > slow_ma).astype(int); position = signal.shift(1). Returns: daily_returns = close.pct_change(); strategy_returns = position * daily_returns − costs. Cumulative: (1 + strategy_returns).cumprod(). Ye minimal backtest hai — real implementation me slippage, position sizing, stops bhi chahiye.',
        [
          'Indicators rolling windows se.',
          'Signal shift(1) essential.',
          'Returns multiply position se.',
          'Costs subtract karein.',
          'Cumulative product se equity curve.',
        ],
      ),
      h('Data quality checks'),
      list([
        'Missing dates (holidays, gaps)?',
        'Adjusted prices? (splits/bonus ke liye)',
        'Duplicates?',
        'Outliers (bad ticks)?',
        'Volume zero days?',
        'Timezone consistency?',
      ]),
      callout(
        'warn',
        'Backtest engine ka honest reality',
        'Ek "simple" backtest me kai subtle assumptions hote hain: fill price, slippage model, position sizing, corporate actions, liquidity. Chhoti errors results ko dramatically badal sakti hain. Isliye: (1) simple strategies par focus karein, (2) small manual examples se verify karein, (3) out-of-sample test karein, (4) results ko "truth" na samjhein.',
      ),
      h('Learning path'),
      olist([
        'Python basics (variables, loops, functions).',
        'pandas (DataFrame operations).',
        'Financial data structure.',
        'Indicator calculation.',
        'Backtest logic + look-ahead avoidance.',
        'Metrics calculation.',
        'Out-of-sample validation.',
        'Paper trading integration.',
      ]),
      callout(
        'info',
        'Learnyx ka scope',
        'Ye lesson Python syntax ki full tutorial nahi hai — hum concepts aur financial-specific patterns dete hain. Aapke paas Trading Lab ke simulators hain jahan bina code likhe rules test kar sakte hain. Python tab seekhein jab aapko custom analysis chahiye ho.',
      ),
    ],
    summary: [
      'Python financial analysis ka standard hai (pandas, numpy).',
      'DataFrames tabular financial data ke liye ideal hain.',
      'look-ahead bias se bachne ke liye signal.shift(1) essential hai.',
      'Backtest structure: data → signal → shift → size → simulate → metrics.',
      'Data quality checks mandatory hain.',
    ],
    mistakes: [
      'Look-ahead bias (same-candle execution).',
      'Adjusted prices ignore karna.',
      'Costs zero par backtest karna.',
    ],
    keyPoints: [
      'pandas operations financial analysis ka core hain.',
      'shift(1) life-saver hai.',
      'Simple > complex for reliability.',
    ],
    quiz: [
      {
        q: 'Look-ahead bias se bachne ke liye kya karna chahiye?',
        options: [
          'Zyada data use karein',
          'Signal ko next bar par shift karein (signal.shift(1))',
          'Costs ignore karein',
          'Longer period use karein',
        ],
        answer: 1,
        explain: 'Signal ko ek bar aage shift karna ensure karta hai ki decision sirf available information par based ho.',
      },
      {
        q: 'Adjusted prices kyun zaroori hain?',
        options: [
          'Fast hote hain',
          'Splits/bonus/dividends ke liye historical prices comparable banate hain',
          'Volume include karte hain',
          'Free hote hain',
        ],
        answer: 1,
        explain: 'Corporate actions ke bina price series me artificial jumps aate hain jo backtest distort karte hain.',
      },
      {
        q: 'Annualised volatility ka simple formula kya hai?',
        options: [
          'daily σ × 252',
          'daily σ × √252',
          'daily σ ÷ 252',
          'daily σ × 100',
        ],
        answer: 1,
        explain: 'Time scaling square root se hoti hai: daily σ × √252 ≈ ×15.87.',
      },
    ],
    exercise:
      'Apne computer par (ya online Python environment me) ek CSV load karein. Close ka 20-day SMA calculate karein. Ek plot banayein. Ye aapka first financial data analysis hoga.',
  },

  /* ================================================================ */
  /* MODULE 5 — Portfolio and Risk Concepts                           */
  /* ================================================================ */
  'advanced-market-education/portfolio-risk/portfolio-basics': {
    objectives: [
      'Portfolio diversification ka math.',
      'Asset allocation ke approaches.',
      'Correlation ka role.',
    ],
    intro:
      'Portfolio theory basic hai par non-obvious: two risky assets ka combination ek asset se kam risky ho sakta hai — agar correlation kam ho. Ye diversification ka mathematical basis hai.',
    blocks: [
      h('Correlation ka core'),
      formula(
        'Two-asset portfolio volatility',
        'σp = √(w₁²σ₁² + w₂²σ₂² + 2w₁w₂ρσ₁σ₂)',
        'ρ = correlation. ρ = 1 par diversification zero; ρ < 1 par volatility kam hoti hai.',
      ),
      example(
        'Diversification math',
        'Asset A: σ = 20%, weight 50%. Asset B: σ = 20%, weight 50%. Agar ρ = 1: σp = 20%. Agar ρ = 0: σp = √(0.25×400 + 0.25×400) = √200 = 14.1%. Agar ρ = −0.5: σp = √(100 + 100 − 100) = 10%. Correlation kam hone se portfolio volatility dramatically kam hoti hai — same returns potential ke saath.',
        [
          'ρ = 1: 20% volatility.',
          'ρ = 0: 14.1% volatility.',
          'ρ = −0.5: 10% volatility.',
          'Diversification "free lunch" (risk kam, return same).',
        ],
      ),
      callout(
        'info',
        '"Only free lunch in finance"',
        'Diversification ko "the only free lunch" kaha jaata hai — aap risk kam kar sakte hain bina expected return kam kiye (agar correlations favourable hain). Par caveat: correlations estimate karna mushkil hai aur wo time ke saath change hoti hain. Crisis me correlation badhti hai exactly jab aapko diversification chahiye.',
      ),
      h('Asset allocation'),
      table(
        ['Approach', 'Method', 'Pros', 'Cons'],
        [
          ['Age-based', '(100 − age)% equity', 'Simple', 'Oversimplified'],
          ['Risk-based', 'Volatility target', 'Explicit risk', 'Complex to maintain'],
          ['Strategic', 'Long-term target weights', 'Discipline', 'Requires rebalancing'],
          ['Tactical', 'Short-term tilts', 'Responsive', 'Timing risk'],
          ['Risk parity', 'Equal risk contribution', 'Balanced risk', 'Leverage often needed'],
          ['Core-satellite', 'Index core + active satellites', 'Cost +  alpha', 'Complexity'],
        ],
      ),
      h('Rebalancing'),
      p(
        'Rebalancing = target weights restore karna. Equity badh jaaye to bech kar bonds kharidna. Ye mechanical selling-high/buying-low discipline enforce karta hai. Frequency: quarterly ya threshold-based (5% drift).',
      ),
      table(
        ['Method', 'Trigger', 'Note'],
        [
          ['Calendar', 'Quarterly/yearly', 'Simple'],
          ['Threshold', '5% drift', 'More responsive'],
          ['Hybrid', 'Either', 'Balanced'],
        ],
      ),
      h('Portfolio construction ka practical hierarchy'),
      olist([
        '**Goals** define karein (time horizon, need).',
        '**Risk capacity** assess karein (drawdown tolerance).',
        '**Asset allocation** decide karein (first big decision).',
        '**Instrument selection** karein (low cost first).',
        '**Rebalancing** plan karein.',
        '**Review** periodically (not daily).',
      ]),
      callout(
        'warn',
        'Allocation ka 90% rule',
        'Research suggests asset allocation return variability ka bada hissa explain karta hai (instrument selection se zyada). Isliye "kaunsa fund" se pehle "kitna equity/debt/gold" decide karein. Ye boring lagta hai par sabse impactful decision hai.',
      ),
      h('Behavioral ka role'),
      list([
        'Agar 40% drawdown dekh kar aap panic sell karenge, to 70% equity allocation aapke liye galat hai.',
        'Allocation ko psychologically tolerable rakhein — mathematically optimal allocation jo aap sustain nahi kar sakte wo useless hai.',
        'Automatic investing (SIP) behaviorally powerful hai.',
      ]),
    ],
    summary: [
      'Correlation kam hone par portfolio volatility kam hoti hai.',
      'Diversification "free lunch" hai par crisis me correlations badhti hain.',
      'Asset allocation instrument selection se zyada important hai.',
      'Rebalancing discipline enforce karta hai.',
      'Psychologically sustainable allocation mathematically optimal se better hai.',
    ],
    mistakes: [
      'Correlations ko static samajhna.',
      'Allocation ignore karke sirf fund selection karna.',
      'Rebalancing ko tax inefficiency samajh kar skip karna.',
    ],
    keyPoints: [
      'Diversification math correlation par based hai.',
      'Allocation = first decision.',
      'Sustainability > optimization.',
    ],
    quiz: [
      {
        q: 'Do assets, both 20% volatility, equal weight, correlation 0. Portfolio volatility?',
        options: ['20%', '14.1%', '10%', '40%'],
        answer: 1,
        explain: 'σp = √(0.25×400 + 0.25×400 + 0) = √200 ≈ 14.1%.',
      },
      {
        q: 'Crisis me correlations ka kya hota hai?',
        options: [
          'Kam ho jaati hain',
          'Badh jaati hain (1 ki taraf) — diversification kam kaam karti hai',
          'Zero ho jaati hain',
          'Unchanged',
        ],
        answer: 1,
        explain: 'Crisis me assets ek saath girte hain — diversification exactly tab fail hoti hai jab zaroorat ho.',
      },
      {
        q: 'Asset allocation ka importance kya hai?',
        options: [
          'Kam important hai fund selection se',
          'Return variability ka bada hissa explain karta hai',
          'Sirf tax ke liye hai',
          'Sirf institutions ke liye hai',
        ],
        answer: 1,
        explain: 'Allocation portfolio outcome ka dominant driver hai — instrument selection uska baad hai.',
      },
    ],
    exercise:
      'Ek hypothetical portfolio design karein: equity/debt/gold/cash weights. Calculate karein: agar equity 50% gir jaaye to portfolio ka overall loss kitna hoga? Kya aap wo tolerate kar sakte hain?',
  },

  'advanced-market-education/portfolio-risk/risk-metrics': {
    objectives: [
      'Beta aur volatility ka interpretation.',
      'Sharpe ratio ka calculation.',
      'Risk-adjusted returns kyun matter karte hain.',
    ],
    intro:
      'Return akela performance measure nahi hai. Risk-adjusted return batata hai aapne return kitne risk se kamaya. Is lesson me hum standard metrics dekhenge — aur unki limitations.',
    blocks: [
      h('Beta'),
      formula(
        'Beta',
        'β = Cov(stock returns, market returns) ÷ Var(market returns)',
        'Beta = 1 → market ke saath move. Beta 1.5 → market se 1.5x sensitivity. Beta 0.5 → defensive.',
      ),
      table(
        ['Beta', 'Interpretation'],
        [
          ['< 0', 'Market ke against move (rare)'],
          ['0 – 0.5', 'Defensive'],
          ['0.5 – 1.0', 'Low-beta'],
          ['≈ 1.0', 'Market-like'],
          ['1.0 – 1.5', 'Aggressive'],
          ['> 1.5', 'High-beta (amplified moves)'],
        ],
      ),
      callout(
        'warn',
        'Beta limitations',
        'Beta historical relationship measure karta hai. 1) Time-window dependent (1-year vs 5-year beta different ho sakta hai). 2) Betas change hote hain (business mix change). 3) Market index choice matters (NIFTY vs S&P 500). 4) Non-linear risk (crash behaviour) capture nahi karta. Isliye beta useful summary hai, complete risk picture nahi.',
      ),
      h('Standard deviation'),
      formula(
        'Standard deviation',
        'σ = √(Σ(xᵢ − μ)² ÷ n)\nAnnualised σ = daily σ × √252',
        'Returns ka dispersion measure. Higher σ = higher volatility.',
      ),
      p(
        'Standard deviation symmetric risk measure karta hai — upside aur downside ko same treat karta hai. Par investors downside se darte hain, upside se nahi. Isliye **Sortino ratio** use hota hai jo sirf downside deviation consider karta hai.',
      ),
      h('Sharpe ratio'),
      formula(
        'Sharpe ratio',
        'Sharpe = (Portfolio return − Risk-free rate) ÷ Portfolio standard deviation',
        'Annualised: return 15%, risk-free 6%, σ 12% → Sharpe = (15 − 6) ÷ 12 = 0.75.',
      ),
      table(
        ['Sharpe', 'Interpretation (rough)'],
        [
          ['< 0', 'Risk-free se kam return'],
          ['0 – 0.5', 'Weak'],
          ['0.5 – 1.0', 'Acceptable'],
          ['1.0 – 2.0', 'Good'],
          ['2.0 – 3.0', 'Excellent (suspicious if claimed by retail)'],
          ['> 3.0', 'Very likely overfitting or short track record'],
        ],
      ),
      h('Maximum drawdown aur Calmar'),
      formula(
        'Calmar ratio',
        'Calmar = Annualised return ÷ |Max drawdown|',
        'Return 20%, max DD 10% → Calmar = 2.0.',
      ),
      p(
        'Calmar ratio return ko drawdown ke against adjust karta hai. Ye practitioners ke liye Sharpe se zyada practical hota hai kyunki drawdown actual pain measure hai.',
      ),
      example(
        'Risk-adjusted comparison',
        'Strategy A: 25% return, 20% volatility, 30% max DD, Sharpe = (25−6)/20 = 0.95, Calmar = 25/30 = 0.83. Strategy B: 15% return, 8% volatility, 10% max DD, Sharpe = (15−6)/8 = 1.13, Calmar = 15/10 = 1.5. B ke paas half the return hai par risk-adjusted B better hai. B ko leverage se 1.5x karein to 22.5% return, 12% volatility, 15% DD — A ko beat karta hai better risk ke saath.',
        [
          'Return alone meaningless.',
          'Sharpe + Calmar better picture.',
          'Leverage risk-adjusted ratios mathematically preserve karta hai.',
        ],
      ),
      callout(
        'info',
        'Sharpe ke assumptions',
        'Sharpe ratio assume karta hai: returns normal distribution, volatility constant, unlimited borrowing. Real returns me fat tails aur volatility clustering hoti hai. Isliye Sharpe ko caveats ke saath use karein — sirf ek metric par decision na lein. Sortino, Calmar aur max drawdown ke saath dekhein.',
      ),
      h('Metrics ka combined dashboard'),
      table(
        ['Metric', 'Measures', 'Caveat'],
        [
          ['Total return', 'Absolute gain', 'Risk ignore'],
          ['CAGR', 'Annualised growth', 'Volatility ignore'],
          ['Volatility (σ)', 'Dispersion', 'Upside aur downside same'],
          ['Max drawdown', 'Worst peak-to-trough', 'Historical only'],
          ['Sharpe', 'Excess return per unit σ', 'Normal distribution assumption'],
          ['Sortino', 'Excess return per downside σ', 'Less common'],
          ['Calmar', 'Return per drawdown', 'Short periods misleading'],
          ['Beta', 'Market sensitivity', 'Time-varying'],
        ],
      ),
      callout(
        'warn',
        'Metrics ka misuse',
        'Chhoti track record (1-2 year) par Sharpe 3.0 milna possible hai luck se. Isliye metrics ko **(a) long period, (b) out-of-sample, (c) costs included** ke saath dekhein. Marketing material me metrics cherry-picked hote hain — full history demand karein.',
      ),
    ],
    summary: [
      'Beta market sensitivity measure karta hai (time-varying).',
      'Standard deviation symmetric risk measure hai.',
      'Sharpe ratio excess return per unit volatility.',
      'Calmar ratio return ko max drawdown se adjust karta hai.',
      'Metrics ko multiple angles se dekhein, single number se decision na lein.',
    ],
    mistakes: [
      'Sharpe ko complete risk measure samajhna.',
      'Chhoti period ke metrics ko reliable samajhna.',
      'Beta ko constant samajhna.',
    ],
    keyPoints: [
      'Risk-adjusted return > raw return.',
      'Metrics combine karein.',
      'Long out-of-sample history chahiye.',
    ],
    quiz: [
      {
        q: 'Sharpe ratio ka formula kya hai?',
        options: [
          'Return ÷ drawdown',
          '(Return − risk-free) ÷ standard deviation',
          'Return × beta',
          'Volatility ÷ return',
        ],
        answer: 1,
        explain: 'Sharpe = excess return (over risk-free) per unit of standard deviation.',
      },
      {
        q: 'Beta 1.5 ka matlab kya hai?',
        options: [
          'Market se kam volatile',
          'Market se 1.5x sensitive moves',
          'Risk-free',
          'Market ke against move',
        ],
        answer: 1,
        explain: 'Beta 1.5 matlab market 10% upar jaaye to stock ~15% upar (historical relationship).',
      },
      {
        q: 'Calmar ratio kya measure karta hai?',
        options: [
          'Return per unit volatility',
          'Return per unit max drawdown',
          'Market sensitivity',
          'Win rate',
        ],
        answer: 1,
        explain: 'Calmar = annualised return ÷ max drawdown — drawdown-adjusted performance.',
      },
    ],
    exercise:
      'Ek hypothetical portfolio ka Sharpe calculate karein: return 18%, risk-free 6%, volatility 15%. Phir scenario change karein (return 12%, DD 8%) aur Calmar compare karein. Likh kar batao: kaunsa risk-adjusted better hai?',
  },
};
