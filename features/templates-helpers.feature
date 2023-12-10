Feature: Send messages using custom templates enrished with TradingView data
  Admins can store templates so they can be used dynamically from TradingView alerts
  and call them with parameters to enrich the message, with information from the indicator/strategy.

  Background: 
    Given a webhook was created

  @TemplateTester @Helpers @Focus
  Scenario: Render template with parameters
    When the following template was stored with key "strategy-name" for the webhook:
      """
      Price: {{close}}
      Trend: {{trend}}
      """
    When the template test is called for "strategy-name":
      | close | 100 |
      | trend |   1 |
    Then the template is rendered as:
      """
      Price: 100
      Trend: 1
      """

  @TemplateTester @Helpers @Focus
  Scenario: Render template with conditions using "if" helper
    When the following template was stored with key "strategy-name" for the webhook:
      """
      Price: {{close}}
      Trend: {{if trend}}Up{{else}}Down{{/if}}
      """
    When the template test is called with parameters:
      | close | <close> |
      | trend | <trend> |
    Then the template is rendered as:
      """
      Price: <close>
      Trend: <expected>
      """

    Examples: 
      | close | trend | expected |
      |   200 |     1 | Up       |
      |   100 |     0 | Down     |

  @TemplateTester @Helpers
  Scenario: Render template with conditions using "eq" helper
    When the following template was stored with key "strategy-name" for the webhook:
      """
      Price: {{close}}
      Trend: {{#if (eq trend 1)}}Up{{else}}Down{{/if}}
      """
    When the template test is called with parameters:
      | close   | trend   |
      | <close> | <trend> |
    Then the template is rendered as:
      """
      Price: 100
      Trend: <expected>
      """

    Examples: 
      | close | trend | expected |
      |   100 |     1 | Up       |
      |   100 |    -1 | Down     |

  @TemplateTester @Helpers
  Scenario: Render template "switch" statement
    This feature is useful for custom alerts so that only one alert is required per indicator/strategy.

    When the following template was stored with key "strategy-name" for the webhook:
      """
      Switch Template:
      {{#switch switchCase}}
      {{#case 1}}Case 1{{/case}}
      {{#case 2}}Case 2{{/case}}
      {{#case 4}}Case 3{{/case}}
      {{#default}}Case 4{{/default}}
      {{/switch}}
      """
    When the template test is called with parameters:
      | switchCase   |
      | <switchCase> |
    Then the template is rendered as:
      """
      Switch Template:
      Case <switchCase>
      """

    Examples: Using ints as switch case due to limitations of TradingView alerts
      | switchCase |
      |          1 |
      |          2 |
      |          3 |
      |          4 |
