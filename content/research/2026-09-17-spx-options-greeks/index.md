+++
title = "SPX期权持仓与Greeks结构分析-260916"
date = "2026-09-17"
data_as_of = "2026-09-16"
draft = false
description = "分析9月16日期权持仓、Greeks与IV结构，以及9月17日条件式路径和实时确认要求。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "3b8146e94c3a72cb49ba3b0621864c3fb728779ccccc78dc2fec31ced25e4b1b"
+++

# SPX期权持仓与Greeks结构分析-260916

## 1. 结论

T 日剔除到期层后的 modeled signed Gamma 进一步偏负，T+1 维持中等置信度的条件式 downside_bias，关键是 **7550 下方接受且实时负向结构一致**；计划为 **B / Conditional Next-Day Plan**，执行状态为 **requires_external_live_source**，属于盘后研究而非实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | downside_bias；条件式下行释放优先，上行修复独立验证；structural confidence=medium。 |
| Earliest evaluation | 9 月 17 日最早 09:40 ET，仅在 08:30 数据实际发布及反应核对、开盘基线与容忍度冻结后，从实际 t0 完成两根 5 分钟 bar；延迟则顺延。 |
| Base activation | 若 7550 下方接受、负向结构及公共门禁成立，且无 reclaim，则研究 put debit vertical → 首先在 7500 重新估值 → reclaim 或负向层失效即取消／退出。 |
| Downside branch | 若独立下行条件成立，则沿用 Base put debit vertical → 先复核 7500，路径与价值仍成立才看 7450 → reclaim 或结构确认失败即失效。 |
| Upside branch | 若 7600 上方接受、局部及新 0DTE 修复且公共门禁成立，且无 rejection，则研究 call debit vertical → 首先复核 7625 → rejection 或修复失败即失效。 |
| Otherwise | No Trade / observe only；等事件、价格、结构与估值重新满足对应条件再评估；最晚入场 15:00，退出不晚于 15:30 ET 或更早实际限制。 |

Plan Grade / Plan Status：B / Conditional Next-Day Plan；Execution Status：requires_external_live_source；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 同一组 31 个存续到期日的 gross GEX 从 372.099 增至 400.989 十亿美元／1% 变动，signed GEX 从 −31.118 降至 −49.182；即使再去除目标日到期，仍为 −44.587。规模增加与负向结构加重同时成立。
- 基准路径是 7550 下方接受后研究下行延续，首个复核点 7500；正式收复 7600 并出现实时修复才启用上行分支。两张策略卡互斥，节点是重新估值位置。
- 9 月 18 日占剔除 T 日 0DTE 后 gross GEX 的 67.95%，其中 AM 占该到期日 gross 的 89.82%。AM 到期时钟与 PM 候选不能混用；正 Charm 主要来自 AM，是线性看空推断的反向因素。
- 7550 的当日 selected signed 峰值约 68.70% 的绝对贡献来自已经到期的 T 日层。存续负值仍在，但旧峰值不能整体迁移；共同 selected 的 7500、7600 负值减弱，7650 在剔目标日层后已转正。
- 正式 IV 为 partial：固定 3D 下行 3.321 vol points，而同到期 9 月 18 日仅下行 0.120；7／14／30／45D 均抬升。三条 selected smile 的 ATM 均抬升，7D 25Δ skew 变平、14D／30D 变陡，BF25 小幅增加；这些是带降级声明的局部定价证据。
- 观察核心为 7550–7575，较宽 corridor 为 7550–7600。核心内尚未发生方向释放，不代表所有稳定／区间 payoff 被永久禁止；区间重启需要独立的状态与含成本盈利区检验。
- B 级计划保留 put debit vertical 基准模板与 call debit vertical 风险路径模板；默认候选 9 月 18 日到期。08:30 数据在入场前构成 hard reset，Quote Portability=none，价格优势与实时执行能力仍待验证。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1 | T | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 共同存续 31 到期 | gross 372.099；signed −31.118 | gross 400.989；signed −49.182 | gross +7.764%；signed −18.064，单位十亿美元／1% | 负向残余增强，目标日层应继续单列。 |
| AM／PM 与二阶响应 | AM signed −2.123；PM −28.995；Charm +17.194 | AM −9.993；PM −39.189；Charm +34.025 | PM 占 signed 恶化 56.43%；正 Charm 主要来自 AM | 方向压力与时间推进的反力并存，不能推断实际对冲净流。 |
| 共同 selected 局部 | 7500 −78.379；7600 −41.266；7650 −19.532 | −68.118；−22.131；+1.923 | 同为 9/18＋10/16，百万美元／SPX 点 | 局部减压与全链负向扩大并存；保留独立修复分支。 |
| ATM term | 3D 20.645%；同到期 9/18 20.645% | 3D 17.324%；9/18 20.525% | fixed_tenor_atm −3.321vp；same_expiry_atm −0.120vp | 3D 槽位从原生 Fri 节点变为 Fri–Mon 插值，不能当作纯事件方差下降。 |
| Selected smile | 9/22、9/29、10/15 三个槽位 | 9/23、9/30、10/16 | rolling_tenor_slot_fixed_delta：ATM +0.513／+0.771／+0.492vp；skew −0.118／+0.043／+0.173；BF25 +0.032／+0.015／+0.019 | 水平／斜率／曲率分开；非同到期纯 repricing，实际候选 smile 需重取。 |
| 事件与计划窗口 | 为 9/16 FOMC 前上午条件窗口 | FOMC 已发布；9/17 08:30 新数据重置，默认正常 RTH 窗口 | 最晚新入场 15:00；日内退出上限 15:30 ET | 沿用 B / none 的分层状态；窗口改变来自 market_change，不沿用旧 FOMC 上午截止。 |

## 5. T 日盘面、字段时点与 Event-Risk Overlay

T 日可确认的是收盘较前日回落、VIX 抬升和短端收益率上行；没有合格分钟路径，不拼接“先涨后跌”等盘中叙事。净量与报价状态来自指定正式包，formal validation 与 freshness 均通过；这不消除 EOD 与实时的权限差异。

美国 8 月零售及餐饮销售为 **7739 亿美元**，经季调、未做价格调整，环比 +1.2%，公布的不确定区间为 ±0.4 个百分点（90%）；7 月环比由 −0.6% 修订为 −0.5%。这些是名义销售，并非实际消费量。[Census 9/16 零售发布 CB26-153](https://www.census.gov/retail/marts/www/marts_current.pdf)

8 月进口价格环比 +0.7%，非燃料进口 +0.8%，出口价格 +0.6%；进口价格指数不能直接当成 CPI。[BLS 进口与出口价格发布](https://www.bls.gov/news.release/ximpim.nr0.htm)

FOMC 官方索引文本显示 9/16 14:00 ET 将目标区间上调 25bp 至 3.75%–4.00%，投票 12–0；实施说明列示 IORB 3.90%，自 9/17 生效。  

| ET / event | Known status at cutoff | Impact / affected paths | Required action |
| --- | --- | --- | --- |
| 9/16 08:30 Retail Sales / Import Prices | 已公布；零售环比 +1.2%，进口价格 +0.7% | 背景：需求与价格压力；两分支 | 只用发布日期前已公布数值，不据此倒推当日每段价格的原因。 |
| 9/16 14:00 FOMC | 已公布，加息 25bp 至 3.75%–4.00% | 已发生的政策重估；两分支 | 不再当成目标日未来事件；目标日仍需独立开盘与数据重置。 |
| 9/17 08:30 Claims / Housing Starts / Philly Fed | scheduled，结果尚未产生 | E_DATA_0830：hard_reset；Base 与 Risk 均相关 | 核对实际发布和反应，清零旧计数与排名，冻结新基线；未完成则不进入评估。 |
| 9/17 10:00 Pending Home Sales | scheduled，结果尚未产生 | E_PENDING_HOME：monitoring_only；两分支 | 监测实际冲击，达到 O_VOL 或 O_NODE 即重置；不预设必然停单时段。 |
| 9/17 11:30 Weekly Economic Index | scheduled，结果尚未产生 | E_WEI：monitoring_only；两分支 | 同上，保留按真实冲击收紧窗口的权限。 |
| 9/18 09:15 Industrial Production；月／季到期 | 未来事件；到期标签来自包内日历 | 在计划持仓时段之后，但仍在 9/18 期权剩余价值内 | 评估期权期限溢价与到期时钟；不因周四平仓就忽略周五事件价值。 |
| 9/21 11:00 SCE Household Spending | 第三个后续常规交易日的日历背景 | 本次日内持仓之外 | 9/21 合约仅作期限敏感性比较，不把周一数据结果写入本报告。 |

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 负向残余加重，不能long Gamma

**Claim：** 负向残余加重，不能long Gamma。

**Evidence / basis：** 共同31到期gross 372.099→400.989B，signed -31.118→-49.182B；再剔目标后signed -44.587B。 来源为版本锁定的正式包与报告层复算，证据编号 C1。

**Mechanism / assumptions：** 在call−put约定能近似边际对冲压力时，负Gamma可放大边界释放；gross只是规模，风险摘要long_gamma_base标题不足以判定方向。 call−put 及二阶 Greek 是模型约定；未观察到的真实持仓、价格、IV、时间推进与 OI 变化均可影响结果。

**T+1 Implication：** 7550以下接受且live ex-target/PM/局部/新0DTE负向一致后，才研究下行延续。

**Falsifier：** Live全链与PM负向消退，或7550被reclaim。

**Confidence：** medium；mechanism_based，实证路径与收益检验 not_tested；不把内部置信度解释为涨跌概率。

### Thesis 2 — AM与PM均加重，但Charm是重要反向机制

**Claim：** AM与PM均加重，但Charm是重要反向机制。

**Evidence / basis：** 共同AM signed -2.123→-9.993B，PM -28.995→-39.189B；DEX127.071→-8.780B；Vanna -2.935→+1.604B、Charm17.194→34.025B，当前AM Charm34.052B、PM -0.028B。 来源为版本锁定的正式包与报告层复算，证据编号 C2。

**Mechanism / assumptions：** 二阶量是固定IV±0.5vp和下一交易日时间推进的模型响应。AM临近最后可交易代理时点可产生非线性变化；正Charm/Vanna可能形成对冲反力，但真实dealer方向未知。 call−put 及二阶 Greek 是模型约定；未观察到的真实持仓、价格、IV、时间推进与 OI 变化均可影响结果。

**T+1 Implication：** 不得把当前负signed线性外推至收盘；节点迁移、vol shock或实时修复都重置计数。

**Falsifier：** Live稳定吸收下破、PM减压并收复7600；或暴露计算口径不可比。

**Confidence：** medium；mechanism_based，实证路径与收益检验 not_tested；不把内部置信度解释为涨跌概率。

### Thesis 3 — 7550旧峰值要拆掉到期层，局部也不是全面恶化

**Claim：** 7550旧峰值要拆掉到期层，局部也不是全面恶化。

**Evidence / basis：** 7550全部selected signed -203.044百万/点，去T到期后-63.558，再去目标后-62.021；共同7500 -78.379→-68.118、7600 -41.266→-22.131，7650 -19.532→+1.923；7700 +84.879→+41.024。 

**Mechanism / assumptions：** T0到期不跨日继承。全链负压加重与局部负值减弱可以同时发生；selected只覆盖部分到期，不能由单节点得出完整dealer结构。 call−put 及二阶 Greek 是模型约定；未观察到的真实持仓、价格、IV、时间推进与 OI 变化均可影响结果。

**T+1 Implication：** Base7550→7500→7450；Risk7600→7625→7650。7550–7575先观察，稳定区间结构须另行通过盈利区包含测试。

**Falsifier：** 新0DTE或存续局部转正、7550回收；反之7600修复失败则取消Risk。

**Confidence：** medium；mechanism_based，实证路径与收益检验 not_tested；不把内部置信度解释为涨跌概率。

### Thesis 4 — 3D下降不能直接读成全面波动回落

**Claim：** 3D下降不能直接读成全面波动回落。

**Evidence / basis：** 固定3D20.645→17.324%，Δ−3.321vp；同到期9/18只降0.120vp，9/17升0.234vp；固定7/14/30/45D均升。3D从Fri原生节点滚为Fri2D–Mon5D总方差插值。 来源为版本锁定的正式包与报告层复算，证据编号 C4。

**Mechanism / assumptions：** FOMC已发生，但名义期限组成也改变；不能从3D差值直接提取纯事件方差。7D smile slope下降、14/30D上升，BF25小升，主要是level抬升。 两日相同 SPXW_PM scope 与节点方法可比；期限槽位组成仍有变化，不能从总差值提取纯事件方差。

**T+1 Implication：** 默认研究9/18 target1DTE；9/17 target0DTE与9/21 target4DTE只作期限敏感性比较。需实时重取实际候选smile与退出价值。

**Falsifier：** 相关exact-expiry和期限槽位关系被live重新定价打破，或质量/方法门禁失败。

**Confidence：** low；mechanism_based，实证路径与收益检验 not_tested；不把内部置信度解释为涨跌概率。

## 7. Conflicting Evidence, Confidence and What Changes the View

总体 structural confidence=**medium**，证据身份为 **mechanism_only / not_tested**。全链负向变化比单个节点更一致，但真实 dealer inventory 未观察，且没有经校准的真实世界路径概率，因此只形成条件先验。

最重要的反证有三组。第一，共同 selected 的 7500、7600 负值明显减弱，7650 剔除目标日层后转正，说明局部并非全面恶化；如果目标日新 0DTE 与 PM 同时修复，应该允许上行分支取代下行研究。第二，AM Charm 显著为正且接近月度到期时钟，其模型响应可能抵消部分负 Gamma 的路径放大；这不是已确认的买盘。第三，固定 3D 的下降主要表现为期限槽位变化，7D 及更长 IV 上升，不支持直接做“波动率全面塌陷”的卖方论证。

原生 risk_summary 的 long_gamma_base 来自正的 gross 汇总；gross 非负是规模定义，不能据此宣称 dealer 持有正 Gamma 或市场必然稳定。本报告依据同口径 call−put signed 与到期拆分解释方向，保留原生摘要作为有定义限制的字段，未改写上游数据。

7550 reclaim、7600 上方接受且修复一致、节点显著迁移或实际波动冲击，都会改变当前观点。价格／结构门禁失败影响候选激活；候选 live 价格或清算价值不合格影响是否可评估交易；核心正式数据本身失效才涉及 EOD 计划基础。三者不能混成一个“数据缺失”结论。

## 8. IV Term Structure, Skew and Surface

### ATM Term Structure and T vs. T-1 Dynamics

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 2026-09-17 | 2.000 → 1.000 天 | 18.538% | +0.234vp；same_expiry_atm | 目标日到期；PM | ATM k=0 总方差插值；observed support；q=0.995；含 roll-down |
| 2026-09-18 | 3.000 → 2.000 天 | 20.525% | -0.120vp；same_expiry_atm | 默认候选／月季到期与 IP；此行仅 PM | ATM k=0 总方差插值；observed support；q=0.993；含 roll-down |
| 2026-09-21 | 6.000 → 5.000 天 | 14.254% | +0.087vp；same_expiry_atm | 3D 上 bracket；4DTE 比较项；PM | ATM k=0 总方差插值；observed support；q=0.994；含 roll-down |
| 2026-09-22 | 7.000 → 6.000 天 | 14.458% | +0.350vp；same_expiry_atm | 前日 7D source；PM | ATM k=0 总方差插值；observed support；q=0.994；含 roll-down |
| 2026-09-23 | 8.000 → 7.000 天 | 14.620% | +0.539vp；same_expiry_atm | 本日 7D source；PM | ATM k=0 总方差插值；observed support；q=0.994；含 roll-down |
| 2026-09-29 | 14.000 → 13.000 天 | 13.831% | +0.567vp；same_expiry_atm | 前日 14D source；PM | ATM k=0 总方差插值；observed support；q=0.993；含 roll-down |
| 2026-09-30 | 15.000 → 14.000 天 | 14.035% | +0.558vp；same_expiry_atm | 本日 14D source；PM | ATM k=0 总方差插值；observed support；q=0.994；含 roll-down |
| 2026-10-15 | 30.000 → 29.000 天 | 14.036% | +0.450vp；same_expiry_atm | 前日 30D source；PM | ATM k=0 总方差插值；observed support；q=0.994；含 roll-down |
| 2026-10-16 | 31.000 → 30.000 天 | 14.078% | +0.454vp；same_expiry_atm | 本日 30D source；PM | ATM k=0 总方差插值；observed support；q=0.995；含 roll-down |
| 2026-10-22 | 37.000 → 36.000 天 | 13.993% | +0.084vp；same_expiry_atm | 共同 exact 节点可比；PM | ATM k=0 总方差插值；observed support；q=0.994；含 roll-down |
| 2026-10-30 | 45.000 → 44.000 天 | 14.371% | +0.392vp；same_expiry_atm | 前日 45D source／本日下 bracket；PM | ATM k=0 总方差插值；observed support；q=0.995；含 roll-down |
| 2026-11-03 | 49.042 → 48.042 天 | 14.230% | +0.376vp；same_expiry_atm | 本日 45D 上 bracket；PM | ATM k=0 总方差插值；observed support；q=0.990；含 roll-down |
| 3D fixed | 3 → 3 天 | 17.324% | -3.321vp；fixed_tenor_atm | SPXW_PM，合约 source 随时点滚动 | P：2026-09-18 observed；T：2026-09-18(2.000D)–2026-09-21(5.000D)，w=0.333333；interpolated，无外推；q=0.993 |
| 7D fixed | 7 → 7 天 | 14.620% | +0.513vp；fixed_tenor_atm | SPXW_PM，合约 source 随时点滚动 | P：2026-09-22 observed；T：2026-09-23 observed；observed，无外推；q=0.994 |
| 14D fixed | 14 → 14 天 | 14.035% | +0.771vp；fixed_tenor_atm | SPXW_PM，合约 source 随时点滚动 | P：2026-09-29 observed；T：2026-09-30 observed；observed，无外推；q=0.994 |
| 30D fixed | 30 → 30 天 | 14.078% | +0.492vp；fixed_tenor_atm | SPXW_PM，合约 source 随时点滚动 | P：2026-10-15 observed；T：2026-10-16 observed；observed，无外推；q=0.995 |
| 45D fixed | 45 → 45 天 | 14.334% | +0.355vp；fixed_tenor_atm | SPXW_PM，合约 source 随时点滚动 | P：2026-10-30 observed；T：2026-10-30(44.000D)–2026-11-03(48.042D)，w=0.247423；interpolated，无外推；q=0.990 |

ATM 使用 linear_total_variance_in_k_at_zero；固定期限只在正 τ 的有效 bracket 内对 total variance 插值，再还原 IV。当前 3D 权重 1/3，45D 权重 0.24742268；其余 7／14／30D 为 observed。fixed_tenor_atm 控制名义期限，但 source expiry 会滚动；same_expiry_atm 控制合约身份，仍含期限缩短与 repricing。因本期固定节点均存在，rolling_tenor_atm 无须作为替代；不能把三种 basis 混用。

曲线有明显前端 kink：9/18 PM 的 2D ATM 20.525%，高于 9/17 的 18.538% 与 9/21 的 14.254%。固定 3D−30D=3.246vp、7D−30D=0.542vp、14D−30D=−0.044vp、45D−30D=0.256vp，整体为前端高、随后较平且稍有回升的混合形状。3D 从前日 9/18 原生 3D 变为本日 9/18 2D–9/21 5D 插值；同到期 9/18 只下降 0.120vp，因此 −3.321vp 不能直接解释为广泛 IV crush 或提取纯 FOMC 事件方差。

Formal bucket 是另一套 scope／weighting 的 pipeline summary，不与本表拼成同一条曲线。采用本表 30D ATM 与本期 RV20 的背景差为 14.078%−8.662%=5.416vp；旧式 bucket 风险摘要的差值不替代这个计算，且 IV−RV 不是已实现或可交易收益。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：2026-09-23／~7D／level | 20.853% | 17.243% | 14.620% | 12.752% | 11.754% | 4.491vp | 0.377vp | forward delta 插值；observed support；min q=0.966；partial |
| Δ T vs. T-1：2026-09-22(7D) → 2026-09-23(7D) | +0.569vp | +0.485vp | +0.513vp | +0.603vp | +0.786vp | -0.118vp | +0.032vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 expiry roll；materiality=indeterminate_within_uncertainty |
| T：2026-09-30／~14D／level | 21.040% | 16.999% | 14.035% | 12.072% | 11.171% | 4.927vp | 0.501vp | forward delta 插值；observed support；min q=0.951；partial |
| Δ T vs. T-1：2026-09-29(14D) → 2026-09-30(14D) | +0.819vp | +0.807vp | +0.771vp | +0.764vp | +0.861vp | +0.043vp | +0.015vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 expiry roll；materiality=indeterminate_within_uncertainty |
| T：2026-10-16／~30D／level | 22.301% | 17.438% | 14.078% | 12.050% | 11.266% | 5.388vp | 0.666vp | forward delta 插值；observed support；min q=0.972；partial |
| Δ T vs. T-1：2026-10-15(30D) → 2026-10-16(30D) | +0.661vp | +0.597vp | +0.492vp | +0.424vp | +0.478vp | +0.173vp | +0.019vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 expiry roll；materiality=indeterminate_within_uncertainty |

按 level → slope → curvature 解释：三条 selected smile 的 ATM 分别抬升 0.513、0.771、0.492vp；25Δ downside-skew slope 的 7D 变平 0.118vp，14D／30D 分别变陡 0.043／0.173vp；BF25 分别增加 0.032／0.015／0.019vp。数值变化可复算，但小幅曲率与斜率变化相对模型和报价误差的显著性仍为 indeterminate_within_uncertainty。

当前 25Δ skew 随槽位由 4.491 → 4.927 → 5.388vp 增加。25Δ put−ATM 为 2.623／2.965／3.360vp，变化 −0.028／+0.036／+0.105；25Δ call−ATM 为 −1.868／−1.963／−2.028vp，变化 +0.091／−0.007／−0.068。两侧 10Δ 节点与变化见表，不能用固定 strike 的变动替代 fixed-delta slope；downside_skew_25d 也不是统计分布的 skewness。

上述 delta convention 为 forward_delta_non_premium_adjusted，非 ATM 节点使用 linear_in_forward_delta_within_observed_support；ATM 使用 k=0 总方差插值。三个前后 expiry 均滚动一天，因此是 rolling_tenor_slot_fixed_delta，而非 packet 未提供的 fixed_tenor_fixed_delta；每个槽位的 level、slope 与 curvature 同时包含换约和重新定价。

这些证据支持把 put wing 成本、call wing 回收及宽度纳入 directional spread 重选，不能证明 spread 优于 outright；butterfly／iron fly／condor 还需要稳定中心和含成本的退出盈利区，不能仅因曲率较高就建立。尾部保护的价格、calendar／diagonal 的跨期错配同样需要独立估值。本期默认候选 9/18、目标 0DTE 9/17 与比较项 9/21 均没有被选入三条 smile，不能用 7／14／30D 曲线代填；目标日必须刷新自身 ATM、25Δ、实际各腿翼点与 scenario values。Term structure / skew 是相对定价状态，不是确定方向信号；partial 的可用节点仅为降级局部研究证据，不能单独证明 edge 或给出目标日执行许可。

## 9. Key Expiry / Strike / Dealer Node

### Expiry and Greek Cohorts

| Cohort | Gross GEX B$/1% | Signed GEX B$/1% | DEX B | Vanna B/1vol | Charm next B | OI | Scope / durability |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T 全部 32 到期 | 425.996 | -71.615 | -32.289 | +1.604 | +34.025 | 11,794,345 | 含已到期层，仅总览 |
| T 日 0DTE | 25.007 | -22.433 | -23.508 | unavailable | unavailable | 366,541 | 9/16；T+1 已到期 |
| 目标日 0DTE 的 T 快照 | 8.642 | -4.596 | -13.772 | +0.091 | +0.218 | 151,013 | 9/17；T DTE1 → T+1 DTE0 |
| P 共同存续 31 到期 | 372.099 | -31.118 | +127.071 | -2.935 | +17.194 | 11,213,600 | 两日同一组 expiration > 9/16 |
| T 共同存续 31 到期 | 400.989 | -49.182 | -8.780 | +1.604 | +34.025 | 11,427,804 | 剔 T 日到期；仍含目标 0DTE |
| P 共同目标日后 30 到期 | 364.417 | -28.689 | +137.123 | -3.122 | +17.931 | 11,092,612 | 两日同一组 expiration > 9/17 |
| T 共同目标日后 30 到期 | 392.347 | -44.587 | +4.992 | +1.512 | +33.807 | 11,276,791 | durable 相对层，仍需 live 重算 |
| T 共同存续 AM | 288.371 | -9.993 | +151.438 | -0.065 | +34.052 | 7,554,580 | SPX / AM |
| T 共同存续 PM | 112.618 | -39.189 | -160.218 | +1.668 | -0.028 | 3,873,224 | SPXW / PM |

**Dominant expiry：9/18。** 合并 gross GEX=272.477B$/1%，signed=−12.688B$/1%，占全部 gross 的 63.96%、剔 T 日到期 gross 的 67.95%；AM gross 244.729、signed −3.191，PM gross 27.748、signed −9.497。T／T+1 的 calendar DTE 为 2／1，但 AM 与 PM 的最后交易及结算时钟不同；当前 9/18 gross 中 89.82% 属 AM，不能当成 XSP PM 的同一到期风险。10/16 合并 gross=47.697、signed=−7.687，calendar DTE 30／29，为较远期限背景。

### Strike Map and Structural Regions

下表 signed 数值单位均为**百万美元／SPX 指数点**。P／T 共同 selected 只比较 9/18＋10/16；T 存续列再加 9/17。不能把两日不同 target-expiry 组成的 selected 合集直接当成纯逐日流量。

| SPX / XSP | Role / T+1 use | P 共同 selected | T 共同 selected | T selected 存续含目标日 | Durability |
| --- | --- | --- | --- | --- | --- |
| 7400 / 740 | 更远下方背景；不作为首节点 | -22.284 | -27.144 | -27.983 | T0 已剔；目标日层单列；目标日重新映射 |
| 7450 / 745 | 下行第二复核点 | -17.159 | -19.589 | -25.539 | T0 已剔；目标日层单列；目标日重新映射 |
| 7500 / 750 | 下行第一复核点 | -78.379 | -68.118 | -76.029 | T0 已剔；目标日层单列；目标日重新映射 |
| 7550 / 755 | 下行确认／旧峰值需剥离 | -61.483 | -62.021 | -63.558 | T0 已剔；目标日层单列；目标日重新映射 |
| 7575 / 757.5 | 观察核心上沿 | -14.938 | -14.031 | -15.066 | T0 已剔；目标日层单列；目标日重新映射 |
| 7600 / 760 | 上行独立确认 | -41.266 | -22.131 | -23.717 | T0 已剔；目标日层单列；目标日重新映射 |
| 7625 / 762.5 | 上行第一复核点 | -14.528 | -9.040 | -9.865 | T0 已剔；目标日层单列；目标日重新映射 |
| 7650 / 765 | 上行第二复核点；层间符号不同 | -19.532 | +1.923 | -2.924 | T0 已剔；目标日层单列；目标日重新映射 |
| 7700 / 770 | 更高正向 shelf，非必达 | +84.879 | +41.024 | +42.558 | T0 已剔；目标日层单列；目标日重新映射 |

Selected 存续 9/17＋9/18＋10/16 覆盖 full-chain 剔 T 日到期 gross 的 82.00%；再剔目标日到期后的 9/18＋10/16 覆盖相应 gross 的 81.60%。范围之外仍有 −24.212B$/1% 的 signed 暴露，因此局部节点改善不否定全链负向增强。

7550 当日全部 selected signed 为 −203.044 百万美元／点，其中 T 日 0DTE 为 −139.486；到期贡献占绝对 signed 的 68.70%，但只占该节点 gross 的 30.25%，两种占比不可混用。去 T0 后为 −63.558，再去目标日层后为 −62.021。gross 节点规模另为 7500：411.376、7550：321.596、7600：431.965 百万美元／点，不能把“signed 负峰”写成“gross 最大节点”。

观察核心／directional no-trade core 为 **7550–7575（XSP 755–757.5）**，corridor 为 **7550–7600（XSP 755–760）**。这是一组等待确认的研究区域，不代表 pin 保证或对所有 payoff family 的禁令；区间成立与失效规则见下节。XSP 数值只是 SPX/10 的结构映射，半点映射可能没有对应挂牌 strike，必须重选并记录实际 gap。

## 10. T+1 Decision Map, Structural View and Plan Grade

Primary regime 为负向 modeled signed Gamma、AM／PM 负值扩大且到期集中；directional prior=**downside_bias**，path asymmetry 为条件下行优先、上行修复独立。Base path 与 Risk path 见第 2 节，setup representation 均为 **candidate_template**；当前 live selected legs=pending。

**B / Conditional Next-Day Plan**：结构、触发、失效、有限风险与目标日重新筛选流程可以定义，正式核心数据没有 hard failure。未升为 A，是因为实际候选的退出价值、实时结构计算与 broker／风险账本能力未验证，且 IV 有明确质量降级；未降为 C，是因为这些边界仍能构成可复核计划。portability=none 或未来数据尚未产生本身，不自动构成 C。相较旧报告等级不变，事件与时间窗口变化记为 market_change，非由微小 EOD premium 差异改级。

Execution Status=**requires_external_live_source**；Quote Portability=**none**。Formal IV=partial / degraded_local_evidence。两张 directional vertical 对 EOD IV 相对价值结论的 dependency=background_only，故该层 IV Structure Gate=not_applicable；这不豁免目标日 live IV／翼点／估值门禁。08:30 实际发布以及后续重大 vol/node 冲击均有 surface repricing risk。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 核心 7550–7575，尚无方向释放 | O_RESET、O_NODE；O_DOWN/O_UP 尚未成立 | 观察中心，不声称磁吸 | observe only；等待独立方向或区间确认 | 不是所有 family 永久禁令 |
| corridor 7550–7600 内往复 | O_RANGE 是否真正重建 | EOD 负向结构不足以直接卖区间 | 不追单；重新检验稳定性与盈利区 | 中心漂移／包含失败则取消区间研究 |
| gap 已越过边界 | O_GAP_DOWN 或 O_GAP_UP，再重计数 | 价格可能已越过可获利路径 | 回测后重新选择；未回测不追 | 首节点或短腿已越过则拒绝追价 |
| 08:30 发布后／实际重大冲击 | O_RESET、O_CAL、O_CONFIG | 旧基线与报价排名失效 | 实际 t0 起重新确认 | 有效窗口不足则取消 |
| post-event range reconfirmed | O_RANGE：3 根 bar、稳定 map 与盈利区包含 | 出现新的局部稳定证据 | 仅启动新的 range 研究 | 本次两卡不自动增加第三张 |
| range thesis failure / boundary release | O_RANGE 失效后另查 O_DOWN/O_UP | 区间失败不等于方向自动成立 | 回到独立方向确认 | 不得机械切换 family |
| 7550 下方接受 | O_DOWN、O_SIGN_DOWN、O_GAP_DOWN、公共门禁；O_RECLAIM absent | 负向层一致，允许条件式下行研究 | Base / Downside put vertical | reclaim／任一负向层失效 |
| 7600 上方接受 | O_UP、O_SIGN_UP、O_GAP_UP、公共门禁；O_REJECT absent | 需要独立修复，不能只看上破价格 | Risk call vertical | rejection／修复失败 |
| vol reset / node migration | O_VOL 或 O_NODE | 估值与路径假设已经变化 | 管理已有风险，清零计数和排名 | 重选重估未完成不恢复 |
| 未来所有相关门禁通过 | 对应 condition_ids 与人工核对 | 仅进入人工交易评估 | eligible_for_manual_evaluation | 当前仍 requires_external_live_source |
| 观察到实际执行门禁失败 | O_QUOTES / O_MAPPING / O_VALUE / O_BROKER / O_RISK / O_TIME | 该次执行条件不满足 | 不新增；已有仓位按风险边界处理 | 区别于尚未产生的 Expected Pending |

### Operational Definitions

| Condition / purpose | Observable source and exact rule | Window / reset / limit |
| --- | --- | --- |
| O_RESET / O_CAL / O_CONFIG | 官方或合格事件流核对 08:30 实际发布与反应；同步 SPX/XSP/forward、map、IV、quotes。ε_map、ε_parity、ε_node 必须记录数值、单位、来源与冻结时间。 | t0 为全部重置／冻结完成后，不早于 09:30 的下一个完整 5 分钟 bar 起点；不得按日历钟响假定完成。 |
| O_DOWN / O_UP：接受 | 合格实时 SPX 指数源；连续两根完成的 5 分钟收盘，分别严格 <7550 或 >7600。 | ET 对齐，从 t0 开始；若 t0=09:30，最早 09:40 完成；半根 bar 不计。 |
| O_GAP_DOWN / O_GAP_UP：回测 | 若开盘 <7550，先有 bar 交易回 ≥7550；若开盘 >7600，先有 bar 交易回 ≤7600，再重新计数。 | 未回测不追；重置前计数不得续用；该规则不等于要求隔夜旧行情回测。 |
| O_SIGN_DOWN：负向一致 | 同口径 live 全链计算器：剔目标 0DTE 后 signed<0、SPXW_PM signed<0、7550 局部 signed<0、独立新 9/17 0DTE signed<0。 | 两次确认收盘均成立；每次 map age≤300 秒；不能由价格 bar 冒充结构确认。 |
| O_SIGN_UP：修复一致 | 相同 live 计算器：7600–7650 局部合计 signed>0、新 9/17 0DTE signed>0，PM 负压较冻结新基线收窄或非负。 | 两次确认收盘均成立；保持相同方法、scope 与基线，独立于下行分支。 |
| O_RECLAIM / O_REJECT：失效监控 | 下行：一根收盘 ≥7550，下一根完整 bar 不再交易至 7550 以下；上行：一根收盘 ≤7600，下一根不再交易至 7600 以上。 | 入场要求 invalidation_absent / invalidation_not_triggered；检测到则取消／退出。风险规则可要求更早退出，无须等两步完成。 |
| O_NODE / O_VOL：状态改变 | 节点移动超过事先冻结 ε_node；或 15 分钟内 VIX 上升 ≥1 点／同候选到期 ATM IV 上升 ≥2vp。 | ε_node 当前 null；VIX/IV age≤30 秒、map≤300 秒。触发即清零计数与排名，重建基线。 |
| O_RANGE：区间重新确认 | 至少三根完成 bar 在冻结 7550–7575 核心或明确重定的 7550–7600 区间内；节点稳定、无 vol 冲击；live spot/forward 与中心不确定区间全部包含于扣成本的情景盈利区，留正 buffer。 | 至少 15 分钟；仅开启新研究。完成收盘越界、node/vol reset 或包含失败即区间失效，方向须另行确认。 |
| O_QUOTES / O_MAPPING / O_SURFACE | 外部 live 全腿有效 bid/ask，age≤30 秒；有意义正 mid 时组合 spread/mid≤25%。校验 XSP−SPX/10、同到期 carry-adjusted parity，刷新候选 ATM／25Δ／翼点与 Greeks。 | 近零 mid 另查绝对 tick、成本；ε_map、ε_parity 当前 null，先冻结。native 优先，synthetic 全腿须同步。 |
| O_VALUE / O_BROKER / O_RISK | 合格平台提供目标、逆向、失效与计划退出清算值；实际 broker 支持原子净限价；风险账本给出实际剩余额度。 | 均 external_required、未验证；不得用到期内在价值代替盘中 MTM，或把预算未知当成零亏损。 |
| O_TIME：两分支有效窗口 | Base／Downside 与 Risk：实际 t0+10 分钟，09:40 只是最早下界；最晚新入场 15:00。time stop=min(entry+60 分钟，15:30 ET，更早 broker／合约／事件限制)。 | 至少保留 30 分钟有效持有空间；更早限制只能缩短窗口；当天退出，不跨夜。 |

公共门禁包含 O_RESET、O_CAL、O_CONFIG、O_NODE、O_VOL、O_QUOTES、O_MAPPING、O_SURFACE、O_VALUE、O_BROKER、O_RISK、O_TIME；方向分支另加各自接受、回测、结构和失效状态。所有当前 verification_status=pending，实时能力 external_required；没有已经获准的 price-only fallback。

两根 5 分钟 bar、30 秒 quote、25% 相对 spread、vol reset、60 分钟 time stop、30 分钟 exit buffer 与风险限额来自 v1.8 workflow_default；5 分钟 map age、至少 30 分钟可持有空间、相邻 strike 与 3／5 点宽度网格为本报告规划假设。均未经验校准；ε_map、ε_parity、ε_node 未定值、未冻结，不能把 null 当成 0 或任意放行阈值。参数调整须记录来源、单位、时间和理由，并使相关旧计数失效。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

结构适配、价格判断与执行可行性分开。两张卡均为 conditional、pricing_assessment=pending_live_repricing、edge_evidence_status=not_established、execution_feasibility=external_required；B 级计划不代表价格优势。其余 family 的筛选状态如下。

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base / F_PUT | directional_continuation / put debit vertical | 符合有条件下行释放 | background_only；IV gate=not_applicable；需自身 live 翼点 | pending_live_repricing；edge not_established；有限最大损失 | conditional；external_required | 7500 清算值、全成本、预算与公共门禁 |
| Risk / F_CALL | directional_continuation / call debit vertical | 仅对应 7600 以上独立修复 | background_only；IV gate=not_applicable；需自身 live 翼点 | pending_live_repricing；edge not_established；有限最大损失 | conditional；external_required | 7625 清算值与反向压力；不追价 |
| Base alternative / F_DBWB | directional / broken-wing butterfly | 可构成有限风险方向替代，未完成定点比较 | required；gate=conditional；缺候选曲率／尾部模型 | pricing unavailable；edge not_established | not_screenable | 需不对称宽度、尾部及持有时点估值；两腿 CSV 缺项不证明 family 不适用 |
| Range review / F_FLY | centered_stability / debit butterfly、defined-risk iron fly | 旧 pin 部分到期，durable center 未重建 | required；gate=conditional | pricing unavailable；盈利区未验证 | reject 当前状态 | O_RANGE 与含成本中心区间包含测试成立后重研 |
| Range review / F_CONDOR | bounded_range / defined-risk condor | corridor 尚非已验证的双边边界 | required；gate=conditional | pricing unavailable；尾部／退出值未知 | reject 当前状态 | 核对两侧边界、中心与尾部 |
| Event review / F_EXPANSION | two_sided_expansion / long straddle、strangle | 有重估风险，净移动是否足够未知 | required；gate=conditional | pricing unavailable；required move 与 theta 成本未知 | not_screenable | 需事件后移动／premium／时间耗损比较 |
| Separate research / F_TERM | term_relative_value / calendar、diagonal | 不属于当前保留的日内方向路径 | required；gate=not_applicable | pricing unavailable；不能沿用 vertical 风险公式 | not_applicable | 需独立跨期估值与持有边界；3D kink 不自动构成 edge |



### Local Candidate Comparison

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F_PUT：live 7550 映射最近 long 及相邻 ±1 strike；short 低 3 或 5 点；1:1，无 body | stability 包含测试 not_applicable；检验下行首节点与退出净值 | 默认 9/18；9/17、9/21 仅期限敏感性比较；自身 live smile 必取 | 逐组检验目标／逆向／失效／退出清算值和风险 | 按实时各腿计算，不沿用 EOD 符号 | 4N 合约侧动作成本、同时时点、深度 | none | deferred_to_t1；18 组，其中默认到期 6 组；winner=null |
| F_CALL：live 7600 映射最近 long 及相邻 ±1 strike；short 高 3 或 5 点；1:1，无 body | stability 包含测试 not_applicable；7625 首节点与退出净值须覆盖成本 | 默认 9/18；非默认到期仅比较；不由 7D 曲线代填 | 独立修复路径；正净目标价值未成立则拒绝 | 净 Δ 也须重算，Γ/Vega/Theta 随位置变化 | 同上，并检验短腿是否过早截断路径 | none | deferred_to_t1；18 组，其中默认到期 6 组；winner=null |

网格合计 **36 组**：2 个 family × 3 到期 × 3 long anchors × 2 宽度。默认 9/18 在目标日为 1 calendar DTE，共 12 组；9/17 为目标 0DTE、9/21 为目标 4 calendar DTE，共 24 组仅作敏感性对照，**不是自动 fallback**。本次没有默认的 2／3 calendar DTE 挂牌候选；不为凑期限扩大到非默认到期。vertical 无 body，亦无蝶式对称／不对称翼；重建 butterfly／BWB 须另做网格。

目标日先剔除流动性、全成本风险和时间不合格项，再比较四类净清算值、短腿截断路径、Greeks 与成本敏感性；没有校准概率，不伪造加权期望排名。无可复核优势就不选。event、spot／forward、node 或 vol reset 后清空排名并重选。范围策略的中心包含测试另由 O_RANGE 负责。



### Base Candidate Template — Base Case

**F_PUT / Conditional downside release。** Linked scenario=Base，payoff archetype=directional_continuation，family=put debit vertical，screening=conditional。默认 expiry=2026-09-18（T 2 → target 1 calendar DTE）；holding window=9/17 日内，实际 t0+10 分钟至最晚 15:00 可评估，time stop 按第 10 节。Quote Portability=none；representation=candidate_template；fixed-legs authority=candidate_template_only。

**适用状态与激活／失效。** O_DOWN、O_SIGN_DOWN、O_GAP_DOWN 与公共门禁须同时成立，且 O_RECLAIM 为 invalidation_absent；取消、失效和 gap 回测采用第 10 节完整定义。首节点或拟议 short 已越过、成本／估值不支持、事件未 reset、时间不足则不追单。入场后 reclaim 或负向层失效即按风险约束取消／退出，不为等目标延长持有。

**选择规则与合约身份。** 以重置后的 live 7550 区域映射最近挂牌 long put 及相邻 ±1 strike；买较高 strike put、卖较低 strike put，比例 1:1，比较 W=3／5。无 body；具体 long/short、mapping gaps、live selected legs 与 N 均 pending。节点、现价、forward 变化后先 re-center / re-strike，再谈成交价。EOD underlying、完整 legs／ratios、quotes、Greeks、BE 及费用 stress 只见上方唯一诊断行。

**定价、数量与风险。** 客户支付 debit 记 d>0，初始现金流 −100Nd；risk maximum debit 采用 d_risk，live maximum debit 采用 d_live，均 pending；credit floor 不适用。ML／MP／BE／盈利区／尾部损失与 C_N 采用三层边界，实际 N=null，乘数 $100，无实际下单组数。center containment=not_applicable；必须验证 7500 首节点与 planned-exit 净清算值，不能由标的下跌直接推定组合盈利。EOD reference binding=false。

**IV 与 Greeks。** 9/18 尚含周五事件和到期溢价；该 expiry 正式 selected smile 缺失，须取得目标日自身 ATM、25Δ、long/short 翼和 Greeks。目标暴露为下行 Delta；净 Γ／Vega／Theta 以 live 为准，不能继承旧例符号。08:30、vol 与 node 冲击使 surface ranking 失效；较慢下行、IV 回落、翼差变化及成本均可能吃掉方向收益。

**估值、退出与比较。** 在 7500 首先复核；只有路径、剩余价值与时间仍支持才看 7450，节点不是必达或止盈承诺。必须完成下方 Base／Risk／Invalidation／planned-exit 情景，再使用原子净限价协议，按 time stop 退出。相比 outright long put，卖出较远 put 可减少支出但封顶收益，是否更优取决于 live 路径估值与全成本，不能只比 premium。pricing_assessment=pending_live_repricing，edge_evidence_status=not_established；候选估值模型、实时结构、broker 与 risk book 未提供／未验证，维持 requires_external_live_source。

### Risk-Path Contingency

**F_CALL / Independent upside recovery。** Linked scenario=Risk，payoff archetype=directional_continuation，family=call debit vertical，screening=conditional；仅供风险路径触发后评估。默认 expiry=9/18，holding window、none portability、candidate_template 与 fixed-legs authority 同上；与 F_PUT 互斥，不同时建立。

**适用状态与激活／失效。** O_UP、O_SIGN_UP、O_GAP_UP 和公共门禁须成立，O_REJECT 为 invalidation_absent；完整规则见第 10 节。价格上破不能代替局部 signed、新 0DTE 与 PM 修复。首节点／拟议 short 已越过、短腿过早截断收益、成本不合格或时间不足均取消；入场后 rejection 或修复失败则按风险约束退出。

**选择规则与合约身份。** 以 live 7600 区域映射最近 long call 及相邻 ±1 strike；买较低 strike call、卖较高 strike call，比例 1:1，比较 W=3／5，无 body。具体 long/short、mapping gaps、N、live selected legs 均 pending；每次 reset 后重新选腿。完整 EOD 例仅在唯一诊断行，不作为开盘默认订单。

**定价、数量与风险。** debit 正号、risk d_risk、live d_live、ML／MP／BE／C_N 与 all-in risk cap 使用三层边界；maximum debit pending、minimum credit 不适用，实际数量未知、乘数 $100，reference binding=false。到期盈利区在 Call BE 上方，尾部 payoff 损失有限；提前到达 7625 时的清算值不等于到期收益。center containment=not_applicable，四类情景价值测试均 required。

**IV、Greeks、退出与比较。** 自身 9/18 live ATM／25Δ／实际翼点必需，目标为上行 Delta，净 Γ／Vega／Theta 实时重算。上涨同时 IV 或相对翼价下降、短腿截断太早、反弹太慢、费用扩大，均可能让方向正确但净收益不成立。先在 7625 复核，路径与价值仍在才看 7650；执行同一 time stop。相较 outright long call，vertical 减少支出但限制上行，须用实时净情景值比较。pricing_assessment=pending_live_repricing，edge_evidence_status=not_established；所需估值、实时报价、broker 与 risk book 能力同 F_PUT，仍未验证。

### Scenario Values and Live Quote Protocol

以下是**目标日待计算的情景框架**，不是 EOD 估值或预测概率。spot 为压力测试节点；计划退出 spot、实际 N、entry premium、fees、V_exit、net P&L、valuation timestamp 与 probability 未提供时均保持 null。

| Candidate | Scenario | XSP scenario spot | Holding / observation | IV / wings assumption | Liquidation value / net P&L |
| --- | --- | --- | --- | --- | --- |
| F_PUT | Base / 首节点 | 750 | 30min after entry | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |
| F_PUT | Risk / 逆向 | 760 | 15–30min adverse path | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |
| F_PUT | Invalidation | 755 | Actual reclaim/rejection time | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |
| F_PUT | Planned exit | pending 实际退出 spot | Earliest of entry+60min and session/broker limit | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |
| F_CALL | Base / 首节点 | 762.5 | 30min after entry | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |
| F_CALL | Risk / 逆向 | 755 | 15–30min adverse path | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |
| F_CALL | Invalidation | 760 | Actual reclaim/rejection time | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |
| F_CALL | Planned exit | pending 实际退出 spot | Earliest of entry+60min and session/broker limit | 9/18 实时 ATM 基线及 ±2vp 敏感性，加不利翼点移动 | pending；V_exit=null；net P&L=null |

ATM ±2vp 与不利翼移为敏感性假设，不是概率区间。合格平台按实际剩余期限、利率／forward、候选 smile 与成交深度计算清算值并折减退出流动性；不能由语言模型重建正式 surface，或以到期 intrinsic value 代替 30 分钟 MTM。目标情景为正不证明整体正期望，还须人工评估逆向、失效与退出风险。

> EOD reference 仅用于盘后可行性诊断，不是 T+1 expected entry 或 binding limit。目标日先按实时 spot / forward、expiry、ATM term structure、25Δ skew / relevant wing points 与局部候选比较重新选腿，再从实时 native combination mid 附近按 net limit 评估；debit 不得超过实时 edge bound 与风险预算中更严格者，credit 不得低于实时 edge floor。原生 complex quote 优先；缺少公开 native quote 时标记 synthetic-only，并审查 legging / fill risk。若经纪商支持原子化 multi-leg net-limit order 且所有实时门禁可核验，缺少公开 native NBBO 不构成自动否决。

原子净限价与 live 数据源必须实际可用，工具名称不等于接入验证。本包没有 native complex quote；synthetic-only 应使用同步各腿，记录时间、ratio、净买卖方向与可成交数量，避免逐腿裸露。实时 mid 仅为评估起点，允许放弃成交，不以追价突破 d_live。

EOD mapping 中，XSP−raw SPX/10=−0.045 点；对官方 SPX/10 的差为 −0.001 点，两套来源分别披露。对 9/18、9/21 的 18 组 call-put pairs 做 carry-adjusted 诊断：F=K+(C−P)/D，使用同到期 packet discount，比照 packet SPX forward/10，残差 −0.018649 至 +0.028099 点，18/18 reference 在 bid/ask 区间内，quote 时间偏移 0。核对依赖同一 packet 模型，非独立 live parity pass；不得用 spot 的零 carry 关系替代。ε_map、ε_parity 仍待冻结，目标日重新验证。

XSP 为 $100 乘数、欧洲式行权、现金结算；候选 9/18 到期，9/17 非到期 RTH 至 16:15 ET，合约到期日 16:00 ET 截止；本计划 15:30 退出上限更早，并服从 broker 更早限制。[Cboe XSP 合约规格](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)

### Alternative Setups

Base 与 Risk 已占满两张完整卡，不增加第三张。其余 family 维持筛选状态和重研要求，方向卡未触发不自动切到 range、BWB 或跨期交易。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

条件为第 10 节下行接受、负向层一致、必要 gap 回测及公共门禁均通过，且 reclaim 不存在。假设路径为 7550 下释放，先在 7500 复核；只有结构、价值与时间仍支持，才观察 7450。关联计划为 F_PUT candidate template，不假定当前已持仓；reclaim 或负向层失效即取消／退出。该路径只是条件假设，未分配概率。

### Risk Case

条件为 7600 上方接受、局部与新 0DTE 转正、PM 修复及公共门禁通过，且 rejection 不存在。路径先到 7625 复核，再考虑 7650；关联 F_CALL contingency，不能替代尚未触发的 Base 持仓。rejection 或修复失败即失效，节点迁移和 vol reset 另行清零重建。

### No-Trade Case

**EOD no-qualified-plan condition：** 若核心正式包无法建立正确日期与身份、相容结构不可用、所有 family 无法定义有限风险或合理重选流程，才构成盘后无合格计划。本次未发生这些 hard failure，仍保留 B 级 conditional 两卡；其他 family 的 reject／not_screenable 原因见第 11 节。

**T+1 execution abort condition：** 实际事件 reset 未完成、方向／结构未确认、存在 reclaim／rejection、报价过期或宽度不合格、mapping／parity 未验证、候选 live surface 或清算值缺失、净情景价值不支持成本、实际预算不足、broker 原子执行不可用，或超过时间窗口，均不新增。已有风险按既定有限风险与退出规则处理，不能靠追加风险等待条件恢复。

**Reconsideration：** 在剩余有效窗口内，重新取得所缺能力和最新状态，冻结参数、清零重计数、重选候选、重估全成本与四类情景，再由人工评估；超过窗口则等待下一份日期化计划。核心内若真正出现 O_RANGE，可启动新范围研究，不能因当前两张方向卡不触发就直接卖区间。未来实时数据尚未产生、portability=none、固定 EOD legs 不可迁移或缺少公开 native NBBO，单独都不是 EOD 无计划理由。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on view / grade / execution |
| --- | --- | --- |
| 08:30 实际发布与开盘反应 | 决定新基线和 t0，后续 10:00／11:30 监测真实冲击 | reset 未完成不评估；重大变化清零计数与排名 |
| live ex-target、SPXW_PM、新 9/17 0DTE 与关键局部 signed | 区分负向延续和上行修复，避免继承已到期峰值 | 改变 structural prior／对应分支；无计算能力则执行状态不放行 |
| 9/18 AM／PM 拆分与 Charm 时钟 | 主到期集中，AM 时间推进可能产生反力 | 避免单方向线性外推；节点迁移要求重新确认 |
| 实际候选 ATM／25Δ／翼与四类清算值 | 固定 3D 改变不等于候选被同幅重新定价 | 决定 candidate pricing 与可行性；缺正净情景支持即拒绝 |
| quote、mapping/parity、cost/risk book 与剩余窗口 | 结构成立仍须满足完整成交和有限风险约束 | 验证后只可进入 manual evaluation；任何实际失败终止本次新增 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
