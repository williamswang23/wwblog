+++
title = "SPX期权持仓与Greeks结构分析-260928"
date = "2026-09-29"
data_as_of = ["2026-09-25", "2026-09-28"]
data_as_of_note = "T-1为9月25日，主快照为9月28日；9月29日仅为条件计划目标日。"
draft = false
description = "分析9月28日SPX期权存续PM转负、近端IV变化与9月29日事件后的条件观察计划。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "d30f3515506ae6cfe19b9223e95ddc5d4b81db249f58bc1ec7b90290aa64cd7c"
+++

# SPX期权持仓与Greeks结构分析-260928

## 1. 结论

9月28日存续PM signed GEX由正转负，SPX跌回7700下方且前端IV上升；9月29日采用**低置信度下行条件先验（downside_bias）**，7675下接受后才研究put价差，7700上接受并出现结构修复才研究call价差。计划 **B / Conditional Next-Day Plan**，执行状态 **requires_external_live_source**；最快在10:00数据公布、刷新并完成确认后的10:15评估。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | downside_bias，低置信度；存续PM转负、现货跌回7700下，先看7675能否被接受；负Gamma不等于必跌。 |
| Earliest evaluation | 9/29 ET最快10:15：10:00 JOLTS与信心均实际公布，10:05或之后完成刷新冻结，再确认两根完整5分钟bar；延迟、回测或冲击则顺延。 |
| Base activation | 事件后7675下方接受＋新0DTE／局部为负＋全PM和剔目标层为负且不改善，才评估put debit vertical；7650首查；收复7675或弱结构消失则失效。 |
| Downside branch | 与Base共用同一put分支，不叠加仓位；7650后须重估才看7625。7675目标层目前为正，必须用新图核实其转弱。 |
| Upside branch | 7700上方接受＋新0DTE／局部为正＋全PM非负且不恶化、剔目标层非负，才评估call debit vertical；首查7725，再7750；拒绝7700或修复失效则取消。 |
| Otherwise | 7675–7700内或任一门禁未通过时观察／No Trade；不追首节点或short以外行情；两卡互斥，正常15:00后不新入、15:30或更早限制前退出。 |

Plan Grade B；Plan Status Conditional Next-Day Plan；Execution Status requires_external_live_source；planning_only=true。Base是尚未激活的条件模板，最终交易由人根据实时证据决定。

## 3. Executive Summary

- **原区间缓冲依据减弱。** 共同30个到期日的signed GEX由+31.775B转至-13.729B，PM转负，AM正值收缩；B为十亿美元／SPX变动1%，不是实际买卖流量。
- **到期剔除后仍负，但负值大幅收缩。** 9/28到期层signed为-30.653B；7685大负节点主要属于该层，不能全量沿用。7675目标层正、耐久层负，是下行路径必须面对的反证。
- **近端风险重新变贵。** 9/29、9/30同到期ATM分别上升3.901、4.928个波动率点；9/30凸点与GDP／PCE时间相容，但不构成独立的事件方差估计。
- **下侧优先看条件，不追方向。** Base为7675下接受后的put debit vertical，先7650再7625；反向Risk需7700上接受并修复独立signed层，先7725再7750。
- **事件后重新选腿。** 比较9/30、10/1、10/2的1／2／3个目标日历DTE，9/29仅0DTE战术对照；144个盘后局部组合没有live赢家。候选翼部与四情景MTM仍需补齐。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/25 | T：9/28 | Change / basis | T+1 relevance |
| --- | --- | --- | --- | --- |
| 官方SPX；结构raw代理 | 7743.41；7743.50 | 7683.69；7684.07 | 官方−0.7712%；raw−0.7675% | 收于旧7700下，不能据此证明盘中完整触发 |
| 共同30期gross／signed | 233.015／+31.775 | 241.525／-13.729 | gross+3.652%；signed-45.504B | 相同expiration>9/28；gross增加而signed转负 |
| 共同PM／AM signed | +26.424／+5.351 | -14.960／+1.231 | 十亿美元／1% | PM主导恶化，AM仍为正 |
| 共同耐久节点7650／7700 | -15.399／-13.347 | -27.618／-28.598 | 百万美元／点；9/30＋10/16 | 两处负值均加深；不是保证支撑 |
| fixed3D／7D ATM | 8.084%／11.529% | 14.478%／12.143% | +6.395／+0.614vp | 3D源9/28→10/1，含构成变化 |
| 结构／Base／计划／报价 | range_bias／none／B／low | downside_bias／条件put／B／none | 同v1.8；非methodology_restatement | 本期入场安排在相关hard_reset之后 |

## 5. T 日盘面、字段时点与 Event-Risk Overlay

**新闻背景。** 以下日期级一手事实的精确网页可得时点未归档，availability_unverified／background_only；不据此解释当日价格变化，也不把预计发布时间当成实际可得时间。

1. 9月28日公布的9月得州制造业生产指数升至29.5，一般商业活动指数由11.6降至9.8；原材料价格指数升至52.2。 产出扩张与成本压力同时存在，为增长和利率路径提供背景。 区域扩散指数不代表全国增速；未核对市场预期，不能称为意外，也不能据此解释SPX当天下跌。 网页精确可得时点未归档，仅日期级背景。 [Dallas Fed](https://www.dallasfed.org/research/surveys/tmos/2026/2609)。

2. Cook在9月28日讲话中认为，AI投资的价格压力正向更广范围扩散，生产率带来的温和通缩效应未必赶得上今年余下时间的通胀压力。 政策官员的条件判断强化利率与通胀事件的关注必要性。 这是Cook的判断，不是已实现的通胀结果或本报告的因果识别；不据此预测下一次政策行动。 网页精确可得时点未归档，仅日期级背景。 [Federal Reserve](https://www.federalreserve.gov/newsevents/speech/cook20260928a.htm)。

| 未来三个RTH／ET | 已核日历安排 | 本计划中的作用 |
| --- | --- | --- |
| 9/29 10:00；10:30；11:00；12:40；15:00 | JOLTS及消费者信心；Dallas零售；Bowman预录开场；Barr经济展望；Waller支付 | 10:00为hard_reset；其余monitoring_only，实质政策／利率／波动冲击升级reset |
| 9/30 08:15；08:30；10:00；10:30；15:25 | ADP；GDP第三次估计及个人收入／PCE；公司债困境指数；Dallas能源；Cook农村经济 | 在周二日内退出之后；影响剩余期限估值，尤其9/30凸点 |
| 10/1 08:30；10:00；11:30；13:30；15:00；15:30 | 初请；ISM制造业／建筑支出／MCT及Waller经济数据；WEI；Jefferson经济与政策；Bowman监管；Cook全球央行 | 同为期限背景；10/2就业08:30在三日窗口之外，仍属于10/2合约的后续风险 |

来源：[纽约联储9月](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[10月](https://www.newyorkfed.org/research/calendars/i-oct26.html)、[美联储9月](https://www.federalreserve.gov/newsevents/2026-september.htm)、[10月](https://www.federalreserve.gov/newsevents/2026-october.htm)。三日按正常RTH处理，须现场复核日历更新与broker限制。10:00的就业／需求信息可能改变利率、spot和短期IV；结合当前负PM和近端升波，本报告选择事件后评估。这是**未校准的执行假设**，不代表事件必有大幅行情；其他常规日历不自动升级为hard_reset。精确日历版本未归档，不含未来公布结果。包内event_light仅描述OpEx距离。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 存续PM由正转负，原区间缓冲依据减弱

**Claim：** 存续PM由正转负，原区间缓冲依据减弱。

**Evidence：** 共同30期gross233.015→241.525B（+3.652%）；signed+31.775→-13.729B；PM+26.424→-14.960B，AM+5.351→+1.231B。

**Mechanism／assumptions：** 相同expiration集合排除到期进出，但不分离spot、IV、aging和OI；signed是call-minus-put约定，不是真实dealer净仓。

**T+1 Implication：** 从range转为有条件下行先验；负Gamma不能独立预测方向。 **Falsifier：** 目标日PM修复为正或现货回收7700并被接受。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 2 — 剔除7685旧负节点后，7675仍需现场确认

**Claim：** 剔除7685旧负节点后，7675仍需现场确认。

**Evidence：** 7685全selected signed-212.432M/点，其中T0-205.413M；7675目标层+4.032M、耐久层-2.386M；7650/7700耐久层-27.618/-28.598M。

**Mechanism／assumptions：** 旧T0负暴露已消退；7675正目标层可能缓冲下穿，7650负节点不是保证支撑。

**T+1 Implication：** 7675下接受后先复核7650；上收7700后先复核7725，正缓冲更集中在7750。 **Falsifier：** 新0DTE/局部符号与路径不一致，或首节点已被越过。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 3 — 同到期近端升波与9/30凸点同时存在

**Claim：** 同到期近端升波与9/30凸点同时存在。

**Evidence：** 9/29 ATM9.981%→13.882%（+3.901vp）；9/30为11.966%→16.893%（+4.928vp）；fixed3D+6.395vp，7/14/30/45D分别+0.614/+0.722/+1.108/+0.631vp。

**Mechanism／assumptions：** 同到期包含76h01m17s老化；fixed3D从9/28移到10/1。9/30PCE/GDP与凸点相容，但不能单独识别事件方差。

**T+1 Implication：** 比较9/30、10/1、10/2的实际成本与日内退出估值；升波不自动产生买方edge。 **Falsifier：** 事件后IV回落或目标净清算价值不足以覆盖debit、费用和buffer。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 4 — 跌价、升波和利率上行共现，不能直接化为对冲流

**Claim：** 跌价、升波和利率上行共现，不能直接化为对冲流。

**Evidence：** 官方7743.41→7683.69（-0.7712%）；VIX14.87→16.07；2Y/10Y+11/+7bp。共同DEX+350.823→+142.818B；PM Vanna-1.346→+0.274B。

**Mechanism／assumptions：** 这些是日度共变及模型有限差分；本期CharmMon→Tue只推进1天，前期Fri→Mon推进3天，不可当作可比资金流。

**T+1 Implication：** 保持低置信度，JOLTS/信心之后重置价格、IV与地图；实际冲击升级reset。 **Falsifier：** 价格修复且PM/new0DTE不再支持下行。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

### Thesis 5 — 曲面质量有所修复，事件后交易仍需完整重筛

**Claim：** 曲面质量有所修复，事件后交易仍需完整重筛。

**Evidence：** 单调性0.612903→0.700000；legacy0.451613→0.300000，仍失败；凸性与非负密度均0.900000已达阈值。正式smile仅10/5、10/12、10/28，0–3DTE候选wing缺失。

**Mechanism／assumptions：** EOD方向路径可作为条件模板；候选实时IV与四种退出情景不可缺。10:00被设为硬重置是报告假设，非已校准事件波幅。

**T+1 Implication：** B级条件计划；Base put与Risk call互斥，EOD报价none、诊断腿不参与限价。 **Falsifier：** 事件后无合格能力、报价、候选MTM或真实剩余预算，则不进入人工评估。 **Confidence：low**；evidence_basis=mechanism_based，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。

## 7. Conflicting Evidence, Confidence and What Changes the View

| 冲突 | 当前处理 | 改变判断的条件 |
| --- | --- | --- |
| PM转负，但AM仍正且7675目标层正 | 下侧机制优先，必须等7675接受与新负层；不直接追空 | 7675持续守住、新0DTE转正，或7700上接受并修复全层 |
| 7685负节点很大，但主要来自已到期T0 | 剔除后以存续节点和新目标日图评估 | 新地图重新形成不同关键位或节点超容差迁移 |
| ATM与skew升高，但曲面质量仍受限 | 承认局部重定价，拒绝把贵波动自动视为买方或卖方优势 | 事件后候选自身IV及MTM通过，或成本使路径无净价值 |
| 负Gamma既可放大下跌，也可放大上涨 | 方向排序来自价格、PM与节点合并证据；上行保留独立修复分支 | 7700上接受且局部、新0DTE、全PM和耐久层达门禁 |

path_asymmetry_status=directional，结构置信度low。下侧优先是待检验的路径假设，不是涨跌概率；任何新事件、节点或定价证据都可使排序失效。计划B与盘中是否允许人工评估分开，实时门禁失败不自动构成盘后C。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry／role | Source expiry／τ／weight | T ATM IV | Δ(T−T−1)／basis | Method／support／quality |
| --- | --- | --- | --- | --- |
| 09/29／目标0DTE | τ4.000→0.832天 | 13.882% | +3.901vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.983；partial |
| 09/30／目标1DTE候选／GDP、PCE及EOM | τ5.000→1.832天 | 16.893% | +4.928vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.986；partial |
| 10/01／目标2DTE候选／当前3D源 | τ6.000→2.832天 | 14.478% | +3.494vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.987；partial |
| 10/02／目标3DTE候选／就业、前7D源 | τ7.000→3.832天 | 14.666% | +3.137vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.989；partial |
| 10/05／当前7D源及smile | τ10.000→6.832天 | 12.143% | +1.672vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.990；partial |
| 10/09／前14D源 | τ14.000→10.832天 | 12.475% | +1.424vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.989；partial |
| 10/12／当前14D源及smile | τ17.000→13.832天 | 11.773% | +1.120vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.989；partial |
| 10/16／最大gross到期的PM部分 | τ21.000→17.832天 | 12.647% | +1.081vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.991；partial |
| 10/23／前30D下端 | τ28.000→24.832天 | 12.642% | +0.866vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.992；partial |
| 10/26／前30D上端与smile | τ31.000→27.832天 | 12.383% | +0.779vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.988；partial |
| 10/28／当前30D源及smile | τ33.000→29.832天 | 12.766% | +0.745vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.988；partial |
| 11/06／45D下端，含DST | τ42.042→38.874天 | 13.471% | +0.628vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.984；partial |
| 11/13／45D上端 | τ49.042→45.874天 | 13.544% | +0.566vp；same_expiry_atm | 同expiry／PM；k0局部总方差插值；观测包围；confidence=0.989；partial |
| fixed3D | P:09/28–09/28；τ3.000–3.000天；w=0.000000；observed → T:10/01–10/01；τ2.832–2.832天；w=0.000000；observed | 14.478% | +6.395vp；fixed_tenor_atm | 原生observed容差／有效bracket总方差插值；no_extrapolation=true；partial |
| fixed7D | P:10/02–10/02；τ7.000–7.000天；w=0.000000；observed → T:10/05–10/05；τ6.832–6.832天；w=0.000000；observed | 12.143% | +0.614vp；fixed_tenor_atm | 原生observed容差／有效bracket总方差插值；no_extrapolation=true；partial |
| fixed14D | P:10/09–10/09；τ14.000–14.000天；w=0.000000；observed → T:10/12–10/12；τ13.832–13.832天；w=0.000000；observed | 11.773% | +0.722vp；fixed_tenor_atm | 原生observed容差／有效bracket总方差插值；no_extrapolation=true；partial |
| fixed30D | P:10/23–10/26；τ28.000–31.000天；w=0.666667；interpolated → T:10/28–10/28；τ29.832–29.832天；w=0.000000；observed | 12.766% | +1.108vp；fixed_tenor_atm | 原生observed容差／有效bracket总方差插值；no_extrapolation=true；partial |
| fixed45D | P:11/06–11/13；τ42.042–49.042天；w=0.422619；interpolated → T:11/06–11/13；τ38.874–45.874天；w=0.875127；interpolated | 13.536% | +0.631vp；fixed_tenor_atm | 原生observed容差／有效bracket总方差插值；no_extrapolation=true；partial |
| rolling约7D ATM | 10/02(τ7.000)→10/05(τ6.832) | 12.143% | +0.614vp；rolling_tenor_atm | selected槽位变化，含expiry构成与aging；非原生fixed-tenor smile |
| rolling约14D ATM | 10/09(τ14.000)→10/12(τ13.832) | 11.773% | +0.722vp；rolling_tenor_atm | selected槽位变化，含expiry构成与aging；非原生fixed-tenor smile |
| rolling约30D ATM | 10/26(τ31.000)→10/28(τ29.832) | 12.766% | +1.162vp；rolling_tenor_atm | selected槽位变化，含expiry构成与aging；非原生fixed-tenor smile |

全部30个共同exact-expiry ATM都有兼容节点，均上升；表中列出目标、事件、候选与插值关键期限。same_expiry_atm保留同合约可比性，包含roll-down与repricing；fixed_tenor_atm提供期限受控视角，仍须审视来源变化；rolling_tenor_atm显式包含样本构成。9/28已到期层不进入正τ期限曲线，9/29仍有0.832442天τ但在目标日变为0DTE。

估值间隔76h01m17s。3D源9/28(tau3)→10/1(tau2.832442)，7D10/2(tau7)→10/5(tau6.832442)，14D10/9(tau14)→10/12(tau13.832442)，均原生observed容差±.25天，不重建精确期限；30D由10/23–10/26(tau28–31,w.666667)插值转为10/28(tau29.832442)observed；45D仍11/6–11/13，tau42.041667–49.041667→38.874109–45.874109，w.422619→.875127，含DST。

**形态与事件。** 前端9/30凸起，7–14D下降、远端重新抬升，整体mixed；全部30个共同到期ATM上升，但含老化与重新定价。 fixed3D−30D=+1.713vp，7D−30D=-0.622vp，14D−30D=-0.993vp，45D−30D=+0.770vp。9/30ATM16.893%高于9/29的13.882%与10/1的14.478%；10/2为14.666%，10/5为12.143%。日历事件、短剩余期限、周末与曲面误差均可贡献，不从凸点拆出未经识别的事件方差。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry／row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew25Δ | BF25 | Method／comparison／quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T:10/05／约7D | 16.112% | 13.773% | 12.143% | 11.093% | 10.801% | 2.680vp | 0.290vp | 观测支持内forward-delta插值；confidence0.947–0.990；partial |
| Δ:10/02(τ7.000)→10/05(τ6.832) | +1.526vp | +1.003vp | +0.614vp | +0.143vp | -0.045vp | +0.860vp | -0.042vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；materiality=indeterminate_within_uncertainty |
| T:10/12／约14D | 16.252% | 13.712% | 11.773% | 10.646% | 10.234% | 3.066vp | 0.406vp | 观测支持内forward-delta插值；confidence0.944–0.989；partial |
| Δ:10/09(τ14.000)→10/12(τ13.832) | +1.222vp | +1.072vp | +0.722vp | +0.312vp | -0.012vp | +0.760vp | -0.030vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；materiality=indeterminate_within_uncertainty |
| T:10/28／约30D | 18.982% | 15.250% | 12.766% | 11.374% | 10.986% | 3.875vp | 0.546vp | 观测支持内forward-delta插值；confidence0.927–0.988；partial |
| Δ:10/26(τ31.000)→10/28(τ29.832) | +1.776vp | +1.524vp | +1.162vp | +0.817vp | +0.592vp | +0.707vp | +0.009vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；materiality=indeterminate_within_uncertainty |

**Level → slope → curvature。** 三槽ATM及25D skew均上升；10Δ call在7/14D槽轻微下降，非全曲线平移。BF数值变化−.042/−.030/+.009vp，缺显著性校准，curvature保留uncertainty。 ATM level上行、25Δ skew变陡是算术观察，dominant_axis=mixed；curvature=unchanged_within_uncertainty不表示精确零变化。Skew25=IV25put−IV25call是fixed-delta斜率代理，不是统计分布偏度；BF25=(IV25put+IV25call)/2−ATM。采用forward_delta_non_premium_adjusted及观测支持内线性delta插值。

Wing premium=wing−ATM；7D put-wing=1.630vp（Δ+0.388），call-wing=-1.050vp（Δ-0.471）；14D put-wing=1.939vp（Δ+0.350），call-wing=-1.127vp（Δ-0.410）；30D put-wing=2.484vp（Δ+0.362），call-wing=-1.391vp（Δ-0.344）。

Skew期限梯度14D−7D由+0.486至+0.386vp，30D−14D由+0.862至+0.809vp。7D10/2→10/5；14D10/9→10/12；30D10/26→10/28，全部rolling_tenor_slot_fixed_delta，不是same-expiry或原生fixed-tenor smile。 packet没有原生fixed-tenor delta-smile，不能声称fixed_tenor_fixed_delta变化；T+1 smile仍pending。

**策略传导。** 目标1/2/3calendarDTE为9/30、10/1、10/2；9/29为0DTE战术比较。9/30仅卡片算术示例，周二日内退出；不能由期限凸点直接选出最佳到期。 9/29、9/30、10/1、10/2均有正式ATM，均无selected smile。方向family的EOD IV仅background_only，planning gate=not_applicable；目标日自身ATM／25Δ／翼部／Greeks与MTM仍必需。Fly／condor／BWB／双侧扩张缺候选wing而required gate=fail，calendar还缺跨期估值与收敛依据。RV5/10/20=7.8182%/11.5253%/10.8278%；formal30D12.7657%较RV20高1.9379vp；不同窗口，不是已识别VRP；上游D30 bucket不替代Formal30D。

## 9. Key Expiry / Strike / Dealer Node

下表GEX单位为**十亿美元／SPX变动1%**：gross=call+put规模，signed=call−put模型代理。Canonical COMBINED只计一次，AM／PM拆分不重复相加到总表；真实dealer仓位不可见。

| Expiry／family | Role | T→目标calendar DTE | Gross GEX | Signed GEX | Vendor OI |
| --- | --- | --- | --- | --- | --- |
| 09/28／COMBINED | 已到期，前瞻剔除 | 0→-1 | +37.689 | -30.653 | 391,638 |
| 09/29／COMBINED | 目标0DTE，需新图 | 1→0 | +16.468 | -4.307 | 144,356 |
| 09/30／COMBINED | 目标1DTE候选／EOM | 2→1 | +42.735 | -5.504 | 1,073,950 |
| 10/01／COMBINED | 目标2DTE候选 | 3→2 | +8.616 | -0.134 | 108,571 |
| 10/02／COMBINED | 目标3DTE候选 | 4→3 | +21.946 | -3.170 | 492,168 |
| 10/16／COMBINED | 全链及存续最大gross | 18→17 | +66.894 | +1.709 | 2,721,767 |
| 10/16／SPX | AM拆分 | 18→17 | +58.960 | +1.497 | 2,375,453 |
| 10/16／SPXW | PM拆分 | 18→17 | +7.935 | +0.212 | 346,314 |

全链gross279.213B、signed-44.382B。9/28层占gross13.50%，移除后存续gross241.525B／signed-13.729B；再剔目标9/29为225.056B／-9.422B。10/16占全链gross23.96%、存续27.70%；9/29占存续6.82%。最大gross到期与最强负signed来源是不同概念。

各自剔T0的signed P+36.168→T-13.729B，集合不同。固定共同30期为+31.775→-13.729B；固定目标日仍正DTE的29期为+28.782→-9.422B。没有新增expiry贡献；移除已到期9/28仍不能消除共同集合的恶化。

**节点尺度。** 原gamma table为1%尺度，下表转换signed_gex_point=gex_dealer/(0.01×7684.07)，单位**百万美元／SPX点**。本期selected为9/28、9/29、9/30、10/16；前瞻移除9/28，耐久selected为9/30＋10/16。前期没有9/29 strike层，目标层不硬做跨日差；共同耐久层可比。无完整spot-gamma曲线，不宣称gamma flip。

| SPX／XSP参考 | 作用 | 9/28到期层 | 目标9/29层 | 更久selected | 全部存续selected |
| --- | --- | --- | --- | --- | --- |
| 7600／760 | 更远负节点 | -0.788 | -9.838 | -31.130 | -40.968 |
| 7625／762.5 | 下侧第二复核 | -0.589 | -2.553 | -8.010 | -10.563 |
| 7650／765 | 下侧首复核，负节点非支撑 | -2.553 | -8.054 | -27.618 | -35.671 |
| 7675／767.5 | 下侧确认；目标正/耐久负冲突 | -18.847 | +4.032 | -2.386 | +1.646 |
| 7685／768.5 | 旧T0大负节点剔除后再看 | -205.413 | -5.078 | -1.940 | -7.019 |
| 7690／769 | 局部负节点 | -35.638 | -2.938 | -1.616 | -4.554 |
| 7700／770 | 上侧修复确认 | -29.035 | -9.395 | -28.598 | -37.994 |
| 7725／772.5 | 上侧首复核，目标正/耐久负 | -3.701 | +3.114 | -3.686 | -0.572 |
| 7750／775 | 上侧第二复核，正节点 | -1.703 | +2.182 | +19.702 | +21.884 |
| 7775／777.5 | 更远正节点 | +0.457 | +0.485 | +3.873 | +4.359 |
| 7800／780 | 更远正节点 | -0.621 | +1.078 | +34.863 | +35.941 |

selected存续gross覆盖52.21%，剔目标后覆盖48.71%。7685全selected signed=-212.432M/点，剔T0后仅-7.019M/点。7675存续合计为正、耐久为负；7650负节点是风险复核位而非止跌保证。7725也呈目标正／耐久负，7750耐久层才为较清晰的正节点，不能跳过7725直接用终端满额payoff。

**其余Greeks。** DEX：共同+350.823→+142.818B；状态非流量；VANNA：共同+0.615→+1.724B；sigma±.005的DEX差，非已实现flow；CHARM：共同+6.268→+2.254B；前期Fri→Mon3天，本期Mon→Tue1天；不是流量变化；VEX：全链1.817161B=sum(vendor_vega*100*OI); vendor单位未独立核实；VOLGA：存续12.425277B；BSvega对小数波动率、sigma±.005有限差分，未额外乘.01，不能与vendorVEX直接比。Vanna／Volga用σ±0.005有限差分；Charm保持spot、IV、OI等条件比较下一交易模型参考状态。本期Mon→Tue、前期Fri→Mon步长不同。ACT/365、PM16:00／AM17:00是模型参考时钟，AM17:00不是官方结算时间；T0高阶null不当零风险。上述状态变化不能证明净开仓、真实dealer流量或次日必然买卖。

## 10. T+1 Decision Map, Structural View and Plan Grade

**downside_bias／low；B / Conditional Next-Day Plan；requires_external_live_source。** Formal通过，PM恶化支持有条件下行机制；7675/7700分支、失效、封顶风险和事件后复筛规则可定义。 未评A：7675目标层正值与负PM冲突，selected覆盖有限；IVpartial、候选wing/情景估值/现场能力未齐，影响候选选择。 未评C：Base put与Risk call都能定义有限风险、取消和完整重筛；post-event报价none或未来数据pending不自动构成C。

| State | 确认与行动 | 取消／重置 |
| --- | --- | --- |
| 10:00前及7675–7700内部 | 观察并准备事件后输入；不建立新仓，观察带不自动成为卖区间方案 | 实际冲击或节点迁移 |
| 10:00数据后 | 两项实际发布均核实，>=10:05刷新冻结，再完整确认；延迟顺延 | reset未完成或数据能力缺失 |
| 其他讲话／发布后 | 监测实际价格、利率、IV与流动性；重大冲击升级reset | 未消化冲击 |
| 跳空越过7675／7700 | 先回测原边界，再重新确认两根完整bar及独立signed层 | 已越7650／7725或所选short则不追 |
| 7675下接受 | Base put：负局部／新0DTE、负PM和负耐久层不改善；先7650 | 收复7675、独立弱结构消失或价值门禁失败 |
| 7700上接受 | Risk call：局部／新0DTE为正，PM及耐久转非负；先7725 | 拒绝7700、独立修复失效或价值门禁失败 |
| 区间重确认 | 3根完整bar及新的wing、center和净利润区证据，只允许重新筛选range family | 任何边界、中心或利润区失败 |
| 波动冲击／节点迁移 | 清空计数、排序及旧限价，刷新并重新冻结 | 新图或参数无法核验 |
| 全部门禁通过 | 仅进入eligible_for_manual_evaluation；人工决定，无自动订单 | 任何必需条件不再成立 |

### 可观察条件与实时能力

仅在9/29 RTH评估。t0是不早于事件后刷新与数值冻结完成时刻的第一个完整5分钟边界（恰好在边界前完成时可用该边界）；不使用半根bar。下列O_REJECT／O_RECLAIM是失效信号，入场必须不存在；其他关联必需条件必须通过。当前实时供应源、计算能力和broker能力均未确认，live_data_capability=external_required，没有价格突破替代signed层的fallback。

| ID／观察 | 计算与真实观察来源 | 时效 |
| --- | --- | --- |
| O_RESET／event_reset | 10:00 JOLTS与消费者信心都实际公布后刷新live状态，不早于10:05冻结；t0为不早于冻结完成时刻的第一个完整5m起点，最少两根完整bar。若数据延迟或冲击未结束则顺延；其余事件仅monitoring_only，实际重大冲击升级reset。 来源：官方讲话/直播/实际完成记录及实时数据 | ≤30秒 |
| O_CAL／calendar | 核实9/29正常RTH、各腿最后交易时刻、10:00实际发布与其余讲话/数据安排；更早broker/user限制优先。 来源：Cboe/官方日历/实际经纪商限制 | 现场核验 |
| O_CONFIG／parameter_freeze | 在t0之前固定数值mapping/parity/node/报价时差容差、b、风险账本和估值方法；null不放行，不在触发后调整制造通过。 来源：人工签认参数记录 | 现场核验 |
| O_UP／SPX_close | 连续两根完成bar的close严格>7700；从t0后重新计数，且同时满足O_SIGN_UP。 来源：实时SPX已完成5m bar | ≤30秒 |
| O_DOWN／SPX_close | 连续两根完成bar的close严格<7675；从t0后重新计数，且同时满足O_SIGN_DOWN。 来源：实时SPX已完成5m bar | ≤30秒 |
| O_REJECT／upside_invalidation | 一根5m close回到7700下方或等于7700，下一根close未重新收于7700上方，则上行失效。若7675下破或风险上限先触发，提前退出。 来源：实时SPX完成bar | ≤30秒 |
| O_RECLAIM／downside_invalidation | 一根5m close回到7675上方或等于7675，下一根close未重新收于7675下方，则下行失效。风险上限可先触发退出。 来源：实时SPX完成bar | ≤30秒 |
| O_GAP_UP／gap_retest | 若开盘或reset后首价已>7700，须先出现覆盖7700的回测bar，再从其后完整bar重计两根；首个可评估时SPX>=7725，或实时XSP已>=所选call short strike，则不追。 来源：实时SPX逐笔/完成bar | ≤30秒 |
| O_GAP_DOWN／gap_retest | 若开盘或reset后首价已<7675，须先出现覆盖7675的回测bar，再从其后完整bar重计；首个可评估时SPX<=7650，或实时XSP已<=所选put short strike，则不追。 来源：实时SPX逐笔/完成bar | ≤30秒 |
| O_SIGN_UP／signed_GEX_layers | 在两根接受bar终点：local=sum(call−put) GEX，取仍可交易SPXW_PM且strike位于闭区间[7700,7725]，按live spot换算每点；全PM汇总所有仍可交易PM到期。可交易SPXW_PM总signed>=0且不低于事件后冻结基准、剔9/29后全链signed>=0、7700–7725局部PM signed>0、9/29新PM0DTE signed>0；不以价格代替任何层。 来源：外部同口径PM/new0DTE/durable/local地图 | ≤300秒 |
| O_SIGN_DOWN／signed_GEX_layers | 两根接受bar终点，取仍可交易SPXW_PM、strike闭区间[7650,7675]的call-minus-put每点GEX<0，且9/29新PM0DTE signed<0；全PM总signed与剔9/29后的全链signed均<0且不高于事件后冻结基准。所有层独立验证，不以价格代替；本期EOD7675目标层正值须被实际新图反证。 来源：外部同口径PM/new0DTE/durable/local地图 | ≤300秒 |
| O_RANGE／range_profit_region | 连续3根完整5m close在预冻结7675–7700核心内，未越confirmation level且无shock；spot/forward和完整center uncertainty区间均落在成本后scenario盈利区间内并留正buffer。仅区间家族研究；本期range为未选替代家族，候选正式wing缺失，须重新通过family筛选才可形成range卡。 来源：实时SPX/forward/中心区间/多腿MTM | ≤30秒 |
| O_NODE／node_migration | 当前地图年龄<=300秒（本报告假设）；关键位变化不超事前数值容差，否则重建并清零。 来源：事件后冻结与当前同口径地图 | ≤300秒 |
| O_VOL／vol_shock | 若15分钟内VIX增加>=1.0点或候选ATM IV增加>=2.0vol_points，则shock；门禁要求无未完成reset的shock。 来源：实时VIX和候选expiry ATM IV | ≤30秒 |
| O_QUOTES／live_combination | Quote年龄<=30秒；bid<=ask。正mid组合spread/mid<=25%；mid<=0时用事先冻结的绝对tick宽度/成本容差判断，不做除零。每条腿流动性及数量匹配。 来源：实时native组合或同步全腿quote | ≤30秒 |
| O_MAPPING／spot_forward_parity | SPX/10与XSP、leg时差、C-P=D(F-K)残差均在预冻结数值容差内；使用独立live XSP carry/forward，不能拿EOD或任意q=0替代。 来源：实时SPX/XSP/独立carry与forward | ≤30秒 |
| O_SURFACE／candidate_surface | 选腿后取得同timestamp/scope候选ATM、put/call25D及long/short-wing IV、Greeks；partial可用节点不自动扩展为完整曲面，不借用其他到期填补。 来源：外部候选expiry ATM/25D/两腿IV及Greeks | ≤30秒 |
| O_VALUE／planned_exit_MTM | 计算target/adverse/invalidation/planned_exit四情景；实际time/spot/forward/rate/IV/wing/N/cost可追溯。保守target liquidation value必须>debit+C_N/(100N)+b，并通过risk/RR/liquidity cap。 来源：已验证live估值方法/退出流动性折价 | ≤30秒 |
| O_BROKER／atomic_net_limit | 确认支持所选全腿原子net-limit、正确ratio/expiry/multiplier；native优先，synthetic须同步保守构造；不拆腿追价。 来源：人工核实经纪商实际订单能力 | 现场核验 |
| O_RISK／risk_book | R_eff=min(300,500-L-H); ML=100*N*d+C_N; MP=100*N*(W-d)-C_N; d_risk=(R_eff-C_N)/(100*N); d_RR=W/2-C_N/(100*N)；1active，最多1次reentry；两次thesis failure或预算耗尽停止；实际N/L/H/C_N未知即不放行。 来源：实际已实现损失/持仓最大剩余风险/费用 | 现场核验 |
| O_TIME／entry_exit_window | min(entry+60min,applicable_session_exit_deadline); deadline=min(15:30 ET,earlier user/broker exit limit,min(all-leg last-trade time,target RTH close)-30min buffer); latest_entry=deadline-30min minimum viable holding; no overnight；最快10:15以10:05完成事件后冻结且两个完整bar通过为条件；发布延迟、回测或reset顺延，剩余不足30分钟取消。 来源：实际日历/各腿合约/经纪商 | 现场核验 |

最快10:15只在10:05已完成事件后冻结、两根完整bar及全部独立条件通过时成立；不是10:00后等满15分钟即放行。首次可评估时已跨过首节点、short或需要的时窗不足，取消而非追价。地图300秒、最低持有窗口30分钟及10:05最早冻结是报告假设；两根确认、报价30秒和25%等为v1.8流程默认值，均未经alpha校准。所有null容差、buffer b及实际风险输入必须在t0前填成数值并签认。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Family／scenario | Payoff archetype | IV dependency／gate | Pricing／execution | Status／下一步 |
| --- | --- | --- | --- | --- |
| put_debit_vertical／base_case | directional_continuation | background_only／not_applicable | pending_live_repricing／external_required | conditional：7675下接受且独立负层确认；7650首节点前有足够live净价值才评估。 |
| call_debit_vertical／risk_case | directional_continuation | background_only／not_applicable | pending_live_repricing／external_required | conditional：7700上接受且独立正层修复；先7725再7750，反证路径须额外结构支持。 |
| defined_risk_iron_butterfly／alternative_range | centered_stability | required／fail | unavailable／external_required | not_screenable：旧7685T0大负节点已到期，稳定中心、候选翼部和净利润区均未建立。 |
| defined_risk_iron_condor／alternative_range | broad_bounded_range | required／fail | unavailable／external_required | not_screenable：7675–7700只是不交易观察区，负PM背景不支持直接卖区间；翼部缺失。 |
| broken_wing_butterfly／directional_alternative | directional_continuation | required／fail | unavailable／external_required | not_screenable：终点收敛、非对称tail与候选wing缺失。 |
| straddle_strangle／alternative_vol | two_sided_expansion | required／fail | unavailable／external_required | not_screenable：负Gamma不证明双向实现幅度足以覆盖总premium；缺候选wing和MTM。 |
| calendar_diagonal／alternative_term | term_or_vol_relative_value | required／fail | unavailable／external_required | not_applicable：事件凸点并未建立跨期限相对价值；无跨夜持仓和收敛thesis。 |
| long_option／directional_alternative | directional_continuation | background_only／not_applicable | pending_live_repricing／external_required | conditional：与同方向价差实时比较premium、theta、尾部和退出价值，不增第三张卡。 |

### Local Candidate Comparison

| Family | 历史局部网格 | 目标日重建 |
| --- | --- | --- |
| Put vertical | 4个到期 × long767/768/769 × width3/5＝24 | 以7675经实时验证的映射为锚，比较邻近listed strike |
| Call vertical | 相同4期 × long769/770/771 × width3/5＝24 | 以7700实时映射为锚 |
| Iron butterfly | 相同4期 × center767/768/769 × wings(3,3)/(5,5)/(3,5)/(5,3)＝48 | 三个历史近spot中心仅作诊断，live重估中心和盈利区 |
| Iron condor | 相同4期和center，short put=center−1、short call=center+1 ×4翼宽＝48 | 独立检验宽区间、两尾损失与成本后利润区 |

| Expiry | 目标calendar DTE | Family | 历史合成ask／点 | 组合价宽／点 | N=1含成本ML／美元 |
| --- | --- | --- | --- | --- | --- |
| 09/29 | 0 | F_PUT | 0.870–1.670 | 0.240–0.340 | 93–183 |
| 09/29 | 0 | F_CALL | 0.780–1.690 | 0.170–0.330 | 84–185 |
| 09/30 | 1 | F_PUT | 1.020–1.840 | 0.260–0.360 | 108–200 |
| 09/30 | 1 | F_CALL | 1.070–2.030 | 0.180–0.350 | 113–219 |
| 10/01 | 2 | F_PUT | 1.120–1.980 | 0.300–0.480 | 118–214 |
| 10/01 | 2 | F_CALL | 1.220–2.240 | 0.220–0.320 | 128–240 |
| 10/02 | 3 | F_PUT | 1.160–2.020 | 0.330–0.480 | 122–218 |
| 10/02 | 3 | F_CALL | 1.340–2.410 | 0.260–0.400 | 140–257 |

144组comparison=limited、winner=null。9/30、10/1、10/2是默认1–3 DTE窗口；9/29仅0DTE战术对照，10/5为4个交易日之后且目标calendar DTE=6，不自动进入默认窗口。期限、strike和宽度差异同时改变Delta、费用与盈利区，不能仅选最便宜者。事件后重新获取全候选区域，先通过family／报价／风险门禁，再比较保守净目标MTM、反向和失效损失、费用与退出流动性；报价、tick或成本不确定区间内的差异统一保持indeterminate_within_quote_uncertainty。

### Base Candidate Template — 下侧延续

**F_PUT｜put debit vertical｜directional_continuation｜conditional｜B。** 7675下方接受并通过O_DOWN、O_GAP_DOWN、O_SIGN_DOWN及共同门禁，O_RECLAIM不存在时才评估。首复核7650，重新估值后才看7625。Live long以经核实的7675映射附近及相邻±1 strike为候选，short向下3／5点，ratio1:1；9/30、10/1、10/2都比较。收复7675的1+1bar失效、负层不再成立或硬风险触发则退出；首次可评估时SPX≤7650或实时XSP≤所选put short，不追。7675当前目标层为正，不能只凭本日跌价激活。

### Risk-Path Contingency — 上侧修复

**F_CALL｜call debit vertical｜directional_continuation｜conditional｜B。** 7700上方接受并通过O_UP、O_GAP_UP、O_SIGN_UP及共同门禁，O_REJECT不存在时才评估。首复核7725，重新估值后才看7750。Live long在经核实7700映射及相邻±1 strike，short向上3／5点，ratio1:1；期限比较同上。拒绝7700的1+1bar失效或独立正层修复消失则退出；首次可评估时SPX≥7725或实时XSP≥所选call short，不追。当前PM仍负，本分支要求新证据改变状态。

两张卡互斥，Downside branch与Base是同一仓位路径；最多一个active setup，不自动反手。均为事件后周二RTH日内计划，最多持有60分钟并服从更早截止；9/30作为下面的算术示例，没有被选为live最优到期。

**逐腿历史诊断，仅此处列示。** 9/28 20:03:07 ET、XSP768.37的9/30合约；synthetic_only，fixed_legs_authority=none，eod_price_authority=diagnostics_only，binding=false。以下debit是历史支付额，不是9/29 expected fill。

| Family／全部illustrative legs | 组合bid/mid/ask／点 | 到期payoff及成本诊断 | 历史净vendor Greeks／映射 |
| --- | --- | --- | --- |
| F_PUT；buy 1×XSP260930P00768000（put K=768；bid/mid/ask=2.570/2.685/2.800；IV=13.080%）；sell 1×XSP260930P00763000（put K=763；bid/mid/ask=1.160/1.200/1.240；IV=14.480%） | 1.330/1.485/1.640 | N=1 unit_payoff_example、历史ask；C=$6: ML=$170, 净MP=$330, BE=766.300；C=$16: ML=$180, 净MP=$320, BE=766.200 | delta=-0.2229, gamma=+0.0154, vega=+0.0464, theta=-0.0729；long相对理论触发映射取整差+0.500点 |
| F_CALL；buy 1×XSP260930C00770000（call K=770；bid/mid/ask=2.260/2.340/2.420；IV=13.420%）；sell 1×XSP260930C00775000（call K=775；bid/mid/ask=0.680/0.720/0.760；IV=12.700%） | 1.500/1.620/1.740 | N=1 unit_payoff_example、历史ask；C=$6: ML=$180, 净MP=$320, BE=771.800；C=$16: ML=$190, 净MP=$310, BE=771.900 | delta=+0.2398, gamma=+0.0145, vega=+0.0702, theta=-0.2880；long相对理论触发映射取整差+0.000点 |

Put到期净利润区：XSP<K_long−d−C_N/(100N)；call：XSP>K_long+d+C_N/(100N)。完整价差的尾损=max_loss，前提是完整组合及费用上界成立；盘中止损价不保证成交损失。示例净Gamma／Vega为正、Theta为负，Delta随方向；vendor Greek单位未独立验证，不直接当作美元风险。实际live_selected_legs、N、debit cap和清算MTM都pending。方向价差的中心包含测试not_applicable，但路径MTM必需。

短腿降低premium同时封顶收益；是否优于单腿须在相同路径、持有时间和成本下比较live清算值。方向正确仍可能因慢路径、IV crush、翼部变化、Theta、反向节点、费用或流动性而亏损。必须取得所选expiry自身ATM、25Δ、long／short-wing IV及Greeks，不能借远期smile。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

事件后7675下方两根完整5m接受，局部/新0DTE为负且全PM及剔目标层保持负且不改善，才评估put debit vertical；先7650，再7625。 路径排序来自负PM与价位证据，尚无目标到达概率。

### Risk Case

事件后7700上方接受并有独立结构修复：全PM及剔目标层非负，局部/新0DTE为正，才评估call debit vertical；先7725，再7750。 这是新结构修复后的反证分支，与Base互斥，不是当前正结构已经存在。

### Scenario Valuation — 四情景闭合

| Branch | Scenario | 价格假设 | 时间假设 | 估值状态 |
| --- | --- | --- | --- | --- |
| Base put | target | XSP765.0／SPX7650 | 30min after actual entry | pending；netPnL=null；probability=null |
| Base put | adverse | XSP770.0／SPX7700 | 15–30min after entry | pending；netPnL=null；probability=null |
| Base put | invalidation | XSP767.5／SPX7675 | Actual reclaim/rejection timestamp | pending；netPnL=null；probability=null |
| Base put | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；netPnL=null；probability=null |
| Risk call | target | XSP772.5／SPX7725 | 30min after actual entry | pending；netPnL=null；probability=null |
| Risk call | adverse | XSP767.5／SPX7675 | 15–30min after entry | pending；netPnL=null；probability=null |
| Risk call | invalidation | XSP770.0／SPX7700 | Actual reclaim/rejection timestamp | pending；netPnL=null；probability=null |
| Risk call | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；netPnL=null；probability=null |

Target以实际入场后30分钟为基准，并作15／60分钟敏感性；候选ATM不变或±2vp，加不利wing斜率／曲率变化。必须记录估值模型及版本、实际估值／退出时间、spot、独立forward、利率、同expiry IV／Greeks、N、入场debit、退出清算折价和全部费用。Target保守值必须覆盖debit、成本及b；adverse与invalidation损失须在预算内。时间和价格是假设，无概率赋值；缺实时工具时八行保持pending，不用9/30到期intrinsic代替9/29日内退出MTM，不宣称正EV。

### No-Trade Case

以下任一成立则不新建仓：在7675–7700核心且没有完整接受；10:00尚未实际发布或reset未完成；价格／回测／独立signed门禁未确认；live价格、地图、IV、MTM、broker或风险能力未核实；数值容差、buffer和风险账本未冻结；报价、carry或mapping失配；成本后目标值不足；首次可评估价已越首节点或short；剩余窗口不足30分钟；预算耗尽、两次thesis failure、再入场次数用尽；计划要求拆腿或未经授权跨夜。节点迁移或实际重大波动须先清空旧确认，不能在旧计数上补一根bar。

盘后No Qualified Plan的门槛另行判断：core hard failure、所有条件路径及失效无法定义、所有封顶风险family或复筛协议失败，才可能为C。本期仍能定义完整条件路径；未来字段pending与尚未确认的live能力按执行状态处理。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

1. **7675／7700的完整bar、回测及首节点距离。** 决定Base或Risk是否激活，7650／7725要求重新估值。
2. **9/29新PM0DTE、全PM、剔目标层与局部图。** 检验7675正目标层是否消退、负PM是否延续或修复；7685旧T0已剔除。
3. **10:00两项实际发布及后续讲话内容。** 决定reset完成时间；Barr经济展望等若出现实质政策／利率冲击，重新冻结。
4. **候选自身ATM／25Δ／wing／Greeks及VIX。** 决定IVcrush、成本及波动冲击，不用远期翼部补缺。
5. **净清算MTM、组合宽度、全部费用、剩余风险与时间。** 决定限价或取消，方向观点不能覆盖数值失败。


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
