+++
title = "SPX期权持仓与Greeks结构分析-260908"
date = "2026-09-09"
data_as_of = "2026-09-08"
draft = false
description = "基于9月8日盘后持仓与Greeks结构，分析9月9日条件路径、IV变化及实时确认要求。"
series = "SPX期权分析报告"
categories = ["衍生品", "市场结构"]
tags = ["SPX", "Greeks", "GEX", "期权"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "97d195e0bb3c86b667acbe2be665184efeb0d4a75160803c24a190c8168f447a"
+++

# SPX期权持仓与Greeks结构分析-260908

## 1. 结论

9月8日盘后呈现 **modeled signed GEX 转负、PM 层明显弱化**的结构，9月9日先验调整为有条件的 `downside_bias`、同时保留上方收复风险；Plan Grade / Plan Status 为 **B / Conditional Next-Day Plan**，Execution Status 为 `requires_external_live_source`，核心确认是 **7650 下方连续两根完成的5分钟收盘与实时负 signed 结构一致**，本报告为盘后研究计划，非实时下单指令。

## 2. T+1 Action Summary

| Decision item | T+1 action |
| --- | --- |
| Base stance | `downside_bias`，结构置信度 Medium；原稳定区间先验减弱，下破需确认，上方正节点仍可能承接收复。 |
| Earliest evaluation | 不早于 **10:15 ET**，实际为 `t0+15m`：10:00 Employer Costs 已发布，开盘、波动、节点及 forward 重置完成后，下一完整5分钟 bar 起点为 t0；若错过10:00边界，则10:20或更晚。11:45停止新开，12:45前清仓。 |
| Base activation | 若连续两根完成的5分钟收盘 <7650，且实时负 signed 确认成立、必要的 gap retest 完成，则评估 **put debit vertical**；第一复核7625，其后7600；reclaim 7650或负结构失效则取消/退出。 |
| Downside branch | 与 Base 为同一条条件路径：若7650下方 acceptance 与负 signed 一致，则评估 **put debit vertical**，先复核7625；reclaim 7650失效，不另叠加第二份仓位。 |
| Upside branch | 若连续两根完成的5分钟收盘 >7700，局部正节点与目标日0DTE为正、PM及全链负压力收窄或转正，则评估 **call debit vertical**；第一复核7750，其后7800；回落并 rejection 至7700下方失效。 |
| Otherwise | **No Trade / observe only**：7650–7700内尚未确认稳定性或方向、跳空未回测、事件/波动/节点重置未完成，或实时门禁失败；重建结构、曲面与局部候选比较后再考虑。 |

Plan Grade / Plan Status=B / Conditional Next-Day Plan，Execution Status=`requires_external_live_source`，`planning_only=true`；盘后条件计划，非实时下单指令。

## 3. Executive Summary

- **变化来自持久层，而非仅由到期层造成。** 删除9月8日0DTE并锁定两日共同的30个到期日后，gross GEX 增至392.092B美元/1%，modeled signed 却从+14.497B转为−21.620B；进一步剔除9月9日、只留目标日仍为正DTE的29个共同到期日，signed 仍为−15.914B。
- **方向先验下调，但负 gamma 不直接预测下跌。** 同源 SPX 价格代理降至7673.79、落在上一期7700–7800核心区下方；共同 PM signed 由+11.265B转为−21.479B，提供条件下行路径的主要支撑，7650以下仍须实时确认。
- **7675的大负节点不能原封不动继承。** 其绝对 signed 贡献约90.50%来自当日到期层；7680在删除该层后反而由负转正，保留了向7700、7750收复的反向风险。
- **9月18日仍是主要持久到期日。** Gross 225.857B，占删除T日0DTE后全链的57.58%，约91.07%来自 SPX AM；这不证明全市场处于正 gamma，也不等于 PM 收盘钉住某一点位。
- **Formal IV 为 `partial / deterministic_expiry_proxy`。** 3D前端有事件峰，7D至45D总体向上；同到期前端与固定期限 ATM 均上升，滚动 smile 下侧斜率也变陡，但局部证据不能单独证明交易 edge。
- **两张策略卡均为候选模板。** Base 为下破后的 put debit vertical，Risk 为收复后的 call debit vertical；Quote Portability=`low`，具体腿位、组合价格、计划退出时点的收益区间与真实成本都须在目标日重新确定。

## 4. What Changed vs. T-1 and Prior Playbook Review

T−1为9月4日；9月7日美国劳动节没有常规盘，因此本次跨越4个日历日、一个相邻常规交易日。以下持仓比较均重新锁定共同到期集合，不直接引用上一期不同集合的总量。B=十亿美元；Greek变化均为模型量的变化。

| Dimension | T−1：9/4 | T：9/8 | Change | T+1 relevance |
| --- | --- | --- | --- | --- |
| 同源价格代理 / 原计划 | Raw-chain median 7718.13；原报告基准7700–7800 range | 7673.79，低于原核心区及7675 | −44.34点 / −0.574% | 只能确认终值位置，不能据此复原盘中连续收盘触发。 |
| 30个共同存续到期日 | Gross 357.645B；signed +14.497B；DEX 881.961B；OI 10,460,094 | 392.092B；−21.620B；612.753B；10,847,623 | Gross +9.63%；signed −36.118B；DEX −30.52%；OI +3.70% | Gross增加与稳定性不是同一含义；同到期 signed 已跨零。 |
| 目标日仍正DTE的29个共同到期日 | Gross 343.973B；signed +10.682B；DEX 876.901B | 374.885B；−15.914B；617.977B | Gross +8.99%；signed −26.597B；DEX −29.53% | 负结构并非只由将变为新0DTE的9/9合约造成。 |
| 同一共同集合的 AM / PM | AM signed +3.232B；PM +11.265B | AM −0.141B；PM −21.479B | AM −3.373B；PM −32.744B，后者占 signed 总降幅90.66% | AM近于中性，PM弱化占主导，执行时两层分开核验。 |
| 9/9目标日到期合约 | Gross 13.672B；signed +3.815B；DEX +5.060B | 17.207B；−5.706B；−5.224B | OI 146,507→181,321；最大负节点7550→7675 | T日1DTE将成为目标日0DTE，短端先验变化明显、持续性较低。 |
| Vanna / Charm / Volga，30个共同到期日 | Vanna −6.120B；Charm-next +30.445B | Vanna −2.143B；Charm-next +5.809B | Vanna +3.977B；Charm −24.636B；Volga约−2.896B | 周五至下一交易日与周二至周三的衰减跨度不同；不是已发生的对冲流。 |
| ATM与smile变化方向 | 较低的同到期ATM和滚动slot下侧斜率 | 同到期及固定期限ATM均上升，三个slot的level / slope / BF算术值均上移 | 详见第8节逐节点对比；smile basis=`rolling_tenor_slot_fixed_delta` | 同到期变化排除“全是slot迁移”的解释；仍不能分离时间流逝、事件结构和重新定价。 |

Vanna采用IV上、下各0.5vp时DEX之差，Charm-next采用其他输入不变时向下一交易会话衰减的DEX之差，Volga采用同一IV差分窗口下VEX之差；VEX本身是模型vega敞口。它们不能互相替代，亦不能相加成资金流指标。

## 5. T 日盘面、字段时点与 Event-Risk Overlay

新闻检索锚为9月8日19:26 ET；仅作以下三组覆盖：

1. **地缘政治、油价与通胀风险。** Reuters的盘中报道发布于9月8日12:08 ET、12:09更新，盘后综述发布于17:07 ET，均讨论中东局势和油价压力。盘后文章发布时间晚于16:00，不证明其所述事件也发生在收盘后；未取得同步夜盘价格，不能据此指定隔夜gap或反推dealer流。[盘中报道](https://ca.marketscreener.com/news/wall-st-slips-as-steep-oil-prices-stoke-inflation-concerns-ahead-of-cpi-ce785bd8de80fe26)、[盘后综述](https://finance.yahoo.com/markets/articles/trading-day-roll-100-barrel-210746344.html)。
2. **纽约联储调查仅作背景。** 9月8日发布的8月消费者调查显示一年、三年、五年通胀预期为3.6%、3.2%、3.0%；失业率上升预期均值44.4%。网页未给精确发布钟点，不能用它对某段价格变化做因果归因，也不能把预期当成实际通胀或失业率。[纽约联储原文](https://www.newyorkfed.org/newsevents/news/research/2026/20260908)。
3. **目标日上午窗口与后续事件期限。** 9月9日10:00 ET为Employer Costs for Employee Compensation，13:00 ET为Apple活动（10:00 PT）；9月10日08:30为PPI与初请，9月11日08:30为CPI与实际收入、10:00为Michigan初值。上午计划先完成10:00重置，11:45停止新开、12:45前结束持仓；即使采用9/10或9/11到期合约，也只计划9/9日内持有。上午尚无已核验的CPI/PPI级别先行hard reset；若发生重大新消息或选择Apple活动后重入，Quote Portability需改判为none并重新建图，当前计划对13:00以后只保留观察。[BLS日历](https://www.bls.gov/schedule/2026/09_sched.htm)、[纽约联储日历](https://www.newyorkfed.org/research/calendars/i-sep26.html)、[Apple活动](https://www.apple.com/apple-events/)、[Cboe劳动节安排](https://www.cboe.com/notices/content/?id=61299)。

## 6. Decision Rationale — Analytical Bridge

### Thesis 1 — 同到期 signed 转负，原区间先验需要下调

**Claim：** 下行释放取得条件性优先级，当前不适合直接沿用稳定区间结构。**Evidence：** 共同存续到期日gross上升9.63%，signed从+14.497B转为−21.620B；PM贡献90.66%的signed降幅，价格代理也低于原核心区。**Mechanism：** 在该dealer符号假设下，负gamma反馈可能放大双向运动；方向倾向来自价格位置与PM弱化的结合，不能由负号单独推出。**T+1 Implication：** 7650以下完成价格及实时结构确认，才评估有限风险put vertical。**Falsifier：** 7700上方形成acceptance、局部正节点持续且PM负压力衰减。**Confidence：** Medium。

### Thesis 2 — 7675的负节点主要到期消失，反弹路径仍需保留

**Claim：** 7675不能被称为次日持久pin或必然阻力。**Evidence：** T日0DTE占该点绝对signed贡献90.50%；9/18与10/16两期在该点合计反而为+5.164M美元/点，7680删除T日0DTE后也转正。**Mechanism：** 到期删除会改变局部符号，而9/9的新0DTE是独立、快速变化的一层。**T+1 Implication：** 7670 / 7680只作警戒，确认边界放在7650 / 7700并随live map复核；保留上方收复卡。**Falsifier：** 多次同步live snapshot在删除过期合约后重新建立同一负节点。**Confidence：** 到期不可继承为High，次日节点位置为Medium-Low。

### Thesis 3 — Gross集中于AM，不能代替全链PM方向

**Claim：** 9/18 gross锚稳固，但不能支撑“全市场正gamma稳定底”的标签。**Evidence：** 该期gross 225.857B，AM占约91.07%；存续selected strike map只覆盖删除T日0DTE后全链gross的74.19%，其未覆盖部分signed为−15.664B。**Mechanism：** Gross表示敏感度规模，AM/PM结算层与selected/full-chain范围会改变聚合符号。**T+1 Implication：** PM、新0DTE和正DTE全链分别确认，7750 / 7800仍是反向复核节点。**Falsifier：** 新的完整map显示正signed明显扩散到selected以外及PM层。**Confidence：** Medium。

### Thesis 4 — 升波与更陡下侧翼提高成本门槛，不直接产生edge

**Claim：** IV变化首先影响期限、翼部成本和退出估值。**Evidence：** 9/11同到期ATM上升4.379vp，固定7D上升1.581vp；三个滚动smile slot均表现level上移、downside slope变陡。**Mechanism：** 时间流逝、事件窗口和重新定价共同作用；卖出较低put可部分融资，但同时封顶进一步下跌收益。**T+1 Implication：** 比较9/10与9/11、相邻long strike及3/5点宽度，按目标时点净清算价值筛选。**Falsifier：** 实时曲面、费用或bid/ask使目标情景收益不足，或改变候选排序。**Confidence：** `degraded_local_evidence`。

## 7. Conflicting Evidence, Confidence and What Changes the View

| 支持下行基准的证据 | 削弱基准 / 支持上方收复的证据 | 处理方式 |
| --- | --- | --- |
| 共同全链、PM signed由正转负；删除9/9后仍负 | T日巨大负0DTE消失，AM signed接近中性 | 全链与纯PM优先于gross标签；保留Medium置信度和价格确认。 |
| 价格代理落在旧区间下方，7550 / 7500仍有持久负节点 | 7680、7700、7750、7800在存续map中为正 | 7650是下破确认，7700是收复确认；核心区不是单向追价区。 |
| 9/9目标日到期signed显著转弱 | 9/18+10/16可见两期signed仅约−0.217B，且上方正shelf仍在 | 短端与中期分层；可见map的近中性不能覆盖全链负暴露。 |
| 同到期ATM上升，滚动下侧翼变陡 | IV整体partial，smile混合expiry roll，没有误差置信区间 | 只降低/调整成本与surface使用权限，不推断确定方向或统计显著性。 |



## 8. IV Term Structure, Skew and Surface

### ATM IV Term Structure

| Expiry / tenor | DTE / positive time | ATM IV | T vs. T−1 change / basis | Event / settlement | Method / quality |
| --- | ---: | ---: | --- | --- | --- |
| 09-09 exact | 5→1日 | 11.3676% | +3.8971vp；`same_expiry_atm` | 目标日到期；Apple；PM | local fitted / observation-bracketed；conf=0.983；含aging |
| 09-10 exact | 6→2日 | 11.7657% | +3.6517vp；`same_expiry_atm` | 候选；PPI；PM | local fitted / observation-bracketed；conf=0.988；含aging |
| 09-11 exact | 7→3日 | 13.8939% | +4.3794vp；`same_expiry_atm` | 候选 / prior 7D；CPI；PM | local fitted / observation-bracketed；conf=0.992；含aging |
| 09-14 exact | 10→6日 | 10.9861% | +2.2373vp；`same_expiry_atm` | 事件峰后的相邻节点；PM | local fitted / observation-bracketed；conf=0.993；含aging |
| 09-15 exact | 11→7日 | 11.0959% | +2.0645vp；`same_expiry_atm` | current 7D source；PM | local fitted / observation-bracketed；conf=0.993；含aging |
| 09-18 exact | 14→10日 | 12.7399% | +1.9509vp；`same_expiry_atm` | prior 14D；quarterly OpEx；PM | local fitted / observation-bracketed；conf=0.993；含aging |
| 09-22 exact | 18→14日 | 11.8651% | +1.3182vp；`same_expiry_atm` | current 14D source；PM | local fitted / observation-bracketed；conf=0.993；含aging |
| 10-02 exact | 28→24日 | 12.4776% | +0.9669vp；`same_expiry_atm` | prior 30D下括号；PM | local fitted / observation-bracketed；conf=0.994；含aging |
| 10-05 exact | 31→27日 | 12.1943% | +0.8519vp；`same_expiry_atm` | prior 30D上括号 / smile；PM | local fitted / observation-bracketed；conf=0.994；含aging |
| 10-08 exact | 34→30日 | 12.4828% | +0.7905vp；`same_expiry_atm` | current 30D source；PM | local fitted / observation-bracketed；conf=0.994；含aging |
| 10-16 exact | 42→38日 | 12.7887% | +0.6632vp；`same_expiry_atm` | prior 45D下括号；PM | local fitted / observation-bracketed；conf=0.996；含aging |
| 10-23 exact | 49→45日 | 12.9279% | +0.5769vp；`same_expiry_atm` | prior 45D上括号 / current45D；PM | local fitted / observation-bracketed；conf=0.995；含aging |
| Fixed 3D | 3D | 13.8939% | unavailable：prior最短正期限4D，无法包住3D | SPXW / PM；期限固定、成分改变 | P: unavailable，无正期限括号 → T: 09-11(3D)–09-11(3D), w=0.0000；conf=0.992；no extrapolation |
| Fixed 7D | 7D | 11.0959% | +1.5814vp；`fixed_tenor_atm` | SPXW / PM；期限固定、成分改变 | P: 09-11(7D)–09-11(7D), w=0.0000 → T: 09-15(7D)–09-15(7D), w=0.0000；conf=0.993；no extrapolation |
| Fixed 14D | 14D | 11.8651% | +1.0761vp；`fixed_tenor_atm` | SPXW / PM；期限固定、成分改变 | P: 09-18(14D)–09-18(14D), w=0.0000 → T: 09-22(14D)–09-22(14D), w=0.0000；conf=0.993；no extrapolation |
| Fixed 30D | 30D | 12.4828% | +1.0878vp；`fixed_tenor_atm` | SPXW / PM；期限固定、成分改变 | P: 10-02(28D)–10-05(31D), w=0.6667 → T: 10-08(30D)–10-08(30D), w=0.0000；conf=0.994；no extrapolation |
| Fixed 45D | 45D | 12.9279% | +0.6966vp；`fixed_tenor_atm` | SPXW / PM；期限固定、成分改变 | P: 10-16(42D)–10-23(49D), w=0.4286 → T: 10-23(45D)–10-23(45D), w=0.0000；conf=0.995；no extrapolation |

当前为 **mixed**：3D=13.894%形成前端事件峰，随后7D回落，7D至45D则依次上升；3D−7D为+2.798vp，7D−30D为−1.387vp。9/11相对9/10高2.128vp、相对9/14高2.908vp，但期限间差值不是纯CPI事件方差，9/18的局部峰也不能单独归因某一事件。

7D source从9/11迁至9/15，14D从9/18迁至9/22；30D与45D从括号插值迁至实际到期节点，表中已同时披露两日括号、tau及权重。因此fixed变化包含成分替换。不过9/9、9/10、9/11的 **same-expiry ATM分别上升3.897、3.652、4.379vp**，支持同一合约也有明显数值上移；仍未分离4个日历日的aging与repricing。

T日0DTE不进入positive-DTE期限曲线；9/9当前tau=1D，目标日将成为新的0DTE，不能继承该EOD曲线。9/4 expiration panel按包生成日取整的DTE与IV packet按9/4 16:00 ET计算的tau不同，以上比较始终使用实际expiration与packet tau，未把两者混算。

### Selected-Expiry Skew / Smile and T vs. T−1 Dynamics

| Expiry / role / row type | 10Δ put | 25Δ put | ATM | 25Δ call | 10Δ call | Downside skew 25Δ | BF25 | Comparison basis / method / quality |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| T: 09-15 / ≈7D | 16.323% | 13.235% | 11.096% | 9.721% | 9.250% | 3.514vp | 0.382vp | forward-delta插值；observation-bracketed；min conf=0.958；flags=[] |
| Δ: 09-11(7D)→09-15(7D) | +3.380vp | +2.333vp | +1.581vp | +0.969vp | +0.812vp | +1.364vp | +0.069vp | `rolling_tenor_slot_fixed_delta`；degraded_local_evidence；roll+repricing；materiality indeterminate |
| T: 09-22 / ≈14D | 17.334% | 14.170% | 11.865% | 10.399% | 9.693% | 3.771vp | 0.419vp | forward-delta插值；observation-bracketed；min conf=0.959；flags=[] |
| Δ: 09-18(14D)→09-22(14D) | +1.977vp | +1.536vp | +1.076vp | +0.625vp | +0.316vp | +0.911vp | +0.005vp | `rolling_tenor_slot_fixed_delta`；degraded_local_evidence；roll+repricing；materiality indeterminate |
| T: 10-08 / ≈30D | 19.303% | 15.198% | 12.483% | 10.905% | 10.333% | 4.293vp | 0.569vp | forward-delta插值；observation-bracketed；min conf=0.963；flags=[] |
| Δ: 10-05(31D)→10-08(30D) | +2.113vp | +1.571vp | +1.140vp | +0.847vp | +0.792vp | +0.724vp | +0.068vp | `rolling_tenor_slot_fixed_delta`；degraded_local_evidence；roll+repricing；materiality indeterminate |

**Level → slope → curvature：** 三个slot的ATM level均上移；25Δ downside slope均`steepened`；BF25算术上均`increased`，其中14D仅+0.005vp。因overall partial、滚动构成及缺乏误差区间，三组经济重要性均保留 `indeterminate_within_uncertainty`，不把细小BF变化表述为可靠套利偏差。

Skew随三个selected期限由3.514升至3.771、4.293vp。定义为 `IV_put25−IV_call25`，是fixed-delta smile slope proxy，不是统计skewness。Put25相对ATM premium依次为2.139 / 2.305 / 2.715vp，较前期+0.751 / +0.460 / +0.430vp；Call25相对ATM为−1.374 / −1.466 / −1.578vp，变化−0.613 / −0.451 / −0.293vp。BF25定义为两侧25Δ均值减ATM，体现局部弯曲度。

两日均按距离7/14/30D最近的positive tau选择，固定的forward delta定义为 `forward_delta_non_premium_adjusted`，节点在实际观测支撑范围内插值。当前只展示9/15、9/22、10/8；30D slot的前期实际tau为31D，因此它的ATM变化+1.140vp不同于固定30D的+1.088vp。以上不是fixed-tenor smile，也没有用邻期补造9/10或9/11的候选翼部曲线。

**策略传导：** Put vertical的short put可部分融资较贵的下侧翼，但必须比较两条实际腿的IV差、封顶收益与退出成本；call vertical也须重看上侧翼和追价成本。Butterfly、iron fly或condor不能因翼部昂贵就自动获准，仍需中心、盈利区间与短gamma压力测试；单独买尾部保护需承认较高保费和IV crush风险。Calendar / diagonal在本次日内方向计划中不适用，亦无完整跨scope相对价值证据。目标日须重刷候选到期日、ATM、25Δ、实际wings、event kink、Greeks及估值；EOD term / skew描述相对定价状态，不给出方向保证或执行许可。

## 9. Key Expiry / Strike / Dealer Node

跨到期GEX统一为 **B美元/1%标的变动**，strike节点统一为 **M美元/1个SPX点**。Gross为call+put；modeled signed为call−put，是持仓符号假设。Expiration表的call/put与dealer_net处于point尺度，乘0.01×各日spot后才得到1%尺度；gamma table原始金额已在1%尺度，节点表则除以0.01×7673.79。COMBINED和pure-family是不同视图，不重复相加。

| Expiry / family | DTE：T→T+1 | Gross GEX / signed GEX | DEX | Durability / use |
| --- | ---: | ---: | ---: | --- |
| 9/8，T日0DTE | 0→已到期 | 63.093B / −35.305B | −15.286B | 全部删除，不跨日继承。 |
| 9/9，SPXW PM | 1→0 | 17.207B / −5.706B | −5.224B | 目标日新0DTE先验，开盘及每次reset重建。 |
| 9/10，SPXW PM | 2→1 | 11.240B / −3.822B | −6.766B | 日内候选期限之一，次晨PPI仍影响残余期权价值。 |
| 9/11，SPXW PM | 3→2 | 21.444B / −5.743B | −11.504B | 另一候选期限，含CPI窗口，不能仅因较慢衰减就优先。 |
| 9/18，COMBINED | 10→9 | 225.857B / −0.590B | 557.342B | 占当日全链gross49.60%、ex-T0的57.58%、目标日正DTE层60.22%。 |
| ↳ 9/18 SPX AM / SPXW PM | 10→9，分别AM / PM | AM 205.683B / −0.498B；PM 20.174B / −0.092B | AM 549.763B；PM 7.579B | AM占本期gross91.07%；结算时间不同，不视为PM pin。 |
| 10/16，COMBINED | 38→37 | 47.949B / +0.373B | 79.242B | AM gross44.517B、PM 3.432B，中期局部节点参考。 |

存续selected map只有 **9/9、9/18、10/16**三期，gross 291.013B / signed −5.923B，占删除T日0DTE后gross的74.19%；余下未展开的到期日gross 101.266B / signed −15.664B。进一步删除9/9后，可见两期gross 273.806B / signed −0.217B，覆盖目标日正DTE层gross的73.00%。不能把局部近中性外推为全链稳定。

| SPX / XSP映射 | Role | Evidence：存续 / 目标日仍正DTE的可见两期 signed，M美元/点 | Durability | T+1 use |
| --- | --- | --- | --- | --- |
| 7500 / 750；7550 / 755 | 深下侧节点 | 7500：−28.911 / −28.624；7550：−31.494 / −25.192 | 中期负节点 | 只有先越过下方确认区才纳入后续重估；非必达目标。 |
| 7600 / 760；7625 / 762.5 | 下行第二 / 第一复核 | 7600：−3.551 / +1.537；7625：−7.596 / −3.128 | 7600短中期冲突 | 到达即重估组合；762.5不在本期整数strike网格，不自动圆整下单。 |
| 7650 / 765 | 下行确认边界 | +2.724 / +2.054，仍有小型正承接 | 局部持久 | 需完成下方acceptance且live负signed成立，不能仅触及即看跌。 |
| 7660 / 766；7670 / 767 | 下侧警戒 | 7660：−6.115 / −1.552；7670：−2.884 / −0.740 | 7670原聚合负值97.35%来自T日0DTE | 观察路径，不作为独立策略trigger。 |
| 7675 / 767.5 | 短端负节点，非固定中心 | 存续−16.647；9/9贡献−21.811，两期持久+5.164 | 原聚合负值90.50%来自T日0DTE | 与新0DTE一起重建；本包没有767.5 strike报价。 |
| 7680 / 768 | 上侧警戒 / 局部符号翻转 | 原聚合−57.951，删除T日0DTE后+11.059；两期+15.561 | 中期正值被当日负层遮蔽 | 收复路径观察，尚不是7700确认。 |
| 7700 / 770；7750 / 775 | 上行确认 / 第一复核 | 7700：+10.565 / +8.369；7750：+15.763 / +15.335 | 存续正shelf | 7700上方acceptance及实时确认后评估call vertical。 |
| 7800 / 780；7825 / 782.5 | 上行第二复核 / 新0DTE正节点 | 7800：+49.067 / +48.651；7825：+12.343 / +8.790 | 7800以中期为主，7825含较多9/9 | 正节点是复核/阻滞先验，不是必然阻力。 |
| 7850 / 785；7900 / 790 | 更远上侧正节点 | 7850：+22.154 / +21.989；7900：+30.768 / +30.819 | 中期正shelf | 超出当前XSP报价网格；扩展前重新取数。 |
| 8000 / 800 | 深上侧负节点 | −48.375 / −48.374 | 持久负节点 | 若路径推进至此，旧局部地图不再够用，先重建。 |

**7650–7700为方向尚未确认的观察核心区，7600–7750为较宽路径走廊。** 它们是分析者根据局部节点与价格位置定义的条件边界，不是packet提供的正式gamma flip。路径回到核心区后可以重新检验稳定性，不能把“处于核心区”当成对所有payoff family永久有效的禁令。

## 10. T+1 Decision Map, Structural View and Plan Grade

Primary regime为“modeled negative signed GEX + 局部正shelf”，Directional prior=`downside_bias`，Structural confidence=Medium。Base path是7650下方确认后的有限风险下行释放；Risk path是7700收复后的反向推进。**Plan Grade / Plan Status=B / Conditional Next-Day Plan；Execution Status=`requires_external_live_source`；Quote Portability=`low`；setup representation=`candidate_template`。** IV Structure Gate=`conditional`，实际翼部surface重定价可能重排候选。

**为何是B：** 共同到期全链与PM变化足以形成明确、封顶风险的条件模板；但selected/full范围差异、短端节点不稳，以及候选翼部未被partial IV覆盖，使盘后结构本身仍有实质不确定性。**为何不升A：** 持久层的偏负方向与局部正shelf尚未收敛，不能形成更清晰的单一路径；正常live字段pending不参与机械降级。**为何不降C：** formal核心未出现硬失败，可定义两条条件路径、有限最大损失和可操作的实时筛选；未来字段尚未产生本身不是C的依据。评级相对前期未变，方向变化来自市场数据，不以微小报价差异或正常pending做评级变更。

本报告新增的操作容忍度均为**分析者协议，非vendor字段或经实证验证的最优参数**：

- **Acceptance / reclaim / gap：** 以SPX为主判定源；关键位外连续两根完成的5分钟收盘才构成acceptance。Reclaim / rejection要求一根完成收盘回到所需一侧，下一根完整bar未再次穿越；开盘跳过7650或7700，先回测原边界并完成相应reclaim/rejection，再重新累计两根acceptance。无回测则不追。
- **负结构确认：** 在两根acceptance收盘各取同步快照，目标日正DTE全链和纯PM（均剔除当日新0DTE）signed为负，独立的新0DTE层也为负；缺少任一同口径live数据就不激活。
- **上侧收复确认：** 两个同步快照中，7700–7750局部shelf与新0DTE均为正；正DTE纯PM和全链signed均非负，或两次负值绝对量都低于冻结reset基准，才认为原负压力不再持续放大。
- **重置 / 稳定性：** VIX在15分钟升≥1.0点，或候选expiry ATM IV升≥2vp，触发vol reset；主要节点/边界迁移>5个SPX点或相关符号反转也清零计数。Range reconfirmation须至少三根完整bar留在新core/corridor，期间无确认边界越界、无vol reset，中心漂移≤0.10 XSP即1 SPX点，并完成实时收益区间包含测试。该稳定性标准比一般节点重置阈值更严格。

| T+1 state | Required confirmation | Structural interpretation | Plan | Invalidation / status |
| --- | --- | --- | --- | --- |
| 早于t0+15m或事件未reset | 10:00实际发布、同步map / forward冻结 | 原计数不可复用 | Observe only | earliest受事件时点约束。 |
| 7650–7700核心区 | 尚无方向acceptance，也无稳定性重确认 | 方向释放未触发 | 暂不启用两张directional卡 | 不是所有range family的永久禁令。 |
| 7600–7750走廊内 | 按对应边界确认，不能仅凭“还在走廊” | 宽走廊不等于稳定区间 | 等待Base / Risk或新的range筛选 | 中心、边界或收益区间失配即重算。 |
| Post-event range reconfirmed | 三根bar稳定、正/均值回归结构、spot/forward及中心不确定区间被实时盈利区覆盖 | 可重新建立range thesis | 重新筛选centered与broad-range family；本次两张卡不自动转换为range订单 | 若在13:00以后，本计划只观察。 |
| Range thesis failure / boundary release | 清零稳定性计数，重新完成方向acceptance | 不继续押注失效中心 | 用对应Base / Risk条件重新评估 | 不在旧range仓位上摊平。 |
| 下方7650 acceptance | gap retest（如需）+负结构确认 | Base / downside release | Put debit vertical，先复核7625 | reclaim 7650或负结构失效；首次可评估价已越过short/下一节点则不追。 |
| 上方7700 acceptance | gap retest（如需）+上侧收复确认 | Risk / upside reclaim | Call debit vertical，先复核7750 | rejection至7700下方或正结构失效。 |
| 跳空跨过边界 | 先回测再计数 | 防止用缺失路径替代确认 | 未回测时No Trade | 重大gap重判portability并重选腿。 |
| Vol shock / node migration | 新同步map / surface / forward后重新计数 | 原先验需重置 | 暂停新开；持仓按失效与剩余风险处理 | 不用旧quote或旧计数恢复入场。 |
| 11:45以后 / 12:45 / 13:00事件 | 时间门禁 | 事件与剩余流动性优先 | 11:45停止新开、12:45前清仓；13:00后仅观察 | 不把上午模板延长为跨事件或隔夜计划。 |

## 11. XSP Strategy Cards and Quote Protocol

### Strategy-Family Screening Summary

| Linked scenario | Payoff archetype / family | Structural fit | Term / skew fit | Pricing / risk fit | Status | Rejection or next check |
| --- | --- | --- | --- | --- | --- | --- |
| Base | Directional put debit vertical | 对应已确认的下行释放 | Short lower put部分融资下侧翼 | Debit封顶；需要目标时点正edge | conditional / 保留 | 7650下方确认，live actual wings与净清算估值。 |
| Risk | Directional call debit vertical | 对应7700收复 | 上翼融资、保留上行delta | Debit封顶；会封顶继续上涨收益 | conditional / 保留 | 先复核7750，避免追过short strike。 |
| Directional alternative | Butterfly / broken-wing | 可把收益集中在落点附近，但当前落点不确定 | 曲率与不对称翼成本须具体检验 | 多腿成本、尾损与持有时点盈利区未闭合 | conditional / 未选 | 不能仅凭body估计误差否定；当前也不能证明优于vertical。 |
| Stable range alternative | Centered debit butterfly | 当前PM负、中心未重确认 | Partial曲面不足以批准pin | spot/forward与中心区间包含关系未通过 | reject for current thesis | 新range reconfirmation后重新筛选，不自动永久排除。 |
| Broad range alternative | Defined-risk iron condor | 当前边界释放风险偏高 | 较贵翼不抵消短gamma / 短vega风险 | 虽有long wings封尾，事件、滑点与止损路径仍未闭合 | reject for current thesis | 需要新的稳定走廊和两侧压力测试。 |
| Two-sided fragility | Long straddle / strangle | 双向大幅波动有可能 | 事件峰已在保费内 | 未证明预期振幅覆盖双边premium与衰减 | conditional / 未选 | 两方向目标时点估值与总成本未证明优于触发后vertical。 |
| Term relative value | Calendar / diagonal | 非本次日内方向thesis | AM IV unavailable、cross-scope不可拼接 | 无已验证期限交易及退出机制 | not_applicable | 不因headline IV差异另开跨期策略。 |

### Local Candidate Comparison

对两种方向分别比较了2个相邻long strike × 2个宽度 × 2个expiry，合计16组，均由本包单腿报价重算；这里只披露邻域与量级，不宣称完成目标日择优。该网格独立于仅含120行、最大宽度5、最大风险200美元的两腿candidate CSV，后者不是完整策略家族或本次风险上限。

| Candidate rule / illustrative EOD neighborhood | Profit-zone coverage | Term / skew fit | Scenario edge / risk | Greeks：EOD净差 | Cost / liquidity | Portability | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Put，9/10；trigger映射附近两档long，宽度3或5，short向下 | 到期BE区间可复算；live收益区包含测试pending | 目标日1DTE，未含CPI到期窗口；actual put wings须刷新 | 4组保守ask成本最大损失84–144美元 | delta −.2105至−.1271；gamma / vega正、theta负 | Synthetic ask .760–1.240；组合宽度8.40%–12.59% mid | low | limited；短期限灵敏，不能只因保费低认定最优。 |
| Put，9/11；同一trigger附近的相邻long及3/5宽度 | 同上 | 目标日2DTE，CPI事件峰进入残余价值 | 最大损失95–165美元 | delta −.1701至−.1026；gamma / vega正、theta负 | Ask .870–1.450；宽度7.14%–10.91% | low | limited；theta较缓伴随更高保费，排名需live重做。 |
| Call，9/10；trigger映射附近两档long，宽度3或5，short向上 | 首个7750映射775；live目标/invalid估值pending | 目标日1DTE，检查实际上翼融资 | 最大损失78–136美元 | delta +.1518至+.2501；gamma / vega正、theta负 | Ask .700–1.160；宽度6.22%–10.53% | low | limited；适合研究收复，触发后已越过short则不追。 |
| Call，9/11；同一trigger附近的相邻long及3/5宽度 | 同上 | 目标日2DTE，较贵事件残余保费 | 最大损失108–186美元 | delta +.1277至+.2096；gamma / vega正、theta负 | Ask 1.000–1.660；宽度4.94%–8.33% | low | limited；较低相对spread不足以证明成本后edge。 |

同expiry、相同两腿1:1的vertical没有fly式左右对称/不对称版本；不对称payoff已在broken-wing家族中独立筛选。较宽vertical增加封顶收益，也提高debit及状态依赖的Greek暴露，不能只按最大收益排名。

**实时包含测试：** 用同步spot/forward及其误差区间，而非EOD单点，构建候选的净收益函数 `Π(S,IV,t)=100N×[V_exit(S,IV,t)−debit]−C_N`。在首/次复核点、失效位、横盘与30/60分钟退出时点，刷新ATM ±2vp及实际翼部变化后的保守清算价值；目标路径的不确定区间须在正的成本后收益区内，并留出正的模型/报价误差缓冲。当前spot/forward与该收益区的关系、center uncertainty及buffer均为pending；directional卡不要求当前spot位于“到期已盈利区”。只有重开centered家族筛选时，才要求当前spot、forward及整个中心区间被实时盈利区完整覆盖。

### Base Candidate Template — Base Case

**Setup / status：** 下破后的put debit vertical，linked scenario=Base，bounded directional debit，screening=`conditional`；representation=`candidate_template`，fixed legs仅有`candidate_template_only`权限。适用条件是第10节7650下方acceptance与负结构确认，首个复核点7625、次个7600。任何入场前reclaim、reset或已跨过拟用short/下一节点都取消；入场后reclaim 7650或负结构失效即退出该thesis。

**选择规则：** 以目标日1–3个日历DTE为初筛，当前覆盖可比较9/10与9/11；用live trigger / forward附近的实际listed long strike及一个相邻long，对比向下3/5点宽度，short与首/次复核区域的对应关系须由日内估值确认。9/9的0DTE不作Base默认期限；9/14在目标日为5DTE，超出首选窗。每次reset重新选腿，不把765 / 762预设为订单。

**Illustrative EOD example：** 仅展示9/10到期、买1份765 put / 卖1份762 put，W=3；全部逐腿quote见下面共享表。EOD组合bid / mid / ask为0.670 / 0.715 / 0.760，synthetic-only、客户视角正debit。以历史ask及C₁=8–20估算，到期净最大亏损84–96美元、净最大收益204–216美元、BE为764.04–764.16；低于相应BE才进入到期盈利区，S≤762时收益封顶，上侧最坏为付出的debit加成本。此为到期静态诊断，不是9/9退出收益。

EOD净Greek为delta −0.1271、gamma +0.0122、vega +0.0383、theta −0.0733（vendor逐腿数值净差，非美元风险尺度）；穿越long/short与时间缩短后符号及大小可能变化。例中两腿vendor IV为12.67%与13.56%，卖出的下侧翼较贵，部分抵消保费和vega/theta，代价是进一步下跌收益封顶；该腿IV诊断不替代Formal IV。真实term、翼差、Greeks及surface rank均需刷新。

相比单买put，该结构可减少初始保费及部分衰减暴露，并封顶损失；若走势不足、触发太晚、IV回落或摩擦上升，融资优势可能被收益封顶和退出成本抵消，尚未证明期望收益更高。

### Risk-Path Contingency

**Setup / status：** 7700收复后的call debit vertical，linked scenario=Risk，bounded directional debit，screening=`conditional`；同样为`candidate_template`，与Base互斥。需第10节上侧价格与结构确认，先复核7750、再7800；入场前跌回、reset或已超过拟用short/下一节点则取消，入场后rejection至7700下方或正结构失效则退出。

**选择规则：** 比较9/10与9/11、live trigger附近的相邻listed long及向上3/5点short；用实际forward、上翼IV、首复核点到时估值和剩余上行空间重选。**Illustrative EOD example：** 9/10买1份770 call / 卖1份775 call，W=5；EOD组合bid / mid / ask=1.090 / 1.125 / 1.160。以历史ask及C₁=8–20估算，到期净最大亏损124–136美元、净最大收益364–376美元、BE=771.24–771.36，高于相应BE才在到期盈利；S≥775收益封顶，下侧最坏为debit及成本。

EOD净Greek为delta +0.2501、gamma +0.0319、vega +0.1156、theta −0.3444，单位仍为vendor原始净差；例中两腿IV为10.57% / 9.79%。卖上侧call融资、减少单买call保费，但也截断775以上的到期收益；若收复失败、推进不足、IV下跌或short附近gamma变化，静态优势未必保留。正式selected smile未覆盖本候选到期日，live surface refresh=pending。

两张卡的精确历史腿仅在此作为 **illustrative_eod_legs** 展示，live selected legs、live最大debit及日内盈利区均为`pending_target_session_confirmation`。XSP spot映射gap为−0.029点；第一下行复核762.5不是本包listed strike，上行775在网格中。两者均非fly，无body/对称wing定义。

| Example / expiry | Action / type / ratio | Strike | Bid | Mid | Ask | 完整合约标识 |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Base，9/10 | Buy put，+1 | 765 | 1.740 | 1.765 | 1.790 | XSP260910P00765000 |
| Base，9/10 | Sell put，−1 | 762 | 1.030 | 1.050 | 1.070 | XSP260910P00762000 |
| Risk，9/10 | Buy call，+1 | 770 | 1.340 | 1.360 | 1.380 | XSP260910C00770000 |
| Risk，9/10 | Sell call，−1 | 775 | .220 | .235 | .250 | XSP260910C00775000 |

两张卡共用同一退出协议：目标日入场仅在t0+15m至11:45之间；**30分钟重估，最迟在入场后60分钟与12:45 ET两者较早时退出**。到首个复核节点先看可执行净价、剩余收益空间、IV与时间成本，不能把节点当成必达目标或自动止盈承诺。该时间上限是计划纪律，不保证任何市况下按预期价格退出。

下表明确区分到期算术与计划持有时点估值。示例统一用历史ask、N=1、C₁=20；“到期净损益”假设持至9/10，仅检验payoff，**不作为9/9日内edge**。

| 情景 / SPX（映射XSP） | Put示例：到期intrinsic / 净损益 | Call示例：到期intrinsic / 净损益 | 9/9计划退出时点的价值 |
| --- | --- | --- | --- |
| Base首复核7625（762.5） | 2.50点 / +154美元 | 0 / −136美元 | 两张卡均pending；分别检验盈利路径与反向尾损。 |
| Base次复核7600（760） | 3.00点 / +204美元 | 0 / −136美元 | Pending；仍有一天残余时间，不能直接记满额收益。 |
| Put失效7650（765） | 0 / −96美元 | 0 / −136美元 | Pending；实际退出价值包含剩余时间价值。 |
| Call失效7700（770） | 0 / −96美元 | 0 / −136美元 | Pending；不能把到期最大损失替代实际止损滑点。 |
| Risk首复核7750（775） | 0 / −96美元 | 5.00点 / +364美元 | Pending；触及short时日内spread不必等于宽度。 |
| Risk次复核7800（780） | 0 / −96美元 | 5.00点 / +364美元 | Pending；评估剩余收益与提前退出成本。 |
| 横盘于EOD代理 / 入场后30、60分钟 | 到期仅作stress，put −96美元 | 到期仅作stress，call −136美元 | Spot=767.35仅作诊断锚；live spot/forward与ATM ±2vp、翼部stress逐格重算。 |

## 12. Base / Risk / No-Trade Scenarios

**Base Case：** 在既定上午窗内，价格完成7650下方acceptance、必要回测与负结构确认后，预期研究路径为先7625、再评估7600；关联Base put vertical模板，节点只作重新估值位置。Reclaim 7650、负结构消失或首次可评估时已经跨过合适short/下一节点，取消或结束该thesis。

**Risk Case：** 7700上方acceptance且正shelf/新0DTE成立、正DTE PM及全链压力收窄或转正时，研究路径改为先7750、再7800；关联Risk call vertical模板。Rejection回7700下方或实时正结构失效即取消/退出；这是反向条件卡，不是预先建立的基准多头。

**No-Trade Case：** 当前没有EOD硬失败；若后续发现日期/身份错误、核心formal失效或任何有界payoff家族都无法定义，才构成EOD no-qualified-plan。目标日则以未完成reset/retest、未达acceptance、full/PM/new-0DTE不一致、quote/parity/收益区/成本/风险门禁失败，或超过时间窗为execution abort。恢复评估须重新冻结事件与map、取得合格实时报价、重选expiry/legs并完成日内估值；正常future pending、low portability及缺公开native NBBO均不单独否定盘后B级条件计划。

风险按**已实现亏损＋现有持仓最坏剩余全成本亏损＋拟新开所需风险**核算，日内不得超过500美元；单setup参考100–300美元，hard cap 300。任一时点只保留一个active setup，Base / Risk互斥，最多一次重新入场且须重新确认，两次thesis failure后停止当日交易。不裸卖、不做无限风险结构、不默认隔夜。

## 13. Tracking Variables, Execution Checklist and Data Limitations

### Tracking Variables

| Observation | Why important | 对观点 / 等级 / 执行的影响 |
| --- | --- | --- |
| 7650 / 7700的完整bar、回测与首复核路径 | 区分终值、盘中触及与真正acceptance | 确认Base或Risk；未确认保持观察。 |
| 正DTE全链、纯PM及独立新0DTE的同步signed与节点迁移 | 判断负反馈是否持续，避免AM或局部map遮蔽 | 持续符号反转可改变结构先验；字段不齐先阻止执行。 |
| 9/10 / 9/11 ATM、actual wings、event kink与Greek净暴露 | 确认升波后成本、候选排序和目标时点盈利区是否仍成立 | 改变候选选择与live edge；不把升波直接当方向预测。 |
| 10:00发布状态、13:00事件及隔夜地缘油价新信息 | 确认是否出现真实hard reset | 重判quote portability与最早评估时点；必要时重建整个计划。 |
| 净quote、carry parity、费用与剩余风险预算 | 静态可行不代表可成交，退出摩擦会侵蚀edge | 优先影响Execution Status；系统性全候选不可行才影响Plan Grade。 |


> 本文所载观点与意见仅代表作者个人立场，仅供一般性的信息与教育参考之用，不构成任何形式的投资建议、理财建议、交易建议或买卖证券的推荐。读者不应将本文的任何内容视为购买或出售任何金融工具的邀请或要约。
