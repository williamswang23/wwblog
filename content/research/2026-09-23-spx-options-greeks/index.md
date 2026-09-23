+++
title = "SPX期权持仓与Greeks结构分析-260922"
date = "2026-09-23"
data_as_of = ["2026-09-21", "2026-09-22"]
draft = false
description = "分析9月22日SPX期权存续Gamma、IV变化，以及9月23日的条件路径与执行门槛。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "fa721d4874f27750342464be0419fe8770d3f652efd9bec2e9e87ff4244c658e"
+++

# SPX期权持仓与Greeks结构分析-260922

## 1. 结论

9月22日存续signed Gamma仍为正、价格代理持平且ATM IV普降，9月23日采用**区间观察（range_bias）、两侧释放概率暂不排序**的结构先验，计划为 **B / Conditional Next-Day Plan**、执行状态为 **requires_external_live_source**；先等PMI与Barr事件窗口完成后重建，基准情景无合格策略，仅保留条件化边界释放方案，本报告不是实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | range_bias，置信度medium；两侧释放概率无法排序。降级IV普降，但候选wing缺失，未建立区间策略。 |
| Earliest evaluation | 9/23 ET：event_dependent。PMI实际公布与Barr讲话及问答结束后重建、冻结，再从t0取得两根完整5分钟方向确认。 |
| Base activation | 基准情景无合格策略（none）。7750–7780核心内只观察；重建后3根bar及中心/盈利区域确认仅开启iron fly／condor重筛，所需IV gate未通过不放行。 |
| Downside branch | 若7750下方接受且局部／新0DTE为负、全PM及剔目标0DTE总量较冻结基准转弱，则评估put debit vertical →首查7725 →收复7750或弱化消失则失效。 |
| Upside branch | 若7800上方接受且PM／新0DTE／局部正向确认，则评估call debit vertical →首查7850 →重新拒绝7800或修复消失则失效。 |

Plan Grade / Plan Status：B / Conditional Next-Day Plan；Execution Status：requires_external_live_source；planning_only=true，盘后条件计划、非实时下单指令，最终交易由人工决定。

## 3. Executive Summary

- **跨过当日到期层后仍有正signed结构。** 剔除9/22的signed GEX为+66.755B，再剔目标日9/23后仍为+55.169B美元／1%变动，符合缓冲机制，但不等于价格必然稳定。
- **共同期限增强与全链净值下降可以同时发生。** 共同31期signed由+58.324B增至+66.755B，PM贡献97.24%净增；全链signed却由+92.426B降至+91.208B，差别来自到期集合与近端组成。
- **7765旧峰的96.82%已随T0退出。** 当前目标0DTE在7775／7780为正，而7750近端为负、更久层为正。观察核心为7750–7780，上侧缓冲至7800；这不是经过验证的卖方盈利区间。
- **IV降低没有自动生成卖波动机会。** 30个共同ATM节点全部回落，fixed3／7／14／30／45D也均下降；整体仍partial，默认候选9/24的正式wing节点缺失，iron fly与condor的required-IV gate均为fail，Base保持none。
- **边界释放需要新的证据。** 下侧确认7750后首查7725，上侧确认7800后首查7850；两分支互斥，价格接受还须独立signed层确认，目标点只是重新估值位置。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/21 | T：9/22 | Change / basis | T+1 relevance |
| --- | --- | --- | --- | --- |
| 同口径raw价格代理 | 7765.10 | 7764.83 | −0.27点／−0.0035% | 收盘未显示进一步上行；不从收盘推断盘中触发 |
| 共同31个存续到期 | gross220.222；signed+58.324 | gross261.830；signed+66.755 | gross+18.894%；signed+8.431B美元／1% | 同一到期集合增强；IV／aging／OI构成仍影响结果 |
| 共同PM／AM | PM+50.020；AM+8.304 | PM+58.218；AM+8.537 | PM贡献97.24% signed净增 | 正结构延续，并非本期才从负转正 |
| 共同selected局部 | 7750+17.686；7800+40.334 | 7750+17.891；7800+43.839 | 百万美元／SPX点；仅9/30＋10/16 | 更久节点仍正，但7750目标0DTE为负，不能忽略期限分歧 |
| ATM／smile | fixed3D11.007%；7D10.000% | fixed3D10.791%；7D9.321% | 分别−0.217／−0.679vp；30个共同exact ATM全降 | 三组rolling smile的level、skew25及BF25均回落；显著性未校准 |
| 结构先验／计划 | upside_bias；B；none | range_bias；B；none；Base none | 同为v1.8；改变路径与family资格，未重述等级方法 | 事件后边界释放有条件保留，不把Risk改称Base |

**前期计划回顾。** 实际260921报告为B/upside_bias：Base7775上方接受→7800，Risk7750下方接受→7725，并等待Williams/Jefferson实际结束后重建。T raw收盘代理7764.83回到此前7750–7775核心，收盘没有显示向上延续；但不能据收盘推断盘中未触发、胜负或执行。没有目标日5分钟路径、当时地图与报价、成交或PnL，trigger=not_verifiable，execution/PnL=not_supplied。实际稿SHA与原交付QA不同，回顾采用当前实际稿并保留原文件。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

**当日新闻，按时点使用。**

1. **需求评价分化、成本指标走高。** 费城非制造业调查于9/22 08:30 ET发布，本企业活动指数从−8.2升至0.3，地区活动指数从−10.6降至−22.0，支付价格指数从29.2升至37.8；样本采集9/7–17。它提供增长／成本背景，未提供市场共识差，也不能识别当日价格或IV变化的原因。[费城联储调查](https://www.philadelphiafed.org/surveys-and-data/regional-economic-analysis/nbos-2026-09)。

2. **国债市场会议侧重实施与流动性机制。** Williams讨论有效利率控制、准备金机会成本及供给弹性；Jefferson讨论贴现窗口操作、自动化与抵押品协作。两段安排在10:05及10:20 ET，属于16:00快照之前的日期背景；未核实精确网页上网时间，不据此推断新增利率路径指引或量化因果贡献。[Williams](https://www.newyorkfed.org/newsevents/speeches/2026/wil260922)、[Jefferson](https://www.federalreserve.gov/newsevents/speech/jefferson20260922a.htm)、[会议议程](https://www.newyorkfed.org/newsevents/events/markets/2026/0922-2026)。

3. **收盘后准备金管理背景。** Perli解释近期准备金管理购买（RMP）节奏降至零，涉及年末TGA预期下降和准备金预测上升。其安排为16:25 ET，晚于期权报价锚；精确上网时点未核，仅作日期背景。不能用它解释16:00 IV回落，也不将购买节奏调整直接等同QE或政策转向。[Perli讲话](https://www.newyorkfed.org/newsevents/speeches/2026/per260922)。

| 未来常规交易日／ET | 安排 | 本计划处理 |
| --- | --- | --- |
| 9/23 08:30 | NFCI，参考期截至9/18 | monitoring_only；有实际重大冲击才重置 |
| 9/23，官方精确时刻待核 | 美国Flash PMI；S&P Global已说明日期为9/23 | hard_reset是报告假设；须确认实际公布、内容与报价刷新，不能假设某时刻已过便放行 |
| 9/23 10:05起 | Barr：Economic Outlook and Housing，含fireside chat | hard_reset；实际讲话及问答结束后才开始重建；不凭会议日程推定实际结束 |
| 9/24 08:30；10:00；11:30；14:00 | 初请／芝加哥劳动力指标；EHI／新屋销售；WEI；SCOOS | 目标日退出后的风险，不授权因到期日较远而隔夜 |
| 9/25 08:30；10:00；12:45 | 耐用品订单；密歇根调查终值；NY Fed Staff Nowcast | 第三个常规交易日的背景；本月GDP／PCE日历为9/30，不写成9/25 |

日期与时间来自[S&P Global展望](https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/09/global-economic-outlook-september-2026)、[美联储9月日历](https://www.federalreserve.gov/newsevents/2026-september.htm)、[Barr活动议程](https://www.chicagofed.org/events/2026/housing-affordability-community-development-summit)、[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)和[芝加哥联储发布表](https://www.chicagofed.org/research/data/data-release-calendar)。PMI发布日历端点未能取得官方精确时刻，保留该缺口。**两项hard_reset属于本报告的入场窗口选择，不是对事件冲击方向／幅度的预测。** 包内event_light仅覆盖其事件分类，不能覆盖上述外部日历；截止时点未使用目标日结果或行情。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 共同存续signed温和增强，但全链gross激增不能等同新增多头

**Claim：** 共同存续signed温和增强，但全链gross激增不能等同新增多头。

**Evidence / basis：** 共同31期gross+220.222→+261.830B（+18.89%），signed+58.324→+66.755B；PM贡献97.24% signed净增。全链signed反由+92.426降至+91.208B。

**Mechanism / assumptions：** 共同集合控制期限迁入迁出，未控制spot、IV、aging、OI构成；IV下落及到期临近本身可抬高Gamma。正signed支持缓冲机制，不给方向概率。 替代解释包括IV、期限老化、OI构成与供应商模型变化。

**T+1 Implication：** 保留range_bias，边界释放必须live独立验证；不延用前期偏上先验。

**Falsifier：** 实际PM/新0DTE/局部结构转弱或节点迁移。

**Confidence：** medium；计算可复核，路径为mechanism_only，empirical_validation_status=not_tested。

### Thesis 2 — 旧7765峰退出，7750和7800的期限组成不同

**Claim：** 旧7765峰退出，7750和7800的期限组成不同。

**Evidence / basis：** 7765 all-selected +214.917百万/点，剔T0后+6.838；7750目标0DTE-1.905、更久+17.891；7800相应+7.789/+43.839。

**Mechanism / assumptions：** 近端7750与远期符号相反，不能称为无条件支撑；7775/7780目标日层为正，7800仍有较大更久正节点。 替代解释包括IV、期限老化、OI构成与供应商模型变化。

**T+1 Implication：** 核心7750–7780先观察；下破7750首查7725，上破7800首查7850；两侧无法做可靠概率排序。

**Falsifier：** 新0DTE推翻符号、边界移动超冻结容差，或第一复核点已被跳过。

**Confidence：** medium；计算可复核，路径为mechanism_only，empirical_validation_status=not_tested。

### Thesis 3 — ATM普遍回落，rolling smiles整体下移并变平

**Claim：** ATM普遍回落，rolling smiles整体下移并变平。

**Evidence / basis：** 30个共同ATM节点全部下降；fixed3/7/14/30/45D分别下降0.217/0.679/0.454/0.399/0.267vp。三个rolling槽位的skew25与BF25均下降，materiality未校准。

**Mechanism / assumptions：** Same-expiry包含aging与repricing，fixed来源也滚动；不能把普降识别成单一事件风险消退或sell-vol edge。 替代解释包括IV、期限老化、OI构成与供应商模型变化。

**T+1 Implication：** 默认9/24目标1DTE方向模板；该到期正式wing节点缺失，使Base iron fly/condor的required-IV gate=fail，仅保留重筛协议。

**Falsifier：** 实际候选wing/MTM不足或事件后surface重排。

**Confidence：** low；计算可复核，路径为mechanism_only，empirical_validation_status=not_tested。

## 7. Conflicting Evidence, Confidence and What Changes the View

| 支持区间观察 | 削弱因素 | 处理 |
| --- | --- | --- |
| 正存续signed与IV普降 | 7750目标0DTE为负；降IV／aging可机械抬Gamma | 不将signed增量解释成新增多头；下侧需新地图确认 |
| 7775／7780近端和7800更久节点为正 | 7765旧峰已过期；selected覆盖不全 | 使用节点作为复核位置；不声称价格吸引或必守 |
| range_bias使铁蝶／铁鹰有结构相关性 | 实际候选expiry的正式wings缺失，净盈利区域未证实 | family-specific IV gate失败，Base none；不能因波动下降强行卖波动 |
| 可以定义两侧释放及有限最大损失 | 事件后价格、IV、成本与路径速度可能消除吸引力 | B级条件计划；edge未建立，live净值与风险必须独立通过 |

结构confidence=medium、IV动态解释confidence=low；两者均不是胜率。path_asymmetry_status=undetermined：下侧存在近远期符号分歧，上侧存在正节点减速，两侧证据不足以可靠排序。边界外价格接受、独立signed层确认或节点明显迁移会改变路径；仅在区间内多停留几根bar，不会自动补齐卖方策略的IV和定价证据。

## 8. IV Term Structure, Skew and Surface 

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09/23 | τ2.000→1.000天 | 9.299% | -1.896vp；same_expiry_atm | 目标0DTE／事件窗口；PM | k0局部总方差插值；观测包围；confidence=0.991；partial |
| 09/24 | τ3.000→2.000天 | 10.107% | -0.900vp；same_expiry_atm | 默认候选，目标1DTE／前3D源；PM | k0局部总方差插值；观测包围；confidence=0.991；partial |
| 09/25 | τ4.000→3.000天 | 10.791% | -0.719vp；same_expiry_atm | 当前3D源／2DTE比较；PM | k0局部总方差插值；观测包围；confidence=0.990；partial |
| 09/28 | τ7.000→6.000天 | 9.014% | -0.986vp；same_expiry_atm | 前7D源；PM | k0局部总方差插值；观测包围；confidence=0.991；partial |
| 09/29 | τ8.000→7.000天 | 9.321% | -0.663vp；same_expiry_atm | 当前7D源；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 09/30 | τ9.000→8.000天 | 10.410% | -0.097vp；same_expiry_atm | EOM重点到期；PM | k0局部总方差插值；观测包围；confidence=0.992；partial |
| 10/05 | τ14.000→13.000天 | 9.862% | -0.633vp；same_expiry_atm | 前14D源；PM | k0局部总方差插值；观测包围；confidence=0.991；partial |
| 10/06 | τ15.000→14.000天 | 10.041% | -0.615vp；same_expiry_atm | 当前14D源；PM | k0局部总方差插值；观测包围；confidence=0.992；partial |
| 10/16 | τ25.000→24.000天 | 11.210% | -0.568vp；same_expiry_atm | 重点mixed到期的PM层；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 10/21 | τ30.000→29.000天 | 11.268% | -0.519vp；same_expiry_atm | 前30D源；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 10/22 | τ31.000→30.000天 | 11.389% | -0.530vp；same_expiry_atm | 当前30D源；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 11/04 | τ44.042→43.042天 | 12.417% | -0.377vp；same_expiry_atm | 前45D下端；PM | k0局部总方差插值；观测包围；confidence=0.990；partial |
| 11/06 | τ46.042→45.042天 | 12.617% | -0.359vp；same_expiry_atm | 前45D上端／当前45D源；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 11/20 | τ59.042天 | 12.951% | unavailable；prior_node_unavailable | 本期有ATM，前期ATM缺失；PM | k0局部总方差插值；观测包围；confidence=0.996；partial |
| 3D fixed | 3→3天 | 10.791% | -0.217vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:09/24–09/24(τ3.000–3.000,w=0.000000)；T:09/25–09/25(τ3.000–3.000,w=0.000000)；observed，无外推；confidence=0.990；partial |
| 7D fixed | 7→7天 | 9.321% | -0.679vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:09/28–09/28(τ7.000–7.000,w=0.000000)；T:09/29–09/29(τ7.000–7.000,w=0.000000)；observed，无外推；confidence=0.993；partial |
| 14D fixed | 14→14天 | 10.041% | -0.454vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:10/05–10/05(τ14.000–14.000,w=0.000000)；T:10/06–10/06(τ14.000–14.000,w=0.000000)；observed，无外推；confidence=0.992；partial |
| 30D fixed | 30→30天 | 11.389% | -0.399vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:10/21–10/21(τ30.000–30.000,w=0.000000)；T:10/22–10/22(τ30.000–30.000,w=0.000000)；observed，无外推；confidence=0.994；partial |
| 45D fixed | 45→45天 | 12.617% | -0.267vp；fixed_tenor_atm | 同一PM范围；固定期限槽位 | P:11/04–11/06(τ44.042–46.042,w=0.479167)；T:11/06–11/06(τ45.042–45.042,w=0.000000)；observed，无外推；confidence=0.993；partial |

**形状与可比性。** 形状、差值与下文skew／BF均为report-layer calculation from packet nodes。曲线mixed：3D高于7／14D，后部向30／45D抬升；3D−30D=-0.598vp、7D−30D=-2.068vp、14D−30D=-1.348vp、45D−30D=+1.228vp。9/23的ATM9.299%低于9/24的10.107%及9/25的10.791%，没有证据将它分解成PMI／Barr单独的事件方差；9/28低谷也含周末及期限组成。

30个共同exact ATM全部下降，fixed五个槽位亦下降，方向一致仍不意味着纯repricing。3D源9/24→9/25的变化为−0.217vp，而9/24及9/25同到期分别为−0.900／−0.719vp；7D源9/28→9/29，对应两合约各自变化−0.986／−0.663vp。14D和30D源分别10/5→10/6、10/21→10/22，其same-expiry对照见表。45D前日按总方差在11/4与11/6插值，本日packet把实际τ45.041667的11/6标作observed、w=0；保留DST与节点匹配差，不在报告层强制改造为τ45.000000。新10/29 ATM为12.363%，与11/20一样无前期主范围ATM，不补造变化。Same-expiry包含aging与repricing；T0从正τ曲线剔除，目标日IV仍未观察到。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T:09/29／7D | 12.585% | 10.598% | 9.321% | 8.619% | 8.253% | 1.979vp | 0.288vp | forward delta局部插值；观测包围；confidence0.965–0.993；degraded_local_evidence |
| Δ P:09/28(τ7)→T:09/29(τ7) | -1.146vp | -0.795vp | -0.679vp | -0.653vp | -0.730vp | -0.142vp | -0.045vp | rolling_tenor_slot_fixed_delta；同scope／selection contract；降级局部证据；materiality=indeterminate_within_uncertainty |
| T:10/06／14D | 13.636% | 11.316% | 10.041% | 9.502% | 9.485% | 1.814vp | 0.368vp | forward delta局部插值；观测包围；confidence0.958–0.992；degraded_local_evidence |
| Δ P:10/05(τ14)→T:10/06(τ14) | -0.875vp | -0.537vp | -0.454vp | -0.489vp | -0.560vp | -0.048vp | -0.059vp | rolling_tenor_slot_fixed_delta；同scope／selection contract；降级局部证据；materiality=indeterminate_within_uncertainty |
| T:10/22／30D | 16.724% | 13.300% | 11.389% | 10.516% | 10.359% | 2.785vp | 0.519vp | forward delta局部插值；观测包围；confidence0.964–0.994；degraded_local_evidence |
| Δ P:10/21(τ30)→T:10/22(τ30) | -0.745vp | -0.494vp | -0.399vp | -0.374vp | -0.485vp | -0.120vp | -0.035vp | rolling_tenor_slot_fixed_delta；同scope／selection contract；降级局部证据；materiality=indeterminate_within_uncertainty |

**Level／slope／curvature。** 三个槽位的ATM level均下降，25Δ downside skew均变平，BF25均降低；不是仅看一个skew scalar。Skew25＝IV25put−IV25call，BF25＝(IV25put＋IV25call)/2−ATM，wing premium＝对应wing−ATM。7D put-wing 1.277vp（Δ-0.116），call-wing -0.702vp（Δ+0.026）；14D put-wing 1.275vp（Δ-0.083），call-wing -0.539vp（Δ-0.035）；30D put-wing 1.912vp（Δ-0.095），call-wing -0.873vp（Δ+0.025）。报价误差与统计显著性没有校准，不将这些差值称为已建立相对价值。

Skew期限梯度14D−7D由-0.259变为-0.165vp，30D−14D由+1.043变为+0.970vp。比较保留forward_delta_non_premium_adjusted及观测支持内插值，三个expiry均滚动；不是原生fixed-tenor smile，也不是9/23 live变化。

**对family与期限的实质影响。** 方向型debit vertical在EOD只把IV作为背景，IV gate=not_applicable不免除live估值；默认9/24、目标日1DTE，用9/23与9/25检查Gamma／Theta与持有窗敏感性。Base的铁蝶／铁鹰需要实际候选双侧wing、中心区间和退出MTM，9/24正式selected smile缺失，因此required-IV gate=fail，不能借用9/29的7D曲线。主范围可比ATM IV下降既不证明买方便宜，也不证明卖方有优势。正式fixed30D与滞后RV20相差约0.998vp，窗口和时点不同，不解释为可获取的variance risk premium。

## 9. Key Expiry / Strike / Dealer Node

期限表单位为**十亿美元／SPX变动1%**；gross GEX是规模，signed按call−put约定构造。下面只对canonical COMBINED行汇总；AM／PM分行用于解释，不能再加一次。

| Expiry / family | Role | T DTE→目标DTE | Gross GEX | Signed GEX | Vendor OI |
| --- | --- | --- | --- | --- | --- |
| 09/22 / COMBINED | 全链最大gross，但已到期 | 0→-1 | +79.325 | +24.453 | 350,367 |
| 09/23 / COMBINED | 目标0DTE，需重建 | 1→0 | +22.260 | +11.586 | 178,480 |
| 09/24 / COMBINED | 默认候选 | 2→1 | +11.307 | +5.766 | 108,624 |
| 09/25 / COMBINED | 2DTE敏感性 | 3→2 | +28.397 | +10.569 | 579,363 |
| 09/30 / COMBINED | EOM／共同selected | 8→7 | +32.367 | +10.716 | 946,464 |
| 10/16 / COMBINED | 最大存续gross／mixed | 24→23 | +73.088 | +9.017 | 2,606,964 |
| 10/16 / SPX | AM拆分 | 24→23 | +65.895 | +7.257 | 2,273,461 |
| 10/16 / SPXW | PM拆分 | 24→23 | +7.193 | +1.760 | 333,503 |
| 11/20 / COMBINED | 远端存续 | 59→58 | +29.241 | +1.125 | 1,380,045 |

全链gross341.154B、signed+91.208B；T0 gross79.325B占23.25%。剔T0后gross261.830B、signed+66.755B；再剔9/23后gross239.569B、signed+55.169B。10/16为最大存续gross，占存续27.91%；9/23占存续gross8.50%，局部仍可能占主导。新10/29在期限表的OI／GEX均为0；新增ATM节点不等于新增敞口。

各自剔当日T0的signed由前期+66.989B变为本期+66.755B，但该比较包含前期9/22、排除了本期9/22；共同31期统一取expiration>9/22后才得到+58.324→+66.755B。两者回答不同问题，不能选其中一个代替另一个。

节点表单位为**百万美元／SPX点**。原gamma表按1%幅度统计，本期已除以0.01×7764.83转换为每点；前日按各自spot换算。XSP位置只是SPX÷10，尚不是目标日选腿。

| SPX / XSP位置 | 作用 | T0 signed | 目标0DTE signed | 9/23后 signed | 剔T0合计 signed |
| --- | --- | --- | --- | --- | --- |
| 7700 / 770.0 | 下侧第二复核 | -0.946 | -1.677 | -7.102 | -8.779 |
| 7725 / 772.5 | 下侧第一复核 | -1.366 | +3.573 | +3.924 | +7.496 |
| 7750 / 775.0 | 下侧确认边界；近端负/更久正 | -9.197 | -1.905 | +17.891 | +15.985 |
| 7755 / 775.5 | 目标日正节点 | +33.781 | +3.373 | +1.034 | +4.407 |
| 7760 / 776.0 | 目标日正节点 | +69.125 | +8.063 | +2.304 | +10.367 |
| 7765 / 776.5 | T0旧峰；不得沿用pin | +208.079 | +5.089 | +1.749 | +6.838 |
| 7770 / 777.0 | 目标日正节点 | -1.154 | +8.277 | +4.150 | +12.427 |
| 7775 / 777.5 | 目标0DTE较强正节点 | +3.697 | +21.151 | +3.280 | +24.431 |
| 7780 / 778.0 | 核心上沿；待实时重建 | +5.397 | +16.484 | +1.221 | +17.705 |
| 7800 / 780.0 | 上侧确认边界；更久正节点 | +1.805 | +7.789 | +43.839 | +51.628 |
| 7850 / 785.0 | 上侧第一复核 | +0.478 | +5.748 | +24.214 | +29.962 |
| 7900 / 790.0 | 上侧第二复核 | +0.624 | +0.593 | +50.856 | +51.449 |
| 8000 / 800.0 | 较远gross与signed含义分开 | -0.000 | +0.302 | +30.428 | +30.730 |

Current selected为9/22、9/23、9/30、10/16；本表更久层与跨日共同比较使用9/30＋10/16。Selected存续gross覆盖全存续48.78%，剔目标0DTE后44.02%；局部符号不外推到未覆盖部分。Market-context另有9/23迁移摘要，不将其与完整共同selected图混用。7765总峰96.82%属于已到期层，包内pin提示不拥有跨日权限；未计算或声称Gamma flip。

| Greek／范围 | 本期值或共同集合变化 | 解释边界 |
| --- | --- | --- |
| DEX／共同31期 | 447.430→448.982B美元；本期存续448.982B | sum(delta×S×100×OI)，状态敞口；不是净买入额 |
| Vanna／共同31期 | −2.034→−2.153B；本期AM+0.885B／PM−3.038B | σ±0.005的DEX差，合计1个vol-point有限差分；AM／PM相抵 |
| Charm／共同31期 | +4.026→+2.727B；目标9/23层−0.795B | 固定spot／IV的下一交易日模型参考变化，不是确定对冲流 |
| VEX／Volga | 全链VEX2.026333B；存续Volga14.113675B原生数值 | 前者使用vendor vega，后者为原生BS-vega敞口有限差；不能直接同量纲比较 |

高阶模型采用ACT/365，Vanna／Volga用σ上、下各0.005；Charm推进到下一交易日参考时点，PM16:00、AM17:00。AM到期采用前一交易日17:00的计算代理，不等于官方AM结算时间。T0不符合高阶资格，相关值保留null而非0。Volga中的BS vega按单位小数波动率计且未乘0.01，vendor vega单位未独立验证；原生幅度不解释成“IV升1点的现金损益”。

## 10. T+1 Decision Map, Structural View and Plan Grade

**结构与计划等级。** Primary regime为正存续signed Gamma、较低IV下的区间观察；directional_prior=range_bias，path_asymmetry_status=undetermined，structural_confidence=medium，path_confidence_basis=mechanism_only。Base没有合格策略；Risk保留双侧边界释放。Plan Grade／Status为B／Conditional Next-Day Plan，Execution Status为requires_external_live_source，quote_portability=none。基础formal与有界风险路径成立，因此并非C；Base所需IV及候选估值缺口仍重要，因此不升A。两个方向family的pricing_assessment均为pending_live_repricing，edge_evidence_status=not_established。

| 状态 | 所需确认／condition_id | 计划与失效 |
| --- | --- | --- |
| 事件窗口／reset未完成 | O_RESET：实际PMI公布并审核，Barr讲话及问答实际结束；刷新并冻结所有必要参数，t0为之后下一个完整5m起点 | event_dependent；方向最早t0+10分钟，range研究最早t0+15分钟，不能凭时钟自动放行 |
| 开盘在7750–7780核心 | 尚无方向外侧接受；O_RANGE只启动稳定性复核 | observe only；Base所需wing gate失败，不能直接构造卖方；中心／边界变化则重置 |
| 走廊内、核心外：7780–7800 | 不足以确认7800释放；仍需O_UP及signed门禁 | 上侧缓冲区；不把接近边界当已突破，也不当成卖方盈利区 |
| 隔夜gap／重定价后 | O_CONFIG／O_NODE／O_VOL：spot／forward、地图、IV、选腿重新建立 | 原EOD状态失去价格权限；重选后重新开始完整bar |
| confirmed downside release | O_DOWN：两根close<7750；O_SIGN_DOWN：7750–7725局部PM及新9/23PM0DTE signed<0，PM总量和剔目标0DTE总量均低于事件后冻结基准 | F_PUT→7725首查；7700须另估值。O_RECLAIM或弱化消失则失效 |
| confirmed upside release | O_UP：两根close>7800；O_SIGN_UP：PM及剔9/23后全链signed非负，7800–7850局部PM及新9/23PM0DTE signed>0 | F_CALL→7850首查；7900须另估值。O_REJECT或正向层消失则失效 |
| gap above7800／below7750 | O_GAP_UP／O_GAP_DOWN：先有覆盖原边界的回测bar，再从其后完整bar重计接受 | 无回测不追；首个可评估价已到7850／7725或越过所选short strike，取消对应候选 |
| post-event range reconfirmed | O_RANGE：3根完整close在预冻结核心，中心稳定无shock；候选wing gate新通过；spot／forward及完整中心不确定区间在成本后scenario盈利区域内，留正buffer | 只进入iron fly／condor重新筛选；当前Base none不被自动撤销。profit-region失配即停止研究 |
| range thesis failure / boundary release | 边界释放、中心漂移或盈利区域失配 | 不自动反手；分别从零核对上下分支 |
| vol shock／node migration | O_VOL：15分钟VIX+1点或候选ATM+2vp；O_NODE：变化超事前数值容差或地图过期 | 清零bar与候选排名，刷新后重新冻结；原确认不能复用 |
| all gates pass | 只有一个Risk分支成立，且报价／IV／MTM／预算／时钟／能力均已核实 | 执行状态方可进入eligible_for_manual_evaluation；仍由人工决定 |
| any execution gate fails | 必要数据、数值配置、目标净值、预算或时间窗任一缺失／失败 | No Trade；真实执行失败与EOD Plan Grade分开 |

**观察定义。** Acceptance只计t0后的两根完整5分钟close，严格在边界外；bar延迟≤30秒。O_REJECT／O_RECLAIM为取消信号：一根close回到7800下方／7750上方（含等号），下一根未再收于相应外侧；硬风险可更早退出。取消信号的缺席不替代激活条件。两根接受bar终点均需核对独立signed层；下行只要求远期总量较冻结基准转弱，不要求所有远月都变负。

| 实时来源／condition_id | 观察窗口／新鲜度 | 能力状态与规则 |
| --- | --- | --- |
| 官方结果／实际活动结束／O_RESET、O_CAL、O_TIME | 两项事件实际完成并审核；重建后下个完整ET 5m起点 | external_required；日程不证明实际结束；最晚15:00入场、15:30或更早退出 |
| 实时SPX bar／O_UP、O_DOWN、O_GAP_UP、O_GAP_DOWN、O_REJECT、O_RECLAIM | 2根接受；1+1根取消；延迟≤30秒 | external_required；不能用EOD收盘代替 |
| 同口径PM／新0DTE／存续／局部图／O_SIGN_UP、O_SIGN_DOWN、O_NODE | 接受bar终点分别检查；地图年龄≤300秒 | external_required；300秒是报告假设，缺模型不采用price-only fallback |
| 实时VIX与候选ATM／25Δ／相关wings／O_VOL、O_SURFACE | 输入≤30秒，shock窗口15分钟 | external_required；不能使用9/21的VIX或其他expiry补翼 |
| 实时同步报价、独立carry／forward／O_QUOTES、O_MAPPING | 年龄≤30秒；正mid时spread/mid≤25% | external_required；数值mapping／parity／时差／绝对宽度容差须在t0前冻结 |
| live估值及退出折价／O_VALUE、O_RANGE | 15／30／60分钟，四种退出情景；相关输入≤30秒 | external_required；净目标值、费用和正buffer不能留空 |
| 经纪商、账户与配置／O_BROKER、O_RISK、O_CONFIG | t0前签认；持仓、费用或事件变动后刷新 | external_required；原子net-limit、实际N/L/H/C_N和数字容差待核实 |

上下分支的earliest_evaluation均为event_dependent；两事件完成、刷新并冻结之后才开始两根bar。若最晚入场前无法得到完整确认或不足30分钟最低持有窗，取消当天新增。当前所有live能力未核实；表中的时间、宽度和风险门槛是操作约束，不是经验证的alpha参数。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Family／scenario | Payoff archetype | Structural fit | IV dependency／gate | Pricing／execution | Status／原因 |
| --- | --- | --- | --- | --- | --- |
| Call debit vertical／risk_boundary_up | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：7800上方接受及独立正向层确认后才研究；7850只是首复核，净值须足够。 |
| Put debit vertical／risk_boundary_down | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：7750下方接受、局部/新0DTE负及PM/存续较冻结基准转弱；7725先复核。 |
| Defined-risk iron butterfly／base_case | centered_stability | range_relevant_unconfirmed | required／fail | unavailable／external_required | not_screenable：候选9/24正式ATM可得，但该expiry selected smile/25Δ/wing缺失；required-IV gate失败，不能用7D smile代替。中心不确定区间与成本后MTM另待live。 |
| Defined-risk iron condor／base_case | broad_bounded_range | range_relevant_unconfirmed | required／fail | unavailable／external_required | not_screenable：独立宽区间家族亦缺候选期限双侧wing；上下边界及净credit/盈利区域未完成，不能由range_bias直接升级。 |
| Broken-wing butterfly／risk_targeted | directional_continuation | not_established | required／fail | unavailable／external_required | reject：首复核位不是已证明收敛终点，且候选wing与不对称尾部估值缺失。 |
| Straddle / strangle／alternative_vol | two_sided_expansion | not_established | required／fail | unavailable／external_required | not_screenable：无候选期权双侧wing与事件后幅度估值，无法证明路径覆盖双边premium/Theta/成本。 |
| Calendar / diagonal／alternative_term | term_or_vol_relative_value | not_established | required／fail | unavailable／external_required | not_screenable：near/back候选wing和跨期限情景估值缺失；ATM下降不能建立calendar相对价值。 |
| Long outright option／risk_alternative | directional_continuation | not_established | background_only／not_applicable | unavailable／external_required | reject：有界价差控制premium支出但封顶收益；未证明优于单腿，当前不增设额外卡。 |

所有family的edge_evidence_status均为not_established。**Base Candidate Template：none，branches=[]，基准情景无合格策略。** 铁蝶与铁鹰分别筛选，required-IV失败具体指候选到期的必要wing节点缺失，不是把整个partial曲面判成全局不可用。保留方向价差的EOD IV gate=not_applicable仅限背景筛选；其live ATM／wings／Greeks／MTM仍须齐备。

### Local Candidate Comparison

| Family | EOD局部网格 | T+1使用方式 |
| --- | --- | --- |
| Call vertical | 9/23、24、25 × long779/780/781 × width3/5＝18 | 围绕live7800边界映射重建相邻±1 strike |
| Put vertical | 相同3期 × long774/775/776 × width3/5＝18 | 围绕live7750边界重建 |
| Iron butterfly | 相同3期 × center775/776/777 × widths(3,3)/(5,5)/(3,5)/(5,3)＝36 | 同body短put/call、两侧长wing；中心依据live spot/forward重设 |
| Iron condor | 相同3期及center，短put=center−1、短call=center+1 ×同4种wing pairs＝36 | 独立检查宽区间；不以铁蝶结果替代 |

108组均为诊断、winner=null、comparison=deferred_to_t1。目标日先通过该family必要IV门禁，再重新生成同类邻域，比较实际wing价差、净Greeks、保守退出MTM、尾部、费用与流动性；只对通过共同门禁的候选按保守净目标值排序，报价／tick／成本误差内的差异保持indeterminate。Range还须评估中心区间、core两端、确认边界及vol-shock情景，不能仅检查到期breakeven。9/24是默认1DTE，9/23的0DTE和9/25的2DTE只是敏感性；9/28、29在目标日分别5、6个日历DTE，超出默认1–3DTE窗口，未排序不等于劣质。

### Risk-Path Contingency — 一张卡，两个互斥分支

**设置：** boundary-release，payoff_archetype=directional_continuation，screening_status=conditional，Plan Grade=B；仅保留put debit vertical或call debit vertical中的一个。默认9/24到期、9/23事件后日内持有；目标日1个日历DTE，非持有到期。Live long取已验证边界映射附近及相邻±1 strike，short沿方向距3或5点、比例1:1；根据净目标价值重选宽度。当前live_selected_legs、实际N和价格上限均pending。

| 互斥分支 | Activation／invalidation | 第一／后续复核 | Expiry／wing／路径 |
| --- | --- | --- | --- |
| 下侧F_PUT | O_DOWN＋O_SIGN_DOWN＋O_GAP_DOWN及共同门禁；O_RECLAIM不存在。入场前任何缺口取消；入场后收复确认或弱化消失失效 | 7725／7700，后者须重估 | 默认9/24；long映射7750、向下short；慢跌、IV／Theta及费用可能侵蚀收益 |
| 上侧F_CALL | O_UP＋O_SIGN_UP＋O_GAP_UP及共同门禁；O_REJECT不存在。入场前任何缺口取消；入场后拒绝确认或正向层消失失效 | 7850／7900，后者须重估 | 默认9/24；long映射7800、向上short；正Gamma节点可能减速 |

**唯一一处逐腿EOD诊断。** 两个分支各一行，都是9/22 16:00 ET、XSP776.46状态的示例；debit以客户支付为正。组合synthetic_only、binding=false，不是9/23的expected entry。

| 分支／illustrative EOD全腿 | 组合bid/mid/ask／权限 | 成本敏感性与到期payoff | 历史净Greeks／映射 |
| --- | --- | --- | --- |
| F_PUT；buy 1× XSP260924P00775000（put K=775，bid/mid/ask 1.490/1.510/1.530，IV 9.550%）；sell 1× XSP260924P00770000（put K=770，bid/mid/ask 0.480/0.495/0.510，IV 10.980%） | 0.980/1.015/1.050 XSP点；diagnostics_only；synthetic_only | 按历史ask；N=1 unit_payoff_example；C=$6：ML=$111、净MP=$389、BE=773.890；C=$16：ML=$121、净MP=$379、BE=773.790 | delta=-0.2377、gamma=+0.0335、vega=+0.0881、theta=-0.1458；long775→SPX7750；取整差0，与spot残差−0.023不同 |
| F_CALL；buy 1× XSP260924C00780000（call K=780，bid/mid/ask 0.930/0.940/0.950，IV 9.860%）；sell 1× XSP260924C00785000（call K=785，bid/mid/ask 0.190/0.205/0.220，IV 10.150%） | 0.710/0.735/0.760 XSP点；diagnostics_only；synthetic_only | 按历史ask；N=1 unit_payoff_example；C=$6：ML=$82、净MP=$418、BE=780.820；C=$16：ML=$92、净MP=$408、BE=780.920 | delta=+0.1998、gamma=+0.0344、vega=+0.1093、theta=-0.2801；long780→SPX7800；取整差0，与spot残差−0.023不同 |

上行到期净利润区为XSP>K_long+d+C_N/(100N)，下行为XSP<K_long−d−C_N/(100N)；两端最大亏损均为100Nd+C_N，前提是完整价差保持且成本上界有效。此处BE与MP描述9/24到期，不是9/23计划退出MTM；第一复核位不保证盈利，跳空时也不保证止损成交价格。方向family不做“当前spot必须位于未来盈利区域”测试，而要通过目标／反向／失效／计划退出四情景净值。

**IV、Greeks、退出与优劣。** 两个历史例子的Gamma／Vega为正、Theta为负，Delta随方向；live符号与幅度必须逐腿重算，不能沿用历史敏感度。候选9/24未入正式selected smile，事件后取得自身ATM／25Δ／wing与情景MTM。短腿降低premium但封顶上涨／下跌路径的收益，是否优于单腿由live净目标值决定。任何reset、追价越short／首节点、必要能力缺失、净值不足、预算耗尽或时间不足均取消新增；持仓失效或风险上限先触发则退出。Time stop=min(entry+60分钟，适用退出截止)，每组及总日内风险按上式，禁止未经授权隔夜。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

正存续signed与IV普降支持事件后先观察核心区间，但没有合格Base策略。若重新取得候选到期正式／合格live IV节点，再完成O_RANGE的稳定性、中心区间与净盈利区域测试，才可重开铁蝶／铁鹰筛选；仅价格留在核心并不足够。边界释放或中心迁移会削弱区间先验。

### Risk Case

两个边界分支按第10节的完整条件互斥评估：下侧关注7750→7725，上侧关注7800→7850。前者需独立近端负向与总体转弱，后者需独立正向层和价格接受；两条路径都不能由另一条失败自动激活。第一节点仅用于重新估值，延伸至7700或7900须新的结构与净值支持。

### Scenario Valuation — 四情景闭合

| Branch | Scenario | Spot假设 | 时间假设 | 估值状态 |
| --- | --- | --- | --- | --- |
| Risk put | target | XSP772.5／SPX7725 | 30min after actual entry | pending；净PnL=null；probability=null |
| Risk put | adverse | XSP780.0／SPX7800 | 15–30min after entry | pending；净PnL=null；probability=null |
| Risk put | invalidation | XSP775.0／SPX7750 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Risk put | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |
| Risk call | target | XSP785.0／SPX7850 | 30min after actual entry | pending；净PnL=null；probability=null |
| Risk call | adverse | XSP775.0／SPX7750 | 15–30min after entry | pending；净PnL=null；probability=null |
| Risk call | invalidation | XSP780.0／SPX7800 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Risk call | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |

Target按实际入场后30分钟估值，同时做15／60分钟敏感性；ATM至少不变及±2vp，并加入不利wing／skew变化。表中spot和时间是情景假设，不是必达预测。必须记录实际模型／版本、估值与退出时间、spot／forward／利率、同expiry ATM及两腿IV、N、入场debit、退出清算折价和全部成本。尚无这些live输入，八行情景都不生成价值、PnL或P测度概率；不能以到期intrinsic替代周三退出MTM，也没有正EV结论。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

1. **边界外完整bar与回测。** 观察7750／7800接受及7725／7850首节点；改变Risk路径资格，不等于自动盈利。
2. **新9/23PM0DTE与更久层。** 重点核对7750期限符号分歧、7775／7780及7800迁移；改变结构先验，超容差即reset。
3. **PMI实际公布与Barr讲话／问答实际完成。** 决定何时可建立t0；尚未完成则执行状态不能放行。
4. **实际候选ATM、25Δ、相关wings与VIX15分钟变化。** 决定family资格及vol reset；滞后VIX不参与live shock判断。
5. **目标清算MTM、净组合价、费用与剩余预算／时钟。** 决定真实限价与是否仍有可行持有窗；不足则取消，无须改写历史结构。


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
