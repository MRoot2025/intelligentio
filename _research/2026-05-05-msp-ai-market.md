# Research brief — AI-MSP / AI-SOC market refresh (2026-05-05)

> **Source:** internal research pass refreshing the May 2026 snapshot. Feeds positioning across the `/ai` pillar page and all WPs.

## Top 10 vendors

| Vendor | Positioning | Funding signal | Δ vs May'26 |
|---|---|---|---|
| **Torq HyperSOC** | Multi-agent SOC + hyperautomation | $140M Series D Jan 2026, $1.2B unicorn | Better-funded |
| **Conifers CognitiveSOC** | MSSP-friendly multi-tenant agentic mesh | Private | Same |
| **Arctic Wolf Aurora** | "World's largest agentic SOC" — bundled into MDR | Existing AW base | **NEW threat** |
| **Prophet Security** | Agentic alert resolution mirroring senior analyst reasoning | $41M Series A Feb 2026 | Allies; raise validates wedge |
| **Radiant Security** | Mid-market AI SOC + built-in affordable logging | $22.5M | Same |
| **Splunk SOAR (Cisco)** | Predefined workflow + AI overlay | Cisco bundle | Now in 6-agent SOC pack |
| **Google Agentic SOC** | Native triage on Chronicle/SecOps | GCP bundle | **NEW** hyperscaler entry |
| **CrowdStrike Charlotte** | Falcon-native AI agent | Endpoint upsell | Expanded scope at RSAC |
| **SentinelOne Purple AI** | Auto-investigation now GA | S1 base | Caught up with CRWD |
| **Dropzone / Simbian / Anvilogic** | Pure-play AI-SOC startups | Seed/A | Anvilogic surprised analysts |

## Buyer pain points (50–500 employee firm)

- **Adoption reality lags marketing.** Gartner: AI SOC at "Innovation Trigger", 1–5% market penetration. 17% have prod agents; 60% plan within 24 months.
- **Governance gap.** 51% cite governance as #1 barrier. Agents enter prod 7–8x faster than governance is built.
- **Tool sprawl.** 46% of security teams spend more time maintaining tools than doing security.
- **Prophetic marketing fatigue.** Vendor claims describe "future state, not demonstrable production capability."
- **Multi-tenant complexity stalls 40% of MSPs.**
- **Regulatory crush.** EU AI Act + NIS2 + DORA + SEC + TRAIGA. 22% have written GenAI policies.

## Hot OSS / patterns

- **MCP** — donated to Linux Foundation / Agentic AI Foundation. 110M+ SDK downloads/month, 17,468 indexed servers, 78% of enterprise AI teams have ≥1 MCP agent in prod.
- **LangGraph** — 80k+ stars, enterprise default for stateful workflows
- **CrewAI** — 44.6k stars, first-class MCP, A2A added
- **Microsoft Agent Framework** — Semantic Kernel + AutoGen merged Apr 2026
- **A2A protocol** — Google ADK native; CrewAI added
- **Bedrock AgentCore** — Policy GA Mar 3, Evaluations GA Mar 31, A/B Apr 30 2026; 2M+ SDK downloads in 5 months
- **STORM (Stanford)** — 28.1k stars, research-grade reports w/ citations

## Three most defensible wedges for IG / Intelligent IT

1. **Multi-tenant AI-MSP control plane** — Trust Portal + AiTAgent as the governance overlay every MSP needs and no AI-SOC vendor wants to build. Wraps Prophet/Radiant/Arctic Wolf with tenant-scoping + evidence loop.
2. **AiTCSG vendor-agnostic BMS** — only AI-native, multi-tenant, MSP-channel BMS analytics + control. $14B → $34B by 2030 (13% CAGR). Facilio is single-tenant. WebCTRL pilot at HQ Tower is unfair training data.
3. **AI-MSP coordinator + audit-as-a-service bundle** — AiTAgent + Intelligent View + Sentinel + Audit. MSP-channel SKU using AgentCore-style primitives that Vanta/Drata can't match because they're not channel-built.

**Strategy delta vs May 2026:** "Build + partner with Prophet/Radiant" still holds — but partnering value is now **governance overlay, not feature parity**. Hyperscalers commoditised agents; sell what they refuse to build (multi-tenant MSP plumbing).
