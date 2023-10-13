import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { storage } from "../file-storage";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("risk")
    .setDescription("Replies with Pong!")
    .addNumberOption((o) =>
      o
        .setName("percentage")
        .setDescription("The ammount of the account balance to risk per trade")
        .setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const percentage = interaction.options.get("percentage", true).value as number;
    const str = (percentage / 100).toFixed(4);
    storage.set("riskPercentage", str);
    interaction.reply(`Updated risk to ${+str * 100}%`);
  },
};
