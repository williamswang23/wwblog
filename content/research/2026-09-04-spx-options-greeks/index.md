+++
title = "SPX期权持仓与Greeks结构分析-260903"
date = "2026-09-04"
data_as_of = "2026-09-03"
draft = false
description = "基于2026年9月3日收盘的 SPX durable GEX、AM/PM signed、IV term structure 与关键节点，分析9月4日事件后的条件路径与风险门禁；不构成实时交易指令。"
series = "SPX期权分析报告"
categories = ["市场结构", "衍生品"]
tags = ["SPX", "期权", "Greeks", "GEX", "波动率", "0DTE", "风险管理"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "7427e3c54a1a6f2e21904d2162b0db2599235f9e3b5cf371d0b882fa547a130e"
+++
# SPX期权持仓与Greeks结构分析-260903

## 1. 结论

9月3日盘后形成“PM 主导的 durable modeled signed GEX 翻正、7700–7800 正 gamma shelf 接管近端，但当日 7750 pin 主要随 0DTE 到期消失”的结构，9月4日基准先验为 range_bias with downside-release asymmetry，Plan Grade / Plan Status=B / Conditional Next-Day Plan、Execution Status=requires_external_live_source；只有 13:00 ET 后完成事件、波动、节点与曲面重置并重新确认区间，才评估有限风险结构，本报告不是实时交易指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | range_bias with downside-release asymmetry；7700–7800 为候选稳定区，7675 下方存在释放风险，structural confidence=Medium。 |
| Earliest evaluation | 最早 13:00 ET：8:30 Employment Situation、10:00 GSCPI、12:45 NY Fed Staff Nowcast 均已实际可见，随后完成三根 5-minute bars，并重建 opening / vol / full-PM-0DTE map、surface、mapping、parity 与 quotes；发布延迟或 reset 触发则顺延。 |
| Base activation | 若三根完成的 5-minute close 均留在 7700–7800、live signed 稳定且 center uncertainty interval 完整位于扣除成本后的实时盈利区，则评估 centered debit butterfly，首先在 live center / 7750 重新估值；任一 bar 越界、中心迁移或 vol shock 即失效。 |
| Downside branch | 若连续两根完成的 5-minute close <7675 且 signed_negative_confirmation 成立，则评估 put debit vertical，首个复核位 7650、随后 7600；reclaim 7675、首次可评估价格已越过合理 short strike 或 live edge 失败即失效。 |
| Upside branch | 若连续两根完成的 5-minute close >7800 且 signed_positive_confirmation 成立、上方正 shelf 未迁移，则评估 call debit vertical，首个复核位 7850、随后 7900；跌回 7800、接近 8000 未重建节点或 live edge 失败即失效。 |
| Otherwise | No Trade / observe only：事件或 gap retest 未完成、range 未重新确认、7700 下破但 7675 未确认、vol shock、node migration，或 live surface / quote / parity / scenario value / risk budget 任一门禁失败；完成新 map、surface 与 Local Candidate Comparison 后再考虑。 |

Plan Grade / Plan Status=B / Conditional Next-Day Plan，Execution Status=requires_external_live_source，planning_only=true；这是盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 9月3日 SPX 官方收盘 7747.71，日涨 81.11 点或 1.058%；VIX 从 15.20 降至 14.32。价格跨越前一日 7700 上沿，但历史两根 5-minute acceptance 与交易记录均未提供，不能据收盘反推盘中执行。
- 删除 9月3日 0DTE 后，durable full gross GEX 为 381.508B/1%，modeled signed GEX 为 +48.660B/1%、DEX 为 +1,033.518B；29 个严格共同到期的 signed 较 T−1 增加 63.584B并翻正。
- Strict-common AM / PM signed 分别由 +2.430B / −17.355B 变为 +11.211B / +37.449B；PM 贡献 signed 改善的 86.19%，支持稳定先验，但该 proxy 不等于真实 dealer inventory 或已发生 hedge flow。
- 9月18日仍是 dominant durable expiry，gross 197.614B、signed +11.771B、占 durable gross 51.80%；删除当日 0DTE 后，7700–7800 构成主要正 shelf，7670–7675 只是 selected-map 局部符号过渡。
- Formal IV 为 partial / deterministic_expiry_proxy：9月4日 exact-expiry ATM IV 升至 13.963%，形成事件凸点；3D–45D fixed-tenor IV 普遍下降，约7D、14D、30D downside-skew slope 均变平，但质量门退化使结论权限仅为 degraded_local_evidence。
- T+1 基准等待 7700–7800 的 post-event range reconfirmation；下侧在 7675 下方具有更快释放风险，上侧 7800–7900 仍有正节点承接，8000 是必须重新建图的孤立负节点。
- Plan Grade 为 B / Conditional：Base family 是 centered debit butterfly，downside contingency 是 put debit vertical，upside call vertical 仅保留条件筛选；Quote Portability=none，所有 EOD 腿位和价格只作 diagnostics。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1: 2026-09-02 | T: 2026-09-03 | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| Price / prior playbook | SPX 7666.60；prior 为 7650–7700 range，upside activation 需两根 close >7700 | SPX 7747.71 | +81.11 点 / +1.058%；终值高于 prior 上沿 | 仅能确认 terminal close；historical trigger=not_verifiable，execution / P&L=not_supplied。新 core 上移至 7700–7800。 |
| Strict-common durable Greeks | Gross 357.488B；signed −14.925B；DEX +580.708B；OI 10,891,666 | Gross 381.508B；signed +48.660B；DEX +1,033.518B；OI 11,097,631 | +6.72%；signed +63.584B并翻正；DEX +77.98%；OI +1.89% | 稳定先验显著增强；变化同时含 spot、Greeks、OI与样本变化，不解释为净 flow。 |
| Strict-common AM / PM | AM signed +2.430B；PM −17.355B | AM +11.211B；PM +37.449B | +8.780B / +54.804B；PM 贡献改善的 86.19% | PM 从负转正是 regime 改变的主因；T+1 仍须以 live PM 与新0DTE确认。 |
| Short-end / 0DTE | 9/3 尚为 1D；9/4 max positive node 在7750、min node在7600 | 9/3 0DTE signed +34.707B；9/4 1D signed +11.898B，max/min node移至7800/7650 | 风险摘要的7750 signed exposure中84.48%来自到期的9/3 0DTE；9/4 strike-map跨日相关仅0.601 | 不迁移7750固定 pin；目标日9/4变为0DTE，开盘及每次 reset 后重建。 |
| Dominant expiry | 9/18 gross 201.020B；signed +3.656B | gross 197.614B；signed +11.771B | Gross −3.406B；signed +8.115B；strike-map corr=0.908 | 中期正锚增强，7800仍为最大正节点、8000仍为最大负节点；mixed settlement需分层解释。 |
| ATM term | Fixed 3D / 7D / 14D / 30D / 45D=10.595% / 9.767% / 11.288% / 12.200% / 12.572% | 9.123% / 9.105% / 10.803% / 11.504% / 12.143% | −1.472 / −.662 / −.485 / −.696 / −.429vp；fixed_tenor_atm。9/4 same-expiry 12.395%→13.963%，+1.568vp | 固定期限普降与事件合约升波并存；3D含 bracket 权重变化，不能写成全曲面同步降波。 |
| Selected smile | 约7D / 14D / 30D downside slope=2.239 / 3.480 / 4.224vp；BF25=.225 / .360 / .519vp | 1.737 / 2.315 / 3.256vp；BF25=.208 / .323 / .478vp | Slope −.502 / −1.164 / −.968vp；BF25 −.017 / −.036 / −.041vp；7D/14D为 rolling_tenor_slot_fixed_delta，30D为 same_expiry_fixed_delta | Downside slope 明显变平；小幅曲率下降处于不确定性内，不能据此确认 butterfly edge。 |

## 5. T 日盘面、字段时点与 Event-Risk Overlay

- **08:30 ET hard reset：** BLS发布 [August 2026 Employment Situation](https://www.bls.gov/schedule/2026/09_sched_list.htm)，位于EOD quote与计划评估之间，直接令 Quote Portability=none；开盘后需重建 spot、vol、0DTE、surface 与候选排名。
- **10:00–12:45 ET checkpoints：** [New York Fed日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)列示10:00 GSCPI与12:45 Staff Nowcast；最后一项实际可见后重新累计三根完整5-minute bars，机械最早为13:00，发布延迟则顺延。
- **日历与持仓边界：** [Fed Board日历](https://www.federalreserve.gov/newsevents/2026-september.htm)当日无FOMC、官员讲话或重大政策发布，[TreasuryDirect当日auction查询](https://www.treasurydirect.gov/TA_WS/securities/search?format=json&auctionDate=2026-09-04)为空；9月7日Labor Day无RTH/Curb，因此默认日内退出，不跨三日周末（[Cboe假期通知](https://www.cboe.com/notices/content/?id=61299)）。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — Durable signed 翻正改变基准 regime

- **Claim：** T+1基准由“修复中的range”升级为“正signed shelf主导的range_bias”，同时保留下侧释放不对称。
- **Evidence：** 29个strict-common expiry的signed由−14.925B变为+48.660B；AM与PM均转为或保持正值，PM贡献改善的86.19%。
- **Mechanism：** Modeled signed proxy翻正降低小幅冲击自我强化的结构先验，PM修复使近端稳定候选更可信；该口径没有观察真实dealer持仓或对冲流。
- **T+1 Implication：** 7700–7800内先验证稳定性；只有range reconfirmation与live full / PM / 0DTE同步通过，才评估中心型结构。
- **Falsifier：** Full、PM和新0DTE在对应bar收盘同步转负，或价格在7675下方形成acceptance。
- **Confidence：** Medium。

### Thesis 2 — 7750收盘 pin 不具跨日可迁移性

- **Claim：** 7750仍是durable正节点，但不能作为9月4日的固定pin或预选body。
- **Evidence：** 风险摘要中7750 signed exposure的84.48%来自9月3日0DTE；删除该层后只余2.620B/1%。新0DTE的最大正节点已从7750迁至7800，跨日map相关仅0.601。
- **Mechanism：** 到期结算会删除当日0DTE，Employment Situation又会重定价新0DTE；EOD最大节点不能替代目标日中心、forward和profit-zone测试。
- **T+1 Implication：** Base body按live center重新选择，7750只作第一个重新估值参考；gap必须先回测跨过的trigger。
- **Falsifier：** 目标日多次同步snapshot仍显示7750稳定为中心，且spot、forward与center uncertainty均被实时盈利区完整覆盖。
- **Confidence：** High（不可迁移判断）；Medium-Low（具体目标日中心）。

### Thesis 3 — 7700–7800正 shelf 与下侧局部负节点构成路径不对称

- **Claim：** Core内具稳定候选资格；7675下方则进入7650、7600、7550的负节点链，确认后的下行释放可能快于上行延伸。
- **Evidence：** 删除0DTE后的selected gex_point在7675 / 7700 / 7750 / 7800为+4.556 / +11.948 / +33.813 / +78.461M/点，在7650 / 7600 / 7550为−4.812 / −2.097 / −14.520M/点；7900仍+57.817M/点，8000为孤立−21.962M/点。
- **Mechanism：** 正shelf可能吸收小幅波动；一旦价格与live signed共同跌破局部符号过渡，负节点会提高边界外路径敏感度。8000前后正负交错，不构成广义gamma flip。
- **T+1 Implication：** Base用三根bar确认range；downside以两根close<7675并绑定负signed，upside以两根close>7800并绑定正signed。
- **Falsifier：** 节点中心迁移、selected与full方向冲突，或新0DTE重建后符号结构反转。
- **Confidence：** Medium。

### Thesis 4 — IV证据支持重新筛选成本，不批准交易edge

- **Claim：** Fixed-tenor降波与smile flattening改善部分long-premium成本先验，但9月4日事件IV抬升且packet为partial，无法确认相对价值edge。
- **Evidence：** Fixed 3D–45D下降.429–1.472vp；9月4日exact ATM反升1.568vp；约7D、14D、30D downside slope下降.502 / 1.164 / .968vp。Monotonicity、convexity、density与legacy-selection门禁未通过。
- **Mechanism：** Event kink、expiry roll、total-variance interpolation与局部拟合同时影响level、slope和curvature；目标日0DTE的theta、vega与wing排序可快速重置。
- **T+1 Implication：** Fly与vertical均须刷新ATM、25Δ、actual wings、Greeks和planned-exit scenario value；calendar / diagonal不获得授权。
- **Falsifier：** 实时曲面使目标scenario value无法覆盖premium、费用和双边slippage，或center uncertainty穿越fly的实时盈利区。
- **Confidence：** degraded_local_evidence。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| Durable signed翻正，AM / PM均为正，SPX上涨且VIX回落 | 当日0DTE贡献很大，新0DTE尚未形成目标日结构 | Structural confidence=Medium；range是先验，事件后live map决定能否维持。 |
| 7700–7800 selected正shelf，9/18正锚增强 | 7675下方出现负节点链，selected map仅覆盖durable gross的73.07% | Core内先做stability test；两根close<7675与负signed共同成立才改变为downside prior。 |
| 7800与7900仍是强正节点 | 8000是孤立负节点，且不能从节点推导必达目标 | 两根close>7800与正signed使upside branch可评估；接近8000必须重建，不能外推shelf。 |
| Selected smile节点均observation-bracketed，downside slope变平 | IV overall=partial，质量较T−1退化；9月4日事件合约反向升波 | IV只影响expiry / wing筛选和置信度，不单独改变directional prior。 |
| EOD XSP与SPX/10映射、parity内部一致 | Cached、synthetic-only、重大事件介于报价和入场之间 | 结构计划仍可评为B；Execution Status保持requires_external_live_source，直至全部live门禁通过。 |

改变 directional prior 的条件是价格acceptance与同步live signed共同突破边界；单纯quote变宽、parity异常或surface刷新失败只改变Execution Status并触发No Trade，不改写盘后结构判断。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | ---: | ---: | --- | --- | --- |
| 9/4 exact / target event | 1.7648D→1.0000D | 13.9633% | +1.5683vp；same_expiry_atm | T+1 0DTE；Employment Situation；SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| 9/8 exact | 5.7648D→5.0000D | 7.8022% | −1.3572vp；same_expiry_atm | T+1 4D，跨Labor Day周末 | local fitted；observation-bracketed；roll-down + repricing |
| 9/10 exact / current 7D source | 7.7648D→7.0000D | 9.1052% | −1.1226vp；same_expiry_atm | SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| 9/17 exact / current 14D source | 14.7648D→14.0000D | 10.8025% | −.8650vp；same_expiry_atm | SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| 10/2 exact / 30D control | 29.7648D→29.0000D | 11.5631% | −.6368vp；same_expiry_atm | SPXW PM | local fitted；observation-bracketed；roll-down + repricing |
| Fixed 3D | 3D | 9.1227% | −1.4721vp；fixed_tenor_atm | 9/4 event位于lower bracket | 9/4(1D)–9/8(5D) total-variance interpolation，weight .309→.500；no extrapolation |
| Fixed 7D | 7D | 9.1052% | −.6616vp；fixed_tenor_atm | observed source 9/9→9/10 | local fitted；observation-bracketed |
| Fixed 14D | 14D | 10.8025% | −.4851vp；fixed_tenor_atm | observed source 9/16→9/17 | local fitted；observation-bracketed |
| Fixed 30D | 30D | 11.5043% | −.6956vp；fixed_tenor_atm | 10/2 observed→10/2–10/5 bracket | total-variance interpolation，current weight .3333；no extrapolation |
| Fixed 45D | 45D | 12.1426% | −.4292vp；fixed_tenor_atm | 10/16–10/23同bracket | total-variance interpolation，weight .1765→.2857；no extrapolation |

Curve shape为mixed：9月4日13.9633%相对9月8日7.8022%形成+6.1611vp事件凸点；fixed 3D与7D几乎持平（+0.0175vp），7D以后向上至45D（+3.0374vp），7D−30D为−2.3991vp。以上spreads与shape均为report-layer calculation from packet nodes。Fixed-tenor普降同时包含source expiry / bracket变化；共同exact-expiry显示9月4日独自升波，因此不能把slot变化全归为纯repricing。9月3日0DTE不进入positive-DTE term；目标日必须重建9月4日0DTE及事件后曲面。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| T: 9/10 / ≈7D | 11.7852% | 10.1816% | 9.1052% | 8.4448% | 8.1247% | 1.7368vp | .2080vp | fixed-forward-delta interpolation；observation-bracketed；min conf=.950；flags=[] |
| Δ T vs. T−1: 9/9(6.7648D)→9/10(7.0000D) | −1.2327vp | −.9296vp | −.6616vp | −.4272vp | −.2764vp | −.5024vp | −.0168vp | rolling_tenor_slot_fixed_delta；expiry roll + repricing；permission=degraded_local_evidence；ATM lower；slope flattened；BF25 indeterminate |
| T: 9/17 / ≈14D | 14.6669% | 12.2837% | 10.8025% | 9.9683% | 9.5956% | 2.3155vp | .3235vp | fixed-forward-delta interpolation；observation-bracketed；min conf=.957；flags=[] |
| Δ T vs. T−1: 9/16(13.7648D)→9/17(14.0000D) | −1.6873vp | −1.1036vp | −.4851vp | +.0606vp | +.3067vp | −1.1642vp | −.0365vp | rolling_tenor_slot_fixed_delta；expiry roll + repricing；permission=degraded_local_evidence；ATM lower；slope flattened；BF25 indeterminate |
| T: 10/2 / ≈30D | 17.0631% | 13.6686% | 11.5631% | 10.4131% | 10.0258% | 3.2556vp | .4778vp | fixed-forward-delta interpolation；observation-bracketed；min conf=.973；flags=[] |
| Δ T vs. T−1: 10/2(29.7648D)→10/2(29.0000D) | −1.8501vp | −1.1617vp | −.6368vp | −.1935vp | +.0330vp | −.9682vp | −.0408vp | same_expiry_fixed_delta；roll-down + repricing；permission=degraded_local_evidence；ATM lower；slope flattened；BF25 indeterminate |

ATM level在三组slot均下降；25Δ downside-skew slope均flattened；BF25仅小幅下降，判为indeterminate_within_uncertainty。当前7D / 14D / 30D put-wing premium为+1.0764 / +1.4812 / +2.1056vp，call-wing premium为−.6604 / −.8343 / −1.1500vp，downside slope和curvature随期限增加；这些均是report-layer calculation from packet nodes，downside skew是fixed-delta smile slope proxy，不是统计skewness。Directional put spread可能用short leg降低较贵put wing成本，但仍需live scenario edge；centered fly / condor受事件后curvature、short gamma / vega和中心迁移约束；calendar / diagonal与partial term证据、默认日内授权及跨期退出机制不匹配。Term / skew描述相对定价，不提供确定方向或执行许可；T+1须刷新ATM、25Δ、actual wings、Greeks与候选排序。

## 9. Key Expiry / Strike / Dealer Node

| SPX / XSP | Role | Evidence | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 9/3 expiry | 已到期transient 0DTE | Gross 37.950B、signed +34.707B、DEX +36.037B、OI 318,174；7750 headline exposure的84.48%来自本层 | T+1删除 | 只解释T日收盘，不迁移为9/4 pin、body或执行依据。 |
| 9/4 expiry | Target-session 0DTE prior | T日1D gross 32.228B、signed +11.898B、DEX +26.506B、OI 678,781；max/min node=7800/7650 | 高度transient；map corr=.601 | 开盘、8:30 event及任何vol / node reset后重建。 |
| 9/18 mixed | Dominant durable anchor | T:15D、T+1:14D；gross 197.614B、signed +11.771B、DEX +776.882B、OI 5.631M；占durable gross 51.80% | 中期durable；AM / PM signed +7.486 / +4.285B | 提供稳定先验；mixed settlement分层复核，不称单一日内pin。 |
| 7700–7800 / 770–780 | Pre-confirmation no-trade core；post-confirmation Base range | Selected +11.948 / +33.813 / +78.461M/点（7700 / 7750 / 7800）；EOD XSP 774.77与SPX/10仅差+.007 | 正shelf；selected覆盖durable gross 73.07% | 三根bar、live signed与profit-zone containment共同确认；7750只是首个复核节点。 |
| 7675→7650→7600 / 767.5→765→760 | Local transition / downside warning | +4.556→−4.812→−2.097M/点；7670为−.701M/点 | Selected局部符号过渡 | 7700下破先观察；两根close<7675且负signed后评估put vertical，先复核7650、再看7600。 |
| 7550→7500 / 755→750 | Downside release shelf | −14.520→−22.187M/点 | 局部负shelf | 仅在前述确认后作为后续reprice点；不是必达目标。 |
| 7800→7900 / 780→790；8000 / 800 | Upside shelf / upper warning | +78.461→+57.817M/点；7950 +25.751M/点；8000孤立−21.962M/点 | 7800–7950为正延伸，8000前后符号交错 | >7800确认后先复核7850 / 7900；接近8000重建，不声称formal gamma flip。 |

Selected map合并9/4、9/18、10/16三期并删除9/3 0DTE；gross 278.771B、signed +27.801B，omitted gross 102.736B、omitted signed +20.858B。Strike值为modeled signed gex_point，bundle没有正式gamma-flip算法；OI为vendor-reported OI，不代表T日净流量。

## 10. T+1 Decision Map, Structural View and Plan Grade

- **Primary regime：** durable positive-signed stabilization shelf after a PM-led sign reversal；expiring 0DTE pin removed。
- **Directional prior：** range_bias with downside-release asymmetry。
- **Path asymmetry：** 7700–7800稳定是Base；7675以下进入局部负节点链；7800–7950仍有正shelf，8000需重新建图。
- **Base path：** 13:00 ET后完成三根区间内bars、signed_stable_positive、center稳定和live profit-zone containment，才人工评估centered debit butterfly。
- **Risk path：** <7675与signed_negative_confirmation绑定put debit vertical；>7800与signed_positive_confirmation只保留call debit vertical筛选。
- **Plan Grade / Plan Status：** B / Conditional Next-Day Plan。
- **Execution Status：** requires_external_live_source；planning_only=true。
- **Quote Portability / representation：** none；candidate_template；fixed_legs_authority=candidate_template_only；eod_price_authority=diagnostics_only。
- **IV Structure Gate：** partial / degraded_local_evidence；surface repricing risk=high around Employment Situation and target 0DTE。
- **Why B：** Formal core、strict-common变化、AM / PM拆分、family screening、机械trigger、defined-risk上限与T+1 live re-screen protocol均可闭合。
- **Why not A / C：** Partial IV、事件隔夜、目标日0DTE、map迁移与cached synthetic quotes阻止A；现有证据仍足以定义candidate family、风险封顶和可执行的实时重筛流程，因此不降为C。
- **Change type vs. prior：** Grade保持B；核心区由7650–7700上移至7700–7800及durable signed翻正属于market_change。

Operational signed definitions：每次hard reset后，用同一外部实时来源、相同合约宇宙在完成的5-minute bar收盘同步采集full、PM与target 0DTE。signed_stable_positive要求连续三份snapshot中full均非负、每份至少两层非负，且最终三层不弱于首份；signed_negative_confirmation要求与两根边界外close对齐的两份snapshot三层均负且第二份不高于第一份；signed_positive_confirmation要求对应两份snapshot三层均非负。任何event、VIX 15分钟+1.0点、相关ATM IV +2vp、关键节点迁移或source / universe变化均清零计数。若开盘gap跨过trigger，须先回测被跨边界，再重新累计acceptance。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 08:30–12:45 reset未完成 | 事件实际可见；opening、vol、map、surface已刷新 | EOD ranking与bar count无效 | No Trade / observe only | 最早13:00；延迟则顺延 |
| Opening gap位于7700 / 7800外 | 先回测被跨trigger，再累计完成bars | Gap本身不构成qualified release | 等待retest与新live map | 未回测=observe only |
| 7700–7800 core，range尚未确认 | 三根bars、中心未实质迁移、无vol shock | Directional release和stability均未成立 | No Trade / observe only | 等待range reconfirmation或边界release |
| Post-event range reconfirmed | 三根close在core；signed_stable_positive；spot、forward与center interval完整位于live盈利区并有正buffer | Base centered-stability path | 人工评估centered debit butterfly | 任一bar越界、containment / quote / scenario gate失败 |
| Close <7700但尚未确认7675 | 继续观察价格与live signed，不追首次穿越 | Range受损、downside仅为warning | No Trade / observe only | Reclaim 7700或形成<7675 confirmation |
| Two closes <7675 | signed_negative_confirmation；无node / vol reset；合理short尚在价格前方 | Downside boundary release | 评估put debit vertical；先复核7650、再看7600 / 7550 | Reclaim 7675、short已被越过或live edge失败 |
| Two closes >7800 | signed_positive_confirmation；7800–7900 shelf稳定 | Upside continuation | 评估call debit vertical；先复核7850、再看7900 | 跌回7800、shelf迁移或接近8000未重建 |
| Range thesis / profit-zone failure | Center interval穿越live breakeven、buffer≤0或planned-exit value不合格 | Core内价格不等于可交易stability edge | 拒绝range family；方向分支仍需独立trigger | 新center、surface与候选比较前No Trade |
| Vol shock / node migration | VIX 15分钟+1.0点、相关ATM IV +2vp或关键节点迁移 | 原map、surface与bar count失效 | 清零并重建 | 新reset完成前No Trade |

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base range | centered_stability / debit butterfly | 与post-event中心稳定匹配；需center与盈利区完整包含 | Partial smile仅支持检查BF25与actual wings，不能确认short-vol edge | Defined risk；多腿live quote、scenario与buffer待核 | conditional | Selected Base template；目标日比较相邻body、3/4/5点翼及温和不对称版本。 |
| Broad range | broad_bounded_range / defined-risk iron condor或wide BWB | 可覆盖更宽corridor，但边界外尾部更敏感 | 需完整两侧wing与event stress | Candidate CSV只有两腿，无四腿native quote或scenario | not_screenable | Live构造两侧tail cap、credit floor与planned-exit values后再筛。 |
| Downside release | directional_continuation / put debit vertical | 与<7675、负signed及7650/7600节点匹配 | Put wing仍较贵，short leg可能降本但不自动形成edge | Defined risk；风险公式可闭合 | conditional | Selected Risk contingency；比较相邻long与3/5点宽。 |
| Upside release | directional_continuation / call debit vertical | 仅与>7800、正signed和upper shelf匹配 | Call wing较低不等于便宜 | Defined risk；不得追过short / 下一节点 | conditional | Live比较780→785 / 790，不占完整策略卡。 |
| Two-sided event move | two_sided_expansion / long straddle、strangle或reverse iron condor | 事件可产生双向move | EOD implied move与IV crush不可迁移 | 总premium、双向scenario与native quote未闭合 | not_screenable | 只有事件后形成新expansion regime才从零筛。 |
| Term / vol relative value | calendar / diagonal | 默认日内授权与跨期持有冲突 | IV为partial，front kink受事件和composition影响 | 缺跨期scenario、退出机制与隔夜授权 | not_applicable | 不从headline term shape推导calendar trade。 |

### Quote Portability and Price Boundaries

| Single illustrative EOD diagnostics row | Historical construction / quote | Static arithmetic | Authority |
| --- | --- | --- | --- |
| XSP 774.77；9/4 synthetic-only | Base示例：+770C −2×775C +780C，combo bid/mid/ask=1.83/2.08/2.33，width=.50（24.04% mid）；Risk示例：+770P −765P，=.36/.39/.42，width=.06（15.38% mid） | Fly max loss=$183/$208/$233、max profit=$317/$292/$267、BE=771.83–778.17 / 772.08–777.92 / 772.33–777.67，Δ/Γ/Θ/Vega=−.0142/−.0807/+.7731/−.1426；put vertical max loss=$36/$39/$42、max profit=$464/$461/$458、BE=769.64/.61/.58，Δ/Γ/Θ/Vega=−.1302/+.0309/−.3732/+.0626 | diagnostics_only；事件前、cached、无native complex NBBO；不得迁移premium、Greeks、BE、ranking或固定腿位 |

### Local Candidate Comparison

目标日定义 s=live SPX/10、f=carry-aligned XSP forward、c=live full / PM / 0DTE共同支持的中心、m=经mapping / parity验证的容差；center uncertainty interval I_center=[min(s,f,c)−m, max(s,f,c)+m]。live cost-adjusted scenario-profit region P_live 是计划退出时点mark-to-market扣除premium、fees与双边slippage后为正的价格集合。Centered candidate只有在 s、f 与 I_center 均完整位于P_live且保持正buffer时才通过；EOD状态为pending_target_session_confirmation。

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Centered grid：目标日比较9/4 0DTE与9/8 4D；body取live center相邻整数XSP strike；比较3/4/5点对称翼及downside-supported温和BWB | 用上述I_center ⊂ P_live测试，不以单一node固定body | 刷新9/4 event IV、BF25和actual wings；比较0DTE gamma/theta与4D weekend exposure | Base、两侧boundary、vol-shock、invalidation、planned-exit MTM和tail loss全量比较 | 目标near-flat Delta；Gamma/Vega/Theta逐腿重算 | Native优先；否则broker-supported atomic net limit；历史3/4点fly宽度偏大、5点仅勉强过25%门槛 | none | deferred_to_t1；不选EOD赢家 |
| Broad-range grid：defined-risk condor / wide BWB | 两侧breakeven需覆盖live base interval与迁移buffer | Partial surface不足以稳定排序双翼 | 两侧tail cap、credit floor、event stress均待核 | Short Gamma/Vega需live stress | EOD文件不覆盖四腿 | none | not_screenable |
| Downside grid：long put靠近live trigger，short朝765 / 760；比较相邻long、3/5点宽及9/4 / 9/8 | Trigger→首个复核位的planned-exit MTM扣成本为正；short仍在前方 | 刷新put wing，验证short leg真实降本 | 0<d<W、净RR约≥1、max loss≤R_eff | Negative Delta、long Gamma/Vega、negative Theta | 全腿≤30秒；native / atomic net limit | none | deferred_to_t1；Risk算法 |
| Upside grid：long call靠近780 acceptance，short朝785 / 790；比较相邻long与3/5点宽 | Trigger→首个复核位的planned-exit MTM扣成本为正 | 刷新call wing与event decay | 首次可评估价格越过合理short / 下一节点即取消 | Positive Delta、long Gamma/Vega、negative Theta | 同上 | none | deferred_to_t1；screening only |

### Base Candidate Template — Base Case

- **Setup / linked scenario：** centered_stability / debit butterfly / conditional，只绑定13:00 ET后的7700–7800 range reconfirmation；net_premium_type=debit，客户视角正数表示支付；Quote Portability=none，representation=candidate_template，fixed_legs_authority=candidate_template_only，live selected legs=pending。
- **Expiry / holding window：** 比较9/4 target 0DTE与9/8 4D；9/8会跨Labor Day周末，若无法在当日退出则不适用。最早13:00评估，range thesis、center buffer或流动性失效即退出，最晚15:15 ET，不隔夜。
- **Activation / cancellation：** 三根完成bars留在core、signed_stable_positive成立、无vol / node reset；s、f与I_center完整位于P_live并有正buffer。任一bar越界、center / surface迁移、mapping / parity / quote或scenario gate失败即取消。
- **Strike / width / symmetry：** Body按live center相邻整数strike重选，比较3/4/5点对称翼；仅当path asymmetry、actual-wing成本与下侧tail cap共同改善时评估温和BWB。Body是最大到期收益点，不是必须精确停留的pin。
- **IV / Greeks / scenario：** 刷新candidate expiry ATM、25Δ与actual wings、BF25；目标near-flat Delta、short Gamma/Vega、positive Theta。Base、两侧boundary、vol shock、invalidation及planned-exit MTM都须在费用后为正；到期payoff只作stress reference。
- **Payoff / risk / price：** 对称wing宽W、debit d、N组时，all-in max loss=100Nd+C_RT，净max profit=100N(W−d)−C_RT，成本调整BE=L+d+C_RT/(100N)与U−d−C_RT/(100N)；risk_budget_max_debit=(R_eff−C_RT)/(100N)，还须服从更严格的live payoff / liquidity bound。eod_nonbinding_debit_reference仅见上表且binding=false，t1_live_max_debit=pending；cost_sensitivity_range为经纪商确认的逐腿费用加保守双边slippage，随腿数、合约数和退出次数缩放。
- **Order / exit / failure：** 从实时native combination mid附近按最小tick改善net limit；无公开native quote时只允许broker-supported atomic multi-leg net-limit，不拆腿追价。每根5-minute bar复核center、buffer与surface，最晚15:15退出。相较双向裸买premium，fly把支出集中于稳定区；它仍可能因0DTE短gamma、中心迁移、IV重定价和多腿fill风险失败。

### Risk-Path Contingency

- **Setup / linked scenario：** directional_continuation / put debit vertical / conditional，仅绑定两根close<7675且signed_negative_confirmation成立的downside release；不是基准持仓建议。net_premium_type=debit，客户视角正数表示支付；Quote Portability=none，representation=candidate_template，fixed legs仅illustrative，live legs=pending。
- **Expiry / holding window：** 目标日比较9/4 0DTE与9/8 4D并默认日内；最早13:00，time stop=min(入场后60分钟, 15:30 ET)，不跨Labor Day周末。
- **Strike / width：** Long put选择live 767.5 trigger映射附近的可交易整数strike，short朝765 / 760，比较相邻long与3/5点宽；若首次可评估价格已越过合理short或下一节点，取消而非追价。接受7650后重新定中，7600 / 7550只作后续复核点。
- **IV / Greeks / scenario：** 刷新ATM、25Δ与actual put wings；预期negative Delta、long Gamma/Vega、negative Theta。Trigger→7650及后续节点的planned-exit MTM必须覆盖debit、费用与双边slippage；reclaim 7675、signed失效、vol / node reset均为thesis failure。
- **Payoff / risk / price：** Long put执行价K_L、宽度W、debit d时，0<d<W且risk_budget_and_static_payoff_cap=min[(R_eff−C_RT)/(100N), W/2−C_RT/(100N)]；all-in max loss=100Nd+C_RT≤R_eff，净max profit=100N(W−d)−C_RT，成本调整BE=K_L−d−C_RT/(100N)，到期盈利区在BE下方且下侧收益封顶。eod_nonbinding_debit_reference仅见上表且binding=false；t1_live_max_debit=pending，并取live scenario / liquidity与预算中更严格者；cost_sensitivity_range为逐腿费用加保守双边slippage，随N与退出次数缩放。
- **Order / exit / failure：** Native complex quote优先；否则仅以实时全腿构造保守atomic net limit，quote age≤30秒且组合宽度、parity和scenario均通过。Short leg可降低昂贵put wing成本并封顶风险；late trigger、0DTE IV crush、short过近、wide quote或复核节点scenario edge不足都会使其失效。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

- **Condition：** 8:30–12:45事件与checkpoints均结束；三根完成的5-minute close留在7700–7800，signed_stable_positive成立，中心未实质迁移且无vol shock；s、f与I_center完整位于P_live并有正buffer。
- **Expected path：** 价格围绕live center重新估值，在7700 / 7800边界前保持稳定；该路径不承诺收盘pin或触及fly body。
- **Linked Base plan：** 在9/4 0DTE与9/8 4D、相邻body、3/4/5点翼及适度不对称版本间实时比较centered debit butterfly；live scenario、quote、cost和risk全部通过后才人工评估。
- **Invalidation：** 任一完成bar离开core、center / node迁移、profit-zone buffer≤0、signed失效、vol shock、mapping / parity / quote failure，或到15:15 ET。

### Risk Case

- **Condition：** Downside主contingency要求两根close<7675且signed_negative_confirmation成立；互斥的upside branch要求两根close>7800、signed_positive_confirmation成立并保持7800–7900 shelf。
- **Expected path：** Downside先复核7650，再看7600 / 7550；upside先复核7850，再看7900，接近8000时重新建图。节点都是repricing / reassessment points，不是目标承诺。
- **Linked Risk-Path Contingency：** Downside绑定put debit vertical；upside只保留call debit vertical实时筛选，不占第二张完整策略卡。首次可评估价格已越过合理short / 下一节点时不追价。
- **Invalidation：** Reclaim 7675或跌回7800、对应signed confirmation失效、shelf / node迁移、vol reset、scenario edge或quote / risk gate失败。

### No-Trade Case

- **EOD no-qualified-plan condition：** 当前不成立；核心Formal足以定义结构先验、payoff family、trigger / invalidation、封顶风险和T+1 live re-screen protocol。Quote Portability=none与未来live数据pending不单独把Grade降为C。
- **T+1 execution abort condition：** Event / checkpoint reset未完成；gap未retest；core内range未重确认；7700下破但7675未确认；live full / PM / 0DTE、ATM / 25Δ / actual wings未刷新；node migration或vol shock；mapping / parity、全腿≤30秒quote、native / atomic construction、默认组合宽度门槛、scenario value、费用 / slippage或remaining risk任一失败；需要裸卖、无限风险、未授权隔夜，或机会晚于相应time stop。
- **What must change before reconsideration：** 完成相应reset，重建live map、surface、forward、center与quotes，并使Local Candidate Comparison、planned-exit edge、defined-risk payoff及全部风险门禁共同通过。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on Structural View / Plan Grade / Execution Status |
| --- | --- | --- |
| Live full / PM / target-0DTE signed与7700–7800节点中心 | 验证PM主导翻正能否跨过事件并保留正shelf | 同步稳定维持range prior；<7675且三层转负切换downside；数据未齐时Execution Status保持requires_external_live_source，实时门禁失败则blocked_by_live_execution_failure。 |
| 9/4 ATM event kink、25Δ wings与BF25 | 目标0DTE在EOD已逆势升波，partial packet无法代表事件后曲面 | 决定expiry / wing / family与live edge；曲面异常主要降低Execution Status，不单独改方向。 |
| SPX / XSP spot、carry-aligned forward、mapping / parity与I_center⊂P_live | Base fly要求中心及不确定区间被实时盈利区完整覆盖 | Containment失败拒绝centered family；结构Grade可仍为B。 |
| VIX 15分钟变化、相关ATM IV变化与关键node migration | 任一shock都会使原bar count、surface与候选失效 | 触发reset；若反复发生则No Trade / observe only。 |
| 7650 / 7600 / 7550与7850 / 7900 / 8000路径 | 区分首个重新估值节点、后续release和上方孤立风险 | 改变分支与re-center时点；节点不是必达目标或止盈承诺。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
