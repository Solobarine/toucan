defmodule Backend.Users do
  @moduledoc false
  alias Backend.Accounts.User
  alias Backend.Repo

  @adjectives ~w(
  agile brave calm clever cool crisp curious daring dazzling eager electric elegant epic fancy fierce fiery
  funky gentle giant glossy golden graceful happy heroic icy jazzy jolly kind lively lonely lucky magic mellow
  mighty modern mysterious neat noble odd peaceful perfect playful polar pretty proud quiet radiant rapid rare
  rebel royal savage sharp shiny silent silly simple sleepy slick smart sneaky snappy solar solid sonic speedy
  spiky spicy splendid spry stealthy stormy strong stylish sunny sweet swift tidy tiny tough tricky tropical
  truthful uncommon vibrant vintage vivid wavy weird wild wise witty young zany zealous chill cosmic crafty
  dreamy dusky earthy fancy fearless fresh ghostly glittering glowing humble hushed loopy lunar lush moody
  muted neon night oceanic radiant rusty shadowy silken snowy stellar stormy stormy tender thunderous tiny
  tranquil tricky trusty twilight untamed vapor vivid warm wild wobbly
)

  @nouns ~w(
  alien angel ape artist arrow avalanche bandit bat bear beetle blade blaze blob breeze bug cactus camel
  captain cat cheetah chipmunk cloud comet crane crow cube cyclops deer demon dino dolphin dragon dream duck
  eagle echo ember falcon flame fox frog galaxy ghost giant glitch goat goblin gorilla hawk hero jaguar jelly
  koala kraken llama mage mammoth mantis maple meteor mist monkey moon moose moth nebula ninja nova oak
  octopus orb owl panther parrot pebble penguin phantom phoenix pirate pixel puma pup quokka rabbit raccoon
  ranger raven rhino robot rocket rogue rune saber scorpion shark sheep skeleton sloth snake sorcerer spark
  sphinx spider sprite squid squirrel starstorm stingray stone storm swan sword taco tiger titan toad troll
  turtle unicorn viper void walrus wasp whale wizard wolf wolverine wombat yeti zebra zeppelin zombie
)

  def generate_unique_username do
    username = generate_username()

    case Repo.get_by(User, username: username) do
      nil -> username
      _user -> generate_unique_username()
    end
  end

  def generate_username do
    adjective = Enum.random(@adjectives)
    noun = Enum.random(@nouns)
    number = Enum.random(100..999)

    "#{adjective}_#{noun}_#{number}"
  end
end
