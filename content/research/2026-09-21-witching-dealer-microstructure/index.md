+++
title = "三巫日与四巫日：期权到期、Dealer 对冲与收盘微观结构教程"
date = "2026-09-21"
data_as_of = "2026-09-21"
preserve_math_blocks = true
draft = false
description = "从期权到期、Dealer对冲、结算与指派到收盘竞价，建立三巫日与四巫日的微观结构观察框架。"
series = ""
categories = ["衍生品", "市场结构"]
tags = ["三巫日", "四巫日", "期权到期", "Dealer对冲", "收盘竞价"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "33a3052374b0f674ffb786a0491ff99a6f304a6f556c8ee8e3cacd68473c5a5b"
+++

{{< math >}}

# 三巫日与四巫日：期权到期、Dealer 对冲与收盘微观结构教程

> 面向：期权交易者、买方研究员、量化研究者  
> 主题：Triple Witching / Quadruple Witching、Expiration Microstructure、Dealer Hedging、Closing Auction、Exercise & Assignment  
> 目标：建立一个不依赖“看涨/看跌叙事”的、可用于实际市场观察的统一框架。

---

## 1. 核心结论

三巫日与四巫日首先是**风险迁移与结算事件**，而不是天然具有方向性的“涨跌事件”。

从市场微观结构角度，可以把到期周及到期日理解为：

\[
\boxed{
\text{Derivative Risk}
\rightarrow
\text{Hedge Adjustment}
\rightarrow
\text{Settlement / Exercise / Assignment}
}
\]

其中不同衍生品的风险迁移方式并不相同：

\[
\boxed{
\text{Options}
\Rightarrow
\Delta,\Gamma,\text{Charm},\text{Vanna},\text{Vega}
}
\]

而：

\[
\boxed{
\text{Futures}
\Rightarrow
\Delta,\text{Basis},\text{Roll},\text{Settlement}
}
\]

因此，四巫日相对三巫日增加的主要是**线性期货风险、基差收敛与展期行为**，并不会凭空增加一套新的 Gamma / Charm 机制。

更进一步，在季度第三个星期五附近，市场还经常叠加：

\[
\text{Index Rebalance}
+
\text{Closing Auction}
+
\text{MOC / LOC Flow}
\]

这些流与“衍生品到期”在机制上相互独立，但会在时间上高度重叠，尤其集中于开盘和收盘。

因此，观察三巫日或四巫日时，最重要的问题不是：

> “今天会涨还是会跌？”

而是：

\[
\boxed{
\text{什么风险正在消失？}
\quad
\text{什么风险正在被展期？}
\quad
\text{Dealer 的 hedge 需要如何变化？}
}
\]

以及：

\[
\boxed{
\text{异常价格行为发生在什么时间？}
}
\]

---

# 2. 三巫日与四巫日的定义

## 2.1 三巫日

传统意义上的 Triple Witching 指三类衍生品集中到期：

\[
\boxed{
\text{Index Options}
+
\text{Index Futures}
+
\text{Single-Stock Options}
}
\]

通常发生在季度月份：

\[
M\in\{3,6,9,12\}
\]

的第三个星期五附近。

---

## 2.2 四巫日

Quadruple Witching 在三巫日基础上增加：

\[
\boxed{
\text{Single-Stock Futures}
}
\]

因此：

\[
\boxed{
\text{Quad Witching}
=
\text{Index Options}
+
\text{Index Futures}
+
\text{Single-Stock Options}
+
\text{Single-Stock Futures}
}
\]

在美国市场历史上，“四巫日”这一术语的现实含义曾随 Single-Stock Futures 市场的存在与否而变化。其核心逻辑没有变化：**更多类别的衍生品在相近时间完成风险迁移、展期或结算。**

---

# 3. 到期日的统一 Dealer 框架

Dealer 的一个基本目标，是把自身整体账簿控制在可接受的风险范围内。

如果定义 Dealer 的净期权 Delta 为：

\[
\Delta_t^{opt}
\]

Dealer 为降低方向暴露，可以持有：

\[
H_t\approx-\Delta_t^{opt}
\]

的现货、ETF 或期货 hedge。

因此：

\[
\Pi_t
=
V_t^{opt}
+
H_t S_t
\]

在局部范围内尽量维持：

\[
\frac{\partial \Pi_t}{\partial S}
\approx0
\]

即 Delta-neutral 或近似 Delta-neutral。

但问题在于：

\[
\Delta_t^{opt}
\]

不是常数。

其变化可写成近似分解：

\[
d\Delta
\approx
\Gamma\,dS
+
\text{Vanna}\,d\sigma
+
\text{Charm}\,dt
+
d\Delta_{\text{flow}}
\]

其中：

- \(\Gamma dS\)：由标的价格变化引起的 Delta 变化；
- \(\text{Vanna}\,d\sigma\)：由隐含波动率变化引起的 Delta 变化；
- \(\text{Charm}\,dt\)：由时间流逝引起的 Delta 变化；
- \(d\Delta_{\text{flow}}\)：客户新交易、平仓、展期带来的风险变化。

于是 Dealer 的 hedge adjustment 大约为：

\[
\boxed{
dH\approx-d\Delta
}
\]

这是理解整个到期日市场交互的核心方程。

---

# 4. 为什么到期日特别特殊

对于一个欧式期权，Black-Scholes 框架下：

\[
\Delta_C=N(d_1)
\]

其中：

\[
d_1=
\frac{
\ln(S/K)+(r-q+\frac12\sigma^2)T
}{
\sigma\sqrt T
}
\]

Gamma 为：

\[
\Gamma
=
\frac{\phi(d_1)}
{S\sigma\sqrt T}
\]

当：

\[
T\rightarrow0
\]

对于接近 ATM 的期权：

\[
\Gamma_{\text{ATM}}
\rightarrow\text{large}
\]

因此非常小的：

\[
dS
\]

也可能带来较大的：

\[
d\Delta
\]

即：

\[
d\Delta\approx\Gamma\,dS
\]

这意味着 Dealer 需要更频繁、更迅速地重新 hedge。

与此同时，Vega：

\[
\text{Vega}
=
S\phi(d_1)\sqrt T
\]

满足：

\[
T\rightarrow0
\Rightarrow
\text{Vega}\rightarrow0
\]

所以到期日下午，近端期权的风险特征逐渐从：

\[
\text{Volatility Exposure}
\]

转化为：

\[
\boxed{
\text{Highly Localized Delta/Gamma Exposure}
}
\]

特别集中在：

\[
S\approx K
\]

的 strike 附近。

---

# 5. 到期日期权的“二元化”

当：

\[
T\rightarrow0
\]

Call Delta 逐渐趋向：

\[
\Delta_C
\rightarrow
\begin{cases}
1,&S>K\\
0,&S<K
\end{cases}
\]

Put Delta 则趋向：

\[
\Delta_P
\rightarrow
\begin{cases}
0,&S>K\\
-1,&S<K
\end{cases}
\]

因此到期日下午，整个期权链可以分成三类：

### Deep OTM

\[
|\Delta|\rightarrow0
\]

边际 hedge requirement 快速消失。

### Near ATM

\[
|\Gamma|\ \text{large}
\]

是 Gamma、pin risk 与 hedge adjustment 最集中的区域。

### Deep ITM

\[
|\Delta|\rightarrow1
\]

经济上越来越接近股票或 forward exposure。

因此：

\[
\boxed{
\text{Expiration-Day Risk}
\text{高度集中于 Spot 附近的 Strikes}
}
\]

这也是为什么“某个远离现价的 strike 有巨大 OI”并不自动意味着它对尾盘价格有巨大影响。

---

# 6. Long Gamma 与 Short Gamma 的市场交互

## 6.1 Dealer Long Gamma

如果 Dealer 整体 long gamma：

\[
\Gamma_D>0
\]

当：

\[
dS>0
\]

Dealer Delta 增加，因此为了重新中性化：

\[
dH<0
\]

即卖出现货或期货。

反之：

\[
dS<0
\Rightarrow
dH>0
\]

即买入标的。

因此：

\[
\boxed{
S\uparrow\Rightarrow Sell
}
\]

\[
\boxed{
S\downarrow\Rightarrow Buy
}
\]

这是一种负反馈结构。

在其他条件相同的情况下，可能表现为：

\[
\text{Realized Volatility}\downarrow
\]

以及一定程度的：

\[
\text{Mean Reversion / Pinning}
\]

---

## 6.2 Dealer Short Gamma

如果：

\[
\Gamma_D<0
\]

则：

\[
S\uparrow
\Rightarrow
Dealer\ Buy
\]

\[
S\downarrow
\Rightarrow
Dealer\ Sell
\]

形成正反馈：

\[
\boxed{
\text{Price Move}
\rightarrow
\text{Hedge in Same Direction}
\rightarrow
\text{Additional Price Pressure}
}
\]

因此在 short-gamma 环境中，价格路径可能更容易形成：

\[
\text{Momentum-like Intraday Amplification}
\]

---

# 7. Charm：即使价格不动，Dealer 也可能交易

Charm 可以理解为：

\[
\text{Charm}
=
\frac{\partial\Delta}{\partial t}
\]

因此即使：

\[
dS=0
\]

仍然可能有：

\[
d\Delta
=
\text{Charm}\,dt
\neq0
\]

临近到期时，如果一个 Call 略微 OTM：

\[
S<K
\]

随着：

\[
T\rightarrow0
\]

其 Delta 通常趋向：

\[
\Delta\rightarrow0
\]

如果 Dealer short call、原本持有正 Delta hedge，那么随着 Delta 消失：

\[
H_t\rightarrow0
\]

Dealer 可能逐步卖掉原 hedge。

反过来，如果该 Call 略微 ITM：

\[
S>K
\]

则：

\[
\Delta\rightarrow1
\]

对应 hedge requirement 又可能向另一方向变化。

因此：

\[
\boxed{
\Gamma
=
\text{价格移动导致的 hedge flow}
}
\]

而：

\[
\boxed{
Charm
=
\text{时间流逝导致的 hedge flow}
}
\]

二者在 expiration afternoon 都可能非常重要。

---

# 8. Vanna 与到期日

Vanna 描述：

\[
\text{Vanna}
=
\frac{\partial\Delta}{\partial\sigma}
=
\frac{\partial \text{Vega}}{\partial S}
\]

当隐含波动率变化时：

\[
d\sigma\neq0
\]

期权 Delta 也可能变化：

\[
d\Delta
\approx
\text{Vanna}\,d\sigma
\]

因此 Dealer hedge 调整的一般式仍然应理解为：

\[
\boxed{
dH
\approx
-\left(
\Gamma dS
+
\text{Vanna}\,d\sigma
+
\text{Charm}\,dt
+
d\Delta_{\text{flow}}
\right)
}
\]

不过随着：

\[
T\rightarrow0
\]

Vega 本身快速衰减，因此实际到期日尾盘的主导因素通常更偏向：

\[
\Gamma,\ \text{Charm},\ \text{exercise uncertainty}
\]

而不是传统意义上的长期 volatility exposure。

---

# 9. 到期周：Roll 才是第一阶段

到期风险并不是等到周五才开始处理。

对于 Futures：

\[
F_{near}\rightarrow F_{next}
\]

一个典型 roll 可以写为：

\[
Sell\ F_{near}
+
Buy\ F_{next}
\]

因此：

\[
OI_{near}\downarrow
\]

\[
OI_{next}\uparrow
\]

但并不意味着所有到期 OI 都在到期时刻突然平仓。

对 Options 也是类似：

\[
Option_{near}
\rightarrow
Option_{next}
\]

但 option roll 更复杂，因为风险迁移包括：

\[
\Delta,\Gamma,\text{Vega},\text{Vanna},\text{Charm}
\]

所以一个 option roll 应被理解成：

\[
\boxed{
\text{Front-End Greeks disappear}
+
\text{Back-End Greeks appear}
}
\]

同时可能伴随：

\[
\Delta_{\text{front}}
\neq
\Delta_{\text{back}}
\]

于是 Dealer 还需要重新调整股票或期货 hedge。

---

# 10. 指数期货：Basis 与 Roll

指数期货近似满足：

\[
F_t
=
S_t e^{(r-q)(T-t)}
\]

因此 basis 为：

\[
B_t
=
F_t-S_t
\]

随着：

\[
T-t\rightarrow0
\]

有：

\[
B_t\rightarrow0
\]

即：

\[
\boxed{
F_T\rightarrow S_T
}
\]

因此到期日附近会存在：

\[
\text{Basis Convergence}
\]

套利者可能持有：

\[
Long\ Spot
+
Short\ Future
\]

或：

\[
Short\ Spot
+
Long\ Future
\]

随着合约临近到期，上述 basis trade 需要 roll、结算或 unwind。

这类流属于：

\[
\boxed{
\text{Linear Delta / Basis Flow}
}
\]

与 option gamma hedging 的机制不同。

---

# 11. 个股期货：四巫日新增的主要机制

Single-Stock Futures 本质上仍然是线性衍生品。

其局部 Delta 近似：

\[
\frac{\partial F}{\partial S}
\approx1
\]

而：

\[
\Gamma_F\approx0
\]

\[
\text{Vega}_F\approx0
\]

因此 SSF 不会制造类似 ATM option 的 Gamma concentration。

如果 Dealer：

\[
Short\ F
\]

并以：

\[
Long\ S
\]

进行 hedge，那么在期货头寸到期或被平仓时：

\[
Short\ F\rightarrow0
\]

原来的：

\[
Long\ S
\]

可能不再需要，于是需要 unwind。

因此 SSF 增加的是：

\[
\boxed{
\text{Linear Delta Hedge}
+
\text{Basis Convergence}
+
\text{Roll}
+
\text{Settlement Flow}
}
\]

而不是：

\[
\boxed{
\text{Additional Gamma Event}
}
\]

所以：

\[
\text{Quad Witching}
\neq
4\times\text{Gamma Effect}
\]

---

# 12. 到期日开盘：AM Settlement 与 SOQ

对于部分传统美股指数衍生品，到期结算依赖：

\[
\text{SOQ}
=
\text{Special Opening Quotation}
\]

SOQ 通常由指数成分股当天的官方开盘价构造。

因此：

\[
\boxed{
\text{Opening Auction}
}
\]

本身就是季度到期日的重要事件。

尤其对：

- 某些标准 AM-settled index options；
- 某些季度股指期货；

真正的 settlement-sensitive 时点更接近：

\[
09{:}30\ ET
\]

附近，而不是 16:00。

因此季度三巫/四巫日不应只盯尾盘。

更完整的结构是：

\[
\boxed{
\text{Morning Settlement Flow}
+
\text{Intraday Option Hedging}
+
\text{Closing Auction Flow}
+
\text{After-Hours Assignment Risk}
}
\]

---

# 13. PM-Settled Index Options

对于 PM-settled、European-style、cash-settled index options：

\[
\text{Payoff}
=
m\cdot\max(S_T-K,0)
\]

或：

\[
m\cdot\max(K-S_T,0)
\]

其中 \(m\) 为合约乘数。

一旦 settlement value 已经确定：

\[
V_{expiring}\rightarrow Cash
\]

此后：

\[
\boxed{
\text{No Exercise Choice}
}
\]

\[
\boxed{
\text{No Physical Stock Delivery}
}
\]

\[
\boxed{
\text{No After-Hours Assignment Uncertainty}
}
\]

因此，对于现金结算指数期权：

\[
16{:}00+
\]

市场价格继续变化，并不会改变已经确定的到期期权 payoff。

从 Dealer 角度：

\[
\text{Greek Risk}
\rightarrow0
\]

需要保留的只是整体 book 中其他尚未到期的产品风险。

---

# 14. 个股期权：Physical Settlement 的本质

单股期权通常属于：

\[
\boxed{
\text{Physical Settlement}
}
\]

例如 Call 被 exercise 后：

\[
Long\ Call
\Rightarrow
Buy\ Stock\ at\ K
\]

而 short call holder 被 assignment：

\[
Short\ Call
\Rightarrow
Deliver\ Stock\ at\ K
\]

Put 同理。

这意味着：

\[
\boxed{
\text{Expiration}
\neq
\text{Risk disappears instantly at close}
}
\]

因为在收盘之后还存在：

\[
\text{Exercise Decision}
\]

\[
\text{Do-Not-Exercise Instruction}
\]

\[
\text{Assignment Probability}
\]

以及最终：

\[
\text{Physical Delivery}
\]

---

# 15. 为什么 Deep ITM Hedge 不一定产生“到期后大幅平仓”

这是一个极其重要的微观结构问题。

假设 Dealer short 一个 Deep ITM Call：

\[
\Delta_C\rightarrow1
\]

则 Dealer 的 option Delta 约为：

\[
\Delta_D^{opt}\approx-1
\]

为了 hedge：

\[
H\approx+1
\]

即持有相当于一股标的的多头 hedge。

到期后，如果客户 exercise，Dealer 被 assignment，需要交付：

\[
1\ \text{share}
\]

Dealer 原本持有的 hedge 正好可以用于交割。

因此：

\[
\boxed{
\text{Long Stock Hedge}
+
\text{Short ITM Call Assignment}
\rightarrow
0
}
\]

也就是说：

\[
\boxed{
\text{Physical Settlement itself can consume the hedge}
}
\]

所以“期权到期后 Dealer 一定要把所有 hedge 股票卖掉”是错误的。

类似地，对于 short deep-ITM put：

\[
\Delta_P\rightarrow-1
\]

Dealer 的 short put Delta：

\[
\Delta_D^{opt}\rightarrow+1
\]

可能通过 short stock hedge 抵消。

一旦 put 被 assignment，Dealer 接收股票，接收到的股票可以自然抵消原 short-stock hedge。

---

# 16. 真正麻烦的是 ATM：Pin Risk

如果：

\[
S_T\approx K
\]

那么期权是否最终被 exercise 可能高度不确定。

在 \(T\rightarrow0\) 时：

\[
\Delta
\]

对微小的 \(S-K\) 极其敏感。

因此 Dealer 面临：

\[
\boxed{
\text{Expected Assignment}
\neq
\text{Actual Assignment}
}
\]

这就是：

\[
\boxed{
\text{Pin Risk}
}
\]

从风险形式上看，到期前是：

\[
\text{Greek Risk}
\]

到期后则逐渐转化为：

\[
\boxed{
\text{Settlement / Assignment Risk}
}
\]

---

# 17. 盘后：为什么个股期权与指数期权完全不同

这是整个 expiration tutorial 中最需要单独理解的一部分。

对于现金结算指数期权：

\[
\boxed{
\text{Settlement Fixed}
\Rightarrow
\text{No Further Exercise Decision}
}
\]

而对于个股期权：

\[
\boxed{
\text{Close}
\neq
\text{Final Knowledge of Assignment}
}
\]

设收盘价：

\[
S_c
\]

strike 为：

\[
K
\]

收盘时：

\[
S_c-K\approx0
\]

若盘后价格：

\[
S_{AH}
\]

发生明显变化，则 option holder 对 exercise 的经济动机可能发生变化。

因此：

\[
\boxed{
S_{AH}
\rightarrow
\text{Exercise Incentive}
\rightarrow
\text{Assignment Probability}
}
\]

Dealer 原先根据：

\[
S_c
\]

估计：

\[
E[N_{\text{assigned}}]
\]

但盘后变化可能导致：

\[
N_{\text{actual}}
\neq
E[N_{\text{assigned}}]
\]

因此 Dealer 最终股票风险为：

\[
Q_{\text{unexpected}}
=
\left(
N_{\text{actual}}
-
E[N_{\text{assigned}}]
\right)
\times m
\]

其中 \(m\) 为每张合约对应的股票数量。

于是 Dealer 可能需要在盘后使用：

- 股票；
- ETF；
- 指数期货；
- 相关 beta hedge；

对这一不确定性进行管理。

因此，个股期权到期后的盘后阶段可以概括为：

\[
\boxed{
\text{Greek Risk}
\rightarrow
\text{Exercise / Assignment Uncertainty}
}
\]

---

# 18. Exercise-by-Exception 与 Contrary Instruction

在美国市场，深度 ITM / OTM 的绝大多数合约，其 exercise 结果通常高度可预期。

但对：

\[
S\approx K
\]

的合约，仍需要考虑：

\[
\text{Exercise-by-Exception}
\]

和：

\[
\text{Contrary Exercise Instruction}
\]

的可能性。

也就是说，收盘时：

\[
S_c>K
\]

并不应被机械理解为：

\[
P(\text{exercise})=1
\]

同样：

\[
S_c<K
\]

也不意味着：

\[
P(\text{exercise})=0
\]

对于非常接近 strike 的合约，更合理的 Dealer 模型是：

\[
P(\text{assignment})
\in(0,1)
\]

并随着盘后价格、客户类型、券商截止时间、交易成本等因素变化。

这就是为什么 Dealer 在个股期权到期日 16:00 后仍然不能完全“下班”。

---

# 19. Closing Auction：为什么 15:50 以后要换一套思维

到期日下午，尤其 15:50 ET 以后，股票市场进入 Closing Auction 主导程度快速上升的阶段。

这时价格形成不再只是连续订单簿：

\[
\text{Continuous Limit Order Book}
\]

还逐渐受到：

\[
\text{MOC}
\]

\[
\text{LOC}
\]

\[
\text{Auction Imbalance}
\]

影响。

可以写成：

\[
P_{close}
=
f(
Q_{MOC},
Q_{LOC},
Q_{imbalance},
Q_{liquidity},
Q_{rebalance},
Q_{dealer}
)
\]

其中：

- \(Q_{MOC}\)：Market-on-Close；
- \(Q_{LOC}\)：Limit-on-Close；
- \(Q_{imbalance}\)：收盘竞价失衡；
- \(Q_{rebalance}\)：指数调整等被动资金；
- \(Q_{dealer}\)：dealer hedge flow。

因此，当：

\[
t\rightarrow16{:}00
\]

某只股票突然快速移动，不能简单归因于：

\[
\text{Gamma Squeeze}
\]

而必须同时检查：

\[
\boxed{
\text{Option Flow}
+
\text{Closing Auction}
+
\text{Index Flow}
}
\]

---

# 20. Index Rebalance 与 Witching 必须分开

指数季度再平衡：

\[
\boxed{
\text{Index Rebalance}
}
\]

和：

\[
\boxed{
\text{Derivative Expiration}
}
\]

是两套不同机制。

Index rebalance 可能来自：

- 成分股加入/删除；
- free-float 调整；
- shares outstanding 变化；
- 权重变化；
- 指数规则调整。

被动资金希望：

\[
\min
\left|
R_{fund}
-
R_{index}
\right|
\]

因此其目标函数更接近：

\[
\boxed{
\min \text{Tracking Error}
}
\]

而不一定是：

\[
\boxed{
\min \text{Execution Price}
}
\]

所以大量指数基金会倾向于：

\[
\boxed{
\text{Trade Near Official Close}
}
\]

这也是为什么 rebalance day 的 closing auction 往往异常巨大。

如果：

\[
\text{Index Rebalance}
\]

与：

\[
\text{Quarterly Expiration}
\]

重叠，那么：

\[
\boxed{
\text{Passive Flow}
+
\text{Dealer Flow}
+
\text{Closing Auction Flow}
}
\]

可能同时集中在：

\[
15{:}50-16{:}00
\]

但三者的经济动因必须分别分析。

---

# 21. 三巫/四巫日全天时间轴

下面给出一个更准确的统一框架。

---

## T-5 到 T-1：到期周

主要活动：

\[
\text{Futures Roll}
\]

\[
\text{Option Roll}
\]

\[
\text{OI Migration}
\]

\[
\text{Basis Adjustment}
\]

重点观察：

\[
OI_{near}
\]

\[
OI_{next}
\]

\[
V_{calendar}
\]

\[
IV_{front}
\]

以及近端与远端 Greeks 结构。

---

## 到期日上午开盘附近

重点：

\[
\text{SOQ}
\]

\[
\text{AM Settlement}
\]

\[
\text{Opening Auction}
\]

\[
\text{Index Futures Settlement}
\]

此时应优先关注：

\[
\boxed{
\text{Opening Flow}
}
\]

而不是将所有 expiration effect 都归到尾盘。

---

## 09:30–15:00

主要是：

\[
\text{0DTE Trading}
\]

\[
\text{Close / Roll Expiring Options}
\]

\[
\text{Dealer Delta Rebalancing}
\]

Dealer hedge：

\[
dH
\approx
-\left(
\Gamma dS
+
\text{Charm}\,dt
+
\text{Vanna}\,d\sigma
+
d\Delta_{\text{flow}}
\right)
\]

---

## 15:00–15:30

此时：

\[
T\downarrow
\]

期权逐渐二元化。

市场关注点从：

\[
\text{Whole Option Chain}
\]

集中到：

\[
\boxed{
\text{Spot-adjacent Strikes}
}
\]

---

## 15:30–15:50

这是：

\[
\boxed{
\Gamma + Charm
}
\]

越来越重要的阶段。

如果 Spot 穿越重要 strike：

\[
S_t-K
\]

符号变化可能导致：

\[
\Delta_t
\]

快速变化。

---

## 15:50–16:00

进入：

\[
\boxed{
\text{Option Microstructure}
+
\text{Equity Auction Microstructure}
}
\]

叠加区。

重点检查：

\[
Q_{imbalance}
\]

\[
Q_{MOC}
\]

\[
Q_{LOC}
\]

\[
Q_{rebalance}
\]

以及：

\[
GEX,\ DEX,\ Charm,\ Vanna
\]

但不能把后者当作唯一解释。

---

## 16:00

此时应区分：

### PM Cash-Settled Index Options

\[
V_{expiring}\rightarrow Cash
\]

### Cash-Settled Futures / SSF

\[
F_{expiring}\rightarrow Settlement
\]

### Physical-Settled Equity Options

进入：

\[
\boxed{
\text{Exercise / Assignment Phase}
}
\]

而非立即完全消失。

---

## 16:00 以后

### 对现金结算产品

\[
\text{Expiration Risk}\approx0
\]

### 对个股期权

仍需处理：

\[
P(\text{exercise})
\]

\[
P(\text{assignment})
\]

\[
Q_{\text{unexpected stock}}
\]

所以：

\[
\boxed{
\text{Single-Stock Option Risk Continues After Close}
}
\]

---

# 22. 一个完整的风险迁移图

```text
T-5 ~ T-1
│
├─ Futures Roll
├─ Options Roll
├─ OI Migration
├─ Basis Adjustment
│
▼
Expiration Friday Morning
│
├─ Opening Auction
├─ SOQ
├─ AM-settled Index Options
├─ Quarterly Index Futures Settlement
│
▼
Intraday
│
├─ 0DTE Flow
├─ Gamma Hedging
├─ Charm Hedging
├─ Vanna Effects
├─ Customer Close / Roll
│
▼
15:30
│
├─ Option Delta Binary Transition
├─ Near-ATM Gamma Concentration
│
▼
15:50
│
├─ Closing Imbalance
├─ MOC / LOC
├─ Index Rebalance
├─ Dealer Hedge
│
▼
16:00
│
├─ PM Cash Settlement
├─ Closing Auction
├─ Futures / SSF Settlement
│
└─ Equity Options → Exercise / Assignment
        │
        ▼
After Hours
│
├─ Exercise Incentive Changes
├─ Contrary Instructions
├─ Assignment Uncertainty
├─ Dealer Residual Stock Hedge
│
▼
Clearing / Physical Settlement
```

---

# 23. 如何归因异常价格行为

判断 witching day 的异常走势时，第一变量应当是：

\[
\boxed{t}
\]

即发生时间。

---

## 如果发生在开盘附近

优先检查：

\[
\text{SOQ}
\]

\[
\text{Opening Auction}
\]

\[
\text{AM Settlement}
\]

---

## 如果发生在 10:00–15:00

优先检查：

\[
\text{Gamma}
\]

\[
\text{0DTE Flow}
\]

\[
\text{News / Fundamental Information}
\]

---

## 如果发生在 15:30–15:50

优先检查：

\[
\text{Gamma}
+
\text{Charm}
+
\text{Roll}
\]

---

## 如果发生在 15:50–16:00

增加：

\[
\text{Closing Imbalance}
\]

\[
\text{Index Rebalance}
\]

\[
\text{MOC / LOC}
\]

---

## 如果恰好发生在 16:00 附近

第一优先级应检查：

\[
\boxed{
\text{Closing Auction Print}
}
\]

而不是立即归因为：

\[
\text{Gamma Squeeze}
\]

---

## 如果发生在 16:00 以后

对于个股：

\[
\text{News}
\]

\[
\text{After-Hours Liquidity}
\]

\[
\text{Exercise / Assignment Risk}
\]

都需要考虑。

---

# 24. GEX、DEX、OI：哪些是事实，哪些是估计

这是实际使用 Dealer-flow 数据时必须严格区分的一点。

Open Interest：

\[
OI(K,T)
\]

是可观察的市场数据。

但：

\[
OI
\]

并不告诉你：

- customer 是 long 还是 short；
- Dealer 是否是对手方；
- Dealer 在 OTC book 上有何抵消头寸；
- Dealer 是否通过其他 strike / maturity 对冲；
- Dealer 是否使用 stock、ETF、futures 或其他 option hedge。

因此：

\[
\boxed{
OI
\neq
Dealer Position
}
\]

同样：

\[
\boxed{
GEX_{\text{vendor}}
}
\]

通常是模型估计。

常见估计形式类似：

\[
GEX(K,T)
=
OI(K,T)
\times
\Gamma(K,T)
\times
m
\times
S^\alpha
\times
\text{Sign Assumption}
\]

其中最不确定的通常就是：

\[
\text{Sign Assumption}
\]

因此：

\[
\boxed{
GEX
=
\text{Positioning Model}
}
\]

不是：

\[
\boxed{
\text{Direct Observation of Dealer Book}
}
\]

专业使用方式应该是：

\[
\text{OI}
+
\text{Option Volume}
+
\text{Trade Direction}
+
\text{IV Surface}
+
\text{Spot Path}
+
\text{Auction Data}
\]

共同解释。

---

# 25. Gamma Wall / Call Wall / Put Wall 应如何理解

所谓：

\[
\text{Gamma Wall}
\]

或：

\[
\text{Call Wall}
\]

本质上通常是在某一 strike：

\[
K^*
\]

附近存在较大的：

\[
OI\times\Gamma
\]

估计。

真正有经济意义的问题并不是：

> “这里是不是一道不可突破的墙？”

而是：

\[
\boxed{
\left|
\frac{\partial\Delta_D}
{\partial S}
\right|
}
\]

在该区域是否足够大，从而：

\[
\boxed{
|dH|
=
|\Gamma_D\,dS|
}
\]

可能达到对现货流动性有意义的规模。

所以一个 strike 是否重要，应至少同时取决于：

\[
K-S
\]

\[
T
\]

\[
OI
\]

\[
IV
\]

\[
\Gamma
\]

\[
\text{Dealer Sign}
\]

以及：

\[
\text{Underlying Liquidity}
\]

---

# 26. 一个更严谨的 Expiry Dealer-Flow 表达式

可以定义 Dealer 在某一标的上的近似 hedge demand：

\[
H_t
=
-\sum_{i=1}^{N}
q_i m_i \Delta_i(S_t,\sigma_t,T_i)
\]

其中：

- \(q_i\)：Dealer 在第 \(i\) 个期权上的净仓位；
- \(m_i\)：合约乘数；
- \(\Delta_i\)：该期权 Delta。

那么：

\[
dH_t
=
-
\sum_i
q_i m_i
\left(
\Gamma_i dS_t
+
\text{Vanna}_i d\sigma_t
+
\text{Charm}_i dt
\right)
-
dH_{\text{flow}}
\]

其中：

\[
dH_{\text{flow}}
\]

表示客户新订单、平仓、roll 导致的 hedge 变化。

这说明实际 dealer flow 是：

\[
\boxed{
\text{Existing Position Dynamics}
+
\text{New Client Flow}
}
\]

的叠加。

---

# 27. Closing Auction 与 Dealer Flow 的统一表达

尾盘可以把股票净订单失衡近似写成：

\[
Q_{\text{net}}
=
Q_{\text{dealer}}
+
Q_{\text{index}}
+
Q_{\text{MOC}}
+
Q_{\text{LOC}}
+
Q_{\text{arb}}
+
Q_{\text{active}}
\]

Closing price：

\[
P_c
=
\mathcal{F}
\left(
Q_{\text{net}},
L_{\text{auction}}
\right)
\]

其中：

\[
L_{\text{auction}}
\]

表示 closing auction 可用流动性。

因此：

\[
\boxed{
\text{Large }P_c-P_{15:59}
}
\]

不意味着：

\[
\boxed{
\text{Large Dealer Gamma Flow}
}
\]

也可能主要是：

\[
Q_{\text{index}}
\]

或者：

\[
Q_{\text{MOC}}
\]

导致。

---

# 28. 为什么四巫日不一定比三巫日“更剧烈”

市场影响取决于：

\[
\text{Notional Exposure}
\]

\[
\text{Net Position}
\]

\[
\text{Remaining OI}
\]

\[
\text{Already Rolled Fraction}
\]

\[
\text{Liquidity}
\]

而不是“witch 数量”。

可以形式化写成：

\[
Impact
=
f(
N,
OI_{\text{net}},
R_{\text{rolled}},
\Gamma,
\text{Basis},
L
)
\]

其中：

- \(N\)：名义规模；
- \(OI_{\text{net}}\)：真正剩余的净暴露；
- \(R_{\text{rolled}}\)：已经提前展期的比例；
- \(L\)：市场流动性。

如果：

\[
OI_{\text{SSF}}
\]

很小，那么增加“第四巫”对现货市场的边际影响可能很有限。

因此：

\[
\boxed{
\text{Quad Witching}
\not\Rightarrow
\text{More Volatility}
}
\]

它只意味着：

\[
\boxed{
\text{More Settlement / Roll Channels Exist}
}
\]

---

# 29. 季度三巫 / 四巫日的完整观察框架

## Step 1：到期周初

观察：

\[
OI_{near}
\]

\[
OI_{next}
\]

\[
V_{calendar}
\]

\[
\text{Futures Basis}
\]

目的：

\[
\boxed{
\text{判断多少风险已经提前迁移}
}
\]

---

## Step 2：到期日前一日

观察：

\[
\text{Near-ATM OI}
\]

\[
\text{Front IV}
\]

\[
\text{Gamma Distribution}
\]

\[
\text{Index Rebalance Schedule}
\]

同时确认：

\[
\boxed{
\text{AM-settled vs PM-settled}
}
\]

---

## Step 3：周五开盘

观察：

\[
\text{Opening Auction}
\]

\[
\text{SOQ-sensitive Products}
\]

\[
\text{Index Futures Settlement}
\]

不要把早盘异常全部误判为信息型交易。

---

## Step 4：日内

观察：

\[
S_t-K_j
\]

对每个关键 strike \(K_j\)。

重点看：

\[
\Gamma_j(T_t)
\]

\[
\text{Charm}_j(T_t)
\]

以及：

\[
dS_t
\]

和：

\[
d\sigma_t
\]

---

## Step 5：15:30 后

把分析从“整个 chain”缩小到：

\[
\boxed{
|S-K|\approx0
}
\]

附近的 strikes。

---

## Step 6：15:50 后

新增：

\[
\text{Closing Imbalance}
\]

\[
\text{MOC / LOC}
\]

\[
\text{Index Flow}
\]

此时：

\[
\boxed{
\text{Auction Microstructure}
}
\]

的重要性快速上升。

---

## Step 7：16:00

比较：

\[
P_{15:59:59}
\]

与：

\[
P_{auction}
\]

如果：

\[
|P_{auction}-P_{15:59:59}|
\]

异常大，应首先判断：

\[
\boxed{
\text{Auction Price Impact}
}
\]

---

## Step 8：盘后

对 cash-settled index products：

\[
\text{Expiration Risk}\approx0
\]

对 single-stock options：

\[
\boxed{
P(\text{exercise})
,\ 
P(\text{assignment})
}
\]

成为新的核心变量。

---

# 30. 一个实用的市场归因树

```text
异常价格行为
│
├─ 发生在 Opening？
│    ├─ SOQ
│    ├─ AM Settlement
│    └─ Opening Auction
│
├─ 发生在普通日内？
│    ├─ News
│    ├─ 0DTE
│    ├─ Gamma
│    └─ New Option Flow
│
├─ 发生在 15:30–15:50？
│    ├─ Gamma
│    ├─ Charm
│    └─ Expiry Roll
│
├─ 发生在 15:50–16:00？
│    ├─ Gamma / Charm
│    ├─ Closing Imbalance
│    ├─ MOC / LOC
│    └─ Index Rebalance
│
├─ 恰好 16:00 跳变？
│    └─ Closing Auction Priority Check
│
└─ 发生在 After Hours？
     ├─ News
     ├─ Thin Liquidity
     ├─ Late / Corrected Prints
     └─ Equity Option Exercise / Assignment
```

---

# 31. 从研究角度，最容易犯的错误

### 错误一

\[
\text{OPEX}
\Rightarrow
\text{Dealer 一定买}
\]

错误。

方向取决于：

\[
\Gamma_D
\]

\[
\Delta_D
\]

\[
\text{Customer Flow}
\]

\[
\text{Spot Path}
\]

---

### 错误二

\[
OI
\Rightarrow
Dealer\ Position
\]

错误。

正确：

\[
OI
=
\text{Gross Open Contracts}
\]

但 Dealer side 需要估计。

---

### 错误三

看到 16:00 巨大价格跳变就归因于：

\[
\text{Gamma Squeeze}
\]

应优先检查：

\[
\text{Closing Auction}
\]

---

### 错误四

认为所有 futures expiry 都主要影响 16:00。

实际上部分季度指数期货 / AM-settled index derivatives 的关键 settlement 时点在：

\[
\boxed{
\text{Expiration Friday Opening}
}
\]

---

### 错误五

认为：

\[
\text{Expiration}
=
\text{所有 hedge 立即平仓}
\]

对于 physically settled equity options，Deep ITM hedge 可能通过 assignment 自然消失。

---

### 错误六

认为：

\[
16{:}00
\]

以后个股期权风险就完全结束。

实际上：

\[
\boxed{
\text{Exercise / Assignment Uncertainty}
}
\]

可能继续存在。

---

# 32. 对现金结算指数期权与个股期权的最终比较

| 维度 | Cash-Settled Index Option | Physical-Settled Equity Option |
|---|---|---|
| Settlement | Cash | Stock |
| Exercise Style | 常见 European | 常见 American |
| 到期后股票交割 | 无 | 有 |
| Deep ITM hedge | Settlement 后风险消失 | 可通过 assignment 消化 |
| 盘后 exercise uncertainty | 基本无 | 有 |
| Pin risk | Settlement-level risk | Exercise/assignment risk 更复杂 |
| Dealer 16:00 后关注点 | Remaining book | Assignment probability |
| After-hours stock move | 不改变已确定 settlement | 可能改变 exercise incentive |

因此最重要的区别可以压缩为：

\[
\boxed{
\text{Index Option}
:
\text{Settlement Risk}
}
\]

对比：

\[
\boxed{
\text{Single-Stock Option}
:
\text{Settlement + Assignment Risk}
}
\]

---

# 33. 三巫日与四巫日的最简统一模型

可以把季度 witching day 的市场净流写成：

\[
Q_t
=
Q_t^{option}
+
Q_t^{futures}
+
Q_t^{index}
+
Q_t^{auction}
+
Q_t^{active}
\]

其中：

\[
Q_t^{option}
=
-\left(
\Gamma_D dS
+
\text{Charm}_D dt
+
\text{Vanna}_D d\sigma
+
d\Delta_{\text{flow}}
\right)
\]

而：

\[
Q_t^{futures}
=
Q_t^{roll}
+
Q_t^{basis}
+
Q_t^{settlement}
\]

指数调整流：

\[
Q_t^{index}
=
Q_t^{rebalance}
\]

竞价流：

\[
Q_t^{auction}
=
Q_t^{MOC}
+
Q_t^{LOC}
+
Q_t^{imbalance}
\]

于是：

\[
\boxed{
Q_t^{total}
=
Q_t^{option}
+
Q_t^{futures}
+
Q_t^{rebalance}
+
Q_t^{auction}
+
Q_t^{information}
}
\]

价格响应则可以抽象为：

\[
dS_t
=
\lambda_t
Q_t^{total}
+
dI_t
\]

其中：

- \(\lambda_t\)：当时市场价格冲击系数；
- \(dI_t\)：新的信息冲击。

这给出了一个非常有用的理解：

\[
\boxed{
\text{Witching-Day Price Move}
}
\]

可能是：

\[
\boxed{
\text{Mechanical Flow}
+
\text{Information Flow}
}
\]

二者共同作用的结果。

---

# 34. 最终观察逻辑

以后观察三巫日或四巫日，可以遵循以下顺序：

\[
\boxed{
\text{Product}
\rightarrow
\text{Settlement Type}
\rightarrow
\text{Time}
\rightarrow
\text{Position}
\rightarrow
\text{Greek}
\rightarrow
\text{Hedge}
\rightarrow
\text{Auction}
}
\]

具体来说：

第一问：

\[
\text{是什么产品？}
\]

第二问：

\[
\text{AM 还是 PM settlement？}
\]

第三问：

\[
\text{Cash 还是 Physical settlement？}
\]

第四问：

\[
\text{异常发生在什么时间？}
\]

第五问：

\[
\text{Spot 相对关键 strike 在哪里？}
\]

第六问：

\[
\text{Dealer Gamma / Delta 只是估计，证据有多强？}
\]

第七问：

\[
\text{是否叠加 Closing Auction / Index Rebalance？}
\]

第八问：

\[
\text{盘后是否还存在 Exercise / Assignment uncertainty？}
\]

这套框架比“今天是三巫/四巫，所以市场应该更波动”更接近实际交易台的研究逻辑。

---

# 35. 一句话总结

三巫日和四巫日的本质，可以概括为：

\[
\boxed{
\text{Derivative Position}
\rightarrow
\text{Greek / Basis Evolution}
\rightarrow
\text{Dealer Hedge}
\rightarrow
\text{Roll / Auction / Settlement}
\rightarrow
\text{Exercise / Assignment}
}
\]

其中：

\[
\boxed{
\text{Options}
}
\]

主要贡献非线性的：

\[
\Gamma,\ \text{Charm},\ \text{Vanna}
\]

而：

\[
\boxed{
\text{Futures}
}
\]

主要贡献线性的：

\[
\Delta,\ \text{Basis},\ \text{Roll}
\]

对个股期权尤其要记住：

\[
\boxed{
16{:}00
\neq
\text{Risk Completely Gone}
}
\]

因为盘后：

\[
\boxed{
\text{Greek Risk}
\rightarrow
\text{Exercise / Assignment Risk}
}
\]

而对现金结算指数期权：

\[
\boxed{
\text{Settlement Fixed}
\Rightarrow
\text{Expiry Risk Ends Much More Cleanly}
}
\]

这正是理解到期日尾盘与盘后市场行为时，个股期权和指数期权最根本的区别之一。

---

## 参考主题

进一步研究时，建议重点阅读以下官方体系：

- OCC：Exercise-by-Exception、Exercise / Assignment、Clearing & Settlement
- Cboe：SPX / SPXW / XSP settlement specifications
- CME：Equity Index Futures settlement、roll dates、Single-Stock Futures
- Nasdaq：Closing Cross、Net Order Imbalance Indicator
- NYSE：Closing Auction、D-Orders、Imbalance dissemination
- S&P Dow Jones Indices：Quarterly Rebalance 与 index maintenance
