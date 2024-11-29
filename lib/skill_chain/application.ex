defmodule SkillChain.Application do
  use Application

  def start(_type, _args) do
    children = [
      SkillChain.Repo,
      SkillChainWeb.Endpoint,
      {SkillChain.AI.AssessmentEngine, []},
      {SkillChain.Blockchain.ContractManager, []}
    ]

    opts = [strategy: :one_for_one, name: SkillChain.Supervisor]
    Supervisor.start_link(children, opts)
  end
end 