+++
title = "SPX期权持仓与Greeks结构分析-260909"
date = "2026-09-10"
data_as_of = "2026-09-09"
draft = false
description = "基于9月9日盘后持仓与Greeks结构，分析9月10日PPI重置后的条件路径与实时确认要求。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "9890e74bb3e2ea3caf9c77f2019190d35a335a7df621a7842c9596c0d2de79d4"
+++

# SPX期权持仓与Greeks结构分析-260909

## 1. 结论

T 日呈现**负 modeled signed gamma 与到期集中并存**的结构，T+1 保留下行确认优先、上方收复为风险路径的机制性先验；计划为 **B / Conditional Next-Day Plan**，执行状态为 **requires_external_live_source**，最重要的确认是 PPI 重置后能否在 7600 下方形成价格与负 signed 结构的一致证据，本报告仅为盘后条件计划。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | downside_bias；下行确认优先，保留上方收复风险；structural confidence：medium。 |
| Earliest evaluation | 不早于 09-10 09:40 ET，实际为 t0+10 分钟；须先完成 PPI、开盘与必要的波动／节点重置，取得合格快照并冻结参数，t0 不早于 09:30。 |
| Base activation | 若 7600 下方接受、负 signed 确认及必要的 gap 回测成立，则评估 put debit vertical；首先在 7575 复核，之后才考虑 7550；reclaim 7600 或结构／估值失效则取消该路径。 |
| Downside branch | 若同一 Base 下破路径成立，则沿用 put debit vertical 条件模板，第一复核点 7575；reclaim 7600 失效，不叠加第二个 setup。 |
| Upside branch | 若 7700 上方接受、局部与新 0DTE 转正且 PM 负压收窄，则评估 call debit vertical；首先在 7750 复核，之后才考虑 7800；rejection 7700 或收复结构失效则取消。 |
| Otherwise | No Trade / observe only；等待有效触发、gap 回测、重置完成及必要门禁通过；区间稳定性重新确认仅开启新的策略研究。 |

Plan Grade / Plan Status：**B / Conditional Next-Day Plan**；Execution Status：**requires_external_live_source**；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 同源期权链 SPX 锚由 7673.79 降至 **7636.68，−0.484%**；共同存续到期的 signed GEX 进一步负化，不能用正 gross GEX 推导稳定盘。
- 基准路径须在 **7600 下方确认**后才成立；当前位置附近缺少释放方向，不能从下行先验直接推导入场。
- 不对称来自 PM 负 signed 暴露加深以及下方节点连续分布；若 7700 上方价格与节点共同修复，需撤销原先的单向倾向。
- **09-18** 占剔除 T 日 0DTE 后 gross GEX 约 **59.1%**，主要为 AM 合约；09-10 则将在目标日成为新的 0DTE，二者必须分开观察。
- IV 仅获 **degraded_local_evidence** 权限：CPI 到期形成前端凸起；固定 3D 下降与同到期 09-11 上升并存。Selected smile 的 ATM 与 downside slope 算术上上移，BF25 变化小且混合，不能据此声称价格优势。
- **7630–7650** 是方向释放尚未确认的 core，**7600–7700** 是决策 corridor；它们不是经过验证的概率区间或自动收租区域。
- 保留 Base put debit vertical 与 Risk call debit vertical 两张互斥条件卡。**B 衡量计划质量**；两者均未建立可交易 edge，需外部实时来源完成目标日重筛。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T−1 | T | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 同源 SPX 结构锚 | 7673.79 | 7636.68 | −37.11 点／−0.484% | 位置下移；采用同源比较，避免混用滞后的官方 close |
| 共同存续 31 个到期：gross / signed GEX | 375.073 / -15.881 | 382.218 / -35.467 | gross +1.91%；signed −19.586 B | 负化不只是剔除当天到期的机械结果 |
| 共同到期中的 AM / PM signed | -0.141 / -15.740 | -1.821 / -33.645 | 约 91.4% 的负向变化来自 PM | 主导的方向证据在 PM，不能由 AM gross 集中替代 |
| 09-10 到期：gross / signed | 11.240 / −3.822 | 10.504 / −5.456 | 成为目标日新 0DTE | 目标日重新隔离，不把今天的短端位置固定外推 |
| 事件 ATM 与期限槽位 | 3D：13.894%；09-11：13.894% | 3D：13.672%；09-11：15.837% | −0.222 vp fixed_tenor_atm；+1.943 vp same_expiry_atm | 3D 来源从 09-11 单节点变成 09-11／09-14 插值；同到期含 aging 与 repricing |
| FOMC 槽位与 selected smile | 7D 来自 09-15；三个 prior smile 为 09-15／09-22／10-08 | 7D 来自 09-16；三个 current smile 为 09-16／09-23／10-09 | 7D +1.963 vp；同 09-16 +0.942 vp；smile 详见第 8 节相邻双行 | smile 为 rolling_tenor_slot_fixed_delta：ATM 上移、slope 算术变陡、BF25 小幅混合；保留组成与不确定性 |

表中 GEX 的 B 为十亿美元／标的 1% 变动，全部采用相同 canonical 合并口径与共同 expiration 集合。进一步去掉目标日 09-10，到期仍为正剩余时间的共同 30 个到期 signed GEX 从 **−12.059 B** 变为 **−30.011 B**，下行先验并非完全依赖新 0DTE。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

新闻与事件覆盖以截止前已公开内容为限：

- Reuters 09-09 收盘报道提及美股下跌、Brent 超过 100 美元、Apple 走弱与收益率上行，首次发布 16:01、更新 16:15 ET。它提供风险偏好背景；发布时间晚于收盘不能证明相关事件发生于盘后，更不能识别 dealer 对冲。[Reuters 收盘报道](https://ca.marketscreener.com/news/s-p-500-ends-down-as-oil-tops-100-per-barrel-ce785bd9d08ff52c)
- 纽约联储 09-08 发布的调查中，一年／三年／五年通胀预期为 3.6%／3.2%／3.0%，对未来失业率上升的平均主观概率为 44.4%。这属于此前已知的调查背景；日内发布时间未核实，也不是已实现通胀或就业数据。[纽约联储调查发布](https://www.newyorkfed.org/newsevents/news/research/2026/20260908)

| Calendar / event | ET / 信息边界 | 分支相关性 |
| --- | --- | --- |
| 09-10 PPI（E_PPI）／初请（E_CLAIMS） | 08:30；结果尚未产生 | PPI 对两分支为 hard_reset；初请并入同一窗口监测。[BLS 日历](https://www.bls.gov/schedule/2026/09_sched.htm)、[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html) |
| 09-10 ECB（E_ECB） | 欧洲页面列 14:15 决议／14:45 发布会／15:45 预测；按 Frankfurt 当地夏令时换算约 08:15／08:45／09:45 ET | monitoring_only；网页“CET”标签存在季节口径歧义，实际窗口须由当日官方／交易台日历复核；不设全分支统一等候线。[ECB 周历](https://www.ecb.europa.eu/press/calendars/weekly/html/index.en.html) |
| 09-10 其他窗口（E_10AM / E_TREASURY） | 10:00 成屋销售／批发贸易；30Y reopen 只核实 09-10 日期，未核实时刻 | 普通数据监测；潜在持仓覆盖拍卖时须先确认准确窗口及影响，不臆造 13:00 硬门禁。[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[财政部暂定拍卖表](https://home.treasury.gov/system/files/221/TentativeAuctionScheduleQ22026.pdf) |
| 09-11 CPI／实际收入（E_CPI）、Michigan（E_MICHIGAN） | 08:30／10:00 | CPI 属下一会话 hard_reset，却已进入 09-11 合约价格；不把它变成 09-10 全天禁止评估的理由。[BLS 日历](https://www.bls.gov/schedule/2026/09_sched.htm)、[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html) |
| 第三个交易日 09-14 | 所查日历无同等级主要美国发布；不是完备的“无事件”证明 | 当日补查临时新闻与政策事件。[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html) |
| 09-16 FOMC（E_FOMC） | 14:00 决议，14:30 发布会；在三个目标会话之外 | 用于解释 7D／09-16 的事件组成，不用于今天的直接方向判断。[美联储日历](https://www.federalreserve.gov/newsevents/2026-september.htm) |

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 共同存续 PM 负化支持有条件的下行不对称

**Claim：** 下行确认应优先于回归中心的假设。**Evidence / basis：** 共同存续与去掉目标日到期后的 signed 结果均负化，AM／PM 拆分把主要变化定位于 PM，属于 formal panel 的报告层复算。**Mechanism / assumptions：** 若 call 正、put 负的符号代理近似真实做市风险，负 gamma 可能放大沿价格方向的对冲需求；真实库存、客户方向和盘中 OI 均不可见。**T+1 Implication：** 仅在 O_DOWN 与 O_SIGN_DOWN 同时成立后评估 Base。**Falsifier：** PM 负压消退，且 O_UP／O_SIGN_UP 共同成立。**Confidence：** 结构 medium；路径为机制性先验，无独立历史检验。

### Thesis 2 — 到期集中保留节点，但近价 pin 不能直接跨日继承

**Claim：** 09-18 的集中度值得跟踪，7630／7635 的 T 日尖峰不构成次日可靠 pin。**Evidence / basis：** 7635 的 selected gross 约 92.2% 来自已到期 09-09，7630 的 selected signed 绝对量约 85.3% 来自该到期；09-18 则以 AM gross 为主。**Mechanism / assumptions：** 到期清除与新 0DTE 的加入会改变近价约束；gross 大小不能识别反馈方向。**T+1 Implication：** 重新隔离新 0DTE，使用 surviving 与 after-target 节点。**Falsifier：** 新链在同一中心形成可验证的稳定节点，并支持扣除成本后的区间盈利区域。**Confidence：** 中等，受 selected-map 覆盖限制。

### Thesis 3 — 事件组成使 EOD 期限排名难以直接迁移

**Claim：** 3D IV 回落不代表前端普遍降波，09-11 候选仍带 CPI 风险溢价。**Evidence / basis：** 第 8 节显示 fixed-tenor 与共同 exact-expiry 的相反方向；这是 packet nodes 的局部证据。**Mechanism / assumptions：** 恒定期限插值和事件跨入／跨出同时影响槽位，same-expiry 差额仍混有 aging。**T+1 Implication：** PPI 后按候选到期、翅膀与退出时点重新估值。**Falsifier：** 事件后实时曲面消除该凸起，或重估后的不利情景使候选失去成本支持。**Confidence：** 降级局部研究证据，未建立 edge。

### Thesis 4 — 上方收复仍是必须保留的反向路径

**Claim：** 负 signed 总量不排除反弹越过上方货架。**Evidence / basis：** after-target 的 7680 与 7800 节点为正，但 7700 自身并非稳定正锚。**Mechanism / assumptions：** 价格修复、PM 负压缓解与新 0DTE 重建可能改变局部反馈。**T+1 Implication：** 只有价格与结构共同收复后评估 Risk call vertical。**Falsifier：** O_REJECT 或局部／新 0DTE 无法确认。**Confidence：** 中等结构、未检验路径，不赋予概率。

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| 共同存续 PM signed 加深为负，去掉目标 0DTE 后仍为负 | 09-18 gross 高度集中，部分上方节点为正 | 以 signed、到期与 family 隔离为主导；集中度只表明敏感位置 |
| SPX 结构锚下移，VIX 与收益率上行 | EOD 只提供终点，无独立路径与实际流证据 | 支持下行先验，降低路径确信度，不推导胜率或必达点位 |
| CPI exact-expiry ATM 抬升 | 3D fixed tenor 下降、BF25 变化微小，IV 质量 partial | 解释为事件／槽位分化；不宣称全面降波、明显曲率优势或卖波动率 edge |

总体 **structural confidence = medium**。共同存续 signed 与 family 拆分是主导证据；IV 局部质量、节点覆盖与缺少独立路径检验降低 confidence。O_UP 与 O_SIGN_UP 的组合会改变 directional prior；单纯报价过宽、账户预算不足或未具备实时工具只改变 execution status。自动摘要中的 `long_gamma_base` 不能由正 gross 单独推出；本报告使用已披露的 signed 约定，不把数据门禁通过当作高胜率证据。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T−1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09-10 | 2 → 1 天 | 12.541% | +0.776 vp；same_expiry_atm | 目标会话／PPI | 局部／bracketed；差额含 aging 与 repricing |
| 09-11 | 3 → 2 天 | 15.837% | +1.943 vp；same_expiry_atm | CPI／PM | 局部／bracketed；差额含 aging 与 repricing |
| 09-14 | 6 → 5 天 | 11.654% | +0.668 vp；same_expiry_atm | 跨周末，3D 上界 | 局部／bracketed；差额含 aging 与 repricing |
| 09-15 | 7 → 6 天 | 11.840% | +0.744 vp；same_expiry_atm | 旧 7D 槽位 | 局部／bracketed；差额含 aging 与 repricing |
| 09-16 | 8 → 7 天 | 13.059% | +0.942 vp；same_expiry_atm | FOMC／PM | 局部／bracketed；差额含 aging 与 repricing |
| 09-18 | 10 → 9 天 | 13.733% | +0.993 vp；same_expiry_atm | 主导到期的 PM 曲线 | 局部／bracketed；差额含 aging 与 repricing |
| 09-22 | 14 → 13 天 | 12.600% | +0.735 vp；same_expiry_atm | 旧 14D 槽位 | 局部／bracketed；差额含 aging 与 repricing |
| 09-23 | 15 → 14 天 | 12.707% | +0.706 vp；same_expiry_atm | 新 14D 槽位 | 局部／bracketed；差额含 aging 与 repricing |
| 10-08 | 30 → 29 天 | 13.042% | +0.559 vp；same_expiry_atm | 旧 30D 槽位 | 局部／bracketed；差额含 aging 与 repricing |
| 10-09 | 31 → 30 天 | 13.135% | +0.564 vp；same_expiry_atm | 新 30D 槽位 | 局部／bracketed；差额含 aging 与 repricing |
| 10-23 | 45 → 44 天 | 13.386% | +0.458 vp；same_expiry_atm | 45D 下界 | 局部／bracketed；差额含 aging 与 repricing |
| 10-30 | 52 → 51 天 | 13.715% | +0.421 vp；same_expiry_atm | 新 45D 上界 | 局部／bracketed；差额含 aging 与 repricing |
| 固定 3D | 3 天不变 | 13.672% | -0.222 vp；fixed_tenor_atm | 恒定期限视角 | 09-11（observed，w=0） → 09-11／09-14（w=0.333）；no extrapolation |
| 固定 7D | 7 天不变 | 13.059% | +1.963 vp；fixed_tenor_atm | 恒定期限视角 | 09-15（observed，w=0） → 09-16（observed，w=0）；no extrapolation |
| 固定 14D | 14 天不变 | 12.707% | +0.842 vp；fixed_tenor_atm | 恒定期限视角 | 09-22（observed，w=0） → 09-23（observed，w=0）；no extrapolation |
| 固定 30D | 30 天不变 | 13.135% | +0.652 vp；fixed_tenor_atm | 恒定期限视角 | 10-08（observed，w=0） → 10-09（observed，w=0）；no extrapolation |
| 固定 45D | 45 天不变 | 13.440% | +0.512 vp；fixed_tenor_atm | 恒定期限视角 | 10-23（observed，w=0） → 10-23／10-30（w=0.143）；no extrapolation |

曲线为 **mixed**：09-11 CPI 到期明显凸起，7D→14D 略降，随后 30D／45D 上升。3D−30D 为 **+0.537 vp**，7D−30D 为 **−0.076 vp**。3D 由旧 09-11 单节点改成 09-11 与 09-14 间按总方差插值；7D 由 09-15 移至 FOMC 当日 09-16，14D／30D／45D 也有来源迁移。fixed_tenor_atm 控制期限长度，仍不控制事件组成；same_expiry_atm 固定合约，却未分解 aging 与重新定价。

fixed tenor 只在 packet 已给出的有效正时间 bracket 内使用，w 为 total-variance interpolation weight，未外推；09-09 0DTE 不进入期限先验或 T=0 插值。表中 09-18 ATM 只代表 PM 主曲线，不能赋给该日占主导的 AM 合约。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：09-16／~7D | 18.360% | 15.318% | 13.059% | 11.536% | 10.675% | 3.782 vp | 0.368 vp | forward delta；observed-support 插值；局部质量 |
| Δ：09-15（7d）→09-16（7d） | +2.038 vp | +2.083 vp | +1.963 vp | +1.814 vp | +1.426 vp | +0.269 vp | -0.015 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll composition；materiality：indeterminate_within_uncertainty |
| T：09-23／~14D | 18.460% | 15.179% | 12.707% | 11.079% | 10.258% | 4.100 vp | 0.422 vp | forward delta；observed-support 插值；局部质量 |
| Δ：09-22（14d）→09-23（14d） | +1.126 vp | +1.009 vp | +0.842 vp | +0.680 vp | +0.566 vp | +0.329 vp | +0.003 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll composition；materiality：indeterminate_within_uncertainty |
| T：10-09／~30D | 20.347% | 16.002% | 13.135% | 11.398% | 10.694% | 4.604 vp | 0.565 vp | forward delta；observed-support 插值；局部质量 |
| Δ：10-08（30d）→10-09（30d） | +1.044 vp | +0.804 vp | +0.652 vp | +0.493 vp | +0.361 vp | +0.311 vp | -0.004 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll composition；materiality：indeterminate_within_uncertainty |

1. **ATM level：** 三个相容期限槽位算术上上移；事件组成与局部质量使显著性仍不可确认。
2. **25Δ downside slope：** 定义为 put25 IV−call25 IV，三槽位算术上分别变陡 0.269／0.329／0.311 vp；这是 fixed-delta smile slope proxy，不能称为统计 skewness。
3. **BF25 curvature：** 定义为 (put25 IV+call25 IV)/2−ATM，变化 −0.015／+0.003／−0.004 vp，幅度小且混合，按不确定性内变化解读。
4. **Skew term gradient 与 wings：** slope 随 7→14→30D 从 3.782 升至 4.100、4.604 vp；put25−ATM 为 2.259／2.472／2.867 vp，call25−ATM 为 −1.524／−1.628／−1.737 vp。相对翼价不能直接证明方向或高估／低估。
5. **策略传导：** put vertical 卖出更下方 put 可能缓解长 put 成本，但需实测目标翅膀；call vertical 需检查上方低 IV 翼的抵扣是否足够。Fly／iron fly／condor 缺少稳定中心与相关曲率估值支持，不能由 BF25 的小变化放行；tail hedge 仍需比较成本；calendar／diagonal 要另外检验跨事件与退出残值，默认日内计划未放行。

## 9. Key Expiry / Strike / Dealer Node

本节 DTE 为日历天数，AM／PM 的实际最后交易时刻需另按合约核对。GEX 采用模型约定：gross 为 call+put 的绝对敏感度总和；signed 为 call−put 的符号代理。`gex_1pct = gex_point × spot × 1%`。下表到期暴露用 **B 美元／1%**；行权价节点转换成 **M 美元／SPX 点**，避免把两个量纲混用。

| Expiry | DTE T → T+1 | Family / settlement | Gross / signed GEX | Durability / use |
| --- | --- | --- | --- | --- |
| 09-09 | 0 → 已到期 | SPXW / PM | 48.949 / −19.732 | 已从 T+1 prior 删除；高阶 Greek 空值保留为空 |
| 09-10 | 1 → 0 | SPXW / PM | 10.504 / −5.456 | 新 0DTE，目标日独立更新 |
| 09-11 | 2 → 1 | SPXW / PM | 23.262 / −11.208 | CPI 候选到期；无该到期 selected strike map |
| 09-18 | 9 → 8 | SPX AM + SPXW PM | 226.025 / −3.836 | 占 all gross 52.4%、ex-T-0DTE gross 59.1%；AM gross 205.260（约 90.8%），PM gross 20.764 |
| 10-16 | 37 → 36 | AM + PM | 47.378 / −0.748 | 更远节点背景，不能与短端同权解释 |

剔除 T 日 0DTE 后 gross 为 **382.218 B**、signed 为 **−35.467 B**。09-18 的 AM／PM signed 分别为 **−1.252／−2.584 B**。共同存续 DEX 从 617.979 降至 386.707 B；Vanna 的定义性 1 vp 有限差分从 −2.132 变为 −2.138 B，Charm 的固定输入下一会话 DEX 差从 +7.223 变为 +8.290 B。当前 VEX 汇总约 2.302 B，Volga 有限差分约 14.538 B，均保留原管线标度；vendor Vega 与模型 Vega 的统一归一化未确证，不比较二者的数值大小，也不将其直接折算为同一冲击下的损益。它们是风险敏感度／条件重估，未提供真实库存、净买卖或实际对冲流。

| SPX / XSP | Role | Evidence（M／SPX 点） | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 7500 / 750 | 深下方复核 | surviving gross 195.138；signed -39.831 | after-target signed -39.101 | 不作为必达目标 |
| 7550 / 755 | 第二下行节点 | surviving gross 146.238；signed -33.317 | after-target signed -31.889 | 第一节点复核后才再估值 |
| 7575 / 757.5 | 第一下行复核 | surviving gross 48.342；signed -8.523 | after-target signed -6.135 | 先检查剩余 payoff 与实际可退出价 |
| 7600 / 760 | 下破确认边界 | surviving gross 245.796；signed -24.162 | after-target signed -8.695 | 当天负值中有明显目标 0DTE 成分 |
| 7625 / 762.5 | 下方 warning | surviving gross 34.472；signed -7.264 | after-target signed -5.259 | 提示位置变化，尚非入场确认 |
| 7630 / 763 | core 下沿 | surviving gross 30.367；signed -9.172 | after-target signed -6.241 | T 日尖峰已大量到期 |
| 7650 / 765 | core 上沿／上方 warning | surviving gross 106.624；signed -9.006 | after-target signed -4.095 | 离开 core 不等于上方收复已确认 |
| 7680 / 768 | 中间正节点 | surviving gross 51.302；signed +9.746 | after-target signed +12.728 | 正局部节点不足以推翻全局先验 |
| 7700 / 770 | 上方确认边界 | surviving gross 242.951；signed +0.369 | after-target signed -4.564 | 剔除目标 0DTE 后转负，须实时修复 |
| 7750 / 775 | 第一上行复核 | surviving gross 113.285；signed +5.615 | after-target signed +4.431 | 先检查实际残值和压力 |
| 7800 / 780 | 更高正节点 | surviving gross 114.260；signed +38.488 | after-target signed +38.358 | 不承诺到达 |

surviving 节点含 09-10／09-18／10-16，after-target 节点仅含 09-18／10-16。前者覆盖 ex-T-0DTE gross 的 **74.3%**，后者覆盖 after-target gross 约 **73.6%**；剩余到期不能从这张图推断局部符号。core 为 **7630–7650 / XSP 763–765**，corridor 为 **7600–7700 / 760–770**，均是决策区域。

## 10. T+1 Decision Map, Structural View and Plan Grade

**Primary regime：** negative_modeled_signed_gamma_with_expiry_concentration；**directional prior：** downside_bias；**path asymmetry：** directional，下破优先、上方收复为反证分支。Base 是下破后的延续复核；Risk 是上方价格与结构共同修复。**B / Conditional Next-Day Plan** 来自可追溯结构、明确路径、选腿算法和封顶风险；未升 A 的原因是候选特定 smile／退出估值和实时工具／容忍度流程尚未具备，未降 C 是因为仍能定义条件 family 与完整重筛方法。

**Execution Status：requires_external_live_source；Quote Portability：none；setup representation：candidate_template。** 候选级 IV Gate 如第 8 节，surface repricing risk 仍然存在。这里没有因一美分差异或未来报价尚未产生而升降级，也没有给旧版 B 作同方法排名。

### Observable Conditions and Reset Rules

所有价格条件采用 ET 常规时段对齐、已完成的 5 分钟 bar。**t0** 为 PPI 实际发布、数据／节点／配置重置完成后的下一完整 bar 起点，且不早于 09:30；计数只能从 t0 开始。初始假设不是执行确认，所需实时 feed、节点计算、情景估值、broker 能力和风险账本均为 **external_required**，当前未验证。不存在用价格触发替代节点确认的 fallback。

| Condition ID | 可观测定义／阈值 | Source / window / reset |
| --- | --- | --- |
| O_PPI / O_CAL | 核对 PPI 实际发布与当前事件窗口；其他 monitoring_only 事件仅在实质冲击时触发重置 | 官方发布＋当日交易台日历；入场前及事件后；E_PPI 清空全部旧计数与排名 |
| O_CONFIG | 在 t0 前冻结 mapping ε、parity ε、node migration ε 的**数值、单位、来源与时间**；当前均 null，尚未放行 | 实际交易参数记录；不得事后调宽，修改则重新开始计数 |
| O_DOWN / O_UP | 连续两根完成 5 分钟收盘严格低于 7600／高于 7700 | 合格 SPX 实时 feed；两次确认；任一次不满足则计数清零 |
| O_GAP_DOWN / O_GAP_UP | 若开盘直接低于 7600／高于 7700，先出现交易回到 ≥7600／≤7700 的回测 bar，之后重新计数 | 同一 feed；跳过回测不得追价 |
| O_SIGN_DOWN | 两次对齐快照同时满足：去掉目标 0DTE 的正剩余期限全链 signed＜0、纯 PM signed＜0、surviving 7600 局部 signed＜0；目标 0DTE 单列 | 同约定 OI／Greeks 计算器；USD／1% 与 USD／点分开；map age≤300 秒 |
| O_SIGN_UP | 两次快照中 7700–7750 局部 signed 合计＞0、新 0DTE signed＞0，PM 负值相对重置快照收窄或已非负 | 同计算器／同快照；不能由涨价推定符号已变 |
| O_NODE | 关键节点行权价迁移不超过预先冻结 ε_node | 同方法 strike map；每次确认及持有期间；超限清空计数、重画与重筛 |
| O_VOL | 15 分钟内 VIX 上升≥1.0 点，或候选同 expiry ATM IV 上升≥2.0 vp，触发重置 | 合格 VIX／IV feed；刷新、重新冻结并从下一完整 bar 计数 |
| O_RECLAIM / O_REJECT | 下行失效：一根收盘≥7600，下一完整 bar 不再交易至 7600 下方；上行失效：一根收盘≤7700，下一完整 bar 不再交易至 7700 上方 | 同价格 feed；硬风险或价格边界可要求更早退出，无需等完整形态 |
| O_QUOTES / O_MAPPING / O_SURFACE / O_VALUE | 同步报价、carry 一致性、实时 IV 和目标退出估值全部通过第 11 节协议 | broker feed＋同 expiry forward／估值器；每次选腿、改价及重置后重验 |
| O_BROKER / O_RISK / O_TIME | 原子化组合下单能力、真实剩余预算及有效退出窗口成立 | 实际 broker／风险账本／交易日历；第 11 节给出边界 |
| O_RANGE | 重置后至少三根完整 core 内收盘、节点稳定、无边界确认，且 spot、forward 与中心不确定区间都位于扣成本的情景盈利区域内并留正缓冲 | 价格＋节点＋情景估值器；至少 15 分钟；仅重开 range 研究，当前不新增第三张卡 |

两分支最早评估均为 **t0+10 分钟，不早于 09:40**。最低可行持有窗口暂按 30 分钟，故最晚新入场上限 **15:00**；更早的 broker／事件限制优先。若重置后已无法形成有效窗口，取消分支。两根确认、三根 range、波动阈值与退出上限沿用工作流默认；map age 300 秒、最低持有 30 分钟及后述候选网格／成本区间为本报告研究假设，未经 alpha 校准。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| core 内／corridor 内未释放 | O_PPI、O_NODE；O_DOWN／O_UP 尚未满足 | 方向未确认；不等于 range 已验证 | 观察，不提前建立两张方向卡 | 状态仍 pending；core 不是对所有 payoff 的永久禁令 |
| post-event range reconfirmed | O_RANGE 的价格、节点与净盈利区域包含测试全部成立 | 新稳定性证据 | 重做 centered 与 broad-range 筛选，当前无合格 range 卡 | 中心迁移／盈利区域失配须重审 |
| gap below／above boundary | O_GAP_DOWN／O_GAP_UP 后再满足对应 acceptance | 跳空改变入场位置 | 尚未回测则不追；通过才接入对应分支 | 首次可评估时已越过 short／下一节点则取消 |
| downside confirmation | O_DOWN + O_SIGN_DOWN + 相应共同门禁 | 条件式下行延续 | Base put vertical，最早 t0+10 分钟、最晚≤15:00 | O_RECLAIM；先在 7575 复核 |
| upside confirmation | O_UP + O_SIGN_UP + 相应共同门禁 | 原下行先验受到反证 | Risk call vertical，同样的条件时间窗 | O_REJECT；先在 7750 复核 |
| range thesis failure／boundary release | 相应 O_DOWN／O_UP 与 signed 确认 | 原区间假设失效，方向路径重新建立 | 仅评估对应方向卡，不能机械反手 | 重新估值与计数，沿用对应失效条件 |
| vol shock／event reset | O_VOL 或新 hard_reset 信息 | 旧计数、曲面和候选排名失效 | 先管已有风险，暂停新增并重置 | 未完成重置保持不激活 |
| node migration | O_NODE 超限或无法观测 | 原节点依据失效／不可确认 | 重画、重新选腿，重新计数 | 缺计算器或 ε_node 时不可宣称稳定 |

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base 下破 | directional continuation／put debit vertical | 下破后成立 | CPI 到期 wings 需刷新 | 风险可封顶；目标时点净值未定 | conditional | O_DOWN、O_SIGN_DOWN 与实时重筛 |
| Risk 上方收复 | directional continuation／call debit vertical | 收复后成立 | 同期 call wings 需刷新 | 风险可封顶；无已证 edge | conditional | O_UP、O_SIGN_UP 与实时重筛 |
| 条件方向 | directional broken-wing butterfly | 可构想非对称 payoff | 无候选到期曲率／翼价支持 | 未建立不对称候选估值 | not_screenable | 补相关 live wings 和情景损益后再研究 |
| 中心稳定 | centered debit butterfly／defined-risk iron fly | 当前缺可延续中心 | selected BF 不能替代候选曲率 | 未有成本后中心包含证据 | reject | O_RANGE 后重新研究，不以数点中心误差单独否决 |
| 宽区间 | broad-bounded iron condor | corridor 尚未验证，负 PM 与事件风险仍在 | 相关边翼未证便宜／昂贵 | 未有边界概率与退出估值支持 | reject | 稳定性与净盈利区域须重新证明 |
| 双向扩张 | long straddle／strangle | 有事件路径，但方向／幅度未检验 | 易受事件后降波影响 | 未有 move-versus-cost 比较 | not_screenable | 补两侧路径、IV crush 与退出残值 |
| 跨期限 | calendar／diagonal | 本日内方案无合格持有逻辑 | 跨 PPI／CPI／FOMC 不可直接比 IV | 未验证相对期限残值及退出方式 | not_applicable | 单独研究，不默认延长持仓授权 |

### Local Candidate Comparison

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Base：live long 锚最近档及上下各 1 档；同 expiry 卖下方，比较 W=3／5 | 方向 family 的中心包含测试 not_applicable；检验到第一节点的退出净值 | 首选 09-11，09-14 为比较备选；均用各自 wings | 比较 Base／Adverse／Invalidation／exit，风险按全部 legs 聚合 | 每个候选重算 Δ/Γ/V/Θ | 实际 fees、quote width、tick 与残值并列 | none | deferred_to_t1；每 expiry 3×2，两个 expiry 共 12 个网格位置，无赢家 |
| Risk：live long 锚最近档及上下各 1 档；卖上方，比较 W=3／5 | 同样 not_applicable；检验收复路径的退出价值 | 同期 call wings 与 CPI 剩余时间须一致 | 同一情景与成本口径比较，不用静态最大收益排名 | 同上 | 同上 | none | deferred_to_t1；另 12 个网格位置，无赢家 |

若指定到期／行权价未上市、无有效报价或已越过 short／下一复核节点，剔除相应候选。先检查 actual expiry universe，再比较相邻 long、两个 width 与两个到期；以净情景支持、不利敏感性、成本和可退出性筛选，不伪造 expected P&L。1:1 vertical 没有 butterfly 的对称／非对称 wings 选择，directional BWB 已单独列为 not_screenable。若重新研究稳定／区间 family，还必须执行 O_RANGE 的 spot／forward／中心区间包含测试。

### Base Candidate Template — Base Case

**Setup：PPI 后下破延续；linked scenario：Base；family：put debit vertical；screening：conditional；representation：candidate_template。** 适用 O_DOWN、O_SIGN_DOWN、必要 O_GAP_DOWN 与共同门禁成立的市场。O_RECLAIM 为 thesis invalidation；入场前节点、估值或时间条件失效则取消，完整 abort 见第 12 节。

首选 **09-11（T 为 2DTE，目标日为 1DTE）**；仅在比较显示更合适时考虑 **09-14（5→4 个日历日）**，须反映跨周末的合约定价，但本计划仍日内退出。09-10 新 0DTE 不是默认选择。long 锚为触发／当前入场位置映射后的最近有效 XSP put 档，上下相邻档共同比较；同到期卖出低 3 或 5 点的一腿，全部比例 1:1，live legs=pending。hard_reset、中心或节点迁移后重新选档，不自动沿用 EOD strikes。

买 put、卖更低 put 可减少支出和部分 Vega 暴露，并以牺牲更深下跌收益为代价；不能据此宣称优于 outright 的期望收益。候选 expiry 的 CPI 溢价、长短腿 wing richness 与 IV crush 必须实时重估。净 Delta 方向为负；Gamma／Vega／Theta 会随所在区间变化，不能照搬历史数值。即使方向正确，幅度不足、路径过慢、降波或退出价差仍可能令它亏损。

首先在 **7575** 重估 liquidation value，只有 thesis 与剩余 payoff 仍成立时才研究 **7550**；第一复核点不是必达目标或自动止盈。最大损失／收益沿用本节 ML／MP，成本后到期 BE 为 **K_long−d−C_N/(100N)**；到期盈利区域在 BE 下方，不利上尾受封顶 debit 风险约束。适用的是方向／退出损益检验，中心包含测试 not_applicable。估值状态 pending_live_repricing，edge 未建立；无实际下单组数。

### Risk-Path Contingency

**Setup：PPI 后上方收复；linked scenario：Risk；family：call debit vertical；screening：conditional；representation：candidate_template。** 仅在 O_UP、O_SIGN_UP、必要 O_GAP_UP 与共同门禁成立后进入评估；O_REJECT 或收复结构失效取消路径。它不是基准持仓，也不与 Base 叠加。

使用同一到期与日内持有规则，long 为确认／当前入场位置映射后的最近有效 call 档，上下邻档并列比较，同 expiry 卖出高 3 或 5 点的一腿，比例 1:1。body 不适用于 vertical；strike／width／expiry 全部在实时比较后确定，live legs=pending。刷新同 expiry ATM、上方 wings、Greeks 与剩余事件价值；re-strike 与 cancellation 规则同一协议。

买 call、卖更高 call 降低净支出并限制更高上涨的收益；净 Delta 方向为正，其他 Greeks 随 spot 与曲面变化。它可能因收复失败、上涨过慢、IV crush 或宽价差失效。首先在 **7750** 重估，之后才研究 **7800**；扣成本的到期 BE 为 **K_long+d+C_N/(100N)**，盈利区域位于 BE 上方，不利下尾最多损失封顶 debit 与成本。ML／MP、净限价、全部费用与 N 均按本节共用合同计算，pricing pending、edge not_established，无实际数量建议。

### 两张卡的情景估值与退出合同

| Scenario | Base put 的 SPX / IV / 时间条件 | Risk call 的 SPX / IV / 时间条件 | Values / method |
| --- | --- | --- | --- |
| Base / 对应有利路径 | 7575；持有 30 分钟；ATM 不变及 −2 vp，相关 wings 单独敏感性 | 7750；同一时间与 IV 口径 | entry debit、liquidation value、全成本净 P&L 均 pending |
| Adverse / 反向路径 | 回到 7600 附近并包括进一步反向压力；15–30 分钟；ATM ±2 vp 与不利 wing 移动 | 回到 7700 附近并包括进一步反向压力；同样假设 | 需合格实时模型估值；不假定方向和 IV 同步改善 |
| Invalidation | O_RECLAIM 实际发生时的 spot、surface、剩余时间 | O_REJECT 实际发生时的同类输入 | 以实际 liquidation value 管风险，不能等同到期内在价值 |
| Planned exit | 按实际 spot／surface 网格，最迟到共用 time stop | 同一合同 | 15／30／60 分钟敏感性；时间与数值在选腿后确定 |

每项估值必须记录模型／方法、同 expiry 输入、观察时刻、假设退出时刻、剩余时间、执行 haircut、全部费用与数量单位；目前没有合格的目标日重估器／输入，数值和情景概率均为空，不能计算期望收益。Base 点净利润必须覆盖成本并留正缓冲，Adverse／Invalidation 损失必须符合实际预算；一项有利情景为正并不证明 edge。

**持有／退出：** 两卡均日内，time stop=min(入场+60 分钟，**15:30 ET**，更早的 broker／会话／合约限制)。XSP 常规时段截至 16:15 ET，默认 09-11 PM 合约在 09-11 16:00 ET 停止交易；按实际会话和最早一腿最后交易时刻留 30 分钟缓冲，再与 15:30 工作流上限取更早者。选择别的 expiry 必须重算；最多一个 active setup、最多一次 re-entry、两次 thesis failure 或日预算耗尽即停止。[Cboe 交易时段](https://www.cboe.com/about/hours/us-options/)、[XSP 合约规格](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)

## 12. Base / Risk / No-Trade Scenarios

### Base Case

**Condition：** 第 10 节下破、signed 与共同门禁成立。**Expected path：** 有条件的下行延续，先复核较近节点再决定下一步，无路径概率。**Linked plan：** 第 11 节 Base put template。**Invalidation：** O_RECLAIM 或负结构／退出估值依据失效。

### Risk Case

**Condition：** 上方价格与局部／新 0DTE／PM 结构共同修复。**Expected path：** 上方货架收复并逐节点复核，不能由触发推导必达。**Linked plan：** Risk call contingency。**Invalidation：** O_REJECT 或收复一致性失效。

### No-Trade Case

**EOD no-qualified-plan：** 核心 formal 身份／完整性硬失败；无法定义可观察路径、trigger 和 invalidation；或所有 family 均无法提供封顶风险和可操作重筛方法。本次不属于这三种情形。未来实时值未产生、portability=none 或缺少公开 native complex NBBO，本身不构成 EOD 无计划。

**T+1 execution abort：**

- 对应 acceptance／signed 确认未成立，gap 未回测，或第一次可评估位置已越过 short／下一复核节点而必须追价。
- PPI／实质新闻／波动冲击重置未完成；关键节点迁移超限；旧计数、曲面或候选排名仍在被沿用。
- 必需的实时 source、节点计算、carry 输入、估值器、原子组合能力或预先冻结的数值容忍度缺失；不得用“人工确认”替代不可观测量。
- 报价时效／宽度、SPX–XSP mapping、carry-adjusted parity 或同 expiry IV／Greeks 不满足协议。
- 候选在目标退出时点的净情景支持不足，实际 limit 超过实时边界，或相邻候选比较不能给出符合风险与成本约束的结构。
- 真实风险账本未核对，全部持仓聚合后预算不足、已有 active setup，或达到两次 thesis failure／重入限制。
- 重置后已没有最低可行持有窗口，或不能在实际 broker／会话／合约截止前退出。
- 需要裸露风险、分腿追入、无界损失或未另行授权的隔夜／周末持有。

**Reconsideration：** 修复具体 capability 或输入，取得新事件后的合格数据，重新冻结参数、从新的完整 bar 开始确认，再完成 live candidate comparison 与退出估值。价格留在 core 仅说明方向卡未触发；满足 O_RANGE 后可以重做稳定性研究，不能直接启用本次已 reject 的区间结构。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on view / grade / status |
| --- | --- | --- |
| PPI 后 SPX 的位置、gap 回测与 bar acceptance | 连接结构先验与可观察路径 | 改变分支激活状态；只涨／跌一下不足以改变 prior |
| 全链正剩余期限／PM／新 0DTE 的 signed 与节点迁移 | 区分持续结构与当天短端重建 | 符号修复可改变 directional prior；数据不可见仅阻止执行 |
| 同 expiry ATM、25Δ slope、wings 与 CPI kink | 决定成本、IV crush 和 expiry／width 选择 | 可改变候选排名与可行性，不能单独给方向概率 |
| native／synthetic 组合宽度、成本后退出情景值 | 判断实际能否买到和退出 | 直接影响 live edge bound、执行状态；只有完整估值证据才支持计划质量重评 |
| 真实剩余风险预算、当前 setup 与有效持有时间 | 防止组合／时间约束被静态示例掩盖 | 不改变市场 thesis；限制或取消实际评估资格 |




> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
