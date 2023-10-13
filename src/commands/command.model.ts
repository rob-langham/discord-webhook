import { Interaction, SlashCommandBuilder } from "discord.js";

export type CustomCommand = {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction) => void;
};
