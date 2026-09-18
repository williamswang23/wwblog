+++
title = "SPX期权持仓与Greeks结构分析-260917"
date = "2026-09-18"
data_as_of = "2026-09-17"
draft = false
description = "分析9月17日期权持仓、Greeks与IV结构，以及9月18日到期分层和条件式路径。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "15912830c6087da39e7eccd523e2ffb8f2a72d77233720fe25b1cd79749a6e00"
+++

# SPX期权持仓与Greeks结构分析-260917

## 1. 结论

T日反弹伴随共同存续PM与到期后负Gamma显著收窄，T+1采用**条件性 upside_bias、medium置信度**：7650上方修复须经实时确认，7625下方保留独立风险路径；**B / Conditional Next-Day Plan，requires_external_live_source**，9/18到期集中使盘后正节点不能直接成为次日支撑。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | 条件性偏上（upside_bias），优先观察修复延续；负Gamma残余使下破仍有非对称风险，置信度 medium。 |
| Earliest evaluation | 9/18 最早09:40 ET，仅为下界：须完成09:15工业生产及开盘AM/PM分层重置，冻结参数后取得两根完整5分钟确认。 |
| Base activation | 若7650上方接受且PM/新0DTE/存续层确认修复，则评估 call debit vertical → 首查7675 → 拒绝7650或结构修复失败即失效。 |
| Downside branch | 若7625下方接受且负向层一致，则评估 put debit vertical → 首查7600 → 重新收复7625或负向层失效即取消。 |
| Upside branch | 若7650上方接受且修复门禁成立，则沿Base评估 call debit vertical → 首查7675 → 拒绝7650或结构转弱即失效。 |
| Otherwise | No Trade / observe only；等待有效重置、确认与实时重选重估；15:00后不新入，退出不晚于15:30或更早限制。 |

Plan Grade / Plan Status：B / Conditional Next-Day Plan；Execution Status：requires_external_live_source；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 共同30个存续到期日的signed GEX由−44.587收窄至−28.455十亿美元／1%变动；剔除9/18后，共同29期由−31.899收窄至−11.900。修复主要来自PM层，AM signed反而更负；不能用gross正值判定市场处于long Gamma。
- Base为7650上方接受并确认可交易PM、新PM 0DTE及存续层修复后，研究call debit vertical，首查7675；Risk为7625下方接受且负向层一致后，研究put debit vertical，首查7600。两卡互斥，节点只表示重新估值位置。
- 9/18占全链gross GEX的66.92%，其中AM占该到期日的87.08%。AM二阶Greeks归零触及代码的时间近似边界，不证明真实对冲已平仓；开盘结算暴露和RTH可交易PM层须分开。
- 7650当前selected signed为+11.284百万美元／SPX点，剔9/18后为−8.167；7680由+35.666降至约−0.034。正节点耐久性不足，7625–7650先观察，不能据此自动卖出区间波动。
- 正式IV仍为partial，但共同30个exact-expiry ATM均下降，支持较广泛的波动重定价；固定3D下降5.987vp同时包含Fri–Mon插值权重变化。三条smile的level下降、25Δ斜率变平、BF25下降，约30日槽位为同10/16到期τ30→29，区别于7／14日的滚动到期比较。
- 默认候选9/21到期，目标日为3个日历DTE，周五日内退出。09:15工业生产与开盘AM分层重置发生在入场前，Quote Portability=none；36组合全部deferred_to_t1，EOD不选赢家，live价格优势与执行能力尚未确认。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1 | T | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 共同30期 | gross392.347；signed−44.587 | gross495.289；signed−28.455 | gross+26.238%；signed+16.131，十亿美元／1% | 负压收窄但未转正；10/26新行OI/GEX为0，不算共同到期。 |
| PM与到期后层 | PM signed−34.593；共同到期后−31.899 | PM−12.308；共同到期后−11.900 | +22.285／+19.999，十亿美元／1% | 支持修复；AM signed−9.993→−16.147构成反证。 |
| 严格共同selected | 9/18＋10/16：7650 +1.923；7700 +41.024 | 同样本：7650 +15.453；7700 −5.714 | 百万美元／SPX点；局部改善不均 | 本期新增9/30地图不可与前期未含该到期的地图直接做迁移归因。 |
| ATM term | 3D17.324%；9/18 exact20.525%；9/21 exact14.254% | 3D11.337%；9/18 17.450%；9/21 10.321% | fixed_tenor_atm −5.987vp；same_expiry_atm −3.075／−3.934vp | 共同节点均下降；3D权重变化仍扩大槽位差值。 |
| Selected smile | 7D9/23；14D9/30；30日槽位10/16 τ30 | 7D9/24；14D10/1；同10/16 τ29 | ATM −3.118／−2.666／−1.804；skew −1.246／−1.355／−1.241；BF25 −0.100／−0.058／−0.082vp | 前两项rolling_tenor_slot_fixed_delta；第三项same_expiry_fixed_delta；分别是水平／斜率／曲率。 |
| 目标日与候选 | 9/17 RTH，默认9/18到期1DTE | 9/18 RTH，默认9/21到期3DTE | B→B、none→none；主路径downside→conditional upside | 日程和结构改变，等级仍表示计划质量，不能写成价格edge未变。 |

## 5. T 日盘面、字段时点与 Event-Risk Overlay

截至9/12的一周初请失业金19.6万，较未修订前值20.6万减少1万。 劳动力市场韧性背景；不能以单周数据确定增长路径。 未构造共识差，也不把初请直接解释为SPX涨幅原因。 [U.S. Department of Labor](https://www.dol.gov/ui/data.pdf)

8月新屋开工127.5万套年化，月降2.6%（公布误差范围±12.0%）；建筑许可139.4万套，月降2.7%。 住房信号偏弱，但开工月变动的公布误差范围包含零。 不把点估计方向写成统计上已确认下降；SAAR不是实际当月套数。 [U.S. Census Bureau](https://www.census.gov/construction/nrc/current/)

9月制造业活动扩散指数37.8，前值47.4；支付价格指数48.6，前值40.9。 活动仍扩张而边际放缓，价格压力上升，约束单向通胀缓和解释。 地区扩散指数不是全国增长率或CPI；调查采集期9/7–9/15。 [Philadelphia Fed](https://www.philadelphiafed.org/surveys-and-data/regional-economic-analysis/mbos-2026-09)

| ET | Event | Impact / branch | Required action |
| --- | --- | --- | --- |
| 09-18 09:00 | 纽约联储DSGE更新 | E_DSGE：monitoring_only | 模型更新；仅实际重大价格/波动冲击触发额外重置。 |
| 09-18 09:15 | 工业生产与产能利用率 | E_IP：hard_reset | 发生在目标日计划入场前；实际发布及反应确认后重建spot/forward/map/IV/quote基线。 |
| 09-18 09:30 | 月度AM到期的成分股开盘参考窗口 | E_OPEX_AM：hard_reset | 09:30仅开盘观察起点，SET实际形成时间不固定；分离AM结算暴露与RTH可交易PM层后重建地图。 |
| 09-18 10:00 | 纽约联储Regional Data Explorer | E_RDE：monitoring_only | 可能处于持有窗口；按实际冲击处理。 |
| 09-18 12:45 | 纽约联储Nowcast | E_NOWCAST：monitoring_only | 模型更新；不是必然hard reset。 |
| 09-18 16:00 | 目标日PM合约到期截止 | E_OPEX_PM：monitoring_only | 晚于本计划15:30退出上限；到期集中影响日内结构，不能假设pin。 |
| 09-21 11:00 | 纽约联储家庭支出预期调查 | E_HOUSEHOLD：monitoring_only | 周一背景；保留卡片周五退出，不持有跨周末。 |
| 09-22 08:30 | 费城联储非制造业调查 | E_PHILLY_NM：monitoring_only | 第三目标常规交易日背景。 |
| 09-22 10:00 | 里士满联储制造业调查 | E_RICHMOND：monitoring_only | 第三目标常规交易日背景。 |

以上三项新闻均为T日08:30发布、早于期权快照；未来排期按[纽约联储9月日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)核对，hard_reset是本报告的事件管理判断。排期的最初公开秒级时间不可得，目标日结果不在知识截止内。9/18月度／季度到期标签来自formal日历，不等于固定pin预测。

Cboe适用GTH为前晚20:15–09:25、RTH为09:30–16:15 ET；本次冻结截止在目标GTH开始前，计划只针对周五RTH。XSP是SPX的十分之一、乘数100美元／点，欧洲式、现金结算；到期周度合约16:00截止，非到期日常规时段16:15结束，实际broker限制须另核。[交易时间](https://www.cboe.com/about/hours/us-options)、[XSP规格](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)、[XSP产品说明](https://www.cboe.com/tradable_products/sp_500/mini_spx_options)

AM合约须区分停止交易、模型时间与经济结算。[SPX规格](https://www.cboe.com/tradable-products/sp-500/spx-options/spx-specifications)列AM通常前一营业日17:00停止；[2025年通知](https://www.cboe.com/notices/content/?id=55365)提出延长至到期日09:25，但需另发实施确认，[当前FAQ](https://www.cboe.com/document/tech-spec/document/technical-specifications/cboe-options-exchange-245-faq)仍标Effective TBD。本报告不把提案当已生效。SET依成分股正式开盘价计算，形成时间不固定，也不等于09:30的SPX指数读数；开盘重置不宣称SET已公布。[Cboe AM结算说明](https://cdn.cboe.com/resources/spx/Settlement_of_Standard_AM_Settled_SP_500_Index_Options.pdf)

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 结构明显修复，但signed仍为负

**Claim：** 结构明显修复，但signed仍为负。

**Evidence / basis：** 共同30到期 gross 392.347→495.289B，signed -44.587→-28.455B；共同到期后29期 signed -31.899→-11.900B。PM共同signed -34.593→-12.308B，AM -9.993→-16.147B。

**Mechanism / assumptions：** 假定call−put约定能近似边际对冲敏感度，PM负压收窄与价格反弹支持修复；负残余仍可放大边界释放。gross正值不足以判long Gamma。 依赖同口径比较及代理符号假设。

**T+1 Implication：** 优先研究7650上方修复；独立保留7625下方风险路径。

**Falsifier：** Live PM/post-target重新恶化，或7650无法接受。

**Confidence：** medium；证据为快照计算与机制推断，未做路径概率校准。

### Thesis 2 — 到期与AM时钟限制削弱正节点耐久性

**Claim：** 到期与AM时钟限制削弱正节点耐久性。

**Evidence / basis：** 9/18 gross347.264B，占全链66.92%，其中AM302.392B；共同Charm33.807→2.345B。AM9/18 Charm33.517→0，代码AM参考时点已经触及前一交易日17:00的模型截止。

**Mechanism / assumptions：** 该归零是时间近似边界，不能解释为真实对冲平仓。交易停止与SET经济结算不同；SET取成分股开盘价且无固定公布时刻。 依赖同口径比较及代理符号假设。

**T+1 Implication：** 开盘后分离AM结算层，独立复核新PM0DTE与存续层；不能沿用AM峰值认定支撑。

**Falsifier：** Live可交易PM层与存续局部无法维持修复，或SET/开盘冲击造成节点迁移。

**Confidence：** medium；证据为快照计算与机制推断，未做路径概率校准。

### Thesis 3 — 严格共同节点改善不均，7650不是到期后支撑

**Claim：** 严格共同节点改善不均，7650不是到期后支撑。

**Evidence / basis：** 共同selected仅9/18+10/16：7650 signed +1.923→+15.453百万/点，7700 +41.024→-5.714；T剔目标后的9/30+10/16在7650为-8.167，7680约-0.034。9/18纯PM在7650仍小幅正值、7675/7680正值更大。

**Mechanism / assumptions：** P未选9/30，不能把T9/30+10/16与P10/16当同样本变化；局部正值也不等于可持久pin。 依赖同口径比较及代理符号假设。

**T+1 Implication：** 7650须重新接受；7675首个重估区，7680/7700仅后续检查。7625负节点下破则检查7600。

**Falsifier：** 目标AM剔除后正局部消失，或7625负层减弱且价格回收。

**Confidence：** medium；证据为快照计算与机制推断，未做路径概率校准。

### Thesis 4 — IV整体回落获共同到期验证，期限组成仍影响幅度

**Claim：** IV整体回落获共同到期验证，期限组成仍影响幅度。

**Evidence / basis：** 共同30个exact ATM全下降；9/18为17.450%，Δ-3.075vp；9/21为10.321%，Δ-3.934vp。固定3D为11.337%，Δ-5.987vp，两日均Fri–Mon插值但权重1/3→2/3。7/14日smile滚动，约30日为同10/16到期τ30→29。

**Mechanism / assumptions：** level回落同时25Δ斜率变平、BF25下降；不代表纯事件方差消失，更不构成上涨概率或波动出售优势。 依赖同口径比较及代理符号假设。

**T+1 Implication：** 默认研究周一9/21、目标日3日历DTE；实际候选smile/退出MTM须live；9/18与9/22仅敏感性对照。

**Falsifier：** 候选实际期限/翼重新定价，或必要节点/质量门禁不满足。

**Confidence：** low；证据为快照计算与机制推断，未做路径概率校准。

## 7. Conflicting Evidence, Confidence and What Changes the View

主导证据是共同PM与到期后signed改善，以及共同exact IV回落，因此采用**upside_bias / medium**；path confidence为**mechanism_only / not_tested**。这不是涨跌概率，也没有真实dealer inventory或独立样本外收益验证。

反证同样具体：signed残余仍负，AM层更负；7650去目标到期后转负，7680的正值几乎完全属于目标到期。若live PM与存续层转弱、7650发生O_REJECT，Base失效；若7625下方价格与四个负向层共同确认，转入独立Risk评估。若剔目标后signed转为非负、下破被回收，则Risk机制削弱。节点迁移、IV/VIX冲击先触发reset，不能直接据方向翻仓。

原生risk_summary的long_gamma_base由gross正量产生；本报告以call−put的modeled signed约定解释压力，gross仅作规模与集中度。选择口径和代理库存假设不能消除真实持仓未知。Vanna／Charm是模型响应，AM截止归零尤其不能作为已实现买卖流。数据的precision、内部confidence或本报告Plan Grade均不等于可交易edge。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

IV水平单位%，变化为vol points。ATM定义为forward log-moneyness k=0处总方差插值；固定期限在两端总方差间插值、无外推。以下全部变化由两期正式packet节点计算，标记为**report-layer calculation from packet nodes**。

| Expiry / tenor | T τ(days) | P IV% | T IV% | Δvp / basis | Method / source / quality |
| --- | --- | --- | --- | --- | --- |
| 2026-09-18 | 1.000 | 20.525 | 17.450 | -3.075；same_expiry_atm | observation_bracketed；C=0.987；partial；k=0总方差插值 |
| 2026-09-21 | 4.000 | 14.254 | 10.321 | -3.933；same_expiry_atm | observation_bracketed；C=0.991；partial；k=0总方差插值 |
| 2026-09-22 | 5.000 | 14.458 | 10.692 | -3.766；same_expiry_atm | observation_bracketed；C=0.992；partial；k=0总方差插值 |
| 2026-09-23 | 6.000 | 14.620 | 10.811 | -3.809；same_expiry_atm | observation_bracketed；C=0.993；partial；k=0总方差插值 |
| 2026-09-24 | 7.000 | 14.685 | 11.502 | -3.183；same_expiry_atm | observation_bracketed；C=0.995；partial；k=0总方差插值 |
| 2026-09-30 | 13.000 | 14.035 | 11.151 | -2.884；same_expiry_atm | observation_bracketed；C=0.994；partial；k=0总方差插值 |
| 2026-10-01 | 14.000 | 14.156 | 11.368 | -2.788；same_expiry_atm | observation_bracketed；C=0.993；partial；k=0总方差插值 |
| 2026-10-16 | 29.000 | 14.078 | 12.274 | -1.804；same_expiry_atm | observation_bracketed；C=0.996；partial；k=0总方差插值 |
| 2026-10-19 | 32.000 | 13.795 | 12.072 | -1.723；same_expiry_atm | observation_bracketed；C=0.994；partial；k=0总方差插值 |
| 2026-10-26 | 39.000 | unavailable | 12.548 | unavailable：prior_node_unavailable | observation_bracketed；C=0.994；partial；k=0总方差插值 |
| 2026-10-30 | 43.000 | 14.371 | 12.977 | -1.394；same_expiry_atm | observation_bracketed；C=0.995；partial；k=0总方差插值 |
| 2026-11-03 | 47.042 | 14.230 | 12.913 | -1.318；same_expiry_atm | observation_bracketed；C=0.990；partial；k=0总方差插值 |
| 固定3D | 3 | 17.324 | 11.337 | -5.987；fixed_tenor_atm | P 2026-09-18–2026-09-21,w=0.333333 → T 2026-09-18–2026-09-21,w=0.666667；interpolated_between_observed_expiries；C=0.987；partial |
| 固定7D | 7 | 14.620 | 11.502 | -3.118；fixed_tenor_atm | P 2026-09-23 → T 2026-09-24；observation_bracketed；C=0.995；partial |
| 固定14D | 14 | 14.035 | 11.368 | -2.666；fixed_tenor_atm | P 2026-09-30 → T 2026-10-01；observation_bracketed；C=0.993；partial |
| 固定30D | 30 | 14.078 | 12.203 | -1.875；fixed_tenor_atm | P 2026-10-16 → T 2026-10-16–2026-10-19,w=0.333333；interpolated_between_observed_expiries；C=0.994；partial |
| 固定45D | 45 | 14.334 | 12.944 | -1.390；fixed_tenor_atm | P 2026-10-30–2026-11-03,w=0.247423 → T 2026-10-30–2026-11-03,w=0.494845；interpolated_between_observed_expiries；C=0.990；partial |

曲线为mixed：最近9/18的17.450%明显高于9/21的10.321%，其后大体随期限回升，但固定7D稍高于14D。固定3D−30D为−0.866vp、7D−30D为−0.701vp、14D−30D为−0.834vp、45D−30D为+0.741vp。它反映相对期限定价，不能单独识别“纯到期／纯事件方差”。

共同30个exact ATM全部下降，是较广泛level回落的直接算术证据；仍含到期缩短与重定价。3D两日均用Fri–Mon，但τ由2／5变成1／4，w由1/3升至2/3，槽位下降幅度不能全算作合约重估。7D与14D更换原生到期；30D从10/16原生τ30滚至10/16 τ29–10/19 τ32；45D同一bracket的w由0.247423升至0.494845。11月节点τ含夏令时变化的额外一小时，保留47.041667等精确日数。rolling_tenor_atm本期不替代已有fixed-tenor节点。

T日9/17已到期层不进入正τ term structure；目标9/18 PM为新0DTE，次日需独立更新。RV20为9.6023%，固定30D IV为12.2027%，差2.6004vp；这是历史实现波动与隐含波动的比较，不是卖波动收益保证。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

Delta约定为forward_delta_non_premium_adjusted，翼节点在观测支撑内按forward delta插值；不以固定strike变化代替fixed delta。T行的IV为%，skew与BF为vp；下一行全部为Δvp。约30日smile的ATM是同10/16的12.274%，不是固定30D的12.203%。

| Selected expiry / change | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | 25Δ downside skew | BF25 | Basis / support |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T｜7日槽位；2026-09-23 τ7→2026-09-24 τ7 | 15.982 | 13.402 | 11.502 | 10.157 | 9.328 | 3.245 | 0.277 | rolling_tenor_slot_fixed_delta；观测支撑内fixed-delta；partial |
| Δ｜T−P | -4.871 | -3.841 | -3.118 | -2.595 | -2.426 | -1.246 | -0.100 | vol points；同一行定义；materiality未校准 |
| T｜14日槽位；2026-09-30 τ14→2026-10-01 τ14 | 16.885 | 13.598 | 11.368 | 10.025 | 9.424 | 3.573 | 0.443 | rolling_tenor_slot_fixed_delta；观测支撑内fixed-delta；partial |
| Δ｜T−P | -4.155 | -3.402 | -2.666 | -2.047 | -1.747 | -1.355 | -0.058 | vol points；同一行定义；materiality未校准 |
| T｜30日槽位；2026-10-16 τ30→2026-10-16 τ29 | 19.084 | 14.932 | 12.274 | 10.785 | 10.324 | 4.147 | 0.585 | same_expiry_fixed_delta；观测支撑内fixed-delta；partial |
| Δ｜T−P | -3.216 | -2.506 | -1.804 | -1.265 | -0.941 | -1.241 | -0.082 | vol points；同一行定义；materiality未校准 |

**Level → slope → curvature。** 三条smile的ATM均下降；25Δ downside skew（IV_put25−IV_call25）均变平；BF25＝(IV_put25＋IV_call25)/2−ATM均下降，幅度见表。两侧wing premium分别为：7日槽位：put25−ATM=1.900（Δ-0.723），call25−ATM=-1.345（Δ+0.523）vp；14日槽位：put25−ATM=2.229（Δ-0.735），call25−ATM=-1.343（Δ+0.619）vp；30日槽位：put25−ATM=2.658（Δ-0.702），call25−ATM=-1.489（Δ+0.539）vp。这些派生差值同样是report-layer calculation from packet nodes；没有将小差值当作超越报价和模型误差的已确认relative-value edge。

7／14日是rolling_tenor_slot_fixed_delta，含到期轮换与样本组成；约30日是same_expiry_fixed_delta，仍含τ30→29的aging。没有原生fixed-tenor delta smile，因此不自行跨到期拟合。downside-skew是fixed-delta斜率代理，不称为统计skewness。

**候选含义。** 默认9/21到期的exact ATM可用，但其完整smile不在selected三期中，实际候选翼不能借9/24、10/1或10/16补造。方向价差须重新取得实际到期ATM、25Δ及两腿所在翼、Greeks与周五计划退出MTM；range需要另行证明含成本盈利区。partial只允许降级局部研究，EOD sidecar不授予目标日执行许可。

## 9. Key Expiry / Strike / Dealer Node

先对齐尺度：expiration表的gex_point为美元／SPX点，gex_1pct=gex_point×S×0.01；gamma strike表的gex_total／gex_dealer已是美元／1%，转换为每点须除以S×0.01。T采用raw S=7637.71、因子76.3771，P采用7552.25、因子75.5225；signed＝call−put，gross＝call＋put。下表Greek金额为十亿美元，GEX按1%变动、DEX按美元名义量；Vanna／Charm按原生有限差分定义。

| Cohort | Gross P→T | Signed P→T | DEX P→T | Vanna P→T | Charm P→T |
| --- | --- | --- | --- | --- | --- |
| 全部：P各自全链／T32行 | 425.996 → 518.926 | -71.615 → -8.173 | -32.289 → 539.873 | 1.604 → 1.668 | 34.025 → 2.345 |
| 共同30存续到期 >T | 392.347 → 495.289 | -44.587 → -28.455 | 4.992 → 527.128 | 1.512 → 1.668 | 33.807 → 2.345 |
| 共同29到期 >target | 119.870 → 148.025 | -31.899 → -11.900 | -120.754 → 42.025 | 1.543 → 1.458 | 1.719 → 2.356 |
| 共同存续纯AM | 288.371 → 353.468 | -9.993 → -16.147 | 151.438 → 536.980 | -0.065 → 1.394 | 34.052 → 0.350 |
| 共同存续纯PM | 103.976 → 141.821 | -34.593 → -12.308 | -146.446 → -9.852 | 1.577 → 0.274 | -0.246 → 1.995 |

全链各自总量行包含不同到期组成，不能解释为同一仓位的净流；共同cohort才用于变动判断。本期正日历DTE为31行、剔目标后30行，其中10/26的OI/GEX为0；严格共同cohort为30／29。T已到期gross为23.637B、signed为+20.283B，不能跨日搬用；本期未提供T0的selected strike map，不能擅自把这笔暴露分配到具体strike。

原生Vanna使用IV±0.5vp的DEX差，Charm为固定PM16:00／AM17:00参考推进至下一交易日的DEX差。9/18 AM在T日17:00已触及代码采用的前一交易日截止，Vanna／Charm／Volga输出0；这是模型截止产生的0值，不是经济结算完成或真实hedge unwind。raw IV估值16:00与二阶参考17:00也不同。其余存续二阶值继续按原生定义使用；全链VEX为1.365B、剔T0 Volga响应为10.762B，不混为同一量。

| Expiry / layer | Gross B /1% | Signed B /1% | OI | T+1 treatment |
| --- | --- | --- | --- | --- |
| 2026-09-17 T已到期 | 23.637 | 20.283 | 374,979 | T0；二阶不可用 |
| 2026-09-18 目标日混合 | 347.264 | -16.555 | 6,308,315 | AM／PM分开，不跨期继承 |
| 2026-09-18 目标AM | 302.392 | -12.762 | 5,598,009 | AM／PM分开，不跨期继承 |
| 2026-09-18 目标PM | 44.872 | -3.793 | 710,306 | AM／PM分开，不跨期继承 |
| 2026-09-21 默认候选到期 | 8.699 | 0.142 | 116,686 | T+1存续 |
| 2026-09-30 月末存续 | 27.389 | -4.735 | 917,425 | T+1存续 |
| 2026-10-16 较远存续 | 55.676 | -3.687 | 2,422,873 | T+1存续 |

9/18 gross占全链66.9198%、剔T0后70.1134%，其中AM87.0784%；明早AM开盘结算与PM日内衰减是两条不同路径，不能用mixed peak推断XSP PM pin。

以下节点统一为**百万美元／SPX点**：共同selected只含9/18＋10/16；共同剔目标仅10/16。T当前selected另外含9/30，其到期后地图是9/30＋10/16，专列而不冒充同样本迁移。

| SPX | 共同9/18＋10/16 P→T | 共同10/16 P→T | T全部selected | T去9/18后 | Role |
| --- | --- | --- | --- | --- | --- |
| 7550 | -62.021 → -37.272 | -2.393 → -2.399 | -42.031 | -7.157 | 第二下行延伸检查 |
| 7575 | -14.031 → -11.054 | -0.209 → -0.075 | -13.732 | -2.753 | 下行中间节点 |
| 7600 | -22.131 → -6.752 | -3.320 → -4.195 | -22.112 | -19.555 | 下行首查／走廊下沿 |
| 7625 | -9.040 → -18.022 | -1.418 → -1.563 | -20.302 | -3.844 | 下行确认／核心下沿 |
| 7650 | 1.923 → 15.453 | -3.736 → -3.998 | 11.284 | -8.167 | 上行确认／核心上沿 |
| 7675 | 6.439 → 15.642 | 0.635 → 0.744 | 18.243 | 3.344 | 上行首查／走廊上沿 |
| 7680 | 12.936 → 35.502 | -0.173 → -0.198 | 35.666 | -0.034 | 即将到期的正节点 |
| 7700 | 41.024 → -5.714 | -3.055 → -2.965 | -12.581 | -9.832 | 后续上行检查，存续signed偏弱 |
| 7750 | 13.355 → -2.725 | 2.665 → 4.194 | 2.993 | 9.912 | 更高节点背景 |
| 7800 | 16.829 → 13.174 | 9.298 → 15.610 | 21.924 | 24.361 | 较长到期的正层背景 |

当前selected覆盖剔T0 gross的86.8845%，去目标后覆盖56.1159%；两种口径外未选中部分signed均约−3.478B，不能把selected当全链。7650的目标AM／PM signed分别+18.151／+1.300百万／点；7675为+3.922／+10.977；7680为+21.866／+13.834。上方纯PM并非全无正层，但7650在去目标后的负值要求实盘另证修复。节点不是已知dealer挂单、成交量支撑或必达目标。

## 10. T+1 Decision Map, Structural View and Plan Grade

| State | Observable rule | Decision / source requirement |
| --- | --- | --- |
| Core／corridor | 7625–7650为核心；7600–7675为较宽观测走廊 | O_RANGE：价格处于其中不自动触发方向或区间策略；range重新确认见下文。 |
| Upside／Base | O_UP：两根连续完整5分钟收盘严格>7650 | O_SIGN_UP：两次确认均见可交易PM局部7650–7680净正、新9/18 PM0DTE净正；PM负压较冻结基线收窄或非负；到期后全链不比基线更负。 |
| Downside／Risk | O_DOWN：两根连续完整5分钟收盘严格<7625 | O_SIGN_DOWN：两次确认均见到期后全链、未到期PM、7625–7600局部、新9/18 PM0DTE四层净负。 |
| Gap | O_GAP_UP／O_GAP_DOWN | 若开盘已越过触发位，须后续bar交易回到上行≤7650／下行≥7625再重新计两根接受bar；无retest不追，越过首查节点或拟选short也不追。 |
| Invalidation | O_REJECT／O_RECLAIM在入场时必须未触发 | 上行：一根收盘≤7650且下一完整bar未交易回其上；下行：一根收盘≥7625且下一完整bar未交易回其下。检测到即取消／退出；风险上限或结构失败可以更早退出。 |
| Event／configuration | O_RESET、O_CAL、O_CONFIG | 09:15实际发布和开盘AM/PM分层完成；spot、forward、地图、IV、报价及容忍度先冻结，再令t0为≥09:30的下一个完整5分钟起点。日程时间经过不等于重置完成。 |
| Vol shock | O_VOL：15分钟窗口 | VIX上升≥1.0点或实际候选同到期ATM IV上升≥2.0vp即重置；行情年龄≤30秒。属于工作流阈值，非经验校准alpha。 |
| Node migration | O_NODE：同方法地图、年龄≤300秒 | 节点移动超过预先冻结的数值容忍度即清零计数和候选排名；容忍度当前null，不能用价格接受代替地图。 |
| Quote／mapping | O_QUOTES、O_MAPPING | 逐腿有效、同时间基准，报价年龄≤30秒；有效正mid时组合价差/mid≤25%。SPX/XSP偏差与carry-parity容忍度须在t0前量化冻结。 |
| Surface／value | O_SURFACE、O_VALUE | 实际期限、ATM／25Δ／腿翼与Greeks重新核对；目标、Adverse、Invalidation、计划退出清算值全量重估，检查净目标支持与风险。 |
| Capability／risk／time | O_BROKER、O_RISK、O_TIME | 原子多腿net-limit、真实风险账本和退出窗口均须可核验；缺任一必需能力则不新增。 |

**post-event range reconfirmed。** 至少3根完整5分钟bar处于冻结核心或明确重验的走廊，无波动／节点重置，且live spot、同到期forward、中心不确定区间全部位于扣除成本后的情景盈利区并保留正缓冲，才开启centered-stability／bounded-range的新一轮筛选。方向尚未释放与range已获验证是两个不同状态。range thesis failure包括收盘越界、节点／波动重置或盈利区包含关系丧失；这不自动触发方向反转，仍须O_UP或O_DOWN全链条件。

**Plan Grade与执行分开。** B / Conditional Next-Day Plan：路径、失效、有限风险与重选流程可定义；IV partial、AM模型时钟与未核实估值／broker／风险账本使其不能升为更完整计划。core formal没有hard failure，未来字段尚未生成和portability=none本身不构成C。当前无价格优势确认，execution仍为requires_external_live_source。只有core证据失效、路径／失效不可定义或无有限风险研究模板时，才是盘后无合格计划；目标日某门禁实际失败则是该日取消新增。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk / execution | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| base | directional_continuation / call debit vertical | 修复路径匹配 | background_only；IV Gate=not_applicable | pending_live_repricing；edge=not_established；execution=external_required | conditional | 重取9/21本期腿翼，验证7675清算值 |
| risk | directional_continuation / put debit vertical | 负残余释放路径匹配 | background_only；IV Gate=not_applicable | pending_live_repricing；edge=not_established；execution=external_required | conditional | 重取9/21本期腿翼，验证7600清算值 |
| separate_research | directional / broken-wing butterfly | 方向可构造有限风险替代 | required；IV Gate=conditional | unavailable；edge=not_established；execution=pending | not_screenable | 缺候选曲率、尾部估值和比较 |
| range_review | centered_stability / debit butterfly / defined-risk iron fly | 7650/7680到期节点不构成已验证持久中心 | required；IV Gate=conditional | unavailable；edge=not_established；execution=pending | reject | 须中心不确定区间包含于净情景盈利区 |
| range_review | bounded_range / defined-risk condor | 观测走廊不等于有效双边边界 | required；IV Gate=conditional | unavailable；edge=not_established；execution=pending | reject | 须独立range确认、尾部和净盈利区测试 |
| event_review | two_sided_expansion / long straddle / strangle | 事件可能扩张但成本后幅度未定义 | required；IV Gate=conditional | unavailable；edge=not_established；execution=pending | not_screenable | 缺所需运动幅度与theta/vega模型 |
| separate_research | term_relative_value / calendar / diagonal | 超出本次日内方向计划 | required；IV Gate=not_applicable | unavailable；edge=not_established；execution=pending | not_applicable | 另立期限模型与持有范围 |

筛选保留的是条件家族，并未确认价格优势。Fly／condor当前reject的原因是中心或边界未被重验、净情景盈利区未证明，不能把5–10点中心误差单独当否决理由；O_RANGE通过后可重筛。BWB、双边扩张和期限结构没有足够的候选估值依据，不补造另一套推荐。

###  Local Candidate Comparison

| Candidate rule / EOD example scope | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Base call：long anchor 765及相邻764／766；宽3／5；9/18、9/21、9/22共18组合 | 方向结构：中心包含测试not_applicable；检查7675计划时点净清算值 | 默认9/21 target3DTE，实际smile缺失须live重取 | 四情景及净目标缓冲pending；不得用EOD到期收益选优 | 逐候选live Δ／Γ／V／Θ重算 | 全成本／age／spread／原子net-limit待核 | none | deferred_to_t1；winner=null |
| Risk put：762.5映射最近挂牌763（半点平局向上），相邻762／764；同宽度／三到期18组合 | 方向结构：中心包含测试not_applicable；检查7600清算值 | 9/18 target0DTE、9/22 target4DTE仅敏感性对照，非保留替代 | 同上；方向成立也可能成本后不合格 | 同上 | 同上 | none | deferred_to_t1；winner=null |

盘后网格共36组，其中默认9/21仅12组，另24组是期限敏感性对照。所有结果无赢家；目标日必须先重新居中／选腿，再比较相邻long、3／5宽度、净清算情景、实际成本和剩余预算。两腿价差只有1:1版本，本期不伪造不对称body。若另起range研究，spot、forward及中心不确定区间必须全部落入live含成本情景盈利区并留正缓冲；这里两张方向卡不强制当前spot已在未来盈利区，而检验目标路径与退出损益。

### Base Candidate Template — Base Case

| Field | Candidate-template specification |
| --- | --- |
| Setup / scenario | Base / recovery / call debit vertical；directional_continuation；conditional；candidate_template；portability=none；fixed legs仅示例，live selected legs=pending。 |
| Expiry / holding | 默认9/21：T4→target3日历DTE；周五持有≤60分钟，按第10节deadline退出，不跨夜／周末。 |
| 适用状态 / activation | 7650上方接受且PM局部／新PM0DTE净正、PM及存续层符合修复；O_REJECT未触发；公共O_RESET至O_TIME门禁全部通过。 |
| Long / short / width rule | 实际触发附近按live spot/forward选最近挂牌long与相邻±1；call short在long上方，宽3或5点比较；同到期1:1、无body。先通过四情景再选宽度；节点／事件变化即re-center、re-strike并重新排名。半点映射规则只是EOD网格假设，不能固化到live。 |
| IV / Greek fit | 实际9/21 ATM可作背景，完整候选smile需live；核对25Δ和两腿所在翼、event kink、期限与周末时间价值。预期方向Delta随路径匹配，Gamma／Vega／Theta依实时moneyness与翼变动，不能固定沿用示例符号。live_surface_refresh=pending。 |
| Cancel / invalidate | 入场前任一确认、retest、报价／价值／风险／时间门禁未成立则不新增；跳过7675或拟选short不追。入场后O_REJECT或修复失败即取消／退出，风险上限可更早处理。 |
| Payoff / risk / price | 客户净支付d>0；ML、MP、BE、d_risk和d_live统一见上式，实际N/C/L/H未知；单setup总风险≤300美元、当日聚合≤500。到期盈利区为高于Call含成本BE，不能替代周五MTM。price_bound=live pending；尾部损失受完整价差限制，止损成交价不保证。 |
| Valuation / execution | pricing_assessment=pending_live_repricing；edge_evidence_status=not_established；execution_feasibility=external_required。必须取得实时候选估值／清算折价、quote、地图和broker风险账本；无校准概率，不宣称真实世界正期望。 |
| Reassessment / why / failure | 先在7675重新估值；路径与价值仍成立才考虑7680／7700。卖出远端腿降低净支付且封顶盈利，是否优于单买期权取决于live情景与成本；方向错误、速度不足、IV／翼回落或滑点均可能导致失败。time stop引用第10节，不以到期最大收益替代目标。 |
| Illustrative EOD diagnostics only | buy 1×XSP260921C00765000（bid/mid/ask 2.370/2.395/2.420）；sell 1×XSP260921C00770000（0.630/0.650/0.670）；组合bid/mid/ask=1.700/1.745/1.790；synthetic_only；Δ/Γ/V/Θ=+0.2678/+0.0151/+0.1048/-0.1566（vendor原生单位，净一组）；N=1 unit_payoff_example，ask压力下C=6→16美元：ML 185→195美元，MP 315→305，到期BE 766.85→766.95；无body；两腿ratio1:1，width5；7650／7700对应映射gap均0；T16:00ET：XSP763.78，rawSPX/10=763.771，指数gap+0.009；binding=false；不用于live选腿、限价或Plan Grade |

### Risk-Path Contingency

| Field | Candidate-template specification |
| --- | --- |
| Setup / scenario | Risk / downside release / put debit vertical；directional_continuation；conditional；candidate_template；portability=none；fixed legs仅示例，live selected legs=pending。 |
| Expiry / holding | 默认9/21：T4→target3日历DTE；周五持有≤60分钟，按第10节deadline退出，不跨夜／周末。 |
| 适用状态 / activation | 7625下方接受且四层负值一致；O_RECLAIM未触发；公共O_RESET至O_TIME门禁全部通过。 |
| Long / short / width rule | 实际触发附近按live spot/forward选最近挂牌long与相邻±1；put short在long下方，宽3或5点比较；同到期1:1、无body。先通过四情景再选宽度；节点／事件变化即re-center、re-strike并重新排名。半点映射规则只是EOD网格假设，不能固化到live。 |
| IV / Greek fit | 实际9/21 ATM可作背景，完整候选smile需live；核对25Δ和两腿所在翼、event kink、期限与周末时间价值。预期方向Delta随路径匹配，Gamma／Vega／Theta依实时moneyness与翼变动，不能固定沿用示例符号。live_surface_refresh=pending。 |
| Cancel / invalidate | 入场前任一确认、retest、报价／价值／风险／时间门禁未成立则不新增；跳过7600或拟选short不追。入场后O_RECLAIM或负向层失效即取消／退出，风险上限可更早处理。 |
| Payoff / risk / price | 客户净支付d>0；ML、MP、BE、d_risk和d_live统一见上式，实际N/C/L/H未知；单setup总风险≤300美元、当日聚合≤500。到期盈利区为低于Put含成本BE，不能替代周五MTM。price_bound=live pending；尾部损失受完整价差限制，止损成交价不保证。 |
| Valuation / execution | pricing_assessment=pending_live_repricing；edge_evidence_status=not_established；execution_feasibility=external_required。必须取得实时候选估值／清算折价、quote、地图和broker风险账本；无校准概率，不宣称真实世界正期望。 |
| Reassessment / why / failure | 先在7600重新估值；路径与价值仍成立才考虑7575／7550。卖出远端腿降低净支付且封顶盈利，是否优于单买期权取决于live情景与成本；方向错误、速度不足、IV／翼回落或滑点均可能导致失败。time stop引用第10节，不以到期最大收益替代目标。 |
| Illustrative EOD diagnostics only | buy 1×XSP260921P00763000（bid/mid/ask 2.660/2.685/2.710）；sell 1×XSP260921P00758000（1.280/1.300/1.320）；组合bid/mid/ask=1.340/1.385/1.430；synthetic_only；Δ/Γ/V/Θ=-0.1997/+0.0138/+0.0646/-0.0328（vendor原生单位，净一组）；N=1 unit_payoff_example，ask压力下C=6→16美元：ML 149→159美元，MP 351→341，到期BE 761.51→761.41；无body；两腿ratio1:1，width5；long相对触发映射gap=+0.5 XSP点（+5 SPX点），short对其7580映射gap=0；T16:00ET：XSP763.78，rawSPX/10=763.771，指数gap+0.009；binding=false；不用于live选腿、限价或Plan Grade |

### Alternative Setups

无额外保留卡片。9/18与9/22仅为敏感性比较，不能在默认候选失败后自动切换；range重新确认只开启新筛选，不自动追加第三张卡。所有卡片均为欧洲式、现金结算XSP PM，完整两腿共同持有和退出。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

只有7650上方接受、PM局部／新PM0DTE与存续层修复、公共门禁全部通过且O_REJECT未触发，才评估call debit vertical；7675首先重新估值，随后7680／7700仍需路径与价值支持。若触发前已走到首查节点、重置未结束、价值不足或时间窗不够，则取消；O_REJECT或修复失败为入场后失效。

### Risk Case

只有7625下方接受且四个负向层一致，才独立评估put debit vertical；7600先查，7575／7550为条件后续节点。O_RECLAIM或负向层失效即取消／退出。Base失效本身不是做空信号，两卡不能同时占用风险预算。

### 四类清算情景

以下是每卡自己的目标、Adverse、Invalidation及计划退出状态，使用同一9/21到期的live清算估值。表中spot只是待验情景坐标，不代表预测、已发生路径或到期结算值。

| Candidate | Scenario | Spot condition | Elapsed / exit | IV / wing assumption | Valuation status |
| --- | --- | --- | --- | --- | --- |
| Base call | target | 767.50 XSP | 30min after entry | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |
| Base call | adverse | 762.50 XSP | 15–30min adverse path | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |
| Base call | invalidation | 765.00 XSP | Actual reclaim/rejection time | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |
| Base call | planned_exit | 实际状态 | Earliest of entry+60min and session/broker limit | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |
| Risk put | target | 760.00 XSP | 30min after entry | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |
| Risk put | adverse | 765.00 XSP | 15–30min adverse path | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |
| Risk put | invalidation | 762.50 XSP | Actual reclaim/rejection time | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |
| Risk put | planned_exit | 实际状态 | Earliest of entry+60min and session/broker limit | 实际9/21 ATM 0／±2vp及不利翼变化敏感性；不是预测 | pending；V_exit／净P&L／N／成本／概率均null |

30分钟目标情景与15–30分钟逆向情景是本报告敏感性设定；实际持仓触及失效或deadline时以实际状态重估。模型方法、参数、报价与清算折价须记录；目标净支持为正并不能证明真实世界P下正期望，没有概率就不计算预期收益。不能拿上节到期BE、ML／MP或到期intrinsic替代周五退出MTM。

### No-Trade Case

盘后核心formal失败、路径／失效无法定义或没有有限风险家族才是无合格计划；本期未触发。目标日若必需数据／能力不可用，触发未确认、gap未retest、事件／vol／map未reset，或者报价、净目标价值、风险预算、时间条件失败，则不新增；已有仓位按风险与失效退出。只有在有效窗口内完成reset、重新筛选和所有实时门禁后才能再评估，不能把pending当pass，也不能通过不断改阈值追认信号。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on view / grade / execution |
| --- | --- | --- |
| PM／存续signed与新0DTE | 验证本期修复是否在AM层退出后继续 | PM/post-target转弱削弱upside prior；结构不可定义才影响Plan Grade；未取得live只限制Execution。 |
| 7650／7625、gap和节点迁移 | 区分真实接受、越位追涨／杀跌与中心更换 | 按对应condition取消／重新计数；无需因单次触碰修改EOD评级。 |
| 9/18工业生产、开盘／SET状态及VIX／ATM | 防止事件前排名跨重置继续生效 | 实际shock要求重置quote portability与map，不把固定时钟当完成。 |
| 9/21候选期限／25Δ／腿翼／清算价值 | 同方向也可能因时间与波动变化亏损 | 净支持不足即价格不合格，改变execution而非自动改变结构方向。 |
| 实际成本、L／H／N与deadline | 限定可损失金额和有效持有窗口 | 一项未确认则不新增；预算耗尽或两次thesis failure停止当日新计划。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
