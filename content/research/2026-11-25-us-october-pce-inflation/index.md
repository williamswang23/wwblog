+++
title = "美国 2026 年 10 月 PCE 通胀分析"
date = "2026-11-25"
data_as_of = ["2026-10-31", "2026-11-23", "2026-11-25"]
data_as_of_note = "PCE 的观察月为 2026 年 10 月，采用 11 月 25 日 BEA 公布及修订版本。汽油周度观察截至 11 月 23 日。"
draft = false
description = "比较美国 10 月 PCE 发布值与市场预期，拆解商品、服务和能源的贡献，并附 BEA 402 个详细分项的同比与环比。"
series = ""
categories = ["宏观与政策"]
tags = ["PCE", "通胀", "美国经济", "美联储"]
featured = false
private = false
content_preservation = "verbatim"
source_sha256 = "0116ad1beecd8357d8dc0b625ca77127f234665355cda1438d52f05c0082e78a"
+++

{{< math >}}

# 美国 2026 年 10 月 PCE 通胀分析

**数据发布于美国东部时间 2026 年 11 月 25 日 08:30。** 本文采用当天发布的价格指数和历史修订值。环比均为季调后单月涨幅，未年化。市场预期固定在发布前。文末附 BEA 详细表全部 402 个行项目的同比、环比，保留官方未公布指数的空缺。[BEA 10 月公告][bea]

**本次数据给美联储增加的是通胀持续性的证据，新增的上行意外很小。** 总体 PCE 环比 0.3%、同比 3.8%，核心环比 0.3%，三项均符合共识。核心同比报 3.3%，比共识高 0.1 个百分点，位于调查区间上沿。按指数复算，核心同比为 **3.2611%**，刚越过四舍五入为 3.3% 的门槛。过去三个月核心通胀折年率已从截至 7 月的 2.35% 升至 3.63%，这个变化比公布值跨过一位小数门槛更值得重视。[BEA 公告][bea] · [CME/Econoday 发布前调查][cons] · [BEA 月度表][nipa]

10 月内部出现了两种方向相反的变化。能源对总体环比的贡献从 0.21 降到 0.03 个百分点，几乎解释总体环比的全部降幅。核心商品环比却从 0.18% 加快到 0.35%，其中部分非耐用品由跌转涨。展望 11 月，美国零售汽油价格已经明显回落，但去年 11 月核心 PCE 环比只有 0.156%。即使今年 11 月核心环比从 0.293% 放缓至 0.26%，核心同比仍会升至约 3.37%。[BEA 月度表][nipa] · [BEA 产品明细][detail] · [EIA 美国汽油价格][eia]

## 一、发布值与市场预期

| 指标 | 9 月首次公布 | 9 月本次修订值 | 10 月发布前共识 | 10 月实际 | 实际减共识 |
|---|---:|---:|---:|---:|---:|
| 总体 PCE 环比 | 0.5% | 0.5% | 0.3% | 0.3% | 0.0 个百分点 |
| 总体 PCE 同比 | 3.6% | **3.7%** | 3.8% | 3.8% | 0.0 个百分点 |
| 核心 PCE 环比 | 0.3% | 0.3% | 0.3% | 0.3% | 0.0 个百分点 |
| 核心 PCE 同比 | 3.1% | 3.1% | **3.2%** | **3.3%** | **+0.1 个百分点** |
| 名义个人收入环比 | 0.2% | 0.3% | 0.4% | **0.7%** | **+0.3 个百分点** |
| 名义消费支出环比 | 0.5% | 0.6% | 0.4% | **0.3%** | **−0.1 个百分点** |

9 月总体同比首次公布为 3.6489%，修订后为 3.6693%。部分新闻仍沿用首次公布的 3.6%。比较相邻两个月时，应使用同版指数。个人支出和个人收入两行衡量名义金额变化，与上方四行价格指数的含义不同。[BEA 9 月公告][prev] · [BEA 10 月公告][bea] · [BEA 表 2.8.11 价格补充行][nipa] · [CME/Econoday 调查][cons]

### 核心同比多出的 0.1 个百分点来自哪里

调查中的核心环比预测只公布到一位小数，无法还原所有受访者的精确预测。公布前可查到的小数点后两位估计，给出了更有辨识力的参照。

| 发布前参照 | 核心环比预测 | 核心同比预测 | 对照实际值 |
|---|---:|---:|---|
| CME/Econoday 调查 | 0.3% | 3.2%，区间 3.2%–3.3% | 环比符合共识，同比位于区间上沿 |
| 克利夫兰联储，11 月 24 日模型 | 0.27% | 3.21% | 实际环比高 0.0225 个百分点，同比高 0.0511 个百分点 |
| FHN Financial，11 月 13 日研究 | 0.32% | 3.29% | 实际环比低 0.0275 个百分点，同比低 0.0289 个百分点 |

核心环比实际为 **0.2925%**，位于两项公开估计之间。FHN 在 CPI、PPI 均已公布后就给出了会四舍五入为 3.3% 的同比估计，市场在公布前已能合理预见这个结果。[CME/Econoday][cons] · [克利夫兰联储实时预测][cle] · [FHN Financial，11 月 13 日，第 2 页][fhn]

**把 9 月指数修订和 10 月涨幅分别代入，就能解释为何同比越过 3.25%。** 2025 年 10 月核心指数在两版数据中均为 127.165。下表每个结果均按 $100[I_{\rm Sep26}(1+m_{\rm Oct26})/127.165-1]$ 计算，公式中的 $m$ 用小数表示。

| 9 月核心指数版本 | 假设 10 月核心环比 | 推得 10 月核心同比 | 保留一位小数 |
|---|---:|---:|---:|
| 原公布的 130.902 | 克利夫兰联储预测 0.2700% | 3.2166% | 3.2% |
| 本次修订的 130.929 | 同一预测 0.2700% | 3.2379% | 3.2% |
| 原公布的 130.902 | 实际涨幅 0.2925% | 3.2398% | 3.2% |
| 本次修订的 130.929 | 实际涨幅 0.2925% | **3.2611%** | **3.3%** |

在这一参照下，9 月指数上修抬高同比约 **0.0213 个百分点**，10 月环比高于模型再抬高约 **0.0232 个百分点**。两者合计 0.0445 个百分点。模型公开的同比 3.21% 与用其已舍入月率复算的 3.2166% 另有 0.0066 个百分点差异，公开精度不足以进一步拆解。单独代入任一项变化，同比都只会显示为 3.2%。总体读数也略高于该模型，精确环比 0.3175% 对 0.31%，同比 3.8446% 对 3.81%，没有改变一位小数发布值。[BEA 10 月及过往版本][archive] · [克利夫兰联储][cle]

**9 月起点为什么被抬高，也能在分项中找到线索。** 对照两次发布，9 月商品价格指数仅从 120.731 改为 120.732，服务价格指数从 137.932 改为 137.971。服务中，为家庭服务的非营利机构最终消费价格指数从 151.831 上修为 153.328，幅度约 +0.986%。交通服务从 150.475 下修为 150.089，幅度约 −0.257%。按新版 9 月名义份额粗估，这两项对当月总体价格指数水平修订的影响约为 +0.031 和 −0.009 个百分点。市场化核心的 9 月指数反而从 128.206 下修为 128.187。由此看，历史修订集中在少数服务口径，不能解释为家庭普遍面对更快的涨价。这里比较的是同一月份的指数水平在两版统计中的差异。[BEA 两版历史数据][archive] · [9 月首次发布][prev] · [11 月 25 日月度分类表][nipa]

## 二、哪些分项推动了 10 月通胀

两张主表覆盖耐用品 4 类、非耐用品 4 类、家庭服务 7 类，以及为家庭服务的非营利机构。同比、环比来自价格指数水平。最后一列是 BEA 公布的**该项对总体 PCE 当月环比的贡献**，单位为百分点，按“9 月 → 10 月”排列。合计行与子项重叠，分项贡献分别舍入至 0.01 个百分点。[BEA 表 2.8.4、2.8.7、2.8.8][nipa]

### 商品

| 类别 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 | 对总体环比的贡献，9 月 → 10 月 |
|---|---:|---:|---:|---:|---:|
| **商品合计** | 0.79% | 0.40% | 3.95% | 4.45% | 0.25 → 0.12 |
| **耐用品合计** | 0.20% | 0.06% | 2.89% | 2.89% | 0.02 → 0.01 |
| 机动车辆及零件 | 0.26% | −0.27% | −0.11% | −0.57% | 0.01 → −0.01 |
| 家具及耐用家居设备 | −0.01% | 0.78% | 0.15% | 0.93% | 0.00 → 0.02 |
| 娱乐用品及车辆 | 0.05% | −0.45% | 8.35% | 8.15% | 0.00 → −0.02 |
| 其他耐用品 | 0.72% | 0.89% | 2.57% | 2.87% | 0.01 → 0.01 |
| **非耐用品合计** | 1.11% | 0.58% | 4.52% | 5.29% | 0.23 → 0.12 |
| 店外消费的食品饮料 | −0.01% | 0.41% | 1.49% | 1.92% | 0.00 → 0.03 |
| 服装与鞋类 | 0.16% | −0.10% | 2.80% | 3.04% | 0.00 → 0.00 |
| 汽油及其他能源商品 | 9.25% | 0.80% | 35.44% | 38.02% | 0.21 → 0.02 |
| 其他非耐用品 | 0.16% | 0.88% | 0.52% | 1.40% | 0.01 → 0.07 |

### 服务

| 类别 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 | 对总体环比的贡献，9 月 → 10 月 |
|---|---:|---:|---:|---:|---:|
| **服务合计** | 0.37% | 0.28% | 3.54% | 3.58% | 0.25 → 0.19 |
| **家庭消费的服务小计** | 0.36% | 0.24% | 3.62% | 3.58% | 0.23 → 0.16 |
| 住房和公用事业 | 0.30% | 0.33% | 3.33% | 3.46% | 0.05 → 0.06 |
| 医疗服务 | 0.12% | 0.09% | 3.03% | 2.65% | 0.02 → 0.02 |
| 交通服务 | 1.87% | −0.36% | 8.93% | 8.10% | 0.06 → −0.01 |
| 娱乐服务 | 0.40% | 0.59% | 3.21% | 3.79% | 0.02 → 0.02 |
| 餐饮与住宿服务 | 0.43% | 0.52% | 3.47% | 3.87% | 0.03 → 0.04 |
| 金融服务与保险 | 0.43% | 0.18% | 4.39% | 4.23% | 0.03 → 0.01 |
| 其他服务 | 0.19% | 0.29% | 2.92% | 2.98% | 0.02 → 0.02 |
| 为家庭服务的非营利机构最终消费 | 0.59% | 1.09% | 1.86% | 3.46% | 0.02 → 0.03 |

### 食品、能源、核心商品与住房

| 补充分类 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 |
|---|---:|---:|---:|---:|
| 总体 PCE | 0.50% | 0.32% | 3.67% | 3.84% |
| 核心 PCE | 0.32% | 0.29% | 3.14% | 3.26% |
| 食品，店外消费 | −0.01% | 0.41% | 1.49% | 1.92% |
| 能源商品与能源服务 | 5.37% | 0.72% | 21.29% | 22.45% |
| 剔除能源的 PCE | 0.30% | 0.30% | 3.02% | 3.16% |
| 核心商品，剔除食品和能源 | 0.18% | 0.35% | 1.98% | 2.35% |
| 服务，剔除能源 | 0.37% | 0.27% | 3.52% | 3.56% |
| 住房，不含公用事业 | 0.32% | 0.29% | 3.15% | 3.30% |
| 服务，剔除能源和住房 | 0.39% | 0.27% | 3.63% | 3.64% |
| PCE，剔除食品、能源和住房 | 0.33% | 0.29% | 3.14% | 3.25% |
| 市场化核心 PCE | 0.31% | 0.27% | 3.10% | 3.18% |

BEA 核心 PCE 剔除的食品专指购回后在店外消费的食品饮料，餐饮服务仍计入核心。能源同时包括汽油等能源商品以及电力、燃气服务。单列住房不含公用事业。“市场化核心”采用有可观测价格的消费项目，剔除大部分估算交易以及非营利机构面向家庭的最终消费。[BEA 表 2.8.4 脚注][nipa] · [市场化 PCE 定义][market]

### 三个影响判断的分项变化

**1. 总体环比降温几乎全部来自能源，但汽油的同比压力仍在上升。** 总体环比从 0.500% 降至 0.318%，下降 0.182 个百分点。能源商品和服务对总体的贡献从 0.21 降至 0.03 个百分点。独立检验这一结论，剔除能源后的 PCE 环比为 **0.300% → 0.301%**，几乎持平。汽油等能源商品自身的涨幅从 9.25% 降至 0.80%，同比却从 35.44% 升到 38.02%。因此，10 月能源价格仍在上涨，新增压力显著减弱。[BEA 月度贡献表][nipa] · [剔除能源价格指数，表 2.4.4U 第 373 行][detail]

**2. 核心商品加快，核心服务降速，内部抵消让核心环比连续显示 0.3%。** 核心商品环比从 0.178% 升至 0.348%，服务剔除能源后从 0.372% 降至 0.274%。按 9–10 月平均名义支出权重估算，两者分别为 10 月总体环比贡献约 **0.076 和 0.184 个百分点**，合计约 0.260，与 BEA 公布的核心部分对总体贡献 0.26 一致。核心商品中，对总体环比贡献增加最多的是其他非耐用品，环比从 0.16% 升至 0.88%，贡献从 0.01 升至 0.07 个百分点。其内部既有药品和家庭日用品从上月下跌中反弹，也有娱乐用品、报刊文具延续涨价。另一方面，二手车净购置价格下跌 1.19%，耐用品整体仅上涨 0.06%。将当月核心商品的走强推广到全部耐用品，会高估其广度。[BEA 月度贡献表][nipa] · [BEA 表 2.4.4U、2.4.5U][detail]

**3. 服务仍贡献了约六成的总体月涨幅，住房、餐饮和航空的方向却不同。** 住房和公用事业贡献约 0.06 个百分点，其中非农自有住房估算租金环比 0.31%，租户住房租金约 0.20%。餐饮服务环比从 0.20% 升至 0.50%，其支出权重约 6.17%，对总体贡献约 0.031 个百分点。相反，航空运输价格从 9 月上涨 3.57% 转为 10 月下跌 3.50%，抵消了地面交通的部分涨价。医疗服务环比仅 0.09%。非营利机构为家庭提供的最终消费价格则上涨 1.09%，该项按机构运营支出扣除相关销售收入计量，解读家庭直接支付的医疗价格时需单独看待。市场化核心环比为 0.268%，低于全口径核心的 0.293%。[BEA 月度贡献表][nipa] · [BEA 详细表与说明][detail] · [市场化 PCE 定义][market]

| 代表性细项 | 9 月环比 | 10 月环比 | 10 月同比 | 对 10 月总体环比的估算贡献，百分点 |
|---|---:|---:|---:|---:|
| 医药及其他医疗用品 | −0.79% | 0.44% | −3.45% | 0.015 |
| 娱乐用非耐用品 | 1.96% | 1.69% | 5.65% | 0.028 |
| 家庭日用品 | −2.12% | 0.91% | −0.63% | 0.009 |
| 报刊与文具 | 3.67% | 3.01% | 16.05% | 0.019 |
| 二手机动车净购置 | 0.64% | −1.19% | −3.35% | −0.012 |
| 非农租户住房租金 | 0.25% | 0.20% | 2.90% | 0.007 |
| 非农自有住房估算租金 | 0.34% | 0.31% | 3.42% | 0.037 |
| 医院服务 | 0.19% | 0.13% | 2.51% | 0.010 |
| 航空运输 | 3.57% | −3.50% | 14.42% | −0.036 |
| 地面运输 | 1.88% | 4.54% | 9.61% | 0.024 |
| 餐饮服务 | 0.20% | 0.50% | 3.66% | 0.031 |
| 住宿服务 | 1.89% | 0.62% | 5.20% | 0.006 |
| 投资组合管理与投资咨询 | 0.37% | 0.27% | 7.19% | 0.005 |

细项估算使用相邻两个月平均名义支出份额乘以该项环比，便于比较量级。部分细项存在包含关系，例如处方药已计入医药用品。**分项贡献反映实际价格变动，不能用来给市场预测误差分摊责任。** 发布前，10 月 CPI 航空票价环比已知为 +0.4%，PPI 航空客运服务却为 −1.2%，最终 PCE 航空运输为 −3.50%。这说明当时已有降温线索，覆盖范围、权重和季调差异仍会影响映射结果。公开来源缺少按同一口径编制的全套分项共识。[BEA 详细表][detail] · [BLS 10 月 CPI][cpi] · [BLS 10 月 PPI][ppi]

## 三、同比为什么上升，短期动量是否也在上升

同比的变化取决于**新进入的本月涨幅和移出窗口的去年同月涨幅**。设 $y_t$ 为同比、$m_t$ 为环比，两者均用小数表示，则 $1+y_t=(1+y_{t-1})(1+m_t)/(1+m_{t-12})$。

| 指标 | 2025 年 10 月环比，移出 | 2026 年 10 月环比，进入 | 2026 年 9 月同比 | 2026 年 10 月同比 | 同版同比增量 |
|---|---:|---:|---:|---:|---:|
| 总体 PCE | 0.1481% | 0.3175% | 3.6693% | 3.8446% | +0.1753 个百分点 |
| 核心 PCE | 0.1772% | 0.2925% | 3.1424% | 3.2611% | +0.1187 个百分点 |

核心环比低于今年 9 月的 0.3249%，却高于去年 10 月的 0.1772%，所以核心同比继续上升。去年基数还带有特殊测量误差。2025 年联邦政府停摆期间，部分 10 月 CPI 输入缺失，BEA 用当年 9 月、11 月相应季调 CPI 的几何平均值估补。上表复原的是官方指数的滚动关系，去年 10 月的月度细分变动含有估算成分。[BEA 月度价格指数][nipa] · [BEA 对 2025 年缺失价格的处理][shutdown]

**从过去十二个月的累计贡献看，服务支撑了通胀水平，商品解释了本月同比上升的大部分。** 将 BEA 月度贡献换算至共同基期后，10 月总体同比 3.84% 中，商品约贡献 **1.39 个百分点**，服务约贡献 **2.45 个百分点**。从 9 月到 10 月，商品的十二个月贡献约增加 **0.14 个百分点**，服务约增加 **0.02 个百分点**。按另一组互斥分类，核心、能源、店外消费食品分别约贡献 **2.90、0.80、0.13 个百分点**。这些是按月连接的估算，源数据舍入使合计与总体略有差异。[BEA 表 2.8.4、2.8.8][nipa]

| 截至该月 | 总体环比 | 核心环比 | 总体近 3 个月折年率 | 核心近 3 个月折年率 | 核心近 6 个月折年率 |
|---|---:|---:|---:|---:|---:|
| 2026 年 7 月 | 0.060% | 0.138% | 1.58% | 2.35% | 2.95% |
| 2026 年 8 月 | 0.335% | 0.274% | 1.18% | 2.20% | 2.82% |
| 2026 年 9 月 | 0.500% | 0.325% | 3.64% | 2.99% | 2.97% |
| 2026 年 10 月 | 0.318% | 0.293% | 4.71% | 3.63% | 2.98% |

10 月的三个月窗口覆盖 8–10 月，移出了核心环比仅 0.138% 的 7 月，换入 0.293% 的 10 月。因此，核心三个月折年率从 2.99% 升到 3.63%，同时六个月折年率约 2.99%。若较长时间保持年通胀 2%，对应的复合月率约为 0.165%。近三个月核心月率均明显高于该参照。美联储的长期 2% 目标针对总体 PCE，核心数据在此用于判断通胀趋势。[BEA 月度表][nipa] · [FOMC 长期政策目标][target]

## 四、11 月和年末的条件性判断

**11 月更可能出现总体环比降温、核心同比继续上升的组合。** EIA 全美普通汽油周度零售价从 11 月 2 日的 4.153 美元/加仑降至 11 月 23 日的 3.642 美元。11 月截至 23 日的四次观测均值为 3.899 美元，比 10 月四次观测均值 4.310 美元低约 9.5%。这组数据未季调，11 月也尚未结束，不能直接代入 PCE。作为敏感性参考，若 PCE 汽油及其他车用燃料的季调价格下降 5%，以约 2.23% 的支出权重计算，该项单独可拉低总体环比约 0.11 个百分点。电价、管道燃气和服务成本可各自变化。[EIA 逐周数据][eia] · [BEA 详细支出份额][detail]

**同比的方向有明确门槛。** 2025 年 11 月总体、核心环比分别为 0.200% 和 0.156%。只要今年 11 月核心环比超过 0.156%，其未舍入同比就会继续上升。到 12 月，移出的去年核心月率升到 0.316%，届时即便今年核心环比维持 0.26%，同比也可能回落。[BEA 月度表][nipa]

| 情景 | 11 月假设环比，总体 / 核心 | 推得 11 月同比，总体 / 核心 | 12 月假设环比，总体 / 核心 | 推得 12 月同比，总体 / 核心 |
|---|---:|---:|---:|---:|
| 降温 | 0.00% / 0.18% | 3.64% / 3.29% | 0.15% / 0.18% | 3.46% / 3.15% |
| 基准 | 0.17% / 0.26% | 3.81% / 3.37% | 0.22% / 0.26% | 3.71% / 3.31% |
| 再加速 | 0.35% / 0.36% | 4.00% / 3.47% | 0.35% / 0.36% | 4.03% / 3.52% |

基准情景的 11 月环比沿用克利夫兰联储 **11 月 24 日**公布的 0.17% / 0.26%，并代入 **11 月 25 日 BEA 新公布的 10 月指数**。由此得到的 3.81% / 3.37% 是本文更新起点后的条件结果。该联储在数据发布前原报的 11 月同比预测为 **3.78% / 3.32%**。12 月月率以及另外两组情景均为敏感性假设。各情景假定 10 月及去年同期指数不再修订，不赋予发生概率。[克利夫兰联储 11 月 24 日预测][cle] · [BEA 价格指数][nipa]

| 接下来要验证什么 | 哪些观察会改变判断 |
|---|---|
| 能源回落能否传导到总体 PCE | 若 11 月剩余周汽油继续偏低，且电力、燃气没有显著抵消，总体环比下行的依据会加强。若炼油或供应扰动使零售燃料反弹，需要上调总体路径。 |
| 核心商品是否形成持续上涨 | 跟踪其他非耐用品、家居耐用品和二手车的分化。若 11–12 月上涨扩展到更多耐用品，核心上行的持续性会增强。11 月 25 日报道的新增关税提案要经过实施、库存周转和企业定价才会影响后续消费者价格，时间上无法解释已经结束的 10 月。 |
| 服务能否回到与 2% 更相容的速度 | 核心服务剔除住房和能源后的月率从 0.389% 降到 0.270%，近三个月折年率仍达 4.27%。餐饮、住房租金和医疗服务未来数月若同时放缓，比单月航空票价再次下跌更有说服力。 |
| 需求是否持续支持涨价 | 10 月名义支出增长 0.284%，实际支出减少 0.034%，实际可支配收入增长 0.505%，储蓄率从修订后的 3.6% 升至 4.1%。收入增长中有 Medicare 一次性退费相关转移支付，同时工资和股息也有增长。一个月的实际消费疲弱不足以判定需求趋势反转。 |

观察依据来自 [BEA 10 月公告与技术说明][bea]、[BEA 分项价格与实际支出][nipa]、[EIA 汽油价格][eia]和[路透对 11 月 25 日关税提案的报道][tariff]。

**对 12 月美联储与风险资产的含义。** 10 月 FOMC 将利率区间维持在 3.75%–4.00%，两名委员主张当次加息 25 个基点。公布前市场已在押注 12 月加息。本次数据支持继续担忧核心通胀黏性，尚不足以凭借同比多报出的 0.1 个百分点，单独推导需要更大幅度的加息。同期公布的三季度实际 GDP 折年增速又从 3.4% 上修至 4.3%，贸易政策消息也在影响市场。对 SPY、QQQ 的解读应保留这些共同驱动。更有利于估值修复的通胀组合，是能源降温的同时，核心商品反弹收敛、非住房服务的数月动量也回落。[FOMC 声明][fed] · [发布前市场定价][pricing] · [BEA 三季度 GDP 次估][gdp] · [路透市场报道][markets]

**日程上的约束很重要。** 美东时间 12 月 4 日公布 11 月就业报告，12 月 8–9 日召开 FOMC。11 月 CPI、PPI 将分别在 12 月 10 日和 15 日公布，11 月 PCE 要到 **12 月 23 日 08:30** 才发布。12 月议息时，委员会能看到 11 月就业和能源高频数据，11 月这三份官方通胀报告都在会后。[BLS 发布日历][cal] · [FOMC 会议纪要][minutes] · [BEA 下次发布日期][bea]

## 数据口径与复核

- **G3，已实现的价格和支出。** 11 月 25 日版 NIPA 表 2.8.4 提供 2017=100 的季调价格指数，2.8.7 和 2.8.8 提供官方环比及环比贡献，2.8.11 的价格补充行用于交叉核对主要类别同比。2.6、2.8.5、2.8.6 提供收入、名义消费和实际消费。详细产品使用 2.4.4U 和 2.4.5U 月表。同比用 $100(P_t/P_{t-12}-1)$，三个月和六个月折年率分别用 $100[(P_t/P_{t-k})^{12/k}-1]$，其中 $k=3,6$。正文高精度数字均由 BEA 保留三位小数的指数复算。[BEA 官方总表][nipa] · [BEA 官方详细表][detail]
- **G2，预期与归因。** 调查支持总项和核心的共识比较。克利夫兰联储及 FHN 是两个发布前的独立预测参照。历史修订按 10 月 29 日及 11 月 25 日两个数据版本核验。明细缺少可逐项配对的市场共识，故未把具体商品或服务标记为“贡献了多少市场预期误差”。[发布前调查][cons] · [克利夫兰联储][cle] · [FHN Financial][fhn] · [BEA 历史版本入口][archive]
- **贡献精度。** 正文大类月度贡献直接取表 2.8.8。十二个月贡献按 $\sum_{s=t-11}^{t}c_{i,s}P_{s-1}/P_{t-12}$ 连接各月公布值，其中 $c_{i,s}$ 是分项的官方环比贡献，单位为百分点，$P$ 为总体价格指数。该计算是本文估算，逐月输入保留两位小数。细分类的当月贡献使用平均支出份额的一阶近似。前瞻情景是给定月率的指数推算，最大的不确定性来自未来的实际月率。[BEA 月度贡献与价格表][nipa] · [BEA 详细价格与支出表][detail]

## 附录　全部详细分项的同比与环比

下列六组均可展开。保留 BEA 表 2.4.4U 的官方行号和英文品名，便于在原表检索。402 个行项目中，398 项可计算 10 月同比和环比，第 145、157、158、333 行无可用价格指数，记为“—”。合计、子项、扣减项和补充口径均按原表列示，不能将所有行相加。[BEA 详细分类原表][detail]

<details>
<summary>第 1–71 行　总体、商品合计和耐用品</summary>

| BEA 行号 | BEA 产品名称 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 |
|---:|---|---:|---:|---:|---:|
| 1 | Personal consumption expenditures | 0.50% | 0.32% | 3.67% | 3.84% |
| 2 | Goods | 0.79% | 0.40% | 3.95% | 4.45% |
| 3 | Durable goods | 0.20% | 0.06% | 2.89% | 2.89% |
| 4 | Motor vehicles and parts | 0.26% | −0.27% | −0.11% | −0.57% |
| 5 | New motor vehicles (55) | 0.22% | 0.20% | 0.60% | 0.74% |
| 6 | New autos | 0.37% | 0.29% | 1.48% | 1.68% |
| 7 | New domestic autos | 0.37% | 0.29% | 1.47% | 1.67% |
| 8 | New foreign autos | 0.37% | 0.29% | 1.47% | 1.67% |
| 9 | New light trucks | 0.20% | 0.18% | 0.49% | 0.62% |
| 10 | New domestic light trucks | 0.20% | 0.18% | 0.49% | 0.62% |
| 11 | New foreign light trucks | 0.20% | 0.18% | 0.49% | 0.62% |
| 12 | Net purchases of used motor vehicles (56) | 0.64% | −1.19% | −1.52% | −3.35% |
| 13 | Used autos | 0.50% | −1.05% | −1.82% | −3.53% |
| 14 | Net transactions in used autos | 0.67% | −1.22% | −1.46% | −3.31% |
| 15 | Used auto margin | 0.67% | −1.22% | −1.46% | −3.31% |
| 16 | Employee reimbursement | 5.43% | −5.71% | 9.15% | 3.18% |
| 17 | Used light trucks | 0.67% | −1.22% | −1.45% | −3.30% |
| 18 | Net transactions in used trucks | 0.67% | −1.22% | −1.46% | −3.31% |
| 19 | Used truck margin | 0.67% | −1.22% | −1.46% | −3.31% |
| 20 | Motor vehicle parts and accessories (58) | −0.22% | −0.08% | 0.26% | 0.42% |
| 21 | Tires | 0.43% | 0.28% | 0.19% | 1.14% |
| 22 | Accessories and parts | −0.69% | −0.35% | 0.33% | −0.07% |
| 23 | Furnishings and durable household equipment | −0.01% | 0.78% | 0.15% | 0.93% |
| 24 | Furniture and furnishings (parts of 31 and 32) | −0.23% | 0.50% | −1.10% | −0.60% |
| 25 | Furniture | −0.81% | 1.19% | −2.43% | −1.26% |
| 26 | Clocks, lamps, lighting fixtures, and other household decorative items | 2.07% | −0.48% | −1.13% | −0.69% |
| 27 | Carpets and other floor coverings | −0.65% | 0.35% | −0.75% | −0.23% |
| 28 | Window coverings | −1.46% | −0.85% | 5.38% | 2.54% |
| 29 | Household appliances (part of 33) | −0.13% | 1.35% | −1.99% | −0.78% |
| 30 | Major household appliances | −0.05% | 1.37% | −2.25% | −1.19% |
| 31 | Small electric household appliances | −0.67% | 1.22% | −0.25% | 1.88% |
| 32 | Glassware, tableware, and household utensils (34) | 1.36% | 0.93% | 6.83% | 8.38% |
| 33 | Dishes and flatware | 0.90% | 1.28% | 7.78% | 11.98% |
| 34 | Nonelectric cookware and tableware | 1.83% | 0.57% | 5.83% | 4.73% |
| 35 | Tools and equipment for house and garden (35) | −0.17% | 1.12% | 2.79% | 3.54% |
| 36 | Tools, hardware, and supplies | −0.33% | 1.44% | 3.01% | 3.99% |
| 37 | Outdoor equipment and supplies | 0.63% | −0.44% | 1.71% | 1.31% |
| 38 | Recreational goods and vehicles | 0.05% | −0.45% | 8.35% | 8.15% |
| 39 | Video, audio, photographic, and information processing equipment and media (75, 76, and part of 93) | −0.10% | −0.49% | 11.74% | 11.52% |
| 40 | Video and audio equipment | −1.75% | 1.81% | −0.40% | 2.05% |
| 41 | Televisions | −1.88% | 3.31% | −1.89% | 2.09% |
| 42 | Other video equipment | 4.52% | 6.30% | 9.59% | 16.06% |
| 43 | Audio equipment | 1.38% | −0.48% | −1.45% | −1.09% |
| 44 | Recording media | −10.70% | −0.05% | −1.70% | −1.04% |
| 45 | Audio discs, tapes, vinyl, and permanent digital downloads | 0.27% | 0.32% | 7.61% | 7.87% |
| 46 | Video discs, tapes, and permanent digital downloads | −12.71% | −0.13% | −3.14% | −2.39% |
| 47 | Photographic equipment | −0.04% | −1.18% | −1.20% | −2.79% |
| 48 | Information processing equipment | 0.36% | −1.10% | 15.60% | 14.58% |
| 49 | Personal computers/tablets and peripheral equipment | 1.39% | 0.55% | 9.70% | 11.83% |
| 50 | Computer software and accessories | −0.11% | −1.85% | 18.41% | 15.86% |
| 51 | Calculators, typewriters, and other information processing equipment | 0.55% | 0.51% | −12.67% | −12.66% |
| 52 | Sporting equipment, supplies, guns, and ammunition (part of 80) | −0.15% | −0.03% | 2.82% | 3.18% |
| 53 | Sports and recreational vehicles (79) | 0.72% | −0.59% | 4.93% | 4.72% |
| 54 | Motorcycles | 0.00% | 0.00% | 0.00% | 0.00% |
| 55 | Bicycles and accessories | 0.91% | −0.75% | 6.22% | 5.95% |
| 56 | Pleasure boats, aircraft, and other recreational vehicles | 0.91% | −0.75% | 6.27% | 5.99% |
| 57 | Pleasure boats | 0.91% | −0.75% | 6.22% | 5.95% |
| 58 | Pleasure aircraft | 0.91% | −0.75% | 6.22% | 5.95% |
| 59 | Other recreational vehicles | 0.91% | −0.75% | 6.22% | 5.95% |
| 60 | Recreational books (part of 90) | 0.56% | −1.25% | −0.70% | −2.73% |
| 61 | Musical instruments (part of 80) | 1.00% | 0.32% | 2.92% | 3.17% |
| 62 | Other durable goods | 0.72% | 0.89% | 2.57% | 2.87% |
| 63 | Jewelry and watches (part of 119) | 1.62% | 1.43% | 10.89% | 10.68% |
| 64 | Jewelry | 1.87% | 1.86% | 11.84% | 11.67% |
| 65 | Watches | 0.42% | −0.61% | 6.31% | 6.04% |
| 66 | Therapeutic appliances and equipment (42) | 0.22% | 0.74% | −0.18% | 0.16% |
| 67 | Therapeutic medical equipment | 0.39% | 1.45% | −1.33% | −0.16% |
| 68 | Corrective eyeglasses and contact lenses | 0.03% | −0.01% | 1.05% | 0.50% |
| 69 | Educational books (96) | 0.16% | 1.54% | 1.92% | 3.45% |
| 70 | Luggage and similar personal items (part of 119) | 0.08% | 0.22% | 2.94% | 4.13% |
| 71 | Telephone and related communication equipment | 0.56% | 0.51% | −12.67% | −12.66% |

</details>

<details>
<summary>第 72–149 行　非耐用品、食品与燃料</summary>

| BEA 行号 | BEA 产品名称 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 |
|---:|---|---:|---:|---:|---:|
| 72 | Nondurable goods | 1.11% | 0.58% | 4.52% | 5.29% |
| 73 | Food and beverages purchased for off-premises consumption | −0.01% | 0.41% | 1.49% | 1.92% |
| 74 | Food and nonalcoholic beverages purchased for off-premises consumption (4) | −0.02% | 0.52% | 1.67% | 2.26% |
| 75 | Food purchased for off-premises consumption | −0.14% | 0.56% | 1.42% | 2.09% |
| 76 | Cereals and bakery products | 0.27% | −0.21% | 2.25% | 1.96% |
| 77 | Cereals | 0.77% | −0.79% | 3.18% | 1.44% |
| 78 | Bakery products | −0.04% | 0.15% | 1.68% | 2.28% |
| 79 | Meats and poultry | −0.33% | 0.60% | 0.84% | 1.10% |
| 80 | Beef and veal | −1.04% | 0.92% | 3.51% | 3.17% |
| 81 | Pork | −0.96% | 0.11% | −0.74% | −0.52% |
| 82 | Other meats | −0.45% | 0.30% | −1.58% | −1.07% |
| 83 | Poultry | 0.74% | 0.83% | 1.15% | 1.77% |
| 84 | Fish and seafood | 0.10% | 0.09% | 6.88% | 5.55% |
| 85 | Milk, dairy products, and eggs | −0.89% | 0.73% | −3.63% | −1.41% |
| 86 | Fresh milk | −1.98% | −0.27% | 2.28% | 2.43% |
| 87 | Processed dairy products | −0.34% | 1.20% | −1.67% | 0.54% |
| 88 | Eggs | −1.26% | 0.58% | −20.59% | −15.49% |
| 89 | Fats and oils | −0.17% | 0.57% | −0.78% | −0.23% |
| 90 | Fresh fruits and vegetables | 0.43% | 0.96% | 3.79% | 5.25% |
| 91 | Fruit (fresh) | 0.78% | −0.36% | 4.94% | 4.55% |
| 92 | Vegetables (fresh) | 0.12% | 2.16% | 2.76% | 5.89% |
| 93 | Processed fruits and vegetables | 0.52% | −0.25% | 2.74% | 3.06% |
| 94 | Sugar and sweets | 0.00% | 0.59% | 5.55% | 5.32% |
| 95 | Food products, not elsewhere classified | −0.42% | 1.05% | 0.90% | 2.07% |
| 96 | Nonalcoholic beverages purchased for off-premises consumption | 0.96% | 0.22% | 3.66% | 3.63% |
| 97 | Coffee, tea, and other beverage materials | 0.50% | −2.36% | 5.00% | 1.23% |
| 98 | Mineral waters, soft drinks, and vegetable juices | 1.07% | 0.82% | 3.35% | 4.19% |
| 99 | Alcoholic beverages purchased for off-premises consumption (5) | −0.01% | −0.17% | 0.48% | 0.08% |
| 100 | Spirits | −0.24% | −0.93% | −1.18% | −2.06% |
| 101 | Wine | 0.19% | 0.01% | −0.66% | −0.99% |
| 102 | Beer | −0.03% | 0.12% | 2.16% | 1.97% |
| 103 | Food produced and consumed on farms (6) | 2.50% | 0.00% | −2.36% | −3.51% |
| 104 | Clothing and footwear | 0.16% | −0.10% | 2.80% | 3.04% |
| 105 | Garments | 0.06% | −0.41% | 2.65% | 2.55% |
| 106 | Women's and girls' clothing (10) | −0.82% | −0.64% | 2.38% | 2.09% |
| 107 | Men's and boys' clothing (11) | 1.12% | −0.07% | 3.80% | 4.17% |
| 108 | Children's and infants' clothing (12) | 2.26% | −0.24% | −1.29% | −2.25% |
| 109 | Other clothing materials and footwear (13 and 17) | 0.51% | 1.01% | 3.35% | 4.79% |
| 110 | Clothing materials | −0.32% | −0.09% | 2.12% | 1.47% |
| 111 | Standard clothing issued to military personnel | 0.08% | 0.21% | 3.61% | 3.55% |
| 112 | Shoes and other footwear | 0.53% | 1.04% | 3.37% | 4.87% |
| 113 | Gasoline and other energy goods | 9.25% | 0.80% | 35.44% | 38.02% |
| 114 | Motor vehicle fuels, lubricants, and fluids (59) | 9.06% | 0.72% | 34.11% | 36.78% |
| 115 | Gasoline and other motor fuel | 9.28% | 0.73% | 34.96% | 37.75% |
| 116 | Lubricants and fluids | 0.99% | 0.27% | 8.77% | 8.26% |
| 117 | Fuel oil and other fuels (29) | 12.02% | 1.97% | 55.97% | 57.33% |
| 118 | Fuel oil | 15.33% | 2.00% | 74.18% | 75.18% |
| 119 | Other fuels | 0.18% | 1.82% | 1.86% | 5.01% |
| 120 | Other nondurable goods | 0.16% | 0.88% | 0.52% | 1.40% |
| 121 | Pharmaceutical and other medical products (40 and 41) | −0.79% | 0.44% | −3.83% | −3.45% |
| 122 | Pharmaceutical products | −0.80% | 0.43% | −3.86% | −3.49% |
| 123 | Prescription drugs | −1.25% | 0.32% | −4.48% | −4.16% |
| 124 | Nonprescription drugs | 1.27% | 0.94% | −0.89% | −0.28% |
| 125 | Other medical products | 0.39% | 1.45% | −1.33% | −0.16% |
| 126 | Recreational items (parts of 80, 92, and 93) | 1.96% | 1.69% | 3.84% | 5.65% |
| 127 | Games, toys, and hobbies | 4.18% | 1.83% | 6.64% | 8.88% |
| 128 | Pets and related products | −0.26% | 0.65% | 1.32% | 2.21% |
| 129 | Flowers, seeds, and potted plants | 1.24% | 2.95% | 2.77% | 5.23% |
| 130 | Film and photographic supplies | −2.92% | 0.00% | −7.45% | −7.45% |
| 131 | Household supplies (parts of 32 and 36) | −2.12% | 0.91% | −1.39% | −0.63% |
| 132 | Household cleaning products | −0.18% | 0.53% | 1.59% | 2.11% |
| 133 | Household paper products | −1.41% | 2.87% | −2.22% | 1.07% |
| 134 | Household linens | −4.64% | −0.33% | −3.53% | −4.59% |
| 135 | Sewing items | −0.32% | −0.09% | 2.12% | 1.47% |
| 136 | Miscellaneous household products | 0.56% | 0.31% | 2.65% | 2.98% |
| 137 | Personal care products (part of 118) | 0.22% | 0.06% | 2.38% | 2.64% |
| 138 | Hair, dental, shaving, and miscellaneous personal care products except electrical products | 0.83% | −0.57% | 2.93% | 2.35% |
| 139 | Cosmetic / perfumes / bath / nail preparations and implements | −0.86% | 1.18% | 1.39% | 3.15% |
| 140 | Electric appliances for personal care | 0.83% | −0.57% | 2.93% | 2.35% |
| 141 | Tobacco (127) | 0.73% | 0.28% | 6.43% | 5.92% |
| 142 | Magazines, newspapers, and stationery (part of 90) | 3.67% | 3.01% | 12.17% | 16.05% |
| 143 | Newspapers and periodicals | 3.92% | 4.46% | 15.24% | 20.36% |
| 144 | Stationery and miscellaneous printed materials | 2.93% | −1.28% | 3.67% | 4.14% |
| 145 | Net expenditures abroad by U.S. residents (131) | — | — | — | — |
| 146 | Expenditures abroad by U.S. residents | −0.12% | 0.26% | 0.88% | 2.90% |
| 147 | Government employees' expenditures abroad | −0.11% | 0.26% | 0.89% | 2.90% |
| 148 | Private employees' expenditures abroad | −0.12% | 0.26% | 0.89% | 2.90% |
| 149 | Less: Personal remittances in kind to nonresidents | 1.17% | 0.35% | 4.58% | 4.85% |

</details>

<details>
<summary>第 150–233 行　住房、医疗、交通与娱乐服务</summary>

| BEA 行号 | BEA 产品名称 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 |
|---:|---|---:|---:|---:|---:|
| 150 | Services | 0.37% | 0.28% | 3.54% | 3.58% |
| 151 | Household consumption expenditures (for services) | 0.36% | 0.24% | 3.62% | 3.58% |
| 152 | Housing and utilities | 0.30% | 0.33% | 3.33% | 3.46% |
| 153 | Housing | 0.32% | 0.29% | 3.15% | 3.30% |
| 154 | Rental of tenant-occupied nonfarm housing (20) | 0.25% | 0.20% | 2.78% | 2.90% |
| 155 | Tenant-occupied mobile homes | 0.25% | 0.20% | 2.78% | 2.90% |
| 156 | Tenant-occupied stationary homes and landlord durables | 0.25% | 0.20% | 2.78% | 2.90% |
| 157 | Tenant-occupied stationary homes | — | — | — | — |
| 158 | Tenant landlord durables | — | — | — | — |
| 159 | Tenant-occupied, including landlord durables | 0.25% | 0.20% | 2.78% | 2.90% |
| 160 | Imputed rental of owner-occupied nonfarm housing (21) | 0.34% | 0.31% | 3.26% | 3.42% |
| 161 | Owner-occupied mobile homes | 0.34% | 0.31% | 3.26% | 3.42% |
| 162 | Owner-occupied stationary homes | 0.34% | 0.31% | 3.26% | 3.42% |
| 163 | Rental value of farm dwellings (22) | 0.34% | 0.31% | 3.49% | 3.53% |
| 164 | Group housing (23) | 0.25% | 0.20% | 2.78% | 2.90% |
| 165 | Household utilities | 0.16% | 0.59% | 4.60% | 4.57% |
| 166 | Water supply and sanitation (25) | 0.23% | 0.59% | 4.84% | 5.22% |
| 167 | Water supply and sewage maintenance | 0.20% | 0.27% | 4.67% | 4.70% |
| 168 | Garbage and trash collection | 0.29% | 1.34% | 5.23% | 6.41% |
| 169 | Electricity and gas | 0.13% | 0.59% | 4.51% | 4.31% |
| 170 | Electricity (27) | 0.25% | 0.94% | 4.37% | 4.16% |
| 171 | Natural gas (28) | −0.32% | −0.76% | 4.97% | 4.69% |
| 172 | Health care | 0.12% | 0.09% | 3.03% | 2.65% |
| 173 | Outpatient services | 0.03% | 0.13% | 2.63% | 2.69% |
| 174 | Physician services (44) | 0.05% | 0.05% | 1.24% | 1.22% |
| 175 | Dental services (45) | 0.48% | 0.82% | 6.02% | 6.60% |
| 176 | Paramedical services (46) | −0.12% | 0.04% | 3.38% | 3.40% |
| 177 | Home health care | 0.01% | 0.00% | 1.70% | 1.64% |
| 178 | Medical laboratories | 0.00% | −0.02% | 1.18% | 1.16% |
| 179 | Other professional medical services | −0.20% | 0.07% | 4.63% | 4.70% |
| 180 | Specialty outpatient care facilities and health and allied services | −0.20% | 0.07% | 4.63% | 4.70% |
| 181 | All other professional medical services | −0.20% | 0.07% | 4.63% | 4.70% |
| 182 | Hospital and nursing home services | 0.20% | 0.06% | 3.38% | 2.60% |
| 183 | Hospitals (51) | 0.19% | 0.13% | 3.29% | 2.51% |
| 184 | Nonprofit hospitals' services to households | 0.19% | 0.13% | 3.29% | 2.51% |
| 185 | Proprietary hospitals | 0.19% | 0.13% | 3.29% | 2.51% |
| 186 | Government hospitals | 0.19% | 0.13% | 3.29% | 2.51% |
| 187 | Nursing homes (52) | 0.30% | −0.37% | 3.94% | 3.16% |
| 188 | Nonprofit nursing homes' services to households | 0.30% | −0.37% | 3.94% | 3.16% |
| 189 | Proprietary and government nursing homes | 0.30% | −0.37% | 3.94% | 3.16% |
| 190 | Transportation services | 1.87% | −0.36% | 8.93% | 8.10% |
| 191 | Motor vehicle services | 0.96% | 0.03% | 4.96% | 4.78% |
| 192 | Motor vehicle maintenance and repair (60) | 0.72% | 0.62% | 5.79% | 6.15% |
| 193 | Other motor vehicle services (61) | 1.56% | −1.42% | 2.99% | 1.49% |
| 194 | Motor vehicle leasing | 0.28% | 0.01% | −0.11% | −0.03% |
| 195 | Auto leasing | 0.28% | 0.01% | −0.12% | −0.03% |
| 196 | Truck leasing | 0.28% | 0.01% | −0.12% | −0.03% |
| 197 | Motor vehicle rental | 5.43% | −5.70% | 9.15% | 3.18% |
| 198 | Parking fees and tolls | 0.14% | 0.33% | 2.98% | 2.79% |
| 199 | Public transportation | 2.98% | −0.83% | 14.17% | 12.49% |
| 200 | Ground transportation (63) | 1.88% | 4.54% | 5.17% | 9.61% |
| 201 | Railway transportation | 1.45% | 1.41% | −0.98% | −0.61% |
| 202 | Road transportation | 1.89% | 4.58% | 5.27% | 9.77% |
| 203 | Intercity buses | 1.45% | 1.41% | −0.98% | −0.61% |
| 204 | Taxicabs and ride sharing services | 2.15% | 6.63% | 9.59% | 17.08% |
| 205 | Intracity mass transit | 2.16% | 6.63% | 9.59% | 17.08% |
| 206 | Other road transportation service | 1.45% | 1.41% | −0.98% | −0.61% |
| 207 | Air transportation (64) | 3.57% | −3.50% | 19.52% | 14.42% |
| 208 | Water transportation (65) | 1.45% | 1.41% | −0.98% | −0.61% |
| 209 | Recreation services | 0.40% | 0.59% | 3.21% | 3.79% |
| 210 | Membership clubs, sports centers, parks, theaters, and museums (82) | 0.46% | 0.99% | 0.90% | 2.23% |
| 211 | Membership clubs and participant sports centers | 0.76% | 1.24% | −1.08% | 1.06% |
| 212 | Amusement parks, campgrounds, and related recreational services | 0.76% | 1.14% | 1.30% | 3.09% |
| 213 | Admissions to specified spectator amusements | 0.23% | 0.80% | 1.90% | 2.56% |
| 214 | Motion picture theaters | −0.80% | 0.38% | 2.48% | 1.87% |
| 215 | Live entertainment, excluding sports | −0.80% | 0.38% | 2.47% | 1.87% |
| 216 | Spectator sports | 2.02% | 1.50% | 1.20% | 3.90% |
| 217 | Museums and libraries | −0.80% | 0.38% | 2.51% | 1.89% |
| 218 | Audio-video, photographic, and information processing equipment services (parts of 77 and 93) | 0.34% | 0.14% | 7.11% | 6.73% |
| 219 | Cable, satellite, and other live television services | 0.65% | 0.67% | 3.33% | 3.51% |
| 220 | Photo processing | −1.00% | 2.49% | −0.92% | 1.17% |
| 221 | Photo studios | 0.00% | 1.69% | 0.12% | 1.81% |
| 222 | Repair and rental of audio-visual, photographic, and information processing equipment | −0.11% | 0.80% | 3.57% | 4.16% |
| 223 | Video and audio streaming and rental | 0.22% | −0.65% | 13.23% | 11.76% |
| 224 | Video streaming and rental | 0.21% | −0.81% | 14.41% | 12.61% |
| 225 | Audio streaming and radio services (including satellite radio) | 0.26% | 0.32% | 7.61% | 7.87% |
| 226 | Gambling (91) | 0.65% | 0.35% | 3.71% | 3.95% |
| 227 | Casino gambling | 0.65% | 0.35% | 3.72% | 3.95% |
| 228 | Lotteries | 0.65% | 0.35% | 3.72% | 3.95% |
| 229 | Pari-mutuel net receipts | 0.65% | 0.35% | 3.72% | 3.95% |
| 230 | Other recreational services (81, 94, and part of 92) | −0.19% | 0.60% | 2.81% | 3.47% |
| 231 | Veterinary and other services for pets | −0.57% | 0.53% | 3.11% | 3.46% |
| 232 | Package tours | 0.76% | 1.14% | 1.30% | 3.09% |
| 233 | Maintenance and repair of recreational vehicles and sports equipment | 0.43% | −0.44% | 4.69% | 4.68% |

</details>

<details>
<summary>第 234–341 行　餐饮住宿、金融保险及其他家庭服务</summary>

| BEA 行号 | BEA 产品名称 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 |
|---:|---|---:|---:|---:|---:|
| 234 | Food services and accommodations | 0.43% | 0.52% | 3.47% | 3.87% |
| 235 | Food services | 0.20% | 0.50% | 3.37% | 3.66% |
| 236 | Purchased meals and beverages (102) | 0.20% | 0.50% | 3.36% | 3.65% |
| 237 | Meals and nonalcoholic beverages | 0.24% | 0.54% | 3.47% | 3.79% |
| 238 | Meals at schools | 0.34% | 0.50% | 3.76% | 4.03% |
| 239 | Elementary and secondary school lunches | 0.48% | −0.02% | 3.77% | 3.71% |
| 240 | Higher education school lunches | 0.30% | 0.65% | 3.77% | 4.13% |
| 241 | Other purchased meals | 0.24% | 0.55% | 3.47% | 3.78% |
| 242 | Meals at limited service eating places | 0.19% | 0.44% | 3.19% | 3.45% |
| 243 | Meals at other eating places | 0.30% | 0.65% | 3.77% | 4.14% |
| 244 | Meals at drinking places | 0.30% | 0.66% | 3.77% | 4.13% |
| 245 | Alcohol in purchased meals | −0.07% | 0.22% | 2.62% | 2.75% |
| 246 | Food furnished to employees (including military) (103) | 0.29% | 0.66% | 3.77% | 4.13% |
| 247 | Food supplied to civilians | 0.30% | 0.66% | 3.77% | 4.13% |
| 248 | Food supplied to military | 0.29% | 0.66% | 3.77% | 4.13% |
| 249 | Accommodations (104) | 1.89% | 0.62% | 4.09% | 5.20% |
| 250 | Hotels and motels | 2.34% | 0.71% | 4.27% | 5.71% |
| 251 | Housing at schools | 0.41% | 0.31% | 3.45% | 3.56% |
| 252 | Financial services and insurance | 0.43% | 0.18% | 4.39% | 4.23% |
| 253 | Financial services | 0.57% | 0.18% | 4.70% | 4.49% |
| 254 | Financial services furnished without payment (107) | 0.37% | 0.16% | 2.77% | 2.91% |
| 255 | Commercial banks | 0.54% | 0.70% | 5.40% | 5.87% |
| 256 | Other depository institutions and regulated investment companies | 0.24% | −0.27% | 0.73% | 0.69% |
| 257 | Pension funds | 0.18% | −0.23% | 0.64% | 0.32% |
| 258 | Financial service charges, fees, and commissions (108) | 0.78% | 0.19% | 6.81% | 6.21% |
| 259 | Financial service charges and fees | 2.69% | 0.00% | 1.00% | 1.25% |
| 260 | Securities commissions | −1.57% | 0.36% | 7.02% | 5.87% |
| 261 | Direct commissions | 0.25% | 0.00% | 8.22% | 6.77% |
| 262 | Exchange-listed equities | 0.30% | 0.00% | 11.66% | 9.41% |
| 263 | Other direct commissions | 0.13% | 0.00% | 1.02% | 1.03% |
| 264 | Indirect commissions | −4.12% | 0.29% | 11.43% | 9.29% |
| 265 | Over-the-counter equity securities | −14.28% | −6.38% | 36.85% | 22.66% |
| 266 | Other imputed commissions | 3.37% | 4.68% | −2.04% | 1.85% |
| 267 | Mutual fund sales charges | 0.01% | 1.00% | −0.93% | −0.47% |
| 268 | Portfolio management and investment advice services | 0.37% | 0.27% | 8.15% | 7.19% |
| 269 | Trust, fiduciary, and custody activities | 0.01% | 0.00% | 24.60% | 24.55% |
| 270 | Insurance | 0.14% | 0.19% | 3.74% | 3.67% |
| 271 | Life insurance (110) | 0.06% | 0.11% | 2.67% | 2.46% |
| 272 | Net household insurance (111) | 0.16% | 0.12% | 1.13% | 1.03% |
| 273 | Household insurance premiums and premium supplements | 0.16% | 0.12% | 1.12% | 1.03% |
| 274 | Less: Household insurance normal losses | 0.16% | 0.12% | 1.12% | 1.03% |
| 275 | Net health insurance (112) | 0.26% | 0.30% | 5.73% | 5.70% |
| 276 | Medical care and hospitalization | 0.36% | 0.34% | 6.98% | 6.96% |
| 277 | Income loss | 0.65% | 0.35% | 3.72% | 3.95% |
| 278 | Workers' compensation | −0.54% | 0.00% | −2.47% | −2.61% |
| 279 | Net motor vehicle and other transportation insurance (116) | −0.08% | 0.02% | 0.28% | 0.28% |
| 280 | Other services | 0.19% | 0.29% | 2.92% | 2.98% |
| 281 | Communication | −0.38% | −0.03% | 1.04% | 0.82% |
| 282 | Telecommunication services (71) | 0.07% | 0.14% | 0.52% | 0.70% |
| 283 | Land-line telephone services, local charges | 0.00% | −0.05% | 2.28% | 2.41% |
| 284 | Land-line telephone services, long-distance charges | 0.00% | −0.05% | 2.28% | 2.41% |
| 285 | Cellular telephone services | 0.08% | 0.16% | 0.36% | 0.53% |
| 286 | Postal and delivery services (68) | 1.39% | 1.76% | 15.15% | 15.91% |
| 287 | First-class postal service (by U.S. Postal Service) | 0.49% | 1.70% | 12.67% | 13.27% |
| 288 | Other delivery services (by non-U.S. postal facilities) | 1.75% | 1.79% | 16.17% | 17.00% |
| 289 | Internet access (72) | −1.31% | −0.54% | 0.20% | −0.74% |
| 290 | Education services | 0.81% | 0.17% | 3.41% | 3.36% |
| 291 | Higher education (97) | 1.22% | 0.10% | 4.00% | 3.85% |
| 292 | Proprietary and public higher education | 1.22% | 0.10% | 4.00% | 3.85% |
| 293 | Nonprofit private higher education services to households | 1.22% | 0.10% | 4.00% | 3.85% |
| 294 | Nursery, elementary, and secondary schools (98) | 0.21% | 0.63% | 4.02% | 4.35% |
| 295 | Elementary and secondary schools | 0.49% | 0.72% | 4.43% | 4.83% |
| 296 | Day care and nursery schools | −0.39% | 0.43% | 3.13% | 3.32% |
| 297 | Commercial and vocational schools (99) | 0.32% | −0.04% | 1.61% | 1.52% |
| 298 | Professional and other services (121) | −0.33% | 0.05% | 3.25% | 2.93% |
| 299 | Legal services | −0.92% | 0.00% | 2.93% | 2.60% |
| 300 | Accounting and other business services | 0.77% | 0.10% | 4.27% | 3.63% |
| 301 | Tax preparation and other related services | 1.03% | 0.18% | 3.99% | 3.29% |
| 302 | Employment agency services | −0.14% | 0.38% | 3.30% | 4.58% |
| 303 | Other personal business services | 0.29% | −0.07% | 5.05% | 4.43% |
| 304 | Labor organization dues | 0.21% | 0.11% | 3.02% | 3.27% |
| 305 | Professional association dues | −0.92% | 0.00% | 2.92% | 2.60% |
| 306 | Funeral and burial services | 0.10% | 0.16% | 2.75% | 2.91% |
| 307 | Personal care and clothing services (14 and parts of 17 and 118) | 0.70% | 1.11% | 5.27% | 6.01% |
| 308 | Personal care services | 0.71% | 1.15% | 5.23% | 5.99% |
| 309 | Hairdressing salons and personal grooming establishments | 0.45% | 0.22% | 3.74% | 3.78% |
| 310 | Miscellaneous personal care services | 0.91% | 1.89% | 6.41% | 7.77% |
| 311 | Clothing and footwear services | 0.63% | 0.68% | 5.69% | 6.15% |
| 312 | Laundry and drycleaning services | 0.49% | 0.10% | 5.34% | 5.36% |
| 313 | Clothing repair, rental, and alterations | 0.91% | 1.89% | 6.41% | 7.77% |
| 314 | Repair and hire of footwear | 0.91% | 1.89% | 6.41% | 7.77% |
| 315 | Social services and religious activities (120) | 0.23% | 0.40% | 3.26% | 3.36% |
| 316 | Child care | −0.39% | 0.43% | 3.13% | 3.32% |
| 317 | Social assistance | 0.38% | 0.44% | 3.43% | 3.49% |
| 318 | Homes for the elderly | 0.07% | 0.47% | 0.95% | 1.37% |
| 319 | Residential mental health and substance abuse | −0.30% | 0.85% | 3.54% | 4.33% |
| 320 | Individual and family services | 0.57% | 0.32% | 4.23% | 3.87% |
| 321 | Vocational rehabilitation services | 0.75% | 1.02% | 2.60% | 3.60% |
| 322 | Community food and housing / emergency / other relief services | 0.90% | 0.02% | 4.47% | 4.43% |
| 323 | Other social assistance, not elsewere classified | −0.26% | 0.40% | 2.46% | 2.77% |
| 324 | Social advocacy and civic and social organizations | 0.28% | 0.30% | 2.88% | 3.08% |
| 325 | Religious organizations' services to households | 0.20% | 0.14% | 1.01% | 0.91% |
| 326 | Foundations and grantmaking and giving services to households | 0.69% | −0.04% | 3.08% | 3.46% |
| 327 | Household maintenance (parts of 31, 33, and 36) | 0.27% | −0.73% | 4.50% | 2.84% |
| 328 | Domestic services | 1.22% | −0.30% | 7.96% | 6.33% |
| 329 | Moving, storage, and freight services | −2.26% | 3.05% | −7.08% | −3.44% |
| 330 | Repair of furniture, furnishings, and floor coverings | 0.36% | −5.83% | 8.61% | 0.92% |
| 331 | Repair of household appliances | 0.36% | −5.83% | 8.61% | 0.92% |
| 332 | Other household services | 0.86% | −1.50% | 6.96% | 4.00% |
| 333 | Net foreign travel | — | — | — | — |
| 334 | Foreign travel by U.S. residents (129) | 1.23% | 0.41% | 4.02% | 5.07% |
| 335 | Passenger fares for foreign travel | 2.82% | 0.56% | 13.60% | 14.16% |
| 336 | U.S. travel outside the United States | 0.54% | 0.35% | 0.24% | 1.46% |
| 337 | U.S. student expenditures | 0.54% | 0.35% | 0.18% | 1.42% |
| 338 | Less: Expenditures in the United States by nonresidents (130) | 1.69% | 0.02% | 6.93% | 6.93% |
| 339 | Foreign travel in the United States | 1.88% | −0.02% | 8.01% | 8.07% |
| 340 | Medical expenditures of foreigners | 0.63% | 0.70% | 5.38% | 5.77% |
| 341 | Expenditures of foreign students in the United States | 1.22% | 0.10% | 4.00% | 3.85% |

</details>

<details>
<summary>第 342–368 行　为家庭服务的非营利机构</summary>

| BEA 行号 | BEA 产品名称 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 |
|---:|---|---:|---:|---:|---:|
| 342 | Final consumption expenditures of nonprofit institutions serving households (NPISHs) (132) | 0.59% | 1.09% | 1.86% | 3.46% |
| 343 | Gross output of nonprofit institutions (133) | 0.33% | 0.42% | 2.92% | 2.99% |
| 344 | Health, gross output | 0.23% | 0.50% | 2.89% | 2.91% |
| 345 | Outpatient services, gross output | 0.86% | 0.22% | 2.70% | 2.71% |
| 346 | Nonprofit hospitals, gross output | 0.17% | 0.53% | 2.94% | 2.90% |
| 347 | Nonprofit nursing homes, gross output | −0.10% | 0.65% | 2.51% | 3.42% |
| 348 | Recreation services, gross output | 0.57% | 0.26% | 2.71% | 3.01% |
| 349 | Education services, gross output | 0.52% | 0.29% | 3.39% | 3.47% |
| 350 | Social services, gross output | 0.53% | 0.39% | 3.73% | 3.73% |
| 351 | Religious organizations, gross output | 0.20% | 0.14% | 1.01% | 0.91% |
| 352 | Foundations and grantmaking and giving establishments, gross output | 0.69% | −0.04% | 3.08% | 3.46% |
| 353 | Social advocacy establishments, gross output | 0.56% | 0.39% | 3.49% | 3.92% |
| 354 | Civic and social organizations, gross output | 0.81% | −0.01% | 2.90% | 2.57% |
| 355 | Professional advocacy, gross output | 0.21% | 0.43% | 2.12% | 2.84% |
| 356 | Less: Receipts from sales of goods and services by nonprofit institutions (134) | 0.23% | 0.15% | 3.29% | 2.80% |
| 357 | Health services to households | 0.16% | 0.09% | 3.32% | 2.63% |
| 358 | Outpatient services to households | −0.10% | 0.05% | 3.27% | 3.29% |
| 359 | Nonprofit hospitals services to households | 0.19% | 0.13% | 3.29% | 2.51% |
| 360 | Nonprofit nursing homes services to households | 0.30% | −0.37% | 3.94% | 3.16% |
| 361 | Recreation services to households | 0.18% | 0.91% | 0.65% | 1.72% |
| 362 | Education services to households | 0.87% | 0.28% | 3.85% | 3.88% |
| 363 | Social services to households | 0.33% | 0.44% | 3.62% | 3.74% |
| 364 | Religious organizations' services to households | 0.20% | 0.14% | 1.01% | 0.91% |
| 365 | Foundations and grantmaking and giving services to households | 0.69% | −0.04% | 3.08% | 3.46% |
| 366 | Services of social advocacy establishments to households | 0.56% | 0.39% | 3.49% | 3.92% |
| 367 | Civic and social organizations' services to households | 0.81% | −0.01% | 2.90% | 2.57% |
| 368 | Professional advocacy services to households | −0.38% | 0.17% | 2.87% | 2.97% |

</details>

<details>
<summary>第 369–402 行　消费对照组、特殊分类与市场化指数</summary>

| BEA 行号 | BEA 产品名称 | 9 月环比 | 10 月环比 | 9 月同比 | 10 月同比 |
|---:|---|---:|---:|---:|---:|
| 369 | Control group | 0.16% | 0.46% | 2.25% | 2.77% |
| 370 | PCE food and energy | 1.92% | 0.52% | 8.04% | 8.71% |
| 371 | PCE energy goods and services | 5.37% | 0.72% | 21.29% | 22.45% |
| 372 | PCE excluding food | 0.54% | 0.31% | 3.84% | 3.99% |
| 373 | PCE excluding energy | 0.30% | 0.30% | 3.02% | 3.16% |
| 374 | PCE excluding food and energy | 0.32% | 0.29% | 3.14% | 3.26% |
| 375 | PCE goods excluding food and energy | 0.18% | 0.35% | 1.98% | 2.35% |
| 376 | PCE services excluding energy | 0.37% | 0.27% | 3.52% | 3.56% |
| 377 | Market-based PCE | 0.52% | 0.30% | 3.72% | 3.87% |
| 378 | Market-based PCE motor vehicles and parts | 0.22% | −0.15% | 0.11% | −0.16% |
| 379 | Market-based PCE durable goods other than motor vehicles and parts | 0.16% | 0.22% | 4.42% | 4.65% |
| 380 | Market-based PCE food and beverages purchased for off-premises consumption | −0.02% | 0.41% | 1.49% | 1.92% |
| 381 | Market-based PCE clothing and footwear | 0.16% | −0.10% | 2.80% | 3.04% |
| 382 | Market-based PCE gasoline and other energy goods | 9.25% | 0.80% | 35.44% | 38.02% |
| 383 | Market-based PCE other nondurable goods | 0.16% | 0.88% | 0.52% | 1.39% |
| 384 | Market-based PCE services | 0.36% | 0.23% | 3.54% | 3.49% |
| 385 | Market-based PCE housing services | 0.32% | 0.29% | 3.15% | 3.30% |
| 386 | Market-based PCE household utilities | 0.16% | 0.59% | 4.60% | 4.57% |
| 387 | Market-based PCE health care | 0.12% | 0.09% | 3.03% | 2.65% |
| 388 | Market-based PCE transportation services | 1.87% | −0.36% | 8.93% | 8.10% |
| 389 | Market-based PCE recreation services | 0.30% | 0.67% | 3.02% | 3.74% |
| 390 | Market-based PCE food services and accommodations | 0.43% | 0.52% | 3.46% | 3.87% |
| 391 | Market-based PCE financial services and insurance | 1.67% | 0.03% | 2.36% | 2.31% |
| 392 | Market-based PCE other services | 0.17% | 0.20% | 3.24% | 3.10% |
| 393 | Market-based PCE communication services | −0.38% | −0.03% | 1.04% | 0.82% |
| 394 | Market-based PCE education | 0.81% | 0.17% | 3.41% | 3.36% |
| 395 | Market-based PCE professional services | −0.36% | 0.04% | 3.27% | 2.91% |
| 396 | Market-based PCE personal care and clothing services | 0.70% | 1.11% | 5.27% | 6.01% |
| 397 | Market-based PCE child care | −0.39% | 0.43% | 3.13% | 3.32% |
| 398 | Market-based PCE household maintenance | 0.28% | −0.76% | 4.57% | 2.85% |
| 399 | Market-based PCE food and energy | 1.92% | 0.52% | 8.05% | 8.71% |
| 400 | Market-based PCE excluding food | 0.57% | 0.29% | 3.92% | 4.04% |
| 401 | Market-based PCE excluding energy | 0.29% | 0.28% | 2.96% | 3.07% |
| 402 | Market-based PCE excluding food and energy | 0.31% | 0.27% | 3.10% | 3.18% |

</details>

[bea]: https://www.bea.gov/news/2026/personal-income-and-outlays-october-2026
[prev]: https://www.bea.gov/news/2026/personal-income-and-outlays-september-2026
[nipa]: https://apps.bea.gov/national/Release/XLS/Survey/Section2All_xls.xlsx
[detail]: https://apps.bea.gov/national/Release/XLS/Underlying/Section2All_xls.xlsx
[archive]: https://apps.bea.gov/histdata/histChildLevels.html?HMI=7&oldDiv=National%20Accounts
[market]: https://www.bea.gov/help/faq/83
[cons]: https://www.cmegroup.com/education/events/econoday/667163
[cle]: https://www.clevelandfed.org/our-research/indicators-and-data/inflation-nowcasting
[fhn]: https://docs.fhnfinancial.com/?e795f284-843d-4c96-bd60-ced0bb7cff22=
[shutdown]: https://www.bea.gov/news/2026/personal-income-and-outlays-october-and-november-2025
[eia]: https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=EMM_EPMR_PTE_NUS_DPG&f=W
[cpi]: https://www.bls.gov/news.release/archives/cpi_11102026.htm
[ppi]: https://www.bls.gov/news.release/archives/ppi_11132026.htm
[fed]: https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm
[minutes]: https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20261028.pdf
[target]: https://www.federalreserve.gov/monetarypolicy/files/FOMC_LongerRunGoals.pdf
[gdp]: https://www.bea.gov/news/2026/gdp-second-estimate-and-corporate-profits-3rd-quarter-2026
[cal]: https://www.bls.gov/schedule/2026/12_sched_list.htm
[pricing]: https://www.kiplinger.com/investing/economy/this-weeks-economic-calendar
[markets]: https://www.reuters.com/business/nasdaq-futures-slide-over-2-fresh-us-tariff-concerns-inflation-data-focus-2026-11-25/
[tariff]: https://www.investing.com/news/world-news/us-proposes-new-tariffs-on-14-trading-partners-to-fight-excess-factory-capacity-5050714
