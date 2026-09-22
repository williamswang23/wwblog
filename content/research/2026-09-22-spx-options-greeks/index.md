+++
title = "SPX期权持仓与Greeks结构分析-260921"
date = "2026-09-22"
data_as_of = ["2026-09-18", "2026-09-21"]
draft = false
description = "分析9月21日存续PM结构修复、期限与偏斜变化，以及下一交易日的条件式路径。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "0108d5f6ec043e86d86f4e86a0c9e29e228c562f9e9a9628bf9e4b3b5ef14179"
+++

# SPX期权持仓与Greeks结构分析-260921

## 1. 结论

9月21日存续PM结构由负向转为正向，次日采用**偏上修复、确认后延续（upside_bias）**的机制性先验，但7765主要是已到期峰，须等待官员讲话后重建并确认7775上方接受，盘后条件计划为 **B / Conditional Next-Day Plan**、执行状态为 **requires_external_live_source**，不构成实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | 偏上修复（upside_bias），确认后延续；结构置信度medium，正Gamma仍可能在上方节点减速。 |
| Earliest evaluation | 9/22最早10:50 ET，仅为下界：10:05／10:20两段讲话实际结束后重建并冻结参数，再取得两根完整5分钟确认。 |
| Base activation | 若7775上方接受且PM／新0DTE／局部正向确认，则评估call debit vertical →首查7800 →重新拒绝7775或修复失效则取消。 |
| Downside branch | 若7750下方接受且局部／新0DTE转负、PM及存续总量较冻结基准转弱，则评估put debit vertical →首查7725 →收复7750则失效。 |
| Upside branch | 沿Base：若7775上方接受并通过事件后重建与正向结构门禁，则call debit vertical →7800；重新拒绝7775则取消。 |
| Otherwise | No Trade / observe only；7750–7775内先观察；15:00后不新入，15:30或更早限制前退出；实际重大冲击须重置。 |

Plan Grade / Plan Status：B / Conditional Next-Day Plan；Execution Status：requires_external_live_source；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- **存续结构的正向修复可以跨过周一到期层。** 剔除T日0DTE后signed GEX为+66.989B美元／1%变动，再剔9/22到期层仍为+58.324B；与周五剔到期后仍负不同。
- **共同期限修复主要来自PM。** 共同30期signed由−3.765B升至+66.151B，PM贡献95.49%的净改善；新纳入11/20只贡献+0.838B，不能把跨日变化全部归为新增远月。
- **7775以上评估上行，7750失守才评估反向。** 第一复核位分别为7800与7725。正Gamma可能在7800减速，方向成立仍不保证价差盈利；7750–7775仅为观察核心。
- **7765旧峰不再拥有跨日支撑权限。** 该位all-selected signed的98.23%来自9/21已到期层；durable判断转看7750、7800等存续节点，并保留selected地图覆盖不足的限制。
- **前端同到期IV升、固定7/14D降并不矛盾。** 两者包含不同期限组成；三个滚动smile的25Δ偏斜均变平，BF25一升两降。整体IV仍partial，只允许降级局部研究。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/18 | T：9/21 | Change / basis | T+1 relevance |
| --- | --- | --- | --- | --- |
| 结构价格代理 | 7649.29 | 7765.10 | +115.81点／+1.514%；raw链同口径 | 高于旧7700及后续7750复核位；重新定关键位 |
| 共同30个存续到期 | gross155.648；signed−3.765 | gross204.250；signed+66.151 | gross+31.226%；signed+69.917B美元／1% | 修复不是仅靠新增到期日 |
| 共同PM／AM | PM−7.941；AM+4.176 | PM+58.824；AM+7.327 | PM贡献95.49%的净改善 | 与前期AM主导改善不同，近端PM得到更多支持 |
| 共同selected局部 | 7750+13.270；7800+27.162；8000+84.852 | 7750+17.686；7800+40.334；8000+24.429 | 百万美元／SPX点；均限9/30＋10/16 | 近端修复、远端8000 signed回落，不能统称所有节点增强 |
| ATM与smile | fixed3D6.562%；9/24 exact9.691% | fixed3D11.007%；9/24 exact11.007% | fixed +4.445vp；same-expiry +1.316vp；两者不可互替 | 3D源由9/21换为9/24；固定7/14D分别−0.189/−0.237vp |
| 计划／事件窗口 | two_sided_fragility；low；周一11:00调查仅监测 | upside_bias；none；周二政策官员连续讲话后评估 | B→B；smile level两降一升、skew全降、BF一升两降 | 改变路径与报价权限；未把未来待确认写成EOD失败 |

**前期计划回顾。** 当前实际260918正文的Base为7625下破→7600，Risk为7675上破→7700，并要求周一日内退出。T日raw收盘代理7765.10已高于旧上行复核位，说明旧下破优先不宜直接延用；它不能证明盘中出现过两根5分钟接受、live结构门禁通过、实际成交或盈利。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

**当日新闻。** 纽约联储9/21发布的8月家庭支出调查显示，已报告的名义月支出同比增幅中位数从4月4.8%小幅降至4.7%，未来一年预期支出增幅中位数却从3.4%升至3.6%。这是“已报告支出略缓、未来支出预期回升”的调查背景，不是总消费增速或周一上涨的因果证明；没有共识差，不写“超预期”。[调查结果](https://www.newyorkfed.org/microeconomics/sce/household-spending)、[发布日期](https://www.newyorkfed.org/microeconomics)。官方日历计划11:00发布，精确上网时点未核实。

| 未来常规交易日／ET | 已知安排 | 与本计划的关系 |
| --- | --- | --- |
| 9/22 08:30；10:00 | 费城非制造业；里士满制造业及芝加哥CFSEC | 普通调查仅监测；实际重大冲击才reset |
| 9/22 10:05–10:20；10:20–10:40 | Williams、Jefferson在美国国债市场会议讲话 | 本报告将两段政策官员讲话设为相关hard-reset窗口，选择其后建仓；内容与实际结束时间仍未知 |
| 9/22 11:05起；16:25 | 财政部讲话、11:20 TGA回购投资讨论；Perli闭幕讲话 | 前者监測实际冲击；Perli在本计划退出后。会议存在不代表每一议题均阻断全天 |
| 9/23 08:30 | 芝加哥联储NFCI | 目标退出后的下一个常规交易日；选9/23到期不授权隔夜 |
| 9/24 08:30；10:00；11:30 | 初请及芝加哥劳动力指标；EHI与新屋销售；WEI | 第三个常规交易日的后续风险，均不包含在周二计划持有窗口内 |

日程已核对[纽约联储9月日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[芝加哥联储发布表](https://www.chicagofed.org/research/data/data-release-calendar)、[国债市场会议议程](https://www.newyorkfed.org/newsevents/events/markets/2026/0922-2026)及[Cboe时段与假期](https://www.cboe.com/about/hours/us-options)。**hard_reset是本报告针对利率敏感短期价差的风险假设，未断言讲话会改变政策。** 截止时点未使用任何周二讲话结果、GTH行情或后续新闻；日历检索不是全部突发消息与讲话的穷尽清单。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 修复主要来自存续PM，不能归因于新增远月

**Claim：** 修复主要来自存续PM，不能归因于新增远月。

**Evidence / basis：** 共同30期signed -3.765→+66.151B，gross增加31.23%；PM -7.941→+58.824B，贡献95.49%净改善。新增11/20只贡献+0.838B signed。（formal原生数据／报告层复算；事件安排由官方议程核对。）

**Mechanism / assumptions：** 同一到期集合的PM由负转正，与raw spot上移一起支持偏上修复；call−put只是dealer代理，正Gamma本身不预测涨跌。 替代解释包括价格、IV、老化与模型／持仓构成变化，并无真实dealer账簿。

**T+1 Implication：** 撤销旧下破优先，7775上方确认后研究上行价差。

**Falsifier：** PM/new0DTE/local修复不成立，或价格在7750下方接受。

**Confidence：** medium；路径为机制性推断，未做独立概率或收益校准。

### Thesis 2 — 7765旧峰退出后，重心看7750和7800

**Claim：** 7765旧峰退出后，重心看7750和7800。

**Evidence / basis：** 7765 all-selected signed +298.684百万/点，剔T0仅+5.281，再剔9/22仅+1.510；共同9/30+10/16的7750由+13.270升至+17.686，7800由+27.162升至+40.334。 

**Mechanism / assumptions：** 7765的pin主要随T0消失；7750/7800的存续正节点仍存在，可能缓冲或减速。局部正值不能识别价格吸引力或真实对冲流。 替代解释包括价格、IV、老化与模型／持仓构成变化，并无真实dealer账簿。

**T+1 Implication：** 7750–7775先观察；上破7775先在7800重估，下破7750先在7725重估。

**Falsifier：** 事件后节点迁移超过预先冻结容差，或目标0DTE正结构反转。

**Confidence：** medium；路径为机制性推断，未做独立概率或收益校准。

### Thesis 3 — 期限槽位与同到期IV给出不同信息

**Claim：** 期限槽位与同到期IV给出不同信息。

**Evidence / basis：** 9/22 exact ATM8.244%→13.525%（τ4→1），9/24 exact9.691%→11.007%；fixed3D6.562%→11.007%，但fixed7D/14D下降0.189/0.237vp。30个共同ATM有29个升、10/27降0.224vp；三个rolling smile的25Δskew均变平，BF25一升两降。（formal原生数据／报告层复算；事件安排由官方议程核对。）

**Mechanism / assumptions：** 3D源从9/21换为9/24，周末年化与事件期限组成均参与。Same-expiry包含roll-down+repricing；rolling smile不是固定期限纯重定价。 替代解释包括价格、IV、老化与模型／持仓构成变化，并无真实dealer账簿。

**T+1 Implication：** 默认研究9/23目标1DTE，以减少0DTE敏感性；实际候选IV/wing/MTM必须事件后刷新，不据此宣称便宜或卖波动。

**Falsifier：** 实际候选期限的IV/wing支持或目标情景价值不足；curve quality无法支撑所需节点。

**Confidence：** low；路径为机制性推断，未做独立概率或收益校准。



## 7. Conflicting Evidence, Confidence and What Changes the View

| 支持Base的证据 | 反证或削弱因素 | 处理方式 |
| --- | --- | --- |
| 共同PM signed转正，7750/7800存续节点增强 | 正Gamma也可能压低波幅，7800形成减速区 | 只在7775上方接受后研究；7800首查MTM，不把最大到期收益当首目标收益 |
| Raw价格已上移至旧7750以上 | 7765最大峰98.23%到期退出；selected覆盖有限 | 弃用旧pin，target0DTE与完整PM须独立重建 |
| 候选价差可以封顶损失，EOD构造可核算 | 前端IV抬升、讲话后重定价及成本会侵蚀收益 | none权限下重选腿，目标净清算值不足就不交易 |

结构置信度为medium，IV动态解释为low；两者均非涨跌概率。若7750下方被接受、局部及新0DTE转负且PM／存续总量较事件后冻结基准下降，则转入独立Risk评估；若只是未上破7775，结论仍是观察。任何节点／IV冲击先重置，不能把“原分支失败”直接变成另一分支成立。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09/22 | τ4.000→1.000天 | 13.525% | +5.281vp；same_expiry_atm | 目标0DTE／讲话窗口；PM | k0局部总方差插值；观测包围；confidence=0.986；partial |
| 09/23 | τ5.000→2.000天 | 11.195% | +2.301vp；same_expiry_atm | 默认候选：目标1DTE；PM | k0局部总方差插值；观测包围；confidence=0.987；partial |
| 09/24 | τ6.000→3.000天 | 11.007% | +1.316vp；same_expiry_atm | fixed3D源／敏感性候选；PM | k0局部总方差插值；观测包围；confidence=0.990；partial |
| 09/25 | τ7.000→4.000天 | 11.509% | +1.320vp；same_expiry_atm | 前7D源；PM | k0局部总方差插值；观测包围；confidence=0.991；partial |
| 09/28 | τ10.000→7.000天 | 10.000% | +0.621vp；same_expiry_atm | 当前7D源；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 09/30 | τ12.000→9.000天 | 10.508% | +0.396vp；same_expiry_atm | EOM重点到期；PM | k0局部总方差插值；观测包围；confidence=0.992；partial |
| 10/02 | τ14.000→11.000天 | 10.996% | +0.264vp；same_expiry_atm | 前14D源；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 10/05 | τ17.000→14.000天 | 10.495% | +0.059vp；same_expiry_atm | 当前14D源；PM | k0局部总方差插值；观测包围；confidence=0.991；partial |
| 10/16 | τ28.000→25.000天 | 11.778% | +0.121vp；same_expiry_atm | mixed重点到期的PM层／前30D下端；PM | k0局部总方差插值；观测包围；confidence=0.994；partial |
| 10/19 | τ31.000→28.000天 | 11.575% | +0.106vp；same_expiry_atm | 前30D上端；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 10/21 | τ33.000→30.000天 | 11.787% | +0.077vp；same_expiry_atm | 当前30D源；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 10/27 | τ39.000→36.000天 | 11.914% | -0.224vp；same_expiry_atm | 共同ATM中下行的例外；PM | k0局部总方差插值；观测包围；confidence=0.993；partial |
| 10/30 | τ42.000→39.000天 | 12.654% | +0.124vp；same_expiry_atm | 前45D下端；PM | k0局部总方差插值；观测包围；confidence=0.995；partial |
| 11/03 | τ46.042→43.042天 | 12.568% | +0.086vp；same_expiry_atm | 前45D上端；PM | k0局部总方差插值；观测包围；confidence=0.989；partial |
| 11/04 | τ47.042→44.042天 | 12.794% | +0.103vp；same_expiry_atm | 当前45D下端；PM | k0局部总方差插值；观测包围；confidence=0.987；partial |
| 11/06 | τ49.042→46.042天 | 12.976% | +0.119vp；same_expiry_atm | 当前45D上端；PM | k0局部总方差插值；观测包围；confidence=0.989；partial |
| 3D fixed | 3→3天 | 11.007% | +4.445vp；fixed_tenor_atm | 同一PM范围；期限固定 | P:09/21–09/21(τ3.000–3.000,w=0.000000)；T:09/24–09/24(τ3.000–3.000,w=0.000000)；observed，无外推，confidence=0.990，partial |
| 7D fixed | 7→7天 | 10.000% | -0.189vp；fixed_tenor_atm | 同一PM范围；期限固定 | P:09/25–09/25(τ7.000–7.000,w=0.000000)；T:09/28–09/28(τ7.000–7.000,w=0.000000)；observed，无外推，confidence=0.993，partial |
| 14D fixed | 14→14天 | 10.495% | -0.237vp；fixed_tenor_atm | 同一PM范围；期限固定 | P:10/02–10/02(τ14.000–14.000,w=0.000000)；T:10/05–10/05(τ14.000–14.000,w=0.000000)；observed，无外推，confidence=0.991，partial |
| 30D fixed | 30→30天 | 11.787% | +0.260vp；fixed_tenor_atm | 同一PM范围；期限固定 | P:10/16–10/19(τ28.000–31.000,w=0.666667)；T:10/21–10/21(τ30.000–30.000,w=0.000000)；observed，无外推，confidence=0.993，partial |
| 45D fixed | 45→45天 | 12.883% | +0.390vp；fixed_tenor_atm | 同一PM范围；期限固定 | P:10/30–11/03(τ42.000–46.042,w=0.742268)；T:11/04–11/06(τ44.042–46.042,w=0.479167)；interpolated，无外推，confidence=0.987，partial |

**曲线与事件凸点。** 以下形状、差值、skew及BF25均为report-layer calculation from packet nodes。Fixed曲线是mixed：3D高于7/14D，随后至30/45D上行；3D−30D=-0.780vp、7D−30D=-1.788vp、14D−30D=-1.292vp、45D−30D=+1.096vp。Exact前端9/22的13.525%高于9/23的11.195%，与次日上午事件窗口相容，但没有隔离出讲话的事件方差或因果贡献。9/25与9/28的落差也包含周末／期限组成，不能单凭年化IV识别套利。

**跨日比较。** 30个共同ATM节点中29个上升，10/27下降0.224vp；新增10/28没有前日同到期节点，变化unavailable。Fixed7/14D下降而各自相关共同exact节点上升，直接说明slot migration与同到期变化不能混为一谈。前3D源9/21已于T日归零退出positive-τ表，T的3D源为9/24；9/24同到期只升1.316vp，显著小于fixed3D的4.445vp。30D与45D的bracket／权重迁移已列于表中，11月τ的小数偏移来自跨夏令时边界。Same-expiry仍含roll-down与重新定价；没有进行纯repricing分解。T0不参与正期限曲线，目标9/22在T日τ1不能当成目标日已观测0DTE IV。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T:09/28／约7D | 13.731% | 11.393% | 10.000% | 9.272% | 8.983% | 2.121vp | 0.332vp | forward delta局部插值；观测支持包围；degraded_local_evidence |
| Δ P:09/25(τ7)→T:09/28(τ7) | -1.010vp | -0.700vp | -0.189vp | +0.363vp | +0.839vp | -1.063vp | +0.021vp | rolling_tenor_slot_fixed_delta；同selection contract；degraded_local_evidence；materiality=indeterminate_within_uncertainty，含滚动组成 |
| T:10/05／约14D | 14.510% | 11.853% | 10.495% | 9.991% | 10.045% | 1.862vp | 0.427vp | forward delta局部插值；观测支持包围；degraded_local_evidence |
| Δ P:10/02(τ14)→T:10/05(τ14) | -1.440vp | -1.004vp | -0.237vp | +0.452vp | +1.016vp | -1.456vp | -0.038vp | rolling_tenor_slot_fixed_delta；同selection contract；degraded_local_evidence；materiality=indeterminate_within_uncertainty，含滚动组成 |
| T:10/21／约30D | 17.469% | 13.794% | 11.787% | 10.889% | 10.843% | 2.905vp | 0.554vp | forward delta局部插值；观测支持包围；degraded_local_evidence |
| Δ P:10/19(τ31)→T:10/21(τ30) | -0.463vp | -0.184vp | +0.319vp | +0.758vp | +1.091vp | -0.942vp | -0.032vp | rolling_tenor_slot_fixed_delta；同selection contract；degraded_local_evidence；materiality=indeterminate_within_uncertainty，含滚动组成 |

**按level、slope、curvature顺序解释。** 三槽ATM变化为−0.189／−0.237／+0.319vp，25Δ downside-skew分别收窄1.063／1.456／0.942vp，BF25为+0.021／−0.038／−0.032vp；不能把BF统一写为上升或把所有level写成下降。这里只能确认算术方向，未建立报价误差以外的统计显著性。Skew期限梯度：14D−7D由+0.134变为-0.259vp，约30D−14D由+0.529变为+1.043vp；仍属于滚动槽位梯度。

当前put25相对ATM溢价约1.393／1.358／2.007vp，call25相对ATM为−0.728／−0.504／−0.898vp；正的downside skew仍保留，只是斜率变平。这里使用forward_delta_non_premium_adjusted，downside_skew_25d是fixed-delta slope proxy，不是统计skewness。三个selected expiries都跨日滚动，约30D还由τ31变τ30；未构造packet不存在的fixed-tenor smile。

**策略传导。** 这些可用节点支持降级局部判断，促使方向价差重查long／short IV成本、Theta和事件后premium；不证明便宜、昂贵或可交易edge。Iron fly／condor需独立验证中心区间与全部wings，tail hedge需核对实际尾部成本，calendar／diagonal需前后期scenario surface，均不能由headline skew放行。目标9/22、默认候选9/23、敏感性9/24以及dominant10/16未入本期selected smile；必须刷新其实际ATM、25Δ及腿位wing，不能移用9/28、10/5、10/21曲线。

## 9. Key Expiry / Strike / Dealer Node

期限表单位为B美元／SPX变动1%，均用gex_1pct；signed是call−put的模型代理，gross是call＋put的幅度，两者不互替。

| Expiry / family | Role | T DTE→目标DTE | Gross GEX | Signed GEX | Vendor OI |
| --- | --- | --- | --- | --- | --- |
| 09/21 COMBINED | 周一已到期PM | 0→expired | 29.232 | +25.436 | 312,904 |
| 09/22 COMBINED | 目标新0DTE先验 | 1→0 | 12.003 | +8.666 | 173,182 |
| 09/23 COMBINED | 默认候选期限 | 2→1 | 11.832 | +9.250 | 138,521 |
| 09/24 COMBINED | 敏感性期限 | 3→2 | 7.411 | +4.908 | 82,345 |
| 09/30 COMBINED | EOM／PM | 9→8 | 32.880 | +10.279 | 940,293 |
| 10/16 COMBINED | dominant mixed | 25→24 | 70.457 | +8.782 | 2,566,508 |
| 10/16 SPX | 其中AM | 25→24 | 64.092 | +7.327 | 2,241,851 |
| 10/16 SPXW | 其中PM | 25→24 | 6.365 | +1.455 | 324,657 |
| 11/20 COMBINED | 新进入60天窗口 | 60→59 | 27.974 | +0.838 | 1,345,475 |

10/16占全链gross 26.95%，其中AM与PM按行拆分，combined不能再与pure行重复相加。9/21已到期gross29.232B仅占11.18%；9/22占当前存续gross 5.17%，虽总量不大，局部可占主导。11/20从63D滚入60D带来gross27.974B／signed+0.838B；另新增10/28在期限表OI与GEX均为0，不把它当正敞口增量。

节点表统一为**百万美元／SPX点**。原gamma表使用1%幅度，已按gex_point＝原值／(0.01×7765.10)转换；每行“当日0DTE＋目标0DTE＋更久存续”可分解，不能将1%数值直接写为每点风险。

| SPX / XSP机械映射 | 作用 | T0 signed | 目标0DTE signed | 9/22后 signed | 存续合计 signed |
| --- | --- | --- | --- | --- | --- |
| 7700 / 770.0 | downside second reassessment | -0.932 | -0.910 | -1.646 | -2.556 |
| 7725 / 772.5 | risk first reassessment | -0.213 | +4.483 | +3.358 | +7.841 |
| 7750 / 775.0 | risk trigger and base cancellation | -0.885 | +13.385 | +17.686 | +31.071 |
| 7755 / 775.5 | target0DTE dominant positive local node | -0.190 | +18.527 | +1.113 | +19.639 |
| 7765 / 776.5 | expired T pin, no carry-forward authority | +293.403 | +3.770 | +1.510 | +5.281 |
| 7775 / 777.5 | base activation boundary | +6.961 | +17.484 | +4.480 | +21.964 |
| 7800 / 780.0 | base first reassessment / possible braking | -0.814 | +9.195 | +40.334 | +49.529 |
| 7850 / 785.0 | upside second reassessment | +0.363 | +1.335 | +26.461 | +27.796 |
| 7900 / 790.0 | far positive signed node | +0.069 | +0.328 | +51.837 | +52.165 |
| 8000 / 800.0 | largest gross node; signed much smaller | +0.000 | +0.021 | +24.429 | +24.450 |

XSP列仅为SPX除以10的结构位置，不是已选合约strike；实际映射、forward、strike取整和时间差须在目标日重新核实。

当前selected为9/21、9/22、9/30、10/16；跨日可比durable地图只有9/30＋10/16。9/22地图为本期新增selected覆盖，虽前日expiration panel有9/22总量，也不能补造前日逐strike变化。Selected存续gross覆盖全存续49.67%，剔目标0DTE后覆盖46.92%；未覆盖部分不推定与局部同号。以完整期限汇总核对全局，以selected表描述节点，不把局部图当全链地图。8000的gross较大，但signed远小于其gross；两者的排序不代表相同经济含义。未计算或声称Gamma flip。

| Greek／范围 | T-1→T／当前值 | 解释与单位边界 |
| --- | --- | --- |
| DEX：共同存续30期 | 50.341→385.128B；当前全存续475.012B美元 | sum(delta×S×100×OI)，状态敞口；价格上涨、到期老化与新增远月均影响，非买入流量 |
| Vanna：共同／全存续 | 共同−1.837→−0.604B；全存续−2.167B | σ±0.005的DEX差，合计1个vol-point有限差分；共同AM+1.933B、PM−2.537B方向不同 |
| Charm：共同／全存续 | 共同+5.590→+4.997B；全存续+5.212B；9/22层+1.186B | 固定spot/IV下到下一交易日模型参考时点的DEX变化，不是确定对冲买卖 |
| VEX／Volga | 全链VEX2.032837B；存续Volga13.459022B原生数值 | VEX=sum(vendor vega×100×OI)，无额外缩放；Volga使用单位小数波动率的BS vega有限差分，不能与vendor VEX直接同量纲比较 |

高阶Greek实现已核对：Vanna／Volga使用σ上、下各0.005的有限差；Charm按下一交易日参考时间，PM为16:00、AM为17:00，ACT/365。AM模型到期时间取到期日前一交易日17:00，这是计算代理，不是官方AM结算时点。T0不满足高阶Greek资格，Vanna／Charm／Volga为null而非0。BS vega未乘0.01，vendor vega实际单位又未在包内独立验证，因此本报告不把Volga原生幅度解释为“IV升1点就产生多少现金损益”，也不以VEX／Volga比值作交易依据。

## 10. T+1 Decision Map, Structural View and Plan Grade

**结构与权限。** Primary regime为存续PM signed-Gamma修复、近端正节点保留；directional prior=upside_bias，confidence=medium，path_confidence_basis=mechanism_only。路径不对称在于上行可在修复延续后评估，下行须先出现7750附近结构弱化；正Gamma也可能在7800减速。Base为7775→7800，Risk为7750→7725，后续节点均须重估。Plan Grade／Status为B／Conditional Next-Day Plan，Execution Status为requires_external_live_source；quote_portability=none，setup=candidate_template_only。方向卡EOD IV gate=not_applicable仅限背景筛选，候选IV和MTM仍必须实时确认；讲话后surface重定价风险保留。

**为何B。** 基础数据、条件路径和风险封顶规则可定义；IV局部降级、地图覆盖与候选估值缺口使其不升A，未来实时数据待确认又不自动降C。相对前期仍为B，改变的是市场结构与事件窗口，不是等级重述。结构方向不等于价格edge，edge_evidence_status=not_established。

| 状态 | 需要看到的条件 | 结果／失效 |
| --- | --- | --- |
| 事件窗口及其重建未完成 | O_RESET／O_CAL／O_CONFIG：实际讲话结束、内容审核、live地图／报价重建与参数冻结均完成；最早t0=10:40仅为假设 | t0后的两根完整5m结束再评估；最早10:50，延迟则顺延；不因时间到了自动放行 |
| 7750–7775核心；7725–7800观察走廊 | 尚无外侧接受；即使三根bar留在核心，也未证明净盈利区间 | 两张方向卡observe only；走廊是复核范围，不是已验证的区间策略盈利边界 |
| 7775上方接受 | O_UP／O_SIGN_UP：两根close>7775；PM及剔9/22后全链signed非负；7775–7800局部PM与新9/22PM0DTE均正 | Base call debit vertical；先7800重估，随后7850须另验；O_REJECT或修复失败取消 |
| 7750下方接受 | O_DOWN／O_SIGN_DOWN：两根close<7750；7750–7725局部及新0DTE signed<0；全PM及剔目标0DTE总量均低于事件后冻结基准 | Risk put debit vertical；先7725、再7700；O_RECLAIM或弱化证据消失取消 |
| 开盘／reset跳过触发位 | O_GAP_UP／O_GAP_DOWN：先出现覆盖原trigger的回测bar，再从其后的完整bar重计 | 没有回测不追；首个可评估价已越所选short或首节点7800／7725则取消该候选 |
| post-event range reconfirmed | O_RANGE：reset后3根完整bar留在预冻结core，无shock且未越确认位；spot／forward及完整中心不确定区间均被成本后scenario盈利区间包含，留正buffer | 只允许进入iron fly／condor独立研究；未完成此测试前not_screenable，不形成第三张保留卡 |
| range thesis failure / boundary release | O_RANGE失效：中心迁移、profit zone失配或边界释放；方向分支另须O_UP／O_DOWN及其signed条件 | 停止原区间研究，刷新重算；不能把区间失败自动当成方向入场 |
| IV shock／node migration | O_VOL／O_NODE：15分钟VIX升≥1点或候选ATM升≥2vp；节点超过事前数值容差 | 清零计数与候选排名，刷新、重选、再冻结；禁止沿用冲击前确认 |
| 数据、净值或预算门禁不通过 | O_QUOTES／O_MAPPING／O_SURFACE／O_VALUE／O_BROKER／O_RISK／O_TIME：缺实时证据、净值不足、账本未知或时间不足 | No Trade；实际实时失败属于执行状态，不机械改写为C级EOD计划 |

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Family／linked scenario | Payoff archetype | Structural fit | IV依赖／gate | Pricing／execution | Status | 结论与下一步 |
| --- | --- | --- | --- | --- | --- | --- |
| Call debit vertical／base_case | directional_continuation | conditional | background_only；gate=not_applicable | pending_live_repricing；external_required | conditional | PM修复与7775上方接受相容；7800首节点可能减速，需live目标净值。 |
| Put debit vertical／risk_case | directional_continuation | conditional | background_only；gate=not_applicable | pending_live_repricing；external_required | conditional | 只有7750失守且局部/PM/新0DTE转弱才成立；不能把正Gamma先验当下行证据。 |
| Defined-risk iron butterfly／alternative_range | centered_stability | range_relevant_unconfirmed | required；gate=conditional | pending_live_repricing；external_required | not_screenable | 正Gamma使区间家族相关，但7765旧pin过期，事件后中心/净盈利区间/两翼MTM未建立；独立定义候选网格，deferred_to_t1。 |
| Defined-risk iron condor／alternative_range | broad_bounded_range | range_relevant_unconfirmed | required；gate=conditional | pending_live_repricing；external_required | not_screenable | 与iron fly分别比较；需live上下界、净credit和成本后profit-region覆盖，不用EOD120行缺失替代拒绝证据。 |
| Directional broken-wing butterfly／alternative_target | directional_continuation | not_established | required；gate=conditional | unavailable；external_required | reject | 7800为首复核位而非有证据的收敛终点；当前不为窄目标峰增加三腿/不对称尾部。 |
| Long straddle / strangle／alternative_vol | two_sided_expansion | not_established | required；gate=conditional | unavailable；external_required | reject | 讲话前不持有；未证明事件后路径幅度覆盖双边premium、Theta与成本。 |
| Calendar / diagonal／alternative_term | term_or_vol_relative_value | not_established | required；gate=conditional | unavailable；external_required | not_screenable | 候选near/back翼与跨期限估值缺失；局部partial节点不能建立期限相对价值。 |
| Long outright option／alternative_direction | directional_continuation | not_established | background_only；gate=not_applicable | unavailable；external_required | reject | 保留价差为控制premium；不是已证明价差比单腿更优。单腿同样需要live净值与预算。 |

所有家族的价格edge均未建立；两张保留方向卡的pricing_assessment为pending_live_repricing，execution_feasibility为external_required。其EOD IV gate=not_applicable表示结构筛选仅把IV当背景，不豁免实际候选ATM／wings／Greeks／MTM的live门禁。Range与期限类需自身IV证据，不能把overall=partial误填成IV gate。方向BWB已单独检查：首复核位不是已证明的收敛终点，当前没有支持窄峰及不对称尾部的净值依据。

### Local Candidate Comparison

| 候选家族 | 历史网格 | 目标日比较与结论 |
| --- | --- | --- |
| Call vertical | 9/22、23、24 × long777/778/779 × width3/5＝18组 | 事件后按live7775触发映射重心及相邻strike重建；不固定EOD778 |
| Put vertical | 相同3个到期 × long774/775/776 × width3/5＝18组 | 事件后按live7750失守边界重建；不固定EOD775 |
| Iron butterfly | 相同3个到期 × center775/776/777 × widths(3,3)/(5,5)/(3,5)/(5,3)＝36组 | 中心两侧同strike短put/call，长wings封顶；独立于condor |
| Iron condor | 相同3个到期 × center775/776/777，短put=center−1、短call=center+1 ×相同4组width pairs＝36组 | 宽区间与中心不确定性另验；不以iron fly结果替代 |

108组均为diagnostics、winner=null、local_candidate_comparison=deferred_to_t1。目标日先核实期限宇宙，再围绕实时spot／forward、trigger或中心重设相邻strike及宽度；比较全部腿IV差、Greeks、保守清算MTM、tail loss、费用与组合流动性。Range还要测试中心、core两边、confirmation levels和vol-shock下的损益，整个center uncertainty与spot／forward必须在成本后scenario盈利区间内。只有通过共同门禁的候选才按保守净目标值排序；差异落在报价／tick／成本误差内时保持indeterminate，不择EOD赢家。9/23为默认研究期限，9/22与9/24仅比较，不额外形成策略卡；本期一小时内持有，以2DTE检验延长期限敏感性，未进一步排序9/25（目标3DTE）；9/28为6DTE、在默认1–3D窗口外，均不据未排序称为劣质候选。

### Base Candidate Template — Base Case

**Base：Call debit vertical。** 默认9/23到期，在9/22事件后日内持有；目标日1个日历DTE，非持有至到期。Live long取7775边界映射附近strike及相邻±1，short沿路径相距3或5点，由净情景值决定宽度；比例1:1。Screening为conditional，payoff为directional_continuation，setup=candidate_template_only、portability=none。实际N与live legs为pending。

| Illustrative EOD example／全腿 | 历史组合／单位与权限 | N=1 unit_payoff_example／到期诊断 | 历史Greeks／映射 |
| --- | --- | --- | --- |
| buy 1× XSP260923C00778000（K=778，bid/mid/ask 1.660/1.685/1.710，IV 9.760%）；sell 1× XSP260923C00783000（K=783，bid/mid/ask 0.450/0.470/0.490，IV 10.460%） | 9/21 16:00 ET；XSP776.47；组合bid/mid/ask=1.170/1.215/1.260点；synthetic_only，客户debit为正；diagnostics_only、binding=false | 按EOD ask；C=$6：ML=$132、净MP=$368、BE=779.320；C=$16：ML=$142、净MP=$358、BE=779.420；尾部亏损上限=ML | delta=+0.2588、gamma=+0.0310、vega=+0.0908、theta=-0.2208，vendor单位历史差值；long778相对777.5取整差+0.5 XSP点，与spot映射残差−0.04不同 |

到期利润区为XSP高于K_long+d+C_N/(100N)；该公式与表格描述9/23到期边界，不是9/22计划退出时的MTM。最大收益要求超过short strike后的到期状态，不能用它代替第一结构节点的收益。

**激活、取消与复核。** 两根close>7775，同时PM／更久存续总量非负、7775–7800局部及新0DTE正向；拒绝7775的1+1bar规则或修复证据消失则失效。 所有共同live门禁仍须通过；先在7800重估，后续7850须重新确认净值。首个可评估价已经越过short或首节点不追；止损风险先触发时不等待bar确认。

**IV、Greeks与价格依据。** 方向暴露预期为正Delta／Vega／Gamma、负Theta，但live符号及幅度需逐腿重算。实际9/23的selected smile缺失，不借用9/28代替。短腿减少premium同时封顶收益，是否优于单腿取决于实际目标MTM；慢路径、IV下降、wing变化与费用均可使方向判断正确仍亏损。价格状态pending_live_repricing，edge未建立。方向卡的中心包含测试为not_applicable，以自己的目标路径／退出损益测试替代。

**风险与持有。** 只使用上列risk_budget_bound公式；本卡没有实际debit cap或预期成交价。Target/adverse/invalidation/planned-exit四情景均待live估值；总风险≤R_eff≤300美元，且与当日其他损失／剩余风险合并≤500美元。Time stop为entry+60分钟与适用session退出截止两者较早；具体日历规则见下文，不能隔夜。

### Risk-Path Contingency

**Risk：Put debit vertical。** 默认9/23到期，在9/22事件后日内持有；目标日1个日历DTE，非持有至到期。Live long取7750边界映射附近strike及相邻±1，short沿路径相距3或5点，由净情景值决定宽度；比例1:1。Screening为conditional，payoff为directional_continuation，setup=candidate_template_only、portability=none。实际N与live legs为pending。

| Illustrative EOD example／全腿 | 历史组合／单位与权限 | N=1 unit_payoff_example／到期诊断 | 历史Greeks／映射 |
| --- | --- | --- | --- |
| buy 1× XSP260923P00775000（K=775，bid/mid/ask 1.690/1.710/1.730，IV 10.850%）；sell 1× XSP260923P00770000（K=770，bid/mid/ask 0.570/0.585/0.600，IV 11.810%） | 9/21 16:00 ET；XSP776.47；组合bid/mid/ask=1.090/1.125/1.160点；synthetic_only，客户debit为正；diagnostics_only、binding=false | 按EOD ask；C=$6：ML=$122、净MP=$378、BE=773.780；C=$16：ML=$132、净MP=$368、BE=773.680；尾部亏损上限=ML | delta=-0.2331、gamma=+0.0257、vega=+0.0802、theta=-0.1654，vendor单位历史差值；long775→SPX7750，取整差0 |

到期利润区为XSP低于K_long−d−C_N/(100N)；该公式与表格描述9/23到期边界，不是9/22计划退出时的MTM。最大收益要求超过short strike后的到期状态，不能用它代替第一结构节点的收益。

**激活、取消与复核。** 两根close<7750，同时局部7750–7725和新0DTE转负、全PM与存续总量低于事件后冻结基准；收复7750的1+1bar规则或弱化证据消失则失效。 所有共同live门禁仍须通过；先在7725重估，后续7700须重新确认净值。首个可评估价已经越过short或首节点不追；止损风险先触发时不等待bar确认。

**IV、Greeks与价格依据。** 方向暴露预期为负Delta、正Vega／Gamma、负Theta，但live符号及幅度需逐腿重算。实际9/23的selected smile缺失，不借用9/28代替。短腿减少premium同时封顶收益，是否优于单腿取决于实际目标MTM；慢路径、IV下降、wing变化与费用均可使方向判断正确仍亏损。价格状态pending_live_repricing，edge未建立。方向卡的中心包含测试为not_applicable，以自己的目标路径／退出损益测试替代。

**风险与持有。** 只使用上列risk_budget_bound公式；本卡没有实际debit cap或预期成交价。Target/adverse/invalidation/planned-exit四情景均待live估值；总风险≤R_eff≤300美元，且与当日其他损失／剩余风险合并≤500美元。Time stop为entry+60分钟与适用session退出截止两者较早；具体日历规则见下文，不能隔夜。

### Live Quote / Limit Protocol and Alternative Setups

目标日先重选腿，再取实时native组合报价；若只有synthetic，则必须取得同步全腿报价并确认经纪商支持原子multi-leg net-limit。报价年龄≤30秒，正mid时组合spread／mid≤25%；mid非正时改用事前冻结的绝对tick宽度及成本容差，不能除零或放宽至必然通过。数值mapping／carry-parity／节点迁移／quote时差容差和情景buffer目前均未提供，须在t0前冻结；地图最大年龄300秒是本报告未校准的操作假设。任何一项所需能力不可核实，则不新增。

从审核后的live组合mid附近开始限价，仅按经纪商允许tick改善；debit不超过risk、RR、净目标清算值及流动性给出的最严格上限。不拆腿、不越界追成交，显示价不保证同时成交。没有第三张保留策略卡；range候选仍是独立研究网格，只有重新建立完整稳定区间与净盈利证据后才可另行评估。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

事件后7775上方接受，正向PM／新0DTE／局部门禁成立，先评估call debit vertical至7800的净清算值。7800可能是减速位置；只有实际结构与价格价值仍支持，才研究7850。若回到7775内并按1+1bar拒绝确认，或正向层消失，Base停止。

### Risk Case

7750下方接受，局部及目标0DTE为负、PM与更久存续signed低于事件后冻结基准，才进入put debit vertical评估。第一复核位7725，进一步7700需重估；Risk不要求所有远月合计必须转负，也不能仅因价格回落就声称负Gamma扩散。收复7750按1+1bar确认或独立弱化证据消失时停止。

### Scenario Valuation — 四情景闭合

| Card | Scenario | Spot假设 | 时间假设 | 估值／结论 |
| --- | --- | --- | --- | --- |
| Base call | target | XSP 780.0／SPX 7800 | 30min after actual entry | pending；净PnL=null；probability=null |
| Base call | adverse | XSP 775.0／SPX 7750 | 15–30min after entry | pending；净PnL=null；probability=null |
| Base call | invalidation | XSP 777.5／SPX 7775 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Base call | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |
| Risk put | target | XSP 772.5／SPX 7725 | 30min after actual entry | pending；净PnL=null；probability=null |
| Risk put | adverse | XSP 777.5／SPX 7775 | 15–30min after entry | pending；净PnL=null；probability=null |
| Risk put | invalidation | XSP 775.0／SPX 7750 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Risk put | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |

Target先按entry+30分钟估值，并做15／60分钟时间敏感性；表中spot只是情景假设，不是该时点必达预测。实际模型／版本、估值时间、退出时间、spot／forward、利率、同到期ATM与wings、N、entry premium、退出清算折价、全部费用必须记录。至少测试ATM不变及±2vp，并加入不利wing／skew变化；不可用到期intrinsic替代周二未到期MTM。因这些future inputs尚未提供，八行情景均未产生数值价值、PnL或概率，也没有正EV结论。

### No-Trade Case

讲话及reset未完成、开盘／reset跳空未回测、对应独立signed层缺失、报价／映射／平价／live surface不通过、目标净清算值不足、未冻结容差、风险账本未知或剩余时间不足，均不激活对应分支。7750–7775核心内，两张方向卡没有外侧接受时保持observe only；区间家族仍可按O_RANGE独立研究，只有通过完整稳定性与净盈利检验才算重新确认，本期没有第三张保留策略卡。无有效窗口时取消分支，不为完成策略数量或成交而放宽门禁。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

1. 7775上方／7750下方的完整bar接受，以及7800／7725第一复核位。
2. 新9/22PM0DTE、可交易PM整体、更久存续和局部节点的同口径signed状态；监测7755／7765迁移。
3. 两段政策官员讲话实际结束与可得内容，随后spot／IV／流动性是否已重置。
4. 实际候选expiry的ATM／25Δ／wing及VIX15分钟变化；路径速度是否覆盖Theta与费用。
5. 实时组合净价、保守目标MTM、剩余预算、持有时钟与经纪商退出限制。


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
