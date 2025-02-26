+++
title = 'Hardware_optimization_language'
date = 2025-02-26T15:18:03+08:00
draft = false
+++

# 硬件，优化和语言

Deepseek 今天开源了deep GEMM，一个对矩阵计算加速的library， 可惜只支持H系列GPU，aws的P5 48x大约100美元/小时，也有便宜的，大约2美元/小时/GPU， 对大多数人来说测试比较麻烦。 我做了一个类比的测试，可以从一个侧面感受到CPU， GPU， 以及框架是否优化情况下的差异。 采用LLM模型常见的矩阵计算为例， 对12288-D 的fp32精度matrix进行乘法计算， 迭代50次。 分别测试了M4 pro-14core CPU, GPU, nvidia T4 cuda。 从结果上看到速度差异非常大： 其中最快的是基于cuda的T4，只用了0.6秒。 python+M4 pro CPU耗时 200秒。 因为python在macOS没有办法直接调用GPU加速，因此采取了CPP通过mental调用macOS的GPU， 耗时450+秒。从中可以看出，对于矩阵计算来说，Nvidia的优势超越了3个量级。那为什么macOS中通过CPP调用GPU加速依然落后于纯CPU计算呢？可能的原因之一在于优化， 通过CPP调用GPU的过程是完全手搓的，而pythons的numpy库经过了深度的优化， 我猜测可能是原因之一。 从中可以看出，硬件是决定性的，其次才是优化。最后是语言。

deepGEMM的配置要求：
![deepgemmrequirement](https://i.imgur.com/sSzSsvD.png)

Macos M4 pro 测试结果
![M4pro](https://i.imgur.com/70cjuPp.png)

colab nvidia T4 GPU 测试结果
![T4](https://i.imgur.com/AS67BEK.png)