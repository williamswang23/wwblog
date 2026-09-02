+++
title = "SPX期权持仓与Greeks结构分析：9月1日收盘与9月2日条件计划"
date = "2026-09-02"
draft = false
description = "基于9月1日收盘的 SPX durable GEX、AM/PM signed、IV term structure 与关键节点，拆解9月2日的条件路径与失效点；不构成实时交易指令。"
series = "SPX期权分析报告"
categories = ["市场结构", "衍生品"]
tags = ["SPX", "期权", "Greeks", "GEX", "波动率", "0DTE", "风险管理"]
featured = false
private = false
+++

## 1. 结论

9月1日形成“PM 负 signed 结构进一步加深、AM 正锚显著削弱”的防守性 regime，9月2日维持 `downside_bias` 且下侧释放门槛低于上侧修复门槛，Plan Grade 为 `B / Conditional Next-Day Plan`、Execution Status 为 `requires_external_live_source`；只有早间数据与 11:30 ET 国债拍卖完成 reset 后，7600 下方出现 qualified acceptance 且 live full / PM / 0DTE signed 继续为负，才进入人工评估，本报告不是实时交易指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | `downside_bias / downside-release asymmetry`；PM 负 signed 加深且 AM 正锚近中性，structural confidence=`Medium`。 |
| Earliest evaluation | 最早 `11:45 ET`：8:15 ADP、10:00 数据簇、10:30 EIA 与 11:30 Treasury auction 的结果均已实际可见，随后完成三根 5-minute bars，期间无 vol shock 或 node migration；14:00 Beige Book 再次 reset。 |
| Base activation | 若两根完成的 5-minute close 位于 `7600` 下方，live full / PM / 0DTE signed 仍负，则评估 defined-risk put debit vertical，首个复核位 `7550`；reclaim 7600 或任一 live gate 失败即失效。 |
| Downside branch | 若进一步在 `7550` 下方形成 acceptance，且首次可评估价仍未越过合理 short strike，则重新定中 put vertical，只在 live curvature 与尾损更优时比较 directional BWB，首个复核位 `7500`；reclaim 7550 即失效。 |
| Upside branch | 若两根完成的 5-minute close 位于 `7700` 上方，且 live full / PM / 0DTE signed 同步修复、7700–7800 shelf 稳定，则评估 call debit vertical，首个复核位 `7750`、其后为 `7800`；跌回 7700 或 full map 再度冲突即失效。 |
| Otherwise | `No Trade / observe only`：价格仍在 7600–7700 corridor、event reset 未完成、节点迁移、vol shock，或 live surface / quote / scenario value / risk budget 任一未通过；完成新 map、surface 与 Local Candidate Comparison 后再考虑。 |

Plan Grade / Plan Status=`B / Conditional Next-Day Plan`，Execution Status=`requires_external_live_source`；这是盘后条件计划，非实时下单指令。

## 3. Executive Summary

- 9月1日 SPX 官方收盘 7631.47，较 8月31日下跌 54.67 点或 0.71%；收盘终态低于前一日剧本的 7650 Base trigger、仍高于 7600 首个复核位，但盘中 acceptance、实际执行与 P&L 不可核验。
- 删除 9月1日当日 0DTE 后，full durable gross GEX 为 339.172B/1%，modeled signed GEX 为 −33.570B/1%；29 个严格共同到期的 signed 较 T−1 恶化 29.422B，这一变化不由 expiry roster 切换解释。
- PM durable signed 从 −15.234B 降至 −34.073B，AM 从 +8.862B 降至 +0.503B；下侧反馈敏感度上升，上侧修复需要价格与 full / PM / 0DTE 符号同时确认。
- 9月18日仍是 dominant expiry，gross 187.501B、占 durable full gross 的 55.28%，但 signed 从 +10.676B 降至 +2.223B；中期锚存在，稳定效应已明显减弱。
- 当前 Formal IV 截面为 `full / formal_ivs_v2_audited`：3D 前端倒挂，7D 之后总体向上；约 7D、14D、30D downside-skew slope 均变陡。T−1 为 partial，且当前估值时点已进入 9月2日 GTH，跨日变化只有 degraded 研究权限。
- Formal selected map 在 7625–7650 一带为负，7600 是薄弱过渡点，7675–7700 转正，7750–7900 仍有上层正 shelf；T+1 用 7600 与 7700 作两侧 confirmation，7600–7700 内默认不追方向。
- 盘后可形成 `B / Conditional` 计划；Base family 为 put debit vertical，deeper downside 只有在曲率与尾损通过时才比较 BWB，upside contingency 为 call debit vertical。EOD XSP 报价的 portability=`none`，全部固定 legs 与价格仅作 diagnostics。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T−1: 2026-08-31 | T: 2026-09-01 | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| Price / prior playbook | SPX 7686.14；Base 需 `<7650`，首个复核 7600 | SPX 7631.47 | −54.67 点 / −0.71%；收盘低于 7650、高于 7600 | 终态与 downside path 一致，但 historical activation=`not_verifiable`，execution / P&L=`not_supplied`。 |
| Strict-common durable Greeks | Gross 332.487B；signed −4.148B；DEX 653.788B | Gross 339.172B；signed −33.570B；DEX 381.658B | Gross +2.01%；signed Δ−29.422B；DEX −41.62% | 防守性结构恶化不是 roster effect；下侧 release 门槛下移到 7600。 |
| AM / PM signed | AM +8.862B；PM −15.234B | AM +0.503B；PM −34.073B | AM 下降 94.3%；PM 再恶化 18.839B | PM 仍是负结构主导者，AM 缓冲已接近中性。 |
| Target 9/2 / dominant 9/18 | 9/2 signed −1.407B；9/18 signed +10.676B | 9/2 signed −4.568B；9/18 signed +2.223B | 9/2 恶化 3.162B；9/18 下降 79.2% | 目标日 0DTE 先验更负，中期锚减弱；9/2 开盘后仍须 live rebuild。 |
| Formal IV status / fixed tenor | `partial / deterministic_expiry_proxy`；3D/7D/30D=10.5062%/9.6890%/11.7149% | `full / formal_ivs_v2_audited`；3D/7D/30D=14.0694%/11.1377%/12.9768% | +3.5631/+1.4487/+1.2619 vp；`fixed_tenor_atm` | 当前截面拥有 audited-planning 权限；source expiry / bracket 变化且时钟错位，不归因为纯 repricing。 |
| Target/event exact ATM | 9/2(2.000D)=9.8103%；9/4(4.000D)=11.4633% | 9/2(.804D)=13.3372%；9/4(2.804D)=14.0694% | +3.5268/+2.6061 vp；`same_expiry_atm` | 共同 expiry 明确上移，同时包含 tau 缩短与 GTH repricing；9/4 事件凸点需目标日复核。 |
| Selected smile | 9/8 ATM 9.3606%、25Δ slope 2.6525vp、BF25 .2475vp | 9/8 ATM 11.1377%、25Δ slope 3.3232vp、BF25 .2828vp | +1.7771/+0.6707/+0.0353vp；`same_expiry_fixed_delta` | Level 上移、downside slope 变陡、curvature 小幅上升；T−1 partial 与非同钟点使 materiality=`indeterminate_within_uncertainty`。 |

前日报告的方向不对称得到收盘终态支持，该结论不等同于预测或交易成功；缺少盘中 5-minute bars、event reset 记录、live map 与订单账本，因此激活、成交和损益均不可核验。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

- **早间 reset 簇：** [ADP](https://adpemploymentreport.com/) 8月就业报告定于 8:15 ET；10:00 有 [Census July M3 / Factory Orders](https://www.census.gov/economic-indicators/calendar-listview.html) 与 [BLS metropolitan employment](https://www.bls.gov/schedule/2026/09_sched_list.htm)，10:30 有 [EIA Weekly Petroleum Status Report](https://www.eia.gov/petroleum/supply/weekly/schedule.php)。任一新结果都清零原 bar count。
- **拍卖 reset：** Treasury 9月2日只有一场 17-week Bill 拍卖，offering amount $72B，noncompetitive 11:00、competitive 11:30 ET（[TreasuryDirect API](https://www.treasurydirect.gov/TA_WS/securities/search?format=json&auctionDate=2026-09-02)）。拍卖结果实际可见后再累计三根完整 5-minute bars；理论最早 11:45，延迟时顺延。
- **下午 reset：** [Federal Reserve Beige Book](https://www.federalreserve.gov/newsevents/2026-september.htm) 定于 14:00 ET。不持有新建日内计划跨越该时点；13:55 前撤销未成交指令并完成持仓处理，事件后最早 14:15 重新评估。时间缓冲与三根 bar 均为分析流程预设。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 负 signed 恶化已越过到期切换

- **Claim：** T+1 的基准先验是 downside release 比 upside repair 更容易成立。
- **Evidence：** 删除 T 日 0DTE 后 full signed 为 −33.570B/1%；29 个严格共同到期较 T−1 恶化 29.422B，而 gross 仅增 2.01%。
- **Mechanism：** modeled signed 负化表示越过边界后的对冲反馈敏感度可能上升；这是结构假设，不是已观测 dealer flow。
- **T+1 Implication：** 7600 下方的价格 acceptance 必须与 live full / PM / 0DTE 负号共振，才评估下行有限风险结构。
- **Falsifier：** live full / PM / 0DTE signed 修复至零附近或转正，且价格重新接受 7675–7700。
- **Confidence：** `Medium`。

### Thesis 2 — PM 主导加深，AM 缓冲显著变弱

- **Claim：** 中期锚尚未消失，它已不足以单独对冲短端 PM 的负结构。
- **Evidence：** PM signed 为 −34.073B，AM 只剩 +0.503B；9/18 虽仍有 +2.223B signed，较前日下降 79.2%，10/16 已由正转负。
- **Mechanism：** 短端 PM 决定日内路径敏感度，AM / monthly anchor 更适合解释中期缓冲；混合结算层不能被合并成单一日内节点。
- **T+1 Implication：** 上行分支需要价格突破 7700、PM / 0DTE 符号修复、上层 shelf 稳定三项同时成立。
- **Falsifier：** 9/18 / 10/16 正锚恢复、omitted PM signed 明显转正，或 live full map 不再显示下半部负化。
- **Confidence：** `Medium`。

### Thesis 3 — 价格与波动终态支持防守读法

- **Claim：** 9月1日收盘将前一日的下侧风险从假设推进到可观测终态，仍无法证明盘中交易路径。
- **Evidence：** SPX 收盘 7631.47，VIX 上升 1.42 点至 16.34，2Y / 10Y 同步上行；收盘低于旧 7650 trigger、高于 7600。
- **Mechanism：** 价格下移、vol 上行与负 signed 可以同时提高边界附近的 convexity 风险，其同步性不构成因果证明。
- **T+1 Implication：** 不在 7600–7700 corridor 内追方向；突破分支要求 gap retest、完成 bars 与 live map 三重确认。
- **Falsifier：** 价格收复 7700 且 vol / ATM IV 回落、signed 同步修复；仅一项改善只降低 confidence。
- **Confidence：** `Medium-Low` 对盘中路径，`Medium` 对收盘结构。

### Thesis 4 — 前端 IV 与 downside skew 提高成本审查级别

- **Claim：** 前端事件凸点与更陡的 downside fixed-delta slope 影响 expiry / wing 选择，它们不单独提供交易 edge。
- **Evidence：** 3D ATM 14.0694%、7D 11.1377%、30D 12.9768%；9/8 downside-skew 25Δ 为 3.3232vp，较 T−1 增 0.6707vp。
- **Mechanism：** 昂贵前端与 put wing 提高 long-premium 成本，vertical 的 short leg 可部分抵消，也同时封顶收益并引入 short-strike 路径风险。
- **T+1 Implication：** 比较 9/3 与 9/4 expiry、3/5 点宽、相邻 long / short strikes；只用 live scenario value 决定长短翼与最高 debit。
- **Falsifier：** 目标日 ATM / skew / actual wings 重定价后，vertical 目标情景价值无法覆盖 debit、fees 与双边 slippage。
- **Confidence：** 当前截面 `audited_planning`；跨日变化 `degraded_local_evidence`。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| Durable full signed −33.570B，PM −34.073B，9/2 目标 expiry −4.568B | Durable gross 339.172B 仍高，9/18 signed 仍为 +2.223B | Gross magnitude 不决定 signed 反馈；保留 downside prior，同时对 9/18 与 upper shelf 设置修复门槛。 |
| SPX 收盘低于旧 7650，VIX +1.42 点，DEX 较 strict-common T−1 下降 41.6% | Selected map 只覆盖 71.06% gross，并且 7600、7675–7700 仍有局部正节点 | 把 7600 与 7700 设为两侧 confirmation；不在过渡区内用局部符号代替 full 判断。 |
| 9/2 0DTE 先验在 7550–7650 多数关键点为负 | 9/2 开盘后 0DTE 构成可快速反转；当前 Formal 时点已进入 GTH | 将 EOD 只视为 prior；任何方向之前必须重建 live full / PM / 0DTE map。 |
| Current IV packet 为 full，所有 selected smile nodes 有 observed-support brackets | T−1 packet 为 partial，且 16:00 ET 对 20:41 ET 的时钟错位使跨日 materiality 不确定 | 当前 term / smile 可用于 planning；不用跨日变化升级 Plan Grade 或确认 relative-value edge。 |

主导证据是 strict-common full signed、AM/PM 分解和收盘终态，structural confidence=`Medium`。Live full / PM / 0DTE signed 修复并在 7700 上方形成 acceptance，会将 directional prior 转为 `range_bias` 或 `upside_bias`；只有实时多腿报价、mapping / parity、surface、scenario value 和风险预算通过，才会改变 Execution Status。Vol shock 或节点迁移先清零执行计数，不自动推翻盘后结构先验。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T−1 change / basis | Event / settlement | Method / quality |
| --- | ---: | ---: | --- | --- | --- |
| 9/2 exact / target-session expiry | 2.000D→.804D | 13.3372% | +3.5268vp；`same_expiry_atm` | T+1 转 0DTE；SPXW PM | Observation-bracketed，conf=.9912；含 tau 缩短与 GTH repricing |
| 9/4 exact / front event | 4.000D→2.804D | 14.0694% | +2.6061vp；`same_expiry_atm` | 就业事件凸点；SPXW PM | Observation-bracketed，conf=.9914 |
| 9/8 exact / selected ~7D | 8.000D→6.804D | 11.1377% | +1.7771vp；`same_expiry_atm` | 同到期日；SPXW PM | Observation-bracketed，conf=.9893 |
| 9/18 exact | 18.000D→16.804D | 13.0547% | +1.4279vp；`same_expiry_atm` | 本表只读 SPXW PM，不混入 AM | Observation-bracketed，conf=.9917 |
| 10/1 exact / selected ~30D | 31.000D→29.804D | 12.9768% | +1.1710vp；`same_expiry_atm` | 同到期日 | Observation-bracketed，conf=.9908 |
| 10/16 exact / 45D source | 46.000D→44.804D | 13.2320% | +.9103vp；`same_expiry_atm` | 同到期日 | Observation-bracketed，conf=.9929 |
| Fixed 3D | 3D | 14.0694% | +3.5631vp；`fixed_tenor_atm` | T−1 9/3(3D)→T 9/4(2.804D) | 两日 observed；no extrapolation |
| Fixed 7D | 7D | 11.1377% | +1.4487vp；`fixed_tenor_atm` | T−1 9/4(4D)/9/8(8D), w=.75→T 9/8(6.804D) | Interpolated→observed；no extrapolation |
| Fixed 14D | 14D | 11.8352% | +1.7392vp；`fixed_tenor_atm` | 9/14(14D)→9/15(13.804D) | Observed→observed |
| Fixed 30D | 30D | 12.9768% | +1.2619vp；`fixed_tenor_atm` | 9/30(30D)→10/1(29.804D) | Observed→observed |
| Fixed 45D | 45D | 13.2320% | +.9946vp；`fixed_tenor_atm` | T−1 10/12(42D)/10/16(46D), w=.75→T 10/16(44.804D) | Interpolated→observed；no extrapolation |

当前 curve shape 是 `mixed; 3D front inversion/event kink, then broadly upward from 7D`。3D−30D 从 −1.2087vp 翻至 +1.0926vp，3D−7D 从 +.8173vp 扩至 +2.9317vp。29 个共同 expiry 中有 28 个通过严格 source-convention 门禁，ATM 全部上升 .7701–3.5268vp；10/7 的 forward source 变化，不纳入严格比较。上述 spread 与 shape 为 `report-layer calculation from packet nodes`。T 时点比 T−1 晚约 4小时42分，并已进入目标日 GTH，所以跨日变化混合日间变化、tau 缩短与 GTH repricing。

### Selected-Expiry Skew / Smile and T vs. T−1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| T: 9/8 / ~7D | 15.7109% | 13.0820% | 11.1377% | 9.7588% | 9.0131% | 3.3232vp | .2828vp | Nodes 均 observation-bracketed，flags=[]；min conf=.9534 |
| Δ T vs. T−1: 9/8(8D)→9/8(6.804D) | +2.7253vp | +2.1477vp | +1.7771vp | +1.4770vp | +1.4218vp | +.6707vp | +.0353vp | `same_expiry_fixed_delta`；degraded；tau 缩短+非同钟点 repricing；materiality indeterminate |
| T: 9/15 / ~14D | 17.5637% | 14.3248% | 11.8352% | 10.2160% | 9.3341% | 4.1088vp | .4352vp | Observation-bracketed，flags=[]；min conf=.9272 |
| Δ T vs. T−1: 9/14(14D)→9/15(13.804D) | +3.1912vp | +2.4408vp | +1.7392vp | +1.1716vp | +.8696vp | +1.2691vp | +.0670vp | `rolling_tenor_slot_fixed_delta`；degraded；expiry roll/composition；materiality indeterminate |
| T: 10/1 / ~30D | 20.2901% | 15.9460% | 12.9768% | 11.0389% | 10.2418% | 4.9071vp | .5156vp | Observation-bracketed，flags=[]；min conf=.9365 |
| Δ T vs. T−1: 9/30(30D)→10/1(29.804D) | +2.2375vp | +1.7302vp | +1.2619vp | +.7043vp | +.4536vp | +1.0259vp | −.0446vp | `rolling_tenor_slot_fixed_delta`；degraded；expiry roll/composition；materiality indeterminate |

约 7D 的 ATM level 上移、25Δ downside slope 变陡、BF25 小幅增加；约 14D 的全节点上移且 put wing 升幅更大，slope 和 curvature 同步增加；约 30D 同样变陡，BF25 小幅下降。`downside_skew_25d = put25 IV − call25 IV` 是 fixed-delta smile slope proxy，不是统计意义上的 skewness 或方向信号；skew 与 BF25 为 `report-layer calculation from packet nodes`。

策略传导是：默认在 9/3 与 9/4 之间按 live scenario value 比较，put vertical 须证明 short leg 有效抵消昂贵 downside wing；BWB / fly / condor 要重验 curvature、中心与尾损；calendar / diagonal 与默认日内授权冲突。9/2 目标 0DTE 未被 selected smile 覆盖，ATM、25Δ、actual wings、Greeks、quotes 和 scenario values 都必须实时刷新。

## 9. Key Expiry / Strike / Dealer Node

| SPX / XSP | Role | Evidence | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 9/1 expiry | 已到期 transient 0DTE | Gross 34.440B，signed −30.242B/1%，DEX −18.191B，OI 310,800 | T+1 删除 | 只用于解释 T 日近收盘负节点，不迁移为 9/2 pin。 |
| 9/2 expiry | Target-session 0DTE prior | T 日 1DTE gross 10.023B、signed −4.568B、DEX −8.341B、OI 148,991；7550/7650/7600 target-expiry gex_point 约 −7.223/−5.331/−2.332M/点 | 高度 transient；开盘后可快速重排 | 仅作下侧敏感先验；RTH 与事件后必须 live rebuild。 |
| 9/3–9/4 PM | Short-dated path / event layer | Signed 分别 −4.276B / −10.925B；9/4 exact ATM 14.0694% | T+1 为 1D / 2D；9/4 含就业事件凸点 | 两个 expiry 做 live Local Candidate Comparison，不预设一定选更近或更远。 |
| 9/18 mixed / AM-dominant | Dominant durable anchor | Gross 187.501B、signed +2.223B、DEX 415.310B、OI 5.610M；占 durable gross 55.28% | T:17D，T+1:16D；AM / PM 必须分层 | 保留上层修复可能，不授权日内 range 或 upside 交易。 |
| 7625–7650 / 762.5–765 | Transition / no-trade core | Formal selected gex_point：7625 −6.441M、7630 −7.771M、7650 −4.565M/点；spot 7631.95 | Selected 覆盖 durable gross 71.06% | Core 内不追方向；live center 与 0DTE 节点决定是否形成新稳定区。 |
| 7600 / 760 → 7550 / 755 → 7500 / 750 | Base / deeper downside nodes | Selected 7600 +.866M、7550 −24.209M、7500 −30.712M/点；target 9/2 在 7600 / 7550 均为负 | 7600 是薄弱过渡；下方负节点属 selected map | `<7600` 确认 Base，首复核 7550；`<7550` 才重新定中并复核 7500。 |
| 7700 / 770 → 7750 / 775 → 7800 / 780、7900 / 790 | Upside repair / upper shelf | Selected +3.582/+11.267/+37.159/+25.574M/点；target 9/2 在 7700 约 +3.402M/点 | 上层正 shelf 仍在，较 T−1 减弱 | `>7700` 只在 full / PM / 0DTE 同步修复时确认；7750 / 7800 为重新估值位，非必达目标。 |

Strike map 只合并 9/2、9/18、10/16 三份 Formal same-date-combined gamma table，`gex_point = Σgex_dealer / (0.01 × 7631.95)`。Selected gross 为 241.000B，覆盖 durable full 的 71.06%；omitted signed 仍为 −30.147B，因此本节不声称 full-chain strike nodes、gamma flip 或真实 dealer inventory。

## 10. T+1 Decision Map, Structural View and Plan Grade

- **Primary regime：** `PM-driven negative-signed regime deepened / AM anchor weakened materially`。
- **Directional prior：** `downside_bias`。
- **Path asymmetry：** 下侧只需价格在 7600 下方形成 acceptance 且负 map 延续；上侧需要价格超过 7700、full / PM / 0DTE signed 修复、upper shelf 稳定三项共振。
- **Base path：** 早间数据和国债拍卖 reset 后下破 7600，先复核 7550；只有进一步接受 7550 下方才转向 7500。
- **Risk path：** 7700 上方形成价格与 signed 的同步修复，先复核 7750，其后为 7800；7900 只作风险升级节点。
- **No-trade core / observation corridor：** 7625–7650 / 7600–7700。
- **Structural confidence：** `Medium`。
- **Plan Grade / Plan Status：** `B / Conditional Next-Day Plan`。
- **Execution Status：** `requires_external_live_source`。
- **Quote Portability：** `none`；setup representation=`candidate_template`，fixed legs=`candidate_template_only`。
- **IV Structure Gate：** 当前截面=`full / audited_planning`，跨日变化=`degraded_local_evidence`；surface repricing risk=`high around scheduled resets`。
- **Why B：** Core Formal 通过，0DTE 删除、方向不对称、机械 trigger、defined-risk family、风险公式与 live re-screen 协议都可定义。
- **Why not A / C：** GTH as-of 组合、多次 hard reset、portability none、selected map 不是 full strike map，以及目标 0DTE surface 未重建，阻止 A；已有证据足以形成条件计划，因此不降为 C。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| Event / auction result not yet reset | ADP、10:00、10:30、11:30 结果实际可见，其后三根完整 5-minute bars | 旧 map 和 bar count 不再有效 | `No Trade / observe only` | 最早 11:45；结果延迟则顺延 |
| Opening gap 位于 7600 / 7700 之外 | 先回测原 trigger，然后重新累计两根 bars | Gap 本身不等于 qualified release | 等待 retest 与 live map | 未回测=`observe only` |
| 7625–7650 core | 方向 trigger 未发生，节点稳定 | 负过渡节点与收盘中心重叠 | 不做 directional setup | 任一边界 release 或 live map 重建 |
| Post-event range reconfirmed in 7600–7700 | 三根 bars 留在 corridor，live signed 修复，center interval 稳定 | 只能说明 release 未形成；当前 downside prior 被削弱 | Directional No Trade；fly / condor 从零重筛 | Profit zone 不包含 center interval、short-gamma/vega 或事件风险失败即拒绝 |
| Two closes `<7600` | Full / PM / 0DTE signed 持续为负，无 vol / node reset，short strike 仍在前方 | Base downside release | 评估 put debit vertical；首复核 7550 | Reclaim 7600 或 live edge 失败 |
| Two closes `<7550` | 负 map 延续，首次可评估价未越过 7500 / 合理 short | Downside acceleration | 重新定中 put vertical；只有 curvature / tail cap 更优时比较 BWB；首复核 7500 | Reclaim 7550、short 已穿越或成本不闭合 |
| 7650–7700 repair zone | 价格修复，full / PM / 0DTE 尚未同步转正 | 价格修复未形成结构修复 | `No Trade / observe only` | 回到 core 或形成 `>7700` acceptance |
| Two closes `>7700` | Full / PM / 0DTE signed 修复，7700–7800 live shelf 稳定 | Upside repair risk path | 评估 call debit vertical；先复核 7750，再复核 7800 | 跌回 7700 或 full map 冲突 |
| Vol shock / node migration | VIX 15分钟 +1.0 点或相关 ATM IV +2vp；中心迁移 >10 SPX 点 | 原 map、surface 与 bar count 失效 | 清零计数、重建 | 完成新 reset 前 No Trade |
| 13:55 / 14:00 Beige Book fence | 13:55 前撤销与处理持仓；14:00 结果后三根 bars | 下午 surface / rate path 可再定价 | 14:15 后从零重评 | 不将早间 trigger 计数带过事件 |

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base downside release | `directional_continuation / put debit vertical` | 与 `<7600` 和 full / PM / 0DTE 负化匹配 | Steep downside wing 提高 long-put 成本；需验证 short leg 的抵消效果 | Defined risk；trigger→7550 planned-exit MTM 需覆盖全部成本 | `conditional` | Selected Base；live 比较 9/3–9/4、相邻 long 和 3/5 点宽。 |
| Deeper downside | Directional BWB | 可调整 7550→7500 的成本与盈利区 | 需可靠 curvature 与不对称 wing 证据 | 三腿 native / atomic quote、tail loss 与 scenario 尚未闭合 | `conditional` | Secondary only；只在 live net edge 显著优于 vertical 时保留。 |
| Upside repair | `directional_continuation / call debit vertical` | 只与 `>7700` 且 full signed 修复匹配 | Call wing 相对便宜不构成 edge | Defined risk；first evaluable price 已越过 short 时不追价 | `conditional` | Selected Risk；live 比较 770/775 附近相邻 strikes 和 3/5 点宽。 |
| Repaired range | Centered fly / broad defined-risk condor | 当前负 signed Base 不支持；只在 range reconfirm 与 signed 修复后再筛 | 对 front kink、BF25、center migration 与 short vega 敏感 | EOD 可构造不证明 post-event short-vol edge | `conditional` | Not selected；需完整 containment、native/atomic quote 与尾损压测。 |
| Two-sided expansion | Long straddle / strangle / reverse iron condor | 事件可造成双向 move，当前 prior 存在下侧不对称 | Hard reset 后 implied move 和 IV crush 未知 | 总 premium、双向 scenario 和 cost 未闭合 | `not_screenable` | 只在事件后形成新 vol-shock regime 时从零筛选。 |
| Term / vol relative value | Calendar / diagonal | 默认日内、不授权隔夜 | 当前 packet 可研究 term，持有规则与跨期 scenario 仍不完整 | 缺跨 expiry 实时估值、授权和退出报价 | `not_applicable` | 不从 3D 倒挂直接推导 calendar trade。 |

### Local Candidate Comparison

| Candidate rule / illustrative EOD example | Profit-zone / scenario test | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Base grid：9/3–9/4，long put 靠近 live 760 acceptance，short 朝 755 / 750；比较相邻 long 与 3/5 点宽 | Trigger→7550 planned-exit MTM 扣成本为正；short 必须仍在前方 | 刷新 ATM、25Δ、actual put wings；比较 short leg 的成本抵消 | All-in risk≤`R_eff`，净 RR 约≥1 | Negative Delta、long Gamma/Vega、negative Theta | Native 优先；synthetic 只用 broker-supported atomic net limit | none | `deferred_to_t1 / selected Base algorithm` |
| Deeper grid：acceptance `<7550` 后，long 靠近 755，short 朝 750；vertical 对 directional BWB | Trigger→7500 live MTM 为正，BWB 的 tail loss 必须封顶 | 需 live curvature 与 wing asymmetry | BWB 只在净 scenario edge 明显优于 vertical 时保留 | 按 live legs 重算 | 三腿原生/atomic quote 必须通过 | none | `deferred_to_t1 / vertical remains default` |
| Upside grid：9/3–9/4，long call 靠近 770 acceptance，short 朝 775 / 780；比较 3/5 点宽 | Trigger→7750 / 7800 planned-exit MTM 扣成本为正 | 刷新 call wing 与 event decay | First evaluable price 已越过 short / 下一节点时不追 | Positive Delta、long Gamma/Vega、negative Theta | 同上 | none | `deferred_to_t1 / selected Risk algorithm` |
| Repaired-range grid：相邻 body / short pair、3/5 点翼、对称与适度不对称 | Live spot / forward 与 center uncertainty interval 全部位于 cost-adjusted scenario-profit region 且留正 buffer | 刷新 BF25、actual wings 和 short-vega risk | 与 directional candidates 比较 scenario / tail loss | Near-flat Delta、short Gamma/Vega | 缺 native multi-leg quote | none | `not selected; only after signed repair` |

EOD 参考 spot / forward 为 763.15 / 763.395；目标日 live center uncertainty interval 与 cost-adjusted scenario-profit region 的包含测试状态为 `pending_target_session_confirmation`。Portability=`none` 时，EOD 网格不用于选出目标日胜者。

### Base Candidate Template — Base Case

| Field | Conditional template |
| --- | --- |
| Setup / representation | `directional_continuation / put debit vertical / conditional`；绑定 `<7600` Base Case，representation=`candidate_template`，fixed legs=`candidate_template_only`。 |
| Expiry / holding window | T+1 live 比较 9/3 与 9/4（1–2 calendar DTE）；9/2 0DTE 另建 tactical universe，不用 EOD legs。11:45 后入场时 13:55 前退出；14:15 后入场最迟 15:30 退出，不隔夜。 |
| Activation / cancellation | 两根完成 bars `<7600`，live full / PM / 0DTE signed 持续为负。Gap 须先 retest；reclaim 7600、node / vol reset、first evaluable price 已越过 short / 下一节点或任一 gate 失败即取消。 |
| Strike / width rule | Long put 靠近 live 760 trigger，short 朝 755，比较相邻 long 与 3/5 点宽；若在 7550 下方再形成 acceptance，重新定中为 755/750 一带。 |
| IV / Greeks | Live 刷新目标 expiry ATM、25Δ与 actual put wings；预期 negative Delta、long Gamma/Vega、negative Theta。Steep put slope 只决定成本审查顺序。 |
| Risk / live debit | 客户支付 debit 记正；使用上述 `debit_live_limit`，且单 setup≤$300、当日全部 setup≤$500、任一时点只有一个 active setup。 |
| Illustrative EOD diagnostic | 9/4 `+1 XSP260904P00760000 @ 2.37/2.405/2.44; −1 XSP260904P00755000 @ 1.27/1.29/1.31`。Synthetic-only customer debit bid/mid/ask=`1.06/1.115/1.17`，combo width=.11（9.87% mid）；未计成本 max loss=$106/$111.5/$117、max profit=$394/$388.5/$383、BE=758.94/758.885/758.83；EOD Greeks Δ−.1490、Γ+.0116、Θ−.0835、Vega+.0568。 |
| Scenario / exit / failure | 首复核 7550，deeper branch 再看 7500；planned-exit MTM 需覆盖 debit、fees 与双边 slippage。Thesis failure 优先退出；time stop=`min(入场后60分钟, 13:55/15:30对应窗口)`。 |
| Limit protocol / why / failure | 从 live native combination mid 附近开始 net limit，只按最小 tick 改善，不拆腿追价。相较 outright put，short leg 降低 debit 与昂贵 wing 成本；它会封顶收益，并可因 late trigger、short 过近、IV crush、wide quote 或 synthetic fill 失去 edge。 |

### Risk-Path Contingency

| Field | Conditional upside-repair template |
| --- | --- |
| Setup / representation | `directional_continuation / call debit vertical / conditional`；只绑定 `>7700` 且 live signed 修复的 Risk Case，不是预置多头；representation=`candidate_template`。 |
| Expiry / holding window | T+1 live 比较 9/3–9/4，默认日内；11:45 后窗口 13:55 前退出，14:15 后窗口最迟 15:30，不隔夜。 |
| Activation / cancellation | 两根完成 bars `>7700`，live full / PM / 0DTE signed 修复且 7700–7800 shelf 稳定。跌回 7700、full 与 selected 冲突、node / vol reset、first evaluable price 已越过合理 short 即取消。 |
| Strike / width rule | Long call 靠近 live 770 acceptance，short 朝 775 / 780，比较相邻 long 与 3/5 点宽；若首次评估已越过 7750，必须重新选腿。 |
| IV / Greeks | Live 刷新 ATM、25Δ与 actual call wings；预期 positive Delta、long Gamma/Vega、negative Theta。较低 call wing IV 不等同于可交易 edge。 |
| Risk / live debit | 使用与 Base 相同的 vertical 风险公式；trigger→7750、7800 和 invalidation 的 live MTM 需分别覆盖 debit、全部费用与 slippage。 |
| Illustrative EOD diagnostic | 9/4 `+1 XSP260904C00770000 @ 1.11/1.135/1.16; −1 XSP260904C00775000 @ .26/.28/.30`。Synthetic-only debit=`.81/.855/.90`，combo width=.09（10.53% mid）；未计成本 max loss=$81/$85.5/$90、max profit=$419/$414.5/$410、BE=770.81/770.855/770.90；EOD Greeks Δ+.1504、Γ+.0168、Θ−.2750、Vega+.1060。 |
| Scenario / exit / failure | 先复核 7750，再复核 7800；从 live native combo mid 附近开始 net limit。Rejection、upper shelf 迁移、IV crush、wide quote、mapping/parity 或 planned-exit scenario failure 即 No Trade。 |
| Why better / why fail | 相较 outright call，short leg 减少 debit 与 theta / vega 负担，风险封顶；它可因修复过晚、short 过近、事件后 surface 回落或报价不可交易而失效。 |

Base template 与 Risk contingency 已占满两张完整策略卡，不增加 Alternative。EOD reference 仅用于盘后可行性诊断，不是 T+1 expected entry 或 binding limit。目标日先按实时 spot / forward、expiry、ATM term structure、25Δ / actual wings 与 Local Candidate Comparison 重新选腿，再从实时 native combination mid 附近按 net limit 评估；缺少公开 native quote 时，只有经纪商支持原子 multi-leg net-limit order 且全部 live gates 可核验，才提高审查级别后进入人工评估。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

- **Condition：** 8:15、10:00、10:30 数据簇和 11:30 Treasury auction 已完成 reset，两根完成的 5-minute close 位于 7600 下方，live full / PM / 0DTE signed 持续为负，无 vol shock 或 node migration。
- **Expected path：** 先向 7550 重新估值；只有进一步接受 7550 下方才看 7500。节点是复核位，不是必达目标或止盈承诺。
- **Linked Base plan：** 在 9/3–9/4 之间比较 long 靠近 760、short 朝 755 / 750 的相邻组合与 3/5 点宽 put debit vertical；只有 live scenario、quote、成本和 risk 共同通过后进入人工评估。
- **Invalidation：** Reclaim 7600、live signed 修复、first evaluable price 已越过 short / 下一节点、event / vol / node reset、planned-exit edge 不覆盖全部成本，或 time stop 触发。

### Risk Case

- **Condition：** 两根完成 bars 接受 7700 上方，且 live full / PM / 0DTE signed 同步修复、7700–7800 shelf 保持为正；opening gap 必须先 retest。
- **Expected path：** 先复核 7750，再复核 7800；7900 只作风险升级区，不预设突破。
- **Linked Risk-Path Contingency：** 目标日重新比较 770/775 附近的相邻 long 与 3/5 点宽 call debit vertical；如果 first evaluable price 已越过合理 short / 下一节点，不追价。
- **Invalidation：** 跌回 7700、full 与 selected map 冲突、upper shelf 迁移、vol shock、live scenario 或 quote gate 失败。

### No-Trade Case

- **EOD no-qualified-plan condition：** 当前不成立；core Formal 足以定义结构、trigger / invalidation、defined-risk family、风险上限与 live re-screen 协议。Quote Portability=`none` 本身不导致 Grade C。
- **T+1 execution abort condition：** 早间数据或 11:30 reset 未完成；gap 未 retest；价格仍在 7600–7700 corridor；live full / PM / 0DTE map、ATM / 25Δ / actual wings 未刷新；node migration 或 vol shock；mapping/parity、全腿≤30s quote、native/atomic construction、combination width、scenario value、fees/slippage 或 remaining risk 任一失败；short 已穿越；需要裸卖、无限风险或未授权隔夜；13:55 后且 Beige Book 未 reset，或 15:30 后才出现机会。
- **What must change before reconsideration：** 完成相应 event / auction reset，重建 live full / 0DTE map、surface、forward 和 quotes，并使 Local Candidate Comparison、planned-exit edge 与所有风险门禁共同通过。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on Structural View / Plan Grade / Execution Status |
| --- | --- | --- |
| Live full / PM / 9/2 0DTE signed 与 7600 / 7700 节点 | 判断 EOD 负 PM 结构是延续、修复或被新 0DTE 覆盖 | 持续负化确认 Base；三者修复并稳定上破 7700 改变 directional prior。 |
| Omitted PM signed 与 9/18 / 10/16 anchor | Selected 只显示 −3.423B，omitted 为 −30.147B | Omitted 未修复时不用 upper selected shelf 宣称 full 修复；锚恢复提高 range / upside 权重。 |
| 9/3–9/4 ATM、25Δ、actual wings 与 front kink | 决定 expiry、long / short wing 成本和 planned-exit scenario value | 未刷新时 EOD legs / ranking 无效；不单独改变 structural prior。 |
| Event state、VIX / ATM vol shock、node migration | 决定旧 map 和 bar count 是否仍有效 | 触发时清零 execution count；反复重定价可使 Plan 退回 observe only。 |
| XSP mapping / parity、native/atomic quote 与 remaining risk | 决定 candidate 是否可实施且风险封顶 | 只改变 Execution Status；失败时保持零仓位。 |

> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
