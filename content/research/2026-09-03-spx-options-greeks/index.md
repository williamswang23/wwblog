+++
title = "SPX期权持仓与Greeks结构分析-260902"
date = "2026-09-03"
data_as_of = "2026-09-02"
draft = false
description = "基于2026年9月2日收盘的 SPX durable GEX、AM/PM signed、IV term structure 与关键节点，分析9月3日条件路径与失效点；不构成实时交易指令。"
series = "SPX期权分析报告"
categories = ["市场结构", "衍生品"]
tags = ["SPX", "期权", "Greeks", "GEX", "波动率", "0DTE", "风险管理"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "61e368abaf2c94dcffa4dc8dab48680c72704870aee3bc9322b25f71776be18c"
+++
# SPX期权持仓与Greeks结构分析-260902

## 1. 结论

9月2日盘后形成“PM 负 signed 显著修复、AM 正锚增强、现货附近进入符号过渡区”的结构，9月3日基准先验调整为 `range_bias with downside-release asymmetry`，Plan Grade / Plan Status=`B / Conditional Next-Day Plan`、Execution Status=`requires_external_live_source`；只有 8:30–11:30 ET 的事件与拍卖完成 reset 后，7650–7700 经三根 5-minute bars 与第10节 `signed_stable_repair` 确认，才评估中心型有限风险结构，本报告不是实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | `range_bias with downside-release asymmetry`；PM 负 signed 已显著修复但未消失，AM 与 9/18 正锚增强，structural confidence=`Medium`。 |
| Earliest evaluation | 最早 `11:45 ET`：8:30 宏观与 Fed、10:00 ISM、10:30 EIA、11:30 Treasury auction 均已实际可见，随后完成三根 5-minute bars，并重建 opening / vol / full-PM-0DTE map、surface、mapping 与 quotes。 |
| Base activation | 若三根完成 bars 留在 `7650–7700`、`signed_stable_repair` 成立且 center uncertainty interval 完整落入 live cost-adjusted profit zone，则评估 centered debit butterfly，先复核 `7675` 附近与两侧边界；任一 bar 离开区间、中心迁移或 profit-zone containment 失败即失效。 |
| Downside branch | 若进一步出现两根完成的 5-minute close `<7600`，且 `signed_negative_confirmation` 成立，则评估 put debit vertical，首个复核位 `7550`；reclaim 7600、short strike 已被越过或 live edge 失败即失效。 |
| Upside branch | 若两根完成的 5-minute close `>7700`，且 `signed_positive_confirmation` 成立、7700–7800 shelf 稳定，则评估 call debit vertical，首个复核位 `7750`；跌回 7700、upper shelf 迁移或 live edge 失败即失效。 |
| Otherwise | `No Trade / observe only`：event reset 未完成、仅跌破 7650 而未确认 7600、range 未重确认、vol shock、node migration，或 live surface / quote / parity / scenario value / risk budget 任一门禁失败；完成新 map、surface 与 Local Candidate Comparison 后再考虑。 |

Plan Grade / Plan Status=`B / Conditional Next-Day Plan`，Execution Status=`requires_external_live_source`，`planning_only=true`；这是盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 9月2日 SPX 官方收盘 7666.60，较前一日上涨 35.13 点或 0.46%；VIX 从 16.34 降至 15.20。收盘回到前日报告的 7600–7700 `Otherwise / No Trade` corridor，终态削弱了原 `downside_bias`。
- 删除 9月2日 0DTE 后，durable full gross GEX 为 369.178B/1%，modeled signed GEX 为 −14.634B/1%、vendor-reported OI 为 11,030,044；29 个严格共同到期的 signed 较 T−1 修复 14.368B，负值绝对幅度收窄 49.54%。
- Strict-common AM / PM signed 分别从 +0.503B / −29.505B 变为 +2.430B / −17.064B；负结构仍由 PM 承担，因此 range 先验保留下侧释放不对称。
- 9月18日仍是 dominant expiry：gross 201.020B、signed +3.656B、占 durable gross 54.45%；中期锚增强，但 AM / PM 与结算差异不能合并解释为单一日内 pin。
- Formal IV 为 `partial / deterministic_expiry_proxy`：3D 高于 7D 0.8280vp，7D 后逐步上行；约 7D、14D、30D smile 的 ATM 与 downside-skew slope 均表观下移/变平。质量降级与滚动 expiry composition 限制其权限为 `degraded_local_evidence`。
- Formal selected map 在 7650 仍为负、7675–7800 转正，spot 处于过渡带；7650–7700 是中心区，7600 与 7700 分别承担下侧确认和上侧修复门槛，8000 为上方负节点警报。
- 盘后可形成 `B / Conditional` 计划：Base family 为 centered debit butterfly，downside Risk contingency 为 put debit vertical，upside call vertical 保留条件筛选；EOD XSP Quote Portability=`none`，全部固定 legs 与价格仅作 diagnostics。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1: 2026-09-01 | T: 2026-09-02 | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| Price / prior playbook | SPX 7631.47；`downside_bias`；Base 需 `<7600`，Upside 需 `>7700` | SPX 7666.60 | +35.13 点 / +0.4603%；收盘仍在 7600–7700 corridor | Terminal outcome=`Otherwise / No Trade corridor`；downside / upside terminal confirmation 均未成立。 |
| Strict-common durable Greeks | Gross 329.149B；signed −29.002B；DEX +389.999B | Gross 369.178B；signed −14.634B；DEX +579.267B | Gross +12.16%；signed +14.368B；DEX +48.53% | 负 signed 显著修复且仍未转正，支持 range prior 与下侧尾部条件并存。 |
| Higher-order Greeks | Vanna −2.822B；Charm +7.139B；Volga +17.334B | Vanna −4.881B；Charm +6.231B；Volga +18.398B | −2.059B / −.909B / +1.064B | Vanna 更负、Charm 正值缩小，降低对稳定路径的置信度；不单独推导方向或 flow。 |
| Strict-common AM / PM signed | AM +0.503B；PM −29.505B | AM +2.430B；PM −17.064B | AM +1.927B；PM +12.441B | AM 缓冲增强；PM 仍是 current full 负值来源，上行确认仍需第10节 `signed_positive_confirmation`。 |
| Short / dominant expiries | 9/3 signed −4.276B；9/4 −10.925B；9/18 +2.223B | 9/3 +0.291B；9/4 −5.552B；9/18 +3.656B | 近端负化收窄，9/18 正锚增强 | 9/3 在目标日成为新 0DTE，不能迁移；9/4 仍是近端负层，9/18 提供 durable 缓冲。 |
| ATM term | Fixed 3D / 7D / 30D=14.0694% / 11.1377% / 12.9768% | 10.5948% / 9.7668% / 12.1998% | −3.4745 / −1.3708 / −0.7769vp；`fixed_tenor_atm` | 3D 从 prior 9/4 observed 改为当前 9/4–9/8 插值；9/4 same-expiry −1.6744vp、9/8 −1.9783vp，不能把 fixed-tenor 变化全归为纯 repricing。 |
| Selected smile | 约 7D ATM 11.1377%、25Δ slope 3.3232vp、BF25 .2828vp | 约 7D ATM 9.7668%、slope 2.2392vp、BF25 .2248vp | −1.3708 / −1.0840 / −.0580vp；`rolling_tenor_slot_fixed_delta`，9/8→9/9 | Level 下移、downside slope 表观变平；expiry roll、GTH 时点和 partial 权限使 curvature materiality 保持不确定。 |

前一日 historical 5-minute trigger / acceptance=`not_verifiable`，execution / P&L=`not_supplied`；因此只能复盘收盘终态，不能评价盘中交易成败。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

SPX 日涨 0.46%，VIX 日降 1.14 点或 6.98%；2Y / 10Y Treasury 为 4.39% / 4.79%，日内口径均未变，1M 为 3.83%、下降 2bp。RV5 / RV10 / RV20 为 8.42% / 7.95% / 7.40%，VIX 仍高于 RV20；EFFR 3.63% 与 SOFR 3.66% 只更新至 9月1日，stale 1 day。价格、波动与 signed 修复同步支持风险释放，但不构成 dealer flow 或因果证明。

- **08:30 ET reset：** [BLS 二季度 Productivity and Costs 修订](https://www.bls.gov/schedule/news_release/prod2.htm)、[BEA/Census 7月国际贸易](https://www.bea.gov/news/schedule/full)与 [Fed Governor Waller “Economic Outlook”](https://www.federalreserve.gov/newsevents/2026-september.htm)集中在开盘前；开盘后重新建立 spot、vol、0DTE 和 surface 基线。
- **10:00–10:30 ET reset：** [ISM Services PMI](https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/) 于 10:00 发布，[EIA Weekly Natural Gas Storage](https://www.eia.gov/reports/upcoming.php)于 10:30 发布；任一结果引发 vol shock 或 node migration 都清零原 bar count。
- **11:30 ET auction reset：** Treasury 4-week $90B 与 8-week $85B bills 的 noncompetitive / competitive cutoff 为 11:00 / 11:30（[TreasuryDirect API](https://www.treasurydirect.gov/TA_WS/securities/search?format=json&auctionDate=2026-09-03)）；结果实际可见后再累计三根完整 5-minute bars，理论最早评估 11:45，发布延迟则顺延。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 负 signed 修复支持 range，但残余负值仍有路径意义

- **Claim：** T+1 的基准先验由 `downside_bias` 调整为 `range_bias with downside-release asymmetry`。
- **Evidence：** 29 个 strict-common expiry 的 signed 从 −29.002B 修复至 −14.634B，负幅收窄 49.54%；durable full signed 仍为 −14.634B。
- **Mechanism：** Modeled signed proxy 的负幅收窄降低了广泛负反馈先验，剩余负值表示边界失守后仍需防范对冲敏感度上升；它不是已观测 dealer inventory 或 hedge flow。
- **T+1 Implication：** Core 内先验证稳定性；只有 7600 下方的价格 acceptance 与 live full / PM / 0DTE 负号共振，才评估下行 continuation。
- **Falsifier：** `signed_negative_confirmation` 与 7600 下方 acceptance 推翻 Base range；`signed_positive_confirmation` 与 7700 上方 acceptance 则把先验转向 upside repair。
- **Confidence：** `Medium`。

### Thesis 2 — AM 与 9/18 锚增强，PM 仍决定短端脆弱性

- **Claim：** Durable anchor 增强使中心稳定具备结构候选资格，短端 PM 残余负值阻止无条件卖波动。
- **Evidence：** AM signed 为 +2.430B、PM 为 −17.064B；9/18 gross 201.020B、signed +3.656B，其中 AM / PM signed 分别 +2.003B / +1.653B。
- **Mechanism：** AM monthly 更适合解释中期缓冲，PM 与新 0DTE 更贴近日内路径；mixed-settlement DEX 不能合并为方向信号。
- **T+1 Implication：** Base range 需 live PM / 0DTE 不再恶化；上破 7700 也需 full / PM / 0DTE 同步修复。
- **Falsifier：** 9/18 anchor 迁移、PM signed 再度深负，或 live center 无法稳定在 corridor 内。
- **Confidence：** `Medium`。

### Thesis 3 — 现货位于局部符号过渡，边界确认比单点 pin 更重要

- **Claim：** 7650–7700 是 transition core，7675 附近的正号不能单独证明 pin 或完整 gamma flip。
- **Evidence：** Selected gex_point 在 7650 为 −14.969M/点、7675 为 +1.823M/点、7800 为 +47.888M/点；spot 7666.74 位于负转正区，selected 仅覆盖 durable gross 的 76.99%，omitted signed 仍为 −13.457B。
- **Mechanism：** 局部正 shelf 可降低小幅波动的延续性，但 omitted exposure、新 0DTE 与事件后重定价都能迁移中心。
- **T+1 Implication：** 三根 bars 与 profit-zone containment 用于 Base；下侧以 7600、上侧以 7700 作正式确认，不追逐 core 内单点符号。
- **Falsifier：** 节点迁移超过 10 SPX 点、selected 与 full 冲突扩大，或 8000 负节点向现货方向下移。
- **Confidence：** `Medium-Low` 对具体 pin，`Medium` 对 transition regime。

### Thesis 4 — IV 下移与 skew flattening 只降低局部成本先验

- **Claim：** 前端与 smile 下移有利于降低 long-premium 名义成本，当前 packet 无法确认可交易 relative-value edge。
- **Evidence：** Fixed 3D / 7D / 30D 分别下降 3.4745 / 1.3708 / .7769vp；约 7D、14D、30D downside-skew slope 分别下降 1.0840 / .6291 / .6833vp。Packet overall=`partial`。
- **Mechanism：** Level、slope、curvature 与 source-expiry composition 同时变化；事件后 theta、vega 与 wing 排序可能重新定价。
- **T+1 Implication：** Fly、put / call vertical 都按 live ATM、25Δ 和 actual wings 重筛；calendar / diagonal 不因 headline term shape 获得授权。
- **Falsifier：** Live surface 重定价使目标 scenario value 不覆盖 premium、费用与双边 slippage，或 curvature / profit zone 无法容纳 center uncertainty。
- **Confidence：** `degraded_local_evidence`。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| Strict-common signed 修复 14.368B，AM 正锚增强，SPX 反弹且 VIX 回落 | Durable full signed 仍为 −14.634B，PM −17.064B，omitted signed −13.457B | Range 为基准；下侧 continuation 只在 7600 与 `signed_negative_confirmation` 共同成立后启用。 |
| 9/18 signed +3.656B、占 durable gross 54.45%，7675–7800 为正 shelf | 9/4 signed −5.552B，7650 以下 selected 节点持续为负，8000 再转 −29.980M/点 | 中期 anchor 提供稳定证据；短端、下侧和 8000 分别设置 release / warning 门槛。 |
| EOD center interval 在示例 fly 的 pre-cost profit zone 内，direct SPX/XSP 映射一致 | Quote Portability none、无 native complex NBBO、9/4 parity degraded，且目标日经历多次 hard reset | 只保留 candidate template；live cost-adjusted containment、parity 与 atomic net-limit 能力决定 Execution Status。 |
| 15/15 selected smile nodes 均 observation-bracketed，ATM 与 slope 普遍下移 | Monotonicity 0.8333<0.90、legacy-selected ratio .20>.10；selected expiries 全部滚动 | IV 只作降级的局部 planning evidence，不用它批准 short-vol、calendar 或精细 curvature trade。 |

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | ---: | ---: | --- | --- | --- |
| 9/3 exact / target | 1.8044D→.7648D | 12.4189% | −1.0475vp；`same_expiry_atm` | T+1 转 0DTE；SPXW PM | `local_fitted / linear_total_variance_in_k_at_zero`；`observation_bracketed`；conf=.9848；flags=[]；roll-down + repricing |
| 9/4 exact / front event | 2.8044D→1.7648D | 12.3950% | −1.6744vp；`same_expiry_atm` | 9/4 Employment Situation；SPXW PM | 同上；conf=.9884；flags=[]；roll-down + repricing |
| 9/8 exact | 6.8044D→5.7648D | 9.1594% | −1.9783vp；`same_expiry_atm` | 3D / 7D composition control | 同上；conf=.9883；flags=[] |
| 9/9 exact | 7.8044D→6.7648D | 9.7668% | −1.6959vp；`same_expiry_atm` | Current 7D source | 同上；conf=.9908；flags=[] |
| 9/15 exact | 13.8044D→12.7648D | 10.4604% | −1.3748vp；`same_expiry_atm` | Prior 14D source control | 同上；conf=.9910；flags=[] |
| 9/16 exact | 14.8044D→13.7648D | 11.2876% | −1.2448vp；`same_expiry_atm` | Current 14D source | 同上；conf=.9928；flags=[] |
| 10/1 exact | 29.8044D→28.7648D | 12.0562% | −.9206vp；`same_expiry_atm` | Prior 30D source control | 同上；conf=.9882；flags=[] |
| 10/2 exact | 30.8044D→29.7648D | 12.1998% | −.9019vp；`same_expiry_atm` | Current 30D source | 同上；conf=.9905；flags=[] |
| 10/16 exact | 44.8044D→43.7648D | 12.5416% | −.6904vp；`same_expiry_atm` | 45D common-expiry control | 同上；conf=.9963；flags=[] |
| Fixed 3D | 3D | 10.5948% | −3.4745vp；`fixed_tenor_atm` | Front composition changed | T−1 9/4 observed；T 9/4(1.7648D)/9/8(5.7648D), w=.3088；`local_total_variance_interpolation / interpolated_between_observed_expiries`；conf=.9883；no extrapolation |
| Fixed 7D | 7D | 9.7668% | −1.3708vp；`fixed_tenor_atm` | 9/8→9/9 source roll | `local_fitted / observation_bracketed`；conf=.9908；两日 observed；no extrapolation |
| Fixed 14D | 14D | 11.2876% | −.5476vp；`fixed_tenor_atm` | 9/15→9/16 source roll | 同上；conf=.9928；两日 observed；no extrapolation |
| Fixed 30D | 30D | 12.1998% | −.7769vp；`fixed_tenor_atm` | 10/1→10/2 source roll | 同上；conf=.9905；两日 observed；no extrapolation |
| Fixed 45D | 45D | 12.5719% | −.6601vp；`fixed_tenor_atm` | Back composition changed | T−1 10/16 observed；T 10/16(43.7648D)/10/23(50.7648D), w=.1765；`local_total_variance_interpolation / interpolated_between_observed_expiries`；conf=.9917；no extrapolation |

当前 curve shape 为 `mixed`：3D 高于 7D .8280vp，其后 7D→14D→30D→45D 逐步抬升；7D−30D 为 −2.4330vp。9/3–9/4 构成前端高位平台，9/4 相对 9/8 高 3.2357vp。Fixed 3D−7D kink 从 +2.9317vp 压缩至 +.8280vp，而 same-expiry 9/4−9/8 spread 从 2.9317vp 扩至 3.2357vp，说明 fixed-tenor bracket composition 与合约 repricing 必须分开。以上 shape / spreads 为 `report-layer calculation from packet nodes`。T 日 9/2 0DTE 已从 positive-DTE term prior 删除；9/3 在目标日成为新 0DTE，必须 live rebuild。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| T: 9/9 / ≈7D | 13.0179% | 11.1112% | 9.7668% | 8.8720% | 8.4011% | 2.2392vp | .2248vp | `local_fitted / linear_in_forward_delta_within_observed_support`；ATM=`linear_total_variance_in_k_at_zero`；observation-bracketed；min conf=.9258；flags=[] |
| Δ T vs. T−1: 9/8(6.8044D)→9/9(6.7648D) | −2.6930vp | −1.9708vp | −1.3708vp | −.8868vp | −.6120vp | −1.0840vp | −.0580vp | `rolling_tenor_slot_fixed_delta`；degraded；expiry roll + repricing；BF25 materiality indeterminate |
| T: 9/16 / ≈14D | 16.3543% | 13.3873% | 11.2876% | 9.9077% | 9.2890% | 3.4797vp | .3599vp | 同上；min conf=.9289；flags=[] |
| Δ T vs. T−1: 9/15(13.8044D)→9/16(13.7648D) | −1.2094vp | −.9375vp | −.5476vp | −.3083vp | −.0451vp | −.6291vp | −.0753vp | `rolling_tenor_slot_fixed_delta`；degraded；expiry roll + repricing；curvature change small |
| T: 10/2 / ≈30D | 18.9132% | 14.8304% | 12.1998% | 10.6066% | 9.9929% | 4.2238vp | .5186vp | 同上；min conf=.9442；flags=[] |
| Δ T vs. T−1: 10/1(29.8044D)→10/2(29.7648D) | −1.3769vp | −1.1156vp | −.7769vp | −.4323vp | −.2489vp | −.6833vp | +.0030vp | `rolling_tenor_slot_fixed_delta`；degraded；expiry roll + repricing；BF25 unchanged within uncertainty |

`downside_skew_25d = IV25Δput − IV25Δcall`，`put_wing_premium_25d = IV25Δput − ATM`，`call_wing_premium_25d = IV25Δcall − ATM`，`BF25 = .5 × (IV25Δput + IV25Δcall) − ATM`；均为 `report-layer calculation from packet nodes`，downside skew 是 fixed-delta smile slope proxy，不是统计 skewness。约 7D / 14D / 30D 的当前 put-wing premium 为 +1.3444 / +2.0997 / +2.6305vp，call-wing premium 为 −.8948 / −1.3799 / −1.5933vp；相对 T−1，put-wing premium 变化 −.6000 / −.3899 / −.3387vp，call-wing premium变化 +.4840 / +.2393 / +.3446vp。

三组 ATM level 均下移，25Δ downside slope 均表观变平；BF25 在约 7D / 14D 小幅下降、约 30D 基本不变。当前横截面的 downside slope、put-wing premium 与 BF25 均随期限上升，put wing 仍比 call wing rich；这些 rolling-slot 变化同时含 expiry roll、composition 与 repricing。

策略传导是：directional put vertical 可用 short leg 降低较贵 put wing 的成本，但须由 live scenario edge 证明；centered fly / condor 依赖 curvature、中心稳定与事件后 short-gamma / vega 风险，维持 conditional；calendar / diagonal 与 partial term evidence、默认日内授权和跨期退出机制不匹配。Term / skew 只描述相对定价状态，不提供确定方向或执行许可；T+1 必须刷新 9/3 0DTE、candidate expiry ATM、25Δ / actual wings、Greeks、quotes 和 scenario values，重大 surface repricing 会清空 EOD ranking。

## 9. Key Expiry / Strike / Dealer Node

| SPX / XSP | Role | Evidence | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 9/2 expiry | 已到期 transient 0DTE | Gross 25.952B、signed −1.319B/1%、DEX +8.638B、OI 329,896；Vanna / Charm / Volga 原字段为空 | T+1 删除 | 只解释 T 日近收盘结构，不迁移为 9/3 pin。 |
| 9/3 expiry | Target-session 0DTE prior | T 日1D gross 11.689B、signed +.291B、DEX −1.441B、OI 138,378；target-expiry 7650 / 7600 为 −3.656 / −2.080M/点，7675 / 7700 为 +2.927 / +3.496M/点 | 高度 transient | 开盘与每次 hard reset 后重建，不用 EOD 正号批准 range。 |
| 9/4 expiry | 1D candidate / front-event layer | T 日2D gross 26.119B、signed −5.552B、DEX −6.173B、OI 658,228；exact ATM 12.3950% | 短端 PM；9/4 08:30 Employment Situation 为下一 hard reset | 默认 positive-DTE candidate expiry；默认日内退出，不跨 9/4 数据。 |
| 9/18 mixed | Dominant durable anchor | Gross 201.020B、signed +3.656B、DEX +528.376B、OI 5.624M；占 durable gross 54.45%；AM / PM signed +2.003 / +1.653B | T:16D，T+1:15D | 支持中期稳定先验；AM / PM 分层复核，不当作单一日内 pin。 |
| 7650–7700 / 765–770 | Central transition / core | Selected 7650 −14.969M、7675 +1.823M、7680 +15.778M、7700 +5.375M/点；spot 7666.74 | Selected map 覆盖 durable gross 76.99% | 三根 bars、center stability 与 live profit-zone containment 共同确认 Base；core 内 directional release 尚未发生。 |
| 7600 / 760 → 7550 / 755 → 7500 / 750 | Downside warning / release nodes | Selected −8.905 / −24.644 / −34.913M/点 | 负 shelf 为局部 selected 结构，omitted signed 也为负 | 7650 下方先观察；两根 close `<7600` 且 `signed_negative_confirmation` 才评估 put vertical，先复核 7550、再看 7500。 |
| 7700 / 770 → 7750 / 775 → 7800 / 780；8000 / 800 | Upside repair / warning | Selected +5.375 / +23.384 / +47.888M/点；8000 −29.980M/点 | 7700–7800 正 shelf；8000 为上方负节点 | `>7700` 且 `signed_positive_confirmation` 时先复核 7750 / 7800；接近 8000 必须重新建图，不外推正 shelf。 |

Selected map 合并 9/3、9/4、9/18、10/16 四份 Formal same-date-combined table；`gex_point = Σgex_dealer / (0.01 × 7666.74)`。Selected gross 284.233B、signed −1.177B；omitted gross 84.945B、signed −13.457B，因此本节不声称 full-chain gamma flip、真实 dealer inventory 或确定 pin。

## 10. T+1 Decision Map, Structural View and Plan Grade

- **Primary regime：** `PM negative-signed structure materially repaired, with stronger AM anchor and a near-spot sign transition`。
- **Directional prior：** `range_bias with downside-release asymmetry`。
- **Path asymmetry：** Core 稳定是 Base；下侧只有 7600 与 `signed_negative_confirmation` 后才启动，但 7550 / 7500 负 shelf 使确认后的 release 风险更连续；上侧必须满足 `signed_positive_confirmation` 并保持 7700–7800 shelf。
- **Base path：** 11:30 auction 后重建所有 live inputs，7650–7700 内完成三根 bars、`signed_stable_repair`、center 与 cost-adjusted profit zone 保持包含关系，才评估 centered debit butterfly。
- **Risk path：** `<7600` 的 `signed_negative_confirmation` 优先绑定 put debit vertical；`>7700` 的 `signed_positive_confirmation` 只保留 call debit vertical 筛选。
- **Plan Grade / Plan Status：** `B / Conditional Next-Day Plan`。
- **Execution Status：** `requires_external_live_source`；`planning_only=true`。
- **Quote Portability / representation：** `none`；`candidate_template`，fixed-legs authority=`candidate_template_only`。
- **IV Structure Gate：** `partial / degraded_local_evidence`；surface repricing risk=`high around scheduled resets`。
- **Why B：** Core Formal 通过，strict-common 变化、settlement 分层、机械 trigger、family screening、defined-risk 上限和 live re-screen protocol 均可闭合。
- **Why not A / C：** Partial IV、目标日 0DTE、四次事件 reset、XSP phase / parity 不确定和非 native quotes 阻止 A；现有证据足以定义候选 family、风险封顶与条件决策图，故不降为 C。
- **Change type vs. prior：** 字母等级保持 B；directional prior 的 `downside_bias → range_bias` 属 `market_change`，不属于 methodology restatement。

**Operational signed definitions：** 每次 hard reset 后，以同一外部 live source、同一合约宇宙在第一根完成的 5-minute bar 收盘取得同步基线 `B0={full, PM, 0DTE}`；后续判断只使用对应 bar 收盘、quote age≤30秒的同步 snapshot。`signed_stable_repair` 使用 `B0` 及随后两份连续 snapshot（三份合计），每一层均须满足 `S_i(t)≥min[B0_i,0]`，且后两份中每份至少两层非负、最终 full 非负；`signed_negative_confirmation` 要求与两根 `<7600` close 对齐的两份 snapshot 中三层均负，且第二份各层不高于第一份；`signed_positive_confirmation` 要求与两根 `>7700` close 对齐的两份 snapshot 中三层均非负。任何 event、vol shock、node migration、source或universe变化均废止 `B0` 并重新计数。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 08:30–11:30 reset 未完成 | 各结果实际可见；opening、vol、map 与 surface 已刷新 | EOD ranking 与 bar count 无效 | `No Trade / observe only` | 最早 11:45；结果延迟则顺延 |
| Opening gap 位于 7650 / 7700 外 | 先回测原边界，再重新累计 acceptance | Gap 本身不构成 qualified release | 等待 retest 与 live map | 未回测=`observe only` |
| 7650–7700 core，range 尚未重确认 | 三根 bars、center≤10 SPX 点迁移、无 vol shock | Directional release 尚未触发，stability 也尚未成立 | `No Trade / observe only` | 完成 range reconfirmation 或边界 release |
| Post-event range reconfirmed | 三根 bars 留在 core；`signed_stable_repair`；spot / forward / center interval 全部位于 live cost-adjusted profit zone 且有正 buffer | Base centered-stability path | 人工评估 centered debit butterfly | 任一 bar 越界、containment / quote / scenario gate 失败 |
| Close `<7650`、但尚未确认 7600 | 继续观察两根 bars与 live signed；不追第一次穿越 | Range thesis 受损、下侧仅为 warning | `No Trade / observe only` | Reclaim 7650 或形成 `<7600` confirmation |
| Two closes `<7600` | `signed_negative_confirmation`；无 node / vol reset；first evaluable price 未越过合理 short | Downside release | 评估 put debit vertical；首复核 7550，其后 7500 | Reclaim 7600、short 已穿越或 live edge 失败 |
| Two closes `>7700` | `signed_positive_confirmation`；7700–7800 shelf 稳定 | Upside repair | 评估 call debit vertical；先复核 7750，其后 7800 | 跌回 7700、shelf 迁移或 full / selected 冲突 |
| Range thesis failure / profit-zone mismatch | Center interval 穿越 live breakeven、buffer≤0，或 fly 的 native / atomic quote与 scenario value不合格 | Core 内价格不等于可交易 stability edge | 拒绝 range family；directional branch 仍需独立 trigger | 新 center、surface 与候选比较完成前 No Trade |
| Vol shock / node migration | VIX 15分钟 +1.0 点或相关 ATM IV +2vp；中心迁移 >10 SPX 点 | 原 map、surface 与 bar count 失效 | 清零计数并重建 | 新 reset 完成前 `No Trade` |

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base range | `centered_stability / debit butterfly` | 与 post-event core stability 匹配；需 center 与 profit zone 全包含 | Partial smile 支持检查 curvature，不能确认 short-vol edge | Defined risk；多腿 live scenario、quote 与 buffer 待核 | `conditional` | Selected Base template；目标日比较相邻 body、3/5 点翼与适度不对称版本。 |
| Broad range | `broad_bounded_range / defined-risk iron condor or wide BWB` | 可覆盖更宽 corridor，但边界 release 与尾部风险更敏感 | 需完整 actual wings、short-vega stress 与事件后 surface | Candidate CSV 不覆盖四腿，且无 native combo | `not_screenable` | Live 构造、两侧 credit / tail loss 和 scenario value完整后再筛。 |
| Downside release | `directional_continuation / put debit vertical` | 与 `<7600`、负 signed 和 7550 / 7500 shelf 匹配 | Put wing 仍较贵，short leg 有降本可能 | Defined risk；9/4 EOD 算术可构造 | `conditional` | Selected Risk contingency；目标日比较相邻 long 与 3/5 点宽。 |
| Upside repair | `directional_continuation / call debit vertical` | 只与 `>7700`、`signed_positive_confirmation` 和 upper shelf 匹配 | Call wing 较低不构成 edge | Defined risk；first evaluable price 越过 short 时不追 | `conditional` | 保留筛选，不占完整策略卡；live 比较 770→775 / 780。 |
| Two-sided event move | `two_sided_expansion / long straddle, strangle or reverse iron condor` | 多次 hard reset 可造成双向 move | EOD implied move 与 IV crush 不可迁移 | 总 premium、双向 scenario 与 native quote未闭合 | `not_screenable` | 只有事件后形成新 expansion regime 才从零筛。 |
| Term / vol relative value | `calendar / diagonal` | 默认日内授权与跨期持有冲突 | IV overall partial，fixed-tenor composition 显著 | 缺跨期 native quote、退出机制与隔夜授权 | `not_applicable` | 不从 term kink 直接推导 calendar trade。 |

### Quote Portability and Price Boundaries

| Illustrative EOD diagnostics | Legs bid / mid / ask | Synthetic combo | Pre-cost payoff / Greeks | Diagnostic result |
| --- | --- | --- | --- | --- |
| Base range；9/4 `+763C −2×768C +773C`，5-point symmetric call fly；SPX映射7630/7680/7730，相对7666.60为−36.60/+13.40/+63.40点 | 763C 5.22/5.29/5.36；768C 2.09/2.115/2.14；773C .48/.495/.51 | Debit 1.42/1.555/1.69；width .27=17.36% mid | Max loss $142/$155.5/$169；max profit $358/$344.5/$331；BE 764.42–764.69 / 771.31–771.58；Δ−.0111, Γ−.0313, Θ+.3380, Vega−.1051 | Conservative pre-cost profit zone `[764.69,771.31]` 包含 EOD center interval；EOD spot的conservative expiry static payoff约+$197；Base / boundary / vol-shock / planned-exit MTM均pending，不能视为edge。 |
| Downside；9/4 `+760P −755P`，5-point put vertical；SPX映射7600/7550，相对7666.60为−66.60/−116.60点 | 760P .69/.705/.72；755P .25/.26/.27 | Debit .42/.445/.47；width .05=11.24% mid | Max loss $42/$44.5/$47；max profit $458/$455.5/$453；BE 759.58/759.555/759.53；Δ−.1053, Γ+.0183, Θ−.2207, Vega+.0655 | 静态构造可复算；Base / Risk / Invalidation / planned-exit MTM均pending，只有 `<7600` confirmation 后的 live scenario 覆盖 all-in cost 才进入人工评估。 |

上述 max profit、breakeven 与 profit zone 是 expiry arithmetic；计划在到期前退出时，必须用目标时点 mark-to-market scenario value，不以到期 intrinsic 代替。

### Local Candidate Comparison

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Centered grid：9/4，body 取 live center 附近相邻 XSP strikes；比较 3/5 点对称翼与由下侧不对称支持的温和 BWB | 重算 `I_center=[min(live spot, live forward)−mapping tolerance, max(...) + tolerance]`；要求完整落入 live cost-adjusted scenario-profit region 且 buffer>0 | 刷新 ATM、BF25、actual wings；检验 short-gamma / vega | 比较 Base / boundary / vol-shock / planned-exit MTM 与尾损 | 目标 near-flat Delta；Gamma/Vega/Theta 按腿重算 | Native 优先；否则只用 broker-supported atomic net limit | none | `deferred_to_t1 / selected Base algorithm` |
| Broad-range grid：9/4 defined-risk condor / wide BWB，围绕 live corridor 比较 3/5 点 long wings | 要求两侧 breakeven 覆盖 live base interval与迁移 buffer | Partial surface 无法稳定排序双翼 | 两侧 tail cap、credit floor、event stress均待核 | Short Gamma/Vega 风险需 live stress | EOD candidate CSV 只有两腿；无 native four-leg quote | none | `not_screenable at EOD` |
| Downside grid：9/4，long put 靠近确认时现价 / 760，short 朝 755；比较相邻 long 与 3/5 点宽 | Trigger→7550 planned-exit MTM 扣全部成本为正；short 必须仍在前方 | 刷新 put wing，验证 short leg实际降本 | `0<debit<W`、净 RR约≥1、max loss≤R_eff | Negative Delta、long Gamma/Vega、negative Theta | 全腿≤30秒；native / atomic net limit | none | `deferred_to_t1 / selected Risk algorithm` |
| Upside grid：9/4，long call 靠近 770 acceptance，short 朝 775 / 780；比较相邻 long 与 3/5 点宽 | Trigger→7750 / 7800 planned-exit MTM扣成本为正 | 刷新 call wing与 event decay | First evaluable price越过合理 short / 下一节点则取消 | Positive Delta、long Gamma/Vega、negative Theta | 同上 | none | `deferred_to_t1 / screening only` |

### Base Candidate Template — Base Case

- **Setup / linked scenario：** `centered_stability / debit butterfly / conditional`，只绑定 post-event 7650–7700 range reconfirmation；Quote Portability=`none`、representation=`candidate_template`、live selected legs=`pending`。
- **Expiry / holding window：** 默认比较目标日的 9/4（1 calendar DTE）候选；9/3 新 0DTE 另建 tactical universe，9/8 已跨周末与 Labor Day、未经授权不使用。最早 11:45 评估；持有只延续至 range thesis、center buffer与quote/liquidity仍成立，最晚 `15:15 ET` 退出，不机械套用 directional 60-minute stop，也不隔夜。
- **Activation / cancellation：** 三根 bars 留在 core，`signed_stable_repair` 成立，center migration≤10 SPX 点，无 vol shock；spot、forward 与完整 center interval 位于 cost-adjusted profit region 且有正 buffer。任一 bar 越界、range thesis failure、node / surface reset 或 quote gate 失败即取消。
- **Strike / width rule：** Body 以 live center 为中心比较相邻 1 XSP strikes，先比较 3/5 点对称翼；只有 downside asymmetry、wing cost 和封顶 tail risk 同时支持时才比较温和 BWB。Body 是最大到期收益点，不要求价格精确停在 body。
- **IV / Greeks / scenario：** 刷新 9/4 ATM、25Δ与 actual wings、BF25；目标为 near-flat Delta、short Gamma/Vega、positive Theta，所有值按 live legs 重算。Base、两侧 boundary、vol shock、invalidation 和 planned-exit MTM 全部须扣 `C_RT` 后为正；expiry payoff 只作 stress reference。
- **Risk / price / exit：** `risk_budget_max_debit=(R_eff−C_RT)/(100N)`，`all_in_max_loss=100N×live debit+C_RT≤R_eff`，同时受 live payoff / liquidity bound 约束；live breakevens=`lower wing + debit + cost/100N` 与 `upper wing − debit − cost/100N`（仅对称 debit fly）。从 native combination mid 附近开始 net limit，按最小 tick改善，不拆腿追价；每根5-minute bar复核center与buffer，任一失效即退出，最晚15:15。
- **Why / failure：** 相较裸买双向 premium，fly 可降低 debit 并把收益集中在稳定区；它会承担 short-gamma / vega、center migration、事件后曲面重定价与多腿成交风险。

### Risk-Path Contingency

- **Setup / linked scenario：** `directional_continuation / put debit vertical / conditional`，只绑定两根 close `<7600` 且 `signed_negative_confirmation` 成立的 downside release；representation=`candidate_template`、live legs=`pending`。
- **Expiry / holding window：** 目标日优先比较 9/4，默认日内；9/3 0DTE 另行提高审查等级。最早 11:45，time stop=`min(入场后60分钟, 15:30 ET)`，不隔夜跨越 [9/4 Employment Situation](https://www.bls.gov/schedule/news_release/empsit.htm)。
- **Strike / width rule：** Long put 靠近 live 760 confirmation，short 朝 755，比较相邻 long 与 3/5 点宽；若首次可评估价格已越过合理 short / 下一节点，取消而非追价。进一步接受 7550 后重新定中，并把 7500作为下一复核位。
- **IV / Greeks / scenario：** 刷新 ATM、25Δ与 actual put wings；预期 negative Delta、long Gamma/Vega、negative Theta。Trigger→7550 的 planned-exit MTM 必须覆盖 debit、佣金和双边 slippage；reclaim 7600、vol / node reset 或 `signed_negative_confirmation` 失效均为 thesis failure。
- **Risk / price / exit：** `risk_budget_and_static_payoff_cap=min[(R_eff−C_RT)/(100N), W/2−C_RT/(100N)]`，`all_in_max_loss=100N×live debit+C_RT≤R_eff`；`t1_live_max_debit=pending`，并取 live scenario / liquidity bound 的更严格值。Native complex quote 优先；无公开 native NBBO 时，只有经纪商支持 atomic multi-leg net-limit 且全部实时门禁可核验，才进入人工评估。
- **Why / failure：** Short leg 可抵消昂贵 downside wing、降低 debit并封顶风险；late trigger、short过近、IV crush、wide quote、parity failure或 7550 scenario edge不足都会使其失效。

EOD reference 仅用于盘后可行性诊断，不是 T+1 expected entry 或 binding limit。目标日先按实时 spot / forward、expiry、ATM term structure、25Δ skew / relevant wing points 与局部候选比较重新选腿，再从实时 native combination mid 附近按 net limit 评估；debit 不得超过实时 edge bound 与风险预算中更严格者。原生 complex quote 优先；缺少公开 native quote 时标记 synthetic-only，并审查 legging / fill risk。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

- **Condition：** 8:30–11:30 hard resets 全部结束；三根完成的 5-minute close 留在 7650–7700，`signed_stable_repair` 成立，center migration≤10 SPX 点，无 vol shock；live cost-adjusted profit zone 完整包含 spot、forward 和 center interval。
- **Expected path：** 围绕 7675 附近反复重新估值，并在 7650 / 7700 边界前保持稳定；该路径不承诺收盘 pin 或触及 body。
- **Linked Base plan：** 在 9/4 的相邻 body、3/5 点对称翼与适度不对称版本中比较 centered debit butterfly；live scenario、quote、cost 和 risk 全部通过后才进入人工评估。
- **Invalidation：** 任一完成 bar 离开 core、profit-zone buffer≤0、center / node迁移、`signed_stable_repair`失效、vol shock、mapping / parity / quote failure，或达到15:15 ET最晚退出时间。

### Risk Case

- **Condition：** Downside 主 contingency 要求两根 close `<7600` 且 `signed_negative_confirmation` 成立；互斥的 upside branch 要求两根 close `>7700`、`signed_positive_confirmation` 成立并维持 7700–7800 shelf。
- **Expected path：** Downside 先复核 7550、其后 7500；upside 先复核 7750、其后 7800，接近 8000 时重新建图。节点均是 repricing / reassessment points，不是必达目标。
- **Linked Risk-Path Contingency：** Downside 绑定 9/4 put debit vertical；upside 只保留 call debit vertical live screening，不占第二张完整策略卡。First evaluable price 已越过合理 short / 下一节点时不追价。
- **Invalidation：** Reclaim 7600 或跌回 7700、对应 signed confirmation失效、shelf / node迁移、vol reset、scenario edge或 quote / risk gate失败。

### No-Trade Case

- **EOD no-qualified-plan condition：** 当前不成立；core Formal 足以定义结构先验、family、trigger / invalidation、封顶风险和 T+1 live re-screen protocol。Quote Portability none 与未来 live data pending 不单独使 Grade 降为 C。
- **T+1 execution abort condition：** Event / auction reset 未完成；gap 未 retest；core 内 range 未重确认；7650下破但7600未确认；live full / PM / 0DTE、ATM / 25Δ / actual wings 未刷新；node migration或vol shock；mapping / parity、全腿≤30秒 quote、native / atomic construction、combination width默认门槛、scenario value、fees / slippage或remaining risk任一失败；profit-zone containment失败；需要裸卖、无限风险或未授权隔夜；Base在15:15后或directional branch在15:30后才出现机会。
- **What must change before reconsideration：** 完成相应 reset，重建 live full / 0DTE map、surface、forward、center和quotes，并使 Local Candidate Comparison、planned-exit edge、defined-risk payoff与全部风险门禁共同通过。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on Structural View / Plan Grade / Execution Status |
| --- | --- | --- |
| Live full / PM / 9/3 0DTE signed 与 7600 / 7700 节点 | 判断 EOD 修复是否被新 0DTE延续或覆盖 | `signed_stable_repair`支持Base；`signed_negative_confirmation`改为downside，`signed_positive_confirmation`改为upside repair。 |
| Omitted signed 与 9/18 AM / PM anchor | Selected map只显示 −1.177B，omitted仍为 −13.457B | Omitted未修复时不以 upper shelf 宣称 full repair；anchor迁移降低 structural confidence。 |
| Live center interval、3/5 点 profit zone 与 node migration | 决定 centered fly 是否真正覆盖基础路径 | Containment / buffer失败只阻止 Base执行；反复迁移可使 Plan回到 observe only。 |
| 9/4 ATM、25Δ / actual wings、BF25 与 front-event kink | 决定 expiry、翼成本和 short-gamma / vega暴露 | EOD ranking失效时从零重筛；partial evidence不单独改变 directional prior。 |
| SPX/XSP mapping、carry parity、native / atomic quote 与 remaining risk | 决定候选是否可实施且风险封顶 | 主要改变 Execution Status；失败时保持零仓位。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
