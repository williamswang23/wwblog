+++
title = "SPX期权持仓与Greeks结构分析-260918"
date = "2026-09-19"
data_as_of = ["2026-09-17", "2026-09-18"]
draft = false
description = "分析9月18日期权到期后的存续结构及下一交易日条件式路径。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "6565e7ea392db51a9adfd61e62db6481d307d05ac88ee66eb3ad8af9303643ff"
+++

# SPX期权持仓与Greeks结构分析-260918

## 1. 结论

9月18日的全链正 Gamma 主要随到期层退出，周一采用**双向脆弱、条件下破优先（two_sided_fragility）**的机制性先验，须先验证7625下方接受及负向结构，计划为 **B / Conditional Next-Day Plan**、执行状态为 **requires_external_live_source**，仅供盘后条件研究。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | 双向脆弱（two_sided_fragility），条件下破优先；总量改善尚未转化为近端稳定支撑，结构置信度 medium。 |
| Earliest evaluation | 9/21 最早09:40 ET，仅为下界：开盘重建PM／新0DTE／存续地图、冻结参数后，取得两根完整5分钟确认。 |
| Base activation | 若7625下方接受且负向层一致，则 评估 put debit vertical → 首查7600 → 重新收复7625或负向层失效则取消。 |
| Downside branch | 沿Base：若7625下方接受，满足跳空回抽与负向层门禁，则 put debit vertical → 7600；重新收复7625即失效。 |
| Upside branch | 若7675上方接受且PM／新0DTE修复，则 评估 call debit vertical → 首查7700 → 拒绝7675或修复失败则取消。 |
| Otherwise | No Trade / observe only；11:00普通调查不自动阻断全天，实际重大冲击才重置；15:00后不新入，15:30或更早限制前退出。 |

Plan Grade / Plan Status：B / Conditional Next-Day Plan；Execution Status：requires_external_live_source；盘后条件计划、非实时下单指令。

## 3. Executive Summary

- **正值到期，存续仍负。** 9/18到期层占全链gross GEX的54.75%；剔除后signed GEX为−2.693B美元／1%变动，再剔周一到期层为−3.765，不能把T日7650巨峰视为周一支撑。
- **总量改善与局部转弱并存。** 共同到期signed改善9.207B美元，其中82.13%来自AM层；共同7650、7600、7700节点反而更负，8000远端节点的变化不代表近端稳定。
- **Base看7625下方释放，Risk看7675以上修复。** 分别研究put debit vertical与call debit vertical，第一复核节点为7600／7700；7625–7675先观察，不自动推导区间卖波动。
- 共同ATM节点继续下降；三个smile槽位均滚动，level下降、25Δ斜率变平、BF25微升，后者尚无显著性依据。曲面新增凸性与密度检查失败，不能据低IV建立价格优势结论。
- **候选默认9/22到期，周一为1个日历DTE。** 9/21零DTE与9/23两DTE仅作敏感性比较；36个组合保留重选规则，不选EOD赢家。周末、短期限及合成报价使portability为low。
- **当期价格锚有范围限制。** raw链spot代理为7649.29、较前日升0.152%；包内官方收盘及RV仅到9/17。B评级衡量计划完整性，价格优势未建立；实时能力、估值和风险账本仍待外部来源。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/17 | T：9/18 | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 共同30个存续到期日 | gross148.025；signed−11.900 | gross169.141；signed−2.693 | gross+14.265%；signed+9.207 | 控制到期构成后仍有修复，但净值没有转正。 |
| AM／PM贡献 | AM−3.385；PM−8.515 | AM+4.176；PM−6.869 | AM贡献82.13%的净改善；PM改善较小 | 全链改善不能替代近端PM确认。 |
| 共同selected局部 | 7650：−8.167；7600：−19.555；8000：−4.957 | 7650：−10.351；7600：−22.401；8000：+84.852 | 百万美元／SPX点；均限9/30＋10/16 | 局部弱化与远端改善分开；T新增9/21地图不做伪同样本比较。 |
| ATM front | fixed3D11.337%；9/21 exact10.321% | fixed3D＝9/21 exact6.562% | −4.775vp / fixed_tenor_atm；−3.759vp / same_expiry_atm | 前者由Fri–Mon插值变Mon单点，含来源权重变化 |
| Selected smile | 9/24、10/1、10/16（τ29） | 9/25、10/2、10/19（τ31） | ATM −1.312/−0.636/−0.805；skew −0.061/−0.255/−0.300；BF25 +0.034/+0.022/+0.002vp | 三组均rolling_tenor_slot_fixed_delta；level、斜率、曲率不能混称。 |
| 计划与窗口 | upside_bias；目标9/18；默认9/21；none | two_sided_fragility；目标9/21；默认9/22；low | B→B；目标日到期长度3DTE→1DTE | 前日IP/AM开盘reset与本期周末不是同一事件合同；low不代表获得下单权限。 |

**前期计划回顾。** 当前实际260917正文的Base为7650上方→7675，Risk为7625下方→7600，并要求周五日内退出。T日raw收盘代理7649.29回到旧核心7625–7650内，既不能证明盘中从未触发，也不能证明任何已触发分支盈利或失败。historical trigger＝not_verifiable；execution / P&L＝not_supplied。当前实际稿与原生成QA哈希不同，本次读取实际稿回顾，数值比较独立使用两日formal包。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

- 美联储G.17：8月工业生产环比持平，制造业−0.3%，产能利用率76.3%；缺少共识差，不写“超预期”。[官方发布](https://www.federalreserve.gov/releases/g17/current/default.htm)
- 纽约联储DSGE模型：2026年Q4/Q4 GDP增长预测1.2%，核心PCE预测3.3%，较6月3.1%上调；这是模型研究结果，不是该行官方预测或政策承诺。[9月模型更新](https://libertystreeteconomics.newyorkfed.org/2026/09/the-new-york-fed-dsge-model-forecast-september-2026/)
- AMEC页面显示9/18的2026Q3 Staff Nowcast为2.3%；未取得组件分解，不补造周变动，也不与上述Q4/Q4口径直接比较。[官方AMEC页面](https://www.newyorkfed.org/research/AMEC)

| 未来常规交易日／ET | 已知安排 | 对本计划的影响 |
| --- | --- | --- |
| 9/21 11:00 | SCE Household Spending Survey | monitoring_only；可以早于该时点评估。只有实际重大价格／IV／流动性冲击才重置。 |
| 9/22 08:30／10:00 | 费城联储非制造业／里士满联储制造业调查 | 在本计划周一退出之后；选9/22到期不授权持有到事件。 |
| 9/23 | 所查纽约联储日历未列事件 | 并非“全天无风险”；其他讲话、日历外消息未穷尽。 |

日程来源：[纽约联储9月日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[Cboe交易时段及假期](https://www.cboe.com/about/hours/us-options)。9/19–20跨周末；截至cutoff未核实重大盘后hard-reset，也没有周末／GTH实时价格。包内“next OpEx＝9/18”是T日事件标签，不能当成周一待发生事件。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 全链正Gamma不能带过周末

**Claim：** 全链正Gamma不能带过周末。

**Evidence / basis：** T全链gross373.826B、signed+107.007B；9/18到期gross204.684B占54.754%，signed+109.701B。剔当日后signed−2.693B，再剔周一到期后−3.765B。T的9/18只有PM行，AM合约已退出原始横截面。（两日expiration panel；数据事实加报告层复算。）

**Mechanism / assumptions：** 正值集中在已到期层；按模型call−put假设，周一存续结构仍容许边界释放。Gross恒非负并非dealer长Gamma证据。 替代解释：远端模型Greeks变化、老化和OI构成可以造成总量变化，并无真实dealer账簿。

**T+1 Implication：** 等待开盘重建，核心7625–7675观察；Base下破7625，Risk上破7675。

**Falsifier：** 新周一0DTE与存续可交易PM层形成稳定正Gamma且价格拒绝下破。

**Confidence：** medium；算术与机制证据，不是经过校准的路径概率。

### Thesis 2 — 共同总量改善主要不在近端PM

**Claim：** 共同总量改善主要不在近端PM。

**Evidence / basis：** 共同30期gross148.025→169.141B、signed−11.900→−2.693B；其中AM−3.385→+4.176B贡献82.13%的净改善，PM−8.515→−6.869B。共同selected的8000节点−4.957→+84.852百万/点，离spot约4.585%。（两日expiration panel；数据事实加报告层复算。）

**Mechanism / assumptions：** 总量被较远行权价及AM层影响，不能据此推定7650周围对冲稳定。Greeks变化含定价、老化与OI，不等于资金流。 替代解释：远端模型Greeks变化、老化和OI构成可以造成总量变化，并无真实dealer账簿。

**T+1 Implication：** 近端判断优先共同局部、存续PM和目标0DTE；不继续把aggregate repair单独作为偏上依据。

**Falsifier：** 共同近端节点由负转正、PM整体压力继续收窄且上行接受成立。

**Confidence：** medium；算术与机制证据，不是经过校准的路径概率。

### Thesis 3 — 7650巨峰已到期，存续局部反而转弱

**Claim：** 7650巨峰已到期，存续局部反而转弱。

**Evidence / basis：** 7650allselected signed+1574.657百万/点，剔T0后−10.880，再剔周一后−10.351；共同9/30+10/16该位−8.167→−10.351，7600−19.555→−22.401，7700−9.832→−12.431。周一7700自身+18.201使当前存续合计+5.770。（两日selected gamma table；数据事实加报告层复算。）

**Mechanism / assumptions：** 近端正负取决于周一0DTE层；T的7650pin标签和新增周一地图不能直接解释为跨日支撑增强。 替代解释：远端模型Greeks变化、老化和OI构成可以造成总量变化，并无真实dealer账簿。

**T+1 Implication：** 下破7625首查7600；上破7675首查7700，两侧节点均是重估位置而非保证获利价。

**Falsifier：** Live关键位迁移，或对应局部/PM/new0DTE条件不成立。

**Confidence：** medium；算术与机制证据，不是经过校准的路径概率。

### Thesis 4 — ATM继续降，smile变平但曲率微升

**Claim：** ATM继续降，smile变平但曲率微升。

**Evidence / basis：** 共同30个exactATM均下降；9/21ATM6.562%、同到期Δ−3.759vp；fixed3D6.562%、Δ−4.775vp。7/14/约30D smile均滚动，ATM下降、25Δskew收窄，BF25分别+0.034/+0.022/+0.002vp。主范围形状门槛新增凸性和密度失败。（两日正式IV packet；数据事实加报告层复算。）

**Mechanism / assumptions：** 3D从Fri–Mon插值变为Mon单点；跨周末年化与来源组成影响读数，不把6.56%当周一real-world波动预测。微小BF差值无校准显著性。 替代解释：期限滚动、周末年化及报价不确定性也能改变表面差值。

**T+1 Implication：** 优先1DTE9/22方向价差模板，9/21零DTE与9/23两DTE仅敏感性；实际腿IV/退出MTM须live，不建立期限套利或卖波动结论。

**Falsifier：** 实际候选wing/ATM/quote/scenario不能通过门禁，或IV/节点冲击使旧排序失效。

**Confidence：** low；算术与机制证据，不是经过校准的路径概率。

 

## 7. Conflicting Evidence, Confidence and What Changes the View

| Supports base path | Weakens base path | Resolution |
| --- | --- | --- |
| 剔到期后signed仍负；7650／7600共同节点转弱 | 共同PM负值收窄，raw spot仍小幅上涨 | 条件下破优先，但不预设开盘做空；两根价格确认之外，须独立验证负向层。 |
| 当日7650巨峰消失，不能沿用pin标签 | 周一上方有正向0DTE局部，尤其7700 | 上破7675且PM修复成立时转入Risk卡，不能把偏下先验当永久方向。 |
| IV形状质量下降，前端跨周末组成变化大 | 共同30个exact ATM确实全部下降 | 降低IV相对价值结论的可信度；保留方向价差条件模板，拒绝仅凭“便宜”宣称edge。 |

**主导证据**是到期剔除后的近端共同节点与PM层；远端8000变化、宏观背景、曲面质量主要约束置信度。结构置信度medium，路径依据为mechanism_only，empirical_validation_status＝not_tested。7675上方接受并通过独立修复门禁会改变方向排序；单纯取得实时报价只改变Execution Status，不会证明方向先验或统计优势。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

以下为packet原生ATM节点；价差与变化是**report-layer calculation from packet nodes**。A＝forward log-moneyness k=0处线性总方差插值、local_fitted／observation_bracketed；F＝同scope内按总方差插值，no_extrapolation=true。τ为ACT/365对应的日历天数，P→T均有自然老化。

| Expiry / tenor | τ P→T / positive time | ATM IV T | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09/21 | 4.000→3.000 | 6.562% | −3.759vp；same_expiry_atm | 目标日PM到期；周一0DTE | A；c=0.989；老化＋重估 |
| 09/22 | 5.000→4.000 | 8.244% | −2.448vp；same_expiry_atm | 默认候选；周一1DTE | A；c=0.988；老化＋重估 |
| 09/23 | 6.000→5.000 | 8.893% | −1.917vp；same_expiry_atm | 两DTE比较 | A；c=0.989；老化＋重估 |
| 09/24 | 7.000→6.000 | 9.691% | −1.810vp；same_expiry_atm | P固定7D来源 | A；c=0.992；老化＋重估 |
| 09/25 | 8.000→7.000 | 10.189% | −1.339vp；same_expiry_atm | T固定7D／smile | A；c=0.991；老化＋重估 |
| 10/01 | 14.000→13.000 | 10.364% | −1.004vp；same_expiry_atm | P固定14D来源 | A；c=0.991；老化＋重估 |
| 10/02 | 15.000→14.000 | 10.732% | −0.928vp；same_expiry_atm | T固定14D／smile | A；c=0.992；老化＋重估 |
| 10/16 | 29.000→28.000 | 11.657% | −0.617vp；same_expiry_atm | 30D下括号；P约30日smile | A；c=0.995；老化＋重估 |
| 10/19 | 32.000→31.000 | 11.469% | −0.604vp；same_expiry_atm | 30D上括号；T约30日smile | A；c=0.993；老化＋重估 |
| 10/30 | 43.000→42.000 | 12.530% | −0.447vp；same_expiry_atm | 45D下括号 | A；c=0.995；老化＋重估 |
| 11/03 | 47.042→46.042 | 12.482% | −0.430vp；same_expiry_atm | 45D上括号；跨冬令时 | A；c=0.991；老化＋重估 |
| 3D fixed | 3（固定） | 6.562% | −4.775vp；fixed_tenor_atm | 主范围PM期限控制视角 | P：09/18–09/21，w=0.666667；T：09/21单点；observed／observation_bracketed；c=0.989 |
| 7D fixed | 7（固定） | 10.189% | −1.312vp；fixed_tenor_atm | 主范围PM期限控制视角 | P：09/24单点；T：09/25单点；observed／observation_bracketed；c=0.991 |
| 14D fixed | 14（固定） | 10.732% | −0.636vp；fixed_tenor_atm | 主范围PM期限控制视角 | P：10/01单点；T：10/02单点；observed／observation_bracketed；c=0.992 |
| 30D fixed | 30（固定） | 11.527% | −0.675vp；fixed_tenor_atm | 主范围PM期限控制视角 | P：10/16–10/19，w=0.333333；T：10/16–10/19，w=0.666667；interpolated／interpolated_between_observed_expiries；c=0.993 |
| 45D fixed | 45（固定） | 12.494% | −0.450vp；fixed_tenor_atm | 主范围PM期限控制视角 | P：10/30–11/03，w=0.494845；T：10/30–11/03，w=0.742268；interpolated／interpolated_between_observed_expiries；c=0.991 |

**形状与解读。** 曲线整体前低后高，保留mixed标签以容纳跨周末期限锯齿；3D／7D／14D／45D相对30D分别为−4.965vp、−1.338vp、−0.795vp、+0.966vp。3D从P的9/18–9/21（τ1–4，w2/3）变为T的9/21单点τ3；9/21同到期下降3.759vp支持前端确有变化，但fixed3D的4.775vp不能全称为纯重估或事件方差下降。30D的括号日期不变、权重1/3→2/3，45D权重0.494845→0.742268，11/3含冬令时多1小时。

T日0DTE已从positive-τ曲线剔除；它所在LE3D bucket的3.6589%不能替代周一0DTE定价。固定30D11.5274%减RV20的9.6023%为+1.9251vp，但RV仅截至9/17、采用252交易日年化，与IV日历时间口径不同，只作背景。9/21的6.562%包含周末日历年化及临近到期效应，不是周一实际波动预测。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

delta convention＝forward_delta_non_premium_adjusted；翼节点方法＝linear_in_forward_delta_within_observed_support，ATM方法同A。15节点均interpolated／observation_bracketed、quality_flags=[]；总体仍partial。节点IV用%，skew／BF25及所有Δ行用vol points（vp）。

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T：09/25／约7D | 14.741 | 12.093 | 10.189 | 8.909 | 8.144 | 3.184 | 0.311 | 原生节点＋报告计算；c=0.962–0.991；partial |
| Δ：09/24(τ7)→09/25(τ7) | −1.241 | −1.309 | −1.312 | −1.248 | −1.184 | −0.061 | +0.034 | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含roll；indeterminate_within_uncertainty |
| T：10/02／约14D | 15.951 | 12.857 | 10.732 | 9.539 | 9.029 | 3.318 | 0.465 | 原生节点＋报告计算；c=0.955–0.992；partial |
| Δ：10/01(τ14)→10/02(τ14) | −0.935 | −0.741 | −0.636 | −0.487 | −0.395 | −0.255 | +0.022 | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含roll；indeterminate_within_uncertainty |
| T：10/19／约30D | 17.932 | 13.978 | 11.469 | 10.132 | 9.753 | 3.847 | 0.586 | 原生节点＋报告计算；c=0.962–0.993；partial |
| Δ：10/16(τ29)→10/19(τ31) | −1.152 | −0.954 | −0.805 | −0.654 | −0.571 | −0.300 | +0.002 | rolling_tenor_slot_fixed_delta；degraded_local_evidence；含roll；indeterminate_within_uncertainty |

报告计算定义：downside skew25＝put25 IV−call25 IV；put／call wing premium＝各翼IV−ATM；BF25＝(put25＋call25)/2−ATM。它们是fixed-delta相对定价指标，downside skew不等于统计skewness。

**固定顺序拆解：** ATM level三槽均下降；25Δ slope均flattened；BF25 curvature数值均increased，但增幅仅0.034／0.022／0.002vp，均保留“显著性未定”，不能依微小差值排列收益机会。当前skew期限梯度3.184→3.318→3.847vp。put wing premium为1.903／2.124／2.510vp，变化+0.003／−0.105／−0.149；call wing premium为−1.281／−1.194／−1.337vp，变化+0.064／+0.150／+0.152。三槽全部换到期日，尤其约30日从10/16 τ29滚至10/19 τ31，不能称同到期变化或原生fixed-tenor smile。

**策略传导：** 方向价差的卖出翼可减低权利金并封顶收益，但实际候选9/22 smile未被packet选中，不能用9/25翼替代。Butterfly／iron fly／condor需另验中心、曲率与成本后情景盈利区；tail hedge需计算保险成本和路径，不由put翼较贵推导买卖；calendar／diagonal需独立期限与持有模型，当前partial与周末期限差不足以支持relative-value edge。目标日必须刷新真实候选ATM term、25Δ与腿所在wing、spot／forward、Greeks及退出MTM；重大消息、gap、新0DTE、IV或节点移动使旧排序失效。

## 9. Key Expiry / Strike / Dealer Node

**口径。** canonical＝COMBINED／same_date_combined／full_chain；不把pure-family行再加一次。gross gex_1pct＝gex_point×spot×1%；signed使用call−put模型约定，不能据gross正值称dealer实际长Gamma。gamma-table原生金额为1%变动尺度，本节局部节点除以spot×1%后统一为**百万美元／SPX点**；到期总量统一为**B美元／1%变动**。

| Expiry | 日历DTE：T→目标日 | Family / settlement | gross GEX | signed GEX | OI | Durability |
| --- | --- | --- | --- | --- | --- | --- |
| 09/18 | 0 → 已到期 | SPXW／PM | 204.684 | 109.701 | 897,179 | 当日dominant；已到期，不进入周一存续层 |
| 09/21 | 3 → 0 | SPXW／PM | 13.494 | 1.072 | 154,650 | 周一变0DTE，须独立重建 |
| 09/30 | 12 → 9 | SPXW／PM | 27.671 | −4.338 | 923,816 | 月末存续负层 |
| 10/16 | 28 → 25 | SPX AM＋SPXW PM | 53.964 | 3.938 | 2,478,543 | 远端正值与AM贡献分开 |

10/16的AM gross48.633、signed+4.176；PM gross5.331、signed−0.238（B美元／1%），不能将二者拼入主IV曲线。T的9/18 AM行已退出，留下PM到期行；其二阶Vanna／Charm／Volga为null，不能填零。共同cohort30期、目标日后共同29期；本期新增10/27行OI/GEX为0，退出9/17，不解释成新增风险。

| SPX / XSP | Role | Evidence：signed百万美元／点 | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 7500 / 750 | 更深下行背景 | 共同9/30＋10/16：−44.323→−41.874；加本期9/21后−43.987 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7550 / 755 | Base延伸检查 | 共同9/30＋10/16：−7.157→−8.269；加本期9/21后−10.809 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7575 / 757.5 | Base中间检查 | 共同9/30＋10/16：−2.753→−3.352；加本期9/21后−5.013 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7600 / 760 | Base第一复核节点 | 共同9/30＋10/16：−19.555→−22.401；加本期9/21后−25.523 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7625 / 762.5 | 下破确认／core下沿 | 共同9/30＋10/16：−3.844→−4.678；加本期9/21后−11.434 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7645 / 764.5 | 近端周一负层 | 共同9/30＋10/16：0.853→0.713；加本期9/21后−6.633 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7650 / 765 | 已到期巨峰所在；存续负值 | 共同9/30＋10/16：−8.167→−10.351；加本期9/21后−10.880 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7670 / 767 | 周一局部正层 | 共同9/30＋10/16：0.204→0.060；加本期9/21后6.465 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7675 / 767.5 | 上破确认／core上沿 | 共同9/30＋10/16：3.344→1.495；加本期9/21后−0.213 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7700 / 770 | Risk第一复核节点 | 共同9/30＋10/16：−9.832→−12.431；加本期9/21后5.770 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7750 / 775 | Risk延伸检查 | 共同9/30＋10/16：9.912→13.270；加本期9/21后14.309 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 7800 / 780 | 较远上方正层 | 共同9/30＋10/16：24.361→27.162；加本期9/21后27.462 | 共同层＋周一0DTE分拆 | 按§10确认；不是保证支撑／目标 |
| 8000 / 800 | 远端汇总敏感点 | 共同9/30＋10/16：−4.957→84.852；加本期9/21后84.852 | 共同层＋周一0DTE分拆 | 仅在对应路径确认后重估；8000仅背景 |

selected存续地图覆盖完整存续gross的**56.24%**，剔周一后覆盖**52.45%**。selected存续signed为+0.672B，未覆盖到期日合计为−3.365B，完整存续仍为−2.693B；不能用已选地图的正和替代全链。7625–7675为本期no-trade core，7600–7700为外层观察corridor；core仅表示方向释放尚未确认，不否定经独立重新验证的其他payoff。

| Coherent cohort | DEX：B美元 | Vanna：原生1vol bump，B美元 | Charm：下一交易日差，B美元 |
| --- | --- | --- | --- |
| 共同30期 | 42.025→47.373 | 1.458→−1.796 | 2.356→4.314 |
| 目标日后共同29期 | 44.724→50.341 | 1.275→−1.837 | 2.359→5.590 |

Vanna为模型DEX(IV＋0.005)−DEX(IV−0.005)，跨度1个vol point；Volga用同样有限差分作用于模型VEX，存续值10.012B，不能和vendor VEX1.219B混作同一量。Charm在其他输入固定时，从周五PM16:00／AM17:00参考推进到下一交易日同一参考钟点，已经跨越周末，不能再乘3。周一到期Charm−1.276B与其后+5.590B方向相反；实际对冲方向还取决于未观测dealer仓位，以上不是买卖flow预测。

## 10. T+1 Decision Map, Structural View and Plan Grade

Primary regime＝到期后双向脆弱；directional_prior＝two_sided_fragility，path asymmetry＝近端负层使7625下方释放优先，但7675以上修复是独立路径。**Base：7625→7600；Risk：7675→7700。** Plan Grade / Status＝B / Conditional Next-Day Plan，Execution Status＝requires_external_live_source；Quote Portability＝low；setup representation＝candidate_template。两张保留卡的EOD IV dependency为background_only，IV Structure Gate＝not_applicable；实际live surface仍是必要门禁，不能将not_applicable理解成无需IV。

**为何B：** 路径、失效、风险上限及重选方法已定义；IV四项质量失败、候选9/22翼与退出MTM缺口，以及未验证的实时计算能力／数值容差，仍可能改变候选。核心formal合格并可定义封顶风险路径，故不判C；也不因低权利金或到期收益亏损比提高到A。前期与本期均B，变化来自本期结构和窗口，未进行跨版本评级归因。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 7625–7675 core／7600–7700 corridor | 方向条件未满足时观察；range另验O_RANGE | 核心是观察区域，不是自动pin／卖波动 | 无方向入场 | pending；不可用“未跌破”代替有效触发。 |
| 下破7625 | O_DOWN＋O_GAP_DOWN＋O_SIGN_DOWN及共同门禁 | 负向多层一致才有释放假设 | Base F_PUT，首查7600 | O_RECLAIM触发或负层失效。 |
| 上破7675 | O_UP＋O_GAP_UP＋O_SIGN_UP及共同门禁 | 可交易PM与新0DTE共同修复 | Risk F_CALL，首查7700 | O_REJECT触发或修复失效。 |
| 开盘在触发位之外 | 对应gap retest后重新计数 | 不沿用EOD腿追缺口 | 重建后再评估 | 没有对边界的实际重访不追；首价已越下一节点／短腿也不追。 |
| 重大消息／vol reset／node migration | O_RESET、O_VOL、O_NODE | 旧snapshot、计数和排序失效 | 刷新后冻结、重新计数 | 相关事件实际完成，不能只看计划时间已过。 |
| Post-event range reconfirmed | O_RANGE，独立中心／两边界及成本后盈利区包含测试 | 可重新启动range family研究 | 当前fly／condor仍非保留卡 | 至少3根完整bar不单独证明净盈利区成立。 |
| Range thesis failure / boundary release | 边界破坏、中心迁移或盈利区失配 | 原range thesis失效 | 不自动切换方向卡 | 方向必须独立满足其所有条件。 |
| 任一必需能力／风险／报价／估值门禁未满足 | O_CONFIG等共同门禁 | 不能现场确认 | 暂停新增 | 目标日abort不自动改写EOD为C。 |

### 可观察条件与统一计数

| Condition ID | 机械定义／阈值 | 来源、窗口／时效 |
| --- | --- | --- |
| O_RESET / O_CAL | 核实周末实际消息、周一开盘、已到期层剔除和候选有效性；11:00调查普通发布只监测，实际重大冲击才reset。 | 官方日历／消息＋实际经纪商规则；每次入场前。 |
| O_CONFIG | mapping、carry-parity及节点迁移容差必须是有单位的数值，并在t0之前冻结；当前均null，不临时假设已通过。 | 用户／经纪商事先记录；修改须记原因和时点并清零计数。 |
| O_DOWN / O_UP | 连续两根完整5分钟收盘严格＜7625／严格＞7675；相等不算。 | 合格实时SPX源；实时价格延迟≤30秒，bar收盘后评估。 |
| O_GAP_DOWN / O_GAP_UP | 若开盘＜7625，须后续bar实际交易回≥7625，再重新累计下破；若开盘＞7675，须回≤7675再累计上破。 | 同一SPX源；开盘缺口后、计数前。未重访边界不追。 |
| O_SIGN_DOWN | 两次确认收盘均要求：目标日后positive-DTE全链signed＜0、存续SPXW_PM＜0、7625–7600局部＜0、周一新PM 0DTE＜0。 | 相容OI／Greeks计算器；每次图龄≤300秒；不可由价格线替代。 |
| O_SIGN_UP | 两次确认收盘均要求：PM局部7675–7700 signed＞0、新PM 0DTE＞0，整体PM负压较冻结基线收窄或非负，目标日后全链不更负。 | 同方法计算器；≤300秒；远端8000或AM正值不满足PM局部门禁。 |
| O_NODE | 关键节点相对冻结地图移动不得超过ε_node；ε_node为待冻结SPX点数。超阈即重建、清零。 | 节点计算器；每个确认／管理snapshot，≤300秒。 |
| O_VOL | 15分钟内VIX上升≥1.0点，或同候选到期ATM上升≥2.0vp，即触发reset；其余形状重大异常仍复核。 | 实时VIX／同到期IV；逐次管理，所用spot/quote≤30秒。 |
| O_RECLAIM / O_REJECT | 作为失效条件：下行卡一根收盘≥7625且下一完整bar不再交易到7625下；上行卡一根收盘≤7675且下一bar不再交易到7675上。风险限额可要求更早退出。 | SPX完整bar；失效必须持续保持未触发，不能拿失效信号作为正向激活。 |
| O_QUOTES / O_MAPPING | 全腿有效同步；quote age≤30秒；正且有意义mid下spread/mid≤25%。核实abs(XSP−SPX/10)≤ε_map及carry-aligned残差≤ε_parity。 | 经纪商live腿／组合及同到期F、D；容差缺失不能自动pass。近零mid另查绝对tick／成本。 |
| O_SURFACE / O_VALUE | 真实候选到期ATM／25Δ／腿翼刷新；目标、逆向、失效、计划退出四情景清算估值须带时点、IV与成本。净目标情景必须正并留缓冲，到期净最大收益／最大风险≥1。 | 合格live估值平台；重选后、入场前及reset后。不得拿到期内在价值代替日内MTM。 |
| O_BROKER / O_RISK | 确认原子化多腿net-limit、tick与限制；核对实际N、成本、已损失L和存量最大损失H；单setup≤300USD、日限500USD、最多1活动setup、最多1次重入、两次thesis失败停手。 | 实际经纪商与风险账本；每次评估前；不是已核实的可用余额。 |
| O_TIME | deadline＝min(15:30、用户／经纪商更早限制、min(各腿最后可交易时间,当日RTH结束)−30分钟)；latest entry＝deadline−30分钟；time stop＝min(entry＋60分钟,deadline)。 | Cboe与实际经纪商；当前最晚15:00、退出不晚于15:30，遇提前收市／更早限制顺延至更早。 |
| O_RANGE | 至少3根完整5分钟收盘在重新冻结core，中心／边界稳定、无reset；同到期forward及中心误差区间完全位于扣成本的情景盈利区内，并有正缓冲。 | 价格＋节点＋估值工具；最早t0＋15分钟；只重启研究，不额外生成第三张卡。 |

上述风控金额、两／三根bar、30秒、25%、1 VIX点／2vp和60分钟是v1.8 workflow_default，未经alpha校准；宽度3／5、图龄300秒、最低可行持有30分钟和单组成本6–16USD为本报告研究假设。**Base与Risk均最早9/21 09:40、最晚15:00 ET，且实际t0可延后**；若不足30分钟合理持有／退出窗口，取消该分支。11:00普通调查本身不让所有分支统一等到11:00之后。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

保留两种方向价差只是**structural fit成立的条件候选**；两者pricing_assessment＝pending_live_repricing，edge_evidence_status＝not_established，execution feasibility＝external_required。没有经校准的现实概率，因此没有expected P&L或胜率。

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base下行 | directional / put debit vertical | 表达7625→7600 | EOD IV background_only；live本期翼必需 | 目标清算值／成本待验 | conditional | 实际Sep22候选翼和7600清算MTM待验 |
| Risk上行 | directional / call debit vertical | 表达7675→7700 | 同上；不能借用其他到期smile | 目标清算值／成本待验 | conditional | 实际Sep22候选翼和7700清算MTM待验 |
| 方向替代研究 | broken-wing butterfly | 可封顶的非对称替代 | 依赖实际曲率与尾翼 | 缺尾部和MTM比较 | not_screenable | 局部曲率/尾部净值及成本比较未具备 |
| 中心稳定复核 | debit butterfly / defined-risk iron fly | 到期巨峰不能证明中心 | 依赖曲率与中心误差 | 须净盈利区包含测试 | reject | 须独立中心确认和净情景盈利区包含中心误差 |
| 双边区间复核 | defined-risk condor | core不证明两侧边界稳定 | 依赖两翼／尾部相对成本 | 独立两边界和盈利区测试 | reject | 须两边界独立确认、尾部/盈利区和成本测试 |
| 双侧脆弱复核 | long straddle / strangle | 可讨论两侧运动 | 须净幅度与时间／IV模型 | 未知成本后所需运动 | not_screenable | 无足够净幅度/时间/成本证据，非自动双买 |
| 本期范围检查 | calendar / diagonal | 不同持有期模型 | partial不能证明期限套利 | 本期不保留 | not_applicable | partial及周末年化差不是期限套利证据；超出日内方向计划 |

### Local Candidate Comparison

| Candidate rule / illustrative EOD example | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F_PUT：long762/763/764，short＝long−3或−5；1:1 | range包含测试not_applicable；须自身目标／退出MTM | 9/22默认1DTE；9/21、9/23仅比较；实际翼待验 | N=1、C=16、历史ask风险54–137USD，仅粗略规模；live四情景pending | 示例Δ−、Γ＋、Vega＋、Theta−，重选后重算 | 报价与成本差异不做细排名 | low | 18组；winner=null；deferred_to_t1 |
| F_CALL：long767/768/769，short＝long＋3或＋5；1:1 | range包含测试not_applicable；须自身目标／退出MTM | 9/22默认1DTE；9/21、9/23仅比较；实际翼待验 | N=1、C=16、历史ask风险64–203USD，仅粗略规模；live四情景pending | 示例Δ＋、Γ＋、Vega＋、Theta−，重选后重算 | 报价与成本差异不做细排名 | low | 18组；winner=null；deferred_to_t1 |

### Base Candidate Template — Base Case

| Card field | Base／F_PUT |
| --- | --- |
| Setup / suitability | put debit vertical；directional_continuation；screening_status=conditional。仅用于确认后的下行释放。 |
| 期限／持有 | 默认9/22，目标周一1日历DTE；9/21日内持有，最多60分钟且不越§10 deadline。 |
| 候选规则 | live触发锚7625／XSP 762.5；最近上市long及上下各一档，short在long下方3或5点；1:1，无body。事件／节点／IV重置后重新center、strike和比较，不继承历史腿。 |
| 激活／失效 | O_DOWN＋O_GAP_DOWN＋O_SIGN_DOWN；O_RECLAIM不得触发。还须全部共同门禁；完整定义见§10，取消清单见§12。 |
| Term / wing / Greeks | 9/22本期ATM、25Δ与实际两腿翼待live；不得外借选定smile。示例Δ=-0.1854、Γ=+0.0260、Vega=+0.0967、Theta=-0.0385，均为vendor单份long−short原生口径、未乘N或100；仅方向诊断。 |
| illustrative_eod_example | 买入1×put 763（XSP260922P00763000；映射SPX 7630；相对触发锚差+0.5 XSP点）；卖出1×put 758（XSP260922P00758000；映射SPX 7580；相对自身参考位差0）；仅9/22到期历史示例。组合bid/mid/ask＝0.810/0.850/0.890点，synthetic_only；客户debit。 fixed_legs_authority=candidate_template_only；live selected legs=pending；N=1仅unit_payoff_example。 |
| EOD到期payoff敏感性 | 历史保守ask、C=6／16USD：最大损失95／105USD，最大收益405／395USD；到期BE 762.05／761.95。利润区在成本后BE之下。不等于计划退出盈利区。 |
| 风险／live限价 | 实际ML、MP、d_risk及d_live遵循三层公式；上限≤300USD并受日余额约束。最大尾损失为完整defined-risk payoff加费用；中途stop执行价并无保证。 |
| 情景估值／pricing | 四情景见下表；pending_live_repricing / not_established / external_required。费用、N、live清算值、概率均未知。 |
| 复核／why this family | 先在7600复核清算价值；只有结构与价值均仍支持时再研究7575／7550。卖出较远期权减低权利金并封顶收益；其优于单买的条件是目标路径下成本收益更合适，尚未证实。 |
| Why it may fail | 方向正确但速度太慢、IV下降／翼重定价、短腿压制收益或费用过高仍可亏损；重大gap可能越过节点，不能追价补救。 |

### Risk-Path Contingency

| Card field | Risk／F_CALL |
| --- | --- |
| Setup / suitability | call debit vertical；directional_continuation；screening_status=conditional。仅用于独立确认后的上行修复；不是Base替代持仓。 |
| 期限／持有 | 默认9/22，目标周一1日历DTE；9/21日内持有，最多60分钟且不越§10 deadline。 |
| 候选规则 | live触发锚7675／XSP 767.5；最近上市long及上下各一档，short在long上方3或5点；1:1，无body。事件／节点／IV重置后重新center、strike和比较，不继承历史腿。 |
| 激活／失效 | O_UP＋O_GAP_UP＋O_SIGN_UP；O_REJECT不得触发。还须全部共同门禁；完整定义见§10，取消清单见§12。 |
| Term / wing / Greeks | 9/22本期ATM、25Δ与实际两腿翼待live；不得外借选定smile。示例Δ=+0.2497、Γ=+0.0262、Vega=+0.1573、Theta=-0.1999，均为vendor单份long−short原生口径、未乘N或100；仅方向诊断。 |
| illustrative_eod_example | 买入1×call 768（XSP260922C00768000；映射SPX 7680；相对触发锚差+0.5 XSP点）；卖出1×call 773（XSP260922C00773000；映射SPX 7730；相对自身参考位差0）；仅9/22到期历史示例。组合bid/mid/ask＝1.220/1.255/1.290点，synthetic_only；客户debit。 fixed_legs_authority=candidate_template_only；live selected legs=pending；N=1仅unit_payoff_example。 |
| EOD到期payoff敏感性 | 历史保守ask、C=6／16USD：最大损失135／145USD，最大收益365／355USD；到期BE 769.35／769.45。利润区在成本后BE之上。不等于计划退出盈利区。 |
| 风险／live限价 | 实际ML、MP、d_risk及d_live遵循三层公式；上限≤300USD并受日余额约束。最大尾损失为完整defined-risk payoff加费用；中途stop执行价并无保证。 |
| 情景估值／pricing | 四情景见下表；pending_live_repricing / not_established / external_required。费用、N、live清算值、概率均未知。 |
| 复核／why this family | 先在7700复核清算价值；只有结构与价值均仍支持时再研究7750。卖出较远期权减低权利金并封顶收益；其优于单买的条件是目标路径下成本收益更合适，尚未证实。 |
| Why it may fail | 方向正确但速度太慢、IV下降／翼重定价、短腿压制收益或费用过高仍可亏损；重大gap可能越过节点，不能追价补救。 |

两张示例均为XSP欧式、现金结算、乘数100USD／点；正常目标日非到期合约RTH到16:15 ET，9/22到期腿最后交易16:00 ET，另受实际broker限制。本计划仍取周一15:30或更早退出上限。[XSP产品规格](https://www.cboe.com/tradable-products/sp-500/xsp-options/specifications)、[行权与结算说明](https://www.cboe.com/tradable_products/sp_500/mini_spx_options)

### 四种持有时点情景与限价协议

| Card | Scenario | Spot assumption | Elapsed time / exit | IV / wing sensitivity | Liquidation value / net P&L |
| --- | --- | --- | --- | --- | --- |
| F_PUT | Base／首个复核 | 760 XSP | 30min after entry | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |
| F_PUT | Adverse | 767.5 XSP | 15–30min adverse path | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |
| F_PUT | Invalidation | 762.5 XSP | Actual reclaim/rejection time | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |
| F_PUT | planned-exit | pending现场路径 | Earliest of entry+60min and session/broker limit | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |
| F_CALL | Base／首个复核 | 770 XSP | 30min after entry | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |
| F_CALL | Adverse | 762.5 XSP | 15–30min adverse path | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |
| F_CALL | Invalidation | 767.5 XSP | Actual reclaim/rejection time | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |
| F_CALL | planned-exit | pending现场路径 | Earliest of entry+60min and session/broker limit | 本期ATM 0／±2vp＋不利翼变动；情景假设非概率 | pending；N／d／C／V_exit／净PnL／probability均null |

上述spot是情景输入，不是预期终点；Base下行的Adverse为767.5，上行的Adverse为762.5。目标值必须按**实际清算时点剩余期限**估值，并加入保守退出价与费用；没有合格live估值工具时继续pending，不手工重建曲面、不用到期intrinsic代替MTM，也不等权猜情景概率。

EOD reference仅用于粗略诊断，不是T+1 expected entry或binding limit。目标日完成重选后，优先从经复核的原生组合mid附近用net limit评估，只按允许tick改善且不突破d_live。若只有同步单腿报价，标记synthetic_only；只有经纪商原子化multi-leg net-limit能力、全腿和保守净价边界均可核验，才可提高审查等级后人工评估。缺少公开native complex NBBO不自动否决，但不得拆腿追单、假定展示价能同时成交。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

条件：7625下方接受、对应gap回抽及负向四层确认，且共同门禁全部满足。路径：先在7600重估，后续7575／7550只在持续条件成立时考虑；绑定**Base F_PUT**。重新收复7625或必要负层失效，按§10失效定义退出／取消；不把核心内的小幅下探算触发。

### Risk Case

条件：7675上方接受、对应gap回踩及PM修复门禁成立。路径：先在7700重估，其正值较依赖周一层，不能预设穿越；后续7750同样需要再估值。绑定**Risk F_CALL**，两卡不同时持有。拒绝7675或修复条件失效即取消／退出。

### No-Trade Case

**EOD no-qualified-plan**只在核心formal硬失败、无法定义有证据的路径／失效、或没有可封顶风险且可重筛的family时成立；本期尚未触及。未来值pending、low portability、固定EOD腿不可迁移、缺少公开native NBBO均不单独构成EOD判C的理由。

**目标日execution abort：**

- 接受／所需跳空重访尚未完成；相关重大事件、vol或节点reset未完成；参数尚未冻结。
- 必需live源、相容signed/map计算器、候选surface、四情景清算估值或原子化net-limit能力无法取得；禁止临时降为价格独立策略。
- 全腿身份／ratio／bid-ask／时标无效，quote age／width不合格，mapping或carry-parity超出事前容差；近零mid未完成绝对成本审查。
- 第一可评估价格已经越过相应short strike或第一复核节点，目标净情景不足以覆盖debit、全部成本和正缓冲，或live价格边界无可行值。
- 实际剩余预算不足、已有活动setup、超过重入次数或两次thesis失败；无法保留合理持有／退出窗口。
- 所选结构出现裸露风险、合约状态／到期不明，或需要把日内计划转为未经授权的隔夜持仓。

重新考虑前必须记录实际变化，重新snapshot、冻结参数、计数、重选与重估，并仍满足最晚入场及退出窗口；失败信号、中心移动或range边界释放不会自动激活另一张卡。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | Effect on view / grade / execution |
| --- | --- | --- |
| 新周一0DTE与完整PM／目标日后signed | 区分已到期峰值、新流入结构和持久负压 | 改变路径排序；计算能力缺失只阻止执行，不伪造负值。 |
| 7625／7675接受与7650／7600共同节点 | 总量改善尚未覆盖近端；节点可能迁移 | 决定Base／Risk是否可研究；迁移先reset。 |
| 实际9/22 ATM／25Δ／翼与净目标清算值 | 方向正确不等于价差获利 | 决定pricing assessment与d_live；partial改善不自动授予edge。 |
| 周末实际消息、gap、11:00实际反应 | 决定是否从low降none、是否重置 | 只对有重大影响依据的分支重置，不等待全部普通日历事项。 |
| 实时组合、容差、broker与风险账本 | EOD无法证明可成交或预算可用 | 决定Execution Status；保持一个活动setup及日内退出。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
