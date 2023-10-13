import { Collection, REST, Routes } from "discord.js";
import { CustomCommand } from "./command.model";

export const commands = new Collection<string, CustomCommand>();

const _commands = [require("./risk"), require("./balance")] as CustomCommand[];
for (const command of _commands) {
  commands.set(command.data.name, command);
}

export async function deployCommands() {
  const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID!,
        process.env.DISCORD_GUILD_ID!
      ),
      {
        body: _commands.map((command) => command.data.toJSON()),
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
