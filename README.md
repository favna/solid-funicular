# Sapphire Fetch zip repro

Steps to repro:

1. Install dependencies with `yarn` to ensure the yarn patch to @sapphire/fetch is applied (this adds debugger lines for ease of reproduction)
2. Open the project in VSCode
3. Start a new JavaScript Debug Terminal
4. Run `yarn start` to run the project
    - This will first hit 2 debugger lines in @sapphire/fetch where you can see that the request body gets nuked by our parsing
    - Then it will hit the debugger line in the project where you can see that the request body is parseable by JSON, when it shouldn't be, because it's supposed to be a `File` object.
5. Observe that the project runs successfully instead of throwing an error
6. Modify [node_modules/@sapphire/fetch/dist/esm/index.mjs](node_modules/@sapphire/fetch/dist/esm/index.mjs) commenting out lines 125-127
7. Run `yarn start` again
8. Observe that the project now throws an error as expected
