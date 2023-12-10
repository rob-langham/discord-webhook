Feature: Send simple mesages with templates
  Admins can store templates so they can be used dynamically from TradingView alerts

  @TemplateTester
  Scenario: Store and test a template
    Given a webhook was created
    When the following template was stored with key "strategy-name" for the webhook:
      """
      Simple message
      """
    When the template test is called without any parameters for "strategy-name"
    Then the template is rendered as:
      """
      Simple message
      """

  @DiscordWebhook
  Scenario: Send a simple message to discord
    Given a webhook was created
    And the following template was stored with key "strategy-name" for the webhook:
      """
      Simple message
      """
    When TradingView posts the following json object to the app:
      """
      {
        "template": "strategy-name",
      }
      """
    Then then webook recieves message:
      """
      Simple message
      """
