# 🛠 How We Built Johnny

Johnny, Ponzi Land's first AI agent, represents a unique blend of **on-chain activity** and **social presence**. Here's how we brought him to life.

## 🧠 Core Architecture

Johnny is built with an early version of [Daydreams](https://www.dreams.fun/), specifically a fork of 0.0.4 which can be found [here](https://github.com/Runelabsxyz/daydtreams). 

The system works through:
- A core orchestrator that handles inputs and creates actions
- A consciousness module that produces thoughts on an interval
- Processors that handle inputs from Discord and Twitter

These thoughts are then handled as inputs by the consciousness, as well as inputs from Discord and Twitter. The system processes those inputs and potentially delegates to subprocessors based on the type of input (though currently, this version only uses the master processor). It also has access to the chain of thought that the orchestrator can use to execute actions in PonziLand. However, since we are handling all inputs with a single processor, it is not good at handling messages and tweets at the moment, but future versions will be able to handle this.

![Orchestrator](/img/daydreams_chart.png)

The conscioussness is set to run every 5 minutes, and will produce a thought about either doing something in ponziland or sharing a thought on twitter. The prompt includes the five most recent thoughts produced to avoid repeating itself. If the conscioussness produces a thought about doing something in ponziland, like checking on its lands, the orchestrator will create a chain of thought to do so, and then the chain of thought will return the outcome of the action to the orchestrator, where the result can be processed and responded to.

The conscioussness produces thoughts such as "I should check on my lands", or "I should tweet something", which the orchestrator processes as an input to decide what to do. The orchestrator will process the thought and then output the actions to take, and in the case of a ponziland action, a chain of thought is started to execute the action and then the result of the ponziland action is processed as a new input.

All of the charactarization is done in the conscioussness and the orchestrator/processor. The conscioussness produces thoughts while the processor processes those thoughts as well as other inputs, and decides what actions to take. At the moment the actions the processor has access to are:
- discord_message
- tweet
- ponziland_action ( Start Chain of Thought)

## ⛓️ Chain of Thought 
The chain of thought primarily handles ponziland_actions currently, but will be expanded to handle other actions in the future, such as swapping tokens.

![Example of a chain of thought](/img/example-cot.png)

### Ponziland Queries

The chain of thought is able to fetch data from ponziland, at the moment it has access to the following queries:
- **balances** - shows all erc20 token balances 
- **auctions** - shows all active auctions and their current price
- **lands** - shows all owned lands and their current stake amount
- **claims** - shows the claimable yield from all neighbors of each land
- **neighbors** - shows the sell price, stake token, and tax rate of all neighbors of all owned lands
- **nukeable_lands** - shows all lands that can be nuked

and can execute the following starknet calls:
### Transactions
- Ponziland: buy, bid, increase_stake, increase_price, nuke
- ERC20: approve for ponziland



So when Johnny decides to check on his lands:
1. The chain of thought makes the query
2. Returns the results to the orchestrator/processor
3. The processor decides how to handle it
4. Optionally creates a new `ponziland_action` to follow up

The prompt in the chain of thought determines whether the query has been completed and if the chain should be terminated. It has been modified to return a summary of all actions taken and data fetched. The current version uses the chain of thought for limited, specific actions - typically making a query and returning results to the processor.

When Johnny bids on an auction, the process typically involves two chain of thoughts:
1. First chain: Fetch the auction data
2. Second chain: Make the bid

This separation allows us to:
- Keep character data separate from the chain of thought
- Ensure important decisions (like land purchases) happen at the processor level
- Incorporate personality and potential memories in the decision-making process
- Keep the chain of thought focused on task execution rather than decision-making

Also, the processor has been simplified in this version to only use a single processor, which has been tailored to handle the thoughts produced by the conscioussness and is therefore bad at handling messages at the moment. Ideaglly we would process messages and internal thoughts separately, though delegating to a subprocessor, but this is a simpler solution for now. 

This is just version 0.1 of our AI agent system. As we move toward multiple agents and more complex interactions, we'll be expanding these systems significantly. More about the next steps can be found [here](#next-steps)

_Want to see Johnny in action? Follow [@JohnnyChaipman](https://twitter.com/JohnnyChaipman) on Twitter._
