+++
title = 'Hardware_optimization_language'
date = 2025-02-26T15:18:03+08:00
draft = false
+++

# 硬件，优化和语言

DeepSeek 今日开源了 Deep GEMM，一个专注于矩阵计算加速的库。不过，该库目前仅支持 H 系列 GPU，这对普通用户来说限制较大。例如，AWS 的 P5 48x 实例价格高达 约 100 美元/小时，即使是较便宜的选项，也在 约 2 美元/小时/GPU，测试成本仍然较高。

为了直观感受 CPU、GPU 以及不同计算框架优化的影响，我进行了一个简单的对比测试。

测试方法

选取 LLM 计算中常见的矩阵运算，使用 12288 维的 FP32 矩阵 进行 50 次乘法迭代，并分别在以下硬件与计算环境上进行测试：
	•	M4 Pro (14-core) CPU + Python
	•	M4 Pro GPU（通过 C++ + Metal 调用）
	•	NVIDIA T4 + CUDA

测试结果

计算耗时如下：
	•	NVIDIA T4 + CUDA：0.6 秒（最快）
	•	M4 Pro CPU + Python：200 秒
	•	M4 Pro GPU + C++ + Metal：450+ 秒（最慢）

分析与结论
	1.	NVIDIA 在矩阵计算方面的优势极为明显，T4 + CUDA 的计算速度相比 Python + CPU 快了 3 个数量级。
	2.	macOS 通过 C++ + Metal 调用 GPU 反而比 CPU 更慢，可能的原因包括：
	•	优化程度不同：Python 的 numpy 库经过深度优化，而手动调用 GPU 计算可能缺乏相应的优化。
	•	Metal API 调用开销：C++ 直接调用 GPU 计算时，可能存在较大的初始化或计算开销。
	3.	影响计算性能的主要因素依次是：硬件 > 算法优化 > 编程语言。
	•	硬件 是决定性因素，强大的 GPU 在矩阵计算上的提升最为显著。
	•	优化 影响巨大，经过深度优化的计算框架（如 numpy 或 CUDA）能带来数量级的性能提升。
	•	编程语言 影响相对较小，Python 通过 numpy 仍能比未经优化的 C++ GPU 代码快。

综上所述，在高性能矩阵计算领域，GPU + 充分优化的计算框架（如 CUDA）是最佳选择，而 GPU 调用方式与优化深度决定了实际性能表现。

deepGEMM的配置要求：
![deepgemmrequirement](https://i.imgur.com/sSzSsvD.png)

Macos M4 pro 测试结果
![M4pro](https://i.imgur.com/70cjuPp.png)

colab nvidia T4 GPU 测试结果
![T4](https://i.imgur.com/AS67BEK.png)