# 🛠 How We Built Johnny

Johnny, Ponzi Land's first AI agent, represents a unique blend of **on-chain automation** and **social intelligence**. Here's how we brought him to life.

### 🧠 Core Architecture

Johnny is build with an early version of [Daydreams](https://www.dreams.fun/), specifically a fork of 0.0.4 which can be found [here](https://github.com/Runelabsxyz/daydreams). It works through having a core orchestrator for the agent that is responsible for handling thoughts created by the conscioussness, as well as inputs from discord and twitter. It also has access to the chain of thought that the the orchestrator can use to execute actions in ponziland. 

The conscioussness is set to run every 5 minutes, and will produce a thought about either doing something in ponziland or sharing a thought on twitter. It has access to the 5 most recent thoughts it has produced to avoid repeating itself. If it decides to something in ponziland, like checking on its lands, it will create a chain of thought to do so, and then the chain of thought will return the outcome of the action to the orchestrator, where it can decide how to handle it.

The consciouss produces thoughts such as I should check on my lands, or I should tweet something, which the orchestrator processes as an input to decide what to do. It will then output the actions to take, and in the case of a ponziland_action, it will create a chain of thought to execute the action and then process the result of the ponziland action as a new input.

![Orchestrator](/img/daydreams_chart.png)

All of the charactarization is done in the conscioussness and the orchestrator/processor. The conscioussness produces thoughts while the processor handles them and decides what actions to take. At the moment the actions it has access to are:
- discord_message
- tweet
- ponziland_action (Chain of Thought)

# ⛓️ Chain of Thought 
The chain of thought is able to fetch data from ponziland, at the moment it has access to the following queries: 

### Ponziland Queries
- **balances** - shows all erc20 token balances 
- **auctions** - shows all active auctions and their current price
- **lands** - shows all owned lands and their current stake amount
- **claims** - shows the claimable yield from all neighbors of each land
- **neighbors** - shows the sell price, stake token, and tax rate of all neighbors of all owned lands
- **nukeable_lands** - shows all lands that can be nuked

and can execute the following starknet calls:
### PonziLand Actions
- buy, bid, increase_stake, increase_price, nuke

### ERC20
- approve for ponziland

So when johnny decides to check on his lands, the chain of thought will make the query and then return the results to the orchestrator/processor, where it can decide how to handle it. Then it can potentially create a new ponziland_action to follow up on the thought. The prompt in the chain of thought that determines whether the query has been completed, and if the chain of thought should be terminated, has been modified to return a summary of all actions that have been taken and all data that has been fetched. The current version uses the chain of thought for pretty limited and specific actions, so a usual chain of thought will be making a query and returning the results to the processor.

This means that after the chain of thought decides if an action is complete, the processor also makes a similar decision while including other context like the character data and the previous actions that have been taken. So if Johnny is going to bid on an auction, it will usually take 2 chain of thoughts, one to fetch the auction data, and one to make the bid, but doing it this way enables keeping the character data separate from the chain of thought and is required to have important decisions like whether to buy a land be done on the processor level rather than the chain of thought level.

![Example of a chain of thought](/img/example-cot.png)

Also, the processor has been simplified in this version to only use a single processor, which has been tailored to handle the thoughts produced by the conscioussness and is therefore bad at handling messages at the moment. Ideaglly we would process messages and internal thoughts separately, though delegating to a subprocessor, but this is a simpler solution for now. 

This is just Version 0.1 of our AI agent system. As we move toward multiple agents and more complex interactions, we'll be expanding these systems significantly.

_Want to see Johnny in action? Follow [@JohnnyChaipman](https://twitter.com/JohnnyChaipman) on Twitter._
