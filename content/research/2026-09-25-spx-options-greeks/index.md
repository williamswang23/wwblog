+++
title = "SPX期权持仓与Greeks结构分析-260924"
date = "2026-09-25"
data_as_of = ["2026-09-23", "2026-09-24"]
draft = false
description = "分析9月24日晚间SPX期权存续结构、PM与AM分歧及9月25日的条件计划。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "085158fc6e5d5bf73210c0653efad895f00ce38ba5e98c7aaf40cde6be8744bc"
+++

# SPX期权持仓与Greeks结构分析-260924

## 1. 结论

9月24日官方SPX近乎平收，晚间期权快照显示PM缓冲改善、AM转弱，9月25日采用**低置信度区间观察（range_bias）**：7700–7750内Base不建仓，边界外只保留互斥的方向应急模板；计划 **B / Conditional Next-Day Plan**，执行状态 **requires_external_live_source**。本稿的信息截止已处于目标日GTH，只为尚未开始的RTH准备，不是实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | range_bias、低置信度；先观察7700–7750，7700正支撑依赖目标0DTE；不等于可卖出的盈利区。 |
| Earliest evaluation | 9/25 ET最快09:40：09:30完成live冻结后至少两根完整5分钟bar；数据、回测或实际冲击使时间顺延。 |
| Base activation | Base=none；iron fly／condor缺候选正式wing与成本后盈利区。区间重确认只启动研究，须重新通过family筛选，不能直接建仓。 |
| Downside branch | 7700下方接受＋新0DTE／局部转负＋全PM与剔目标层不改善，才评估put debit vertical；首查7675，再7650；收复7700或弱结构消失则取消。 |
| Upside branch | 7750上方接受＋新0DTE／局部为正＋全PM为正且不恶化、剔目标层非负，才评估call debit vertical；首查7800，再7850；拒绝7750或正结构失效则取消。 |
| Otherwise | 观察／No Trade；两条Risk互斥，不追越过首节点或short的行情；正常15:00后不新入、15:30或更早限制前退出，reset后重新确认。 |

Plan Grade B；Plan Status Conditional Next-Day Plan；Execution Status requires_external_live_source；planning_only=true。盘后条件计划、非实时下单指令，交易决定由人工作出。

## 3. Executive Summary

- **转正来自不同层，不能合并解释。** 全链signed为+26.651B，其中过期9/24残留+19.662B；剔除后仅+6.990B，再剔9/25为+4.717B美元／SPX变动1%。
- **共同PM改善，AM转负。** 相同存续集合的PM由+6.465B至+7.432B，AM由+3.036B至-0.442B；整体缓冲仍下降，区间判断置信度低。
- **7700正支撑偏短。** 目标9/25层signed为+12.798百万美元／点，更久selected层为−2.665百万美元／点；若新0DTE转弱，不能继续依赖晚间正节点。
- **3D降波与同到期升波同时存在。** fixed3D下降1.177vp，9/25和9/28同到期ATM却分别上升1.095／0.168vp；期限组成与权重变化是主要解释约束。
- **区间观察不自动生成卖方交易。** 两个候选到期日均缺正式selected smile翼部；Base=none，只有下破7700和上收7750的Risk价差模板，首复核7675／7800。
- **周五重新选腿。** 默认9/28到期、目标日3个日历DTE，9/25的0DTE仅作战术比较；报价权限low，四情景MTM、成本、风险账本与经纪商能力须核实，周五日内退出。

## 4. What Changed vs. T-1 and Prior Playbook Review

| Dimension | T-1：9/23 | T：9/24 | Change / basis | T+1 relevance |
| --- | --- | --- | --- | --- |
| 官方SPX；raw结构代理 | 7706.03；7706.90 | 7704.13；7704.30 | 官方−0.0247%；raw-0.0337% | 官方前值取本期价格序列；raw由前期16:00变本期20:21，非同钟日收益 |
| 共同31期gross／signed | 238.717／+9.501 | 254.714／+6.990 | gross+6.701%；signed-2.511B | expirations>9/24共同集合；不是资金流 |
| 共同PM／AM signed | +6.465／+3.036 | +7.432／-0.442 | 十亿美元／1% move | PM改善不足以抵消AM转弱 |
| 共同更久节点7700／7750 | -10.152／+15.373 | -2.665／+20.805 | 百万美元／点；9/30＋10/16 | 7700负值收窄，7750正节点增强；本期目标0DTE另列 |
| fixed3D／7D ATM | 12.288%／11.836% | 11.111%／12.304% | −1.177／+0.468vp | 3D权重迁移；同到期及smile分解见第8节 |
| 结构／Base／计划／报价 | downside_bias／put／B／low | range_bias／none／B／low | 同v1.8；等级未变 | 方向Base撤下，两边突破作为Risk；无方法版本重述 |

## 5. T 日盘面、字段时点与 Event-Risk Overlay

**当日新闻背景。** 精确网页可得时点及更新版本未归档，以下两项均为availability_unverified／background_only；官方日历的预计发布时点不能替代实际可得证据。

1. 9月24日公布的8月新屋销售为年化68.4万套，环比+6.4%；该环比增幅的90%置信区间为6.4%±19.5个百分点，库存约48.3万套、8.5个月。 需求与住房融资成本构成后续利率数据的背景。 变动未显著区别于零；不是日内价格或波动变化的因果证据。 精确网页可得时点未归档，仅日期级背景。 [Census / HUD](https://www.census.gov/construction/nrs/current/)。 [调查置信区间口径](https://www.census.gov/construction/soc/methodology.html)。

2. 9月SCOOS显示，证券融资及OTC交易的价格与非价格条款整体净变化不大；调查覆盖6月至8月，访问在8月11–24日进行。 为杠杆和融资条件提供滞后背景。 调查不是9月24日实时资金流，不证明交易商当天加减仓。 精确网页可得时点未归档，仅日期级背景。 [Federal Reserve](https://www.federalreserve.gov/data/scoos/scoos-202609.htm)。

| 未来常规交易日／ET | 已核日历安排 | 处理 |
| --- | --- | --- |
| 9/25 08:30 | 耐用品订单 | RTH前审核实际结果及隔夜状态；monitoring_only |
| 9/25 10:00；12:45 | 密歇根调查终值；纽约联储Staff Nowcast | monitoring_only；实际跳空、IV或流动性冲击才重置 |
| 9/28 10:30；11:00 | Dallas制造业调查；SCE公共政策调查 | 周一候选到期前的背景，计划仍周五退出 |
| 9/29 10:00；10:30 | 消费者信心／JOLTS；Dallas零售展望 | 第三个RTH日背景；9/29在目标日为4DTE，排除默认窗口 |

来源：[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[Census发布日历](https://www.census.gov/economic-indicators/calendar-listview.html)、[美联储日历](https://www.federalreserve.gov/newsevents/2026-september.htm)。9/25、28、29均为正常RTH。未识别计划入场前须预设为hard_reset的安排；日历不覆盖全部突发消息。GDP／PCE安排在9/30；9/24新屋销售与SCOOS已是背景，不能滚成周五未来事件。包内event_light只涉及OpEx。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 全链转正不代表存续层全面修复

**Claim：** 全链转正不代表存续层全面修复。

**Evidence / basis：** 全链signed由-32.236变+26.651B，但本期过期残留贡献+19.662B；共同31期signed+9.501→+6.990B，PM+6.465→+7.432B，AM+3.036→-0.442B。

**Mechanism / assumptions：** 剔到期和固定共同集合可控制组成迁移，无法剥离IV、aging、spot与OI变化；全链正值亦含已到期残留。

**T+1 Implication：** 撤下单边Base，采用低置信度range观察；两边界外再独立确认。

**Falsifier：** PM缓冲消失、边界迁移或新0DTE大幅重排。

**Confidence：** low；机制判断，empirical_validation_status=not_tested，无校准胜率。

### Thesis 2 — 7700的正支撑依赖目标到期层

**Claim：** 7700的正支撑依赖目标到期层。

**Evidence / basis：** 7700目标9/25层+12.798百万/点，更久9/30+10/16层-2.665；共同更久层前值-10.152。7750/7800更久层+20.805/+37.902。

**Mechanism / assumptions：** 两层相反限制方向外推；近端正gamma可能减弱短线振幅，失效后耐久负节点可能放大穿越，但均为模型机制。

**T+1 Implication：** 区间内观察；下破先查7675，上破先查7800，首节点是重新估值而非保证盈利。

**Falsifier：** RTH新0DTE或local sign不满足独立门禁、首节点已越过。

**Confidence：** low；机制判断，empirical_validation_status=not_tested，无校准胜率。

### Thesis 3 — fixed3D下降主要受组成和权重变化影响

**Claim：** fixed3D下降主要受组成和权重变化影响。

**Evidence / basis：** fixed3D由12.288%降至11.111%（−1.177vp），但共同9/25和9/28 ATM分别+1.095/+0.168vp；7/14/30/45D分别+0.468/+1.128/+0.560/+0.500vp。

**Mechanism / assumptions：** 3D权重由1/3升至0.727226，更偏向低IV的周一；同到期也含28小时21分37秒老化。7/14D原生observed槽位允许±0.25天近邻，本期tau6.818/13.818，非重新插值的精确期限。

**T+1 Implication：** 不把fixed3D下降解释成周五风险保费全面下降；9/28默认3calendarDTE仍只作候选，需own live wings和MTM。

**Falsifier：** 实时候选价差未覆盖成本、wing或流动性冲击。

**Confidence：** low；机制判断，empirical_validation_status=not_tested，无校准胜率。

### Thesis 4 — 平收、VIX与长端利率上行提供互相制约的背景

**Claim：** 平收、VIX与长端利率上行提供互相制约的背景。

**Evidence / basis：** 官方SPX7706.03→7704.13（−0.0247%）；VIX15.18→15.67；Treasury2Y/10Y分别+2/+7bp；共同DEX+230.757→+230.147B，Vanna+0.958→+2.708B。

**Mechanism / assumptions：** 日度共变没有因果识别；Vanna/Charm是模型状态差，不是实际对冲流。早段GTH快照与官方日盘收盘必须分开。

**T+1 Implication：** 保持低置信度，价格、独立地图和候选估值共同决定是否评估应急路径。

**Falsifier：** 把signed/OI变化当成交方向，或把16:00→20:21变化当固定24小时实验。

**Confidence：** low；机制判断，empirical_validation_status=not_tested，无校准胜率。

## 7. Conflicting Evidence, Confidence and What Changes the View

| 冲突 | 如何处理 | 改变判断的条件 |
| --- | --- | --- |
| PM改善，AM转负、共同总signed下降 | 以低置信度区间观察处理，不把任何单层变动外推为全市场方向 | 新0DTE及PM同口径恶化并下破7700，或正层确认且上破7750 |
| 7700目标层正、更久层负 | 正支撑具有到期依赖；局部地图不是完整gamma曲线 | RTH新图符号反转、关键位迁移超事前容差 |
| 官方近乎平收，VIX／多数IV与长端利率升高 | 说明风险定价与现货表现不同步，没有识别新闻因果贡献 | 新价格路径、独立结构和live情景价值给出一致信号 |
| range_bias，但区间family未获准 | 观察带没有自动转换成成本后盈利区；Base none | 必须重新通过候选wing、中心稳定与净profit-region测试 |
| 晚间快照显示改善，盘中过程未知 | 不把刷新时间当真实成交证明，不推断前期策略盈利 | 新增证据在新的明确cutoff下另行评估 |

总体结构置信度low，path_asymmetry_status=balanced：中间先观察，边界外才比较方向路径；7700较短期支撑与更久负层构成潜在下侧脆弱性。上述不对称来自机制推断，未经概率或收益检验。执行条件失效会取消候选，不能反过来证明历史结构分析失败。

## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | Positive time | ATM IV | T vs. T-1 change / basis | Event / settlement | Method / quality |
| --- | --- | --- | --- | --- | --- |
| 09/25 | τ2.000→0.818天 | 15.269% | +1.095vp；same_expiry_atm | 目标0DTE／周五数据；3D下端；PM | k0局部总方差插值；观测包围；confidence=0.988；partial |
| 09/28 | τ5.000→3.818天 | 10.707% | +0.168vp；same_expiry_atm | 默认候选目标3DTE／3D上端；PM | k0局部总方差插值；观测包围；confidence=0.985；partial |
| 09/30 | τ7.000→5.818天 | 13.235% | +1.399vp；same_expiry_atm | 前7D源／EOM、GDP与PCE；PM | k0局部总方差插值；观测包围；confidence=0.989；partial |
| 10/01 | τ8.000→6.818天 | 12.304% | +1.062vp；same_expiry_atm | 当前7D源；PM | k0局部总方差插值；观测包围；confidence=0.992；partial |
| 10/07 | τ14.000→12.818天 | 12.075% | +0.971vp；same_expiry_atm | 前14D源；PM | k0局部总方差插值；观测包围；confidence=0.991；partial |
| 10/08 | τ15.000→13.818天 | 12.232% | +0.983vp；same_expiry_atm | 当前14D源；PM | k0局部总方差插值；观测包围；confidence=0.989；partial |
| 10/16 | τ23.000→21.818天 | 12.669% | +0.742vp；same_expiry_atm | 最大gross到期的PM层；PM | k0局部总方差插值；观测包围；confidence=0.986；partial |
| 10/23 | τ30.000→28.818天 | 12.750% | +0.648vp；same_expiry_atm | 前30D源／当前30D下端；PM | k0局部总方差插值；观测包围；confidence=0.987；partial |
| 10/26 | τ33.000→31.818天 | 12.539% | +0.632vp；same_expiry_atm | 当前30D上端；PM | k0局部总方差插值；观测包围；confidence=0.987；partial |
| 11/02 | τ38.860天 | 13.344% | unavailable；prior_node_unavailable | 新增期限，前期ATM缺失；PM | k0局部总方差插值；观测包围；confidence=0.987；partial |
| 11/06 | τ44.042→42.860天 | 13.553% | +0.519vp；same_expiry_atm | 45D下端，含DST；PM | k0局部总方差插值；观测包围；confidence=0.988；partial |
| 11/13 | τ51.042→49.860天 | 13.645% | +0.292vp；same_expiry_atm | 45D上端；PM | k0局部总方差插值；观测包围；confidence=0.990；partial |
| 3D fixed | 原生3D槽位 | 11.111% | -1.177vp；fixed_tenor_atm | 同一PM范围；来源见右列 | P:09/25–09/28(τ2.000–5.000,w=0.333333)；T:09/25–09/28(τ0.818–3.818,w=0.727226)；interpolated，无外推；confidence=0.985；partial |
| 7D fixed | 原生7D槽位 | 12.304% | +0.468vp；fixed_tenor_atm | 同一PM范围；来源见右列 | P:09/30–09/30(τ7.000–7.000,w=0.000000)；T:10/01–10/01(τ6.818–6.818,w=0.000000)；observed，无外推；confidence=0.992；partial |
| 14D fixed | 原生14D槽位 | 12.232% | +1.128vp；fixed_tenor_atm | 同一PM范围；来源见右列 | P:10/07–10/07(τ14.000–14.000,w=0.000000)；T:10/08–10/08(τ13.818–13.818,w=0.000000)；observed，无外推；confidence=0.989；partial |
| 30D fixed | 原生30D槽位 | 12.662% | +0.560vp；fixed_tenor_atm | 同一PM范围；来源见右列 | P:10/23–10/23(τ30.000–30.000,w=0.000000)；T:10/23–10/26(τ28.818–31.818,w=0.393893)；interpolated，无外推；confidence=0.987；partial |
| 45D fixed | 原生45D槽位 | 13.584% | +0.500vp；fixed_tenor_atm | 同一PM范围；来源见右列 | P:11/06–11/13(τ44.042–51.042,w=0.136905)；T:11/06–11/13(τ42.860–49.860,w=0.305716)；interpolated，无外推；confidence=0.988；partial |

**期限形状。** report-layer calculation from packet nodes：mixed，周五15.269%的ATM高于周一10.707%，其后并非单调。3D−30D=-1.551vp，7D−30D=-0.358vp，14D−30D=-0.430vp，45D−30D=+0.922vp。31个共同exact ATM全部上升，仅新增11/2没有前期主范围ATM；事件、周末、老化和报价状态同时影响节点，不能识别单项事件方差。

**3D下降的含义。** bracket仍是9/25–9/28，前期τ为2／5天、本期0.818322／3.818322天；较低IV的周一权重从1/3升至0.727226。因此fixed3D的−1.177vp不能覆盖9/25同到期+1.095vp和9/28同到期+0.168vp。共同合约比较含28小时21分37秒的aging，尚未识别纯repricing贡献。

**原生fixed槽位也有时间容差。** 上游允许距目标≤0.25天的observed节点直接入槽；当前7D和14D分别取10/1的τ6.818322、10/8的τ13.818322。仍按合同标记fixed_tenor_atm，但不是重新构建的精确7／14天曲线。30D由10/23单点转为10/23–10/26插值，45D仍11/6–11/13、权重0.136905→0.305716，保留DST。各自同到期对照见表，不能把源期限迁移全称为重新定价。

Fixed节点的no_extrapolation=true、source bracket、weight、support与confidence原样保留。总方差w(τ)=σ(τ)²τ，区间内对w插值后除以τ开方；此处只解释packet结果，不重建或补点。Exact ATM使用forward log-moneyness k=0局部总方差插值；T0不进入正τ曲线。尚未产生的是目标RTH刷新，不把已有早段GTH快照写成尚未发生。

### Selected-Expiry Skew / Smile and T vs. T-1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T:10/01／约7D | 17.558% | 14.352% | 12.304% | 11.298% | 11.152% | 3.054vp | 0.521vp | forward delta观测支持内插值；confidence0.952–0.992；degraded_local_evidence |
| Δ P:09/30(τ7.000)→T:10/01(τ6.818) | +1.731vp | +0.865vp | +0.468vp | +0.355vp | +0.467vp | +0.510vp | +0.142vp | rolling_tenor_slot_fixed_delta；同scope及节点定义；降级局部证据；materiality=indeterminate_within_uncertainty |
| T:10/08／约14D | 17.493% | 14.339% | 12.232% | 11.056% | 10.534% | 3.283vp | 0.465vp | forward delta观测支持内插值；confidence0.938–0.989；degraded_local_evidence |
| Δ P:10/07(τ14.000)→T:10/08(τ13.818) | +1.439vp | +1.225vp | +1.128vp | +1.046vp | +0.843vp | +0.179vp | +0.007vp | rolling_tenor_slot_fixed_delta；同scope及节点定义；降级局部证据；materiality=indeterminate_within_uncertainty |
| T:10/23／约30D | 19.371% | 15.253% | 12.750% | 11.415% | 10.937% | 3.838vp | 0.584vp | forward delta观测支持内插值；confidence0.941–0.989；degraded_local_evidence |
| Δ P:10/23(τ30.000)→T:10/23(τ28.818) | +0.869vp | +0.668vp | +0.648vp | +0.623vp | +0.515vp | +0.045vp | -0.002vp | same_expiry_fixed_delta；同scope及节点定义；降级局部证据；materiality=indeterminate_within_uncertainty |

**Level → slope → curvature。** 三个槽位ATM均上移；7D／14D downside skew分别+0.510／+0.179vp，BF25分别+0.142／+0.007vp；30D同10/23合约的skew仅+0.045、BF25约−0.002vp，后两项近乎不变，不能写成全面凸性上升。Skew25=IV25put−IV25call，BF25=(IV25put+IV25call)/2−ATM，wing premium=wing−ATM。

7D put-wing2.048vp（Δ+0.397），call-wing-1.006vp（Δ-0.113）；14D put-wing2.107vp（Δ+0.097），call-wing-1.176vp（Δ-0.082）；30D put-wing2.503vp（Δ+0.020），call-wing-1.335vp（Δ-0.024）。

Skew期限梯度14D−7D由+0.560至+0.229vp，30D−14D由+0.689至+0.555vp。7／14D比较含expiry roll，30D为same_expiry_fixed_delta且含aging。统一采用forward_delta_non_premium_adjusted；packet没有fixed-tenor delta-smile，不声称fixed_tenor_fixed_delta变化。报价误差和统计显著性未校准。

**策略传导。** 9/25与9/28有ATM，但无正式selected smile；方向Risk的EOD IV仅background_only，gate=not_applicable不免除live自身ATM／25Δ／long与short翼及MTM。Fly／condor／BWB／双侧扩张需要的候选翼未覆盖，required gate=fail，不能借10/1的7D曲线。Calendar还缺跨期估值与持有依据。Formal30D12.6622%与RV20 10.6630%相差1.9992vp，窗口、测度与时钟不同，不是已证明可获取的variance risk premium。

## 9. Key Expiry / Strike / Dealer Node

期限表单位：**十亿美元／SPX变动1%**。Gross=call+put规模；signed=call−put模型代理，未观察到真实dealer账簿。使用canonical COMBINED汇总，AM／PM拆分不重复计入。

| Expiry / family | Role | T DTE→目标DTE | Gross GEX | Signed GEX | Vendor OI |
| --- | --- | --- | --- | --- | --- |
| 09/24 / COMBINED | 已过期残留，前瞻剔除 | 0→-1 | +35.169 | +19.662 | 315,340 |
| 09/25 / COMBINED | 目标0DTE，RTH须重建 | 1→0 | +35.699 | +2.273 | 691,023 |
| 09/28 / COMBINED | 默认候选，跨周末 | 4→3 | +12.771 | -1.044 | 162,163 |
| 09/30 / COMBINED | EOM／共同selected | 6→5 | +37.213 | -0.689 | 1,019,786 |
| 10/16 / COMBINED | 最大gross；mixed | 22→21 | +68.179 | -0.025 | 2,666,754 |
| 10/16 / SPX | AM拆分 | 22→21 | +60.671 | -1.014 | 2,327,280 |
| 10/16 / SPXW | PM拆分 | 22→21 | +7.507 | +0.989 | 339,474 |
| 11/02 / COMBINED | 新期限，OI／GEX为0 | 39→38 | +0.000 | +0.000 | 0 |

全链gross289.883B，signed+26.651B；过期9/24占gross12.13%，必须删除。剔除后gross254.714B／signed+6.990B；再剔目标9/25为219.014B／+4.717B。10/16占全链gross23.52%、存续26.77%；9/25占存续14.02%。

各自剔T0的signed是前期+8.078→本期+6.990B，因组成不同不作纯日变化；共同31期为+9.501→+6.990B；共同目标日仍正DTE的30期为+6.954→+4.717B。新11/2为零OI／GEX，对总量无贡献，但其IV节点仍可独立存在。

**节点尺度。** 原始gamma table在1%尺度：gex_point=gex_dealer/(0.01×7704.30)，gross同样换算；下表单位**百万美元／SPX点**。本期没有9/24的strike层，因此其节点列unavailable而非0。当前selected是9/25＋9/30＋10/16；共同更久图仅用9/30＋10/16。没有完整spot-gamma曲线，不能计算或宣称gamma flip。

| SPX/XSP映射参考 | 作用 | 过期9/24 | 目标9/25 | 更久selected | 全部存续selected |
| --- | --- | --- | --- | --- | --- |
| 7600/760 | 远端负节点 | unavailable | -9.445 | -21.495 | -30.939 |
| 7650/765 | 下侧第二复核 | unavailable | -14.426 | -12.991 | -27.418 |
| 7675/767.5 | 下侧第一复核 | unavailable | +0.914 | +1.673 | +2.587 |
| 7700/770 | 下侧确认边界，目标层正/耐久层负 | unavailable | +12.798 | -2.665 | +10.133 |
| 7705/770.5 | 近价层观察，无T0 strike重建 | unavailable | +1.522 | -0.353 | +1.168 |
| 7710/771 | 近价局部负节点 | unavailable | +0.691 | -1.974 | -1.283 |
| 7725/772.5 | 观察带中间节点 | unavailable | +11.709 | +3.501 | +15.210 |
| 7750/775 | 上侧确认边界 | unavailable | +9.713 | +20.805 | +30.518 |
| 7775/777.5 | 上侧途中节点 | unavailable | +3.545 | +5.199 | +8.744 |
| 7800/780 | 上侧第一复核 | unavailable | +5.514 | +37.902 | +43.416 |
| 7850/785 | 上侧第二复核 | unavailable | +0.805 | +19.254 | +20.058 |
| 7900/790 | 远端正节点 | unavailable | +3.105 | +30.167 | +33.272 |

selected存续gross覆盖55.39%，剔目标后覆盖48.12%；因此本期9/25节点不能与前期未导出的9/25 strike层硬作日变化。7700全selected+10.133主要来自目标层；7675较长期+1.673只是第一复核，不能保证止跌；7750／7800正节点也可能抑制上行速度，不是价格吸引承诺。

**其余Greeks。** 共同+230.757→+230.147B，状态非流量；共同+0.958→+2.708B；sigma±.005的DEX差，非买卖流；共同+2.134→+7.587B；目标层+3.277B；模型下一参考时点。这些是状态量非净流入。Vanna与Volga使用σ上、下各0.005的有限差；Charm比较下一交易日模型参考状态，ACT/365，源实现PM16:00／AM17:00作为模型时钟，不能等同官方AM结算时间，也不能当20:21实测对冲流。T0高阶字段保持null而非0。全链2.035517B=sum(vendor_vega*100*OI);vendor单位未独立核实；存续13.144103B；BS-vega按单位小数波动率计，sigma±.005之差未乘.01，不与vendorVEX直接比，未额外乘0.01。OI增加不等于当日净新开仓。

## 10. T+1 Decision Map, Structural View and Plan Grade

**Structural View：range_bias／low confidence；Plan Grade B；Plan Status Conditional Next-Day Plan；Execution Status requires_external_live_source；Quote Portability low。** Formal通过；区间观察先验、上下应急路径及有界风险复筛协议可定义，Base没有合格range交易。 未评A：先验低置信度、AM/PM分歧、部分地图、早段GTH时钟与候选wing/MTM缺口。 未评C：两条独立方向路径与风险/取消/实时复筛可定义；Base none和low报价不自动降C。 本期Base none，两张Risk卡互斥。

| State | Required confirmation | Plan | Invalidation |
| --- | --- | --- | --- |
| opening_inside_core | 7700–7750内；7725是中间复核 | Observe only; no range trade | Breakout or map reset |
| opening_after_overnight_reset | Opening spot/IV/event state verified; freeze complete | Clear ranking/recenter; two full bars | Any live gate fails |
| post_scheduled_release | Durables/Michigan/Nowcast actualreleasechecked | Continue gate checks; actual shock resets affected branch | Unresolved vol/liquidity shock |
| post_event_range_reconfirmed | 3 full5m closes inside7700–7750;candidatewing gate newly passed;net-profit containment | Re-screen fly/condor, no automatic substitution | Boundary/center/profit-region failure |
| gap_above_upper_confirmation | Retest7750 then two fullcloses>7750 and sign gates | F_CALL before7800/selectedshort | O_REJECT |
| gap_below_lower_confirmation | Retest7700 then two fullcloses<7700 and sign gates | F_PUT before7675/selectedshort | O_RECLAIM |
| confirmed_downside_release | O_DOWN+O_SIGN_DOWN+common gates;O_RECLAIM absent | F_PUT→7675;7650 after revaluation | Reclaim or independent weakness disappears |
| confirmed_upside_recovery | O_UP+O_SIGN_UP+common gates;O_REJECT absent | F_CALL→7800;7850 after revaluation | Rejection or positive-layer repair fails |
| vol_shock_or_event_reset | 15min VIX+1point or candidateATM+2vp;actual materialnews | Discard counts/rankings;refresh | Reset incomplete |
| node_migration | Map age<=300s;node move within frozen numeric tolerance | Rebuild and freeze again | Same-method map unavailable |
| all_gates_pass | One branch confirmed and all live pricing/risk/capabilities verified | Human decides; never automatic order | Any gate ceases to pass |
| any_execution_gate_fails | Quote/carry/IV/MTM/risk/time/capability missing or failed | No new position; manage existing risk | Until full verification |

### 可观察条件、重置与来源

以下条件只在9/25 RTH评估。t0为完成实时刷新、数值参数冻结后的下一完整5分钟起点；不使用半根bar。O_REJECT／O_RECLAIM是失效信号，入场要求其不存在，其余所列必需条件须为通过。表中null参数须在t0前确定，不能用等待时长代替数据确认。

| ID／必需观察 | 定义与来源 | 时效／当前状态 |
| --- | --- | --- |
| O_RESET／event_reset | 核实08:30发布、隔夜及开盘状态；无未完成重大冲击时，09:30起刷新live输入并冻结参数，t0为冻结后的完整5m起点，至少两根确认。常规日历事项不自动构成hard_reset；实际冲击才清空计数并重建。 来源：官方讲话/直播/实际完成记录及实时数据 | ≤30秒；external_required／pending |
| O_CAL／calendar | 核实9/25 RTH及各腿最后交易时点；耐用品、密歇根调查和Nowcast监测实际冲击；提前收市/经纪商限制优先。 来源：Cboe/官方日历/实际经纪商限制 | 人工核验；external_required／pending |
| O_CONFIG／parameter_freeze | 在t0之前固定数值mapping/parity/node/报价时差容差、b、风险账本和估值方法；null不放行，不在触发后调整制造通过。 来源：人工签认参数记录 | 人工核验；external_required／pending |
| O_UP／SPX_close | 连续两根完成bar的close严格>7750；从t0后重新计数，且同时满足O_SIGN_UP。 来源：实时SPX已完成5m bar | ≤30秒；external_required／pending |
| O_DOWN／SPX_close | 连续两根完成bar的close严格<7700；从t0后重新计数，且同时满足O_SIGN_DOWN。 来源：实时SPX已完成5m bar | ≤30秒；external_required／pending |
| O_REJECT／upside_invalidation | 一根5m close回到7750下方或等于7750，下一根close未重新收于7750上方，则上行失效。若7700下破或风险上限先触发，提前退出。 来源：实时SPX完成bar | ≤30秒；external_required／pending |
| O_RECLAIM／downside_invalidation | 一根5m close回到7700上方或等于7700，下一根close未重新收于7700下方，则下行失效。风险上限可先触发退出。 来源：实时SPX完成bar | ≤30秒；external_required／pending |
| O_GAP_UP／gap_retest | 若开盘或reset后首价已>7750，须先出现覆盖7750的回测bar，再从其后完整bar重计两根；首个可评估价已>=7800或所选short strike则不追。 来源：实时SPX逐笔/完成bar | ≤30秒；external_required／pending |
| O_GAP_DOWN／gap_retest | 若开盘或reset后首价已<7700，须先出现覆盖7700的回测bar，再从其后完整bar重计；首个可评估价已<=7675或所选short strike则不追。 来源：实时SPX逐笔/完成bar | ≤30秒；external_required／pending |
| O_SIGN_UP／signed_GEX_layers | 在两根接受bar终点：local=sum(call−put) GEX，取仍可交易SPXW_PM且strike位于闭区间[7750,7800]，按live spot换算每点；全PM汇总所有仍可交易PM到期。可交易SPXW_PM总signed>=0且不低于开盘冻结基准、剔9/25后全链signed>=0、7750–7800局部PM signed>0、9/25新PM0DTE signed>0；不以价格代替任何层。 来源：外部同口径PM/new0DTE/durable/local地图 | ≤300秒；external_required／pending |
| O_SIGN_DOWN／signed_GEX_layers | 在两根接受bar终点：local=sum(call−put) GEX，取仍可交易SPXW_PM且strike位于闭区间[7675,7700]，按live spot换算每点；全PM汇总所有仍可交易PM到期。7700–7675局部PM signed<0且9/25新PM0DTE signed<0；全PM及剔目标0DTE全链signed均不高于开盘冻结基准。只要求后两者未改善，不要求远月总量全部转负。 来源：外部同口径PM/new0DTE/durable/local地图 | ≤300秒；external_required／pending |
| O_RANGE／range_profit_region | 连续3根完整5m close在预冻结7700–7750核心内，未越confirmation level且无shock；spot/forward和完整center uncertainty区间均落在成本后scenario盈利区间内并留正buffer。仅区间家族研究；本期range为未选替代家族，候选正式wing缺失，须重新通过family筛选才可形成range卡。 来源：实时SPX/forward/中心区间/多腿MTM | ≤30秒；external_required／pending |
| O_NODE／node_migration | 当前地图年龄<=300秒（本报告假设）；关键位变化不超事前数值容差，否则重建并清零。 来源：事件后冻结与当前同口径地图 | ≤300秒；external_required／pending |
| O_VOL／vol_shock | 若15分钟内VIX增加>=1.0点或候选ATM IV增加>=2.0vol_points，则shock；门禁要求无未完成reset的shock。 来源：实时VIX和候选expiry ATM IV | ≤30秒；external_required／pending |
| O_QUOTES／live_combination | Quote年龄<=30秒；bid<=ask。正mid组合spread/mid<=25%；mid<=0时用事先冻结的绝对tick宽度/成本容差判断，不做除零。每条腿流动性及数量匹配。 来源：实时native组合或同步全腿quote | ≤30秒；external_required／pending |
| O_MAPPING／spot_forward_parity | SPX/10与XSP、leg时差、C-P=D(F-K)残差均在预冻结数值容差内；使用独立live XSP carry/forward，不能拿EOD或任意q=0替代。 来源：实时SPX/XSP/独立carry与forward | ≤30秒；external_required／pending |
| O_SURFACE／candidate_surface | 选腿后取得同timestamp/scope候选ATM、put/call25D及long/short-wing IV、Greeks；partial可用节点不自动扩展为完整曲面，不借用其他到期填补。 来源：外部候选expiry ATM/25D/两腿IV及Greeks | ≤30秒；external_required／pending |
| O_VALUE／planned_exit_MTM | 计算target/adverse/invalidation/planned_exit四情景；实际time/spot/forward/rate/IV/wing/N/cost可追溯。保守target liquidation value必须>debit+C_N/(100N)+b，并通过risk/RR/liquidity cap。 来源：已验证live估值方法/退出流动性折价 | ≤30秒；external_required／pending |
| O_BROKER／atomic_net_limit | 确认支持所选全腿原子net-limit、正确ratio/expiry/multiplier；native优先，synthetic须同步保守构造；不拆腿追价。 来源：人工核实经纪商实际订单能力 | 人工核验；external_required／pending |
| O_RISK／risk_book | R_eff=min(300,500-L-H); ML=100*N*d+C_N; MP=100*N*(W-d)-C_N; d_risk=(R_eff-C_N)/(100*N); d_RR=W/2-C_N/(100*N)；1active，最多1次reentry；两次thesis failure或预算耗尽停止；实际N/L/H/C_N未知即不放行。 来源：实际已实现损失/持仓最大剩余风险/费用 | 人工核验；external_required／pending |
| O_TIME／entry_exit_window | min(entry+60min,applicable_session_exit_deadline); deadline=min(15:30 ET,earlier user/broker exit limit,min(all-leg last-trade time,target RTH close)-30min buffer); latest_entry=deadline-30min minimum viable holding; no overnight；最早09:40仅在09:30已完成刷新冻结且两根bar通过时成立；晚到或实际shock则t0顺延，窗口不足即取消。 来源：实际日历/各腿合约/经纪商 | 人工核验；external_required／pending |

`O_TIME`：最早09:40仅当09:30已冻结且两根完整bar、独立signed条件同时满足；实际冲击、数据晚到或跳空回测使t0顺延。地图300秒与最低可行持有30分钟是报告假设，其余列明阈值按v1.8流程默认值，均未校准为alpha。实时PM／新0DTE／局部地图、VIX／候选IV、独立carry、全腿quote、估值工具、经纪商和风险账本均未证实可用；价格突破不能替代任何模型层。

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Family／scenario | Payoff archetype | Structural fit | IV dependency／gate | Pricing／execution | Status／理由 |
| --- | --- | --- | --- | --- | --- |
| put_debit_vertical／risk_case | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：7700破位且目标0DTE转负后研究，必须抵消正PM缓冲与成本。 |
| call_debit_vertical／risk_case | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：7750上收且独立正层确认后研究，需检验正Gamma刹车对7800路径的影响。 |
| defined_risk_iron_butterfly／base_case | centered_stability | not_established | required／fail | unavailable／external_required | not_screenable：中心稳定与成本后盈利区域未确认；9/25、9/28候选正式wing均缺失。 |
| defined_risk_iron_condor／base_case | broad_bounded_range | not_established | required／fail | unavailable／external_required | not_screenable：观察带不等于净利润区，候选双侧wing缺失；不能外推7Dsmile。 |
| broken_wing_butterfly／directional_alternative | directional_continuation | not_established | required／fail | unavailable／external_required | not_screenable：非对称尾部和收敛终点未证实，候选wing/MTM缺失。 |
| straddle_strangle／alternative_vol | two_sided_expansion | not_established | required／fail | unavailable／external_required | not_screenable：双侧幅度与总premium比较未建立；候选wing/MTM缺失。 |
| calendar_diagonal／alternative_term | term_or_vol_relative_value | not_established | required／fail | unavailable／external_required | not_applicable：本计划日内退出，不依赖跨夜期限收敛；跨期限candidatewing与估值缺失。 |
| long_option／directional_alternative | directional_continuation | conditional | background_only／not_applicable | pending_live_repricing／external_required | conditional：作为方向价差live成本和尾部比较，不另增完整卡。 |

五类payoff均已筛选，iron fly与condor独立记录。全部edge_evidence_status=not_established；required gate失败是候选expiry翼部缺口，不能用“IV整体partial”泛化，也不能用相邻expiry补翼。

### Local Candidate Comparison

| Family | 历史局部网格 | 重新选择规则 |
| --- | --- | --- |
| Put vertical | 9/25、28 × long769/770/771 × width3/5＝12 | live7700映射附近相邻±1strike |
| Call vertical | 相同2期 × long774/775/776 × width3/5＝12 | live7750映射附近相邻±1strike |
| Iron butterfly | 相同2期 × center771/772/773 × wing(3,3)/(5,5)/(3,5)/(5,3)＝24 | 同body短put/call及两端长wing，包含非对称宽度 |
| Iron condor | 相同2期及3center，短put=center−1、短call=center+1 ×4种wing＝24 | 独立宽区间测试，不以铁蝶结果替代 |

| 9/28 family | Width | 合成ask范围／点 | 组合宽度范围／点 | N=1含成本ML／美元 | 判断 |
| --- | --- | --- | --- | --- | --- |
| F_CALL | 3 | 0.500–0.740 | 0.100–0.150 | 56–90 | 粗略量级，不选live赢家 |
| F_CALL | 5 | 0.670–0.990 | 0.110–0.130 | 73–115 | 粗略量级，不选live赢家 |
| F_PUT | 3 | 1.160–1.550 | 0.230–0.360 | 122–171 | 粗略量级，不选live赢家 |
| F_PUT | 5 | 1.650–2.190 | 0.220–0.340 | 171–235 | 粗略量级，不选live赢家 |

72组comparison=limited、winner=null。相邻strike具有不同Delta、确认位距离与利润区，不能只挑最便宜者。Live先过family门禁，再重建邻域，比较保守净目标MTM、反向／失效损失、费用与流动性稳健性；报价／tick／成本不确定性内的差异保持indeterminate。区间还须使spot、独立forward与完整center uncertainty区间均落入净盈利区并留正buffer。9/28在周五剩3个日历DTE，只跨至下一个RTH日，中间周末不交易；若误持有会暴露周末gap，本计划不授权跨夜。9/29为4DTE，排除默认1–3DTE窗口。

### Base Candidate Template — none

Base保持区间观察。Iron fly／condor的candidate wing、中心稳定与成本后盈利区均未闭合，不能生成Base交易卡；区间重确认只允许重新筛选。以下仅有两张Risk完整卡，不用方向应急路径替代Base。

### Risk-Path Contingency 1 — 下側区间失效

**F_PUT｜put debit vertical｜directional_continuation｜conditional｜B。** 关联O_DOWN、O_GAP_DOWN、O_SIGN_DOWN及共同门禁，O_RECLAIM须不存在；7700下破后首查7675，再经新估值才看7650。默认9/28到期（目标3 calendar DTE），9/25零DTE战术比较；周五RTH持有不超过60分钟且不得跨夜。Live long取经验证7700映射附近及相邻±1strike，short向下3／5点，ratio1:1；按净目标MTM和风险重选，不锁定下表腿。收复7700的1+1bar失效或独立弱结构消失则退出，硬风险限制优先；首个可评估价已低于7675／short，不追。

### Risk-Path Contingency 2 — 上側区间失效

**F_CALL｜call debit vertical｜directional_continuation｜conditional｜B。** 关联O_UP、O_GAP_UP、O_SIGN_UP及共同门禁，O_REJECT须不存在；7750上收后首查7800，7850需重新估值。Expiry、时钟、ratio同上；live long取7750映射附近及相邻±1strike，short向上3／5点。拒绝7750的1+1bar失效或正层修复消失则退出；越过首节点／short不追。正Gamma节点可能减慢上行，须检验净清算值。两卡互斥，另一卡失败不自动触发反手，且计入失败／再入场预算。

**逐腿历史示例，仅本处列示。** 以下为9/24 20:22:56 ET、XSP770.41时构造的9/28合约；synthetic_only、candidate_template_only、coarse_scale_only、binding=false。净debit为客户支付，不是9/25预期成交价。

| Family／全部illustrative legs | 组合bid/mid/ask／点 | 成本与到期payoff | 历史净Greeks／映射 |
| --- | --- | --- | --- |
| F_PUT；buy 1×XSP260928P00770000（put K=770，bid/mid/ask=3.380/3.455/3.530，IV=12.210%）；sell 1×XSP260928P00765000（put K=765，bid/mid/ask=1.640/1.690/1.740，IV=12.530%） | 1.640/1.765/1.890 | 历史ask；N=1 unit_payoff_example；C=$6：ML=$195，净MP=$305，BE=768.050；C=$16：ML=$205，净MP=$295，BE=767.950 | delta=-0.1893, gamma=+0.0073, vega=+0.0488, theta=-0.0517；long相对映射边界取整差0；spot映射差−0.020点、不同秒 |
| F_CALL；buy 1×XSP260928C00775000（call K=775，bid/mid/ask=1.070/1.105/1.140，IV=8.660%）；sell 1×XSP260928C00780000（call K=780，bid/mid/ask=0.330/0.350/0.370，IV=9.170%） | 0.700/0.755/0.810 | 历史ask；N=1 unit_payoff_example；C=$6：ML=$87，净MP=$413，BE=775.870；C=$16：ML=$97，净MP=$403，BE=775.970 | delta=+0.1656, gamma=+0.0236, vega=+0.1190, theta=-0.1391；long相对映射边界取整差0；spot映射差−0.020点、不同秒 |

Put到期净盈利区XSP<K_long−d−C_N/(100N)，call为XSP>K_long+d+C_N/(100N)；max_loss=100Nd+C_N，净MP=100N(W−d)−C_N，要求完整结构及成本上界成立。止损成交无法保证。两个示例净Gamma／Vega为正、Theta为负，Delta随方向；live符号和幅度须重算，供应商Greek单位不自动视为美元风险。实际live_selected_legs、N、debit cap和四情景清算值均pending。方向价差的中心包含测试not_applicable，其路径MTM必需。

两卡均须取得9/28或改选9/25自身ATM、25Δ、long／short翼与Greeks；短腿降低premium且封顶收益，是否优于单腿要由同路径、同成本live比较证明。方向正确但速度慢、IV crush、不利wing变化、Theta、正Gamma刹车、费用或退出流动性都可能导致亏损。

## 12. Base / Risk / No-Trade Scenarios

### Base Case

7700–7750观察；尚未证明稳定盈利区且候选wing缺失，Base family=none，不建立区间卖方结构。 7725仅为区间内观察点。若稳定性、candidate wings与成本后盈利区均取得新证据，应在新冻结状态重新筛选，不从历史网格直接激活。

### Risk Case

下破7700且新0DTE/局部转负、PM和更久层不改善→put价差，首查7675、再7650；上收7750且独立正层确认→call价差，首查7800、再7850。 两条路径分别接受独立价格与signed检验；首节点是重新估值点，不是承诺收益或自动平仓利润。

### Scenario Valuation — 四情景闭合

| Branch | Scenario | Spot假设 | 时间假设 | 估值状态 |
| --- | --- | --- | --- | --- |
| Risk put | target | XSP767.5／SPX7675 | 30min after actual entry | pending；净PnL=null；probability=null |
| Risk put | adverse | XSP772.5／SPX7725 | 15–30min after entry | pending；净PnL=null；probability=null |
| Risk put | invalidation | XSP770.0／SPX7700 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Risk put | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |
| Risk call | target | XSP780.0／SPX7800 | 30min after actual entry | pending；净PnL=null；probability=null |
| Risk call | adverse | XSP772.5／SPX7725 | 15–30min after entry | pending；净PnL=null；probability=null |
| Risk call | invalidation | XSP775.0／SPX7750 | Actual reclaim/rejection timestamp | pending；净PnL=null；probability=null |
| Risk call | planned_exit | 实际退出spot待定 | min(entry+60min,applicable deadline) | pending；净PnL=null；probability=null |

Target按实际入场后30分钟估值，另做15／60分钟敏感性；候选ATM不变及±2vp，并加入不利wing斜率／曲率。记录实际模型及版本、估值和退出时间、spot／独立forward／利率、同expiry IV／Greeks、N、入场debit、保守清算折价和全部费用。Target净值须超过premium、成本与b，adverse／invalidation损失须满足预算；所设spot／时间不代表到达概率。缺少合格live工具或输入，八行MTM保持pending，不以9/28到期intrinsic代替周五退出MTM，无正EV结论。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

1. **7700／7750的完成bar、回测及首复核。** 确定区间是否失效，7675／7800触发新估值。
2. **9/25新PM0DTE、PM总量及较久／局部图。** 检验7700短支撑和耐久负层，迁移超容差须重建。
3. **耐用品、Michigan、Nowcast和实际新消息。** 区分普通发布与真实利率／IV／流动性冲击。
4. **自身候选ATM／25Δ／翼／Greeks与VIX。** 决定成本、估值与shock，不借其他expiry补缺。
5. **净MTM、组合价、全部费用、剩余风险与时钟。** 决定限价或取消，不用方向观点覆盖数值失败。


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
