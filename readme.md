# Chatbot

![Hero Image](./hero.png)

## Introduction

In class, we built a simple chatbot that can answer questions using OpenAI's GPT-4o-mini model. However, our bot currently has a limitation: it only supports one question and one response per session. Your task is to enhance the chatbot's capabilities, transforming it into a multi-turn conversational bot.

Your goal is to build a chatbot that can manage an ongoing conversation with the user, allowing for multiple exchanges while maintaining a coherent flow.

## Functional Requirements

### Step 1: Enable Multi-Turn Conversations

Modify the Angular app we developed in class so that it can handle multi-turn conversations. The user should be able to say something, the bot should respond, and then the user should continue the conversation, with the bot responding again—and so on. The conversation history, including the user's messages and the bot's responses, should be displayed clearly. Use CSS to visually differentiate between the user's and the bot's messages for clarity.

Limit the conversation to 20 turns. If the user asks more than 20 questions, the bot should stop accepting user input. Provide a _Start Over_ button to allow the user to begin a new conversation if they wish.

### Step 2: System Prompt

Add a route called `/system-prompt` that allows users to set the system prompt. The system prompt serves as a description of the chatbot's behavior, providing instructions, context, or customization for the chatbot's responses. This prompt must be used by the conversation window implemented in the previous step.

### Step 3: Prompt Engineering

Create a prompt for a flower shop chatbot. The purpose of this bot is to assist customers in choosing the perfect bouquet. If the customer isn't sure which flowers they want, the bot should ask questions to understand the occasion, their favorite colors, or other preferences, and then suggest bouquets accordingly. The bot should respond in the language that the user uses.

The flower shop offers the following flowers:

* Rose (red, yellow, purple)
* Lily (yellow, pink, white)
* Gerbera (pink, red, yellow)
* Freesia (white, pink, red, yellow)
* Tulips (red, yellow, purple)
* Sunflowers (yellow)

Bouquet pricing is as follows:

* Small bouquet: 15€ (3 flowers arranged with a touch of greenery)
* Medium bouquet: 25€ (5 flowers elegantly arranged with larger green leaves as decoration)
* Large bouquet: 35€ (10 flowers, artistically arranged with greenery and filler flowers)

The bot should greet customers warmly and mention the shop's slogan: "Let flowers draw a smile on your face." Keep the bot's tone friendly and conversational, avoiding overly detailed lists or exaggerated enthusiasm.

If a customer asks about anything unrelated to flowers or bouquets, the bot should politely inform them that it can only provide information about flowers and bouquets.

### Step 4: Order Summary (Advanced Exercise)

Once the customer confirms their order, the bot should generate a JSON output summarizing the order details. In a real-world scenario, this JSON would be sent to an ERP system for processing. For this exercise, your application should pick up the JSON and redirect the user to a new page called `/order-summary`, where the order details are displayed.

Use the following JSON schema for the order:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Flower Shop Order",
  "type": "object",
  "properties": {
    "bouquets": {
      "type": "array",
      "description": "List of bouquets ordered by the customer.",
      "items": {
        "type": "object",
        "properties": {
          "size": {
            "type": "string",
            "enum": ["small", "medium", "large"],
            "description": "Size of the bouquet."
          },
          "flowers": {
            "type": "array",
            "description": "List of flowers in the bouquet.",
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": ["rose", "lily", "gerbera", "freesia", "tulip", "sunflower"],
                  "description": "Type of flower."
                },
                "color": {
                  "type": "string",
                  "enum": ["red", "yellow", "purple", "pink", "white"],
                  "description": "Color of the flower."
                },
                "quantity": {
                  "type": "integer",
                  "description": "Number of this flower in the bouquet."
                }
              },
              "additionalProperties": false,
              "required": ["type", "color", "quantity"]
            }
          }
        },
        "additionalProperties": false,
        "required": ["size", "flowers"]
      }
    },
    "totalPrice": {
      "type": "number",
      "description": "Total price of the order in euros."
    }
  },
  "additionalProperties": false,
  "required": ["bouquets", "totalPrice"]
}
```

Here is a sample order in JSON format:

```json
{
  "bouquets": [
    {
      "size": "small",
      "flowers": [
        {
          "type": "rose",
          "color": "red",
          "quantity": 1
        },
        {
          "type": "lily",
          "color": "white",
          "quantity": 1
        },
        {
          "type": "tulip",
          "color": "yellow",
          "quantity": 1
        }
      ]
    },
    {
      "size": "medium",
      "flowers": [
        {
          "type": "gerbera",
          "color": "pink",
          "quantity": 5
        }
      ]
    },
    {
      "size": "large",
      "flowers": [
        {
          "type": "sunflower",
          "color": "yellow",
          "quantity": 3
        },
        {
          "type": "rose",
          "color": "yellow",
          "quantity": 7
        }
      ]
    }
  ],
  "totalPrice": 75.0
}
```

## Non-Functional Requirements

* Use the latest version of Angular.
* Directly access the OpenAI API through Angular's `HttpClient`. Do not use an existing SDK from npm.
* Keep all code related to interacting with the OpenAI API in a separate Angular service.

