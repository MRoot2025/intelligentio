# Research brief — 5 hardest unsolved problems in production AI (late 2025 / 2026)

> **Source:** internal research pass, 2026-05-05. Feeds the `/ai` pillar page and white papers WP1–WP6.

## Problem 1 — Agent reliability & multi-agent coordination

Multi-agent LLM systems fail in production at **41–86.7%** rates per the MAST taxonomy validated across 1,600+ execution traces (NeurIPS 2025). Failures cluster into specification ambiguity, coordination breakdown, and verification gaps. Hallucinations cascade across agent hops; "false consensus" gets locked in. MCP transport has **30+ public CVEs** since GA — tool poisoning, JWT leakage via malicious Slack/Jira tickets, STDIO-mode RCEs.

- https://arxiv.org/pdf/2503.13657 (MAST — Why Do Multi-Agent LLM Systems Fail)
- https://authzed.com/blog/timeline-mcp-breaches
- https://thehackernews.com/2026/04/anthropic-mcp-design-vulnerability.html

## Problem 2 — LLM security & supply chain

Prompt injection holds **LLM01 in OWASP Top 10 for LLM Apps 2025** with no general fix. Supply chain: HuggingFace 1.2M models, July 2025 Pillar Security disclosed an attack vector affecting 1.5M files. Malicious LoRA adapters in the wild. CVE-2024-5184 (LLM email assistant) is the canonical case study.

- https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- https://nsfocusglobal.com/ai-supply-chain-security-hugging-face-malicious-ml-models/

## Problem 3 — Grounding & retrieval at scale

Naive RAG retrieves wrong docs ~40% of the time; the LLM still answers confidently. Faithfulness, citation coverage, unsupported-claim rate are now the binding metrics. Semantic drift is the silent killer.

- https://redis.io/blog/rag-at-scale/
- https://lushbinary.com/blog/rag-retrieval-augmented-generation-production-guide/

## Problem 4 — Compute economics, gateways & latency

Enterprise LLM API spend passed **$8.4B in 2025**, tracking $15B by end 2026. Semantic caching delivers ~73% cost reduction on repetitive workloads. Multi-tenant gateways must enforce per-client quotas, model routing, regional egress, audit logging — none off-the-shelf.

- https://opper.ai/blog/llm-router-latency-benchmark-2026
- https://www.getmaxim.ai/articles/top-ai-gateways-for-semantic-caching-in-2026/

## Problem 5 — Compliance & governance

**EU AI Act Article 50** transparency obligations fully applicable **2 August 2026**. **TRAIGA (Texas HB 149)** enforceable since **1 January 2026** with **$200K per violation**. NIST AI RMF substantial compliance is the affirmative defense. Treasury's Feb 2026 framework maps NIST onto SOC 2.

- https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- https://txaims.com/blog/complete-guide-traiga-hb-149-texas-ai-law

## Hot topics (Q4 2025 / Q1 2026)

1. **Voice/agent deepfake fraud.** 680% YoY incident growth, $2.19B cumulative losses, >50% CISOs report a successful deepfake hit.
2. **Non-Human Identity (NHI).** Machine identities outnumber humans 45:1 (cloud-native: 80:1). 78% of orgs have no formal AI-identity policy.
3. **MCP CVE explosion.** 30+ CVEs since GA. >7,000 public MCP servers. CoSAI/OASIS WS4 guidance Jan 2026.
