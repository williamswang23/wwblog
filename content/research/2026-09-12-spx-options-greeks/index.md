+++
title = "SPX期权持仓与Greeks结构分析-260911"
date = "2026-09-12"
data_as_of = "2026-09-11"
draft = false
description = "分析9月11日盘后Greeks结构修复及周一条件路径和实时确认要求。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "64c451c1e2e4c2735cb0c610f2ca941e8a0b7c1c38691d7c9a5477534d1bcfd1"
+++

# SPX期权持仓与Greeks结构分析-260911

## 1. 结论

2026-09-11 盘后结构从前期下行压力转向**有条件的反弹修复（upside_bias，结构置信度 medium）**：价格回升、共同存续负 signed GEX 明显收窄，但全链仍为负，最近的大节点又主要到期；9 月 14 日周一以 7700 上方确认后的上行延续为 Base，7600 下方确认后的修复失败为 Risk 。

## 2. T+1 Action Summary

| 项目 | 条件行动 |
| --- | --- |
| Base stance | 有条件上行修复；7650–7680 为方向尚未触发的核心，7600–7700 为观察走廊，保留向下失败分支。 |
| Earliest evaluation | 周一 ET 09:40 只是理论下限；实际为周末信息检查、同步基线／必要重置及参数冻结后的 t0+10 分钟。 |
| Base activation | 若 7700 上方完成价格接受且 live 恢复证据一致，则评估 call debit vertical；先在 7750 重估，其后看 7800；7700 rejection 使观点失效。 |
| Downside branch | 若 7600 下方接受且全链／PM／局部 live signed 为负，则评估 put debit vertical；先在 7550 重估，其后看 7500；7600 reclaim 使观点失效。 |
| Upside branch | 与 Base 为同一路径：7700 上确认后评估 call debit vertical，7750 为首个重估点；不重复增加第二个 setup。 |
| Otherwise | 未触发、跳空未回测、重置未完成，或必要实时、估值、风险与时间门禁不满足，则 No Trade，待条件改变再评估。 |

Plan Grade：**B / Conditional Next-Day Plan**；Execution Status：**requires_external_live_source**；本表属于 planning-only 条件计划。

## 3. Executive Summary

- 方向先验调整来自本期价格与共同存续暴露的修复，不能据此推断已发生 dealer 买盘或未来上涨概率。
- 最近 7655 的大敏感度主要属于已到期层；残留 gross 及 9/18 的 AM 集中均不足以证明周一稳定 pin。
- 上方存在正 signed 局部架，但 7700 自身仍弱负；下方负节点和负 PM 暴露保留修复失败风险。
- IV 水平广泛回落，三组 selected smile 都发生 expiry roll；Formal IV 仍为 partial，价格下降没有提高证据权限。
- CPI、密歇根初值已在本期收盘前发布；周一不预设等待 CPI，周末新增信息仍可使既有基线失效。
- Base 保留 call debit vertical，Risk 保留 put debit vertical；先比较 9/15，再有条件比较含 FOMC 的 9/16，均按周一日内退出估值。
- 两个 family 均没有已证实的价格优势；EOD 只提供粗略风险尺度，候选、价格与组数都要由合格实时输入重新确定。

## 4. What Changed vs. T-1 and Prior Playbook Review

本节 T-1 为 9/10。跨日暴露使用两日都存在、且在 T 后仍存续的 **31 个共同到期日**；不直接相减两天各自的 ex-0DTE 总量，以免混入不同的到期集合。

| 比较项 | T-1 | T | 变化 | 口径 |
| --- | --- | --- | --- | --- |
| 同源 SPX 链内标的中位数 | 7591.82 | 7655.50 | +63.68（+0.839%） | 指数点 |
| 共同存续 gross GEX | 343.735 | 410.009 | +66.274 | B USD／SPX 1% |
| 共同存续 signed GEX | −33.944 | −11.834 | +22.110 | B USD／SPX 1% |
| 其中 AM signed | −3.816 | −1.917 | +1.899 | B USD／SPX 1% |
| 其中 PM signed | −30.128 | −9.917 | +20.211 | B USD／SPX 1% |
| 共同存续 DEX | 156.591 | 540.176 | +383.585 | B USD |
| 共同存续 Vanna | 0.053 | −2.027 | −2.080 | B USD／原生有限差分 |
| Charm-next：不同时间跨度 | 5.770 | 33.413 | 跨度 1→3 天，不列等长差额 | B USD／至下一交易会话 |

共同 gross 增加 **19.28%**，PM 解释 signed 修复金额的 **91.41%**。再删除目标日 9/14、只比较周一仍为正 DTE 的 30 个共同到期日，signed 仍由 **−29.734B** 修复到 **−11.023B**：修复并非只来自周一到期层，整体符号仍未转正。

Vanna 当前 AM **−2.459B**、PM **+0.432B**，方向相反且 AM 占优。Charm 的本期跨周末跨度比前期多两天，数值跃升不能解释为同一天对冲需求加速。DEX、Vanna 和 Charm 都是状态或情景敏感度，不能相加成为资金流。

上一份实际可用报告的下行边界为 7550、恢复边界为 7650，上行首个重估点为 7700。本期收盘代理位于 7650 上方、7700 下方，只能核对终点位置；缺少完整 bar、同步 signed 序列及执行日志，无法确认上一计划是否触发、成交或盈利。 

## 5. T 日盘面、字段时点与 Event-Risk Overlay

| 字段 | 本期观察及真实时点 | 用途 |
| --- | --- | --- |
| SPX / XSP | 同源 SPX 7655.50，XSP 765.70；均 9/11 16:00 ET | 结构与映射锚；SPX 为链内中位数，非独立核验的官方结算价。 |
| VIX | 9/11 为 15.84，较 9/10 下降 2.00 点； | Cboe 来源缺少精确日期观察，保留替代来源身份。 |
| 利率 | Treasury 9/11：2Y 4.63%（+7bp）、10Y 4.96%（+1bp）；2s10s 33bp（−6bp） | 股票反弹没有伴随日终收益率下降。 |
| 短端资金 | 1M 3.93%、3M 4.07%（9/11）；EFFR 3.63%、SOFR 3.62%（实际 9/10） | 正常观察滞后单列；不当作同步盘中融资信号。 |
| OI / 成交量 | 全链 OI P/C 1.566（前值 1.587）；量 P/C 1.227（前值 1.153）；成交 4,885,665 张 | Vendor OI 生效／清算时点不明；量为当日累计，均不识别交易发起方向。 |
| 报价 / IV / 生成 | quote、IV valuation 均 9/11 16:00 ET；formal 20:01:36、XSP 快照 20:03:15 ET 生成 | 生成较晚不会延长行情新鲜度；Greeks 独立计算时钟未列。 |

本期两条事件信息用于约束解释。[Reuters 转述 BLS 的检索文本](https://ca.finance.yahoo.com/news/us-consumer-inflation-picks-august-123741290.html)显示，8 月 CPI 环比 **+0.4%**、同比 **+3.4%**，核心 CPI 环比 **+0.3%**；该报道标注 9/11 08:37 ET，[BLS 官方日历](https://www.bls.gov/schedule/2026/09_sched.htm)列示发布时点 08:30。未成功取得该日 BLS 正文及 Reuters 全文，因此数字按 Reuters 转述列示，不增加未经核实的“超预期”或因果判断。

[密歇根大学 9 月初值](https://www.sca.isr.umich.edu/)为信心 **47.8**（前值 51.7），一年通胀预期 **4.6%**（4.0%），长期 **3.4%**（3.3%）。官方日期页面和 10:00 ET 日历支持其早于收盘，实际网页更新时间未独立记录。通胀预期上升与本期 VIX 回落并存，是对反弹先验的约束，不能忽略。

未来三个交易日的安排如下，均为 ET；日历是已知计划，不含未来结果。来源：[纽约联储经济日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[美联储 9 月日历](https://www.federalreserve.gov/newsevents/2026-september.htm)。

| 目标会话 / 时间 | 事件 | 相关性与处理 |
| --- | --- | --- |
| 9/14 周一 13:00 | 商业票据统计 | monitoring_only；目前未见必须推迟所有分支的依据。 |
| 9/14 16:15 | H.10 / H.15 | 在计划退出之后；不延迟开盘评估。 |
| 9/15 周二 08:30 | Empire State 调查 | 不在周一持有窗口内，但会影响 9/15 合约时间价值。 |
| 9/16 周三 08:30 / 10:00 | 零售、进出口价格 / 库存 | 08:30 重大数据为其所在会话的 hard reset；库存仅监测。 |
| 9/16 14:00 / 14:30 | FOMC 决议 / 记者会 | 周三 hard reset；影响 9/16 后备及 7D 期限定价，不要求周一等待到周三。 |

CPI 与密歇根数据均已进入本期收盘信息集合；截至冻结时点，没有另行核实报价之后的重大新冲击，也没有同步隔夜期指、汇率、油价或 SPY 交叉验证。周一开盘前如出现重大周末信息、明显 gap／vol reset，应重新判定 portability，而非假设周末平静。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 修复提高上行观察优先级

**Claim：**当前有条件偏向反弹延续。**Evidence：**第 4 节的同源价格、共同存续及共同正 DTE signed 同向修复，且改善主要来自 PM。**Mechanism：**在 call-minus-put 的库存代理约定下，负向反馈敏感度减弱可能缓和原有压力；价格位置提供方向背景，不能由负 Gamma 单独预测方向。**T+1 implication：**仅在上边界确认后评估 Base call family。**Falsifier：**7600 破位且 live 负暴露延续，或上边界接受失败。**Confidence：**medium，机制解释，未经路径胜率检验（C1）。

### Thesis 2 — 到期大节点不足以支撑稳定中心

**Claim：**最近的旧 pin 应从周一持久地图中删除。**Evidence：**第 9 节 7655 的到期占比、9/18 的 AM 集中及 7650 的分层符号。**Mechanism：**合约消失改变敏感度大小，gross 又不提供实际库存方向；AM 结算与 PM 收盘约束不同。**T+1 implication：**核心区域内先观察，range family 须建立新的稳定中心与盈利区间论证。**Falsifier：**周一同源 live 地图及成本后盈利区间共同证实稳定中心。**Confidence：**medium，删除与分层事实明确，pin 机制仍取决于库存假设（C2）。

### Thesis 3 — 正架支持修复，也可能限制追高

**Claim：**上方局部正 signed 支持保留上行路径，但 7700 并非现成的正 Gamma 墙。**Evidence：**第 9 节的 7675／7680 正架、7700 弱负及下方负节点。**Mechanism：**局部正 Gamma 在既定模型符号下可能抑制延伸；选定到期子集不能证明全链翻正。**T+1 implication：**7750、7800 是逐级重估点，越过首个节点后不追用原模板。**Falsifier：**live 局部符号、PM 变化或节点位置不再配合。**Confidence：**medium，地图覆盖有限，目标不是价格承诺（C3）。

### Thesis 4 — Greek 变化应按情景和时间跨度解释

**Claim：**DEX 回升与负 Vanna 不构成已发生的净买卖流；Charm 跨日增幅不可直接比较。**Evidence：**第 4 节的 AM／PM 分解与 1→3 天 Charm 跨度。**Mechanism：**原生 Vanna 为 IV±0.5 vp 的 DEX 差；Charm 为固定 spot、IV、r、q、OI 后移至下一交易会话的 DEX 差。周末扩大了时间冲击。**T+1 implication：**以价格和 live signed 确认为主，升降波及时间变化都要重估。**Falsifier：**重置后的分层暴露、价格或实际库存不符合假设。**Confidence：**medium；定义可核对，流量与因果解释未验证（C4）。

### Thesis 5 — IV 降低需要同时拆解事件与组成

**Claim：**短端显著回落，但低 IV 不自动产生买方价格优势。**Evidence：**第 8 节的同到期、固定期限和三个滚动微笑对照，以及仍触发降级的质量指标。**Mechanism：**事件发布、剩余期限缩短、源 expiry／权重变化和价格重估同时发生，无法孤立识别 CPI 的贡献。**T+1 implication：**9/15 与 9/16 必须按周一计划退出时点、真实翼端及成本比较。**Falsifier：**即使到达方向目标，清算值仍不足以覆盖 debit 与全成本。**Confidence：**low；仅降级的局部 IV 证据，不形成 calibrated probability 或已确认 edge（C5）。

## 7. Conflicting Evidence, Confidence and What Changes the View

修复证据的主要反面是：全链及 PM signed 仍负、上行确认位自身弱负、下方负节点连续；同时国债收益率与调查通胀预期上升，最近大节点又到期。VIX 和 IV 降低能描述市场价格状态，不能排除下一次事件冲击。

权重上优先采用共同到期集合、AM／PM 分解、同源价格及局部节点，而非风险摘要的 gross 标签或单个 put/call scalar。因此保留 **medium** 的条件上行先验，IV 论证单独为 **low**。替代解释包括：实际 dealer 库存符号与代理不同，暴露修复由价格／IV 重估和 OI 版本变化驱动，周末宏观消息逆转走势。

若 7600 下方接受与负 signed 共振，则切换到 Risk；若 7700 越界失败、节点迁移或波动率冲击，则清除当前确认计数并重建；若价格路径成立但实时估值不支持，则取消交易评估，不必将结构事实一并推翻。没有校准路径概率、样本外绩效或预期收益证据。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

下表全部使用原生 packet 点。exact ATM 采用 `linear_total_variance_in_k_at_zero`，在 k=0 的总方差上作局部插值；fixed tenor 在总方差上插值，均 `no_extrapolation=true`。τ 为各日 valuation 时点到到期的日数；Δ 定义为 **9/11 EOD−9/10 EOD**，vp 为波动率点。表中质量系数 q 是 packet confidence，不能当作路径概率。

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09-14 / 目标会话0DTE | τ 4→3；周一0D | 6.299% | −6.674 vp；same_expiry_atm | PM；目标会话0DTE | local_fitted / observation_bracketed；q=0.990；含老化与重估 |
| 09-15 / 首选 / Empire | τ 5→4；周一1D | 8.446% | −4.930 vp；same_expiry_atm | PM；首选 / Empire | local_fitted / observation_bracketed；q=0.990；含老化与重估 |
| 09-16 / 后备 / FOMC | τ 6→5；周一2D | 10.905% | −3.838 vp；same_expiry_atm | PM；后备 / FOMC | local_fitted / observation_bracketed；q=0.994；含老化与重估 |
| 09-17 / 旧7D源 | τ 7→6；周一3D | 11.576% | −3.582 vp；same_expiry_atm | PM；旧7D源 | local_fitted / observation_bracketed；q=0.992；含老化与重估 |
| 09-18 / 新7D / 主导到期PM | τ 8→7；周一4D | 12.370% | −3.173 vp；same_expiry_atm | PM；新7D / 主导到期PM | local_fitted / observation_bracketed；q=0.994；含老化与重估 |
| 09-24 / 旧14D源 | τ 14→13；周一10D | 11.511% | −2.739 vp；same_expiry_atm | PM；旧14D源 | local_fitted / observation_bracketed；q=0.992；含老化与重估 |
| 09-25 / 新14D源 | τ 15→14；周一11D | 11.679% | −2.671 vp；same_expiry_atm | PM；新14D源 | local_fitted / observation_bracketed；q=0.994；含老化与重估 |
| 10-09 / 30D bracket / 旧smile | τ 29→28；周一25D | 12.252% | −1.911 vp；same_expiry_atm | PM；30D bracket / 旧smile | local_fitted / observation_bracketed；q=0.994；含老化与重估 |
| 10-12 / 30D bracket / 新smile | τ 32→31；周一28D | 12.038% | −1.837 vp；same_expiry_atm | PM；30D bracket / 新smile | local_fitted / observation_bracketed；q=0.994；含老化与重估 |
| 10-16 / 远端主导PM对照 | τ 36→35；周一32D | 12.591% | −1.626 vp；same_expiry_atm | PM；远端主导PM对照 | local_fitted / observation_bracketed；q=0.995；含老化与重估 |
| 10-23 / 45D lower | τ 43→42；周一39D | 12.760% | −1.470 vp；same_expiry_atm | PM；45D lower | local_fitted / observation_bracketed；q=0.995；含老化与重估 |
| 10-30 / 45D upper | τ 50→49；周一46D | 13.173% | −1.323 vp；same_expiry_atm | PM；45D upper | local_fitted / observation_bracketed；q=0.996；含老化与重估 |
| 3D fixed | 固定剩余期限 | 6.299% | −7.508 vp；fixed_tenor_atm | SPXW / PM | 源 09-11/09-14(τ1/4, w=0.667) → 09-14(τ3)；observed，q=0.990；total variance / 禁外推 |
| 7D fixed | 固定剩余期限 | 12.370% | −2.788 vp；fixed_tenor_atm | SPXW / PM | 源 09-17(τ7) → 09-18(τ7)；observed，q=0.994；total variance / 禁外推 |
| 14D fixed | 固定剩余期限 | 11.679% | −2.571 vp；fixed_tenor_atm | SPXW / PM | 源 09-24(τ14) → 09-25(τ14)；observed，q=0.994；total variance / 禁外推 |
| 30D fixed | 固定剩余期限 | 12.105% | −1.956 vp；fixed_tenor_atm | SPXW / PM | 源 10-09/10-12(τ29/32, w=0.333) → 10-09/10-12(τ28/31, w=0.667)；interpolated，q=0.994；total variance / 禁外推 |
| 45D fixed | 固定剩余期限 | 12.954% | −1.361 vp；fixed_tenor_atm | SPXW / PM | 源 10-23/10-30(τ43/50, w=0.286) → 10-23/10-30(τ42/49, w=0.429)；interpolated，q=0.995；total variance / 禁外推 |

曲线为 **mixed**：3D 低，7D 在 FOMC 所在区段形成局部高点，14D 回落，45D 再高。3D−30D **−5.805 vp**，7D−30D **+0.265 vp**，14D−30D **−0.426 vp**；这些 shape／spread 属于 **report-layer calculation from packet nodes**。FOMC 对 9/16 及其后期限的影响是事件映射，未分解出独立事件方差。

3D 的源从含 9/11 CPI 到期的 bracket 转为 9/14 观察点；9/14 同到期也明显下降，说明有合约层面的重估，但 fixed3D 的全部跌幅仍不能归因于事件冲击。7D、14D 的 observed source 分别换为 9/18、9/25；30D 与 45D 虽保留各自 bracket，权重都因 τ 缩短而变化。表中对应旧／新 exact nodes 已同时展示，无须也不能由 raw chain 另造曲面。9/11 的 T 日 0DTE 已删除；9/14 当前 τ=3、周一成为新 0DTE，只作战术层。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

五个 level 节点的单位为 %；skew、BF25 及所有 Δ 单位为 vp。节点采用 `forward_delta_non_premium_adjusted`；翼端在观察支持范围内按 forward delta 线性插值，ATM 仍是 k=0 总方差插值。15 个节点全部可用，均来自 `local_fitted / observation_bracketed`，权限仍是降级局部证据。

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：09-18 / ~7D | 18.387% | 14.898% | 12.370% | 10.675% | 9.712% | 4.223 vp | 0.417 vp | τ7；q=0.965–0.994；局部拟合 / 观察支持 / partial |
| Δ：09-17(τ7)→09-18(τ7) | −3.397 vp | −3.087 vp | −2.788 vp | −2.439 vp | −2.225 vp | −0.648 vp | +0.025 vp | rolling_tenor_slot_fixed_delta；方法／选择合同相容；含组成变化；materiality 未定 |
| T：09-25 / ~14D | 17.545% | 14.124% | 11.679% | 10.161% | 9.432% | 3.963 vp | 0.463 vp | τ14；q=0.967–0.994；局部拟合 / 观察支持 / partial |
| Δ：09-24(τ14)→09-25(τ14) | −3.837 vp | −3.181 vp | −2.571 vp | −1.966 vp | −1.587 vp | −1.214 vp | −0.003 vp | rolling_tenor_slot_fixed_delta；方法／选择合同相容；含组成变化；materiality 未定 |
| T：10-12 / ~30D | 19.156% | 14.863% | 12.038% | 10.448% | 9.828% | 4.415 vp | 0.617 vp | τ31；q=0.969–0.994；局部拟合 / 观察支持 / partial |
| Δ：10-09(τ29)→10-12(τ31) | −3.222 vp | −2.641 vp | −2.125 vp | −1.622 vp | −1.294 vp | −1.019 vp | −0.007 vp | rolling_tenor_slot_fixed_delta；方法／选择合同相容；含组成变化；materiality 未定 |

依次看三个变化维度：**level 下移**；25Δ put−call slope 在三槽位均 **flattened**；BF25 算术变化约 +0.025 / −0.003 / −0.007 vp，方向混合，无法证明超出拟合不确定性，故经济解读为 **unchanged within uncertainty**。skew 的跨期限梯度为 4.223→3.963→4.415 vp，非单调。

~7D：put25−ATM +2.528、call25−ATM −1.695 vp（Δ 分别 −0.299 / +0.349 vp）；~14D：put25−ATM +2.445、call25−ATM −1.519 vp（Δ 分别 −0.610 / +0.604 vp）；~30D：put25−ATM +2.825、call25−ATM −1.590 vp（Δ 分别 −0.516 / +0.503 vp）。这些 wing premium、skew25 与 BF25 都是 report-layer calculation from packet nodes；skew25=IV25P−IV25C，BF25=(IV25P+IV25C)/2−ATM，是 fixed-delta slope／curvature 代理，不是统计偏度。put 翼仍高于 ATM、call 翼低于 ATM，并不识别哪一侧便宜。

三组 smile **全部 roll**，其中约 30D 从 10/9（τ29）换为 10/12（τ31），不能称 same-expiry 或 fixed-tenor smile change。9/18 虽是主导到期，当前 smile 仅代表它的 PM 域，不能用于 AM。9/14、候选 9/15 与 9/16 未被选入 smile，必须现场刷新。

策略上，vertical 可保留方向表达，但仍要以具体翼端及退出清算值检验成本；butterfly／iron fly／condor 缺少稳定中心和可用的候选曲率定价；tail hedge 的保护成本、two-sided 最小所需幅度均未证明；calendar／diagonal 还需完整期限退出模型。较低 IV 与较平 slope 均不是确定方向或已确认相对价值信号。

## 9. Key Expiry / Strike / Dealer Node

到期汇总统一采用 B USD／SPX 1% move。T 全链 gross **484.956B**、signed **−20.617B**；删除 T0DTE 后 gross **410.009B**、signed **−11.834B**；再去除周一到期层，gross **396.054B**。当前比共同存续集合多一个零暴露远端到期，金额不受影响。

| 到期日 | Calendar DTE：T→目标 | gross GEX | signed GEX | 持久性 / scope |
| --- | --- | --- | --- | --- |
| 09-11 | 0 → 已到期 | 74.947 | −8.782 | T0DTE删除 |
| 09-14 | 3 → 0 | 13.955 | −0.811 | 周一新0DTE，隔离 |
| 09-15 | 4 → 1 | 12.908 | −1.685 | PM，正DTE候选期限 |
| 09-16 | 5 → 2 | 10.709 | −0.989 | PM，正DTE候选期限 |
| 09-18 | 7 → 4 | 256.581 | −2.884 | AM / PM 分拆 |
| 10-16 | 35 → 32 | 49.476 | −1.104 | AM / PM 分拆 |

**主导到期为 9/18（7→4 calendar DTE）**，占全链 gross **52.91%**、ex-T0DTE gross **62.58%**。该日 AM gross **231.981B**、signed **−0.928B**；PM gross **24.600B**、signed **−1.957B**，AM 占该日 gross **90.41%**。不得将混合到期总量当作 PM 收盘 pin。

 下表为选定到期子集的**存续节点**，M=百万 USD／SPX point；最后一个数值列进一步剔除周一 0DTE。

| SPX / XSP | Role | 存续 gross M/点 | 存续 signed M/点 | 剔周一0DTE signed M/点 | Durability / T+1 use |
| --- | --- | --- | --- | --- | --- |
| 7500 / 750 | 次级下行节点 | 186.690 | −40.400 | −36.116 | 正DTE及9/14分层；实时重建 |
| 7550 / 755 | 下行首个重估 | 156.948 | −32.155 | −31.282 | 正DTE及9/14分层；实时重建 |
| 7600 / 760 | 下方确认 | 263.206 | −12.994 | −9.004 | 正DTE及9/14分层；实时重建 |
| 7625 / 762.5 | 下方预警 | 46.982 | −6.258 | −5.412 | 正DTE及9/14分层；实时重建 |
| 7650 / 765 | 核心下沿，弱符号 | 164.573 | +0.646 | −0.697 | 正DTE及9/14分层；实时重建 |
| 7655 / 765.5 | 已到期大节点参考 | 26.208 | −5.570 | −5.876 | 正DTE及9/14分层；实时重建 |
| 7660 / 766 | 核心过渡 | 24.764 | −1.612 | −2.431 | 正DTE及9/14分层；实时重建 |
| 7675 / 767.5 | 上方正架 | 73.989 | +11.267 | +7.472 | 正DTE及9/14分层；实时重建 |
| 7680 / 768 | 核心上沿 / 预警 | 63.816 | +19.460 | +17.862 | 正DTE及9/14分层；实时重建 |
| 7700 / 770 | 上方确认，仍弱负 | 321.327 | −1.605 | −1.077 | 正DTE及9/14分层；实时重建 |
| 7725 / 772.5 | 上方过渡 | 61.477 | +3.342 | +0.273 | 正DTE及9/14分层；实时重建 |
| 7750 / 775 | 上行首个重估 | 138.882 | +12.442 | +11.530 | 正DTE及9/14分层；实时重建 |
| 7800 / 780 | 次级上行节点 | 118.369 | +36.534 | +36.232 | 正DTE及9/14分层；实时重建 |

7655 的选定地图 gross 有 **95.42%**、绝对 signed 有 **98.52%** 随 9/11 到期；7650 的存续微弱正值在删除周一到期层后转负。**7650–7680 是未确认的方向核心，7600–7700 是观察走廊**；warning 为 7625／7680，confirmation 为 7600／7700。上方正架与更高 gross 不等于必然阻力或回归中心。

选定 strike maps 仅覆盖 9/11、9/14、9/18、10/16。删除 T0DTE 后，其 gross 覆盖 **78.05%**；再删除目标到期后覆盖 **77.28%**，未覆盖存续部分仍有 signed **−7.035B／1%**。跨日固定 strike 迁移只比较共同选定的 9/18、10/16；9/18 gross 最大 strike 从 7600 到 7700 是灵敏度中心迁移，不等于资金从前者搬到后者。

辅助 Greek 中，T 全链 VEX 约 **2.056B**，ex-T0DTE Volga 约 **15.003B**。Volga 为原生 Vega 在 IV±0.5 vp 下的差，VEX 使用 vendor Vega；两者归一化未证明一致，不作金额相加或大小排名。T0DTE 的 Vanna／Charm／Volga 未提供，保留缺失，不填零。

## 10. T+1 Decision Map, Structural View and Plan Grade

**Primary regime：negative modeled signed gamma repair with expiry concentration；Directional prior：upside_bias。**路径不对称是修复后上边界接受优先，但保留完整下行失败分支；不附带概率。Base 为 7700→7750→7800，Risk 为 7600→7550→7500。

**Plan Grade：B / Conditional Next-Day Plan；Execution Status：requires_external_live_source；Quote Portability：low；setup representation：candidate_template；fixed legs：candidate_template_only。**两张 vertical 的 IV dependency 为 `background_only`，对应策略 **IV Structure Gate=not_applicable**，但 live IV 与场景重估仍为必要条件；原始 IV 状态继续保持 partial。

B 的依据是结构、反证、确认／失效、候选邻域及封顶风险协议可以定义。不能给更高等级，是因为候选 exact-expiry smile、退出估值和相对排名缺失，且实时节点／场景工具、数值容忍度及经纪商能力尚未验证；不能给更低等级，是因为核心 formal 可用，路径及重筛流程仍可定义。未来行情尚未产生本身不是降级理由，EOD 几个 tick 的价格差也不改变等级。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 核心内 / 走廊内未接受 | O_RESET、O_NODE、O_VOL；尚无 O_UP/O_DOWN | 方向尚未触发；价格停留不等于区间稳定 | 观察；当前两张方向卡不激活 | No Trade for these cards；不无条件否定全部 payoff family |
| 跳空越过 7700 / 7600 | O_GAP_UP / O_GAP_DOWN 后再计数 | 旧入场状态被跳过 | 先回测再确认；超过首节点／short 不追 | 未回测、重置未完成则取消当次评估 |
| 上行确认 | O_UP + O_SIGN_UP + 全部共同门禁 | 修复向上延续 | Base call；7750→7800 重估 | O_REJECT 或任一必要门禁失败 |
| 下行确认 | O_DOWN + O_SIGN_DOWN + 全部共同门禁 | 修复失败，保留负反馈风险 | Risk put；7550→7500 重估 | O_RECLAIM 或任一必要门禁失败 |
| post-event range reconfirmed | O_RANGE：3完整bar、稳定节点、净盈利区间含中心且有buffer | 足以重启 range 研究，尚未形成定价优势 | 重新研究对应 family；本期没有第三张卡 | 中心迁移、盈利区域失配则取消 |
| range thesis failure / boundary release | range稳定条件失效；方向分支仍须独立通过其条件 | 区间假设失败与方向接受分开 | 通过 O_UP/O_DOWN 与 signed 后才转对应卡 | 不能把一次越界直接当方向成交信号 |
| 新事件 / vol reset | O_RESET / O_VOL | 原计数、腿与估值失效 | 先管理已持风险；刷新、冻结后重新计数 | 未完成不得新开 |
| node migration | O_NODE 超过事前冻结容忍度 | 参照节点已变化 | 清除计数、重新映射并重筛 | 缺计算能力或容忍度不能由价格代替 |
| 实时能力 / 价格 / 风险 / 时间不满足 | O_CONFIG、O_QUOTES、O_MAPPING、O_SURFACE、O_VALUE、O_BROKER、O_RISK、O_TIME | 候选不可执行，与EOD结构事实分开 | 取消新交易；已持仓按风险协议处理 | 全部恢复并重新确认后才可人工评估 |

以下是唯一完整触发定义，策略卡只引用条件编号。时间均按 **America/New_York 完整 5 分钟 bar** 对齐。

- **O_RESET / O_CONFIG / O_CAL：**周一检查冻结截止后新信息，建立同步基线；重大实际消息、vol shock 或节点迁移后刷新并清空受影响计数。先冻结关键位、映射容忍度 ε_map（XSP 点）、parity 容忍度 ε_parity（XSP 点）、节点迁移容忍度 ε_node（SPX 点），再从不早于 09:30 的下一完整 bar 起点 t0 计数。三项容忍度目前为 null，没有参数来源和冻结时点就不能激活；不事后放宽。
- **O_UP / O_DOWN：**分别要求连续两根完整收盘严格 >7700／<7600。开盘已越过边界时，**O_GAP_UP** 先要求后续 bar 交易回 ≤7700，**O_GAP_DOWN** 先要求回 ≥7600，再从回测后的完整 bar 重新计数；未回测不追。
- **O_SIGN_UP：**两次确认收盘都取得兼容的 live 地图：存续局部 7700–7750 聚合 signed>0、目标 0DTE signed>0，且正 DTE PM 的负 signed 相对冻结基线收窄或已非负。**O_SIGN_DOWN：**两次都要求 ex-target 全链 signed<0、PM signed<0、存续 7600 局部 signed<0；目标 0DTE 单列。地图必须沿用同一 call-minus-put、family、OI vintage 与单位约定，最长允许延迟 300 秒，且与 bar 对齐。
- **O_NODE / O_VOL：**节点相对冻结地图迁移超过 ε_node 即重置；过去 15 分钟 VIX 上升 ≥1.0 点，或候选同 expiry ATM IV 上升 ≥2.0 vp，亦重置。升波阈值属于 workflow_default，未作历史 alpha 校准；重大向下重定价或其他消息仍适用 O_RESET。
- **O_REJECT / O_RECLAIM：**上行持有后若一根完整收盘 ≤7700，下一根完整 bar 未交易回 >7700，确认 rejection；下行持有后若收盘 ≥7600，下一根未回 <7600，确认 reclaim。风险、报价或时间上限可要求更早退出；入场时要求相应失效状态尚未出现。
- **O_RANGE：**至少三根完整 bar 留在重置后的核心、未触发方向边界，节点稳定；同步 spot／forward 和中心不确定区间必须位于实时、全成本后的情景盈利区间内并保留正 buffer。该条件仅重启 range 研究。完成收盘越过冻结 range 边界，或稳定节点／盈利区域条件失效，均使 range thesis 失败，方向卡仍需独立确认。

价格、VIX、XSP 全腿 quote／IV 要由合格实时 broker 或同等来源提供，默认最大 age **30 秒**；节点需要独立兼容计算器，场景需要可说明模型、输入及清算折价的估值平台。目前这些能力、权限和延迟均为 **external_required**，并未以“人工确认”替代工具验证。所有必需条件当前为 pending，不能凭价格 bar 将节点条件标为 confirmed。

| 分支 | 最早评估 | 最晚入场 | 最短有效持有 / 退出 |
| --- | --- | --- | --- |
| Base up / F_CALL | 9/14 09:40 ET 下限；实际 t0+10m | 9/14 15:00 ET 上限 | 至少 30 分钟；min(入场+60m, 15:30, 更早经纪商/合约限制) |
| Risk down / F_PUT | 同上，独立条件计数 | 同上 | 与 Base 互斥；不持有过夜 |

[Cboe 交易时段](https://www.cboe.com/about/hours/us-options/)及 [XSP 合约规格](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)显示，9/14 为正常会话、RTH 至 16:15 ET；首选 9/15 到期合约最后交易在次日 16:00 ET。本文主动采用周一 **15:30** 退出上限和 30 分钟可用窗口，因此不晚于 15:00 新评估入场；提前限制优先。如果重置完成后的最早评估已经晚于最晚入场，该分支取消。周一 13:00 常规发布只监测，未发现要求等待该时点的理由。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

结构匹配、价格依据、执行可行性是三个判断。两张保留卡的 `pricing_assessment=pending_live_repricing`、`edge_evidence_status=not_established`、`execution_feasibility=external_required`；筛选为 conditional 仅表示可以在对应路径下继续研究。它们的 EOD IV dependency 为 background_only、gate 为 not_applicable；其余依赖曲率／期限相对价值的 family 没有获得所需 IV／估值支持。Prompt 3 保留 Prompt 2 的筛选结果，没有静默升级。

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base / F_CALL | directional continuation / call debit vertical | 7700 上确认的修复延续 | 9/15 vs 9/16；候选 wings 待刷新 | pending_live_repricing；edge not_established；风险可封顶 | conditional；external_required | 通过上行条件与实时目标清算值测试 |
| Risk / F_PUT | directional continuation / put debit vertical | 7600 下确认的修复失败 | 同上；不得用更远 smile 代替 | pending_live_repricing；edge not_established；风险可封顶 | conditional；external_required | 通过下行条件与实时目标清算值测试 |
| Base 备选 / F_DBWB | directional broken-wing butterfly | 可表达定点上行，价格论证未完成 | 缺 exact-expiry curvature／非对称翼端估值 | pricing unavailable；edge not_established | not_screenable | 完整损益与不利场景未定；不以较低 debit 排名 |
| 稳定性复核 / F_FLY | centered stability / debit fly、defined-risk iron fly | 现有中心未证实持久 | 旧近端节点到期；候选曲率缺失 | 盈利区间／持有期价值未证实 | reject | 先重建中心及包含测试；不因5–10点偏差单独否定 |
| 区间复核 / F_CONDOR | broad bounded range / defined-risk iron condor | 走廊不等于有界分布 | 负 signed 残留；缺稳定边界 | 信用金与尾损补偿未证实 | reject | 需新的 range thesis 与全成本估值 |
| 双向扩张 / F_EXPANSION | two-sided expansion / straddle、strangle | 双向路径存在，但幅度未知 | 低IV仍可进一步下移，时间损耗敏感 | 未证实最小所需幅度可覆盖全成本 | not_screenable | 补双向幅度／IV冲击／退出损益测试 |
| 期限研究 / F_TERM | term/vol relative value / calendar、diagonal | 未纳入周一日内方向假设 | partial+事件组成；期限退出模型缺失 | 价格依据与风险状态未闭合 | not_applicable | 需要独立期限研究，非当日第三张卡 |

### Local Candidate Comparison

候选网格重新由本期全腿报价构建：每个 family 的 long anchor 及相邻 ±1 档、3／5 点宽度、9/15／9/16 两到期，共 **12 个／family、24 个**。仅核对历史合约存在性与合成损益，没有选出 EOD winner；结果 **deferred_to_t1**。上游 `candidate_spreads.csv` 是受风险／宽度过滤的两腿子集，不能替代其他 family 筛选。

| Candidate rule | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F_CALL：实时上行 long anchor 最近档及 ±1；W=3/5；9/15 vs9/16 | 方向 family：包含测试 not_applicable；改做路径／退出估值 | Exact候选IV与事件时间价值待取 | 目标/不利/失效/退出四情景；实际风险簿 | 随腿及状态重算 | 真实C_N、quote宽度与atomic能力待核实 | low | deferred_to_t1；无赢家 |
| F_PUT：实时下行 long anchor 最近档及 ±1；W=3/5；9/15 vs9/16 | 同上 | 同上；不能套用其他expiry微笑 | 同上 | 同上 | 同上 | low | deferred_to_t1；无赢家 |
| 两者均1:1对称vertical；非对称BWB单独筛选 | 不伪造BWB中心包含关系 | 候选曲率未具备 | 未形成可比非对称估值 | 未计算排名 | 未证明成本优势 | low | BWB not_screenable |

目标日顺序是先确定同步 spot／forward 与最新关键位，重新选择可用 expiry，再在最接近有效触发／实际入场位置的 listed long strike 附近比较相邻档与宽度。剔除已越过首个重估点或 short 的过时模板、无效报价、不足风险额度及不支持清算收益的候选；其余按目标／不利情景支持、流动性、成本及对 IV／时间敏感性排序。若所有候选失败，则退出本次评估，不自动用后备 expiry 绕过价格或风险失败。

以下两卡共同采用上述筛选、三层价格边界和第 10 节条件定义；实际 live selected legs、N、最大 debit 与情景清算价值均 pending。

### Base Candidate Template — Base Case

**F_CALL / base_up / directional_continuation / call debit vertical / conditional。**首选 9/15（T4→周一1 calendar DTE），后备 9/16（T5→周一2DTE）；持有为周一日内、不超过60分钟且受15:30退出上限约束。Portability=low，candidate_template，固定腿权限candidate_template_only。

适用路径为修复向上延续；激活引用 **O_UP、O_GAP_UP、O_SIGN_UP + 共同门禁**，失效引用 **O_REJECT**。入场前条件不完整、未回测、重置／节点／估值门禁失败或价格已经越过 first target／short，均取消当次候选；这张Base卡不同时与另一张持有。

选腿以最新有效 **7700 SPX** 附近的 live XSP spot／forward 为参考，long 取最近有效 listed strike 并比较 ±1 档，short 朝上偏移3或5点；无 body、不增加额外 wings，比例1:1。新事件、vol reset 或中心迁移后重新定期限、strike和width。9/15含次日Empire、9/16含FOMC等更长事件时间价值，即使周一退出也须反映在清算估值中。候选两到期的 formal smile 均未选出，live exact-expiry ATM、25Δ及实际腿翼端必须重新取得。

**illustrative_eod_example（非预选订单）**：同为9/15到期，N=1单位演示；quote及标的时点均9/11 16:00ET，EOD XSP=765.70，对照SPX/10=765.55。以下mapping gap是strike相对表内SPX结构参考÷10的差，不消除+0.150点的标的映射差。

| Side | Strike / type | Ratio | 对应SPX / mapping gap | EOD bid / mid / ask | 腿IV |
| --- | --- | --- | --- | --- | --- |
| 买入 | 770C | 1 | 7700 / 0.000 XSP | 0.830 / 0.850 / 0.870 | 7.16% |
| 卖出 | 775C | 1 | 7750 / 0.000 XSP | 0.120 / 0.135 / 0.150 | 6.86% |

组合 **synthetic-only**：bid / mid / ask = **0.680 / 0.715 / 0.750 XSP点**，买腿ask−卖腿bid为演示的保守debit边界。按该ask和C_1=6–16美元，单位到期最大亏损 **81–91美元**、最大盈利 **409–419美元**、成本后到期BE **770.81–770.91**；仅为风险尺度，binding=false。该EOD例子的净Delta正、Gamma正、Vega正、Theta负；移动至short附近、时间流逝或翼端变化后符号和幅度均可能改变，不能迁移为周一Greeks。

成本后到期盈利区为 S_XSP > K_long + d + C_N/(100N)，BE依同式；尾部最大亏损采用上方MaxLoss公式，并不保证stop可以按计划价格成交。每setup all-in risk≤R_eff≤300美元，实际N与live maximum debit仍为null，minimum credit不适用。

到 **7750** 先重新取得可清算值，仅当路径、时间与剩余收益支持时才评估 **7800**，不承诺到达或自动止盈。相较单买期权，卖出上方腿降低支出及部分Vega敞口，同时封顶更远方向收益；这项取舍必须通过live场景比较。观点可能因回到边界、路径过慢、IV回落或翼端变化、价差／滑点而失败，即使方向最终正确也可能亏损。

估值状态为pending_live_repricing、edge not_established；下表是需要估值的输入设计，所有 V_exit、净PnL、概率、实际quantity和具体估值／退出timestamp当前均null。模型需由合格broker／独立实时平台提供，并披露模型、校准、实际腿、carry和清算折价。

| Scenario | Spot assumption | Elapsed / exit | IV assumptions | Liquidation value / PnL |
| --- | --- | --- | --- | --- |
| Base / 目标 | XSP 775 | 入场后30分钟 | ATM不变及−2vp，配合候选实际翼端变化 | pending；不可用到期内在价值替代 |
| Risk / Adverse | XSP 770，另含反向路径 | 入场后15–30分钟 | ATM ±2vp及不利skew/wing变化 | pending；不得假设方向正确便盈利 |
| Invalidation | XSP 770附近，以实际价格为准 | 实际rejection/reclaim时 | 当时同expiry实时曲面 | pending；风险门禁可先触发退出 |
| Planned exit | 按实时spot/forward情景网格 | min(入场+60m,退出上限) | 实际曲面及已定义压力情景 | pending；完整开平成本计入 |

### Risk-Path Contingency

**F_PUT / risk_down / directional_continuation / put debit vertical / conditional。**首选 9/15（T4→周一1 calendar DTE），后备 9/16（T5→周一2DTE）；持有为周一日内、不超过60分钟且受15:30退出上限约束。Portability=low，candidate_template，固定腿权限candidate_template_only。

适用路径为修复向下失败；激活引用 **O_DOWN、O_GAP_DOWN、O_SIGN_DOWN + 共同门禁**，失效引用 **O_RECLAIM**。入场前条件不完整、未回测、重置／节点／估值门禁失败或价格已经越过 first target／short，均取消当次候选；这张Risk卡不同时与另一张持有。

选腿以最新有效 **7600 SPX** 附近的 live XSP spot／forward 为参考，long 取最近有效 listed strike 并比较 ±1 档，short 朝下偏移3或5点；无 body、不增加额外 wings，比例1:1。新事件、vol reset 或中心迁移后重新定期限、strike和width。9/15含次日Empire、9/16含FOMC等更长事件时间价值，即使周一退出也须反映在清算估值中。候选两到期的 formal smile 均未选出，live exact-expiry ATM、25Δ及实际腿翼端必须重新取得。

**illustrative_eod_example（非预选订单）**：同为9/15到期，N=1单位演示；quote及标的时点均9/11 16:00ET，EOD XSP=765.70，对照SPX/10=765.55。以下mapping gap是strike相对表内SPX结构参考÷10的差，不消除+0.150点的标的映射差。

| Side | Strike / type | Ratio | 对应SPX / mapping gap | EOD bid / mid / ask | 腿IV |
| --- | --- | --- | --- | --- | --- |
| 买入 | 760P | 1 | 7600 / 0.000 XSP | 1.070 / 1.095 / 1.120 | 10.28% |
| 卖出 | 755P | 1 | 7550 / 0.000 XSP | 0.540 / 0.555 / 0.570 | 11.82% |

组合 **synthetic-only**：bid / mid / ask = **0.500 / 0.540 / 0.580 XSP点**，买腿ask−卖腿bid为演示的保守debit边界。按该ask和C_1=6–16美元，单位到期最大亏损 **64–74美元**、最大盈利 **426–436美元**、成本后到期BE **759.26–759.36**；仅为风险尺度，binding=false。该EOD例子的净Delta负、Gamma正、Vega正、Theta负；移动至short附近、时间流逝或翼端变化后符号和幅度均可能改变，不能迁移为周一Greeks。

成本后到期盈利区为 S_XSP < K_long − d − C_N/(100N)，BE依同式；尾部最大亏损采用上方MaxLoss公式，并不保证stop可以按计划价格成交。每setup all-in risk≤R_eff≤300美元，实际N与live maximum debit仍为null，minimum credit不适用。

到 **7550** 先重新取得可清算值，仅当路径、时间与剩余收益支持时才评估 **7500**，不承诺到达或自动止盈。相较单买期权，卖出下方腿降低支出及部分Vega敞口，同时封顶更远方向收益；这项取舍必须通过live场景比较。观点可能因回到边界、路径过慢、IV回落或翼端变化、价差／滑点而失败，即使方向最终正确也可能亏损。

估值状态为pending_live_repricing、edge not_established；下表是需要估值的输入设计，所有 V_exit、净PnL、概率、实际quantity和具体估值／退出timestamp当前均null。模型需由合格broker／独立实时平台提供，并披露模型、校准、实际腿、carry和清算折价。

| Scenario | Spot assumption | Elapsed / exit | IV assumptions | Liquidation value / PnL |
| --- | --- | --- | --- | --- |
| Base / 目标 | XSP 755 | 入场后30分钟 | ATM不变及−2vp，配合候选实际翼端变化 | pending；不可用到期内在价值替代 |
| Risk / Adverse | XSP 760，另含反向路径 | 入场后15–30分钟 | ATM ±2vp及不利skew/wing变化 | pending；不得假设方向正确便盈利 |
| Invalidation | XSP 760附近，以实际价格为准 | 实际rejection/reclaim时 | 当时同expiry实时曲面 | pending；风险门禁可先触发退出 |
| Planned exit | 按实时spot/forward情景网格 | min(入场+60m,退出上限) | 实际曲面及已定义压力情景 | pending；完整开平成本计入 |

### Live quote、映射与限价协议

先取得 native complex quote；未提供公开 native NBBO 时，只能用同步全部腿构建 synthetic bid=买腿bid−卖腿ask、ask=买腿ask−卖腿bid，审查同时成交风险。必须实际确认 broker 支持**原子化 multi-leg net-limit**，不分腿建仓。当前没有该能力验证，公开 native quote 缺失本身也不等同于永久否决。

O_QUOTES 要求各腿 bid≥0、ask≥bid、symbol／ratio／timestamp一致、age≤30秒；组合spread／有意义的正mid≤25%，近零mid须另按绝对tick和成本审查。O_MAPPING 同时比较同步 XSP与SPX/10，以及同expiry、同carry的远期：F_pair=K+(C−P)/D；把可执行bid/ask区间与 F_ref 比较，不能用零carry的K+C−P假装严格parity。本期18个EOD call/put对的F_ref均位于其买卖区间，mid残差约−0.03495至+0.04780 XSP点；这只是采用SPX packet forward÷10和D的跨标的诊断，非独立实时无套利认证，ε_map与ε_parity仍须事前冻结。

O_SURFACE、O_VALUE通过后，从实时native组合mid附近以net limit评估；无native时使用合格同步synthetic和保守折价。每次改善仅按合法tick，不得超过d_live_limit，且实际风险簿及退出能力必须通过O_RISK/O_BROKER/O_TIME。**EOD reference仅用于盘后可行性诊断，不是T+1 expected entry或binding limit。**先选live腿，再评估实时价格，不沿用昨收腿寻找成交理由。

两张完整卡已占满本期上限；没有额外Alternative。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

O_UP、O_GAP_UP、O_SIGN_UP及共同门禁成立后，基准为上行修复继续，7750先重估，再有条件看7800；绑定F_CALL。O_REJECT、恢复证据消失或实时估值／风险条件失败使评估取消或持有观点失效。情景没有校准概率。

### Risk Case

O_DOWN、O_GAP_DOWN、O_SIGN_DOWN及共同门禁成立后，修复失败的下行路径先看7550，再重估7500；绑定F_PUT。O_RECLAIM或负signed证据失效取消该观点。这是失败路径的条件应对，不是同时建立反向持仓的建议。

### No-Trade Case

**EOD no-qualified-plan**只在核心formal／身份硬失败、无法定义路径与失效，或无法给出封顶风险family和可操作重筛协议时成立。本期尚未命中这些条件；partial IV、low portability和未来行情未产生不自动把B降为C。

**T+1 execution abort**包括：价格接受未完成；跳空未回测；所需live signed／节点能力或已冻结容忍度缺失；新事件、vol shock或节点迁移尚未完成重置；报价过期／价差过宽／mapping-parity不合格；候选IV、Greeks或场景清算值不支持全成本后的收益；首次可评估时已越过short或首个节点；实际风险额度不足、已有active setup或重入／失败次数超限；没有有效持有／退出窗口；只能分腿、裸卖或承担未授权过夜风险。

重新考虑需要修复具体失败原因，并从新的合格快照、候选比较和完整bar确认重新开始。方向正确、历史合成报价便宜或接近风险预算都不能跳过上述步骤。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on view / grade / execution |
| --- | --- | --- |
| 7700／7600接受、回测与失效 | 决定修复延续或失败；核对spot和bar | 改变Structural View／对应分支，触发本身不保证估值通过 |
| ex-target全链、PM、目标0DTE及局部signed | 区分持久结构和战术层；观察节点迁移 | 改变结构判断或令计数重置；缺工具限制Execution Status |
| 9/15／9/16 ATM、25Δ、实际腿IV及退出价值 | 区分事件时间价值、翼端与Theta | 改变候选价格依据；不会单凭IV降低上调Plan Grade |
| 周末新信息与持有窗口事件 | 识别实际hard reset、gap和报价失效 | 重判portability、t0和退出窗口 |
| 组合流动性、实际风险簿及剩余时间 | 决定数量、全成本风险和能否退出 | 改变Execution Status；不反推市场方向 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
