import { Client, GatewayIntentBits, Events } from "discord.js";
import { commands, deployCommands } from "./commands";

const client = new Client({ intents: GatewayIntentBits.Guilds });

client.once(Events.ClientReady, () => console.log("Discord bot ready!"));

client.on(Events.InteractionCreate, async (interaction) => {
  console.log(interaction);
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

deployCommands().then(() => {
  console.log("Deployed commands!");
});

// Disabled for now
// client.login(process.env.DISCORD_TOKEN);
