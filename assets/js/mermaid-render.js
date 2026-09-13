// Render each block independently so a syntax error cannot hide other diagrams.
(async () => {
  const blocks = document.querySelectorAll(".mermaid-diagram");
  if (!blocks.length) return;

  function showFailure(block, message, error) {
    const status = block.querySelector(".mermaid-status");
    status.textContent = message;
    status.hidden = false;
    block.querySelector("details").open = true;
    console.warn("Mermaid diagram could not be rendered", error);
  }

  const mermaid = window.mermaid;
  if (!mermaid) {
    blocks.forEach(block => showFailure(block, "图表组件未能加载，以下保留原始源码。"));
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    suppressErrorRendering: true,
    theme: "base",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
    themeVariables: {
      primaryColor: "#eef3ff",
      primaryTextColor: "#111a25",
      primaryBorderColor: "#1e5eff",
      lineColor: "#4c5968",
      secondaryColor: "#f7f5ef",
      tertiaryColor: "#ffffff",
      fontSize: "16px"
    },
    flowchart: { htmlLabels: false, useMaxWidth: true }
  });

  await document.fonts.ready;
  for (const [index, block] of Array.from(blocks).entries()) {
    const source = block.querySelector("code").textContent;
    const output = block.querySelector(".mermaid-output");
    try {
      const { svg, bindFunctions } = await mermaid.render(`mermaid-diagram-${index}`, source);
      output.innerHTML = svg;
      const diagram = output.querySelector("svg");
      // Keep text readable on phones; wide diagrams scroll within their container.
      const width = diagram.viewBox.baseVal.width;
      if (width > 0) diagram.style.minWidth = `${Math.min(width, 640)}px`;
      output.hidden = false;
      bindFunctions?.(output);
      block.querySelector("details").open = false;
      block.dataset.rendered = "true";
    } catch (error) {
      output.replaceChildren();
      output.hidden = true;
      showFailure(block, "图表暂时无法渲染，以下保留原始源码。", error);
    }
  }
})();
