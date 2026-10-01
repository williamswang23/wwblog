+++
title = "SPX期权持仓与Greeks结构分析-260930"
date = "2026-10-01"
data_as_of = ["2026-09-29", "2026-09-30"]
data_as_of_note = "T-1为9月29日，主数据为9月30日16:00 ET，信息截至当日19:43:55 ET；10月1日为条件计划目标日。"
draft = false
description = "分析9月30日SPX期权存续负Gamma扩大、到期层退出与10月1日ISM事件后的条件观察计划。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "7e026365310a9de73888303381894b7f2af202a57ba6f7da8570230900281999"
+++

# SPX期权持仓与Greeks结构分析-260930

研究交易日：**2026-09-30（周三，美东）**；目标交易日：**2026-10-01（周四）**。本期为 daily_eod，信息截止锁定在 **9 月 30 日 19:43:55 ET**；该时点目标日 GTH 与 RTH 均未开始。行情主截面为 16:00 ET，文中后续事件均为条件情景。

## 1. 结论

9 月 30 日存续期权的负 Gamma 代理进一步扩大、PM 弱势与 AM 抵消减弱共同支持**低置信 downside_bias**，10 月 1 日采用 **B / Conditional Next-Day Plan**，执行状态为 **requires_external_live_source**：只有 ISM 后 **7650 下方接受并获独立负结构确认**，才评估下侧方向价差，本报告是盘后条件计划。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | 低置信 downside_bias；7650 下侧延续优先，7675 上侧独立修复保留互斥分支；默认期限仅 10/2 到期。 |
| Earliest evaluation | Base / Downside / Upside 均为 event_dependent：10/1 初请、10:00 ISM 实际发布后完成 reset，最早 10:05 冻结并重计两根完整 5m bar，**最快 10:15 ET**；延迟、回测或冲击则顺延。 |
| Base activation | 若 7650 下连续两根完整 5m 接受且四层负结构确认，则评估 **put debit vertical → 7625 首次复核 → 7650 被收复且下一根未再跌回，或独立结构失效，则退出/取消**；引用 O_DOWN / O_SIGN_DOWN。 |
| Downside branch | 若跳空至 7650 下，须先回测再重计；通过同一负结构门禁才评估 **put debit vertical → 7625 → 同 Base 失效**；初次可评估已≤7625 或 XSP 越过所选 short，取消、不追。 |
| Upside branch | 若 7675 上连续两根完整 5m 接受且四层独立修复，则评估 **call debit vertical → 7700 → 跌回 7675 且下一根未再站上，或结构失效，则退出/取消**；初次可评估已≥7700 或越过 short，不追，引用 O_UP / O_SIGN_UP。 |
| Otherwise | **No Trade / observe only**：核心内未触发、reset / 实时工具 / 净估值 / 风险 / 时间门禁不合格则观察，补齐并重新确认后再评估。 |

Plan Grade / Plan Status：**B / Conditional Next-Day Plan**；Execution Status：**requires_external_live_source**；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 同一组 29 个存续到期日的 signed GEX 从 **-6.572B 降至 -21.294B USD/1%**；PM 负值扩大，AM 正值抵消缩小，构成下侧先验的主要证据。
- 本日最大 gross 暴露仍是即将退出的 9/30 0DTE，占全链 **26.54%**；剔除它后 signed GEX 仍为负，不能把月末到期删除理解为自动转入稳定状态。
- 最大**存续**到期日为 **10/16**，占存续 gross **31.25%**，但其 AM 为正、PM 为负；10/1 新 0DTE 必须独立刷新，不能照搬 9/30 的 7650 巨峰。
- Base 是事件后 7650 下接受，先在 7625 重估；Risk 是 7675 上接受并得到独立结构修复，先在 7700 重估。**7650–7675 是方向分支观察核心，7625–7700 是参考走廊**，均不是经过校准的预测区间。
- Formal IV 为 **partial / deterministic_expiry_proxy**：10/2 同到期 ATM 上升约 **1.524 vp**，固定 3D 下降约 **0.593 vp**包含插值构成变化；7D smile 变平、14/30D 变陡，未建立可交易价格优势。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/29 | T：9/30 | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 同 cohort gross / signed GEX | 189.377 / -6.572 | 201.907 / -21.294 | gross +6.617%；signed -14.721B | 负值扩大发生在相同到期集合；仍不能识别净新开仓或实际 dealer 对冲流。 |
| PM / AM signed | -12.071 / +5.498 | -22.217 / +0.923 | PM 更负；AM 正抵消减弱 | 下侧优先但置信度低；上侧放行必须看独立修复。 |
| raw spot / VIX | 7671.59 / 16.04 | 7652.74 / 16.34 | −18.85 点、−0.2457%；VIX +0.30 点 | raw 是同期链标的代理；官方收盘与 RV 均停在 9/29。 |
| 目标与事件 ATM / fixed 3D | 10/1 14.431%；10/2 14.460%；3D 14.460% | 10/1 14.278%；10/2 15.984%；3D 13.867% | same_expiry_atm：−0.154 / +1.524 vp；fixed_tenor_atm：−0.593 vp | 3D 从 10/2 observed 移到 10/2–10/5 插值；合约升波与期限槽降波可同时发生。 |
| 滚动 smile：level / slope / curvature | 10/6、10/13、10/29 | 10/7、10/14、10/30 | ATM：+0.191 / +0.633 / +0.347；skew：−0.227 / +0.167 / +0.183；BF25：−0.018 / −0.004 / −0.021 vp | rolling_tenor_slot_fixed_delta；包含 roll composition，微小曲率变化按不确定性内处理。 |

上表 GEX 数值单位为 **B USD / 标的变动 1%**，跨日比较使用共同到期集合；smile 各数字按 7D / 14D / 30D 排列。采用已有 fixed-tenor ATM 节点，不另用 rolling_tenor_atm 替代；smile 的滚动槽则不能冒充 fixed-tenor smile。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

本期只采用截止前可核实的三条宏观背景：

- **通胀与消费：**8 月个人收入环比 +0.2%、可支配收入 +0.3%、名义 PCE +0.9%、实际 PCE +0.6%；PCE 价格环比 +0.3%、同比 +3.4%，核心环比 +0.2%、同比 +3.0%。9/30 08:30 ET 发布并含从 2021 年起的年度修订，因此不能拿旧版 7 月数据直接归因；未核实一致预期，不使用“超预期”标签。[BEA：8 月个人收入与支出](https://www.bea.gov/news/2026/personal-income-and-outlays-august-2026)

- **增长反证：**二季度实际 GDP 年化增长 2.2%，相对第二次估计上修 0.7 个百分点；本次版本一季度为 2.5%，实际私人国内最终销售增长 4.6%。增长和消费韧性保留上侧风险，并不直接解释盘中价格变化。[BEA：二季度 GDP 第三次估计及年度更新](https://www.bea.gov/news/2026/gdp-third-estimate-industries-corporate-profits-state-gdp-and-state-personal-income-2nd)

- **就业背景：**ADP 9 月私人就业增加 9.0 万，8 月修订为 3.6 万、原值 3.8 万。已核实发布日期为 9/30，但没有独立存档的实际发布时钟，保守归类 background_only；它也不是 BLS 非农。[ADP：9 月私人就业报告](https://mediacenter.adp.com/2026-09-30-ADP-National-Employment-Report-Private-Sector-Employment-Increased-by-90,000-Jobs-in-September)

**从本期 EOD 到计划入场的首要变化，是事件与时间，而非已验证的隔夜价格走势。**目标日 08:30 初请、10:00 ISM 制造业为两条方向分支的 hard_reset；先等实际发布，再刷新与冻结。其余同日材料/发言先监测，只有产生实质冲击才升级 reset，不把所有日历项目都机械变成全天等待。截止时未取得可核实的隔夜期指/波动走势，不能写成“隔夜平稳”。

| 美东时间 | 事件 | 计划作用 |
| --- | --- | --- |
| 10/1 08:30 | Initial Jobless Claims | hard_reset：Base / Risk 均需完成。 |
| 10/1 10:00 | ISM Manufacturing；Construction Spending；NY Fed MCT；Waller 发言 | ISM 为 hard_reset；其余 monitoring_only，实质冲击升级重置。 |
| 10/1 11:30 / 13:30 / 15:00 / 15:30 | WEI / Jefferson / Bowman / Cook | monitoring_only；新的实质冲击清空计数与候选排序。 |
| 10/2 08:30 | Employment Situation | 进入 10/2 到期期权的事件背景；本计划周四日内退出，未授权持有跨非农。 |
| 10/2 10:00 / 12:45 | Economic Heterogeneity Indicators、制造业出货/存货/订单；NY Fed Nowcast | 后续观察日背景。 |
| 10/5 10:00 | ISM Services | 未来第三个 RTH 观察日；10/5 到期在目标日为 4 个日历 DTE，超默认窗口。 |

未来三个 RTH 为 **10/1、10/2、10/5**；计划时钟来自 [纽约联储 10 月经济日历](https://www.newyorkfed.org/research/calendars/i-oct26.html) 与 [美联储 10 月活动日历](https://www.federalreserve.gov/newsevents/2026-october.htm)。这里只使用预告日程，不使用未来结果；日历缺少独立的历史版本存档，实际发布时间和临时调整须目标日重核。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 存续负值扩大构成机制性先验

**Claim：**同 cohort 的 PM 走弱与 AM 抵消减弱支持下侧优先，但尚不足以预测方向。

**Evidence / basis：**共同 29 期 gross 189.377→201.907B，signed -6.572→-21.294B；PM/AM 分解见第 4 节。来源：两日 full-chain expiration panel 的 COMBINED / pure-family 互斥聚合，计算依据 C1。

**Mechanism / assumptions：**call-minus-put 为 dealer 符号代理；同到期比较仍包含 spot、IV、老化与 OI 变化。负 Gamma 机制能放大双向运动，并非空头流量记录。

**T+1 Implication：**保留 downside_bias，要求 O_DOWN 与 O_SIGN_DOWN 同时成立。

**Falsifier：**PM/剔目标层转正，或 7675 上接受并获独立修复，改变路径排序。

**Confidence：**low；事实与算术可复核，路径含义属于机制推断，未做独立预测检验。

### Thesis 2 — 到期巨峰删除后仍需重建节点

**Claim：**9/30 的 7650 极大负值不具有次日固定钉住权限。

**Evidence / basis：**7650 的 T0 signed 为 -490.392M USD/点；10/1 为 -13.913M，更长 selected 为 -13.864M；存续合计 -27.777M。来源：same_date_combined gamma tables，依据 C2。

**Mechanism / assumptions：**T0 消失减少局部量级，但仍有存续负层。selected 只覆盖部分到期日，且新增 11/20 改变构成；不能据此计算一个全市场 gamma flip。

**T+1 Implication：**将 7650 / 7675 用作待刷新确认参考；7625 / 7700 只是第一复核节点。

**Falsifier：**新 0DTE 符号相反、同口径节点实质迁移，或已跳过首节点而没有有效入场窗口。

**Confidence：**low；事实与算术可复核，路径含义属于机制推断，未做独立预测检验。

### Thesis 3 — 期限槽与同合约回答不同问题

**Claim：**10/2 事件到期升波与 fixed 3D 降波并不矛盾。

**Evidence / basis：**10/2 same_expiry_atm +1.524 vp，fixed_tenor_atm 3D −0.593 vp；后者从 10/2 observed 转为 10/2–10/5 总方差插值。来源：两日正式 IV packet，依据 C3。

**Mechanism / assumptions：**事件预期、期限老化与曲面变化共同作用；与非农日历相容不等于已经识别了纯事件方差。

**T+1 Implication：**默认 10/2 1DTE 候选仍需检验周四退出的 IV crush、wing 和时间衰减，不自动买入“便宜 3D”。

**Falsifier：**重新估值后第一节点净清算值无法覆盖入场成本及 buffer，取消候选。

**Confidence：**low；事实与算术可复核，路径含义属于机制推断，未做独立预测检验。

### Thesis 4 — 方向证据与增长反证并存

**Claim：**raw 下移及模型状态走弱不能排除增长驱动的修复。

**Evidence / basis：**raw −0.2457%、VIX +0.30；共同 DEX +90.628→+25.265B，Charm -0.751→-4.577B；GDP 上修、实际消费增长。来源：formal market context、高阶 Greek 表及 BEA，依据 C4。

**Mechanism / assumptions：**DEX 是模型对冲状态，Charm 是固定其他变量的时间变化；价格和宏观信息同现不能建立因果归因。

**T+1 Implication：**核心内观察，ISM 后重做方向排序；上侧卡只有在独立修复出现后进入评估。

**Falsifier：**7650 被收复，或 7675 上接受且多层转正；若只有报价失败，则只改变执行状态。

**Confidence：**low；事实与算术可复核，路径含义属于机制推断，未做独立预测检验。

##  7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| 共同存续 PM 负值扩大；剔 10/1 后全链仍负 | 到期最大负层消失；AM 整体仍小幅正 | 由共同 cohort 决定低置信下侧排序，不用全链 gross 正值命名 long-gamma。 |
| raw 下移，VIX 回升；7650 存续负节点 | GDP 上修、消费增长；7675 更长 selected 微正 | 价格接受必须与独立 signed 层同时验证，上侧修复保留。 |
| 10/2 事件凸点扩大、短期限估值敏感 | selected 地图约半覆盖，正式 IV partial，关键候选 wing 不在 packet | 这些限制压低置信度与可定价程度，不把所有结构信息归零。 |

主导证据是**同 cohort 存续 signed 代理及目标日可观察确认**；path_asymmetry_status=directional，path_confidence_basis=mechanism_only，empirical_validation_status=not_tested。没有校准胜率、情景概率或经验证实的收益优势。7650 收复及独立结构转强可以取消下侧路径；7675 接受并完成四层修复可切换至 Risk 分支。报价过期、预算不足或经纪商能力未确认只阻止执行；实质事件、vol shock 与节点迁移则要求重建路径，不只是重报价格。

## 8. IV Term Structure, Skew and Surface

 

### ATM IV Term Structure

| Expiry / tenor | τ days：P → T | ATM IV | T vs. T-1 / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 10/01 | 2 → 1 | 14.278% | -0.154 vp；same_expiry_atm | 目标日新 0DTE；PM | k=0 总方差插值；observation_bracketed；c=0.987；含 24h 老化 |
| 10/02 | 3 → 2 | 15.984% | +1.524 vp；same_expiry_atm | 非农到期；PM | k=0 总方差插值；observation_bracketed；c=0.988；含 24h 老化 |
| 10/05 | 6 → 5 | 11.906% | -0.066 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.987；含 24h 老化 |
| 10/06 | 7 → 6 | 12.115% | -0.038 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.989；含 24h 老化 |
| 10/07 | 8 → 7 | 12.345% | -0.005 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.990；含 24h 老化 |
| 10/13 | 14 → 13 | 12.143% | +0.164 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.988；含 24h 老化 |
| 10/14 | 15 → 14 | 12.612% | +0.205 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.989；含 24h 老化 |
| 10/16 | 17 → 16 | 12.982% | +0.261 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.993；含 24h 老化 |
| 10/29 | 30 → 29 | 13.252% | +0.174 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.990；含 24h 老化 |
| 10/30 | 31 → 30 | 13.425% | +0.188 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.993；含 24h 老化 |
| 11/13 | 45.041667 → 44.041667 | 13.731% | +0.176 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.992；含 24h 老化 |
| 11/20 | 52.041667 → 51.041667 | 13.841% | +0.181 vp；same_expiry_atm | PM scope；不含 AM | k=0 总方差插值；observation_bracketed；c=0.994；含 24h 老化 |
| fixed 3D | 3 | 13.867% | -0.593 vp；fixed_tenor_atm | SPXW_PM；no extrapolation | 10/02[τ 3–3,w=0.000000] → 10/02–10/05[τ 2–5,w=0.333333]；observed→interpolated；interpolated_between_observed_expiries；c=0.987 |
| fixed 7D | 7 | 12.345% | +0.191 vp；fixed_tenor_atm | SPXW_PM；no extrapolation | 10/06[τ 7–7,w=0.000000] → 10/07[τ 7–7,w=0.000000]；observed→observed；observation_bracketed；c=0.990 |
| fixed 14D | 14 | 12.612% | +0.633 vp；fixed_tenor_atm | SPXW_PM；no extrapolation | 10/13[τ 14–14,w=0.000000] → 10/14[τ 14–14,w=0.000000]；observed→observed；observation_bracketed；c=0.989 |
| fixed 30D | 30 | 13.425% | +0.347 vp；fixed_tenor_atm | SPXW_PM；no extrapolation | 10/29[τ 30–30,w=0.000000] → 10/30[τ 30–30,w=0.000000]；observed→observed；observation_bracketed；c=0.993 |
| fixed 45D | 45 | 13.748% | +0.193 vp；fixed_tenor_atm | SPXW_PM；no extrapolation | 11/13[τ 45.041667–45.041667,w=0.000000] → 11/13–11/20[τ 44.041667–51.041667,w=0.136905]；observed→interpolated；interpolated_between_observed_expiries；c=0.992 |

τ 是估值时点至到期的正时间，采用 packet 的 ACT/365 时间，不等同于目标日开盘 DTE。曲线分类 **mixed**：10/2 高于相邻 10/1、10/5，局部事件凸点明显；7D 后总体向上。3D−30D=+0.442、7D−30D=-1.080、14D−30D=-0.814、45D−30D=+0.322 vp。该凸点与就业日历相容，但没有独立事件方差估计。

同到期日相减包含 24 小时老化与重定价；fixed 3D 从 10/2 observed 变为 10/2–10/5 插值，7/14/30D 的 observed 源依次从 10/6→10/7、10/13→10/14、10/29→10/30。45D 从 11/13 observed（τ=45.041667）改为 11/13–11/20（τ=44.041667–51.041667，w=0.136905），保留夏令时切换的分数日，不强行改为整数。表中 confidence 是 packet 节点支持分数，不是价格预测概率。

9/30 到期层从 positive-time prior 中剔除；10/1 到期层在本截面 τ=1，目标日成为新 0DTE，另做战术判断。10/2 在目标日为 1 个日历 DTE，是默认 1–3 DTE 窗口内唯一实际到期日；周末不创造到期合约，10/5 为 4DTE。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：10/07 / ~7D / level | 15.515% | 13.787% | 12.345% | 11.326% | 10.757% | 2.462 vp | 0.212 vp | forward delta；观测支持区间内插值，ATM 为 k=0 总方差；c=0.947–0.990；partial |
| Δ：10/06(τ7) → 10/07(τ7) | -0.318 vp | +0.060 vp | +0.191 vp | +0.288 vp | +0.133 vp | -0.227 vp | -0.018 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll / 构成 / 重定价；materiality 未校准 |
| T：10/14 / ~14D / level | 17.105% | 14.528% | 12.612% | 11.388% | 10.838% | 3.140 vp | 0.346 vp | forward delta；观测支持区间内插值，ATM 为 k=0 总方差；c=0.948–0.989；partial |
| Δ：10/13(τ14) → 10/14(τ14) | +0.853 vp | +0.713 vp | +0.633 vp | +0.546 vp | +0.435 vp | +0.167 vp | -0.004 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll / 构成 / 重定价；materiality 未校准 |
| T：10/30 / ~30D / level | 19.737% | 15.952% | 13.425% | 11.951% | 11.416% | 4.001 vp | 0.526 vp | forward delta；观测支持区间内插值，ATM 为 k=0 总方差；c=0.974–0.993；partial |
| Δ：10/29(τ30) → 10/30(τ30) | +0.537 vp | +0.418 vp | +0.347 vp | +0.235 vp | +0.106 vp | +0.183 vp | -0.021 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含 roll / 构成 / 重定价；materiality 未校准 |

固定顺序解释：**level**——三个滚动槽 ATM 数值均上移；**slope**——7D downside skew 数值 flatten，14D / 30D steepen；**curvature**——BF25 均小幅下降，但没有节点误差或报价不确定性校准，按 **unchanged within uncertainty** 处理，不能将其定性为可信的曲率交易信号。

Skew term gradient：14D−7D=+0.678、30D−14D=+0.861 vp。相对各自 ATM，7/14/30D put25 wing premium 为 +1.442 / +1.916 / +2.527 vp，call25 为 -1.019 / -1.224 / -1.475 vp。下行翼 IV 高于 ATM、上行翼低于 ATM，是固定 delta 定价形状；downside_skew_25d 不属于统计矩 skewness。

方向价差需要自身 long / short IV、时间衰减及目标点净清算值；当前远期 smile 不能补 10/1、10/2 wing。Iron fly / condor / BWB 还需稳定中心、非对称翼成本和尾部压力估值；tail hedge 不能只因 put 翼较高就拒绝，也不能因负 Gamma 就证明值得买；calendar / diagonal 缺明确期限收敛与退出依据，本期不适用。两张保留方向卡的 IV dependency=background_only、IV gate=not_applicable，只表示没有 EOD IV 相对价值 thesis，目标日自身 ATM / 25Δ / 实际 wings / Greeks / scenario values 仍须刷新。**Partial 的可用节点及其变化只支持降级的局部研究证据，EOD sidecar 不授予执行权限。**

## 9. Key Expiry / Strike / Dealer Node

| Expiry | calendar DTE：T → T+1 | Family / settlement | Gross B/1% | Signed B/1% | OI | Durability / use |
| --- | --- | --- | --- | --- | --- | --- |
| 09/30 | 0 → 已到期 | SPXW / PM | 72.951 | -58.525 | 1,315,084 | T 日最大 gross；目标日前退出 |
| 10/01 | 1 → 0 | SPXW / PM | 12.091 | -3.395 | 167,973 | 目标日新 0DTE，独立刷新 |
| 10/02 | 2 → 1 | SPXW / PM | 25.036 | -7.165 | 570,357 | 默认 XSP 到期；事件估值敏感 |
| 10/16 | 16 → 15 | COMBINED：SPX AM + SPXW PM | 63.105 | +1.282 | 2,848,768 | 最大存续 gross；AM/PM 必须拆分 |
| 11/20 | 51 → 50 | COMBINED：SPX AM + SPXW PM | 33.105 | -1.902 | 1,528,117 | 新加入 selected；不是新发行合约 |

全链 gross=274.858B、signed=-79.819B；剔 9/30 后 gross=201.907B、signed=-21.294B；再剔 10/1 后 signed=-17.899B。10/1 占存续 gross 5.99%，不能因量级较小就忽略其盘中 Gamma 敏感度。10/16 拆分：AM gross 54.290B / signed +2.337B，PM gross 8.815B / signed -1.055B。

以下节点统一用 **M USD / SPX 变动 1 点**。存续 selected=10/1+10/16+11/20，“更长”=10/16+11/20；SPX/10 只是名义映射，不是已上市 XSP 行权价承诺。

| SPX / XSP nominal | Role | 10/1 signed M/点 | 更长 signed M/点 | 存续合计 M/点 | Durability / T+1 use |
| --- | --- | --- | --- | --- | --- |
| 7600 / 760 | 下侧第二复核，须先在 7625 重估 | -5.265 | -10.891 | -16.157 | reference_only；事件后实时重建 |
| 7625 / 762.5 | 下侧第一复核；非保证止盈 | -4.088 | -4.882 | -8.970 | reference_only；事件后实时重建 |
| 7645 / 764.5 | 边界前警戒；大部分原峰退出 | -1.429 | -0.020 | -1.448 | reference_only；事件后实时重建 |
| 7650 / 765 | 下侧确认参考 | -13.913 | -13.864 | -27.777 | reference_only；事件后实时重建 |
| 7655 / 765.5 | 旧 pin 附近；无固定锚权限 | -0.748 | -0.634 | -1.382 | reference_only；事件后实时重建 |
| 7660 / 766 | 核心内负节点警戒 | -5.609 | -0.833 | -6.441 | reference_only；事件后实时重建 |
| 7675 / 767.5 | 上侧修复确认；层间分歧 | -0.905 | +0.504 | -0.401 | reference_only；事件后实时重建 |
| 7690 / 769 | 上侧路径内负节点警戒 | -3.565 | +0.070 | -3.495 | reference_only；事件后实时重建 |
| 7700 / 770 | 上侧第一复核；目标层正、更长层负 | +4.020 | -11.974 | -7.954 | reference_only；事件后实时重建 |
| 7725 / 772.5 | 上侧第二复核 | +2.226 | +0.944 | +3.170 | reference_only；事件后实时重建 |
| 7750 / 775 | 更远正节点；不能越级追价 | +4.401 | +5.625 | +10.026 | reference_only；事件后实时重建 |
| 7800 / 780 | 远端正节点背景 | +1.855 | +19.692 | +21.546 | reference_only；事件后实时重建 |

这些地图覆盖当前存续 gross 的 **53.64%**；更长 selected 覆盖剔 10/1 后全链 gross 的 **50.69%**。故 core=7650–7675、corridor=7625–7700 都是当前局部证据与价格确认结合的工作参考；不以 selected 图求全市场 gamma flip，也不把最大 OI 或 pin=7655 当成确定吸引点。原 risk_summary 的 gross long-gamma、mixed-bucket IV rich、event-light 概括不作为结论，使用已核对的 signed cohort、正式 IV 与真实日历。

其余 Greek 状态仅辅助解释：共同 Vanna 从 +0.241B 变为 -0.371B，Charm 从 -0.751B 变为 -4.577B；全链 vendor VEX=1.754082B，存续 Volga=11.358857B（各按原字段定义）。Vanna 是 σ±0.005 的 DEX 差，Charm 为 next-trading-day 时间差；两日推进均为一个日历日。PM 16:00 / AM 17:00 是代码的估值参考，AM 17:00 不是实际结算钟；ACT/365 与交易日推进见复核记录。Vendor Vega 尺度未独立核实，不能直接与小数 σ 的 BS Volga 混比，更不能称已发生的买卖盘。

## 10. T+1 Decision Map, Structural View and Plan Grade

**Primary regime：**negative surviving gamma、PM 弱势、AM 抵消减弱。**Directional prior / path asymmetry：**downside_bias / directional，low confidence；Base 下侧延续，Risk 独立上修。**Plan：B / Conditional Next-Day Plan；Execution：requires_external_live_source；Quote Portability：none；setup representation：candidate_template；IV Structure Gate：not_applicable**（两张保留卡没有 required-IV 相对价值 thesis；原始 IV 数据仍为 partial）。

B 的理由是结构、互斥路径、有限风险表达和目标日重筛协议已定义，但局部地图约半覆盖、宏观反证与候选 wing / 退出估值不足，不能升为高质量定价计划。没有降为 C，是因为正式基础包通过，触发与失效能够定义，并有可操作的 live re-screen 路径；none portability、未产生的未来报价本身不构成 C。几十美分以内、落在报价/费用不确定性内的比较不能抬高评级。

### 观察、重置与时间的统一定义

| Condition ID | 来源 / 时效 | 观测窗口、阈值与 reset |
| --- | --- | --- |
| O_RESET / O_CAL / O_CONFIG | 官方实际发布与冻结记录 | 10/1 初请与 ISM 发布后刷新；10:05 前不得冻结。t0=不早于完成冻结的首个 5m 边界；两根完整 bar 后最快 10:15。映射、parity、节点/时差、近零 mid 绝对 tick、中心误差与净价值 buffer 须预先数值化；null 不放行。 |
| O_DOWN / O_UP | 实时 SPX 完成 bar；≤30 秒 | 分别连续两根完整 5m close 严格 <7650 / >7675；从 t0 重新计数，不能用半根 bar 或事件前 bar。 |
| O_SIGN_DOWN | 同口径外部实时地图；≤300 秒 | 两根接受 bar 的终点：所有仍可交易 PM 总 signed<0 且不高于事件后冻结基准；剔 10/1 0DTE 的全链 signed<0 且不高于基准；闭区间[7625,7650] PM 局部 signed<0；10/1 新 PM 0DTE signed<0。 |
| O_SIGN_UP | 同口径外部实时地图；≤300 秒 | 两根终点：全 PM signed≥0 且不低于冻结基准；剔 10/1 的全链 signed≥0；闭区间[7675,7700] PM 局部 signed>0；10/1 新 PM 0DTE signed>0。价格突破不能代替任一层。 |
| O_GAP_DOWN / O_GAP_UP | 逐笔与完整 bar | 开盘或 reset 后首价已在确认位外，先出现 high≥边界且 low≤边界的回测 bar，再从后续完整 bar 重计；首次可评估已越首节点或实时 XSP 越所选 short，则取消。 |
| O_RECLAIM / O_REJECT | 实时完整 5m bar | 下侧：一根 close≥7650、下一根未再<7650，失效；上侧镜像：一根 close≤7675、下一根未再>7675。独立结构/风险失效可更早退出，不强制等待。 |
| O_NODE / O_VOL | 同 scope/cohort 地图、实时 VIX 与候选 ATM | 节点超冻结容差，或 15 分钟 VIX 上升≥1 点 / ATM 上升≥2 vp，清空计数和排名，重新刷新冻结。300 秒地图龄为本报告未校准假设。 |
| O_RANGE | 实时 spot/forward、中心区间与 MTM | 连续三根完整 5m 在预冻结 7650–7675 核心内，无期间越界/冲击；spot、forward 与完整 center uncertainty 区间均落在成本后 scenario 盈利区域内，并留正 buffer。还须独立重筛 range family。 |

模型地图总量按 USD/1% 比较，局部按当时 live spot 换算 USD/点；不能以不同 scope、contract cohort 或新增 expiry 制造“节点迁移”。目前这些实时地图与估值能力均为 **external_required**，尚未确认服务/权限。必需模型层没有价格替代 fallback；若无法取得，就停止对应分支，不用“人工确认”四字跳过能力缺口。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 事件前 / reset 未完成 | O_RESET / O_CONFIG | 旧计数与候选顺序无权威 | 观察 | actual release / freeze 未完成 |
| 7650–7675 核心 | 未满足 O_DOWN / O_UP | 方向 release 未触发 | 不建立方向仓 | 不等于所有 range 一律禁用 |
| 7625–7700 参考走廊 | 按所处边界选择 O_DOWN / O_UP / O_RANGE | 走廊是地图参考，不是稳定区间证明 | 分支单独评估 | 不得从走廊标签直接选 iron condor |
| 7650 下接受 | O_DOWN + O_SIGN_DOWN + 公共门禁 | 负结构与价格同向 | F_PUT；首查 7625 | O_RECLAIM / 独立结构失败 |
| 7675 上接受 | O_UP + O_SIGN_UP + 公共门禁 | 需要真实独立修复 | F_CALL；首查 7700 | O_REJECT / 独立结构失败 |
| gap / 首次评估已过首节点 | O_GAP_DOWN / O_GAP_UP | 无回测或净空间不足 | 回测重计，或取消 | 不追到 short 之外 |
| post-event range reconfirmed | O_RANGE + 自身 surface / MTM / 成本 / 尾部重筛 | 稳定 thesis 才可能成立 | 本期 range 未选，重新审查后再议 | 不能从三根 bar 单独升级为可下单 |
| range thesis failure / boundary release | O_RANGE 失效、O_NODE 或有效边界接受 | 中心/盈利区域失配，旧 range 取消 | 清空 range；方向条件独立重计 | 不自动反手 |
| vol reset / node migration | O_VOL / O_NODE | 先验或候选可能失效 | 刷新、冻结、重新累计 | 旧 trigger 与 EOD 排名作废 |
| 实时能力、价格、风险或时间失败 | O_QUOTES / O_MAPPING / O_SURFACE / O_VALUE / O_BROKER / O_RISK / O_TIME | 执行条件不合格 | No Trade | 不能保留最低持有窗口则取消 |

两条方向分支的条件最早评估均为 **10:15 ET**，正常最晚入场为 **15:00 ET**；此处不是保证开放窗口。适用退出截止取 **min(15:30、用户/经纪商更早限制、min(所有腿最后交易时间、当日 RTH 收盘)−30 分钟)**，最晚入场再减去 30 分钟最低可行持有期。time stop=min(实际入场+60 分钟、适用退出截止)。实际发布延迟、gap 回测、重新 reset 或早收市会推迟/缩短窗口，不能满足就取消。

正常目标日 RTH 为 09:30–16:15 ET；10/1 到期 XSP 最后交易为 16:00，10/2 非到期合约目标日 RTH 至 16:15；GTH 为前晚 20:15–09:25，Curb 为 16:15–17:00，但本计划不延长到 Curb / 隔夜。10:05 缓冲、300 秒地图龄及 30 分钟最低持有期是本报告未经验校准的工作假设；其余默认参数与未冻结容差列入内部参数表。日历与合约规则依据 [Cboe 交易时段](https://www.cboe.com/about/hours/us-options)、[XSP 合约规格](https://www.cboe.com/tradable_products/sp_500/mini_spx_options/specifications)，实际经纪商限制须再核。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| base | directional_continuation / put_debit_vertical | conditional | background_only / IV gate=not_applicable | pending_live_repricing；edge=not_established | conditional；execution=external_required | 7650下接受且独立负层确认，7625前有足够净退出价值。 |
| risk | directional_continuation / call_debit_vertical | conditional | background_only / IV gate=not_applicable | pending_live_repricing；edge=not_established | conditional；execution=external_required | 7675上接受且独立结构修复，首查7700；不能只凭价格突破。 |
| boundary_release | centered_stability / defined_risk_iron_butterfly | not_established | required / IV gate=fail | unavailable；edge=not_established | not_screenable；execution=external_required | 缺稳定中心、候选wing和成本后scenario盈利区；不能把旧7650到期峰固定为body。 |
| boundary_release | broad_bounded_range / defined_risk_iron_condor | not_established | required / IV gate=fail | unavailable；edge=not_established | not_screenable；execution=external_required | 观察核心不证明宽区间稳定；需完整center/profit-region/wing与short-gamma压力估值。 |
| base | directional_continuation / broken_wing_butterfly | not_established | required / IV gate=fail | unavailable；edge=not_established | not_screenable；execution=external_required | 已检查方向替代；缺收敛终点、候选wing相对成本及非对称尾部MTM。 |
| event_reset | two_sided_expansion / straddle_strangle | not_established | required / IV gate=fail | unavailable；edge=not_established | not_screenable；execution=external_required | 无已识别双向幅度足以覆盖premium与IV crush的证据，不能凭负gamma买波动。 |
| event_reset | term_or_vol_relative_value / calendar_diagonal | not_established | required / IV gate=fail | unavailable；edge=not_established | not_applicable；execution=external_required | 未建立与仅日内持有相容的期限收敛thesis和退出估值；不静默转为隔夜。 |
| base | directional_continuation / long_option | conditional | background_only / IV gate=not_applicable | pending_live_repricing；edge=not_established | conditional；execution=external_required | 现场与vertical比较最大风险、净目标价值和尾部空间，未证实哪一个更优。 |

F_PUT / F_CALL 为保留候选，**pricing_assessment=pending_live_repricing；edge_evidence_status=not_established；execution_feasibility=external_required**。F_OUTRIGHT 仅是现场比较基准，不构成第三张策略卡。Fly 与 condor 各自筛选，不能因核心区存在就推定其稳定 thesis；required-IV family 的局部 fail 不污染保留方向 family 的 not_applicable 聚合门禁。

| Illustrative / diagnostics only | 全部 side / strike / ratio 与逐腿 EOD 报价 | Synthetic combo bid / mid / ask（点） | C=6/16 美元时：到期 ML / MP（美元）/ BE | 净 EOD Greeks | Scenario value / permission |
| --- | --- | --- | --- | --- | --- |
| F_PUT；10/2，目标日 1DTE；仅 unit_payoff_example | 买1×765P [b/m/a 2.490/2.620/2.750，IV 12.43%]；卖1×760P [b/m/a 1.080/1.180/1.280，IV 14.12%] | 1.210 / 1.440 / 1.670 | C=6: ML=173, MP=327, BE=763.270; C=16: ML=183, MP=317, BE=763.170 | Δ -0.2300；Γ +0.0169；Vega +0.0454；Θ -0.0470 | 四情景 MTM=null / pending；无赢家，非实时执行依据 |
| F_CALL；10/2，目标日 1DTE；仅 unit_payoff_example | 买1×768C [b/m/a 2.550/2.645/2.740，IV 17.12%]；卖1×773C [b/m/a 0.920/0.990/1.060，IV 15.71%] | 1.490 / 1.655 / 1.820 | C=6: ML=188, MP=312, BE=769.880; C=16: ML=198, MP=302, BE=769.980 | Δ +0.1972；Γ +0.0086；Vega +0.0610；Θ -0.3340 | 四情景 MTM=null / pending；无赢家，非实时执行依据 |

XSP snapshot 覆盖 420 个报价、6 个到期日，每期 70 个 call / put 报价；本次观察到 strike 748–782、步长 1，实际目标日网格仍须核对。原 candidate_spreads.csv 仅 120 个受两腿/风险 200 美元约束的截断候选，不是完整 universe。14 组 carry/parity 诊断的中点 forward 残差约 **−0.049575 至 +0.018032 XSP 点**，SPX packet forward/10 全部落在 call/put bid–ask 所容许区间内；这只是同钟 EOD 代理核对，不是独立 XSP forward、套利证明或可成交同步证据。

**EOD reference 仅用于盘后可行性诊断，不是 T+1 expected entry 或 binding limit。**目标日先按实时 spot / forward、expiry、ATM term structure、25Δ skew / relevant wing points 与局部候选比较重新选腿，再从实时 native combination mid 附近按 net limit 评估；debit 不得超过 live edge bound 与风险预算更严格者。原生 complex quote 优先；当前只有 synthetic-only。若没有公开 native NBBO，须确认经纪商支持原子化 multi-leg net-limit，且所有实时门禁可核验，才可继续；缺少公开 native NBBO 本身不自动否决，但不允许拆腿追价或留下裸风险。

### Local Candidate Comparison

| Candidate rule / illustrative grid | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F_PUT：2 个到期 × 3 个相邻 long × 2 个宽度＝12 | directional：中心包含测试 not_applicable；检查第一节点/失效/退出 MTM | 自身 ATM/wing 待刷新；不借远期 smile | 四情景 pending；有限 debit 风险 | 实时净 Greeks 重算 | 两腿费用与 bid/ask 压力 | none | deferred_to_t1；未选赢家 |
| F_CALL：相同网格，12 | directional；先有独立修复，再检查净目标空间 | 同上；不能单凭价格站上即放行 | 四情景 pending | 实时重算 | 两腿成本 | none | deferred_to_t1 |
| F_FLY：2 到期 × 3 邻近 body × 4 组对称/非对称翼＝24 | spot/forward + 完整 center interval 须在成本后盈利区内并留 buffer | 缺候选 wing 与稳定中心 | 尾部两侧 MTM 未建立 | 短 Gamma 风险另测 | 四腿成本与退出能力 | none | not_screenable；诊断网格留待目标日重筛 |
| F_CONDOR：同样 24，shorts 在候选中心两侧分别展开 | 与 fly 独立定义宽区间；不得混用盈利区 | 缺自身 wing / 区间稳定证据 | 两侧尾部/迁移待重估 | 实时重算 | 四腿成本 | none | not_screenable；无 range 执行卡 |

全部 72 组只完成 EOD 报价与到期算术核对。期限网格为 10/1 战术 0DTE 对照、10/2 默认 1DTE；方向 long 按确认参考附近实际网格取相邻下/中/上三档，比较 3 与 5 点宽度。Range 比较三个相邻中心，以及 (3,3)、(5,5)、(3,5)、(5,3) 两侧翼宽；condor 的 shorts 相对中心各外移一档，不能把它与 fly 当同一 payoff。

事件后重新按 live spot / forward 与节点定中心，使用实际上市网格重建邻域；先剔除 IV / quote / 风险 / 时间不合格者，再比较第一复核节点的保守净清算值、Adverse / Invalidation 损失、费用和流动性敏感性。差异在 bid/ask 加费用不确定性内则不能择优。若全邻域不合格，就不交易；不沿用 EOD premium 排名。

### Base Candidate Template — Base Case

| 字段 | Base template |
| --- | --- |
| 身份 | F_PUT / Base / directional_continuation / put_debit_vertical；screening=conditional；candidate_template；portability=none、fixed-legs authority=none，live legs pending。 |
| 适用与激活 | ISM 后负结构延续：按 O_DOWN + O_SIGN_DOWN，gap 依 O_GAP_DOWN；两条方向卡互斥，先通过全部公共门禁。 |
| 期限、持有与选腿 | 默认目标日 1–3 日历 DTE 中的 10/2；10/1 仅战术对照。日内持有，最低可行 30 分钟、time stop 60 分钟、最迟适用截止退出。long 取实时确认锚附近流动性较好的 put，比较相邻三档；short 在下侧、同到期同类型，宽度比较 3/5 点，按实际网格重选。 |
| Term / skew / Greeks | 10/2 事件凸点是背景；自身 ATM、25Δ 与两条实际翼必须刷新。方向 Delta 向下；Gamma / Vega / Theta 随 spot、IV 和时间变化，EOD 符号只见诊断表，不能推定现场相同。 |
| 取消与失效 | 未完成 reset、价格已过首查/short、没有合格实时估值/报价/预算或有效窗口则取消；入场后按 O_RECLAIM 或独立 signed / 风险失效退出，冲击/迁移不得沿用旧卡。 |
| 价格、风险与 tail | 客户支付正 debit；使用本节三层价格边界。ML=100Nd+C_N，MP=100N(W−d)−C_N，BE/盈利侧按 Put 公式；实际 N 与数值边界 pending。最大到期 tail loss 为 funded debit 加费用，执行不允许裸腿。 |
| 四情景与定价 | Base：到 7625 时净 MTM；Adverse：无进展 + 不利 IV / wing + 时间损耗；Invalidation：收复 7650 或结构先失效；planned-exit：time stop / 适用截止。四个价值与概率均 null，等待实际输入；pending_live_repricing / not_established / external_required。 |
| 复核与比较 | 7625 是重新估值点，不是保证盈利点；之后才决定是否继续观察 7600。与 long put 比，卖出远端腿可能降低出资与 Vega，但封顶延续收益、增加成交成本，现场净估值未证明它更优。增长反弹、IV crush、Theta、滑点均可令计划失败。 |

### Risk-Path Contingency

| 字段 | Risk contingency |
| --- | --- |
| 身份 | F_CALL / Risk / directional_continuation / call_debit_vertical；conditional；candidate_template；portability=none、fixed legs=none；仅独立修复后评估，不是基准持仓。 |
| 适用与激活 | 按 O_UP + O_SIGN_UP，gap 依 O_GAP_UP；需四层修复同时成立，不能用价格突破代替结构。 |
| 期限、持有与选腿 | 默认 10/2，目标日 1DTE；10/1 只作战术对照。日内退出纪律相同。long 按实时上修锚附近三档 call 比较，short 在上侧、同到期同类型，3/5 点宽度；自身 long/short IV、forward 与报价变化后重新选腿。 |
| Term / wing / 风险 | 事件凸点与未来波动重置使 Vega/Theta、两翼价差敏感；Delta 向上但其余 live Greeks 须重算。三层价格边界同上；ML/MP 公式相同，BE/盈利侧用 Call 公式；实际 N、live limit 与 tail 金额 pending。 |
| 取消与失效 | 初次可评估已≥7700 或实时 XSP≥所选 short 不追；必要门禁或持有窗口失败取消。按 O_REJECT 或独立结构/风险失效退出；若负结构未修复，这张卡不激活。 |
| 四情景与定价 | Base（本分支目标）：到 7700 的净 MTM；Adverse：修复停滞 + IV/wing 不利 + 时间损耗；Invalidation：跌回 7675 或结构先失效；planned-exit：time stop / 截止。四值与概率均 null；pending_live_repricing / not_established / external_required。 |
| 复核、比较与失败原因 | 7700 先重估，之后才考虑 7725。与 long call 比，可能降低支出却限制延续收益，多腿退出成本可抵消优势；尚无证据证明更优。假突破、PM 继续为负、负 Gamma 向下放大、事件反转、Theta/IV crush 均可使其失败。 |

两张卡所需实际能力一致：可确认时点的 SPX/XSP 实时行情、同 scope 的全链/PM/新 0DTE/局部地图、独立 carry/forward、候选自身 surface 与四情景估值器、同步全腿报价、风险账本及原子化组合交易能力；当前均未确认。没有第三张 Alternative Setup；range 与 outright 留在筛选/比较层。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

**Condition：**ISM 后完成刷新冻结，7650 下两根完整接受、四层负结构确认、必要 live / 价格 / 风险 / 时间门禁全部通过。**Expected path：**先向 7625 复核，只有净清算值、结构和剩余时间仍支持才考虑 7600；是条件路径，不赋予概率。**Linked plan：**F_PUT。**Invalidation：**O_RECLAIM、独立 signed 层失效或风险先触发。

### Risk Case

**Condition：**7675 上接受并完成 O_SIGN_UP 四层独立修复，必要门禁通过。**Expected path：**先在 7700 重估，再决定是否继续观察 7725。**Linked contingency：**F_CALL，与 Base 互斥。**Invalidation：**O_REJECT 或独立结构/风险失败；只有价格站上且 PM 仍负时不激活。

### No-Trade Case

**EOD no-qualified-plan：**正式输入身份/完整性硬失败、结构与触发/失效无法定义、所有合格 payoff 失败、事件风险推翻全部预设路径且无法重建，或根本无法构建有限风险的目标日重筛协议，才应改为 C；本期没有触发这些条件。**T+1 execution abort：**未触发、gap 未回测、冲击未 reset、独立地图缺失、mapping/parity/报价/候选 IV/情景值不合格、预算耗尽、两次 thesis failure，或过晚而无法保留最低持有期。

**Reconsideration：**先修复实际缺口，完成事件后重新冻结与完整计数，再对新的局部候选和账户做全套核验。若中心迁移或 range 盈利区失配，取消旧 range thesis，不能自动反手。未来数据尚未产生、报价权限 none、EOD 固定腿失去迁移性或缺公开 complex NBBO，均不能单独把本期盘后结构改写成无计划。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on view / grade / execution |
| --- | --- | --- |
| 7650 / 7675 接受及 7625 / 7700 首查 | 区分延续、修复与已错过净空间 | 价格加独立层可改变 structural path；单独价格不证明结构。 |
| 全 PM、剔目标层、新 0DTE 与局部 signed 地图 | 检验原负结构是否继续以及节点是否迁移 | 跨层修复或失败改变方向先验；scope 不可比则降低证据权限。 |
| 10/2 自身 ATM / 25Δ / 实际 wings 与四情景值 | 事件凸点、wing 重置和 Theta 决定净退出价值 | 可取消候选或改变期限/行权价；未自动证明 edge。 |
| 实时组合流动性、映射/parity与风险账本 | 控制可成交价格、费用和组合风险 | 主要改变 execution status；L/H/N/C_N 未知不得放行。 |
| 实际事件、reset 与剩余可行窗口 | 计数的合法起点及有意义的退出时间 | 实质冲击需重建；窗口不足则取消当日评估。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
