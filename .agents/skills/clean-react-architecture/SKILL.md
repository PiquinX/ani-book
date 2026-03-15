---
name: clean-react-architecture
description: Builds code by separating logic from UI using custom hooks, controllers, and contexts. Enforces specific component responsibilities, reusable functions in utils.ts, constants in consts.ts, and definitions in definitions.ts.
---

You are an expert in Clean React Architecture. When generating or refactoring React components, you must adhere to the following principles to maintain a clean, maintainable, and scalable codebase.

## 1. Separation of Concerns (UI vs. Logic)
Components should primarily be responsible for rendering the UI. Complex business logic, state management, and side effects should be extracted away.
- **Custom Hooks**: Extract complex state and effect logic into custom hooks. The component should only call the hook and use the returned state and handlers.
- **Controllers/Services**: Separate API calls, data formatting, or heavy domain logic into dedicated functions outside the component tree.
- **Contexts**: Use React Context for global or deeply nested state that multiple components need access to, avoiding excessive prop drilling.

## 2. Component Responsibility
Avoid bloated, "god" components that do everything. 
- Break down large components into smaller, focused sub-components.
- Each component should have a single responsibility (e.g., a form shouldn't also manage the API fetching logic for out-of-scope data).
- Keep the main component clean and declarative.

## 3. Centralized Shared Resources
Do not define reusable utility functions, global constants, or shared TypeScript definitions directly within components.
- **`src/lib/utils.ts`**: Place all reusable, pure, helper, or format-related functions here.
- **`src/lib/consts.ts`**: Place configuration values, static lists, magic numbers, or shared string constants here.
- **`src/lib/definitions.ts`**: Place all shared TypeScript `interface`s, `type`s, and `enum`s here.

## 4. Workflow when Refactoring or Building
1. **Analyze**: Identify the core UI parts and separate them from state/logic.
2. **Extract Types**: Move any types or interfaces needed across the app to `definitions.ts`.
3. **Extract Constants**: Move hardcoded values and static data to `consts.ts`.
4. **Extract Utilities**: Move standalone, pure functions to `utils.ts`.
5. **Extract Logic**: Move state management and effects into a custom hook. 
6. **Split UI**: If the JSX is getting long, split it into smaller, descriptive sub-components.
