+++
title = "SPX期权持仓与Greeks结构分析-260910"
date = "2026-09-11"
data_as_of = "2026-09-10"
draft = false
description = "基于9月10日盘后持仓与Greeks结构，分析CPI重置后的条件路径、IV变化和实时确认要求。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "735063037aadebde215fcf35109db29fbcc6b0e933c15a99c688733f19d7ac79"
+++

# SPX期权持仓与Greeks结构分析-260910

## 1. 一句话结论

T 日是**负 modeled signed gamma 加深、近端到期节点集中**的结构，T+1 保留下行确认优先、上方恢复为风险分支的机制性先验；计划为 **B / Conditional Next-Day Plan**，执行状态为 **requires_external_live_source**，关键确认是 CPI 重置后能否在 **7550 下方**形成价格与实时负 signed 结构的一致证据，本报告仅为盘后条件计划。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | downside_bias；下行确认优先，保留上方恢复风险；structural confidence：medium。 |
| Earliest evaluation | 不早于 09-11 09:40 ET，实际为 t0+10 分钟；先完成 CPI、开盘及必要的波动／节点重置，取得合格快照并冻结参数，t0 不早于 09:30。 |
| Base activation | 若 7550 下方接受、负 signed 确认及必要的 gap 回测成立，则评估 put debit vertical；首先在 7500 复核，之后才考虑 7450；reclaim 7550 或结构／估值失效则取消。 |
| Downside branch | 若同一 Base 下破路径成立，则沿用 put debit vertical 条件模板，第一复核点 7500；reclaim 7550 失效，不叠加第二个 setup。 |
| Upside branch | 若 7650 上方接受、局部与新 0DTE 转正且 PM 负压收窄，则评估 call debit vertical；首先在 7700 复核，之后才考虑 7750；rejection 7650 或恢复结构失效则取消。 |
| Otherwise | No Trade / observe only；等待有效触发、gap 回测、重置完成与必要门禁通过；区间稳定性重新确认仅开启新的策略研究。 |

Plan Grade / Plan Status：**B / Conditional Next-Day Plan**；Execution Status：**requires_external_live_source**；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- 同源期权链 SPX 锚由 7636.68 降至 **7591.82，−0.587%**；共同存续 signed 暴露进一步负化，不能用正 gross GEX 推导稳定盘。
- Base 只在 **7550 下方确认**后成立；下行先验尚不能让当前位置成为入场信号。
- 不对称来自 PM 负 signed 加深与下方负节点；Vanna 的 AM／PM 大幅抵消，削弱了“升波必有一致方向对冲流”的说法。
- **09-18** 占剔除 T 日 0DTE 后 gross GEX 的 **59.54%**，其中 AM 占 **90.94%**；09-11 将成为目标日新 0DTE，需单独重建。
- CPI 到期 ATM 升至 **19.217%**；微笑水平、下翼斜率与 BF25 算术上均上升，但换槽位、时间流逝和质量不确定性仍在。
- **7580–7600** 为方向尚未释放的 core，**7550–7650** 为决策 corridor；这些是研究边界，不是已验证的概率区间。
- 保留互斥的 Base put debit vertical 与 Risk call debit vertical。**B 衡量计划质量**；CPI 后重新比较 09-14／09-15 候选，目标日仍须日内退出，价格 edge 尚未建立。

## 4. What Changed vs. T-1 and Prior Playbook Review

以下 GEX 单位为 **B USD / SPX 变动 1%**，B=10亿；DEX、Vanna 与 Charm 的单位另列。“共同存续”固定两日均存在、且到期日晚于 09-10 的 31 个到期，避免把两日各自剔 0DTE 的不同集合直接相减。

| 维度 | T−1 | T | 对本期判断的意义 |
| --- | --- | --- | --- |
| 同源 SPX 结构锚 | 7636.68 | 7591.82 | −44.86 点／−0.587%；仅是收盘位置比较 |
| 31 个共同存续到期：gross / signed | 371.714 / -30.011 | 368.337 / -49.183 | gross −0.908%；signed −19.173 B |
| 共同 AM / PM signed | -1.821 / -28.189 | -3.816 / -45.367 | PM 贡献 signed 负向变化的 89.60% |
| 共同到期中、目标日仍为正 DTE 的 30 个：gross / signed | 348.451 / -18.802 | 343.735 / -33.944 | 删除 09-11 后仍负化；不是只由目标日 0DTE 引起 |
| 09-11 到期：gross / signed | 23.262 / -11.208 | 24.602 / -15.239 | 目标日新 0DTE：T 的负值只作战术先验 |
| 共同 DEX / Vanna / Charm-next（B USD，按各自定义） | 398.863 / -2.161 / 7.593 | 108.602 / -0.011 / 8.482 | DEX 下移，Vanna 由负转为接近零，Charm-next 增加；不是已实现流量 |
| VIX / 2Y / 10Y | 16.46 / 4.43% / 4.83% | 17.84 / 4.56% / 4.95% | +1.38 VIX 点／+13bp／+12bp；不能据此识别单一原因 |
| 09-11 同到期 ATM / fixed 3D | 15.837% / 13.672% | 19.217% / 13.807% | +3.380 vp same_expiry_atm / +0.135 vp fixed_tenor_atm；来源权重不同 |

共同到期 OI 从 11,043,775 增至 11,348,889；本期多出的远端零暴露到期不改变上述总量，但比较仍按共同集合定义。期权价值、标的、IV、时间与 OI 同时变化，当前包未把这些效应逐项归因，不能把 signed 差额全部称为新建仓或 dealer 交易。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

本期最多保留三条新闻背景：

- **PPI，pre_data：**官方可检索发布摘录显示，8 月最终需求 PPI 环比 **+0.4%（季调）**、同比 **+5.4%（未季调）**。原 PDF 全文访问返回 403，因此只使用摘录支持的 headline，不引入未核实的预期差或细项。该信息在 T 日收盘前，不是目标日的新触发器。[美国劳工部 PPI 发布摘录原址](https://www.dol.gov/newsroom/economicdata/ppi_09102026.pdf)
- **ECB，pre_data：**9 月 10 日官方决定将三项政策利率上调 25bp，存款利率自 9 月 16 日起为 **2.50%**。它增加全球利率背景的解释力，不代表美联储已作同样决定；页面日期及盘前发布安排可核实，实际发布秒级时刻未独立记录。[ECB 货币政策决定](https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html)
- **市场收盘回顾，post_data_after_close：**AP 16:19:35 ET 发布的报道记载 SPX 收于 **7591.70**、跌约 0.6%，Brent 盘中一度超过 108 美元。文章盘后发布，所述变化发生在此前交易中；该收盘数仅作交叉核对，油价／通胀叙事也不等于已识别的 dealer 卖流。[AP 当日市场报道](https://apnews.com/article/wall-street-stocks-dow-nasdaq-0c547c6cc3e374a2c04f78a90e35e113)

未来三个交易日是 **09-11、09-14、09-15**。下表只使用截止前可见的日历；尚无任何目标日实际结果。

| 日期 / ET | 事件 | 事件权限 / 对分支的影响 |
| --- | --- | --- |
| 09-11 08:30 | CPI 与 Real Earnings | E_CPI：两分支 hard_reset；需确认实际发布、重建市场状态 |
| 09-11 10:00 | Michigan 初值 | E_MICHIGAN：monitoring_only；不一律要求等到 10:00，重大内容或波动冲击则重置 |
| 09-11 12:00 | Financial Accounts / Z.1 | E_Z1：monitoring_only |
| 09-11 12:45 | NY Fed Nowcast | E_NOWCAST：monitoring_only |
| 09-15 08:30 | Empire State Manufacturing | E_EMPIRE：第三个目标交易日，影响 09-15 候选期限内的事件构成 |
| 09-16 14:00 / 14:30 | FOMC 决议 / 新闻发布会 | 超出三会话窗口；保留作 7D 与到期曲线解释，非 09-11 入场等待条件 |

日历来源：[BLS 9 月日历](https://www.bls.gov/schedule/2026/09_sched.htm)、[纽约联储 9 月日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[美联储 9 月日历](https://www.federalreserve.gov/newsevents/2026-september.htm)。截至知识截止，没有核实独立的盘后新冲击，也没有同步隔夜期货、汇率与油价快照；不把空缺解释成隔夜平稳。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — C1｜存续 signed 负化提供条件性下行优先

**Claim：**方向先验偏下行，但负 Gamma 单独不预测涨跌。

**Evidence：**同一 31 到期集合 signed 从 −30.011 降至 −49.183 B USD/1%；PM 贡献负向变化 89.60%，同源价格下移。

**Mechanism：**若 call-minus-put 的 dealer 符号约定接近实际，负反馈对冲可能放大已启动的价格方向；方向偏好还依赖价格位置。

**T+1 implication：**下方边界越界需与实时负 signed 一致，才进入 Base 候选评估。

**Falsifier：**上方恢复确认、PM 负压明显收窄或全链现场符号逆转。

**Confidence：**medium；依据为当前同口径数据与机制，`mechanism_only / not_tested`，没有校准的涨跌概率或策略回测。

### Thesis 2 — C2｜到期强节点与持久结构必须分开

**Claim：**7590／7595 的 T 日大节点不能直接继承为次日 pin。

**Evidence：**7590 的绝对 signed 约 94.96% 来自已到期 09-10；7595 的 gross 约 86.23% 同样到期。存续 gross 的 59.54% 集中在 09-18，其中 AM 占 90.94%。

**Mechanism：**删除到期层会改变近现价节点规模；远期大 gross 只表示敏感度集中，AM 与 PM 的结算时序又不同。

**T+1 implication：**core 只表示方向释放未确认，不把它作为蝴蝶中心或保证稳定的交易区间。

**Falsifier：**CPI 后新同源节点与净场景盈利区间重新证明持久中心。

**Confidence：**medium；依据为当前同口径数据与机制，`mechanism_only / not_tested`，没有校准的涨跌概率或策略回测。

### Thesis 3 — C3｜上方正节点要求保留恢复分支

**Claim：**单边下行结论过强，恢复分支有必要但门槛较高。

**Evidence：**存续 7675／7680 的 signed 为 +4.900／+12.362 M USD/点；7650 与 7700 仍分别为 −14.259／−4.118 M，剔除目标日到期后 7700 为 −9.501 M。

**Mechanism：**局部正值在约定下可能形成减震区，但 selected map 只覆盖部分到期，且当前确认边界并未自动转正。

**T+1 implication：**Risk 需要价格接受、局部与新 0DTE 正值、PM 负压收窄三者一致，不能仅因触及正节点预判上涨。

**Falsifier：**边界收复失败、目标日新 0DTE 持续为负，或局部正节点迁移。

**Confidence：**medium；依据为当前同口径数据与机制，`mechanism_only / not_tested`，没有校准的涨跌概率或策略回测。

### Thesis 4 — C4｜Vanna 抵消是重要反证

**Claim：**高阶 Greeks 的净额不能被简化为一致的未来现金流。

**Evidence：**共同 DEX 398.863→108.602 B；共同 Vanna −2.161→−0.011 B，AM −1.086 与 PM +1.075 B 几乎抵消；Charm-next +7.593→+8.482 B。补充观察：T 日 model VEX 为 2.326 B，剔 T 日 0DTE 后可用 Volga 为 13.468 B，按各自原生口径。

**Mechanism：**Vanna 是固定其他输入、IV 变动 1 vol point 下的模型 DEX 差；Charm 是固定输入推进至下一会话的 DEX 差。VEX 表示 Vega 状态，Volga 表示 IV 改变时模型 Vega 暴露的有限差分，两者会随 spot、时间和到期构成变化；vendor Vega 与模型 Vega 的归一尚未证明一致，均不作真实订单或主要方向证据。

**T+1 implication：**把它们用于重估与符号分层，价格/live signed 保持决策优先级；VEX 和 Volga 不因同为金额字段就可相加。

**Falsifier：**事件后分层符号、spot/IV 或时间状态变化，原敏感度解释不再适用。

**Confidence：**medium；依据为当前同口径数据与机制，`mechanism_only / not_tested`，没有校准的涨跌概率或策略回测。

### Thesis 5 — C5｜IV 水平上移与 roll 共同存在

**Claim：**相对定价变得更偏向下翼，并未证明方向或结构的交易优势。

**Evidence：**09-11 同到期 ATM +3.380 vp，而 fixed 3D 仅 +0.135 vp；7D 更换到期来源，约 30D 微笑仍是 10-09、tau 从 30 缩为 29 天。

**Mechanism：**同到期比较混合 aging 与 repricing；固定 tenor 控制期限但可能改变权重与事件构成；partial 也没有可用于显著性检验的置信区间。

**T+1 implication：**CPI 后重新选期限、翼宽并用目标／不利／失效／退出清算值比较候选，不沿用 EOD 排名。

**Falsifier：**实际路径、IV crush、费用或 bid/ask 使候选的净场景支持消失。

**Confidence：**medium；依据为当前同口径数据与机制，`mechanism_only / not_tested`，没有校准的涨跌概率或策略回测。

## 7. Conflicting Evidence, Confidence and What Changes the View

主证据是共同到期的 signed、PM 分层和价格位置；负化在剔除目标日 0DTE 后仍在，因此并非只有当日到期造成。反证也实质存在：近现价强节点多数消失、AM gross 高度集中、上方有局部正节点、Vanna 大幅抵消，而且 CPI 将重置市场状态。

处理这些冲突后，维持 **medium-confidence downside_bias**。它表示优先观察下行确认，不能外推为必跌、dealer 必卖或当前即可买 put。若上方价格与实时结构共同修复，应切换到独立恢复分支；若只有价格越界而节点、估值或风险条件不符，则保持未激活。即使 Base 路径最终发生，也可能没有任何合格 XSP 价格。

三类状态各自变化：**Structural View** 随事件后价格／节点改变；**Plan Grade** 只随计划证据、定价研究和流程完整度实质改变；**Execution Status** 取决于真正可用的实时来源、当前预算与当时门禁。缺少未来值本身不会否定已经完成的 EOD 研究。

## 8. IV Term Structure, Skew and Surface 

### ATM IV Term Structure

以下 IV 为百分数，变化单位 vp=volatility point。shape、spreads、slope、wing premium 和 BF25 均为 **report-layer calculation from packet nodes**。ATM 原生方法为 `linear_total_variance_in_k_at_zero`：在 k=0 局部对总方差插值；下表 exact 节点均为 local_fitted / observation_bracketed，c 为 packet 内部支持评分，不是涨跌概率。

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T−1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09-11 | τ 2→1 天 | 19.217% | +3.380 vp；same_expiry_atm | CPI；目标日 0DTE / PM | 局部 k=0；c=0.991；partial；含 aging+repricing |
| 09-14 | τ 5→4 天 | 12.974% | +1.320 vp；same_expiry_atm | 默认候选；目标 3DTE / PM | 局部 k=0；c=0.992；partial；含 aging+repricing |
| 09-15 | τ 6→5 天 | 13.376% | +1.537 vp；same_expiry_atm | 备选；Empire / PM | 局部 k=0；c=0.992；partial；含 aging+repricing |
| 09-16 | τ 7→6 天 | 14.743% | +1.684 vp；same_expiry_atm | FOMC 决议当日 / PM | 局部 k=0；c=0.993；partial；含 aging+repricing |
| 09-17 | τ 8→7 天 | 15.158% | +1.798 vp；same_expiry_atm | 7D 新来源；FOMC 后 / PM | 局部 k=0；c=0.995；partial；含 aging+repricing |
| 09-18 | τ 9→8 天 | 15.543% | +1.810 vp；same_expiry_atm | dominant 日期的 PM 部分 | 局部 k=0；c=0.994；partial；含 aging+repricing |
| 09-23 | τ 14→13 天 | 14.170% | +1.463 vp；same_expiry_atm | 14D 旧来源 / PM | 局部 k=0；c=0.994；partial；含 aging+repricing |
| 09-24 | τ 15→14 天 | 14.250% | +1.401 vp；same_expiry_atm | 14D 新来源 / PM | 局部 k=0；c=0.992；partial；含 aging+repricing |
| 10-09 | τ 30→29 天 | 14.163% | +1.028 vp；same_expiry_atm | 30D 旧源；当前 ~30D 微笑 | 局部 k=0；c=0.994；partial；含 aging+repricing |
| 10-12 | τ 33→32 天 | 13.875% | +0.984 vp；same_expiry_atm | 30D 新上界 / PM | 局部 k=0；c=0.994；partial；含 aging+repricing |
| 10-23 | τ 44→43 天 | 14.230% | +0.844 vp；same_expiry_atm | 45D 下界 / PM | 局部 k=0；c=0.995；partial；含 aging+repricing |
| 10-30 | τ 51→50 天 | 14.496% | +0.781 vp；same_expiry_atm | 45D 上界 / PM | 局部 k=0；c=0.996；partial；含 aging+repricing |
| Fixed 3D | 3 天恒定 | 13.807% | +0.135 vp；fixed_tenor_atm | SPXW / PM | T−1：09-11(τ2)/09-14(τ5)，w=0.333333 → T：09-11(τ1)/09-14(τ4)，w=0.666667；interpolated；c=0.991；partial |
| Fixed 7D | 7 天恒定 | 15.158% | +2.099 vp；fixed_tenor_atm | SPXW / PM | T−1：09-16 单节点 τ7 → T：09-17 单节点 τ7；observed；c=0.995；partial |
| Fixed 14D | 14 天恒定 | 14.250% | +1.543 vp；fixed_tenor_atm | SPXW / PM | T−1：09-23 单节点 τ14 → T：09-24 单节点 τ14；observed；c=0.992；partial |
| Fixed 30D | 30 天恒定 | 14.061% | +0.926 vp；fixed_tenor_atm | SPXW / PM | T−1：10-09 单节点 τ30 → T：10-09(τ29)/10-12(τ32)，w=0.333333；interpolated；c=0.994；partial |
| Fixed 45D | 45 天恒定 | 14.315% | +0.875 vp；fixed_tenor_atm | SPXW / PM | T−1：10-23(τ44)/10-30(τ51)，w=0.142857 → T：10-23(τ43)/10-30(τ50)，w=0.285714；interpolated；c=0.995；partial |

曲线为 **mixed**：CPI 的 1D 节点明显抬高，09-14 ATM 回到 12.974%，随后向 FOMC／FOMC 后附近抬升。3D−30D 为 **−0.254 vp**、7D−30D **+1.097 vp**、14D−30D **+0.189 vp**；无法用单一“正斜率／倒挂”概括。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：09-17 / ~7D（τ7） | 21.785% | 17.986% | 15.158% | 13.114% | 11.937% | 4.871 vp | 0.392 vp | local_fitted；observation_bracketed；partial；固定 forward delta 插值 |
| Δ：09-16(τ7)→09-17(τ7) | +3.424 vp | +2.668 vp | +2.099 vp | +1.579 vp | +1.261 vp | +1.089 vp | +0.025 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；换槽位／到期构成+repricing；materiality indeterminate_within_uncertainty |
| T：09-24 / ~14D（τ14） | 21.382% | 17.305% | 14.250% | 12.127% | 11.019% | 5.178 vp | 0.466 vp | local_fitted；observation_bracketed；partial；固定 forward delta 插值 |
| Δ：09-23(τ14)→09-24(τ14) | +2.921 vp | +2.126 vp | +1.543 vp | +1.048 vp | +0.761 vp | +1.078 vp | +0.044 vp | rolling_tenor_slot_fixed_delta；degraded_local_evidence；换槽位／到期构成+repricing；materiality indeterminate_within_uncertainty |
| T：10-09 / ~30D（τ29） | 22.378% | 17.504% | 14.163% | 12.070% | 11.122% | 5.434 vp | 0.624 vp | local_fitted；observation_bracketed；partial；固定 forward delta 插值 |
| Δ：10-09(τ30)→10-09(τ29) | +2.031 vp | +1.502 vp | +1.028 vp | +0.672 vp | +0.428 vp | +0.830 vp | +0.059 vp | same_expiry_fixed_delta；degraded_local_evidence；同到期 aging+repricing；materiality indeterminate_within_uncertainty |

节点 delta convention 为 `forward_delta_non_premium_adjusted`，插值为 `linear_in_forward_delta_within_observed_support`，只在原始观测支持范围内使用。当前 15 个 selected 节点均可用。约 7D 与 14D 由 09-16／09-23 分别滚到 09-17／09-24；约 30D 仍是 **10-09，τ30→29**，因此第三组必须标为 **same_expiry_fixed_delta**，不能统称三组都滚动，也不能称为原生 fixed-tenor smile。

按 level → slope → curvature 的顺序：三组 ATM 算术上均上移；25Δ downside slope 分别增加 **1.089／1.078／0.830 vp**，为算术 steepened；BF25 分别增加 **0.025／0.044／0.059 vp**，为算术 increased。由于没有量化误差带及完全受控的期限比较，变化的经济显著性仍为 **indeterminate_within_uncertainty**，不把微小 BF 移动升级为稳定曲率信号。

当前 skew term gradient 为 **4.871 vp → 5.178 vp → 5.434 vp**。25Δ put 相对 ATM 的 premium 为 **2.828／3.055／3.341 vp**，25Δ call 相对 ATM 为 **−2.043／−2.123／−2.093 vp**；对应 put premium 日变 +0.569／+0.583／+0.475 vp，call premium 日变 −0.520／−0.495／−0.356 vp。它描述下翼相对更贵、右翼相对更低的状态；`downside_skew_25d=IV_put25−IV_call25` 是 fixed-delta slope proxy，不是统计 skewness。`BF25=(IV_put25+IV_call25)/2−ATM` 也只是局部曲率代理。

对策略的传导保持条件性：directional spread 卖出一侧翼端可能减少净权利金，但必须核实该候选的实际翼端和清算价值；fly／iron fly／condor 仍需新的稳定或区间论证，不能因下翼昂贵就卖尾部。Tail hedge 需比较损失覆盖与保费；calendar／diagonal 需独立的期限场景和退出估值，当前均未建立优势。正式 packet 没有 **09-11、09-14、09-15** 的 selected smile，也没有给 dominant 09-18 单独微笑，禁止拿其他期限补曲线。CPI 后应刷新 spot/forward、期限、ATM、25Δ、实际翼端、Greeks、报价和退出估值；EOD 相对定价状态不构成方向信号或目标日执行许可。

## 9. Key Expiry / Strike / Dealer Node

先闭合到期层级：T 全链 gross / signed 为 **411.756 / −83.978 B USD/1%**；09-10 到期贡献 **43.418 / −34.795 B**，删除后为 **368.337 / −49.183 B**。再删除目标日 09-11，到期仍为正 DTE 的暴露为 **343.735 / −33.944 B**。四个量不能混用。

| 到期 | DTE T→T+1 | gross / signed（B USD/1%） | Family / settlement / durability |
| --- | --- | --- | --- |
| 09-11 | 1→0 | 24.602 / -15.239 | 目标日新 0DTE / PM；transient，重建 |
| 09-14 | 4→3 | 8.327 / -4.211 | SPXW_PM；目标日正期限，日内候选池 |
| 09-15 | 5→4 | 8.128 / -4.191 | SPXW_PM；目标日正期限，日内候选池 |
| 09-18 | 8→7 | 219.307 / -5.038 | SPX_AM + SPXW_PM；分别结算，durable 正期限 |
| 10-16 | 36→35 | 44.400 / -3.627 | SPX_AM + SPXW_PM；分别结算，durable 正期限 |

09-18 gross **219.307 B** 占 T 全链的 **53.26%**、剔 T 0DTE 后的 **59.54%**。其中 AM gross / signed 为 **199.434 / −0.716 B**，PM 为 **19.873 / −4.323 B**；大 AM gross 不是 PM pin。09-18 的 DTE 8→7 仅是日历标签，AM 与 PM 的实际最后交易时刻和结算观察不同，不能把上午合约当作周五收盘合约。

本期 selected strike map 来自 09-10、09-11、09-18、10-16；剔 T 0DTE 后选定子集覆盖全链存续 gross 的 **78.27%**，还有 **−25.279 B USD/1% signed** 在未选期限中。再剔目标日 0DTE，selected 09-18＋10-16 覆盖正期限 gross 的 **76.72%**。前日 selected 为 09-09、09-10、09-18、10-16，因此只有后两个到期可直接做同子集日变，不能把两日 selected 总表的差全部归于建仓。

原始 gamma table 的 `gex_total / gex_dealer` 实际为 1% move scale，已用同源 S=7591.82 换算：**gex_point = gex_1pct / (0.01×S) = gex_1pct / 75.9182**，signed 列同法；gross 为 call＋put 的敏感度规模，signed 使用包内 dealer 约定。下面数值为 **M USD / SPX 点**（M=100万），不是上一张表的 1% 尺度。表中“存续 / 去目标”分别表示 selected 的 09-11＋09-18＋10-16，以及仅 09-18＋10-16；零与缺失严格分开。

| SPX / XSP | Role | Evidence：存续 gross；signed 存续 / 去目标 | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 7450 / 745 | 下一下行复核 | gross 119.872；signed -13.590 / -11.020 | 正期限底层＋目标0DTE战术层；selected | 重估价值与路径；非自动止盈 |
| 7500 / 750 | 下行第一复核 | gross 255.172；signed -80.077 / -49.742 | 正期限底层＋目标0DTE战术层；selected | 重估价值与路径；非自动止盈 |
| 7550 / 755 | 下方确认 / 失效边界 | gross 182.450；signed -58.149 / -39.002 | 正期限底层＋目标0DTE战术层；selected | 须满足第 10 节对应确认 |
| 7575 / 757.5 | 下方预警 | gross 57.570；signed -14.397 / -7.714 | 正期限底层＋目标0DTE战术层；selected | 观察节点稳定性与边界位置 |
| 7580 / 758 | core 下缘 | gross 33.973；signed -11.635 / -1.734 | 正期限底层＋目标0DTE战术层；selected | 观察节点稳定性与边界位置 |
| 7590 / 759 | 到期节点参考 | gross 45.442；signed -9.364 / -3.358 | 正期限底层＋目标0DTE战术层；selected | T 大部分到期；不继承 pin |
| 7595 / 759.5 | 到期 gross 参考 | gross 27.489；signed -5.030 / -2.651 | 正期限底层＋目标0DTE战术层；selected | T 大部分到期；不继承 pin |
| 7600 / 760 | core 上缘 / 上方预警 | gross 253.962；signed -32.646 / -19.501 | 正期限底层＋目标0DTE战术层；selected | 观察节点稳定性与边界位置 |
| 7625 / 762.5 | 上方过渡 | gross 42.643；signed -15.454 / -7.360 | 正期限底层＋目标0DTE战术层；selected | 观察节点稳定性与边界位置 |
| 7650 / 765 | 上方确认 / 失效边界 | gross 133.459；signed -14.259 / -7.515 | 正期限底层＋目标0DTE战术层；selected | 须满足第 10 节对应确认 |
| 7675 / 767.5 | 恢复正节点 | gross 42.469；signed 4.900 / 2.580 | 正期限底层＋目标0DTE战术层；selected | 观察节点稳定性与边界位置 |
| 7680 / 768 | 恢复正节点 | gross 42.428；signed 12.362 / 10.440 | 正期限底层＋目标0DTE战术层；selected | 观察节点稳定性与边界位置 |
| 7700 / 770 | 上行第一复核 | gross 218.314；signed -4.118 / -9.501 | 正期限底层＋目标0DTE战术层；selected | 重估价值与路径；非自动止盈 |
| 7750 / 775 | 下一上行复核 | gross 86.379；signed 17.681 / 12.944 | 正期限底层＋目标0DTE战术层；selected | 重估价值与路径；非自动止盈 |
| 7800 / 780 | 远端上方参考 | gross 59.711；signed 42.481 / 42.169 | 正期限底层＋目标0DTE战术层；selected | 观察节点稳定性与边界位置 |

core 为 **7580–7600**，corridor 为 **7550–7650**。7590 的 T selected signed −185.898 M/点中有 −176.534 M 已到期，存续只有 −9.364 M；7595 亦主要由到期 gross 构成。7650、7700 当前并非已经验证的正墙，不能省略 Risk 分支的实时符号条件。

## 10. T+1 Decision Map, Structural View and Plan Grade

**Primary regime：**negative_modeled_signed_gamma_with_expiry_concentration。**Directional prior：**downside_bias，path asymmetry 为方向性、medium confidence，经验状态 not_tested。Base 是下方确认后的延续；Risk 是上方价格与节点同时恢复。两者均为 **candidate template**，计划 **B / Conditional Next-Day Plan**，执行 **requires_external_live_source**，Quote Portability=**none**。**Why B：**数据和结构路径可追溯，边界、失效与封顶风险可以定义。**Why not higher：**候选 09-14／09-15 的正式微笑、目标时点场景比较尚无足够证据；实时节点计算、估值能力、数值容忍度与真实成本也未核实，这些是具体的计划依赖。**Why not lower：**核心 formal 无 hard failure，仍能定义两类封顶风险候选和重筛流程；none portability 或未来值尚未出现，本身不导致 C。与前期相同 B；无小额权利金差驱动的等级变化。

### 可观察条件与计数起点

所有 bar 使用 ET 的完整 5 分钟区间，不使用未结束 bar。**t0** 是 CPI 实际发布并重置、取得合格新 snapshot、冻结关键位和容忍度以后，第一个可完整观察的 RTH bar 起点，且不早于 09:30。重置发生在 bar 中途，必须等下一完整区间；尚未取得数据时 t0 顺延。下表规定观察规则，不表示条件现已满足。

| Condition IDs | 实际观察来源 | 规则 / 窗口 / 阈值 | 适用与状态 |
| --- | --- | --- | --- |
| O_CPI / O_CAL | 官方发布与当日 desk calendar | CPI 实际发布并完成同步重置；日历覆盖预计退出时刻。Michigan、Z.1、Nowcast 仅监测，重大内容则重置 | 两分支；未来发布状态 pending |
| O_CONFIG / O_NODE | 同口径全链/PM/新0DTE节点工具；external_required | 映射、carry-parity 残差和节点位移容忍度必须在 t0 前以明确单位冻结；数值未提供，不能以零或任意值替代。节点快照≤300秒，迁移超容忍度重置 | 两分支；缺计算能力时不能用价格替代 |
| O_DOWN / O_GAP_DOWN | 合格 SPX index 实时源 | t0 后连续两根完成 5m 收盘严格 <7550。若开盘已 <7550，先有 bar 回测至≥7550，再从其后的完整 bar 重新计数；未回测不追 | Base；第一复核7500，之后7450 |
| O_SIGN_DOWN | 同口径节点工具；external_required | 两次确认收盘对应快照：剔目标0DTE的正期限全链 signed<0、SPXW_PM signed<0、存续局部7550 signed<0；新0DTE独立列示 | Base；与 O_DOWN 必须同时成立 |
| O_UP / O_GAP_UP | 合格 SPX index 实时源 | t0 后连续两根完成 5m 收盘严格 >7650。若开盘已 >7650，先有 bar 回测至≤7650，再重新计数 | Risk；第一复核7700，之后7750 |
| O_SIGN_UP | 同口径节点工具；external_required | 两次确认快照：局部7650–7700合计 signed>0、新0DTE signed>0，且PM负压相对冻结的重置快照收窄或非负 | Risk；当前 EOD 正节点不能替代 |
| O_RECLAIM / O_REJECT | 完整 SPX bars；仅为失效监测 | Base：一根收盘≥7550，随后完整bar不再跌破7550。Risk：一根收盘≤7650，随后完整bar不再升破7650。硬风险边界可要求更早退出 | 管理条件；不是入场必须发生的条件 |
| O_VOL | VIX与实际候选到期ATM IV实时源 | 15分钟内VIX上升≥1.0点，或同到期ATM IV上升≥2.0vp，即停止旧计数、重置和重估 | 两分支；不把单日变化当15m信号 |
| O_QUOTES / O_MAPPING / O_SURFACE | broker全腿报价、相同期限forward/discount与IV工具 | 最新可用源≤30秒；有效bid/ask、可比时间戳、同到期翼端/Greeks；净组合宽度/mid≤25%。近零mid改用绝对tick和费用审查；mapping/parity按冻结参数 | 两分支；详细核价公式见第11节 |
| O_VALUE / O_BROKER / O_RISK | 场景清算估值平台、broker原子组合接口、实际风险账本 | 必须有目标/不利/失效/退出估值、保守成交成本、全部legs与比率、真实剩余预算和可执行退出方式 | 两分支；当前能力均 external_required |
| O_TIME | Cboe实际会话/合约规则及broker限制 | 窗口满足下表；不留隔夜或周末 | 两分支；更早限制优先 |
| O_RANGE | 价格＋节点＋净场景盈利区间 | 重置后至少3根完成core收盘，无方向确认越界，节点稳定；spot/forward/中心不确定区间须包含在live扣成本盈利区间内并有正buffer | 仅开启新的range研究；本期未选range卡 |

冻结的 300 秒 map age、至少 30 分钟可用持有窗、3／5 点翼宽和单组成本敏感区间属于本报告研究流程假设，并非经验校准的 alpha 参数。映射 ε_map、carry-parity ε_parity、节点 ε_node 的数值仍为 null；需由可验证的实时方法／broker 规则在 t0 前明确，未知值不能通过“人工确认”四字自动放行。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| core内，7580–7600 | O_CPI/O_NODE/O_VOL | 方向释放未触发；不等于否定所有payoff | 观察；当前两张方向卡不激活 | pending |
| corridor内、core外 | O_DOWN或O_UP及各自signed | 接近边界尚非接受 | 观察边界，不抢先选固定腿 | 节点迁移则重建 |
| gap穿过边界 | O_GAP_DOWN或O_GAP_UP | 开盘已跳过旧入场状态 | 回测后重新计数 | 无回测或已过首目标则不追 |
| CPI后已重置 | O_CPI/O_CONFIG | 旧EOD价格状态失效 | 刷新universe/map/IV/value再计数 | reset未完成则pending |
| post-event range reconfirmed | O_RANGE | 可削弱方向先验，但不自动证明卖波动价值 | 重新研究range及盈利区间 | 当前两张卡不替代range研究 |
| range thesis failure / boundary release | O_DOWN/O_UP + matching signed | 旧区间论证失效，方向路径才可能成立 | 只评估对应方向候选 | reclaim/rejection |
| 7550下确认 | O_DOWN/O_SIGN_DOWN/O_GAP_DOWN＋共同门禁 | Base下行延续 | put debit vertical条件模板 | O_RECLAIM或结构/估值失效 |
| 7650上确认 | O_UP/O_SIGN_UP/O_GAP_UP＋共同门禁 | Risk上方恢复 | call debit vertical条件模板 | O_REJECT或恢复证据消失 |
| vol shock / material news | O_VOL/O_CPI | 旧计数和估值失效 | 处理已有风险；暂停新入场、重置 | 重新满足完整条件前不恢复 |
| node migration | O_NODE/O_CONFIG | 原价格参照移动 | 清零计数、重画节点并重选腿 | 无实时工具则无法确认 |
| 各项当时均通过 | 实际门禁值、预算与broker能力 | 仅取得人工评估资格 | 按live net-limit规则评估 | 本报告当前不具该状态 |
| 必要实时门禁失败 | O_QUOTES/O_MAPPING/O_VALUE/O_RISK/O_TIME等 | 当时不可执行；不必等于EOD方向错误 | No Trade；已有仓位按风险规则处理 | 未来pending与实际failure分开 |

| 分支 | 最早评估（条件下界） | 最晚新入场（条件上界） | 持有 / 退出 |
| --- | --- | --- | --- |
| Base F_PUT | 09-11 09:40 ET；实际 t0+10m | 09-11 15:00 ET，或更早事件/broker限制 | 至少30分钟可用；min(入场+60m,15:30,更早合约/broker截止) |
| Risk F_CALL | 相同；必须满足其自身signed恢复条件 | 相同 | 相同；不得因恢复迟到延长持有 |

09-11 是正常交易日。非到期 XSP RTH 到 16:15 ET；默认 09-14 合约的到期日最后交易到 09-14 16:00 ET，但本计划的适用退出日是 **09-11**，主动上限 **15:30 ET**，早于会话结束且保留不少于 30 分钟余量。若实际 broker、合约或事件要求更早，取更早者；若 t0 顺延到不能留足持有窗，取消该分支。[Cboe 交易时间](https://www.cboe.com/about/hours/us-options/)、[XSP 合约规格](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

下表将 structural fit、价格证据与执行可行性分开。所有保留 family 的 **pricing_assessment=pending_live_repricing、edge_evidence_status=not_established、execution_feasibility=external_required**；B 不能替代任何一项。

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base | directional_continuation / put debit vertical | 7550下确认路径 | 候选期未输出正式smile；IV dependency=background_only，gate=not_applicable | 封顶风险可定义；live场景及定价pending | conditional | 刷新09-14/09-15翼端；通过目标净值、成本和风险比较 |
| Risk | directional_continuation / call debit vertical | 7650上恢复路径 | 同上；不能只看上方正节点 | 同上；edge未建立 | conditional | 价格和实时恢复一致才评估 |
| Base | directional_continuation / directional BWB | 可表达有限风险下行 | 需要候选曲率/非对称翼估值；IV gate=fail | 未取得合格场景排名 | not_screenable | 先补同到期全部legs/曲率与退出价值 |
| Event reset | centered_stability / debit fly、defined-risk iron fly | 未确认持久中心 | IV dependency=required；gate=fail | 中心与净盈利区间未验证 | reject | 不是因小幅中心误差拒绝；先建立新稳定性thesis |
| Event reset | broad_bounded_range / defined-risk iron condor | corridor不是概率区间 | IV dependency=required；gate=fail | 区间与保费支持不足 | reject | 重新验证边界、尾损、净场景盈利区间 |
| Event reset | two_sided_expansion / long straddle、strangle | 双向事件路径可想象 | IV dependency=required；gate=fail | 缺最小移动幅度与IV-crush/成本比较 | not_screenable | 不能因事件大就认定买波动有利 |
| Event reset | term_or_vol_relative_value / calendar、diagonal | 未选为本期日内方向表达 | 需独立期限模型；本次gate=not_applicable | 退出估值/持有thesis不足 | not_applicable | 需另立期限研究；本期不添加第三张卡 |

### Local Candidate Comparison

每个 family 在本期 EOD 数据覆盖内形成 **3 个相邻 long anchor × 2 个翼宽 × 2 个到期=12** 个诊断候选，两类共 24 个。没有选出 EOD winner；现场按实际 spot/forward 和边界选择最近合法 long strike 与相邻上下一个挂牌 strike，再比较 W=3／5，09-14 与 09-15。先剔除已跳过首个复核节点／short strike、无效报价、风险或估值不支持者，再比较目标净场景支持、逆向敏感度、流动性及成本；没有概率来源，不给期望收益排名。

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Base：live下方anchor±1挂牌strike；W3/5；09-14/09-15 | not_applicable于中心包含；须检验自身目标与退出路径 | exact候选翼端待刷新 | Base/Adverse/Invalidation/exit均pending | 逐腿净合计、状态依赖 | 真实费用与同步净报价待核 | none | deferred_to_t1；12个诊断候选，无winner |
| Risk：live上方anchor±1挂牌strike；W3/5；同期限池 | 同上 | 同上 | 同上；恢复未确认不比较入场 | 同上 | 同上 | none | deferred_to_t1；12个诊断候选，无winner |
| 非对称版本：directional BWB | 独立family，不能伪装为vertical等价变体 | 缺同到期曲率/全腿场景 | 无法可靠排序 | 需完整比例与Greeks | 缺完整候选成本 | none | not_screenable；保留原因，不补假排名 |

### Base Candidate Template — Base Case

**F_PUT｜CPI 后下方延续｜directional_continuation｜put debit vertical｜conditional。** 适合下方价格接受与负 signed 同向的情景，激活引用 **O_DOWN/O_GAP_DOWN/O_SIGN_DOWN** 及共同门禁；失效引用 **O_RECLAIM**。筛选前触发不完整、目标被跳过或必要门禁不满足，取消评估；详细 abort 统一见第 12 节。

默认期限 **09-14（T 4DTE→目标 3DTE）**，09-15（5→4）仅为通过重新估值的备选；09-11 目标 0DTE 不作默认。以 live 7550 边界／实际入场状态的 XSP 映射选择合法 long put，卖出低 3 或 5 点的 put，全部 **1:1**；重置、位移或跳空后重新选 expiry、long/short 和宽度，live selected legs=pending。周五日内最多 60 分钟，服从第 10 节退出窗。

Quote Portability=none，representation=candidate_template，fixed-legs authority=candidate_template_only。首复核 **7500**，只有现场路径与清算值仍支持才继续观察 7450；这些节点不是收益保证。到期上下界、breakeven、盈利区和尾损按上方 put 公式；N、live debit cap 均 pending，必须满足 actual R_eff 与场景边界。

期限／skew 处理：候选的正式 09-14／09-15 smile 不可用，CPI 后刷新实际同期限 ATM、25Δ 与 long/short IV，再比较周末时间价值及 09-15 额外事件。净 Delta 预期为负，其余 Greeks 可随 spot/IV 变化；不能把少付 premium 直接称为更高胜率。卖出下方 put 可减少相对 outright 的权利金和部分 Vega，代价是收益封顶；若移动慢、IV crush、买卖价差过宽或反弹，方向正确也可能亏损。使用统一 atomic net-limit、费用和场景协议。

**illustrative_eod_example／diagnostics（唯一示例行；非预选订单）：**09-14，buy 1×755P（XSP260914P00755000；映射SPX7550，gap0）；sell 1×750P（XSP260914P00750000；映射SPX7500，gap0）；无body，W=5，N=1 unit_payoff_example，M=100；同上EOD underlying时点；synthetic bid/mid/ask=0.910/0.950/0.990点。按ask压力示意，C₁=6→16美元时，到期ML=105→115美元、MP=395→385美元、BE=753.95→753.85 XSP；原始逐腿相减净Δ/Γ/Vega/Θ=-0.1281/+0.0104/+0.0638/-0.0540（供应商Greek单位，非现金流），binding=false；到期前场景值pending，不能用这些数值排名或形成live限价。

### Risk-Path Contingency

**F_CALL｜CPI 后上方恢复｜directional_continuation｜call debit vertical｜conditional。** 只在风险路径激活后评估，不是基准持仓。引用 **O_UP/O_GAP_UP/O_SIGN_UP** 及共同门禁，失效 **O_REJECT**；已有 Base 仓位时不能叠加第二 setup。

同样优先 **09-14（4→3DTE）**、备选 09-15（5→4）；围绕 live 7650 边界／实际入场状态选择 long call，卖出高 3 或 5 点的 call，全部 **1:1**。不预先锁死 EOD legs，遇重置／节点位移必须重新选腿，live selected legs=pending。首复核 **7700**、之后才考虑 7750；若首次可评估时已越过首目标或 short strike，不能追入旧模板。

Portability=none、candidate_template、candidate_template_only；风险预算、call 的到期盈利区／尾损、三层 debit 边界和 atomic net-limit 沿用共同协议，live maximum debit 与 N 仍 pending。持有窗与 Base 相同，周五退出。候选实际期限的 term/skew、Vega/Theta 与场景价值均在 CPI 后重估；净 Delta 预期为正，其余敏感度随状态改变。卖出上翼减少相对 outright 的初始支出并封顶收益，仍可能因恢复失败、IV crush、Theta 或价差失去收益支持。

**illustrative_eod_example／diagnostics（唯一示例行；非预选订单）：**09-14，buy 1×765C（XSP260914C00765000；映射SPX7650，gap0）；sell 1×770C（XSP260914C00770000；映射SPX7700，gap0）；无body，W=5，N=1 unit_payoff_example，M=100；同上EOD underlying时点；synthetic bid/mid/ask=1.220/1.255/1.290点。按ask压力示意，C₁=6→16美元时，到期ML=135→145美元、MP=365→355美元、BE=766.35→766.45 XSP；原始逐腿相减净Δ/Γ/Vega/Θ=+0.1703/+0.0121/+0.1131/-0.2136（供应商Greek单位，非现金流），binding=false；到期前场景值pending，不能用这些数值排名或形成live限价。

### 两张卡的持有时点场景估值

| Candidate / scenario | Spot / path assumption（XSP） | IV / wing sensitivity | Elapsed / exit | Liquidation / net P&L |
| --- | --- | --- | --- | --- |
| F_PUT / Base | 750，第一复核；不是预测必达 | ATM 0 / −2vp；实际同期限翼变化 | 入场后30分钟情景 | pending / pending |
| F_PUT / Adverse | 回到755附近并加入反向移动网格 | ATM±2vp及不利skew移动 | 15–30分钟 | pending / pending |
| F_PUT / Invalidation | 755边界的实际reclaim状态 | 失效时实际surface | 实际失效时刻 | pending / pending |
| F_PUT / Planned exit | 实际退出spot，另设停滞/反向网格 | 当时surface或已记录场景网格 | min(入场+60m,适用截止) | pending / pending |
| F_CALL / Base | 770，第一复核 | ATM 0 / −2vp；实际同期限翼变化 | 入场后30分钟情景 | pending / pending |
| F_CALL / Adverse | 回到765附近并加入反向移动网格 | ATM±2vp及不利skew移动 | 15–30分钟 | pending / pending |
| F_CALL / Invalidation | 765边界的实际rejection状态 | 失效时实际surface | 实际失效时刻 | pending / pending |
| F_CALL / Planned exit | 实际退出spot，另设停滞/反向网格 | 当时surface或已记录场景网格 | min(入场+60m,适用截止) | pending / pending |

这些点只是必要压力情景，不构成完整尾部覆盖或期望收益。两张卡 pricing_assessment=pending_live_repricing、edge_evidence_status=not_established；实时节点计算器、候选场景估值平台、broker 原子订单接口和真实风险账本尚未验证，故 execution_feasibility=external_required。额外安全余量与实际收费应随候选一并记录。

EOD reference 仅用于盘后可行性诊断，不是 T+1 expected entry 或 binding limit。目标日先按实时 spot/forward、expiry、ATM、25Δ、相关翼端和局部候选比较重新选腿，再评估实时净限价；公开 native complex quote 缺失本身不自动否决，但当前未验证的原子执行能力不能被假定存在。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

条件为第 10 节下方确认与共同门禁全部满足，linked plan 为 **F_PUT**。路径依次到 7500、7450 复核，路径置信度为机制性、未经验验证；O_RECLAIM 或现场 signed／估值反转使其失效。

### Risk Case

条件为第 10 节上方确认及独立恢复证据，linked contingency 为 **F_CALL**。依次在 7700、7750 重估，不能把当前上方局部正节点视为已激活；O_REJECT 或恢复一致性消失使其失效。两分支相互排斥。

### No-Trade Case

**EOD no-qualified-plan 条件：**核心 formal 身份／日期／完整性硬失败；没有可定义的路径、触发或失效边界；或无法定义任何封顶风险 family 和可操作的目标日重筛流程。本期未出现这些情形。未来实时值未产生、none portability、固定腿不能迁移或缺公开 native NBBO，均不单独构成本期 C。

**目标日完整 abort 条件：**

- 对应触发未完成，gap 无必要回测，或首次可评估时已跨过第一复核目标／short strike；不能追入已走完的结构。
- CPI 或重大信息尚未 reset，出现规定的 vol shock、节点迁移或中心参照变化，旧计数、选腿和估值失效。
- 必需 live source、节点／场景计算、numeric tolerances 或 broker 原子组合／退出能力仍未核实；价格信号不能替代节点确认。
- 任一腿、比率、timestamp、bid/ask、净宽度、mapping、carry-parity 或同期限 surface 不符合门禁。
- 目标／不利／失效／退出场景无法取得合格清算值；目标净支持不能覆盖 debit、真实成本与安全余量，或任一风险／价格上限不满足。
- 真实可用风险预算不足，已存在一项 active setup，超过一次 re-entry，或累计两次 thesis failure；当日损失预算用尽即停止。
- 无足够持有／退出时间，触及更早 broker／合约限制，或计划将产生未经授权的隔夜／周末持仓。
- 需要拆腿追价、裸卖、无限风险或用额外持仓“修复”失效观点才能维持候选。

**重新考虑前必须改变的内容：**完成对应 reset，记录合格 live snapshot 和已冻结的参数，重新积累完整 bars，重新选腿并验证场景／成本／预算。若是结构观点本身已失效，应重做路径研究；不能仅调 strike 或扩大亏损预算。已持有仓位按硬风险与更早退出约束处理，等待理论失效 bar 不得延误风险控制。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | 影响的状态 |
| --- | --- | --- |
| CPI实际发布、随后spot/VIX/候选IV及重置时点 | 决定旧状态何时失效、t0能否开始 | 改变触发起点与Execution Status；重大结构反转也改变View |
| 7550/7650价格接受，7500/7700首次复核状态 | 区分方向启动、已走完路径和失效 | 主要改变Structural View与分支激活 |
| 正DTE全链/PM signed、新0DTE、局部节点及AM/PM Vanna | 检验负反馈假设、避免到期错继承或净额误判 | 改变结构置信度；工具缺失限制Execution Status |
| 候选09-14/09-15实际翼端、成本与场景清算值 | 决定是否存在净场景支持；检查IV crush/时间价值 | 改变pricing assessment；实质研究补全才可能改变Plan Grade |
| 真实预算、重入/失效次数及剩余退出时间 | 决定路径成立后是否仍可评估 | 改变Execution Status；不能反向美化结构观点 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
