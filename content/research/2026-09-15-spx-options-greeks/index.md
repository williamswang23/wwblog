+++
title = "SPX期权持仓与Greeks结构分析-260914"
date = "2026-09-15"
data_as_of = "2026-09-14"
draft = false
description = "分析9月14日期权持仓与Greeks结构、FOMC前端期限特征及次日条件路径。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "6c2888325e8435fa555442fdb52c2a73e402556a17982dc1e3823aa1bbdce88e"
+++

# SPX期权持仓与Greeks结构分析-260914

## 1. 结论

T 日剩余合约呈负向 modeled signed Gamma、PM 压力加重，9 月 15 日维持条件式 downside_bias，重点等待 7600 下方接受与实时结构一致；Plan Grade **B / Conditional Next-Day Plan**，Execution Status **requires_external_live_source**，这是盘后准备计划，不是实时交易指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | 条件式 downside_bias；下破路径优先，独立保留收复分支；structural confidence：medium。 |
| Earliest evaluation | 9/15 最早 09:40 ET，实际为 t0+10 分钟；须先检查 Empire 实际信息，完成开盘或实际冲击后的基线重置、实时能力和参数冻结。 |
| Base activation | 若 7600 下方两根完成 5 分钟收盘且实时负向结构一致，则评估 put debit vertical → 首先复核 7550 → reclaim 7600 或负向证据失败即取消。 |
| Downside branch | 若下破条件成立，则使用同一 Base put debit vertical → 7550，其后才复核 7500 → reclaim 7600 失效；不叠加第二个 setup。 |
| Upside branch | 若 7650 上方接受、局部与新 0DTE 转正且 PM 负压收窄，则评估 call debit vertical → 首先复核 7700，其后 7750 → rejection 7650 失效。 |
| Otherwise | No Trade / observe only；核心或走廊未确认、跳空未回测、重置未完成或必要门禁未通过时继续观察，待新条件完整成立后重评。 |

Plan Grade：**B / Conditional Next-Day Plan**；Execution Status：**requires_external_live_source**；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 同一组 31 个存续到期日的 signed GEX 从 −11.023B 扩大至 −31.799B USD/1% move，约 99.34% 的负向变化来自 PM；这是两个时点的状态差，不是已观察到的新增做空流。
- Base 路径为 7600 下方确认后复核 7550、7500；不会把负 signed GEX 本身当成卖出触发。
- 7650 收复属于独立 Risk 分支，必须同时看到局部、新 0DTE 与 PM 压力修复；价格穿线不足以替代结构确认。
- 9/18 占剔除 T 日到期后 gross GEX 的 64.00%，其中 AM 占 89.57%；7620 大节点约 96.58% 的绝对 signed 暴露随 T 日合约到期消失。
- Formal IV 为 partial 局部证据：前端有事件凸点，同到期 ATM 上升、滚动 smile 水平上移和下行斜率扩大；到期滚动与取样时点变化不能被称为纯重新定价。
- 7615–7625 是未确认的方向交易核心，7600–7650 是观察走廊；它们不构成区间分布或 pin 保证。
- 保留 B 级 put vertical Base 与 call vertical Risk 两张条件模板；价格依据 pending_live_repricing、edge_evidence_status=not_established，执行仍依赖外部实时来源。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T−1 | T | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 价格与波动 | SPX 7656.98；VIX 15.84 | SPX 7619.98；VIX 17.10 | −37.00 点 / −0.483%；VIX +1.26 | 优先研究下破；采用本包新取得的 FRED 历史收盘，不回填为上期已知。 |
| 共同存续 31 到期 | gross 396.054B；signed −11.023B | gross 403.603B；signed −31.799B | gross +1.906%；signed −20.775B | 两期均剔除至 T 已到期合约；负向残余加重。 |
| 共同目标日正 DTE 30 到期 | signed −9.339B | signed −23.808B | −14.469B | 进一步剔除目标 9/15 到期，仍有负向背景。 |
| AM / PM 与二阶状态 | signed −1.917 / −9.106B；DEX 543.705B | signed −2.054 / −29.744B；DEX 305.906B | PM 主导变化；Vanna AM/PM 方向相反 | Charm 窗口为 3→1 天，不比较为同期限自然衰减速度。 |
| 目标日新 0DTE：9/15 | signed −1.685B；OI 121,177 | signed −7.991B；OI 152,823 | signed −6.306B | 只作次日重建前参考；实际新 0DTE 必须单独观察。 |
| ATM：相同到期与期限槽位 | 9/16 10.905%；9/17 11.576%；名义 3D 6.299% | 9/16 16.190%；9/17 16.573%；名义 3D 16.573% | same_expiry_atm：+5.285 / +4.997 vp；fixed_tenor_atm：3D +10.273 vp | 3D 来源 9/14→9/17，跨入 FOMC；同到期对照也上升，但含 aging 与 16:00→20:24 时点变化。 |
| 滚动 fixed-delta smile | ~7D 9/18；~14D 9/25；~30D 10/12 | ~7D 9/21；~14D 9/28；~30D 10/14 | ATM +1.055/+1.083/+1.163 vp；skew25 +0.358/+0.862/+0.628 vp；BF25 +0.044/+0.086/+0.039 vp | rolling_tenor_slot_fixed_delta；level、slope、curvature 分开解释；变化的经济显著性未经量化。 |

以上 exposure 的 B=十亿美元；gross / signed 均为 USD/1% SPX move，DEX 为 USD。相同到期集合避免直接比较不同到期篮子，但价格、IV、OI 和取样时点的影响仍混在差额中。

上期人工修订稿的先验是 upside_bias：Base 7700→7750→7800，Risk 7600→7550→7500，计划等级 B。本期收盘位于原两条确认线之间，不能仅凭收盘位置判断盘中是否触发：**historical trigger=not_verifiable；execution / P&L=not_supplied**。本期改为下行优先属于市场证据变化；B→B 只说明计划质量分类相同，不代表机会或收益不变。原稿与原验收稿字节不同，已分别保留身份。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

新闻和事件只形成以下背景：

1. AP 于 9/14 16:18:18 ET 发布收盘简报，记载 SPX −37 点、10Y 盘中触及 5%、Brent 结算 105.68 美元。其发布时间在 RTH 收盘后、20:24 源时点前；盘中 5% 不能替代本包日终 4.97%。[AP 收盘简报](https://apnews.com/article/8f72a301be85728018018735163f4dad)
2. Reuters 9/14 15:02 ET（15:03 更新）的盘中稿将 AI 股承压与 OpenAI、Anthropic 负责人有关发展节奏及安全风险的表态联系起来。该归因仅按报道引用，原始声明未独立取得。上述两篇媒体材料均仅成功取得带日期的索引摘录，未成功取得全文，不据此确定共同因果或次日方向。[Reuters 盘中报道](https://au.marketscreener.com/news/stocks-fall-as-oil-and-bond-yields-rise-ce785bdcde81f02d)
3. 9/15 08:30 ET 的 Empire 调查是开盘前 **monitoring_only**：检查实际结果和市场反应，只有实质冲击才重置旧计数与估值。9/16 08:30 零售/进出口价格、10:00 库存、14:00 FOMC、14:30 记者会；9/17 08:30 初请、新屋开工和费城联储数据，均在周二计划退出之后。它们影响候选期限价值，不要求周二等到周三决议后才评估。[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[BLS 日历](https://www.bls.gov/schedule/2026/09_sched.htm)、[美联储日历](https://www.federalreserve.gov/newsevents/2026-september.htm)

冻结截止前未独立确认 20:25:44 之后有新的重大冲击，也没有同步隔夜 feed；这不等于已完成次日盘前新闻检查。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 同一剩余到期集合偏弱

- **Claim：**下破分支优先研究，但不提前交易。
- **Evidence / basis：**共同31到期gross396.054→403.603B；signed−11.023→−31.799B；DEX543.705→305.906B。FRED收盘−0.483%，VIX+1.26。〔C1；正式包观测与报告计算，路径为 mechanism_based〕
- **Mechanism / assumptions：**signed负向变化20.775B，约99.34%来自PM；在库存代理成立时，负Gamma可放大已发生方向。时点和重估差异不是新增流证据。
- **T+1 Implication：**7600下接受后才评估有限风险put vertical。
- **Falsifier：**价格收复7650并有独立live结构修复；或负向局部/新0DTE证据不成立。
- **Confidence：**medium；机制性判断，未作独立路径回测。

### Thesis 2 — 到期拆分后负向残余仍在

- **Claim：**撤去T到期大节点，负向背景没有随之消失。
- **Evidence / basis：**T0DTE signed−55.287B剔除后−31.799B；再剔除目标9/15到期仍−23.808B。7620节点96.58%绝对signed来自T到期。
- **Mechanism / assumptions：**极近到期高Gamma不是可继承支撑；耐久层和目标新0DTE需分开确认。
- **T+1 Implication：**不围绕7620旧峰值布置自动pin交易；次日重建新0DTE。
- **Falsifier：**live剩余期限及新0DTE转为支持稳定回归，且有完成bar验证。
- **Confidence：**medium；机制性判断，未作独立路径回测。

### Thesis 3 — 节点提供路径而非边界保证

- **Claim：**7600向下与7650向上需要不同证据。
- **Evidence / basis：**目标到期后selected signed：7600−18.448、7550−39.914、7500−47.209；7650−10.521、7700−7.878、7750+23.927百万USD/SPX点。〔C3；正式包观测与报告计算，路径为 mechanism_based〕
- **Mechanism / assumptions：**下方负节点符合条件延续；上方仍有负节点，恢复分支要求实时转正/负压收窄，不能只看价格穿线。
- **T+1 Implication：**Base7600→7550→7500；Risk7650→7700→7750；两条互斥。
- **Falsifier：**live节点迁移超过预先冻结容忍度，或确认后reclaim/rejection。
- **Confidence：**medium；机制性判断，未作独立路径回测。

### Thesis 4 — AM/PM与高阶Greeks存在抵消

- **Claim：**净Greek不能直接换算成确定的买卖流。
- **Evidence / basis：**共同AM/PM signed−2.054/−29.744B；Vanna−2.098/+0.705B；Charm合计+20.518B。9/18 gross约89.57%来自AM。〔C4；正式包观测与报告计算，路径为 mechanism_based〕
- **Mechanism / assumptions：**Vanna为IV±0.5vp有限差分；Charm为next-session DEX变化，前期Fri→Mon3天、本期Mon→Tue1天。库存假设和不同期限阻止简单加总为流。
- **T+1 Implication：**既看PM负压，也监测反弹/降波动对应的潜在抵消；不要把AM峰值当PM稳定锚。
- **Falsifier：**真实库存不同，或实际spot/IV路径、期限与有限差分假设偏离。
- **Confidence：**medium；机制性判断，未作独立路径回测。

### Thesis 5 — IV前端和下行翼重新定价，但含期限滚动

- **Claim：**相容scoped节点显示ATM上升、smile水平上移且put-call斜率扩大；不能全部归因于纯重新定价。
- **Evidence / basis：**同到期9/16 ATM+5.285vp、9/17+4.997vp；名义3D+10.273vp含9/14到9/17事件组成变化；三个smile ATM+1.055/+1.083/+1.163vp，skew25+0.358/+0.862/+0.628vp。〔C5；正式包观测与报告计算，路径为 mechanism_based〕
- **Mechanism / assumptions：**两份原生methodology_break=true指旧mixed边界，同一scoped-v1身份与方法经核对后按v1.8允许比较；partial、时点差和滚动仍限制置信度。BF25仅小幅增加0.039–0.086vp，经济显著性未知。
- **T+1 Implication：**9/16与9/17必须重估退出价值及long/short翼成本；IV或skew上升并不证明put spread有edge。
- **Falsifier：**目标候选IV/翼、live净值或成本不支持；节点质量或方法发生实际不可比变化。
- **Confidence：**low；机制性判断，未作独立路径回测。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| 共同剩余到期负 signed 加重；价格下跌、VIX 上升 | signed 为库存代理；变化含取样时点、重估和持仓组成 | C1–C3 主导条件下行先验；不生成涨跌概率。 |
| 7600 / 7550 / 7500 剩余 selected 节点为负 | 7750 / 7800 有正向层；反弹可改变局部与新 0DTE | 收复 7650 且实时结构一致时切换独立 recovery 分支。 |
| PM 负压加重 | AM/PM Vanna 抵消；9/18 AM signed 略正；Charm 比较时长不同 | 降低对单一对冲流叙事的确信，不抹去当前 PM 负状态。 |
| 同到期 ATM、滚动 put-call 斜率上升 | partial 节点与到期滚动不能证明精确事件方差或可交易 edge | 只影响期限、翼和成本检查；缺少候选估值时不提高价格信心。 |

Structural confidence=**medium**；path confidence 的依据为 **mechanism_only / not_tested**。价格、VIX、Greeks 并非独立验证样本。真正改变 directional prior 的是 O_UP+O_SIGN_UP 完成，或节点/波动状态重置后原路径不再成立；报价过宽、账户预算不足或经纪商能力缺口主要改变 execution status。单纯改善数据完整性或维持 B 等级，都不证明更高胜率。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

以下为 **report-layer calculation from packet nodes**。IV 用百分数，差额用 vol points（vp）；τ 直接保留 packet 正剩余时间，区别于日历 DTE。

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T−1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09-15 / 目标日 0DTE | τ 4.0000→0.8163 日 | 13.254% | +4.808 vp；same_expiry_atm | SPXW PM；FOMC 前到期 | k=0 total variance 插值；observation_bracketed；q=0.989；含 aging / 时点差 |
| 09-16 / 首选候选 / FOMC | τ 5.0000→1.8163 日 | 16.190% | +5.285 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.991；含 aging / 时点差 |
| 09-17 / 后备候选 / 次日数据 | τ 6.0000→2.8163 日 | 16.573% | +4.997 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.990；含 aging / 时点差 |
| 09-18 / dominant PM / 旧 7D | τ 7.0000→3.8163 日 | 16.395% | +4.025 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.990；含 aging / 时点差 |
| 09-21 / 本期 ~7D | τ 10.0000→6.8163 日 | 13.425% | +2.394 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.991；含 aging / 时点差 |
| 09-25 / 旧 14D 来源 | τ 14.0000→10.8163 日 | 13.572% | +1.892 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.988；含 aging / 时点差 |
| 09-28 / 本期 ~14D | τ 17.0000→13.8163 日 | 12.762% | +1.495 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.987；含 aging / 时点差 |
| 10-09 / 旧 30D 下界 | τ 28.0000→24.8163 日 | 13.206% | +0.955 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.988；含 aging / 时点差 |
| 10-12 / 旧 30D 上界 | τ 31.0000→27.8163 日 | 12.896% | +0.858 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.988；含 aging / 时点差 |
| 10-14 / 本期 ~30D | τ 33.0000→29.8163 日 | 13.200% | +0.840 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.988；含 aging / 时点差 |
| 10-23 / 45D 下界 | τ 42.0000→38.8163 日 | 13.428% | +0.668 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.989；含 aging / 时点差 |
| 10-30 / 45D 上界 | τ 49.0000→45.8163 日 | 13.769% | +0.596 vp；same_expiry_atm | SPXW PM；含 FOMC | k=0 total variance 插值；observation_bracketed；q=0.991；含 aging / 时点差 |
| 名义 3D | 当前下/上 τ=2.8163/2.8163 | 16.573% | +10.273 vp；fixed_tenor_atm | PM；observed | P：09-14(3.0000)–09-14(3.0000)，w=0.0000 → T：09-17(2.8163)–09-17(2.8163)，w=0.0000；no_extrapolation=true；q=0.990 |
| 名义 7D | 当前下/上 τ=6.8163/6.8163 | 13.425% | +1.055 vp；fixed_tenor_atm | PM；observed | P：09-18(7.0000)–09-18(7.0000)，w=0.0000 → T：09-21(6.8163)–09-21(6.8163)，w=0.0000；no_extrapolation=true；q=0.991 |
| 名义 14D | 当前下/上 τ=13.8163/13.8163 | 12.762% | +1.083 vp；fixed_tenor_atm | PM；observed | P：09-25(14.0000)–09-25(14.0000)，w=0.0000 → T：09-28(13.8163)–09-28(13.8163)，w=0.0000；no_extrapolation=true；q=0.987 |
| 名义 30D | 当前下/上 τ=29.8163/29.8163 | 13.200% | +1.096 vp；fixed_tenor_atm | PM；observed | P：10-09(28.0000)–10-12(31.0000)，w=0.6667 → T：10-14(29.8163)–10-14(29.8163)，w=0.0000；no_extrapolation=true；q=0.988 |
| 名义 45D | 当前下/上 τ=38.8163/45.8163 | 13.735% | +0.781 vp；fixed_tenor_atm | PM；interpolated | P：10-23(42.0000)–10-30(49.0000)，w=0.4286 → T：10-23(38.8163)–10-30(45.8163)，w=0.8834；no_extrapolation=true；q=0.989 |

原生 fixed-tenor 规则允许 τ 与名义期限相差不超过 0.25 日时直接使用最近 observed expiry。本期 3/7/14/30D 的实际 τ 分别为 **2.8163 / 6.8163 / 13.8163 / 29.8163 日**，比名义期限短 0.183704 日；这些是原生近邻期限槽位，不能声称严格恒定期限。45D 则在同一 PM scope 内按总方差插值：w=(45−38.8163)/(45.8163−38.8163)=0.883386；先插值 σ²τ 再还原 IV，不外推、不在报告层重新拟合。其上期 w=0.428571，bracket 的实际 τ 也变短。

当前形状为 **mixed**：名义 3D 高于 7D，14D 较低，之后抬向 45D；3D−30D=+3.372 vp，7D−30D=+0.225 vp，14D−30D=−0.438 vp。9/15 ATM 13.254% 与含 FOMC 的 9/16 16.190%、9/17 16.573% 构成前端凸点，但仅是事件暴露映射，不能分离精确事件方差。

名义 3D 从 9/14 到期滚到 9/17，+10.273 vp 含显著事件组成变化；9/16 同到期 +5.285 vp、9/17 +4.997 vp 是必要对照，仍混有 aging、市场重新定价与估值时点变化。7D、14D observed 来源分别 9/18→9/21、9/25→9/28；30D 从 10/09–10/12 插值转为 10/14 近邻 observed。本期32个exact节点中31个有相容前期节点；新10/21节点无前期对应，只有该项change保留unavailable（prior_node_unavailable），不向其他节点扩散。五个 native fixed slots 可用，因此不另造 `rolling_tenor_atm` 替代项。T 日 9/14 已到期节点不重插入正期限曲线；9/15 虽在 T 晚间尚有 0.8163 日剩余时间，到目标日成为新 0DTE，单独处理。

Formal DTE buckets 是另一种混合持仓统计，未放入本表作为 ATM 曲线替代。前端波动率较高及含事件的时间价值，使 9/16 与 9/17 的计划退出估值比较更重要，不构成卖波动或买方向的独立理由。

### Selected-Expiry Skew / Smile and T vs. T−1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：09-21 / ~7D / τ=6.8163 | 19.956% | 16.177% | 13.425% | 11.596% | 10.516% | 4.581 vp | 0.461 vp | forward-delta 插值；observation_bracketed；q=0.947–0.991；partial |
| Δ：09-18(τ=7.0000) → 09-21(τ=6.8163) | +1.569 vp | +1.278 vp | +1.055 vp | +0.920 vp | +0.804 vp | +0.358 vp | +0.044 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll/composition；materiality=indeterminate_within_uncertainty |
| T：09-28 / ~14D / τ=13.8163 | 19.761% | 15.724% | 12.762% | 10.899% | 9.922% | 4.825 vp | 0.550 vp | forward-delta 插值；observation_bracketed；q=0.921–0.987；partial |
| Δ：09-25(τ=14.0000) → 09-28(τ=13.8163) | +2.216 vp | +1.600 vp | +1.083 vp | +0.739 vp | +0.490 vp | +0.862 vp | +0.086 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll/composition；materiality=indeterminate_within_uncertainty |
| T：10-14 / ~30D / τ=29.8163 | 21.113% | 16.378% | 13.200% | 11.336% | 10.542% | 5.042 vp | 0.656 vp | forward-delta 插值；observation_bracketed；q=0.939–0.988；partial |
| Δ：10-12(τ=31.0000) → 10-14(τ=29.8163) | +1.957 vp | +1.515 vp | +1.163 vp | +0.888 vp | +0.714 vp | +0.628 vp | +0.039 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll/composition；materiality=indeterminate_within_uncertainty |

Delta convention=`forward_delta_non_premium_adjusted`。翼节点沿已观察支持区间作 `linear_in_forward_delta_within_observed_support`；ATM 为 k=0 总方差插值。15 个节点均可用、status=interpolated，原生节点 quality_flags 为空；q 是拟合支持评分，不是路径概率。所有指标来自同一 expiry 与 PM scope：skew25=IV25P−IV25C，put/call wing premium=各自 IV25Δ−ATM，BF25=½(IV25P+IV25C)−ATM；skew25 是 fixed-delta 斜率代理，不是统计 skewness。

**水平 → 斜率 → 曲率：**三个槽位 ATM 分别上移 1.055、1.083、1.163 vp；skew25 分别扩大 0.358、0.862、0.628 vp，算术上 steepened；BF25 增加 0.044、0.086、0.039 vp，算术上 increased，但经济显著性未量化，不称为显著曲率变化。当前 skew 的期限梯度为 4.581→4.825→5.042 vp；当前 put25 翼溢价为 2.752 / 2.962 / 3.178 vp，call25 相对 ATM 为 −1.829 / −1.863 / −1.865 vp。三个槽位均换到期日，不能将这一组数称为 fixed-tenor smile、同到期 smile 的纯 repricing 或目标日已观察到的变化。

对交易表达的条件含义：下行翼较贵可使卖出更低 put 降低付费，但是否值得牺牲尾部收益须比较候选精确到期的两腿 IV 和退出净值；当前 skew 并不自动赋予 put spread 或 tail hedge 价格优势。Butterfly/BWB/iron fly 要求自己的曲率、中心误差和净盈利区间支持；condor 要求被验证的边界与足够净权利金；calendar/diagonal 要求期限相对价值和完整退出模型，本次均未获得对应放行。9/16、9/17 候选与 9/18 dominant 的本期 smile 未被选中，不能用 9/21、9/28、10/14 代填；目标日必须刷新精确 expiry 的 ATM、25Δ、相关翼、Greeks、报价与情景值。以上变化权限止于降级的局部研究证据。

## 9. Key Expiry / Strike / Dealer Node

| 范围 | Gross GEX B USD/1% | Signed GEX B USD/1% | DEX B USD | OI |
| --- | --- | --- | --- | --- |
| T 全链，含已到期 | 467.894 | −87.086 | 291.934 | 11,656,846 |
| 9/14 已到期，移除 | 64.291 | −55.287 | −13.971 | 459,630 |
| T 后存续全链 | 403.603 | −31.799 | 305.906 | 11,197,216 |
| 9/15 新 0DTE，单列 | 13.785 | −7.991 | −12.298 | 152,823 |
| 目标日后正 DTE 全链 | 389.818 | −23.808 | 318.204 | 11,044,393 |

GEX 表的 `gex_total / gex_dealer` 实际为 1% move scale；本期换算 **gex_point = gex_1pct / (0.01×S) = gex_1pct / 76.201**，S=7620.10。signed 采用 call-minus-put 仓位代理，gross 恒正不等于 dealer long gamma；本包未提供可复核 gamma flip，不能声称存在某个 flip 价。

Dominant expiry 为 **9/18，日历 DTE T=4、目标日=3，mixed AM/PM**：gross 258.322B，占全链 55.21%、剔除 T0 后 64.00%；其中 SPX AM gross 231.373B、signed +0.484B，SPXW PM gross 26.949B、signed −4.655B。AM 贡献 gross 的 89.57%，PM 仍负；AM 通常在前一营业日结束交易并按到期日上午结算，不能用这个峰值保证 PM 收盘 pin。10/16 gross 47.563B、signed −2.966B，属于更远期结构。

共同存续集合：AM / PM Vanna 分别 −2.098B / +0.705B USD per 1 vol point；两者对 IV 冲击的 DEX 敏感度相反。Vanna 按 IV ±0.5 vp 的 DEX 有限差分计算；Charm 为固定 spot/IV/r/q/OI 下 next-session DEX 变化，前一期周五→周一三天，本期周一→周二一天，不能用 33.016B→20.518B 判断单位时间流衰减。VEX 为 vendor vega 口径；Volga 使用 BS vega 的 IV 有限差分，其标准化与 vendor VEX 未证明一致，不能与 GEX、Vanna、Charm 相加成已发生对冲流。

selected strike maps 仅覆盖 9/14、9/15、9/18、10/16；剔除 T 到期后 gross 覆盖 **79.20%**，再剔除目标到期后覆盖 **78.47%**。selected 以外仍有 **−16.671B USD/1%** 的存续 signed，不能被局部图漏掉。两日可直接比较的存续 selected 日期只有 9/18、10/16。

| SPX / XSP | Role | 存续 signed M USD/点 | 其中新 0DTE signed M/点 | 目标后 selected signed M/点 | Durability / T+1 use |
| --- | --- | --- | --- | --- | --- |
| 7500 / 750.0 | 第二下行复核 | −50.012 | −2.803 | −47.209 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7550 / 755.0 | 首个下行复核 | −46.540 | −6.627 | −39.914 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7600 / 760.0 | 下行确认 | −26.082 | −7.634 | −18.448 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7615 / 761.5 | 核心下沿 / 预警 | −20.769 | −14.486 | −6.283 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7620 / 762.0 | 旧到期峰值参考 | −21.915 | −19.828 | −2.087 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7625 / 762.5 | 核心上沿 / 预警 | −13.581 | −6.522 | −7.060 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7650 / 765.0 | 修复确认 | −18.559 | −8.038 | −10.521 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7700 / 770.0 | 首个上行复核 | −4.548 | 3.331 | −7.878 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7750 / 775.0 | 第二上行复核 | 24.358 | 0.430 | 23.927 | 9/18+10/16 耐久层；9/15 战术层分开 |
| 7800 / 780.0 | 远端上行参考 | 35.480 | 0.231 | 35.249 | 9/18+10/16 耐久层；9/15 战术层分开 |

7620 旧 selected signed 总额为 −640.011M USD/点，其中 −618.096M 来自 9/14 到期；移除后只有 −21.915M，再去掉目标到期后为 −2.087M。其绝对 signed 的 **96.58%**、gross 的 **92.73%** 属于已到期层。7615–7625 核心和 7600–7650 走廊只描述当前确认关系；向下 7550/7500、向上 7700/7750 是逐级重新估值节点，不是必达点或限价订单。

## 10. T+1 Decision Map, Structural View and Plan Grade

**结构与计划：**Primary regime=negative modeled signed Gamma，PM 负向压力加重；directional prior=downside_bias，path asymmetry=directional，structural confidence=medium。Base 为 7600 下方确认后复核 7550/7500；Risk 为独立收复 7650 后复核 7700/7750。Plan Grade **B / Conditional Next-Day Plan**；Execution Status **requires_external_live_source**；Quote Portability=low；setup representation=candidate_template。保留 vertical 对 EOD IV 相对价值的依赖为 background_only，因此策略 IV gate=not_applicable，而数据状态仍为 partial；候选的实时 IV 与情景估值并未豁免。

**评级依据：**路径、失效、到期选择、相邻候选和封顶风险协议可定义，因此具备条件计划。候选精确期限 smile/估值排名缺口、晚间字段时点不确定，以及未验证的计算、经纪商和参数流程使其未达到更高等级；不是因为未来数据尚未产生而降级。核心 formal 通过，仍有可操作的重新筛选方案，所以不评 C。没有按一两个 tick 的报价差异升降级。

### Observable Conditions — 唯一定义

所有时间均为 America/New_York。先完成事件/开盘重置及能力核验，在看见触发结果之前冻结关键位、容忍度和规则，再从其后第一个完整 5 分钟 bar 起点 t0 计数；t0 不早于 09:30。下表是权威触发定义，其他章节引用 ID。

| Condition ID | 观察来源 / 窗口 | 阈值、计算与通过条件 | 能力 / 重置 / 限制 |
| --- | --- | --- | --- |
| O_RESET / O_CAL | 官方事件源、合格实时市场快照、Cboe 与经纪商日历；入场前检查 | 检查 Empire 实际发布、隔夜新信息与持有窗口；普通日历不自动 hard reset。实际重大消息/波动/节点冲击后更新 spot、map、IV、候选与估值，并清零计数。 | 当前 pending；事件反应与来源能力待核验。 |
| O_CONFIG | 交易员 / 经纪商书面参数；必须在 t0 前冻结 | ε_map、ε_parity 单位为 XSP 点，ε_node 为 SPX 点；三者需具体数值、来源、冻结时间。 | 数值均未提供，保持 null；不能在看见触发后调到刚好通过。 |
| O_DOWN / O_UP | 合格实时 SPX 指数 feed；bar 对齐 RTH，价龄≤30秒 | O_DOWN：7600 下方连续两根完成 5 分钟收盘；O_UP：7650 上方连续两根完成收盘。 | 部分 bar 不计；数据延迟顺延 t0。 |
| O_GAP_DOWN / O_GAP_UP | 同一 SPX feed；开盘至确认完成 | 若开盘直接低于 7600，须先有后续 bar 回测至≥7600，再从后续完整 bar 重计下行接受；若直接高于7650，须回测至≤7650，再重计上行接受。 | 未回测不追；不能用跳空首根代替回测。 |
| O_SIGN_DOWN | 同口径全链/PM/节点计算器；两个确认收盘各一张快照，计算龄≤300秒 | 目标日后正 DTE 全链 signed<0、PM signed<0、局部7600 signed<0，并单列新9/15 0DTE signed<0。 | 外部计算能力未证实；缺任一必需层不激活。 |
| O_SIGN_UP | 同口径 exposure 计算器；两个确认收盘，≤300秒 | 局部7650–7700合计 signed>0、新9/15 0DTE signed>0，且 PM 负压较冻结重置基线收窄或已非负。 | 只看价格涨破不能替代。 |
| O_NODE | 同方法 live strike map；每次确认/管理，≤300秒 | 关键节点相对冻结基线的移动≤ε_node；超出则更新地图、重选腿和清零。 | ε_node未提供；不能假设 EOD 管线已提供实时服务。 |
| O_VOL | 实时 VIX 与候选同到期 ATM IV；滚动15分钟，≤30秒 | VIX 上升≥1.0点或相关 ATM IV 上升≥2.0vp，即触发重置；先管理已有风险，再研究新状态。 | 仅经过15分钟并不代表重置完成。 |
| O_RECLAIM / O_REJECT | 实时SPX、完成bar；持续管理，≤30秒 | 下行失效：一根收盘≥7600，下一完整bar未再交易到7600以下；修复失效：一根收盘≤7650，下一完整bar未再交易到7650以上。 | 入场/继续持有要求失效事件尚未发生；发生即取消/退出，风险规则可要求更早行动。 |
| O_QUOTES / O_BROKER | 经纪商实时单腿/原生组合与订单界面 | 全部腿符号、ratio和bid/ask有效且时间可比；价龄≤30秒；mid有意义时组合宽度/mid≤25%。原生组合优先，否则必须验证原子化多腿net-limit。 | 近零mid改用绝对tick、总成本与净edge检查；不假定各腿可同时成交，不拆腿。 |
| O_MAPPING | 实时SPX/XSP及同到期 F、D；≤30秒 | 绝对指数映射误差≤ε_map；carry对齐的pair forward与参考forward残差≤ε_parity，并核验可执行区间。 | 容忍度与独立参考方法待核验；零carry近似不能充当通过。 |
| O_SURFACE / O_VALUE | 合格实时IV、Greeks及情景清算估值平台 | 刷新选中到期 long/short、ATM/25Δ/翼，计算目标、逆向、失效、计划退出四情景净值；目标值需覆盖支付额及全成本，同时通过静态风险/收益边界。 | 模型、输入、费用、清算折价与估值时点须记录；当前 pending，不用到期intrinsic代替。 |
| O_RISK | 真实账户损失/当前剩余风险记录；每次人工评估 | 单setup≤300美元、当日聚合≤500美元、最多1个active、最多1次re-entry，2次thesis failure停止。 | 实际账簿未知；不得假设亏损为0或给实际数量。 |
| O_TIME | Cboe合约规则和经纪商限制；入场及持仓管理 | 退出=min(入场+60分钟、15:30 ET、更早的经纪商/合约截止)；至少保留30分钟可用持有窗口。 | 两分支条件最早09:40，最晚15:00；实际t0推迟后若窗口无效则取消。 |
| O_RANGE | 价格、稳定节点、实时情景净盈利区间；至少t0+15分钟 | 至少三根完成收盘留在预先冻结核心/明确重定义走廊，期间无确认线越界、节点或VOL冲击；spot、forward和中心不确定区间须全部位于live扣成本盈利区内并留正缓冲。 | 当前仅重新研究range family；不是第三张自动策略卡。 |

### T+1 Decision Map

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 开盘在7615–7625核心 | O_RESET、O_NODE、O_VOL | 方向释放尚未发生 | 观察 | 当前无自动稳定性策略；并非对所有family永久禁令。 |
| 7600–7650走廊，核心外 | O_DOWN / O_UP尚未完成 | 仍等待边界确认 | 观察 | 走廊不是概率边界。 |
| gap越过7600或7650 | 对应O_GAP，再O_DOWN/O_UP及全部共同门禁 | 旧确认计数不能跨gap沿用 | 回测后重计数 | 首评已过short或第一复核点则不追。 |
| 下行确认 | O_DOWN、O_GAP_DOWN、O_SIGN_DOWN；O_RECLAIM未触发；共同门禁齐全 | 负向路径释放 | Base put vertical；7550首复核 | reclaim7600或负结构失败。 |
| 上行确认 | O_UP、O_GAP_UP、O_SIGN_UP；O_REJECT未触发；共同门禁齐全 | 独立恢复 | Risk call vertical；7700首复核 | rejection7650或修复失败。 |
| 实际事件 / vol reset | O_RESET / O_VOL / O_CONFIG | 旧估值和计数失效 | 完成新基线后重评 | 未完成不新增。 |
| node migration | O_NODE | 旧关键位不再可靠 | 重建map并重选 | 不能靠价格线硬沿用。 |
| post-event range reconfirmed | O_RANGE全部条件 | 区间稳定性可能可研究 | 重新筛选fly/condor并估值 | 中心区间必须落在有缓冲的净盈利区。 |
| range thesis failure / boundary release | 一根完成收盘越过冻结range边界，或稳定节点/净盈利区条件丧失 | 原range论据失效 | 取消range；方向分支另等全部条件 | 不由range失效自动追方向。 |
| 全部必需实际条件通过 | 实际预算、净值、行情和能力均确认 | 才进入人工评估 | 未来可标eligible_for_manual_evaluation | 当前仍requires_external_live_source，不生成订单。 |

**分支时窗：**Base/Downside 和 Risk/Upside 均以 9/15 RTH 的实际 t0+10分钟为条件最早时间，绝对下限09:40；最晚15:00，并以更早限制为准。RTH按09:30–16:15检查，工作默认15:30退出更严格；首选9/16 PM合约的到期最后交易时间是9/16 16:00，不能据此授权本计划隔夜持有。[Cboe XSP 规格](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

Structural fit、价格依据与执行可行性分开判断。保留的两类均为 **conditional / pending_live_repricing / not_established / external_required**；封顶风险和到期最大收益比不证明正期望收益。

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base | directional_continuation / put debit vertical | 确认7600下延续 | 9/16/17精确翼需刷新；EOD IV仅background_only | 有限风险；情景净值未建立 | conditional | O_DOWN/O_SIGN_DOWN及价格/执行门禁。 |
| Risk | directional_continuation / call debit vertical | 独立收复7650 | 同到期live IV；不能用较远smile代填 | 有限风险；修复情景待估值 | conditional | O_UP/O_SIGN_UP及独立修复证据。 |
| Base alternative | directional_continuation / directional BWB | 可能降低有限方向路径成本 | 需精确曲率、非对称翼价格 | 缺盘中完整payoff及净盈利区估值 | not_screenable | 不能凭偏斜或body误差直接择优；IV required gate=fail。 |
| 重新研究区间 | centered_stability / debit butterfly、defined-risk iron fly | 7620旧峰值不足以证明中心稳定 | 需要本期candidate曲率和中心区间 | 未证明成本后盈利区包住中心误差 | reject | O_RANGE后新研究；IV required gate=fail。 |
| 重新研究区间 | broad_bounded_range / defined-risk iron condor | 走廊未被验证为有界分布 | 需边界稳定和翼权利金 | 未证明尾部风险与净权利金合理 | reject | 实时边界/净盈利区/清算模型重新筛；非只因身处core拒绝。 |
| 事件释放检查 | two_sided_expansion / long straddle、strangle | 双侧变动可能，但幅度论据不足 | 前端事件时间价值较高 | 没有最小所需波幅与成本/theta比较 | not_screenable | 补足幅度、时间和IV变化下净值支持；IV required gate=fail。 |
| 期限相对价值检查 | term_or_vol_relative_value / calendar、diagonal | 不属本次周二短时方向持有论据 | partial/rolling信息不足以构成期限edge | 无合格期限退出模型及跨夜授权 | not_applicable | 本次不留卡；不强行把期限凸点转成交易。 |

### Local Candidate Comparison

两个方向各比较两到期×三个相邻long×两宽度，共24个历史构造；都是1:1 vertical，BWB的非对称版本另因估值缺口保留not_screenable。实际选择时用实时锚替换下表示例锚，评估相邻腿与宽度，不把最大Gamma点固定成body。方向结构的中心包含测试为not_applicable，必须通过自身路径/计划退出损益测试。

| Candidate rule / EOD illustration | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F_PUT：759/760/761，向下3/5点；9/16与9/17 | not_applicable；四情景路径测试 | 两期限均含FOMC；候选smile需live补齐 | 风险代数可核对；live净值pending | 逐腿重算，不从示例符号外推 | EOD ask 0.90–1.73；宽度/mid 29.6%–71.8% | low | deferred_to_t1；winner=null |
| F_CALL：764/765/766，向上3/5点；9/16与9/17 | not_applicable；四情景路径测试 | 两期限均含FOMC；候选smile需live补齐 | 风险代数可核对；live净值pending | 逐腿重算，不从示例符号外推 | EOD ask 1.11–2.34；宽度/mid 22.7%–50.9% | low | deferred_to_t1；winner=null |

Put网格12项历史组合宽度/mid全部超过25%的实时参考门槛；call网格也有多数偏宽。它们揭示流动性限制，不构成当前live gate测试，不能据旧bid/ask声称目标日可成交。完整筛选流程是：先剔除过期/越过short或首节点/报价不合格项，再检查实际剩余预算和四情景净值，最后比较净值支持、逆向敏感性、成本及退出流动性；没有合格候选就不交易。首选9/16失败不自动切换9/17，后备须独立通过同样条件。

### Illustrative EOD Examples — 仅此处保留固定腿与报价

XSP=762.00，源更新时间20:25:44 ET；SPX/10=762.01，更新时间20:24:32 ET。映射差−0.010 XSP点，时差72秒。全部420条XSP quotes共享同一更新时间；market_phase原值closed、request_mode=cached，缺原生complex quote。不是T+1 expected entry。

| 示例 | Expiry | Side / strike | Ratio | 完整 symbol | 腿 bid / mid / ask | 腿 IV | 映射 / offset |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F_PUT | 9/16 PM | 买 760P | 1 | XSP260916P00760000 | 2.42 / 2.530 / 2.64 | 16.550% | SPX 7600；映射舍入差0；距long +0 XSP点 |
| F_PUT | 9/16 PM | 卖 755P | 1 | XSP260916P00755000 | 1.26 / 1.330 / 1.40 | 18.270% | SPX 7550；映射舍入差0；距long −5 XSP点 |
| F_CALL | 9/16 PM | 买 765C | 1 | XSP260916C00765000 | 2.04 / 2.150 / 2.26 | 15.620% | SPX 7650；映射舍入差0；距long +0 XSP点 |
| F_CALL | 9/16 PM | 卖 770C | 1 | XSP260916C00770000 | 0.53 / 0.615 / 0.70 | 14.180% | SPX 7700；映射舍入差0；距long +5 XSP点 |

| 组合示例 | Synthetic bid / mid / ask | 宽度/mid | 按ask，C=$6/$16的到期压力算术 | 成本后BE（XSP点） | 净Greeks（vendor原单位差分） |
| --- | --- | --- | --- | --- | --- |
| F_PUT | 1.02 / 1.200 / 1.38 | 30.00% | ML $144–$154；MP $346–$356 | 758.56 / 758.46 | Δ −0.1719；Γ 0.0125；Vega 0.0445；Theta −0.1119 |
| F_CALL | 1.34 / 1.535 / 1.73 | 25.41% | ML $179–$189；MP $311–$321 | 766.79 / 766.89 | Δ 0.2152；Γ 0.0138；Vega 0.0753；Theta −0.3905 |

两例均为客户正支付debit、宽度W=5；组合bid=long bid−short ask，mid=long mid−short mid，ask=long ask−short bid。表内ML/MP/BE是**以历史ask和N=1计算的到期压力例**，不是周二退出净值；put到期净盈利区在成本后BE以下，call在BE以上，最大尾部亏损为100Nd+C_N。两例Δ分别负/正，Γ和Vega为正、Theta为负，只描述该截面，跨long/short或随IV变化可变号，不能固定沿用到目标日。

另按两候选到期、各9个strike共**18个**call-put配对作carry诊断：**F_pair=K+(C−P)/D**，与同到期SPX packet forward/10比较。中值残差约−0.1098至+0.1124 XSP点，18个参考forward均落在对应bid/ask隐含区间内。这是使用packet D和跨标的、72秒偏移参考值的检查，不是独立同步无套利证明；live ε_map、ε_parity仍须预先冻结。API `estimated_credits=1` 是请求成本，绝非option credit或账户余额。

### Base Candidate Template — Base Case

**F_PUT / Base / directional_continuation / put debit vertical / conditional。**适用于7600下方确认延续；候选首选9/16 PM（T日历DTE=2→目标1），后备9/17 PM（3→2），目标日9/15的0DTE不作默认。持有窗口为周二日内、最多60分钟且不晚于15:30 ET。Quote portability=low，表示方式candidate_template，fixed-legs authority=candidate_template_only；live selected legs=pending，不存在预选订单。

**选择规则：**触发锚SPX 7600仅作当前候选定位；目标日取与实时触发/入场状态最接近的有效XSP long strike及相邻±1，short向下3或5 XSP点；ratio=1:1，无body，long/short分别构成有界两翼。更新spot/forward、到期宇宙、翼IV后再选宽度；任何实际重置或节点迁移清除旧腿和排名。首次能评估时已越过short或7550首复核点则不追。各腿完整symbol与映射仅见上方illustrative_eod_example，当前live最大debit保持null，按三层公式重算。

**激活与失效：**O_DOWN / O_GAP_DOWN / O_SIGN_DOWN连同全部共同门禁通过，且O_RECLAIM所定义的失效尚未发生，才进入人工评估。首复核SPX 7550，之后只有论据与实际清算值仍支持才考虑7500；不是自动止盈或必达目标。失效、时间止损、价格/风险边界或实际冲击可提前结束持有；具体定义只按第10节，完整取消清单见第12节。

**IV与payoff：**两候选均含FOMC，9/17还多一层周四事件/时间价值；应比较周二退出价值，不单按较低IV选期。精确候选long/short、25Δ与相关翼必须实时核验，不能拿更远的partial smile填补。卖出更低put降低付费并封顶风险，同时放弃short之外进一步收益；是否优于outright取决于live净值、成本及逆向敏感性。方向正确仍可能因走得慢、IV下降、翼重估或流动性成本亏损。

**风险与执行：**沿用ML=100Nd+C_N、MP=100N(W−d)−C_N及该方向成本后BE；实际N未知，表中N=1仅为unit_payoff_example。risk_budget_bound由实际R_eff与宽度决定；eod_feasibility_reference binding=false；t1_live_edge_bound=pending_target_session_confirmation。当前pricing_assessment=pending_live_repricing、edge_evidence_status=not_established、execution_feasibility=external_required；相应定价/模型/经纪商能力尚未核验。

| Scenario | Spot输入（XSP） | IV / 时间 / 费用要求 | 清算价值 / 净损益 |
| --- | --- | --- | --- |
| Base / 目标复核 | 755.0 | 入场后约30分钟；ATM 0及±2vp、相关翼变动；实际C_N | V_exit / net P&L / probability均pending或null |
| Adverse | 760.0并扩展至逆向路径 | 15–30分钟；不利skew/wing变化与额外退出成本 | pending；不能只保留有利目标情景 |
| Invalidation | 760.0附近实际失效状态 | 实际失效时点与当时surface、清算haircut | pending；风控退出可早于到期 |
| Planned exit | 实际或事先记录的情景网格 | min(入场+60分钟、截止)；实际费用和bid/ask | pending；不使用到期intrinsic冒充MTM |

估值须由合格经纪商或独立live scenario平台完成，保存模型/输入/时间和可清算折价；所有情景数值当前均未提供。该方向卡的中心包含测试为not_applicable，保留四情景路径损益检验。

### Risk-Path Contingency

**F_CALL / Risk / directional_continuation / call debit vertical / conditional。**适用于7650上方确认修复；候选首选9/16 PM（T日历DTE=2→目标1），后备9/17 PM（3→2），目标日9/15的0DTE不作默认。持有窗口为周二日内、最多60分钟且不晚于15:30 ET。Quote portability=low，表示方式candidate_template，fixed-legs authority=candidate_template_only；live selected legs=pending，不存在预选订单。

**选择规则：**触发锚SPX 7650仅作当前候选定位；目标日取与实时触发/入场状态最接近的有效XSP long strike及相邻±1，short向上3或5 XSP点；ratio=1:1，无body，long/short分别构成有界两翼。更新spot/forward、到期宇宙、翼IV后再选宽度；任何实际重置或节点迁移清除旧腿和排名。首次能评估时已越过short或7700首复核点则不追。各腿完整symbol与映射仅见上方illustrative_eod_example，当前live最大debit保持null，按三层公式重算。

**激活与失效：**O_UP / O_GAP_UP / O_SIGN_UP连同全部共同门禁通过，且O_REJECT所定义的失效尚未发生，才进入人工评估。首复核SPX 7700，之后只有论据与实际清算值仍支持才考虑7750；不是自动止盈或必达目标。失效、时间止损、价格/风险边界或实际冲击可提前结束持有；具体定义只按第10节，完整取消清单见第12节。

**IV与payoff：**两候选均含FOMC，9/17还多一层周四事件/时间价值；应比较周二退出价值，不单按较低IV选期。精确候选long/short、25Δ与相关翼必须实时核验，不能拿更远的partial smile填补。卖出更高call降低付费并封顶风险，同时放弃short之外进一步收益；是否优于outright取决于live净值、成本及逆向敏感性。方向正确仍可能因走得慢、IV下降、翼重估或流动性成本亏损。

**风险与执行：**沿用ML=100Nd+C_N、MP=100N(W−d)−C_N及该方向成本后BE；实际N未知，表中N=1仅为unit_payoff_example。risk_budget_bound由实际R_eff与宽度决定；eod_feasibility_reference binding=false；t1_live_edge_bound=pending_target_session_confirmation。当前pricing_assessment=pending_live_repricing、edge_evidence_status=not_established、execution_feasibility=external_required；相应定价/模型/经纪商能力尚未核验。

| Scenario | Spot输入（XSP） | IV / 时间 / 费用要求 | 清算价值 / 净损益 |
| --- | --- | --- | --- |
| Base / 目标复核 | 770.0 | 入场后约30分钟；ATM 0及±2vp、相关翼变动；实际C_N | V_exit / net P&L / probability均pending或null |
| Adverse | 765.0并扩展至逆向路径 | 15–30分钟；不利skew/wing变化与额外退出成本 | pending；不能只保留有利目标情景 |
| Invalidation | 765.0附近实际失效状态 | 实际失效时点与当时surface、清算haircut | pending；风控退出可早于到期 |
| Planned exit | 实际或事先记录的情景网格 | min(入场+60分钟、截止)；实际费用和bid/ask | pending；不使用到期intrinsic冒充MTM |

估值须由合格经纪商或独立live scenario平台完成，保存模型/输入/时间和可清算折价；所有情景数值当前均未提供。该方向卡的中心包含测试为not_applicable，保留四情景路径损益检验。

**共同live limit protocol：**EOD reference仅用于盘后可行性诊断，不是T+1 expected entry或binding limit。先按实时spot/forward、expiry、ATM、25Δ、相关翼与局部比较重新选腿，再从已审查的native combination mid附近按net limit评估；debit不得超过live情景边界、流动性界限与风险预算中最严格者。原生complex quote优先；若仅synthetic，须验证原子化multi-leg net-limit、同步腿报价与保守边界，并审查fill风险，不能拆腿。缺公开native NBBO不单独否决，未经核实的atomic能力也不能假定存在。

两张完整卡已占满本次上限，Alternative Setups为空。它们互斥，Risk卡不是基准持仓建议。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

条件：O_DOWN、O_GAP_DOWN、O_SIGN_DOWN以及共同门禁通过，O_RECLAIM未触发。路径：7600下确认后先复核7550，再条件性复核7500。绑定Base F_PUT；reclaim7600、负向结构不再一致或新的状态重置使原论据失效。方向与价格条件必须同时成立。

### Risk Case

条件：O_UP、O_GAP_UP、O_SIGN_UP以及共同门禁通过，O_REJECT未触发。路径：7650收复后先复核7700，之后条件性复核7750。绑定Risk F_CALL；rejection7650或修复证据失败则取消。Base/Risk互斥，不为对冲未实现的路径而同时建立两张卡。

### No-Trade Case

**EOD无合格计划条件：**核心formal身份/日期/必要数据硬失败；无法定义条件路径与失效；所有相关family均无法形成封顶风险及可复核的目标日重新筛选协议。本次未触发这些条件。low/none portability、旧腿不可迁移或没有公开native组合NBBO，均不能单独等同于EOD无计划。

**目标日execution abort：**

- 接受条件不完整，或开盘跳过确认位却未完成回测；首个可评估价格已越过short strike或第一复核节点。
- 实际重大消息、波动冲击或节点迁移未完成重置；原失效条件已出现。
- 必需实时来源、节点/forward/情景计算或经纪商atomic能力未核实；预先冻结的数值容忍度缺失。
- 任一腿报价或时间戳无效，组合宽度/退出成本不合格，映射或carry-parity超限。
- 精确候选IV/翼没有有效支持，或目标情景清算值不能覆盖debit和全部费用；静态到期payoff合格不能抵消该失败。
- 实际剩余预算不足，已有active setup，超过一次re-entry，或已有两次thesis failure。
- 剩余时间不足以形成最短持有/退出窗口，或必须依赖未经授权的隔夜、裸卖、无限风险结构。

重新考虑需要新的合格基线、明确路径和完整live候选/净值/成本/风险核验，不能通过删除失败门禁或事后放宽参数制造通过。目标日尚未发生的观察仅为pending；只有届时证实必需条件失败，才写blocked_by_live_execution_failure。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Tracking variable | Observation / why important | 对判断的影响 |
| --- | --- | --- |
| 7600 / 7650与新0DTE | 完成bar与全链/PM/局部/新0DTE符号是否一致 | 可改变directional prior和分支；单纯报价改善不改变它。 |
| 候选期限与翼 | 9/16、9/17同到期ATM、25Δ、long/shortIV和FOMC时间价值 | 改变期限/宽度/可支付额；不会自动证明edge。 |
| 事件、VIX和节点迁移 | Empire实际反应、后续突发消息、15分钟波动变化、关键节点移动 | 可重置旧论据与计数，须重判quote portability。 |
| 可清算净值与流动性 | 候选四情景value、native/synthetic价差、成本敏感性 | 决定价格和execution status；必要时整组拒绝。 |
| 真实风险和剩余时间 | L、H、active/re-entry/failure计数、经纪商截止 | 决定剩余预算和退出；不以研究参考预算代替账簿。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
