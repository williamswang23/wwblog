+++
title = "SPX期权持仓与Greeks结构分析-260904"
date = "2026-09-05"
data_as_of = "2026-09-04"
draft = false
description = "分析9月4日SPX期权结构及9月8日条件路径与实时确认要求。"
series = "SPX期权分析报告"
categories = ["衍生品"]
tags = []
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "a58a0db9a5710251d4be0964e9467bdd4078e1372af8801b6e980edd7a5f3ecf"
+++
# SPX期权持仓与Greeks结构分析-260904

## 1. 结论

9月4日盘后结构仍是正 gamma 稳定底，但严格共同到期口径的 modeled signed GEX 明显变薄，9月8日基准先验为 `range_bias with higher downside-release asymmetry`，Plan Grade / Plan Status=B / Conditional Next-Day Plan、Execution Status=`requires_external_live_source`；只有在`t0+15m`且不早于13:15 ET完成事件、开盘、波动、节点与曲面重置并重新确认7700–7800稳定区，才进入有限风险结构的人工评估，本报告不是实时交易指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | `range_bias with higher downside-release asymmetry`；7700–7800为候选稳定区，7695以下先警戒、7675以下才确认下行释放，structural confidence=Medium。 |
| Earliest evaluation | 理论下限13:15 ET：10:00、11:00、11:30与13:00 ET事项均已实际可见，clean snapshot与tolerance冻结完成后的首个完整5-minute bar起点为`t0`，三根bar后才在`t0+15m`评估；只要13:00边界未完成冻结，就顺延至13:20或更晚。 |
| Base activation | 若三根完成的5-minute close均在7700–7800、live signed稳定且center uncertainty interval完整位于扣成本后的实时盈利区，则评估centered debit butterfly，第一复核位为live center / 7750；任一bar越界、中心迁移或vol shock即失效。 |
| Downside branch | 若连续两根完成的5-minute close <7675且`signed_negative_confirmation`成立，则评估put debit vertical，第一复核位7650；reclaim 7675、首次评估时已越过合理short strike或live edge失败即失效。 |
| Upside branch | 若连续两根完成的5-minute close >7800且`signed_positive_confirmation`成立、上方正shelf未迁移，则评估call debit vertical，第一复核位7850；跌回7800、接近8000但未重建节点或live edge失败即失效。 |
| Otherwise | `No Trade / observe only`：事件或gap retest未完成、range未重确认、7700下破但7675未确认、vol shock、node migration，或live surface / quote / parity / scenario value / risk budget任一门禁失败；完成新map、surface与Local Candidate Comparison后再考虑。 |

Plan Grade / Plan Status=B / Conditional Next-Day Plan，Execution Status=`requires_external_live_source`，`planning_only=true`；这是盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 9月4日SPX官方收盘7718.60，日跌29.11点或0.376%；VIX升0.21至14.53。终值仍在上一期7700–7800核心区内，但盘中触发路径与交易记录未提供。
- 删除当日0DTE并锁定29个严格共同到期日后，gross GEX升7.79%至376.472B/1%，modeled signed GEX却降55.81%至+16.247B/1%，DEX降12.24%至883.738B；稳定底仍为正，缓冲显著变薄。
- AM与PM strict-common signed分别由+11.211B / +25.551B降至+3.232B / +13.015B；PM贡献signed降幅的61.11%。这支持区间先验，但提高了下行释放的不对称性。
- 9月18日仍是dominant durable expiry，gross 207.670B、占ex-T-day-0DTE gross 55.13%；9月8日、9月18日与10月16日surviving selected map在7700–7950形成主要正shelf，7675 / 7650的聚合负值由target-0DTE prior主导，8000为强负节点与重建边界。
- Formal IV为`partial / deterministic_expiry_proxy`：7D–45D fixed-tenor curve向上；滚动约7D、14D、30D smile的25Δ downside slope分别陡化0.413、0.545、0.314 vol points，但固定7D上升主要含expiry roll，局部证据不能单独证明交易edge。
- 9月4日7720 headline pin的绝对signed贡献中98.14%来自已到期0DTE；跨Labor Day长周末后，目标日新0DTE、中心与固定腿位必须全部实时重建。
- Plan Grade维持B：Base family为centered debit butterfly，downside contingency为put debit vertical，upside call vertical仅条件筛选；Quote Portability=`none`，执行仍需外部实时数据。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1: 2026-09-03 | T: 2026-09-04 | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| Price / prior playbook | SPX 7747.71；prior为7700–7800 range，7675以下确认downside release | SPX 7718.60 | −29.11点 / −0.376%；终值留在prior core | 只能确认terminal close；`historical trigger=not_verifiable`，`execution / P&L=not_supplied`。prior方向框架保留。 |
| Strict-common durable Greeks | Gross 349.279B；signed +36.762B；DEX +1,007.012B；OI 10,418,850 | Gross 376.472B；signed +16.247B；DEX +883.738B；OI 10,654,538 | Gross +7.79%；signed −55.81%；DEX −12.24%；OI +2.26% | 正gamma稳定底仍在，但signed cushion变薄；这些变化同时受spot、Greeks与OI影响，不解释为净flow。 |
| Strict-common AM / PM | AM signed +11.211B；PM +25.551B | AM +3.232B；PM +13.015B | AM −7.979B；PM −12.536B，后者占总降幅61.11% | 两层仍正，维持range prior；PM弱化使目标日live PM与新0DTE确认更重要。 |
| Strict-common secondary Greeks | Vanna −9.532B；Charm-next +7.003B；Volga +18.128B | Vanna −6.050B；Charm-next +31.681B；Volga +17.897B | Vanna负值收窄3.481B；Charm +24.678B；Volga −.231B | Charm跃升主要受周五至周二next-session衰减映射影响，不解释为成交或资金流；T+1仍以live Greeks为准。 |
| Target-session expiry | 9/8 expiry gross 15.221B、signed +6.171B；最大正节点7800、负节点7675 | gross 19.039B、signed +1.836B；最大正节点7750、负节点7675 | Gross +3.818B；signed −4.335B；strike-map corr=.767 | 9/8将在T+1成为0DTE，EOD节点只作先验；开盘及每次reset后重建。 |
| Dominant 9/18 expiry | Gross 197.614B；signed +11.771B；DEX 776.882B | Gross 207.670B；signed +5.347B；DEX 720.322B | Gross +5.09%；signed −54.57%；9/18 map corr=.925 | 中期gross锚增强、signed缓冲减弱；8000负节点扩大，mixed AM / PM需分层复核。 |
| ATM term and selected smile | Fixed 7D / 14D / 30D / 45D=9.105% / 10.803% / 11.504% / 12.143%；selected slots为9/10、9/17、10/2 | 9.514% / 10.789% / 11.395% / 12.231%；selected slots滚至9/11、9/18、10/5 | Fixed变化+.409 / −.014 / −.109 / +.089vp；9/8 same-expiry ATM −1.013vp；滚动slot的skew +.413 / +.545 / +.314vp，BF25 +.105 / +.091 / +.022vp | 7D上涨含source expiry从9/10滚至9/11；同到期节点普遍回落，不能写成前端全面升波。Smile变化basis为`rolling_tenor_slot_fixed_delta`。 |

## 5. T 日盘面、字段时点与 Event-Risk Overlay

- 长周末 hard reset：** 9月7日Labor Day没有Cboe RTH / Curb，虽有特殊GTH，9月8日才恢复常规交易；周五EOD到周二入场之间的三日周末、GTH repricing与到期合约删除令Quote Portability降为`none`（[Cboe假期通知](https://www.cboe.com/notices/content/?id=61299)）。
- **10:00–13:00 ET checkpoints：** 10:00 Census Q2 Quarterly Financial Report、11:00 New York Fed Survey of Consumer Expectations、11:30的920亿美元13周与790亿美元26周国库券拍卖，以及13:00的580亿美元3年期国债与750亿美元6周国库券拍卖均先于基准评估。`t0`定义为最后一项实际可见、clean snapshot与tolerance冻结完成之后的首个完整5-minute bar起点，评估时点为`t0+15m`；只有上述步骤在13:00:00边界完成时理论下限才是13:15，否则向上取整至13:20或更晚（[Census日历](https://www.census.gov/economic-indicators/calendar-listview.html)、[New York Fed日历](https://www.newyorkfed.org/microeconomics/calendar)、[TreasuryDirect](https://www.treasurydirect.gov/TA_WS/securities/search?format=json&auctionDate=2026-09-08)）。
- **15:00 ET二次reset：** Fed G.19 Consumer Credit为较晚检查点；14:55是所有family的hard-flat / no-new-entry门禁。若事件延迟或选择等待发布，则清零确认，15:15后只做观察性重算，不再新开任何结构（[Federal Reserve日历](https://www.federalreserve.gov/newsevents/2026-september.htm)）。BLS与BEA当日无计划发布。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 正gamma底仍在，signed缓冲明显变薄

- **Claim：** T+1仍以稳定区间为基准，但相较前一日需要更严格的live signed确认，并上调下行释放权重。
- **Evidence：** Strict-common gross升7.79%至376.472B/1%，signed仍为+16.247B/1%却下降55.81%，DEX下降12.24%；AM与PM signed均保持正值但同步减弱。
- **Mechanism：** 正gross与正signed提供吸收小幅冲击的结构先验；signed cushion缩小意味着价格越过下侧局部负节点后，稳定反馈更容易失效。该modeled proxy不等于真实dealer inventory或已发生hedge flow。
- **T+1 Implication：** Core内只在三根bar与full / PM / 新0DTE同步稳定后评估centered family；7675下方则采用更快的boundary-release流程。
- **Falsifier：** Full、PM与新0DTE在相应bar收盘同步转负，或价格在7675下形成acceptance。
- **Confidence：** Medium。

### Thesis 2 — 7720是已到期pin，不是周二中心

- **Claim：** 7720只能解释9月4日收盘附近的transient pin，不能作为9月8日的固定body、pin或执行依据。
- **Evidence：** 当日0DTE在7720贡献+9.996B signed GEX，surviving selected map仅+0.189B，按绝对贡献计98.14%来自到期层；7715也有91.70%来自0DTE。
- **Mechanism：** 结算删除9月4日0DTE，三日周末与目标日新0DTE会重定价forward、中心、Greeks和局部node ranking。
- **T+1 Implication：** 7750仅作首个中心复核参考；所有body与wings按live spot、forward、center uncertainty和盈利区重新选择。
- **Falsifier：** 目标日多次同步snapshot重新显示7720附近为稳定中心，且center uncertainty interval被实时盈利区完整覆盖。
- **Confidence：** High（不可迁移判断）；Low（目标日具体中心）。

### Thesis 3 — 7700–7800正shelf与7675下侧转换形成路径不对称

- **Claim：** 7700–7800具稳定候选资格；7695以下先转为警戒，但7675 / 7650的静态聚合负值主要来自即将成为0DTE的9/8层，下行释放必须由目标日live结构确认。
- **Evidence：** Surviving selected map在7700 / 7750 / 7800为+19.497 / +28.529 / +70.224M美元/点；三期聚合在7675 / 7650为−0.424 / −5.508M美元/点，其中9/8 target-0DTE prior为−10.744 / −9.304，而9/18+10/16仍为+10.320 / +3.796。更深的7550 / 7500在三期聚合为−18.566 / −38.455，长期两期也为−16.931 / −37.365M美元/点；7850 / 7900 / 7950仍为正，8000为−65.950M美元/点。
- **Mechanism：** 正shelf可能压低core内路径扩散；7675 / 7650处的短端与中期符号冲突降低静态阈值置信度，只有价格与live full / PM / 新0DTE signed共同转弱才支持边界外加速。节点交错只支持局部符号转换，不构成formal gamma flip。
- **T+1 Implication：** Base使用三根bar确认区间；downside要求两根close <7675并绑定负signed，upside要求两根close >7800并绑定正signed。
- **Falsifier：** 节点中心实质迁移、selected与full方向冲突，或新0DTE使符号结构反转。
- **Confidence：** Medium（core）；Medium-Low（7675 / 7650静态转换）。

### Thesis 4 — IV只改变成本筛选，不批准edge

- **Claim：** 向上的期限曲线与更陡的滚动slot downside smile影响expiry和wing成本，但Formal IV为partial，不能据此确认可交易相对价值。
- **Evidence：** Fixed 7D–45D为9.514% / 10.789% / 11.395% / 12.231%；滚动约7D、14D、30D的25Δ downside slope分别增加.413 / .545 / .314vp，BF25增加.105 / .091 / .022vp。形状与density门禁未达0.90，legacy selection ratio达61.29%。
- **Mechanism：** Expiry roll、roll-down、局部拟合与重新定价共同改变term、slope和curvature；较贵put wing可被short leg部分融资，却不自动产生directional edge。
- **T+1 Implication：** Fly与vertical都须刷新ATM、25Δ、actual wings、Greeks及planned-exit scenario value；calendar / diagonal不获授权。
- **Falsifier：** 实时曲面使目标scenario value无法覆盖premium、费用与双边slippage，或center uncertainty穿越fly的实时盈利区。
- **Confidence：** `degraded_local_evidence`。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| Durable gross上升、signed仍正，AM / PM均为正 | Strict-common signed下降55.81%，DEX下降12.24% | 主导证据仍支持range / stabilization，但structural confidence仅为Medium，Base必须增加三层live signed确认。 |
| 7700–7950存在surviving selected正shelf，9/18仍为最大gross锚 | 7675 / 7650的负值由target-0DTE prior主导，中期两期在两点仍为正；selected map只覆盖ex-T-day-0DTE gross的72.94% | Core内先做stability test；下侧必须等价格与live full / PM / 新0DTE同步确认，不能从短端或selected map外推全链。 |
| 9/18+10/16 aggregate map跨日相关性.930、最大正节点保持7800 | 目标日9/8 expiry map相关仅.767，最大正节点从7800迁至7750 | 中期框架可继承，短端中心不可继承；T+1 opening与事件后都重建近端map。 |
| Selected smile节点均有observed-support bracket，下行翼相对变贵 | IV overall=partial；rolling slots混合expiry roll与repricing | IV只影响expiry / wing筛选与置信度，不单独改变directional prior或Plan Grade。 |
| EOD XSP与SPX/10映射、parity内部一致 | 周末、目标日0–3DTE、事件和cached synthetic quotes介于报价与入场之间 | Quote Portability=`none`；盘后结构仍为B，Execution Status保持`requires_external_live_source`。 |

改变directional prior需要价格acceptance与同步live signed共同突破边界；quote变宽、parity异常、surface刷新失败或实时风险预算不足只改变Execution Status并触发No Trade，不改写盘后结构判断。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | ---: | ---: | --- | --- | --- |
| 9/8 exact / target-session | 5D→4D；T+1为0DTE | 6.7896% | −1.0126vp；`same_expiry_atm` | 跨Labor Day；SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| 9/10 exact / prior 7D source | 7D→6D | 8.1141% | −.9911vp；`same_expiry_atm` | SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| 9/11 exact / current 7D source | 8D→7D | 9.5145% | −.4564vp；`same_expiry_atm` | SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| 9/17 exact / prior 14D source | 14D→13D | 10.4801% | −.3224vp；`same_expiry_atm` | SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| 9/18 exact / current 14D source | 15D→14D | 10.7890% | −.3329vp；`same_expiry_atm` | dominant mixed expiry中的SPXW PM曲线 | local fitted；observation-bracketed；roll-down + repricing |
| Fixed 7D | 7D | 9.5145% | +.4093vp；`fixed_tenor_atm` | observed source 9/10→9/11 | 两日均observed；source expiry改变，含slot composition |
| Fixed 14D | 14D | 10.7890% | −.0136vp；`fixed_tenor_atm` | observed source 9/17→9/18 | 两日均observed；source expiry改变 |
| Fixed 30D | 30D | 11.3950% | −.1093vp；`fixed_tenor_atm` | 10/2–10/5 bracket保持 | total-variance interpolation；prior/current weight .333/.667；no extrapolation |
| Fixed 45D | 45D | 12.2313% | +.0886vp；`fixed_tenor_atm` | 10/16–10/23 bracket保持 | total-variance interpolation；prior/current weight .286/.429；no extrapolation |

Fixed 3D因当前最早正期限为4D且禁止外推而`unavailable`。当前7D <14D <30D <45D，curve shape为upward，7D−30D为−1.8805vp；9/11相对9/14存在局部hump。以上shape与spread均为`report-layer calculation from packet nodes`。Fixed 7D虽上升.4093vp，但9/10与9/11 same-expiry ATM分别下降.9911与.4564vp，因此上涨主要含source-expiry roll，而非前端全面升波。T日0DTE不进入positive-DTE term，目标日9/8 exact expiry会转为新0DTE并必须实时重建。

计时口径不同：IV packet的`tau_days`从9月4日16:00 ET valuation timestamp计至到期时点，所以9/8为4D；expiration panel的formal `dte`按9月5日snapshot/as-of日期取整，所以同一合约显示3。两者不是数据冲突，T+1均映射为0DTE。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| T: 9/11 / ≈7D | 12.943% | 10.902% | 9.514% | 8.753% | 8.437% | 2.150vp | .313vp | fixed-forward-delta interpolation；observation-bracketed；min conf=.956；flags=[] |
| Δ T vs. T−1: 9/10(7D)→9/11(7D) | +1.158vp | +.721vp | +.409vp | +.308vp | +.313vp | +.413vp | +.105vp | `rolling_tenor_slot_fixed_delta`；expiry roll + repricing；permission=`degraded_local_evidence`；materiality=indeterminate |
| T: 9/18 / ≈14D | 15.358% | 12.633% | 10.789% | 9.773% | 9.376% | 2.860vp | .414vp | fixed-forward-delta interpolation；observation-bracketed；min conf=.958；flags=[] |
| Δ T vs. T−1: 9/17(14D)→9/18(14D) | +.691vp | +.350vp | −.014vp | −.195vp | −.220vp | +.545vp | +.091vp | `rolling_tenor_slot_fixed_delta`；expiry roll + repricing；permission=`degraded_local_evidence`；materiality=indeterminate |
| T: 10/5 / ≈30D | 17.190% | 13.627% | 11.342% | 10.058% | 9.541% | 3.569vp | .500vp | fixed-forward-delta interpolation；observation-bracketed；min conf=.962；flags=[] |
| Δ T vs. T−1: 10/2(29D)→10/5(31D) | +.127vp | −.042vp | −.221vp | −.355vp | −.485vp | +.314vp | +.022vp | `rolling_tenor_slot_fixed_delta`；expiry roll + repricing；permission=`degraded_local_evidence`；materiality=indeterminate |

三组rolling slots的25Δ downside-skew slope均`steepened`，BF25 curvature均`increased`，但幅度与partial质量下的经济重要性为indeterminate；ATM level在7D上移、14D近似不变、30D下移。Skew term gradient由2.150升至3.569vp，put wing相对call wing随期限更贵，曲率温和增加；这些均是`report-layer calculation from packet nodes`。`downside_skew_25d = put25 IV − call25 IV`是fixed-delta smile slope proxy，不是统计skewness。Put debit spread可用short leg部分降低较贵put wing成本；centered fly / condor仍受short gamma、vega、中心迁移和多腿fill约束；partial term证据、默认日内授权及跨期退出机制不支持calendar / diagonal。Term与smile描述相对定价，不给出确定方向或执行许可；T+1必须刷新ATM、25Δ、actual wings、event kink、Greeks与候选排序。

## 9. Key Expiry / Strike / Dealer Node

| SPX / XSP | Role | Evidence | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 9/4 expiry | 已到期transient 0DTE | Gross 46.775B、signed +22.473B、DEX 7.035B、OI 876,629；7720 headline pin的98.14%来自该层 | T+1删除 | 只解释T日收盘，不迁移为9/8 pin、body或固定腿位。 |
| 9/8 expiry | Target-session 0DTE prior | T日formal DTE=3、T+1=0；gross 19.039B、signed +1.836B；跨日map corr=.767，最大正节点7800→7750，负节点仍7675 | 高度transient | 开盘、事件及任何vol / node reset后重建。 |
| 9/18 mixed | Dominant durable anchor | T日formal DTE=13、T+1预计10；gross 207.670B、signed +5.347B、DEX 720.322B、OI 5.662M；占ex-T-day-0DTE gross 55.13% | 中期durable；AM / PM signed +1.491 / +3.857B | 提供稳定先验；mixed settlement分层复核，不称单一日内pin。 |
| 7700–7800 / 770–780 | Pre-confirmation no-trade core；post-confirmation Base range | Selected gex_point：7700 +19.497、7750 +28.529、7800 +70.224M美元/点 | 主要正shelf；9/18+10/16 map corr=.930 | 三根bars、live signed与profit-zone containment共同确认；7750只是首个中心复核参考。 |
| 7695→7675→7650 / 769.5→767.5→765 | Warning / conditional downside confirmation | Target-0DTE prior在7695以上为正，7675 / 7650为−10.744 / −9.304M美元/点；三期surviving aggregate为−.424 / −5.508，但9/18+10/16仍为+10.320 / +3.796M美元/点 | 短端与中期符号冲突；静态负值主要由9/8层驱动 | 7695下方先警戒；只有两根close <7675且live full / PM / 新0DTE负signed确认后才评估put vertical，7650是第一复核位。 |
| 7550→7500 / 755→750 | Downside release shelf | 三期surviving aggregate为−18.566→−38.455；9/18+10/16也为−16.931→−37.365M美元/点 | 较深层局部负shelf具有更强中期一致性 | 仅在下侧确认后作后续reprice点，不是必达目标。 |
| 7800→7950 / 780→795；8000 / 800 | Upside shelf / upper reset boundary | 7800 / 7850 / 7900 / 7950为+70.224 / +30.572 / +46.741 / +21.138M美元/点；8000为−65.950M美元/点 | 7800–7950正延伸，8000强负 | >7800确认后先复核7850，再看7900 / 7950；接近8000强制重建，不声称formal gamma flip。 |

Surviving selected map合并9/8、9/18、10/16三期并删除T日0DTE，其中9/8会在目标日成为0DTE；gross 274.754B、占ex-T-day-0DTE gross 72.94%，signed +9.248B，未选到期gross 101.931B、signed +7.084B。跨到期讨论使用`gex_1pct`，strike node使用`gex_point`；转换为`gex_point(strike)=Σ gex_dealer(strike)/(0.01×s_ref)`，本期`s_ref=7718.13`。OI与modeled signed均不是真实dealer仓位或流量观测。

## 10. T+1 Decision Map, Structural View and Plan Grade

- **Primary regime：** durable positive-gamma stabilization base with weakened signed cushion；expiring 0DTE pin removed。
- **Directional prior：** `range_bias with higher downside-release asymmetry`。
- **Path asymmetry：** 7700–7800稳定是Base；7695以下警戒、7675以下确认downside release；7800–7950仍有正shelf，8000为强制重建边界。
- **Base path：** 在`t0+15m`且不早于13:15 ET完成三根core内bars、`signed_stable_positive`、中心稳定与live profit-zone containment，才人工评估centered debit butterfly。
- **Risk path：** <7675与`signed_negative_confirmation`绑定put debit vertical；>7800与`signed_positive_confirmation`只保留call debit vertical筛选。
- **Plan Grade / Plan Status：** B / Conditional Next-Day Plan。
- **Execution Status：** `requires_external_live_source`；`planning_only=true`。
- **Quote Portability / setup representation：** `none`；`candidate_template`；`fixed_legs_authority=candidate_template_only`；`eod_price_authority=diagnostics_only`。
- **IV Structure Gate：** `partial / degraded_local_evidence`；Labor Day、事件与目标日0DTE令surface repricing risk=high。
- **Why B：** Formal core、strict-common变化、AM / PM拆分、family screening、机械trigger、defined-risk上限与目标日live re-screen protocol均可闭合。
- **Why not A / C：** Partial IV、短端map迁移、目标日0DTE和cached synthetic quotes阻止A级；现有证据仍足以定义candidate family、封顶风险和可操作的实时重筛流程，因此不降为C。
- **Change type vs. prior：** Grade维持B；signed cushion显著变薄属于`market_change`。

Operational definitions：每次hard reset后，使用同一外部实时来源与同一合约宇宙，在完成的5-minute bar收盘同步采集full、PM与target 0DTE。`t0`是事件结果可见、独立clean snapshot取得且mapping、parity与node-migration tolerance登记冻结完成之后的首个完整5-minute bar起点；仅当全部步骤在13:00:00边界完成时`t0=13:00`，否则向上取整至下一边界。三根计数bar必须从`t0`开始，未登记时不计bar，任何放宽或突破均视为reset。`signed_stable_positive`要求连续三份snapshot中full均非负、每份至少两层非负，且最终full / PM / target-0DTE三层均非负并分别不弱于首份；`signed_negative_confirmation`要求与两根边界外close对齐的两份snapshot三层均负且第二份不高于第一份；`signed_positive_confirmation`要求对应两份snapshot三层均非负。Event、VIX 15分钟+1.0点、相关ATM IV +2vp、关键节点超过预登记tolerance迁移，或source / universe变化，均清零计数。开盘gap跨过trigger时，须先回测被跨边界，再重新累计acceptance。分支激活后的`reclaim 7675`定义为一根完成close≥7675且下一根仍≥7675；`跌回7800`定义为一根完成close≤7800且下一根仍≤7800。

Execution status transition：qualified trigger只把候选送入live gates；mapping / parity、全腿quote、surface、scenario、cost与risk全部通过后才标记`eligible_for_manual_evaluation`，任一失败标记`blocked_by_live_execution_failure`。两者都不等于自动下单，也不改变盘后Plan Grade。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| Event / opening reset未完成 | 10:00–13:00事项实际可见；opening、vol、map、surface均刷新 | EOD ranking与bar count无效 | `No Trade / observe only` | 理论下限13:15；实际为`t0+15m` |
| Opening gap位于7700 / 7800外 | 先回测被跨trigger，再累计完成bars | Gap本身不构成qualified release | 等待retest与新live map | 未回测=`observe only` |
| 7700–7800 core，range尚未确认 | 三根bars、中心未实质迁移、无vol shock | Directional release与stability均未成立 | `No Trade / observe only` | 等待range reconfirmation或boundary release |
| Post-event range reconfirmed | 三根close在core；signed稳定；spot、forward与center interval完整位于live盈利区并有正buffer | Base centered-stability path | 人工评估centered debit butterfly | 任一bar越界、containment / quote / scenario gate失败 |
| Outside core / acceptance pending | <7700即Base失效，<7695增加node warning；下侧尚未完成两根<7675或上侧尚未完成两根>7800 | Range已失效，boundary release尚未确认 | `No Trade / observe only`，不追首次穿越 | Reclaim core后重新累计三根range bars，或完成对应boundary confirmation |
| Two closes <7675 | 负signed确认；无node / vol reset；合理short仍在价格前方 | Downside boundary release | 评估put debit vertical；先复核7650 | Reclaim 7675、short已被越过或live edge失败 |
| Two closes >7800 | 正signed确认；7800–7950 shelf稳定 | Upside continuation | 评估call debit vertical；先复核7850 | 跌回7800、shelf迁移或接近8000未重建 |
| Qualified branch / live-gate decision | Mapping / parity、全腿≤30秒quote、surface、scenario、cost与remaining risk全部通过 | 结构触发已发生，但执行候选仍需独立批准 | `eligible_for_manual_evaluation`；只允许人工作最终决定 | 任一live gate失败=`blocked_by_live_execution_failure` |
| Range thesis / profit-zone failure | Center interval穿越live breakeven、buffer≤0或planned-exit value不合格 | Core内价格不等于可交易stability edge | 拒绝range family；方向分支仍需独立trigger | 新center、surface与候选比较前No Trade |
| Vol shock / node migration | VIX 15分钟+1.0点、相关ATM IV +2vp或关键节点迁移 | 原map、surface与bar count失效 | 清零并重建 | 新reset完成前No Trade |
| 14:55 ET门禁 | 所有family在15:00 G.19前hard-flat；若等待发布，15:15后仅观察重算 | 时间与事件风险超过本计划容忍度 | 所有family均no-new-entry | 未平仓则退出；盘后报告不提供穿越授权 |

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base range | centered_stability / debit butterfly | 与post-event中心稳定匹配；需要center interval被盈利区完整覆盖 | Partial smile只支持检查BF25与actual wings，不能确认short-vol edge | Defined risk；多腿live quote、scenario与buffer待核 | conditional | Selected Base template；比较相邻body、3/5点翼与温和不对称版本。 |
| Broad range | broad_bounded_range / defined-risk iron condor或wide BWB | 可覆盖更宽corridor，但边界外tail更敏感 | 需要完整两侧wing与event stress | EOD文件不覆盖四腿candidate或native complex quote | not_screenable | 目标日构建两侧tail cap、credit floor和planned-exit values后再筛。 |
| Downside release | directional_continuation / put debit vertical | 与<7675、负signed及7650节点匹配 | 较贵put wing可由short leg部分降本，但不自动形成edge | Defined risk；风险公式可闭合 | conditional | Selected Risk contingency；比较相邻long、3/5点宽与0DTE / 1D / 3D。 |
| Upside release | directional_continuation / call debit vertical | 仅与>7800、正signed和upper shelf匹配 | Call wing相对较低不等于便宜 | Defined risk；不得追过short或下一节点 | conditional | Live比较780→785 / 790；只作分支筛选，不占完整策略卡。 |

### Local Candidate Comparison

定义`s=live SPX/10`、`f=carry-aligned XSP forward`、`c=live full / PM / 0DTE共同支持的中心`、`m=经mapping / parity验证的容差`，则`I_center=[min(s,f,c)−m, max(s,f,c)+m]`。`P_live`为计划退出时点mark-to-market扣除premium、fees与双边slippage后为正的价格集合。Centered candidate只有在`s、f`与`I_center`均完整位于`P_live`且保持正buffer时通过；EOD状态为`pending_target_session_confirmation`。

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Centered grid：比较9/8 0DTE、9/9 1D与9/11 3D；body取live center相邻整数XSP strike；比较3/5点对称翼与温和downside BWB | `I_center ⊂ P_live`并保留费用、报价误差与短gamma buffer | 刷新ATM、BF25与actual wings；比较0DTE theta/gamma和非0DTE vega | Base、两侧boundary、vol shock、invalidation与planned-exit MTM全量比较 | 目标near-flat Delta；short Gamma/Vega、positive Theta | Native优先；否则broker-supported atomic net limit；combo width默认≤25% mid，near-zero mid另审 | none | `deferred_to_t1`；不选EOD赢家 |
| Broad-range grid：defined-risk condor / wide BWB | 两侧BE须覆盖live base interval与迁移buffer | Partial surface不足以稳定排序双翼 | Tail cap、credit floor、event stress待核 | Short Gamma/Vega需live stress | EOD文件不覆盖四腿 | none | `not_screenable` |
| Downside grid：long put靠近live 767.5 trigger，short朝765 / 760；比较相邻long、3/5点宽及0DTE / 1D / 3D | Trigger→7650的planned-exit MTM扣成本为正；short仍在价格前方 | 刷新put wing，验证short leg真实降本 | `0<d<W`、max loss≤R_eff、planned-exit edge>0 | Negative Delta、long Gamma/Vega、negative Theta | 全腿≤30秒；native / atomic net limit | none | `deferred_to_t1`；Risk算法 |
| Upside grid：long call靠近780 acceptance，short朝785 / 790；比较相邻long、3/5点宽及0DTE / 1D / 3D | Trigger→7850的planned-exit MTM扣成本为正 | 刷新call wing与event decay | 首次评估已越过合理short / 下一节点即取消 | Positive Delta、long Gamma/Vega、negative Theta | 同上 | none | `deferred_to_t1`；screening only |

### Base Candidate Template — Base Case

- **Setup / linked scenario / family：** `centered_stability / debit butterfly / conditional`，只绑定`t0+15m`且不早于13:15 ET后的7700–7800 range reconfirmation；`net_premium_type=debit`，客户视角正数表示支付；Quote Portability=`none`，representation=`candidate_template`，fixed legs仅有上表EOD示例，live selected legs=`pending`。
- **Expiry / holding window：** 比较9/8 0DTE、9/9 1D与9/11 3D，全部默认日内；最早`t0+15m`且不早于13:15评估，range thesis、center buffer或流动性失效即退出，最晚14:55 ET，不穿越15:00事件，不隔夜。
- **Activation / cancellation / invalidation：** 三根完成bars在core、`signed_stable_positive`成立、无vol / node reset；`s、f、I_center ⊂ P_live`且有正buffer。任一bar越界、center / surface迁移、mapping / parity / quote / scenario gate失败即取消。
- **Strike / width / symmetry：** Body按live center相邻整数strike重选，比较3/5点对称翼；仅当path asymmetry、actual-wing成本与下侧tail cap共同改善时评估温和BWB。Body是最大到期收益点，不是必须精确停留的pin。
- **Term / skew / Greeks / scenario：** 刷新candidate expiry ATM、25Δ与actual wings、BF25；目标near-flat Delta、short Gamma/Vega、positive Theta。Base、Risk、Invalidation与planned-exit scenario values在目标日均为`pending_target_session_confirmation`，且扣premium、费用与双边slippage后须为正；到期payoff只作stress reference。
- **Payoff / risk / price：** 对称wing宽`W`、debit `d`、`N`组、round-trip成本`C_RT`时，要求`0<d<W`；all-in max loss=`100Nd+C_RT≤R_eff`，净max profit=`100N(W−d)−C_RT`，成本调整BE=`L+d+C_RT/(100N)`与`U−d−C_RT/(100N)`；到期profit zone为两条成本调整BE之间，双侧tail loss均为`100Nd+C_RT`。`risk_budget_bound=(R_eff−C_RT)/(100N)`，并服从更严格的live payoff / liquidity bound。`eod_feasibility_reference(binding=false)`仅见上表，`t1_live_max_debit=pending`；`cost_sensitivity_range=pending_broker_specific`，按全部legs、N与退出次数缩放。
- **Order / exit / failure：** 从实时native combination mid附近按最小tick改善net limit；否则只允许broker-supported atomic multi-leg net-limit，不拆腿追价。每根5-minute bar复核center、buffer与surface，最晚14:55退出。相较双向裸买premium，fly把支出集中于稳定区；0DTE short gamma、中心迁移、IV重定价和多腿fill均可能令其失败。

### Risk-Path Contingency

- **Setup / linked scenario / family：** `directional_continuation / put debit vertical / conditional`，只绑定两根close <7675且`signed_negative_confirmation`成立的downside release；并非基准持仓建议。`net_premium_type=debit`，Quote Portability=`none`，representation=`candidate_template`，具体EOD legs仅见上表，live selected legs=`pending`。
- **Expiry / holding window：** 比较9/8 0DTE、9/9 1D与9/11 3D并默认日内；最早`t0+15m`且不早于13:15，time stop=`min(入场后60分钟, 14:55 ET)`，不穿越15:00事件、不隔夜。
- **Activation / strike / cancellation：** Long put取live 767.5 trigger映射附近可交易整数strike，short朝765 / 760，比较相邻long与3/5点宽。若首次评估已越过合理short或下一节点则取消，不追价；接受7650后重新定中，7600 / 7550只作后续复核点。
- **Term / skew / Greeks / scenario：** 刷新ATM、25Δ与actual put wings；预期negative Delta、long Gamma/Vega、negative Theta。Trigger→7650、reclaim 7675、vol shock、node migration与planned-exit scenario values均实时重算；目标路径的MTM必须覆盖debit、费用与双边slippage。
- **Payoff / risk / price：** Long put执行价`K_L`、宽`W`、debit `d`时，`0<d<W`且`d_live≤min[(R_eff−C_RT)/(100N), W/2−C_RT/(100N), live_payoff_bound, live_liquidity_bound]`；all-in max loss=`100Nd+C_RT≤R_eff`，净max profit=`100N(W−d)−C_RT`，成本调整BE=`K_L−d−C_RT/(100N)`，到期profit zone为`S_T<K_L−d−C_RT/(100N)`，上侧tail loss为`100Nd+C_RT`，`S_T≤K_L−W`时下侧收益封顶。EOD reference的`binding=false`，`t1_live_max_debit=pending`；`cost_sensitivity_range=pending_broker_specific`。
- **Order / exit / failure：** Native complex quote优先；否则只以全部实时legs构造atomic net limit，quote age≤30秒，默认组合宽度≤25% mid，near-zero mid另审。相较outright put，short leg通常降低debit与负Theta负担，但同时封顶下侧收益；reclaim 7675、signed失效、wide quote、0DTE IV crush、short过近或7650 scenario edge不足均可能令结构失败并触发退出或取消。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

- **Condition：** 10:00–13:00事项均完成；三根完成的5-minute close留在7700–7800，`signed_stable_positive`成立，中心未实质迁移且无vol shock；`s、f、I_center`完整位于`P_live`并有正buffer。
- **Expected path：** 价格围绕live center重新估值，在7700 / 7800边界前保持稳定；该路径不承诺收盘pin或触及fly body。
- **Linked Base plan：** 在0DTE / 1D / 3D、相邻body、3/5点翼与温和不对称版本间实时比较centered debit butterfly；live scenario、quote、cost与risk全部通过后才人工评估。
- **Invalidation：** 任一完成bar离开core、center / node迁移、profit-zone buffer≤0、signed失效、vol shock、mapping / parity / quote failure，或到14:55 ET。

### Risk Case

- **Condition：** Downside主contingency要求两根close <7675且负signed确认；互斥upside branch要求两根close >7800、正signed确认并保持7800–7950 shelf。
- **Expected path：** Downside先复核7650，再看7600 / 7550；upside先复核7850，再看7900 / 7950，接近8000时重建。节点均为reprice / reassessment points，不是目标承诺。
- **Linked Risk-Path Contingency：** Downside绑定put debit vertical；upside只保留call debit vertical实时筛选，不占第二张完整策略卡。首次评估已越过合理short或下一节点时不追价。
- **Invalidation：** Reclaim 7675或跌回7800、对应signed失效、shelf / node迁移、vol reset、scenario edge或quote / risk gate失败。

### No-Trade Case

- **EOD no-qualified-plan condition：** 当前不成立；核心Formal足以定义结构先验、payoff family、trigger / invalidation、封顶风险与T+1 live re-screen protocol。Quote Portability=`none`与未来live字段pending不单独把Grade降为C。
- **T+1 execution abort condition：** 事件/reset未完成；gap未retest；core内range未重确认；7700下破但7675未确认；live full / PM / 0DTE、ATM / 25Δ / actual wings未刷新；node migration或vol shock；mapping / parity、全腿≤30秒quote、native / atomic construction、默认组合宽度、scenario value、费用 / slippage或remaining risk任一失败；需要裸卖、无限风险、未授权隔夜，或机会晚于time stop。
- **What must change before reconsideration：** 完成相应reset，重建live map、surface、forward、center与quotes，并使Local Candidate Comparison、planned-exit edge、defined-risk payoff及全部风险门禁共同通过。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on Structural View / Plan Grade / Execution Status |
| --- | --- | --- |
| Live full / PM / target-0DTE signed与7700–7800中心 | 验证变薄的正signed底能否跨周末与事件保留 | 同步稳定维持range prior；<7675且三层转负切换downside；数据未齐时Execution Status保持`requires_external_live_source`。 |
| 9/8 ATM、25Δ wings、BF25与event kink | Target 0DTE尚未形成，partial packet不能代表事件后曲面 | 决定expiry / wing / family与live edge；曲面异常主要改变Execution Status，不单独改方向。 |
| SPX / XSP spot、carry-aligned forward、mapping / parity与`I_center ⊂ P_live` | Base fly要求中心及不确定区间被实时盈利区完整覆盖 | Containment失败拒绝centered family；盘后结构Grade可仍为B。 |
| VIX 15分钟变化、相关ATM IV与关键node migration | 任一shock都会使原bar count、surface与候选失效 | 触发reset；反复发生则`No Trade / observe only`。 |
| 7650 / 7600 / 7550与7850 / 7900 / 8000路径 | 区分首个复核点、后续release和上方重建边界 | 改变分支与re-center时点；节点不是必达目标或止盈承诺。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
