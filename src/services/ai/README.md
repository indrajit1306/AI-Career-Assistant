# AI Integration Layer

This directory contains the AI abstraction layer for the AI Career Assistant application. It is designed to allow the application to easily switch between different AI providers (e.g., a mock provider for local development, and a secure backend provider for production).

## Architecture

1. **`AIProvider` Interface (`aiTypes.ts`)**: Defines the contract for all AI services. Any provider must implement this interface to ensure type safety and predictability across the app.
2. **`AIClient` (`aiClient.ts`)**: The central access point for the UI. It wraps the active `AIProvider`, providing error handling, validation, and a consistent API boundary.
3. **`MockAIProvider` (`mockAIProvider.ts`)**: A safe, local-only provider used during development. It returns pre-determined, structured data with clear "Demo AI response" labels. It simulates network delays but makes no actual API calls.
4. **`aiPrompts.ts`**: Contains all the prompt templates for interacting with future LLMs. These prompts explicitly request JSON-style structured output and instruct the model not to invent information.

## Security Notice: API Keys

**CRITICAL:** Do NOT place real API keys (e.g., OpenAI, Anthropic, Gemini) in frontend code, `.env` files exposed to the browser (like `VITE_*`), or `localStorage`. 

Browser-based applications cannot securely hold secret keys. If you put a secret key in the frontend, it can be easily extracted by anyone visiting the site.

### How to Integrate a Real AI Provider

When you are ready to integrate a real AI provider:

1. **Create a Backend**: You must create a secure backend service (e.g., Node.js, Python) that securely holds the API keys.
2. **Create a new `BackendAIProvider`**: Create a new class that implements the `AIProvider` interface. This class will make standard HTTP requests to your secure backend.
3. **Switch the Provider**: In `aiClient.ts`, instantiate your new `BackendAIProvider` instead of the `MockAIProvider`.

Currently, all methods use the `MockAIProvider` to ensure safe, cost-free development.
