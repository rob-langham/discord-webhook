import { CommandInteraction, Interaction, InteractionType, SlashCommandBuilder } from "discord.js";
import { storage } from "../file-storage";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Replies with Pong!")
    .addNumberOption((o) =>
      o.setName("amount").setDescription("The balance the user is trading with").setRequired(true)
    ),

  async execute(interaction: CommandInteraction) {
    const amount = interaction.options.get("amount", true).value as number;
    storage.set("accountBalance", amount.toFixed(2));
    interaction.reply(`Updated balance to ${storage.get("accountBalance")}`);
  },
};
