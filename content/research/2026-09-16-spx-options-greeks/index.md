+++
title = "SPX期权持仓与Greeks结构分析-260915"
date = "2026-09-16"
data_as_of = "2026-09-15"
draft = false
description = "分析9月15日期权持仓与Greeks结构、FOMC日上午条件路径及实时确认要求。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "9c6cdb7857ea6ec3fc43f3704bda40b49092504b92b6fcb9768df7e3de0e0542"
+++

# SPX期权持仓与Greeks结构分析-260915

## 1. 结论

T 日共同存续合约的负向 modeled signed Gamma 继续加重，9 月 16 日维持 **downside_bias**，等待 7550 下方确认，同时保留 7600 收复分支；计划为 **B / Conditional Next-Day Plan**，执行状态 **requires_external_live_source**，候选只覆盖上午窗口，EOD 报价仅作诊断，属盘后条件计划、非实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | 条件式 downside_bias；下破优先，独立保留收复路径；structural confidence：medium。 |
| Earliest evaluation | 9/16 不早于 09:40 ET，实际为 t0+10 分钟；先完成 08:30 零售/进出口价格发布后的重置、开盘基线与参数冻结；13:00 后取消新入场。 |
| Base activation | 若 7550 下方两根完成 5 分钟收盘且实时负向结构一致，则评估 put debit vertical → 7500，其后才复核 7450 → reclaim 7550 或负向证据失败即取消。 |
| Downside branch | 与 Base 同一路径、同一上午窗口：7550 下接受后评估 put debit vertical → 7500 → reclaim 7550 失效；不叠加第二个 setup。 |
| Upside branch | 同一上午窗口，若 7600 上接受、局部与新 0DTE 转正且 PM 负压收窄，则评估 call debit vertical → 7625，其后复核 7650 → rejection 7600 失效。 |
| Otherwise | No Trade / observe only；确认、回测、重置或必要门禁未完成时观察；13:30 前退出，下午 FOMC 后不自动恢复这两张卡片。 |

Plan Grade：**B / Conditional Next-Day Plan**；Execution Status：**requires_external_live_source**；盘后条件计划，非实时下单指令。

## 3. Executive Summary

- 共同 31 个存续到期日的 signed GEX 从 −23.808B 降至 −36.250B USD/1% move，负向变化约 99.45% 来自 PM；同集合 gross GEX 反而下降 1.471%，不能用 gross 大小代替方向。
- Base 等待 7550→7500→7450 的条件延续；Risk 为 7600→7625→7650 的独立修复。7700 共同存续节点转强正，是需要跟踪的反向证据。
- 7585 表面大节点的绝对 signed 暴露有 95.58% 随 T 日到期消失；剔除目标日 9/16 到期后，全链仍留有 −31.118B 的负向残余。
- 9/18 占剔除 T 到期后 gross GEX 的 65.68%，其中 AM 占 89.30%；AM 集中度不能推导 PM 稳定中心。
- Formal IV 为 partial：前端 ATM 上升，滚动 smile 主要为水平抬升、put-call 斜率小幅扩大、BF25 下降；7D/14D put 翼相对 ATM 溢价下降，不能笼统称为全面陡化。
- 08:30 数据使 EOD Quote Portability=none；两张有限风险候选须事件后重选腿与估值，13:30 前退出。价格优势尚未建立，计划等级不代表胜率或执行许可。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T−1 | T | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 价格、波动与利率 | raw SPX 7620.10；VIX 17.10；2Y/10Y 4.65%/4.97% | raw SPX 7586.05；VIX 17.20；2Y/10Y 4.67%/5.00% | raw −34.05 点 / −0.447%；VIX +0.10；利率 +2/+3bp | raw 观察时点不同；FRED/RV仍停在9/14，不能将其旧收益当作T日收益。 |
| 共同存续31到期 | gross 389.818B；signed -23.808B | gross 384.085B；signed -36.250B | gross -1.471%；signed -12.442B | 两期都移除截至T已到期合约；负向残余加重。 |
| 共同目标日正DTE30到期 | signed -20.371B | signed -31.118B | -10.747B | 进一步移除9/16后，负向背景仍在。 |
| AM / PM与二阶状态 | signed −2.054/−21.753B；DEX 318.204B | signed −2.123/−34.127B；DEX 106.955B | PM负向变化占99.45%；Vanna合计−1.402→−2.839B | Vanna方向在AM/PM间相反；Charm两期固定session reference到下一交易日均为1天。 |
| 新0DTE与关键节点 | 9/16 signed −3.436B、OI153,067；共同selected 7700为−7.878百万/点 | 9/16 signed −5.132B、OI206,947；共同selected 7700为+84.879百万/点 | 目标到期signed −1.696B；7700由负转正 | 负向总量加重与上方正层增强同时存在；目标0DTE须重建。 |
| ATM：同到期与期限槽位 | 9/16 16.190%；9/17 16.573%；9/18 16.395% | 9/16 18.937%；9/17 18.304%；9/18 20.645% | same_expiry_atm：+2.747/+1.731/+4.250vp；名义3D +4.072vp | 3D来源9/17→9/18，含组成和取样时点变化；同到期也上升，不能归为纯事件方差。 |
| 滚动fixed-delta smile | ~7D 9/21；~14D 9/28；~30D 10/14 | ~7D 9/22；~14D 9/29；~30D 10/15 | ATM +0.682/+0.501/+0.385；skew25 +0.028/+0.059/+0.172；BF25 −0.115/−0.063/−0.009vp | rolling_tenor_slot_fixed_delta；经济显著性未经校准，partial质量更弱。 |

除节点明确写“百万/点”外，GEX 的 B 为十亿美元／1% SPX 变动；DEX 为美元。相同到期集合消除了直接比较不同篮子的错误，但价差仍混合价格、IV、OI、期限与取样时点。

9/14 实际 Markdown 的先验为 downside_bias：Base 7600→7550→7500 put，Risk 7650→7700→7750 call，等级 B。T 日结束位置低于旧 7600、仍高于 7550，只能核对终点，不能证明盘中满足完整触发：**historical trigger=not_verifiable；execution / P&L=not_supplied**。本期保留下行先验，将确认线调整为 7550/7600，属于市场结构更新；B→B 是计划质量分类相同，low→none 是事件前报价权限变化。前期实际正文与原验收字节不同，复核以实际正文为准并保存两者身份。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

1. 纽约联储 9/15 的 Empire 调查显示活动仍增长，但一般商业状况指数降至 7.6；投入与销售价格指数升至 63.1、28.1。样本回答在 9/2—9/10，官方发布为 08:30 或稍后，位于本期报价之前；精确首发秒数未知。这是区域活动与价格压力的并存，不能直接推导全国增长或 Fed 决策。[纽约联储原文](https://www.newyorkfed.org/survey/empire/empiresurvey_overview)
2. AP 的 9/15 收盘简报记录 SPX 7585.73、下跌 34.25 点，并将市场压力与油价和收益率上升联系。索引发布时间为 16:17:03 ET，正文已取得，归为 **post_data_after_close**；其收盘比结构代理低 0.32 点，只作外部核对，不替换 Greek 分母。媒体归因不是因果识别。[AP 收盘简报](https://apnews.com/article/wall-street-stocks-dow-nasdaq-b1b1bc9f943da62c6a639a8761b4eca3)
3. FOMC 定于 9/16 14:00 发布决议、14:30 举行记者会；这是已知日历背景，会议结果未知。本报告据此选择上午持有窗口，并不假设事件溢价在退出前保持不变。[美联储日历](https://www.federalreserve.gov/newsevents/2026-september.htm)

| ET时间 | 事件 | 影响分类 | 与持有窗口的关系 |
| --- | --- | --- | --- |
| 9/16 08:30 | 零售 / 进出口价格 | hard_reset | Base、Risk均在其后评估；实际信息、市场反应与新基线完成才重新计数。 |
| 9/16 10:00 | 商业库存 | monitoring_only | 处于上午窗口；检查实际冲击，不能仅因日历存在就停掉全天。 |
| 9/16 14:00 / 14:30 | FOMC决议 / 记者会 | hard_reset | 两张上午卡片按计划13:30结束；下午不能沿用旧计数、排名与估值。 |
| 9/17 08:30 | 初请 / 新屋开工 / 费城联储 | monitoring_only | 9/17与9/18候选到期价值都包含；在计划退出之后。 |
| 9/18 09:15 | 工业生产 / 产能利用率 | monitoring_only | 9/18后备额外事件；另有月度/季度OpEx，AM/PM分别处理。 |

零售、周四数据与周五工业生产时点已核对[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)，进出口价格另核对[BLS日历](https://www.bls.gov/schedule/2026/09_sched.htm)。分类是本报告的分支管理判断；未来实际冲击尚未知。日历历史发布秒数未取得，未使用未来结果或无法定位版本的更新，也未取得同步隔夜行情。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 共同存续合约继续偏弱

- **Claim：**下行路径优先，但须等待7550下方确认。
- **Evidence / basis：**共同31到期gross389.818→384.085B；signed-23.808→-36.250B；DEX318.204→106.955B。raw proxy−0.447%，VIX+0.10。〔C1；正式包观测与报告计算，路径判断为 mechanism_based〕
- **Mechanism / assumptions：**signed变化-12.442B，PM占99.45%。在库存代理成立时，负Gamma可能放大已发生的方向；价差混合重估、时点与OI变化。
- **T+1 Implication：**7550下接受且实时各层一致后，才评估put vertical。
- **Falsifier：**收复7600且实时结构修复；或下破时局部/新0DTE不支持。
- **Confidence：**medium；机制性先验，未作独立路径检验。

### Thesis 2 — 到期峰值消失后仍有负向残余

- **Claim：**7585旧峰值不能继承为明日pin。
- **Evidence / basis：**T0DTE signed-34.235B；剔除后-36.250B；再剔除9/16后-31.118B。7585节点95.58%绝对signed随T到期消失。〔C2；正式包观测与报告计算，路径判断为 mechanism_based〕
- **Mechanism / assumptions：**区分已到期层、次日新0DTE和更长期残余。高Gamma峰值不是跨日稳定中心。
- **T+1 Implication：**单独重建9/16新0DTE；不直接围绕7585做pin或区间交易。
- **Falsifier：**新0DTE和存续节点转向稳定回归，且区间、净盈利区与完成bars独立确认。
- **Confidence：**medium；机制性先验，未作独立路径检验。

### Thesis 3 — 下方负节点与上方正层同时增强

- **Claim：**7550下破和7600收复需要不同的实时证据。
- **Evidence / basis：**剔除目标到期后的selected signed：7550 -61.483、7500 -78.379、7450 -17.159；7600 -41.266、7625 -14.528、7650 -19.532、7700 84.879百万USD/SPX点。〔C3；正式包观测与报告计算，路径判断为 mechanism_based〕
- **Mechanism / assumptions：**共同selected9/18+10/16的7700由负转强正，是下行先验的反证观察；7600一带仍负，单纯穿线不足以证明修复。
- **T+1 Implication：**Base7550→7500→7450；Risk7600→7625→7650；7700为后续正层观察，不延伸成额外卡片。
- **Falsifier：**节点迁移超容忍度、负向确认失败、reclaim7550或rejection7600。
- **Confidence：**medium；机制性先验，未作独立路径检验。

### Thesis 4 — AM主导gross，PM主导负向变化

- **Claim：**净Greek不是已经发生的做市商交易流。
- **Evidence / basis：**共同AM/PM signed-2.123/-34.127B；Vanna-3.812/0.973B；Charm合计15.726B。9/18gross中AM占89.30%。〔C4；正式包观测与报告计算，路径判断为 mechanism_based〕
- **Mechanism / assumptions：**Vanna为±0.5vp有限差分；二阶模型以PM16:00、AM17:00固定session reference计算，两期Charm均前推下一交易日1天。行情输入时点20:24→16:00不同，但不是Charm时间步长改变；AM/PM Vanna方向相反。
- **T+1 Implication：**同时检查PM负压与AM/PM抵消；9/18AM交易与结算时钟独立，不把gross大等同稳定PM锚。
- **Falsifier：**库存符号或实际spot/IV路径不符合代理假设；实时PM或新0DTE方向变化。
- **Confidence：**medium；机制性先验，未作独立路径检验。

### Thesis 5 — 前端抬升，smile主要表现为水平变化

- **Claim：**ATM上升明显，但本期不能概括为所有下行翼相对ATM都更贵。
- **Evidence / basis：**同到期9/16/17/18 ATM变化+2.747/+1.731/+4.250vp；名义3D+4.072vp。滚动smile ATM+0.682/+0.501/+0.385，skew25+0.028/+0.059/+0.172，BF25−0.115/−0.063/−0.009vp。〔C5；正式包观测与报告计算，路径判断为 mechanism_based〕
- **Mechanism / assumptions：**3D来源9/17→9/18，当前τ3、前期τ2.8163；同到期也升，但含aging/时点差。7D/14D put25相对ATM溢价反而下降；level、slope与curvature须分开。partial质量进一步变弱，经济显著性未校准。
- **T+1 Implication：**比较9/17首选与9/18后备的实时翼和退出估值；9/18更高IV不等于其价格更优。
- **Falsifier：**实际选腿翼成本、live情景或流动性不支持；方法或节点质量变为不可用。
- **Confidence：**low；机制性先验，未作独立路径检验。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| 同集合负signed残余扩大，PM主导 | 实际做市商库存未知；价差混合状态重估与OI变化 | C1–C3主导下行条件先验，不能给涨跌概率。 |
| 7550、7500负节点增强 | 7700共同selected signed由−7.878变为+84.879百万/点 | 保留7600收复分支，逐级检查7625/7650；正上层不保证从现价反弹。 |
| PM负压与raw价格下跌一致 | AM/PM Vanna相反，9/18gross高度集中在AM | 净Greek变化不等于确定的对冲卖出量。 |
| 前端ATM和绝对put IV上升 | 7D/14D put25相对ATM溢价降低；BF25下降，且partial质量更弱 | 降低IV结论置信度；候选必须以自身live翼和情景价值证明可行。 |
| 上午有可定义的方向触发与风险边界 | 08:30及下午FOMC可能改变全部状态 | 事件后先重建；上午窗口不足即取消，不将旧路径自动延后到下午。 |

Structural confidence=**medium**；path confidence 为 **mechanism_only / not_tested**。价格、VIX与Greeks不是独立历史验证样本。O_UP+O_SIGN_UP 完成、或重置后关键结构改变，才可能改变 directional prior；报价过宽、预算不足、能力缺口主要改变 execution status。计划质量与价格优势分别判断，数据通过验收不会自动提高胜率。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T−1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09-16 / 目标0DTE / FOMC | τ 1.8163→1.0000日 | 18.937% | +2.747vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.993；同到期含aging |
| 09-17 / 首选候选 / 旧3D | τ 2.8163→2.0000日 | 18.304% | +1.731vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.994；同到期含aging |
| 09-18 / 后备候选 / dominant PM / 新3D | τ 3.8163→3.0000日 | 20.645% | +4.250vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.995；同到期含aging |
| 09-21 / 旧7D来源 | τ 6.8163→6.0000日 | 14.168% | +0.742vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.995；同到期含aging |
| 09-22 / 新7D / smile | τ 7.8163→7.0000日 | 14.107% | +0.748vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.995；同到期含aging |
| 09-28 / 旧14D来源 | τ 13.8163→13.0000日 | 13.205% | +0.442vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.994；同到期含aging |
| 09-29 / 新14D / smile | τ 14.8163→14.0000日 | 13.264% | +0.400vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.994；同到期含aging |
| 10-14 / 旧30D来源 | τ 29.8163→29.0000日 | 13.467% | +0.267vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.995；同到期含aging |
| 10-15 / 新30D / smile | τ 30.8163→30.0000日 | 13.586% | +0.286vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.995；同到期含aging |
| 10-22 / 新增原生节点 | τ 37.0000日；P节点无 | 13.909% | unavailable：prior_node_unavailable | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.995；同到期含aging |
| 10-23 / 旧45D下界 | τ 38.8163→38.0000日 | 13.638% | +0.210vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.995；同到期含aging |
| 10-30 / 新45D / 旧上界 | τ 45.8163→45.0000日 | 13.979% | +0.210vp；same_expiry_atm | SPXW PM；含FOMC及之后相应事件 | k=0总方差插值；observation_bracketed；q=0.996；同到期含aging |
| 名义3D | 当前下/上τ=3.0000/3.0000 | 20.645% | +4.072vp；fixed_tenor_atm | PM；observed | P：09-17(2.8163)–09-17(2.8163)，w=0.0000 → T：09-18(3.0000)–09-18(3.0000)，w=0.0000；no_extrapolation=true；q=0.995 |
| 名义7D | 当前下/上τ=7.0000/7.0000 | 14.107% | +0.682vp；fixed_tenor_atm | PM；observed | P：09-21(6.8163)–09-21(6.8163)，w=0.0000 → T：09-22(7.0000)–09-22(7.0000)，w=0.0000；no_extrapolation=true；q=0.995 |
| 名义14D | 当前下/上τ=14.0000/14.0000 | 13.264% | +0.501vp；fixed_tenor_atm | PM；observed | P：09-28(13.8163)–09-28(13.8163)，w=0.0000 → T：09-29(14.0000)–09-29(14.0000)，w=0.0000；no_extrapolation=true；q=0.994 |
| 名义30D | 当前下/上τ=30.0000/30.0000 | 13.586% | +0.385vp；fixed_tenor_atm | PM；observed | P：10-14(29.8163)–10-14(29.8163)，w=0.0000 → T：10-15(30.0000)–10-15(30.0000)，w=0.0000；no_extrapolation=true；q=0.995 |
| 名义45D | 当前下/上τ=45.0000/45.0000 | 13.979% | +0.244vp；fixed_tenor_atm | PM；observed | P：10-23(38.8163)–10-30(45.8163)，w=0.8834 → T：10-30(45.0000)–10-30(45.0000)，w=0.0000；no_extrapolation=true；q=0.996 |

期限结构为 **mixed**：1D 18.937%、2D 18.304%、3D 20.645%，随后降至7D 14.107%、14D 13.264%，再缓升至30D 13.586%、45D 13.979%。3D−30D=7.059vp、7D−30D=0.521vp、14D−30D=−0.322vp、45D−30D=0.393vp；前端凸点与9/16—18密集事件相邻，但不能从这几个节点精确分离FOMC事件方差。

3D来源由9/17移到9/18，+4.072vp包含组成变化；对应同到期9/17和9/18也分别上升1.731、4.250vp，但尚有aging与20:24→16:00取样时点差。45D来源迁移也不能视为纯后端repricing。10/22仅其历史差值不可得，不影响其他相容节点。T日到期不进正τ曲线；9/16在T尚有τ=1日，目标日成为0DTE，须重新独立计算。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：09-22 / ~7D | 20.285% | 16.758% | 14.107% | 12.149% | 10.968% | 4.609vp | 0.346vp | forward_delta_non_premium_adjusted；观测support内delta线性插值；q_min=0.965 |
| Δ：09-21(τ6.8163)→09-22(τ7.0000) | +0.329vp | +0.581vp | +0.682vp | +0.553vp | +0.451vp | +0.028vp | −0.115vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含roll/组成/重估；materiality未定量 |
| T：09-29 / ~14D | 20.222% | 16.192% | 13.264% | 11.308% | 10.311% | 4.884vp | 0.486vp | forward_delta_non_premium_adjusted；观测support内delta线性插值；q_min=0.960 |
| Δ：09-28(τ13.8163)→09-29(τ14.0000) | +0.460vp | +0.468vp | +0.501vp | +0.409vp | +0.389vp | +0.059vp | −0.063vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含roll/组成/重估；materiality未定量 |
| T：10-15 / ~30D | 21.640% | 16.841% | 13.586% | 11.626% | 10.788% | 5.215vp | 0.648vp | forward_delta_non_premium_adjusted；观测support内delta线性插值；q_min=0.966 |
| Δ：10-14(τ29.8163)→10-15(τ30.0000) | +0.527vp | +0.463vp | +0.385vp | +0.290vp | +0.246vp | +0.172vp | −0.009vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含roll/组成/重估；materiality未定量 |

ATM level在三个滚动槽位分别上移0.682/0.501/0.385vp；25Δ downside-skew slope算术上分别扩大0.028/0.059/0.172vp；BF25 curvature分别降低0.115/0.063/0.009vp。这是level主导、slope小幅steepened、curvature decreased的描述，经济显著性均为indeterminate_within_uncertainty，不能借小数精度制造高确信度。

skew25定义为put25−call25，当前期限梯度4.609→4.884→5.215vp；它是fixed-delta斜率代理，不是统计skewness。put25−ATM为2.651/2.928/3.255vp，变化−0.101/−0.034/+0.077vp；call25−ATM为−1.959/−1.956/−1.960vp，变化−0.129/−0.093/−0.095vp。BF25=(put25+call25)/2−ATM。因而“绝对put IV上升”与“相对ATM put翼更贵”不能等同。

这15个smile节点只属于9/22、9/29、10/15；目标9/16、首选9/17、后备及dominant 9/18都未被选作smile曲线，不能挪用较长期曲线补点。对directional vertical，要重估实际long/short翼的净成本和退出价值；对butterfly、iron fly、condor，要有live中心与含成本盈利区；tail hedge需比较保费与保护路径，不能靠斜率证明划算；calendar/diagonal需额外期限情景模型。partial节点及其变化只支持降级局部研究，既不单独证明方向，也不证明可交易edge。

## 9. Key Expiry / Strike / Dealer Node

Greek主表采用 **COMBINED / same_date_combined / full_chain**，family拆分只用于解释，禁止与combined重复相加。gross是call与put Gamma暴露之和，signed是call−put的模型库存代理；都不是已观察到的dealer持仓。下表GEX统一为 **B USD/1% SPX move**。

| Expiry / cohort | DTE T / T+1 | Family / settlement | Gross GEX B | Signed GEX B | OI | Durability / use |
| --- | --- | --- | --- | --- | --- | --- |
| 全部33个到期 | T0–52日 | COMBINED / full_chain | 422.187 | -70.485 | 11,746,798 | 仅为T快照总量 |
| 剔除T0DTE | 32个到期 | 全链存续 | 384.085 | -36.250 | 11,420,547 | 含10/22零OI行；31个共同到期的当前暴露数值相同 |
| 再剔除目标0DTE | 31个到期 | 目标日正DTE | 372.099 | -31.118 | 11,213,600 | 含零OI行；30个共同目标日正DTE的当前暴露数值相同 |
| 9/15 已到期 | T0→不存续 | SPXW PM | 38.102 | -34.235 | 326,251 | 到期后不可沿用；二阶Greeks为null而非0 |
| 9/16 新0DTE参考 | T1→目标0 | SPXW PM | 11.986 | -5.132 | 206,947 | 次日必须重建 |
| 9/18 dominant | T3→目标2 | AM+PM combined | 252.250 | -7.658 | 6,213,444 | gross占全体59.75%、exT0的65.68% |
| ↳ 9/18 AM拆分 | T3→目标2 | SPX AM | 225.252 | -0.049 | 5,573,146 | gross占该日89.30%；signed近中性偏负 |
| ↳ 9/18 PM拆分 | T3→目标2 | SPXW PM | 26.998 | -7.609 | 640,298 | 负signed主要来自此层；勿与combined再相加 |
| 10/16 次级selected | T31→目标30 | AM+PM combined | 44.591 | -2.853 | 2,217,336 | 进一步期限背景 |

9/18 AM与PM的结算和可交易时钟不同。二阶源代码对AM以到期前一交易日17:00作为last-tradable时间代理，PM以到期日16:00；它不是AM官方结算价格，也不是本报告XSP的退出时限。9/18 combined signed −7.658B中，AM约−0.049B、PM约−7.609B，gross的AM占优并未转化为强正signed稳定背景。

共同存续DEX为106.955B美元；Vanna AM/PM为−3.812/+0.973B美元，Charm为+17.704/−1.978B美元。Vanna取IV±0.5vp两侧DEX之差；Charm保持模型其他输入不变，以固定PM16:00/AM17:00 reference前推一个交易日。两期该步长均为1日，行情取样时点不同仍会改变状态。Volga为BS Vega两侧差、当前exT0约9.974B原生响应单位；全体VEX约1.695B vendor口径，未证明二者归一化相同，不相加成“预期对冲流”。

strike-map的原始`gex_total / gex_dealer`为USD/1% move。以下用 **0.01×7586.05=75.8605** 换为USD/SPX点，再以百万展示；前期各自用其spot分母。当前selected存续为9/16、9/18、10/16，跨日节点比较只取共同9/18+10/16。

| SPX / XSP | Role | Evidence | Durability / common history | T+1 use |
| --- | --- | --- | --- | --- |
| 7450 / 745 | 第二下行复核 | 存续signed −18.103；再剔目标 −17.159百万/点 | 共同9/18+10/16：−10.479→−17.159 | 复核位，非保证支撑/阻力 |
| 7500 / 750 | 第一下行复核 | 存续signed −84.027；再剔目标 −78.379百万/点 | 共同9/18+10/16：−47.209→−78.379 | 复核位，非保证支撑/阻力 |
| 7550 / 755 | 下行确认 | 存续signed −65.689；再剔目标 −61.483百万/点 | 共同9/18+10/16：−39.914→−61.483 | O_DOWN / O_SIGN_DOWN |
| 7580 / 758 | 方向核心下沿 | 存续signed −6.333；再剔目标 −3.605百万/点 | 共同9/18+10/16：−1.084→−3.605 | 复核位，非保证支撑/阻力 |
| 7585 / 758.5 | T到期峰值参照 | 存续signed −6.597；再剔目标 −4.756百万/点 | 共同9/18+10/16：−2.150→−4.756 | 复核位，非保证支撑/阻力 |
| 7595 / 759.5 | 方向核心上沿 | 存续signed −13.552；再剔目标 −11.488百万/点 | 共同9/18+10/16：−6.640→−11.488 | 复核位，非保证支撑/阻力 |
| 7600 / 760 | 收复确认 | 存续signed −51.104；再剔目标 −41.266百万/点 | 共同9/18+10/16：−18.448→−41.266 | O_UP / O_SIGN_UP |
| 7625 / 762.5 | 第一上行复核 | 存续signed −28.403；再剔目标 −14.528百万/点 | 共同9/18+10/16：−7.060→−14.528 | 复核位，非保证支撑/阻力 |
| 7650 / 765 | 第二上行复核 | 存续signed −12.716；再剔目标 −19.532百万/点 | 共同9/18+10/16：−10.521→−19.532 | 复核位，非保证支撑/阻力 |
| 7700 / 770 | 更高正向层观察 | 存续signed +86.323；再剔目标 +84.879百万/点 | 共同9/18+10/16：−7.878→+84.879 | 复核位，非保证支撑/阻力 |

7585在全部selected快照中为signed −149.334百万/点，移除T到期后只剩−6.597；消失比例95.58%按**绝对signed**计算，按gross计算为79.07%，两者不可混用。核心7580–7595与走廊7550–7600是报告层观察带，并非净Gamma翻转点、价格概率区间或pin保证。

selected存续图只覆盖exT0 gross的80.41%，再剔目标后覆盖79.77%；图外signed残余仍为−20.607B。因此关键节点不能代替全链判断。raw OI为11,746,798、P/C OI比1.5624（前期1.5591），成交量P/C为1.2133（前期1.1024）；这些比例不识别买卖主动性或开平仓。

## 10. T+1 Decision Map, Structural View and Plan Grade

Primary regime为负向modeled signed Gamma、PM负压加重且到期集中；directional prior为**downside_bias**，path asymmetry为条件下破优先、收复分支独立。Base与Risk路径见第2节，均为 **candidate_template**，当前无live selected legs。

**B / Conditional Next-Day Plan** 的依据是结构、触发、失效、重选与有限风险规则可定义，并有可行的上午时间边界。未升为A，是因为候选自身的退出估值、实时计算和实际broker/风险账本流程未验证，IV还存在具体质量降级；未降为C，是因为正式核心数据通过，路径与风险边界仍可定义。未来数据尚未发生、或portability=none本身，不自动构成C。

Execution Status=**requires_external_live_source**；Quote Portability=**none**。Formal IV为partial / degraded_local_evidence；vertical对EOD IV相对价值论据的dependency仅background_only，因此该层IV Structure Gate=not_applicable，**不豁免live IV/翼/情景估值门禁**。08:30发布和任何实际vol/node冲击都要求丢弃EOD排名。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 核心7580–7595 | O_RESET、O_NODE、O_VOL | 方向释放未确认；不排除以后形成稳定区间论据 | 观察，未选出自动range交易 | 不可凭处于核心就宣称所有payoff均禁止 |
| 走廊7550–7600，核心外 | O_DOWN或O_UP及各自完整条件 | 不是已确认的有界分布 | 观察边界；不抢未确认方向 | 无完整条件仍观察 |
| 跳空越过确认线 | O_GAP_DOWN / O_GAP_UP | 第一笔价位可能已越过有效路径 | 回测后重计数；不追价 | 未回测或已越short/首节点取消 |
| 08:30发布后 / 实际重大冲击 | O_RESET、O_CAL、O_CONFIG | 旧快照与计数失效 | 完成新基线，在上午窗口内重选腿 | 13:00后无法形成新入场 |
| post-event range reconfirmed | O_RANGE | 有完成bars、稳定节点与含成本盈利区支持 | 只开启新的range研究 | 本次两卡不自动变为第三张range卡 |
| range thesis failure / boundary release | O_RANGE失效；再检查独立方向条件 | 失去区间依据不等于方向已触发 | 等待O_DOWN/O_UP及结构确认 | 不得机械切换策略 |
| 7550下接受 | O_DOWN、O_SIGN_DOWN、O_GAP_DOWN、公共门禁 | 负向路径一致 | Base / Downside put vertical，复核7500 | O_RECLAIM或负向层失败 |
| 7600上接受 | O_UP、O_SIGN_UP、O_GAP_UP、公共门禁 | 修复路径需独立证据 | Risk call vertical，复核7625 | O_REJECT或修复失败 |
| vol reset / node migration | O_VOL / O_NODE | 当前路径、中心或估值已变 | 管理已有风险，清零、重选、重估 | 未完成不恢复；上午期限仍有效 |
| 未来全部门禁通过 | 对应condition_ids与人工核对 | 仅可进入人工评估 | eligible_for_manual_evaluation | 当前状态仍requires_external_live_source |
| 已观察到执行门禁失败 | O_QUOTES / O_MAPPING / O_VALUE / O_BROKER / O_RISK / O_TIME | 执行不可行 | 不新增；已有仓位按风险边界退出 | 区别于尚未发生的Expected Pending |

### Operational Definitions

以下是全文完整触发定义；策略卡只引用这些条件。所有目标日状态当前为pending，实际能力均未被本数据包验证。

| Condition / purpose | Observable source and exact rule | Window / reset / limit |
| --- | --- | --- |
| O_RESET / O_CAL / O_CONFIG | 官方或合格事件流核对08:30实际发布与反应；同步SPX/XSP/forward、map、IV和quotes。mapping、parity、node容忍度须记录数值、单位、来源与冻结时点。 | t0取全部重置/冻结完成后、不早于09:30的下一个完整5分钟bar起点；不能按日历钟响假定完成。 |
| O_DOWN / O_UP：接受 | 合格实时SPX指数源；连续两根完成5分钟收盘，分别严格<7550或>7600。 | ET对齐，第一根从t0开始；09:30起算时最早09:40完成；不使用半根bar。 |
| O_GAP_DOWN / O_GAP_UP：回测 | 若开盘<7550，先有bar交易回≥7550；若开盘>7600，先有bar交易回≤7600，再重新计数。 | 未回测不追；重置前的bars不能接续使用。 |
| O_SIGN_DOWN：负向一致 | 相容live全链计算器：剔目标0DTE后全链signed<0、SPXW_PM signed<0、局部7550 signed<0、独立新9/16 0DTE signed<0。 | 两次确认收盘分别取得；map≤300秒。不能用价格bar冒充结构值。 |
| O_SIGN_UP：修复一致 | 同一live计算器：7600–7650局部合计signed>0、新9/16 0DTE signed>0，且PM负压较冻结新基线收窄或非负。 | 两次确认收盘分别成立；独立于下行分支；方法与scope不能中途换用。 |
| O_RECLAIM / O_REJECT：失效监控 | 下行：一根收盘≥7550且下一完整bar不再交易到7550以下；上行：一根收盘≤7600且下一完整bar不再交易到7600以上。 | 入场要求invalidation_absent；检测到即取消/退出。风险上限可要求更早退出，无须等待第二步。 |
| O_NODE / O_VOL：状态改变 | 节点移动超过事先冻结ε_node则重置。15分钟内VIX上升≥1点，或同候选到期ATM IV上升≥2vp，同样重置。 | ε_node当前null、需预先冻结；VIX/IV≤30秒，map≤300秒；清零计数与候选排名。 |
| O_RANGE：区间重新确认 | 至少3根完成bar在冻结7580–7595或明确重定的7550–7600区间内；节点稳定、无vol冲击；live spot/forward与中心误差区间均包含于扣成本情景盈利区，并留正buffer。 | ≥15分钟；只开启新研究。完成收盘越区间边界、node/vol reset或包含关系失败即区间失效，方向须另行确认。 |
| O_QUOTES / O_MAPPING / O_SURFACE | live各腿有效bid/ask、全腿age≤30秒；有意义正mid时组合spread/mid≤25%。检验XSP−SPX/10及同到期carry调整parity；刷新实际候选ATM/25Δ/翼与Greeks。 | 近零mid另查绝对tick/成本；ε_map、ε_parity均null，必须先冻结。原生combo优先，synthetic必须同步。 |
| O_VALUE / O_BROKER / O_RISK | 合格估值平台给首节点、逆向、失效和退出liquidation values；实际broker支持原子净限价，实际risk book支持剩余预算。 | 均为external_required、未验证；不得用EOD到期内在价值补盘中MTM，或把缺失预算设为零亏损。 |
| O_TIME：有效窗口 | Base、Downside、Risk均最早09:40下界、实际t0+10分钟；最晚入场13:00。退出=min(入场+60分钟、13:30 ET、标准15:30上限、更早broker/合约限制)。 | 至少保留30分钟有效持有空间。13:00/13:30是本报告FOMC日上午假设；来不及则取消，下午不自动再开。 |

其中2根5分钟bar、30秒quote、25%组合宽度、VIX/IV冲击阈值、60分钟directional stop与300/500美元预算沿用v1.8默认。map最大300秒、最小持有30分钟、3/5点候选width、每单位6–16美元成本敏感性，以及FOMC日13:00/13:30窗口为本报告假设（workflow_default / report_local_assumption），未做经验校准；未知数值容忍度保持null，不能临场为了通过而修改。

需要外部能力的具体分工为：实时broker指数/期权源负责bars、quote与latency；同口径全链计算器负责PM/新0DTE及节点；合格valuation平台负责同到期forward、IV与清算情景；实际broker界面和风险账本负责原子组合、tick、费用、当前损失与存量风险。任一必要能力缺失，无价格代理fallback。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base / F_PUT | directional / put debit vertical | 7550下确认后的延续 | 9/17优先、9/18后备；live自身翼 | pricing pending_live_repricing；edge not_established；执行external_required | conditional | 先重选，再以7500情景与费用/预算证明可行。 |
| Risk / F_CALL | directional / call debit vertical | 7600收复与结构修复 | 相同期限比较；上方仍有负节点 | pricing pending_live_repricing；edge not_established；执行external_required | conditional | 7625处净情景价值必须支持；不把7700正层当现成收益。 |
| Base / F_DBWB | directional / broken-wing butterfly | 可研究较低支出、局部方向暴露 | 缺实际候选curvature与不对称翼证据 | 无扣成本情景盈利区，执行亦未验证 | not_screenable | 需独立BWB网格与非对称尾损比较；不能凭保费更低择优。 |
| 事件后 / F_FLY | centered stability / debit fly、有限风险iron fly | 7585旧峰值大部分到期；中心未重证 | 需live body附近curvature | 未取得中心误差区间与含成本盈利区包含关系 | reject | 当前证据不保留；O_RANGE通过后可重新研究，非永久否定fly。 |
| 事件后 / F_CONDOR | bounded range / defined-risk condor | 观察走廊不等于已确认边界 | 需live上下翼与尾部值 | 收权利金不证明正edge；有限风险必须单列 | reject | 先有有界论据、利润区buffer和逆向情景。 |
| 事件后 / F_EXPANSION | two-sided expansion / long straddle、strangle | 双向事件风险存在但幅度未知 | 需实际事件后IV和双翼成本 | 无最低必要幅度相对成本/Theta的证据 | not_screenable | 事件发生不保证变动足以覆盖两侧保费。 |
| 独立期限研究 / F_TERM | term relative value / calendar、diagonal | 不属于当前上午方向持有论据 | partial期限状态不能独立证明相对价值 | 缺计划退出模型与跨日持有范围 | not_applicable | 本次不保留；不自动授权隔夜。 |

### Local Candidate Comparison

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F_PUT：实时7550确认锚映射后，最近long与上下相邻1个listed strike；比较3/5点width、9/17/9/18，当前网格12组 | 区间包含测试not_applicable；检查7500及逆向/失效/退出路径 | 实际选择expiry的ATM/25Δ/long-short翼必须重取 | 四情景V和PnL pending；先排风险、时间和首节点已被越过的候选 | 全部重新估计 | 全腿成本、atomic liquidity与保守清算值共同排序 | none | deferred_to_t1；winner=null |
| F_CALL：实时7600确认锚映射后，相同邻接/width/expiry规则，当前网格12组 | 区间包含测试not_applicable；检查7625等路径 | 同上；不能挪用9/22 smile | 首次复核未必达到到期封顶收益；须自身MTM支持 | 全部重新估计 | 先剔不可行，再比较净情景支持、流动性与敏感性 | none | deferred_to_t1；winner=null |

所有网格结果为deferred_to_t1；先完成事件后selection，再按净情景支持、逆向损失、成本/流动性和敏感性稳健性比较。对1:1 vertical比较3/5点宽度；不对称BWB作为独立family已标not_screenable，不能伪称完成其不对称优化。

### Base Candidate Template — Base Case

**F_PUT / base_down：put debit vertical，directional_continuation，conditional，candidate_template。**适用于7550下方接受且全链ex-target、PM、局部与新0DTE均为负的路径；activation引用O_DOWN、O_SIGN_DOWN、O_GAP_DOWN及公共门禁，入场还要求O_RECLAIM失效信号保持不存在。

首选9/17（T2→目标1DTE），9/18（T3→目标2DTE）仅作为live比较后备；9/16新0DTE不默认选用。以live trigger/entry、spot/forward与地图重定long锚，比较相邻listed strike及3/5点宽度，short放在下方、ratio=1:1、无body；实际live selected legs=**pending**。两到期均含FOMC与周四数据价值，后备另含周五工业生产/OpEx；本卡持有至多60分钟并遵守上午时限，不承担这些事件的跨发布持仓。

先在7500复核实际清算价值，只有论据与估值仍支持才进一步研究7450；不能用到期最大收益替代首节点的MTM。首次可评估价格若已越过所选short或7500，不追。未确认、未回测、任何必要门禁失败即取消；O_RECLAIM或负向层失效按规则退出。payoff方向以负Delta为主，Gamma/Vega/Theta随实际腿位与状态变化，须刷新自身翼和Greek。

卖出下方put可降低相对单买put的净支出，并封顶亏损和下方收益；是否优于outright须以同路径live估值、成本与回撤比较。反弹、慢速路径、IV下降、相对翼变化或成交成本均可使方向判断正确但组合亏损。pricing_assessment=**pending_live_repricing**，edge_evidence_status=**not_established**，execution_feasibility=**external_required**。

### Risk-Path Contingency

**F_CALL / risk_up：call debit vertical，directional_continuation，conditional，candidate_template。**这是7600收复后的独立备选；O_UP、O_SIGN_UP、O_GAP_UP及公共门禁均需成立，O_REJECT必须保持不存在。它不与Base叠加，也不因价格上涨一根bar即替代Base。

到期选择和上午窗口与Base一致；live long锚围绕收复区域重新映射，比较上下相邻listed strike与3/5点width，short在上方、1:1、无body，live selected legs=**pending**。term/wing证据只接受所选9/17或9/18，FOMC前溢价亦可能变化。首复核为7625，其后7650；7700正层只作更后方观察，不能跳过中间负节点或延长本卡。

首次可评估价已越short或7625则取消；O_REJECT、实时修复失败或任一风险/估值门禁失败按规则退出。以正Delta路径表达为主，其他Greeks随实际腿位变化。卖上方call降低净支出但放弃short之外的收益；负节点压制、回落、时间损耗、波动重估与成本可能抵消收益。是否优于单买call需live场景比较，价格和edge状态与Base相同。

### Scenario valuation and quote protocol

下表为预先指定的敏感性情景，不是事件预测。估值方法应为已验证的broker或独立定价平台，以实际候选、同到期forward/discount、live IV/翼和清算折价计算。Base target、Risk反向情景、invalidation与planned exit全部保留；对未来实际时点和数值不作填补。

| Candidate / scenario | Spot assumption | Elapsed / exit rule | IV / wing assumption | Liquidation value / PnL | State |
| --- | --- | --- | --- | --- | --- |
| F_PUT / target | XSP 750（SPX约7500） | 入场后30分钟 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |
| F_PUT / adverse | XSP 760（SPX约7600） | 入场后15–30分钟，逆向价格路径 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |
| F_PUT / invalidation | XSP 755（SPX约7550） | 实际reclaim/rejection时 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |
| F_PUT / planned_exit | 按实际退出路径 | 入场+60分钟、13:30或更早限制中的最早者 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |
| F_CALL / target | XSP 762.5（SPX约7625） | 入场后30分钟 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |
| F_CALL / adverse | XSP 755（SPX约7550） | 入场后15–30分钟，逆向价格路径 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |
| F_CALL / invalidation | XSP 760（SPX约7600） | 实际reclaim/rejection时 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |
| F_CALL / planned_exit | 按实际退出路径 | 入场+60分钟、13:30或更早限制中的最早者 | live候选ATM 0/±2vp及不利skew/翼敏感性 | V_exit=null；net PnL=null | N、成本、估值时点与概率均null；pending |

每行情景统一使用客户debit约定，净PnL=100N×(V_exit−d)−C_N；参考O_VALUE/O_SURFACE/O_QUOTES。expiry intrinsic及上方历史到期stress不是这8行的MTM值。real-world概率尚无依据，故不报告概率加权EV；directional两卡的中心盈利区包含测试为not_applicable，必须通过自己的目标/逆向/退出损益测试。

使用XSP指数期权，乘数100、现金结算、到期行权；RTH通常到16:15 ET，所选9/17到期合约的到期日最后交易为16:00 ET，均晚于本卡13:30退出约束。[Cboe XSP概览](https://www.cboe.com/tradable-products/sp-500/xsp-options)、[合约与交易时间](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)

目标日先重新选腿，再从审阅后的live native combination mid附近用**原子化multi-leg net-limit**评估，按tick改善但不超过live上限，不能拆腿追成交。没有公开native complex NBBO时，清楚标注synthetic-only；所有腿同步、broker原子组合支持及其他门禁均可验证，才可继续人工评估。当前只有cached单腿合成，native quote与实际broker能力均未取得。

全腿费用按2腿×N组×开平仓=4N个contract-actions计算；6–16美元仅为N=1敏感区间，实际费率和额外滑点另取，不能双算已包含的bid/ask损耗。call/put的到期breakeven分别为K_long+d+C_N/(100N)、K_long−d−C_N/(100N)，盈利区在其上/下方，尾部最大损失为ML。计划在到期前退出，实际止损成交不保证正好等于理论边界。

历史carry-parity诊断采用F_pair=K+(C−P)/D，与同到期SPX packet F/10比较；18组价差残差约-0.02371至+0.02853 XSP点，18组参考值位于合成bid/ask区间内。虽时点一致，但该参考依赖SPX模型、并非独立实时forward；numeric tolerance未给，不能记为live pass。K+C−P的零carry诊断不能代替此检验。

当前两张完整卡已占满上限，**Alternative Setups不另增卡**。现有候选导出CSV仅120条、宽度≤5、风险筛选≤200美元的截断两腿子集；本次24组比较从300条原始XSP报价重新核对，不把该CSV排序当成全family择优。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

08:30与开盘重置完成，7550下方接受、各负向层一致，且live候选与预算通过后，才评估F_PUT；7500为第一次重新估值位置，7450是后续条件节点。核心理由为C1–C3，反证为reclaim、节点迁移或实时负向结构不成立。

### Risk Case

若7600上方接受，并有局部、新0DTE及PM修复证据，则以F_CALL独立评估7625、7650；这来自结构被反证后的切换条件，不是提前持有第二方向。任何切换均重新检查风险账本与相同上午窗口。

### No-Trade Case

当前属于**有B级条件计划、尚无合格实时交易候选**，不是已经观察到交易失败。EOD No-Plan（No Qualified EOD Plan）仅适用于核心formal失效、无法定义路径/失效或无法封顶风险；当前未见这些硬失败。

T+1 execution abort：目标日若未完成触发、gap回测、事件重置或数值冻结，继续观察；若已取得的quote、映射、情景价值、broker能力、预算或时间门禁实际失败，则停止新增。超过13:00不再为这两卡建立新仓，13:30前结束风险；下午事件后需新的研究与窗口，不能延用上午信号。重新考虑须在13:00之前完成相关能力补齐与重置，从新基线重新确认，并重新选腿、估值和核算预算；剩余窗口不足则取消。No Trade保留预算和选择权，本身不证明结构先验正确或错误。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on view / grade / execution |
| --- | --- | --- |
| 7550/7600接受、局部与新0DTE / PM | 区分延续与实际修复 | 能改变路径先验；价格单独穿线不够。 |
| 7585残余与7700共同存续正层 | 区分已到期峰值、耐久反向证据和迁移 | 节点/结构重置可取消路径，非自动pin。 |
| 08:30实际反应、10:00冲击、下午FOMC边界 | 决定基线、剩余窗口与重估需求 | 重置计数与selection；窗口不足取消，不机械等最后事件。 |
| 候选9/17/18 ATM、25Δ/翼、清算情景、live quote | 决定family的净价是否可支持 | 可否定价格/执行可行性；不因B等级忽略。 |
| 当前损失、存量剩余最大风险和原子组合能力 | 确定真实R_eff及可执行数量边界 | 主要改变execution status；亏损/仓位未知不补0。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
