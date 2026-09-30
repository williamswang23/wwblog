+++
title = "SPX期权持仓与Greeks结构分析-260929"
date = "2026-09-30"
data_as_of = ["2026-09-28", "2026-09-29"]
data_as_of_note = "T-1为9月28日，主快照为9月29日；9月30日仅为条件计划目标日。"
draft = false
description = "分析9月29日SPX期权存续PM负Gamma扩大、近端IV回落与9月30日盘前事件后的条件观察计划。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "de30953a6d36262406c50e3b219ea5bea9b44b1d6f89baa171e008632414c6d1"
+++

# SPX期权持仓与Greeks结构分析-260929

## 1. 结论

9月29日存续PM负Gamma扩大，但AM正值增加与近端IV回落构成反证；9月30日保留**低置信度下行条件先验（downside_bias）**，盘前数据后重新确认7675下方接受才评估put价差，计划为 **B / Conditional Next-Day Plan**、执行状态为 **requires_external_live_source**，属于盘后条件研究，非实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | downside_bias，低置信度；PM负值扩大使下侧路径优先，但AM正值增加、近端IV回落构成反证。 |
| Earliest evaluation | 9/30 ET最快09:40：盘前ADP、GDP/PCE全部实际公布，09:30或之后完成刷新冻结，再确认两根完整5分钟bar；延迟、回测或冲击则顺延。 |
| Base activation | 若7675下方接受且新0DTE／局部为负、全PM和剔目标层为负且不改善，则评估put debit vertical→首查7650→收复7675或弱结构消失则失效。 |
| Downside branch | 若7675下接受并满足Base门禁，则沿同一put分支先查7650、重估后再看7625；收复7675或弱结构消失则失效，初次评估已越首节点或short不追。 |
| Upside branch | 若7700上方接受且新0DTE／局部为正、全PM非负且不恶化、剔目标层非负，则评估call debit vertical→首查7725→拒绝7700或修复失效则取消。 |
| Otherwise | 7675–7700内或任何门禁未过则观察／No Trade；重置、回测及完整确认后才重评；两卡互斥，正常15:00后不新入、15:30或更早限制前退出。 |

Plan Grade B / Conditional Next-Day Plan；Execution Status requires_external_live_source；planning_only=true：盘后条件计划，非实时下单指令，最终由人工判断。

## 3. Executive Summary

- **存续结构进一步偏弱。** 共同29期signed GEX由-9.422B降至-14.880B；PM更负、AM更正，方向排序保持低置信度。B为十亿美元／SPX变动1%，不是实际对冲流。
- **旧7670负节点不能沿用。** 其中大部分来自9/29到期层；剔除后，9/30新0DTE与更长到期层须分别观察。10/16仍是最大gross到期，但其正signed主要来自AM。
- **价格证据有时点限制。** raw代理7684.07→7671.59，约−0.1624%；包内官方收盘和RV仍停在9/28，不能把旧官方跌幅写成9/29表现。
- **短端并非继续全面升波。** 9/30同到期ATM下降3.565vp；fixed3D仅下降0.018vp，源期限从10/1移到10/2。滚动smile的level、slope、curvature分化，且Formal IV仍为partial。
- **两条互斥条件路径。** Base在7675下接受且独立负层成立后看7650，之后才重估7625；Risk需7700上接受并修复结构，先7725再7750。现有盘后价在7675下，不等于目标日已触发。
- **盘前事件后全部重估。** 目标日ADP、GDP/PCE后开盘刷新，最快09:40仅在完整条件满足时评估。默认期限实际为10/1、10/2的1／2个日历DTE；报价portability=none，108个历史候选均无live赢家。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/28 | T：9/29 | Change / basis | T+1 relevance |
| --- | --- | --- | --- | --- |
| 共同29期gross／signed | 225.056／-9.422 | 233.117／-14.880 | gross+3.582%；signed-5.458B | 相同expiry>9/29；仍未隔离spot/IV/OI变化 |
| 共同PM／AM signed | -10.653／+1.231 | -20.379／+5.498 | B／1%；PM更负，AM更正 | 相反变化降低单方向结论强度 |
| 9/30到期层signed | -5.504 | -8.308 | B／1%；同expiration | 本期变为目标日0DTE，现场重建 |
| 9/30 ATM／fixed3D | 16.893%／14.478% | 13.328%／14.460% | −3.565vp same_expiry_atm／−0.018vp fixed_tenor_atm | fixed3D源10/1→10/2，不能掩盖9/30回落 |
| smile约7／14／30D槽 | 10/5、10/12、10/28 | 10/6、10/13、10/29 | ATM+0.010/+0.206/+0.312；skew+0.009/−0.093/−0.057；BF−0.060/−0.056/+0.001vp | rolling_tenor_slot_fixed_delta；含构成变化，曲率显著性未知 |
| 计划／事件／权限 | B；最快10:15，目标9/29日内10:00事件后 | B；最快09:40，目标9/30盘前事件后 | downside_bias、Base put/Risk call、none不变 | 目标层、耐久层和候选期限已更新；非methodology_restatement |

## 5. T 日盘面、字段时点与 Event-Risk Overlay

**新闻覆盖。** JOLTS与Conference Board自发新闻稿均标注9/29 10:00 ET，早于16:00源数据时点；Barr为9/29日期级讲话，精确可得时点未归档，按background_only使用。下列事实提供风险背景，不作为SPX价格变动的因果证明。

1. 8月职位空缺为707.9万，低于修订后7月733.5万；BLS将空缺、招聘及离职整体描述为变化不大。 不能把25.6万环比差额直接解释为失业增加、统计显著恶化或低于预期；未独立核实一致预期。 [BLS](https://www.bls.gov/news.release/archives/jolts_09292026.htm)。

2. 9月消费者信心降至81.9，8月为88.6；现状指数109.3、预期指数63.6。调查初值截至9月23日。 信心不是已实现消费或衰退概率；不据此断言SPX跌因。 [The Conference Board 自行发布的新闻稿](https://www.prnewswire.com/news-releases/us-consumer-confidence-fell-in-september-302892867.html)。

3. Barr认为通胀风险上升、劳动力市场风险减退，并表示其基准情景可能仍需进一步政策调整。 这是个人政策判断，不能当作FOMC承诺；精确网页可得时点未归档，仅用日期级background_only。 [Federal Reserve](https://www.federalreserve.gov/newsevents/speech/barr20260929a.htm)。

| 未来三个RTH／ET | 已核日历安排 | 计划作用 |
| --- | --- | --- |
| 9/30 08:15；08:30；10:00；10:30；15:25 | ADP；GDP第三次估计及个人收入/PCE；CMDI；Dallas能源；Cook农村经济 | 盘前两组为hard_reset；盘中三项monitoring_only，实际冲击升级reset |
| 10/1 08:30；10:00；11:30；13:30；15:00；15:30 | 初请；ISM制造业/建筑支出/MCT及Waller经济数据；WEI；Jefferson经济与政策；Bowman监管；Cook全球央行 | 本计划日内退出之后，为候选期限估值背景 |
| 10/2 08:30；10:00；12:45 | 就业报告；EHI及制造业发货/订单；纽约联储Nowcast | 就业已在三日窗口内；持有10/2合约仍须9/30日内退出 |

来源：[纽约联储9月](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[10月](https://www.newyorkfed.org/research/calendars/i-oct26.html)、[美联储9月](https://www.federalreserve.gov/newsevents/2026-september.htm)、[10月](https://www.federalreserve.gov/newsevents/2026-october.htm)。三日均按正常RTH处理；日历网页精确历史版本未归档，须现场复核更新，不含未来公布结果。ADP/GDP/PCE可能改变利率、spot和短期IV，本报告选择事件后评估，hard_reset分类及09:30最早冻结是**未校准的计划假设**。实际发布迟延或冲击未消化时顺延；其他常规日历不自动封锁全天。包内event_light仅覆盖OpEx。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 存续PM负值扩大，AM正值抵消一部分

**Claim：** 存续PM负值扩大，AM正值抵消一部分。

**Evidence / basis：** 共同29期gross225.056→233.117B（+3.582%）；signed-9.422→-14.880B；PM-10.653→-20.379B，AM+1.231→+5.498B。

**Mechanism / assumptions：** 同expiration集合排除进出，但不剥离spot、IV、aging和OI；signed是call-minus-put建模约定，不是真实dealer净仓。

**T+1 Implication：** 延续低置信下侧条件排序，盘前数据后验证PM、新0DTE与价格共同接受。 **Falsifier：** PM转正或7700上接受并出现独立修复。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 2 — 7670巨大负节点大多到期，9/30目标层须重建

**Claim：** 7670巨大负节点大多到期，9/30目标层须重建。

**Evidence / basis：** 7670全selected-125.267M/点，其中T0-123.161M；7650/7700目标层-30.635/-34.386M；7675目标-9.797M、耐久+1.637M。

**Mechanism / assumptions：** 局部正负混合；剔目标后的selected仅10/16，不能把它当全链耐久地图。

**T+1 Implication：** 保留7675/7700为确认参考；下行首查7650，上行首查7725；不把负节点称为保证支撑。 **Falsifier：** 新0DTE/局部符号不符、节点迁移或价格已过首查节点。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 3 — 9/30同到期ATM回落，fixed3D近乎不变掩盖迁移

**Claim：** 9/30同到期ATM回落，fixed3D近乎不变掩盖迁移。

**Evidence / basis：** 9/30 ATM16.893%→13.328%（−3.565vp）；10/1为14.431%（−0.047vp）、10/2为14.460%（−0.206vp）；fixed3D−0.018vp，源10/1→10/2。

**Mechanism / assumptions：** 估值间隔19h58m43s，包含老化与重新定价；fixed3D源期限变化不能代替9/30事件合约比较。

**T+1 Implication：** 默认比较10/1与10/2；9/30仅战术0DTE。候选日内退出估值需覆盖IV回落、翼部变化及theta。 **Falsifier：** 事件后target净清算价值不足以覆盖debit、费用与正buffer。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 4 — 价格与Greeks偏弱，宏观价格并未一致确认

**Claim：** 价格与Greeks偏弱，宏观价格并未一致确认。

**Evidence / basis：** raw7684.07→7671.59（-0.1624%）；官方及RV仍止于9/28；VIX16.07→16.04；2Y−3bp、10Y+2bp。共同DEX+148.095→+101.082B；Charm+1.761→-2.460B。

**Mechanism / assumptions：** Charm两期都推进一个交易日，但仍是固定其他变量的模型差，不是已发生对冲流；VIX小幅下降也不构成趋势反转。

**T+1 Implication：** 不沿用旧官方跌幅当作今日收益；盘前增长/通胀数据之后重新冻结。 **Falsifier：** 价格与PM修复，或新的宏观/波动冲击改变路径。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 5 — 曲面仍降级，不能由微小smile变化决定策略

**Claim：** 曲面仍降级，不能由微小smile变化决定策略。

**Evidence / basis：** 单调性0.700→0.667，legacy占比0.300→0.433，均不达标；凸性/非负密度0.900→0.967。三smile槽均换到期，BF变化−0.060/−0.056/+0.001vp。

**Mechanism / assumptions：** 部分质量变好、部分变差；BF变化无误差校准。正式smile10/6、10/13、10/29不覆盖0/1/2DTE候选wing。

**T+1 Implication：** B级条件计划；Base put/Risk call互斥；事件后报价none，全部候选实时重估。 **Falsifier：** 缺候选自身IV、四情景MTM、风险账本或执行能力，则不进入人工评估。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| 共同PM负值扩大、raw在7675下 | AM正值扩大，7675耐久selected为正 | 下侧先验保留但低置信；目标日7675守住、新0DTE转正或7700接受并修复会改变排序 |
| 9/30目标层及7650/7700负节点 | 7670大负节点主要到期，selected覆盖不完整 | 剔T0并重建目标日地图；节点漂移则清空旧确认 |
| 价格及共同DEX/Charm偏弱 | VIX略降、9/30ATM回落、官方价/RV滞后 | 不能称宏观和波动共同确认下行；等待真实路径 |
| 负Gamma可放大路径 | 上行同样可能被放大，期权成本和退出值未知 | 保留独立Risk修复分支，不给涨跌概率或已确认edge |

主导证据是存续PM及目标层弱结构，反证降低confidence；structural_confidence=low，path_asymmetry_status=directional。以上是机制先验，无独立历史收益或命中率检验。PM、新0DTE、价格修复或事件重置可以改变结构判断；报价过期、broker能力或风险账本缺失首先改变Execution Status，不自动推翻盘后结构或把B降为C。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / role | Source expiry / τ / weight | T ATM IV | Δ(T−T−1) / basis | Method / support / quality |
| --- | --- | --- | --- | --- |
| 09/30／目标0DTE／PCE及EOM | τ1.832→1.000天 | 13.328% | -3.565vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.990；partial |
| 10/01／目标1DTE候选／前fixed3D源 | τ2.832→2.000天 | 14.431% | -0.047vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.993；partial |
| 10/02／目标2DTE候选／就业／本fixed3D源 | τ3.832→3.000天 | 14.460% | -0.206vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.995；partial |
| 10/05／前fixed7D源 | τ6.832→6.000天 | 11.972% | -0.171vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.993；partial |
| 10/06／本fixed7D源及smile | τ7.832→7.000天 | 12.154% | +0.024vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.994；partial |
| 10/12／前fixed14D源 | τ13.832→13.000天 | 11.816% | +0.043vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.993；partial |
| 10/13／本fixed14D源及smile | τ14.832→14.000天 | 11.979% | +0.026vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.993；partial |
| 10/16／最大gross到期的PM部分 | τ17.832→17.000天 | 12.721% | +0.073vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.995；partial |
| 10/28／前fixed30D源／FOMC日 | τ29.832→29.000天 | 12.799% | +0.034vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.995；partial |
| 10/29／本fixed30D源及smile | τ30.832→30.000天 | 13.078% | +0.049vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.995；partial |
| 11/06／前45D下端／含DST | τ38.874→38.042天 | 13.505% | +0.035vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.992；partial |
| 11/13／前45D上端／本45D observed源 | τ45.874→45.042天 | 13.555% | +0.011vp；same_expiry_atm | k0局部总方差；observation_bracketed；confidence=0.995；partial |
| fixed3D | P:10/01–10/01；τ2.832–2.832天；w=0.000000；observed → T:10/02–10/02；τ3.000–3.000天；w=0.000000；observed | 14.460% | -0.018vp；fixed_tenor_atm | packet原生；observation_bracketed；confidence=0.995；no_extrapolation=true；partial |
| fixed7D | P:10/05–10/05；τ6.832–6.832天；w=0.000000；observed → T:10/06–10/06；τ7.000–7.000天；w=0.000000；observed | 12.154% | +0.010vp；fixed_tenor_atm | packet原生；observation_bracketed；confidence=0.994；no_extrapolation=true；partial |
| fixed14D | P:10/12–10/12；τ13.832–13.832天；w=0.000000；observed → T:10/13–10/13；τ14.000–14.000天；w=0.000000；observed | 11.979% | +0.206vp；fixed_tenor_atm | packet原生；observation_bracketed；confidence=0.993；no_extrapolation=true；partial |
| fixed30D | P:10/28–10/28；τ29.832–29.832天；w=0.000000；observed → T:10/29–10/29；τ30.000–30.000天；w=0.000000；observed | 13.078% | +0.312vp；fixed_tenor_atm | packet原生；observation_bracketed；confidence=0.995；no_extrapolation=true；partial |
| fixed45D | P:11/06–11/13；τ38.874–45.874天；w=0.875127；interpolated → T:11/13–11/13；τ45.042–45.042天；w=0.000000；observed | 13.555% | +0.018vp；fixed_tenor_atm | packet原生；observation_bracketed；confidence=0.995；no_extrapolation=true；partial |

当前30个PM exact节点中，29个有兼容前值且均已计算变化；新11/5 prior node缺失，其same-expiry change为unavailable。表列目标、候选与来源迁移涉及的关键共同期限。same_expiry_atm含19小时58分43秒老化与重新定价；fixed_tenor_atm仍须审视来源变动。原生fixed点可用，ATM表不以rolling近邻替代；下方smile选槽的ATM变化属于rolling_tenor_atm语义，与fixed行即使数值恰同也不能混称。9/29到期层剔除，9/30正τ=1天将在目标日变为0DTE。

估值间隔19h58m43s。fixed3D源10/1(τ2.832442)→10/2(τ3)，7D10/5(τ6.832442)→10/6(τ7)，14D10/12(τ13.832442)→10/13(τ14)，30D10/28(τ29.832442)→10/29(τ30)；均原生observed，允许±.25天不重建。45D由11/6–11/13(τ38.874109–45.874109,w.875127)插值转11/13(τ45.041667,w0)observed，包含DST。

**形态与事件。** 9/30局部凸点回落，10/1–10/2前端较高，7–14D下降、30–45D上行；整体mixed，同到期涨跌分化，不能称全曲线升波。 fixed3D−30D=+1.382vp，7D−30D=-0.925vp，14D−30D=-1.099vp，45D−30D=+0.476vp。9/30为13.328%，低于10/1的14.431%与10/2的14.460%，后者又高于10/5的11.972%。不能因PCE在9/30就继续声称该期有局部凸点；事件、剩余期限、周末与曲面误差均可能贡献，未识别单独事件方差。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew25Δ | BF25 | Method / comparison / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T:10/06／约7D | 15.833% | 13.727% | 12.154% | 11.038% | 10.624% | 2.689vp | 0.229vp | 观测支持内forward-delta插值；confidence0.957–0.994；partial |
| Δ:10/05(τ6.832)→10/06(τ7.000) | -0.278vp | -0.046vp | +0.010vp | -0.055vp | -0.177vp | +0.009vp | -0.060vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；materiality=indeterminate_within_uncertainty |
| T:10/13／约14D | 16.252% | 13.815% | 11.979% | 10.842% | 10.403% | 2.973vp | 0.350vp | 观测支持内forward-delta插值；confidence0.963–0.993；partial |
| Δ:10/12(τ13.832)→10/13(τ14.000) | -0.000vp | +0.104vp | +0.206vp | +0.197vp | +0.168vp | -0.093vp | -0.056vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；materiality=indeterminate_within_uncertainty |
| T:10/29／约30D | 19.199% | 15.534% | 13.078% | 11.716% | 11.310% | 3.818vp | 0.547vp | 观测支持内forward-delta插值；confidence0.966–0.995；partial |
| Δ:10/28(τ29.832)→10/29(τ30.000) | +0.217vp | +0.284vp | +0.312vp | +0.342vp | +0.324vp | -0.057vp | +0.001vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；materiality=indeterminate_within_uncertainty |

**Level → slope → curvature。** 滚动7/14/30D槽ATM+0.010/+0.206/+0.312vp；skew+0.009/−0.093/−0.057vp，分别数值略陡/变平/变平；BF−0.060/−0.056/+0.001vp。小变化无误差校准，curvature保持unchanged_within_uncertainty；不是纯重定价。 三槽ATM数值上移；7D斜率数值略陡、14/30D数值变平，微小变化不能证明稳定经济差异；BF统一保留unchanged_within_uncertainty而非宣称精确不变。Skew25=IV25put−IV25call，BF25=(IV25put+IV25call)/2−ATM；均为report-layer calculation from packet nodes。Skew是fixed-delta斜率代理，不是统计分布偏度。delta convention为forward_delta_non_premium_adjusted，沿观测支持内forward delta插值。

Wing premium=wing−ATM；7D put-wing=1.574vp（Δ-0.056），call-wing=-1.115vp（Δ-0.065）；14D put-wing=1.836vp（Δ-0.102），call-wing=-1.137vp（Δ-0.010）；30D put-wing=2.456vp（Δ-0.028），call-wing=-1.362vp（Δ+0.029）。

Skew期限梯度14D−7D由+0.386至+0.284vp，30D−14D由+0.809至+0.845vp。7D10/5→10/6，14D10/12→10/13，30D10/28→10/29，全部rolling_tenor_slot_fixed_delta，不是same-expiry或nativefixed-tenorsmile。 无原生fixed-tenor delta-smile，不作fixed_tenor_fixed_delta比较；目标日smile仍pending。

**策略传导。** 目标1–3calendarDTE实际为10/1(1)、10/2(2)；10/3周六无合约，10/5为5DTE且超默认窗口。9/30仅0DTE战术比较，10/1只是卡片算术示例；周三日内退出。 9/30、10/1、10/2均有正式ATM，但均无selected smile。方向family的EOD IV为background_only，planning IV gate=not_applicable；目标日自身ATM/25Δ/wing/Greeks与四情景MTM仍必需。Fly/condor/BWB/双侧扩张缺candidate wing而required gate=fail；尾部保护也不能据远期put richness确定短期执行价；calendar/diagonal还缺收敛与跨期清算估值。RV5/10/20=7.8182%/11.5253%/10.8278%，末日9/28；formal30D13.0782%比旧RV20高2.2504vp，仅异时点/异窗口描述，不是VRP；D30 bucket不替代Formal30D。所有数值仅支持降级局部研究，不能证明可交易edge或执行许可。

## 9. Key Expiry / Strike / Dealer Node

下表GEX单位为**十亿美元／SPX变动1%**。gross=call+put规模，signed=call−put模型代理；Canonical COMBINED只计一次，AM/PM明细不重复累加。真实dealer库存不可见。

| Expiry / family | Role | T→目标calendar DTE | Gross GEX | Signed GEX | Vendor OI |
| --- | --- | --- | --- | --- | --- |
| 09/29／COMBINED | 已到期，前瞻剔除 | 0→-1 | +34.493 | -22.198 | 355,531 |
| 09/30／COMBINED | 目标0DTE／EOM，重建新图 | 1→0 | +43.741 | -8.308 | 1,106,843 |
| 10/01／COMBINED | 目标1DTE候选 | 2→1 | +10.079 | -1.562 | 136,779 |
| 10/02／COMBINED | 目标2DTE候选 | 3→2 | +24.123 | -5.059 | 529,697 |
| 10/16／COMBINED | 全链及存续最大gross | 17→16 | +62.669 | +6.028 | 2,786,820 |
| 10/16／SPX | AM拆分 | 17→16 | +54.489 | +6.127 | 2,436,332 |
| 10/16／SPXW | PM拆分 | 17→16 | +8.180 | -0.099 | 350,488 |

全链gross267.610B、signed-37.078B；9/29到期层占gross12.89%。移除后存续gross233.117B／signed-14.880B；再剔9/30层后为189.377B／-6.572B。10/16占全链gross23.42%、存续26.88%；9/30占存续18.76%。

各自剔T0的signed P-13.729→T-14.880B，集合不同；固定共同29期为-9.422→-14.880B；固定目标日仍正DTE的28期为-3.918→-6.572B。新增11/5的OI及GEX为零，不改变总量；退出9/28不解释共同集合的全部变化。

**节点尺度与覆盖。** 原gamma table已为1%尺度，下表用signed_gex_point=gex_dealer/(0.01×7671.59)换成**百万美元／SPX点**。本期selected为9/29、9/30、10/16；移除9/29后为9/30＋10/16，再剔目标9/30后只剩10/16。存续selected gross覆盖45.65%，剔目标后覆盖33.09%。表中更久selected为AM/PM合并，不能替代实时全PM门禁；没有完整spot-gamma曲线，不声称gamma flip。

| SPX / XSP比例参考 | 作用 | 9/29到期层 | 目标9/30层 | 更久selected：10/16 | 存续selected合计 |
| --- | --- | --- | --- | --- | --- |
| 7600／760 | 远端负节点 | -2.478 | -30.400 | -6.004 | -36.404 |
| 7625／762.5 | 下侧第二复核 | -1.089 | -6.392 | -4.130 | -10.521 |
| 7650／765 | 下侧首查；目标及耐久均负 | -11.008 | -30.635 | -9.481 | -40.116 |
| 7670／767 | 旧T0大负节点须剔除 | -123.161 | -2.304 | +0.199 | -2.105 |
| 7675／767.5 | 下侧确认；目标负、耐久正 | -17.045 | -9.797 | +1.637 | -8.160 |
| 7685／768.5 | 目标微正、耐久微负 | -16.268 | +0.187 | -0.054 | +0.133 |
| 7700／770 | 上侧修复确认；目标及耐久负 | -17.389 | -34.386 | -5.974 | -40.361 |
| 7725／772.5 | 上侧首查；两层正 | +0.112 | +3.044 | +0.748 | +3.792 |
| 7750／775 | 上侧第二复核；正节点 | -1.389 | +19.308 | +7.383 | +26.691 |
| 7800／780 | 远端正节点 | -0.685 | +6.871 | +16.136 | +23.007 |

7670全selected signed为-125.267M/点，移除旧T0后仅-2.105M/点；不能将大负值保留为次日耐久节点。7675目标负、10/16正；7650/7700两层均负，是条件确认和风险复核位，非保证支撑。7725两层为正、7750正值更大，上行须先查7725，不能用终端满额payoff绕过首节点估值。XSP=SPX/10只提供尺度参考，现场须独立验证mapping及forward。

**其他Greeks。** DEX：共同+148.095→+101.082B；状态非流量；VANNA：共同+1.738→+0.267B；sigma±.005的DEX差，非实现flow；CHARM：共同+1.761→-2.460B；Mon→Tue与Tue→Wed均1天，仍非flow；VEX：全链1.751606B=sum(vendor_vega*100*OI);vendorvega单位未独立核实；VOLGA：存续11.616583B；BSvega针对小数sigma，±.005有限差分未额外乘.01，不能直接与vendorVEX比较。Vanna/Volga用σ±0.005有限差分；Charm保持spot、IV、OI等条件比较下一交易日，本期Tue→Wed与前期Mon→Tue均一步。ACT/365、PM16:00/AM17:00是模型参考时钟，AM17:00不是官方结算时间；T0高阶null不等于零风险。任何状态变化都不能证明真实dealer流量。

## 10. T+1 Decision Map, Structural View and Plan Grade

Primary regime为存续PM负Gamma、AM正缓冲扩大；directional_prior=downside_bias，path_asymmetry_status=directional，confidence=low。Base与Risk分别为7675下接受／7700上修复；Plan Grade **B / Conditional Next-Day Plan**，Execution Status **requires_external_live_source**，Quote Portability **none**，setup_representation=candidate_template。方向family的EOD IV gate=not_applicable，不解除live自身IV与MTM要求；盘前事件及short DTE带来surface repricing风险。

**为何B：** Formal通过，PM负值扩大支持条件下行机制；7675/7700分支、失效、封顶风险与事件后复筛可定义。 **未评更高：** AM正值增加、短端IV回落、官方价/RV滞后、selected覆盖有限；candidatewing/MTM和现场能力未齐。 **未评更低：** 有两条有限风险条件路径与明确取消协议；none报价和正常未来pending不自动构成C。 评级保持B，非methodology_restatement；pricing_assessment=pending_live_repricing，edge_evidence_status=not_established，评级不代表胜率或收益。

| T+1 state | Required confirmation / IDs | Structural interpretation / plan | Invalidation / status |
| --- | --- | --- | --- |
| 盘前结果未齐或冲击未结束 | O_RESET；ADP与GDP/PCE实际可得 | 只准备输入，不进入分支评估 | 等待真实完成，日历时间不能代替 |
| 开盘在7675–7700观察带 | O_RESET/O_CONFIG后等待完整bar | directional release未触发；range也尚未通过自身筛选 | 无接受则No Trade |
| 盘前事件后／开盘刷新完成 | >=09:30冻结，t0后两根完整bar；O_RESET/O_CONFIG | 最快09:40，仅状态前提同时成立 | 延迟、shock或回测顺延 |
| 跳空在7675下或7700上 | O_GAP_DOWN/O_GAP_UP：先回测原边界后重计 | 保留条件路径；不把盘后价当触发 | 已越7650/7725或所选short不追 |
| 7675下接受 | O_DOWN+O_SIGN_DOWN+共同门禁；无O_RECLAIM | Base put，先7650，重估后才看7625 | 收复或独立弱结构消失 |
| 7700上接受 | O_UP+O_SIGN_UP+共同门禁；无O_REJECT | Risk call，先7725，重估后才看7750 | 拒绝或独立修复消失 |
| Post-event range reconfirmed | O_RANGE：3根完整bar＋新wing/center/净利润区证据 | 仅允许重新筛选fly/condor；本期没有range卡 | 不能仅由价格留在核心放行 |
| Range thesis failure / boundary release | 中心迁移、利润区失配或边界突破 | 取消range研究，方向分支须独立重新确认 | 不自动反手或沿用计数 |
| 盘中日历／vol shock／node迁移 | O_CAL/O_VOL/O_NODE | 普通事项监测；实质冲击清空排序及旧限价 | 重新刷新冻结；缺新图则暂停评估 |
| 全部门禁通过 | 一条分支和所有required live门禁 | 仅eligible_for_manual_evaluation；人工决定 | 任何必需项失败即取消 |
| 任何能力、预算或价值门禁失败 | O_QUOTES/O_MAPPING/O_SURFACE/O_VALUE/O_BROKER/O_RISK/O_TIME | 不新建仓；已有风险按预定退出规则 | 执行限制不自动变为盘后C |

### 可观察条件与实时能力

评估仅限9/30 RTH。t0取不早于刷新与数值冻结完成时刻的第一个完整5分钟边界；如果09:30完成，可从09:30起计，09:40最早获得两根完整bar。O_RECLAIM/O_REJECT为失效信号，入场须不存在；其余关联必需项须通过。目标日所有live能力目前为external_required，没有用价格代替signed层的fallback。

| ID / metric | 计算、阈值和真实观察来源 | 最大 |
| --- | --- | --- |
| O_RESET／event_reset | 9/30盘前08:15 ADP及08:30 GDP/PCE均实际公布、无未完成冲击后，在09:30或之后刷新冻结；t0是不早于冻结完成的首个完整5m起点，至少两根确认。发布延迟/节点或波动冲击则清空计数顺延；其余日历仅监测。 来源：官方讲话/直播/实际完成记录及实时数据 | 30秒 |
| O_CAL／calendar | 核实9/30正常RTH及各腿最后交易时间；10:00 CMDI、10:30 Dallas能源、15:25 Cook监测实际冲击。常规日历不自动封锁全天；提前收市/实际broker限制优先。 来源：Cboe/官方日历/实际经纪商限制 | 现场核验 |
| O_CONFIG／parameter_freeze | 在t0之前固定数值mapping/parity/node/报价时差容差、b、风险账本和估值方法；null不放行，不在触发后调整制造通过。 来源：人工签认参数记录 | 现场核验 |
| O_UP／SPX_close | 连续两根完成bar的close严格>7700；从t0后重新计数，且同时满足O_SIGN_UP。 来源：实时SPX已完成5m bar | 30秒 |
| O_DOWN／SPX_close | 连续两根完成bar的close严格<7675；从t0后重新计数，且同时满足O_SIGN_DOWN。 来源：实时SPX已完成5m bar | 30秒 |
| O_REJECT／upside_invalidation | 一根5m close回到7700下方或等于7700，下一根close未重新收于7700上方，则上行失效。若7675下破或风险上限先触发，提前退出。 来源：实时SPX完成bar | 30秒 |
| O_RECLAIM／downside_invalidation | 一根5m close回到7675上方或等于7675，下一根close未重新收于7675下方，则下行失效。风险上限可先触发退出。 来源：实时SPX完成bar | 30秒 |
| O_GAP_UP／gap_retest | 若开盘或reset后首价已>7700，须先出现覆盖7700的回测bar，再从其后完整bar重计两根；首个可评估时SPX>=7725，或实时XSP已>=所选call short strike，则不追。 来源：实时SPX逐笔/完成bar | 30秒 |
| O_GAP_DOWN／gap_retest | 若开盘或reset后首价已<7675，须先出现覆盖7675的回测bar，再从其后完整bar重计；首个可评估时SPX<=7650，或实时XSP已<=所选put short strike，则不追。 来源：实时SPX逐笔/完成bar | 30秒 |
| O_SIGN_UP／signed_GEX_layers | 在两根接受bar终点：local=sum(call−put) GEX，取仍可交易SPXW_PM且strike位于闭区间[7700,7725]，按live spot换算每点；全PM汇总所有仍可交易PM到期。可交易SPXW_PM总signed>=0且不低于事件后冻结基准、剔9/30后全链signed>=0、7700–7725局部PM signed>0、9/30新PM0DTE signed>0；不以价格代替任何层。 来源：外部同口径PM/new0DTE/durable/local地图 | 300秒 |
| O_SIGN_DOWN／signed_GEX_layers | 两根接受bar终点均核验：所有仍可交易SPXW_PM总signed<0且不高于事件后冻结基准；剔9/30目标0DTE的全链signed<0且不高于冻结基准；[7650,7675]闭区间仍可交易PM局部signed<0；9/30新PM0DTE signed<0。总量按USD/1%，局部按live spot换成USD/点；价格不能替代任何一层。 来源：外部同口径PM/new0DTE/durable/local地图 | 300秒 |
| O_RANGE／range_profit_region | 连续3根完整5m close在预冻结7675–7700核心内，未越confirmation level且无shock；spot/forward和完整center uncertainty区间均落在成本后scenario盈利区间内并留正buffer。仅区间家族研究；本期range为未选替代家族，候选正式wing缺失，须重新通过family筛选才可形成range卡。 来源：实时SPX/forward/中心区间/多腿MTM | 30秒 |
| O_NODE／node_migration | 当前地图年龄<=300秒（本报告假设）；关键位变化不超事前数值容差，否则重建并清零。 来源：事件后冻结与当前同口径地图 | 300秒 |
| O_VOL／vol_shock | 若15分钟内VIX增加>=1.0点或候选ATM IV增加>=2.0vol_points，则shock；门禁要求无未完成reset的shock。 来源：实时VIX和候选expiry ATM IV | 30秒 |
| O_QUOTES／live_combination | Quote年龄<=30秒；bid<=ask。正mid组合spread/mid<=25%；mid<=0时用事先冻结的绝对tick宽度/成本容差判断，不做除零。每条腿流动性及数量匹配。 来源：实时native组合或同步全腿quote | 30秒 |
| O_MAPPING／spot_forward_parity | SPX/10与XSP、leg时差、C-P=D(F-K)残差均在预冻结数值容差内；使用独立live XSP carry/forward，不能拿EOD或任意q=0替代。 来源：实时SPX/XSP/独立carry与forward | 30秒 |
| O_SURFACE／candidate_surface | 选腿后取得同timestamp/scope候选ATM、put/call25D及long/short-wing IV、Greeks；partial可用节点不自动扩展为完整曲面，不借用其他到期填补。 来源：外部候选expiry ATM/25D/两腿IV及Greeks | 30秒 |
| O_VALUE／planned_exit_MTM | 计算target/adverse/invalidation/planned_exit四情景；实际time/spot/forward/rate/IV/wing/N/cost可追溯。保守target liquidation value必须>debit+C_N/(100N)+b，并通过risk/RR/liquidity cap。 来源：已验证live估值方法/退出流动性折价 | 30秒 |
| O_BROKER／atomic_net_limit | 确认支持所选全腿原子net-limit、正确ratio/expiry/multiplier；native优先，synthetic须同步保守构造；不拆腿追价。 来源：人工核实经纪商实际订单能力 | 现场核验 |
| O_RISK／risk_book | R_eff=min(300,500-L-H); ML=100*N*d+C_N; MP=100*N*(W-d)-C_N; d_risk=(R_eff-C_N)/(100*N); d_RR=W/2-C_N/(100*N)；1active，最多1次reentry；两次thesis failure或预算耗尽停止；实际N/L/H/C_N未知即不放行。 来源：实际已实现损失/持仓最大剩余风险/费用 | 现场核验 |
| O_TIME／entry_exit_window | min(entry+60min,applicable_session_exit_deadline); deadline=min(15:30 ET,earlier user/broker exit limit,min(all-leg last-trade time,target RTH close)-30min buffer); latest_entry=deadline-30min minimum viable holding; no overnight；最快09:40仅在盘前数据全部可用、09:30已完成刷新冻结且两根完整bar通过时成立；延迟/回测/冲击则顺延；不足30分钟取消。 来源：实际日历/各腿合约/经纪商 | 现场核验 |

Base与Risk最早均为09:40、正常最晚15:00新入，前提见上表；并非定时到点自动许可。地图300秒、最低持有窗口30分钟、09:30最早冻结为本报告假设；两根确认、quote30秒、25%价宽等为v1.8流程默认，均非alpha校准。Mapping/parity/节点/报价时差/绝对tick宽度容差、b、实际N/L/H/C_N均为null，必须t0前填成数值并冻结，不能触发后调阈值制造通过。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario / family | Payoff archetype / structural fit | Term / skew / IV gate | Pricing / execution / edge | Status / next check |
| --- | --- | --- | --- | --- |
| base_case／put_debit_vertical | directional_continuation／conditional | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；background_only／not_applicable | pending_live_repricing／external_required／not_established | conditional：7675下接受且独立负层确认；7650首节点前有足够live净值才评估。 |
| risk_case／call_debit_vertical | directional_continuation／conditional | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；background_only／not_applicable | pending_live_repricing／external_required／not_established | conditional：7700上接受且独立正层修复；先7725再7750。 |
| alternative_range／defined_risk_iron_butterfly | centered_stability／not_established | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；required／fail | unavailable／external_required／not_established | not_screenable：稳定中心、候选wing、成本后盈利区未建立；旧7670负节点大多到期。 |
| alternative_range／defined_risk_iron_condor | broad_bounded_range／not_established | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；required／fail | unavailable／external_required／not_established | not_screenable：7675–7700为观察区，不自动支持卖区间；负PM和候选wing缺失。 |
| directional_alternative／broken_wing_butterfly | directional_continuation／not_established | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；required／fail | unavailable／external_required／not_established | not_screenable：缺收敛终点、非对称尾部/wing与MTM验证。 |
| alternative_vol／straddle_strangle | two_sided_expansion／not_established | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；required／fail | unavailable／external_required／not_established | not_screenable：无已识别幅度足以覆盖双边premium的证据；缺candidateIV和MTM。 |
| alternative_term／calendar_diagonal | term_or_vol_relative_value／not_established | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；required／fail | unavailable／external_required／not_established | not_applicable：近端凸起不证明term convergence；缺跨期限退出估值和持仓thesis。 |
| directional_alternative／long_option | directional_continuation／conditional | Oct1/Oct2target1/2DTE;Sep30tactical0;noSaturdayexpiry；background_only／not_applicable | pending_live_repricing／external_required／not_established | conditional：实时与价差比较成本、尾部、theta和退出价值；不增加第三卡。 |

五类payoff均已筛选；iron fly与condor独立记录。缺少原生complex NBBO没有被当作结构不适配原因；本期未选择range的原因是中心、candidate wing和成本后情景盈利区未建立。

### Local Candidate Comparison

| Candidate rule / historical grid | Profit-zone / term / skew fit | Scenario edge / Greeks / cost / liquidity | Portability / result |
| --- | --- | --- | --- |
| Put：3期×long767/768/769×width3/5＝18 | 方向中心包含not_applicable；10/1、10/2默认，9/30战术 | 路径MTM、净Delta/Gamma/Vega/Theta、完整费用和退出流动性均live重比 | none；deferred_to_t1；winner=null |
| Call：3期×long769/770/771×width3/5＝18 | 同上；向上short封顶收益，不能绕过首节点估值 | 先通过quote、budget、IV和四情景门禁再比较；不凭最便宜排序 | none；deferred_to_t1；winner=null |
| Iron fly：3期×center766/767/768×翼(3,3)/(5,5)/(3,5)/(5,3)＝36 | 包含测试required且pending；两侧tail独立封顶；wing缺失 | 比较对称/非对称、中心误差、成本后双BE、MTM/Greeks及价宽；本期不选卡 | none；deferred_to_t1；结构仍not_screenable |
| Iron condor：同3期/3中心，short put=center−1、short call=center+1×4翼对＝36 | 独立宽区间及两尾测试；不能用fly的结果替代 | live成本后利润区需覆盖spot/forward/中心区间；无EOD赢家 | none；deferred_to_t1；结构仍not_screenable |

合计108组仅验证历史算术与候选覆盖；默认1–3个日历DTE实际只有10/1(1)、10/2(2)，10/3周六无到期，10/5为5 DTE且不自动进入默认窗口。目标日先re-center/re-strike并重建邻近strike与至少两组宽度，比较保守净目标MTM、反向和失效损失、theta/vega、费用与流动性。报价价宽、tick或费用敏感区间内的差异保持indeterminate_within_quote_uncertainty，不能推动Plan Grade或选出live赢家。

### Base Candidate Template — 下侧延续

**F_PUT｜Base Case｜directional_continuation｜put debit vertical｜conditional｜B。** 适用于事件后弱结构延续；O_DOWN/O_GAP_DOWN/O_SIGN_DOWN及全部共同门禁通过且O_RECLAIM不存在，才评估。7675下两根完整5m接受；若开盘/reset首价已在下方，先回测7675再计数。第一复核7650，重新估值后才看7625；初次评估时SPX≤7650或实际XSP≤所选short则取消。收复7675的1+1bar、独立负层消失或风险上限先触发则退出。

Live long取经核实的7675映射附近listed strike及相邻±1，short向下3/5点、ratio1:1；比较10/1、10/2，9/30仅战术对照。EOD固定腿none，live_selected_legs与最大可付debit均pending；价格上限使用本节d_live。当前7675目标层负、10/16正，仍须新图确认。结构通过不保证足够目标净价值。

### Risk-Path Contingency — 上侧修复

**F_CALL｜Risk Case｜directional_continuation｜call debit vertical｜conditional｜B。** O_UP/O_GAP_UP/O_SIGN_UP及共同门禁通过且O_REJECT不存在才评估：7700上两根完整bar接受，独立PM/耐久层转非负，局部和新0DTE为正。第一复核7725，重新估值后才看7750；已越7725或实际XSP≥所选short不追。拒绝7700的1+1bar或修复失效则退出，风险限额可更早触发。

Live long取7700经核实映射附近及相邻±1，short向上3/5点、ratio1:1；期限与Base一致。当前PM仍负，此分支需要新证据改变状态。两卡互斥，Downside与Base为同一仓位路径，不自动反手；均为candidate_template，周三RTH日内持有≤60分钟且服从更早截止。10/1只作下表算术示例，无live最优期限含义。

**唯一逐腿历史诊断。** 9/29 16:00 ET、XSP767.08的10/1合约；synthetic_only，固定腿none，EOD-price=diagnostics_only，binding=false。以下客户debit为历史参考，不是9/30 expected fill或binding limit。

| Family / 全部illustrative legs | 组合bid/mid/ask / 点 | 含成本到期payoff诊断 | 历史净vendor Greeks / 映射 |
| --- | --- | --- | --- |
| F_PUT；buy 1×XSP261001P00768000（put K=768；bid/mid/ask=3.060/3.110/3.160；IV=12.130%）；sell 1×XSP261001P00763000（put K=763；bid/mid/ask=1.390/1.405/1.420；IV=13.650%） | 1.640/1.705/1.770 | N=1 unit_payoff_example、历史ask；C=$6: ML=$183, 净MP=$317, BE=766.170；C=$16: ML=$193, 净MP=$307, BE=766.070 | delta=-0.2526, gamma=+0.0134, vega=+0.0311, theta=+0.0000；long相对理论触发映射取整差+0.500点 |
| F_CALL；buy 1×XSP261001C00770000（call K=770；bid/mid/ask=1.960/1.980/2.000；IV=13.950%）；sell 1×XSP261001C00775000（call K=775；bid/mid/ask=0.580/0.600/0.620；IV=13.280%） | 1.340/1.380/1.420 | N=1 unit_payoff_example、历史ask；C=$6: ML=$148, 净MP=$352, BE=771.480；C=$16: ML=$158, 净MP=$342, BE=771.580 | delta=+0.2121, gamma=+0.0161, vega=+0.0788, theta=-0.3162；long相对理论触发映射取整差+0.000点 |

两卡共用payoff合同：put到期净利润区XSP<K_long−d−C_N/(100N)，call为XSP>K_long+d+C_N/(100N)；完整组合尾损=max_loss，最大净利润与BE见公式及单次诊断表。到期公式不是日内退出估值；盘中stop成交不保证损失上界。方向中心包含测试not_applicable，路径MTM必需。示例两卡净Gamma/Vega为正，put的vendor净Theta恰为0、call为负；零值是两腿报告数值相减，不能称为无时间损耗，live值和单位须重新核实。

**每卡的IV、价值与失败条件。** 两卡EOD IV均background_only，10/1/10/2有ATM但缺正式wing；目标日选定期限自己的ATM、25Δ、long/short-wing IV和Greeks必须刷新。短腿降低premium同时封顶收益，是否优于同方向单腿须在相同路径、时间和费用下比较净清算MTM。两卡均pricing_assessment=pending_live_repricing、edge_evidence_status=not_established；方向正确仍可能因路径太慢、IV crush、wing变化、theta、正节点缓冲、费用或流动性亏损。缺任一门禁、出现reset、已越首节点或无足够时间则入场前取消；入场后按失效/风险/time stop处理。

### Live Quote / Limit Protocol and Alternatives

目标日先按实时spot/独立forward、expiry、ATM/25Δ/wing和局部比较重选腿，优先native combination mid附近的原子net-limit；只有synthetic时须同步全腿并核实broker能力，不拆腿。quote≤30秒、bid≤ask，正mid spread/mid≤25%；非正或近零mid用预冻结绝对tick宽度/成本容差。按broker tick逐步调整，debit不超过d_live；不得假设各腿屏幕价可同时成交。缺公开native NBBO本身不自动否决，但未经证实原子能力不放行。

实际N、L、H、C_N、四情景清算值及live cap均pending；须在t0前冻结数值mapping/parity/时差/节点容差、buffer及估值方法。每setup≤300美元、全天L+H+新增最大风险≤500美元，最多1 active、1次reentry，两次thesis failure停止。无第三张Alternative完整卡；未选择家族只保留筛选结果。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

盘前数据全部公布并开盘重置后，7675下两根完整5m接受，局部/新0DTE为负、全PM与剔目标层为负且不改善，才评估put debit vertical；先7650，再7625。 绑定F_PUT；收复7675的1+1bar或独立负层失效取消，风险上限优先。没有目标到达概率。

### Risk Case

7700上接受并独立修复：全PM非负且不恶化、剔目标层非负、局部/新0DTE为正，才评估call debit vertical；先7725，再7750。 绑定F_CALL，与Base互斥；拒绝7700的1+1bar或独立修复消失失效。当前并未观察到该修复。

### Scenario Valuation — 四情景闭合

| Branch | Scenario | 价格情景假设 | 时间假设 | 估值状态 |
| --- | --- | --- | --- | --- |
| Base put | target | XSP比例参考765.0／SPX7650 | 30min after actual entry | pending；netPnL=null；probability=null |
| Base put | adverse | XSP比例参考770.0／SPX7700 | 15–30min after entry | pending；netPnL=null；probability=null |
| Base put | invalidation | XSP比例参考767.5／SPX7675 | Actual reclaim/rejection timestamp | pending；netPnL=null；probability=null |
| Base put | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；netPnL=null；probability=null |
| Risk call | target | XSP比例参考772.5／SPX7725 | 30min after actual entry | pending；netPnL=null；probability=null |
| Risk call | adverse | XSP比例参考767.5／SPX7675 | 15–30min after entry | pending；netPnL=null；probability=null |
| Risk call | invalidation | XSP比例参考770.0／SPX7700 | Actual reclaim/rejection timestamp | pending；netPnL=null；probability=null |
| Risk call | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；netPnL=null；probability=null |

价格栏为SPX路径除以10的研究参考，实际XSP映射及forward必须重算。Target以实际入场后30分钟为基准，并做15/60分钟敏感性；候选ATM不变或±2vp，加不利wing斜率/曲率变化。必须记录模型版本、实际估值与退出时间、spot/独立forward、利率、同expiry IV/Greeks、N、debit、退出清算折价和全部费用。Target保守清算值须覆盖debit+成本+b；adverse/invalidation损失须在预算内。八行均为待补实时估值，无概率赋值，不用10/1到期intrinsic代替9/30日内MTM，不宣称正EV。

### No-Trade Case

**目标日执行取消：** 实际盘前发布未齐或reset未完成；完整bar、回测或独立signed层未确认；live价格/地图/IV/MTM/broker能力未核实；数值容差、buffer或风险账本未冻结；报价、carry、mapping失配；成本后目标值不足；初次评估已越首节点/short；剩余窗口<30分钟；预算耗尽、两次失败或再入场次数用尽；需要拆腿或未经授权跨夜。7675–7700内本期只观察，新的range研究须另过自身门禁。重置后清空计数与候选排名，全部必需条件重新通过才重评。

**盘后无合格计划：** core hard failure、所有路径及失效无法定义、全部封顶风险family或live复筛协议失败才可能为C。本期能定义两条条件路径；正常未来pending、none portability或缺公开complex NBBO均不能单独构成EOD No Qualified Plan。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

1. **7675/7700的完整bar、回测与首节点距离。** 决定条件路径是否激活；7650/7725需先重估，超越则取消初次入场。
2. **9/30新PM0DTE、全PM、剔目标层及局部图。** 检验PM是否延续弱势或修复；7670旧T0剔除，7675耐久正值须保留为反证。
3. **盘前ADP、GDP/PCE实际发布与盘中冲击。** 决定reset何时完成；改变候选IV、地图或期限排序须重新冻结。
4. **候选自身ATM/25Δ/wing/Greeks与VIX。** 改变清算估值和vol-shock状态，远期smile不能补候选缺口。
5. **净清算MTM、价宽、费用、剩余风险与时间。** 决定执行状态和live限价；方向观点不能覆盖数值失败。


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
