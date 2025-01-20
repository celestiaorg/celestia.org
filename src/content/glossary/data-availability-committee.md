---
title: "Data availability committee"
description: "A data availability committee (DAC) is a permissioned group of nodes responsible for providing data availability to a blockchain."
---

A data availability committee (DAC) is a permissioned group of nodes responsible for providing data availability to a blockchain. DAC's are an insecure source of data availability because they make an honest majority assumption and don't have any stake to slash if a data withholding attack is attempted. Data availability committees are primarily used to provide a cheap and less secure source of data availability to L2s.

Here are some key points about DACs:

-   They are **centralized** by nature
-   They provide _cheaper_ but less secure data availability
-   They rely on an [honest majority assumption](https://www.google.com/search?q=honest+majority+assumption+blockchain)

## Security Considerations

1. No slashing mechanism
2. Potential for data withholding
3. Trust assumptions

### Example Code
