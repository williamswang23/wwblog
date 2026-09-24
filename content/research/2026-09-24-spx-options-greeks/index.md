+++
title = "SPX期权持仓与Greeks结构分析-260923"
date = "2026-09-24"
data_as_of = ["2026-09-22", "2026-09-23"]
draft = false
description = "分析9月23日SPX期权存续Gamma减弱、IV抬升及9月24日的条件路径。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "38f1a3afdf23f95dfe5b2cad6f84430f172935d9236fd800a8b82288d328a356"
+++

# SPX期权持仓与Greeks结构分析-260923

## 1. 结论

9月23日价格下移，共同存续合约的signed GEX明显减弱，前端IV上升。因此，9月24日的判断为**条件偏下（downside_bias）**：失守7700后优先检查下侧释放；上收7750则重新评估修复。计划评级为 **B / Conditional Next-Day Plan**，执行状态为 **requires_external_live_source**。两张方向模板都须在目标日重新确认并定价，本报告不提供实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | downside_bias，置信度medium；存续signed仍正但显著减弱，7700下方优先观察释放；不等于预测必跌。 |
| Earliest evaluation | 9/24 ET：最快09:40；须09:30完成刷新冻结后取得两根完整5分钟确认。数据晚到或实际冲击则顺延，普通日历事项不统一延后全天。 |
| Base activation | 7700下方接受且新0DTE／局部为负、全PM与剔目标0DTE层不较冻结基准改善，才评估put debit vertical；首查7675，收复7700或负结构消失则失效。 |
| Downside branch | 与Base为同一分支，不另加仓；7675仅为重新估值点，通过后才观察7650；首个可评估价已越过7675或所选short则不追。 |
| Upside branch | 若7750上方接受且新0DTE／局部转正、全PM为正且不恶化，独立评估call debit vertical →首查7800 →拒绝7750或修复消失则失效；同样最快09:40。 |

Plan Grade / Plan Status：B / Conditional Next-Day Plan；Execution Status：requires_external_live_source；planning_only=true。这是盘后的条件计划，不是实时下单指令；最终交易由人工决定。

## 3. Executive Summary

- **缓冲减弱，但尚非全市场负Gamma。** 同一31个存续到期日的signed从+55.169B降至+8.078B美元／SPX变动1%；PM贡献净变动的88.32%。剔除目标日到期层后，signed仍为+9.501B。
- **7705负峰不能直接延续到次日。** 该处绝对signed峰值的99.36%来自已到期的9/23合约。7700的目标0DTE与更久层均为负，7750／7800的更久层则为正；这一路径差异仍需实时验证。
- **IV上升不意味着方向策略便宜。** 31个共同ATM节点全部上升，fixed3D／7D分别增加1.497／2.515个vol points。数据整体仍为partial；默认候选9/25缺少正式smile翼节点，不能用7D曲线代替1DTE报价。
- **保留两条互斥的方向模板。** Base在7700下方确认后研究put debit vertical，先复核7675；Risk在7750上方修复后研究call debit vertical，先复核7800。两个首节点都不保证盈利。
- **事件安排已重新核对。** 9/24的常规数据发布按实际冲击监测，不预设全天hard reset。最快09:40评估，前提是09:30完成数据冻结、取得两根完整5分钟bar，并通过全部门禁。
- **报价权限为low。** EOD数据只用于粗略比较成本和风险量级。live选腿、四情景MTM、账户预算和经纪商能力尚未核实；缺少任一必要条件时，继续观察。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/22 | T：9/23 | Change / basis | T+1 relevance |
| --- | --- | --- | --- | --- |
| 同口径raw价格代理 | 7764.83 | 7706.90 | −57.93点／-0.7461% | 已低于旧核心；不是官方当日收盘 |
| 共同31期gross／signed | 239.569／+55.169 | 253.428／+8.078 | gross+5.785%；signed-47.091B | gross增加与signed显著减弱同时发生 |
| 共同PM／AM signed | +46.632／+8.537 | +5.042／+3.036 | 十亿美元／1% move | AM／PM均减弱，PM是主要贡献 |
| 共同selected节点7700／7750 | -7.102／+17.891 | -10.152／+15.373 | 百万美元／点；9/30＋10/16同集合 | 近端负节点与更高正节点分层 |
| fixed3D／7D ATM | 10.791%／9.321% | 12.288%／11.836% | +1.497／+2.515vp；来源迁移见第8节 | 31个共同exact ATM上升；rolling smile也抬升 |
| 结构／计划／报价权限 | range_bias；B；none；Base none | downside_bias；B；low；Base put | 同v1.8，等级未变 | Base重建源于路径变化；low不是交易许可 |

**前期计划回顾。** 实际260922报告评级为B、判断为range_bias，Base none；核心区间7750–7780，上侧缓冲至7800。Risk路径为7750下方接受→7725，或7800上方接受→7850，并要求在PMI及Barr窗口结束后重建。T日raw收盘代理7706.90已低于旧核心区间和7725第一复核位，说明区间先验未能维持到收盘。但仅凭收盘值，无法判断盘中确认是否成立，更无法推断成交或盈利。缺少5分钟路径、冻结地图、当时报价和交易记录，因此trigger=not_verifiable，execution/PnL=not_supplied。此次回顾依据当前实际稿；其SHA与原交付QA不同，原稿保留。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

**当日背景。** 以下列出与市场变化相容的可能机制；现有资料无法识别单条新闻对SPX、利率或IV的因果贡献。

1. 据Reuters转述，9月美国Flash Composite PMI从8月的56.0升至58.4，制造业和服务业均扩张，调查也显示供给及价格压力。Reuters转载内容于9/23 09:53 ET更新，早于16:00快照。较强的需求和成本压力可能通过利率、贴现率影响风险资产；这里只将其作为与当日利率上行相容的机制背景。调查扩散指数不是GDP增速；由于缺少共识误差和事件窗口识别，不能将当日SPX或IV变化定量归因于这项数据。[Reuters / S&P Global](https://www.aol.com/articles/us-business-activity-more-five-135212000.html)。

2. Barr在9月23日的讲话稿中表示，通胀目标风险上升、劳动力市场风险回落；他支持此前加息，并认为仍可能需要进一步政策调整。官方稿日期为9/23，但精确上网时间未核实，因此列为background_only。后续就业、需求和通胀数据可能继续影响利率与短端IV。这是官员观点，不能据此认定市场在16:00前已完全定价，也不能推断委员会作出了新决定。[Federal Reserve](https://www.federalreserve.gov/newsevents/speech/barr20260923a.htm)。

| 未来常规交易日／ET | 已核日历安排 | 处理 |
| --- | --- | --- |
| 9/24 08:30 | 初请、芝加哥劳动力指标初值 | monitoring_only；入场前审核实际结果及隔夜状态 |
| 9/24 10:00；11:30；14:00 | EHI／新屋销售；WEI；SCOOS | monitoring_only；实际gap、IV或流动性冲击才触发重置 |
| 9/24 16:30 | H.4.1 | 在日内退出后，background |
| 9/25 08:30；10:00；12:45 | 耐用品；密歇根终值；NY Fed Staff Nowcast | 默认9/25合约到期前事件；本计划仍9/24退出，不授权隔夜 |
| 9/28 10:30；11:00 | Dallas Fed Manufacturing；SCE Public Policy Survey | 第三个常规交易日背景，跨周末不属于默认持有计划 |

来源：[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[美联储日历](https://www.federalreserve.gov/newsevents/2026-september.htm)、[芝加哥联储发布表](https://www.chicagofed.org/research/data/data-release-calendar)。9/24、25、28均不是Cboe列示的假期。日历无法覆盖所有新闻；本次未发现须预设分支hard_reset的安排，常规发布也不自动阻断全天评估。若实际出现重大冲击，仍须重新冻结数据并重新计数。GDP／PCE安排在9/30，不能写成9/25；9/23已发生的PMI／Barr也不再列为9/24的未来事件。包内event_light只覆盖到期日分类。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 存续正Gamma缓冲大幅收缩，仍不能写成全市场负Gamma

**Claim：** 存续正Gamma缓冲大幅收缩，仍不能写成全市场负Gamma。

**Evidence / basis：** 共同31期gross+239.569→+253.428B（+5.78%），signed+55.169→+8.078B；PM贡献88.32%净变动。

**Mechanism / assumptions：** 共同集合控制了期限迁入和迁出，但结果仍混合spot、IV、时间老化及OI构成变化。signed正值缓冲减弱提供的是机制线索，并非已观察到的做市商卖单；signed也依赖模型约定。

**T+1 Implication：** 由前期range_bias调整为条件downside_bias；7700的价格和独立地图确认必须同时满足。

**Falsifier：** 新0DTE/局部转正或PM层明显修复。

**Confidence：** medium；算术已核对，路径为mechanism_only，empirical_validation_status=not_tested。

### Thesis 2 — 7705巨大负峰主要到期，7700的较长期负节点仍需关注

**Claim：** 7705巨大负峰主要到期，7700的较长期负节点仍需关注。

**Evidence / basis：** 7705全selected-227.029百万/点，剔T0后-1.443；7700目标0DTE-6.005、更久-10.152；7750更久+15.373，7800更久+35.213。

**Mechanism / assumptions：** 当日负峰所在合约到期，削弱了将峰值机械延续到次日的依据；7700跨层为负、上方节点为正，则构成有条件的路径不对称。selected仅含目标日、9/30和10/16，不能据此推断全曲线gamma flip。spot、IV、时间老化及OI构成变化仍是替代解释，signed遵循模型约定。

**T+1 Implication：** 7700失守首查7675，若第一复核已跳过不追；7750上收后才研究逆向修复至7800。

**Falsifier：** 目标日层符号重排、边界迁移超容差，或第一复核位已被跳过。

**Confidence：** medium；算术已核对，路径为mechanism_only，empirical_validation_status=not_tested。

### Thesis 3 — ATM整体抬升，rolling smile同时变陡

**Claim：** ATM整体抬升，rolling smile同时变陡。

**Evidence / basis：** 31个共同ATM节点全部上升；fixed3/7/14/30/45D变化分别+1.497/+2.515/+1.063/+0.714/+0.468vp；三个rolling槽位level、skew25和BF25均上升。

**Mechanism / assumptions：** 本期3D由9/25和9/28的total variance插值得到，fixed3D增幅不能视为9/25同到期增幅。smile比较更换了expiry，混有roll及样本组成变化；partial证据不足以支持精细edge。spot、IV、时间老化及OI构成变化仍可能影响比较；signed遵循模型约定。

**T+1 Implication：** 方向价差只把正式IV作背景；默认9/25候选期限的wing缺失，live必须重建。IV升高不自动授权卖波动或追买put。

**Falsifier：** 实时候选wing及MTM不能覆盖成本或出现IV crush。

**Confidence：** low；算术已核对，路径为mechanism_only，empirical_validation_status=not_tested。

### Thesis 4 — 价格与利率同向收紧背景下，DEX和高阶Greek仍是状态量

**Claim：** 价格与利率同向收紧背景下，DEX和高阶Greek仍是状态量。

**Evidence / basis：** Raw SPX7764.83→7706.90（-0.7461%）；共同DEX+432.886→+230.572B，Vanna-2.087→+0.884B，Charm+3.522→+3.809B。

**Mechanism / assumptions：** 本期Treasury2Y/10Y分别上行14/15bp，与增长和通胀背景相容，但日度共变不足以识别事件的因果贡献。Vanna由负转正，同时存在AM和PM的结构差异，不能直接解读为必然买盘。spot、IV、时间老化及OI构成变化仍是替代解释；signed遵循模型约定。

**T+1 Implication：** 保留价格确认优先；不以Vanna/Charm抵消下移证据，也不把滞后官方SPX当本期收盘。

**Falsifier：** 若把状态量下降解释成实际抛售量，或把跨日期VIX变化当单日变化，结论不成立。

**Confidence：** medium；算术已核对，路径为mechanism_only，empirical_validation_status=not_tested。

## 7. Conflicting Evidence, Confidence and What Changes the View

| 证据冲突 | 处理 | 改变判断的条件 |
| --- | --- | --- |
| 共同signed急降，但剔T0及剔目标层仍正 | 仅降低缓冲判断，不宣称所有存续期权负Gamma；偏下需价格＋独立地图确认 | 新0DTE／局部转正、PM持续修复且上收7750 |
| 全selected7705负峰巨大，但99.36%属于已到期层 | 不能把当日到期冲击机械外推；更久7700负层另行检查 | 新图中7700负结构消失或边界迁移 |
| Vanna由负转正，与偏下路径并存 | AM为正、PM仍负；高阶Greek是有限差分状态，不是确定对冲订单 | 相同假设下层间修复并得到实际价格支持 |
| IV升高、put翼相对更贵，但未证明买或卖vol有edge | 用自身候选翼和退出MTM评估价差；不以skew替代方向证据 | 净目标值无法覆盖premium、费用、缓冲或IV crush |
| 日期化信息完整性有限 | 官方SPX／RV滞后，VIX跳过一个前值日，Barr精确上网时间未知 | 新增资料只能在明确的新cutoff下重评，不能改写本次历史信息边界 |

结构置信度为medium。路径不对称状态directional只表示从机制上优先检查下侧，没有经过胜率校准。主要依据是共同存续缓冲收缩和7700附近的负节点；反向证据包括仍为正的存续总量、已退出的到期负峰以及上方正节点。报价或执行门禁失败时可以取消候选，但无需据此将历史结构评级自动降为C。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09/24 | τ2.000→1.000天 | 12.223% | +2.116vp；same_expiry_atm | 目标0DTE／普通数据发布；PM | k0局部总方差插值；观测包围；confidence=0.986；partial |
| 09/25 | τ3.000→2.000天 | 14.174% | +3.383vp；same_expiry_atm | 默认候选1DTE／当前3D下端；PM | k0局部总方差插值；观测包围；confidence=0.992；partial |
| 09/28 | τ6.000→5.000天 | 10.539% | +1.525vp；same_expiry_atm | 当前3D上端／周末后；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 09/29 | τ7.000→6.000天 | 10.643% | +1.322vp；same_expiry_atm | 前7D源；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 09/30 | τ8.000→7.000天 | 11.836% | +1.426vp；same_expiry_atm | 当前7D源／GDP与PCE／EOM；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 10/06 | τ14.000→13.000天 | 10.952% | +0.911vp；same_expiry_atm | 前14D源；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 10/07 | τ15.000→14.000天 | 11.104% | +0.880vp；same_expiry_atm | 当前14D源；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 10/16 | τ24.000→23.000天 | 11.927% | +0.717vp；same_expiry_atm | 最大gross到期的PM层；PM | k0局部总方差插值；观测包围；confidence=0.995；partial |
| 10/22 | τ30.000→29.000天 | 11.988% | +0.600vp；same_expiry_atm | 前30D源；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 10/23 | τ31.000→30.000天 | 12.103% | +0.586vp；same_expiry_atm | 当前30D源；PM | k0局部总方差插值；观测包围；confidence=0.996；partial |
| 11/06 | τ45.042→44.042天 | 13.035% | +0.418vp；same_expiry_atm | 前45D源／当前45D下端；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 11/13 | τ51.042天 | 13.352% | unavailable；prior_node_unavailable | 当前45D上端／前期ATM缺失；PM | k0局部总方差插值；观测包围；confidence=0.996；partial |
| 3D fixed | 3→3天 | 12.288% | +1.497vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:09/25–09/25(τ3.000–3.000,w=0.000000)；T:09/25–09/28(τ2.000–5.000,w=0.333333)；interpolated，无外推；confidence=0.992；partial |
| 7D fixed | 7→7天 | 11.836% | +2.515vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:09/29–09/29(τ7.000–7.000,w=0.000000)；T:09/30–09/30(τ7.000–7.000,w=0.000000)；observed，无外推；confidence=0.994；partial |
| 14D fixed | 14→14天 | 11.104% | +1.063vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:10/06–10/06(τ14.000–14.000,w=0.000000)；T:10/07–10/07(τ14.000–14.000,w=0.000000)；observed，无外推；confidence=0.994；partial |
| 30D fixed | 30→30天 | 12.103% | +0.714vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:10/22–10/22(τ30.000–30.000,w=0.000000)；T:10/23–10/23(τ30.000–30.000,w=0.000000)；observed，无外推；confidence=0.996；partial |
| 45D fixed | 45→45天 | 13.084% | +0.468vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:11/06–11/06(τ45.042–45.042,w=0.000000)；T:11/06–11/13(τ44.042–51.042,w=0.136905)；interpolated，无外推；confidence=0.993；partial |

**形状与可比性。** 曲线形状和全部差值均为report_layer_calculation_from_packet_nodes。曲线为mixed：前端凸起，约14D处较低，随后向30／45D抬升；3D−30D=+0.185vp、7D−30D=-0.266vp、14D−30D=-0.998vp、45D−30D=+0.982vp。9/25 ATM为14.174%，高于9/24的12.223%和9/28的10.539%。该期限涵盖后续数据、周末和期限组成，无法单独拆出某一事件的溢价，也不能据此预测方向。

31个共同exact ATM节点全部上升；新增的11/13没有前期主范围ATM。前日3D取9/25的τ3单点，本期改用9/25–9/28的τ2／5总方差插值（w=1/3），因此fixed3D的+1.497vp和9/25同到期的+3.383vp回答的是不同问题。7D来源从9/29移至9/30，fixed增幅为+2.515vp；9/29和9/30同到期分别增加+1.322／+1.426vp。14D／30D来源及同到期对照见表。45D从11/6实际τ45.041667的observed节点，转为11/6–11/13插值（w=0.136905）；须保留DST和源期限组成，不能把变化全归于重新定价。

所有fixed节点保留packet中的no_extrapolation=true及原生lower／upper／weight。total variance满足w(τ)=σ(τ)²τ：先在区间内插值w，再除以τ并开方。此处只解释上游结果，不在报告层补建曲面。Exact ATM使用forward log-moneyness k=0的局部总方差插值；source_surface、support、confidence、quality_flags原样保留在复核材料中。T0不进入正τ曲线，目标日live IV尚未产生。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T:09/30／7D | 15.827% | 13.486% | 11.836% | 10.943% | 10.685% | 2.544vp | 0.378vp | forward delta局部插值；观测包围；confidence0.971–0.994；degraded_local_evidence |
| Δ P:09/29(τ7)→T:09/30(τ7) | +3.242vp | +2.888vp | +2.515vp | +2.324vp | +2.431vp | +0.565vp | +0.091vp | rolling_tenor_slot_fixed_delta；同scope／selection contract；降级局部证据；materiality=indeterminate_within_uncertainty |
| T:10/07／14D | 16.053% | 13.114% | 11.104% | 10.010% | 9.691% | 3.104vp | 0.458vp | forward delta局部插值；观测包围；confidence0.959–0.994；degraded_local_evidence |
| Δ P:10/06(τ14)→T:10/07(τ14) | +2.418vp | +1.798vp | +1.063vp | +0.508vp | +0.206vp | +1.290vp | +0.090vp | rolling_tenor_slot_fixed_delta；同scope／selection contract；降级局部证据；materiality=indeterminate_within_uncertainty |
| T:10/23／30D | 18.502% | 14.585% | 12.103% | 10.792% | 10.422% | 3.793vp | 0.586vp | forward delta局部插值；观测包围；confidence0.973–0.996；degraded_local_evidence |
| Δ P:10/22(τ30)→T:10/23(τ30) | +1.778vp | +1.284vp | +0.714vp | +0.276vp | +0.063vp | +1.008vp | +0.066vp | rolling_tenor_slot_fixed_delta；同scope／selection contract；降级局部证据；materiality=indeterminate_within_uncertainty |

**Level／slope／curvature。** 三个槽位的ATM level、25Δ downside skew和BF25均上升；判断不能只依赖一个skew scalar。Skew25＝IV25put−IV25call，BF25＝(IV25put＋IV25call)/2−ATM，wing premium＝对应wing−ATM。7D put-wing为1.650vp（Δ+0.373），call-wing为-0.893vp（Δ-0.191）；14D put-wing为2.010vp（Δ+0.735），call-wing为-1.094vp（Δ-0.555）；30D put-wing为2.482vp（Δ+0.570），call-wing为-1.311vp（Δ-0.438）。报价误差与统计显著性尚未校准，这些差值不能视为已建立的相对价值。

Skew期限梯度方面，14D−7D从-0.165变为+0.560vp，30D−14D从+0.970变为+0.689vp。比较仍采用forward_delta_non_premium_adjusted及观测支持范围内的插值，三个expiry都发生了滚动；结果既不是原生fixed-tenor smile，也不是9/24的live变化。

**对family与期限的影响。** 默认候选9/25在目标日剩1个日历DTE；9/24的0DTE只作战术比较，9/28剩4DTE，超出默认1–3DTE窗口。方向价差的EOD IV仅为background_only；gate=not_applicable并不免除live ATM／25Δ／两腿wing／MTM检查。Iron fly／condor／BWB及双侧long-premium缺少所需的候选期限smile，required gate=fail；不能借用9/30的7D smile。Calendar还受日内持有规则限制。Fixed30D的12.1025%与截至9/22的RV20相差1.7824vp，但日期、期限和测度均不同，不能据此认定存在可获取的variance risk premium。

## 9. Key Expiry / Strike / Dealer Node

期限表单位为**十亿美元／SPX变动1%**。gross表示规模；signed按call−put计算，不是观测到的dealer持仓。汇总只使用canonical COMBINED行，AM／PM拆分不能再次计入总量。

| Expiry / family | Role | T DTE→目标DTE | Gross GEX | Signed GEX | Vendor OI |
| --- | --- | --- | --- | --- | --- |
| 09/23 / COMBINED | 当日到期层，已退出 | 0→-1 | +47.347 | -40.314 | 322,824 |
| 09/24 / COMBINED | 目标0DTE，须重建 | 1→0 | +14.711 | -1.422 | 134,106 |
| 09/25 / COMBINED | 默认候选，目标1DTE | 2→1 | +31.916 | +2.547 | 644,691 |
| 09/30 / COMBINED | EOM／共同selected | 7→6 | +34.837 | -0.111 | 978,046 |
| 10/16 / COMBINED | 全链及存续最大gross／mixed | 23→22 | +68.217 | +3.363 | 2,654,652 |
| 10/16 / SPX | AM拆分 | 23→22 | +60.894 | +2.441 | 2,317,392 |
| 10/16 / SPXW | PM拆分 | 23→22 | +7.323 | +0.921 | 337,260 |
| 11/13 / COMBINED | 新出现期限，OI/GEX为0 | 51→50 | +0.000 | +0.000 | 0 |

全链gross为300.776B，signed为-32.236B。其中T0 gross为47.347B，占15.74%，signed为-40.314B。剔除T0后，gross为253.428B，signed为+8.078B；再剔除目标9/24后，分别为238.717B和+9.501B。10/16占全链gross的22.68%、存续gross的26.92%；目标9/24占存续gross的5.80%。

分别剔除各自T0后，signed从9/22的+66.755B变为9/23的+8.078B；这一比较包含9/23到期层退出。若固定为两日共同的31个expiration>9/23到期日，结果才是+55.169→+8.078B。进一步限定为两日均在目标日之后存续的共同30期，则为+49.403→+9.501B。新增11/13的OI／GEX为0，新增ATM不能解释为新增敞口。

节点表单位为**百万美元／SPX点**：本期以原gamma表中的1%字段除以0.01×7706.90；前日按其各自spot换算。XSP位置按SPX÷10换算，尚非目标日选定的固定腿。

| SPX / XSP位置 | 作用 | T0 signed | 目标0DTE signed | 目标日之后 signed | 剔T0合计 signed |
| --- | --- | --- | --- | --- | --- |
| 7500 / 750.0 | 远端负节点背景 | +0.008 | -0.202 | -39.740 | -39.942 |
| 7600 / 760.0 | 更远下侧负节点 | -0.119 | -1.380 | -25.164 | -26.544 |
| 7650 / 765.0 | 下侧第二复核 | -0.553 | -3.090 | -13.350 | -16.440 |
| 7675 / 767.5 | 下侧第一复核 | -2.442 | -5.736 | +0.203 | -5.533 |
| 7700 / 770.0 | Base下侧确认边界；目标0DTE和更久均负 | -38.804 | -6.005 | -10.152 | -16.157 |
| 7705 / 770.5 | T0绝对负峰；已到期 | -225.586 | -0.441 | -1.002 | -1.443 |
| 7710 / 771.0 | T0负峰附近；目标层需重建 | -77.060 | +1.171 | -3.369 | -2.198 |
| 7725 / 772.5 | 观察带中间复核 | -19.616 | -1.607 | +1.970 | +0.363 |
| 7750 / 775.0 | Risk上侧确认边界；更久正节点 | -8.731 | +1.924 | +15.373 | +17.297 |
| 7775 / 777.5 | 上侧途中节点 | +0.711 | +3.829 | +4.017 | +7.845 |
| 7800 / 780.0 | 上侧第一复核；较强更久正节点 | -1.157 | +3.037 | +35.213 | +38.250 |
| 7850 / 785.0 | 上侧第二复核 | +0.075 | +0.501 | +17.373 | +17.874 |
| 7900 / 790.0 | 远端正节点 | +0.000 | +0.149 | +32.156 | +32.305 |

Current selected包含9/23、9/24、9/30和10/16；共同更久图只包含9/30＋10/16。Selected存续gross覆盖46.47%，剔除目标0DTE后覆盖43.17%，不能将这些局部符号外推至未覆盖的期限。7705全selected负峰为-227.029百万／点，其中99.36%来自已到期层。报告未计算或声称Gamma flip；这些节点也不意味着价格必然获得支撑、遇到阻力或向其靠拢。

| Greek／范围 | 本期值或共同集合变化 | 解释边界 |
| --- | --- | --- |
| DEX | 共同+432.886→+230.572B，状态敞口非流量 | sum(delta×S×100×OI)，状态量非净流入 |
| VANNA | 共同-2.087→+0.884B；AM+1.542/PM-0.657B；sigma±.005的DEX差 | σ±0.005的DEX差；总差对应1vol point冲击，AM／PM分开 |
| CHARM | 共同+3.522→+3.809B；目标日层+1.675B；模型下一交易日参考变化 | 固定spot／IV推进至下一交易日；不是必然对冲量 |
| VEX | 全链2.045348B=sum(vendor_vega*100*OI)，供应商vega单位未独立验证 | 供应商vega量纲未独立核验 |
| VOLGA | 存续14.345029B原生BS-vega敞口差，sigma±.005；BS-vega按单位小数波动率计，未乘.01，不与vendor-VEX直接比值 | 原生BS-vega按单位小数波动率计；不直接与VEX比较 |

高阶模型采用ACT/365；Vanna／Volga分别以σ上、下各0.005计算，Charm推进至下一交易日参考时点：PM16:00、AM17:00。AM到期采用前一交易日17:00作为计算代理，不能等同官方AM结算时间。不符合高阶计算资格的T0值保留为null，不填0。Volga的BS vega未额外乘0.01，其原生数值不能解释为“IV升1点的现金损益”。

## 10. T+1 Decision Map, Structural View and Plan Grade

**结构与评级。** downside_bias／path_asymmetry_status=directional／confidence=medium；Base对应7700下方的条件释放，Risk对应上收7750后的修复。Grade B衡量计划准备程度，不代表胜率。Formal已通过，偏下基准和上侧修复的确认、失效及风险边界都可定义，两个价差family具备条件研究基础。评级暂不到A：方向先验与仍为正的存续总量存在冲突；selected地图仅覆盖部分期限，候选期限wing、情景估值及多腿可行性仍有选择不确定性。也无需降至C：有界风险family和完整live复筛协议可定义；未来数据尚未产生及low报价权限本身不构成降级理由。

| State | Required confirmation | Preferred plan | Invalidation |
| --- | --- | --- | --- |
| opening_inside_core | 7700–7750内；7725是中间复核 | Observe only; no range trade | Breakout or map reset |
| opening_after_overnight_reset | Opening spot/IV/event state verified; freeze complete | Clear ranking/recenter; two full bars | Any live gate fails |
| post_scheduled_release | Claims/labor/homes/credit release actually available | Continue gate checks; actual shock resets affected branch | Unresolved vol/liquidity shock |
| post_event_range_reconfirmed | 3 full5m closes inside7700–7750;candidatewing gate newly passed;net-profit containment | Re-screen fly/condor, no automatic substitution | Boundary/center/profit-region failure |
| gap_above_upper_confirmation | Retest7750 then two fullcloses>7750 and sign gates | F_CALL before7800/selectedshort | O_REJECT |
| gap_below_lower_confirmation | Retest7700 then two fullcloses<7700 and sign gates | F_PUT before7675/selectedshort | O_RECLAIM |
| confirmed_downside_release | O_DOWN+O_SIGN_DOWN+common gates;O_RECLAIM absent | F_PUT→7675;7650 after revaluation | Reclaim or independent weakness disappears |
| confirmed_upside_recovery | O_UP+O_SIGN_UP+common gates;O_REJECT absent | F_CALL→7800;7850 after revaluation | Rejection or positive-layer repair fails |
| vol_shock_or_event_reset | 15min VIX+1point or candidateATM+2vp;actual materialnews | Discard counts/rankings;refresh | Reset incomplete |
| node_migration | Map age<=300s;node move within frozen numeric tolerance | Rebuild and freeze again | Same-method map unavailable |
| all_gates_pass | One branch confirmed and all live pricing/risk/capabilities verified | Human decides; never automatic order | Any gate ceases to pass |
| any_execution_gate_fails | Quote/carry/IV/MTM/risk/time/capability missing or failed | No new position; manage existing risk | Until full verification |

### Operational Definitions and Required Capabilities

| 必需能力／条件 | 时间与单位 | 当前状态／缺口 |
| --- | --- | --- |
| SPX完成5m bars／O_UP、O_DOWN及失效回测 | ET规则bar，t0之后，不用半根；行情延迟≤30秒 | external_required |
| PM／新0DTE／durable／local图／O_SIGN、O_NODE | 同口径1%或每点美元；地图≤300秒 | external_required；价格本身不能替代地图 |
| 候选IV、Greeks、VIX／O_SURFACE、O_VOL | 实时≤30秒；IV decimal、变化vol points | external_required；不能使用滞后VIX或另一expiry补翼 |
| 全腿组合、spot/forward/carry／O_QUOTES、O_MAPPING | ≤30秒；时差与数值容差在t0前冻结 | external_required；独立carry不可用任意q=0替代 |
| 情景估值／O_VALUE、O_RANGE | 真实模型／时间／退出折价，15／30／60分钟敏感性 | external_required；无净值则不通过 |
| 经纪商／账户／O_BROKER、O_RISK | 原子net-limit、实际N/L/H/C_N与预算 | external_required；未提供不等于经纪商无能力 |

`O_TIME`：只有09:30已完成冻结、取得两根完整bar，并满足独立signed条件时，最早09:40才可评估。若数据晚到、需要跳空回测或出现实际冲击，t0随之顺延。最晚入场还受第11／13节的时钟约束，不能为赶时间缩短确认。上述阈值是流程默认值或报告假设，尚未校准为alpha参数。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Family／scenario | Payoff archetype | Structural fit | IV dependency／gate | Pricing／execution | Status／原因 |
| --- | --- | --- | --- | --- | --- |
| put_debit_vertical／base_case | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：7700下方接受与独立负结构确认后研究，7675仅第一复核，净MTM必须覆盖成本。 |
| call_debit_vertical／risk_case | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：7750上方接受及独立signed修复后研究；7800第一复核。 |
| defined_risk_iron_butterfly／alternative_stability | centered_stability | not_established | required／fail | unavailable／external_required | not_screenable：未证明中心稳定，且9/25候选wing不在正式selected smile；禁止用7D代替。 |
| defined_risk_iron_condor／alternative_range | broad_bounded_range | not_established | required／fail | unavailable／external_required | not_screenable：观察带不是稳定盈利区；双侧候选wing与成本后MTM缺失。 |
| broken_wing_butterfly／directional_alternative | directional_continuation | not_established | required／fail | unavailable／external_required | not_screenable：不能仅因可能降低净premium选择方向蝶；候选wing/不对称尾部估值缺失，复核点亦非收敛终点。 |
| straddle_strangle／alternative_vol | two_sided_expansion | not_established | required／fail | unavailable／external_required | not_screenable：双向幅度未校准且候选wing/总premium的MTM未完成；高IV不证明扩张edge。 |
| calendar_diagonal／alternative_term | term_or_vol_relative_value | not_established | required／fail | unavailable／external_required | not_applicable：默认日内退出与拟议跨日期限收敛thesis不符；near/back候选wing与跨期限估值也缺失。 |
| long_option／directional_alternative | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：可作live成本/尾部收益比较，但无证据优于价差，不另增完整卡。 |

五类payoff archetype均已筛选，iron butterfly和iron condor分别记录；所有family的edge_evidence_status均为not_established。方向价差的EOD IV gate=not_applicable只表示IV作为背景，live ATM／25Δ／目标wings／MTM仍须取得。BWB、区间及双侧策略的required gate失败，具体原因是候选期限节点覆盖不足；不能只用“partial”概括这些局部门禁。

### Local Candidate Comparison

| Family | EOD局部网格 | T+1选择方法 |
| --- | --- | --- |
| Put vertical | 9/24、25 × long769/770/771 × width3/5＝12 | 围绕live7700边界的映射重建相邻±1strike |
| Call vertical | 相同2期 × long774/775/776 × width3/5＝12 | 围绕live7750边界重建 |
| Iron butterfly | 相同2期 × center771/772/773 × widths(3,3)/(5,5)/(3,5)/(5,3)＝24 | 同body短put/call及两侧长wing；纯研究 |
| Iron condor | 相同2期及3center，短put=center−1、短call=center+1 ×同4wing pairs＝24 | 独立宽区间测试，不拿铁蝶结果代替 |

| 9/25 family | Width | 合成ask范围／XSP点 | 组合ask−bid范围／点 | N=1含成本ML范围／美元 | 判断 |
| --- | --- | --- | --- | --- | --- |
| F_CALL | 3 | 0.460–0.760 | 0.050–0.070 | 52–92 | 相邻strike整体粗比；不选live赢家 |
| F_CALL | 5 | 0.610–1.000 | 0.050–0.060 | 67–116 | 相邻strike整体粗比；不选live赢家 |
| F_PUT | 3 | 0.810–1.130 | 0.070–0.110 | 87–129 | 相邻strike整体粗比；不选live赢家 |
| F_PUT | 5 | 1.140–1.600 | 0.070–0.100 | 120–176 | 相邻strike整体粗比；不选live赢家 |

72组比较均为comparison=limited、winner=null；原始全腿、Greeks、两组成本及分段到期payoff保留在复核材料中。low权限可用于估计风险量级，但相邻strike的Delta、与确认位的距离及目标盈利区各不相同，不能只选价格最低的一组。Live阶段先补齐各family的IV门禁，再重建邻域，按保守净目标MTM、反向／失效损失及成本／流动性稳健性排序；落在quote、tick或成本不确定性范围内的差异仍记为indeterminate。Range还须确认current spot／forward和完整center uncertainty区间落入成本后的scenario-profit region，并留有正buffer；目前这一包含测试为pending。9/28在目标日剩4DTE，9/29、30期限更长，均不在默认1–3DTE窗口；未进入默认排序不代表合约质量差。

### Base Candidate Template — 条件下侧延续

**F_PUT：put debit vertical；directional_continuation；conditional；Grade B。** 只有7700下方取得两根完整5m bar确认，O_SIGN_DOWN、O_GAP_DOWN及共同门禁均通过，且不存在O_RECLAIM时，才评估这一模板。7675是第一复核点；7650仅在重新估值后观察。默认选9/25到期合约（目标日1DTE），并将9/24的0DTE作战术比较；两者都按9/24日内持有。Live long在已验证边界的映射价附近及相邻±1strike中选择，short向下相距3或5点，ratio1:1；live_selected_legs、N和debit cap仍为pending。若收复7700的1+1bar失效条件成立，或独立弱结构消失，则退出；风险上限也可能先触发。首个可评估价若已低于7675／short，不追价。

### Risk-Path Contingency — 上侧修复

**F_CALL：call debit vertical；directional_continuation；conditional；Grade B。** 只有7750上方取得两根完整5m bar确认，O_SIGN_UP、O_GAP_UP及共同门禁均通过，且不存在O_REJECT时，才评估这一模板。7800是第一复核点，7850须重新估值。Expiry和日内持有规则同Base；long在live7750映射价附近及相邻±1strike中选择，short向上相距3或5点，ratio1:1。若拒绝7750的1+1bar失效条件成立，或正向修复消失，则退出；首个可评估价越过首节点／short时不追价。它与Base互斥；一条分支失败不会自动触发反向入场，且会占用失败／再入场预算。

**Illustrative EOD examples，仅在此处逐腿列示。** 以下均是9/23 16:00 ET、XSP770.60时的历史构造。客户支付的debit记为正；synthetic_only、binding=false、coarse_scale_only，不代表9/24的expected entry。

| Family／全部illustrative legs | 组合bid/mid/ask／XSP点 | 成本与到期payoff | 历史净Greeks／映射 |
| --- | --- | --- | --- |
| F_PUT；buy 1×XSP260925P00770000（put K=770，bid/mid/ask=2.250/2.275/2.300，IV=11.380%）；sell 1×XSP260925P00765000（put K=765，bid/mid/ask=0.940/0.955/0.970，IV=13.090%） | 1.280/1.320/1.360 | 历史ask；N=1 unit_payoff_example；C=$6：ML=$142，净MP=$358，BE=768.580；C=$16：ML=$152，净MP=$348，BE=768.480 | delta=-0.2340, gamma=+0.0217, vega=+0.0580, theta=-0.0747；long对确认位取整差0，独立spot mapping残差−0.090点 |
| F_CALL；buy 1×XSP260925C00775000（call K=775，bid/mid/ask=1.030/1.045/1.060，IV=11.730%）；sell 1×XSP260925C00780000（call K=780，bid/mid/ask=0.270/0.285/0.300，IV=11.960%） | 0.730/0.760/0.790 | 历史ask；N=1 unit_payoff_example；C=$6：ML=$85，净MP=$415，BE=775.850；C=$16：ML=$95，净MP=$405，BE=775.950 | delta=+0.1753, gamma=+0.0253, vega=+0.0944, theta=-0.2870；long对确认位取整差0，独立spot mapping残差−0.090点 |

上行策略的到期净盈利区为XSP>K_long+d+C_N/(100N)，下行策略为XSP<K_long−d−C_N/(100N)；max_loss=100Nd+C_N，net_expiry_max_profit=100N(W−d)−C_N。上述关系以完整结构和成本上界有效为前提，描述的是9/25到期payoff，不能代替9/24退出时的MTM，也不保证止损成交。方向策略的spot/forward及center包含测试为not_applicable；四情景路径净值测试仍是必需项。

两个示例的净Gamma／Vega为正、Theta为负，Delta方向各异；live符号和幅度都须重算。9/25缺少正式selected smile，须取得该期限自身的ATM／25Δ／long与short翼及独立MTM。短腿可以降低premium，同时封顶收益；只有live净目标值才能判断价差是否优于单腿。即使方向判断正确，慢速或反向路径、IV crush、Theta、正Gamma节点减速、费用和退出流动性仍可能造成亏损。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

若7700下方获得接受，新0DTE/局部signed为负，且全PM和剔目标0DTE层均未较冻结基准改善，才评估put debit vertical；7675为第一复核点，7650为第二复核点。价格、回测和独立signed层缺一不可。若收复7700或弱结构不再成立，就停止沿用偏下先验；历史put成本不能作为入场理由。

### Risk Case

若上收7750并获得接受，局部/新0DTE转正且PM层不恶化，才评估call debit vertical；7800为第一复核点，7850为第二复核点。上侧正节点可能减缓行情延伸，因此须在首节点重新估值，不能用到期最大收益代替届时的清算价值。另一分支失败只触发重新检查，不构成反手指令。

### Scenario Valuation — 四情景闭合

| Branch | Scenario | Spot假设 | 时间假设 | 估值状态 |
| --- | --- | --- | --- | --- |
| Base put | target | XSP767.5／SPX7675 | 30min after actual entry | pending；净PnL=null；probability=null |
| Base put | adverse | XSP772.5／SPX7725 | 15–30min after entry | pending；净PnL=null；probability=null |
| Base put | invalidation | XSP770.0／SPX7700 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Base put | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |
| Risk call | target | XSP780.0／SPX7800 | 30min after actual entry | pending；净PnL=null；probability=null |
| Risk call | adverse | XSP772.5／SPX7725 | 15–30min after entry | pending；净PnL=null；probability=null |
| Risk call | invalidation | XSP775.0／SPX7750 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Risk call | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |

Target按实际入场后30分钟估值，并补做15／60分钟敏感性；IV情景包括ATM不变及±2vp，再加入不利的wing斜率／曲率变化。Spot和时间只是情景假设，不代表到达概率。记录实际模型及版本、估值和退出时间、spot／独立forward／利率、同expiry ATM及两腿IV、N、入场debit、保守退出清算折价和全部成本。目标净值须严格超过成本与b，同时确认adverse／invalidation损失可接受。目前没有合格的live估值工具或输入，因此八行情景不填写虚构价值、净PnL或P测度概率；也不能用到期intrinsic代替周四退出MTM，尚无正EV结论。

### No-Trade Case

处于7700–7750观察带内，或price/sign/retest确认不完整，或实际shock尚未处理，或能力／报价／IV／MTM／数值参数／预算存在缺口，或有效时间窗口不足时，均不新增仓位。首个可评估价若已越过对应的第一复核点或short，不追价；节点迁移超出容差则重建。Core formal失败、任何条件路径／失效无法定义，或所有有界风险协议失败时，才构成EOD No Qualified Plan；本期未触发这些全局条件。重新评估前须补齐缺口，并重新冻结、计数、选腿和估值。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

1. **7700／7750外的完整bar及回测。** 用于确认下侧延续或上侧修复；7675／7800这两个首节点只触发重新估值。
2. **新9/24PM0DTE、PM总量及局部地图。** 检查7700负层和7750／7800正节点是否迁移；变化超出容差则重新计数。
3. **08:30及盘中实际发布的消息。** 判断是否出现利率、IV或流动性冲击；常规日历时刻本身不意味着全天禁入。
4. **候选ATM／25Δ／wings／Greeks及VIX15分钟变化。** 用于更新成本和估值、判断是否触发vol reset；不能用跨日期旧变化代替live指标。
5. **退出MTM、组合净价、成本、剩余预算及时钟。** 用于决定最终限价或取消；信息不足时继续观察，不改写历史结构判断。


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
